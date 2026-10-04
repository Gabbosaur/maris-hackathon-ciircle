#!/usr/bin/env python3
"""Analizza il video di ispezione con Gemini usando il system prompt
di dominio del caso d'uso 'cavi'. Stampa il referto strutturato.

La chiave viene letta da maris-demo/.env e non viene mai stampata.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
VIDEO = os.path.join(ROOT, "maris-demo", "cable-inspection.mp4")
ENV = os.path.join(ROOT, "maris-demo", ".env")
# fallback: se un modello e sovraccarico si passa al successivo
MODELS = [
    "gemini-3.8-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-2.5-pro",
]
BASE = "https://generativelanguage.googleapis.com"


def load_key():
    with open(ENV, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if line.startswith("GEMINI_API_KEY"):
                return line.split("=", 1)[1].strip().strip("\"'")
    sys.exit("GEMINI_API_KEY non trovata in .env")


KEY = load_key()

SYSTEM = """Sei un ispettore specializzato in cavi e condotte sottomarine.
Analizzi una registrazione ROV lungo il tracciato di un cavo.

REGOLE
1. Descrivi solo cio che e effettivamente visibile. Non inferire.
2. Separa OSSERVAZIONE (cosa si vede) da DIAGNOSI (interpretazione).
3. Valuta: continuita dell'interramento, campate libere (free span),
   stato delle protezioni, abrasioni, oggetti estranei sul tracciato.
4. Severita 1-4 (1 lieve, 4 critica). Dichiara la confidenza 0-1.
5. Se il sedimento in sospensione riduce la visibilita, abbassa la
   confidenza e dichiaralo nell'osservazione.
6. Non dichiarare il cavo integro o compromesso: la valutazione
   spetta al gestore dell'asset.

Rispondi SOLO con JSON valido, senza blocchi markdown."""

TASK = """Analizza il video e produci questo JSON:

{
  "descrizione_generale": "cosa mostra il video, 2 frasi",
  "ambiente": "subacqueo o altro, visibilita, tipo di fondale",
  "soggetto_presente": "cosa si vede davvero: cavo, condotta, altro",
  "segmenti": [
    {"da_secondi": 0, "a_secondi": 9, "cosa_si_vede": "..."}
  ],
  "anomalie": [
    {
      "secondo": 14,
      "etichetta": "titolo breve",
      "severita": 2,
      "confidenza": 0.7,
      "osservazione": "cosa si vede, una frase",
      "diagnosi": "interpretazione tecnica, una frase",
      "azione": "cosa fare, una frase"
    }
  ],
  "note_per_la_demo": "il video e adatto a un caso d'uso su cavi sottomarini? se no, quale caso d'uso rappresenta meglio?"
}"""


def req(url, data=None, headers=None, method=None):
    r = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    try:
        with urllib.request.urlopen(r, timeout=180) as resp:
            return resp.status, resp.read(), dict(resp.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read(), dict(e.headers)


def upload():
    size = os.path.getsize(VIDEO)
    print(f"[1/3] Upload ({size / 1e6:.1f} MB)...", flush=True)

    status, body, headers = req(
        f"{BASE}/upload/v1beta/files?key={KEY}",
        data=json.dumps({"file": {"display_name": "cable-inspection"}}).encode(),
        headers={
            "X-Goog-Upload-Protocol": "resumable",
            "X-Goog-Upload-Command": "start",
            "X-Goog-Upload-Header-Content-Length": str(size),
            "X-Goog-Upload-Header-Content-Type": "video/mp4",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    if status != 200:
        sys.exit(f"Avvio upload fallito ({status}): {body[:400].decode(errors='replace')}")

    target = headers.get("X-Goog-Upload-URL") or headers.get("x-goog-upload-url")
    if not target:
        sys.exit("URL di upload non restituito")

    with open(VIDEO, "rb") as fh:
        blob = fh.read()

    status, body, _ = req(
        target,
        data=blob,
        headers={
            "Content-Length": str(size),
            "X-Goog-Upload-Offset": "0",
            "X-Goog-Upload-Command": "upload, finalize",
        },
        method="POST",
    )
    if status != 200:
        sys.exit(f"Upload fallito ({status}): {body[:400].decode(errors='replace')}")

    info = json.loads(body)["file"]
    return info["name"], info["uri"]


def wait_active(name):
    print("[2/3] Attendo elaborazione...", flush=True)
    for _ in range(40):
        status, body, _ = req(f"{BASE}/v1beta/{name}?key={KEY}")
        if status != 200:
            sys.exit(f"Stato non leggibile ({status})")
        st = json.loads(body).get("state")
        if st == "ACTIVE":
            return
        if st == "FAILED":
            sys.exit("Elaborazione del file fallita")
        time.sleep(3)
    sys.exit("Timeout in attesa del file")


def analyse(uri):
    print("[3/3] Analisi con Gemini...", flush=True)
    payload = json.dumps(
        {
            "systemInstruction": {"parts": [{"text": SYSTEM}]},
            "contents": [
                {
                    "parts": [
                        {"fileData": {"mimeType": "video/mp4", "fileUri": uri}},
                        {"text": TASK},
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "responseMimeType": "application/json",
            },
        }
    ).encode()

    last = ""
    for model in MODELS:
        for attempt in range(3):
            print(f"      {model} (tentativo {attempt + 1})...", flush=True)
            status, body, _ = req(
                f"{BASE}/v1beta/models/{model}:generateContent?key={KEY}",
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            if status == 200:
                out = json.loads(body)
                try:
                    print(f"      risposta da {model}\n", flush=True)
                    return out["candidates"][0]["content"]["parts"][0]["text"]
                except (KeyError, IndexError):
                    last = json.dumps(out)[:400]
                    break
            last = body[:200].decode(errors="replace")
            if status in (503, 429):
                time.sleep(4 * (attempt + 1))
                continue
            break  # errore non transitorio: passa al modello successivo

    sys.exit(f"Nessun modello disponibile. Ultimo errore:\n{last}")


def main():
    name, uri = upload()
    wait_active(name)
    text = analyse(uri)

    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        print(text)
        return

    print("=" * 68)
    print("DESCRIZIONE:", data.get("descrizione_generale", "-"))
    print("AMBIENTE   :", data.get("ambiente", "-"))
    print("SOGGETTO   :", data.get("soggetto_presente", "-"))

    print("\n--- SEGMENTI ---")
    for s in data.get("segmenti", []):
        print(f"  {s.get('da_secondi')}s-{s.get('a_secondi')}s: {s.get('cosa_si_vede')}")

    print("\n--- ANOMALIE ---")
    for a in data.get("anomalie", []):
        print(f"\n  [{a.get('secondo')}s] {a.get('etichetta')}")
        print(f"    severita {a.get('severita')}/4 · confidenza {a.get('confidenza')}")
        print(f"    OSS : {a.get('osservazione')}")
        print(f"    DIAG: {a.get('diagnosi')}")
        print(f"    AZI : {a.get('azione')}")

    print("\n--- NOTE PER LA DEMO ---")
    print(" ", data.get("note_per_la_demo", "-"))
    print("=" * 68)

    with open(os.path.join(ROOT, "gemini-output.json"), "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=2)
    print("\nSalvato in gemini-output.json")

    # pulizia: rimuovo il file caricato
    req(f"{BASE}/v1beta/{name}?key={KEY}", method="DELETE")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Chiede a Gemini le coordinate normalizzate di ciascuna anomalia
nel fotogramma in cui è visibile, per posizionare i marker sul video.

Coordinate restituite in scala 0-1000 (convenzione Gemini), convertite
in percentuali del riquadro video.
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
BASE = "https://generativelanguage.googleapis.com"
MODELS = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-pro"]


def load_key():
    with open(ENV, encoding="utf-8") as fh:
        for line in fh:
            if line.strip().startswith("GEMINI_API_KEY"):
                return line.split("=", 1)[1].strip().strip("\"'")
    sys.exit("GEMINI_API_KEY non trovata")


KEY = load_key()

SYSTEM = """Sei un sistema di visione per ispezioni subacquee.
Localizzi oggetti nei fotogrammi di un video ROV.

Le coordinate devono essere normalizzate 0-1000 rispetto al
fotogramma: x da sinistra a destra, y dall'alto in basso.
Il box è [y_min, x_min, y_max, x_max].

Rispondi SOLO con JSON valido."""

TASK = """Nel video individua questi quattro soggetti e, per ciascuno,
indica il secondo in cui è più chiaramente visibile e il bounding box
in quel fotogramma.

1. L'elemento cilindrico danneggiato che sormonta la condotta
2. Il tronco di legno adagiato vicino al cavo
3. Il tratto di cavo armato completamente esposto sul fondale roccioso
4. La condotta non interrata sul fondale sabbioso nel terzo segmento

JSON richiesto:
{
  "soggetti": [
    {
      "n": 1,
      "nome": "...",
      "secondo": 2.0,
      "box_1000": [y_min, x_min, y_max, x_max],
      "visibile": true,
      "note": "dove si trova nel fotogramma, a parole"
    }
  ]
}

Se un soggetto non è localizzabile con certezza, metti "visibile": false."""


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
        data=json.dumps({"file": {"display_name": "locate"}}).encode(),
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
        sys.exit(f"Avvio upload fallito ({status})")
    target = headers.get("X-Goog-Upload-URL") or headers.get("x-goog-upload-url")
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
        sys.exit(f"Upload fallito ({status})")
    info = json.loads(body)["file"]
    return info["name"], info["uri"]


def wait_active(name):
    print("[2/3] Attendo elaborazione...", flush=True)
    for _ in range(40):
        status, body, _ = req(f"{BASE}/v1beta/{name}?key={KEY}")
        st = json.loads(body).get("state")
        if st == "ACTIVE":
            return
        if st == "FAILED":
            sys.exit("Elaborazione fallita")
        time.sleep(3)
    sys.exit("Timeout")


def locate(uri):
    print("[3/3] Localizzazione...", flush=True)
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
            "generationConfig": {"temperature": 0, "responseMimeType": "application/json"},
        }
    ).encode()

    for model in MODELS:
        for attempt in range(3):
            print(f"      {model} ({attempt + 1})...", flush=True)
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
                    break
            if status in (503, 429):
                time.sleep(4 * (attempt + 1))
                continue
            break
    sys.exit("Nessun modello disponibile")


def main():
    name, uri = upload()
    wait_active(name)
    data = json.loads(locate(uri))

    print("=" * 70)
    out = []
    for s in data.get("soggetti", []):
        box = s.get("box_1000") or [0, 0, 0, 0]
        y1, x1, y2, x2 = box
        # centro del box in percentuale
        cx = (x1 + x2) / 2 / 10
        cy = (y1 + y2) / 2 / 10
        print(f"\n[{s.get('n')}] {s.get('nome')}")
        print(f"    secondo  : {s.get('secondo')}")
        print(f"    visibile : {s.get('visibile')}")
        print(f"    box 1000 : {box}")
        print(f"    centro   : left {cx:.1f}%  top {cy:.1f}%")
        print(f"    note     : {s.get('note')}")
        out.append(
            {
                "n": s.get("n"),
                "nome": s.get("nome"),
                "secondo": s.get("secondo"),
                "visibile": s.get("visibile"),
                "left_pct": round(cx, 1),
                "top_pct": round(cy, 1),
                "w_pct": round((x2 - x1) / 10, 1),
                "h_pct": round((y2 - y1) / 10, 1),
            }
        )
    print("\n" + "=" * 70)

    with open(os.path.join(ROOT, "gemini-boxes.json"), "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
    print("Salvato in gemini-boxes.json")

    req(f"{BASE}/v1beta/{name}?key={KEY}", method="DELETE")


if __name__ == "__main__":
    main()

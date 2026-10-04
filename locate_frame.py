#!/usr/bin/env python3
"""Localizza un soggetto in un singolo fotogramma con Gemini.
L'analisi su immagine è più precisa di quella su video.

Uso: locate_frame.py <immagine> "<soggetto da trovare>"
"""

import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
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
Localizzi oggetti in un fotogramma con precisione.

Le coordinate sono normalizzate 0-1000 rispetto al fotogramma:
x da sinistra a destra, y dall'alto in basso.
Il box è [y_min, x_min, y_max, x_max] e deve essere ADERENTE
all'oggetto, senza margini superflui.

Rispondi SOLO con JSON valido."""


def task(subject):
    return f"""Nel fotogramma individua: {subject}

Restituisci il bounding box più aderente possibile.
Se vedi più candidati, scegli quello più evidente e descrivi
brevemente perché.

{{
  "trovato": true,
  "box_1000": [y_min, x_min, y_max, x_max],
  "descrizione": "cosa hai individuato e dove si trova",
  "confidenza": 0.9,
  "altri_oggetti": ["eventuali altri elementi rilevanti nel fotogramma"]
}}"""


def req(url, data=None, headers=None):
    r = urllib.request.Request(url, data=data, headers=headers or {}, method="POST")
    try:
        with urllib.request.urlopen(r, timeout=180) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def main():
    img_path = sys.argv[1] if len(sys.argv) > 1 else "/tmp/f10.png"
    subject = sys.argv[2] if len(sys.argv) > 2 else "il tronco di legno"

    with open(img_path, "rb") as fh:
        b64 = base64.b64encode(fh.read()).decode()

    mime = "image/png" if img_path.endswith(".png") else "image/jpeg"
    payload = json.dumps(
        {
            "systemInstruction": {"parts": [{"text": SYSTEM}]},
            "contents": [
                {
                    "parts": [
                        {"inlineData": {"mimeType": mime, "data": b64}},
                        {"text": task(subject)},
                    ]
                }
            ],
            "generationConfig": {"temperature": 0, "responseMimeType": "application/json"},
        }
    ).encode()

    print(f"Analisi di {img_path}")
    print(f"Soggetto: {subject}\n")

    for model in MODELS:
        for attempt in range(3):
            print(f"  {model} ({attempt + 1})...", flush=True)
            status, body = req(
                f"{BASE}/v1beta/models/{model}:generateContent?key={KEY}",
                data=payload,
                headers={"Content-Type": "application/json"},
            )
            if status == 200:
                out = json.loads(body)
                try:
                    txt = out["candidates"][0]["content"]["parts"][0]["text"]
                except (KeyError, IndexError):
                    break
                d = json.loads(txt)
                print(f"\n  risposta da {model}")
                print("=" * 64)
                if not d.get("trovato"):
                    print("  Soggetto NON trovato nel fotogramma")
                    print("  altri oggetti:", d.get("altri_oggetti"))
                    return
                y1, x1, y2, x2 = d["box_1000"]
                cx, cy = (x1 + x2) / 2 / 10, (y1 + y2) / 2 / 10
                w, h = (x2 - x1) / 10, (y2 - y1) / 10
                print(f"  descrizione : {d.get('descrizione')}")
                print(f"  confidenza  : {d.get('confidenza')}")
                print(f"  box 1000    : {d['box_1000']}")
                print(f"\n  CENTRO  left {cx:.1f}%  top {cy:.1f}%")
                print(f"  DIMENS  w {w:.1f}%  h {h:.1f}%")
                print(f"\n  per data.js:")
                print(
                    f"  box: {{ left: {cx:.1f}, top: {cy:.1f}, w: {w:.1f}, h: {h:.1f} }},"
                )
                if d.get("altri_oggetti"):
                    print(f"\n  altri oggetti: {d['altri_oggetti']}")
                print("=" * 64)
                return
            if status in (503, 429):
                time.sleep(4 * (attempt + 1))
                continue
            print(f"    errore {status}: {body[:150].decode(errors='replace')}")
            break
    sys.exit("Nessun modello disponibile")


if __name__ == "__main__":
    main()

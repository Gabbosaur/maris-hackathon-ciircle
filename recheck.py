#!/usr/bin/env python3
"""Rianalizza i box delle anomalie sui singoli fotogrammi.
L'analisi su immagine è più precisa di quella a livello di video.
"""

import base64
import json
import os
import subprocess
import time
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
VIDEO = os.path.join(ROOT, "maris-demo", "cable-inspection.mp4")
ENV = os.path.join(ROOT, "maris-demo", ".env")
KEY = [
    l.split("=", 1)[1].strip()
    for l in open(ENV, encoding="utf-8")
    if l.startswith("GEMINI_API_KEY")
][0]

TARGETS = [
    (15, "cv-2", "il cavo sottomarino esposto, non interrato"),
    (31, "cv-3", "l'elemento cilindrico metallico che sormonta la condotta"),
    (37, "cv-4", "la condotta non interrata sul fondale sabbioso"),
]

SYS = """Sei un sistema di visione per ispezioni subacquee.
Coordinate normalizzate 0-1000: box = [y_min, x_min, y_max, x_max].
Il box deve essere ADERENTE all'oggetto, senza margini superflui.
Rispondi SOLO con JSON."""


def ask(img, subject):
    b64 = base64.b64encode(open(img, "rb").read()).decode()
    task = f"""Individua con precisione: {subject}

Attenzione a distinguere manufatti (superficie regolare) da
detriti naturali (forma organica irregolare).

{{"trovato":true,"box_1000":[y1,x1,y2,x2],"descrizione":"...","confidenza":0.9}}"""
    payload = json.dumps(
        {
            "systemInstruction": {"parts": [{"text": SYS}]},
            "contents": [
                {
                    "parts": [
                        {"inlineData": {"mimeType": "image/png", "data": b64}},
                        {"text": task},
                    ]
                }
            ],
            "generationConfig": {"temperature": 0, "responseMimeType": "application/json"},
        }
    ).encode()
    for model in ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-flash-latest"]:
        for attempt in range(3):
            r = urllib.request.Request(
                f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={KEY}",
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            try:
                out = json.loads(urllib.request.urlopen(r, timeout=180).read())
                return json.loads(out["candidates"][0]["content"]["parts"][0]["text"]), model
            except urllib.error.HTTPError as e:
                if e.code in (503, 429):
                    time.sleep(4 * (attempt + 1))
                    continue
                break
            except Exception:
                break
    return None, None


for sec, fid, subject in TARGETS:
    img = f"/tmp/fr{sec}.png"
    subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", str(sec), "-i", VIDEO, "-frames:v", "1", img, "-y"],
        check=True,
    )
    d, model = ask(img, subject)
    print(f"\n{'=' * 66}")
    print(f"{fid} · {sec}s · {subject}")
    # il modello può restituire un oggetto o una lista di candidati
    if isinstance(d, list):
        d = d[0] if d else None
    if not isinstance(d, dict) or not d.get("trovato", True) or "box_1000" not in d:
        print(f"  non localizzato · risposta: {str(d)[:160]}")
        continue
    y1, x1, y2, x2 = d["box_1000"]
    cx, cy = (x1 + x2) / 2 / 10, (y1 + y2) / 2 / 10
    w, h = (x2 - x1) / 10, (y2 - y1) / 10
    print(f"  [{model}] conf {d.get('confidenza')}")
    print(f"  {d.get('descrizione')}")
    print(f"  box: {{ left: {cx:.1f}, top: {cy:.1f}, w: {w:.1f}, h: {h:.1f} }},")

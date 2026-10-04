# MARIS — briefing per il team

> **Team 7** · Lorenzo Torre · Alessandro Melillo · Gabriele Guo
> Hackathon CIIRCLE · Sfida 2 (Robotica sottomarina) · Pitch 4 minuti
> Lettura: 3 minuti

---

## In una frase

Un copilota AI che trasforma i video di ispezione delle infrastrutture
marittime in referti tecnici con raccomandazioni ancorate a normativa,
e ne conserva la memoria storica nel tempo.

**Prototipo pronto:** `maris-demo/index.html` → doppio click, nessuna installazione.

---

## Il problema

Banchine e dighe liguri si ispezionano con ROV e sommozzatori. Ogni ispezione
produce **ore di video** che un tecnico rivede a mano. Risultato: revisione
lenta, valutazione soggettiva, e **nessuna memoria storica** del degrado.
Non si sa se una lesione è peggiorata dall'ultima volta.

---

## Cosa NON è (serve saperlo per rispondere alla giuria)

| Obiezione | Risposta |
|---|---|
| "È l'ennesimo YOLO" | No. YOLO mette box su classi predefinite e serve un dataset. Un VLM **descrive e ragiona** in linguaggio naturale, zero-shot. |
| "Lo scan 3D esiste già" | Vero, è maturo. **Noi non acquisiamo dati, li rendiamo comprensibili.** |
| "E le allucinazioni?" | Il sistema **propone**, l'ispettore **valida**. Mostriamo la confidenza e dichiariamo quando è bassa. |
| "Chi si prende la responsabilità?" | Nessun giudizio di sicurezza. Le raccomandazioni sono **ancorate a normativa** (RAG), l'ingegnere firma. |

---

## Il nostro vantaggio: 3 gap confermati da ricerca reale

Ricerca su OpenAlex (2022-2026):

1. **VLM nel subacqueo** → spazio bianco. Detection è saturo (più survey), interpretazione no.
2. **Livello prescrittivo nel marittimo** → vuoto. Esiste in edilizia/BIM, non nel marittimo.
3. **Confronto multi-temporale** → quasi assente, sia sott'acqua sia su opere costiere.

**I 3 livelli:** descrittivo ("c'è una crepa") → diagnostico ("corrosione, sev. 3")
→ **prescrittivo** ("intervieni entro 6 mesi, così, con questa priorità") ← *noi*

---

## Architettura: un motore, N asset

L'operatore seleziona il caso d'uso → carica **system prompt + base normativa** dedicati.

| Asset | Stato |
|---|---|
| Banchine | ✅ implementato |
| Frangiflutti (emerso + sommerso) | ✅ implementato |
| Scafi | 🔒 scheda bloccata = scalabilità |
| Cavi | 🔒 scheda bloccata = scalabilità |

> Non risolviamo un problema, ne risolviamo una **classe**. Modello scalabile, non one-off.

**Pipeline:** video → frame → VLM (prompt di dominio) → **RAG su normativa** →
severità e priorità → memoria storica → referto

---

## Demo: il percorso da mostrare

1. Clicca **Banchine** → si caricano prompt e normativa (visibili nei due pannelli)
2. Clicca **Frangiflutti** → **il prompt cambia**. Questa è la prova del motore orizzontale.
3. Torna su Banchine, carica il video, **Avvia analisi**
4. Scorre la telemetria (quota, temperatura, torbidità, batteria) + log di missione
5. Le anomalie compaiono **man mano**, con referti parziali ogni 2 minuti
6. **Trascina un rettangolo sul video** → analisi mirata su richiesta dell'operatore

### I 4 momenti che contano

- **Il prompt che cambia** tra i due casi d'uso → motore orizzontale
- **Il confronto storico** sulla prima anomalia: `0,4 m² a marzo → 0,9 m² oggi, +125%`
  → da ispezione isolata a manutenzione predittiva. **È il momento memorabile.**
- **La terza anomalia a confidenza 58%**: dichiara che la torbidità impedisce una stima
  affidabile, e la torbidità alta si vede in telemetria → il sistema conosce i suoi limiti
- **Le fonti citate** su ogni azione → non chiediamo a un LLM cosa pensa,
  colleghiamo osservazione e norma tecnica

---

## Aggancio ligure (criterio di valutazione esplicito)

- Porti di Genova, Savona-Vado, La Spezia · 2 Autorità di Sistema Portuale
- **Nuova diga foranea di Genova**: opera da monitorare per decenni
- **Mareggiata ottobre 2018**: devastò le opere costiere liguri
- Un membro del team è ligure → motivazione autentica, non retorica

---

## Criteri di valutazione (Art. 10) — dove siamo

| Criterio | Stato |
|---|---|
| Innovatività | 🟢 gap confermati da ricerca |
| Impatto | 🟢 una classe di problemi, non uno |
| Fattibilità | 🟢 prototipo già funzionante, zero dipendenze |
| Coerenza sfida | 🟢 monitoraggio infrastrutture marine |
| **Qualità presentazione** | 🔴 **punto debole: va costruita** |
| Territorialità ligure | 🟢 forte, serve un dato reale |

> 5 criteri su 6 non sono tecnici. Vince la storia più chiara con una demo che funziona.

---

## TODO entro domani 13:30 — per priorità

| # | Cosa | Chi |
|---|---|---|
| 1 | **Video demo registrato** (60-75 s). Con 4 min il live è troppo rischioso: il video è il piano A. `Win+Alt+R` | |
| 2 | **Slide**, max 7-8 | |
| 3 | **Prove pitch cronometrate**, min. 3 giri su 4:00 | |
| 4 | **Documenti normativi reali** al posto dei generici (`data.js` → `knowledge`). È il differenziatore | |
| 5 | **Un dato ligure verificabile** su costi/frequenza ispezioni | |
| 6 | Video reali di ispezione (banchine o dighe) scaricati **in locale** | |
| 7 | Se avanza: collegare un VLM vero (sostituire `ANALYSES` in `data.js`) | |

---

## Scaletta pitch — 4:00

| Tempo | Contenuto |
|---|---|
| 0:00–0:30 | Problema + aggancio ligure. Secco. |
| 0:30–0:50 | Perché ora: detection è saturo, manca la comprensione |
| 0:50–2:10 | **Demo registrata** (⅓ del tempo: è ciò che convince) |
| 2:10–2:40 | Momento wow: il difetto che cresce nel tempo |
| 2:40–3:10 | Motore orizzontale: una slide, 4 asset |
| 3:10–3:30 | Limiti: copilota non giudice, RAG ancora le fonti |
| 3:30–4:00 | Roadmap (3D, edge on-ROV) + Call for solution CIIRCLE |

### Frasi da usare

- "Non rileviamo oggetti. **Capiamo** cosa sta succedendo sott'acqua."
- "È un **copilota**, non un giudice: l'ispettore valida sempre."
- "Oggi ogni ispezione nasce e muore in un video. Noi le diamo **memoria**."
- "Un motore, quattro asset. Non un problema: una **classe** di problemi."

---

## ⚠️ Onestà in pitch — non negoziabile

I referti e la telemetria del prototipo sono **simulati**. **Va detto.**
Formula: *"il prototipo dimostra il flusso end-to-end, i referti in demo sono
precaricati, l'integrazione VLM è il passo immediato."*

Se lo dichiariamo noi, siamo maturi. Se lo scopre la giuria, perdiamo credibilità.

---

## File

```
maris-demo/                    prototipo (doppio click su index.html)
  data.js                      casi d'uso, prompt, normativa, referti ← si modifica qui
hackathon-ciircle-strategia.md documento completo (757 righe, per approfondire)
BRIEFING-TEAM.md               questo file
```

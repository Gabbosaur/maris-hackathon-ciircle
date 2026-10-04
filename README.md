# MARIS

**Copilota AI per l'ispezione delle opere marittime.**
Da ore di video di ispezione a referto tecnico, con memoria storica del degrado.

Progetto sviluppato per l'**Hackathon CIIRCLE** (Salone Nautico di Genova, 3-4 ottobre 2026),
sfida *Robotica sottomarina e tecnologie subacquee*.

**Team 7** — Lorenzo Torre · Alessandro Melillo · Gabriele Guo

---

## Il problema

Banchine, dighe foranee e cavi sottomarini si ispezionano con ROV e sommozzatori.
Ogni ispezione produce **ore di video** che un tecnico rivede manualmente. Il risultato:
revisione lenta, valutazione soggettiva e **nessuna memoria storica strutturata** del degrado.
Non si sa se una lesione è peggiorata rispetto all'ispezione precedente.

## L'approccio

Non un ennesimo rilevatore di oggetti: la detection è un campo saturo. Il collo di
bottiglia è l'**interpretazione**. MARIS usa un Vision-Language Model guidato da un
system prompt di dominio e produce, per ogni anomalia:

| Livello | Contenuto |
|---|---|
| **Osservazione** | cosa è visibile, senza interpretazione |
| **Diagnosi** | interpretazione tecnica probabile, dichiarata come tale |
| **Azione** | cosa fare, entro quando, **con citazione della fonte normativa** |

Il salto rispetto allo stato dell'arte è il livello **prescrittivo**: esiste in edilizia
e nell'industria, è assente nel dominio marittimo.

## Un motore, N asset

L'operatore seleziona il caso d'uso; questo carica *system prompt* e *base normativa* dedicati.

| Asset | Stato |
|---|---|
| Banchine e opere di accosto | implementato |
| Dighe frangiflutti (emerso + sommerso) | implementato |
| Cavi e condotte sottomarine | implementato, su video reale |
| Scafi e carena | in arrivo |

## Avvio

```
maris-demo/index.html
```

Doppio click. Nessuna installazione, nessun server, nessuna dipendenza.

Scelta deliberata: in un pitch da 4 minuti una demo che richiede un build step
è una demo che può rompersi. La rete di un padiglione fieristico non è affidabile.

### Flusso

1. **Caso d'uso** — determina prompt di dominio e base normativa
2. **Sito e storico** — scelta della baseline di confronto fra le ispezioni in archivio
3. **Sorgente** — caricamento della registrazione ROV
4. **Analisi** — telemetria sincronizzata, anomalie progressive, referto

### Interazione

- La **barra di avanzamento** è navigabile: click, trascinamento, frecce direzionali.
  Tornando indietro lo stato si riallinea (le anomalie non ancora rilevate scompaiono).
- **Trascinando sul fotogramma** si chiede un approfondimento mirato su un'area.
- Le anomalie si **evidenziano da sole** quando il video raggiunge il punto in cui compaiono.

## Video di ispezione

I file `.mp4` non sono versionati. Per provare la demo serve una registrazione di
ispezione subacquea in `maris-demo/`. Il caso d'uso *Cavi* è tarato su un video di
70 secondi successivamente ridotto a 45 (rimossi i tratti 0-10 s e 25-40 s).

Fonti utilizzabili: dataset scientifici con DOI (es. UVMulti, `10.1038/s41597-026-07402-0`),
archivi NOAA Ocean Exploration, canali di produttori di ROV.

## Analisi con VLM

Gli script di supporto usano l'API Gemini e leggono la chiave da `maris-demo/.env`
(non versionato):

```
GEMINI_API_KEY=...
```

| Script | Funzione |
|---|---|
| `analyze.py` | analisi completa del video, produce il referto strutturato |
| `locate.py` | bounding box dei soggetti a livello di video |
| `locate_frame.py` | bounding box su un singolo fotogramma (più preciso) |
| `recheck.py` | rianalisi dei box di tutte le anomalie |

I contenuti del caso *Cavi* in `data.js` derivano da un'analisi reale eseguita con
questi script: anomalie, descrizioni, timestamp e coordinate dei riquadri.

## Struttura

```
maris-demo/
  index.html      markup
  styles.css      stile, nessun framework
  data.js         casi d'uso, prompt, normativa, referti, telemetria
  app.js          rendering e logica
make_pptx.py      genera il PowerPoint del pitch
audit.py          verifica sovrapposizioni e ortografia nelle slide
BRIEFING-TEAM.md  briefing operativo per il team
hackathon-ciircle-strategia.md   analisi, ricerca e strategia
```

## Limiti dichiarati

- I **referti nella demo sono precaricati**: il prototipo dimostra il flusso end-to-end.
  L'analisi del video dei cavi è però stata eseguita realmente con un VLM.
- I **riferimenti normativi sono segnaposto** plausibili, non documenti reali.
  Sostituirli è il passo che rende il RAG credibile.
- Un VLM può allucinare: il sistema **propone**, l'ispettore **valida**.
  Dove la visibilità è scarsa, la confidenza viene dichiarata bassa.
- Nessun giudizio di sicurezza strutturale: compete al tecnico abilitato.

## Licenza

Codice rilasciato per finalità dimostrative. La proprietà intellettuale del progetto
resta in capo agli autori (Art. 12 del regolamento dell'hackathon).

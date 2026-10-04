# MARIS — prototipo demo

Copilota AI per ispezioni di infrastrutture marittime.
Prototipo per l'Hackathon CIIRCLE (Genova, 3–4 ottobre 2026), sfida 2.

## Come si avvia

**Doppio click su `index.html`.** Nient'altro.

Nessun `npm install`, nessun server, nessuna connessione internet.
Scelta deliberata: la rete di un padiglione fieristico non è affidabile e
una demo che dipende da un build step è una demo che può rompersi davanti
alla giuria.

File:

```
index.html     markup
styles.css     stile, nessun framework
data.js        casi d'uso, system prompt, knowledge base, referti
app.js         rendering e logica
```

## Flusso della demo

1. **Seleziona il caso d'uso** — Banchina o Diga frangiflutti.
   Carica il system prompt di dominio e la knowledge base dedicata.
   Scafo e Cavi restano bloccati: comunicano scalabilità senza doverli implementare.
2. **Carica un video** di ispezione (drag & drop o click).
   Opzionale: trascina sul fotogramma per selezionare un'area di interesse.
3. **Avvia analisi** — la pipeline mostra i 5 stadi, incluso il recupero normativo.
4. **Leggi il referto** — per ogni anomalia: osservazione, diagnosi, azione
   raccomandata con scadenza, fonti normative citate, confidenza.
   Dove presente, il confronto con l'ispezione precedente.

## Cosa mostrare in pitch, in ordine di importanza

1. **Il selettore di caso d'uso** → un motore, N domini. Apri il pannello
   "Contesto caricato" e mostra che il system prompt cambia. È il cuore dell'idea.
2. **La catena osservazione → diagnosi → azione.** Non è detection, è supporto
   alla decisione. Il livello prescrittivo è ciò che manca in letteratura.
3. **Le citazioni normative.** Ogni raccomandazione è ancorata a un documento.
   Distingue il progetto da "abbiamo chiamato un LLM su un video".
4. **Il confronto temporale** (card "Corrosione estesa su palancola").
   Il momento memorabile: da ispezione isolata a memoria storica del degrado.
5. **Confidenza bassa sul terzo finding** (58%). Mostra che il sistema
   dichiara la propria incertezza invece di inventare. Anticipa l'obiezione
   sulle allucinazioni.
6. **Il disclaimer in fondo.** Copilota, non giudice. L'ispettore valida.

## Note tecniche

- I dati di analisi sono **simulati**, dichiarato in UI e in questo README.
  In pitch va detto: il prototipo dimostra il flusso, non la validazione su campo.
- L'integrazione VLM reale sostituirebbe `ANALYSES` in `data.js` con la
  risposta del modello, mantenendo lo stesso schema (osservazione, diagnosi,
  azione, citazioni, confidenza).
- Il RAG è rappresentato dai documenti in `knowledge` per caso d'uso.
  In produzione: indicizzazione vettoriale di linee guida e normative reali.
- Nessun dato esce dal browser. Il video resta locale (`URL.createObjectURL`).

## Prima dell'evento

- [ ] Sostituire i video con riprese reali di ispezione (banchine o dighe liguri)
- [ ] Verificare la terminologia tecnica con un esperto di opere marittime
- [ ] Sostituire i riferimenti normativi generici con documenti reali e citabili
- [ ] Registrare un video della demo come backup

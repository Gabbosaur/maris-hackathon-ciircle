# Hackathon CIIRCLE — Analisi, Idea e Strategia

> Documento di lavoro per l'Hackathon CIIRCLE "Innovazione circolare e digitale per la Blue Economy".
> Salone Nautico Internazionale di Genova, 3–4 ottobre 2026.

**Progetto:** MARIS — copilota AI per ispezioni di infrastrutture marittime.
**Sfida:** 2 · Robotica sottomarina e tecnologie subacquee.
**Prototipo:** `maris-demo/` — webapp funzionante, zero dipendenze, si apre con doppio click.
**Durata pitch:** 4 minuti (aggiornato rispetto ai 5 del regolamento).

---

## 1. Dati essenziali del regolamento

| Voce | Dettaglio |
|---|---|
| Organizzatore | Camera di Commercio di Genova (Art. 2) |
| Partner | Regione Liguria (capofila), FILSE, CCIAA Riviere di Liguria |
| Programma | Interreg Italia-Francia Marittimo 2021-2027, Progetto CIIRCLE |
| Scadenza candidatura | **25/09/2026 ore 17:00**, via mail a `hackathonciircle@ge.camcom.it` (Art. 5) |
| Date evento | Sab 3/10 13:00–20:00 · Dom 4/10 08:30–13:30 (Art. 8) |
| Sede | Salone Nautico Internazionale di Genova |
| Presenza | Obbligatoria per l'intera durata (Art. 3) |
| Costo | Gratuito |
| Team | Individuale o già formato, min 3 / max 5 persone (Art. 6) |
| Pitch | Regolamento: max 5 min + domande con slide (Art. 9) · **⚠️ aggiornato a 4 minuti** |
| Materiali extra | Mockup/prototipi/demo facoltativi, non penalizzanti se assenti (Art. 9) |

### Punti da tenere a mente

- **Composizione team (Art. 6):** l'Organizzazione compone e verifica i team incrociando *profilo di provenienza* e *ambito di competenza*, per garantire interdisciplinarità, complementarità, equilibrio tra profili e di genere. I candidati individuali accettano l'assegnazione.
- **Profilo in candidatura (Art. 3):** 1 profilo di provenienza + fino a 2 ambiti di competenza (Tecnologia e sviluppo · Ricerca e dominio · Business e impresa · Design e creatività · Comunicazione e impatto).
- **Selezione (Art. 7):** coerenza del profilo, competenze tecniche e trasversali, motivazione espressa, multidisciplinarità. Decisioni insindacabili.
- **Supporto fornito (Art. 8):** mentor, esperti di settore, materiali, spazi e dotazioni tecniche.
- **Premi (Art. 11):** un team vincitore per ciascuna delle 4 categorie. **La natura del riconoscimento non è specificata** nel regolamento, sarà comunicata prima dell'evento. Possibili menzioni speciali dai partner.
- **Follow-up strategico (Art. 11):** i progetti vincitori possono costituire base per la successiva **"Call for solution - fase 1"** del Progetto CIIRCLE. Questo è probabilmente il valore più concreto dell'iniziativa.
- **Proprietà intellettuale (Art. 12):** l'IP resta ai partecipanti. Si concede all'Organizzazione un diritto non esclusivo e gratuito di divulgazione citando gli autori. Sviluppi successivi restano di esclusiva titolarità dei proponenti.
- **Riutilizzo di soluzioni esistenti:** il regolamento **non lo vieta né lo regola**. Non c'è obbligo di costruire da zero. L'Art. 8 ammette esplicitamente anche un semplice *concept* o *modello di business*. Usare modelli/librerie di terzi è legittimo e in linea con lo spirito di *open innovation* (Art. 1).

---

## 2. Le 4 sfide tematiche (Art. 4)

1. **Maritime AI** — AI su processi marittimi, portuali e logistici: navigazione intelligente, manutenzione predittiva, monitoraggio ambientale, sicurezza marittima, porti smart, ottimizzazione attività portuali, supporto alle decisioni.
2. **Robotica sottomarina e tecnologie subacquee** — monitoraggio, manutenzione, raccolta dati, tutela dell'ambiente marino e delle infrastrutture marine. ← *sfida scelta*
3. **Refit navale e fine vita delle imbarcazioni** — recupero, riuso, riciclo e valorizzazione di materiali e componenti del settore nautico.
4. **Carburanti green e decarbonizzazione** — riduzione emissioni e transizione energetica del comparto marittimo.

> L'Organizzazione si riserva di modificare, integrare o aggregare le sfide.

### Criteri di valutazione dei progetti (Art. 10)

| # | Criterio | Descrizione |
|---|---|---|
| 1 | Innovatività | Originalità dell'idea e grado di innovazione |
| 2 | Impatto | Benefici economici, ambientali e sociali |
| 3 | Fattibilità | Sostenibilità tecnica, organizzativa, economica |
| 4 | Coerenza con la sfida | Rispondenza a esigenze e obiettivi della sfida |
| 5 | Qualità della presentazione | Chiarezza espositiva e capacità di valorizzare |
| 6 | **Applicabilità al territorio ligure** | Capacità di applicazione a territorio/economia liguri |

**Lettura strategica:** solo 1 criterio su 6 è puramente tecnico (fattibilità). Gli altri 5 si giocano su problema, narrazione e territorio. In un pitch da 4 minuti vince la storia più chiara e credibile supportata da una demo che funziona, non il progetto tecnicamente più avanzato.

---

## 3. Stato dell'arte — Robotica sottomarina + AI

Ricerca condotta su **OpenAlex API** (filtro pubblicazioni dal 2022, ordinamento per rilevanza, con conteggio citazioni). arXiv non raggiungibile dalla rete usata (HTTP 406/301 da proxy), Crossref con ranking inutilizzabile, Semantic Scholar rate-limited.

### Aree SATURE — evitare, qui si reinventa la ruota

| Area | Evidenza |
|---|---|
| Underwater object detection | Multiple review sistematiche: Neurocomputing 2023 (317 cit.), Sensors 2023 (108 cit.), survey 2024 (86 cit.). Più survey = campo affollato |
| Underwater image enhancement | Expert Systems w/ Appl. 2025 (93 cit.), Uncertainty Inspired UIE 2022 (252 cit.), Domain Adaptation for UIE, IEEE TIP 2023 (231 cit.) |
| Marine debris detection | YOLOv8 (2024, 79 cit.), YOLOv12n (2025), dataset dedicati in Scientific Data 2024 |
| Path planning AUV con RL | Applied Ocean Research 2022 (148 cit.), Ocean Engineering 2024 (52 cit.), IEEE Access 2024 |
| Sonar detection/segmentation | Survey 2022 (113 cit.), review su segmentazione 2025, IEEE TGRS 2022 (112 cit.) |

### Aree APERTE — qui c'è spazio

| Area | Evidenza | Note |
|---|---|---|
| **Digital twin subacqueo** | "Digital Twins Below the Surface" 2024 (21 cit.), "Underwater Simulators for Digital Twinning" 2024 (25 cit.), "Digital Twins in the Marine Industry" 2023 (60 cit.) | Recentissimi + poche citazioni = campo in apertura |
| **LLM / VLM nel dominio subacqueo** | La query dedicata **non ha prodotto foundation model multimodali marini**, solo computer vision classica | Spazio bianco quasi totale |
| **Salto detection → decisione/report** | La ricerca produce rilevamento, non interpretazione operativa. Caso 2025 su difetti in strutture subacquee (24 cit.) resta sul rilevare | Gap pratico non presidiato |
| Swarm cooperativo subacqueo | "Cooperative AI for underwater robotic swarm" 2023 (83 cit.), quasi isolato vs. swarm terrestri | Interessante ma non dimostrabile senza hardware |

**Conclusione:** il collo di bottiglia non è *rilevare*, è *interpretare e decidere*. L'AI generativa applicata al subacqueo è il vero spazio bianco.

> ⚠️ Nota di metodo: i dati sopra provengono da query reali su OpenAlex. L'analisi qualitativa delle soluzioni commerciali è invece basata su conoscenza pregressa e va validata prima del pitch.

---

## 3-bis. Stato dell'arte — Scansione 3D dei fondali e delle strutture subacquee

Verifica mirata: *esiste già il "robottino che scende, scansiona e crea una mappa 3D"?*
**Risposta: sì, è tecnologia matura. Lo scan 3D non è l'innovazione, è l'input.**

### Già maturo — non riproponibile come novità

| Tecnologia | Evidenza |
|---|---|
| **Batimetria multibeam (MBES)** | Standard industriale. Classificazione fondali da multibeam (IEEE J. Oceanic Eng. 2023), rilievi per costruzione/manutenzione portuale (Technical Annals 2024), survey semi-automatico (JMSE 2022) |
| **Fotogrammetria subacquea / SfM** | Pipeline operative già a software: "Matisse e 3DMetrics" (JMSE 2023, 27 cit.); overview ricostruzione 3D da immagini ottiche (JMSE 2023, 80 cit.); beni culturali subacquei (JMSE 2024) |
| **SLAM subacqueo** | Campo presidiato: overview SLAM subacqueo (Remote Sensing 2023, 68 cit.), SLAM + deep learning (Sensors 2025, 43 cit.), RU-SLAM (2024), SLAM batimetrico (Applied Ocean Research 2022) |
| **LiDAR / laser scanning subacqueo** | Single-photon LiDAR per ricostruzione 3D real-time in acqua torbida (Optics Express 2023, **127 cit.**); sistema scansione 3D per beni culturali (Remote Sensing 2023); green laser bathymetry (Sensors 2022, 95 cit.) |
| **3D di pile/strutture da sonar** | "3D Reconstruction and Visualization of Underwater Bridge Piers Using Sonar Imaging" (Sensors 2024); ispezione rapida ponti con sonar+camera+DL (Computer-Aided Civil Infr. 2024, 39 cit.) |
| **⚠️ 3D Gaussian Splatting subacqueo** | **Già esploso nel 2025:** UW-GS (17 cit.), Water-Adapted 3DGS (Frontiers Marine Sci.), relitto Melania, Gaussian Splashing. Se sembrava "nuovissimo", è già in corso |
| Difetti da point cloud | "Underwater Surface Defect Recognition of Bridges... Semantic Segmentation + 3D Point Cloud" (J. Bridge Eng. 2024, 28 cit.) |

### I 3 buchi reali emersi

1. **Monitoraggio multi-temporale (4D) subacqueo quasi assente.**
   La query su confronto multi-temporale sott'acqua ha restituito solo risultati su *superficie* (UAV su banchi di sabbia, frane, regioni polari) o non pertinenti. Si sa fare **una** scansione; **confrontare scansioni nel tempo sott'acqua** non è risolto. → Conferma diretta dell'idea di "memoria storica".

2. **Nessun incrocio tra LLM/VLM e dati 3D subacquei.**
   Il filone 3D+linguaggio esiste nel generico: PointCLIP (437 cit.), LL3DA (84 cit.), QA su scene 3D (48 cit.). La ricostruzione 3D subacquea esiste. **Ma i due mondi non si incontrano.** Nessuno interroga una point cloud subacquea in linguaggio naturale.

3. **Report di ispezione generati da LLM: vuoto nel dominio.**
   La query dedicata ha prodotto solo medicina e social science. L'automazione visiva in edilizia esiste (Automation in Construction 2022, 995 cit.) ma è detection classica, non reporting generativo.

### Contesto applicativo portuale

- SHM di porti e vie navigabili: già una review che parla di *developments and challenges* (Structural Health Monitoring 2023, 51 cit.) → problema riconosciuto e aperto.
- Digital twin marittimo/portuale: esiste ma orientato a **logistica e decarbonizzazione** (Pusan Newport 2023, 53 cit.; Digital Twin in Maritime Domain 2023, 113 cit.), **non alla salute strutturale subacquea delle banchine**.
- "High-definition shoreline digital twin from UAV-LiDAR-MBES fusion" (Int. J. Digital Earth **2026, 1 cit.**) → area appena nata.
- Danni a strutture portuali con ML: "Using Machine-Learning for the Damage Detection of Harbour Structures" (Remote Sensing 2022, solo 15 cit.) → poco presidiato.

### Conseguenza sul posizionamento

❌ **Non dire:** "facciamo lo scan 3D dei fondali" → esiste da anni.
✅ **Dire:** "prendiamo i dati che già si producono e li rendiamo **interrogabili e confrontabili nel tempo** con l'AI."

Lo scan 3D diventa un **mattone esistente** (come il VLM), non il contributo. Il contributo è il layer di comprensione e memoria.

---

## 3-ter. Stato dell'arte — Altri asset e livello prescrittivo

Verifica su cavi, scafi, e soprattutto sul salto da *descrivere* a *raccomandare come intervenire*.

### ⚠️ ATTENZIONE — un paper 2026 copre già il caso biofouling

> **"Automated Marine Biofouling Assessment: Benchmarking Computer Vision and Multimodal LLMs on the Level of Fouling Scale"** — arXiv 2026, 0 citazioni.

Qualcuno ha già testato LLM multimodali per valutare il biofouling su scafi secondo scala standard. Conseguenze operative:

- ❌ **Non usare il biofouling su scafi come caso centrale della demo** → collisione diretta.
- ✅ **Leggerlo prima dell'evento** (è su arXiv, accessibile). Citarlo nel pitch dimostra preparazione: *"esiste un primo benchmark accademico, noi portiamo l'approccio oltre la classificazione, verso la raccomandazione operativa e il multi-asset."*

### Asset dove c'è libertà

| Asset | Stato dell'arte | Spazio |
|---|---|---|
| **Cavi / pipeline sottomarini** | Solo detection classica: "YOLO-Submarine Cable" (JMSE 2022, 35 cit.), detection da sonar (PLoS ONE 2026), robot a morsetto (Machines 2023) | **Libero**: tutto rilevamento, zero comprensione |
| **Ispezione scafi (generale)** | Survey "Ship hull inspection" (Ocean Eng. 2023, 55 cit.), manovra autonoma ROV con coverage (J. Intell. Robotic Syst. 2024, 14 cit.) | Robotica e copertura, **non interpretazione del difetto** |
| **Banchine / opere portuali** | "Using ML for the Damage Detection of Harbour Structures" (Remote Sensing 2022, solo **15 cit.**) | **Poco presidiato** |

### Il livello prescrittivo: vuoto nel marittimo

La tecnologia esiste **in altri domini**, il dominio marittimo è scoperto. Posizione ideale: *"questo approccio è validato altrove, noi lo portiamo dove manca."*

| Filone | Dove esiste | Nel marittimo |
|---|---|---|
| Manutenzione **prescrittiva** | Review sistematica (Applied Sciences 2025, 13 cit.), TranDRL (2023), Industry 4.0 (2026) — tutto **industriale su serie temporali di sensori** | ❌ assente su ispezione visiva subacquea |
| **LLM per compliance normativa** | Solo edilizia/BIM: code compliance con LLM (Electronics 2025, **46 cit.**), BIM compliance (Buildings 2024, **97 cit.**), VLM agent for building code (2025) | ❌ **nessuno** |
| **Severity rating automatico** | Ponti (Communications Engineering 2026), strade (Sensors 2023, 60 cit.), pavimentazioni, corrosione acciaio con BIM (CivilEng 2025) | ❌ assente su opere marittime subacquee |
| **RAG su normative tecniche** | "Orchestrated RAG with Visual Verification for Multimodal Engineering Compliance" (SSRN 2026), RAG per requirements engineering (2026) | ❌ non applicato |

### I 3 livelli — il nostro posizionamento

| Livello | Cosa fa | Chi lo fa oggi |
|---|---|---|
| Descrittivo | "c'è una crepa" | YOLO & co. → **saturo** |
| Diagnostico | "è corrosione da cloruri, severità 3" | poco, su altri domini |
| **Prescrittivo** | "intervieni entro 6 mesi, con questa tecnica, questa priorità" | **vuoto nel marittimo** ← *noi* |

Nome del salto da usare in pitch: **da detection a decision support**.

### ⚖️ Avvertenza su responsabilità professionale

Suggerire un intervento su infrastruttura critica ha implicazioni legali. Se il sistema dice "non urgente" e la banchina cede, il problema non è tecnico. Come inquadrarlo:

- Il sistema **prepara la decisione**, non la prende. Produce una bozza che l'ingegnere firma.
- Le raccomandazioni devono essere **ancorate a riferimenti** reali, non inventate → **è qui che entra il RAG**: l'output cita la fonte invece di improvvisare.
- In pitch: *"non sostituiamo l'ispettore, gli togliamo il lavoro meccanico e gli lasciamo il giudizio."*

Il RAG non è un orpello: trasforma il progetto da *"chiediamo a un LLM cosa pensa"* a *"sistema che collega osservazione e norma tecnica"*. Molto più solido davanti a una giuria ingegneristica.

---

## 3-quater. Stato dell'arte — Frangiflutti e difese costiere

Spunto con **l'aggancio ligure più immediato** e un vantaggio pratico notevole sui dati.

### Già esistente

| Tecnologia | Evidenza |
|---|---|
| **Fotogrammetria da drone su frangiflutti** | "On-Site Stability Assessment of Rubble Mound Breakwaters Using UAV-Based Photogrammetry" (Remote Sensing 2024, 10 cit.); "UAV-SfM Photogrammetry to Monitor Deformations of Coastal Defense Structures" (Remote Sensing 2024, 8 cit.); NDT con droni su calcestruzzo marino (2025) |
| **ML su frangiflutti** | Predizione stability number (2022, 18 cit.), predizione livello di danno (2023, 12 cit.) — ma da **parametri idraulici**, non da immagini |
| **Misura danno armatura** | Sensori embedded per "rocking" dei massi (2023, 2024), rugosità superficiale (Coastal Engineering 2022, 11 cit.), "Monitoring damage evolution of rubble mound structures" (2025) |
| **Degrado prematuro riconosciuto** | "**Forensic Evaluation of Premature Breakwater Degradation**" (2026) → problema documentato in letteratura |

### I gap

1. **Nessun VLM/LLM su opere di difesa costiera.** La ricerca è divisa tra idraulica marittima (modelli fisici, ML su parametri) e rilievo geometrico (fotogrammetria). Nessuna comprensione visiva generativa.
2. **Change detection su opere costiere quasi vuoto.** La query ha restituito mangrovie, eDNA, falesie slovene, satelliti Landsat. Non monitoraggio multi-temporale strutturato di dighe. **Stesso gap del subacqueo, confermato due volte.**
3. **Dal rilievo alla decisione: manca.** La fotogrammetria produce nuvole di punti e volumi. Chi traduce in *"questo masso si è spostato, priorità media, verifica prima dell'inverno"*? Nessuno.

### Perché è strategicamente forte

**Aggancio ligure imbattibile:**
- Nuova **diga foranea di Genova**, cantiere in corso, monitoraggio per decenni.
- Dighe foranee storiche di Genova, Savona, La Spezia, Imperia.
- **Mareggiata dell'ottobre 2018**: devastò le opere costiere liguri. Evento che chiunque in giuria ricorda.
- Erosione costiera tema nazionale caldo: "Resist or retreat? Beach erosion and the climate crisis in Italy" (Applied Geography 2024, 18 cit.).

**Vantaggio pratico decisivo — i video esistono.** Le dighe sono sopra o a filo d'acqua:
- riprese da drone, terra, barca abbondanti e reperibili;
- qualità immagine molto migliore del subacqueo torbido → **il VLM lavora meglio**;
- esistono foto storiche delle mareggiate per il confronto temporale;
- puoi filmare tu stesso una diga ligure prima dell'evento.

**Comprensibilità visiva:** una diga con massi spostati si capisce in 2 secondi. Una crepa su palancola subacquea richiede spiegazione. In 4 minuti di pitch questa differenza pesa.

### ⚠️ Rischio e come si risolve

La sfida 2 parla di *"robotica sottomarina e tecnologie subacquee"*. Una diga fotografata da drone **non è subacquea** → rischio sul criterio 4 (coerenza).

**Soluzione di posizionamento:** il frangiflutti ha parte emersa **e sommersa** (piede, basamento, scour al piede, berma sommersa). Il monitoraggio completo richiede entrambe.

> Posizionamento corretto: **ispezione integrata emerso + sommerso delle opere di difesa costiera**, con ROV sulla parte subacquea e drone sull'emersa, un unico motore di comprensione AI.

Lo scour al piede è la giunzione naturale tra i due mondi, documentata: "Field and laboratory investigation into scour around breakwaters" (2024), scour davanti a seawall durante mareggiate invernali (Frontiers in Marine Science 2022, 15 cit.).

---

## 3-quinquies. Boa tecnologica / nodo residente — verifica

Spunto valutato: *una boa collegata al ROV per alimentazione e comunicazioni.*

### Esiste già, in più forme

Il concetto si chiama **"resident ROV" / "subsea residency"**, consolidato nell'oil & gas offshore:

| Evidenza | Fonte |
|---|---|
| "Docking and Persistent Operations for a **Resident** Underwater Vehicle" | IEEE J. Oceanic Eng. 2026 |
| "Underwater Docking Approach and Homing to Enable **Persistent Operation**" | Frontiers in Robotics and AI 2021, 43 cit. |
| "Docking to an underwater **suspended charging station**" | Ocean Engineering 2022, **78 cit.** |
| "Sparus Docking Station" | J. Field Robotics 2024, 11 cit. |
| "Energy Storage to Enable Monitoring Through **AUV Charging and Communication**" | Offshore Technology Conference 2024 |
| "The Concept of the **Unmanned Surface Vehicle for the Observation-class ROV**" | 2021 — letteralmente il concetto, con ASV invece di boa |
| "Leader-Follower Motion Control for a **USV Tracking a Hybrid ROV** in Subsea Cable Inspection" | 2026 |
| Boe a energia d'onda / solare | "Recent Progress on Wave Energy Marine Buoys" (JMSE 2022, 71 cit.), "Powering data buoys using wave energy" (2022, 54 cit.), boe LoRaWAN (Ocean Eng. 2024, 34 cit.) |

Sul mercato (da verificare): subsea residency è realtà commerciale offshore — Saipem (Hydrone/FlatFish), Oceaneering (Freedom), Blue Logic, docking station con ricarica e comunicazione.

### Giudizio: non perseguire come core

- **È stato dell'arte, non innovazione.**
- **È hardware.** Senza officina, componenti e test in acqua, in 2 giorni resta un disegno su slide → penalizza il criterio fattibilità.
- Il collo di bottiglia vero **non è alimentare il ROV, è la banda**. Via cavo: banda ma raggio limitato e rischio impigliamento. Senza cavo: comunicazione acustica a pochi kbit/s, insufficiente per video. È per questo che la ricerca su resident ROV insiste su docking ed elaborazione a bordo.

### ✅ Come recuperare l'intuizione — rafforza il software

Se la banda è il limite, la cosa sensata **non è trasmettere il video, è trasmettere la comprensione**:

> Un VLM che gira sul nodo (boa o edge a bordo) analizza il video localmente e invia solo il risultato: poche centinaia di byte di testo strutturato invece di gigabyte di video. *"Banchina 12, corrosione severità 3, intervento entro 6 mesi."*

Benefici argomentativi:
- giustifica tecnicamente il **monitoraggio continuo** invece di ispezioni spot;
- spiega **perché serve l'AI a bordo**: non c'è banda per fare altrimenti;
- alimenta la memoria storica automaticamente, senza intervento umano;
- coerente con **edge computing**, tema credibile e attuale.

In pitch: slide di visione, non prototipo. *"Il nostro motore è progettato per girare on-edge, perché sott'acqua la banda non c'è. Questo abilita il monitoraggio permanente con nodi residenti, che l'industria offshore già usa."*

---

## 4. L'idea scelta

### Nome di lavoro
**Copilota AI per l'ispezione subacquea delle infrastrutture portuali liguri**

### Il problema
Le banchine, le dighe foranee e le palancole dei porti liguri vengono ispezionate da sommozzatori e ROV. Ogni ispezione produce **ore di video** che un tecnico deve rivedere manualmente. Il risultato:

- revisione lenta e costosa, dipendente dalla disponibilità di personale specializzato;
- valutazione soggettiva, variabile da operatore a operatore;
- **nessuna memoria storica strutturata** del degrado: non si sa se una lesione è peggiorata rispetto all'ispezione precedente;
- impossibilità di pianificare la manutenzione in modo predittivo.

### La soluzione
Un sistema che prende il video di ispezione e, tramite un **Vision-Language Model** guidato da un *system prompt* costruito sul dominio delle opere marittime, produce:

1. **Descrizione in linguaggio naturale** di ciò che si osserva, in italiano tecnico da ispettore;
2. **Report strutturato** con anomalie rilevate, posizione, severità stimata, timestamp;
3. **Priorità di intervento** suggerita;
4. **Memoria storicizzata**: ogni segnalazione geotaggata (punto banchina + data), così alla ispezione successiva il sistema confronta e segnala l'evoluzione ("questa lesione era 2 cm a marzo, oggi è 5 cm").

### Perché NON è "l'ennesimo YOLO"

| Object detection classico (YOLO & co.) | Vision-Language Model |
|---|---|
| Box attorno a classi **predefinite** | Descrive e **ragiona** in linguaggio naturale |
| Richiede dataset etichettato | **Zero-shot**, nessun training |
| Cieco su anomalie non previste | Descrive anche ciò che non ha mai visto |
| Output: coordinate + label | Output: valutazione, contesto, raccomandazione |

La novità sta nell'**orchestrazione e nel system prompt di dominio**, non in un modello nuovo. Perfetto per 2 giorni: si compone, non si addestra.

### Doppio gap colpito
1. AI generativa / VLM nel subacqueo → spazio bianco (confermato dalla ricerca).
2. Digital twin di ispezione → emergente e non saturo.

### ✅ DECISIONE DI SCOPE: video + VLM come cuore, 3D in roadmap

Scelta confermata dopo la verifica sullo stato dell'arte 3D (§3-bis).

| | Video + VLM (**scelto per i 2 giorni**) | Pipeline 3D completa (roadmap) |
|---|---|---|
| Fattibilità in 2 gg | **Alta** — nessun training, nessuna elaborazione pesante | Bassa: fotogrammetria richiede tempo di calcolo e dati di qualità |
| Rischio demo | Basso | Alto |
| Innovatività | Alta: VLM nel subacqueo è spazio bianco | Alta ma 3DGS subacqueo è già occupato (2025) |
| Dati necessari | Video pubblici di ispezione | Dataset 3D o acquisizione dedicata |

**Come gestire il 3D nel pitch:** presentarlo come **estensione naturale della roadmap**, eventualmente con un mockup statico. Si guadagna la visione ambiziosa senza rischiare la demo.

**Frase per il pitch:**
> "Lo scan 3D dei fondali esiste già ed è maturo. Il problema non è acquisire i dati, è **capirli** e **confrontarli nel tempo**. Noi partiamo dal video, che ogni ispezione già produce, e lo rendiamo comprensibile. Il passo successivo è portare lo stesso layer di intelligenza sopra le ricostruzioni 3D."

Questo posizionamento ha un vantaggio difensivo: se in giuria c'è un esperto di rilievi subacquei, sa benissimo che MBES e fotogrammetria sono standard. Dichiararlo per primi evita di sembrare ingenui e dimostra padronanza del dominio.

### 🔑 Il posizionamento definitivo: un motore, N asset

L'intuizione chiave emersa: **non sono progetti diversi, è lo stesso motore applicato ad asset diversi.** L'operatore seleziona il caso d'uso, che carica *system prompt + knowledge base RAG* dedicati.

| Asset | Stato nel prototipo | Nota |
|---|---|---|
| **Banchine e opere di accosto** | ✅ implementato | Caso principale, aggancio porti liguri |
| **Dighe frangiflutti e difese costiere** | ✅ implementato | Emerso + sommerso, dati video facili |
| Scafi (refit, biofouling, danni) | 🔒 scheda bloccata | ⚠️ attenzione paper 2026 su biofouling+LLM |
| Cavi e condotte sottomarine | 🔒 scheda bloccata | Terreno libero, solo detection in letteratura |

**Perché rafforza il pitch:**
- **Impatto** → non risolvi un problema, ne risolvi una *classe*.
- **Fattibilità economica** → un motore con prompt e KB diversi per asset è modello scalabile, non prodotto one-off.

**Regola per non sembrare dispersivo:** *una demo profonda su un asset, gli altri come schede di scalabilità.* Mai dimostrare tutto, male. Le due schede bloccate nel prototipo comunicano estensibilità a costo zero.

### La catena del valore: osservazione → diagnosi → azione

Ogni anomalia nel referto segue tre blocchi distinti, visivamente separati:

1. **Osservazione** — cosa si vede, senza interpretazione.
2. **Diagnosi probabile** — interpretazione tecnica, dichiarata come tale.
3. **Azione raccomandata** — cosa fare, entro quando, **con citazione della fonte normativa**.

Questa separazione è deliberata: è ciò che rende il sistema difendibile. Il modello non confonde ciò che vede con ciò che deduce.

---

## 5. Scelta architetturale: post-processing (+ tocco live nel pitch)

**Decisione:** il cuore è il **post-processing** (carichi il video → ottieni report). Nella demo si mostra un breve momento *in stile live* su una clip corta, solo per effetto scena.

| | Post-processing (scelto) | Real-time puro (scartato come base) |
|---|---|---|
| Fattibilità in 2 gg | Alta, controllabile | Bassa, streaming fragile |
| Rischio in pitch | Basso | Alto: se si rompe, perdi tutto |
| Gestione allucinazioni | Buona: c'è tempo per validazione e confidence | Difficile |
| Dove sta il valore | Report, storico, priorità → **qui** | Spettacolo |

### Architettura

```
[0] SELEZIONE CASO D'USO  ← l'operatore scegle l'asset
        │   carica system prompt di dominio + knowledge base dedicata
        ▼
Video ispezione (ROV / drone / sommozzatore)
        │   opzionale: selezione area di interesse sul fotogramma
        ▼
[1] Pre-processing frame
    · estrazione frame significativi (sampling + scarto ridondanti)
    · enhancement immagine subacquea (commodity, libreria esistente)
        │
        ▼
[2] Vision-Language Model
    · system prompt di dominio: opere marittime, difetti tipici,
      terminologia da ispettore, scala di severità 1-4
    · output vincolato a schema JSON
    · regola esplicita: separare OSSERVAZIONE da DIAGNOSI
        │
        ▼
[3] RAG su knowledge base tecnica        ← differenziatore chiave
    · recupero passi normativi pertinenti al difetto rilevato
    · ancoraggio della raccomandazione a fonte citabile
        │
        ▼
[4] Layer di dominio
    · normalizzazione severità
    · geotag (progressiva banchina / sezione diga + profondità + timestamp)
    · calcolo priorità e scadenza di intervento
        │
        ▼
[5] Memoria storica / mini digital twin
    · persistenza segnalazioni
    · confronto con ispezioni precedenti → delta e trend di degrado
        │
        ▼
[6] Output
    · referto strutturato: osservazione → diagnosi → azione + fonti
    · dashboard con marker, confidenza, confronto temporale
    · validazione umana: l'ispettore conferma / corregge ogni segnalazione
```

> Nota architetturale: lo stadio [3] è quello che distingue il progetto da *"abbiamo chiamato un LLM su un video"*. Anche con soli 4 documenti indicizzati l'effetto in pitch è forte: l'output dice *"severità 3 secondo [rif., §X]"* invece di affermarlo a vuoto.

### Scelte tecniche consigliate
- **VLM:** un modello commerciale con visione (GPT-4o / Gemini / Claude) per la demo, per velocità e qualità. Menzionare nel pitch la possibilità di modelli aperti (Qwen-VL, LLaVA) per deployment on-premise, tema rilevante per dati infrastrutturali sensibili.
- **Output vincolato:** forzare JSON schema riduce le derive del modello e rende il report deterministico.
- **Enhancement:** usare libreria esistente come pre-processing. È commodity, non è il contributo.
- **Stack demo:** qualunque cosa veloce. La demo conta, non l'eleganza del codice.

### ❌ Scartato deliberatamente: video 360 con navigazione a joystick

Valutato e scartato. Ragioni:

| Problema | Dettaglio |
|---|---|
| **Zero punti in griglia** | Nessun criterio dell'Art. 10 premia la qualità dell'interfaccia. È demo candy. |
| **Costo opportunità alto** | Ogni ora sul player sferico è un'ora non spesa su RAG, referto, confronto temporale — che fanno punteggio |
| **I VLM lavorano male su equirettangolare** | Frame 360 piatto è geometricamente distorto: linee curve, proporzioni alterate. Servirebbe estrarre viewport rettilineo prima dell'invio |
| **⚠️ Da verificare: i ROV producono 360?** | La maggioranza ha camere frontali HD, a volte stereo. Non è standard. Se in giuria c'è chi lavora con ROV e dice *"i nostri non fanno 360"*, il pitch si incrina |

**✅ Versione recuperata a basso costo:** l'idea buona dentro il 360 è *"se l'operatore guarda un punto, quel punto è l'input per il VLM"*. Implementata come **selezione area sul fotogramma**: l'operatore traccia un rettangolo e il sistema analizza quella porzione nel contesto del caso d'uso. Stesso valore interattivo, frazione del lavoro, nessun problema di proiezione. Già nel prototipo.

---

## 5-bis. Il prototipo: MARIS

**Posizione:** `maris-demo/` · **Avvio:** doppio click su `index.html`

### Scelta tecnica: zero dipendenze

Primo tentativo con Vite + React **fallito**: il binario nativo di esbuild si corrompe quando npm gira da WSL sul filesystem Windows. Riscritto in HTML/CSS/JS puro.

**Il fallimento è diventato un vantaggio:**

| | Zero dipendenze (scelto) | Build step (scartato) |
|---|---|---|
| Avvio | Doppio click | `npm install` + dev server |
| Dipendenza da rete | **Nessuna** | Registry npm |
| Rischio al Salone Nautico | **Nessuno** | Wifi di padiglione fieristico |
| Righe di codice | ~2.100 | — |

> In un pitch da 4 minuti, una demo che richiede build è una demo che può rompersi. La wifi di una fiera è l'ultima cosa su cui scommettere.

### Struttura

```
maris-demo/
  index.html    markup (18 righe)
  styles.css    stile, nessun framework (1.215 righe)
  data.js       casi d'uso, system prompt, knowledge base, referti (300)
  app.js        rendering e logica (609)
  README.md     istruzioni e note per il pitch
```

### Cosa dimostra, in ordine di importanza per il pitch

1. **Selettore di caso d'uso** → apri il pannello "Contesto caricato" e mostra che il *system prompt cambia* tra banchina e frangiflutti. Prova visiva del motore orizzontale.
2. **Catena osservazione → diagnosi → azione** → non detection, decision support.
3. **Citazioni normative** su ogni raccomandazione → ancoraggio, non invenzione.
4. **Confronto temporale** (card "Corrosione estesa su palancola", +125% in 6 mesi) → il momento memorabile.
5. **Confidenza 58% sul terzo finding** con dichiarazione esplicita che la torbidità impedisce stima affidabile → anticipa l'obiezione sulle allucinazioni mostrando che il sistema dichiara la propria incertezza.
6. **Disclaimer finale** → copilota, non giudice.

### Verifica eseguita

64 controlli headless su dati di dominio, rendering nei vari stati, pipeline, escaping XSS. Tutti superati.

### ⚠️ Da sostituire prima dell'evento

- [ ] Dati di analisi: attualmente **simulati** (dichiarato in UI e README). Collegare VLM reale sostituendo `ANALYSES` in `data.js`, mantenendo lo schema.
- [ ] Riferimenti normativi: attualmente generici. **Sostituire con documenti reali e citabili** → è il salto che rende il RAG credibile davanti a una giuria ingegneristica.
- [ ] Video: sostituire con riprese reali di banchine o dighe liguri.

---

## 5-ter. Dove trovare i video per la demo

### Dataset scientifici con DOI (solidi e citabili)

Paper di tipo *data descriptor*, pubblicati per rilasciare il dataset. Citarli in slide dà rigore.

| Dataset | DOI | Note |
|---|---|---|
| **UVMulti** — benchmark video subacquei multi-task (Scientific Data 2026) | `10.1038/s41597-026-07402-0` | **Partire da qui**: a livello di video, non solo frame |
| Detection/segmentazione rifiuti marini acque basse (Scientific Data 2024) | `10.1038/s41597-024-03759-2` | Ben documentato |
| **Virtual Underwater Datasets for Autonomous Inspections** (JMSE 2022) | `10.3390/jmse10091289` | Sintetici, open access MDPI. Limite di realismo ma facili |
| Multibeam forward-looking sonar (Scientific Data 2022) | `10.1038/s41597-022-01854-w` | Caso sonar, meno adatto al VLM |
| Multi-label Video Classification for Underwater Ship Inspection (arXiv 2023) | `10.48550/arxiv.2305.17338` | Accessibile, dominio vicino |

> ⚠️ I siti editoriali sono filtrati dalla rete usata (MDPI 403, Nature 303): aprire i link dal browser.

### Video reali sul web (per il realismo)

Serve almeno un video *vero*: l'output del VLM su immagini reali è molto più convincente.

- **YouTube** (accessibile, verificato). Query: *"ROV inspection quay wall"*, *"underwater pier inspection"*, *"ispezione subacquea banchina"*, *"commercial diver inspection harbour"*.
- **Canali produttori ROV**: Blueye Robotics, Deep Trekker, QYSEA, Chasing → video dimostrativi di ispezioni su banchine e scafi, buona qualità, inquadrature tipiche.
- **NOAA Ocean Exploration** → archivi video ROV in pubblico dominio (agenzia federale USA). Ottima licenza, meno specifico su banchine.
- **Frangiflutti**: molto più facile — riprese da drone/terra/barca, qualità superiore, no torbidità. Possibile filmare direttamente una diga ligure.

### ⚖️ Licenze — è un punto di pitch

Un commissario attento può obiettare su un video preso senza verificare la licenza.

- Preferire dataset scientifici con licenza esplicita (tipicamente CC-BY) e **citarla in slide**.
- Su YouTube filtrare per licenza Creative Commons dove possibile.
- Altrimenti dichiarare in slide: *"video a scopo dimostrativo, fonte: X"*.

### Strategia a tre livelli

1. **Un dataset scientifico con DOI** (UVMulti) → rigore.
2. **Un video reale** di ispezione banchina/diga → realismo, effetto "mondo vero".
3. **Due clip dello stesso punto in momenti diversi** → il momento wow. Se non trovi lo stesso punto a distanza di tempo, **simula dichiarandolo**: l'onestà non toglie forza, il concetto resta chiaro.

> **Nota pratica critica:** scarica i video **prima dell'evento**, non al Salone Nautico. Tutto su disco locale, insieme al video di backup della demo.

---

## 6. Limiti noti e come trasformarli in punti di forza

| Limite reale | Come gestirlo nel progetto e nel pitch |
|---|---|
| **Allucinazioni del VLM** | Progettare con umano nel loop: il sistema **propone**, l'ispettore **valida**. "È un copilota, non un giudice." Mostrare confidence score. |
| **Immagini subacquee degradate** (torbidità, colori) | Enhancement come pre-processing standard. Dichiarare che è commodity matura, non contributo nostro. |
| **Validazione su dati reali limitata** | Dichiararlo apertamente: prototipo su video pubblici, prossimo passo = pilota con Autorità di Sistema Portuale. |
| **Dipendenza da modello di terzi** | Trasparenza: "il VLM è di terzi, il valore nostro è il layer di dominio, il reporting storicizzato e l'aggancio portuale." Possibile migrazione a modelli aperti. |
| **⚖️ Responsabilità professionale** su raccomandazioni di intervento | Il sistema prepara la decisione, non la prende. Raccomandazioni ancorate a normativa via RAG. L'ingegnere firma. |
| **Paper 2026 su biofouling + LLM multimodali** | Non usare il biofouling come caso centrale. Leggerlo e citarlo: *"esiste un primo benchmark, noi andiamo oltre la classificazione verso la raccomandazione e il multi-asset."* |

> Dimostrare consapevolezza dei limiti sposta il progetto da "figo ma ingenuo" a "figo e maturo". Le giurie tecniche premiano l'onestà e puniscono l'arroganza.

---

## 7. L'aggancio ligure

Elemento chiave per il criterio 6 (applicabilità al territorio), **e** leva di autenticità personale (sono nato in Liguria).

**Contesto portuale ligure:**
- **Autorità di Sistema Portuale del Mar Ligure Occidentale** — Genova, Savona-Vado.
- **Autorità di Sistema Portuale del Mar Ligure Orientale** — La Spezia.
- Infrastrutture critiche e in parte datate: banchine, palancole, dighe foranee, pile.
- **Nuova diga foranea di Genova** in costruzione: opera marittima enorme che richiederà monitoraggio strutturale per decenni.
- Tema politicamente e ingegneristicamente caldo: manutenzione delle opere marittime, mareggiate intense, sicurezza infrastrutturale.

**Messaggio per la giuria:**
> "Le ispezioni subacquee delle banchine liguri oggi dipendono da sommozzatori e da ore di revisione video manuale. Il nostro copilota AI le rende più veloci, più tracciabili e storicizzate nel tempo."

**TODO prima dell'evento:** cercare almeno **un dato o documento reale** (bando di manutenzione, piano operativo triennale di un'AdSP, dato di spesa per ispezioni subacquee). Un numero vero rende il pitch inattaccabile.

---

## 8. Cosa fa vincere — strategia

### Principio guida
In un hackathon con pitch da 4 minuti **non vince il progetto tecnicamente più avanzato, vince la storia più chiara, credibile e memorabile supportata da una demo che funziona.** 5 criteri su 6 non sono tecnici.

### Le 5 leve

1. **Problema reale e specifico, non generico.**
   Non "aiutiamo le ispezioni subacquee" ma "le banchine di Genova si ispezionano a mano, ore di video riviste da un tecnico, zero memoria storica del degrado".

2. **Demo che funziona su un caso vero.**
   Meglio piccola e reale che grande e finta. 2–3 video pubblici di ispezione subacquea reale, passati al VLM con il system prompt di dominio, con output in italiano tecnico. Vedere l'output vero vale più di dieci slide di architettura.

3. **Il "momento wow": la memoria storica.**
   Il confronto temporale ("questa lesione era 2 cm a marzo, 5 cm oggi") è ciò che la giuria ricorda. Trasforma il progetto da descrittore di video a **sistema di manutenzione predittiva**. Anche simulato con dati plausibili funziona.

4. **Onestà sui limiti come punto di forza.**
   Dichiarare allucinazioni e umano nel loop prima che lo chieda la giuria.

5. **Taglio ligure autentico.**
   Non retorica, motivazione genuina. La territorialità è criterio esplicito e l'autenticità in 4 minuti si sente.

### Autovalutazione sui 6 criteri

| Criterio | Forza | Come massimizzarlo |
|---|---|---|
| Innovatività | **Alta** | Gap confermato su 3 ricerche: VLM nel subacqueo, livello prescrittivo nel marittimo, change detection 4D. Marcare la differenza da YOLO. |
| Impatto | **Alta** | Quantificare ore risparmiate. Insistere sul motore multi-asset: una *classe* di problemi, non uno. |
| Fattibilità | **Alta** | Nessun training. Prototipo già funzionante e verificato. Zero dipendenze = zero rischio di rottura. |
| Coerenza con la sfida | **Alta** | Sfida 2 cita "monitoraggio, manutenzione, raccolta dati, tutela infrastrutture marine". ⚠️ Se si usano i frangiflutti, posizionare come **emerso + sommerso**. |
| Qualità presentazione | **⚠️ Da costruire** | **Punto più debole.** 4 minuti sono pochissimi. Video demo registrato + almeno 3 prove cronometrate. |
| Territorialità ligure | **Alta** | Porti liguri, diga foranea, mareggiata 2018, AdSP. **Serve un dato reale.** |

---

## 9. Piano operativo per i 2 giorni

> **Vantaggio di partenza:** il prototipo UI è **già costruito e verificato**. Le 2 giornate si concentrano su VLM reale, RAG con documenti veri e pitch, non sul frontend.

### Scope per priorità

**MUST HAVE** — senza questi non c'è progetto:
1. ✅ Selettore caso d'uso che carica system prompt dedicato *(fatto)*
2. Analisi VLM reale su frame estratti dal video
3. ✅ Referto strutturato con severità e azione consigliata *(fatto, dati simulati)*
4. **RAG anche minimale**: 3-4 documenti tecnici *reali* indicizzati per un caso d'uso, con citazione in output

**SHOULD HAVE** — il valore competitivo:
5. ✅ Confronto temporale su due ispezioni *(fatto, simulato)*
6. ✅ Selezione area sul fotogramma *(fatto)*

**NICE TO HAVE** — solo se avanza tempo:
7. Video 360 con navigazione
8. Secondo e terzo caso d'uso popolati davvero

> **Il punto 4 è il più importante.** Il RAG è ciò che distingue il progetto da *"abbiamo chiamato GPT su un video"*. Anche con 4 soli PDF di linee guida indicizzati, l'effetto nel pitch è enorme.

### Sabato 3/10, 13:00–20:00
| Orario | Attività |
|---|---|
| 13:00–14:00 | Allineamento team, assegnazione ruoli, demo del prototipo esistente |
| 14:00–15:00 | Raccolta video reali + reperimento documenti tecnici per il RAG |
| 15:00–17:00 | **Core:** iterazione system prompt di dominio + schema JSON output su VLM reale |
| 17:00–19:00 | Pipeline: estrazione frame → VLM → referto. Indicizzazione documenti RAG. |
| 19:00–20:00 | Primo output end-to-end su video reale. **Checkpoint: se non gira, semplificare.** |

### Domenica 4/10, 08:30–13:30
| Orario | Attività |
|---|---|
| 08:30–09:30 | Collegamento RAG → citazioni reali nel referto |
| 09:30–10:30 | Confronto temporale su due ispezioni reali (o simulato, dichiarandolo) |
| 10:30–11:00 | **Registrazione del video della demo** (60–75 s) |
| 11:00–12:00 | Slide del pitch (max 7-8 slide per 4 minuti) |
| 12:00–13:00 | **Prove del pitch a voce, cronometrate su 4 minuti.** Almeno 3 giri. |
| 13:00–13:30 | Buffer + verifica che tutto sia su disco locale |

> **Regola d'oro:** il **video registrato della demo** non è un backup, con 4 minuti è il **piano A**. Il live è troppo rischioso.

### Divisione ruoli suggerita (team 3–5 persone)
- **AI/prompt engineering** — system prompt, VLM, schema output *(il tuo ruolo naturale)*
- **Backend/pipeline** — estrazione frame, persistenza, confronto storico
- **Frontend/dashboard** — visualizzazione, report
- **Dominio/business** — ricerca dati reali porti liguri, modello di impatto, validazione terminologia tecnica
- **Pitch/storytelling** — slide e presentazione

---

## 10. Scheletro del pitch — ⏱️ 4 MINUTI

> ⚠️ **Durata aggiornata: 4 minuti, non 5.** Perdere 1 minuto su 5 è il **20% del tempo**.
> Conseguenza diretta: **niente demo live.** Serve un **video registrato della demo**, montato,
> 60–75 secondi massimo, che mostri solo il percorso essenziale. Nessuna attesa di caricamento,
> nessuna chiamata API in diretta.

| Tempo | Sezione | Contenuto |
|---|---|---|
| 0:00–0:30 | **Il problema** | Banchine/dighe liguri ispezionate a mano, ore di video, zero memoria storica. Secco e concreto. Un dato reale se disponibile. Tocco personale: sono ligure. |
| 0:30–0:50 | **Perché ora** | Detection è saturo. Manca la comprensione. I VLM rendono possibile oggi ciò che 2 anni fa non era. |
| 0:50–2:10 | **Demo registrata** | Selezione caso d'uso → analisi → referto con raccomandazione e **fonte citata**. ⅓ del tempo: è ciò che convince. |
| 2:10–2:40 | **Il momento wow** | Confronto temporale: il difetto che cresce. Da descrizione a manutenzione predittiva. |
| 2:40–3:10 | **Il motore orizzontale** | Una slide, 4 asset. Scalabilità: un motore, N domini. |
| 3:10–3:30 | **Limiti e maturità** | Copilota non giudice. L'ispettore valida. Il RAG ancora le fonti. Possibile on-premise/edge. |
| 3:30–4:00 | **Roadmap + follow-up** | Estensione su 3D (MBES/fotogrammetria già nei porti). Pilota con AdSP. Aggancio a "Call for solution - fase 1" di CIIRCLE. |

### Roadmap da mostrare (una slide)

| Fase | Contenuto | Stato |
|---|---|---|
| **1. Oggi (hackathon)** | Video ispezione → report in linguaggio naturale + memoria storica | ✅ demo funzionante |
| **2. Breve termine** | Integrazione con dati 3D esistenti (MBES, fotogrammetria) già prodotti dai porti | 🔜 roadmap |
| **3. Medio termine** | Confronto geometrico multi-temporale: degrado quantificato in millimetri | 🔜 gap di ricerca reale |
| **4. Visione** | Interrogazione in linguaggio naturale del digital twin della banchina: *"quali zone della banchina 12 sono peggiorate dall'ultima ispezione?"* | 🎯 nessuno lo fa oggi |

### Frasi chiave da usare
- "Non rileviamo oggetti. **Capiamo** cosa sta succedendo sott'acqua."
- "È un **copilota**, non un giudice: l'ispettore valida sempre."
- "Oggi ogni ispezione nasce e muore in un video. Noi le diamo **memoria**."
- "Non chiediamo a un LLM cosa pensa. **Colleghiamo osservazione visiva e norma tecnica.**"
- "Lo scan 3D esiste già. Il problema non è acquisire i dati, è **capirli**."
- "Un motore, quattro asset. Non risolviamo un problema, ne risolviamo una **classe**."

---

## 11. Checklist candidatura (Art. 3, 5, 7)

- [ ] Mail a `hackathonciircle@ge.camcom.it` **entro 25/09/2026 ore 17:00**
- [ ] Domanda di candidatura compilata completa (le incomplete possono essere escluse)
- [ ] Profilo di provenienza: 1 sola scelta
- [ ] Ambito di competenza: fino a 2 scelte → suggerito **Tecnologia e sviluppo** + uno tra *Ricerca e dominio* / *Comunicazione e impatto*
- [ ] Motivazione espressa: valorizzare origine ligure e interesse per Blue Economy (pesa in selezione, Art. 7)
- [ ] Verificare disponibilità **entrambi i giorni, in presenza** (obbligatoria)
- [ ] Candidatura individuale o team già formato (min 3 / max 5)

---

## 12. Domande aperte / da verificare

- [ ] Natura del riconoscimento (Art. 11 rimanda a comunicazione pre-evento) — verificare se premio in denaro
- [ ] Contenuto dell'**Avviso pubblico** collegato al regolamento (Art. 15 lo cita come vincolante)
- [ ] Dettagli della **"Call for solution - fase 1"**: è lì il potenziale valore economico
- [ ] Reperire video pubblici di ispezione subacquea di banchine/opere marittime
- [ ] Trovare almeno un dato reale su costi/frequenza ispezioni subacquee nei porti liguri
- [ ] Verificare terminologia tecnica corretta per difetti di opere marittime (per il system prompt)
- [ ] Verificare se le AdSP liguri già producono rilievi MBES/fotogrammetrici delle banchine (rafforzerebbe la roadmap: i dati 3D esistono già, basta renderli comprensibili)
- [ ] **Leggere il paper arXiv 2026 su biofouling + LLM multimodali** → per citarlo e differenziarsi
- [ ] **Reperire 3-4 documenti tecnici reali** per il RAG (linee guida ispezione opere marittime, scale di condizione, raccomandazioni su scour). Priorità alta: è il differenziatore
- [ ] **Verificare se i ROV da ispezione producono video 360** → prima di menzionarlo in pitch
- [ ] Scaricare tutti i video **prima dell'evento** su disco locale
- [ ] Registrare il video della demo (60–75 s)

---

## Appendice — Alternative valutate e scartate

| Idea | Valutazione |
|---|---|
| **Active perception** (robot che decide dove guardare con pochi dati) | Alta innovatività ma vicina al territorio saturo del path planning RL. Rischiosa in demo. |
| **Swarm cooperativo subacqueo** | Gap reale e interessante, ma non dimostrabile senza hardware in 2 giorni. |
| **Digital twin puro del molo** | Buona, assorbita come componente dell'idea scelta (memoria storica). |
| **Scan 3D dei fondali come core** | ❌ Scartato: tecnologia matura (MBES, fotogrammetria, SLAM, LiDAR subacqueo tutti consolidati) e 3DGS subacqueo già occupato dal 2025. Non fattibile in 2 gg e non innovativo come core. **Riposizionato come input esistente e come roadmap** (§3-bis). |
| **Boa tecnologica / nodo residente** | ❌ Scartato come core: è stato dell'arte (resident ROV, docking station con ricarica, USV+ROV tutti documentati) ed è **hardware** non dimostrabile in 2 gg. **Recuperato come argomento edge/banda** a sostegno del software (§3-quinquies). |
| **Video 360 + navigazione joystick** | ❌ Scartato: zero punti in griglia, alto costo opportunità, VLM lavora male su equirettangolare, incerto che i ROV lo producano. **Recuperato come selezione area sul fotogramma.** |
| **Biofouling su scafi come caso centrale** | ❌ Scartato: paper arXiv 2026 già fa benchmark di LLM multimodali su scala di fouling. Collisione diretta. Mantenuto come scheda bloccata nel prototipo. |
| **Scan 3D dei fondali come core** | ❌ Scartato (vedi §3-bis). Riposizionato come input esistente e roadmap. |
| Sfida 3 (refit/fine vita) | Utile ma meno interessante personalmente. Possibile meno concorrenza: valutabile se si volesse massimizzare la probabilità di vittoria a prescindere dal tema. |
| Sfida 4 (decarbonizzazione) | Idem: interesse personale basso. |

---

## Appendice B — Metodo di ricerca usato

Tutte le ricerche sullo stato dell'arte sono state condotte via **API OpenAlex** con query mirate, filtro `from_publication_date`, ordinamento per rilevanza e conteggio citazioni.

**Fonti tentate e scartate:**

| Fonte | Esito |
|---|---|
| **OpenAlex** | ✅ Funziona. Metadati puliti, date corrette, conteggio citazioni |
| arXiv API | ❌ HTTP 406/301 — bloccata dal proxy di rete |
| Crossref | ⚠️ Risponde ma ranking inutilizzabile (risultati irrilevanti) + rate limit 429 |
| Semantic Scholar | ❌ HTTP 429 rate-limited senza API key |
| Zenodo | ❌ HTTP 403 |
| Dataverse Harvard | ✅ Funziona ma ranking debole sul dominio |
| Siti editoriali (MDPI, Nature) | ❌ 403/303 — aprire dal browser |

**Criterio di lettura applicato:** molte *survey* su un tema = campo saturo. Pochi paper recentissimi con poche citazioni = campo in apertura. Nessun risultato pertinente = spazio bianco (o query sbagliata, da verificare con formulazioni alternative).

> ⚠️ Le valutazioni su soluzioni *commerciali* (produttori ROV, subsea residency industriale) derivano da conoscenza pregressa, non verificate su fonti web da questa rete. **Da validare prima del pitch.**

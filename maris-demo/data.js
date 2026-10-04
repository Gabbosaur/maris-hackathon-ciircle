/* MARIS — dati di dominio, siti, storico e telemetria.
   Testi brevi: devono restare leggibili da proiettore. */

/* La timeline del video viene rimappata su questa durata virtuale,
   così gli orari di missione restano realistici anche con una clip
   breve. Il video dei cavi dura 60 s reali. */
const MISSION_SECONDS = 240 // 4 minuti di missione virtuale
const SEGMENT_SECONDS = 80 // referto parziale ogni 80 s → 3 segmenti
const MISSION_START = '09:14:00'

/* ---------- 1. tipo di ispezione ---------- */

const USE_CASES = [
  {
    id: 'banchina',
    name: 'Banchine',
    assetLabel: 'Banchina',
    hint: 'Palancole, muri di sponda, travi di coronamento',
    icon: 'quay',
    available: true,
    profile: 'submerged',
    posLabel: 'Progressiva',
    posUnit: 'm',
    posFrom: 40,
    posTo: 95,
    systemPrompt: `Sei un ispettore senior di opere marittime.
Analizzi fotogrammi da ispezione ROV di banchine portuali.

REGOLE
1. Descrivi solo ciò che è visibile. Non inferire.
2. Separa OSSERVAZIONE da DIAGNOSI.
3. Severità 1-4. Dichiara la confidenza.
4. Usa la telemetria come contesto. Se la visibilità
   è scarsa, abbassa la confidenza e dichiaralo.
5. Ogni azione va ancorata alla base normativa.
6. Non dichiarare la struttura sicura o non sicura:
   spetta al tecnico abilitato.`,
    knowledge: [
      { title: 'Ispezione opere di accosto', source: 'Manuale tecnico · cap. 4' },
      { title: 'Scala di severità difetti', source: 'Classificazione · tab. 2.1' },
      { title: 'Erosione al piede', source: 'Raccomandazioni · §7.3' },
      { title: 'Degrado da cloruri', source: 'Durabilità marina · §3.2' },
    ],
  },
  {
    id: 'frangiflutti',
    name: 'Frangiflutti',
    assetLabel: 'Diga foranea',
    hint: 'Mantellata, massi, berma, piede sommerso',
    icon: 'breakwater',
    available: true,
    profile: 'mixed',
    posLabel: 'Sezione',
    posUnit: '',
    posFrom: 14,
    posTo: 18,
    systemPrompt: `Sei un ingegnere costiero esperto di opere
a scogliera. Analizzi riprese emerse (drone) e
sommerse (ROV) di dighe foranee.

REGOLE
1. Separa stato EMERSO da stato SOMMERSO.
   Usa la quota per distinguerli.
2. Mantellata: spostamenti, rotture, ingranamento.
3. Piede: scour, dilavamento nucleo, quota berma.
4. Severità 1-4. Dichiara la confidenza.
5. Ogni azione va ancorata alla base normativa.
6. Segnala se la verifica va fatta prima
   della stagione delle mareggiate.`,
    knowledge: [
      { title: 'Danno alla mantellata', source: 'Criteri di danno · §5.1' },
      { title: 'Monitoraggio stagionale', source: 'Protocollo · §2.4' },
      { title: 'Scour al piede', source: 'Erosione localizzata · §4.2' },
      { title: 'Degrado massi artificiali', source: 'Durabilità unità · §6.1' },
    ],
  },
  {
    id: 'cavo',
    name: 'Cavi e condotte',
    assetLabel: 'Cavo sottomarino',
    hint: 'Free span, interramento, protezioni, abrasioni',
    icon: 'cable',
    available: true,
    profile: 'deep',
    posLabel: 'KP',
    posUnit: 'km',
    posFrom: 12.4,
    posTo: 13.8,
    /* il video di esempio fornito riguarda questo caso d'uso */
    sampleVideo: 'cable-inspection.mp4',
    systemPrompt: `Sei un ispettore specializzato in cavi e condotte
sottomarine. Analizzi riprese ROV lungo il tracciato.

REGOLE
1. Descrivi solo ciò che è visibile. Non inferire.
2. Separa OSSERVAZIONE da DIAGNOSI.
3. Valuta: continuità dell'interramento, campate
   libere (free span), stato delle protezioni,
   abrasioni, oggetti estranei sul tracciato.
4. Distingui il tipo di fondale: su roccia il
   rischio di abrasione è superiore che su sabbia.
5. Severità 1-4. Dichiara la confidenza.
6. Se la visibilità è ridotta, abbassa la
   confidenza e dichiaralo nell'osservazione.
7. Riferisci sempre la posizione al KP progressivo.
8. Ogni azione va ancorata alla base normativa.
9. Non dichiarare l'asset integro o compromesso:
   la valutazione spetta al gestore.`,
    knowledge: [
      { title: 'Profondità di interramento', source: 'Specifica di posa · §4.1' },
      { title: 'Campate libere ammissibili', source: 'Criteri free span · tab. 3.2' },
      { title: 'Protezioni e materassi', source: 'Opere di protezione · §6.4' },
      { title: 'Interferenze da pesca e ancoraggio', source: 'Analisi del rischio · §8.2' },
    ],
  },
  { id: 'scafo', name: 'Scafi', hint: 'Biofouling, pitting, anodi', icon: 'hull', available: false },
]

/* ---------- 2. siti e ispezioni precedenti ---------- */

const SITES = {
  banchina: [
    {
      id: 'b12',
      name: 'Banchina 12',
      place: 'Genova · Sampierdarena',
      extent: 'progressiva 40÷95 m',
      previous: [
        { id: 'i-mar26', date: '18 mar 2026', ago: '6 mesi', findings: 2 },
        { id: 'i-nov25', date: '04 nov 2025', ago: '11 mesi', findings: 1 },
      ],
    },
    {
      id: 'b07',
      name: 'Banchina 7',
      place: 'Savona · Vado',
      extent: 'progressiva 10÷60 m',
      previous: [],
    },
  ],
  frangiflutti: [
    {
      id: 'dl',
      name: 'Diga foranea · Levante',
      place: 'Genova',
      extent: 'sezioni 14÷18',
      previous: [
        { id: 'i-apr26', date: '22 apr 2026', ago: '5 mesi', findings: 3 },
        { id: 'i-ott25', date: '15 ott 2025', ago: '12 mesi', findings: 2 },
      ],
    },
    {
      id: 'dp',
      name: 'Diga di Ponente',
      place: 'La Spezia',
      extent: 'sezioni 3÷9',
      previous: [],
    },
  ],
  cavo: [
    {
      id: 'cv1',
      name: 'Collegamento Genova–Isola',
      place: 'Mar Ligure · KP 12,4÷13,8',
      extent: 'tratto costiero',
      previous: [
        { id: 'c-feb26', date: '11 feb 2026', ago: '8 mesi', findings: 2 },
        { id: 'c-giu25', date: '03 giu 2025', ago: '16 mesi', findings: 1 },
      ],
    },
    {
      id: 'cv2',
      name: 'Condotta sottomarina Savona',
      place: 'Savona · KP 0÷2,1',
      extent: 'avvicinamento a terra',
      previous: [],
    },
  ],
}

/* ---------- 3. anomalie rilevate ---------- */
/* historyBy: il confronto cambia in base alla baseline scelta.
   Una baseline più vecchia mostra un delta maggiore. */

const ANALYSES = {
  banchina: [
    {
      id: 'f-1',
      at: 0.4,
      label: 'Corrosione estesa su palancola',
      severity: 3,
      confidence: 0.86,
      observation:
        'Distacco dello strato superficiale con prodotti di corrosione bruno-rossastri su circa 1,2 m di altezza.',
      diagnosis:
        'Corrosione avanzata in zona di bagnasciuga. Probabile riduzione di spessore, non quantificabile dal video.',
      action: 'Misura ultrasonica dello spessore residuo nel tratto 58÷66 m.',
      deadline: 'Entro 6 mesi',
      citations: [
        { docTitle: 'Ispezione opere di accosto', locator: 'cap. 4' },
        { docTitle: 'Scala di severità difetti', locator: 'tab. 2.1' },
      ],
      historyBy: {
        'i-mar26': {
          from: '0,4 m²',
          to: '0,9 m²',
          delta: '+125% di estensione',
          trend: 'peggiorato',
        },
        'i-nov25': {
          from: '0,15 m²',
          to: '0,9 m²',
          delta: '+500% di estensione',
          trend: 'peggiorato',
        },
      },
    },
    {
      id: 'f-2',
      at: 0.69,
      label: 'Armature esposte',
      severity: 2,
      confidence: 0.79,
      observation:
        'Distacco del copriferro su 25 × 15 cm, due barre visibili con ossidazione superficiale.',
      diagnosis: 'Ammaloramento da penetrazione di cloruri. Ossidazione ancora superficiale.',
      action: 'Ripristino del copriferro con trattamento passivante delle armature.',
      deadline: 'Entro 12 mesi',
      citations: [{ docTitle: 'Degrado da cloruri', locator: '§3.2' }],
      historyBy: {
        'i-mar26': {
          from: 'ripristino eseguito',
          to: 'nessuna ripresa del fenomeno',
          delta: 'intervento efficace',
          trend: 'migliorato',
        },
      },
    },
    {
      id: 'f-3',
      at: 0.85,
      label: 'Possibile erosione al piede',
      severity: 2,
      confidence: 0.58,
      observation: 'Avvallamento del fondale in aderenza al paramento. Torbidità elevata.',
      diagnosis: 'Indizio di scour, non confermabile dal video. Stima di profondità non affidabile.',
      action: 'Rilievo batimetrico di dettaglio nel tratto 84÷95 m.',
      deadline: 'Verifica prioritaria',
      citations: [{ docTitle: 'Erosione al piede', locator: '§7.3' }],
      historyBy: {},
    },
  ],

  frangiflutti: [
    {
      id: 'fb-1',
      at: 0.3,
      label: 'Massi della mantellata spostati',
      severity: 3,
      confidence: 0.84,
      observation:
        'Unità di armatura fuori geometria, perdita di ingranamento e avvallamento sul paramento esterno.',
      diagnosis: 'Danno da moto ondoso. La perdita di ingranamento tende a propagarsi.',
      action: 'Censire le unità spostate e programmare ricollocazione.',
      deadline: "Prima dell'inverno",
      citations: [
        { docTitle: 'Danno alla mantellata', locator: '§5.1' },
        { docTitle: 'Monitoraggio stagionale', locator: '§2.4' },
      ],
      historyBy: {
        'i-apr26': { from: '2 unità', to: '6 unità', delta: '+4 unità', trend: 'peggiorato' },
        'i-ott25': { from: '1 unità', to: '6 unità', delta: '+5 unità', trend: 'peggiorato' },
      },
    },
    {
      id: 'fb-2',
      at: 0.68,
      label: 'Erosione al piede sommerso',
      severity: 2,
      confidence: 0.73,
      observation: 'Solco di erosione alla base con nucleo parzialmente esposto su circa 3 m.',
      diagnosis:
        'Erosione al piede con inizio di dilavamento. Riduce il confinamento della mantellata.',
      action: 'Rilievo batimetrico del piede. Valutare protezione se oltre 1,0 m.',
      deadline: 'Entro 6 mesi',
      citations: [{ docTitle: 'Scour al piede', locator: '§4.2' }],
      historyBy: {
        'i-apr26': {
          from: 'solco 0,6 m',
          to: 'solco 0,7 m',
          delta: 'variazione entro tolleranza',
          trend: 'stabile',
        },
      },
    },
  ],

  /* Contenuti e POSIZIONI derivati dall'analisi reale di
     cable-inspection.mp4 con Gemini (gemini-3.5-flash).
     'box' = bounding box restituito dal modello, convertito in
             percentuali del riquadro video: il marker cade sul
             soggetto reale, non in una posizione arbitraria.

     NOTA SUI TEMPI: il video è stato tagliato due volte.
     1) rimossi i primi 10 s  → 70 s diventa 60 s
     2) rimosso il tratto 25-40 s (tempo morto) → 45 s
     Secondi originali da Gemini: 20, 25, 56, 62
     Dopo il taglio 1:          10, 15, 46, 52
     Dopo il taglio 2:          10, 15, 31, 37
     'at' = secondo nel video finale / 45 s. */
  cavo: [
    {
      id: 'cv-1',
      at: 0.222, // 10 s
      /* box rianalizzato sul singolo fotogramma: la prima stima,
         ottenuta dall'analisi a livello di video, indicava per
         errore il cavo. Il ramo è nella metà sinistra, dietro
         al cavo. */
      box: { left: 26.7, top: 43.4, w: 53.4, h: 15 },
      label: 'Detrito legnoso sul tracciato',
      severity: 1,
      confidence: 0.9,
      observation:
        'Ramo di legno dalla forma irregolare adagiato sul fondale, subito dietro il cavo armato.',
      diagnosis:
        'Detrito naturale mobile. Nessun danno immediato, ma può spostarsi con le correnti.',
      action: 'Monitorare la posizione del detrito nelle ispezioni successive.',
      deadline: 'Monitoraggio',
      citations: [{ docTitle: 'Interferenze da pesca e ancoraggio', locator: '§8.2' }],
      historyBy: {
        'c-feb26': {
          from: 'tronco presente',
          to: 'tronco rimosso dalle correnti',
          delta: 'interferenza risolta naturalmente',
          trend: 'migliorato',
        },
      },
    },
    {
      id: 'cv-2',
      at: 0.333, // 15 s
      box: { left: 50, top: 45, w: 100, h: 40 },
      label: 'Mancata copertura del cavo',
      severity: 2,
      confidence: 1.0,
      observation:
        'Cavo armato che attraversa diagonalmente l\'inquadratura sopra le rocce, completamente esposto.',
      diagnosis:
        'Esposizione diretta a correnti e agenti esterni, con rischio di abrasione contro le rocce.',
      action: 'Valutare protezioni meccaniche o rinfianco con sacchi di cemento.',
      deadline: 'Entro 6 mesi',
      citations: [
        { docTitle: 'Profondità di interramento', locator: '§4.1' },
        { docTitle: 'Protezioni e materassi', locator: '§6.4' },
      ],
      historyBy: {
        'c-feb26': {
          from: 'esposizione 8 m',
          to: 'esposizione 14 m',
          delta: '+6 m di tratto scoperto',
          trend: 'peggiorato',
        },
        'c-giu25': {
          from: 'esposizione 5 m',
          to: 'esposizione 14 m',
          delta: '+9 m di tratto scoperto',
          trend: 'peggiorato',
        },
      },
    },
    {
      id: 'cv-3',
      at: 0.689, // 31 s
      /* box_2d [141,385,834,792] → centro 58.9/48.8, dim 40.7×69.3 */
      box: { left: 58.9, top: 48.8, w: 40.7, h: 69.3 },
      label: 'Elemento cilindrico estraneo su condotta',
      severity: 2,
      confidence: 0.9,
      observation:
        'Cilindro metallico arrugginito con foro sulla parte superiore, posizionato sopra la condotta.',
      diagnosis:
        'Oggetto estraneo o protezione disallineata. Possibile abrasione localizzata sulla condotta.',
      action: 'Ispezione ravvicinata per verificare contatti metallici diretti o usura del rivestimento.',
      deadline: 'Entro 3 mesi',
      citations: [
        { docTitle: 'Protezioni e materassi', locator: '§6.4' },
        { docTitle: 'Interferenze da pesca e ancoraggio', locator: '§8.2' },
      ],
      historyBy: {
        'c-feb26': {
          from: 'elemento assente',
          to: 'cilindro sulla condotta',
          delta: 'comparso dopo febbraio',
          trend: 'peggiorato',
        },
        'c-giu25': {
          from: 'tracciato libero',
          to: 'cilindro sulla condotta',
          delta: 'nuova interferenza',
          trend: 'peggiorato',
        },
      },
    },
    {
      id: 'cv-4',
      at: 0.822, // 37 s
      box: { left: 57.2, top: 69, w: 10.5, h: 62 },
      label: 'Condotta non interrata su fondale sabbioso',
      severity: 2,
      confidence: 0.86,
      observation:
        'Condotta rettilinea che si estende longitudinalmente sul fondale sabbioso piatto, senza copertura.',
      diagnosis:
        'Assenza di interramento su fondale mobile. La sabbia può migrare e variare l\'appoggio nel tempo.',
      action: 'Rilievo batimetrico del tratto per valutare stabilità dell\'appoggio e necessità di copertura.',
      deadline: 'Entro 6 mesi',
      citations: [{ docTitle: 'Profondità di interramento', locator: '§4.1' }],
      historyBy: {},
    },
  ],
}

/* ---------- 4. analisi su richiesta dell'operatore ---------- */

const SPOT_ANALYSES = {
  banchina: [
    {
      label: 'Giunto tra conci',
      severity: 1,
      confidence: 0.81,
      observation: 'Giunto verticale con sigillante parzialmente dilavato. Nessuna apertura.',
      diagnosis: 'Degrado del sigillante da esposizione prolungata. Non strutturale.',
      action: 'Annotare nel registro. Controllo alla prossima ispezione.',
      deadline: 'Ordinaria',
      citations: [{ docTitle: 'Ispezione opere di accosto', locator: 'cap. 4' }],
    },
    {
      label: 'Concrezioni biologiche',
      severity: 1,
      confidence: 0.88,
      observation: 'Colonizzazione biologica diffusa. Impedisce la lettura diretta del supporto.',
      diagnosis: 'Biofouling tipico della zona immersa. Maschera difetti, non li causa.',
      action: 'Pulizia localizzata prima della prossima valutazione del calcestruzzo.',
      deadline: 'Prossimo rilievo',
      citations: [{ docTitle: 'Ispezione opere di accosto', locator: 'cap. 4' }],
    },
    {
      label: 'Area priva di anomalie',
      severity: 1,
      confidence: 0.76,
      observation: 'Superficie continua, nessun distacco né prodotto di corrosione nel riquadro.',
      diagnosis: 'Nessun elemento di attenzione nella porzione indicata.',
      action: 'Nessuna azione. Area documentata come nominale.',
      deadline: 'Nessuna',
      citations: [{ docTitle: 'Scala di severità difetti', locator: 'tab. 2.1' }],
    },
  ],
  cavo: [
    {
      label: 'Contatto cavo-roccia',
      severity: 2,
      confidence: 0.74,
      observation: 'Il cavo appoggia direttamente su affioramento roccioso, senza letto di sabbia.',
      diagnosis: 'Punto di appoggio duro. Con le correnti può generare sfregamento ciclico.',
      action: 'Documentare con ripresa ravvicinata e valutare rinfianco localizzato.',
      deadline: 'Prossimo rilievo',
      citations: [{ docTitle: 'Protezioni e materassi', locator: '§6.4' }],
    },
    {
      label: 'Fondale sabbioso regolare',
      severity: 1,
      confidence: 0.87,
      observation: 'Sabbia uniforme priva di solchi di erosione nel riquadro selezionato.',
      diagnosis: 'Fondale stabile. Nessun segno di scalzamento in atto.',
      action: 'Nessuna azione. Tratto documentato come nominale.',
      deadline: 'Nessuna',
      citations: [{ docTitle: 'Profondità di interramento', locator: '§4.1' }],
    },
    {
      label: 'Area priva di anomalie',
      severity: 1,
      confidence: 0.82,
      observation: 'Nessun elemento estraneo né discontinuità del tracciato nel riquadro.',
      diagnosis: 'Nessun elemento di attenzione nella porzione indicata.',
      action: 'Nessuna azione. Area documentata come nominale.',
      deadline: 'Nessuna',
      citations: [{ docTitle: 'Campate libere ammissibili', locator: 'tab. 3.2' }],
    },
  ],
  frangiflutti: [
    {
      label: 'Unità con spigoli abrasi',
      severity: 2,
      confidence: 0.77,
      observation: 'Massi con spigoli smussati, senza fessurazioni passanti visibili.',
      diagnosis: "Abrasione da moto ondoso. Riduce l'ingranamento nel lungo periodo.",
      action: 'Censire nel rilievo periodico. Monitorare stagione per stagione.',
      deadline: 'Monitoraggio',
      citations: [{ docTitle: 'Degrado massi artificiali', locator: '§6.1' }],
    },
    {
      label: 'Vuoto tra unità',
      severity: 2,
      confidence: 0.72,
      observation: 'Interstizio più ampio della media tra due unità adiacenti.',
      diagnosis: 'Possibile perdita di ingranamento. Da distinguere da variabilità costruttiva.',
      action: 'Verificare in rilievo ravvicinato se il vuoto si amplia.',
      deadline: 'Prossimo rilievo',
      citations: [{ docTitle: 'Danno alla mantellata', locator: '§5.1' }],
    },
    {
      label: 'Area priva di anomalie',
      severity: 1,
      confidence: 0.79,
      observation: 'Disposizione regolare delle unità, ingranamento conservato.',
      diagnosis: 'Nessun elemento di attenzione nella porzione indicata.',
      action: 'Nessuna azione. Area documentata come nominale.',
      deadline: 'Nessuna',
      citations: [{ docTitle: 'Danno alla mantellata', locator: '§5.1' }],
    },
  ],
}

/* Eventi di log. Il set 'cavo' segue i cambi di scena reali del video. */
const LOG_EVENTS_BY_CASE = {
  default: [
    { at: 0.02, kind: 'sys', text: 'Telemetria sincronizzata' },
    { at: 0.06, kind: 'sys', text: 'Prompt di dominio e base normativa caricati' },
    { at: 0.12, kind: 'nav', text: 'Quota operativa raggiunta' },
    { at: 0.24, kind: 'ai', text: 'Tratto nominale · nessuna anomalia' },
    { at: 0.55, kind: 'ai', text: 'Tratto nominale · nessuna anomalia' },
    { at: 0.78, kind: 'warn', text: 'Torbidità in aumento · confidenza ridotta' },
    { at: 0.95, kind: 'nav', text: 'Risalita in corso' },
  ],
  /* Video finale di 45 s: parte già su fondale roccioso con il
     cavo esposto. Il taglio del tratto 25-40 s porta la giunzione
     al secondo 25, cioè al 56% della durata: lì cade anche il
     passaggio a fondale sabbioso. */
  cavo: [
    { at: 0.01, kind: 'sys', text: 'Telemetria sincronizzata · tracciato KP 12,4' },
    { at: 0.05, kind: 'sys', text: 'Prompt di dominio e base normativa caricati' },
    { at: 0.1, kind: 'nav', text: 'Fondale roccioso · visibilità buona' },
    { at: 0.42, kind: 'ai', text: 'Cavo armato in vista · verifica copertura' },
    { at: 0.56, kind: 'nav', text: 'Transizione a fondale sabbioso' },
    { at: 0.75, kind: 'ai', text: 'Tracciato nominale' },
    { at: 0.94, kind: 'nav', text: 'Fine tratto · KP 13,8' },
  ],
}

const SEV_META = {
  1: { label: 'Lieve', cls: 'sev-1' },
  2: { label: 'Moderata', cls: 'sev-2' },
  3: { label: 'Severa', cls: 'sev-3' },
  4: { label: 'Critica', cls: 'sev-4' },
}

const STEPS = [
  { n: 1, label: 'Tipo di ispezione' },
  { n: 2, label: 'Sito e storico' },
  { n: 3, label: 'Sorgente' },
  { n: 4, label: 'Analisi' },
]

/* ---------- telemetria ---------- */

function depthAt(t, profile) {
  if (profile === 'mixed') {
    // frangiflutti: emerso, poi immersione sul piede
    if (t < 0.42) return 0
    if (t < 0.55) return ((t - 0.42) / 0.13) * 4.2
    if (t < 0.9) return 4.2 + Math.sin(t * 22) * 0.18
    return 4.2 * (1 - (t - 0.9) / 0.1)
  }
  if (profile === 'deep') {
    /* cavo: il video tagliato inizia con il ROV già in quota
       operativa, quindi nessuna fase di discesa. */
    return 31.4 + Math.sin(t * 11) * 1.6 + t * 2.4
  }
  // banchina: discesa, percorrenza, risalita
  if (t < 0.12) return (t / 0.12) * 7.2
  if (t < 0.92) return 7.2 + Math.sin(t * 19) * 0.45
  return 7.2 * (1 - (t - 0.92) / 0.08)
}

/* Caso cavo: Gemini riporta "ottima visibilità" sul video reale,
   quindi la torbidità resta bassa per tutta la missione. */
function turbidityAt(t, profile) {
  if (profile === 'deep') return 0.8 + Math.sin(t * 8) * 0.22
  const base = 1.2 + Math.sin(t * 9) * 0.3
  return t > 0.72 ? base + (t - 0.72) * 9 : base
}

function telemetryAt(t, uc) {
  const depth = depthAt(t, uc.profile)
  const deep = uc.profile === 'deep'
  return {
    depth,
    pos: uc.posFrom + t * (uc.posTo - uc.posFrom),
    temp: deep ? 14.2 - depth * 0.05 + Math.sin(t * 14) * 0.1 : 17.9 - depth * 0.42 + Math.sin(t * 14) * 0.12,
    turbidity: turbidityAt(t, uc.profile),
    heading: deep ? 88 + Math.sin(t * 5) * 6 : 142 + Math.sin(t * 7) * 11,
    battery: 96 - t * 31,
  }
}

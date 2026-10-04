/* MARIS — flusso a step. Vanilla JS, nessuna dipendenza.
   Step 1 tipo → 2 sito e storico → 3 sorgente → 4 analisi. */

const ICONS = {
  quay: '<path d="M3 7h18M5 7v12M9 7v12M13 7v12M17 7v12M21 7v12" stroke-linecap="round"/><path d="M2 21h20" stroke-linecap="round"/>',
  breakwater:
    '<path d="m3 18 4-7 4 5 3-6 4 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 21h20" stroke-linecap="round"/>',
  hull: '<path d="M4 12h16l-2.5 6a2 2 0 0 1-1.8 1.1H8.3A2 2 0 0 1 6.5 18L4 12Z" stroke-linejoin="round"/><path d="M12 12V4M12 4l5 3" stroke-linecap="round" stroke-linejoin="round"/>',
  cable:
    '<path d="M3 8c3.5 0 3.5 8 7 8s3.5-8 7-8 3.5 4 4 4" stroke-linecap="round"/><circle cx="3" cy="8" r="1.4"/>',
  pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.4"/>',
  upload:
    '<path d="M12 16V4m0 0L8 8m4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke-linecap="round"/>',
  play: '<path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" stroke="none"/>',
  pause:
    '<rect x="7" y="5" width="3.5" height="14" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1.2" fill="currentColor" stroke="none"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h4" stroke-linecap="round"/>',
  sparkles:
    '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" stroke-linejoin="round"/>',
  trend:
    '<path d="M3 17l5-5 4 3 4-6 5 4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 7h4v4" stroke-linecap="round" stroke-linejoin="round"/>',
  alert:
    '<path d="M12 9v4m0 3h.01" stroke-linecap="round"/><path d="M10.3 3.9 2.6 17.3A2 2 0 0 0 4.3 20.3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke-linejoin="round"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke-linecap="round"/>',
  wave: '<path d="M3 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.2 1.5 3 1.9" stroke-linecap="round"/><path d="M3 19.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.2 1.5 3 1.9" stroke-linecap="round" opacity=".45"/><circle cx="12" cy="7" r="3.2"/>',
  crop: '<path d="M6 3v13a2 2 0 0 0 2 2h13" stroke-linecap="round"/><path d="M3 6h13a2 2 0 0 1 2 2v13" stroke-linecap="round"/>',
  clip: '<path d="M9 5h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke-linejoin="round"/><path d="M10 3h4v3h-4z" stroke-linejoin="round"/><path d="M10 12h4M10 16h4" stroke-linecap="round"/>',
  back: '<path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/>',
  fwd: '<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5l3 1.8" stroke-linecap="round"/>',
  none: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 15.5l7-7" stroke-linecap="round"/>',
}

function svg(n, s = 22) {
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.7" aria-hidden="true">${ICONS[n]}</svg>`
}

function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )
}

function missionClock(t) {
  const [h, m, s] = MISSION_START.split(':').map(Number)
  const tot = h * 3600 + m * 60 + s + Math.floor(t * MISSION_SECONDS)
  return [Math.floor(tot / 3600) % 24, Math.floor(tot / 60) % 60, tot % 60]
    .map((x) => String(x).padStart(2, '0'))
    .join(':')
}

function elapsed(t) {
  const s = Math.floor(t * MISSION_SECONDS)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

/* ---------- stato ---------- */

const state = {
  step: 1,
  useCaseId: null,
  siteId: null,
  baselineId: null, // ispezione di confronto, o 'none'
  file: null,
  videoUrl: null,
  phase: 'ready', // ready | live | done
  t: 0,
  findings: [],
  log: [],
  segments: [],
  selected: null, // anomalia aperta nel pannello dettaglio
  spotPending: false,
  spotIndex: 0,
  box: null,
  drawing: null,
  paused: false, // riflette lo stato di riproduzione del video
  justFound: null, // id dell'anomalia appena rilevata, per l'animazione
}

const emitted = new Set()
let freshTimer = null
const root = document.getElementById('app')

const useCase = () => USE_CASES.find((u) => u.id === state.useCaseId)
const sites = () => (state.useCaseId ? SITES[state.useCaseId] : [])
const site = () => sites().find((s) => s.id === state.siteId)
const baseline = () => {
  const s = site()
  if (!s || !state.baselineId || state.baselineId === 'none') return null
  return s.previous.find((p) => p.id === state.baselineId) || null
}

function canGo(step) {
  if (step === 2) return Boolean(state.useCaseId)
  if (step === 3) return Boolean(state.useCaseId && state.siteId && state.baselineId)
  if (step === 4) return Boolean(state.useCaseId && state.siteId && state.baselineId && state.videoUrl)
  return true
}

/* ---------- render ---------- */

function render() {
  const old = root.querySelector('#vid')
  const keep = old ? { time: old.currentTime, paused: old.paused } : null

  root.innerHTML = `
    ${header()}
    <main><div class="wrap">
      ${state.step === 1 ? step1() : ''}
      ${state.step === 2 ? step2() : ''}
      ${state.step === 3 ? step3() : ''}
      ${state.step === 4 ? step4() : ''}
    </div></main>
    ${footer()}
  `
  bind()

  /* Se il DOM è stato ricostruito mentre un video era in riproduzione,
     ne ripristina posizione e stato. Durante l'analisi si usa refresh(),
     quindi questo caso riguarda solo i cambi di step. */
  if (keep && state.step === 4) {
    const v = root.querySelector('#vid')
    if (v) {
      const go = () => {
        if (Math.abs(v.currentTime - keep.time) > 0.05) v.currentTime = keep.time
        if (!keep.paused) v.play().catch(() => {})
      }
      v.readyState >= 1 ? go() : v.addEventListener('loadedmetadata', go, { once: true })
    }
  }
}

function tick() {
  const uc = useCase()
  if (!uc || state.step !== 4 || state.phase === 'ready') return
  const tl = telemetryAt(state.t, uc)
  const set = (id, v) => {
    const e = root.querySelector(id)
    if (e) e.textContent = v
  }
  set('#t-clock', missionClock(state.t))
  set('#t-depth', tl.depth.toFixed(1))
  set('#t-pos', tl.pos.toFixed(0))
  set('#t-temp', tl.temp.toFixed(1))
  set('#t-turb', tl.turbidity.toFixed(1))
  set('#t-batt', tl.battery.toFixed(0))
  const tb = root.querySelector('#box-turb')
  if (tb) tb.className = tl.turbidity > 3 ? 'tel warn' : 'tel'
  const pct = (state.t * 100).toFixed(2)
  const pf = root.querySelector('#prog-fill')
  if (pf) pf.style.width = pct + '%'
  const pk = root.querySelector('#prog-knob')
  if (pk) pk.style.left = pct + '%'
}

function header() {
  return `
  <header class="top"><div class="wrap top-in">
    <div class="brand">
      <span class="brand-mark">${svg('wave', 23)}</span>
      <div>
        <h1>MARIS</h1>
        <p class="sub">Copilota AI per ispezioni marittime</p>
      </div>
    </div>
    <nav class="stepper" aria-label="Avanzamento">
      ${STEPS.map((s, i) => {
        const done = s.n < state.step
        const on = s.n === state.step
        const clickable = done || (s.n > state.step && canGo(s.n))
        return `${i ? '<span class="sx-sep"></span>' : ''}
          <button class="sx ${on ? 'on' : ''} ${done ? 'done' : ''}"
            ${clickable && !on ? `data-step="${s.n}"` : 'disabled'}
            aria-current="${on}">
            <span class="sx-n">${done ? '✓' : s.n}</span>${esc(s.label)}
          </button>`
      }).join('')}
    </nav>
  </div></header>`
}

/* ---------- step 1: tipo di ispezione ---------- */

function step1() {
  return `
  <section class="sheet">
    <h2 class="sheet-h">Che tipo di ispezione stai eseguendo?</h2>
    <p class="sheet-s">Determina il prompt di dominio e la base normativa che il sistema applica.</p>
    <div class="grid4">
      ${USE_CASES.map(
        (u) => `
        <button class="opt ${state.useCaseId === u.id ? 'on' : ''} ${u.available ? '' : 'off'}"
          ${u.available ? `data-uc="${u.id}"` : 'disabled'}>
          <span class="opt-ico">${svg(u.icon, 28)}</span>
          <span class="opt-t">${esc(u.name)}</span>
          <span class="opt-s">${esc(u.hint)}</span>
          ${
            u.available
              ? `<span class="opt-meta">${svg('doc', 14)} 4 documenti</span>`
              : `<span class="opt-meta" style="color:var(--txt-faint)">${svg('lock', 14)} in arrivo</span>`
          }
        </button>`,
      ).join('')}
    </div>
    <div class="nav">
      <span class="nav-sp"></span>
      <button class="btn btn-primary" data-step="2" ${canGo(2) ? '' : 'disabled'}>
        Continua ${svg('fwd', 18)}
      </button>
    </div>
  </section>`
}

/* ---------- step 2: sito e storico ---------- */

function step2() {
  const s = site()
  return `
  <section class="sheet">
    <h2 class="sheet-h">Dove, e rispetto a quando?</h2>
    <p class="sheet-s">Scegli il sito. Se è già stato ispezionato, il sistema confronta lo stato attuale con il rilievo precedente.</p>

    <div class="grid2">
      ${sites()
        .map(
          (x) => `
        <button class="opt ${state.siteId === x.id ? 'on' : ''}" data-site="${x.id}">
          <span class="opt-ico">${svg('pin', 26)}</span>
          <span class="opt-t">${esc(x.name)}</span>
          <span class="opt-s">${esc(x.place)} · ${esc(x.extent)}</span>
          <span class="opt-meta">
            ${
              x.previous.length
                ? `${svg('clock', 14)} ${x.previous.length} ispezion${x.previous.length > 1 ? 'i' : 'e'} in archivio`
                : `<span style="color:var(--txt-faint)">${svg('none', 14)} nessuno storico</span>`
            }
          </span>
        </button>`,
        )
        .join('')}
    </div>

    ${
      s
        ? `<div style="margin-top:30px">
             <p class="eyebrow">${svg('trend', 15)} Baseline di confronto</p>
             <div class="grid2" style="margin-top:12px">
               ${s.previous
                 .map(
                   (p) => `
                 <button class="opt ${state.baselineId === p.id ? 'on' : ''}" data-base="${p.id}">
                   <span class="opt-t">${esc(p.date)}</span>
                   <span class="opt-s">${esc(p.ago)} fa · ${p.findings} anomalie rilevate</span>
                 </button>`,
                 )
                 .join('')}
               <button class="opt ${state.baselineId === 'none' ? 'on' : ''}" data-base="none">
                 <span class="opt-t">Senza confronto</span>
                 <span class="opt-s">Tratta come primo rilievo del sito</span>
               </button>
             </div>
             ${
               !s.previous.length
                 ? '<p class="sheet-s" style="margin-top:14px">Questo sito non ha rilievi in archivio: l\'ispezione diventerà la baseline per le prossime.</p>'
                 : ''
             }
           </div>`
        : ''
    }

    <div class="nav">
      <button class="btn btn-ghost" data-step="1">${svg('back', 18)} Indietro</button>
      <span class="nav-sp"></span>
      <button class="btn btn-primary" data-step="3" ${canGo(3) ? '' : 'disabled'}>
        Continua ${svg('fwd', 18)}
      </button>
    </div>
  </section>`
}

/* ---------- step 3: sorgente ---------- */

function step3() {
  const uc = useCase()
  const s = site()
  const b = baseline()
  return `
  <section class="sheet">
    <h2 class="sheet-h">Carica la registrazione</h2>
    <p class="sheet-s">
      ${esc(uc.name)} · ${esc(s.name)} ·
      ${b ? `confronto con ${esc(b.date)}` : 'senza confronto'}
    </p>

    <div class="panel" style="margin-top:24px;overflow:hidden">
      <div class="stage">
        ${
          state.videoUrl
            ? `<video src="${state.videoUrl}" id="vid" controls></video>`
            : `<button class="drop" id="drop">
                 <span class="drop-ico">${svg('upload', 26)}</span>
                 <span class="drop-t">Trascina la registrazione ROV</span>
                 <span class="drop-s">MP4 / MOV · la telemetria viene letta dal log di missione</span>
                 ${
                   uc.sampleVideo
                     ? `<span class="pill pill-kelp" style="margin-top:6px">
                          ${svg('doc', 14)} registrazione di esempio: ${esc(uc.sampleVideo)}
                        </span>`
                     : ''
                 }
               </button>`
        }
      </div>
      ${
        state.videoUrl
          ? `<div class="stage-foot">
               <span>${esc(state.file.name)}</span>
               <button class="btn btn-ghost btn-sm" id="change">Cambia file</button>
             </div>`
          : ''
      }
      <input type="file" accept="video/*" id="file" style="display:none">
    </div>

    <div class="ctx" style="margin-top:18px">
      <div class="panel">
        <div class="panel-h">
          <span class="eyebrow">${svg('sparkles', 15)} Prompt di dominio</span>
        </div>
        <div class="slim" style="padding:15px;max-height:200px;overflow-y:auto">
          <pre class="prompt">${esc(uc.systemPrompt)}</pre>
        </div>
      </div>
      <div class="panel">
        <div class="panel-h">
          <span class="eyebrow">${svg('doc', 15)} Base normativa</span>
          <span class="eyebrow">${uc.knowledge.length}</span>
        </div>
        <div class="slim" style="padding:15px;max-height:200px;overflow-y:auto">
          <ul class="kb">${uc.knowledge
            .map(
              (d) => `<li><span class="kb-ico">${svg('doc', 17)}</span>
                <div><div class="kb-t">${esc(d.title)}</div>
                <div class="kb-s">${esc(d.source)}</div></div></li>`,
            )
            .join('')}</ul>
        </div>
      </div>
    </div>

    <div class="nav">
      <button class="btn btn-ghost" data-step="2">${svg('back', 18)} Indietro</button>
      <span class="nav-sp"></span>
      <button class="btn btn-primary" id="go4" ${canGo(4) ? '' : 'disabled'}>
        ${svg('play', 18)} Avvia analisi
      </button>
    </div>
  </section>`
}

/* ---------- step 4: analisi ---------- */

function step4() {
  const uc = useCase()
  const s = site()
  const live = state.phase === 'live'
  const tl = telemetryAt(state.t, uc)

  let high = 0,
    low = 0,
    worse = 0
  state.findings.forEach((f) => {
    f.severity >= 3 ? high++ : low++
    const h = histOf(f)
    if (h && h.trend === 'peggiorato') worse++
  })

  return `
  <div class="work">
    <div class="wcol">
      <div class="panel" style="overflow:hidden">
        <div class="stage armed" id="stage">
          <video src="${state.videoUrl}" id="vid" playsinline></video>
          ${
            state.box && state.box.w > 3
              ? `<div class="sel-box ${state.spotPending ? 'busy' : ''}"
                   style="left:${state.box.x}%;top:${state.box.y}%;width:${state.box.w}%;height:${state.box.h}%">
                   <span class="sel-tag">${state.spotPending ? 'Analisi…' : 'Area selezionata'}</span>
                 </div>`
              : ''
          }
          <div class="hud">
            <div class="hud-top">
              <span class="hud-live ${live ? '' : 'off'}">
                <span class="dot ${live ? 'blink' : ''}"></span>${live ? 'ANALISI' : 'COMPLETATA'}
              </span>
              <span class="hud-site">${esc(s.name)}<br>${esc(s.place)}</span>
            </div>
            <div class="hud-bottom"><div class="hud-row">
              ${tel('ora', 't-clock', missionClock(state.t))}
              ${tel('quota', 't-depth', tl.depth.toFixed(1), 'm')}
              ${tel(uc.posLabel, 't-pos', tl.pos.toFixed(0), uc.posUnit)}
              ${tel('temp', 't-temp', tl.temp.toFixed(1), '°C')}
              ${tel('torbidità', 't-turb', tl.turbidity.toFixed(1), 'NTU', tl.turbidity > 3, 'box-turb')}
              ${tel('batteria', 't-batt', tl.battery.toFixed(0), '%')}
            </div></div>
          </div>
          <div id="overlay">${markersHtml()}</div>
          <div class="prog" id="prog" role="slider" tabindex="0"
               aria-label="Avanzamento video"
               aria-valuemin="0" aria-valuemax="100"
               aria-valuenow="${(state.t * 100).toFixed(0)}">
            <div class="prog-track">
              <div class="prog-fill" id="prog-fill" style="width:${(state.t * 100).toFixed(2)}%"></div>
              ${ANALYSES[state.useCaseId]
                .map(
                  (f) =>
                    `<span class="prog-mark" style="left:${f.at * 100}%"
                       title="${esc(f.label)}"></span>`,
                )
                .join('')}
              <div class="prog-knob" id="prog-knob" style="left:${(state.t * 100).toFixed(2)}%"></div>
            </div>
          </div>
        </div>
        <div class="stage-foot">
          <span class="hint-spot">${svg('crop', 15)} Trascina sul video per analizzare un'area · usa la barra per spostarti nel tempo</span>
          <span style="display:flex;gap:9px">
            ${
              live
                ? `<button class="btn ${state.paused ? 'btn-primary' : 'btn-ghost'} btn-sm" id="pause">${svg(state.paused ? 'play' : 'pause', 15)} ${state.paused ? 'Riprendi' : 'Pausa'}</button>
                   <button class="btn btn-stop btn-sm" id="stop">${svg('stop', 15)} Termina</button>`
                : `<button class="btn btn-ghost btn-sm" data-step="3">${svg('back', 15)} Cambia sorgente</button>
                   <button class="btn btn-primary btn-sm" id="restart">${svg('play', 15)} Ripeti</button>`
            }
          </span>
        </div>
      </div>

      <div id="segs">${segsHtml()}</div>

      <div class="panel">
        <div class="panel-h">
          <span class="eyebrow" id="an-count">Anomalie · ${state.findings.length}</span>
          <span class="eyebrow" id="an-time">${elapsed(state.t)} / ${elapsed(1)}</span>
        </div>
        <div id="flist">${flistHtml(uc)}</div>
        <div class="stats" id="stats">${statsHtml()}</div>
      </div>

      <div class="panel">
        <div class="panel-h"><span class="eyebrow">Log di missione</span></div>
        <ul class="log slim" id="log">${logHtml()}</ul>
      </div>
    </div>

    <div class="wcol">
      <div class="sticky" id="detail">${detail(uc)}</div>
    </div>
  </div>`
}

/* ---------- frammenti aggiornabili in place ----------
   Durante l'analisi non si può chiamare render(): ricostruirebbe
   l'elemento <video> interrompendo la riproduzione. Queste funzioni
   generano le sole porzioni che cambiano nel tempo. */

const FALLBACK_POS = [
  { left: 26, top: 40 },
  { left: 62, top: 58 },
  { left: 40, top: 70 },
  { left: 72, top: 34 },
  { left: 47, top: 52 },
]

function markersHtml() {
  /* flash sul bordo del video quando un'anomalia viene rilevata */
  const flash = state.justFound ? '<div class="flash"></div>' : ''

  const items = state.findings
    .map((f, i) => {
      /* box: posizione reale restituita dal VLM.
         Senza box si ricade su posizioni di riserva. */
      const P = f.box ? { left: f.box.left, top: f.box.top } : FALLBACK_POS[i % 5]
      const on = state.selected === f.id
      const fresh = state.justFound === f.id

      const frame =
        on && f.box
          ? `<div class="det-box ${fresh ? 'fresh' : ''}"
               style="left:${Math.max(0, f.box.left - f.box.w / 2)}%;
                      top:${Math.max(0, f.box.top - f.box.h / 2)}%;
                      width:${Math.min(100, f.box.w)}%;
                      height:${Math.min(100, f.box.h)}%">
               ${fresh ? `<span class="det-tag">${esc(f.label)}</span>` : ''}
             </div>`
          : ''

      return `${frame}
        <button class="marker ${on ? 'on' : ''} ${fresh ? 'fresh' : ''}"
          style="top:${P.top}%;left:${P.left}%" data-find="${f.id}"
          title="${esc(f.label)}" aria-label="${esc(f.label)}">
          <span class="marker-halo"></span><span class="marker-core"></span>
        </button>`
    })
    .join('')

  return flash + items
}

function segsHtml() {
  if (!state.segments.length) return ''
  return `<div class="segs">${state.segments
    .map(
      (s) => `<span class="seg">${svg('clip', 14)}
        Referto ${esc(s.label)} · ${s.count} anomalie</span>`,
    )
    .join('')}</div>`
}

function flistHtml(uc) {
  if (!state.findings.length) {
    return '<p class="empty">Analisi in corso · nessuna anomalia rilevata finora</p>'
  }
  return `<ul class="flist">${state.findings.map((f, i) => frow(f, i, uc)).join('')}</ul>`
}

function statsHtml() {
  let high = 0,
    low = 0,
    worse = 0
  state.findings.forEach((f) => {
    f.severity >= 3 ? high++ : low++
    const h = histOf(f)
    if (h && h.trend === 'peggiorato') worse++
  })
  return `
    <div class="stat"><div class="stat-v orange">${high}</div><div class="stat-l">severità ≥ 3</div></div>
    <div class="stat"><div class="stat-v dim">${low}</div><div class="stat-l">severità &lt; 3</div></div>
    <div class="stat"><div class="stat-v red">${worse}</div><div class="stat-l">peggiorate</div></div>`
}

function logHtml() {
  return state.log
    .slice()
    .reverse()
    .map(
      (e) =>
        `<li class="${e.kind}"><span class="log-t">${esc(e.time)}</span>
         <span class="log-x">${esc(e.text)}</span></li>`,
    )
    .join('')
}

/* Aggiorna le regioni dinamiche senza toccare il video.
   Sostituisce render() durante l'analisi. */
function refresh() {
  const uc = useCase()
  if (!uc || state.step !== 4) return

  const set = (sel, html) => {
    const el = root.querySelector(sel)
    if (el) el.innerHTML = html
  }
  set('#overlay', markersHtml())
  set('#segs', segsHtml())
  set('#flist', flistHtml(uc))
  set('#stats', statsHtml())
  set('#log', logHtml())
  set('#detail', detail(uc))

  const c = root.querySelector('#an-count')
  if (c) c.textContent = `Anomalie · ${state.findings.length}`
  const tm = root.querySelector('#an-time')
  if (tm) tm.textContent = `${elapsed(state.t)} / ${elapsed(1)}`

  tick()
  bindDynamic()

  /* se l'anomalia è appena comparsa e il pannello di dettaglio è
     fuori vista, lo porta in vista senza strappi */
  if (state.justFound) {
    const d = root.querySelector('#detail')
    if (d && d.getBoundingClientRect) {
      const r = d.getBoundingClientRect()
      const h = window.innerHeight || 900
      if (r.top < 0 || r.top > h * 0.8) {
        d.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }
}

/* Riaggancia i soli listener delle porzioni rigenerate. */
function bindDynamic() {
  root.querySelectorAll('[data-find]').forEach((b) =>
    b.addEventListener('click', (e) => {
      e.stopPropagation()
      selectFinding(b.dataset.find)
    }),
  )
}

function selectFinding(id) {
  state.selected = id
  state.justFound = null // la selezione manuale annulla l'evidenziazione
  clearTimeout(freshTimer)
  const f = state.findings.find((x) => x.id === id)
  const v = root.querySelector('#vid')
  if (f && f.box && v && v.duration) {
    v.pause()
    v.currentTime = f.at * v.duration
    state.t = f.at
  }
  refresh()
}

function tel(k, id, v, u, warn, boxId) {
  return `<span class="tel ${warn ? 'warn' : ''}" ${boxId ? `id="${boxId}"` : ''}>
    <span class="tel-k">${esc(k)}</span><span class="tel-v" id="${id}">${esc(v)}</span>
    ${u ? `<span class="tel-u">${esc(u)}</span>` : ''}</span>`
}

/* storico relativo alla baseline scelta */
function histOf(f) {
  const b = baseline()
  if (!b || !f.historyBy) return null
  return f.historyBy[b.id] || null
}

function frow(f, i, uc) {
  const tl = telemetryAt(f.at, uc)
  const h = histOf(f)
  const arrow = h
    ? h.trend === 'peggiorato'
      ? '<span class="trend up">↑ peggiorato</span>'
      : h.trend === 'migliorato'
        ? '<span class="trend down">↓ migliorato</span>'
        : '<span class="trend flat">= stabile</span>'
    : ''
  return `
  <li>
    <button class="frow ${state.selected === f.id ? 'on' : ''}" data-find="${f.id}">
      <span class="frow-n">${i + 1}</span>
      <span class="frow-b">
        <span class="frow-t">${esc(f.label)}</span>
        <span class="frow-m">${missionClock(f.at)} · ${esc(uc.posLabel)} ${tl.pos.toFixed(0)}${uc.posUnit}</span>
      </span>
      ${arrow}
      ${sevBadge(f.severity)}
    </button>
  </li>`
}

/* pannello dettaglio: sempre accanto al video, mai da cercare scrollando */
function detail(uc) {
  const f = state.findings.find((x) => x.id === state.selected)

  if (!f) {
    return `
    <div class="panel">
      <div class="panel-h"><span class="eyebrow">Dettaglio</span></div>
      <p class="empty">
        ${
          state.findings.length
            ? 'Seleziona un\'anomalia dalla lista<br>o un punto sul video.'
            : 'Le anomalie compariranno qui<br>man mano che vengono rilevate.'
        }
      </p>
    </div>
    ${
      state.phase === 'done'
        ? `<div class="disc" style="margin-top:18px">${svg('alert', 19)}
             <p><b>Copilota, non giudice.</b> Ogni valutazione richiede validazione di un tecnico abilitato.</p>
           </div>`
        : ''
    }`
  }

  const pct = Math.round(f.confidence * 100)
  const low = f.confidence < 0.65
  const tl = telemetryAt(f.at, uc)
  const h = histOf(f)
  const b = baseline()
  const cls = h ? (h.trend === 'peggiorato' ? 'up' : h.trend === 'migliorato' ? 'down' : 'flat') : ''

  return `
  <div class="panel det">
    <div class="det-top">
      ${sevBadge(f.severity)}
      ${f.onDemand ? '<span class="pill pill-sky">su richiesta</span>' : ''}
    </div>
    <h3 class="det-h">${esc(f.label)}</h3>
    <p class="det-m">${missionClock(f.at)} · quota ${tl.depth.toFixed(1)} m ·
      ${esc(uc.posLabel)} ${tl.pos.toFixed(0)}${uc.posUnit}</p>

    <div class="blocks">
      ${block('Osservazione', f.observation, 'neutral')}
      ${block('Diagnosi', f.diagnosis, 'amber')}
      ${block('Azione', f.action, 'kelp', f.deadline, true)}
    </div>

    ${
      h
        ? `<div class="hist ${cls}">
             <div class="hist-h">${svg('trend', 15)} Confronto con ${esc(b.date)}</div>
             <div class="hist-row">
               <span class="hist-from">${esc(h.from)}</span>
               <span class="hist-ar">→</span>
               <span class="hist-to">${esc(h.to)}</span>
             </div>
             <div class="hist-d">${esc(h.delta)}</div>
           </div>`
        : b
          ? `<div class="hist flat">
               <div class="hist-h">${svg('trend', 15)} Confronto con ${esc(b.date)}</div>
               <div class="hist-d" style="margin-top:9px">Non presente nel rilievo precedente · nuova rilevazione</div>
             </div>`
          : ''
    }

    <div class="cites">
      <span class="eyebrow">Fonti</span>
      <ul>${f.citations
        .map((c) => `<li>${svg('doc', 15)}<span>${esc(c.docTitle)} · ${esc(c.locator)}</span></li>`)
        .join('')}</ul>
    </div>

    <div class="det-foot">
      <div class="conf">
        <span class="eyebrow">Confidenza</span>
        <span class="conf-track"><span class="conf-fill ${low ? 'low' : ''}" style="width:${pct}%"></span></span>
        <span class="conf-v ${low ? 'low' : ''}">${pct}%</span>
      </div>
      <button class="btn btn-primary btn-sm">Valida</button>
    </div>
  </div>

  <div class="disc" style="margin-top:18px">${svg('alert', 19)}
    <p><b>Copilota, non giudice.</b> La validazione spetta al tecnico abilitato.</p>
  </div>`
}

function block(l, text, tone, badge, strong) {
  return `<div>
    <div class="block-head"><span class="block-l ${tone}">${l}</span>
      ${badge ? `<span class="deadline">${esc(badge)}</span>` : ''}</div>
    <p class="block-p ${strong ? 'strong' : ''}">${esc(text)}</p>
  </div>`
}

function sevBadge(n) {
  const m = SEV_META[n]
  return `<span class="sev ${m.cls}"><span class="sev-dot"></span>${m.label} · ${n}/4</span>`
}

function footer() {
  return `<footer class="btm"><div class="wrap btm-in">
    <p>Prototipo · referti e telemetria dimostrativi</p>
    <p>Sfida 2 · Robotica sottomarina</p>
  </div></footer>`
}

/* ---------- motore ---------- */

function pushLog(kind, text) {
  state.log.push({ kind, text, time: missionClock(state.t) })
}

function onProgress(t) {
  state.t = Math.min(1, Math.max(0, t))
  let dirty = false

  const events = LOG_EVENTS_BY_CASE[state.useCaseId] || LOG_EVENTS_BY_CASE.default
  events.forEach((e, i) => {
    if (state.t >= e.at && !emitted.has('l' + i)) {
      emitted.add('l' + i)
      pushLog(e.kind, e.text)
      dirty = true
    }
  })

  ANALYSES[state.useCaseId].forEach((f) => {
    if (state.t >= f.at && !emitted.has(f.id)) {
      emitted.add(f.id)
      state.findings.push(f)
      /* evidenzia automaticamente l'anomalia appena rilevata:
         l'operatore la vede comparire senza doverla cercare */
      state.selected = f.id
      state.justFound = f.id
      pushLog('find', `${f.label} · severità ${f.severity}/4`)
      dirty = true
    }
  })

  /* referti parziali: uno ogni SEGMENT_SECONDS di missione */
  const n = Math.floor((state.t * MISSION_SECONDS) / SEGMENT_SECONDS)
  for (let s = 1; s <= n; s++) {
    if (emitted.has('s' + s)) continue
    emitted.add('s' + s)
    const from = ((s - 1) * SEGMENT_SECONDS) / MISSION_SECONDS
    const to = (s * SEGMENT_SECONDS) / MISSION_SECONDS
    const count = ANALYSES[state.useCaseId].filter((f) => f.at >= from && f.at < to).length
    state.segments.push({ label: `${elapsed(from)}–${elapsed(to)}`, count })
    pushLog('sys', `Referto parziale ${elapsed(from)}–${elapsed(to)} · ${count} anomalie`)
    dirty = true
  }

  /* refresh() aggiorna solo le regioni dinamiche: render() qui
     ricostruirebbe il video a ogni evento, bloccando la riproduzione. */
  if (dirty) {
    refresh()
    /* l'evidenziazione resta per 2,2 s, poi il marker torna normale
       ma l'anomalia rimane selezionata nel pannello di dettaglio */
    if (state.justFound) {
      const id = state.justFound
      clearTimeout(freshTimer)
      freshTimer = setTimeout(() => {
        if (state.justFound === id) {
          state.justFound = null
          refresh()
        }
      }, 2200)
    }
  } else {
    tick()
  }
}

function startAnalysis() {
  state.step = 4
  state.phase = 'live'
  state.t = 0
  state.findings = []
  state.log = []
  state.segments = []
  state.selected = null
  state.box = null
  state.paused = false
  emitted.clear()
  render()
  const v = root.querySelector('#vid')
  if (v) {
    v.currentTime = 0
    v.play().catch(() => {})
  }
}

function stop() {
  state.phase = 'done'
  const v = root.querySelector('#vid')
  if (v) v.pause()
  pushLog('sys', 'Analisi completata')
  render()
}

/* Aggiorna in place solo l'etichetta del bottone pausa/riprendi,
   senza ricostruire il DOM: evita di distruggere il video. */
function syncPauseButton() {
  const b = root.querySelector('#pause')
  if (!b) return
  b.innerHTML = `${svg(state.paused ? 'play' : 'pause', 15)} ${
    state.paused ? 'Riprendi' : 'Pausa'
  }`
  b.className = `btn ${state.paused ? 'btn-primary' : 'btn-ghost'} btn-sm`
}

function togglePause() {
  const v = root.querySelector('#vid')
  if (!v) return
  if (v.paused) {
    v.play().catch(() => {})
    pushLog('sys', 'Analisi ripresa')
  } else {
    v.pause()
    pushLog('sys', 'Analisi in pausa')
  }
  /* i listener 'play'/'pause' aggiornano state.paused e il bottone */
  const ul = root.querySelector('#log')
  if (ul) ul.innerHTML = logHtml()
}

function askSpot() {
  const v = root.querySelector('#vid')
  if (v && !v.paused) v.pause()
  state.spotPending = true
  pushLog('sys', 'Approfondimento richiesto su area selezionata')
  paintBox()
  refresh()

  setTimeout(() => {
    const pool = SPOT_ANALYSES[state.useCaseId]
    const base = pool[state.spotIndex % pool.length]
    state.spotIndex++
    const f = { ...base, id: 'spot-' + Date.now(), at: state.t, onDemand: true, historyBy: {} }
    state.findings.push(f)
    state.selected = f.id
    state.spotPending = false
    state.box = null
    const el = root.querySelector('.sel-box')
    if (el) el.remove()
    pushLog('find', `Area analizzata · ${f.label}`)
    refresh()
  }, 1300)
}

/* ---------- eventi ---------- */

function bind() {
  root.querySelectorAll('[data-step]').forEach((b) =>
    b.addEventListener('click', () => {
      const n = Number(b.dataset.step)
      if (n === 4) return
      state.step = n
      render()
    }),
  )

  root.querySelectorAll('[data-uc]').forEach((b) =>
    b.addEventListener('click', () => {
      state.useCaseId = b.dataset.uc
      state.siteId = null
      state.baselineId = null
      render()
    }),
  )

  root.querySelectorAll('[data-site]').forEach((b) =>
    b.addEventListener('click', () => {
      state.siteId = b.dataset.site
      const s = site()
      // preseleziona la baseline più recente, o nessuna se il sito è nuovo
      state.baselineId = s && s.previous.length ? s.previous[0].id : 'none'
      render()
    }),
  )

  root.querySelectorAll('[data-base]').forEach((b) =>
    b.addEventListener('click', () => {
      state.baselineId = b.dataset.base
      render()
    }),
  )

  bindDynamic()

  const fi = root.querySelector('#file')
  const drop = root.querySelector('#drop')
  if (drop) {
    drop.addEventListener('click', () => fi.click())
    drop.addEventListener('dragover', (e) => {
      e.preventDefault()
      drop.classList.add('over')
    })
    drop.addEventListener('dragleave', () => drop.classList.remove('over'))
    drop.addEventListener('drop', (e) => {
      e.preventDefault()
      if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0])
    })
  }
  const ch = root.querySelector('#change')
  if (ch) ch.addEventListener('click', () => fi.click())
  if (fi)
    fi.addEventListener('change', (e) => {
      if (e.target.files[0]) pickFile(e.target.files[0])
    })

  const g = root.querySelector('#go4')
  if (g) g.addEventListener('click', startAnalysis)
  const r = root.querySelector('#restart')
  if (r) r.addEventListener('click', startAnalysis)
  const sp = root.querySelector('#stop')
  if (sp) sp.addEventListener('click', stop)
  const pz = root.querySelector('#pause')
  if (pz) pz.addEventListener('click', togglePause)

  const v = root.querySelector('#vid')
  if (v && state.step === 4) {
    v.addEventListener('timeupdate', () => {
      if (state.phase !== 'live' || !v.duration) return
      onProgress(v.currentTime / v.duration)
    })
    v.addEventListener('ended', () => {
      if (state.phase === 'live') {
        state.t = 1
        stop()
      }
    })
    /* Allinea l'etichetta del bottone se la riproduzione cambia dai
       controlli nativi del video. Non si può chiamare render() qui:
       render() ricostruisce il DOM e distrugge l'elemento video,
       generando un evento 'pause' che rientrerebbe in questo
       listener in loop infinito. Si aggiorna solo il bottone. */
    v.addEventListener('play', () => {
      state.paused = false
      syncPauseButton()
    })
    v.addEventListener('pause', () => {
      if (state.phase === 'live' && !v.ended) {
        state.paused = true
        syncPauseButton()
      }
    })
  }

  bindSelection()
  bindProgress()
}

/* ---------- barra di avanzamento navigabile ---------- */

function seekTo(frac) {
  const v = root.querySelector('#vid')
  if (!v || !v.duration) return
  const t = Math.min(1, Math.max(0, frac))
  v.currentTime = t * v.duration
  state.t = t

  /* Riallinea lo stato alla nuova posizione: le anomalie già
     passate restano, quelle future vengono rimosse. Senza questo
     tornare indietro lascerebbe in lista anomalie non ancora viste. */
  const all = ANALYSES[state.useCaseId]
  const spot = state.findings.filter((f) => f.onDemand && f.at <= t)
  const auto = all.filter((f) => f.at <= t)
  state.findings = [...auto, ...spot].sort((a, b) => a.at - b.at)

  emitted.clear()
  all.forEach((f) => {
    if (f.at <= t) emitted.add(f.id)
  })
  const events = LOG_EVENTS_BY_CASE[state.useCaseId] || LOG_EVENTS_BY_CASE.default
  events.forEach((e, i) => {
    if (e.at <= t) emitted.add('l' + i)
  })
  const nSeg = Math.floor((t * MISSION_SECONDS) / SEGMENT_SECONDS)
  state.segments = []
  for (let s = 1; s <= nSeg; s++) {
    emitted.add('s' + s)
    const from = ((s - 1) * SEGMENT_SECONDS) / MISSION_SECONDS
    const to = (s * SEGMENT_SECONDS) / MISSION_SECONDS
    state.segments.push({
      label: `${elapsed(from)}–${elapsed(to)}`,
      count: all.filter((f) => f.at >= from && f.at < to).length,
    })
  }

  if (state.selected && !state.findings.some((f) => f.id === state.selected)) {
    state.selected = null
  }
  state.justFound = null
  clearTimeout(freshTimer)
  refresh()
}

let dragging = false
let progressBound = false

function bindProgress() {
  const bar = root.querySelector('#prog')
  if (!bar) return

  /* render() ricrea la barra, ma se l'elemento è lo stesso evita
     di sovrapporre i listener: un tasto produrrebbe più salti. */
  if (bar.dataset.bound) return
  bar.dataset.bound = '1'

  const frac = (e) => {
    const r = bar.getBoundingClientRect()
    return (e.clientX - r.left) / r.width
  }

  bar.addEventListener('mousedown', (e) => {
    e.stopPropagation() // non avviare la selezione area
    dragging = true
    bar.classList.add('dragging')
    seekTo(frac(e))
  })

  /* frecce per spostamenti fini, come nei player */
  bar.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 0.05 : 1 / 45 // ~2,25 s oppure 1 s
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      seekTo(state.t - step)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      seekTo(state.t + step)
    }
  })

  /* Il trascinamento prosegue anche fuori dalla barra, quindi i
     listener vanno su window. Registrati una sola volta: bindProgress
     viene richiamato a ogni render e li accumulerebbe. */
  if (progressBound) return
  progressBound = true

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return
    const b = root.querySelector('#prog')
    if (!b) return
    const r = b.getBoundingClientRect()
    seekTo((e.clientX - r.left) / r.width)
  })

  window.addEventListener('mouseup', () => {
    if (!dragging) return
    dragging = false
    const b = root.querySelector('#prog')
    if (b) b.classList.remove('dragging')
  })
}

function bindSelection() {
  const st = root.querySelector('#stage')
  if (!st || state.step !== 4) return

  const rel = (e) => {
    const r = st.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }
  }

  st.addEventListener('mousedown', (e) => {
    /* marker e barra di avanzamento hanno i propri gesti */
    if (e.target.closest('.marker') || e.target.closest('.prog')) return
    state.drawing = rel(e)
    state.box = { ...state.drawing, w: 0, h: 0 }
  })

  st.addEventListener('mousemove', (e) => {
    if (!state.drawing) return
    const p = rel(e)
    state.box = {
      x: Math.min(state.drawing.x, p.x),
      y: Math.min(state.drawing.y, p.y),
      w: Math.abs(p.x - state.drawing.x),
      h: Math.abs(p.y - state.drawing.y),
    }
    paintBox()
  })

  const end = () => {
    if (!state.drawing) return
    state.drawing = null
    if (state.box && (state.box.w < 4 || state.box.h < 4)) {
      state.box = null
      const el = st.querySelector('.sel-box')
      if (el) el.remove()
      return
    }
    if (state.box && !state.spotPending) askSpot()
  }
  st.addEventListener('mouseup', end)
  st.addEventListener('mouseleave', end)
}

function paintBox() {
  const st = root.querySelector('#stage')
  if (!st || !state.box) return
  let el = st.querySelector('.sel-box')
  if (!el) {
    el = document.createElement('div')
    el.className = 'sel-box'
    el.innerHTML = '<span class="sel-tag">Area selezionata</span>'
    st.appendChild(el)
  }
  Object.assign(el.style, {
    left: state.box.x + '%',
    top: state.box.y + '%',
    width: state.box.w + '%',
    height: state.box.h + '%',
  })
}

function pickFile(f) {
  if (state.videoUrl) URL.revokeObjectURL(state.videoUrl)
  state.file = f
  state.videoUrl = URL.createObjectURL(f)
  state.phase = 'ready'
  state.t = 0
  state.findings = []
  state.log = []
  state.selected = null
  state.box = null
  emitted.clear()
  render()
}

render()

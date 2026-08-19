// @ts-nocheck — vanilla browser script (DOM access, no type annotations)
//
// Logica condivisa tra LeadModal.astro (il modal "Contattaci" aperto da ogni
// pagina) e LeadFormInline.astro (lo stesso form incorporato in fondo alla
// pagina). Prima viveva duplicata identica in entrambi i file: un bug corretto
// in uno andava ripetuto manualmente nell'altro (è già successo col fix del
// fuso orario sulla data di richiamata/visita). Ora la logica vive qui una
// sola volta; ogni componente la inizializza passando il proprio elemento
// radice e il prefisso degli id usato da LeadFormBody.astro ("lm" o "li").
//
// initLeadForm(root, { prefix, onReset }) restituisce:
//   .open(pagina, cta)  → imposta pagina/cta di provenienza e mostra lo step 1
//   .reset()            → azzera stato e campi, richiama onReset() (es. chiudere il modal)

export function initLeadForm(root, options) {
  var P = options.prefix;
  var onReset = options.onReset || function () {};

  var LANG = document.documentElement.lang === 'en' ? 'en' : 'it';

  var WEBHOOK_CHECK = 'https://automazione.n8ndevelop.it/webhook/tca-verifica-iscritto';
  var WEBHOOK_LEAD  = 'https://automazione.n8ndevelop.it/webhook/tca-form-compilato';

  // Parametri di prenotazione (orari, durata slot, date di chiusura), gestiti
  // da TinaCMS e passati dal componente Astro via data-availability sul nodo
  // radice. Il fallback riproduce i valori di default se l'attributo manca
  // o non è JSON valido, così il form non si rompe mai.
  var AVAIL = (function () {
    var fallback = {
      dataInizio: '2026-08-08', oraApertura: '10:30', oraChiusura: '19:00',
      durataRichiamata: 20, durataVisita: 30,
      giorniRichiamata: 7, giorniVisita: 14, dateChiuse: ['2026-08-15'],
    };
    try {
      return Object.assign({}, fallback, JSON.parse(root.dataset.availability || ''));
    } catch (e) { return fallback; }
  })();

  var ATTIVITA_LABELS = LANG === 'en' ? {
    tennis:'Adult Tennis', padel:'Padel', prep:'Athletic Training',
    scuola:'Tennis School (children)', agonistica:'Competitive Tennis',
    camps:'Summer Camps', membership:'Membership',
  } : {
    tennis:'Tennis Adulti', padel:'Padel', prep:'Preparazione Atletica',
    scuola:'Scuola Tennis (bambini)', agonistica:'Agonistica Tennis',
    camps:'Summer Camps', membership:'Membership / Abbonamento',
  };

  // Gruppo attività: determina il flusso condizionale insieme allo stato utente.
  // Regola: basta UNA attività adulti perché il contatto sia adulti; junior solo
  // se tutte le attività scelte sono junior. È la stessa regola dell'IF
  // "Adulti / Bambini" nei workflow n8n, che sulla risposta del check è
  // autoritativo: tenerle allineate evita classificazioni contraddittorie.
  var JUNIOR_IDS  = ['scuola','agonistica','camps'];
  var ADULTI_IDS  = ['tennis','padel','prep','membership'];

  // Nessuna attività selezionata (i checkbox non sono obbligatori) → adulti,
  // come si è sempre comportato il form.
  function gruppoDa(attivita) {
    var haAdulti = attivita.some(function(id){ return ADULTI_IDS.indexOf(id) !== -1; });
    var haJunior = attivita.some(function(id){ return JUNIOR_IDS.indexOf(id) !== -1; });
    return (haJunior && !haAdulti) ? 'junior' : 'adulti';
  }

  var DAYS_LONG = LANG === 'en'
    ? ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    : ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
  var MONTHS_LONG = LANG === 'en'
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
  var MONTHS_FULL = LANG === 'en'
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];

  var DOW_SHORT = LANG === 'en'
    ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    : ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];

  var SLOT_GROUPS = LANG === 'en'
    ? [
        {label:'Morning',   h1:0,  h2:13},
        {label:'Afternoon', h1:13, h2:17},
        {label:'Evening',   h1:17, h2:24},
      ]
    : [
        {label:'Mattina',    h1:0,  h2:13},
        {label:'Pomeriggio', h1:13, h2:17},
        {label:'Sera',       h1:17, h2:24},
      ];

  var ERR = LANG === 'en' ? {
    email:       'Please enter a valid email address.',
    nome:        'Please enter your first name.',
    cognome:     'Please enter your last name.',
    cell:        'Please enter a valid mobile number.',
    privacy:     'Consent to the Privacy Policy is required.',
    cbDate:      'Required: please choose a day for the call.',
    cbTime:      'Required: please select an available time.',
    cbReason:    'Required: please describe the reason for your call.',
    visitDate:   'Required: please choose a day for the visit.',
    visitTime:   'Required: please select an available time.',
    visitReason: 'Required: please describe the reason for your visit.',
    msg:         'Please write your request before sending.',
  } : {
    email:       'Inserisci un indirizzo email valido.',
    nome:        'Inserisci il tuo nome.',
    cognome:     'Inserisci il tuo cognome.',
    cell:        'Inserisci un numero di cellulare valido.',
    privacy:     'Il consenso alla Privacy Policy è obbligatorio.',
    cbDate:      'Campo obbligatorio: scegli un giorno per la chiamata.',
    cbTime:      'Campo obbligatorio: seleziona un orario disponibile.',
    cbReason:    'Campo obbligatorio: descrivi il motivo della chiamata.',
    visitDate:   'Campo obbligatorio: scegli un giorno per la visita.',
    visitTime:   'Campo obbligatorio: seleziona un orario disponibile.',
    visitReason: 'Campo obbligatorio: descrivi il motivo della visita.',
    msg:         'Scrivi la tua richiesta prima di inviare.',
  };

  var WHEN = LANG === 'en' ? {
    cb:      "We'll call you on",
    cbAt:    'At',
    cbNum:   'On the number',
    visit:   'See you on',
    visitAt: 'At',
  } : {
    cb:      'Ti richiamiamo il',
    cbAt:    'Alle ore',
    cbNum:   'Al numero',
    visit:   'Ci vediamo il',
    visitAt: 'Alle ore',
  };

  var ROW_LABELS = LANG === 'en' ? {
    email:      'Email',
    name:       'Name',
    activities: 'Activities',
    reason:     'Reason',
    mobile:     'Mobile',
    request:    'Request',
  } : {
    email:      'Email',
    name:       'Nome',
    activities: 'Attività',
    reason:     'Motivo',
    mobile:     'Cellulare',
    request:    'Richiesta',
  };

  function fmtDateLong(d) {
    return DAYS_LONG[d.getDay()] + ' ' + d.getDate() + ' ' +
           MONTHS_LONG[d.getMonth()] + ' ' + d.getFullYear();
  }

  function pad2(n) { return String(n).padStart(2,'0'); }

  // Data del calendario come stringa "YYYY-MM-DD" nel fuso locale del
  // visitatore (Europe/Rome). JSON.stringify(Date) chiama toISOString(),
  // che converte in UTC: una mezzanotte locale (es. 29 luglio 00:00 CEST)
  // diventa "28 luglio 22:00Z", e chi legge il payload senza riconvertire
  // al fuso locale vede la data sbagliata, un giorno indietro. Inviare una
  // data pura (senza ora né fuso) elimina l'ambiguità a monte.
  function isoDateLocal(d) {
    if (!d) return null;
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function initialState() {
    return {
      email:'', nome:'', cognome:'', cellulare:'',
      attivita:[], privacy:false, marketing:false, isNewUser:true,
      stato:'nuovo', gruppoAttivita:'', flow:null,
      pagina:'', cta:'',
      callbackDate:null, callbackTime:null, callbackReason:'',
      visitDate:null,    visitTime:null,    visitReason:'', messageText:'',
    };
  }
  var state = initialState();

  // UTM/click-id catturati al primo touch della sessione (vedi BaseLayout.astro)
  function getUtm() {
    if (window.tcaGetUtm) return window.tcaGetUtm();
    try { return JSON.parse(sessionStorage.getItem('tca_utm') || '{}'); } catch (e) { return {}; }
  }

  // ID visitatore persistente (vedi BaseLayout.astro), per riconoscere il
  // lead al ritorno sul sito indipendentemente dall'email inserita
  function getVid() {
    return window.tcaGetVid ? window.tcaGetVid() : null;
  }

  // Conversione: evento unico per i tre tipi di richiesta, così in GTM basta
  // un trigger su "generate_lead" e si segmenta con lead_tipo. Nessun dato
  // personale nell'evento: solo tipo di richiesta, pagina e testo del
  // pulsante, che servono a distinguere le conversioni per campagna.
  function trackLead(tipo) {
    if (!window.tcaTrack) return;
    window.tcaTrack('generate_lead', {
      lead_tipo: tipo,
      lead_pagina: state.pagina || location.pathname,
      lead_cta: state.cta || '',
      lead_attivita: attivitaLabels().join(', '),
    });
  }

  var stepsBar = root.querySelector('.lm__steps');
  var stepDots = root.querySelectorAll('[data-step-dot]');

  function showStep(n, activeDot) {
    var key = String(n);
    root.querySelectorAll('[data-step]').forEach(function(el) {
      el.hidden = (el.dataset.step !== key);
    });
    var isMain = (key === '1' || key === '2' || key === '3');
    if (stepsBar) stepsBar.hidden = !isMain;
    if (isMain && activeDot !== undefined) {
      stepDots.forEach(function(dot) {
        var d = parseInt(dot.dataset.stepDot, 10);
        dot.classList.toggle('is-active', d === activeDot);
        dot.classList.toggle('is-done',   d < activeDot);
        if (d >= activeDot) dot.classList.remove('is-done');
        if (d !== activeDot) dot.classList.remove('is-active');
      });
    }
  }

  function getStep(n) { return root.querySelector('[data-step="' + n + '"]'); }

  function showError(el, msg) {
    var err = el.querySelector('.lm__error');
    if (err) { err.textContent = msg; err.hidden = false; }
  }

  function clearError(el) {
    var err = el.querySelector('.lm__error');
    if (err) err.hidden = true;
  }

  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }

  // Numero locale (senza prefisso, gestito a parte dalla select): solo
  // cifre/spazi/trattini, lunghezza plausibile per un cellulare reale.
  // Esclude anche le cifre tutte uguali (es. 9999999999, 0000000000),
  // pattern che supererebbe il controllo di lunghezza ma non è un numero reale.
  function isValidPhone(v) {
    var cifre = v.replace(/[^0-9]/g, '');
    if (!/^[0-9\s-]+$/.test(v.trim())) return false;
    if (cifre.length < 6 || cifre.length > 14) return false;
    if (/^(\d)\1+$/.test(cifre)) return false;
    return true;
  }

  // Etichette complete delle attività selezionate, per i payload inviati ai webhook
  function attivitaLabels() {
    return state.attivita.map(function(id) { return ATTIVITA_LABELS[id] || id; });
  }

  // Il webhook n8n restituisce stato+gruppo insieme (es. "iscritto_adulto",
  // "esiste_bambino"): li separiamo qui. Il gruppo di n8n è autoritativo
  // (deriva dall'IF "Adulti / Bambini" del workflow) e sovrascrive la
  // classificazione fatta da gruppoDa().
  //
  // Le due devono applicare la STESSA regola (una attività adulti ⇒ adulti).
  // Attenzione: l'IF di n8n confronta le ETICHETTE tradotte, non gli id, quindi
  // va aggiornato a ogni nuova lingua o rinomina di un'attività — se un'etichetta
  // non è nell'elenco, quel contatto finisce sul ramo junior. È esattamente così
  // che i lead adulti dal sito inglese venivano salvati come junior.
  var GRUPPO_MAP = { adulto:'adulti', bambino:'junior' };
  function parseStato(raw) {
    var m = /^(iscritto|esiste|nuovo)(?:_(adulto|bambino))?$/.exec(String(raw || ''));
    if (!m) return { stato:'nuovo', gruppo:null };
    return { stato:m[1], gruppo: m[2] ? GRUPPO_MAP[m[2]] : null };
  }

  function reset() {
    state = initialState();

    ['#'+P+'-email','#'+P+'-nome','#'+P+'-cognome','#'+P+'-cell','#'+P+'-cb-reason','#'+P+'-visit-reason','#'+P+'-msg-text']
      .forEach(function(s) { var el = root.querySelector(s); if (el) el.value = ''; });
    root.querySelectorAll('input[type="checkbox"]').forEach(function(c) { c.checked = false; });

    [P+'-cal-cb',P+'-cal-visit'].forEach(function(id) { var el = document.getElementById(id); if (el) el.innerHTML = ''; });
    [P+'-cal-slots-cb',P+'-cal-slots-visit'].forEach(function(id) { var el = document.getElementById(id); if (el) el.innerHTML = ''; });
    [P+'-slots-wrap-cb',P+'-slots-wrap-visit'].forEach(function(id) { var el = document.getElementById(id); if (el) el.hidden = true; });

    showStep(1, 1);
    onReset();
  }

  // Chiusura tramite pulsanti [data-lm-close] dentro root (es. "X" o "Chiudi"
  // nello schermo di conferma). La chiusura via backdrop del modal, che non
  // è un discendente di root, resta gestita dal chiamante tramite .reset().
  root.addEventListener('click', function(e) {
    if (e.target.closest('[data-lm-close]')) reset();
  });

  // Back generico
  root.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-step-back]');
    if (!btn) return;
    var t = btn.dataset.stepBack;
    showStep(t, parseInt(t,10) || 3);
  });

  // STEP 1
  var emailInput = root.querySelector('#'+P+'-email');
  emailInput.addEventListener('blur', function() {
    emailInput.classList.toggle('lm__input--error', !!emailInput.value && !isValidEmail(emailInput.value));
  });
  emailInput.addEventListener('input', function() {
    if (isValidEmail(emailInput.value)) emailInput.classList.remove('lm__input--error');
  });

  var cellInput = root.querySelector('#'+P+'-cell');
  cellInput.addEventListener('blur', function() {
    cellInput.classList.toggle('lm__input--error', !!cellInput.value && !isValidPhone(cellInput.value));
  });
  cellInput.addEventListener('input', function() {
    if (isValidPhone(cellInput.value)) cellInput.classList.remove('lm__input--error');
  });

  root.querySelector('#'+P+'-step1-next').addEventListener('click', async function() {
    var s1     = getStep(1);
    var loader = s1.querySelector('.lm__loader');
    var btn    = s1.querySelector('#'+P+'-step1-next');
    clearError(s1); emailInput.classList.remove('lm__input--error');

    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      emailInput.classList.add('lm__input--error');
      showError(s1, ERR.email); emailInput.focus(); return;
    }

    state.email    = emailInput.value.trim();
    state.attivita = Array.from(root.querySelectorAll('input[name="attivita"]:checked')).map(function(c){return c.value;});
    state.gruppoAttivita = gruppoDa(state.attivita);
    btn.disabled   = true; loader.hidden = false;

    try {
      var stato = 'nuovo';
      if (WEBHOOK_CHECK) {
        // gruppoAttivita e attivitaIds viaggiano insieme alle etichette: l'IF
        // "Adulti / Bambini" di n8n legge il gruppo già calcolato qui, invece di
        // dedurlo dalle etichette tradotte (vedi il commento su parseStato).
        // Le etichette restano nel payload perché servono ai testi delle email.
        var r = await fetch(WEBHOOK_CHECK,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:state.email, attivita:attivitaLabels(), attivitaIds:state.attivita, gruppoAttivita:state.gruppoAttivita, pagina:state.pagina, cta:state.cta, utm:getUtm(), vid:getVid()})});
        var data   = await r.json();
        var parsed = parseStato(data.stato);
        stato = parsed.stato;
        if (parsed.gruppo) state.gruppoAttivita = parsed.gruppo;
      }
      state.stato     = stato;
      state.isNewUser = stato === 'nuovo';
      // 1: iscritto · 2/4: esiste (adulti/junior) · 3/5: nuovo (adulti/junior)
      state.flow = stato === 'iscritto' ? 1
                 : stato === 'esiste'   ? (state.gruppoAttivita === 'adulti' ? 2 : 4)
                 :                        (state.gruppoAttivita === 'adulti' ? 3 : 5);
      loader.hidden = true; btn.disabled = false;

      if (stato === 'nuovo') {
        showStep(2,2);
      } else if (stato === 'esiste' && state.gruppoAttivita === 'adulti') {
        showStep(3,3);
      } else {
        // iscritto (adulti o junior) ed esiste_bambino: salta la scelta,
        // va dritto allo step "scrivi un messaggio"
        showStep('4-message');
      }
    } catch(e) {
      loader.hidden = true; btn.disabled = false;
      state.stato = 'nuovo'; state.isNewUser = true;
      state.flow  = state.gruppoAttivita === 'adulti' ? 3 : 5;
      showStep(2,2);
    }
  });

  // STEP 2
  root.querySelector('#'+P+'-step2-back').addEventListener('click', function(){ showStep(1,1); });

  root.querySelector('#'+P+'-step2-next').addEventListener('click', function() {
    var s2 = getStep(2); clearError(s2); cellInput.classList.remove('lm__input--error');
    var nome=root.querySelector('#'+P+'-nome'), cognome=root.querySelector('#'+P+'-cognome'),
        cell=root.querySelector('#'+P+'-cell'), privacy=root.querySelector('#'+P+'-privacy');

    if (!nome.value.trim())    { showError(s2, ERR.nome); nome.focus(); return; }
    if (!cognome.value.trim()) { showError(s2, ERR.cognome); cognome.focus(); return; }
    if (!cell.value.trim() || !isValidPhone(cell.value)) {
      cellInput.classList.add('lm__input--error');
      showError(s2, ERR.cell); cell.focus(); return;
    }
    if (!privacy.checked)      { showError(s2, ERR.privacy); return; }

    var prefix = root.querySelector('#'+P+'-pfx');
    state.nome      = nome.value.trim();
    state.cognome   = cognome.value.trim();
    state.cellulare = (prefix ? prefix.value : '+39') + ' ' + cell.value.trim();
    state.privacy   = true;
    state.marketing = root.querySelector('#'+P+'-marketing').checked;

    if (state.gruppoAttivita === 'junior') {
      // nuovo_bambino: salta la scelta, va dritto allo step "scrivi un messaggio"
      showStep('4-message');
    } else {
      showStep(3,3);
    }
  });

  // STEP 3
  root.querySelector('#'+P+'-step3-back').addEventListener('click', function() {
    showStep(state.isNewUser ? 2 : 1, state.isNewUser ? 2 : 1);
  });

  root.querySelectorAll('.lm__action-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var a = btn.dataset.action;
      if      (a === 'callback') { buildCalendar('cb');    showStep('4-callback'); }
      else if (a === 'visit')    { buildCalendar('visit'); showStep('4-visit'); }
      else if (a === 'message')  { showStep('4-message'); }
    });
  });

  // GENERAZIONE SLOT
  // Richiamata e visita in sede condividono le stesse regole di disponibilità
  // (nessuna disponibilità prima di sabato 8 agosto 2026 — vedi AVAIL_START in
  // buildCalendar — orario 10:30-19:00 ogni giorno, chiuso sabato 15 agosto
  // 2026); cambia solo il passo degli slot: 20 minuti per la richiamata,
  // 30 per la visita.
  var AVAIL_CLOSED_DATES = AVAIL.dateChiuse;

  // "HH:MM" -> minuti da mezzanotte
  function parseHHMM(s) {
    var m = /^(\d{1,2}):(\d{2})$/.exec(String(s || '').trim());
    return m ? (parseInt(m[1], 10) * 60 + parseInt(m[2], 10)) : null;
  }

  function slotsInRange(date, stepMinutes) {
    if (AVAIL_CLOSED_DATES.indexOf(isoDateLocal(date)) !== -1) return [];
    var start = parseHHMM(AVAIL.oraApertura);
    var end   = parseHHMM(AVAIL.oraChiusura);
    if (start == null || end == null) return [];
    var slots = [];
    // Griglia ancorata esattamente all'orario di apertura, non ai multipli
    // di stepMinutes dalla mezzanotte: altrimenti col passo di 20' il primo
    // slot potrebbe cadere fuori orario se l'apertura non è un suo multiplo.
    for (var t = start; t < end; t += stepMinutes) {
      slots.push(pad2(Math.floor(t / 60)) + ':' + pad2(t % 60));
    }
    return slots;
  }

  function slotsCallback(date) { return slotsInRange(date, AVAIL.durataRichiamata); }
  function slotsVisit(date)    { return slotsInRange(date, AVAIL.durataVisita); }

  // Ora corrente a Milano (Europe/Rome), indipendente dal fuso del browser
  function milanParts(d) {
    var parts = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Rome',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(d).forEach(function(p){ parts[p.type] = p.value; });
    return {
      y: parseInt(parts.year, 10),
      m: parseInt(parts.month, 10),
      d: parseInt(parts.day, 10),
      minutes: (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10)
    };
  }

  function buildCalendar(type) {
    var numDays     = type === 'cb' ? AVAIL.giorniRichiamata : AVAIL.giorniVisita;
    var slotsFn     = type === 'cb' ? slotsCallback : slotsVisit;
    var calWrapEl   = document.getElementById(P+'-cal-'+type);
    var slotsWrapEl = document.getElementById(P+'-slots-wrap-'+type);
    var slotsBodyEl = document.getElementById(P+'-cal-slots-'+type);
    var reasonEl    = document.getElementById(type === 'cb' ? P+'-cb-reason' : P+'-visit-reason');

    // Primo orario disponibile: almeno 2 ore dall'ora attuale di Milano (solo per oggi)
    function availFor(date) {
      var slots = slotsFn(date);
      var now = milanParts(new Date());
      if (date.getFullYear() === now.y && (date.getMonth()+1) === now.m && date.getDate() === now.d) {
        var cutoff = now.minutes + 120;
        slots = slots.filter(function(s){
          return (parseInt(s.slice(0,2),10) * 60 + parseInt(s.slice(3,5),10)) >= cutoff;
        });
      }
      return slots;
    }

    var today = new Date(); today.setHours(0,0,0,0);
    // Richiamata e visita: nessuna disponibilità prima della data configurata
    // in AVAIL.dataInizio (formato "YYYY-MM-DD", fuso locale, non UTC).
    var inizioParts = AVAIL.dataInizio.split('-').map(function (n) { return parseInt(n, 10); });
    var availStart = new Date(inizioParts[0], inizioParts[1] - 1, inizioParts[2]);
    if (today < availStart) today = availStart;
    var endDate = new Date(today); endDate.setDate(today.getDate() + numDays - 1);
    var viewY   = today.getFullYear();
    var viewM   = today.getMonth();
    var selDate = null;
    var selTime = null;

    if (reasonEl) {
      var newReason = reasonEl.cloneNode(true);
      reasonEl.parentNode.replaceChild(newReason, reasonEl);
      reasonEl = newReason;
    }

    function renderMonth() {
      var firstDay  = new Date(viewY, viewM, 1);
      var lastDay   = new Date(viewY, viewM + 1, 0);
      var startDOW  = (firstDay.getDay() + 6) % 7;

      var canPrev = viewY > today.getFullYear() || (viewY === today.getFullYear() && viewM > today.getMonth());
      var nextM1  = new Date(viewY, viewM + 1, 1);
      var canNext = endDate >= nextM1;
      var navId   = P+'-nav-'+type;

      var html = '<div class="lm__cal-nav">' +
        '<button class="lm__cal-nav-btn" id="'+navId+'-prev"' + (!canPrev ? ' disabled' : '') + '>&#8249;</button>' +
        '<span class="lm__cal-month-name">' + MONTHS_FULL[viewM] + ' ' + viewY + '</span>' +
        '<button class="lm__cal-nav-btn" id="'+navId+'-next"' + (!canNext ? ' disabled' : '') + '>&#8250;</button>' +
      '</div>' +
      '<div class="lm__cal-grid">';

      DOW_SHORT.forEach(function(d) {
        html += '<div class="lm__cal-dow">' + d + '</div>';
      });

      for (var i = 0; i < startDOW; i++) html += '<div class="lm__cal-cell"></div>';

      for (var day = 1; day <= lastDay.getDate(); day++) {
        var d    = new Date(viewY, viewM, day);
        var past = d < today;
        var fut  = d > endDate;
        var avail = !past && !fut && availFor(d).length > 0;
        var isTod = d.getTime() === today.getTime();
        var isSel = selDate && d.getTime() === selDate.getTime();

        var cls = 'lm__cal-cell lm__cal-day';
        cls += avail ? ' lm__cal-day--avail' : ' lm__cal-day--off';
        if (isTod) cls += ' lm__cal-day--today';
        if (isSel) cls += ' lm__cal-day--sel';

        var attr = avail ? ' data-cal-d="' + d.toISOString() + '"' : '';
        html += '<div class="' + cls + '"' + attr + '>' + day + '</div>';
      }

      html += '</div>';
      calWrapEl.innerHTML = html;

      var prevBtn = document.getElementById(navId+'-prev');
      var nextBtn = document.getElementById(navId+'-next');
      if (prevBtn && canPrev) {
        prevBtn.addEventListener('click', function() {
          viewM--; if (viewM < 0) { viewM = 11; viewY--; } renderMonth();
        });
      }
      if (nextBtn && canNext) {
        nextBtn.addEventListener('click', function() {
          viewM++; if (viewM > 11) { viewM = 0; viewY++; } renderMonth();
        });
      }

      calWrapEl.querySelectorAll('.lm__cal-day--avail').forEach(function(cell) {
        cell.addEventListener('click', function() {
          selDate = new Date(cell.dataset.calD);
          selTime = null;
          if (type === 'cb')   { state.callbackDate = selDate; state.callbackTime = null; }
          else                  { state.visitDate    = selDate; state.visitTime    = null; }
          renderMonth();
          renderSlots();
        });
      });
    }

    function renderSlots() {
      if (!selDate) return;
      slotsBodyEl.innerHTML = '';
      if (slotsWrapEl) slotsWrapEl.hidden = false;

      var all = availFor(selDate);

      SLOT_GROUPS.forEach(function(g) {
        var slots = all.filter(function(s){ var h=parseInt(s); return h>=g.h1&&h<g.h2; });
        if (!slots.length) return;
        g = { label: g.label, slots: slots };
        var gDiv  = document.createElement('div'); gDiv.className = 'lm__slots-group';
        var label = document.createElement('div'); label.className = 'lm__slots-group-label'; label.textContent = g.label;
        var row   = document.createElement('div'); row.className = 'lm__slots-row';

        g.slots.forEach(function(time) {
          var sb = document.createElement('button');
          sb.type = 'button'; sb.className = 'lm__cal-slot-btn'; sb.textContent = time;
          sb.addEventListener('click', function() {
            slotsBodyEl.querySelectorAll('.lm__cal-slot-btn').forEach(function(b){ b.classList.remove('is-active'); });
            sb.classList.add('is-active');
            selTime = time;
            if (type === 'cb') state.callbackTime = time;
            else               state.visitTime    = time;
          });
          row.appendChild(sb);
        });

        gDiv.appendChild(label); gDiv.appendChild(row);
        slotsBodyEl.appendChild(gDiv);
      });

      slotsWrapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    renderMonth();
  }

  // STEP 4a
  document.getElementById(P+'-cb-confirm').addEventListener('click', async function() {
    var s = getStep('4-callback'); clearError(s);
    var r = root.querySelector('#'+P+'-cb-reason');
    if (!state.callbackDate) { showError(s, ERR.cbDate); return; }
    if (!state.callbackTime) { showError(s, ERR.cbTime); return; }
    if (!r.value.trim()) { showError(s, ERR.cbReason); r.focus(); return; }
    state.callbackReason = r.value.trim();

    if (WEBHOOK_LEAD) {
      try { await fetch(WEBHOOK_LEAD,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({},state,{tipo:'richiamami',callbackDate:isoDateLocal(state.callbackDate),attivita:attivitaLabels(),utm:getUtm(),vid:getVid()}))}); } catch(e){}
    }

    // Conversione per GTM/Google Ads (vedi tcaTrack in BaseLayout).
    trackLead('richiamami');

    var atts = state.attivita.map(function(id){return ATTIVITA_LABELS[id]||id;}).join(', ')||'—';
    document.getElementById(P+'-cb-when').innerHTML =
      whenRow(WHEN.cb, fmtDateLong(state.callbackDate)) +
      whenRow(WHEN.cbAt, state.callbackTime) +
      (state.cellulare ? whenRow(WHEN.cbNum, esc(state.cellulare)) : '');

    document.getElementById(P+'-cb-summary').innerHTML =
      row(ROW_LABELS.email, esc(state.email)) +
      (state.nome ? row(ROW_LABELS.name, esc(state.nome+' '+state.cognome)) : '') +
      (atts!=='—' ? row(ROW_LABELS.activities, esc(atts)) : '') +
      row(ROW_LABELS.reason, esc(state.callbackReason));

    showStep('confirm-callback');
  });

  // STEP 4b
  document.getElementById(P+'-visit-confirm').addEventListener('click', async function() {
    var s = getStep('4-visit'); clearError(s);
    var r = root.querySelector('#'+P+'-visit-reason');
    if (!state.visitDate) { showError(s, ERR.visitDate); return; }
    if (!state.visitTime) { showError(s, ERR.visitTime); return; }
    if (!r.value.trim()) { showError(s, ERR.visitReason); r.focus(); return; }
    state.visitReason = r.value.trim();

    if (WEBHOOK_LEAD) {
      try { await fetch(WEBHOOK_LEAD,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({},state,{tipo:'visita',visitDate:isoDateLocal(state.visitDate),attivita:attivitaLabels(),utm:getUtm(),vid:getVid()}))}); } catch(e){}
    }

    // Conversione per GTM/Google Ads (vedi tcaTrack in BaseLayout).
    trackLead('visita');

    var atts = state.attivita.map(function(id){return ATTIVITA_LABELS[id]||id;}).join(', ')||'—';
    document.getElementById(P+'-visit-when').innerHTML =
      whenRow(WHEN.visit, fmtDateLong(state.visitDate)) +
      whenRow(WHEN.visitAt, state.visitTime);

    document.getElementById(P+'-visit-summary').innerHTML =
      row(ROW_LABELS.email, esc(state.email)) +
      (state.nome ? row(ROW_LABELS.name, esc(state.nome+' '+state.cognome)) : '') +
      (state.cellulare ? row(ROW_LABELS.mobile, esc(state.cellulare)) : '') +
      (atts!=='—' ? row(ROW_LABELS.activities, esc(atts)) : '') +
      row(ROW_LABELS.reason, esc(state.visitReason));

    showStep('confirm-visit');
  });

  // STEP 4c
  document.getElementById(P+'-msg-send').addEventListener('click', async function() {
    var s = getStep('4-message'); clearError(s);
    var msgEl = root.querySelector('#'+P+'-msg-text');
    if (!msgEl.value.trim()) { showError(s, ERR.msg); msgEl.focus(); return; }
    state.messageText = msgEl.value.trim();

    if (WEBHOOK_LEAD) {
      try { await fetch(WEBHOOK_LEAD,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({},state,{tipo:'messaggio',attivita:attivitaLabels(),utm:getUtm(),vid:getVid()}))}); } catch(e){}
    }

    // Conversione per GTM/Google Ads (vedi tcaTrack in BaseLayout).
    trackLead('messaggio');

    var atts = state.attivita.map(function(id){return ATTIVITA_LABELS[id]||id;}).join(', ')||'—';
    document.getElementById(P+'-msg-summary').innerHTML =
      row(ROW_LABELS.email, esc(state.email)) +
      (state.nome ? row(ROW_LABELS.name, esc(state.nome+' '+state.cognome)) : '') +
      (atts!=='—' ? row(ROW_LABELS.activities, esc(atts)) : '') +
      row(ROW_LABELS.request, esc(state.messageText));

    showStep('confirm-message');
  });

  function whenRow(label, val) {
    return '<div class="lm__confirm-when-row">' +
      '<span class="lm__confirm-when-label">'+label+'</span>' +
      '<span class="lm__confirm-when-val">'+val+'</span>' +
    '</div>';
  }

  function row(label, val) {
    return '<div class="lm__confirm-row"><span>'+label+'</span><span>'+val+'</span></div>';
  }

  return {
    open: function (pagina, cta) {
      state.pagina = pagina || location.pathname;
      state.cta = cta || '';
      showStep(1, 1);
    },
    reset: reset,
  };
}

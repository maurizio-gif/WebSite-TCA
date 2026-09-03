// @ts-nocheck — vanilla browser script (DOM access, no type annotations)
//
// Logica del form di prenotazione eventi (src/components/EventoPrenotazioneForm.astro).
// Vive qui e non nel componente perché il form è pensato per essere agganciato
// a QUALSIASI evento dalla spunta "Prenotazione online attiva" in TinaCMS: la
// stessa logica serve a tutti gli eventi presenti e futuri, e un bug corretto
// deve valere per tutti (è la lezione di leadForm.client.js, che era duplicato
// fra modal e form inline).
//
// Flusso:
//   0. all'apertura chiede la disponibilità al CRM (posti residui + quote)
//   1. socio o non socio — DICHIARATO, non verificato
//   2. dati: nome, cognome, email, cellulare, consenso privacy
//   3. riepilogo con la quota corrispondente alla dichiarazione → conferma
//   4. schermata finale con la scadenza calcolata dal server
//
// Le quote non si mostrano prima della dichiarazione: al passo 1 servirebbero
// solo a far scegliere "socio" a chi socio non è.
//
// La quota finale la decide comunque il server dal manifest pubblicato dalla
// build (vedi src/pages/eventi-prenotabili.json.ts): qui si sceglie solo quale
// delle due proporre.

import { appTca } from '../data/links';

export function initEventoForm(root) {
  var SLUG = root.dataset.slug;
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'it';

  var T = LANG === 'en' ? {
    sending:      'Saving your booking…',
    errEmail:     'Please enter a valid email address.',
    errNome:      'Please enter your first name.',
    errCognome:   'Please enter your last name.',
    errCell:      'Please enter a valid mobile number.',
    errPrivacy:   'Consent to the Privacy Policy is required.',
    errGeneric:   'Something went wrong. Please try again or contact reception.',
    errAlready:   'There is already a booking with this email address for this event.',
    seatsLeft:    function (n) { return n === 1 ? '1 spot left' : n + ' spots left'; },
    youAreMember: 'You have declared you are a Club Member, so the member rate applies. It is checked at reception when you pay.',
    youAreGuest:  'You have declared you are not a Club Member, so the standard rate applies.',
    payLabel:     'To pay at reception',
    hold:         function (ore) {
      return [
        { icona: 'clock', testo: 'Your spot is held for <strong>' + ore + ' hours</strong> from now.' },
        { icona: 'cash',  testo: 'Payment is made <strong>at reception</strong>, at the Club.' },
        { icona: 'check', testo: 'The booking becomes final only once payment is received.' },
        { icona: 'warn',  testo: 'Without payment within ' + ore + ' hours the booking is cancelled and the spot is released.', warn: true },
      ];
    },
    confirmFee:   function (q) { return 'Amount to pay at reception: <strong>€' + q + '</strong>'; },
    confirmBy:    function (quando) { return 'Pay by <strong>' + quando + '</strong>, otherwise the spot is released.'; },
  } : {
    sending:      'Salvataggio della prenotazione…',
    errEmail:     'Inserisci un indirizzo email valido.',
    errNome:      'Inserisci il tuo nome.',
    errCognome:   'Inserisci il tuo cognome.',
    errCell:      'Inserisci un numero di cellulare valido.',
    errPrivacy:   'Il consenso alla Privacy Policy è obbligatorio.',
    errGeneric:   'Qualcosa è andato storto. Riprova o contatta la Reception.',
    errAlready:   'Con questa email risulta già una prenotazione per questo evento.',
    seatsLeft:    function (n) { return n === 1 ? '1 posto disponibile' : n + ' posti disponibili'; },
    youAreMember: 'Hai dichiarato di essere Socio del Club, quindi si applica la quota soci. Viene verificata in cassa al momento del pagamento.',
    youAreGuest:  'Hai dichiarato di non essere Socio del Club, quindi si applica la quota intera.',
    payLabel:     'Da pagare in cassa',
    hold:         function (ore) {
      return [
        { icona: 'clock', testo: 'Il posto resta impegnato per <strong>' + ore + ' ore</strong> da adesso.' },
        { icona: 'cash',  testo: 'Il pagamento si effettua <strong>in cassa</strong>, in Reception.' },
        { icona: 'check', testo: 'La prenotazione diventa definitiva solo con l’avvenuto pagamento.' },
        { icona: 'warn',  testo: 'Se il pagamento non avviene entro ' + ore + ' ore la prenotazione viene rimossa e il posto torna disponibile.', warn: true },
      ];
    },
    confirmFee:   function (q) { return 'Quota da pagare in cassa: <strong>€' + q + '</strong>'; },
    confirmBy:    function (quando) { return 'Paga entro <strong>' + quando + '</strong>, altrimenti il posto torna disponibile.'; },
  };

  var stato = { socio: null, quota: null, oreScadenza: 48 };

  // ── Helper DOM ────────────────────────────────────────────────────────
  //
  // Le ricerche partono dalla sezione, non dal solo pannello: i posti residui
  // stanno nella colonna di intro, fuori da [data-ev-root]. Restano comunque
  // circoscritte a questo form, così due form nella stessa pagina non si
  // scriverebbero addosso.
  var scope = root.closest('.evp') || root;

  function q(sel) { return scope.querySelector(sel); }
  function step(nome) { return root.querySelector('[data-ev-step="' + nome + '"]'); }

  function mostra(nome) {
    root.querySelectorAll('[data-ev-step]').forEach(function (el) {
      el.hidden = el.dataset.evStep !== nome;
    });
  }

  function errore(nome, testo) {
    var el = step(nome).querySelector('.lm__error');
    if (!el) return;
    el.hidden = !testo;
    el.textContent = testo || '';
  }

  function loader(nome, visibile, testo) {
    var el = step(nome).querySelector('.lm__loader');
    if (!el) return;
    el.hidden = !visibile;
    if (testo) {
      var label = el.querySelector('[data-ev-loader-text]');
      if (label) label.textContent = testo;
    }
  }

  // Icone delle regole: inline, non un font o un'immagine — sono quattro
  // glifi, non vale una richiesta di rete in più su una schermata che si
  // guarda per dieci secondi.
  var ICONE = {
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    cash:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5L9.5 18L20 6.5"/></svg>',
    warn:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L22 20H2L12 3z"/><path d="M12 10v4"/><path d="M12 17.5v.01"/></svg>',
  };

  function passi(attivo) {
    var barra = q('[data-ev-steps]');
    if (!barra) return;
    barra.hidden = false;
    [1, 2, 3].forEach(function (n) {
      var el = barra.querySelector('[data-ev-dot="' + n + '"]');
      if (!el) return;
      el.className = 'evp__step' +
        (n < attivo   ? ' is-done'
         : n === attivo ? ' is-active'
         : '');
    });
  }

  function emailValida(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());
  }

  // Stesso criterio di leadForm.client.js: solo cifre, lunghezza plausibile e
  // non tutte uguali (3333333333 è un numero inventato, non un cellulare).
  function cellValido(v) {
    var cifre = String(v || '').replace(/[^0-9]/g, '');
    if (!/^[0-9\s-]+$/.test(String(v || '').trim())) return false;
    if (cifre.length < 6 || cifre.length > 14) return false;
    if (/^(\d)\1+$/.test(cifre)) return false;
    return true;
  }

  function formattaQuando(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var giorno = d.toLocaleDateString(LANG === 'en' ? 'en-GB' : 'it-IT', {
      weekday: 'long', day: 'numeric', month: 'long',
    });
    var ora = d.toLocaleTimeString(LANG === 'en' ? 'en-GB' : 'it-IT', {
      hour: '2-digit', minute: '2-digit',
    });
    return giorno + ' — ' + ora;
  }

  // ── Passo 0: disponibilità ────────────────────────────────────────────
  //
  // Il form parte chiuso e si apre solo se il CRM conferma che l'evento è
  // prenotabile: mostrarlo prima significherebbe far compilare i dati a
  // qualcuno per poi dirgli che i posti sono finiti. Se la chiamata fallisce
  // si mostra il fallback "prenota in Reception" invece di un form che non
  // saprebbe che quota applicare.
  async function caricaDisponibilita() {
    mostra('loading');
    try {
      var r = await fetch(appTca.eventi.disponibilita(SLUG));
      var d = await r.json();
      if (!r.ok || !d.prenotabile) {
        mostra(d && d.postiResidui === 0 ? 'full' : 'unavailable');
        return;
      }

      stato.quota = { socio: d.quotaSocio, nonSocio: d.quotaNonSocio };
      stato.oreScadenza = d.oreScadenza;

      var posti = q('[data-ev-seats]');
      if (posti) {
        posti.hidden = false;
        posti.textContent = T.seatsLeft(d.postiResidui);
        // Sotto un quarto della capienza il contatore diventa rosso: è il
        // momento in cui "restano dei posti" smette di essere un'informazione
        // neutra e diventa un motivo per decidere adesso.
        posti.classList.toggle('is-low', d.postiResidui <= Math.max(3, Math.ceil(d.postiTotali / 4)));
      }

      passi(1);
      mostra('socio');
    } catch (e) {
      mostra('unavailable');
    }
  }

  // ── Passo 1: dichiarazione socio ──────────────────────────────────────
  root.querySelectorAll('[data-ev-socio]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      stato.socio = btn.dataset.evSocio === 'si';
      passi(2);
      mostra('dati');
    });
  });

  // ── Passo 2: dati ─────────────────────────────────────────────────────
  var nomeInput = q('[data-ev-nome]');
  var cognomeInput = q('[data-ev-cognome]');
  var emailInput = q('[data-ev-email]');
  var cellInput = q('[data-ev-cell]');
  var privacyInput = q('[data-ev-privacy]');
  var prefissoInput = q('[data-ev-prefisso]');

  emailInput.addEventListener('input', function () {
    if (emailValida(emailInput.value)) emailInput.classList.remove('lm__input--error');
  });
  cellInput.addEventListener('input', function () {
    if (cellValido(cellInput.value)) cellInput.classList.remove('lm__input--error');
  });

  q('[data-ev-dati-back]').addEventListener('click', function () { passi(1); mostra('socio'); });

  q('[data-ev-dati-next]').addEventListener('click', function () {
    errore('dati', '');
    emailInput.classList.remove('lm__input--error');
    cellInput.classList.remove('lm__input--error');

    if (!nomeInput.value.trim())    { errore('dati', T.errNome); nomeInput.focus(); return; }
    if (!cognomeInput.value.trim()) { errore('dati', T.errCognome); cognomeInput.focus(); return; }
    if (!emailValida(emailInput.value)) {
      emailInput.classList.add('lm__input--error');
      errore('dati', T.errEmail); emailInput.focus(); return;
    }
    if (!cellValido(cellInput.value)) {
      cellInput.classList.add('lm__input--error');
      errore('dati', T.errCell); cellInput.focus(); return;
    }
    if (!privacyInput.checked)      { errore('dati', T.errPrivacy); return; }

    preparaRiepilogo();
    mostra('summary');
  });

  // ── Passo 3: riepilogo e regole ───────────────────────────────────────
  function preparaRiepilogo() {
    var quota = stato.socio ? stato.quota.socio : stato.quota.nonSocio;

    var chi = q('[data-ev-who]');
    if (chi) chi.textContent = stato.socio ? T.youAreMember : T.youAreGuest;

    // Chi sta prenotando, riportato prima di confermare: l'email è stata
    // digitata nella schermata precedente e un refuso lì significa non
    // ricevere il riepilogo (e non essere rintracciabili per il pagamento).
    var recap = q('[data-ev-recap]');
    var recapValore = q('[data-ev-recap-value]');
    if (recap && recapValore) {
      var nome = (nomeInput.value.trim() + ' ' + cognomeInput.value.trim()).trim();
      recap.hidden = false;
      recapValore.textContent = nome + ' · ' + emailInput.value.trim();
    }

    var etichetta = q('[data-ev-price-label]');
    if (etichetta) etichetta.textContent = T.payLabel;

    var valore = q('[data-ev-price-value]');
    if (valore) valore.textContent = '€' + quota;

    var regole = q('[data-ev-rules]');
    if (regole) {
      regole.innerHTML = T.hold(stato.oreScadenza).map(function (r) {
        return '<li class="evp__rule' + (r.warn ? ' evp__rule--warn' : '') + '">' +
          '<span class="evp__rule-icon" aria-hidden="true">' + ICONE[r.icona] + '</span>' +
          '<span>' + r.testo + '</span>' +
        '</li>';
      }).join('');
    }

    passi(3);
  }

  q('[data-ev-summary-back]').addEventListener('click', function () {
    passi(2);
    mostra('dati');
  });

  q('[data-ev-submit]').addEventListener('click', async function () {
    var btn = this;
    errore('summary', '');
    btn.disabled = true;
    loader('summary', true, T.sending);

    try {
      var r = await fetch(appTca.eventi.prenotazione, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: SLUG,
          lingua: LANG,
          socio: stato.socio,
          nome: nomeInput.value.trim(),
          cognome: cognomeInput.value.trim(),
          email: emailInput.value.trim(),
          cellulare: (prefissoInput ? prefissoInput.value + ' ' : '') + cellInput.value.trim(),
          privacy: privacyInput.checked,
        }),
      });
      var d = await r.json();

      if (!r.ok || !d.ok) {
        loader('summary', false);
        btn.disabled = false;
        if (d && d.errore === 'completo') { mostra('full'); return; }
        if (d && d.errore === 'gia_prenotato') { errore('summary', T.errAlready); return; }
        errore('summary', T.errGeneric);
        return;
      }

      // Quota e scadenza mostrate in conferma sono quelle calcolate dal
      // server, non quelle proposte qui.
      var fee = q('[data-ev-confirm-fee]');
      if (fee) fee.innerHTML = T.confirmFee(d.quota);

      var quando = q('[data-ev-confirm-by]');
      if (quando) quando.innerHTML = T.confirmBy(formattaQuando(d.scadenzaPagamento));

      loader('summary', false);
      var barra = q('[data-ev-steps]');
      if (barra) barra.hidden = true;
      mostra('confirm');
    } catch (e) {
      loader('summary', false);
      btn.disabled = false;
      errore('summary', T.errGeneric);
    }
  });

  caricaDisponibilita();
}

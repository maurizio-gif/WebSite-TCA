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
//   0. all'apertura chiede la disponibilità al CRM (posti residui + quota)
//   1. email → il CRM verifica su PerfectGym se è un socio con contratto attivo
//   2. solo se NON è socio: nome, cognome, cellulare, consenso privacy
//      (di un socio il Club ha già i dati: richiederli sarebbe farglieli
//      riscrivere per niente)
//   3. riepilogo quota + regole di pagamento → conferma
//   4. schermata finale con la scadenza calcolata dal server
//
// Nessun numero mostrato qui è deciso dal browser: quota, posti e scadenza
// arrivano sempre dalle risposte del CRM, che li rilegge dal manifest
// pubblicato dalla build (vedi src/pages/eventi-prenotabili.json.ts).

import { appTca } from '../data/links';

export function initEventoForm(root) {
  var SLUG = root.dataset.slug;
  var LANG = document.documentElement.lang === 'en' ? 'en' : 'it';

  var T = LANG === 'en' ? {
    loading:      'Checking availability…',
    checking:     'Checking your details…',
    sending:      'Saving your booking…',
    errEmail:     'Please enter a valid email address.',
    errNome:      'Please enter your first name.',
    errCognome:   'Please enter your last name.',
    errCell:      'Please enter a valid mobile number.',
    errPrivacy:   'Consent to the Privacy Policy is required.',
    errGeneric:   'Something went wrong. Please try again or contact reception.',
    errFull:      'Sorry, this event is now fully booked.',
    errAlready:   'There is already a booking with this email address for this event.',
    seatsLeft:    function (n) { return n === 1 ? '1 spot left' : n + ' spots left'; },
    feeMember:    'Members',
    feeGuest:     'Non-members',
    payLabel:     'To pay at reception',
    youAreMember: 'We recognise you as a Club Member: we already have your details, so there is nothing else to fill in.',
    youAreGuest:  'You are not registered as a Club Member with an active contract, so the non-member rate applies.',
    holdTitle:    'How your booking works',
    hold:         function (ore) {
      return [
        { icona: 'clock', testo: 'Your spot is held for <strong>' + ore + ' hours</strong> from now.' },
        { icona: 'cash',  testo: 'Payment is made <strong>at reception</strong>, at the Club.' },
        { icona: 'check', testo: 'The booking becomes final only once payment is received.' },
        { icona: 'warn',  testo: 'Without payment within ' + ore + ' hours the booking is cancelled and the spot is released.', warn: true },
      ];
    },
    submit:       'Confirm booking',
    confirmTitle: 'Spot<br><em>held!</em>',
    confirmFee:   function (q) { return 'Amount to pay at reception: <strong>€' + q + '</strong>'; },
    confirmBy:    function (quando) { return 'Pay by <strong>' + quando + '</strong>, otherwise the spot is released.'; },
    confirmMail:  'We have sent you a summary by email.',
  } : {
    loading:      'Verifica disponibilità…',
    checking:     'Verifica dei tuoi dati…',
    sending:      'Salvataggio della prenotazione…',
    errEmail:     'Inserisci un indirizzo email valido.',
    errNome:      'Inserisci il tuo nome.',
    errCognome:   'Inserisci il tuo cognome.',
    errCell:      'Inserisci un numero di cellulare valido.',
    errPrivacy:   'Il consenso alla Privacy Policy è obbligatorio.',
    errGeneric:   'Qualcosa è andato storto. Riprova o contatta la Reception.',
    errFull:      'Siamo spiacenti, i posti per questo evento sono esauriti.',
    errAlready:   'Con questa email risulta già una prenotazione per questo evento.',
    seatsLeft:    function (n) { return n === 1 ? '1 posto disponibile' : n + ' posti disponibili'; },
    feeMember:    'Soci',
    feeGuest:     'Non soci',
    payLabel:     'Da pagare in cassa',
    youAreMember: 'Ti riconosciamo come Socio del Club: i tuoi dati li abbiamo già, non devi inserire altro.',
    youAreGuest:  'Non risulti Socio del Club con contratto attivo, quindi si applica la quota non soci.',
    holdTitle:    'Come funziona la prenotazione',
    hold:         function (ore) {
      return [
        { icona: 'clock', testo: 'Il posto resta impegnato per <strong>' + ore + ' ore</strong> da adesso.' },
        { icona: 'cash',  testo: 'Il pagamento si effettua <strong>in cassa</strong>, in Reception.' },
        { icona: 'check', testo: 'La prenotazione diventa definitiva solo con l’avvenuto pagamento.' },
        { icona: 'warn',  testo: 'Se il pagamento non avviene entro ' + ore + ' ore la prenotazione viene rimossa e il posto torna disponibile.', warn: true },
      ];
    },
    submit:       'Confermo la prenotazione',
    confirmTitle: 'Posto<br><em>impegnato!</em>',
    confirmFee:   function (q) { return 'Quota da pagare in cassa: <strong>€' + q + '</strong>'; },
    confirmBy:    function (quando) { return 'Paga entro <strong>' + quando + '</strong>, altrimenti il posto torna disponibile.'; },
    confirmMail:  'Ti abbiamo inviato un riepilogo per email.',
  };

  var stato = { email: '', socio: false, quota: null, oreScadenza: 48 };

  // ── Helper DOM ────────────────────────────────────────────────────────
  //
  // Le ricerche partono dalla sezione, non dal solo pannello: posti residui e
  // quote stanno nella colonna di intro, fuori da [data-ev-root]. Restano
  // comunque circoscritte a questo form, così due form nella stessa pagina non
  // si scriverebbero addosso.
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

  // Stato dei tre pallini in testa al pannello. `saltato` marca il passo dei
  // dati quando chi prenota è socio: il passo non è stato dimenticato, non
  // serviva.
  function passi(attivo, saltato) {
    var barra = q('[data-ev-steps]');
    if (!barra) return;
    barra.hidden = false;
    [1, 2, 3].forEach(function (n) {
      var el = barra.querySelector('[data-ev-dot="' + n + '"]');
      if (!el) return;
      el.className = 'evp__step' +
        (saltato && n === 2 ? ' is-skipped'
         : n < attivo       ? ' is-done'
         : n === attivo     ? ' is-active'
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

  function scheda(tipo, etichetta, valore) {
    return '<div class="evp__fee-card evp__fee-card--' + tipo + '">' +
      '<span class="evp__fee-card-label">' + etichetta + '</span>' +
      '<span class="evp__fee-card-value">€' + valore + '</span>' +
    '</div>';
  }

  // ── Passo 0: disponibilità ────────────────────────────────────────────
  //
  // Il form parte chiuso e si apre solo se il CRM conferma che l'evento è
  // prenotabile: mostrarlo prima significherebbe far compilare l'email a
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

      var blocco = q('[data-ev-fees-block]');
      if (blocco) blocco.hidden = false;

      var quote = q('[data-ev-fees]');
      if (quote) {
        quote.innerHTML =
          scheda('member', T.feeMember, d.quotaSocio) +
          scheda('guest', T.feeGuest, d.quotaNonSocio);
      }

      passi(1, false);
      mostra('email');
    } catch (e) {
      mostra('unavailable');
    }
  }

  // ── Passo 1: email → verifica socio ───────────────────────────────────
  var emailInput = q('[data-ev-email]');

  emailInput.addEventListener('input', function () {
    if (emailValida(emailInput.value)) emailInput.classList.remove('lm__input--error');
  });

  q('[data-ev-email-next]').addEventListener('click', async function () {
    var btn = this;
    errore('email', '');
    emailInput.classList.remove('lm__input--error');

    if (!emailValida(emailInput.value)) {
      emailInput.classList.add('lm__input--error');
      errore('email', T.errEmail);
      emailInput.focus();
      return;
    }

    stato.email = emailInput.value.trim();
    btn.disabled = true;
    loader('email', true, T.checking);

    try {
      var r = await fetch(appTca.eventi.verifica, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: stato.email, slug: SLUG }),
      });
      var d = await r.json();
      stato.socio = !!(d && d.socio);
    } catch (e) {
      // PerfectGym o il CRM non raggiungibili: si procede come non socio.
      // La quota definitiva la decide comunque il server al salvataggio,
      // quindi al massimo il riepilogo mostra la quota più alta e viene
      // corretto in conferma — meglio che bloccare la prenotazione.
      stato.socio = false;
    }

    loader('email', false);
    btn.disabled = false;

    if (stato.socio) {
      preparaRiepilogo();
      mostra('summary');
    } else {
      passi(2, false);
      mostra('dati');
    }
  });

  // ── Passo 2: dati del non socio ───────────────────────────────────────
  var nomeInput = q('[data-ev-nome]');
  var cognomeInput = q('[data-ev-cognome]');
  var cellInput = q('[data-ev-cell]');
  var privacyInput = q('[data-ev-privacy]');
  var prefissoInput = q('[data-ev-prefisso]');

  cellInput.addEventListener('input', function () {
    if (cellValido(cellInput.value)) cellInput.classList.remove('lm__input--error');
  });

  q('[data-ev-dati-back]').addEventListener('click', function () { passi(1, false); mostra('email'); });

  q('[data-ev-dati-next]').addEventListener('click', function () {
    errore('dati', '');
    cellInput.classList.remove('lm__input--error');

    if (!nomeInput.value.trim())    { errore('dati', T.errNome); nomeInput.focus(); return; }
    if (!cognomeInput.value.trim()) { errore('dati', T.errCognome); cognomeInput.focus(); return; }
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
    // digitata due schermate fa e un refuso lì significa non ricevere il
    // riepilogo (e non essere rintracciabile per il pagamento).
    var recap = q('[data-ev-recap]');
    var recapValore = q('[data-ev-recap-value]');
    if (recap && recapValore) {
      var nome = stato.socio ? '' : (nomeInput.value.trim() + ' ' + cognomeInput.value.trim()).trim();
      recap.hidden = false;
      recapValore.textContent = nome ? nome + ' · ' + stato.email : stato.email;
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

    passi(3, stato.socio);
  }

  q('[data-ev-summary-back]').addEventListener('click', function () {
    passi(stato.socio ? 1 : 2, false);
    mostra(stato.socio ? 'email' : 'dati');
  });

  q('[data-ev-submit]').addEventListener('click', async function () {
    var btn = this;
    errore('summary', '');
    btn.disabled = true;
    loader('summary', true, T.sending);

    var payload = {
      slug: SLUG,
      email: stato.email,
      lingua: LANG,
    };
    if (!stato.socio) {
      payload.nome = nomeInput.value.trim();
      payload.cognome = cognomeInput.value.trim();
      payload.cellulare = (prefissoInput ? prefissoInput.value + ' ' : '') + cellInput.value.trim();
      payload.privacy = privacyInput.checked;
    }

    try {
      var r = await fetch(appTca.eventi.prenotazione, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      // server: se la verifica socio era andata in errore al passo 1, qui
      // arriva il valore giusto.
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

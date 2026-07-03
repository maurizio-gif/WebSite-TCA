// ─────────────────────────────────────────────────────────────────────────
// Help Desk — knowledge base "Club Life".
// Array di dati tipizzato: nessuna dipendenza da CMS/collection, così è
// semplice da modificare a mano oggi e migrare a una content collection
// (o a un CMS) in futuro senza cambiare i componenti che lo consumano.
// ─────────────────────────────────────────────────────────────────────────

export interface HelpDeskCategory {
  id: string;
  label: string;
  label_en: string;
}

export const helpDeskCategories: HelpDeskCategory[] = [
  { id: 'iscrizioni',   label: 'Iscrizioni & Tesseramento',  label_en: 'Membership & Registration' },
  { id: 'prenotazioni', label: 'Prenotazioni',               label_en: 'Bookings' },
  { id: 'app',          label: 'App & Area Riservata',       label_en: 'App & Member Area' },
  { id: 'pagamenti',    label: 'Pagamenti & Ricevute',       label_en: 'Payments & Receipts' },
  { id: 'regolamento',  label: 'Regolamento',                label_en: 'Club Rules' },
  { id: 'scuola',       label: 'Scuola Tennis',              label_en: 'Tennis School' },
];

export interface HelpDeskArticle {
  slug: string;
  categoria: string; // id di helpDeskCategories
  titolo: string;
  titolo_en: string;
  sintesi: string;
  sintesi_en: string;
  tags: string[];
  tags_en: string[];
  aggiornato: string; // es. "Giugno 2026"
  aggiornato_en: string;
  corpo: string[];    // paragrafi
  corpo_en: string[];
}

export const helpDeskArticles: HelpDeskArticle[] = [
  {
    slug: 'certificato-medico',
    categoria: 'iscrizioni',
    titolo: 'Certificato medico: come e quando presentarlo',
    titolo_en: 'Medical certificate: how and when to submit it',
    sintesi: 'Cosa serve per giocare al TCA — certificato agonistico e non agonistico, validità e rinnovo.',
    sintesi_en: 'What you need to play at TCA — competitive and non-competitive certificates, validity and renewal.',
    tags: ['certificato medico', 'agonistico', 'non agonistico', 'iscrizione'],
    tags_en: ['medical certificate', 'competitive', 'non-competitive', 'registration'],
    aggiornato: 'Giugno 2026',
    aggiornato_en: 'June 2026',
    corpo: [
      'Per accedere ai campi e ai corsi del Club è obbligatorio presentare un certificato medico in corso di validità, come previsto dalla normativa sportiva vigente.',
      'Per l\'attività non agonistica è sufficiente il certificato di idoneità sportiva generica, rilasciato dal medico di base o da un medico dello sport. Per l\'attività agonistica (squadre federate, tornei FIT) serve invece il certificato di idoneità sportiva agonistica, con elettrocardiogramma sotto sforzo.',
      'Il certificato ha validità annuale dalla data di rilascio: ti consigliamo di segnare la scadenza e rinnovarlo per tempo, per non restare senza copertura durante la stagione.',
      'Il certificato va caricato nella tua area riservata (vedi la guida "Accedere all\'area riservata") oppure consegnato in segreteria in formato cartaceo.',
    ],
    corpo_en: [
      'To access the courts and courses you must present a valid medical certificate, as required by current sports regulations.',
      'For non-competitive activity, a general sports fitness certificate issued by your GP or a sports doctor is enough. For competitive activity (federated teams, FIT tournaments) you need a competitive sports fitness certificate, including a stress ECG.',
      'The certificate is valid for one year from the issue date: we recommend noting the expiry and renewing it in good time so you\'re never left without cover during the season.',
      'Upload the certificate to your member area (see the "Access the member area" guide) or hand it in at reception in paper form.',
    ],
  },
  {
    slug: 'tesseramento-fit',
    categoria: 'iscrizioni',
    titolo: 'Tesseramento FIT: come funziona e quando rinnovarlo',
    titolo_en: 'FIT registration: how it works and when to renew',
    sintesi: 'La tessera della Federazione Italiana Tennis e Padel, chi ne ha bisogno e come richiederla.',
    sintesi_en: 'The Italian Tennis & Padel Federation card — who needs it and how to request it.',
    tags: ['tesseramento', 'FIT', 'federazione', 'agonistica'],
    tags_en: ['registration', 'FIT', 'federation', 'competitive'],
    aggiornato: 'Maggio 2026',
    aggiornato_en: 'May 2026',
    corpo: [
      'Il tesseramento FIT (Federazione Italiana Tennis e Padel) è richiesto per chi partecipa a tornei federali, campionati a squadre o al FIT Junior Program.',
      'Non è obbligatorio per giocare ricreativamente sui nostri campi o seguire i corsi non agonistici: in quel caso basta la membership del Club.',
      'La segreteria si occupa del tesseramento per tutti i soci interessati: richiedilo in reception o scrivi tramite il modulo Help Desk in fondo a questa pagina, indicando se si tratta di primo tesseramento o rinnovo.',
    ],
    corpo_en: [
      'FIT registration (Italian Tennis & Padel Federation) is required for those taking part in federal tournaments, team championships or the FIT Junior Program.',
      'It is not required to play recreationally on our courts or to attend non-competitive courses: club membership is enough in that case.',
      'Reception handles registration for all interested members: ask at the front desk or write via the Help Desk form at the bottom of this page, stating whether it\'s a first registration or a renewal.',
    ],
  },
  {
    slug: 'prenotare-campo',
    categoria: 'prenotazioni',
    titolo: 'Come prenotare un campo da tennis o padel',
    titolo_en: 'How to book a tennis or padel court',
    sintesi: 'Prenotazione online da app o web, quanti giorni in anticipo puoi prenotare in base alla tua membership.',
    sintesi_en: 'Online booking from the app or web, and how far in advance you can book based on your membership.',
    tags: ['prenotazione', 'campo', 'tennis', 'padel', 'app'],
    tags_en: ['booking', 'court', 'tennis', 'padel', 'app'],
    aggiornato: 'Luglio 2026',
    aggiornato_en: 'July 2026',
    corpo: [
      'I campi si prenotano online dall\'area riservata (web o app), oppure telefonando in segreteria negli orari di apertura.',
      'Ogni membership include un diverso anticipo massimo di prenotazione — trovi il dettaglio nella tabella abbonamenti sulla pagina Tennis. In generale: più alto il livello di membership, più giorni in anticipo puoi prenotare.',
      'Una volta prenotato, il campo resta bloccato a tuo nome fino all\'orario di inizio: se non puoi più giocare, ricordati di cancellare la prenotazione per liberarlo agli altri soci.',
    ],
    corpo_en: [
      'Courts can be booked online from the member area (web or app), or by calling reception during opening hours.',
      'Each membership includes a different maximum booking lead time — you\'ll find the details in the membership table on the Tennis page. In general, the higher the membership tier, the more days in advance you can book.',
      'Once booked, the court stays reserved under your name until the start time: if you can no longer play, remember to cancel the booking so it becomes available to other members.',
    ],
  },
  {
    slug: 'cancellazioni-prenotazioni',
    categoria: 'prenotazioni',
    titolo: 'Cancellazioni e mancate presentazioni (no-show)',
    titolo_en: 'Cancellations and no-shows',
    sintesi: 'Entro quanto tempo puoi cancellare una prenotazione senza penalità.',
    sintesi_en: 'How much notice you need to cancel a booking without a penalty.',
    tags: ['cancellazione', 'no-show', 'prenotazione', 'regole'],
    tags_en: ['cancellation', 'no-show', 'booking', 'rules'],
    aggiornato: 'Luglio 2026',
    aggiornato_en: 'July 2026',
    corpo: [
      'Puoi cancellare una prenotazione gratuitamente entro le ore previste dal regolamento del Club prima dell\'orario di inizio (consulta la guida "Regolamento del circolo" per i dettagli aggiornati).',
      'Le mancate presentazioni ripetute senza cancellazione ("no-show") possono comportare una sospensione temporanea della possibilità di prenotare online: un modo per garantire ai campi la massima disponibilità per tutti i soci.',
    ],
    corpo_en: [
      'You can cancel a booking free of charge within the time frame set out in the Club rules before the start time (see the "Club rules" guide for the current details).',
      'Repeated no-shows without cancelling may lead to a temporary suspension of online booking privileges — a way to keep court availability fair for all members.',
    ],
  },
  {
    slug: 'accesso-area-riservata',
    categoria: 'app',
    titolo: "Accedere all'area riservata da web e da app",
    titolo_en: 'Accessing the member area from web and app',
    sintesi: 'Come entrare nel tuo account per prenotare campi e corsi, vedere ricevute e gestire i dati.',
    sintesi_en: 'How to log in to book courts and courses, view receipts and manage your details.',
    tags: ['app', 'area riservata', 'login', 'accesso'],
    tags_en: ['app', 'member area', 'login', 'access'],
    aggiornato: 'Giugno 2026',
    aggiornato_en: 'June 2026',
    corpo: [
      'L\'area riservata del TCA è gestita tramite PerfectGym, accessibile sia da browser (pulsante "Accedi" in alto a destra sul sito) sia dall\'app dedicata, disponibile per iOS e Android.',
      'Da lì puoi prenotare campi e corsi, controllare la tua membership, scaricare le ricevute e aggiornare i tuoi dati di contatto.',
      'Se è la prima volta che accedi, usa l\'indirizzo email lasciato in segreteria al momento dell\'iscrizione per creare la password.',
    ],
    corpo_en: [
      'The TCA member area runs on PerfectGym, accessible both from your browser (the "Log in" button top-right on the site) and from the dedicated app, available for iOS and Android.',
      'From there you can book courts and courses, check your membership, download receipts and update your contact details.',
      'If it\'s your first time logging in, use the email address you gave reception when you signed up to set your password.',
    ],
  },
  {
    slug: 'recupero-password',
    categoria: 'app',
    titolo: 'Recuperare la password del tuo account',
    titolo_en: 'Resetting your account password',
    sintesi: 'Cosa fare se hai dimenticato la password dell\'area riservata.',
    sintesi_en: "What to do if you've forgotten your member area password.",
    tags: ['password', 'accesso', 'app', 'recupero'],
    tags_en: ['password', 'access', 'app', 'reset'],
    aggiornato: 'Giugno 2026',
    aggiornato_en: 'June 2026',
    corpo: [
      'Nella schermata di login, sia da web che da app, trovi il link "Password dimenticata?": inserendo la tua email registrata riceverai le istruzioni per impostarne una nuova.',
      'Se non ricevi l\'email entro qualche minuto, controlla la cartella spam oppure scrivici tramite il modulo Help Desk qui sotto: verificheremo l\'indirizzo associato al tuo account.',
    ],
    corpo_en: [
      'On the login screen, both on web and app, you\'ll find a "Forgot password?" link: enter your registered email and you\'ll receive instructions to set a new one.',
      "If you don't receive the email within a few minutes, check your spam folder or write to us via the Help Desk form below: we'll verify the address linked to your account.",
    ],
  },
  {
    slug: 'pagamenti-quote',
    categoria: 'pagamenti',
    titolo: 'Metodi di pagamento e scadenze quote',
    titolo_en: 'Payment methods and membership due dates',
    sintesi: 'Come e quando si pagano membership, corsi e prenotazioni extra.',
    sintesi_en: 'How and when to pay for membership, courses and extra bookings.',
    tags: ['pagamenti', 'quote', 'membership', 'scadenze'],
    tags_en: ['payments', 'fees', 'membership', 'due dates'],
    aggiornato: 'Maggio 2026',
    aggiornato_en: 'May 2026',
    corpo: [
      'Le quote di membership e i corsi si pagano online dall\'area riservata (carta di credito/debito) oppure in segreteria, anche a rate secondo le modalità concordate al momento dell\'iscrizione.',
      'Le scadenze di rinnovo sono visibili nella tua area riservata: ti consigliamo di attivare le notifiche via email per non perdere la data di rinnovo e mantenere attivi i benefici della tua membership.',
    ],
    corpo_en: [
      'Membership fees and courses can be paid online from the member area (credit/debit card) or at reception, including in instalments as agreed when you signed up.',
      'Renewal due dates are visible in your member area: we recommend turning on email notifications so you never miss a renewal date and keep your membership benefits active.',
    ],
  },
  {
    slug: 'ricevute-documenti',
    categoria: 'pagamenti',
    titolo: 'Come scaricare ricevute e documenti fiscali',
    titolo_en: 'How to download receipts and tax documents',
    sintesi: 'Dove trovare le ricevute dei pagamenti per la dichiarazione dei redditi.',
    sintesi_en: 'Where to find payment receipts for your tax return.',
    tags: ['ricevute', 'documenti', 'fiscale', 'pagamenti'],
    tags_en: ['receipts', 'documents', 'tax', 'payments'],
    aggiornato: 'Maggio 2026',
    aggiornato_en: 'May 2026',
    corpo: [
      'Tutte le ricevute dei pagamenti effettuati (membership, corsi, prenotazioni) sono disponibili nella sezione "Documenti" della tua area riservata, scaricabili in PDF in qualsiasi momento.',
      'Per le spese detraibili ai fini fiscali (es. attività sportiva dei minori), la segreteria può fornire un riepilogo annuale su richiesta.',
    ],
    corpo_en: [
      'All receipts for payments made (membership, courses, bookings) are available in the "Documents" section of your member area, downloadable as a PDF at any time.',
      'For expenses that are tax-deductible (e.g. sports activities for minors), reception can provide an annual summary on request.',
    ],
  },
  {
    slug: 'regolamento-circolo',
    categoria: 'regolamento',
    titolo: 'Regolamento del circolo: le regole principali',
    titolo_en: 'Club rules: the essentials',
    sintesi: 'Comportamento in campo, ospiti, abbigliamento e orari: le regole di base per vivere bene il Club.',
    sintesi_en: 'On-court conduct, guests, dress code and hours: the basic rules for enjoying the Club.',
    tags: ['regolamento', 'regole', 'ospiti', 'abbigliamento'],
    tags_en: ['rules', 'regulations', 'guests', 'dress code'],
    aggiornato: 'Gennaio 2026',
    aggiornato_en: 'January 2026',
    corpo: [
      'Il regolamento completo del circolo è disponibile in segreteria e nell\'area riservata; qui trovi un riepilogo delle regole più richieste dai soci.',
      'Ogni socio può portare ospiti in Club nel rispetto delle fasce orarie e delle quote previste per gli accompagnatori: chiedi in segreteria le condizioni aggiornate.',
      'Su tutti i campi è richiesto abbigliamento sportivo idoneo e scarpe adatte alla superficie (niente suole nere sui campi indoor).',
      'Gli orari di apertura del Club e della segreteria sono pubblicati nella pagina "Contatti" e possono variare nei periodi festivi: verifica sempre prima di venire.',
    ],
    corpo_en: [
      'The full club regulation is available at reception and in the member area; here is a summary of the rules members ask about most.',
      'Members may bring guests to the Club within the time slots and guest fees in place: ask reception for the current conditions.',
      'Suitable sportswear and shoes appropriate to the surface are required on all courts (no black soles on indoor courts).',
      'Club and reception opening hours are published on the "Contacts" page and may vary on public holidays: always check before you come.',
    ],
  },
  {
    slug: 'scuola-tennis-iscrizioni',
    categoria: 'scuola',
    titolo: 'Scuola Tennis: livelli, iscrizioni e materiale necessario',
    titolo_en: 'Tennis School: levels, enrolment and equipment needed',
    sintesi: 'Come iscrivere un bambino alla Scuola Tennis e cosa serve per il primo giorno.',
    sintesi_en: "How to enrol a child in the Tennis School and what's needed for the first day.",
    tags: ['scuola tennis', 'iscrizione', 'bambini', 'mini tennis'],
    tags_en: ['tennis school', 'enrolment', 'kids', 'mini tennis'],
    aggiornato: 'Luglio 2026',
    aggiornato_en: 'July 2026',
    corpo: [
      'Per i dettagli su livelli, durata delle lezioni e frequenza settimanale trovi tutte le informazioni sulla pagina Scuola Tennis, sezione "Corsi e frequenza".',
      'Per iscrivere un bambino serve: certificato medico non agonistico in corso di validità, tesseramento FIT (se richiesto per il livello) e il modulo di iscrizione compilato in segreteria.',
      'Per il primo giorno di lezione bastano abbigliamento sportivo comodo e scarpe da tennis: le racchette per i primi livelli sono fornite dal Club.',
    ],
    corpo_en: [
      'For details on levels, lesson duration and weekly frequency, see the Tennis School page, "Courses and frequency" section.',
      'To enrol a child you need: a valid non-competitive medical certificate, FIT registration (if required for the level) and the enrolment form filled in at reception.',
      'For the first lesson, comfortable sportswear and tennis shoes are enough: racquets for the first levels are provided by the Club.',
    ],
  },
];

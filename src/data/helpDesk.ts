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
      'Per l\'attività non agonistica è sufficiente il certificato di idoneità sportiva generica, rilasciato dal medico di base o da un medico dello sport. Per l\'attività agonistica (squadre federate, tornei FITP) serve invece il <strong>certificato di idoneità sportiva agonistica, con elettrocardiogramma sotto sforzo</strong>.',
      'Il certificato ha <strong>validità annuale dalla data di rilascio</strong>: ti consigliamo di segnare la scadenza e rinnovarlo per tempo, per non restare senza copertura durante la stagione.',
      'Il certificato va caricato nella tua area riservata (vedi la guida "Accedere all\'area riservata") oppure consegnato in segreteria in formato cartaceo.',
    ],
    corpo_en: [
      'To access the courts and courses you must present a valid medical certificate, as required by current sports regulations.',
      'For non-competitive activity, a general sports fitness certificate issued by your GP or a sports doctor is enough. For competitive activity (federated teams, FITP tournaments) you need a <strong>competitive sports fitness certificate, including a stress ECG</strong>.',
      'The certificate is <strong>valid for one year from the issue date</strong>: we recommend noting the expiry and renewing it in good time so you\'re never left without cover during the season.',
      'Upload the certificate to your member area (see the "Access the member area" guide) or hand it in at reception in paper form.',
    ],
  },
  {
    slug: 'tesseramento-fit',
    categoria: 'iscrizioni',
    titolo: 'Tesseramento FITP: come funziona e quando rinnovarlo',
    titolo_en: 'FITP registration: how it works and when to renew',
    sintesi: 'La tessera della Federazione Italiana Tennis e Padel, chi ne ha bisogno e come richiederla.',
    sintesi_en: 'The Italian Tennis & Padel Federation card — who needs it and how to request it.',
    tags: ['tesseramento', 'FITP', 'federazione', 'agonistica'],
    tags_en: ['registration', 'FITP', 'federation', 'competitive'],
    aggiornato: 'Maggio 2026',
    aggiornato_en: 'May 2026',
    corpo: [
      'Il tesseramento FITP (Federazione Italiana Tennis e Padel) è <strong>obbligatorio</strong> per tutti coloro che desiderano giocare sui campi del Tennis Club Ambrosiano, partecipare a tornei federali o prendere parte ai campionati a squadre.',
      '<strong>Come tesserarsi:</strong> la richiesta di tesseramento deve essere effettuata direttamente dal giocatore tramite il portale FITP (tesseramento.fitp.it). Una volta completata la richiesta online, il socio dovrà consegnare presso la segreteria del Club il certificato medico in corso di validità e la quota di tesseramento prevista.',
      '<strong>Tesseramento agonistico:</strong> è obbligatorio per i giocatori che intendono partecipare a tornei o campionati federali e per tutti gli atleti classificati come agonisti. Per il rilascio è necessario consegnare il certificato medico agonistico in corso di validità e la quota di tesseramento. Il modulo per la richiesta del certificato medico agonistico, da presentare al centro medico scelto per la visita, va ritirato preventivamente in segreteria.',
      '<strong>Durata del tesseramento:</strong> la tessera FITP ha validità annuale e scade il 31 dicembre di ogni anno, indipendentemente dalla data di emissione. Per continuare a partecipare alle attività federali e utilizzare i servizi che richiedono il tesseramento, è necessario provvedere al rinnovo per la nuova stagione sportiva.',
    ],
    corpo_en: [
      'FITP registration (Italian Tennis and Padel Federation) is <strong>mandatory</strong> for anyone who wants to play on the courts of Tennis Club Ambrosiano, take part in federal tournaments or join team championships.',
      '<strong>How to register:</strong> the registration request must be submitted directly by the player through the FITP portal (tesseramento.fitp.it). Once the online request is complete, the member must hand in a valid medical certificate and the registration fee at the Club reception.',
      "<strong>Competitive registration:</strong> mandatory for players who intend to take part in federal tournaments or championships and for all athletes classified as competitive. To obtain it you must submit a valid competitive medical certificate and the registration fee. The form for requesting the competitive medical certificate, to be presented at the medical centre of your choice, must be collected from reception beforehand.",
      '<strong>Registration validity:</strong> the FITP card is valid for one year and expires on 31 December each year, regardless of the issue date. To keep taking part in federal activities and using services that require registration, you need to renew it for the new sporting season.',
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
      'Ogni membership include un diverso anticipo massimo di prenotazione — trovi il dettaglio nella tabella abbonamenti sulla pagina Tennis. In generale: <strong>più alto il livello di membership, più giorni in anticipo puoi prenotare</strong>.',
      'Una volta prenotato, il campo resta bloccato a tuo nome fino all\'orario di inizio: se non puoi più giocare, ricordati di cancellare la prenotazione per liberarlo agli altri soci.',
    ],
    corpo_en: [
      'Courts can be booked online from the member area (web or app), or by calling reception during opening hours.',
      'Each membership includes a different maximum booking lead time — you\'ll find the details in the membership table on the Tennis page. In general, <strong>the higher the membership tier, the more days in advance you can book</strong>.',
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
      '<strong>Tennis e Padel (Playtomic):</strong> la cancellazione dovrà essere effettuata almeno <strong>24 ore prima</strong> dell\'inizio del proprio turno di gioco. È possibile disdire in autonomia tramite sito web o app; in alternativa puoi inviare un messaggio WhatsApp alla Reception.',
      'In caso di cancellazione con un preavviso inferiore alle 24 ore, oppure in caso di no-show, verrà addebitato il costo del campo al prenotante. Se non sono stati comunicati i nomi di tutti i giocatori, le quote restanti saranno considerate come non soci; per i giocatori che non pagano la propria parte di campo sarà applicata una <strong>quota forfettaria di 5 euro</strong>.',
      'Tre cancellazioni in ritardo o mancate presentazioni comportano la <strong>perdita del diritto di prenotazione anticipata dei campi per 15 giorni</strong>. Se ci si presenta comunque al Club, la quota verrà considerata come da non socio.',
      '<strong>Corsi di gruppo (App):</strong> la cancellazione da un corso può essere effettuata fino a <strong>2 ore prima</strong> dell\'inizio della lezione, in autonomia tramite app oppure inviando un messaggio WhatsApp alla Reception. Dopo 3 no-show, al socio verrà impedito di prenotare corsi per una settimana.',
    ],
    corpo_en: [
      '<strong>Tennis and Padel (Playtomic):</strong> cancellations must be made at least <strong>24 hours</strong> before your court time. You can cancel independently via the website or app, or by sending a WhatsApp message to Reception.',
      'If you cancel with less than 24 hours\' notice, or in case of a no-show, the court fee will be charged to the person who booked. If the names of all players were not provided, the remaining shares will be treated as non-member rates; players who don\'t pay their share of the court will be charged a <strong>flat fee of €5</strong>.',
      'Three late cancellations or no-shows will result in the <strong>loss of advance court booking privileges for 15 days</strong>. If you still show up at the Club, the fee will be charged at the non-member rate.',
      '<strong>Group classes (App):</strong> you can cancel a class up to <strong>2 hours</strong> before it starts, independently via the app or by sending a WhatsApp message to Reception. After 3 no-shows, the member will be blocked from booking classes for one week.',
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
      'L\'area riservata del TCA è gestita tramite <strong>PerfectGym</strong>, accessibile sia da browser (pulsante "Accedi" in alto a destra sul sito) sia dall\'app dedicata, disponibile per iOS e Android.',
      'Da lì puoi <strong>prenotare campi e corsi, controllare la tua membership, scaricare le ricevute</strong> e aggiornare i tuoi dati di contatto.',
      'Se è la prima volta che accedi, usa l\'indirizzo email lasciato in segreteria al momento dell\'iscrizione per creare la password.',
    ],
    corpo_en: [
      'The TCA member area runs on <strong>PerfectGym</strong>, accessible both from your browser (the "Log in" button top-right on the site) and from the dedicated app, available for iOS and Android.',
      'From there you can <strong>book courts and courses, check your membership, download receipts</strong> and update your contact details.',
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
      'Nella schermata di login, sia da web che da app, trovi il link <strong>"Password dimenticata?"</strong>: inserendo la tua email registrata riceverai le istruzioni per impostarne una nuova.',
      'Se non ricevi l\'email entro qualche minuto, controlla la cartella spam oppure scrivici tramite il modulo Help Desk qui sotto: verificheremo l\'indirizzo associato al tuo account.',
    ],
    corpo_en: [
      'On the login screen, both on web and app, you\'ll find a <strong>"Forgot password?"</strong> link: enter your registered email and you\'ll receive instructions to set a new one.',
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
      'Le quote di membership e i corsi si pagano online dall\'area riservata (carta di credito/debito) oppure in segreteria, <strong>anche a rate</strong> secondo le modalità concordate al momento dell\'iscrizione.',
      'Le scadenze di rinnovo sono visibili nella tua area riservata: ti consigliamo di <strong>attivare le notifiche via email</strong> per non perdere la data di rinnovo e mantenere attivi i benefici della tua membership.',
    ],
    corpo_en: [
      'Membership fees and courses can be paid online from the member area (credit/debit card) or at reception, <strong>including in instalments</strong> as agreed when you signed up.',
      'Renewal due dates are visible in your member area: we recommend <strong>turning on email notifications</strong> so you never miss a renewal date and keep your membership benefits active.',
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
      'Tutte le ricevute dei pagamenti effettuati (membership, corsi, prenotazioni) sono disponibili nella sezione "Documenti" della tua area riservata, <strong>scaricabili in PDF in qualsiasi momento</strong>.',
      'Per le spese detraibili ai fini fiscali (es. attività sportiva dei minori), la segreteria può fornire un riepilogo annuale su richiesta.',
    ],
    corpo_en: [
      'All receipts for payments made (membership, courses, bookings) are available in the "Documents" section of your member area, <strong>downloadable as a PDF at any time</strong>.',
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
      'Su tutti i campi è richiesto abbigliamento sportivo idoneo e scarpe adatte alla superficie (<strong>niente suole nere sui campi indoor</strong>).',
      'Gli orari di apertura del Club e della segreteria sono pubblicati nella pagina "Contatti" e possono variare nei periodi festivi: verifica sempre prima di venire.',
    ],
    corpo_en: [
      'The full club regulation is available at reception and in the member area; here is a summary of the rules members ask about most.',
      'Members may bring guests to the Club within the time slots and guest fees in place: ask reception for the current conditions.',
      'Suitable sportswear and shoes appropriate to the surface are required on all courts (<strong>no black soles on indoor courts</strong>).',
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
      'Per iscrivere un bambino serve: <strong>certificato medico non agonistico in corso di validità</strong>, tesseramento FITP (se richiesto per il livello) e il modulo di iscrizione compilato in segreteria.',
      'Per il primo giorno di lezione bastano abbigliamento sportivo comodo e scarpe da tennis: le racchette per i primi livelli sono fornite dal Club.',
    ],
    corpo_en: [
      'For details on levels, lesson duration and weekly frequency, see the Tennis School page, "Courses and frequency" section.',
      'To enrol a child you need: <strong>a valid non-competitive medical certificate</strong>, FITP registration (if required for the level) and the enrolment form filled in at reception.',
      'For the first lesson, comfortable sportswear and tennis shoes are enough: racquets for the first levels are provided by the Club.',
    ],
  },
];

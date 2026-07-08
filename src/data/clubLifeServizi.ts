// ─────────────────────────────────────────────────────────────────────────
// Servizi del Club — card con icona per la sezione "Servizi" di Club Life.
// Nessuna foto: coerente con lo stile "operativo" di questa sezione.
// ─────────────────────────────────────────────────────────────────────────

export interface ServizioItem {
  icon: 'coach' | 'ballmachine' | 'birthday' | 'locker' | 'shop' | 'medical' | 'graduation' | 'briefcase';
  titolo: string;
  titolo_en: string;
  desc: string;
  desc_en: string;
  dettaglio: string;
  dettaglio_en: string;
  /** Path (senza lingua) verso una pagina di approfondimento, es. '/personal-trainer'. */
  href?: string;
}

export const serviziItems: ServizioItem[] = [
  {
    icon: 'coach',
    titolo: 'Preparatori atletici',
    titolo_en: 'Athletic trainers',
    desc: 'Percorsi personalizzati con il nostro team di Preparazione Atletica, in campo e in palestra.',
    desc_en: 'Personalised training paths with our Athletic Training team, on court and in the gym.',
    dettaglio: "Percorsi personalizzati con il nostro team di Preparazione Atletica, in campo e in palestra: <strong>percorsi di tonificazione, dimagrimento, riequilibrio muscolare e miglioramento della performance</strong>. Prenota l'induction compresa nella sottoscrizione della membership, definisci gli obiettivi e inizia il tuo percorso personalizzato.",
    dettaglio_en: "Personalised training paths with our Athletic Training team, on court and in the gym: <strong>toning, weight loss, muscle rebalancing and performance improvement programmes</strong>. Book the induction included with your membership, set your goals and start your personalised journey.",
    href: '/personal-trainer',
  },
  {
    icon: 'ballmachine',
    titolo: 'Macchina lanciapalline',
    titolo_en: 'Ball machine',
    desc: 'Disponibile su prenotazione per allenarti in autonomia sui colpi da fondo campo.',
    desc_en: 'Available on request to train independently on your baseline strokes.',
    dettaglio: 'Disponibile su prenotazione per allenarti in autonomia sui colpi da fondo campo. <strong>Ripetizioni, continuità e focus</strong>: concentrati sul gesto tecnico con la Slinger come tua avversaria.',
    dettaglio_en: 'Available on request to train independently on your baseline strokes. <strong>Repetition, consistency and focus</strong>: hone your technique with the Slinger as your opponent.',
  },
  {
    icon: 'birthday',
    titolo: 'Feste di compleanno',
    titolo_en: 'Birthday parties',
    desc: 'Organizza il compleanno di tuo figlio al Club, tra campo, giochi e merenda.',
    desc_en: "Host your child's birthday at the Club, with court time, games and a snack.",
    dettaglio: "Organizza il compleanno di tuo figlio al Club, tra campo, giochi e merenda. <strong>Tornei, sfide e giochi con premi e gadget</strong> per tutti i partecipanti, con un'organizzazione su misura in base alle tue esigenze. Al termine si festeggia tutti insieme con una merenda nel garden o nelle sale del club, organizzata con TCAbar by Ghusto.",
    dettaglio_en: "Host your child's birthday at the Club, with court time, games and a snack. <strong>Tournaments, challenges and games with prizes and gifts</strong> for every participant, all organised to suit your needs. Afterwards, celebrate together with a snack in the garden or in the club's rooms, organised with TCAbar by Ghusto.",
  },
  {
    icon: 'locker',
    titolo: 'Spogliatoi e docce',
    titolo_en: 'Changing rooms & showers',
    desc: 'Spogliatoi maschili e femminili con armadietti e docce, sempre a disposizione dei soci.',
    desc_en: "Men's and women's changing rooms with lockers and showers, always available to members.",
    dettaglio: "Spogliatoi maschili e femminili con armadietti e docce, sempre a disposizione dei soci. L'utilizzo degli armadietti è a rotazione: porta sempre con te un lucchetto. <strong>Possibilità di affittare l'armadietto per tutta la durata della membership</strong>, per chi lo desidera.",
    dettaglio_en: "Men's and women's changing rooms with lockers and showers, always available to members. Lockers are used on a rotating basis: always bring your own padlock. <strong>Lockers can be rented for the full duration of the membership</strong>, for those who prefer it.",
  },
  {
    icon: 'shop',
    titolo: 'Noleggio e piccolo shop',
    titolo_en: 'Rental & pro shop',
    desc: 'Racchette a noleggio e articoli tecnici di base disponibili in segreteria. Materiale tecnico in vendita presso il negozio Colombo Sport.',
    desc_en: 'Rental racquets and basic technical items available at reception. Technical gear on sale at the Colombo Sport shop.',
    dettaglio: "Racchette a noleggio e articoli tecnici di base disponibili in segreteria. Materiale tecnico in vendita presso il negozio Colombo Sport: incorda la tua racchetta o lasciati consigliare nell'acquisto di quella più adatta a te e al tuo livello di gioco. Scarpe e outfit tecnici per tutte le superfici e i livelli. <strong>Prezzi riservati per i soci</strong>.",
    dettaglio_en: "Rental racquets and basic technical items available at reception. Technical gear on sale at the Colombo Sport shop: get your racquet strung or ask for advice on choosing the one best suited to you and your level. Shoes and technical outfits for every surface and level. <strong>Special prices for members</strong>.",
  },
  {
    icon: 'medical',
    titolo: 'Medical partner',
    titolo_en: 'Medical partner',
    desc: 'The Athlete Architects x Tennis Club Ambrosiano: la tua squadra per salute e performance sportiva.',
    desc_en: 'The Athlete Architects x Tennis Club Ambrosiano: your team for health and sports performance.',
    dettaglio: "Dai il massimo, proteggi il tuo corpo e migliora costantemente. Affidati a The Athlete Architects, un team di medici, fisioterapisti, osteopati e chinesiologi altamente specializzato che accompagna giocatori di ogni livello in percorsi personalizzati di performance e cura. <strong>Un Case Manager dedicato</strong> pianificherà il tuo percorso e ti seguirà costantemente, garantendo continuità e risultati concreti. Prenota la tua visita: Viale Monza, 133 – Milano. Tel: 02 87338100 / 379 2279797 — Email: info@taa.care. <strong>Sconto dedicato del 10% ai soci</strong>.",
    dettaglio_en: "Give your best, protect your body and keep improving. Trust The Athlete Architects, a highly specialised team of doctors, physiotherapists, osteopaths and kinesiologists who support players of every level with personalised performance and care programmes. <strong>A dedicated Case Manager</strong> will plan your path and follow you every step of the way, ensuring continuity and real results. Book your visit: Viale Monza, 133 – Milan. Tel: 02 87338100 / 379 2279797 — Email: info@taa.care. <strong>10% discount for members</strong>.",
  },
  {
    icon: 'graduation',
    titolo: "Sport e percorso di studio all'estero",
    titolo_en: 'Sport and study abroad pathways',
    desc: "Lesgo USA, College Life Italia e Next Step: tre realtà che accompagnano i giovani tennisti in percorsi formativi sportivi nei campus degli Stati Uniti.",
    desc_en: 'Lesgo USA, College Life Italia and Next Step: three partners guiding young tennis players through sporting and academic pathways on US campuses.',
    dettaglio: "Lesgo USA, College Life Italia e Next Step accompagnano i giovani tennisti in un percorso che va ben oltre lo sport. Attraverso esperienze nei campus universitari americani, programmi di orientamento accademico e opportunità di studio negli Stati Uniti, i ragazzi <strong>sviluppano autonomia, competenze linguistiche e una visione internazionale del proprio futuro</strong>. Un viaggio di crescita personale e sportiva che aiuta ogni atleta a trasformare talento, passione e ambizione in un progetto concreto per il domani.",
    dettaglio_en: "Lesgo USA, College Life Italia and Next Step guide young tennis players on a journey that goes well beyond sport. Through experiences on American university campuses, academic orientation programmes and study opportunities in the United States, young athletes <strong>build independence, language skills and an international outlook on their future</strong>. A journey of personal and sporting growth that helps every athlete turn talent, passion and ambition into a concrete plan for tomorrow.",
  },
  {
    icon: 'briefcase',
    titolo: 'Corporate: convenzioni ed eventi aziendali',
    titolo_en: 'Corporate: agreements and business events',
    desc: 'Investi nel benessere dei tuoi collaboratori con una convenzione aziendale dedicata o organizza un evento su misura per la tua azienda.',
    desc_en: "Invest in your team's wellbeing with a dedicated corporate agreement, or organise a custom event for your company.",
    dettaglio: "L'attività fisica contribuisce a migliorare il benessere psicofisico, ridurre lo stress e favorire energia, motivazione e produttività nella vita lavorativa quotidiana. Il Club offre <strong>convenzioni corporate personalizzate</strong> che consentono ai collaboratori di accedere a sport, benessere e momenti di svago in un ambiente esclusivo e accogliente. Il Club è inoltre la location ideale per meeting, eventi aziendali, giornate dedicate ai dipendenti e attività di team building. Dalle competizioni sportive alle esperienze personalizzate, creiamo occasioni di condivisione che rafforzano le relazioni tra colleghi e lo spirito di squadra. Contattaci per sviluppare una convenzione dedicata o richiedere un preventivo per il tuo prossimo evento aziendale.",
    dettaglio_en: "Physical activity helps improve psychophysical wellbeing, reduce stress and boost energy, motivation and productivity in everyday working life. The Club offers <strong>customised corporate agreements</strong> that let employees access sport, wellness and leisure time in an exclusive, welcoming environment. The Club is also the ideal location for meetings, corporate events, employee days and team-building activities. From sporting competitions to tailor-made experiences, we create opportunities to share that strengthen relationships between colleagues and team spirit. Contact us to develop a dedicated agreement or request a quote for your next corporate event.",
  },
];

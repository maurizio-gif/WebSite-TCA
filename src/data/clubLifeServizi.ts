// ─────────────────────────────────────────────────────────────────────────
// Servizi del Club — card con icona per la sezione "Servizi" di Club Life.
// Nessuna foto: coerente con lo stile "operativo" di questa sezione.
// ─────────────────────────────────────────────────────────────────────────

export interface ServizioItem {
  icon: 'coach' | 'ballmachine' | 'pickleball' | 'birthday' | 'locker' | 'shop';
  titolo: string;
  titolo_en: string;
  desc: string;
  desc_en: string;
  /** Path (senza lingua) verso una pagina di approfondimento, es. '/personal-trainer'. */
  href?: string;
}

export const serviziItems: ServizioItem[] = [
  {
    icon: 'coach',
    titolo: 'Preparatori atletici',
    titolo_en: 'Athletic trainers',
    desc: 'Percorsi personalizzati con il nostro team di Preparazione Atletica, in campo e in sala pesi.',
    desc_en: 'Personalised training paths with our Athletic Training team, on court and in the gym.',
    href: '/personal-trainer',
  },
  {
    icon: 'ballmachine',
    titolo: 'Macchina lanciapalline',
    titolo_en: 'Ball machine',
    desc: 'Disponibile su prenotazione per allenarti in autonomia sui colpi da fondo campo.',
    desc_en: 'Available on request to train independently on your baseline strokes.',
  },
  {
    icon: 'pickleball',
    titolo: 'Pickleball',
    titolo_en: 'Pickleball',
    desc: 'Campi dedicati e attrezzatura a disposizione per lo sport più in crescita del momento.',
    desc_en: 'Dedicated courts and equipment available for the fastest-growing sport around.',
  },
  {
    icon: 'birthday',
    titolo: 'Feste di compleanno',
    titolo_en: 'Birthday parties',
    desc: 'Organizza il compleanno di tuo figlio al Club, tra campo, giochi e merenda.',
    desc_en: "Host your child's birthday at the Club, with court time, games and a snack.",
  },
  {
    icon: 'locker',
    titolo: 'Spogliatoi e docce',
    titolo_en: 'Changing rooms & showers',
    desc: 'Spogliatoi maschili e femminili con armadietti e docce, sempre a disposizione dei soci.',
    desc_en: "Men's and women's changing rooms with lockers and showers, always available to members.",
  },
  {
    icon: 'shop',
    titolo: 'Noleggio e piccolo shop',
    titolo_en: 'Rental & pro shop',
    desc: 'Racchette a noleggio e articoli tecnici di base disponibili in segreteria.',
    desc_en: 'Rental racquets and basic technical items available at reception.',
  },
];

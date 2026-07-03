// ─────────────────────────────────────────────────────────────────────────
// News dal Club — articoli editoriali per la pagina Club Life.
// Array di dati tipizzato (vedi helpDesk.ts per la stessa filosofia).
// ─────────────────────────────────────────────────────────────────────────

import { publicUrl } from '../i18n/utils';

export interface NewsArticle {
  slug: string;
  categoria: string;
  categoria_en: string;
  data: string;      // etichetta leggibile, es. "2 luglio 2026"
  data_en: string;
  titolo: string;
  titolo_en: string;
  sintesi: string;
  sintesi_en: string;
  img: string;
  imgAlt: string;
  imgAlt_en: string;
  corpo: string[];
  corpo_en: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'corsi-annuali-tennis-padel-2026-2027',
    categoria: 'Corsi',
    categoria_en: 'Courses',
    data: '1 luglio 2026',
    data_en: 'July 1, 2026',
    titolo: 'Aperte le iscrizioni ai corsi annuali di Tennis e Padel 2026/2027',
    titolo_en: 'Enrolment open for the 2026/2027 annual Tennis and Padel courses',
    sintesi: 'Dal 14 settembre 2026 al 14 maggio 2027: corsi mono e bisettimanali per adulti, con provino obbligatorio con i maestri.',
    sintesi_en: 'From September 14, 2026 to May 14, 2027: single and twice-weekly courses for adults, with a mandatory trial with the coaches.',
    img: publicUrl('/Tennis%20Adulti%202.avif'),
    imgAlt: 'Lezione di tennis per adulti sui campi del TCA',
    imgAlt_en: 'Adult tennis lesson on the TCA courts',
    corpo: [
      'Sono aperte le iscrizioni ai corsi annuali di Tennis e Padel per adulti, in programma dal 14 settembre 2026 al 14 maggio 2027.',
      'Per il corso mono settimanale la quota è di 650€ per i Soci e 850€ per i Non Soci; per il bisettimanale 1.250€ per i Soci e 1.550€ per i Non Soci.',
      'Per iscriversi è necessario prenotare un provino con i Maestri, consegnare il modulo di iscrizione, presentare il certificato medico e il tesseramento FITP in corso di validità.',
      'Per informazioni: info@tcambrosiano.com.',
    ],
    corpo_en: [
      'Enrolment is now open for the annual adult Tennis and Padel courses, running from September 14, 2026 to May 14, 2027.',
      'The single-weekly course costs €650 for Members and €850 for Non-members; the twice-weekly course costs €1,250 for Members and €1,550 for Non-members.',
      'To enrol you need to book a trial with the coaches, submit the enrolment form, and provide a valid medical certificate and FITP membership.',
      'For information: info@tcambrosiano.com.',
    ],
  },
  {
    slug: 'corsi-estivi-tennis-padel-adulti-2026',
    categoria: 'Corsi',
    categoria_en: 'Courses',
    data: '28 maggio 2026',
    data_en: 'May 28, 2026',
    titolo: 'Al via i corsi estivi di Tennis e Padel per adulti',
    titolo_en: 'Summer Tennis and Padel courses for adults are starting',
    sintesi: 'Tennis dall\'8 giugno al 3 luglio, Padel dall\'8 giugno al 16 luglio: entrambi dalle 19.30 alle 22.30.',
    sintesi_en: 'Tennis from June 8 to July 3, Padel from June 8 to July 16: both from 7.30pm to 10.30pm.',
    img: publicUrl('/Tennis%20Adulti.avif'),
    imgAlt: 'Corso estivo di tennis per adulti al tramonto',
    imgAlt_en: 'Summer adult tennis course at sunset',
    corpo: [
      'Sono partiti i corsi estivi di Tennis e Padel dedicati agli adulti, tutte le sere dalle 19.30 alle 22.30.',
      'Il corso di Tennis va dall\'8 giugno al 3 luglio: quota di 120€ per i Soci e 160€ per i Non Soci. Per informazioni: Mattia Tacchella, 333 878 6691.',
      'Il corso di Padel va dall\'8 giugno al 16 luglio: quota di 180€ per i Soci e 240€ per i Non Soci. Per informazioni: Matteo Zanchi, 347 438 3669.',
      'Per ulteriori dettagli: info@tcambrosiano.com.',
    ],
    corpo_en: [
      'The summer Tennis and Padel courses for adults have started, every evening from 7.30pm to 10.30pm.',
      'The Tennis course runs from June 8 to July 3: €120 for Members, €160 for Non-members. Information: Mattia Tacchella, 333 878 6691.',
      'The Padel course runs from June 8 to July 16: €180 for Members, €240 for Non-members. Information: Matteo Zanchi, 347 438 3669.',
      'For further details: info@tcambrosiano.com.',
    ],
  },
  {
    slug: 'scuola-tennis-minitennis-2026-2027',
    categoria: 'Scuola Tennis',
    categoria_en: 'Tennis School',
    data: '25 giugno 2026',
    data_en: 'June 25, 2026',
    titolo: 'Iscrizioni aperte a Scuola Tennis e Minitennis 2026/2027',
    titolo_en: 'Enrolment open for Tennis School and Minitennis 2026/2027',
    sintesi: 'Scuola Tennis per i nati nel 2019 e precedenti, Minitennis per i nati nel 2020 e 2021: mono, bi o trisettimanale.',
    sintesi_en: 'Tennis School for children born in 2019 or earlier, Minitennis for those born in 2020 and 2021: once, twice or three times a week.',
    img: publicUrl('/Scuola%20Tennis%206.jpg'),
    imgAlt: 'Bambini durante una lezione di Scuola Tennis al TCA',
    imgAlt_en: 'Children during a Tennis School lesson at TCA',
    corpo: [
      'Sono aperte le iscrizioni alla nuova stagione di Scuola Tennis e Minitennis, in partenza a settembre.',
      'Scuola Tennis (nati nel 2019 e anni precedenti): 950€ Soci / 1.050€ Non Soci mono settimanale, 1.400€ / 1.600€ bisettimanale, 1.750€ / 1.900€ trisettimanale.',
      'Minitennis (nati nel 2020 e 2021): 720€ Soci / 790€ Non Soci mono settimanale, 1.000€ / 1.200€ bisettimanale.',
      'Per iscriversi sono richiesti il modulo di iscrizione, il certificato medico e il tesseramento FITP.',
    ],
    corpo_en: [
      'Enrolment is now open for the new Tennis School and Minitennis season, starting in September.',
      'Tennis School (born in 2019 or earlier): €950 Members / €1,050 Non-members once a week, €1,400 / €1,600 twice a week, €1,750 / €1,900 three times a week.',
      'Minitennis (born in 2020 and 2021): €720 Members / €790 Non-members once a week, €1,000 / €1,200 twice a week.',
      'Enrolment requires the sign-up form, a medical certificate and FITP membership.',
    ],
  },
];

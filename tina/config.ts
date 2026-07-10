import { defineConfig } from 'tinacms';

// Credenziali TinaCloud — aggiungile come variabili d'ambiente:
//   TINA_CLIENT_ID  →  Vercel: Project Settings > Environment Variables
//   TINA_TOKEN      →  stessa posizione
// Ottienile su: https://app.tina.io

export default defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      // Le immagini del sito vivono direttamente in public/ (root)
      mediaRoot: '',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ─── EVENTI ────────────────────────────────────────────────────────────
      // Il marketing può aggiungere eventi da qui: https://app.tina.io
      // Ogni evento è un file .md in src/content/eventi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'eventi',
        label: 'Eventi',
        path: 'src/content/eventi',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'titolo',
            label: 'Titolo evento',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'data',
            label: 'Data',
            required: true,
            ui: { dateFormat: 'DD/MM/YYYY' },
          },
          {
            type: 'string',
            name: 'categoria',
            label: 'Categoria',
            required: true,
            options: ['Torneo', 'Clinic', 'Evento', 'Camp'],
          },
          {
            type: 'string',
            name: 'descrizione',
            label: 'Descrizione breve',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'luogo',
            label: 'Luogo (es. Campo 3, Club House)',
          },
          {
            type: 'string',
            name: 'iscrizioniHref',
            label: 'Link iscrizioni (URL)',
          },
          {
            type: 'boolean',
            name: 'pubblicato',
            label: 'Pubblicato',
          },
          {
            type: 'string',
            name: 'titolo_en',
            label: '🇬🇧 Titolo (inglese)',
          },
          {
            type: 'string',
            name: 'descrizione_en',
            label: '🇬🇧 Descrizione breve (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'luogo_en',
            label: '🇬🇧 Luogo (inglese)',
          },
          {
            type: 'string',
            name: 'corpo_en',
            label: '🇬🇧 Dettagli evento (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Dettagli evento (italiano)',
            isBody: true,
          },
        ],
      },
      // ─── SERVIZI CLUB LIFE ─────────────────────────────────────────────────
      // Card della sezione "Servizi e Partner" di Club Life.
      // Ogni servizio è un file .md in src/content/servizi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'servizi',
        label: 'Servizi Club Life',
        path: 'src/content/servizi',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'titolo',
            label: 'Titolo',
            isTitle: true,
            required: true,
          },
          {
            type: 'number',
            name: 'ordine',
            label: 'Ordine nella griglia (1 = primo)',
            required: true,
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icona',
            required: true,
            options: [
              { value: 'coach', label: 'Preparatore (persona)' },
              { value: 'ballmachine', label: 'Macchina lanciapalline' },
              { value: 'birthday', label: 'Compleanno (torta)' },
              { value: 'locker', label: 'Armadietti' },
              { value: 'shop', label: 'Shop (borsa)' },
              { value: 'medical', label: 'Medico (scudo con croce)' },
              { value: 'graduation', label: 'Studio (tocco di laurea)' },
              { value: 'briefcase', label: 'Corporate (valigetta)' },
            ],
          },
          {
            type: 'string',
            name: 'desc',
            label: 'Descrizione breve (nella card)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'dettaglio',
            label: 'Dettaglio (nel popup) — grassetto con **doppi asterischi**',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'href',
            label: 'Link di approfondimento (opzionale, es. /personal-trainer)',
          },
          {
            type: 'string',
            name: 'titolo_en',
            label: '🇬🇧 Titolo (inglese)',
          },
          {
            type: 'string',
            name: 'desc_en',
            label: '🇬🇧 Descrizione breve (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'dettaglio_en',
            label: '🇬🇧 Dettaglio (inglese)',
            ui: { component: 'textarea' },
          },
        ],
      },
      // ─── PLANNING CORSI ────────────────────────────────────────────────────
      // Planning settimanale dei corsi di gruppo (pagina Preparazione
      // Atletica). File unico: ogni riga è una lezione.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'planning',
        label: 'Planning Corsi',
        path: 'src/content/planning',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'lezioni',
            label: 'Lezioni',
            list: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.giorno && item?.ora
                  ? `${(item.giorno || '').toUpperCase()} ${item.ora} — ${item.nome || ''}`
                  : 'Nuova lezione',
              }),
            },
            fields: [
              {
                type: 'string',
                name: 'giorno',
                label: 'Giorno',
                required: true,
                options: [
                  { value: 'lun', label: 'Lunedì' },
                  { value: 'mar', label: 'Martedì' },
                  { value: 'mer', label: 'Mercoledì' },
                  { value: 'gio', label: 'Giovedì' },
                  { value: 'ven', label: 'Venerdì' },
                  { value: 'sab', label: 'Sabato' },
                  { value: 'dom', label: 'Domenica' },
                ],
              },
              {
                type: 'string',
                name: 'ora',
                label: 'Orario (es. 09:15)',
                required: true,
              },
              {
                type: 'string',
                name: 'categoria',
                label: 'Categoria',
                required: true,
                options: [
                  { value: 'S', label: 'Strength' },
                  { value: 'B', label: 'Balance' },
                  { value: 'E', label: 'Endurance' },
                ],
              },
              {
                type: 'string',
                name: 'nome',
                label: 'Nome corso',
                required: true,
              },
            ],
          },
        ],
      },
      // ─── CORPO PAGINA: STORIA ──────────────────────────────────────────────
      // Contenuto sotto l'hero della pagina Storia (timeline + "Il club oggi").
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'corpoStoria',
        label: 'Pagina Storia — Contenuto',
        path: 'src/content/corpoStoria',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'string',
            name: 'sezione1_eyebrow',
            label: 'Sezione 1 — eyebrow (es. "La timeline")',
            required: true,
          },
          {
            type: 'string',
            name: 'sezione1_titolo',
            label: 'Sezione 1 — titolo',
            required: true,
          },
          {
            type: 'string',
            name: 'sezione1_titolo_accent',
            label: 'Sezione 1 — titolo (parte evidenziata in rosso)',
            required: true,
          },
          {
            type: 'object',
            name: 'timeline',
            label: 'Timeline',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.anno ? `${item.anno} — ${item.testo || ''}` : 'Nuova voce',
              }),
            },
            fields: [
              { type: 'string', name: 'anno', label: 'Anno', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'string',
            name: 'sezione2_eyebrow',
            label: 'Sezione 2 — eyebrow (es. "Il club oggi")',
            required: true,
          },
          {
            type: 'string',
            name: 'sezione2_titolo',
            label: 'Sezione 2 — titolo',
            required: true,
          },
          {
            type: 'string',
            name: 'sezione2_titolo_accent',
            label: 'Sezione 2 — titolo (parte evidenziata in rosso)',
            required: true,
          },
          {
            type: 'string',
            name: 'paragrafo1',
            label: 'Paragrafo 1 — grassetto con **doppi asterischi**',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'paragrafo2',
            label: 'Paragrafo 2 — grassetto con **doppi asterischi**',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'object',
            name: 'galleria',
            label: 'Galleria immagini',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.alt || 'Immagine' }),
            },
            fields: [
              { type: 'image', name: 'immagine', label: 'Immagine', required: true },
              { type: 'string', name: 'alt', label: 'Testo alternativo', required: true },
            ],
          },
          {
            type: 'string',
            name: 'sezione1_eyebrow_en',
            label: '🇬🇧 Sezione 1 — eyebrow (inglese)',
          },
          {
            type: 'string',
            name: 'sezione1_titolo_en',
            label: '🇬🇧 Sezione 1 — titolo (inglese)',
          },
          {
            type: 'string',
            name: 'sezione1_titolo_accent_en',
            label: '🇬🇧 Sezione 1 — titolo evidenziato (inglese)',
          },
          {
            type: 'string',
            name: 'sezione2_eyebrow_en',
            label: '🇬🇧 Sezione 2 — eyebrow (inglese)',
          },
          {
            type: 'string',
            name: 'sezione2_titolo_en',
            label: '🇬🇧 Sezione 2 — titolo (inglese)',
          },
          {
            type: 'string',
            name: 'sezione2_titolo_accent_en',
            label: '🇬🇧 Sezione 2 — titolo evidenziato (inglese)',
          },
          {
            type: 'string',
            name: 'paragrafo1_en',
            label: '🇬🇧 Paragrafo 1 (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'paragrafo2_en',
            label: '🇬🇧 Paragrafo 2 (inglese)',
            ui: { component: 'textarea' },
          },
        ],
      },
      // ─── CORPO PAGINA: SUMMER CAMPS ────────────────────────────────────────
      // Contenuto sotto l'hero della pagina Summer Camps.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'corpoSummerCamps',
        label: 'Pagina Summer Camps — Contenuto',
        path: 'src/content/corpoSummerCamps',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'sezione1_eyebrow', label: 'Sezione 1 — eyebrow', required: true },
          { type: 'string', name: 'sezione1_titolo', label: 'Sezione 1 — titolo', required: true },
          { type: 'string', name: 'sezione1_titolo_accent', label: 'Sezione 1 — titolo evidenziato', required: true },
          {
            type: 'object',
            name: 'features',
            label: 'Caratteristiche del programma',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.titolo || 'Nuova caratteristica' }),
            },
            fields: [
              { type: 'string', name: 'titolo', label: 'Titolo', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'titolo_en', label: '🇬🇧 Titolo (inglese)' },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)', ui: { component: 'textarea' } },
            ],
          },
          { type: 'image', name: 'immagine1', label: 'Immagine 1 (grande)', required: true },
          { type: 'string', name: 'immagine1_alt', label: 'Immagine 1 — testo alternativo', required: true },
          { type: 'image', name: 'immagine2', label: 'Immagine 2 (piccola)', required: true },
          { type: 'string', name: 'immagine2_alt', label: 'Immagine 2 — testo alternativo', required: true },
          { type: 'string', name: 'sezione2_eyebrow', label: 'Sezione 2 — eyebrow', required: true },
          { type: 'string', name: 'sezione2_titolo', label: 'Sezione 2 — titolo', required: true },
          { type: 'string', name: 'sezione2_titolo_accent', label: 'Sezione 2 — titolo evidenziato', required: true },
          {
            type: 'object',
            name: 'settimane',
            label: 'Settimane disponibili',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({
                label: item?.settimana ? `${item.settimana} — ${item.date || ''}` : 'Nuova settimana',
              }),
            },
            fields: [
              { type: 'string', name: 'settimana', label: 'Settimana (es. "1ª Settimana")', required: true },
              { type: 'string', name: 'date', label: 'Date (es. "8 – 12 Giugno 2026")', required: true },
              { type: 'string', name: 'settimana_en', label: '🇬🇧 Settimana (inglese, es. "Week 1")' },
              { type: 'string', name: 'date_en', label: '🇬🇧 Date (inglese)' },
            ],
          },
          { type: 'string', name: 'sezione1_eyebrow_en', label: '🇬🇧 Sezione 1 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione1_titolo_en', label: '🇬🇧 Sezione 1 — titolo (inglese)' },
          { type: 'string', name: 'sezione1_titolo_accent_en', label: '🇬🇧 Sezione 1 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'immagine1_alt_en', label: '🇬🇧 Immagine 1 — alt (inglese)' },
          { type: 'string', name: 'immagine2_alt_en', label: '🇬🇧 Immagine 2 — alt (inglese)' },
          { type: 'string', name: 'sezione2_eyebrow_en', label: '🇬🇧 Sezione 2 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione2_titolo_en', label: '🇬🇧 Sezione 2 — titolo (inglese)' },
          { type: 'string', name: 'sezione2_titolo_accent_en', label: '🇬🇧 Sezione 2 — titolo evidenziato (inglese)' },
        ],
      },
      // ─── CORPO PAGINA: SCUOLA TENNIS ───────────────────────────────────────
      // Contenuto sotto l'hero della pagina Scuola Tennis.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'corpoScuolaTennis',
        label: 'Pagina Scuola Tennis — Contenuto',
        path: 'src/content/corpoScuolaTennis',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'sezione1_eyebrow', label: 'Sezione 1 — eyebrow', required: true },
          { type: 'string', name: 'sezione1_titolo', label: 'Sezione 1 — titolo', required: true },
          { type: 'string', name: 'sezione1_titolo_accent', label: 'Sezione 1 — titolo evidenziato', required: true },
          { type: 'string', name: 'sezione1_lead', label: 'Sezione 1 — testo introduttivo', required: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'livelli',
            label: 'Livelli (percorso a colori)',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.nome || 'Nuovo livello' }),
            },
            fields: [
              {
                type: 'string', name: 'dot', label: 'Colore', required: true,
                options: [
                  { value: 'rosso', label: 'Rosso' },
                  { value: 'arancio', label: 'Arancio' },
                  { value: 'verde', label: 'Verde' },
                  { value: 'giallo', label: 'Giallo' },
                ],
              },
              { type: 'string', name: 'nome', label: 'Nome livello', required: true },
              { type: 'string', name: 'tag', label: 'Tag (es. "Mini Tennis")', required: true },
              { type: 'string', name: 'range', label: 'Fascia età', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'nome_en', label: '🇬🇧 Nome (inglese)' },
              { type: 'string', name: 'tag_en', label: '🇬🇧 Tag (inglese)' },
              { type: 'string', name: 'range_en', label: '🇬🇧 Fascia età (inglese)' },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'livelli_footer_testo', label: 'Testo dopo i livelli (prima del link)', required: true },
          { type: 'string', name: 'livelli_footer_link_label', label: 'Etichetta link (verso /agonistica)', required: true },
          { type: 'string', name: 'sezione2_eyebrow', label: 'Sezione 2 — eyebrow', required: true },
          { type: 'string', name: 'sezione2_titolo', label: 'Sezione 2 — titolo', required: true },
          { type: 'string', name: 'sezione2_titolo_accent', label: 'Sezione 2 — titolo evidenziato', required: true },
          {
            type: 'object',
            name: 'iscrizione_cards',
            label: 'Card iscrizione',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.titolo || 'Nuova card' }),
            },
            fields: [
              { type: 'string', name: 'titolo', label: 'Titolo', required: true },
              { type: 'string', name: 'tag', label: 'Tag (es. "Nati nel 2020 e 2021")', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'titolo_en', label: '🇬🇧 Titolo (inglese)' },
              { type: 'string', name: 'tag_en', label: '🇬🇧 Tag (inglese)' },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'iscrizione_cta_label', label: 'Testo pulsante iscrizione', required: true },
          { type: 'string', name: 'sezione3_eyebrow', label: 'Sezione 3 — eyebrow', required: true },
          { type: 'string', name: 'sezione3_titolo', label: 'Sezione 3 — titolo', required: true },
          { type: 'string', name: 'sezione3_titolo_accent', label: 'Sezione 3 — titolo evidenziato', required: true },
          { type: 'string', name: 'sezione3_badge', label: 'Sezione 3 — badge (es. "Vavassori Tennis Academy...")', required: true },
          { type: 'string', name: 'sezione3_paragrafo1', label: 'Sezione 3 — paragrafo 1 (**grassetto**)', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione3_paragrafo2', label: 'Sezione 3 — paragrafo 2', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione3_paragrafo3', label: 'Sezione 3 — paragrafo 3 (**grassetto**)', required: true, ui: { component: 'textarea' } },
          { type: 'image', name: 'sezione3_immagine', label: 'Sezione 3 — immagine', required: true },
          { type: 'string', name: 'sezione3_immagine_alt', label: 'Sezione 3 — immagine, testo alternativo', required: true },
          { type: 'string', name: 'sezione4_eyebrow', label: 'Sezione 4 — eyebrow', required: true },
          { type: 'string', name: 'sezione4_titolo', label: 'Sezione 4 — titolo', required: true },
          { type: 'string', name: 'sezione4_titolo_accent', label: 'Sezione 4 — titolo evidenziato', required: true },
          {
            type: 'object',
            name: 'tornei',
            label: 'Tornei durante l\'anno',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.nome || 'Nuovo torneo' }),
            },
            fields: [
              { type: 'string', name: 'quando', label: 'Quando (es. "Dicembre")', required: true },
              { type: 'string', name: 'nome', label: 'Nome torneo', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'quando_en', label: '🇬🇧 Quando (inglese)' },
              { type: 'string', name: 'nome_en', label: '🇬🇧 Nome (inglese)' },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'sezione4_footer_testo', label: 'Testo finale (FITP Junior Program, **grassetto**)', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione1_eyebrow_en', label: '🇬🇧 Sezione 1 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione1_titolo_en', label: '🇬🇧 Sezione 1 — titolo (inglese)' },
          { type: 'string', name: 'sezione1_titolo_accent_en', label: '🇬🇧 Sezione 1 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sezione1_lead_en', label: '🇬🇧 Sezione 1 — testo introduttivo (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'livelli_footer_testo_en', label: '🇬🇧 Testo dopo i livelli (inglese)' },
          { type: 'string', name: 'livelli_footer_link_label_en', label: '🇬🇧 Etichetta link (inglese)' },
          { type: 'string', name: 'sezione2_eyebrow_en', label: '🇬🇧 Sezione 2 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione2_titolo_en', label: '🇬🇧 Sezione 2 — titolo (inglese)' },
          { type: 'string', name: 'sezione2_titolo_accent_en', label: '🇬🇧 Sezione 2 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'iscrizione_cta_label_en', label: '🇬🇧 Testo pulsante iscrizione (inglese)' },
          { type: 'string', name: 'sezione3_eyebrow_en', label: '🇬🇧 Sezione 3 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione3_titolo_en', label: '🇬🇧 Sezione 3 — titolo (inglese)' },
          { type: 'string', name: 'sezione3_titolo_accent_en', label: '🇬🇧 Sezione 3 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sezione3_badge_en', label: '🇬🇧 Sezione 3 — badge (inglese)' },
          { type: 'string', name: 'sezione3_paragrafo1_en', label: '🇬🇧 Sezione 3 — paragrafo 1 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione3_paragrafo2_en', label: '🇬🇧 Sezione 3 — paragrafo 2 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione3_paragrafo3_en', label: '🇬🇧 Sezione 3 — paragrafo 3 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione3_immagine_alt_en', label: '🇬🇧 Sezione 3 — immagine, alt (inglese)' },
          { type: 'string', name: 'sezione4_eyebrow_en', label: '🇬🇧 Sezione 4 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione4_titolo_en', label: '🇬🇧 Sezione 4 — titolo (inglese)' },
          { type: 'string', name: 'sezione4_titolo_accent_en', label: '🇬🇧 Sezione 4 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sezione4_footer_testo_en', label: '🇬🇧 Testo finale (inglese)', ui: { component: 'textarea' } },
        ],
      },
      // ─── CORPO PAGINA: PERSONAL TRAINER ────────────────────────────────────
      // Contenuto sotto l'hero della pagina Personal Trainer.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'corpoPersonalTrainer',
        label: 'Pagina Personal Trainer — Contenuto',
        path: 'src/content/corpoPersonalTrainer',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'sezione1_eyebrow', label: 'Sezione 1 — eyebrow', required: true },
          { type: 'string', name: 'sezione1_titolo', label: 'Sezione 1 — titolo', required: true },
          { type: 'string', name: 'sezione1_titolo_accent', label: 'Sezione 1 — titolo evidenziato', required: true },
          { type: 'string', name: 'sezione1_paragrafo1', label: 'Sezione 1 — paragrafo 1', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione1_paragrafo2', label: 'Sezione 1 — paragrafo 2', required: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'stats',
            label: 'Statistiche',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.numero ? `${item.numero} — ${item.etichetta || ''}` : 'Nuova statistica' }),
            },
            fields: [
              { type: 'string', name: 'numero', label: 'Numero/simbolo (es. "5", "1:1", "60\'", "∞")', required: true },
              { type: 'string', name: 'etichetta', label: 'Etichetta (una riga per fascia)', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'etichetta_en', label: '🇬🇧 Etichetta (inglese)', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'sezione2_eyebrow', label: 'Sezione 2 — eyebrow', required: true },
          { type: 'string', name: 'sezione2_titolo', label: 'Sezione 2 — titolo', required: true },
          { type: 'string', name: 'sezione2_titolo_accent', label: 'Sezione 2 — titolo evidenziato', required: true },
          {
            type: 'object',
            name: 'trainers',
            label: 'Trainer',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.nome || 'Nuovo trainer' }),
            },
            fields: [
              { type: 'string', name: 'nome', label: 'Nome', required: true },
              { type: 'image', name: 'foto', label: 'Foto (se assente, mostra un placeholder col nome)' },
              { type: 'string', name: 'specializzazioni', label: 'Specializzazioni', list: true, required: true },
              { type: 'string', name: 'qualifiche', label: 'Qualifiche e certificazioni', list: true, required: true },
              { type: 'string', name: 'lingue', label: 'Lingue parlate (lascia vuoto per non mostrare la riga)', list: true },
              { type: 'string', name: 'specializzazioni_en', label: '🇬🇧 Specializzazioni (inglese)', list: true },
              { type: 'string', name: 'qualifiche_en', label: '🇬🇧 Qualifiche (inglese)', list: true },
              { type: 'string', name: 'lingue_en', label: '🇬🇧 Lingue (inglese)', list: true },
            ],
          },
          { type: 'string', name: 'sezione3_eyebrow', label: 'Sezione 3 — eyebrow', required: true },
          { type: 'string', name: 'sezione3_titolo', label: 'Sezione 3 — titolo', required: true },
          { type: 'string', name: 'sezione3_titolo_accent', label: 'Sezione 3 — titolo evidenziato', required: true },
          {
            type: 'object',
            name: 'steps',
            label: 'Come funziona — step',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.titolo || 'Nuovo step' }),
            },
            fields: [
              { type: 'string', name: 'titolo', label: 'Titolo', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'titolo_en', label: '🇬🇧 Titolo (inglese)' },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'sezione4_titolo', label: 'CTA finale — titolo', required: true },
          { type: 'string', name: 'sezione4_sottotitolo', label: 'CTA finale — sottotitolo', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione4_cta_label', label: 'CTA finale — testo pulsante', required: true },
          { type: 'string', name: 'sezione1_eyebrow_en', label: '🇬🇧 Sezione 1 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione1_titolo_en', label: '🇬🇧 Sezione 1 — titolo (inglese)' },
          { type: 'string', name: 'sezione1_titolo_accent_en', label: '🇬🇧 Sezione 1 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sezione1_paragrafo1_en', label: '🇬🇧 Sezione 1 — paragrafo 1 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione1_paragrafo2_en', label: '🇬🇧 Sezione 1 — paragrafo 2 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione2_eyebrow_en', label: '🇬🇧 Sezione 2 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione2_titolo_en', label: '🇬🇧 Sezione 2 — titolo (inglese)' },
          { type: 'string', name: 'sezione2_titolo_accent_en', label: '🇬🇧 Sezione 2 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sezione3_eyebrow_en', label: '🇬🇧 Sezione 3 — eyebrow (inglese)' },
          { type: 'string', name: 'sezione3_titolo_en', label: '🇬🇧 Sezione 3 — titolo (inglese)' },
          { type: 'string', name: 'sezione3_titolo_accent_en', label: '🇬🇧 Sezione 3 — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sezione4_titolo_en', label: '🇬🇧 CTA finale — titolo (inglese)' },
          { type: 'string', name: 'sezione4_sottotitolo_en', label: '🇬🇧 CTA finale — sottotitolo (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sezione4_cta_label_en', label: '🇬🇧 CTA finale — testo pulsante (inglese)' },
        ],
      },
      // ─── CORPO PAGINA: PREPARAZIONE ATLETICA ───────────────────────────────
      // Contenuto sotto l'hero della pagina Preparazione Atletica.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'corpoPreparazioneAtletica',
        label: 'Pagina Preparazione Atletica — Contenuto',
        path: 'src/content/corpoPreparazioneAtletica',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'sala_eyebrow', label: 'Sala Attrezzi — eyebrow', required: true },
          { type: 'string', name: 'sala_titolo', label: 'Sala Attrezzi — titolo', required: true },
          { type: 'string', name: 'sala_titolo_accent', label: 'Sala Attrezzi — titolo evidenziato', required: true },
          { type: 'string', name: 'sala_paragrafo1', label: 'Sala Attrezzi — paragrafo 1 (**grassetto**)', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'sala_paragrafo2', label: 'Sala Attrezzi — paragrafo 2 (**grassetto**)', required: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'sala_slideshow',
            label: 'Sala Attrezzi — slideshow foto',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.alt || 'Foto' }),
            },
            fields: [
              { type: 'image', name: 'immagine', label: 'Immagine', required: true },
              { type: 'string', name: 'alt', label: 'Testo alternativo', required: true },
              { type: 'string', name: 'alt_en', label: '🇬🇧 Testo alternativo (inglese)' },
            ],
          },
          {
            type: 'object',
            name: 'sala_features',
            label: 'Sala Attrezzi — caratteristiche (ordine fisso, icone in codice)',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.titolo || 'Nuova caratteristica' }),
            },
            fields: [
              { type: 'string', name: 'titolo', label: 'Titolo', required: true },
              { type: 'string', name: 'testo', label: 'Testo', required: true },
              { type: 'string', name: 'titolo_en', label: '🇬🇧 Titolo (inglese)' },
              { type: 'string', name: 'testo_en', label: '🇬🇧 Testo (inglese)' },
            ],
          },
          { type: 'string', name: 'sala_cta_label', label: 'Sala Attrezzi — testo link Personal Trainer', required: true },
          { type: 'string', name: 'corsi_eyebrow', label: 'Corsi di Gruppo — eyebrow', required: true },
          { type: 'string', name: 'corsi_titolo', label: 'Corsi di Gruppo — titolo', required: true },
          { type: 'string', name: 'corsi_titolo_accent', label: 'Corsi di Gruppo — titolo evidenziato', required: true },
          { type: 'string', name: 'corsi_sub', label: 'Corsi di Gruppo — testo introduttivo', required: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'categorie',
            label: 'Categorie e corsi',
            list: true,
            required: true,
            ui: {
              itemProps: (item: Record<string, string>) => ({ label: item?.label || 'Nuova categoria' }),
            },
            fields: [
              {
                type: 'string', name: 'id', label: 'ID categoria (fisso, non cambiare)', required: true,
                options: [
                  { value: 'endurance', label: 'endurance' },
                  { value: 'strength', label: 'strength' },
                  { value: 'balance', label: 'balance' },
                ],
              },
              { type: 'string', name: 'label', label: 'Nome categoria', required: true },
              { type: 'string', name: 'desc', label: 'Descrizione categoria', required: true, ui: { component: 'textarea' } },
              { type: 'string', name: 'color', label: 'Colore (hex, es. #B83A00)', required: true },
              { type: 'string', name: 'desc_en', label: '🇬🇧 Descrizione categoria (inglese)', ui: { component: 'textarea' } },
              {
                type: 'object',
                name: 'corsi',
                label: 'Corsi',
                list: true,
                required: true,
                ui: {
                  itemProps: (item: Record<string, string>) => ({ label: item?.nome || 'Nuovo corso' }),
                },
                fields: [
                  { type: 'string', name: 'nome', label: 'Nome corso', required: true },
                  { type: 'string', name: 'durata', label: 'Durata (es. "60 min")', required: true },
                  { type: 'number', name: 'intensita', label: 'Intensità (numero da 1 a 3)', required: true },
                  { type: 'string', name: 'livello', label: 'Livello (es. "Tutti i livelli", "Intermedio")', required: true },
                  { type: 'string', name: 'desc', label: 'Descrizione', required: true, ui: { component: 'textarea' } },
                  { type: 'image', name: 'immagine', label: 'Immagine', required: true },
                  { type: 'string', name: 'nome_en', label: '🇬🇧 Nome corso (inglese)' },
                  { type: 'string', name: 'livello_en', label: '🇬🇧 Livello (inglese)' },
                  { type: 'string', name: 'desc_en', label: '🇬🇧 Descrizione (inglese)', ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          { type: 'string', name: 'calendario_eyebrow', label: 'Calendario — eyebrow', required: true },
          { type: 'string', name: 'calendario_titolo', label: 'Calendario — titolo', required: true },
          { type: 'string', name: 'calendario_titolo_accent', label: 'Calendario — titolo evidenziato', required: true },
          { type: 'string', name: 'calendario_sub', label: 'Calendario — testo introduttivo', required: true },
          { type: 'string', name: 'sala_eyebrow_en', label: '🇬🇧 Sala Attrezzi — eyebrow (inglese)' },
          { type: 'string', name: 'sala_titolo_en', label: '🇬🇧 Sala Attrezzi — titolo (inglese)' },
          { type: 'string', name: 'sala_titolo_accent_en', label: '🇬🇧 Sala Attrezzi — titolo evidenziato (inglese)' },
          { type: 'string', name: 'sala_paragrafo1_en', label: '🇬🇧 Sala Attrezzi — paragrafo 1 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sala_paragrafo2_en', label: '🇬🇧 Sala Attrezzi — paragrafo 2 (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'sala_cta_label_en', label: '🇬🇧 Sala Attrezzi — testo link (inglese)' },
          { type: 'string', name: 'corsi_eyebrow_en', label: '🇬🇧 Corsi di Gruppo — eyebrow (inglese)' },
          { type: 'string', name: 'corsi_titolo_en', label: '🇬🇧 Corsi di Gruppo — titolo (inglese)' },
          { type: 'string', name: 'corsi_titolo_accent_en', label: '🇬🇧 Corsi di Gruppo — titolo evidenziato (inglese)' },
          { type: 'string', name: 'corsi_sub_en', label: '🇬🇧 Corsi di Gruppo — testo introduttivo (inglese)', ui: { component: 'textarea' } },
          { type: 'string', name: 'calendario_eyebrow_en', label: '🇬🇧 Calendario — eyebrow (inglese)' },
          { type: 'string', name: 'calendario_titolo_en', label: '🇬🇧 Calendario — titolo (inglese)' },
          { type: 'string', name: 'calendario_titolo_accent_en', label: '🇬🇧 Calendario — titolo evidenziato (inglese)' },
          { type: 'string', name: 'calendario_sub_en', label: '🇬🇧 Calendario — testo introduttivo (inglese)' },
        ],
      },
      // ─── INFO CLUB ─────────────────────────────────────────────────────────
      // File unico con orari, indirizzo e contatti del Club.
      // Le modifiche si riflettono su tutte le pagine (sezione "Vieni a trovarci").
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'info',
        label: 'Informazioni Club',
        path: 'src/content/info',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'string',
            name: 'indirizzo',
            label: 'Indirizzo',
            required: true,
          },
          {
            type: 'string',
            name: 'come_arrivare',
            label: 'Come arrivare',
            required: true,
          },
          {
            type: 'string',
            name: 'come_arrivare_en',
            label: '🇬🇧 Come arrivare (inglese)',
            required: true,
          },
          {
            type: 'string',
            name: 'orari',
            label: 'Orari Club (una riga per fascia)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'orari_en',
            label: '🇬🇧 Orari Club (inglese)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'telefono',
            label: 'Telefono',
            required: true,
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email',
            required: true,
          },
        ],
      },
      // ─── HELP DESK ─────────────────────────────────────────────────────────
      // Guide della knowledge base Club Life (sezione Help Desk).
      // Ogni guida è un file .md in src/content/helpdesk/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'helpdesk',
        label: 'Help Desk',
        path: 'src/content/helpdesk',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'titolo',
            label: 'Titolo',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'categoria',
            label: 'Categoria',
            required: true,
            options: [
              { value: 'iscrizioni', label: 'Iscrizioni & Tesseramento' },
              { value: 'prenotazioni', label: 'Prenotazioni' },
              { value: 'app', label: 'App & Area Riservata' },
              { value: 'pagamenti', label: 'Pagamenti & Ricevute' },
              { value: 'regolamento', label: 'Regolamento' },
              { value: 'scuola', label: 'Scuola Tennis' },
            ],
          },
          {
            type: 'string',
            name: 'sintesi',
            label: 'Sintesi (anteprima nella card)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tag (per la ricerca)',
            list: true,
          },
          {
            type: 'datetime',
            name: 'aggiornato',
            label: 'Ultimo aggiornamento',
            required: true,
            ui: { dateFormat: 'DD/MM/YYYY' },
          },
          {
            type: 'string',
            name: 'titolo_en',
            label: '🇬🇧 Titolo (inglese)',
          },
          {
            type: 'string',
            name: 'sintesi_en',
            label: '🇬🇧 Sintesi (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'tags_en',
            label: '🇬🇧 Tag (inglese)',
            list: true,
          },
          {
            type: 'string',
            name: 'corpo_en',
            label: '🇬🇧 Testo guida (inglese) — un paragrafo per riga vuota, grassetto con **doppi asterischi**',
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Testo guida (italiano)',
            isBody: true,
          },
        ],
      },
      // ─── NEWS CLUB LIFE ────────────────────────────────────────────────────
      // Articoli della bacheca Club Life (carosello "News dal Club").
      // Ogni news è un file .md in src/content/news/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: 'news',
        label: 'News Club Life',
        path: 'src/content/news',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'titolo',
            label: 'Titolo',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'data',
            label: 'Data',
            required: true,
            ui: { dateFormat: 'DD/MM/YYYY' },
          },
          {
            type: 'string',
            name: 'categoria',
            label: 'Categoria (es. Corsi, Scuola Tennis)',
            required: true,
          },
          {
            type: 'string',
            name: 'sintesi',
            label: 'Sintesi (anteprima nella card)',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'image',
            name: 'immagine',
            label: 'Immagine',
            required: true,
          },
          {
            type: 'string',
            name: 'immagine_alt',
            label: 'Testo alternativo immagine',
            required: true,
          },
          {
            type: 'boolean',
            name: 'pubblicato',
            label: 'Pubblicato',
          },
          {
            type: 'string',
            name: 'cta_label',
            label: 'Pulsante — testo (es. Iscriviti ora)',
          },
          {
            type: 'string',
            name: 'cta_href',
            label: 'Pulsante — link (URL esterno o percorso interno, es. /contatti). Il pulsante appare solo se compilato.',
          },
          {
            type: 'string',
            name: 'titolo_en',
            label: '🇬🇧 Titolo (inglese)',
          },
          {
            type: 'string',
            name: 'categoria_en',
            label: '🇬🇧 Categoria (inglese)',
          },
          {
            type: 'string',
            name: 'cta_label_en',
            label: '🇬🇧 Pulsante — testo (inglese)',
          },
          {
            type: 'string',
            name: 'sintesi_en',
            label: '🇬🇧 Sintesi (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'immagine_alt_en',
            label: '🇬🇧 Testo alternativo immagine (inglese)',
          },
          {
            type: 'string',
            name: 'corpo_en',
            label: '🇬🇧 Testo articolo (inglese) — un paragrafo per riga vuota',
            ui: { component: 'textarea' },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Testo articolo (italiano)',
            isBody: true,
          },
        ],
      },
      {
        name: 'pagine',
        label: 'Pagine',
        path: 'src/content/pagine',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Titolo SEO',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descrizione SEO',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_eyebrow',
            label: 'Hero — eyebrow',
          },
          {
            type: 'string',
            name: 'hero_titolo',
            label: 'Hero — titolo',
          },
          {
            type: 'string',
            name: 'hero_titolo_accent',
            label: 'Hero — titolo (parte evidenziata in rosso)',
          },
          {
            type: 'string',
            name: 'hero_sottotitolo',
            label: 'Hero — sottotitolo',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_immagine',
            label: 'Hero — percorso immagine (es. /nome-file.avif in public/)',
          },
          {
            type: 'string',
            name: 'hero_immagine_alt',
            label: 'Hero — testo alternativo immagine',
          },
          {
            type: 'string',
            name: 'title_en',
            label: '🇬🇧 Titolo SEO (inglese)',
          },
          {
            type: 'string',
            name: 'description_en',
            label: '🇬🇧 Descrizione SEO (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_eyebrow_en',
            label: '🇬🇧 Hero — eyebrow (inglese)',
          },
          {
            type: 'string',
            name: 'hero_titolo_en',
            label: '🇬🇧 Hero — titolo (inglese)',
          },
          {
            type: 'string',
            name: 'hero_titolo_accent_en',
            label: '🇬🇧 Hero — titolo evidenziato (inglese)',
          },
          {
            type: 'string',
            name: 'hero_sottotitolo_en',
            label: '🇬🇧 Hero — sottotitolo (inglese)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'hero_immagine_alt_en',
            label: '🇬🇧 Hero — testo alternativo immagine (inglese)',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenuto pagina',
            isBody: true,
          },
        ],
      },
    ],
  },
});

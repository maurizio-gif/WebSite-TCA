// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      // Le immagini del sito vivono direttamente in public/ (root)
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── EVENTI ────────────────────────────────────────────────────────────
      // Il marketing può aggiungere eventi da qui: https://app.tina.io
      // Ogni evento è un file .md in src/content/eventi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "eventi",
        label: "Eventi",
        path: "src/content/eventi",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo evento",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "data",
            label: "Data",
            required: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          },
          {
            type: "string",
            name: "categoria",
            label: "Categoria",
            required: true,
            options: ["Torneo", "Clinic", "Evento", "Camp"]
          },
          {
            type: "string",
            name: "descrizione",
            label: "Descrizione breve",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "luogo",
            label: "Luogo (es. Campo 3, Club House)"
          },
          {
            type: "string",
            name: "iscrizioniHref",
            label: "Link iscrizioni (URL)"
          },
          {
            type: "boolean",
            name: "pubblicato",
            label: "Pubblicato"
          },
          {
            type: "boolean",
            name: "prenotazioniAttive",
            label: "Prenotazione online attiva",
            description: "Mostra il form di prenotazione sulla pagina dell\u2019evento (al posto del link iscrizioni) e attiva il conteggio dei posti sul CRM."
          },
          {
            type: "number",
            name: "postiTotali",
            label: "Posti disponibili",
            description: "Numero massimo di partecipanti. Raggiunto il limite il form si chiude da solo."
          },
          {
            type: "number",
            name: "quotaSocio",
            label: "Quota soci (\u20AC)"
          },
          {
            type: "number",
            name: "quotaNonSocio",
            label: "Quota non soci (\u20AC)"
          },
          {
            type: "number",
            name: "oreScadenzaPagamento",
            label: "Ore per pagare in cassa",
            description: "Entro quante ore va pagata la quota in cassa. Scaduto il termine la prenotazione decade e il posto torna disponibile (default 48)."
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "descrizione_en",
            label: "\u{1F1EC}\u{1F1E7} Descrizione breve (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "luogo_en",
            label: "\u{1F1EC}\u{1F1E7} Luogo (inglese)"
          },
          {
            type: "string",
            name: "corpo_en",
            label: "\u{1F1EC}\u{1F1E7} Dettagli evento (inglese) \u2014 un paragrafo per riga vuota, grassetto con **doppi asterischi**",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Dettagli evento (italiano)",
            isBody: true
          }
        ]
      },
      // ─── SERVIZI CLUB LIFE ─────────────────────────────────────────────────
      // Card della sezione "Servizi e Partner" di Club Life.
      // Ogni servizio è un file .md in src/content/servizi/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "servizi",
        label: "Servizi Club Life",
        path: "src/content/servizi",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "number",
            name: "ordine",
            label: "Ordine nella griglia (1 = primo)",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icona",
            required: true,
            options: [
              { value: "coach", label: "Preparatore (persona)" },
              { value: "ballmachine", label: "Macchina lanciapalline" },
              { value: "birthday", label: "Compleanno (torta)" },
              { value: "locker", label: "Armadietti" },
              { value: "shop", label: "Shop (borsa)" },
              { value: "medical", label: "Medico (scudo con croce)" },
              { value: "graduation", label: "Studio (tocco di laurea)" },
              { value: "briefcase", label: "Corporate (valigetta)" }
            ]
          },
          {
            type: "string",
            name: "desc",
            label: "Descrizione breve (nella card)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "dettaglio",
            label: "Dettaglio (nel popup) \u2014 grassetto con **doppi asterischi**",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "href",
            label: "Link di approfondimento (opzionale, es. /personal-trainer)"
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "desc_en",
            label: "\u{1F1EC}\u{1F1E7} Descrizione breve (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "dettaglio_en",
            label: "\u{1F1EC}\u{1F1E7} Dettaglio (inglese)",
            ui: { component: "textarea" }
          }
        ]
      },
      // ─── PLANNING CORSI ────────────────────────────────────────────────────
      // Planning settimanale dei corsi di gruppo (pagina Preparazione
      // Atletica). File unico: ogni riga è una lezione.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "planning",
        label: "Planning Corsi",
        path: "src/content/planning",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "lezioni",
            label: "Lezioni",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.giorno && item?.ora ? `${(item.giorno || "").toUpperCase()} ${item.ora} \u2014 ${item.nome || ""}` : "Nuova lezione"
              })
            },
            fields: [
              {
                type: "string",
                name: "giorno",
                label: "Giorno",
                required: true,
                options: [
                  { value: "lun", label: "Luned\xEC" },
                  { value: "mar", label: "Marted\xEC" },
                  { value: "mer", label: "Mercoled\xEC" },
                  { value: "gio", label: "Gioved\xEC" },
                  { value: "ven", label: "Venerd\xEC" },
                  { value: "sab", label: "Sabato" },
                  { value: "dom", label: "Domenica" }
                ]
              },
              {
                type: "string",
                name: "ora",
                label: "Orario (es. 09:15)",
                required: true
              },
              {
                type: "string",
                name: "categoria",
                label: "Categoria",
                required: true,
                options: [
                  { value: "S", label: "Strength" },
                  { value: "B", label: "Balance" },
                  { value: "E", label: "Endurance" }
                ]
              },
              {
                type: "string",
                name: "nome",
                label: "Nome corso",
                required: true
              }
            ]
          }
        ]
      },
      // ─── MEMBERSHIP (tabella prezzi) ────────────────────────────────────────
      // Tabella abbonamenti Silver/Gold/Platinum, condivisa da tennis,
      // preparazione-atletica e personal-trainer.
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "membership",
        label: "Tabella Membership",
        path: "src/content/membership",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "titolo", label: "Titolo (prima parte)", required: true },
          { type: "string", name: "titolo_accent", label: "Titolo (parte evidenziata in rosso)", required: true },
          { type: "string", name: "sottotitolo", label: "Sottotitolo", required: true, ui: { component: "textarea" } },
          { type: "string", name: "silver_nome", label: 'Nome livello 1 (es. "Silver")', required: true },
          { type: "string", name: "gold_nome", label: 'Nome livello 2 (es. "Gold")', required: true },
          { type: "string", name: "platinum_nome", label: 'Nome livello 3 (es. "Platinum")', required: true },
          { type: "string", name: "platinum_badge", label: 'Badge sul livello 3 (es. "Pi\xF9 completo")', required: true },
          { type: "string", name: "cta_label", label: "Testo pulsante (in ogni colonna)", required: true },
          { type: "string", name: "silver_prezzo", label: 'Livello 1 \u2014 prezzo mensile (solo numero, es. "45")' },
          { type: "string", name: "gold_prezzo", label: 'Livello 2 \u2014 prezzo mensile (solo numero, es. "55")' },
          { type: "string", name: "platinum_prezzo", label: 'Livello 3 \u2014 prezzo mensile (solo numero, es. "100")' },
          { type: "string", name: "prezzo_suffisso", label: 'Suffisso prezzo (es. "/mese")' },
          { type: "string", name: "prezzo_tooltip", label: "Tooltip sul prezzo (icona info)", ui: { component: "textarea" } },
          { type: "string", name: "nota_finale", label: "Nota generica sotto la tabella", ui: { component: "textarea" } },
          {
            type: "object",
            name: "categorie",
            label: "Categorie e righe della tabella",
            list: true,
            required: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "Nuova categoria" })
            },
            fields: [
              { type: "string", name: "label", label: 'Nome categoria (es. "Accesso ai campi")', required: true },
              { type: "string", name: "label_en", label: "\u{1F1EC}\u{1F1E7} Nome categoria (inglese)" },
              {
                type: "object",
                name: "righe",
                label: "Righe",
                list: true,
                required: true,
                ui: {
                  itemProps: (item) => ({ label: item?.feature || "Nuova riga" })
                },
                fields: [
                  { type: "string", name: "feature", label: "Nome caratteristica", required: true },
                  { type: "string", name: "feature_tooltip", label: "Tooltip (opzionale, icona info)" },
                  {
                    type: "string",
                    name: "silver_tipo",
                    label: "Livello 1 \u2014 tipo cella",
                    required: true,
                    options: [
                      { value: "incluso", label: "Incluso (verde)" },
                      { value: "parziale", label: "Parziale/sconto (ambra)" },
                      { value: "valore", label: 'Valore testuale (es. "4 giorni")' },
                      { value: "check", label: "Solo icona di spunta" }
                    ]
                  },
                  { type: "string", name: "silver_valore", label: 'Livello 1 \u2014 testo cella (non serve per "check")' },
                  { type: "string", name: "silver_valore_tooltip", label: "Livello 1 \u2014 tooltip sul valore (opzionale, icona info)" },
                  {
                    type: "string",
                    name: "gold_tipo",
                    label: "Livello 2 \u2014 tipo cella",
                    required: true,
                    options: [
                      { value: "incluso", label: "Incluso (verde)" },
                      { value: "parziale", label: "Parziale/sconto (ambra)" },
                      { value: "valore", label: "Valore testuale" },
                      { value: "check", label: "Solo icona di spunta" }
                    ]
                  },
                  { type: "string", name: "gold_valore", label: 'Livello 2 \u2014 testo cella (non serve per "check")' },
                  { type: "string", name: "gold_valore_tooltip", label: "Livello 2 \u2014 tooltip sul valore (opzionale, icona info)" },
                  {
                    type: "string",
                    name: "platinum_tipo",
                    label: "Livello 3 \u2014 tipo cella",
                    required: true,
                    options: [
                      { value: "incluso", label: "Incluso (verde)" },
                      { value: "parziale", label: "Parziale/sconto (ambra)" },
                      { value: "valore", label: "Valore testuale" },
                      { value: "check", label: "Solo icona di spunta" }
                    ]
                  },
                  { type: "string", name: "platinum_valore", label: 'Livello 3 \u2014 testo cella (non serve per "check")' },
                  { type: "string", name: "platinum_valore_tooltip", label: "Livello 3 \u2014 tooltip sul valore (opzionale, icona info)" },
                  { type: "string", name: "feature_en", label: "\u{1F1EC}\u{1F1E7} Nome caratteristica (inglese)" },
                  { type: "string", name: "feature_tooltip_en", label: "\u{1F1EC}\u{1F1E7} Tooltip (inglese)" },
                  { type: "string", name: "silver_valore_en", label: "\u{1F1EC}\u{1F1E7} Livello 1 \u2014 testo cella (inglese)" },
                  { type: "string", name: "silver_valore_tooltip_en", label: "\u{1F1EC}\u{1F1E7} Livello 1 \u2014 tooltip sul valore (inglese)" },
                  { type: "string", name: "gold_valore_en", label: "\u{1F1EC}\u{1F1E7} Livello 2 \u2014 testo cella (inglese)" },
                  { type: "string", name: "gold_valore_tooltip_en", label: "\u{1F1EC}\u{1F1E7} Livello 2 \u2014 tooltip sul valore (inglese)" },
                  { type: "string", name: "platinum_valore_en", label: "\u{1F1EC}\u{1F1E7} Livello 3 \u2014 testo cella (inglese)" },
                  { type: "string", name: "platinum_valore_tooltip_en", label: "\u{1F1EC}\u{1F1E7} Livello 3 \u2014 tooltip sul valore (inglese)" }
                ]
              }
            ]
          },
          { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
          { type: "string", name: "titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Titolo evidenziato (inglese)" },
          { type: "string", name: "sottotitolo_en", label: "\u{1F1EC}\u{1F1E7} Sottotitolo (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "platinum_badge_en", label: "\u{1F1EC}\u{1F1E7} Badge livello 3 (inglese)" },
          { type: "string", name: "cta_label_en", label: "\u{1F1EC}\u{1F1E7} Testo pulsante (inglese)" },
          { type: "string", name: "prezzo_suffisso_en", label: "\u{1F1EC}\u{1F1E7} Suffisso prezzo (inglese)" },
          { type: "string", name: "prezzo_tooltip_en", label: "\u{1F1EC}\u{1F1E7} Tooltip sul prezzo (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "nota_finale_en", label: "\u{1F1EC}\u{1F1E7} Nota generica sotto la tabella (inglese)", ui: { component: "textarea" } }
        ]
      },
      // ─── INFO CLUB ─────────────────────────────────────────────────────────
      // File unico con orari, indirizzo e contatti del Club.
      // Le modifiche si riflettono su tutte le pagine (sezione "Vieni a trovarci").
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "info",
        label: "Informazioni Club",
        path: "src/content/info",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "indirizzo",
            label: "Indirizzo",
            required: true
          },
          {
            type: "string",
            name: "come_arrivare",
            label: "Come arrivare",
            required: true
          },
          {
            type: "string",
            name: "come_arrivare_en",
            label: "\u{1F1EC}\u{1F1E7} Come arrivare (inglese)",
            required: true
          },
          {
            type: "string",
            name: "orari",
            label: "Orari Club (una riga per fascia)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "orari_en",
            label: "\u{1F1EC}\u{1F1E7} Orari Club (inglese)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "telefono",
            label: "Telefono",
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true
          }
        ]
      },
      // ─── DOCUMENTI LEGALI ──────────────────────────────────────────────────
      // File unico con i PDF legali linkati dal footer (sezione "Legal").
      // Per sostituire un documento basta caricare un nuovo PDF sul campo:
      // il file va in public/legal/ e il link nel footer si aggiorna da solo.
      // ─────────────────────────────────────────────────────────────────────
      {
        name: "legal",
        label: "Documenti Legali",
        path: "src/content/legal",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "image",
            name: "codice_condotta",
            label: "Codice di Condotta (PDF)"
          },
          {
            type: "image",
            name: "nomina_responsabile",
            label: "Nomina Responsabile Safeguarding (PDF)"
          }
        ]
      },
      // ─── DATI STAGIONALI DEI FORM ──────────────────────────────────────────
      // File unico con quote, date e scadenze usate nei form di iscrizione
      // Summer Camp e Scuola Tennis. Le etichette dei campi (nomi, testi
      // fissi) restano nel codice: qui si modificano solo i valori che
      // cambiano ogni stagione — così non serve un developer per aggiornare
      // un prezzo o una data.
      // ─────────────────────────────────────────────────────────────────────
      {
        name: "moduli",
        label: "Dati Stagionali Form",
        path: "src/content/moduli",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "camp_settimane",
            label: "Summer Camp \u2014 Settimane",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.range || "Settimana" })
            },
            fields: [
              { type: "string", name: "id", label: "ID interno (es. w1) \u2014 non modificare", required: true },
              { type: "string", name: "range", label: 'Intervallo date mostrato in tabella (es. "8/06 \u2013 12/06")', required: true },
              {
                type: "datetime",
                name: "fine",
                label: "Ultimo giorno della settimana",
                required: true,
                ui: { dateFormat: "DD/MM/YYYY" }
              }
            ]
          },
          { type: "string", name: "camp_quota_soci", label: "Summer Camp \u2014 Quota Soci (\u20AC/settimana)", required: true },
          { type: "string", name: "camp_quota_soci_dal2", label: "Summer Camp \u2014 Quota Soci dalla 2\xAA settimana o fratelli (\u20AC)", required: true },
          { type: "string", name: "camp_quota_scuola", label: "Summer Camp \u2014 Quota Scuola Tennis (\u20AC/settimana)", required: true },
          { type: "string", name: "camp_quota_scuola_dal2", label: "Summer Camp \u2014 Quota Scuola Tennis dalla 2\xAA settimana (\u20AC)", required: true },
          { type: "string", name: "camp_quota_non_soci", label: "Summer Camp \u2014 Quota Non Soci (\u20AC/settimana)", required: true },
          { type: "string", name: "camp_quota_non_soci_dal2", label: "Summer Camp \u2014 Quota Non Soci dalla 2\xAA settimana (\u20AC)", required: true },
          { type: "string", name: "camp_pre_camp", label: "Summer Camp \u2014 Costo Pre-Camp (\u20AC/settimana)", required: true },
          { type: "string", name: "camp_caparra", label: "Summer Camp \u2014 Caparra richiesta (\u20AC)", required: true },
          { type: "string", name: "camp_csain", label: "Summer Camp \u2014 Assicurazione CSAIN per non soci (\u20AC)", required: true },
          { type: "string", name: "scuola_scadenza_preiscrizione", label: "Scuola Tennis \u2014 Scadenza preiscrizione", required: true },
          { type: "string", name: "scuola_scadenza_preiscrizione_en", label: "\u{1F1EC}\u{1F1E7} Scadenza preiscrizione (inglese)", required: true },
          { type: "string", name: "scuola_acconto", label: "Scuola Tennis \u2014 Acconto richiesto (\u20AC)", required: true },
          { type: "string", name: "scuola_prove_periodo1", label: "Scuola Tennis \u2014 Prove, primo periodo", required: true },
          { type: "string", name: "scuola_prove_periodo1_en", label: "\u{1F1EC}\u{1F1E7} Prove, primo periodo (inglese)", required: true },
          { type: "string", name: "scuola_prove_periodo2", label: "Scuola Tennis \u2014 Prove, secondo periodo", required: true },
          { type: "string", name: "scuola_prove_periodo2_en", label: "\u{1F1EC}\u{1F1E7} Prove, secondo periodo (inglese)", required: true },
          { type: "string", name: "scuola_inizio_corsi", label: "Scuola Tennis \u2014 Inizio corsi", required: true },
          { type: "string", name: "scuola_inizio_corsi_en", label: "\u{1F1EC}\u{1F1E7} Inizio corsi (inglese)", required: true },
          { type: "string", name: "scuola_mini_tennis_nati", label: "Scuola Tennis \u2014 Mini Tennis, anni di nascita ammessi", required: true },
          { type: "string", name: "scuola_mini_tennis_nati_en", label: "\u{1F1EC}\u{1F1E7} Mini Tennis, anni di nascita (inglese)", required: true },
          { type: "string", name: "scuola_tennis_nati", label: "Scuola Tennis \u2014 Scuola Tennis, anni di nascita ammessi", required: true },
          { type: "string", name: "scuola_tennis_nati_en", label: "\u{1F1EC}\u{1F1E7} Scuola Tennis, anni di nascita (inglese)", required: true }
        ]
      },
      // ─── APPUNTAMENTI E DISPONIBILITÀ ──────────────────────────────────────
      // File unico (disponibilita.md) con i parametri del calendario di
      // richiamata telefonica e visita in sede dei form del sito
      // (LeadModal.astro, LeadFormInline.astro via src/lib/bookingAvailability).
      {
        name: "appuntamenti",
        label: "\u{1F4C5} Appuntamenti e disponibilit\xE0",
        path: "src/content/appuntamenti",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "datetime", name: "data_inizio", label: "Disponibilit\xE0 a partire da", required: true, ui: { dateFormat: "DD/MM/YYYY" } },
          { type: "string", name: "ora_apertura", label: "Primo orario disponibile (es. 10:30)", required: true },
          { type: "string", name: "ora_chiusura", label: "Ultimo orario disponibile (es. 19:00)", required: true },
          { type: "number", name: "preavviso_minimo_ore", label: "Preavviso minimo per prenotare (ore) \u2014 es. 2 = due ore prima, 24 = un giorno prima", required: true },
          { type: "number", name: "durata_slot_richiamata", label: "Durata slot richiamata (minuti)", required: true },
          { type: "number", name: "durata_slot_visita", label: "Durata slot visita in sede (minuti)", required: true },
          { type: "number", name: "giorni_avanti_richiamata", label: "Giorni mostrati in calendario (richiamata)", required: true },
          { type: "number", name: "giorni_avanti_visita", label: "Giorni mostrati in calendario (visita in sede)", required: true },
          {
            type: "datetime",
            name: "date_chiuse",
            label: "Giorni di chiusura eccezionale",
            list: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          }
        ]
      },
      // ─── HELP DESK ─────────────────────────────────────────────────────────
      // Guide della knowledge base Club Life (sezione Help Desk).
      // Ogni guida è un file .md in src/content/helpdesk/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "helpdesk",
        label: "Help Desk",
        path: "src/content/helpdesk",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "categoria",
            label: "Categoria",
            required: true,
            options: [
              { value: "iscrizioni", label: "Iscrizioni & Tesseramento" },
              { value: "prenotazioni", label: "Prenotazioni" },
              { value: "app", label: "App & Area Riservata" },
              { value: "pagamenti", label: "Pagamenti & Ricevute" },
              { value: "regolamento", label: "Regolamento" },
              { value: "scuola", label: "Scuola Tennis" }
            ]
          },
          {
            type: "string",
            name: "sintesi",
            label: "Sintesi (anteprima nella card)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "tags",
            label: "Tag (per la ricerca)",
            list: true
          },
          {
            type: "datetime",
            name: "aggiornato",
            label: "Ultimo aggiornamento",
            required: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "sintesi_en",
            label: "\u{1F1EC}\u{1F1E7} Sintesi (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "tags_en",
            label: "\u{1F1EC}\u{1F1E7} Tag (inglese)",
            list: true
          },
          {
            type: "string",
            name: "corpo_en",
            label: "\u{1F1EC}\u{1F1E7} Testo guida (inglese) \u2014 un paragrafo per riga vuota, grassetto con **doppi asterischi**",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Testo guida (italiano)",
            isBody: true
          }
        ]
      },
      // ─── NEWS CLUB LIFE ────────────────────────────────────────────────────
      // Articoli della bacheca Club Life (carosello "News dal Club").
      // Ogni news è un file .md in src/content/news/
      // ───────────────────────────────────────────────────────────────────────
      {
        name: "news",
        label: "News Club Life",
        path: "src/content/news",
        format: "md",
        fields: [
          {
            type: "string",
            name: "titolo",
            label: "Titolo",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "data",
            label: "Data",
            required: true,
            ui: { dateFormat: "DD/MM/YYYY" }
          },
          {
            type: "string",
            name: "categoria",
            label: "Categoria (es. Corsi, Scuola Tennis)",
            required: true
          },
          {
            type: "string",
            name: "sintesi",
            label: "Sintesi (anteprima nella card)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "immagine",
            label: "Immagine",
            required: true
          },
          {
            type: "string",
            name: "immagine_alt",
            label: "Testo alternativo immagine",
            required: true
          },
          {
            type: "boolean",
            name: "pubblicato",
            label: "Pubblicato"
          },
          {
            type: "string",
            name: "cta_label",
            label: "Pulsante \u2014 testo (es. Iscriviti ora)"
          },
          {
            type: "string",
            name: "cta_href",
            label: "Pulsante \u2014 link (URL esterno o percorso interno, es. /contatti). Il pulsante appare solo se compilato."
          },
          {
            type: "string",
            name: "titolo_en",
            label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)"
          },
          {
            type: "string",
            name: "categoria_en",
            label: "\u{1F1EC}\u{1F1E7} Categoria (inglese)"
          },
          {
            type: "string",
            name: "cta_label_en",
            label: "\u{1F1EC}\u{1F1E7} Pulsante \u2014 testo (inglese)"
          },
          {
            type: "string",
            name: "sintesi_en",
            label: "\u{1F1EC}\u{1F1E7} Sintesi (inglese)",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "immagine_alt_en",
            label: "\u{1F1EC}\u{1F1E7} Testo alternativo immagine (inglese)"
          },
          {
            type: "string",
            name: "corpo_en",
            label: "\u{1F1EC}\u{1F1E7} Testo articolo (inglese) \u2014 un paragrafo per riga vuota, grassetto con **doppi asterischi**",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Testo articolo (italiano)",
            isBody: true
          }
        ]
      },
      // ─── PAGINE ──────────────────────────────────────────────────────────────
      // Una voce unica "Pagine" con un template per pagina: cliccandola si apre
      // l'elenco di tutte le pagine del sito, ognuna con SEO + hero (comuni a
      // tutte) più i propri campi di corpo pagina, dove presenti.
      // ───────────────────────────────────────────────────────────────────────
      (() => {
        const heroSeoFields = [
          { type: "string", name: "title", label: "Titolo SEO", isTitle: true, required: true },
          { type: "string", name: "description", label: "Descrizione SEO", required: true, ui: { component: "textarea" } },
          { type: "string", name: "hero_eyebrow", label: "Hero \u2014 eyebrow" },
          { type: "string", name: "hero_titolo", label: "Hero \u2014 titolo" },
          { type: "string", name: "hero_titolo_accent", label: "Hero \u2014 titolo (parte evidenziata in rosso)" },
          { type: "string", name: "hero_sottotitolo", label: "Hero \u2014 sottotitolo", ui: { component: "textarea" } },
          { type: "string", name: "hero_immagine", label: "Hero \u2014 percorso immagine (es. /nome-file.avif in public/)" },
          { type: "string", name: "hero_immagine_alt", label: "Hero \u2014 testo alternativo immagine" },
          { type: "string", name: "title_en", label: "\u{1F1EC}\u{1F1E7} Titolo SEO (inglese)" },
          { type: "string", name: "description_en", label: "\u{1F1EC}\u{1F1E7} Descrizione SEO (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "hero_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 eyebrow (inglese)" },
          { type: "string", name: "hero_titolo_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 titolo (inglese)" },
          { type: "string", name: "hero_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 titolo evidenziato (inglese)" },
          { type: "string", name: "hero_sottotitolo_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 sottotitolo (inglese)", ui: { component: "textarea" } },
          { type: "string", name: "hero_immagine_alt_en", label: "\u{1F1EC}\u{1F1E7} Hero \u2014 testo alternativo immagine (inglese)" }
        ];
        const faqFields = [
          {
            type: "object",
            name: "faq",
            label: "FAQ (domande frequenti in fondo alla pagina)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.domanda || "Nuova domanda" }) },
            fields: [
              { type: "string", name: "domanda", label: "Domanda", required: true },
              { type: "string", name: "risposta", label: 'Risposta \u2014 HTML consentito: <strong>grassetto</strong>, <a href="/pagina">link</a>', required: true, ui: { component: "textarea" } },
              { type: "string", name: "domanda_en", label: "\u{1F1EC}\u{1F1E7} Domanda (inglese)" },
              { type: "string", name: "risposta_en", label: "\u{1F1EC}\u{1F1E7} Risposta (inglese) \u2014 HTML consentito come sopra", ui: { component: "textarea" } }
            ]
          }
        ];
        return {
          name: "pagine",
          label: "Pagine",
          path: "src/content/pagine",
          format: "md",
          templates: [
            {
              name: "generica",
              label: "Pagina generica (solo SEO + Hero)",
              fields: [...heroSeoFields, ...faqFields]
            },
            {
              name: "storia",
              label: "Storia",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "storia_sezione1_eyebrow", label: 'Sezione 1 \u2014 eyebrow (es. "La timeline")', required: true },
                { type: "string", name: "storia_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "storia_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo (parte evidenziata in rosso)", required: true },
                {
                  type: "object",
                  name: "storia_timeline",
                  label: "Timeline",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.anno ? `${item.anno} \u2014 ${item.testo || ""}` : "Nuova voce" }) },
                  fields: [
                    { type: "string", name: "anno", label: "Anno", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "storia_sezione2_eyebrow", label: 'Sezione 2 \u2014 eyebrow (es. "Il club oggi")', required: true },
                { type: "string", name: "storia_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "storia_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo (parte evidenziata in rosso)", required: true },
                { type: "string", name: "storia_paragrafo1", label: "Paragrafo 1 \u2014 grassetto con **doppi asterischi**", required: true, ui: { component: "textarea" } },
                { type: "string", name: "storia_paragrafo2", label: "Paragrafo 2 \u2014 grassetto con **doppi asterischi**", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "storia_galleria",
                  label: "Galleria immagini",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.alt || "Immagine" }) },
                  fields: [
                    { type: "image", name: "immagine", label: "Immagine", required: true },
                    { type: "string", name: "alt", label: "Testo alternativo", required: true }
                  ]
                },
                { type: "string", name: "storia_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "storia_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "storia_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "storia_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "storia_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "storia_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "storia_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "storia_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Paragrafo 2 (inglese)", ui: { component: "textarea" } }
              ]
            },
            {
              name: "summer_camps",
              label: "Summer Camps",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "camps_sezione1_eyebrow", label: "Sezione 1 \u2014 eyebrow", required: true },
                { type: "string", name: "camps_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "camps_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "camps_features",
                  label: "Caratteristiche del programma",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova caratteristica" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "image", name: "camps_immagine1", label: "Immagine 1 (grande)", required: true },
                { type: "string", name: "camps_immagine1_alt", label: "Immagine 1 \u2014 testo alternativo", required: true },
                { type: "image", name: "camps_immagine2", label: "Immagine 2 (piccola)", required: true },
                { type: "string", name: "camps_immagine2_alt", label: "Immagine 2 \u2014 testo alternativo", required: true },
                { type: "string", name: "camps_sezione2_eyebrow", label: "Sezione 2 \u2014 eyebrow", required: true },
                { type: "string", name: "camps_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "camps_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "camps_info_rapide",
                  label: "Info rapide (Quando, Orari, Et\xE0...)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.label || "Nuova info" }) },
                  fields: [
                    { type: "string", name: "label", label: 'Etichetta (es. "Quando")', required: true },
                    { type: "string", name: "valore", label: "Valore", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta (inglese)" },
                    { type: "string", name: "valore_en", label: "\u{1F1EC}\u{1F1E7} Valore (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "camps_giornata_eyebrow", label: "Giornata tipo \u2014 eyebrow", required: true },
                { type: "string", name: "camps_giornata_titolo", label: "Giornata tipo \u2014 titolo", required: true },
                {
                  type: "object",
                  name: "camps_giornata",
                  label: "Giornata tipo \u2014 fasce orarie",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.orario ? `${item.orario} \u2014 ${item.titolo || ""}` : "Nuova fascia oraria" }) },
                  fields: [
                    { type: "string", name: "orario", label: 'Orario (es. "8.30 \u2013 9.00")', required: true },
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "camps_settimanale_eyebrow", label: "Programma settimanale \u2014 eyebrow", required: true },
                { type: "string", name: "camps_settimanale_titolo", label: "Programma settimanale \u2014 titolo", required: true },
                {
                  type: "object",
                  name: "camps_settimanale",
                  label: "Programma tecnico settimanale",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.giorno ? `${item.giorno} \u2014 ${item.colpo || ""}` : "Nuovo giorno" }) },
                  fields: [
                    { type: "string", name: "giorno", label: 'Giorno (es. "Luned\xEC")', required: true },
                    { type: "string", name: "colpo", label: 'Colpo (es. "Dritto")', required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "giorno_en", label: "\u{1F1EC}\u{1F1E7} Giorno (inglese)" },
                    { type: "string", name: "colpo_en", label: "\u{1F1EC}\u{1F1E7} Colpo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "camps_cosa_portare_titolo", label: "Cosa portare \u2014 titolo", required: true },
                { type: "string", name: "camps_cosa_portare", label: "Cosa portare \u2014 elenco", list: true, required: true },
                { type: "string", name: "camps_obbligatorio", label: "Nota obbligatoria (es. certificato medico)", required: true },
                { type: "string", name: "camps_kit_benvenuto", label: "Kit di benvenuto", required: true, ui: { component: "textarea" } },
                { type: "string", name: "camps_quote_eyebrow", label: "Quote \u2014 eyebrow", required: true },
                { type: "string", name: "camps_quote_titolo", label: "Quote \u2014 titolo", required: true },
                {
                  type: "object",
                  name: "camps_quote_righe",
                  label: "Tabella quote",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.categoria || "Nuova riga" }) },
                  fields: [
                    { type: "string", name: "categoria", label: 'Categoria (es. "Soci")', required: true },
                    { type: "string", name: "prezzo_settimana", label: "Prezzo a settimana", required: true },
                    { type: "string", name: "prezzo_dal2", label: "Prezzo dalla 2\xAA settimana", required: true },
                    { type: "string", name: "prezzo_fratelli", label: "Prezzo fratelli", required: true },
                    { type: "string", name: "categoria_en", label: "\u{1F1EC}\u{1F1E7} Categoria (inglese)" }
                  ]
                },
                { type: "string", name: "camps_quote_note", label: "Note quote/condizioni", list: true, required: true, ui: { component: "textarea" } },
                { type: "string", name: "camps_cta_label", label: "Etichetta bottone iscrizione", required: true },
                { type: "string", name: "camps_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "camps_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "camps_immagine1_alt_en", label: "\u{1F1EC}\u{1F1E7} Immagine 1 \u2014 alt (inglese)" },
                { type: "string", name: "camps_immagine2_alt_en", label: "\u{1F1EC}\u{1F1E7} Immagine 2 \u2014 alt (inglese)" },
                { type: "string", name: "camps_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "camps_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "camps_giornata_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Giornata tipo \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_giornata_titolo_en", label: "\u{1F1EC}\u{1F1E7} Giornata tipo \u2014 titolo (inglese)" },
                { type: "string", name: "camps_settimanale_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Programma settimanale \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_settimanale_titolo_en", label: "\u{1F1EC}\u{1F1E7} Programma settimanale \u2014 titolo (inglese)" },
                { type: "string", name: "camps_cosa_portare_titolo_en", label: "\u{1F1EC}\u{1F1E7} Cosa portare \u2014 titolo (inglese)" },
                { type: "string", name: "camps_cosa_portare_en", label: "\u{1F1EC}\u{1F1E7} Cosa portare \u2014 elenco (inglese)", list: true },
                { type: "string", name: "camps_obbligatorio_en", label: "\u{1F1EC}\u{1F1E7} Nota obbligatoria (inglese)" },
                { type: "string", name: "camps_kit_benvenuto_en", label: "\u{1F1EC}\u{1F1E7} Kit di benvenuto (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "camps_quote_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Quote \u2014 eyebrow (inglese)" },
                { type: "string", name: "camps_quote_titolo_en", label: "\u{1F1EC}\u{1F1E7} Quote \u2014 titolo (inglese)" },
                { type: "string", name: "camps_quote_note_en", label: "\u{1F1EC}\u{1F1E7} Note quote/condizioni (inglese)", list: true, ui: { component: "textarea" } },
                { type: "string", name: "camps_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta bottone iscrizione (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "scuola_tennis",
              label: "Scuola Tennis",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "scuola_sezione1_eyebrow", label: "Sezione 1 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "scuola_sezione1_lead", label: "Sezione 1 \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "scuola_livelli",
                  label: "Livelli (percorso a colori)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo livello" }) },
                  fields: [
                    {
                      type: "string",
                      name: "dot",
                      label: "Colore",
                      required: true,
                      options: [
                        { value: "rosso", label: "Rosso" },
                        { value: "arancio", label: "Arancio" },
                        { value: "verde", label: "Verde" },
                        { value: "giallo", label: "Giallo" }
                      ]
                    },
                    { type: "string", name: "nome", label: "Nome livello", required: true },
                    { type: "string", name: "tag", label: 'Tag (es. "Mini Tennis")', required: true },
                    { type: "string", name: "range", label: "Fascia et\xE0", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "nome_en", label: "\u{1F1EC}\u{1F1E7} Nome (inglese)" },
                    { type: "string", name: "tag_en", label: "\u{1F1EC}\u{1F1E7} Tag (inglese)" },
                    { type: "string", name: "range_en", label: "\u{1F1EC}\u{1F1E7} Fascia et\xE0 (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "scuola_livelli_footer_testo", label: "Testo dopo i livelli (prima del link)", required: true },
                { type: "string", name: "scuola_livelli_footer_link_label", label: "Etichetta link (verso /agonistica)", required: true },
                { type: "string", name: "scuola_sezione2_eyebrow", label: "Sezione 2 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "scuola_iscrizione_cards",
                  label: "Card iscrizione",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova card" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "tag", label: 'Tag (es. "Nati nel 2020 e 2021")', required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "tag_en", label: "\u{1F1EC}\u{1F1E7} Tag (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "scuola_iscrizione_cta_label", label: "Testo pulsante iscrizione", required: true },
                { type: "string", name: "scuola_sezione3_eyebrow", label: "Sezione 3 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione3_titolo", label: "Sezione 3 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione3_titolo_accent", label: "Sezione 3 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "scuola_sezione3_badge", label: 'Sezione 3 \u2014 badge (es. "Vavassori Tennis Academy...")', required: true },
                { type: "string", name: "scuola_sezione3_paragrafo1", label: "Sezione 3 \u2014 paragrafo 1 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo2", label: "Sezione 3 \u2014 paragrafo 2", required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo3", label: "Sezione 3 \u2014 paragrafo 3 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "image", name: "scuola_sezione3_immagine", label: "Sezione 3 \u2014 immagine", required: true },
                { type: "string", name: "scuola_sezione3_immagine_alt", label: "Sezione 3 \u2014 immagine, testo alternativo", required: true },
                { type: "string", name: "scuola_sezione4_eyebrow", label: "Sezione 4 \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione4_titolo", label: "Sezione 4 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione4_titolo_accent", label: "Sezione 4 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "scuola_tornei",
                  label: "Tornei durante l'anno",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo torneo" }) },
                  fields: [
                    { type: "string", name: "quando", label: 'Quando (es. "Dicembre")', required: true },
                    { type: "string", name: "nome", label: "Nome torneo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "quando_en", label: "\u{1F1EC}\u{1F1E7} Quando (inglese)" },
                    { type: "string", name: "nome_en", label: "\u{1F1EC}\u{1F1E7} Nome (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "scuola_sezione4_footer_testo", label: "Testo finale (FITP Junior Program, **grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione5_eyebrow", label: "Sezione 5 (Scuola Tennis Estiva) \u2014 eyebrow", required: true },
                { type: "string", name: "scuola_sezione5_titolo", label: "Sezione 5 \u2014 titolo", required: true },
                { type: "string", name: "scuola_sezione5_titolo_accent", label: "Sezione 5 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "scuola_sezione5_testo", label: "Sezione 5 \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "scuola_sezione5_info_rapide",
                  label: "Sezione 5 \u2014 info rapide",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.label || "Nuova info" }) },
                  fields: [
                    { type: "string", name: "label", label: "Etichetta", required: true },
                    { type: "string", name: "valore", label: "Valore", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta (inglese)" },
                    { type: "string", name: "valore_en", label: "\u{1F1EC}\u{1F1E7} Valore (inglese)", ui: { component: "textarea" } }
                  ]
                },
                {
                  type: "object",
                  name: "scuola_sezione5_quote_righe",
                  label: "Sezione 5 \u2014 tabella quote",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.categoria || "Nuova riga" }) },
                  fields: [
                    { type: "string", name: "categoria", label: "Categoria", required: true },
                    { type: "string", name: "prezzo", label: "Prezzo a settimana", required: true },
                    { type: "string", name: "categoria_en", label: "\u{1F1EC}\u{1F1E7} Categoria (inglese)" }
                  ]
                },
                { type: "string", name: "scuola_sezione5_note", label: "Sezione 5 \u2014 note/condizioni", list: true, required: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione5_cta_label", label: "Sezione 5 \u2014 etichetta bottone iscrizione", required: true },
                { type: "string", name: "scuola_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione1_lead_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_livelli_footer_testo_en", label: "\u{1F1EC}\u{1F1E7} Testo dopo i livelli (inglese)" },
                { type: "string", name: "scuola_livelli_footer_link_label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta link (inglese)" },
                { type: "string", name: "scuola_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_iscrizione_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Testo pulsante iscrizione (inglese)" },
                { type: "string", name: "scuola_sezione3_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione3_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione3_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione3_badge_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 badge (inglese)" },
                { type: "string", name: "scuola_sezione3_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_paragrafo3_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 paragrafo 3 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione3_immagine_alt_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 immagine, alt (inglese)" },
                { type: "string", name: "scuola_sezione4_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 4 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione4_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 4 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione4_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 4 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione4_footer_testo_en", label: "\u{1F1EC}\u{1F1E7} Testo finale (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione5_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 5 \u2014 eyebrow (inglese)" },
                { type: "string", name: "scuola_sezione5_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 5 \u2014 titolo (inglese)" },
                { type: "string", name: "scuola_sezione5_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 5 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "scuola_sezione5_testo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 5 \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione5_note_en", label: "\u{1F1EC}\u{1F1E7} Sezione 5 \u2014 note/condizioni (inglese)", list: true, ui: { component: "textarea" } },
                { type: "string", name: "scuola_sezione5_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Sezione 5 \u2014 etichetta bottone iscrizione (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "personal_trainer",
              label: "Personal Trainer",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "pt_sezione1_eyebrow", label: "Sezione 1 \u2014 eyebrow", required: true },
                { type: "string", name: "pt_sezione1_titolo", label: "Sezione 1 \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione1_titolo_accent", label: "Sezione 1 \u2014 titolo evidenziato", required: true },
                { type: "string", name: "pt_sezione1_paragrafo1", label: "Sezione 1 \u2014 paragrafo 1", required: true, ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione1_paragrafo2", label: "Sezione 1 \u2014 paragrafo 2", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "pt_stats",
                  label: "Statistiche",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.numero ? `${item.numero} \u2014 ${item.etichetta || ""}` : "Nuova statistica" }) },
                  fields: [
                    { type: "string", name: "numero", label: `Numero/simbolo (es. "5", "1:1", "60'", "\u221E")`, required: true },
                    { type: "string", name: "etichetta", label: "Etichetta (una riga per fascia)", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "etichetta_en", label: "\u{1F1EC}\u{1F1E7} Etichetta (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "pt_sezione2_eyebrow", label: "Sezione 2 \u2014 eyebrow", required: true },
                { type: "string", name: "pt_sezione2_titolo", label: "Sezione 2 \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione2_titolo_accent", label: "Sezione 2 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "pt_trainers",
                  label: "Trainer",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo trainer" }) },
                  fields: [
                    { type: "string", name: "nome", label: "Nome", required: true },
                    { type: "image", name: "foto", label: "Foto (se assente, mostra un placeholder col nome)" },
                    { type: "string", name: "specializzazioni", label: "Specializzazioni", list: true, required: true },
                    { type: "string", name: "qualifiche", label: "Qualifiche e certificazioni", list: true, required: true },
                    { type: "string", name: "lingue", label: "Lingue parlate (lascia vuoto per non mostrare la riga)", list: true },
                    { type: "string", name: "specializzazioni_en", label: "\u{1F1EC}\u{1F1E7} Specializzazioni (inglese)", list: true },
                    { type: "string", name: "qualifiche_en", label: "\u{1F1EC}\u{1F1E7} Qualifiche (inglese)", list: true },
                    { type: "string", name: "lingue_en", label: "\u{1F1EC}\u{1F1E7} Lingue (inglese)", list: true }
                  ]
                },
                { type: "string", name: "pt_sezione3_eyebrow", label: "Sezione 3 \u2014 eyebrow", required: true },
                { type: "string", name: "pt_sezione3_titolo", label: "Sezione 3 \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione3_titolo_accent", label: "Sezione 3 \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "pt_steps",
                  label: "Come funziona \u2014 step",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo step" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "pt_sezione4_titolo", label: "CTA finale \u2014 titolo", required: true },
                { type: "string", name: "pt_sezione4_sottotitolo", label: "CTA finale \u2014 sottotitolo", required: true, ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione4_cta_label", label: "CTA finale \u2014 testo pulsante", required: true },
                { type: "string", name: "pt_sezione1_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 eyebrow (inglese)" },
                { type: "string", name: "pt_sezione1_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione1_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "pt_sezione1_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione1_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sezione 1 \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione2_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 eyebrow (inglese)" },
                { type: "string", name: "pt_sezione2_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione2_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 2 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "pt_sezione3_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 eyebrow (inglese)" },
                { type: "string", name: "pt_sezione3_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione3_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione 3 \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "pt_sezione4_titolo_en", label: "\u{1F1EC}\u{1F1E7} CTA finale \u2014 titolo (inglese)" },
                { type: "string", name: "pt_sezione4_sottotitolo_en", label: "\u{1F1EC}\u{1F1E7} CTA finale \u2014 sottotitolo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "pt_sezione4_cta_label_en", label: "\u{1F1EC}\u{1F1E7} CTA finale \u2014 testo pulsante (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "preparazione_atletica",
              label: "Preparazione Atletica",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "prep_sala_eyebrow", label: "Sala Attrezzi \u2014 eyebrow", required: true },
                { type: "string", name: "prep_sala_titolo", label: "Sala Attrezzi \u2014 titolo", required: true },
                { type: "string", name: "prep_sala_titolo_accent", label: "Sala Attrezzi \u2014 titolo evidenziato", required: true },
                { type: "string", name: "prep_sala_paragrafo1", label: "Sala Attrezzi \u2014 paragrafo 1 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "prep_sala_paragrafo2", label: "Sala Attrezzi \u2014 paragrafo 2 (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "prep_sala_slideshow",
                  label: "Sala Attrezzi \u2014 slideshow foto",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.alt || "Foto" }) },
                  fields: [
                    { type: "image", name: "immagine", label: "Immagine", required: true },
                    { type: "string", name: "alt", label: "Testo alternativo", required: true },
                    { type: "string", name: "alt_en", label: "\u{1F1EC}\u{1F1E7} Testo alternativo (inglese)" }
                  ]
                },
                {
                  type: "object",
                  name: "prep_sala_features",
                  label: "Sala Attrezzi \u2014 caratteristiche (ordine fisso, icone in codice)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova caratteristica" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "prep_sala_cta_label", label: "Sala Attrezzi \u2014 testo link Personal Trainer", required: true },
                { type: "string", name: "prep_corsi_eyebrow", label: "Corsi di Gruppo \u2014 eyebrow", required: true },
                { type: "string", name: "prep_corsi_titolo", label: "Corsi di Gruppo \u2014 titolo", required: true },
                { type: "string", name: "prep_corsi_titolo_accent", label: "Corsi di Gruppo \u2014 titolo evidenziato", required: true },
                { type: "string", name: "prep_corsi_sub", label: "Corsi di Gruppo \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "prep_categorie",
                  label: "Categorie e corsi",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.label || "Nuova categoria" }) },
                  fields: [
                    {
                      type: "string",
                      name: "id",
                      label: "ID categoria (fisso, non cambiare)",
                      required: true,
                      options: [
                        { value: "endurance", label: "endurance" },
                        { value: "strength", label: "strength" },
                        { value: "balance", label: "balance" }
                      ]
                    },
                    { type: "string", name: "label", label: "Nome categoria", required: true },
                    { type: "string", name: "desc", label: "Descrizione categoria", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "color", label: "Colore (hex, es. #B83A00)", required: true },
                    { type: "string", name: "desc_en", label: "\u{1F1EC}\u{1F1E7} Descrizione categoria (inglese)", ui: { component: "textarea" } },
                    {
                      type: "object",
                      name: "corsi",
                      label: "Corsi",
                      list: true,
                      required: true,
                      ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo corso" }) },
                      fields: [
                        { type: "string", name: "nome", label: "Nome corso", required: true },
                        { type: "string", name: "durata", label: 'Durata (es. "60 min")', required: true },
                        { type: "number", name: "intensita", label: "Intensit\xE0 (numero da 1 a 3)", required: true },
                        { type: "string", name: "livello", label: 'Livello (es. "Tutti i livelli", "Intermedio")', required: true },
                        { type: "string", name: "desc", label: "Descrizione", required: true, ui: { component: "textarea" } },
                        { type: "image", name: "immagine", label: "Immagine", required: true },
                        { type: "string", name: "nome_en", label: "\u{1F1EC}\u{1F1E7} Nome corso (inglese)" },
                        { type: "string", name: "livello_en", label: "\u{1F1EC}\u{1F1E7} Livello (inglese)" },
                        { type: "string", name: "desc_en", label: "\u{1F1EC}\u{1F1E7} Descrizione (inglese)", ui: { component: "textarea" } }
                      ]
                    }
                  ]
                },
                { type: "string", name: "prep_calendario_eyebrow", label: "Calendario \u2014 eyebrow", required: true },
                { type: "string", name: "prep_calendario_titolo", label: "Calendario \u2014 titolo", required: true },
                { type: "string", name: "prep_calendario_titolo_accent", label: "Calendario \u2014 titolo evidenziato", required: true },
                { type: "string", name: "prep_calendario_sub", label: "Calendario \u2014 testo introduttivo", required: true },
                { type: "string", name: "prep_sala_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 eyebrow (inglese)" },
                { type: "string", name: "prep_sala_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 titolo (inglese)" },
                { type: "string", name: "prep_sala_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "prep_sala_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "prep_sala_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "prep_sala_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Sala Attrezzi \u2014 testo link (inglese)" },
                { type: "string", name: "prep_corsi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 eyebrow (inglese)" },
                { type: "string", name: "prep_corsi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 titolo (inglese)" },
                { type: "string", name: "prep_corsi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "prep_corsi_sub_en", label: "\u{1F1EC}\u{1F1E7} Corsi di Gruppo \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "prep_calendario_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 eyebrow (inglese)" },
                { type: "string", name: "prep_calendario_titolo_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 titolo (inglese)" },
                { type: "string", name: "prep_calendario_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "prep_calendario_sub_en", label: "\u{1F1EC}\u{1F1E7} Calendario \u2014 testo introduttivo (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "tennis",
              label: "Tennis",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "tennis_campi_eyebrow", label: "Sezione Campi \u2014 eyebrow", required: true },
                { type: "string", name: "tennis_campi_titolo", label: "Sezione Campi \u2014 titolo", required: true },
                { type: "string", name: "tennis_campi_titolo_accent", label: "Sezione Campi \u2014 titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "tennis_campi",
                  label: "Tipi di campo (foto non gestita da qui)",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo campo" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "tennis_soci_eyebrow", label: "Sezione Soci \u2014 eyebrow", required: true },
                { type: "string", name: "tennis_soci_titolo", label: "Sezione Soci \u2014 titolo", required: true },
                { type: "string", name: "tennis_soci_titolo_accent", label: "Sezione Soci \u2014 titolo evidenziato", required: true },
                { type: "string", name: "tennis_soci_testo", label: "Sezione Soci \u2014 testo (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "tennis_corsi_eyebrow", label: "Sezione Corsi \u2014 eyebrow", required: true },
                { type: "string", name: "tennis_corsi_titolo", label: "Sezione Corsi \u2014 titolo", required: true },
                { type: "string", name: "tennis_corsi_titolo_accent", label: "Sezione Corsi \u2014 titolo evidenziato", required: true },
                { type: "string", name: "tennis_corsi_intro", label: "Sezione Corsi \u2014 testo introduttivo (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "tennis_corsi_livelli",
                  label: "Sezione Corsi \u2014 livelli",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo livello" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "tennis_corsi_cta_label", label: "Sezione Corsi \u2014 testo pulsante", required: true },
                { type: "string", name: "tennis_campi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Campi \u2014 eyebrow (inglese)" },
                { type: "string", name: "tennis_campi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Campi \u2014 titolo (inglese)" },
                { type: "string", name: "tennis_campi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Campi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "tennis_soci_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 eyebrow (inglese)" },
                { type: "string", name: "tennis_soci_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 titolo (inglese)" },
                { type: "string", name: "tennis_soci_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "tennis_soci_testo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Soci \u2014 testo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "tennis_corsi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 eyebrow (inglese)" },
                { type: "string", name: "tennis_corsi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 titolo (inglese)" },
                { type: "string", name: "tennis_corsi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "tennis_corsi_intro_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "tennis_corsi_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 testo pulsante (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "padel",
              label: "Padel",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "padel_corsi_eyebrow", label: "Sezione Corsi \u2014 eyebrow", required: true },
                { type: "string", name: "padel_corsi_titolo", label: "Sezione Corsi \u2014 titolo", required: true },
                { type: "string", name: "padel_corsi_titolo_accent", label: "Sezione Corsi \u2014 titolo evidenziato", required: true },
                { type: "string", name: "padel_corsi_intro", label: "Sezione Corsi \u2014 testo introduttivo (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "padel_corsi_livelli",
                  label: "Sezione Corsi \u2014 livelli",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo livello" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "padel_corsi_cta_label", label: "Sezione Corsi \u2014 testo pulsante", required: true },
                { type: "string", name: "padel_corsi_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 eyebrow (inglese)" },
                { type: "string", name: "padel_corsi_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 titolo (inglese)" },
                { type: "string", name: "padel_corsi_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "padel_corsi_intro_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "padel_corsi_cta_label_en", label: "\u{1F1EC}\u{1F1E7} Sezione Corsi \u2014 testo pulsante (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "agonistica",
              label: "Agonistica",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "agonistica_metodo_eyebrow", label: "Metodo \u2014 Eyebrow" },
                { type: "string", name: "agonistica_metodo_titolo", label: "Metodo \u2014 Titolo" },
                { type: "string", name: "agonistica_metodo_titolo_accent", label: "Metodo \u2014 Titolo evidenziato" },
                { type: "string", name: "agonistica_metodo_lead", label: "Metodo \u2014 Testo introduttivo", ui: { component: "textarea" } },
                { type: "image", name: "agonistica_metodo_immagine1", label: "Metodo \u2014 Immagine 1" },
                { type: "string", name: "agonistica_metodo_immagine1_alt", label: "Metodo \u2014 Immagine 1 (alt)" },
                { type: "image", name: "agonistica_metodo_immagine2", label: "Metodo \u2014 Immagine 2" },
                { type: "string", name: "agonistica_metodo_immagine2_alt", label: "Metodo \u2014 Immagine 2 (alt)" },
                {
                  type: "object",
                  name: "agonistica_metodo_pillars",
                  label: "Metodo \u2014 Colonne",
                  list: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuova colonna" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)", ui: { component: "textarea" } }
                  ]
                },
                { type: "string", name: "agonistica_metodo_quote", label: "Metodo \u2014 Citazione finale", ui: { component: "textarea" } },
                { type: "string", name: "agonistica_punti_chiave_titolo", label: "Punti chiave \u2014 Titolo box" },
                {
                  type: "object",
                  name: "agonistica_punti_chiave",
                  label: "Punti chiave \u2014 Elenco",
                  list: true,
                  ui: { itemProps: (item) => ({ label: item?.testo || "Nuovo punto" }) },
                  fields: [
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "agonistica_metodo_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Eyebrow (inglese)" },
                { type: "string", name: "agonistica_metodo_titolo_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Titolo (inglese)" },
                { type: "string", name: "agonistica_metodo_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Titolo evidenziato (inglese)" },
                { type: "string", name: "agonistica_metodo_lead_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "agonistica_metodo_immagine1_alt_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Immagine 1 (alt, inglese)" },
                { type: "string", name: "agonistica_metodo_immagine2_alt_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Immagine 2 (alt, inglese)" },
                { type: "string", name: "agonistica_metodo_quote_en", label: "\u{1F1EC}\u{1F1E7} Metodo \u2014 Citazione finale (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "agonistica_punti_chiave_titolo_en", label: "\u{1F1EC}\u{1F1E7} Punti chiave \u2014 Titolo box (inglese)" },
                { type: "string", name: "agonistica_eyebrow", label: "Eyebrow", required: true },
                { type: "string", name: "agonistica_titolo", label: "Titolo", required: true },
                { type: "string", name: "agonistica_titolo_accent", label: "Titolo evidenziato", required: true },
                {
                  type: "object",
                  name: "agonistica_step",
                  label: "Percorso \u2014 step",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.titolo || "Nuovo step" }) },
                  fields: [
                    { type: "string", name: "titolo", label: "Titolo", required: true },
                    { type: "string", name: "testo", label: "Testo", required: true },
                    { type: "string", name: "titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                    { type: "string", name: "testo_en", label: "\u{1F1EC}\u{1F1E7} Testo (inglese)" }
                  ]
                },
                { type: "string", name: "agonistica_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Eyebrow (inglese)" },
                { type: "string", name: "agonistica_titolo_en", label: "\u{1F1EC}\u{1F1E7} Titolo (inglese)" },
                { type: "string", name: "agonistica_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Titolo evidenziato (inglese)" },
                ...faqFields
              ]
            },
            {
              name: "torneo_avvenire",
              label: "Torneo Avvenire",
              fields: [
                ...heroSeoFields,
                { type: "string", name: "torneo_quote_testo", label: "Citazione", required: true },
                { type: "string", name: "torneo_quote_autore", label: "Autore citazione", required: true },
                { type: "string", name: "torneo_storia_eyebrow", label: "Sezione Storia \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_storia_titolo", label: "Sezione Storia \u2014 titolo", required: true },
                { type: "string", name: "torneo_storia_titolo_accent", label: "Sezione Storia \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_storia_paragrafo1", label: "Sezione Storia \u2014 paragrafo 1 (**grassetto**)", required: true, ui: { component: "textarea" } },
                { type: "string", name: "torneo_storia_paragrafo2", label: "Sezione Storia \u2014 paragrafo 2 (**grassetto**)", required: true, ui: { component: "textarea" } },
                {
                  type: "object",
                  name: "torneo_stats",
                  label: "Statistiche",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.numero ? `${item.numero} \u2014 ${item.label || ""}` : "Nuova statistica" }) },
                  fields: [
                    { type: "string", name: "numero", label: 'Numero (es. "60+", "U14")', required: true },
                    { type: "string", name: "label", label: "Etichetta", required: true },
                    { type: "string", name: "label_en", label: "\u{1F1EC}\u{1F1E7} Etichetta (inglese)" }
                  ]
                },
                { type: "string", name: "torneo_alumni_eyebrow", label: "Sezione Alumni \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_alumni_titolo", label: "Sezione Alumni \u2014 titolo", required: true },
                { type: "string", name: "torneo_alumni_titolo_accent", label: "Sezione Alumni \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_alumni_intro", label: "Sezione Alumni \u2014 testo introduttivo", required: true, ui: { component: "textarea" } },
                { type: "string", name: "torneo_galleria_eyebrow", label: "Sezione Galleria \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_galleria_titolo", label: "Sezione Galleria \u2014 titolo", required: true },
                { type: "string", name: "torneo_galleria_titolo_accent", label: "Sezione Galleria \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_prossima_eyebrow", label: "Sezione Prossima edizione \u2014 eyebrow", required: true },
                { type: "string", name: "torneo_prossima_titolo", label: "Sezione Prossima edizione \u2014 titolo", required: true },
                { type: "string", name: "torneo_prossima_titolo_accent", label: "Sezione Prossima edizione \u2014 titolo evidenziato", required: true },
                { type: "string", name: "torneo_prossima_testo", label: "Sezione Prossima edizione \u2014 testo", required: true, ui: { component: "textarea" } },
                { type: "string", name: "torneo_quote_testo_en", label: "\u{1F1EC}\u{1F1E7} Citazione (inglese)" },
                { type: "string", name: "torneo_quote_autore_en", label: "\u{1F1EC}\u{1F1E7} Autore citazione (inglese)" },
                { type: "string", name: "torneo_storia_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_storia_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_storia_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_storia_paragrafo1_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 paragrafo 1 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "torneo_storia_paragrafo2_en", label: "\u{1F1EC}\u{1F1E7} Sezione Storia \u2014 paragrafo 2 (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "torneo_alumni_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_alumni_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_alumni_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_alumni_intro_en", label: "\u{1F1EC}\u{1F1E7} Sezione Alumni \u2014 testo introduttivo (inglese)", ui: { component: "textarea" } },
                { type: "string", name: "torneo_galleria_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Galleria \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_galleria_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Galleria \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_galleria_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Galleria \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_prossima_eyebrow_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 eyebrow (inglese)" },
                { type: "string", name: "torneo_prossima_titolo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 titolo (inglese)" },
                { type: "string", name: "torneo_prossima_titolo_accent_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 titolo evidenziato (inglese)" },
                { type: "string", name: "torneo_prossima_testo_en", label: "\u{1F1EC}\u{1F1E7} Sezione Prossima edizione \u2014 testo (inglese)", ui: { component: "textarea" } }
              ]
            },
            {
              name: "regolamento",
              label: "Regolamento del Club",
              fields: [
                ...heroSeoFields,
                {
                  type: "string",
                  name: "regolamento_body",
                  label: "Testo regolamento (italiano)",
                  required: true,
                  ui: { component: "textarea" },
                  description: 'Usa "## " per un titolo di sezione, "### " per un sottotitolo, "- " per un elenco puntato, riga vuota per andare a capo tra paragrafi, "**testo**" per il grassetto.'
                },
                { type: "string", name: "regolamento_body_en", label: "\u{1F1EC}\u{1F1E7} Testo regolamento (inglese)", ui: { component: "textarea" } }
              ]
            },
            {
              name: "privacy",
              label: "Privacy Policy",
              fields: [
                ...heroSeoFields,
                {
                  type: "string",
                  name: "privacy_body",
                  label: "Testo privacy policy (italiano)",
                  required: true,
                  ui: { component: "textarea" },
                  description: 'Usa "## " per un titolo di sezione, "### " per un sottotitolo, "- " per un elenco puntato, riga vuota per andare a capo tra paragrafi, "**testo**" per il grassetto.'
                },
                { type: "string", name: "privacy_body_en", label: "\u{1F1EC}\u{1F1E7} Testo privacy policy (inglese)", ui: { component: "textarea" } }
              ]
            },
            {
              name: "partners",
              label: "Partners",
              fields: [
                ...heroSeoFields,
                {
                  type: "object",
                  name: "partners_lista",
                  label: "Partner",
                  list: true,
                  required: true,
                  ui: { itemProps: (item) => ({ label: item?.nome || "Nuovo partner" }) },
                  fields: [
                    { type: "string", name: "nome", label: "Nome", required: true },
                    { type: "string", name: "descrizione", label: "Descrizione", required: true, ui: { component: "textarea" } },
                    { type: "string", name: "descrizione_en", label: "\u{1F1EC}\u{1F1E7} Descrizione (inglese)", ui: { component: "textarea" } },
                    { type: "image", name: "logo", label: "Logo", required: true },
                    { type: "string", name: "sito", label: "Sito web (URL completo)", required: true }
                  ]
                }
              ]
            }
          ]
        };
      })()
    ]
  }
});
export {
  config_default as default
};

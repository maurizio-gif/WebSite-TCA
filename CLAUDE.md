# CLAUDE.md — Tennis Club Ambrosiano

Convenzioni di progetto per il sito del Tennis Club Ambrosiano. Questo file è la
fonte di verità per stack, flusso di lavoro, struttura e regole.

---

## Stack
- **Astro** — framework, output statico
- **CSS puro / CSS custom properties** — nessun framework CSS, nessuna libreria UI
- **TinaCMS** — CMS headless (scaffold pronto; attivare con credenziali TinaCloud)
- **GitHub** — versioning (`origin` → github.com/maurizio-gif/WebSite-TCA.git)
- **Netlify** — deploy produzione (build: `npm run build`, publish: `dist`)
- **GitHub Pages** — deploy preview (`maurizio-gif.github.io/WebSite-TCA/`)

---

## Flusso di lavoro
1. Prima di ogni task complesso, esponi il piano in massimo 5 righe
2. Attendi l'approvazione prima di eseguire
3. Produci sempre file completi e pronti all'uso, mai troncati
4. Non eseguire commit né push: li gestisce l'utente manualmente
5. Usa `feature/nome` per lo sviluppo, `main` va in produzione

---

## Struttura directory
```
src/components/        → componenti riutilizzabili (PascalCase)
src/layouts/           → layout di pagina (BaseLayout, ecc.)
src/pages/             → pagine principali (routing file-based)
src/content/
  config.ts            → schema Astro Content Collections
  pagine/              → un .md per pagina (frontmatter + body)
src/assets/
  images/
    hero/              → foto hero (full-screen, con overlay)
    disciplines/       → foto tennis, padel, famiglia, ecc.
    torneo/            → foto Torneo Avvenire
    club/              → foto generiche struttura
  logos/
    partners/          → loghi sponsor e partner
src/styles/            → CSS globale e variabili CSS custom
public/                → file statici (favicon, immagini CMS, admin/)
tina/
  config.ts            → schema TinaCMS (mappa src/content/pagine/)
docs/                  → brief, note e documentazione interna
.github/workflows/     → CI/CD GitHub Pages
```

---

## Palette
Definite in `src/styles/global.css` come CSS custom properties su `:root`.

| Variabile             | Valore              | Uso                           |
|-----------------------|---------------------|-------------------------------|
| `--color-bg`          | `#FFFFFF`           | Sfondo pagina                 |
| `--color-text`        | `#1A1A1A`           | Testo principale              |
| `--color-text-light`  | `#555555`           | Testo secondario / body       |
| `--color-accent`      | `#8B1A1A`           | Rosso TCA (CTA, link, brand)  |
| `--color-accent-dark` | `#6B1414`           | Hover su accent               |
| `--color-border`      | `#EBEBEB`           | Bordi, divisori               |
| `--color-off-white`   | `#F5F3F0`           | Sfondi sezioni alternate      |
| `--color-overlay`     | `rgba(0,0,0,0.55)`  | Overlay su immagini hero      |
| `--max-width`         | `1500px`            | Larghezza max contenuto       |
| `--pad-x`             | `clamp(20px,5vw,72px)` | Padding orizzontale fluid  |
| `--header-h`          | `60px`              | Altezza navbar fixed          |

---

## Tipografia
Entrambi i font sono caricati da **Google Fonts** (in `BaseLayout.astro`).

- **Titoli / display** → condensed: **Barlow Condensed** w800, UPPERCASE (`--font-display` / alias `--font-serif`)
- **Body / form** → **Barlow** w300/400 (`--font-body` / alias `--font-sans`)

Stile reference: `https://maurizio-gif.github.io/TCA/`

---

## Integrazioni esterne
Da **predisporre** ora, **non implementare** finché non indicato.

| Integrazione            | Destinazione            | Stato        |
|-------------------------|-------------------------|--------------|
| Iscrizioni membership   | Link esterno PerfectGym | Predisporre  |
| Prenotazione campi      | Link esterno Playtomic  | Predisporre  |
| Form lead               | Webhook n8n             | Fase 2       |
| Modal                   | Da definire             | Fase 2       |

---

## Pagine previste
| Rotta                     | Pagina                |
|---------------------------|-----------------------|
| `/`                       | Home                  |
| `/tennis`                 | Tennis                |
| `/padel`                  | Padel e Pickleball    |
| `/famiglia`               | Famiglia              |
| `/summer-camps`           | Summer Camps          |
| `/preparazione-atletica`  | Preparazione Atletica |
| `/torneo-avvenire`        | Torneo Avvenire       |
| `/contatti`               | Contatti              |

---

## Regole
- Nessuna spiegazione del codice salvo richiesta esplicita
- Nessun placeholder di testo: i copy sono forniti nel brief
- **Immagini non ancora disponibili**: usa l'utility `.img-placeholder` →
  box `#E5E7EB` con il nome file centrato (vedi `src/styles/global.css`)
- Un file per componente
- I componenti usano la notazione **PascalCase**
- Se un task tocca più file, completali tutti prima di fermarti
- Se incontri un ostacolo, proponilo senza procedere autonomamente
- "Preparazione Atletica" — mai "fitness", ovunque (anche SEO/meta)

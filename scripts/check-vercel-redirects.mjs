#!/usr/bin/env node
// Controllo statico su vercel.json: due classi di bug sui redirect, viste
// entrambe in produzione prima che qualcuno se ne accorgesse navigando il
// sito.
//
// 1) SELF-LOOP: ":param*" (path-to-regexp/Vercel) significa "zero o più
//    segmenti", quindi una regola come "/agonistica/:path*" -> "/agonistica"
//    combacia ANCHE con "/agonistica" nudo (zero segmenti) e lo reindirizza
//    verso se stesso — pagina irraggiungibile, loop infinito nel browser.
//    Successo con /agonistica, /tennis, poi /news (IT).
//    Fix quasi sempre ":param+" (uno o più segmenti).
//
// 2) SOVRAPPOSIZIONE CON PAGINE REALI: una regola con wildcard scritta per
//    "ripulire" vecchi URL legacy può combaciare anche con pagine VERE del
//    sito attuale, se il prefisso prima del wildcard è lo stesso che usano
//    le pagine reali (es. il prefisso "/en/" delle pagine inglesi). Successo
//    con "/en/:path+" -> "/en" (rompeva TUTTO il sito in inglese) e
//    "/en/news/:path*" -> "/en/club-life" (rompeva le pagine news EN).
//    Questo controllo richiede la build (dist/): confronta ogni regola con
//    wildcard contro le pagine realmente generate, e segnala quelle che
//    verrebbero reindirizzate altrove invece di essere servite.
//
// Uso: node scripts/check-vercel-redirects.mjs
// (richiamato da .github/workflows/ci.yml: il controllo self-loop gira
// subito, quello di sovrapposizione dopo "npm run build")

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const vercelJsonPath = join(repoRoot, 'vercel.json');
const distPath = join(repoRoot, 'dist');

const config = JSON.parse(readFileSync(vercelJsonPath, 'utf8'));
const redirects = config.redirects ?? [];

let hasError = false;

// ── 1) Self-loop ────────────────────────────────────────────────────────
redirects.forEach((rule, i) => {
  const { source, destination } = rule;
  if (typeof source !== 'string' || typeof destination !== 'string') return;

  const match = source.match(/^(.*)\/:[A-Za-z0-9_]+\*$/);
  if (!match) return;

  const bareSourcePath = match[1];
  if (destination === bareSourcePath) {
    hasError = true;
    console.error(
      `✗ redirect #${i}: "${source}" -> "${destination}"\n` +
      `  ":*" combacia anche con "${bareSourcePath}" nudo (zero segmenti): la regola lo ` +
      `reindirizza verso se stesso, loop infinito.\n` +
      `  Fix: usa ":path+" al posto di ":path*" se "${bareSourcePath}" deve restare raggiungibile.\n`
    );
  }
});

// ── 2) Sovrapposizione con pagine reali (richiede dist/) ────────────────
function sourceToRegex(source) {
  // Le regole con wildcard in questo file hanno sempre la forma
  // "<prefisso>/:nome*" o "<prefisso>/:nome+" (wildcard finale): copre
  // esattamente quella forma, non un path-to-regexp generico.
  const m = source.match(/^(.*)\/:[A-Za-z0-9_]+([*+])$/);
  if (!m) return null;
  const [, prefix, quantifier] = m;
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tail = quantifier === '*' ? '(?:/.*)?' : '/.+';
  return new RegExp(`^${escaped}${tail}$`);
}

function collectRealRoutes(dir, base = '') {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...collectRealRoutes(full, `${base}/${entry}`));
    } else if (entry === 'index.html') {
      routes.push(base || '/');
    }
  }
  return routes;
}

if (!existsSync(distPath)) {
  console.log('… dist/ non trovato: salto il controllo di sovrapposizione con pagine reali (serve "npm run build" prima).');
} else {
  const realRoutes = collectRealRoutes(distPath);

  redirects.forEach((rule, i) => {
    const { source, destination } = rule;
    if (typeof source !== 'string' || typeof destination !== 'string') return;

    const regex = sourceToRegex(source);
    if (!regex) return;

    const shadowed = realRoutes.filter((route) => regex.test(route) && route !== destination);
    if (shadowed.length > 0) {
      hasError = true;
      console.error(
        `✗ redirect #${i}: "${source}" -> "${destination}"\n` +
        `  questa regola combacia con ${shadowed.length} pagina/e REALE/i del sito e le reindirizza ` +
        `altrove invece di servirle, es.: ${shadowed.slice(0, 5).join(', ')}${shadowed.length > 5 ? ', …' : ''}\n` +
        `  Fix: restringi il pattern (es. un prefisso legacy più specifico) così non combacia più con le pagine vere.\n`
      );
    }
  });
}

if (hasError) {
  console.error(`Controllo redirect vercel.json fallito (${redirects.length} regole controllate).`);
  process.exit(1);
}

console.log(`✓ vercel.json: ${redirects.length} redirect controllati, nessun self-loop né sovrapposizione con pagine reali.`);

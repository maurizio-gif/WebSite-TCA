#!/usr/bin/env node
// Controllo di allineamento tra lo schema TinaCMS e i file generati committati.
//
// IL BUG CHE PREVIENE: TinaCloud non legge tina/config.ts. Indicizza lo schema
// leggendo tina/tina-lock.json dal repository. Quel lock viene però scritto
// solo da "tinacms dev": la build di produzione ("tinacms build", vedi lo
// script tina:build) NON lo aggiorna. Quindi si può modificare config.ts,
// deployare, vedere i campi nuovi nell'admin — e avere TinaCloud fermo allo
// schema vecchio. L'admin mostra allora "GraphQL Schema Mismatch. Editing may
// not work" e le modifiche ai contenuti possono non salvarsi.
// È già successo: la collezione "moduli" (template Camp e Dati Stagionali
// Form) era assente dal lock committato pur essendo presente in config.ts.
//
// COSA FA: rigenera lo schema da tina/config.ts in una copia usa-e-getta del
// repo e confronta i file generati con quelli committati. Se differiscono,
// fallisce spiegando come rigenerarli.
//
// Confronta solo gli artefatti DETERMINISTICI, cioè indipendenti da
// credenziali e percorsi locali. Restano fuori:
//   • client.ts  → contiene url, token e un cacheDir col path assoluto
//   • types.ts   → contiene un url dentro ExperimentalGetTinaClient
// Sono artefatti di sviluppo locale che nessun modulo importa e che la build
// di produzione rigenera; confrontarli darebbe falsi allarmi in CI.
//
// Uso: node scripts/check-tina-lock.mjs
// (richiamato da .github/workflows/ci.yml)
//
// NOTA per la CI: "tinacms build" crea public/admin/ (~8 MB di bundle). Se
// quella cartella resta nel workspace, "astro check" prova a type-checkarla e
// va in out-of-memory. Per questo il lavoro avviene in una directory
// temporanea, mai nel repo.

import { readFileSync, existsSync, mkdtempSync, rmSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));

// File generati confrontati: deterministici, non dipendono dall'ambiente.
// ATTENZIONE: tina-lock.json non va confrontato con la copia presente nella
// directory temporanea. "tinacms build" non riscrive il lock, quindi quella
// copia è il lock committato stesso e il confronto sarebbe circolare (passerebbe
// sempre). Il lock atteso va ricostruito dai JSON appena rigenerati — vedi
// expectedLockFrom() più sotto.
const DETERMINISTIC_FILES = [
  'tina/__generated__/_schema.json',
  'tina/__generated__/_lookup.json',
  'tina/__generated__/_graphql.json',
  'tina/__generated__/schema.gql',
  'tina/__generated__/frags.gql',
  'tina/__generated__/queries.gql',
];

// Il lock è la concatenazione dei tre JSON generati: stessa logica del CLI
// Tina quando lo scrive (@tinacms/cli, comando dev).
const expectedLockFrom = (dir) => JSON.stringify({
  schema: JSON.parse(readFileSync(join(dir, 'tina/__generated__/_schema.json'), 'utf8')),
  lookup: JSON.parse(readFileSync(join(dir, 'tina/__generated__/_lookup.json'), 'utf8')),
  graphql: JSON.parse(readFileSync(join(dir, 'tina/__generated__/_graphql.json'), 'utf8')),
});

// Credenziali segnaposto: "tinacms build" le pretende presenti, ma con
// --skip-cloud-checks non contatta TinaCloud, e nessuno dei file confrontati
// qui le contiene (per questo client.ts e types.ts sono esclusi).
const PLACEHOLDER_ENV = {
  TINA_CLIENT_ID: '00000000-0000-0000-0000-000000000000',
  TINA_TOKEN: 'placeholder-ci-schema-check',
};

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

// ── Il lock deve esistere: è il file che TinaCloud legge ──────────────────
const lockPath = join(repoRoot, 'tina/tina-lock.json');
if (!existsSync(lockPath)) {
  fail(
    '✗ tina/tina-lock.json non trovato.\n' +
    "  È il file da cui TinaCloud legge lo schema: senza, l'admin non funziona.\n" +
    '  Rigeneralo con "npm run tina:lock" e committalo.\n'
  );
}

// ── Rigenera in una copia temporanea, per non sporcare il repo ────────────
const workDir = mkdtempSync(join(tmpdir(), 'tina-schema-check-'));
let regenerated = false;

try {
  // Copia il minimo necessario alla rigenerazione dello schema. node_modules
  // è symlinkato per evitare di duplicare centinaia di MB.
  for (const entry of ['tina', 'src', 'package.json']) {
    cpSync(join(repoRoot, entry), join(workDir, entry), { recursive: true });
  }
  execFileSync('ln', ['-s', join(repoRoot, 'node_modules'), join(workDir, 'node_modules')]);

  try {
    execFileSync('npx', ['tinacms', 'build', '--skip-cloud-checks'], {
      cwd: workDir,
      env: { ...process.env, ...PLACEHOLDER_ENV },
      stdio: 'pipe',
      timeout: 10 * 60 * 1000,
    });
    regenerated = true;
  } catch (e) {
    const out = `${e.stdout ?? ''}${e.stderr ?? ''}`;
    fail(
      '✗ Impossibile rigenerare lo schema Tina per il confronto.\n' +
      '  Probabile errore in tina/config.ts — output del comando:\n\n' +
      `${out.split('\n').slice(-25).join('\n')}\n`
    );
  }

  // ── Confronto file per file ────────────────────────────────────────────
  const stale = [];
  for (const rel of DETERMINISTIC_FILES) {
    const committedPath = join(repoRoot, rel);
    const freshPath = join(workDir, rel);

    if (!existsSync(freshPath)) continue; // non prodotto da questa versione del CLI
    if (!existsSync(committedPath)) {
      stale.push(`${rel} (manca nel repo)`);
      continue;
    }
    if (readFileSync(committedPath, 'utf8') !== readFileSync(freshPath, 'utf8')) {
      stale.push(rel);
    }
  }

  // Il lock: confronto col contenuto derivato dai JSON appena rigenerati.
  if (readFileSync(lockPath, 'utf8') !== expectedLockFrom(workDir)) {
    stale.push('tina/tina-lock.json  ← è il file che TinaCloud legge');
  }

  if (stale.length > 0) {
    fail(
      `✗ Lo schema generato non è allineato a tina/config.ts (${stale.length} file):\n` +
      stale.map((f) => `    ${f}`).join('\n') + '\n\n' +
      '  config.ts è stato modificato senza rigenerare i file committati.\n' +
      "  TinaCloud legge lo schema da tina/tina-lock.json: finché resta indietro,\n" +
      '  l\'admin mostra "GraphQL Schema Mismatch" e le modifiche possono non salvarsi.\n\n' +
      '  Fix: esegui "npm run tina:lock" e committa i file che risultano modificati.\n'
    );
  }

  console.log(
    `✓ schema Tina allineato a config.ts (${DETERMINISTIC_FILES.length + 1} file confrontati, ` +
    'tina-lock.json incluso).'
  );
} finally {
  rmSync(workDir, { recursive: true, force: true });
  if (!regenerated) {
    console.error('  (nota: la directory temporanea di lavoro è stata rimossa)');
  }
}

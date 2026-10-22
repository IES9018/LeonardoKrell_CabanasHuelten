#!/usr/bin/env node
/**
 * Presupuestos de peso (RNF-03 y RNF-04) — corrible en CI y local.
 * Uso: node scripts/check-budgets.mjs
 * Falla (exit 1) si algún presupuesto se excede.
 */
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const budgets = [
  { id: "RNF-03", label: "app.js (JS propio)", files: ["app.js"], limitKB: 200 },
  {
    id: "RNF-04",
    label: "index.html + styles.css + app.js (primer contacto)",
    files: ["index.html", "styles.css", "app.js"],
    limitKB: 100,
  },
];

const root = new URL("../", import.meta.url);
let failed = false;

for (const budget of budgets) {
  const totalKB = budget.files.reduce((sum, file) => {
    const content = readFileSync(fileURLToPath(new URL(file, root)));
    const kb = gzipSync(content).length / 1024;
    console.log(`  ${file}: ${kb.toFixed(1)} KB gzip`);
    return sum + kb;
  }, 0);
  const ok = totalKB <= budget.limitKB;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${budget.id} ${budget.label}: ${totalKB.toFixed(1)} KB / presupuesto ${budget.limitKB} KB gzip\n`
  );
  if (!ok) failed = true;
}

process.exit(failed ? 1 : 0);

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const root = process.cwd();
const ignored = new Set(["node_modules", "dist", "target", ".git", "gen", "icons"]);
const codeExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".rs", ".sql", ".css", ".html"]);
const maxLines = 50;
const violations = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (ignored.has(name)) continue;
    const full = join(directory, name);
    if (statSync(full).isDirectory()) walk(full);
    else inspect(full);
  }
}

function inspect(file) {
  if (!codeExtensions.has(extname(file))) return;
  const text = readFileSync(file, "utf8");
  const path = relative(root, file).split(sep).join("/");
  if (path.startsWith("scripts/")) return;
  const lines = text.split(/\r?\n/);
  if (lines.at(-1) === "") lines.pop();
  if (lines.length > maxLines) violations.push(`${path}: ${lines.length} lignes (max ${maxLines})`);
  lines.forEach((line, index) => {
    const at = `${path}:${index + 1}`;
    if (/bg-gradient-to-|bg-linear-to-|linear-gradient\s*\(/.test(line)) violations.push(`${at} dégradé interdit`);
    if (/\p{Extended_Pictographic}/u.test(line)) violations.push(`${at} emoji interdit`);
    if (/﻿/.test(index === 0 ? line.slice(1) : line)) violations.push(`${at} caractère BOM invisible (utiliser \\uFEFF)`);
    if (/\bborder-(t|b|l|r)-/.test(line)) violations.push(`${at} bordure unilatérale`);
    if (/\b(bg|text|border|ring|from|to|via)-(blue|sky|indigo|cyan|teal|emerald|green|lime|violet|fuchsia|rose)-/.test(line)) violations.push(`${at} couleur Tailwind par défaut`);
    if (/#1(DB954|ED760)\b/i.test(line)) violations.push(`${at} vert Spotify interdit`);
    if (/style=\{\{/.test(line)) violations.push(`${at} style inline interdit`);
    if (/<style[\s>]/.test(line)) violations.push(`${at} bloc style interdit`);
    if (path.startsWith("apps/desktop/src/") && /\.(tsx|ts)$/.test(path) && /\.(unwrap|expect)\(/.test(line)) violations.push(`${at} unwrap/expect interdit`);
    if (path.endsWith(".rs") && /\.(unwrap|expect)\(/.test(line)) violations.push(`${at} unwrap/expect interdit`);
  });
  if (path.endsWith(".css")) {
    const allowed = lines.filter((line) => line.trim() && !/^@tailwind (base|components|utilities);$/.test(line.trim()));
    if (allowed.length) violations.push(`${path} CSS personnalisé interdit`);
  }
}

walk(root);
if (violations.length) {
  console.error(`Échec des règles Kalo (${violations.length})`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}
console.log("Règles Kalo respectées.");

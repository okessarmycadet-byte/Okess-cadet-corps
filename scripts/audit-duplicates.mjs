import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const ignored = new Set([
  "node_modules", ".git", "dist", "build", ".next",
  ".cache", "coverage", ".turbo"
]);

const extensions = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".scss", ".json", ".sql", ".html", ".md"
]);

const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
    } else if (extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
}

walk(root);

const relative = (f) => path.relative(root, f);
const contents = new Map();
const hashes = new Map();

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  contents.set(file, text);

  const hash = crypto.createHash("sha256").update(text).digest("hex");

  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(file);
}

const report = [];
report.push("# OKESS CADET CORPS — CODE AUDIT");
report.push("");
report.push(`Files inspected: ${files.length}`);
report.push(`Audit date: ${new Date().toISOString()}`);
report.push("");
report.push("> Read-only audit. No source files were edited or deleted.");
report.push("");

// 1. Exact duplicate files
report.push("## 1. Exact duplicate files");
report.push("");

let exactCount = 0;

for (const group of hashes.values()) {
  if (group.length > 1) {
    exactCount++;
    report.push("### Duplicate group");
    for (const f of group) report.push(`- ${relative(f)}`);
    report.push("");
  }
}

if (!exactCount) report.push("No exact duplicate files detected.");
report.push("");

// 2. Similar code
report.push("## 2. Potentially similar source files");
report.push("");

const sourceFiles = files.filter(f =>
  [".ts", ".tsx", ".js", ".jsx"].includes(path.extname(f))
);

function tokens(text) {
  return new Set(
    text.match(/[A-Za-z_$][A-Za-z0-9_$]{2,}/g) || []
  );
}

const tokenMap = new Map();

for (const file of sourceFiles) {
  const set = tokens(contents.get(file));
  if (set.size >= 80) tokenMap.set(file, set);
}

const pairs = [];
const entries = [...tokenMap.entries()];

for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const [a, A] = entries[i];
    const [b, B] = entries[j];

    let common = 0;
    for (const token of A) if (B.has(token)) common++;

    const score = common / (A.size + B.size - common);

    if (score >= 0.72) {
      pairs.push({ a, b, score });
    }
  }
}

pairs.sort((a, b) => b.score - a.score);

if (pairs.length) {
  for (const p of pairs) {
    report.push(
      `- **${(p.score * 100).toFixed(1)}% similarity**: ` +
      `${relative(p.a)} ↔ ${relative(p.b)}`
    );
  }
} else {
  report.push("No high-similarity source file pairs detected.");
}

report.push("");
report.push("> Similarity is a rough token comparison, not proof of duplicate functionality.");
report.push("");

// 3. Repeated long lines
report.push("## 3. Repeated long lines");
report.push("");

const lineMap = new Map();

for (const [file, text] of contents) {
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length < 100) continue;

    if (!lineMap.has(trimmed)) lineMap.set(trimmed, []);
    lineMap.get(trimmed).push(file);
  }
}

let repeatedLines = 0;

for (const [line, locations] of lineMap) {
  const unique = [...new Set(locations)];

  if (unique.length >= 3) {
    repeatedLines++;
    report.push(`### Found in ${unique.length} files`);
    report.push("```");
    report.push(line.slice(0, 300));
    report.push("```");

    for (const f of unique) report.push(`- ${relative(f)}`);
    report.push("");
  }
}

if (!repeatedLines) report.push("No repeated long lines found.");
report.push("");

// 4. CSS selectors
report.push("## 4. CSS selectors appearing in multiple files");
report.push("");

const selectorMap = new Map();

for (const file of files.filter(f =>
  [".css", ".scss"].includes(path.extname(f).toLowerCase())
)) {
  const text = contents.get(file);
  const matches = text.matchAll(/([^{}]+)\{/g);

  for (const match of matches) {
    const selector = match[1].trim();

    if (!selector || selector.startsWith("@")) continue;
    if (selector.length > 120) continue;

    if (!selectorMap.has(selector)) selectorMap.set(selector, new Set());
    selectorMap.get(selector).add(file);
  }
}

let cssCount = 0;

for (const [selector, locations] of selectorMap) {
  if (locations.size > 1) {
    cssCount++;
    report.push(`### ${selector}`);

    for (const file of locations) report.push(`- ${relative(file)}`);
    report.push("");
  }
}

if (!cssCount) report.push("No repeated CSS selectors across files detected.");
report.push("");

// 5. Backup/old files
report.push("## 5. Backup or old-file candidates");
report.push("");

const backupPattern = /backup|bak|old|copy|working|temp|original|previous|before/i;
const backups = files.filter(f => backupPattern.test(path.basename(f)));

if (backups.length) {
  for (const f of backups) report.push(`- ${relative(f)}`);
} else {
  report.push("No backup candidates detected by filename.");
}

report.push("");

// 6. Inventory
report.push("## 6. Project file inventory");
report.push("");

for (const f of files.sort()) report.push(`- ${relative(f)}`);

report.push("");
report.push("## Audit limitations");
report.push("");
report.push("- Similarity scores do not prove duplication.");
report.push("- CSS selector matching is approximate.");
report.push("- This audit does not determine whether a component is unused.");
report.push("- It does not check database migration or security-policy duplication.");
report.push("- No files were removed, renamed, or rewritten.");
report.push("");

const output = path.join(root, "CODE_AUDIT_REPORT.md");
fs.writeFileSync(output, report.join("\n"), "utf8");

console.log("==================================");
console.log("OKESS CODE AUDIT FINISHED");
console.log("==================================");
console.log(`Files scanned: ${files.length}`);
console.log(`Exact duplicate groups: ${exactCount}`);
console.log(`Similar code pairs: ${pairs.length}`);
console.log(`Repeated long lines: ${repeatedLines}`);
console.log(`Repeated CSS selectors: ${cssCount}`);
console.log(`Backup candidates: ${backups.length}`);
console.log("");
console.log("Report created: CODE_AUDIT_REPORT.md");
console.log("No existing project source files were changed.");

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const EM_DASH = String.fromCharCode(0x2014);
const SKIPPED = new Set(["node_modules", ".next", "out", ".git", "art", "public"]);
// The brief names the em dash while banning it, so it is the one file allowed to contain one.
const SKIPPED_FILES = new Set(["package-lock.json", "claude-code-prompt-blue-ocean-presentation.md"]);
const CHECKED = /\.(ts|tsx|css|md|mjs|json)$/;

function* walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (SKIPPED.has(entry) || SKIPPED_FILES.has(entry)) continue;
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (CHECKED.test(entry)) yield path;
  }
}

const offenders = [];
for (const path of walk(".")) {
  readFileSync(path, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (line.includes(EM_DASH)) offenders.push(`${path}:${index + 1}`);
    });
}

if (offenders.length > 0) {
  console.error(`Found ${offenders.length} em dash(es). Use a comma, colon, period or parentheses instead:\n${offenders.join("\n")}`);
  process.exit(1);
}
console.log("No em dashes found.");

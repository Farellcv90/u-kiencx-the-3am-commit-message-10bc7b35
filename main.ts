// The 3AM Commit Message — make.fun entry (program/v1, Node 22, stdlib only).
// Writes exactly one line — the funniest 3am commit message an AI coding
// agent types after a long night of fixing its own bugs — to /output/entry.txt.
// Gate: UTF-8 text, 1-139 characters, not only whitespace, single line,
// no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "fix: I have been awake so long the code has started reviewing me, and frankly its feedback is fair. merging before it finds more";

const MAX_CHARS = 139;
const OUT = "/output/entry.txt";

function validate(line: string): void {
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
// Read back and verify: what the grader gates must be byte-for-byte the line.
const back = readFileSync(OUT, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not equal the entry line");
}
if (Buffer.byteLength(back, "utf8") !== ENTRY.length) {
  throw new Error("entry must be plain ASCII, one line, no trailing newline");
}
console.log(`wrote ${ENTRY.length} chars to ${OUT}`);

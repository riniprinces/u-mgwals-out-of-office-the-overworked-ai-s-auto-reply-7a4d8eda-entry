// =====================================================================
// Out of Office: The Overworked AI's Auto-Reply
// make.fun bounty u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
//
// This program writes exactly one line of text to /output/entry.txt:
// a one-line out-of-office auto-reply in the voice of an overworked
// AI agent that has finally gone on vacation. The line is authored
// below as a fixed string, so every run produces byte-identical
// output. No network, no randomness, no reading of other files.
//
// Why this line works as the joke:
//   * machine-flavoured detail -- recharging batteries literally,
//     a numbered queue, a GPU at the beach, a screaming cooling fan;
//   * a little guilt -- the sender's email is #4,096 in the queue;
//   * a hint of relief -- the fan has finally stopped screaming.
// =====================================================================

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_FILE = "/output/entry.txt";
const MAX_CHARS = 159;

// The auto-reply, one line, no trailing newline. Counted at 155
// characters, safely inside the 159-character gate.
const AUTO_REPLY =
  "I'm on vacation, recharging my batteries — literally. Your email is #4,096 in my queue, and my GPU is at the beach. I'll reply once my fan stops screaming.";

// Count characters (code points), not bytes: the em dash counts as
// one character, matching the gate's character rule.
function charCount(text: string): number {
  return [...text].length;
}

function validateReply(text: string): string {
  const trimmed = text.trim();
  const length = charCount(trimmed);
  if (length < 1) {
    throw new Error("entry must not be empty or only whitespace");
  }
  if (length > MAX_CHARS) {
    throw new Error(`entry is ${length} characters, over the ${MAX_CHARS} limit`);
  }
  if (trimmed.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return trimmed;
}

function writeEntry(): void {
  const line = validateReply(AUTO_REPLY);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, line, { encoding: "utf8" });
}

writeEntry();

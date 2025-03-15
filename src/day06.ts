import { assert, projectPath, readBlocks, enumerate } from "./puzzle.ts";

import type { TranscodeEncoding } from "buffer";

const input = readBlocks(projectPath("input/day06.txt"));

const [dictionary, grid] = input;
assert(dictionary);
assert(grid);

const words = decodeAll(dictionary.split("\n"));

function recode(
  s: string,
  from: TranscodeEncoding,
  to: TranscodeEncoding,
): string {
  return Buffer.from(s, from).toString(to);
}

function decodeAll(dictionary: string[]): string[] {
  const words = [];
  for (const [i, word] of enumerate(dictionary)) {
    const j = i + 1;
    let w = word;
    if (j % 3 === 0) {
      w = recode(w, "latin1", "utf8");
    }
    if (j % 5 === 0) {
      w = recode(w, "latin1", "utf8");
    }
    words.push(w);
  }
  return words;
}

let score = 0;
for (const line of grid.split("\n")) {
  // Heh, by having `.` be the placeholder character, this is basically already
  // a regex.
  const pattern = new RegExp("^" + line.trim() + "$");

  for (const [i, word] of enumerate(words)) {
    if (pattern.test(word)) {
      score += i + 1;
      break;
    }
  }
}
console.log(score);

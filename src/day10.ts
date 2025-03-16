import {
  assert,
  enumerate,
  projectPath,
  readBlocks,
  splitN,
} from "./puzzle.ts";
import * as bcrypt from "bcrypt";

const [db, inputs] = readBlocks(projectPath("input/day10.txt"));
assert(db);
assert(inputs);

function parsePair(s: string): [string, string] {
  const parts = splitN(s, " ", 2);
  assert(parts.length === 2);

  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [parts[0]!, parts[1]!];
}

const hashes: Map<string, string> = new Map([...db.split("\n").map(parsePair)]);
const attempts: [string, string][] = inputs.split("\n").map(parsePair);

function graphemes(s: string): string[] {
  const segmenter = new Intl.Segmenter("en-US", { granularity: "grapheme" });
  return [...segmenter.segment(s)].map((x) => x.segment);
}

async function validate(password: string, hash: string): Promise<boolean> {
  const queue: [number[], string[]][] = [[[], [...graphemes(password)]]];

  while (queue.length > 0) {
    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [prefix, suffix] = queue.shift()!;

    if (suffix.length === 0) {
      if (await bcrypt.compare(Buffer.from(prefix), hash)) {
        return true;
      }
      continue;
    }

    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const char = suffix[0]!;
    const after = suffix.slice(1);

    const forms: Set<string> = new Set();

    for (const form of ["NFC", "NFD", "NFKC", "NFKD"]) {
      forms.add(char.normalize(form));
    }

    for (const next of forms) {
      const b = new TextEncoder().encode(next);
      queue.push([prefix.concat([...b]), after]);
    }
  }

  return false;
}

let count = 0;
const known: Map<string, string> = new Map();
for (const [i, [username, password]] of enumerate(attempts)) {
  console.log(i, username, password);

  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hash = hashes.get(username)!;

  const normed = password.normalize("NFC");
  const ref = known.get(username);
  if (ref) {
    if (ref === normed) {
      count++;
    }
    continue;
  }

  if (await validate(normed, hash)) {
    known.set(username, normed);
    count++;
  }
}
console.log(count);

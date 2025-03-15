import { DateTime, Duration } from "luxon";
import { enumerate, assert, projectPath, readLines, fields } from "./puzzle.ts";

const input = readLines(projectPath("input/day07.txt"));

type Entry = {
  timestamp: DateTime;
  correct: Duration;
  incorrect: Duration;
};

function parseEntry(s: string): Entry {
  const [ts, m1, m2] = fields(s);
  assert(ts);
  assert(m1);
  assert(m2);
  return {
    timestamp: DateTime.fromISO(ts, { setZone: true }),
    correct: Duration.fromObject({ minutes: Number(m1) }),
    incorrect: Duration.fromObject({ minutes: Number(m2) }),
  };
}

function correct(e: Entry): DateTime {
  let ts = e.timestamp;

  // If this offset *in* the timestamp is valid for Halifax *at* the timestamp,
  // treat it as actually being Halifax.
  if (ts.setZone("America/Halifax").offset === ts.offset) {
    ts = ts.setZone("America/Halifax");
  } else {
    ts = ts.setZone("America/Santiago");
  }

  // And now apply the correction.
  return ts.minus(e.incorrect).plus(e.correct);
}

let ans = 0;
for (const [i, entry] of enumerate(input.map(parseEntry))) {
  ans += (i + 1) * correct(entry).hour;
}
console.log(ans);

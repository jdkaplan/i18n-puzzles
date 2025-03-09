import { projectPath, readLines } from "./puzzle.ts";

function countReadings(timestamps: string[]): Map<string, number> {
  const counts: Map<string, number> = new Map();

  for (const ts of timestamps) {
    const utc = normalizeTimestamp(new Date(ts));
    const prev = counts.get(utc) ?? 0;
    counts.set(utc, prev + 1);
  }

  return counts;
}

function normalizeTimestamp(ts: Date): string {
  // Times are considered the same if they're within the same minute, so drop
  // any precision below that.
  ts.setUTCSeconds(0);
  ts.setUTCMilliseconds(0);

  // Our reference format is `2019-06-05T12:15:00+00:00`, which omits the
  // milliseconds that Date.ptototype.toISOString includes (and spells the UTC
  // offset differently).
  const Y = String(ts.getUTCFullYear()).padStart(4, "0");
  const m = String(ts.getUTCMonth() + 1).padStart(2, "0");
  const d = String(ts.getUTCDate()).padStart(2, "0");
  const H = String(ts.getUTCHours()).padStart(2, "0");
  const M = String(ts.getUTCMinutes()).padStart(2, "0");
  const S = String(ts.getUTCSeconds()).padStart(2, "0");
  return `${Y}-${m}-${d}T${H}:${M}:${S}+00:00`;
}

const inputPath = projectPath("input/day02.txt");
const timestamps = readLines(inputPath);
const counts = countReadings(timestamps);
for (const [timestamp, count] of counts.entries()) {
  if (count >= 4) {
    console.log(timestamp);
  }
}

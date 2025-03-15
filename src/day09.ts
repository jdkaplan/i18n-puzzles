import { DateTime } from "luxon";
import { assert, projectPath, readLines } from "./puzzle.ts";

const input = readLines(projectPath("input/day09.txt"));

const formats = ["dd-MM-yy", "MM-dd-yy", "yy-dd-MM", "yy-MM-dd"];

const authorFormat: Map<string, Set<string>> = new Map();
const authorDates: Map<string, Set<string>> = new Map();

for (const line of input) {
  const [date, names] = line.split(": ");
  assert(date);
  assert(names);

  const possible = new Set(formats);
  for (const fmt of formats) {
    const d = DateTime.fromFormat(date, fmt);
    if (!d.isValid) {
      possible.delete(fmt);
    }
  }

  for (const name of names.split(", ")) {
    const fmts = authorFormat.get(name) ?? possible;
    authorFormat.set(name, fmts.intersection(possible));

    const dates = authorDates.get(name) ?? new Set();
    authorDates.set(name, dates.union(new Set([date])));
  }
}

const diarists: Set<string> = new Set();

for (const [name, dates] of authorDates.entries()) {
  const formats = authorFormat.get(name);
  assert(formats);

  const fmts = [...formats.values()];
  assert(fmts.length === 1);

  const fmt = fmts[0];
  assert(fmt);

  for (const date of dates) {
    const d = DateTime.fromFormat(date, fmt);
    if (d.year === 2001 && d.month === 9 && d.day === 11) {
      diarists.add(name);
    }
  }
}

console.log([...diarists].toSorted().join(" "));

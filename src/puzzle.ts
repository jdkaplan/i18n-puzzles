import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Resolves a path relative to the project root. */
export function projectPath(path: string): string {
  return resolve(import.meta.dirname, "..", path);
}

export function readLines(path: string): string[] {
  return readFileSync(path, { encoding: "utf-8" }).trimEnd().split("\n");
}

export function readBlocks(path: string): string[] {
  return readFileSync(path, { encoding: "utf-8" }).trimEnd().split("\n\n");
}

export function* enumerate<T>(iter: Iterable<T>): Generator<[number, T]> {
  let i = 0;
  for (const v of iter) {
    yield [i, v];
    i++;
  }
}

export function assert(
  cond: boolean | null | undefined,
  msg: () => string = () => "assertion failed",
): void {
  if (!cond) {
    throw new Error(msg());
  }
}

export function splitN(s: string, sep: string, limit: number): string[] {
  const parts: string[] = [];
  let i = 0;
  while (limit > 1 && i < s.length) {
    const j = s.indexOf(sep, i);
    parts.push(s.slice(i, j));

    i = j + sep.length;
    limit--;
  }
  parts.push(s.slice(i));

  assert(parts.join(sep) === s);
  return parts;
}

export function take(s: string, prefix: string): string {
  assert(
    s.startsWith(prefix),
    () => `expected ${prefix}, got ${s.slice(0, prefix.length)}...`,
  );
  return s.slice(prefix.length);
}

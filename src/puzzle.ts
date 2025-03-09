import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Resolves a path relative to the project root. */
export function projectPath(path: string): string {
  return resolve(import.meta.dirname, "..", path);
}

export function readLines(path: string): string[] {
  return readFileSync(path, { encoding: "utf-8" }).trimEnd().split("\n");
}

export function* enumerate<T>(iter: Iterable<T>): Generator<[number, T]> {
  let i = 0;
  for (const v of iter) {
    yield [i, v];
    i++;
  }
}

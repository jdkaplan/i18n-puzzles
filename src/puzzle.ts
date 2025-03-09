import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Resolves a path relative to the project root. */
export function projectPath(path: string): string {
  return resolve(import.meta.dirname, "..", path);
}

export function readLines(path: string): string[] {
  return readFileSync(path, { encoding: "utf-8" }).trimEnd().split("\n");
}

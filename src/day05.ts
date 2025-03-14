import { projectPath, readLines, enumerate } from "./puzzle.ts";

const input = readLines(projectPath("input/day05.txt"));
const width = gridWidth(input);

function graphemes(s: string): string[] {
  const segmenter = new Intl.Segmenter("en-US", { granularity: "grapheme" });
  return [...segmenter.segment(s)].map((x) => x.segment);
}

function gridWidth(lines: string[]): number {
  let w = 0;
  for (const line of lines) {
    w = Math.max(w, graphemes(line).length);
  }
  return w;
}

let steps = 0;
for (const [i, line] of enumerate(input)) {
  const chars = graphemes(line);
  const j = (2 * i) % width;
  if (chars[j] === "💩") {
    steps++;
  }
}
console.log(steps);

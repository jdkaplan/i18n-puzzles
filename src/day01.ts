import { projectPath, readLines } from "./puzzle.ts";

function numBytes(s: string): number {
  // String.prototype.length returns the number of UTF-16 code units, which
  // will differ from the number of UTF-8 encoded bytes.
  //
  // So we can re-encode the string as UTF-8 and then count those bytes.
  return new TextEncoder().encode(s).length;
}

function numChars(s: string): number {
  // String.prototype.length returns the number of UTF-16 code units, which
  // will differ from the number of Unicode characters.
  //
  // But a string is iterable by Unicode code points, which is what we consider
  // a "character" here.
  //
  //eslint-disable-next-line @typescript-eslint/no-misused-spread
  return [...s].length;
}

function totalCost(messages: string[]): number {
  let cost = 0;

  for (const msg of messages) {
    const canSMS = numBytes(msg) <= 160;
    const canTweet = numChars(msg) <= 140;
    if (canSMS && canTweet) {
      cost += 13;
    } else if (canSMS) {
      cost += 11;
    } else if (canTweet) {
      cost += 7;
    }
  }

  return cost;
}

const messages = readLines(projectPath("input/day01.txt"));
console.log(totalCost(messages));

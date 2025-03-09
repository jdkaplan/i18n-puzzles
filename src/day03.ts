import { enumerate, projectPath, readLines } from "./puzzle.ts";

const input = readLines(projectPath("input/day03.txt"));

function validate(password: string): string | null {
  // "Character" in this case means Unicode code point, I think.
  //
  //eslint-disable-next-line @typescript-eslint/no-misused-spread
  const chars = [...password];

  if (chars.length < 4) {
    return "too short";
  }
  if (chars.length > 12) {
    return "too long";
  }

  let upper = false;
  let lower = false;
  let digit = false;
  let nonASCII = false;

  for (const char of chars) {
    if (/\p{Upper}/u.test(char)) {
      upper = true;
    }
    if (/\p{Lower}/u.test(char)) {
      lower = true;
    }
    if (/\p{digit}/u.test(char)) {
      digit = true;
    }

    const bytes = new TextEncoder().encode(char);
    if (bytes.length > 1 || (bytes[0] ?? 0) >= 0b1000_0000) {
      nonASCII = true;
    }
  }

  if (!upper) {
    return "missing uppercase";
  }
  if (!lower) {
    return "missing lowercase";
  }
  if (!digit) {
    return "missing digit";
  }
  if (!nonASCII) {
    return "missing non-ASCII";
  }

  return null;
}

let count = 0;
for (const [i, password] of enumerate(input)) {
  const err = validate(password);
  if (err) {
    console.log(i + 1, password, err);
  } else {
    count++;
  }
}
console.log(count);

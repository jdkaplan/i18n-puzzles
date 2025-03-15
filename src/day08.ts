import { enumerate, projectPath, readLines } from "./puzzle.ts";

const input = readLines(projectPath("input/day08.txt"));

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

  let digit = false;

  let vowel = false;
  let consonant = false;

  let unique = true;

  const seen: Set<string> = new Set();

  for (const char of chars) {
    if (/^\p{digit}$/u.test(char)) {
      digit = true;
    }

    if (/^\p{Letter}$/u.test(char)) {
      // BIG assumption about English's view of case and accented letters.
      const base = (char.normalize("NFD")[0] || "").toLowerCase();
      if (/^[aeiou]$/.test(base)) {
        vowel = true;
      } else {
        consonant = true;
      }

      if (seen.has(base)) {
        unique = false;
      } else {
        seen.add(base);
      }
    }
  }

  if (!digit) return "missing digit";
  if (!vowel) return "missing vowel";
  if (!consonant) return "missing consonant";
  if (!unique) return "repeated letter";

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

import { assert, projectPath, readBlocks, splitN, take } from "./puzzle.ts";
import { DateTime, Duration } from "luxon";

const input = readBlocks(projectPath("input/day04.txt"));

type TravelLeg = {
  departure: DateTime;
  arrival: DateTime;
};

function parseTravelLeg(block: string): TravelLeg {
  const lines = block.split("\n");
  assert(lines.length === 2);

  // Parsing is a lot of check-and-consume, so...
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  let departure;
  let arrival;
  {
    const stamp = take(lines[0]!, "Departure:");
    departure = parseTimestamp(stamp.trim());
  }
  {
    const stamp = take(lines[1]!, "Arrival: ");
    arrival = parseTimestamp(stamp.trim());
  }
  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  return { departure, arrival };
}

function parseTimestamp(s: string): DateTime {
  const parts = splitN(s, " ", 2);
  const [zone, time] = parts;

  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const stamp = `${time!.trim()} ${zone!.trim()}`;

  // Example time:
  // Mar 10, 2025, 21:28 America/New_York
  const fmt = "MMM dd, yyyy, HH:mm z";
  return DateTime.fromFormat(stamp, fmt);
}

let duration = Duration.fromMillis(0);
for (const block of input) {
  const leg = parseTravelLeg(block);
  duration = duration.plus(leg.arrival.diff(leg.departure));
}
console.log(duration.as("minutes"));

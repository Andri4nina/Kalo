import type { EditLine } from "./lrc.edit";

/** `mm:ss.cc`, le format des horodatages LRC. */
export function formatStamp(timeMs: number): string {
  const centis = Math.floor(timeMs / 10);
  const minutes = Math.floor(centis / 6000);
  const seconds = Math.floor((centis % 6000) / 100);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}.${pad(centis % 100)}`;
}

/** LRC trié par temps ; les lignes non marquées sont ignorées. */
export function toLrc(lines: EditLine[]): string {
  return lines
    .filter((line): line is { text: string; timeMs: number } => line.timeMs !== null)
    .sort((left, right) => left.timeMs - right.timeMs)
    .map((line) => `[${formatStamp(line.timeMs)}]${line.text}\n`)
    .join("");
}

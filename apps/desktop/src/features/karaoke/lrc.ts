export interface LyricLine {
  timeMs: number;
  text: string;
}

const TIMESTAMP = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
const WORD_TIMESTAMP = /<\d{1,2}:\d{2}(?:[.:]\d{1,3})?>/g;

export function parseLrc(raw: string): LyricLine[] {
  const lines: LyricLine[] = [];
  for (const source of raw.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    TIMESTAMP.lastIndex = 0;
    const times: number[] = [];
    let match = TIMESTAMP.exec(source);
    while (match) {
      const minutes = Number(match[1] ?? 0);
      const seconds = Number(match[2] ?? 0);
      const fraction = (match[3] ?? "0").padEnd(3, "0").slice(0, 3);
      times.push(minutes * 60_000 + seconds * 1_000 + Number(fraction));
      match = TIMESTAMP.exec(source);
    }
    if (times.length === 0) continue;
    const text = source.replace(TIMESTAMP, "").replace(WORD_TIMESTAMP, "").trim();
    for (const timeMs of times) lines.push({ timeMs, text });
  }
  return lines.sort((left, right) => left.timeMs - right.timeMs);
}

export function activeLineIndex(lines: LyricLine[], positionMs: number, offsetMs = 0): number {
  const time = positionMs - offsetMs;
  let active = -1;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line || line.timeMs > time) break;
    active = index;
  }
  return active;
}

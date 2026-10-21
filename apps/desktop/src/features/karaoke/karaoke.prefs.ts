const KEY = "kalo:karaoke-offsets";
const LIMIT_MS = 5_000;

function read(): Record<string, number> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === "number" && Number.isFinite(value)),
    ) as Record<string, number>;
  } catch {
    return {};
  }
}

export function loadKaraokeOffset(trackId: number): number {
  const value = read()[String(trackId)] ?? 0;
  return Math.min(LIMIT_MS, Math.max(-LIMIT_MS, Math.round(value)));
}

export function saveKaraokeOffset(trackId: number, offsetMs: number): void {
  try {
    const values = read();
    values[String(trackId)] = Math.min(LIMIT_MS, Math.max(-LIMIT_MS, Math.round(offsetMs)));
    localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    // Stockage local indisponible : le décalage reste valable pour la session.
  }
}
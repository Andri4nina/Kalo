/**
 * Regroupe les cases FFT linéaires en barres sur une échelle logarithmique
 * (20 Hz à 20 kHz), comme l'oreille perçoit les fréquences. Valeurs de 0 à 1.
 */
export function spectrumBars(data: Uint8Array, count: number, sampleRate: number): number[] {
  const nyquist = sampleRate / 2;
  const binHz = nyquist / data.length;
  const low = Math.log10(20);
  const high = Math.log10(Math.min(20_000, nyquist));
  return Array.from({ length: count }, (_, index) => {
    const from = 10 ** (low + ((high - low) * index) / count);
    const to = 10 ** (low + ((high - low) * (index + 1)) / count);
    const start = Math.min(data.length - 1, Math.floor(from / binHz));
    const end = Math.min(data.length, Math.max(start + 1, Math.ceil(to / binHz)));
    let peak = 0;
    for (let bin = start; bin < end; bin += 1) peak = Math.max(peak, data[bin] ?? 0);
    return peak / 255;
  });
}

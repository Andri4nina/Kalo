export interface EffectState {
  drive: number;
  compression: number;
  reverb: number;
  echo: number;
}

export const EFFECT_KEYS = ["drive", "compression", "reverb", "echo"] as const;
export type EffectName = (typeof EFFECT_KEYS)[number];

export const EFFECT_LABELS: Record<EffectName, string> = {
  drive: "Saturation",
  compression: "Compression",
  reverb: "Réverbération",
  echo: "Écho",
};

export const DEFAULT_EFFECTS: EffectState = { drive: 0, compression: 0, reverb: 0, echo: 0 };

export function clampMix(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, Math.round(value * 100) / 100));
}

export function normalizeEffects(value: unknown): EffectState {
  const source = (value ?? {}) as Partial<Record<EffectName, unknown>>;
  return {
    drive: clampMix(Number(source.drive)),
    compression: clampMix(Number(source.compression)),
    reverb: clampMix(Number(source.reverb)),
    echo: clampMix(Number(source.echo)),
  };
}

export function distortionCurve(drive: number): Float32Array<ArrayBuffer> {
  const amount = 1 + clampMix(drive) * 24;
  const samples = 1024;
  const curve = new Float32Array(samples);
  for (let index = 0; index < samples; index += 1) {
    const x = (index * 2) / samples - 1;
    curve[index] = Math.tanh(amount * x) / Math.tanh(amount);
  }
  return curve;
}

export function compressorSettings(amount: number) {
  const value = clampMix(amount);
  return { threshold: -6 - value * 36, knee: 30 - value * 24, ratio: 1 + value * 19, attack: 0.003, release: 0.25 };
}

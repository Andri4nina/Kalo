export const MIX_STEMS = ["vocals", "drums", "bass", "other"] as const;
export type MixStem = (typeof MIX_STEMS)[number];

export const STEM_LABELS: Record<MixStem, string> = {
  vocals: "Voix",
  drums: "Batterie",
  bass: "Basse",
  other: "Autres",
};

/** Réglage d'une piste : volume 0 à 1,5, panoramique −1 (gauche) à 1 (droite). */
export interface ChannelLevel {
  volume: number;
  pan: number;
  muted: boolean;
}

export type Levels = Record<MixStem, ChannelLevel>;
export type MixPreset = "all" | "karaoke" | "acapella";

const level = (muted: boolean): ChannelLevel => ({ volume: 1, pan: 0, muted });

export function preset(name: MixPreset): Levels {
  return {
    vocals: level(name === "karaoke"),
    drums: level(name === "acapella"),
    bass: level(name === "acapella"),
    other: level(name === "acapella"),
  };
}

export const clampVolume = (value: number) => (Number.isFinite(value) ? Math.min(1.5, Math.max(0, value)) : 1);

export const clampPan = (value: number) => (Number.isFinite(value) ? Math.min(1, Math.max(-1, value)) : 0);

/** Gain réellement appliqué : coupé, ou volume borné ; tout coupé en mode original. */
export function effectiveGain(channel: ChannelLevel, original: boolean): number {
  return original || channel.muted ? 0 : clampVolume(channel.volume);
}

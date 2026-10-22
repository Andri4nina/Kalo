import { describe, expect, it } from "vitest";
import { clampPan, clampVolume, effectiveGain, preset } from "./mixer.levels";

describe("mixeur de pistes", () => {
  it("prépare les préréglages karaoké et a cappella", () => {
    const karaoke = preset("karaoke");
    expect(karaoke.vocals.muted).toBe(true);
    expect(karaoke.drums.muted).toBe(false);
    const acapella = preset("acapella");
    expect(acapella.vocals.muted).toBe(false);
    expect([acapella.drums, acapella.bass, acapella.other].every((channel) => channel.muted)).toBe(true);
  });

  it("borne volume et panoramique", () => {
    expect(clampVolume(3)).toBe(1.5);
    expect(clampVolume(-1)).toBe(0);
    expect(clampVolume(Number.NaN)).toBe(1);
    expect(clampPan(-4)).toBe(-1);
    expect(clampPan(Number.NaN)).toBe(0);
  });

  it("coupe les pistes en mode original ou en sourdine", () => {
    const channel = { volume: 0.8, pan: 0, muted: false };
    expect(effectiveGain(channel, false)).toBe(0.8);
    expect(effectiveGain(channel, true)).toBe(0);
    expect(effectiveGain({ ...channel, muted: true }, false)).toBe(0);
  });
});

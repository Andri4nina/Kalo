import { describe, expect, it } from "vitest";
import { encodeWav, toBase64 } from "./wav";

function fakeBuffer(samples: number[][], sampleRate = 44100): AudioBuffer {
  return {
    numberOfChannels: samples.length,
    length: samples[0]?.length ?? 0,
    sampleRate,
    getChannelData: (channel: number) => Float32Array.from(samples[channel] ?? []),
  } as unknown as AudioBuffer;
}

function text(wav: Uint8Array, offset: number, length: number): string {
  return String.fromCharCode(...wav.subarray(offset, offset + length));
}

describe("encodage WAV", () => {
  it("écrit un en-tête RIFF conforme", () => {
    const wav = encodeWav(fakeBuffer([[0, 0.5, -0.5]]));
    const view = new DataView(wav.buffer);
    expect(text(wav, 0, 4)).toBe("RIFF");
    expect(text(wav, 8, 4)).toBe("WAVE");
    expect(text(wav, 36, 4)).toBe("data");
    expect(view.getUint16(22, true)).toBe(1);
    expect(view.getUint32(24, true)).toBe(44100);
    expect(wav.length).toBe(44 + 3 * 2);
  });
  it("convertit les échantillons en 16 bits", () => {
    const wav = encodeWav(fakeBuffer([[1, -1, 0]]));
    const view = new DataView(wav.buffer);
    expect(view.getInt16(44, true)).toBe(0x7fff);
    expect(view.getInt16(46, true)).toBe(-0x8000);
    expect(view.getInt16(48, true)).toBe(0);
  });
  it("encode les octets en base64", () => {
    expect(toBase64(new Uint8Array([1, 2, 3]))).toBe("AQID");
  });
});

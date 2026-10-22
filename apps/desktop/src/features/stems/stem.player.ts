import type { Levels } from "./mixer.levels";
import type { StemBuffers } from "./stem.loader";
import { applyLevels, startVoices, stopVoices, type Voices } from "./stem.voices";

/** Lecture synchronisée des pistes d'une séparation, avec reprise à la position. */
export class StemPlayer {
  private voices: Voices = new Map();
  private startedAt = 0;
  private offset = 0;
  constructor(private context: AudioContext, readonly buffers: StemBuffers) {}

  get playing(): boolean {
    return this.voices.size > 0;
  }

  position(): number {
    const position = this.playing ? this.offset + this.context.currentTime - this.startedAt : this.offset;
    return Math.max(0, Math.min(position, this.buffers.vocals.duration));
  }

  play(levels: Levels, original: boolean): void {
    stopVoices(this.voices);
    void this.context.resume();
    const { voices, at } = startVoices(this.context, this.buffers, this.offset);
    this.voices = voices;
    this.startedAt = at;
    applyLevels(this.voices, this.context, levels, original);
  }

  apply(levels: Levels, original: boolean): void {
    applyLevels(this.voices, this.context, levels, original);
  }

  pause(): void {
    this.offset = this.position();
    stopVoices(this.voices);
  }

  seek(seconds: number, levels: Levels, original: boolean): void {
    const wasPlaying = this.playing;
    stopVoices(this.voices);
    this.offset = Math.max(0, Math.min(seconds, this.buffers.vocals.duration));
    if (wasPlaying) this.play(levels, original);
  }

  dispose(): void {
    stopVoices(this.voices);
    void this.context.close();
  }
}

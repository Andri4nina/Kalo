import { applyEq } from "@/features/studio/eq";
import { audioElement } from "./audio.element";
import { createGraph, type AudioGraph } from "./audio.graph";

class AudioMixer {
  private graph: AudioGraph | null = null;
  private volume = 0.8;
  private balance = 0;
  private eq: number[] = [];
  private eqEnabled = false;

  ensure(): void {
    if (this.graph) {
      void this.graph.ctx.resume();
      return;
    }
    try {
      this.graph = createGraph(audioElement);
      this.graph.gain.gain.value = this.volume;
      this.graph.panner.pan.value = this.balance;
      applyEq(this.graph.filters, this.eq, this.eqEnabled);
    } catch {
      audioElement.volume = this.volume;
    }
  }

  setVolume(volume: number): void {
    this.volume = volume;
    if (this.graph) this.graph.gain.gain.value = volume;
    else audioElement.volume = volume;
  }

  setBalance(balance: number): void {
    this.balance = balance;
    if (this.graph) this.graph.panner.pan.value = balance;
  }

  setEq(gains: number[], enabled: boolean): void {
    this.eq = gains;
    this.eqEnabled = enabled;
    if (this.graph) applyEq(this.graph.filters, gains, enabled);
  }
}

export const audioMixer = new AudioMixer();

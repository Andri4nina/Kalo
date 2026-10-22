import { useEffect, type RefObject } from "react";
import { useTheme } from "@/app/theme";
import { kaloColors } from "@/design/palette";
import { currentGraph } from "@/features/player/audio.registry";
import { usePlayer } from "@/features/player/player.store";
import { spectrumBars } from "./spectrum";

const BARS = 48;

/** Dessine le spectre du son traité tant que la lecture est en cours. */
export function useSpectrum(canvas: RefObject<HTMLCanvasElement | null>): void {
  const playing = usePlayer((state) => state.playing);
  const dark = useTheme((state) => state.theme === "dark");
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const color = dark ? kaloColors["dark-accent"] : kaloColors.accent;
    let frame = 0;
    const draw = () => {
      const ratio = window.devicePixelRatio || 1;
      element.width = element.clientWidth * ratio;
      element.height = element.clientHeight * ratio;
      context.clearRect(0, 0, element.width, element.height);
      const analyser = currentGraph()?.analyser;
      if (analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const width = element.width / BARS;
        context.fillStyle = color;
        spectrumBars(data, BARS, analyser.context.sampleRate).forEach((value, index) => {
          const height = Math.max(ratio, value * element.height);
          context.fillRect(index * width + ratio, element.height - height, width - 2 * ratio, height);
        });
      }
      if (playing) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [canvas, playing, dark]);
}

import { useEffect, useState, type MutableRefObject } from "react";
import { errorMessage } from "@/lib/format";
import type { StemJob } from "@/types";
import { loadStems } from "./stem.loader";
import { StemPlayer } from "./stem.player";

const IDLE = { loading: false, error: null as string | null, playing: false, position: 0, duration: 0 };

/** Décode les pistes d'une séparation terminée et suit la position de lecture. */
export function useStemLoad(job: StemJob | null, player: MutableRefObject<StemPlayer | null>) {
  const [state, setState] = useState(IDLE);
  useEffect(() => {
    if (!job?.outputDir) return;
    let alive = true;
    const context = new AudioContext();
    setState({ ...IDLE, loading: true });
    loadStems(context, job.outputDir, job.trackPath)
      .then((buffers) => {
        if (!alive) return;
        player.current = new StemPlayer(context, buffers);
        setState({ ...IDLE, duration: buffers.vocals.duration });
      })
      .catch((reason: unknown) => alive && setState({ ...IDLE, error: errorMessage(reason) }));
    const timer = window.setInterval(() => {
      const engine = player.current;
      if (!engine) return;
      const position = engine.position();
      if (engine.playing && position >= engine.buffers.vocals.duration - 0.05) engine.pause();
      setState((current) => ({ ...current, position, playing: engine.playing }));
    }, 250);
    return () => {
      alive = false;
      window.clearInterval(timer);
      player.current?.dispose();
      player.current = null;
    };
  }, [job?.id, job?.outputDir, player]);
  return state;
}

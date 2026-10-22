import { save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { exportAudioWav } from "@/lib/api/library";
import { exportStem } from "@/lib/api/stems";
import { errorMessage } from "@/lib/format";
import { safeName } from "@/lib/safeName";
import type { StemJob } from "@/types";
import { renderMix } from "./mixer.export";
import type { StemMixer } from "./useStemMixer";

const FILTERS = [{ name: "Audio WAV", extensions: ["wav"] }];

/** Export d'une piste générée ou du mix courant vers un fichier choisi. */
export function useMixerExport(job: StemJob, mixer: StemMixer) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ error: boolean; text: string } | null>(null);

  const run = async (suffix: string, write: (destination: string) => Promise<void>) => {
    const destination = await save({ defaultPath: `${safeName(job.title)} - ${suffix}.wav`, filters: FILTERS });
    if (typeof destination !== "string") return;
    setBusy(true);
    setMessage(null);
    try {
      await write(destination);
      setMessage({ error: false, text: `Exporté vers ${destination}` });
    } catch (reason: unknown) {
      setMessage({ error: true, text: errorMessage(reason) });
    } finally {
      setBusy(false);
    }
  };

  const stem = (name: string, label: string) => run(label, (destination) => exportStem(job.id, name, destination));
  const mix = () =>
    run("mix", async (destination) => {
      const buffers = mixer.player.current?.buffers;
      if (!buffers) throw new Error("Pistes non chargées.");
      await exportAudioWav(job.trackId, destination, await renderMix(buffers, mixer.levels));
    });
  return { busy, message, stem, mix };
}

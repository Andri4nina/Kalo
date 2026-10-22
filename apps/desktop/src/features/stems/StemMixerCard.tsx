import { FileDown } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { StemJob } from "@/types";
import { MIX_STEMS, STEM_LABELS } from "./mixer.levels";
import { MixerTransport } from "./MixerTransport";
import { StemChannel } from "./StemChannel";
import { useMixerExport } from "./useMixerExport";
import { useStemMixer } from "./useStemMixer";

/** Mixeur d'une séparation terminée : quatre tranches, lecture et exports. */
export function StemMixerCard({ job }: { job: StemJob }) {
  const mixer = useStemMixer(job);
  const exports = useMixerExport(job, mixer);
  return (
    <Card className="p-5">
      <h2 className="font-display text-lg font-bold tracking-tight">Mixeur · {job.title}</h2>
      <p className={cn("mt-1 text-xs", muted)}>La séparation n'est jamais parfaite : des traces d'un instrument peuvent rester dans un autre.</p>
      {mixer.error ? <div className="mt-3"><ErrorNotice message={mixer.error} /></div> : null}
      {mixer.loading ? <Spinner label="Chargement des pistes" /> : null}
      {!mixer.loading && !mixer.error ? (
        <>
          <div className="mt-4"><MixerTransport mixer={mixer} /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {MIX_STEMS.map((stem) => (
              <StemChannel key={stem} stem={stem} level={mixer.levels[stem]} onChange={(patch) => mixer.setLevel(stem, patch)} onExport={() => void exports.stem(stem, STEM_LABELS[stem])} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm" disabled={exports.busy} onClick={() => void exports.mix()}><FileDown size={15} aria-hidden /> Exporter le mix</Button>
            <Button variant="outline" size="sm" disabled={exports.busy} onClick={() => void exports.stem("instrumental", "Instrumental")}>
              <FileDown size={15} aria-hidden /> Exporter l'instrumental
            </Button>
            {exports.message ? (
              <span role="status" className={cn("text-xs", exports.message.error ? "text-kalo-danger dark:text-kalo-dark-danger" : muted)}>{exports.message.text}</span>
            ) : null}
          </div>
        </>
      ) : null}
    </Card>
  );
}

import { useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { PageHeader } from "@/components/PageHeader";
import { StemJobsCard } from "./StemJobsCard";
import { StemMixerCard } from "./StemMixerCard";
import { StemModelCard } from "./StemModelCard";
import { StemStartCard } from "./StemStartCard";
import { useStemJobs } from "./useStemJobs";
import { useStemModel } from "./useStemModel";

export function StemStudioPage() {
  const model = useStemModel();
  const jobs = useStemJobs();
  const [selected, setSelected] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const running = jobs.jobs.some((job) => job.status === "running");
  const open = jobs.jobs.find((job) => job.id === selected && job.status === "done") ?? null;
  return (
    <div>
      <PageHeader eyebrow="Intelligence artificielle locale" title="Stem Studio" description="Séparez voix, batterie, basse et accompagnement, puis remixez-les sans toucher au fichier d'origine." />
      <div className="grid gap-4 xl:grid-cols-2">
        <StemModelCard model={model} />
        <StemStartCard modelReady={model.status?.installed === true} running={running || model.busy} onStart={(trackId) => void jobs.start(trackId)} />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <StemJobsCard jobs={jobs} selected={selected} onSelect={setSelected} onDelete={setPendingDelete} />
        {open ? <StemMixerCard key={open.id} job={open} /> : null}
      </div>
      <ConfirmModal
        open={pendingDelete !== null}
        title="Supprimer cette séparation ?"
        description="Les pistes générées par Kalo seront effacées. Le morceau d'origine n'est pas touché."
        confirmLabel="Supprimer"
        onConfirm={() => {
          if (pendingDelete === selected) setSelected(null);
          if (pendingDelete !== null) void jobs.remove(pendingDelete);
          setPendingDelete(null);
        }}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}

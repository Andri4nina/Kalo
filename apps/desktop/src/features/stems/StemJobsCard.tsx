import { Layers } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { StemJobRow } from "./StemJobRow";
import type { StemJobs } from "./useStemJobs";

interface Props {
  jobs: StemJobs;
  selected: number | null;
  onSelect: (jobId: number | null) => void;
  onDelete: (jobId: number) => void;
}

/** Historique des séparations ; supprimer libère l'espace des pistes générées. */
export function StemJobsCard({ jobs, selected, onSelect, onDelete }: Props) {
  return (
    <Card className="p-5">
      <h2 className="mb-3 font-display text-lg font-bold tracking-tight">Séparations</h2>
      {jobs.error ? <ErrorNotice message={jobs.error} /> : null}
      {jobs.loading ? <Spinner label="Chargement des séparations" /> : null}
      {!jobs.loading && jobs.jobs.length === 0 ? (
        <EmptyState icon={Layers} title="Aucune séparation" description="Les pistes générées apparaîtront ici, prêtes à mixer." />
      ) : null}
      <ul className="flex flex-col gap-1">
        {jobs.jobs.map((job) => (
          <StemJobRow
            key={job.id}
            job={job}
            progress={jobs.progress}
            selected={job.id === selected}
            onOpen={() => onSelect(job.id)}
            onCancel={() => void jobs.cancel()}
            onDelete={() => onDelete(job.id)}
          />
        ))}
      </ul>
    </Card>
  );
}

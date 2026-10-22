import { Download } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { DownloadRow } from "./DownloadRow";
import type { Downloads } from "./useDownloads";

/** Téléchargements en cours et terminés ; un téléchargement en pause reprend là où il s'est arrêté. */
export function DownloadsList({ downloads }: { downloads: Downloads }) {
  return (
    <Card className="p-5">
      <h2 className="mb-3 font-display text-lg font-bold tracking-tight">File de téléchargement</h2>
      {downloads.error ? <ErrorNotice message={downloads.error} /> : null}
      {downloads.loading ? <Spinner label="Chargement des téléchargements" /> : null}
      {!downloads.loading && downloads.entries.length === 0 ? (
        <EmptyState icon={Download} title="Aucun téléchargement" description="Les fichiers téléchargés apparaissent ici, puis dans la bibliothèque." />
      ) : null}
      <ul className="flex flex-col gap-2">
        {downloads.entries.map((entry) => (
          <DownloadRow
            key={entry.id}
            entry={entry}
            live={downloads.progress[entry.id]}
            onPause={() => void downloads.pause(entry.id)}
            onResume={() => void downloads.resume(entry.id)}
            onCancel={() => void downloads.cancel(entry.id)}
            onRemove={() => void downloads.remove(entry.id)}
          />
        ))}
      </ul>
    </Card>
  );
}

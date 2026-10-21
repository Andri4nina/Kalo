import { Copy } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { listDuplicates } from "@/lib/api/library";
import { useAsync } from "@/lib/useAsync";
import { useLibraryVersion } from "@/features/library/library.store";
import { DuplicateGroupCard } from "./DuplicateGroupCard";

export function DuplicatesPage() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error } = useAsync(listDuplicates, [version]);
  return (
    <div>
      <PageHeader
        eyebrow="Entretien"
        title="Doublons"
        description="Morceaux partageant le même titre, artiste et une durée proche. Aucun fichier n'est supprimé automatiquement."
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Recherche des doublons" /> : null}
      {data && data.length === 0 ? (
        <EmptyState icon={Copy} title="Aucun doublon détecté" description="Les doublons sont repérés par titre, artiste et durée. Modifiez les métadonnées si deux fichiers distincts sont signalés à tort." />
      ) : null}
      {data && data.length > 0 ? (
        <div className="grid gap-3 xl:grid-cols-2">
          {data.map((group) => <DuplicateGroupCard key={group.key} group={group} />)}
        </div>
      ) : null}
    </div>
  );
}
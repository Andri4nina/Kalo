import { Copy } from "lucide-react";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { listDuplicates } from "@/lib/api/library";
import { useAsync } from "@/lib/useAsync";
import { DuplicateGroups } from "./DuplicateGroups";

/** Doublons probables : même titre, même artiste, durée proche. */
export function MetadataDuplicates() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error } = useAsync(listDuplicates, [version]);
  if (error) return <ErrorNotice message={error} />;
  if (loading && !data) return <Spinner label="Recherche des doublons" />;
  return (
    <DuplicateGroups
      groups={data ?? []}
      emptyIcon={Copy}
      emptyTitle="Aucun doublon probable"
      emptyDescription="Les doublons sont repérés par titre, artiste et durée. Modifiez les métadonnées si deux fichiers distincts sont signalés à tort."
    />
  );
}

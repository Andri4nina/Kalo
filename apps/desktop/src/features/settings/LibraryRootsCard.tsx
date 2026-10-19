import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { listRoots } from "@/lib/api/library";
import { useAsync } from "@/lib/useAsync";
import { RemoveRootDialog } from "./RemoveRootDialog";
import { RootsCardHeader } from "./RootsCardHeader";
import { RootsList } from "./RootsList";
import { ScanStatus } from "./ScanStatus";
import { useRootRemoval } from "./useRootRemoval";
import { useScan } from "./useScan";

export function LibraryRootsCard() {
  const version = useLibraryVersion((state) => state.version);
  const bump = useLibraryVersion((state) => state.bump);
  const { data, loading, error } = useAsync(listRoots, [version]);
  const scan = useScan(bump);
  const removal = useRootRemoval(bump);
  const scanning = scan.scanningId !== null;

  return (
    <Card className="p-5 xl:col-span-2">
      <RootsCardHeader
        roots={data}
        scanning={scanning}
        onAdded={(root) => { bump(); void scan.start(root.id); }}
        onScanAll={() => void scan.startAll((data ?? []).map((root) => root.id))}
      />
      {error ? <ErrorNotice message={error} /> : null}
      {removal.error ? <ErrorNotice message={removal.error} /> : null}
      {loading && !data ? <Spinner label="Chargement des dossiers" /> : null}
      <RootsList roots={data} scanningId={scan.scanningId} locked={scanning} onScan={(id) => void scan.start(id)} onRemove={removal.ask} />
      <ScanStatus scanning={scanning} progress={scan.progress} summary={scan.summary} error={scan.error} />
      <RemoveRootDialog target={removal.target} busy={removal.busy} scanning={scanning} onConfirm={() => void removal.remove()} onClose={removal.cancel} />
    </Card>
  );
}

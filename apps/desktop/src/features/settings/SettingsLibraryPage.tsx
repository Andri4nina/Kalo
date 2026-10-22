import { PageHeader } from "@/components/PageHeader";
import { LibraryRootsCard } from "./LibraryRootsCard";
import { WatchFoldersCard } from "./WatchFoldersCard";

export function SettingsLibraryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Bibliothèque"
        description="Dossiers de musique, analyse locale et mise à jour automatique."
      />
      <LibraryRootsCard />
      <WatchFoldersCard />
    </div>
  );
}

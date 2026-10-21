import { PageHeader } from "@/components/PageHeader";
import { LibraryRootsCard } from "./LibraryRootsCard";

export function SettingsLibraryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Bibliothèque"
        description="Dossiers surveillés et analyse locale."
      />
      <LibraryRootsCard />
    </div>
  );
}

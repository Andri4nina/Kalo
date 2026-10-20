import { PageHeader } from "@/components/PageHeader";
import { AboutCard } from "./AboutCard";
import { AppearanceCard } from "./AppearanceCard";
import { DataCard } from "./DataCard";
import { LibraryRootsCard } from "./LibraryRootsCard";

export function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Paramètres"
        description="Bibliothèque, apparence et informations sur l'application."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <LibraryRootsCard />
        <div className="flex flex-col gap-4">
          <AppearanceCard />
          <DataCard />
          <AboutCard />
        </div>
      </div>
    </div>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { AboutCard } from "./AboutCard";
import { AppearanceCard } from "./AppearanceCard";
import { DataCard } from "./DataCard";
import { DiagnosticsCard } from "./DiagnosticsCard";
import { LibraryRootsCard } from "./LibraryRootsCard";
import { PlaybackCard } from "./PlaybackCard";
import { PrivacyCard } from "./PrivacyCard";

export function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Paramètres"
        description="Bibliothèque, apparence, confidentialité et diagnostics."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <LibraryRootsCard />
        <div className="flex flex-col gap-4">
          <AppearanceCard />
          <PlaybackCard />
          <PrivacyCard />
          <DataCard />
          <DiagnosticsCard />
          <AboutCard />
        </div>
      </div>
    </div>
  );
}

import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "./DataCard";
import { DiagnosticsCard } from "./DiagnosticsCard";
import { PrivacyCard } from "./PrivacyCard";

export function SettingsPrivacyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Confidentialité et données"
        description="Engagements locaux, sauvegarde et diagnostics."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <PrivacyCard />
        <DataCard />
        <DiagnosticsCard />
      </div>
    </div>
  );
}

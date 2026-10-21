import { PageHeader } from "@/components/PageHeader";
import { AboutCard } from "./AboutCard";
import { AccessibilityCard } from "./AccessibilityCard";
import { AppearanceCard } from "./AppearanceCard";
import { PlaybackCard } from "./PlaybackCard";

export function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Paramètres"
        description="Apparence, lecture et accessibilité."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <AppearanceCard />
        <PlaybackCard />
        <AccessibilityCard />
        <AboutCard />
      </div>
    </div>
  );
}

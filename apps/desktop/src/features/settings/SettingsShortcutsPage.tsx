import { PageHeader } from "@/components/PageHeader";
import { ShortcutCard } from "./ShortcutCard";

export function SettingsShortcutsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Préférences"
        title="Raccourcis"
        description="Personnalisez les commandes clavier du lecteur."
      />
      <div className="max-w-2xl">
        <ShortcutCard />
      </div>
    </div>
  );
}

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { chipOff, chipOn, focus } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { ContentDuplicates } from "./ContentDuplicates";
import { MetadataDuplicates } from "./MetadataDuplicates";

const tabs = [
  { id: "metadata", label: "Probables" },
  { id: "content", label: "Identiques" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function DuplicatesPage() {
  const [tab, setTab] = useState<Tab>("metadata");
  return (
    <div>
      <PageHeader
        eyebrow="Entretien"
        title="Doublons"
        description="Probables : même titre, artiste et durée proche. Identiques : même contenu. Aucun fichier n'est supprimé automatiquement."
      />
      <div role="tablist" aria-label="Type de doublons" className="mb-5 flex gap-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              focus,
              "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
              tab === id
                ? chipOn
                : chipOff,
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tab === "metadata" ? <MetadataDuplicates /> : <ContentDuplicates />}</div>
    </div>
  );
}

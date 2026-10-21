import { PageHeader } from "@/components/PageHeader";
import { CompareCard } from "./CompareCard";
import { CustomPresetsCard } from "./CustomPresetsCard";
import { EffectsCard } from "./EffectsCard";
import { EqCard } from "./EqCard";
import { PreampCard } from "./PreampCard";
import { PresetPicker } from "./PresetPicker";
import { StudioInfoCard } from "./StudioInfoCard";

export function StudioPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Traitement"
        title="Studio audio"
        description="Façonnez le son à la lecture, sans jamais modifier vos fichiers."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <EqCard />
        <div className="flex flex-col gap-4">
          <PreampCard />
          <EffectsCard />
          <CompareCard />
        </div>
        <PresetPicker />
        <CustomPresetsCard />
        <StudioInfoCard />
      </div>
    </div>
  );
}

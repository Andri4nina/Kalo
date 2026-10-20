import { Mic2, RotateCw } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { IconButton } from "@/components/IconButton";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { useArtists } from "@/features/browse/useBrowseLists";
import { ArtistsGrid } from "./ArtistsGrid";

export function ArtistsPage() {
  const { data, loading, error, reload } = useArtists();
  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title="Artistes"
        description="Parcourez votre bibliothèque par interprète."
        actions={<IconButton icon={RotateCw} label="Actualiser" onClick={reload} />}
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des artistes" /> : null}
      {data && data.length === 0 ? (
        <Card>
          <EmptyState
            icon={Mic2}
            title="Aucun artiste"
            description="Ajoutez un dossier musical puis lancez une analyse dans les paramètres pour voir apparaître vos artistes."
          />
        </Card>
      ) : null}
      {data && data.length > 0 ? <ArtistsGrid artists={data} /> : null}
    </div>
  );
}

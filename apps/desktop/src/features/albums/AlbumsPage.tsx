import { Disc3, RotateCw } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { IconButton } from "@/components/IconButton";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { useAlbums } from "@/features/browse/useBrowseLists";
import { AlbumsGrid } from "./AlbumsGrid";

export function AlbumsPage() {
  const { data, loading, error, reload } = useAlbums();
  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title="Albums"
        description="Toutes les pochettes et leurs morceaux."
        actions={<IconButton icon={RotateCw} label="Actualiser" onClick={reload} />}
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des albums" /> : null}
      {data && data.length === 0 ? (
        <Card>
          <EmptyState
            icon={Disc3}
            title="Aucun album"
            description="Ajoutez un dossier musical puis lancez une analyse dans les paramètres pour voir apparaître vos albums."
          />
        </Card>
      ) : null}
      {data && data.length > 0 ? <AlbumsGrid albums={data} /> : null}
    </div>
  );
}

import { useDeferredValue, useState } from "react";
import { Disc3, RotateCw } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { IconButton } from "@/components/IconButton";
import { PageHeader } from "@/components/PageHeader";
import { SearchField } from "@/components/SearchField";
import { Spinner } from "@/components/Spinner";
import { useAlbums } from "@/features/browse/useBrowseLists";
import { AlbumsGrid } from "./AlbumsGrid";

export function AlbumsPage() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { data, loading, error, reload } = useAlbums(deferredSearch);
  const filtered = search.trim().length > 0;
  const emptyText = filtered
    ? "Aucun album ne correspond à cette recherche."
    : "Ajoutez un dossier puis lancez une analyse pour voir vos albums.";
  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title="Albums"
        description="Toutes les pochettes et leurs morceaux."
        actions={<IconButton icon={RotateCw} label="Actualiser" onClick={reload} />}
      />
      <SearchField
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un album ou un artiste..."
        label="Rechercher un album"
        className="mb-4"
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des albums" /> : null}
      {data && data.length === 0 ? (
        <Card>
          <EmptyState
            icon={Disc3}
            title={filtered ? "Aucun résultat" : "Aucun album"}
            description={emptyText}
          />
        </Card>
      ) : null}
      {data && data.length > 0 ? <AlbumsGrid albums={data} /> : null}
    </div>
  );
}

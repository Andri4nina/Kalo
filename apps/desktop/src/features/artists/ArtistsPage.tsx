import { useDeferredValue, useState } from "react";
import { Mic2, RotateCw } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { IconButton } from "@/components/IconButton";
import { PageHeader } from "@/components/PageHeader";
import { SearchField } from "@/components/SearchField";
import { Spinner } from "@/components/Spinner";
import { useArtists } from "@/features/browse/useBrowseLists";
import { ArtistsGrid } from "./ArtistsGrid";

export function ArtistsPage() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { data, loading, error, reload } = useArtists(deferredSearch);
  const filtered = search.trim().length > 0;
  const emptyText = filtered
    ? "Aucun artiste ne correspond à cette recherche."
    : "Ajoutez un dossier puis lancez une analyse pour voir vos artistes.";
  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title="Artistes"
        description="Parcourez votre bibliothèque par interprète."
        actions={<IconButton icon={RotateCw} label="Actualiser" onClick={reload} />}
      />
      <SearchField
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un artiste..."
        label="Rechercher un artiste"
        className="mb-4"
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des artistes" /> : null}
      {data && data.length === 0 ? (
        <Card>
          <EmptyState
            icon={Mic2}
            title={filtered ? "Aucun résultat" : "Aucun artiste"}
            description={emptyText}
          />
        </Card>
      ) : null}
      {data && data.length > 0 ? <ArtistsGrid artists={data} /> : null}
    </div>
  );
}

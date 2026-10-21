import { useDeferredValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import type { TrackSort } from "@/types";
import { toTrackFilters } from "./filters";
import { LibraryBatchBar } from "./LibraryBatchBar";
import { DEFAULT_FILTERS, LibraryFilters } from "./LibraryFilters";
import { LibraryResults } from "./LibraryResults";
import { LibraryToolbar } from "./LibraryToolbar";
import { useTrackPage } from "./useTrackPage";
import { useTrackSelection } from "./useTrackSelection";
export function LibraryPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TrackSort>("added");
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const deferredSearch = useDeferredValue(search);
  const selection = useTrackSelection();
  const { data, loading, error, reload } = useTrackPage({ search: deferredSearch, sort, page, filters: toTrackFilters(filters) });
  useEffect(() => {
    if (data && data.items.length === 0 && page > 0) setPage(0);
  }, [data, page]);
  const total = data?.total ?? 0;
  const selectedTracks = (data?.items ?? []).filter((track) => selection.selected.has(track.id));
  const reset = () => { setPage(0); selection.clear(); };
  return (
    <div>
      <PageHeader
        eyebrow="Collection"
        title="Bibliothèque"
        description="Tous les morceaux indexés sur cet appareil."
        actions={<Link to="/settings"><Button variant="subtle" size="sm">Gérer les dossiers</Button></Link>}
      />
      <LibraryToolbar
        search={search}
        sort={sort}
        total={total}
        onSearch={(value) => { setSearch(value); reset(); }}
        onSort={(value) => { setSort(value); reset(); }}
        onRefresh={reload}
      />
      <LibraryFilters value={filters} onChange={(value) => { setFilters(value); reset(); }} />
      {selectedTracks.length > 0 ? <LibraryBatchBar tracks={selectedTracks} onClear={selection.clear} /> : null}
      <LibraryResults data={data} loading={loading} error={error} search={search} page={page} total={total} selection={selection} onPage={(next) => { setPage(next); selection.clear(); }} />
    </div>
  );
}

import { useDeferredValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import type { TrackSort } from "@/types";
import { LibraryEmpty } from "./LibraryEmpty";
import { LibraryPagination } from "./LibraryPagination";
import { LibraryToolbar } from "./LibraryToolbar";
import { TrackTable } from "./TrackTable";
import { useTrackPage } from "./useTrackPage";

export function LibraryPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TrackSort>("added");
  const [page, setPage] = useState(0);
  const deferredSearch = useDeferredValue(search);
  const { data, loading, error, reload } = useTrackPage({ search: deferredSearch, sort, page });

  useEffect(() => {
    if (data && data.items.length === 0 && page > 0) setPage(0);
  }, [data, page]);

  const total = data?.total ?? 0;
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
        onSearch={(value) => { setSearch(value); setPage(0); }}
        onSort={(value) => { setSort(value); setPage(0); }}
        onRefresh={reload}
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement de la bibliothèque" /> : null}
      {data && data.items.length === 0 ? <LibraryEmpty searching={search.length > 0} /> : null}
      {data && data.items.length > 0 ? <TrackTable tracks={data.items} /> : null}
      <LibraryPagination page={page} total={total} onChange={setPage} />
    </div>
  );
}

import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import type { TrackPage } from "@/types";
import { LibraryEmpty } from "./LibraryEmpty";
import { LibraryPagination } from "./LibraryPagination";
import { TrackTable } from "./TrackTable";
import type { TrackSelection } from "./useTrackSelection";

interface Props {
  data: TrackPage | undefined;
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
  total: number;
  selection: TrackSelection;
  onPage: (page: number) => void;
}

export function LibraryResults({ data, loading, error, search, page, total, selection, onPage }: Props) {
  return (
    <>
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement de la bibliothèque" /> : null}
      {data && data.items.length === 0 ? <LibraryEmpty searching={search.length > 0} /> : null}
      {data && data.items.length > 0 ? <TrackTable tracks={data.items} selection={selection} /> : null}
      <LibraryPagination page={page} total={total} onChange={onPage} />
    </>
  );
}

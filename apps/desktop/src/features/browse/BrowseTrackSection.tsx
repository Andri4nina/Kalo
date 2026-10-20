import { Music2 } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { LibraryPagination } from "@/features/library/LibraryPagination";
import { TrackTable } from "@/features/library/TrackTable";
import type { AsyncState } from "@/lib/useAsync";
import type { TrackPage } from "@/types";

interface Props {
  state: AsyncState<TrackPage>;
  page: number;
  onPage: (page: number) => void;
}

export function BrowseTrackSection({ state, page, onPage }: Props) {
  return (
    <>
      {state.error ? <ErrorNotice message={state.error} /> : null}
      {state.loading && !state.data ? <Spinner label="Chargement des morceaux" /> : null}
      {state.data && state.data.items.length === 0 ? (
        <Card>
          <EmptyState
            icon={Music2}
            title="Aucun morceau"
            description="Les morceaux apparaîtront ici une fois la bibliothèque analysée."
          />
        </Card>
      ) : null}
      {state.data && state.data.items.length > 0 ? <TrackTable tracks={state.data.items} /> : null}
      <LibraryPagination page={page} total={state.data?.total ?? 0} onChange={onPage} />
    </>
  );
}

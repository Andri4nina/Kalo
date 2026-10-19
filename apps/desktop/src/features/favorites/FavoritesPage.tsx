import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { LibraryPagination } from "@/features/library/LibraryPagination";
import { TrackTable } from "@/features/library/TrackTable";
import { useTrackPage } from "@/features/library/useTrackPage";

export function FavoritesPage() {
  const [page, setPage] = useState(0);
  const { data, loading, error } = useTrackPage({ search: "", sort: "added", page, favoritesOnly: true });
  return (
    <div>
      <PageHeader eyebrow="Collection" title="Favoris" description="Les morceaux que vous avez marqués d'un cœur." />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement des favoris" /> : null}
      {data && data.items.length === 0 ? (
        <Card>
          <EmptyState
            icon={Heart}
            title="Aucun favori"
            description="Utilisez le cœur sur un morceau de la bibliothèque ou dans le lecteur pour le retrouver ici."
            action={<Link to="/library"><Button size="sm" variant="subtle">Parcourir la bibliothèque</Button></Link>}
          />
        </Card>
      ) : null}
      {data && data.items.length > 0 ? <TrackTable tracks={data.items} /> : null}
      <LibraryPagination page={page} total={data?.total ?? 0} onChange={setPage} />
    </div>
  );
}

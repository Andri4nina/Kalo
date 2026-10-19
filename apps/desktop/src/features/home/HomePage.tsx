import { Album, Heart, ListMusic, Users } from "lucide-react";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { getRecent, getStats } from "@/lib/api/library";
import { listRoots } from "@/lib/api/library";
import { useAsync } from "@/lib/useAsync";
import { BentoHero } from "./BentoHero";
import { QueueOverviewCard } from "./QueueOverviewCard";
import { RecentTracksCard } from "./RecentTracksCard";
import { RootsCard } from "./RootsCard";
import { StatTile } from "./StatTile";

export function HomePage() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error } = useAsync(
    async () => {
      const [stats, recent, roots] = await Promise.all([getStats(), getRecent(5), listRoots()]);
      return { stats, recent, roots };
    },
    [version],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Vue d'ensemble"
        title="Tout votre son, en local."
        description="Kalo lit vos fichiers, respecte vos dossiers et fonctionne hors ligne."
      />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement de votre musique" /> : null}
      {data ? (
        <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <BentoHero stats={data.stats} />
          <StatTile icon={Album} label="Albums" value={data.stats.albums.toLocaleString("fr-FR")} detail="Référencés localement" />
          <StatTile icon={Users} label="Artistes" value={data.stats.artists.toLocaleString("fr-FR")} detail="Dans votre collection" />
          <StatTile icon={Heart} label="Favoris" value={data.stats.favorites.toLocaleString("fr-FR")} detail="Morceaux aimés" />
          <StatTile icon={ListMusic} label="Playlists" value={data.stats.playlists.toLocaleString("fr-FR")} detail="Collections créées" />
          <RootsCard roots={data.roots} />
          <RecentTracksCard tracks={data.recent.items} />
          <QueueOverviewCard />
        </div>
      ) : null}
    </div>
  );
}

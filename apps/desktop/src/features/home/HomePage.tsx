import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { getRecent, getStats, listRoots } from "@/lib/api/library";
import { useAsync } from "@/lib/useAsync";
import { HomeHeader } from "./HomeHeader";
import { HomeShortcuts } from "./HomeShortcuts";
import { QueueOverviewCard } from "./QueueOverviewCard";
import { RecentShelf } from "./RecentShelf";
import { RootsCard } from "./RootsCard";

export function HomePage() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error } = useAsync(
    async () => {
      const [stats, recent, roots] = await Promise.all([getStats(), getRecent(6), listRoots()]);
      return { stats, recent, roots };
    },
    [version],
  );

  return (
    <div>
      <HomeHeader stats={data?.stats} />
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Chargement de votre musique" /> : null}
      {data ? (
        <>
          <HomeShortcuts stats={data.stats} />
          <RecentShelf tracks={data.recent.items} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RootsCard roots={data.roots} />
            <QueueOverviewCard />
          </div>
        </>
      ) : null}
    </div>
  );
}

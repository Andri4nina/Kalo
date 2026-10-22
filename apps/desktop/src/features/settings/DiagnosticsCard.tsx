import { Copy } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { useLibraryVersion } from "@/features/library/library.store";
import { getStats } from "@/lib/api/library";
import { formatLongDuration } from "@/lib/format";
import { useAsync } from "@/lib/useAsync";
import { useState } from "react";

export function DiagnosticsCard() {
  const version = useLibraryVersion((state) => state.version);
  const { data, loading, error } = useAsync(getStats, [version]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!data) return;
    const text = `Kalo 0.1.0\nMorceaux: ${data.tracks}\nAlbums: ${data.albums}\nArtistes: ${data.artists}\nFavoris: ${data.favorites}\nPlaylists: ${data.playlists}\nManquants: ${data.missing}\nDurée: ${formatLongDuration(data.totalDurationMs)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="p-5">
      <h2 className="font-display font-bold tracking-tight text-lg">Diagnostics</h2>
      <p className="mt-1 text-xs text-kalo-muted dark:text-kalo-dark-muted">État de l'index local, sans collecte réseau.</p>
      {error ? <ErrorNotice message={error} /> : null}
      {loading && !data ? <Spinner label="Lecture des diagnostics" /> : null}
      {data ? (
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div><dt className="text-kalo-muted dark:text-kalo-dark-muted">Morceaux</dt><dd className="font-medium tabular-nums">{data.tracks}</dd></div>
          <div><dt className="text-kalo-muted dark:text-kalo-dark-muted">Manquants</dt><dd className="font-medium tabular-nums">{data.missing}</dd></div>
          <div><dt className="text-kalo-muted dark:text-kalo-dark-muted">Albums</dt><dd className="font-medium tabular-nums">{data.albums}</dd></div>
          <div><dt className="text-kalo-muted dark:text-kalo-dark-muted">Artistes</dt><dd className="font-medium tabular-nums">{data.artists}</dd></div>
          <div className="col-span-2"><dt className="text-kalo-muted dark:text-kalo-dark-muted">Durée indexée</dt><dd className="font-medium">{formatLongDuration(data.totalDurationMs)}</dd></div>
        </dl>
      ) : null}
      <div className="mt-4 flex items-center gap-2">
        <Button size="sm" variant="subtle" disabled={!data} onClick={() => void copy()}><Copy size={15} /> Copier</Button>
        {copied ? <span role="status" className="text-xs text-kalo-success dark:text-kalo-dark-success">Copié</span> : null}
      </div>
    </Card>
  );
}
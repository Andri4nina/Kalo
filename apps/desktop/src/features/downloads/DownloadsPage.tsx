import { useState } from "react";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PageHeader } from "@/components/PageHeader";
import { chipOff, chipOn, focus } from "@/design/tokens";
import { listRoots } from "@/lib/api/library";
import { cn } from "@/lib/cn";
import { useAsync } from "@/lib/useAsync";
import { ArchiveSearch } from "./ArchiveSearch";
import { DirectLinkForm } from "./DirectLinkForm";
import { DownloadsList } from "./DownloadsList";
import { useDownloads } from "./useDownloads";

const TABS = [["direct", "Lien direct"], ["archive", "Internet Archive"]] as const;

export function DownloadsPage() {
  const roots = useAsync(listRoots, []);
  const downloads = useDownloads();
  const [tab, setTab] = useState<(typeof TABS)[number][0]>("direct");
  const ready = (roots.data?.length ?? 0) > 0;
  return (
    <div>
      <PageHeader eyebrow="Sources autorisées" title="Téléchargements" description="Fichiers que vous avez le droit de télécharger, vérifiés puis rangés dans votre bibliothèque pour une écoute hors ligne." />
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-5">
          <div role="tablist" aria-label="Source" className="mb-4 flex gap-2">
            {TABS.map(([id, label]) => (
              <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={cn(focus, "rounded-full px-3 py-1.5 text-sm font-semibold", tab === id ? chipOn : chipOff)}>{label}</button>
            ))}
          </div>
          {!ready && !roots.loading ? <ErrorNotice message="Ajoutez d'abord un dossier de bibliothèque dans les paramètres." /> : null}
          {ready && roots.data && tab === "direct" ? <DirectLinkForm roots={roots.data} onStart={(request) => void downloads.start(request)} /> : null}
          {ready && roots.data && tab === "archive" ? <ArchiveSearch roots={roots.data} onStart={(request) => void downloads.start(request)} /> : null}
        </Card>
        <DownloadsList downloads={downloads} />
      </div>
    </div>
  );
}

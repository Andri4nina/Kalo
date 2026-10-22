import { useState } from "react";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { DownloadRequest, LibraryRoot } from "@/types";
import { ArchiveItemRow } from "./ArchiveItemRow";
import { ArchiveQueryForm } from "./ArchiveQueryForm";
import { RightsCheckbox } from "./RightsCheckbox";
import { RootSelect } from "./RootSelect";
import { useArchive } from "./useArchive";

interface Props {
  roots: LibraryRoot[];
  onStart: (request: DownloadRequest) => void;
}

/** Œuvres sous Creative Commons ou domaine public de l'Internet Archive. */
export function ArchiveSearch({ roots, onStart }: Props) {
  const archive = useArchive();
  const [rootId, setRootId] = useState(roots[0]?.id ?? 0);
  const [rights, setRights] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <ArchiveQueryForm busy={archive.busy} onSearch={(query) => void archive.search(query)} />
      <p className={cn("text-xs", muted)}>Seules les œuvres audio sous licence Creative Commons ou dans le domaine public sont proposées ; vérifiez la licence de chacune.</p>
      <RootSelect roots={roots} value={rootId} onChange={setRootId} />
      <RightsCheckbox checked={rights} onChange={setRights} />
      {archive.error ? <ErrorNotice message={archive.error} /> : null}
      {archive.busy ? <Spinner label="Interrogation de l'Internet Archive" /> : null}
      {archive.items && archive.items.length === 0 ? <p className={cn("text-sm", muted)}>Aucune œuvre libre trouvée.</p> : null}
      <ul className="flex flex-col gap-2">
        {(archive.items ?? []).map((item) => (
          <ArchiveItemRow
            key={item.id}
            item={item}
            files={archive.files[item.id]}
            canDownload={rights && rootId > 0}
            onOpen={() => void archive.open(item.id)}
            onDownload={(file) => onStart({ url: file.url, rootId, provider: "archive", fileName: file.name.split("/").pop() ?? file.name, license: item.license, md5: file.md5 })}
          />
        ))}
      </ul>
    </div>
  );
}

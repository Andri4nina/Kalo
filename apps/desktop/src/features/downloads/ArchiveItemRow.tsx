import { ChevronDown, Download } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/IconButton";
import { focus, muted } from "@/design/tokens";
import { formatBytes } from "@/lib/bytes";
import { cn } from "@/lib/cn";
import type { RemoteFile, RemoteItem } from "@/types";

interface Props {
  item: RemoteItem;
  files: RemoteFile[] | undefined;
  canDownload: boolean;
  onOpen: () => void;
  onDownload: (file: RemoteFile) => void;
}

/** Œuvre de l'Archive avec sa licence ; dépliée, ses fichiers audio. */
export function ArchiveItemRow({ item, files, canDownload, onOpen, onDownload }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-md bg-kalo-raised/60 px-3 py-2 dark:bg-kalo-dark-raised/60">
      <button type="button" aria-expanded={open} onClick={() => { setOpen(!open); onOpen(); }} className={cn(focus, "flex w-full items-center gap-3 rounded text-left")}>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{item.title}</span>
          <span className={cn("block truncate text-xs", muted)}>{item.creator ?? "Auteur inconnu"} · {item.license}</span>
        </span>
        <ChevronDown size={16} aria-hidden className={cn("shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && files ? (
        <ul className="mt-2 flex flex-col gap-1">
          {files.length === 0 ? <li className={cn("text-xs", muted)}>Aucun fichier audio.</li> : null}
          {files.map((file) => (
            <li key={file.url} className="flex items-center gap-2 text-xs">
              <span className="min-w-0 flex-1 truncate" title={file.name}>{file.name}</span>
              <span className={cn("shrink-0", muted)}>{file.format}{file.size ? ` · ${formatBytes(file.size)}` : ""}</span>
              <IconButton icon={Download} label={`Télécharger ${file.name}`} size="sm" disabled={!canDownload} onClick={() => onDownload(file)} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

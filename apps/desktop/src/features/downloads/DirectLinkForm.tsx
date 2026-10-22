import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import type { DownloadRequest, LibraryRoot } from "@/types";
import { RightsCheckbox } from "./RightsCheckbox";
import { RootSelect } from "./RootSelect";

interface Props {
  roots: LibraryRoot[];
  onStart: (request: DownloadRequest) => void;
}

/** Lien direct vers un fichier audio que l'utilisateur a le droit de télécharger. */
export function DirectLinkForm({ roots, onStart }: Props) {
  const [url, setUrl] = useState("");
  const [rootId, setRootId] = useState(roots[0]?.id ?? 0);
  const [rights, setRights] = useState(false);
  const valid = /^https?:\/\/\S+$/i.test(url.trim());
  return (
    <div className="flex flex-col gap-3">
      <TextField
        label="Lien du fichier audio"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://exemple.org/ma-chanson.mp3"
        hint="MP3, FLAC, M4A, AAC, OGG, Opus ou WAV. Le fichier est vérifié puis rangé dans Artiste/Titre."
      />
      <RootSelect roots={roots} value={rootId} onChange={setRootId} />
      <RightsCheckbox checked={rights} onChange={setRights} />
      <div>
        <Button
          size="sm"
          disabled={!valid || !rights || !rootId}
          onClick={() => {
            onStart({ url: url.trim(), rootId, provider: "direct" });
            setUrl("");
          }}
        >
          <Download size={15} aria-hidden /> Télécharger
        </Button>
      </div>
    </div>
  );
}

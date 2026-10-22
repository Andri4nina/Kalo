import { input } from "@/design/tokens";
import type { LibraryRoot } from "@/types";

interface Props {
  roots: LibraryRoot[];
  value: number;
  onChange: (rootId: number) => void;
}

/** Dossier de bibliothèque où ranger un fichier (Artiste/Titre). */
export function RootSelect({ roots, value, onChange }: Props) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium">
      Ranger dans
      <select className={input} value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {roots.map((root) => (
          <option key={root.id} value={root.id}>{root.path}</option>
        ))}
      </select>
    </label>
  );
}

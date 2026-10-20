import { RotateCw } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { SearchField } from "@/components/SearchField";
import { SortSelect } from "./SortSelect";
import type { TrackSort } from "@/types";

interface Props {
  search: string;
  sort: TrackSort;
  total: number;
  onSearch: (value: string) => void;
  onSort: (value: TrackSort) => void;
  onRefresh: () => void;
}

export function LibraryToolbar(props: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <SearchField
        value={props.search}
        onChange={props.onSearch}
        placeholder="Rechercher un titre, un artiste, un album..."
        label="Rechercher dans la bibliothèque"
      />
      <SortSelect value={props.sort} onChange={props.onSort} />
      <span className="hidden text-xs text-kalo-muted dark:text-kalo-dark-muted sm:inline">
        {props.total.toLocaleString("fr-FR")} morceaux
      </span>
      <IconButton icon={RotateCw} label="Actualiser" onClick={props.onRefresh} />
    </div>
  );
}

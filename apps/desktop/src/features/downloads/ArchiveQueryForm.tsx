import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { SearchField } from "@/components/SearchField";

interface Props {
  busy: boolean;
  onSearch: (query: string) => void;
}

/** Champ de recherche de l'Internet Archive. */
export function ArchiveQueryForm({ busy, onSearch }: Props) {
  const [query, setQuery] = useState("");
  return (
    <form
      className="flex flex-wrap gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query);
      }}
    >
      <SearchField value={query} onChange={setQuery} placeholder="Artiste, titre, genre…" label="Rechercher dans l'Internet Archive" />
      <Button type="submit" size="sm" variant="subtle" disabled={!query.trim() || busy}>
        <Search size={14} aria-hidden /> Rechercher
      </Button>
    </form>
  );
}

import { Plus } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { TextField } from "@/components/TextField";
import { useCreatePlaylist } from "./useCreatePlaylist";

export function CreatePlaylistForm() {
  const { name, setName, busy, error, submit } = useCreatePlaylist();
  return (
    <Card className="mb-6 p-4">
      {error ? <ErrorNotice message={error} /> : null}
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-56 flex-1">
          <TextField
            label="Créer une playlist"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Soirée, trajet, travail..."
            maxLength={80}
          />
        </div>
        <Button disabled={busy || name.trim().length === 0} onClick={() => void submit()}>
          <Plus size={16} /> Créer
        </Button>
      </div>
    </Card>
  );
}

import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useState } from "react";

interface Props {
  busy: boolean;
  onCreate: (name: string) => void;
}

export function CreatePlaylistInline({ busy, onCreate }: Props) {
  const [name, setName] = useState("");
  const submit = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  };
  return (
    <div className="mt-4 flex items-end gap-2">
      <div className="flex-1">
        <TextField
          label="Nouvelle playlist"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nom de la playlist"
          maxLength={80}
        />
      </div>
      <Button size="sm" disabled={busy || name.trim().length === 0} onClick={submit}>
        Créer
      </Button>
    </div>
  );
}

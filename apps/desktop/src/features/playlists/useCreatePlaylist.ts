import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { createPlaylist } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";

export function useCreatePlaylist() {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const submit = async () => {
    if (!name.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createPlaylist(name.trim());
      setName("");
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { name, setName, busy, error, submit };
}

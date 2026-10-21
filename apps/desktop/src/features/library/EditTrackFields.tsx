import { TextField } from "@/components/TextField";
import type { useEditTrack } from "./useEditTrack";

type Values = ReturnType<typeof useEditTrack>;

export function EditTrackFields({ values }: { values: Values }) {
  return (
    <div className="grid gap-3">
      <TextField label="Titre" value={values.title} onChange={(event) => values.setTitle(event.target.value)} maxLength={300} />
      <TextField label="Artiste" value={values.artist} onChange={(event) => values.setArtist(event.target.value)} maxLength={300} />
      <TextField label="Album" value={values.album} onChange={(event) => values.setAlbum(event.target.value)} maxLength={300} />
      <div className="grid grid-cols-2 gap-3">
        <TextField label="Genre" value={values.genre} onChange={(event) => values.setGenre(event.target.value)} maxLength={100} />
        <TextField label="Année" type="number" min={1000} max={9999} value={values.year} onChange={(event) => values.setYear(event.target.value)} />
      </div>
    </div>
  );
}
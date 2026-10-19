import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";

export function PlaylistMissing({ message }: { message: string }) {
  return (
    <div>
      <ErrorNotice message={message} />
      <Link to="/playlists">
        <Button variant="subtle" size="sm"><ArrowLeft size={15} /> Retour aux playlists</Button>
      </Link>
    </div>
  );
}

import { ListMusic } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";

export function PlaylistEmpty() {
  return (
    <Card>
      <EmptyState
        icon={ListMusic}
        title="Playlist vide"
        description="Ajoutez des morceaux depuis la bibliothèque avec le bouton playlist sur chaque ligne."
        action={<Link to="/library"><Button variant="subtle" size="sm">Parcourir la bibliothèque</Button></Link>}
      />
    </Card>
  );
}

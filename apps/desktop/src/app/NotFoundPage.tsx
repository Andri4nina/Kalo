import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/EmptyState";
import { Compass } from "lucide-react";
import { page } from "@/design/tokens";

export function NotFoundPage() {
  return (
    <div className={page}>
      <EmptyState
        icon={Compass}
        title="Page introuvable"
        description="Cette section de Kalo n'existe pas ou a été déplacée."
        action={
          <Link to="/">
            <Button variant="subtle" size="sm">Retour à l'accueil</Button>
          </Link>
        }
      />
    </div>
  );
}

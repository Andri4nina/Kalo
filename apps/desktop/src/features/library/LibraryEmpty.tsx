import { LibraryBig } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";

export function LibraryEmpty({ searching }: { searching: boolean }) {
  return (
    <Card>
      <EmptyState
        icon={LibraryBig}
        title={searching ? "Aucun résultat" : "Bibliothèque vide"}
        description={
          searching
            ? "Essayez un autre titre, artiste, album ou genre."
            : "Ajoutez un dossier musical pour indexer vos fichiers. Kalo ne déplace jamais vos originaux."
        }
        action={
          searching ? undefined : (
            <Link to="/settings"><Button size="sm">Ajouter un dossier</Button></Link>
          )
        }
      />
    </Card>
  );
}

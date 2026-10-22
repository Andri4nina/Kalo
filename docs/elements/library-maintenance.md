# Entretien de la bibliothèque : doublons exacts et import classé

## Doublons identiques (contenu)

| Fichier | Rôle |
| --- | --- |
| `crates/kalo-library/src/fingerprint.rs` | Passe d'empreintes, progression |
| `crates/kalo-library/src/fingerprint/hash.rs` | BLAKE3 en flux (blocs de 256 Kio) |
| `crates/kalo-database/src/tracks/fingerprint.rs` | Candidats et enregistrement des empreintes |
| `crates/kalo-database/src/tracks/content_duplicates.rs` | Groupes d'empreintes identiques |
| `crates/kalo-database/migrations/007_content_hash.sql` | `content_hash`, `hashed_mtime`, index |
| `commands/library/fingerprint.rs` | Commandes, événement `library:fingerprint-progress` |
| `features/duplicates/*` | Onglets « Probables » et « Identiques » |

- Seuls les fichiers dont la taille est partagée avec un autre morceau sont lus,
  en lecture seule.
- Une empreinte n'est valable que pour la date de modification où elle a été
  calculée : un fichier modifié est relu au passage suivant.
- La passe partage le verrou d'analyse : jamais en même temps qu'une analyse ou
  un import.

## Import de fichiers classés

| Fichier | Rôle |
| --- | --- |
| `crates/kalo-library/src/organize.rs` | Import : placement, bilan, indexation |
| `organize/place.rs` | Déjà dans la racine, déjà présent, ou copie |
| `organize/target.rs` | `<racine>/<Artiste>/<Titre>.<ext>` et nom libre `Titre (2)` |
| `organize/sanitize.rs` | Noms valides sous Windows, macOS et Linux |
| `organize/copy.rs` | Copie temporaire, comparaison BLAKE3, renommage |
| `crates/kalo-library/src/index.rs` | Indexation des seuls fichiers importés |
| `features/library/LibraryHeaderActions.tsx`, `ImportFilesModal.tsx` | Interface |

- La source est seulement lue : jamais déplacée, renommée ni supprimée.
- Un fichier existant n'est jamais remplacé : le nom reçoit un suffixe.
- Une copie dont l'empreinte diffère de la source est refusée ; seul le fichier
  temporaire de Kalo est alors effacé.
- Un fichier déjà situé dans la racine choisie est indexé sans copie.
- 500 fichiers au plus par import.

## Tests

`tests/fingerprint.rs`, `tests/import_files.rs`, `tests/import_rename.rs`,
`tests/organize.rs` (kalo-library) ; test de version du schéma (kalo-database).

## Limites

- Pas de proposition de suppression de la source après import : la règle 9 du
  projet interdit toute suppression de fichier audio par Kalo.
- Les clips vidéo (`<Artiste>/video/`) arriveront avec la lecture vidéo.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement (puces partagées `chipOn` / `chipOff`).
- [x] Fichiers de code sous 50 lignes.

# Surveillance des dossiers et sons non musicaux

## Surveillance

| Fichier | Rôle |
| --- | --- |
| `src-tauri/src/watch.rs` | Démarrage, arrêt, redémarrage quand les dossiers changent |
| `src-tauri/src/watch/worker.rs` | Regroupement des événements par dossier, 1,5 s de calme |
| `src-tauri/src/watch/flush.rs` | Application sous le verrou d'analyse, événement `library:changed` |
| `src-tauri/src/watch/roots.rs` | Dossiers existants à surveiller |
| `crates/kalo-library/src/changes.rs` | Application des changements d'un dossier |
| `crates/kalo-library/src/changes/plan.rs` | Classement des chemins, dossier propriétaire |
| `features/settings/useFolderWatch.ts`, `watch.store.ts`, `WatchFoldersCard.tsx` | Réglage et rafraîchissement |

Comportement :

- Fichier audio présent : réindexé. Fichier disparu : marqué introuvable, sa
  référence et ses playlists sont conservées.
- Dossier ajouté : ses fichiers audio sont indexés. Dossier disparu ou renommé :
  le dossier racine est réanalysé.
- Les copies temporaires de Kalo (`.kalo-part`) et les fichiers non audio sont
  ignorés.
- Si une analyse ou un import est en cours, les changements attendent la
  prochaine période calme.
- Le watcher redémarre après l'ajout ou le retrait d'un dossier, et après une
  restauration.

Dépendance : `notify` 8.2.0 (CC0-1.0). Sous Linux, le nombre de surveillances
inotify est limité par le système (`fs.inotify.max_user_watches`).

## Sons non musicaux

La migration 008 ajoute une colonne calculée `non_music` : durée de moins de
45 secondes, ou chemin contenant un dossier `ringtones`, `sonneries`,
`notifications`, `alarms`, `alarmes`, `recordings`, `enregistrements`,
`voice recorder` ou `dictaphone`. Le filtre « Type de son » de la bibliothèque
propose Tous les sons, Musique, ou Sons courts et sonneries. Sur ordinateur, rien
n'est masqué par défaut.

## Tests

`kalo-library/tests/changes.rs`, `kalo-database/tests/track_kind.rs`,
`features/settings/watch.store.test.ts`, `features/library/filters.test.ts`.

## Limites

- La surveillance n'a pas été éprouvée sur un vrai disque dans la fenêtre
  Tauri ; seuls la logique d'application et l'interface sont testées.
- L'heuristique peut classer à tort un morceau très court (intro, interlude).

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide de catégorie ou d'action uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement ; interrupteur factorisé (`SwitchRow`).
- [x] Fichiers de code sous 50 lignes.

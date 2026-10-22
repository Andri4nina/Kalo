# Playlists

Listes persistantes en SQLite, sans jamais copier ni modifier les fichiers audio.

## Fonctions

| Fonction | Où |
| --- | --- |
| Création, suppression confirmée | `PlaylistsPage`, `CreatePlaylistForm`, `usePlaylistDelete` |
| Nom, description (500 caractères), pochette | `PlaylistDetailsModal`, `usePlaylistDetailsForm`, `PlaylistCoverField`, `usePlaylistCover` |
| Duplication (nom « (copie) », description, pochette, ordre) | `usePlaylistDuplicate`, `kalo-database/src/playlists/duplicate.rs` |
| Recherche par nom ou description | `PlaylistsResults`, `playlist.search.ts` |
| Recherche dans une playlist | `PlaylistDetailPage`, `PlaylistTrackTable` |
| Ajout, retrait, réordonnancement, actions groupées | `PlaylistTrackTable`, `usePlaylistEditor`, `PlaylistBatchBar` |
| Import et export M3U | `M3uActions`, `usePlaylistM3u` |

## Règles

- Un morceau n'apparaît qu'une fois par playlist : un second ajout est ignoré.
- La duplication s'exécute dans une transaction ; le nom reste sous 80 caractères.
- La pochette choisie est copiée dans le cache Kalo par
  `commands/cover_image.rs`, partagé avec les pochettes de morceaux (12 Mo
  maximum, image décodable uniquement). Retirer la pochette n'efface aucun fichier.
- Pendant une recherche, le réordonnancement est désactivé et chaque ligne garde
  son numéro d'origine.
- La recherche ignore la casse et les accents.

## Tests

- Rust : `tests/playlist_details.rs` (description, pochette, nom de copie),
  `tests/playlist_duplicate.rs` (copie ordonnée, source intacte, fichiers intacts).
- Front : `playlist.search.test.ts`.

## Limites

- La pochette d'une playlist n'est pas générée à partir de ses morceaux.
- Pas de glisser-déposer : le réordonnancement passe par les boutons.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement, clair et sombre.
- [x] Fichiers de code sous 50 lignes.

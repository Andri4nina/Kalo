# En-tête de détail

Grand en-tête des pages Album, Artiste et Playlist : visuel, type, titre géant,
métadonnées, puis rangée d'actions ouverte par le bouton de lecture ambre.

## Composition

| Fichier | Rôle |
| --- | --- |
| `components/DetailHero.tsx` | Bloc d'en-tête sur aplat `accent-soft` |
| `features/albums/AlbumDetailHeader.tsx` | Pochette, artiste, année, lecture |
| `features/artists/ArtistDetailHeader.tsx` | Avatar, compteurs, lecture |
| `features/playlists/PlaylistDetailPage.tsx` | Visuel, compteur, actions |
| `features/playlists/PlaylistHeaderActions.tsx` | Lecture, renommer, import et export M3U |

## Choix

Spotify colore l'en-tête par un dégradé tiré de la pochette. Les dégradés sont
interdits : l'en-tête utilise un aplat `accent-soft` arrondi.

## Conformité règles d'or

- [x] Aucun dégradé (aplat à la place), aucun emoji.
- [x] Icônes Lucide d'action uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers sous 50 lignes.

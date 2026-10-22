# Cartes média et lecture de collection

Cartes verticales (pochette carrée, titre, sous-titre) pour les albums, artistes,
playlists et écoutes récentes, avec un bouton de lecture ambre révélé au survol.

## Composition

| Fichier | Rôle |
| --- | --- |
| `components/MediaCard.tsx` | Carte avec lien étendu et action secondaire |
| `components/PlayCircleButton.tsx` | Bouton rond de lecture (normal ou grand) |
| `components/media.styles.ts` | `reveal`, `stretched`, `playCircle` |
| `features/albums/AlbumCard.tsx` | Lit l'album |
| `features/artists/ArtistCard.tsx` | Lit l'artiste, avatar rond |
| `features/artists/ArtistAvatar.tsx` | Initiale sur aplat d'accent |
| `features/playlists/PlaylistCard.tsx` | Lit la playlist, bouton de suppression |
| `features/playlists/PlaylistArtwork.tsx` | Visuel de playlist sans pochette |
| `features/browse/collection.play.ts` | `startCollection` et chargeurs |
| `features/browse/usePlayCollection.ts` | Chargement asynchrone puis lecture |

## Comportement

- La lecture charge la collection à la demande, écarte les fichiers
  introuvables et remplace la file avec la provenance (nom de la collection).
- Une collection sans morceau lisible affiche une erreur dans le lecteur sans
  toucher à la file en cours.
- Le bouton de lecture apparaît au survol, au focus clavier et en permanence sur
  les écrans tactiles (`hover: none`).

## Limites

- Album et artiste : la lecture depuis une carte prend la première page de
  détail (100 morceaux).
- Les playlists et artistes n'ont pas encore de visuel propre.

## Tests

`features/browse/collection.play.test.ts` : ordre et provenance de la file,
exclusion des fichiers manquants, collection vide sans effet sur la file.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action uniquement.
- [x] Cartes sans bordure.
- [x] Tokens de couleur uniquement.
- [x] Fichiers sous 50 lignes.

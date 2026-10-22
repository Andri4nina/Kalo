# Listes de morceaux

Tableaux de la bibliothèque, des favoris, des albums, des artistes et des
playlists, dans l'esprit des listes Spotify.

## Composition

| Fichier | Rôle |
| --- | --- |
| `features/library/TrackTable.tsx` | Tableau sans carte englobante |
| `features/library/TrackTableHead.tsx` | En-têtes discrets et séparateur dédié |
| `features/library/TrackRow.tsx` | Ligne de bibliothèque |
| `features/library/TrackIndexCell.tsx` | Numéro, icône de lecture au survol, morceau en cours |
| `features/library/TrackTitleCell.tsx` | Pochette, titre (bouton de lecture), artiste |
| `features/library/track.row.styles.ts` | Coins arrondis, survol, sélection |
| `features/playlists/PlaylistTrackRow.tsx` | Même ligne avec réordonnancement |
| `features/playlists/PlaylistTableHead.tsx` | En-têtes de playlist |

## Comportement

- L'artiste passe sous le titre ; la colonne Album apparaît à partir de 1024 px.
- Le titre reste le bouton de lecture accessible au clavier ; l'icône de
  lecture du numéro n'est qu'un raccourci souris, sans arrêt de tabulation
  supplémentaire.
- Le morceau en cours a un titre ambre et l'icône `AudioLines`.
- Les lignes sélectionnées gardent un fond marqué.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action ou d'état uniquement.
- [x] Séparateur d'en-tête par composant dédié, pas de bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers sous 50 lignes.

# Barre de lecture

Trois zones comme chez Spotify : morceau courant à gauche, transport et
progression au centre, raccourcis et volume à droite.

## Composition

| Fichier | Rôle |
| --- | --- |
| `features/player/PlayerBar.tsx` | Grille trois zones, bandeau d'erreur |
| `features/player/PlayerTrackInfo.tsx` | Pochette, titre, artiste, favori |
| `features/player/PlayPauseButton.tsx` | Bouton rond encre (blanc en sombre) |
| `features/player/PlayerProgress.tsx` | Curseur natif, accent au survol |
| `features/player/PlayerExtras.tsx` | Liens Karaoké et Studio, actifs sur leur page |
| `features/player/PlayerMixer.tsx` | Balance (popover), sourdine, volume en ligne |
| `features/player/PlayerVolumeSlider.tsx` | Volume ; le relever réactive le son |
| `features/player/player.control.styles.ts` | États actifs avec point sous l'icône |

## Limites

- Le curseur reste l'élément `range` natif coloré par `accent-color` : pas de
  piste affinée sans CSS personnalisé.
- Le volume en ligne n'apparaît qu'à partir de 1024 px ; en dessous, le popover
  « Volume et balance » reste disponible.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide porteuses d'action.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers sous 50 lignes.

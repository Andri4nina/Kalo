# Accueil

Écran d'entrée dans l'esprit de l'accueil Spotify.

## Composition

| Fichier | Rôle |
| --- | --- |
| `features/home/HomePage.tsx` | Chargement des statistiques, récents et dossiers |
| `features/home/HomeHeader.tsx` | Salutation, résumé, bouton d'ajout si bibliothèque vide |
| `features/home/greeting.ts` | Bonjour, bon après-midi ou bonsoir selon l'heure |
| `features/home/HomeShortcuts.tsx` | Tuiles Favoris, Playlists, Albums, Artistes |
| `features/home/ShortcutTile.tsx` | Tuile horizontale d'accès rapide |
| `features/home/RecentShelf.tsx` | Étagère des six derniers morceaux lus |
| `features/home/RecentTrackCard.tsx` | Carte cliquable qui relance le morceau |
| `features/home/RootsCard.tsx` | Dossiers musicaux surveillés |
| `features/home/QueueOverviewCard.tsx` | Aperçu de la file |

Les anciennes tuiles statistiques (`BentoHero`, `StatTile`, `RecentTracksCard`)
sont remplacées : les mêmes chiffres apparaissent dans le résumé et les tuiles.

## Tests

`features/home/greeting.test.ts` : bornes horaires de la salutation.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide de catégorie uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers sous 50 lignes.

# Coquille de l'application

Cadre noir contenant deux colonnes de panneaux arrondis et le lecteur en bas,
à la manière de Spotify.

## Composition

| Fichier | Rôle |
| --- | --- |
| `app/AppShell.tsx` | Cadre, contenu principal défilant, lecteur, file |
| `app/SkipLink.tsx` | Lien d'évitement vers le contenu |
| `app/Sidebar.tsx` | Deux panneaux : navigation, puis playlists et outils |
| `app/SidebarNavLink.tsx` | Lien de navigation (icône d'accent quand actif) |
| `app/SidebarPlaylists.tsx` | Liste des playlists, rafraîchie sur `useLibraryVersion` |
| `app/SidebarPlaylistItem.tsx` | Entrée de playlist (visuel, nom, nombre de morceaux) |
| `app/navigation.ts` | `primaryNav` (écoute) et `toolsNav` (doublons, paramètres) |

## Comportement

- Le lecteur fait partie du flux de la page : plus de barre fixe ni de marge
  basse compensatoire.
- Sous 1024 px de large, la barre latérale se replie en colonne d'icônes ; les
  libellés restent disponibles en infobulle et pour les lecteurs d'écran.
- Sur une fenêtre basse, le panneau des playlists garde une hauteur minimale et
  défile au lieu de chevaucher les outils.
- Les erreurs de chargement des playlists s'affichent dans le panneau.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide de navigation uniquement.
- [x] Panneaux sans bordure unilatérale.
- [x] Couleurs issues des tokens, clair et sombre.
- [x] Fichiers sous 50 lignes.

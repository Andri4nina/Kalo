# Design system Kalo

Direction visuelle inspirée de Spotify : cadre noir, panneaux gris arrondis, texte
blanc, titres très gras, boutons pilule, cartes sans bordure. Le vert de Spotify
n'est pas repris : l'accent reste l'ambre Kalo.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `apps/desktop/src/design/palette.ts` | Couleurs nommées, clair et sombre |
| `apps/desktop/src/design/tokens.ts` | Compositions de classes partagées |
| `apps/desktop/tailwind.config.ts` | Palette, polices, ombres |
| `apps/desktop/src/components/media.styles.ts` | Révélation au survol, lien étendu, pastille de lecture |

## Palette

| Token | Clair | Sombre | Usage |
| --- | --- | --- | --- |
| `canvas` | `#E9E7E3` | `#000000` | Cadre autour des panneaux |
| `panel` | `#FFFFFF` | `#121212` | Barre latérale, contenu |
| `card` | `#F5F4F1` | `#181818` | Cartes, survol des cartes média |
| `raised` | `#ECEAE6` | `#2A2A2A` | Survol des lignes, champs, puces |
| `line` | `#DAD7D0` | `#303030` | Séparateurs, bordures complètes |
| `ink` / `muted` | `#121212` / `#5E5A54` | `#FFFFFF` / `#B3B3B3` | Texte |
| `accent` | `#C97A12` | `#F5A524` | Lecture, états actifs |
| `accent-strong` | `#8F5409` | `#FFBD4A` | Texte d'accent, survol |
| `accent-soft` | `#F7E7CD` | `#2B2112` | En-têtes de détail, aplats |

Contrastes calculés : texte `accent-ink` sur `dark-accent` environ 10:1 ; texte
`dark-accent` sur `dark-panel` environ 9:1 ; `accent-strong` sur blanc environ 6:1.

## Tokens notables

- `page` : colonne plein écran avec `p-2` et `gap-2` sur le cadre.
- `surface` : panneau arrondi (`rounded-lg`).
- `card` : carte sans bordure sur fond `card`.
- `heading` : police d'affichage, gras, interlettrage serré.
- `mediaGrid` : grille auto-remplie de cartes de 11 rem minimum.
- `chipSelect` : liste déroulante en pilule (filtres, tri).
- `scrollbars` : barres de défilement fines aux couleurs du thème.

## Typographie

Polices système sans empattement (`Segoe UI Variable`, `SF Pro`, `system-ui`),
sans dépendance ni téléchargement. Titres en `font-bold` ou `font-black`.

## Conformité règles d'or

- [x] Aucun dégradé : aplats et ombres pleines uniquement.
- [x] Aucun emoji.
- [x] Icônes `lucide-react` porteuses de sens uniquement.
- [x] Aucune bordure unilatérale : séparateurs de tableau via `divider`.
- [x] Aucun bleu ni vert Tailwind ; vert Spotify interdit par `check:rules`.
- [x] Tailwind uniquement, `styles.css` limité aux directives.
- [x] Fichiers de code sous 50 lignes.

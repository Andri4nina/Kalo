# Studio : égaliseur paramétrique et spectre

## Égaliseur paramétrique

| Fichier | Rôle |
| --- | --- |
| `features/studio/eq.shape.ts` | Forme des bandes, bornes, validation, application aux filtres |
| `features/studio/eq.shape.store.ts` | Réglage mémorisé (`kalo:studio-bands`) |
| `features/studio/ParametricCard.tsx`, `ParametricBand.tsx` | Interface |
| `features/player/audio.graph.ts` | Applique la forme à la création du graphe |
| `features/studio/useStudioEq.ts` | Applique les changements en direct |
| `features/studio/studio.export.ts` | Applique la forme à l'export WAV |

Le gain reste réglé par l'égaliseur graphique et ses presets ; la forme des
bandes (fréquence 20 Hz à 20 kHz, Q 0,3 à 8) est un réglage séparé, qui n'est pas
inclus dans les presets.

## Spectre

| Fichier | Rôle |
| --- | --- |
| `features/player/audio.chain.ts` | `AnalyserNode` en fin de chaîne (mesure seule) |
| `features/player/audio.registry.ts` | Accès au graphe actif |
| `features/studio/spectrum.ts` | Regroupement logarithmique des cases FFT |
| `features/studio/useSpectrum.ts`, `SpectrumCard.tsx` | Dessin sur `canvas`, figé en pause |

Les couleurs viennent de la palette Kalo (accent selon le thème).

## Tests

`eq.shape.test.ts`, `spectrum.test.ts`.

## Limites

- Le spectre n'a pas été vu avec un vrai son dans la fenêtre native.

## Conformité règles d'or

- [x] Aucun dégradé (barres en aplat), aucun emoji.
- [x] Icônes Lucide d'action uniquement.
- [x] Aucune bordure unilatérale.
- [x] Couleurs issues de la palette, clair et sombre.
- [x] Fichiers de code sous 50 lignes.

# Règles du projet

Ces règles sont obligatoires et vérifiées par `npm run check:rules`. Elles
s'appliquent au code de l'application, pas aux images ni aux documents.

## 1. Aucun dégradé linéaire

Interdits : `bg-gradient-to-*`, `bg-linear-to-*`, `linear-gradient(...)`.
Utiliser des aplats, des contrastes de surface et la palette Kalo.

## 2. Aucun emoji dans l'interface

Les icônes viennent de `lucide-react`. Les emojis sont interdits dans les
composants et les libellés visibles.

## 3. Pas de bordure unilatérale sur les cartes

`border-t`, `border-b`, `border-l`, `border-r` sont interdits. Une bordure
uniforme (`border`) ou un fond de surface suffit. Les séparateurs de tableaux
utilisent des fonds ou des bordures complètes.

## 4. Pas de bleu Tailwind par défaut

Interdits : `blue-*`, `sky-*`, `indigo-*`, `cyan-*`, `teal-*`, `emerald-*`,
`violet-*`, `fuchsia-*`, `rose-*`. La palette est centralisée dans
`apps/desktop/src/design/palette.ts` et `tailwind.config.ts`.

Accent principal : ambre/cuivre. Les couleurs sémantiques `success`, `warning`
et `danger` sont définies dans la palette.

## 5. Tailwind uniquement pour la présentation

Pas de CSS personnalisé, de CSS modules, de `style={{ ... }}`, de bloc `<style>`
ni de `@apply`. `src/styles.css` ne contient que les directives Tailwind.
Les valeurs dynamiques passent par des classes conditionnelles ou des variables
de design exposées dans la configuration.

## 6. 50 lignes physiques maximum par fichier de code

La limite s'applique aux fichiers `.ts`, `.tsx`, `.js`, `.mjs`, `.rs`, `.sql`,
`.css` et `.html`. Les documents, images et fichiers générés en sont exemptés.

Un fichier proche de la limite doit être découpé par responsabilité réelle, pas
compressé artificiellement. Les modules `scan/`, `upsert/`, `playlists/tracks/`
et les commandes Tauri montrent le niveau de découpage attendu.

## 7. Vérification après chaque lot

Avant de considérer un lot terminé :

```bash
npm run check:rules
npm run typecheck
npm run build
cargo fmt --all -- --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
```

Une fonctionnalité non testée ne doit pas être présentée comme vérifiée.

## 8. Qualité avant le nombre de lignes

Interdits : logique dupliquée, types faibles, `any` non justifié, tests
supprimés pour faire passer la CI, monolithes, `unwrap()`/`expect()` non
justifiés. Les erreurs Rust sont typées et remontent en messages lisibles vers
l'interface.

## 9. Sécurité des fichiers

Le code ne déplace, ne renomme et ne supprime jamais un fichier audio. Les
pochettes vont dans le cache. Les chemins reçus du front sont validés côté Rust.
Les téléchargements, quand ils existeront, seront limités à des sources
autorisées, sans contournement de DRM ni de conditions d'utilisation.

## 10. Accessibilité et états

Chaque écran doit gérer vide, chargement et erreur. Les boutons icône ont un
libellé accessible. Les confirmations sont obligatoires pour les suppressions.
Le clavier doit permettre les actions principales du lecteur.

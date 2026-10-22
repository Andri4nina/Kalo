# Dépendances et licences

Kalo est distribué sous licence MIT. Les dépendances directes ci-dessous
conservent leurs propres licences. Les licences transitives doivent être
revérifiées avant chaque publication avec les outils de l'écosystème.

## Applications et outils JavaScript

| Dépendance | Version | Licence |
| --- | --- | --- |
| `@tauri-apps/api` | 2.12.4 | Apache-2.0 OR MIT |
| `@tauri-apps/plugin-dialog` | 2.8.3 | MIT OR Apache-2.0 |
| `@tauri-apps/cli` | 2.12.3 | Apache-2.0 OR MIT |
| `lucide-react` | 1.59.0 | ISC |
| `react` / `react-dom` | 19.3.1 | MIT |
| `react-router-dom` | 7.18.4 | MIT |
| `zustand` | 5.0.15 | MIT |
| `typescript` | 5.9.3 | Apache-2.0 |
| `vite` | 8.3.4 | MIT |
| `@vitejs/plugin-react` | 6.1.2 | MIT |
| `tailwindcss` | 3.4.19 | MIT |
| `postcss` | 8.5.31 | MIT |
| `autoprefixer` | 10.6.1 | MIT |
| `@types/react` | 19.3.0 | MIT |
| `@types/react-dom` | 19.2.3 | MIT |
| `vitest` | 5.0.5 | MIT |
| `jsdom` | 30.1.3 | MIT |

## Crates Rust

| Crate | Version | Licence |
| --- | --- | --- |
| `tauri` | 2.12.4 | Apache-2.0 OR MIT |
| `tauri-build` | 2.7.3 | Apache-2.0 OR MIT |
| `tauri-plugin-dialog` | 2.8.3 | Apache-2.0 OR MIT |
| `serde` | 1.0.229 | MIT OR Apache-2.0 |
| `serde_json` | 1.0.154 | MIT OR Apache-2.0 |
| `thiserror` | 2.0.21 | MIT OR Apache-2.0 |
| `rusqlite` | 0.40.2 | MIT |
| `libsqlite3-sys` (via `rusqlite`) | 0.38.2 | MIT |
| `lofty` | 0.25.4 | MIT OR Apache-2.0 |
| `walkdir` | 2.5.0 | Unlicense/MIT |
| `blake3` | 1.8.7 | CC0-1.0 OR Apache-2.0 OR Apache-2.0 WITH LLVM-exception |
| `dunce` | 1.0.5 | CC0-1.0 OR MIT-0 OR Apache-2.0 |
| `notify` | 8.2.0 | CC0-1.0 |
| `ort` (ONNX Runtime, lié statiquement, + `DirectML.dll` sous Windows) | 2.0.0-rc.15 | MIT OR Apache-2.0 (ONNX Runtime : MIT) |
| `realfft` | 3.5.0 | MIT |
| `symphonia` | 0.6.1 | MPL-2.0 |
| `ureq` | 3.5.0 | MIT OR Apache-2.0 |
| `sha2` | 0.10.9 | MIT OR Apache-2.0 |

Le modèle de séparation n'est pas une dépendance de compilation : il est
téléchargé sur demande. Voir [models/README.md](../models/README.md).

SQLite est compilé via `libsqlite3-sys` avec la fonctionnalité `bundled`.
SQLite est dans le domaine public.

## Vérification

```bash
cargo metadata --format-version 1
cargo audit
npm audit
npm ls --all
```

`cargo audit` et `npm audit` ne sont pas exécutés automatiquement par
`npm run check` ; ils doivent être lancés avant une publication.

Des avis `npm audit` subsistent dans l'arbre de développement de Tailwind 3.4.19
(`braces`, `postcss-selector-parser`). Ces paquets servent à la compilation et ne
sont pas embarqués dans l'application. La correction automatique impose Tailwind 4,
migration qui n'est pas planifiée dans ce lot.

## Futurs modèles

Aucun modèle IA n'est inclus dans le dépôt. Les modèles de séparation de stems
ou de paroles devront documenter leur licence, leur taille, leur source et leur
mode de téléchargement avant intégration. Ils ne seront pas versionnés avec le
code.

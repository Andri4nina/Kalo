# Construire et tester Kalo

## Prérequis communs

- Node.js 20.19 ou plus récent (Node 24 recommandé).
- npm 10 ou plus récent.
- Rust 1.89 ou plus récent, via rustup.
- Les dépendances système de Tauri 2 pour votre plateforme.

## Windows

1. Installer Visual Studio Build Tools 2022.
2. Cocher « Développement Desktop en C++ » et le Windows SDK.
3. Vérifier que `cl.exe` et `link.exe` sont accessibles depuis un terminal
   « Developer PowerShell ».
4. WebView2 Runtime est nécessaire pour exécuter l'application ; il est présent
   par défaut sur Windows 11 et peut être installé séparément sur Windows 10.

Le crate `rusqlite` utilise SQLite compilé (`bundled`) et a donc besoin du
compilateur C++ de Visual Studio.

## macOS

```bash
xcode-select --install
rustup target add aarch64-apple-darwin x86_64-apple-darwin
```

## Linux

Ubuntu/Debian :

```bash
sudo apt-get update
sudo apt-get install -y libwebkit2gtk-4.1-dev libappindicator3-dev \
  librsvg2-dev patchelf build-essential
```

D'autres distributions fournissent des paquets équivalents. Consultez la
documentation Tauri 2 pour les noms exacts.

## Installation des dépendances JavaScript

```bash
npm install
```

## Vérifications

```bash
# Règles de style et de structure
npm run check:rules

# TypeScript strict
npm run typecheck

# Tests du front (Vitest)
npm test

# Build de production du front
npm run build

# Format, lint et tests Rust
cargo fmt --all -- --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
```

La commande globale :

```bash
npm run check
```

## Développement

```bash
npm run tauri dev
```

Le front Vite écoute sur `http://localhost:1420`. Tauri ouvre la fenêtre native.
Le rechargement à chaud fonctionne pour React ; une modification Rust reconstruit
le binaire.

## Paquets natifs

```bash
npm run tauri build
```

Les artefacts sont produits dans `target/release/bundle`. La signature, la
notarisation macOS et la publication sur les stores ne sont pas encore
configurées.

Sous Windows, la configuration produit un MSI et un installateur NSIS. Le NSIS
propose une installation par utilisateur ou pour tous, le dossier de
destination au choix, le français ou l'anglais, et intègre l'amorce WebView2
(installée seulement si elle manque).

L'exécutable importe `DirectML.dll` (ONNX Runtime) et le runtime Visual C++
(`msvcp140*.dll`, `vcruntime140*.dll`), absents d'un Windows neuf. Construisez
donc l'installateur avec :

```bash
npm run bundle:windows
```

La commande compile `kalo-stems` en release, copie ces DLL dans
`src-tauri/redist/` (`scripts/stage-windows-redist.mjs`, ignoré par git) puis
lance `tauri build` avec `tauri.redist.conf.json`, qui les place à côté de
`Kalo.exe`. Les paquets ne sont pas signés, donc SmartScreen peut afficher un
avertissement.

Un tag `v*` déclenche `release.yml` : paquets des trois systèmes en artefacts
et brouillon de release GitHub.

La signature Windows nécessitera un certificat
et les secrets correspondants ; macOS nécessitera une identité Developer ID et
une notarisation.

## Données locales

Les chemins exacts dépendent du système. Tauri utilise les dossiers standard :

- base : dossier de données applicatif de `app.kalo.player`, fichier `kalo.db` ;
- pochettes : dossier de cache applicatif, sous `covers/` ;
- aucun fichier n'est écrit dans les dossiers musicaux.

Supprimer la base force une reconstruction du catalogue à la prochaine analyse.
Exportez d'abord les playlists si elles comptent pour vous ; l'export intégré
n'est pas encore disponible.

## Dépannage

- `link.exe not found` : installez Visual Studio Build Tools avec la charge C++.
- `LNK1181` sur `kernel32.lib` ou `dbghelp.lib` : le Windows SDK est incomplet ou
  la clé de registre `KitsRoot10` ne pointe pas vers son dossier réel. Réinstallez
  le SDK via Visual Studio Installer ou lancez les commandes depuis un
  « Developer PowerShell » correctement initialisé.
- `webkit2gtk` introuvable sous Linux : installez les paquets listés ci-dessus.
- Lecture impossible : vérifiez que le fichier existe encore et que son format
  fait partie de MP3, FLAC, M4A/AAC, OGG/Opus ou WAV.
- Une analyse peut être longue au premier lancement : les pochettes sont
  extraites et les métadonnées lues pour chaque fichier.

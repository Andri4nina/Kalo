# Kalo

Kalo est un lecteur musical local, open source et multiplateforme. Il indexe vos
fichiers là où ils se trouvent, sans les déplacer, les renommer ni les modifier.

Le projet est construit avec Tauri 2, React, TypeScript, Rust et SQLite. Il vise
une empreinte mémoire faible, une lecture audio fiable et une interface claire.

## État du projet

Kalo est en développement actif. Le socle fonctionnel est en place, mais toutes
les fonctionnalités annoncées dans la feuille de route ne sont pas encore livrées.

### Disponible dans le dépôt

- Bibliothèque locale : ajout de dossiers, analyse récursive, métadonnées,
  pochettes intégrées ou fichiers `cover.jpg` / `folder.png`, recherche, tri et
  pagination.
- Lecture audio : lecture et pause, morceau précédent et suivant, déplacement
  dans la piste, volume, balance stéréo, mode muet, lecture aléatoire et répétition.
- File d'attente consultable, réordonnable par retrait et ajout, restaurée au
  lancement de l'application.
- Playlists persistantes : création, renommage, suppression, ajout et retrait de
  morceaux, réordonnancement.
- Sections Artistes et Albums : listes agrégées avec compteurs et recherche,
  détail par artiste ou album, pochettes et morceaux associés.
- Favoris et historique d'écoute récents.
- Sauvegarde et restauration de l'index, des playlists et des favoris dans un
  fichier SQLite unique, avec vérification d'intégrité.
- Signalement des morceaux disparus : badge explicite et lecture désactivée.
- Retrait d'un dossier bloqué pendant une analyse pour préserver l'index.
- Touches média via l'API Media Session quand le WebView l'expose ; les
  télécommandes natives par plateforme restent à faire.
- Thème clair et sombre, raccourcis clavier de base.
- Interface responsive en bento grid, états vides, chargement et erreurs.
- Analyse Rust découpée en crates : domaine, base SQLite, scanner, application Tauri.

### Pas encore disponible

- Télécommandes média natives et lecture en arrière-plan sur mobile.
- Égaliseur, effets, presets et export du Studio audio.
- Séparation de stems par IA et Stem Studio.
- Paroles synchronisées et mode karaoké.
- Téléchargements depuis des sources autorisées.
- Publication App Store, Play Store et Microsoft Store.

Les fonctionnalités listées ci-dessus ne sont pas revendiquées comme terminées.

## Démarrage

Prérequis détaillés : [docs/BUILD.md](docs/BUILD.md).

```bash
npm install
npm run typecheck
npm run build
npm run check:rules

cargo fmt --all -- --check
cargo test --workspace
```

Lancer l'application de bureau :

```bash
npm run tauri dev
```

Construire les paquets natifs :

```bash
npm run tauri build
```

Sous Windows, Rust et Tauri nécessitent Visual Studio Build Tools avec la charge
de travail « Développement Desktop en C++ ». Le détail par plateforme est dans
[docs/BUILD.md](docs/BUILD.md).

## Sécurité des fichiers

- Le scanner ouvre les fichiers en lecture seule ; il n'écrit jamais dans les
  dossiers musicaux.
- Les pochettes extraites sont copiées dans le cache applicatif, jamais dans le
  dossier d'origine.
- Retirer un dossier de la bibliothèque supprime uniquement les entrées Kalo.
  Les fichiers audio restent sur le disque.
- La base SQLite et les migrations sont dans le dossier de données de
  l'application, pas dans la musique.
- Une sauvegarde contient l'index, les playlists, les favoris et l'historique,
  jamais les fichiers audio ni les pochettes, et uniquement à l'emplacement
  choisi par l'utilisateur.
- Le protocole d'assets Tauri n'autorise que les dossiers ajoutés explicitement
  et le cache des pochettes.
- Aucune télémétrie n'est envoyée. Kalo fonctionne hors ligne pour le socle actuel.

## Architecture

```text
apps/desktop        React, TypeScript, Tailwind, Tauri
  src/              interface, lecteur, playlists, paramètres
  src-tauri/        commandes IPC, état, configuration native
crates/kalo-core    modèles de domaine partagés
crates/kalo-database SQLite, migrations et requêtes
crates/kalo-library scanner de fichiers et métadonnées
docs/               architecture, build, dépendances, feuille de route
scripts/            vérifications automatiques des règles du projet
```

Détails : [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Vérification et feuille de route

- Vérifications automatisées : `npm run check` (règles, TypeScript, build,
  format, lint et tests Rust).
- Intégration continue : `.github/workflows/ci.yml` vérifie le front et compile
  les tests Rust sous Linux, Windows et macOS.
- État des versions : [CHANGELOG.md](CHANGELOG.md).
- Travaux prévus et critères de sortie : [docs/ROADMAP.md](docs/ROADMAP.md).

### Vérifié localement

Au 19 octobre 2026, sous Windows avec Visual Studio Build Tools :

- `npm run check` passe (règles, TypeScript, build, format, clippy strict, tests) ;
- le binaire de bureau est construit sans paquet d'installation ;
- l'exécutable démarre, crée sa base SQLite en mode WAL et se ferme
  correctement, y compris au redémarrage avec des fichiers `-wal` existants.

Les autres plateformes sont couvertes par la CI mais n'ont pas encore été
vérifiées manuellement.

## Règles de contribution

Le projet applique des règles strictes, vérifiées automatiquement :

- aucun dégradé linéaire ;
- aucun emoji dans l'interface, uniquement des icônes SVG Lucide ;
- aucune bordure unilatérale sur les cartes ;
- aucune couleur Tailwind bleue par défaut, palette Kalo centralisée ;
- aucun CSS de présentation personnalisé, uniquement Tailwind ;
- 50 lignes physiques maximum par fichier de code ;
- typage TypeScript strict et erreurs Rust typées ;
- aucun `unwrap()` ou `expect()` non justifié.

```bash
npm run check:rules
```

Les règles et leur justification sont décrites dans [docs/RULES.md](docs/RULES.md).

## Contribuer

Lisez [CONTRIBUTING.md](CONTRIBUTING.md), puis ouvrez une issue ou une pull
request avec des tests et une description honnête de ce qui a été vérifié.

## Sécurité

Pour signaler une vulnérabilité, suivez [SECURITY.md](SECURITY.md). N'ouvrez pas
d'issue publique contenant des détails exploitables.

## Licence

Kalo est distribué sous licence MIT. Voir [LICENSE](LICENSE) et
[docs/DEPENDENCIES.md](docs/DEPENDENCIES.md).

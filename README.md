# Kalo

Kalo est un lecteur musical local, open source et multiplateforme. Il indexe vos
fichiers là où ils se trouvent, sans les déplacer, les renommer ni les modifier.

Le projet est construit avec Tauri 2, React, TypeScript, Rust et SQLite. Il vise
une empreinte mémoire faible, une lecture audio fiable et une interface claire.

## État du projet

Kalo est en développement actif. Le socle fonctionnel est en place, mais toutes
les fonctionnalités annoncées dans la feuille de route ne sont pas encore livrées.
La matrice détaillée, fonction par fonction, est dans
[docs/SPEC-COVERAGE.md](docs/SPEC-COVERAGE.md).

### Disponible dans le dépôt

- Bibliothèque locale : ajout de dossiers, analyse récursive, métadonnées,
  pochettes intégrées ou fichiers `cover.jpg` / `folder.png`, recherche, tri,
  pagination et filtres par format, disponibilité et durée.
- Édition des métadonnées en base uniquement (titre, artiste, album, genre,
  année), sans jamais réécrire le fichier audio.
- Relocalisation contrôlée d'un fichier manquant vers un dossier déjà surveillé,
  avec refus des chemins déjà indexés.
- Détection de doublons probables par titre, artiste et durée, sans suppression
  automatique.
- Sélection multiple dans la bibliothèque : ajout groupé à la file d'attente ou
  à une playlist.
- Changement de pochette : l'image choisie est copiée dans le cache Kalo, sans
  réécrire le fichier audio.
- Retrait contrôlé d'une référence de l'index, avec confirmation ; le fichier
  audio reste sur le disque.
- Lecture audio : lecture et pause, morceau précédent et suivant, déplacement
  dans la piste, volume, balance stéréo, mode muet, lecture aléatoire et répétition.
- Reprise de la file et de la position au lancement, désactivable dans les
  paramètres.
- Studio audio : égaliseur graphique 10 bandes, presets intégrés et
  personnalisés, préampli, saturation, compression, réverbération, écho,
  comparaison A/B, export WAV hors ligne vers un nouveau fichier et réglages
  persistants, appliqués à la lecture sans modifier les fichiers.
- Karaoké local : lecture des fichiers `.lrc` UTF-8 placés à côté des morceaux,
  surlignage synchronisé, décalage réglable et mémorisé par morceau, navigation
  par clic et mode plein écran. Aucun envoi réseau et aucune modification des
  fichiers.
- File d'attente consultable, réordonnable par retrait et ajout, restaurée au
  lancement de l'application, avec provenance affichée et historique des
  morceaux récemment quittés.
- Playlists persistantes : création, renommage, suppression, ajout, retrait et
  réordonnancement, sélection multiple avec retrait groupé ou ajout à la file,
  import et export M3U UTF-8.
- Sections Artistes et Albums : listes agrégées avec compteurs et recherche,
  détail par artiste ou album, pochettes et morceaux associés.
- Favoris et historique d'écoute récents.
- Sauvegarde et restauration de l'index, des playlists et des favoris dans un
  fichier SQLite unique, avec vérification d'intégrité.
- Paramètres structurés en sous-pages : dossiers et analyse, apparence, lecture,
  confidentialité et données, raccourcis personnalisables et accessibilité.
- Surveillance des dossiers en temps réel, filtre des sons non musicaux, import
  classé de fichiers (`Artiste/Album`) et doublons exacts par empreinte BLAKE3.
- Éditeur de synchronisation LRC, paroles texte et export des paroles.
- Égaliseur paramétrique et analyseur de spectre dans le Studio.
- Clips vidéo locaux (MP4, M4V, WebM) indexés à part, avec lecteur intégré.
- Stem Studio : séparation locale voix, batterie, basse, autres et
  instrumental (Spleeter 4 pistes sur ONNX Runtime, modèle téléchargé sur
  demande et vérifié), mixeur multipiste et exports.
- Téléchargements autorisés : lien direct ou œuvre sous licence libre de
  l'Internet Archive, confirmation des droits, pause, reprise, vérification et
  rangement dans la bibliothèque.
- Installateur Windows NSIS (utilisateur courant ou tous les utilisateurs,
  dossier au choix) et MSI, non signés.
- Signalement des morceaux disparus : badge explicite et lecture désactivée.
- Retrait d'un dossier bloqué pendant une analyse pour préserver l'index.
- Touches média via l'API Media Session quand le WebView l'expose ; les
  télécommandes natives par plateforme restent à faire.
- Thème clair et sombre, raccourcis clavier personnalisables, focus visible,
  modales et file d'attente utilisables au clavier avec restitution du focus.
- Réduction des animations activable dans les réglages d'accessibilité.
- Interface responsive en bento grid, états vides, chargement et erreurs.
- Analyse Rust découpée en crates : domaine, base SQLite, scanner, application Tauri.

### Pas encore disponible

- Télécommandes média natives et lecture en arrière-plan sur mobile.
- Validation sur poste réel de l'export WAV.
- Sources de paroles distantes (choix délibéré : paroles locales uniquement).
- Guitare et piano dans le Stem Studio : le modèle 4 pistes ne les isole pas.
- Choix de la sortie audio : WebView2 ne liste les sorties qu'avec la
  permission du micro.
- Paquets signés et publication App Store, Play Store et Microsoft Store.

Les fonctionnalités listées ci-dessus ne sont pas revendiquées comme terminées.

## Installer Kalo

- **Windows 10 et 11** : lancez `Kalo_0.1.0_x64-setup.exe`. L'installateur
  propose une installation pour vous seul (sans droits administrateur) ou pour
  tous les utilisateurs, et le dossier de votre choix (disque externe compris).
  WebView2 est installé automatiquement s'il manque (connexion requise dans ce
  seul cas). Le paquet `Kalo_0.1.0_x64_fr-FR.msi` sert aux déploiements gérés.
- **macOS et Linux** : le workflow `release.yml` produit `.dmg`, `.AppImage`,
  `.deb` et `.rpm` ; ces paquets ne sont pas encore vérifiés sur machine réelle.
- Les paquets ne sont pas signés : Windows SmartScreen peut demander
  « Informations complémentaires », puis « Exécuter quand même ».
- Désinstallation depuis « Applications installées » ; vos fichiers musicaux ne
  sont jamais touchés.

## Démarrage

Prérequis détaillés : [docs/BUILD.md](docs/BUILD.md).

```bash
npm install
npm run typecheck
npm test
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
crates/kalo-stems   séparation de stems (ONNX Runtime, DSP)
crates/kalo-downloads téléchargements autorisés et sources libres
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
- Couverture de la spécification, avec limites explicites :
  [docs/SPEC-COVERAGE.md](docs/SPEC-COVERAGE.md).

### Vérifié localement

Au 19 octobre 2026, sous Windows avec Visual Studio Build Tools :

- `npm run check` passe (règles, TypeScript, build, format, clippy strict, tests) ;
- le binaire de bureau est construit sans paquet d'installation ;
- l'exécutable démarre, crée sa base SQLite en mode WAL et se ferme
  correctement, y compris au redémarrage avec des fichiers `-wal` existants.

Au 23 octobre 2026, sous Windows 10 : `npm run bundle:windows` produit
`Kalo_0.1.0_x64-setup.exe` (19 Mo) et `Kalo_0.1.0_x64_fr-FR.msi` (31 Mo).
L'installateur NSIS installe Kalo avec `DirectML.dll` et le runtime Visual C++,
l'application installée démarre et charge ces DLL depuis son propre dossier, et
la désinstallation retire le dossier et l'entrée du registre. En mode
silencieux (`/S`), l'installation va dans `Program Files` quand les droits
administrateur sont disponibles ; le choix du dossier se fait en mode normal.

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

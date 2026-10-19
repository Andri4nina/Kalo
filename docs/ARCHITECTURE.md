# Architecture

## Objectif

Kalo est un lecteur local-first. Les fichiers audio appartiennent à l'utilisateur
et ne doivent jamais être déplacés, renommés ou supprimés par l'application. La
base de données est un index reconstructible, pas la source de vérité.

## Organisation du workspace

| Chemin | Responsabilité |
| --- | --- |
| `apps/desktop` | Interface React, lecteur Web Audio, routage, appels IPC |
| `apps/desktop/src-tauri` | Fenêtre native, état partagé, commandes, permissions |
| `crates/kalo-core` | Modèles sérialisables partagés entre Rust et TypeScript |
| `crates/kalo-database` | Connexion SQLite, migrations, dépôts |
| `crates/kalo-library` | Parcours des dossiers, lecture des métadonnées, cache des pochettes |

Les dépendances vont dans un sens : `kalo-core` ne dépend de rien, `kalo-database`
dépend du domaine, `kalo-library` dépend du domaine et de la base, l'application
Tauri dépend des trois. Aucun crate métier ne dépend de Tauri, ce qui prépare les
cibles mobiles et les tests sans fenêtre.

## Flux d'analyse

1. L'utilisateur choisit un dossier via le plugin dialog.
2. La commande `library_add_root` canonicalise le chemin, l'enregistre et autorise
   ce dossier dans le scope du protocole d'assets.
3. `library_scan` réserve un verrou d'analyse non bloquant, puis exécute le
   scanner dans `spawn_blocking` pour ne pas bloquer la boucle principale.
4. Le scanner parcourt les fichiers avec `walkdir`, filtre les extensions
   compatibles avec le moteur WebView, lit les tags avec `lofty`, extrait la
   pochette dans le cache et construit un `NewTrack`.
5. Les morceaux sont enregistrés par lots de 32 dans une transaction. Un lot
   échoué n'invalide pas les lots précédents.
6. Un horodatage de scan est écrit sur chaque morceau vu. À la fin, les morceaux
   du dossier qui n'ont pas été vus sont marqués `is_missing = 1`, sans suppression.
7. La progression est envoyée par l'événement `library:scan-progress`.

Pendant une analyse, le retrait d'un dossier est refusé côté Rust avec une erreur
`Busy`, et l'interface désactive l'ajout et le retrait. Les morceaux marqués
`is_missing` restent visibles mais leur lecture est désactivée.

Un fichier présent mais illisible conserve sa ligne existante et son horodatage :
il ne devient pas « manquant » à tort.

## Base de données

SQLite est ouvert en mode WAL, avec clés étrangères activées et un délai
d'attente de cinq secondes. Une seule connexion est partagée derrière
`Arc<Mutex<Connection>>` ; SQLite sérialise les accès et les transactions
couvrent les opérations composées.

Les migrations sont versionnées dans `crates/kalo-database/migrations` et
appliquées par `PRAGMA user_version` dans une transaction par version. Les
tables principales sont :

- `library_roots` : dossiers autorisés ;
- `artists`, `albums`, `tracks` : catalogue indexé ;
- `playlists`, `playlist_tracks` : collections ordonnées, sans copie audio ;
- `favorites`, `play_history` : usages locaux ;
- `settings` : préférences persistantes côté base (prévu).

Les chemins sont uniques dans `tracks`. Les suppressions de playlists ne touchent
jamais les morceaux. La suppression d'un dossier retire ses lignes de catalogue
via cascade, mais jamais les fichiers.

### Sauvegarde et reconstruction

La base est reconstructible : supprimer `kalo.db` puis relancer une analyse
recrée le catalogue. Les playlists et favoris, eux, devront être exportés avant
cette opération. Une commande de sauvegarde/restauration est prévue ; elle n'est
pas encore implémentée.

## Lecture audio

Le front utilise un `HTMLAudioElement` alimenté par `convertFileSrc` et un graphe
Web Audio (`MediaElementSource` → `GainNode` → `StereoPannerNode` →
`destination`) pour le volume et la balance. Le protocole d'assets Tauri prend en
charge les requêtes par plage d'octets, nécessaires au déplacement dans la piste.

Le graphe est créé une seule fois et réutilisé. Si le navigateur refuse Web Audio,
le volume retombe sur celui de l'élément média ; la balance n'est alors pas
appliquée. Le mode muet, les préférences et la file d'attente sont gérés par
Zustand. Les erreurs de lecture sont affichées sans interrompre l'application.

Les touches média sont prises en charge via l'API Web Media Session lorsqu'elle
est exposée par le WebView : métadonnées, lecture, pause, précédent, suivant et
déplacements. Les télécommandes média natives propres à chaque système ne sont
pas encore branchées. Le moteur audio reste dans le WebView pour le socle ; un
moteur Rust pourra être ajouté sans changer le contrat des commandes.

## Sécurité des assets

Le scope du protocole d'assets est vide dans la configuration. Il est étendu au
runtime uniquement pour :

- le cache des pochettes ;
- chaque dossier de bibliothèque ajouté ou retrouvé au démarrage.

Une racine disparue est ignorée au démarrage. Aucun chemin arbitraire fourni par
le front n'est ouvert. Les commandes valident les identifiants et les chemins
côté Rust.

## Mobile et évolution

Le crate métier est indépendant de Tauri. La lecture en arrière-plan, les
télécommandes média et les chemins propres à Android/iOS seront ajoutés dans une
couche native dédiée. Sur mobile, le scanner restera en lecture seule et les
fichiers d'origine ne seront jamais modifiés.

Les moteurs IA (séparation de stems, paroles) seront locaux par défaut, avec
chargement et déchargement explicites des modèles, limite de concurrence et
consentement avant tout envoi distant. Ces moteurs ne sont pas encore présents.

## Choix assumés

- MIT plutôt que GPL pour faciliter une distribution mobile future.
- SQLite plutôt qu'un format propriétaire pour permettre l'inspection et la
  reconstruction.
- Web Audio pour le socle, avec une séparation nette permettant un moteur natif.
- Pas de promesse de fonctionnalité non testée : la feuille de route distingue
  l'implémenté du prévu.

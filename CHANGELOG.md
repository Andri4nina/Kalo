# Journal des modifications

Toutes les modifications notables de Kalo sont documentées ici. Le format suit
[Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et le projet utilisera
le versionnage sémantique à partir de la première version publiée.

## [Non publié]

### Ajouté

- Socle Tauri 2, React, TypeScript, Tailwind et SQLite.
- Analyse récursive de dossiers musicaux avec métadonnées et pochettes.
- Bibliothèque avec recherche, tri, pagination et favoris.
- Lecture audio avec volume, balance, aléatoire, répétition et file d'attente.
- File d'attente restaurée au lancement et touches média via l'API Media Session.
- Playlists persistantes avec réordonnancement.
- Sections Artistes et Albums : listes agrégées, détail par artiste ou album et
  morceaux associés.
- Recherche par nom dans les vues Artistes et Albums, filtre appliqué en SQL.
- Sauvegarde et restauration de l'index, des playlists et des favoris dans un
  fichier SQLite vérifié.
- Installateurs Windows MSI et NSIS non signés, avec installation et
  désinstallation vérifiées ; workflow de construction pour Windows, macOS et
  Linux.
- Studio audio : égaliseur graphique 10 bandes, presets, bypass, réinitialisation
  et persistance locale, appliqué au graphe Web Audio sans modifier les fichiers.
- Karaoké local : lecture d'un fichier `.lrc` UTF-8 voisin du morceau, lignes
  synchronisées, décalage réglable et navigation par clic, sans réseau.
- Karaoké plein écran, décalage mémorisé par morceau et commandes de lecture
  dans la superposition.
- Paroles classiques depuis un fichier `.txt` voisin et éditeur de
  synchronisation : marquage pendant la lecture, réglage fin, enregistrement
  dans Kalo (prioritaire sur les fichiers, qui ne sont jamais modifiés) et
  export vers un fichier `.lrc` choisi.
- Préampli du Studio (±12 dB), appliqué avant l'égaliseur et persisté.
- Studio : mode paramétrique (fréquence et largeur Q de chaque bande, aussi
  appliqués à l'export WAV) et analyseur de spectre du son traité.
- Studio audio : chaîne d'effets après l'égaliseur (saturation, compression,
  réverbération, écho), comparaison A/B et presets personnalisés nommés,
  supprimables et limités à 20, le tout persistant localement.
- Export WAV hors ligne du morceau en cours avec les réglages actifs, écrit dans
  un fichier choisi par l'utilisateur ; le fichier d'origine ne peut pas être
  remplacé. Validation audio native encore à faire.
- Stem Studio : séparation locale voix, batterie, basse, autres et
  instrumental (Spleeter 4 pistes, ONNX Runtime), modèle téléchargé sur demande
  avec empreintes vérifiées, tâches annulables, mixeur multipiste (volume,
  panoramique, karaoké, a cappella, comparaison à l'original) et exports.
- Téléchargements autorisés : lien direct ou œuvre libre de l'Internet Archive,
  confirmation des droits, file de 3 transferts avec pause, reprise, annulation
  et progression, vérification MD5 et audio, rangement dans la bibliothèque.
- Clips vidéo locaux (MP4, M4V, WebM) : indexation séparée de la musique,
  page Clips avec recherche et lecteur intégré, import classé dans
  `<Artiste>/video/`.
- Édition des métadonnées en base uniquement, sans réécriture du fichier audio.
- Relocalisation contrôlée d'un fichier manquant, limitée aux dossiers déjà
  surveillés et aux formats audio pris en charge.
- Détection de doublons probables par titre, artiste et durée, sans suppression
  automatique.
- Doublons identiques par empreinte BLAKE3 (fichiers de même taille seulement,
  empreintes mises en cache), onglet dédié sur la page Doublons.
- Import de fichiers : copie vérifiée par empreinte vers
  `<racine>/<Artiste>/<Titre>.<ext>`, sans écrasement, puis indexation ; les
  fichiers d'origine restent intacts.
- Sélection multiple dans une playlist, avec retrait groupé transactionnel ou
  ajout à la file d'attente.
- Sélection multiple dans la bibliothèque, avec ajout groupé à la file d'attente
  ou à une playlist ; les morceaux manquants ne sont pas ajoutés à la file.
- Changement de pochette par copie dans le cache Kalo, sans réécriture du fichier
  audio.
- Retrait confirmé d'une référence de l'index, avec suppression en cascade des
  entrées de playlists, favoris et historique ; fichier audio conservé.
- Provenance de la file affichée selon la vue d'origine et historique cliquable
  des 30 derniers morceaux quittés.
- Paramètres structurés en sous-pages : général, bibliothèque, confidentialité et
  données, raccourcis.
- Raccourcis personnalisables avec détection des conflits, réinitialisation et
  persistance locale.
- Réduction des animations depuis les réglages d'accessibilité, appliquée à
  l'ensemble de l'interface.
- Filtres de bibliothèque par format, disponibilité et durée.
- Filtre « Type de son » séparant la musique des sons courts, sonneries,
  notifications, alarmes et enregistrements (colonne calculée, migration 008).
- Surveillance des dossiers (activée par défaut, désactivable) : ajouts,
  modifications et suppressions appliqués automatiquement, en lecture seule.
- Recherche étendue au chemin du fichier, avec échappement des jokers SQL.
- Import et export M3U UTF-8 des playlists, avec résumé des morceaux ajoutés et
  ignorés.
- Playlists : description (500 caractères), pochette copiée dans le cache Kalo,
  duplication transactionnelle, recherche dans la liste et dans une playlist
  (insensible aux accents, réordonnancement suspendu pendant le filtre).
- Reprise de la file et de la position configurable dans les paramètres.
- Bandeau d'erreur du lecteur avec actions Réessayer, Localiser le fichier et
  Suivant ; un fichier relocalisé est rechargé sans relancer l'application.
- Glisser-déposer dans la file d'attente, en plus des flèches au clavier.
- Cartes Confidentialité et Diagnostics, avec rapport local copiable.
- Historique d'écoute récent.
- Thèmes clair et sombre, raccourcis clavier.
- Accessibilité : piège et restitution du focus, fermeture par Échap, lien
  d'évitement, focus visible, annonces des statuts et valeur vocale du lecteur.
- Intégration des touches média via l'API Media Session quand elle est exposée.
- Vérification automatique des règles de style et de structure.
- Documentation d'architecture, de build, de sécurité et de contribution.
- Tests Rust du scanner, de la base, des playlists, des favoris, de l'historique,
  des vues Artistes et Albums, des sauvegardes, de l'édition des métadonnées, de
  la relocalisation, des doublons, des filtres et de la recherche.
- Tests front Vitest de la file d'attente, de la session, des préférences, du
  formatage, des filtres de bibliothèque, du décalage karaoké, du préampli et du
  focus des modales, avec validation des préférences locales corrompues.

### Modifié

- Refonte visuelle inspirée de Spotify, sans son vert : cadre noir et panneaux
  arrondis, barre latérale en deux panneaux avec la liste des playlists, lecteur
  intégré en bas de fenêtre avec volume en ligne, cartes avec lecture au survol,
  en-têtes de détail en grand format, lignes de morceaux avec pochette, accueil
  avec salutation, raccourcis et étagère des écoutes récentes. Accent ambre Kalo
  conservé ; `green-*`, `lime-*` et le vert Spotify ajoutés aux couleurs interdites.

- Les morceaux introuvables sont signalés et ne peuvent pas être lancés depuis
  la bibliothèque ou une playlist.
- Le retrait d'un dossier est bloqué pendant une analyse.
- La recherche traite désormais `%` et `_` comme des caractères littéraux.
- L'édition des métadonnées ne touche qu'à la base ; le fichier audio reste
  strictement inchangé.
- Un refus de lecture pour source illisible affiche le message Kalo au lieu du
  message brut du moteur.

### Sécurité

- Le protocole d'assets Tauri est limité aux dossiers ajoutés et au cache.
- Aucun fichier audio n'est modifié par le scanner, l'édition ou la relocalisation.
- L'import M3U est limité à 2 Mo, en UTF-8, et ne résout que des chemins locaux
  déjà indexés.
- L'export WAV refuse d'écrire sur le fichier audio d'origine.
- Les téléchargements n'acceptent que `http(s)` sans identifiants dans l'adresse,
  sont plafonnés à 2 Go et ne sont rangés qu'une fois reconnus comme audio.

### Prévu

- Télécommandes média natives et lecture mobile en arrière-plan.
- Publication et signature des paquets.

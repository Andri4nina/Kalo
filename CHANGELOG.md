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
- Sauvegarde et restauration de l'index, des playlists et des favoris dans un
  fichier SQLite vérifié.
- Historique d'écoute récent.
- Thèmes clair et sombre, raccourcis clavier.
- Intégration des touches média via l'API Media Session quand elle est exposée.
- Vérification automatique des règles de style et de structure.
- Documentation d'architecture, de build, de sécurité et de contribution.
- Tests Rust du scanner, de la base, des playlists, des favoris, de l'historique,
  des vues Artistes et Albums, et des sauvegardes.

### Modifié

- Les morceaux introuvables sont signalés et ne peuvent pas être lancés depuis
  la bibliothèque ou une playlist.
- Le retrait d'un dossier est bloqué pendant une analyse.

### Sécurité

- Le protocole d'assets Tauri est limité aux dossiers ajoutés et au cache.
- Aucun fichier audio n'est modifié par le scanner.

### Prévu

- Télécommandes média natives et lecture mobile en arrière-plan.
- Studio audio : égaliseur, effets, presets, A/B et export explicite.
- Stem Studio local et Karaoké.
- Téléchargements depuis des sources autorisées.
- Publication et signature des paquets.

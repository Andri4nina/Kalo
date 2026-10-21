# Feuille de route

Cette feuille de route décrit un ordre de travail, pas une promesse de date. Une
fonctionnalité n'est annoncée comme disponible qu'après implémentation et
vérification sur les plateformes concernées.

## Socle livré

- Workspace Tauri 2, React, TypeScript strict, Tailwind et SQLite migré.
- Scanner local en lecture seule, métadonnées et pochettes en cache.
- Bibliothèque, favoris, historique, playlists persistantes.
- Pages Artistes et Albums agrégées, avec recherche, détail et morceaux associés.
- Sauvegarde et restauration vérifiées de l'index et des playlists.
- Lecteur avec file d'attente, volume, balance, aléatoire et répétition.
- Paramètres de bibliothèque, thème clair/sombre et raccourcis clavier.
- Tests Rust et front, contrôles de règles et documentation de base.
- Recherche échappée, filtres format / disponibilité / durée, édition des
  métadonnées en base et relocalisation des fichiers manquants.
- Détection de doublons probables et import / export M3U des playlists.
- Retrait contrôlé d'une référence et changement de pochette sans modifier les
  fichiers audio.
- Reprise de lecture configurable, confidentialité et diagnostics dans les
  paramètres.
- Provenance de la file et historique cliquable des morceaux récemment quittés.
- Karaoké plein écran avec décalage mémorisé par morceau.
- Préampli du Studio appliqué avant l'égaliseur.

## Prochaine étape : consolidation

- Actions groupées dans les playlists.
- Sous-pages de paramètres, personnalisation des raccourcis et réglages
  d'accessibilité.
- Télécommandes média natives et reprise après interruption système.
- Meilleure gestion des pochettes et des gros catalogues.
- CI multiplateforme et paquets signés pour Windows, macOS et Linux.

## Studio audio

- Égaliseur graphique 10 bandes, presets, bypass et persistance (livré).
- Préampli avant l'égaliseur (livré).
- Presets personnalisés nommés et supprimables.
- Mode paramétrique par bande (fréquence et largeur réglables).
- Chaîne d'effets avec comparaison A/B et réinitialisation.
- Export explicite uniquement, vers un nouveau fichier.
- Aucune modification destructive du fichier d'origine.

## Stem Studio

- Séparation locale avec un moteur interchangeable (Demucs ou équivalent).
- Progression, annulation, erreurs lisibles et nettoyage des fichiers temporaires.
- Mixage des stems et export explicite.
- Téléchargement des modèles uniquement après consentement et vérification de
  licence.

## Karaoké et paroles

- Fichiers `.lrc` locaux, surlignage synchronisé, décalage et navigation par
  clic (livré).
- Mode plein écran et décalage persistant par morceau (livré).
- Paroles intégrées aux métadonnées et sources distantes sous licence.
- Aucune source de paroles non autorisée, aucun envoi réseau par défaut.

## Téléchargements

- Uniquement depuis des sources autorisées.
- Aucun contournement de DRM ni de conditions d'utilisation.
- Vérification de l'intégrité, de l'espace disque et des droits.

## Vidéo

- Lecture vidéo locale avec piste audio et commandes cohérentes.
- Aucun téléchargement ni extraction non autorisée.
- Formats et moteur à décider avant implémentation.

## Mobile

- Lecture en arrière-plan et intégration média native.
- Scanner en lecture seule ; jamais de modification des fichiers d'origine.
- Adaptation des dialogues et des chemins propres à Android/iOS.
- Publication sur les stores après stabilisation du socle de bureau.

## Critères de sortie d'une fonctionnalité

1. Comportement implémenté, pas seulement une maquette.
2. Tests automatisés des cas critiques et des erreurs.
3. Vérification manuelle sur au moins une plateforme réelle.
4. Règles de style et de structure respectées.
5. Documentation mise à jour, avec limites connues explicites.

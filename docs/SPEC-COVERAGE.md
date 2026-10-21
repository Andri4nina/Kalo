# Couverture de la spécification Kalo

État vérifié au 21 octobre 2026, après les commits `8764e49` à `2c2a606`.
Légende : **Livré** = fonctionnel et testé ; **Partiel** = présent mais incomplet ;
**Absent** = non implémenté ; **Bloqué** = dépend d'une décision ou d'une ressource externe.

## 1. Lecteur

| Fonction | État | Détail |
| --- | --- | --- |
| Lecture, pause, précédent, suivant | Livré | Moteur Web Audio + transport natif |
| Barre de progression et saut | Livré | Position et durée en millisecondes |
| Volume, mute, balance | Livré | Persistés dans `kalo:player-prefs` |
| Aléatoire et répétition | Livré | Modes arrêt / file / morceau |
| Favori depuis le lecteur | Livré | Synchronisé avec la bibliothèque |
| Accès file, karaoké et studio | Livré | Boutons dans la barre de lecture |
| Reprise de la position | Livré | File, index et position enregistrés toutes les 5 s ; désactivable |
| Erreurs audio avec actions | Partiel | Bandeau d'erreur et fermeture ; pas encore de « réessayer » ou « localiser » depuis le bandeau |
| Lecture en arrière-plan | Partiel | Desktop uniquement ; mobile absent |
| Touches multimédias natives | Partiel | Media Session Web ; pas de gestionnaire global par plateforme |

## 2. File d'attente

| Fonction | État | Détail |
| --- | --- | --- |
| Ajouter, retirer, vider | Livré | Vidage avec confirmation |
| Lire maintenant / lire ensuite | Livré | `playTrack`, `playNext` |
| Réordonner | Livré | Boutons monter / descendre |
| Glisser-déposer | Absent | Les boutons assurent déjà le réordonnancement accessible |
| Provenance des morceaux | Absent | Pas de source (album, playlist, recherche) stockée dans la file |
| Historique de lecture dans la file | Absent | L'historique global existe, pas de retour arrière de file |

## 3. Bibliothèque

| Fonction | État | Détail |
| --- | --- | --- |
| Indexation locale | Livré | Scanner Rust, SQLite/WAL, formats MP3, FLAC, M4A, AAC, OGG, OPUS, WAV |
| Recherche | Livré | Titre, artiste, album, genre et chemin ; jokers SQL échappés |
| Tri | Livré | Ajout, titre, artiste, album, année, durée |
| Filtres | Livré | Format, disponibilité, durée |
| Favoris | Livré | Page dédiée et filtre |
| Fichiers manquants | Livré | Badge, relocalisation contrôlée, refus des doublons de chemin |
| Édition des métadonnées | Livré | Titre, artiste, album, genre, année, en base uniquement |
| Édition des pochettes | Livré | Image copiée dans le cache Kalo ; fichier audio inchangé |
| Suppression d'une référence | Livré | Retrait de l'index, des playlists, favoris et historiques ; fichier conservé |
| Doublons | Livré | Groupes titre + artiste + durée proche ; aucune suppression automatique |
| Doublons par contenu | Absent | Pas d'empreinte de fichier |
| Sélection et actions groupées | Livré | Sélection multiple, ajout groupé à la file ou à une playlist |
| Import et classement de fichiers | Absent | Le scanner lit sur place, ne copie ni ne déplace |
| Filtrage des sons non musicaux | Absent | Pas de détection ringtones / jingles |
| Surveillance des dossiers | Absent | Analyse manuelle ou à l'ajout d'un dossier |

## 4. Playlists

| Fonction | État | Détail |
| --- | --- | --- |
| Création, renommage, suppression | Livré | Confirmations et états d'erreur |
| Ajout, retrait, réordonnancement | Livré | Positions persistées |
| Favoris et manquants | Livré | Badges et page de favoris |
| Import / export M3U | Livré | UTF-8, fichiers locaux, résolution des chemins, résumé ajoutés/ignorés |
| Description et pochette | Absent | Modèle de playlist minimal |
| Duplication de playlist | Absent | Pas d'action dédiée |
| Actions groupées | Absent | Pas de sélection multiple |

## 5. Paroles et karaoké

| Fonction | État | Détail |
| --- | --- | --- |
| Lecture `.lrc` locale | Livré | Fichier voisin, UTF-8, 1 Mo maximum, résolution par identifiant de morceau |
| Synchronisation et surlignage | Livré | Ligne active, clic pour se positionner |
| Décalage | Livré | ±5 s, mémorisé par morceau |
| Plein écran | Livré | Superposition, Échap, commandes de lecture et décalage |
| Recherche de paroles en ligne | Absent | Aucune source sous licence choisie |
| Cache de paroles | Partiel | Le fichier local sert de cache ; pas de cache réseau |
| Voix / instrumental | Bloqué | Dépend de la séparation de stems |
| Contrôle de préparation | Partiel | Absence de `.lrc` signalée ; pas de diagnostic avancé |

## 6. Studio audio

| Fonction | État | Détail |
| --- | --- | --- |
| Égaliseur 10 bandes | Livré | 31 Hz à 16 kHz, ±12 dB, graphe Web Audio |
| Presets intégrés | Livré | Plat, graves, voix, rock, podcast |
| Bypass, réinitialisation | Livré | Persistés |
| Préampli | Livré | ±12 dB, appliqué avant l'égaliseur |
| Presets personnalisés | Absent | Pas d'enregistrement nommé par l'utilisateur |
| Chaîne d'effets | Absent | Pas de reverb, écho, compresseur ou saturation |
| Export du rendu | Absent | Pas de rendu hors ligne ni d'écriture audio |
| Visualisation spectrale | Absent | Pas d'analyseur temps réel |

## 7. Stem Studio et IA

| Fonction | État | Détail |
| --- | --- | --- |
| Séparation voix / batterie / basse / autres | Bloqué | Modèle, licence, taille et politique de ressources non décidés |
| Gestionnaire de modèles | Absent | Aucun téléchargement ni vérification de modèle |
| Mixage de stems | Absent | Dépend de la séparation |
| Consentement et traitement local | Partiel | Principe documenté ; aucune fonction IA active |

## 8. Téléchargements

| Fonction | État | Détail |
| --- | --- | --- |
| Téléchargement direct autorisé | Absent | Aucun client réseau ni file de téléchargement |
| Sources autorisées et politiques | Bloqué | Aucune source validée, aucun contournement DRM/ToS |
| Gestionnaire (progression, annulation) | Absent | Dépend de la décision précédente |

## 9. Vidéo

| Fonction | État | Détail |
| --- | --- | --- |
| Lecture vidéo musicale | Absent | Le scanner et le lecteur ne traitent que l'audio |
| Piste audio extraite | Absent | Aucun pipeline vidéo |

## 10. Paramètres et vie privée

| Fonction | État | Détail |
| --- | --- | --- |
| Dossiers et analyse | Livré | Ajout, retrait, analyse unitaire ou globale |
| Apparence | Livré | Thème clair / sombre persistant |
| Lecture | Livré | Reprise de position configurable |
| Sauvegarde / restauration | Livré | `VACUUM INTO`, vérification d'intégrité, refus de bases étrangères |
| Confidentialité | Livré | Engagements explicites, aucune télémétrie |
| Diagnostics | Livré | Compteurs, durée indexée, copie du rapport |
| Sous-pages de réglages | Absent | Une seule page ; pas de routes par catégorie |
| Accessibilité | Partiel | Navigation clavier, focus, reduced motion ; pas de réglages dédiés |
| Raccourcis | Partiel | Raccourcis actifs ; pas d'écran de personnalisation |
| Notifications | Absent | Pas de préférences de notifications |
| Périphériques audio | Absent | Pas de sélection de sortie |
| Stockage | Partiel | Statistiques affichées ; pas de nettoyage ni d'emplacement configurable |

## 11. États, navigation et design

| Élément | État | Détail |
| --- | --- | --- |
| Navigation | Livré | Accueil, Bibliothèque, Doublons, Artistes, Albums, Playlists, Favoris, Karaoké, Studio, Paramètres |
| Chargement / erreur / vide | Livré | Composants partagés sur les écrans principaux |
| Hors ligne | Partiel | L'application est locale ; pas de bandeau ou d'état réseau explicite |
| Permission refusée | Absent | Pas de flux de permission mobile |
| Design system | Livré | Tokens, composants, Lucide, pas de dégradé ni d'emoji |
| Responsive | Partiel | Mise en page adaptative desktop ; pas d'application mobile |
| Thèmes clair / sombre | Livré | Variables Tailwind dédiées |

## 12. Plateformes et distribution

| Élément | État | Détail |
| --- | --- | --- |
| Windows | Livré | MSI + NSIS, installation, lancement et désinstallation vérifiés |
| macOS / Linux | Partiel | Workflow de release défini ; validation manuelle non disponible |
| Android / iOS | Absent | SDK, cibles et stratégie de permission non mis en place |
| Signature / notarisation | Bloqué | Certificats et secrets absents |

## Prochaines tranches prioritaires

1. Actions groupées dans les playlists.
2. Provenance de la file et retour arrière de file.
3. Sous-pages de paramètres, raccourcis et accessibilité.
4. Chaîne d'effets du Studio et presets personnalisés.
5. Téléchargement direct depuis une source autorisée, avec file et annulation.
6. Lecture vidéo locale.
7. Stem Studio après décision sur le modèle et sa licence.

Tout élément marqué **Absent** ou **Bloqué** ne doit pas être présenté comme disponible dans l'interface ou la documentation commerciale.

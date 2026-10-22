# Couverture de la spécification Kalo

État vérifié au 22 octobre 2026. Les tranches provenance de la file, paramètres
avancés, actions groupées, Studio audio (effets, presets, A/B, export WAV),
refonte visuelle et playlists complètes (description, pochette, duplication,
recherche) sont couvertes.
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
| Erreurs audio avec actions | Livré | Message Kalo unique, actions Réessayer (reprise à la position), Localiser le fichier et Suivant |
| Lecture en arrière-plan | Partiel | Desktop uniquement ; mobile absent |
| Touches multimédias natives | Partiel | Media Session Web ; pas de gestionnaire global par plateforme |

## 2. File d'attente

| Fonction | État | Détail |
| --- | --- | --- |
| Ajouter, retirer, vider | Livré | Vidage avec confirmation |
| Lire maintenant / lire ensuite | Livré | `playTrack`, `playNext` |
| Réordonner | Livré | Boutons monter / descendre |
| Glisser-déposer | Livré | Glisser-déposer natif dans la file ; flèches conservées pour le clavier |
| Provenance des morceaux | Livré | Source affichée dans la file : bibliothèque, favoris, playlist, album, artiste, doublons, récents |
| Historique de lecture dans la file | Livré | 30 derniers morceaux quittés, liste cliquable dans la file |

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
| Doublons par contenu | Livré | Empreinte BLAKE3 des seuls fichiers de même taille, mise en cache par date de modification |
| Sélection et actions groupées | Livré | Sélection multiple, ajout groupé à la file ou à une playlist |
| Import et classement de fichiers | Livré | Copie vérifiée vers `<racine>/<Artiste>/<Titre>.<ext>`, sans écrasement ; la source n'est jamais supprimée |
| Filtrage des sons non musicaux | Livré | Filtre « Type de son » : moins de 45 s ou dossiers système (sonneries, notifications, alarmes, enregistrements) ; réglable, rien n'est masqué par défaut sur ordinateur |
| Surveillance des dossiers | Livré | Surveillance native (notify), changements appliqués après 1,5 s de calme, fichiers disparus marqués introuvables ; désactivable |

## 4. Playlists

| Fonction | État | Détail |
| --- | --- | --- |
| Création, renommage, suppression | Livré | Confirmations et états d'erreur |
| Ajout, retrait, réordonnancement | Livré | Positions persistées |
| Favoris et manquants | Livré | Badges et page de favoris |
| Import / export M3U | Livré | UTF-8, fichiers locaux, résolution des chemins, résumé ajoutés/ignorés |
| Description et pochette | Livré | Description de 500 caractères, pochette copiée dans le cache, retrait sans effacement |
| Duplication de playlist | Livré | Copie transactionnelle du nom, de la description, de la pochette et de l'ordre |
| Recherche | Livré | Par nom ou description dans la liste, par titre / artiste / album dans une playlist |
| Actions groupées | Livré | Sélection multiple, retrait groupé transactionnel et ajout à la file |

## 5. Paroles et karaoké

| Fonction | État | Détail |
| --- | --- | --- |
| Lecture `.lrc` locale | Livré | Fichier voisin, UTF-8, 1 Mo maximum, résolution par identifiant de morceau |
| Synchronisation et surlignage | Livré | Ligne active, clic pour se positionner |
| Décalage | Livré | ±5 s, mémorisé par morceau |
| Plein écran | Livré | Superposition, Échap, commandes de lecture et décalage |
| Paroles classiques | Livré | Fichier `.txt` voisin affiché sans synchronisation |
| Édition manuelle de la synchronisation | Livré | Marquage pendant la lecture, réglage au dixième de seconde, enregistrement en base, export `.lrc` |
| Recherche de paroles en ligne | Écarté | Décision du 22 octobre 2026 : paroles locales uniquement, aucune source sous licence |
| Cache de paroles | Livré | Paroles éditées dans SQLite (migration 009), prioritaires sur les fichiers voisins jamais modifiés |
| Voix / instrumental | Bloqué | Dépend de la séparation de stems |
| Contrôle de préparation | Partiel | Absence de `.lrc` signalée ; pas de diagnostic avancé |

## 6. Studio audio

| Fonction | État | Détail |
| --- | --- | --- |
| Égaliseur 10 bandes | Livré | 31 Hz à 16 kHz, ±12 dB, graphe Web Audio |
| Presets intégrés | Livré | Plat, graves, voix, rock, podcast |
| Bypass, réinitialisation | Livré | Persistés |
| Préampli | Livré | ±12 dB, appliqué avant l'égaliseur |
| Presets personnalisés | Livré | Nom, gains, préampli et effets enregistrés localement, limités à 20 |
| Chaîne d'effets | Livré | Saturation, compression, réverbération et écho après l'égaliseur, bypass global |
| Comparaison A/B | Livré | Écoute sans traitement puis retour au réglage conservé |
| Export du rendu | Partiel | Rendu hors ligne vers un nouveau WAV, sans écraser l'original ; validation audio native non réalisée |
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
| Sous-pages de réglages | Livré | Routes dédiées : général, bibliothèque, confidentialité et données, raccourcis |
| Accessibilité | Partiel | Navigation clavier, focus, réglage dédié de réduction des animations ; validation lecteur d'écran non réalisée |
| Raccourcis | Livré | Neuf actions personnalisables, détection des conflits, réinitialisation et persistance locale |
| Notifications | Absent | Pas de préférences de notifications |
| Périphériques audio | Bloqué | La sortie suit le périphérique par défaut du système ; WebView2 ne liste les sorties qu'avec l'accès au micro, refusé par principe de permission minimale |
| Stockage | Partiel | Statistiques affichées ; pas de nettoyage ni d'emplacement configurable |

## 11. États, navigation et design

| Élément | État | Détail |
| --- | --- | --- |
| Navigation | Livré | Accueil, Bibliothèque, Doublons, Artistes, Albums, Playlists, Favoris, Karaoké, Studio, Paramètres |
| Chargement / erreur / vide | Livré | Composants partagés sur les écrans principaux |
| Hors ligne | Partiel | L'application est locale ; pas de bandeau ou d'état réseau explicite |
| Permission refusée | Absent | Pas de flux de permission mobile |
| Design system | Livré | Tokens, composants, Lucide, pas de dégradé ni d'emoji ; structure inspirée de Spotify, accent ambre (sans vert) |
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

1. Validation native de l'export WAV et mode paramétrique par bande.
2. Téléchargement direct depuis une source autorisée, avec file et annulation.
3. Lecture vidéo locale.
4. Stem Studio après décision sur le modèle et sa licence.

Tout élément marqué **Absent** ou **Bloqué** ne doit pas être présenté comme disponible dans l'interface ou la documentation commerciale.

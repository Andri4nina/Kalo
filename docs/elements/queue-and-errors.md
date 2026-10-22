# File d'attente et erreurs de lecture

## File d'attente

| Fichier | Rôle |
| --- | --- |
| `features/player/QueuePanel.tsx` | Panneau latéral modal, vidage confirmé |
| `features/player/QueueList.tsx` | Lignes déplaçables avec poignée |
| `features/player/useQueueDrag.ts` | Glisser-déposer natif vers `moveInQueue` |
| `features/player/QueueItem.tsx` | Saut, monter, descendre, retirer |

Le glisser-déposer HTML5 nécessite `dragDropEnabled: false` dans la fenêtre Tauri
(`tauri.conf.json`) : sinon WebView2 intercepte le glisser pour le dépôt de
fichiers. Kalo n'utilise pas le dépôt de fichiers natif. Les flèches restent
l'alternative au clavier.

## Erreurs de lecture

| Fichier | Rôle |
| --- | --- |
| `features/player/PlayerErrorBanner.tsx` | Message et actions |
| `features/player/audio.events.ts` | `READ_ERROR` et `playError` (source illisible) |
| `features/player/audio.retry.ts` | Rechargement et reprise à la position |
| `features/library/useRelocateTrack.ts` | Relocalisation partagée avec la bibliothèque |

- **Réessayer** recharge le même fichier (disque rebranché, fichier restauré)
  et reprend à la position atteinte.
- **Localiser le fichier** ouvre le sélecteur natif, relocalise la référence
  (dossiers surveillés uniquement), met à jour la file et recharge la lecture :
  le transport identifie un morceau par id et chemin.
- **Suivant** efface l'erreur et passe au morceau suivant.

## Limite : choix de la sortie audio

WebView2 (Chromium) ne liste les sorties audio qu'après un accès au micro.
Demander le micro pour choisir des haut-parleurs contredit le principe de
permission minimale : la sortie suit donc le périphérique par défaut du système.

## Tests

`QueueList.test.tsx` (dépôt d'une ligne, morceau courant conservé),
`audio.events.test.ts` (traduction des erreurs).

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action ou d'état uniquement.
- [x] Aucune bordure unilatérale (cible de dépôt en anneau complet).
- [x] Tokens de couleur uniquement.
- [x] Fichiers de code sous 50 lignes.

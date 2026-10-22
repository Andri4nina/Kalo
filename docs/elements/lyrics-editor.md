# Paroles et éditeur de synchronisation

## Sources de paroles

Ordre de priorité, résolu par `commands/lyrics/read.rs` :

1. Paroles éditées dans Kalo (table `lyrics`, migration 009).
2. Fichier `.lrc` voisin du morceau (même nom).
3. Fichier `.txt` voisin : paroles classiques, non synchronisées.

Les fichiers voisins ne sont jamais modifiés. « Revenir au fichier d'origine »
supprime seulement la version éditée.

## Éditeur

| Fichier | Rôle |
| --- | --- |
| `features/karaoke/KaraokePage.tsx` | Bascule affichage en direct / éditeur |
| `features/karaoke/KaraokeLive.tsx` | Ligne active, décalage, plein écran |
| `features/karaoke/PlainLyrics.tsx` | Paroles classiques |
| `features/karaoke/LyricsEditor.tsx` | Étapes texte puis marquage |
| `features/karaoke/EditorTextStep.tsx` | Texte collé (un LRC garde ses horodatages) |
| `features/karaoke/EditorSyncStep.tsx`, `EditorLineRow.tsx` | Marquage, réglage ±0,1 s, placement, écoute |
| `features/karaoke/EditorFooter.tsx` | Enregistrer, exporter, revenir, annuler |
| `features/karaoke/lrc.edit.ts`, `lrc.format.ts` | Logique pure (préparation, marquage, format LRC) |
| `features/karaoke/useLyricsEditor.ts`, `useLyricsPersistence.ts` | État et persistance |
| `commands/lyrics/*` | Lecture, enregistrement, retour au fichier, export |

- « Marquer » horodate la ligne courante avec la position de lecture et passe à
  la suivante. Le bouton garde le focus : Entrée ou Espace marquent sans
  déclencher le raccourci lecture / pause.
- L'enregistrement exige que toutes les lignes soient marquées.
- L'export n'accepte qu'une destination `.lrc` : un fichier audio ne peut pas
  être écrasé.

## Tests

`lrc.edit.test.ts`, `lib/safeName.test.ts`, `kalo-database/tests/lyrics.rs`.

## Limites

- Pas d'horodatage mot à mot (format LRC étendu) dans l'éditeur.
- Réduction de la voix : dépend du Stem Studio.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji, aucun caractère invisible dans le code.
- [x] Icônes Lucide d'action uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers de code sous 50 lignes.

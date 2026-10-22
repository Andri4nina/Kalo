# Clips vidéo

| Fichier | Rôle |
| --- | --- |
| `crates/kalo-database/migrations/010_videos.sql` | Table `videos`, séparée des morceaux |
| `crates/kalo-database/src/videos/*` | Enregistrement, fichiers disparus, liste |
| `crates/kalo-library/src/videos.rs`, `videos/describe.rs` | Passe d'analyse des clips, titre et durée MP4 |
| `crates/kalo-library/src/extensions.rs` | Formats vidéo lus par le moteur web |
| `crates/kalo-library/src/organize/target.rs` | Classement `<Artiste>/video/<Titre>.<ext>` |
| `commands/videos.rs` | `video_list` |
| `features/videos/*` | Page Clips, cartes, lecteur |

- Formats : MP4, M4V, WebM (lecture native du moteur web). Les autres
  conteneurs (MKV, AVI) ne sont pas proposés.
- Les clips n'entrent jamais dans la bibliothèque musicale ni dans les playlists.
- Ouvrir un clip met la musique en pause.
- Un clip disparu reste listé, marqué introuvable.

## Limites

- Pas de vignette : il faudrait décoder une image (ffmpeg non embarqué).
- La surveillance automatique des dossiers ne suit que l'audio ; les clips sont
  mis à jour à chaque analyse.
- Lecture non éprouvée dans la fenêtre native.

## Tests

`kalo-library/tests/videos.rs` (indexation à part, fichier disparu, classement).

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide porteuses de sens (Clapperboard, Film, Play).
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers de code sous 50 lignes.

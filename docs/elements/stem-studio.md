# Stem Studio

Séparation locale des instruments et mixeur multipiste.

## Moteur (`crates/kalo-stems`)

| Module | Rôle |
| --- | --- |
| `separator.rs` | Contrat indépendant du fournisseur IA (`Separator`) |
| `onnx.rs`, `onnx/load.rs` | Moteur Spleeter sur ONNX Runtime, sessions chargées pour une tâche |
| `dsp/*` | STFT 4096/1024, fenêtre de Hann périodique, masques, reconstruction en flux |
| `pipeline/*` | Traitement par blocs de 512 trames (mémoire bornée), annulation |
| `audio/*` | Décodage (symphonia), rééchantillonnage Lanczos à 44,1 kHz, WAV 16 bits |
| `job.rs` | Tâche complète, écriture dans `.partial` puis renommage |
| `models/*` | Catalogue figé, téléchargement vérifié par SHA-256, désinstallation |

Sorties : `vocals`, `drums`, `bass`, `other`, et `instrumental` (somme des masques
batterie, basse et autres, soit le mix sans la voix).

## Application

- Table `stem_jobs` (migration 011) ; tâches restées « en cours » marquées
  interrompues au démarrage.
- Commandes `stem_*` (registre dédié) : état, téléchargement et désinstallation
  du modèle, lancement, annulation, liste, suppression, export d'une piste.
- Événements `stem:model-progress`, `stem:progress`, `stem:finished`.
- Pistes dans `<données Kalo>/stems/<tâche>/`, lisibles par le protocole d'assets.
- Interface `features/stems/*` : modèle, nouvelle séparation (morceau en cours),
  historique avec suppression confirmée, mixeur (volume, panoramique, sourdine,
  préréglages Karaoké et A cappella, écoute de l'original), export des pistes et
  du mix.

## Tests

- `tests/invariant.rs` : la somme des quatre pistes reconstruit le mix
  (< −100 dB), l'instrumental vaut le mix moins la voix, sur plusieurs blocs.
- `tests/cancel.rs`, `tests/resample.rs`.
- `tests/real_model.rs` (ignoré par défaut) : téléchargement réel, empreintes,
  séparation de 10 s, 5 fichiers de bonne longueur, aucun résidu temporaire.
  Exécuté avec succès le 22 octobre 2026 (83 s, téléchargement compris).
- `kalo-database/tests/stem_jobs.rs`, `mixer.levels.test.ts`, `bytes.test.ts`.

## Limites

- La séparation n'est jamais parfaite ; au-delà de 11 kHz, les masques sont
  prolongés par leur moyenne (méthode « average »).
- Opus non décodable par symphonia : ces fichiers ne peuvent pas être séparés.
- Le mixeur décode les pistes en mémoire (environ 85 Mo par piste de 4 minutes).
- Une piste de 4 minutes produit environ 210 Mo de WAV ; supprimer une séparation
  libère cet espace.
- Mixeur non éprouvé dans la fenêtre native avec un vrai morceau.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action ou de catégorie uniquement.
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers de code sous 50 lignes.

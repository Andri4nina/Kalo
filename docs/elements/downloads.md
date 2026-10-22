# Téléchargements

Récupération de fichiers audio que l'utilisateur a le droit de conserver, pour
une écoute hors ligne.

## Sources

- **Lien direct** : toute adresse `http(s)` vers un fichier audio, sans
  identifiants dans l'adresse.
- **Internet Archive** : recherche limitée aux œuvres audio sous licence
  Creative Commons ou dans le domaine public ; la licence est affichée et
  enregistrée avec le téléchargement, le MD5 publié est vérifié.
- Exclus : YouTube et services de streaming. Aucune protection ni condition
  d'utilisation n'est contournée. L'utilisateur coche une confirmation de droits
  avant chaque téléchargement.

## Moteur (`crates/kalo-downloads`)

| Module | Rôle |
| --- | --- |
| `url.rs`, `url/percent.rs` | Validation des liens, nom de fichier décodé, encodage |
| `http.rs`, `http/{request,stream}.rs` | Transfert `ureq`, reprise par `Range`, plafond de 2 Go, pause et annulation entre blocs |
| `verify.rs` | Contrôle MD5 (corruption, pas falsification) |
| `providers/*` | Contrat `Provider` et Internet Archive (recherche, fichiers) |

## Application

- Table `downloads` (migration 012) ; transferts coupés par la fermeture remis
  en pause au démarrage.
- Commandes `download_*` (registre dédié) : démarrage, liste, pause, reprise,
  annulation, retrait, recherche et fichiers d'une œuvre.
- Fichier partiel dans `<données Kalo>/downloads/<id>/`, puis contrôle MD5,
  contrôle « audio lisible » (lofty) et import vérifié (copie classée,
  détection de doublons) dans le dossier choisi.
- Événements `download:progress`, `download:finished`, `library:changed`.
- Interface `features/downloads/*` : onglets Lien direct et Internet Archive,
  choix du dossier, confirmation de droits, file avec progression, débit et
  actions libellées.

## Tests

- `kalo-downloads/tests/url.rs`, `tests/archive_parse.rs`.
- `kalo-database/tests/downloads.rs`.
- Parcours navigateur avec IPC simulé : recherche, ouverture d'une œuvre,
  confirmation, appel `download_start` avec licence et MD5.

## Limites

- Aucun essai réseau réel dans la fenêtre native.
- Pas de proxy ni de limitation de débit.
- Un serveur sans `Range` fait repartir la reprise de zéro.

## Conformité règles d'or

- [x] Aucun dégradé, aucun emoji.
- [x] Icônes Lucide d'action uniquement (recherche, télécharger, pause, reprise, annulation, retrait).
- [x] Aucune bordure unilatérale.
- [x] Tokens de couleur uniquement.
- [x] Fichiers de code sous 50 lignes.

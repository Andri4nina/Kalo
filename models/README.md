# Modèles locaux

Aucun modèle IA n'est versionné dans ce dépôt. Les poids sont téléchargés par
l'application, sur demande explicite de l'utilisateur, dans le dossier de
données de Kalo (jamais dans le dossier musical).

## Séparation des instruments (Stem Studio)

| | |
| --- | --- |
| Modèle | Spleeter 4 pistes (Deezer) : voix, batterie, basse, autres |
| Format | ONNX, demi-précision (`*.fp16.onnx`), 4 fichiers, 78,9 Mo |
| Source | [huggingface.co/Best-Practice/spleeter-4stems-onnx](https://huggingface.co/Best-Practice/spleeter-4stems-onnx), révision figée `486643021f18a4d057d282fff1d11b89a30e9887` |
| Intégrité | SHA-256 de chaque fichier vérifiée avant usage (`crates/kalo-stems/src/models/files.rs`) |
| Licence | Graphe dérivé de sherpa-onnx (Apache-2.0). Poids Spleeter de Deezer : MIT selon l'article JOSS des auteurs ; le README de Spleeter ne mentionne que le code (question ouverte deezer/spleeter#898) |
| Exécution | ONNX Runtime sur le processeur, chargé seulement pendant une séparation |
| Emplacement | `<données Kalo>/models/spleeter-4stems/` ; désinstallable depuis le Stem Studio |

Le dépôt source est récent et publié par un tiers ; c'est pourquoi la révision
et les empreintes sont figées : un fichier modifié est rejeté.

## Règles

- Téléchargement uniquement depuis une source documentée, après consentement.
- Vérification d'intégrité avant chargement ; fichier partiel supprimé en cas
  d'échec ou d'annulation.
- Licence, taille et source affichées avant le téléchargement.
- Une seule tâche lourde à la fois ; modèle déchargé à la fin de la tâche.
- Aucun envoi de fichier audio vers un service distant.

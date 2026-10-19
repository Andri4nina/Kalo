# Modèles locaux

Aucun modèle IA n'est versionné dans ce dossier. Les futurs moteurs de séparation
de stems, de transcription ou de paroles téléchargeront leurs poids localement,
après consentement explicite de l'utilisateur.

## Règles prévues

- Emplacement : dossier de données applicatif, jamais le dossier musical.
- Téléchargement uniquement depuis une source documentée et autorisée.
- Vérification d'intégrité (empreinte) avant chargement.
- Licence, taille et source affichées avant le téléchargement.
- Chargement explicite puis déchargement pour libérer la mémoire.
- Une seule tâche lourde à la fois par défaut.
- Aucun envoi de fichier audio vers un service distant sans consentement.
- Suppression des fichiers temporaires après annulation ou erreur.

## État actuel

Aucun moteur n'est intégré. Les sections Studio audio, Stem Studio et Karaoké
sont documentées dans [docs/ROADMAP.md](../docs/ROADMAP.md) mais ne sont pas
disponibles dans l'application.

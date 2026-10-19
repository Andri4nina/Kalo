# Sécurité

## Versions prises en charge

Kalo est en développement actif. Seule la branche principale reçoit des
correctifs de sécurité. Aucune version publiée n'est actuellement supportée.

## Signaler une vulnérabilité

N'ouvrez pas d'issue publique contenant des détails exploitables.

Utilisez de préférence l'onglet **Security** du dépôt GitHub, puis
**Report a vulnerability**, afin d'ouvrir un avis privé. Si ce canal n'est pas
disponible, contactez directement un mainteneur par message privé sur GitHub.

Incluez si possible :

- la version ou le commit concerné ;
- le système et la version de WebView ;
- les étapes de reproduction ;
- l'impact estimé ;
- une preuve de concept minimale, sans fichier personnel.

Nous accuserons réception dès que possible et coordonnerons la divulgation. Aucun
délai de réponse contractuel n'est garanti pour ce projet bénévole.

## Modèle de sécurité

- Le scanner ouvre les fichiers audio en lecture seule.
- Aucun fichier musical n'est déplacé, renommé ou supprimé.
- Les pochettes extraites sont écrites dans le cache applicatif.
- Le protocole d'assets Tauri n'expose que les dossiers de bibliothèque
  explicitement ajoutés et le cache des pochettes.
- Les commandes IPC valident les identifiants et les chemins côté Rust.
- Aucune télémétrie n'est envoyée par le socle actuel.
- Les futures fonctions réseau (paroles, téléchargements, moteurs IA distants)
  devront être désactivées par défaut et nécessiter un consentement explicite.
- Aucun contournement de DRM ou de conditions d'utilisation ne sera accepté.

## Hors périmètre

- Fichiers audio corrompus fournis volontairement par l'utilisateur.
- Accès physique à une machine déverrouillée.
- Vulnérabilités propres à un navigateur ou à WebView sans impact spécifique à
  Kalo.
- Services tiers non intégrés au dépôt.

## Dépendances

Les licences des dépendances directes sont listées dans
[docs/DEPENDENCIES.md](docs/DEPENDENCIES.md). Les mises à jour doivent être
vérifiées avec `cargo audit` et `npm audit` lorsqu'ils sont disponibles.

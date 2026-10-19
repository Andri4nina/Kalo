# Contribuer à Kalo

Merci de votre intérêt. Kalo est un lecteur musical local-first : la fiabilité,
la sécurité des fichiers et l'honnêteté sur l'état des fonctionnalités passent
avant la vitesse de livraison.

## Avant de commencer

1. Lisez [docs/RULES.md](docs/RULES.md) et [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
2. Installez les prérequis de [docs/BUILD.md](docs/BUILD.md).
3. Vérifiez que `npm install` et `npm run check` passent sur votre machine.

## Signaler un problème

- Recherchez d'abord une issue existante.
- Pour un bug, indiquez le système, la version de Kalo, les étapes de
  reproduction, le résultat attendu et le résultat observé.
- Pour une faille de sécurité, n'ouvrez pas d'issue publique : suivez
  [SECURITY.md](SECURITY.md).
- Joignez des journaux sans chemins personnels ni fichiers audio protégés.

## Proposer une modification

1. Ouvrez une issue pour les changements importants afin d'éviter un travail
   inutile.
2. Créez une branche courte et descriptive.
3. Découpez le code par responsabilité : 50 lignes physiques maximum par fichier.
4. Ajoutez ou adaptez les tests des logiques critiques.
5. Exécutez la vérification complète :

```bash
npm run check
```

6. Décrivez dans la pull request ce qui a été testé, sur quelles plateformes, et
   ce qui reste non vérifié.

## Règles de code

- TypeScript strict, pas de `any` non justifié.
- Rust idiomatique, erreurs typées, pas de `unwrap()` ni `expect()` non justifié.
- Aucun dégradé linéaire, emoji, bordure unilatérale de carte, bleu Tailwind par
  défaut, CSS personnalisé ni style inline.
- Icônes uniquement via `lucide-react`.
- Palette centralisée dans `apps/desktop/src/design`.
- Toute suppression dans l'interface demande une confirmation.
- Le code ne déplace, ne renomme et ne supprime jamais un fichier audio.

Un contributeur doit pouvoir lire un module sans connaître tout le projet. Si un
fichier mélange plusieurs responsabilités, découpez-le au lieu de le compacter.

## Tests

- Les tests Rust d'intégration vivent dans `crates/*/tests`.
- Une correction de bug doit inclure un test qui échoue sans le correctif.
- Un test ne doit pas dépendre d'un dossier musical réel ni du réseau.
- Ne supprimez pas un test pour faire passer la CI : corrigez le comportement ou
  expliquez précisément pourquoi le test est invalide.

## Commits et pull requests

- Un commit par changement cohérent, message à l'impératif.
- Pas de secrets, de fichiers de musique, de modèles IA volumineux ni de bases
  SQLite dans le dépôt.
- Les pull requests doivent rester focalisées et décrire les compromis.
- Les mainteneurs peuvent demander un découpage ou des tests supplémentaires.

## Conduite

La participation est encadrée par [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

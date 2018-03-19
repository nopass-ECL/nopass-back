# nopass-back

## Notes pour la suite
- On stocke les clés publiques dans une BDD non relationnelle (_mongoDB_)
- mongoDB permettra de gérer l'expiration des _challenges_ (_time-to-live_)
- Ajouter une route pour fournir la clé publique
- Pistes d'amélioration : gérer l'ajout d'une clé publique __supplémentaire__
- Piste d'amélioration : Redis
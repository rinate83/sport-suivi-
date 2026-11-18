# ApexFit — suivi sportif

Application web installable (iPhone : Safari › Partager › Sur l'écran d'accueil). Données 100 % locales.

- **Accueil** : récap de la semaine, prochaine séance du programme, calendrier mensuel par sport
- **Pages par sport** (course, muscu, vélo, natation, HIIT, yoga/mobilité, marche, autre) : suivi, records, évolution, historique
- **Bibliothèque de mouvements** : exécution, erreurs fréquentes, conseils, dose
- **Séances types** : sauvegarder une séance et la refaire en un geste
- **Séance en direct** : chrono, séries, charges de la dernière fois, minuteur de repos, séries chronométrées
- **Test de capacités** : échauffement + 5 tests (pompes, squats, gainage, tractions, souplesse, Cooper ou Ruffier) → niveau, allures, programmes adaptés
- **Programmes** prêts à suivre (remise en forme, prise de muscle, force, perte de poids, 5 km, 10 km, mobilité, natation, vélo)

## Développement
Le code est dans `src/` ; `./build.sh` assemble `index.html`.

## Développement

- Le code est dans `src/` ; `./build.sh` assemble `index.html` et génère `sw.js` (cache hors connexion de toutes les images).
- Tests des calculs (sans navigateur) : `node tests/unit.mjs`.
- Aucune donnée n’est envoyée à un serveur : chaque personne garde ses données sur son téléphone (sauvegarde par fichier dans Profil).
- Partager une séance : bouton 🔗 sur une séance type ou une séance de préparation → le lien contient la séance.

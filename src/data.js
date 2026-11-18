// ===================== SPORTS =====================
const SPORTS = {
  course:   { nom: 'Course à pied', ic: '🏃', c: '#22c55e', kind: 'cardio', dist: 'km', deniv: true },
  muscu:    { nom: 'Musculation', ic: '🏋️', c: '#818cf8', kind: 'force' },
  velo:     { nom: 'Vélo', ic: '🚴', c: '#f59e0b', kind: 'cardio', dist: 'km', deniv: true },
  natation: { nom: 'Natation', ic: '🏊', c: '#38bdf8', kind: 'cardio', dist: 'm' },
  hiit:     { nom: 'HIIT / Cross-training', ic: '🔥', c: '#f43f5e', kind: 'force' },
  mobilite: { nom: 'Yoga / Mobilité', ic: '🧘', c: '#c084fc', kind: 'force' },
  marche:   { nom: 'Marche / Rando', ic: '🥾', c: '#a3e635', kind: 'cardio', dist: 'km', deniv: true },
  autre:    { nom: 'Autre sport', ic: '⚽', c: '#94a3b8', kind: 'libre' }
};

// ===================== BIBLIOTHÈQUE DE MOUVEMENTS =====================
// M(sport, id, nom, groupe, matériel, niveau 1-3, muscles, [étapes], [erreurs], conseil, dose conseillée)
const LIB = [];
const M = (s, id, n, g, mat, niv, mu, how, err, tip, dose) => LIB.push({ s, id, n, g, mat, niv, mu, how, err, tip, dose });

// ---- Musculation
M('muscu', 'dc', 'Développé couché', 'Pectoraux', 'Barre + banc', 2, 'Pectoraux, triceps, épaules avant',
  ['Allongé, yeux sous la barre, omoplates serrées et pieds bien à plat.', 'Descendez la barre contrôlée jusqu’au bas des pectoraux, coudes à ~45° du buste.', 'Poussez en expirant jusqu’aux bras tendus, sans décoller les fesses.'],
  ['Coudes ouverts à 90° (épaules en danger)', 'Rebond de la barre sur la poitrine'], 'Gardez les omoplates « rangées dans les poches » tout le long.', '4 × 6–10, repos 2 min');
M('muscu', 'dih', 'Développé incliné haltères', 'Pectoraux', 'Haltères + banc incliné', 2, 'Haut des pectoraux, épaules',
  ['Banc à 30°, haltères au-dessus des épaules.', 'Descendez lentement jusqu’à sentir l’étirement des pectoraux.', 'Remontez en rapprochant les haltères sans les cogner.'],
  ['Banc trop incliné (travail d’épaules)', 'Descente trop rapide'], 'Contrôlez 2–3 s à la descente.', '3 × 8–12, repos 90 s');
M('muscu', 'pompe', 'Pompes', 'Pectoraux', 'Aucun', 1, 'Pectoraux, triceps, gainage',
  ['Mains un peu plus larges que les épaules, corps aligné de la tête aux talons.', 'Descendez la poitrine à 2–3 cm du sol, coudes à ~45°.', 'Repoussez le sol en gardant le ventre serré.'],
  ['Bassin qui s’affaisse', 'Amplitude réduite'], 'Trop dur ? Faites-les sur les genoux ou les mains sur un banc.', '3 × max − 2 reps');
M('muscu', 'dips', 'Dips', 'Pectoraux', 'Barres parallèles', 3, 'Triceps, bas des pectoraux',
  ['En appui bras tendus, buste légèrement penché.', 'Descendez jusqu’aux coudes à 90°.', 'Remontez sans verrouiller brutalement.'],
  ['Descendre trop bas (épaules)', 'Balancer les jambes'], 'Débutant : faites-les sur un banc, pieds au sol.', '3 × 6–12');
M('muscu', 'ecarte', 'Écarté à la poulie', 'Pectoraux', 'Poulie ou haltères', 1, 'Pectoraux',
  ['Bras légèrement fléchis, ouvrez en arc de cercle.', 'Ramenez les mains devant la poitrine comme pour serrer un arbre.', 'Gardez le même angle de coude tout le mouvement.'],
  ['Transformer le mouvement en développé', 'Charge trop lourde'], 'Mouvement d’isolation : la sensation prime sur la charge.', '3 × 12–15');
M('muscu', 'tractions', 'Tractions', 'Dos', 'Barre fixe', 3, 'Grand dorsal, biceps',
  ['Suspendu, mains en pronation un peu plus larges que les épaules.', 'Tirez les coudes vers les hanches jusqu’au menton au-dessus de la barre.', 'Redescendez lentement bras tendus.'],
  ['Demi-amplitude', 'Élan avec les jambes'], 'Pas encore de traction ? Tractions négatives (5 s de descente) ou avec élastique.', '4 × max − 1');
M('muscu', 'rowb', 'Rowing barre', 'Dos', 'Barre', 2, 'Dos, arrière d’épaule, biceps',
  ['Buste penché à ~45°, dos plat, genoux légèrement fléchis.', 'Tirez la barre vers le nombril en serrant les omoplates.', 'Redescendez contrôlé sans arrondir le dos.'],
  ['Dos rond', 'Se redresser pour tricher'], 'Imaginez tenir un crayon entre les omoplates en haut.', '4 × 8–10');
M('muscu', 'rowh', 'Rowing haltère un bras', 'Dos', 'Haltère + banc', 1, 'Grand dorsal, rhomboïdes',
  ['Un genou et une main sur le banc, dos plat.', 'Tirez l’haltère vers la hanche, coude près du corps.', 'Descendez en laissant l’épaule s’étirer.'],
  ['Rotation du buste', 'Tirer avec le biceps'], 'Pensez « coude vers la poche arrière ».', '3 × 10–12 par bras');
M('muscu', 'tirage', 'Tirage vertical', 'Dos', 'Poulie haute', 1, 'Grand dorsal',
  ['Assis, cuisses calées, prise un peu plus large que les épaules.', 'Tirez la barre vers le haut de la poitrine, buste légèrement en arrière.', 'Remontez en contrôlant jusqu’aux bras tendus.'],
  ['Tirer derrière la nuque', 'Se balancer'], 'Excellente préparation aux tractions.', '3 × 10–12');
M('muscu', 'sdt', 'Soulevé de terre', 'Chaîne postérieure', 'Barre', 3, 'Fessiers, ischios, dos, trapèzes',
  ['Pieds largeur de hanches, barre au-dessus du milieu du pied.', 'Dos plat, poitrine sortie, poussez le sol avec les jambes.', 'Verrouillez hanches et genoux en haut, redescendez la barre le long des jambes.'],
  ['Dos rond', 'Barre loin du corps'], 'Gainez fort (inspiration bloquée) avant chaque répétition.', '3–5 × 3–6, repos 3 min');
M('muscu', 'sdtr', 'Soulevé de terre roumain', 'Chaîne postérieure', 'Barre ou haltères', 2, 'Ischios, fessiers',
  ['Debout, genoux légèrement fléchis et fixes.', 'Reculez les hanches en descendant la barre le long des cuisses, dos plat.', 'Remontez en poussant les hanches vers l’avant.'],
  ['Plier les genoux comme un squat', 'Dos rond en bas'], 'Descendez jusqu’à la tension des ischios, pas plus bas.', '3 × 8–10');
M('muscu', 'squat', 'Squat barre', 'Jambes', 'Barre + rack', 2, 'Quadriceps, fessiers, gainage',
  ['Barre sur les trapèzes, pieds largeur d’épaules, pointes légèrement ouvertes.', 'Descendez hanches en arrière et genoux vers l’extérieur, au moins cuisses parallèles.', 'Remontez en poussant le sol, poitrine haute.'],
  ['Genoux qui rentrent', 'Talons qui décollent'], 'Gainez avant chaque descente, regard droit devant.', '4 × 5–8, repos 2–3 min');
M('muscu', 'goblet', 'Goblet squat', 'Jambes', 'Haltère ou kettlebell', 1, 'Quadriceps, fessiers',
  ['Tenez la charge contre la poitrine, coudes vers le bas.', 'Descendez entre les jambes, buste droit.', 'Remontez en poussant dans les talons.'],
  ['Buste qui plonge vers l’avant', 'Amplitude partielle'], 'Idéal pour apprendre le squat.', '3 × 10–15');
M('muscu', 'fentes', 'Fentes', 'Jambes', 'Aucun ou haltères', 1, 'Quadriceps, fessiers',
  ['Grand pas en avant, buste droit.', 'Descendez le genou arrière près du sol, genou avant au-dessus de la cheville.', 'Repoussez pour revenir ou avancer (fentes marchées).'],
  ['Genou avant qui rentre', 'Pas trop court'], 'Variante : fentes bulgares, pied arrière sur un banc.', '3 × 10 par jambe');
M('muscu', 'presse', 'Presse à cuisses', 'Jambes', 'Machine', 1, 'Quadriceps, fessiers',
  ['Pieds largeur d’épaules au milieu du plateau.', 'Descendez jusqu’à ~90° de flexion sans décoller le bassin.', 'Poussez sans verrouiller les genoux en haut.'],
  ['Bassin qui s’enroule en bas', 'Genoux verrouillés'], 'Pieds hauts = plus de fessiers, pieds bas = plus de quadriceps.', '3 × 10–15');
M('muscu', 'hipthrust', 'Hip thrust', 'Jambes', 'Banc + barre ou haltère', 2, 'Fessiers',
  ['Haut du dos sur un banc, charge sur les hanches.', 'Poussez les hanches jusqu’à l’alignement épaules-genoux.', 'Serrez les fessiers 1 s en haut puis redescendez.'],
  ['Cambrer le bas du dos', 'Pousser avec les pointes'], 'Menton rentré, regard vers les genoux.', '3 × 10–12');
M('muscu', 'legcurl', 'Leg curl', 'Jambes', 'Machine', 1, 'Ischios',
  ['Réglez le boudin au-dessus des chevilles.', 'Fléchissez les genoux au maximum.', 'Revenez lentement.'],
  ['Décoller les hanches', 'Mouvement saccadé'], 'Lent à la descente (3 s).', '3 × 12');
M('muscu', 'mollets', 'Mollets debout', 'Jambes', 'Marche ou machine', 1, 'Mollets',
  ['Avant des pieds sur une marche, talons dans le vide.', 'Montez sur la pointe des pieds au maximum.', 'Descendez lentement sous le niveau de la marche.'],
  ['Rebondir', 'Amplitude réduite'], 'Pause d’1 s en haut et en bas.', '4 × 12–20');
M('muscu', 'dm', 'Développé militaire', 'Épaules', 'Barre ou haltères', 2, 'Épaules, triceps',
  ['Debout, barre au niveau des clavicules, fessiers et abdos serrés.', 'Poussez la barre au-dessus de la tête en passant la tête sous la barre.', 'Redescendez contrôlé aux clavicules.'],
  ['Cambrer le dos', 'Pousser la barre loin devant'], 'Le gainage fait tout : serrez les fessiers.', '4 × 6–10');
M('muscu', 'elev', 'Élévations latérales', 'Épaules', 'Haltères', 1, 'Épaules (faisceau moyen)',
  ['Debout, haltères le long du corps, coudes légèrement fléchis.', 'Montez les bras sur les côtés jusqu’à l’horizontale.', 'Redescendez lentement.'],
  ['Monter avec élan', 'Hausser les épaules'], 'Charges légères, sensation avant tout.', '3 × 12–20');
M('muscu', 'facepull', 'Face pull', 'Épaules', 'Poulie + corde', 1, 'Arrière d’épaule, coiffe des rotateurs',
  ['Poulie à hauteur du visage, corde en main.', 'Tirez vers le front en écartant les mains, coudes hauts.', 'Revenez doucement.'],
  ['Tirer trop bas', 'Charge trop lourde'], 'Excellent pour la santé des épaules : à faire souvent.', '3 × 15');
M('muscu', 'curl', 'Curl biceps', 'Bras', 'Haltères ou barre', 1, 'Biceps',
  ['Debout, coudes collés au corps.', 'Fléchissez en tournant la paume vers le haut.', 'Redescendez complètement.'],
  ['Balancer le buste', 'Coudes qui avancent'], 'Descente lente = plus efficace.', '3 × 10–12');
M('muscu', 'marteau', 'Curl marteau', 'Bras', 'Haltères', 1, 'Biceps, avant-bras',
  ['Prise neutre (pouces vers le haut).', 'Fléchissez sans bouger les coudes.', 'Redescendez lentement.'],
  ['Élan', 'Poignets cassés'], 'Renforce aussi la prise.', '3 × 10–12');
M('muscu', 'triceps', 'Extension triceps poulie', 'Bras', 'Poulie', 1, 'Triceps',
  ['Coudes collés au corps, avant-bras à l’horizontale.', 'Tendez complètement les bras vers le bas.', 'Remontez jusqu’à 90°.'],
  ['Coudes qui bougent', 'Se pencher sur la charge'], 'Écartez la corde en bas pour plus de contraction.', '3 × 12–15');
M('muscu', 'gainage', 'Gainage planche', 'Abdos / gainage', 'Aucun', 1, 'Abdominaux profonds, lombaires',
  ['Sur les avant-bras et les pointes de pied, coudes sous les épaules.', 'Corps aligné, ventre et fessiers serrés.', 'Respirez calmement en tenant la position.'],
  ['Fesses trop hautes', 'Bas du dos qui creuse'], 'Mieux vaut 30 s parfaites que 2 min avachies.', '3 × 30–60 s');
M('muscu', 'gainlat', 'Gainage latéral', 'Abdos / gainage', 'Aucun', 1, 'Obliques',
  ['Sur un avant-bras, pieds empilés.', 'Montez le bassin jusqu’à l’alignement.', 'Tenez sans laisser tomber la hanche.'],
  ['Hanche qui descend', 'Épaule écrasée'], 'Débutant : genoux au sol.', '3 × 20–45 s par côté');
M('muscu', 'releve', 'Relevés de jambes', 'Abdos / gainage', 'Sol ou barre', 2, 'Abdominaux (bas)',
  ['Allongé, mains sous les fesses (ou suspendu à une barre).', 'Montez les jambes tendues jusqu’à la verticale.', 'Redescendez sans toucher le sol, bas du dos plaqué.'],
  ['Dos qui se cambre', 'Élan'], 'Jambes fléchies pour faciliter.', '3 × 10–15');
M('muscu', 'swing', 'Kettlebell swing', 'Chaîne postérieure', 'Kettlebell', 2, 'Fessiers, ischios, cardio',
  ['Pieds un peu plus larges que les hanches, kettlebell devant.', 'Charnière de hanche : la kettlebell passe entre les jambes.', 'Projetez les hanches vers l’avant : la kettlebell monte à hauteur d’épaules.'],
  ['Squatter au lieu de basculer les hanches', 'Lever avec les bras'], 'Les bras ne font que guider, ce sont les hanches qui lancent.', '5 × 15');

// ---- Course à pied (gammes, séances, technique)
M('course', 'ef', 'Footing en endurance fondamentale', 'Séance', 'Aucun', 1, 'Système cardio-respiratoire',
  ['Courez à une allure où vous pouvez parler en phrases complètes (≈ 65–75 % de la VMA).', 'Gardez une foulée relâchée et une cadence régulière.', 'Finissez en marchant 2–3 min.'],
  ['Courir trop vite « pour que ça compte »', 'Partir sans échauffement'], 'C’est la base de 70–80 % de l’entraînement d’un coureur.', '30–60 min');
M('course', 'fc', 'Fractionné court 30/30', 'Séance', 'Aucun', 2, 'VMA, cardio',
  ['Échauffement 15–20 min de footing + quelques gammes.', 'Alternez 30 s rapide (≈ 100 % VMA) / 30 s trottinement, 2 × 8–10 répétitions.', 'Récupérez 3 min entre les blocs, retour au calme 10 min.'],
  ['Partir trop vite sur les premières', 'Marcher pendant les récupérations'], 'Les 30 s doivent toutes être courues à la même vitesse.', '2 × 10 × 30/30');
M('course', 'fl', 'Fractionné long (VMA longue)', 'Séance', 'Piste ou parcours mesuré', 3, 'VMA, endurance de vitesse',
  ['Échauffement 20 min + gammes + 2 accélérations.', '5–6 × 1000 m à ≈ 90–95 % VMA, récupération 2 min en trottinant.', 'Retour au calme 10 min.'],
  ['Allure irrégulière', 'Récupérations trop courtes'], 'Visez des répétitions toutes au même chrono.', '5 × 1000 m');
M('course', 'seuil', 'Séance au seuil', 'Séance', 'Aucun', 2, 'Seuil anaérobie',
  ['Échauffement 15 min.', '3 × 8–10 min à allure « confortablement difficile » (≈ 85 % VMA), 2 min de récup.', 'Retour au calme 10 min.'],
  ['Courir au seuil trop souvent', 'Allure trop rapide'], 'Vous devez pouvoir dire quelques mots, pas tenir une conversation.', '3 × 10 min');
M('course', 'sl', 'Sortie longue', 'Séance', 'Aucun', 2, 'Endurance, économie de course',
  ['Courez 1 h à 1 h 45 en endurance fondamentale.', 'Hydratez-vous toutes les 20–30 min si > 1 h.', 'Les 10 dernières minutes peuvent être un peu plus rapides si vous êtes bien.'],
  ['Allure trop rapide', 'Augmenter la durée de plus de 10 % par semaine'], 'Une fois par semaine maximum.', '60–105 min');
M('course', 'cotes', 'Côtes', 'Séance', 'Une côte de 5–8 %', 2, 'Puissance, foulée',
  ['Échauffement 20 min.', '8–10 montées de 30–45 s en accentuant le travail des bras et des genoux.', 'Redescendez en trottinant, puis retour au calme.'],
  ['Se pencher en avant à l’excès', 'Courtes foulées écrasées'], 'Excellent renforcement musculaire spécifique.', '8–10 × 30 s');
M('course', 'talons', 'Talons-fesses', 'Gammes', 'Aucun', 1, 'Ischios, coordination',
  ['En trottinant, ramenez les talons vers les fesses.', 'Restez sur l’avant du pied, buste droit.', 'Cadence rapide, petits pas.'],
  ['Se pencher en arrière', 'Pas trop longs'], 'À faire après 10 min d’échauffement.', '2 × 30 m');
M('course', 'skipping', 'Montées de genoux (skipping)', 'Gammes', 'Aucun', 1, 'Fléchisseurs de hanche, cadence',
  ['Montez les genoux à hauteur des hanches en avançant lentement.', 'Bras actifs, coudes à 90°.', 'Appuis brefs sur l’avant du pied.'],
  ['Buste en arrière', 'Talons au sol'], 'Pensez « sol brûlant ».', '2 × 30 m');
M('course', 'bondissantes', 'Foulées bondissantes', 'Gammes', 'Aucun', 2, 'Puissance, mollets, fessiers',
  ['Enchaînez de grandes foulées en restant longtemps en l’air.', 'Poussez fort avec la jambe d’appui, genou opposé haut.', 'Bras en opposition.'],
  ['Atterrir talon', 'Manquer de gainage'], 'Sur herbe pour limiter les chocs.', '3 × 30 m');
M('course', 'chasses', 'Pas chassés', 'Gammes', 'Aucun', 1, 'Adducteurs, abducteurs, appuis',
  ['De profil, déplacez-vous latéralement sans croiser les pieds.', 'Restez légèrement fléchi, sur l’avant du pied.', 'Alternez le côté.'],
  ['Croiser les jambes', 'Se redresser'], 'Bon pour la stabilité de la cheville.', '2 × 20 m par côté');
M('course', 'lignes', 'Accélérations progressives', 'Gammes', 'Aucun', 1, 'Vitesse, foulée',
  ['Sur 80 m, partez en trottinant et accélérez progressivement.', 'Atteignez ≈ 90 % de votre vitesse max sur les 20 derniers mètres.', 'Revenez en marchant.'],
  ['Démarrer trop fort', 'Crispation des épaules'], 'Restez relâché : mâchoire et mains détendues.', '3–5 × 80 m');
M('course', 'technique', 'Posture et cadence', 'Technique', 'Aucun', 1, 'Économie de course',
  ['Buste grand, légère inclinaison vers l’avant depuis les chevilles.', 'Pied qui se pose sous le centre de gravité, pas loin devant.', 'Cadence autour de 165–180 pas/min.'],
  ['Attaque talon loin devant', 'Épaules crispées'], 'Augmenter la cadence de 5 % réduit souvent les chocs.', 'À chaque sortie');

// ---- Vélo
M('velo', 'z2', 'Sortie endurance (zone 2)', 'Séance', 'Vélo', 1, 'Endurance', ['Roulez à une intensité où la respiration reste facile.', 'Cadence 85–95 tr/min, braquet souple.', 'Mangez toutes les 45 min si > 1 h 30.'], ['Rouler trop fort en montée', 'Braquet trop dur'], 'Base de toute progression à vélo.', '1–3 h');
M('velo', 'sweet', 'Intervalles au seuil (2 × 20)', 'Séance', 'Vélo ou home-trainer', 3, 'Seuil, puissance', ['Échauffement 15 min progressif.', '2 × 20 min à effort « difficile mais tenable », 5 min récup.', 'Retour au calme 10 min.'], ['Partir trop fort', 'Cadence trop basse'], 'Gardez une cadence > 85 tr/min.', '2 × 20 min');
M('velo', 'sprints', 'Sprints', 'Séance', 'Vélo', 2, 'Puissance', ['Après 20 min d’échauffement, sprintez 10–15 s à fond.', 'Récupérez 3–5 min en roulant souple.', 'Faites 6 à 8 sprints.'], ['Récup trop courte', 'Rester assis sur braquet trop dur'], 'Qualité > quantité.', '6–8 × 12 s');
M('velo', 'velocite', 'Vélocité (cadence haute)', 'Technique', 'Vélo', 1, 'Coordination', ['Braquet léger, montez progressivement la cadence à 110–120 tr/min.', 'Gardez le bassin immobile sur la selle.', '5 × 1 min, récup 2 min.'], ['Sautiller sur la selle', 'Crisper le haut du corps'], 'Améliore l’efficacité du coup de pédale.', '5 × 1 min');
M('velo', 'danseuse', 'Montée en danseuse', 'Technique', 'Vélo', 2, 'Puissance, gainage', ['Montez d’une ou deux dents, levez-vous de la selle.', 'Balancez légèrement le vélo de gauche à droite, pas le corps.', 'Alternez assis/danseuse pour gérer l’effort.'], ['Se pencher trop en avant', 'Braquet trop léger'], 'Utile pour relancer et changer de muscles.', 'Sur les bosses');
M('velo', 'reglage', 'Réglage de la position', 'Technique', 'Vélo', 1, 'Confort, prévention', ['Hauteur de selle : jambe presque tendue, talon sur la pédale en bas.', 'Recul : genou à l’aplomb de l’axe de pédale à l’horizontale.', 'Guidon : buste à ~45°, bras légèrement fléchis.'], ['Selle trop basse (genoux)', 'Selle trop haute (bassin qui bascule)'], 'Une douleur au genou vient souvent de la hauteur de selle.', 'Une fois');

// ---- Natation
M('natation', 'crawl', 'Crawl', 'Nages', 'Piscine', 2, 'Dos, épaules, gainage', ['Corps allongé, tête dans l’axe, regard vers le fond.', 'Main qui entre devant l’épaule, tirez jusqu’à la hanche.', 'Respirez sur le côté tous les 2 ou 3 temps.'], ['Tête trop haute (jambes qui coulent)', 'Mains qui croisent l’axe'], 'Expirez dans l’eau en continu.', '4 × 50 m');
M('natation', 'brasse', 'Brasse', 'Nages', 'Piscine', 1, 'Pectoraux, cuisses', ['Tirez les bras en cœur, respirez quand la tête sort.', 'Ramenez les talons vers les fesses, pieds en « canard ».', 'Fouettez puis glissez bras tendus.'], ['Ne pas glisser', 'Genoux trop écartés'], 'Le temps de glisse fait la vitesse.', '4 × 50 m');
M('natation', 'dos', 'Dos crawlé', 'Nages', 'Piscine', 2, 'Dos, épaules', ['Sur le dos, oreilles dans l’eau, hanches hautes.', 'Bras tendu qui entre auriculaire en premier.', 'Battements de jambes réguliers depuis la hanche.'], ['Assis dans l’eau', 'Genoux qui sortent'], 'Regardez le plafond, pas vos pieds.', '4 × 50 m');
M('natation', 'papillon', 'Papillon', 'Nages', 'Piscine', 3, 'Épaules, gainage', ['Ondulation du corps depuis la poitrine.', 'Deux battements de jambes par cycle de bras.', 'Respiration devant, menton qui glisse sur l’eau.'], ['Ondulation trop ample', 'Bras qui sortent fléchis'], 'Commencez par l’ondulation seule.', '4 × 25 m');
M('natation', 'rattrape', 'Éducatif : crawl rattrapé', 'Éducatifs', 'Piscine', 1, 'Technique', ['Un bras attend devant que l’autre bras le rejoigne.', 'Allongez au maximum chaque mouvement.', 'Respirez du côté du bras qui tire.'], ['Bras qui tombent', 'Pas de rotation'], 'Améliore la glisse et la longueur de coulée.', '4 × 25 m');
M('natation', 'planche', 'Battements avec planche', 'Éducatifs', 'Planche', 1, 'Jambes', ['Bras tendus sur la planche, visage dans l’eau si possible.', 'Battements depuis la hanche, pieds en extension.', 'Petite amplitude rapide.'], ['Pédaler', 'Plier les genoux'], 'Chevilles souples, comme des palmes.', '4 × 25 m');
M('natation', 'pull', 'Pull-buoy', 'Éducatifs', 'Pull-buoy', 1, 'Bras, dos', ['Pull-buoy entre les cuisses, nagez en crawl bras seuls.', 'Concentrez-vous sur la traction.', 'Gardez le corps aligné.'], ['Bassin qui balance', 'Traction courte'], 'Idéal pour travailler le haut du corps.', '4 × 50 m');
M('natation', 'resp3', 'Respiration 3 temps', 'Éducatifs', 'Piscine', 2, 'Respiration, symétrie', ['Respirez tous les 3 mouvements de bras, alternativement à gauche et à droite.', 'Expirez lentement dans l’eau.', 'Tournez la tête, ne la levez pas.'], ['Bloquer la respiration', 'Lever la tête'], 'Rend la nage plus symétrique.', '4 × 50 m');

// ---- HIIT / Cross-training
M('hiit', 'burpee', 'Burpees', 'Corps entier', 'Aucun', 2, 'Corps entier, cardio', ['Debout, posez les mains au sol et lancez les pieds en arrière.', 'Pompe (optionnelle), ramenez les pieds sous vous.', 'Sautez bras en l’air.'], ['Dos qui s’affaisse', 'Atterrir jambes tendues'], 'Version douce : sans pompe ni saut.', '40 s / 20 s');
M('hiit', 'jj', 'Jumping jacks', 'Cardio', 'Aucun', 1, 'Cardio', ['Sautez en écartant pieds et bras.', 'Revenez pieds joints, bras le long du corps.', 'Rythme régulier.'], ['Atterrir talons', 'Bras mous'], 'Parfait pour s’échauffer.', '45 s');
M('hiit', 'mc', 'Mountain climbers', 'Cardio', 'Aucun', 1, 'Gainage, cardio', ['Position de pompe, mains sous les épaules.', 'Ramenez les genoux vers la poitrine en alternance rapide.', 'Bassin bas et stable.'], ['Fesses en l’air', 'Mains trop avancées'], 'Plus vite = plus cardio, plus lent = plus gainage.', '30–40 s');
M('hiit', 'squatjump', 'Squat sauté', 'Jambes', 'Aucun', 2, 'Jambes, explosivité', ['Descendez en squat.', 'Sautez le plus haut possible.', 'Réceptionnez souplement en squat.'], ['Genoux qui rentrent à la réception', 'Atterrir jambes tendues'], 'Atterrissez silencieusement.', '30 s');
M('hiit', 'thruster', 'Thrusters', 'Corps entier', 'Haltères ou barre', 2, 'Jambes, épaules', ['Charge aux épaules, descendez en squat.', 'Remontez explosif et poussez la charge au-dessus de la tête.', 'Enchaînez sans pause.'], ['Pousser avec les bras seulement', 'Squat partiel'], 'Utilisez l’élan des jambes.', '3 × 12');
M('hiit', 'boxjump', 'Box jump', 'Jambes', 'Box', 2, 'Explosivité', ['Face à la box, bras en arrière.', 'Sautez et atterrissez en squat sur la box.', 'Redescendez en marchant.'], ['Box trop haute', 'Redescendre en sautant (tendons)'], 'Hauteur modérée, qualité du saut.', '5 × 5');
M('hiit', 'corde', 'Corde à sauter', 'Cardio', 'Corde', 1, 'Mollets, cardio, coordination', ['Coudes près du corps, rotation par les poignets.', 'Petits sauts sur l’avant du pied.', 'Regard droit devant.'], ['Sauter trop haut', 'Bras qui tournent'], 'Excellente pour la cheville du coureur.', '3 × 1 min');
M('hiit', 'fentesaut', 'Fentes sautées', 'Jambes', 'Aucun', 3, 'Jambes, cardio', ['Position de fente.', 'Sautez et changez de jambe en l’air.', 'Réceptionnez en fente contrôlée.'], ['Genou arrière qui tape', 'Buste penché'], 'Remplacez par des fentes alternées si trop dur.', '30 s');
M('hiit', 'commando', 'Planche commando', 'Gainage', 'Aucun', 2, 'Gainage, triceps', ['Planche sur les avant-bras.', 'Montez main par main en planche haute, puis redescendez.', 'Alternez le bras de départ.'], ['Bassin qui tourne', 'Fesses hautes'], 'Pieds écartés = plus stable.', '30 s');
M('hiit', 'wallball', 'Wall ball', 'Corps entier', 'Medecine-ball + mur', 2, 'Jambes, épaules', ['Ballon contre la poitrine, squat.', 'Remontez et lancez le ballon sur une cible haute.', 'Rattrapez et enchaînez le squat.'], ['Squat partiel', 'Lancer avec les bras'], 'Le lancer part des jambes.', '3 × 15');
M('hiit', 'rameur', 'Rameur', 'Cardio', 'Rameur', 1, 'Corps entier', ['Poussez avec les jambes, puis basculez le buste, puis tirez les bras.', 'Retour dans l’ordre inverse : bras, buste, jambes.', 'Cadence 24–30 coups/min.'], ['Tirer avec les bras d’abord', 'Dos rond'], '60 % jambes, 20 % buste, 20 % bras.', '500 m');

// ---- Yoga / Mobilité
M('mobilite', 'chien', 'Chien tête en bas', 'Postures', 'Tapis', 1, 'Ischios, mollets, épaules', ['À quatre pattes, montez les hanches vers le ciel.', 'Allongez le dos, talons vers le sol (genoux fléchis si besoin).', 'Respirez lentement 5 fois.'], ['Dos rond', 'Épaules qui remontent aux oreilles'], 'Priorité au dos long, pas aux jambes tendues.', '5 respirations');
M('mobilite', 'cobra', 'Cobra', 'Postures', 'Tapis', 1, 'Abdos (étirement), dos', ['Allongé sur le ventre, mains sous les épaules.', 'Décollez la poitrine en gardant le pubis au sol.', 'Épaules basses, coudes légèrement fléchis.'], ['Écraser les lombaires', 'Hausser les épaules'], 'Montez seulement jusqu’où c’est confortable.', '5 respirations');
M('mobilite', 'enfant', 'Posture de l’enfant', 'Postures', 'Tapis', 1, 'Dos, hanches', ['À genoux, asseyez-vous sur les talons.', 'Allongez les bras devant, front au sol.', 'Respirez dans le dos.'], ['Forcer sur les genoux'], 'Posture de récupération à tout moment.', '1 min');
M('mobilite', 'guerrier1', 'Guerrier I', 'Postures', 'Tapis', 1, 'Jambes, psoas', ['Fente avant, pied arrière tourné à 45°.', 'Bassin face à l’avant, bras au-dessus de la tête.', 'Genou avant au-dessus de la cheville.'], ['Genou qui dépasse', 'Dos cambré'], 'Rentrez légèrement le ventre.', '5 respirations par côté');
M('mobilite', 'guerrier2', 'Guerrier II', 'Postures', 'Tapis', 1, 'Jambes, hanches', ['Grand écart des pieds, pied avant ouvert à 90°.', 'Fléchissez le genou avant, bras à l’horizontale.', 'Regard au-dessus de la main avant.'], ['Buste penché vers l’avant', 'Genou qui rentre'], 'Pensez à grandir le buste.', '5 respirations par côté');
M('mobilite', 'pigeon', 'Pigeon', 'Hanches', 'Tapis', 2, 'Fessiers, rotateurs de hanche', ['Depuis le chien, amenez un genou derrière le poignet.', 'Allongez la jambe arrière, bassin à plat.', 'Penchez-vous vers l’avant.'], ['Bassin qui bascule sur le côté', 'Douleur au genou (arrêtez)'], 'Coussin sous la fesse si besoin.', '1 min par côté');
M('mobilite', 'chatvache', 'Chat-vache', 'Dos', 'Tapis', 1, 'Colonne vertébrale', ['À quatre pattes.', 'Inspirez en creusant le dos, regard devant.', 'Expirez en arrondissant le dos, menton vers la poitrine.'], ['Mouvement trop rapide', 'Bras pliés'], 'Synchronisez avec la respiration.', '10 cycles');
M('mobilite', 'fentebasse', 'Fente basse (psoas)', 'Hanches', 'Tapis', 1, 'Fléchisseurs de hanche', ['Genou arrière au sol, pied avant devant.', 'Avancez le bassin en serrant le fessier arrière.', 'Restez grand.'], ['Cambrer le bas du dos'], 'Indispensable si vous êtes assis longtemps.', '45 s par côté');
M('mobilite', 'ischios', 'Étirement des ischios', 'Jambes', 'Tapis ou sangle', 1, 'Ischios', ['Allongé, une jambe tendue vers le ciel avec une sangle.', 'Gardez l’autre jambe au sol.', 'Rapprochez doucement sans arrondir le bassin.'], ['Tirer brutalement', 'Décoller le bassin'], 'Respirez, ne forcez pas.', '45 s par jambe');
M('mobilite', 'thoracique', 'Ouverture thoracique', 'Dos', 'Tapis', 1, 'Haut du dos', ['Couché sur le côté, genoux à 90°, bras tendus devant.', 'Ouvrez le bras du dessus vers l’arrière en suivant la main du regard.', 'Revenez lentement.'], ['Genoux qui se séparent'], 'Excellent pour la posture.', '8 par côté');
M('mobilite', '9090', 'Rotation de hanches 90/90', 'Hanches', 'Tapis', 2, 'Mobilité de hanche', ['Assis, une jambe devant à 90°, l’autre sur le côté à 90°.', 'Basculez les genoux de l’autre côté sans les mains.', 'Gardez le buste droit.'], ['S’aider des mains trop tôt'], 'Mains au sol derrière au début.', '10 rotations');
M('mobilite', 'pont', 'Pont fessier', 'Hanches', 'Tapis', 1, 'Fessiers, lombaires', ['Allongé, pieds au sol près des fesses.', 'Montez le bassin en serrant les fessiers.', 'Redescendez vertèbre par vertèbre.'], ['Cambrer'], 'Pause 2 s en haut.', '3 × 12');

// ---- Marche / Rando
M('marche', 'active', 'Marche active', 'Séance', 'Aucun', 1, 'Cardio', ['Marchez à un rythme où vous êtes légèrement essoufflé.', 'Bras qui balancent, pas déroulés du talon à la pointe.', 'Ajoutez 5 min chaque semaine.'], ['Pas trop longs', 'Regarder ses pieds'], 'Idéal pour reprendre.', '30–45 min');
M('marche', 'nordique', 'Marche nordique', 'Séance', 'Bâtons', 2, 'Corps entier', ['Bâtons plantés en arrière, poussée active des bras.', 'Coordination bras-jambes opposés.', 'Déroulez bien le pied.'], ['Planter les bâtons devant', 'Bras raides'], 'Sollicite 80 % des muscles.', '45–60 min');
M('marche', 'montee', 'Montée et descente en rando', 'Technique', 'Chaussures de rando', 2, 'Jambes', ['Montée : petits pas réguliers, respiration calée sur le pas.', 'Descente : genoux fléchis, pas courts, bâtons devant.', 'Faites une pause courte toutes les heures.'], ['Partir trop vite', 'Descente jambes tendues'], 'Rythme régulier = on va plus loin.', 'Selon le dénivelé');

// ===================== SESSIONS / PROGRAMMES =====================
// élément de séance : { mv, sets, reps | sec, kg, rest }  ;  bloc cardio : { t, d }
const I = (mv, sets, reps, rest = 90, extra = {}) => Object.assign({ mv, sets, reps, rest }, extra);
const T = (mv, sets, sec, rest = 30) => ({ mv, sets, sec, rest });
const B = (t, d) => ({ t, d });

const PROGRAMS = [
  { id: 'remise', nom: 'Remise en forme', obj: 'forme', niv: 1, sem: 6, freq: 3, mat: 'aucun', ic: '🌱',
    desc: 'Pour reprendre en douceur : renforcement au poids du corps et cardio progressif.',
    prog: 'Ajoutez 1 répétition par série chaque semaine, et 5 min de marche/course.',
    seances: [
      { nom: 'Corps entier A', sport: 'muscu', items: [T('jj', 2, 45, 30), I('goblet', 3, 12, 60), I('pompe', 3, 8, 60), I('pont', 3, 12, 45), T('gainage', 3, 25, 30)] },
      { nom: 'Cardio doux', sport: 'marche', blocks: [B('Échauffement', '5 min de marche tranquille'), B('Corps', '25 min de marche active (légèrement essoufflé)'), B('Retour au calme', '5 min lent + étirements')] },
      { nom: 'Corps entier B', sport: 'muscu', items: [T('jj', 2, 45, 30), I('fentes', 3, 8, 60), I('rowh', 3, 10, 60), I('pont', 3, 15, 45), T('gainlat', 2, 20, 30)] }
    ] },
  { id: 'fb', nom: 'Prise de muscle — Full body', obj: 'muscle', niv: 2, sem: 8, freq: 3, mat: 'salle', ic: '💪',
    desc: 'Tout le corps 3 fois par semaine : idéal pour progresser vite en hypertrophie.',
    prog: 'Double progression : quand toutes les séries atteignent le haut de la fourchette, +2,5 kg.',
    seances: [
      { nom: 'Full body A', sport: 'muscu', items: [I('squat', 4, 8, 150), I('dc', 4, 8, 120), I('rowb', 3, 10, 90), I('elev', 3, 15, 60), I('curl', 2, 12, 60), T('gainage', 3, 45, 45)] },
      { nom: 'Full body B', sport: 'muscu', items: [I('sdtr', 3, 10, 120), I('dm', 4, 8, 120), I('tirage', 3, 10, 90), I('fentes', 3, 10, 90), I('triceps', 2, 12, 60), I('releve', 3, 12, 60)] },
      { nom: 'Full body C', sport: 'muscu', items: [I('presse', 3, 12, 120), I('dih', 3, 10, 90), I('tractions', 3, 6, 120), I('hipthrust', 3, 10, 90), I('facepull', 3, 15, 60), I('marteau', 2, 12, 60)] }
    ] },
  { id: 'hb', nom: 'Prise de muscle — Haut / Bas', obj: 'muscle', niv: 3, sem: 8, freq: 4, mat: 'salle', ic: '🏆',
    desc: '4 séances par semaine, plus de volume par muscle pour les pratiquants réguliers.',
    prog: 'Double progression + 1 série supplémentaire sur les exercices principaux à partir de la semaine 5.',
    seances: [
      { nom: 'Haut A (force)', sport: 'muscu', items: [I('dc', 4, 6, 150), I('rowb', 4, 6, 150), I('dm', 3, 8, 120), I('tractions', 3, 8, 120), I('triceps', 3, 12, 60)] },
      { nom: 'Bas A (force)', sport: 'muscu', items: [I('squat', 4, 6, 180), I('sdtr', 3, 8, 150), I('legcurl', 3, 12, 60), I('mollets', 4, 15, 60), T('gainage', 3, 60, 45)] },
      { nom: 'Haut B (volume)', sport: 'muscu', items: [I('dih', 4, 10, 90), I('tirage', 4, 10, 90), I('elev', 4, 15, 60), I('ecarte', 3, 15, 60), I('curl', 3, 12, 60), I('facepull', 3, 15, 60)] },
      { nom: 'Bas B (volume)', sport: 'muscu', items: [I('presse', 4, 12, 120), I('hipthrust', 4, 10, 90), I('fentes', 3, 10, 90), I('legcurl', 3, 15, 60), I('releve', 3, 15, 60)] }
    ] },
  { id: 'force', nom: 'Force 5 × 5', obj: 'force', niv: 2, sem: 8, freq: 3, mat: 'salle', ic: '🏋️',
    desc: 'Les grands mouvements, peu de répétitions, charges lourdes. Simple et redoutable.',
    prog: '+2,5 kg à chaque séance réussie (5 kg au soulevé de terre). Échec 3 fois : −10 %.',
    seances: [
      { nom: 'Séance A', sport: 'muscu', items: [I('squat', 5, 5, 180), I('dc', 5, 5, 180), I('rowb', 5, 5, 150)] },
      { nom: 'Séance B', sport: 'muscu', items: [I('squat', 5, 5, 180), I('dm', 5, 5, 180), I('sdt', 1, 5, 180)] }
    ] },
  { id: 'perte', nom: 'Perte de poids — HIIT + cardio', obj: 'poids', niv: 1, sem: 6, freq: 4, mat: 'aucun', ic: '🔥',
    desc: 'Dépense énergétique élevée, maintien du muscle, sans matériel.',
    prog: 'Ajoutez 1 tour de circuit toutes les 2 semaines ; marche/footing +5 min par semaine.',
    seances: [
      { nom: 'Circuit HIIT', sport: 'hiit', items: [T('jj', 3, 40, 20), T('squatjump', 3, 30, 30), T('mc', 3, 30, 30), T('burpee', 3, 30, 30), T('gainage', 3, 30, 30)] },
      { nom: 'Endurance', sport: 'course', blocks: [B('Échauffement', '5 min de marche rapide'), B('Corps', '30 min en endurance fondamentale (course lente ou alternance course/marche)'), B('Retour au calme', '5 min de marche')] },
      { nom: 'Renfo + gainage', sport: 'muscu', items: [I('goblet', 3, 15, 60), I('pompe', 3, 10, 60), I('fentes', 3, 12, 60), I('swing', 3, 15, 60), T('gainlat', 3, 30, 30)] },
      { nom: 'Marche longue', sport: 'marche', blocks: [B('Corps', '45–60 min de marche active ou marche nordique')] }
    ] },
  { id: '5k', nom: 'Premier 5 km', obj: 'endurance', niv: 1, sem: 8, freq: 3, mat: 'aucun', ic: '🎯',
    desc: 'De la marche à 30 min de course continue en 8 semaines.', gen: 'c5k',
    prog: 'Chaque semaine, plus de course et moins de marche. Répétez une semaine si elle était trop dure.', seances: [] },
  { id: '10k', nom: '10 km — progresser', obj: 'endurance', niv: 2, sem: 8, freq: 3, mat: 'aucun', ic: '🏃',
    desc: 'Une séance de qualité, une séance d’endurance, une sortie longue.',
    prog: 'Sortie longue +5 min par semaine (max 75 min), fractionné +1 répétition toutes les 2 semaines.',
    seances: [
      { nom: 'Fractionné', sport: 'course', ref: 'fc', blocks: [B('Échauffement', '20 min footing + gammes (talons-fesses, skipping) + 3 accélérations'), B('Corps', '2 × 8 × 30/30 à VMA, 3 min de récup entre les blocs'), B('Retour au calme', '10 min footing lent')] },
      { nom: 'Endurance + renfo', sport: 'course', ref: 'ef', blocks: [B('Corps', '40 min en endurance fondamentale'), B('Renfo', '3 × (15 squats, 10 fentes par jambe, 40 s de gainage)')] },
      { nom: 'Sortie longue', sport: 'course', ref: 'sl', blocks: [B('Corps', '60 min en endurance fondamentale, les 10 dernières minutes à allure 10 km')] }
    ] },
  { id: 'maison', nom: 'À la maison sans matériel', obj: 'muscle', niv: 2, sem: 6, freq: 3, mat: 'aucun', ic: '🏠',
    desc: 'Renforcement complet au poids du corps, en 30 minutes.',
    prog: '+2 répétitions par semaine ; quand c’est facile, passez à la variante plus dure (pompes déclinées, fentes bulgares).',
    seances: [
      { nom: 'Poussée + jambes', sport: 'muscu', items: [I('pompe', 4, 12, 60), I('fentes', 4, 12, 60), I('dips', 3, 10, 60), I('pont', 3, 15, 45), T('gainage', 3, 45, 30)] },
      { nom: 'Tirage + gainage', sport: 'muscu', items: [I('tractions', 4, 5, 90), I('goblet', 4, 20, 60), T('gainlat', 3, 30, 30), I('releve', 3, 12, 45), T('mc', 3, 30, 30)] },
      { nom: 'Circuit métabolique', sport: 'hiit', items: [T('burpee', 4, 30, 30), T('squatjump', 4, 30, 30), T('commando', 4, 30, 30), T('jj', 4, 40, 20)] }
    ] },
  { id: 'mob', nom: 'Mobilité & souplesse', obj: 'mobilite', niv: 1, sem: 4, freq: 4, mat: 'aucun', ic: '🧘',
    desc: '15 à 20 minutes pour bouger mieux, moins de raideurs et un dos plus libre.',
    prog: 'Tenez chaque posture 5 s de plus chaque semaine.',
    seances: [
      { nom: 'Dos & hanches', sport: 'mobilite', items: [T('chatvache', 1, 60, 10), T('chien', 2, 40, 15), T('fentebasse', 2, 45, 10), T('pigeon', 2, 60, 10), T('enfant', 1, 60, 0)] },
      { nom: 'Jambes & épaules', sport: 'mobilite', items: [T('ischios', 2, 45, 10), T('9090', 2, 60, 15), T('thoracique', 2, 45, 10), T('guerrier2', 2, 40, 10), T('cobra', 2, 30, 10)] }
    ] },
  { id: 'nage', nom: 'Natation — endurance', obj: 'endurance', niv: 2, sem: 6, freq: 2, mat: 'piscine', ic: '🏊',
    desc: 'Améliorer technique et endurance en crawl.',
    prog: '+100 m sur le corps de séance chaque semaine.',
    seances: [
      { nom: 'Technique', sport: 'natation', blocks: [B('Échauffement', '200 m nage libre + 4 × 25 m battements planche'), B('Éducatifs', '4 × 50 m crawl rattrapé, 4 × 50 m respiration 3 temps'), B('Corps', '6 × 100 m crawl, 20 s de récup'), B('Retour au calme', '100 m dos souple')] },
      { nom: 'Endurance', sport: 'natation', blocks: [B('Échauffement', '300 m varié'), B('Corps', '3 × 400 m crawl (dont 1 avec pull-buoy), 45 s de récup'), B('Retour au calme', '100 m brasse')] }
    ] },
  { id: 'veloP', nom: 'Vélo — foncier', obj: 'endurance', niv: 2, sem: 6, freq: 3, mat: 'velo', ic: '🚴',
    desc: 'Construire une base d’endurance et de puissance à vélo.',
    prog: 'Sortie longue +15 min par semaine ; seuil 2 × 15 → 2 × 25 min.',
    seances: [
      { nom: 'Seuil', sport: 'velo', ref: 'sweet', blocks: [B('Échauffement', '15 min progressif'), B('Corps', '2 × 20 min effort difficile mais tenable, 5 min récup'), B('Retour au calme', '10 min souple')] },
      { nom: 'Vélocité', sport: 'velo', ref: 'velocite', blocks: [B('Corps', '60 min zone 2 avec 5 × 1 min à 110–120 tr/min')] },
      { nom: 'Sortie longue', sport: 'velo', ref: 'z2', blocks: [B('Corps', '2 h en endurance, cadence 85–95 tr/min, mangez toutes les 45 min')] }
    ] }
];
// « Premier 5 km » : séances générées semaine par semaine (course / marche)
const C5K = [[1, 2, 8], [2, 2, 6], [3, 2, 5], [5, 2, 4], [8, 2, 3], [10, 1.5, 3], [15, 2, 2], [30, 0, 1]];
PROGRAMS.find(p => p.id === '5k').weeks = C5K.map(([run, walk, rep], w) => [0, 1, 2].map(k => ({
  nom: `Semaine ${w + 1} · séance ${k + 1}`, sport: 'course', ref: 'ef',
  blocks: [B('Échauffement', '5 min de marche rapide'), B('Corps', walk ? `${rep} × (${run} min de course lente + ${walk} min de marche)` : `${run} min de course continue, très lentement`), B('Retour au calme', '5 min de marche + étirements doux')]
})));
const OBJ = { forme: 'Remise en forme', muscle: 'Prise de muscle', force: 'Force', poids: 'Perte de poids', endurance: 'Endurance', mobilite: 'Mobilité' };

// ===================== TEST DE CAPACITÉS =====================
// barèmes indicatifs (adulte 20-29 ans), ajustés avec l'âge ; score 1 (faible) à 5 (excellent)
const TESTS = [
  { id: 'pompes', nom: 'Pompes maximum', q: 'force_haut', unit: 'répétitions', mv: 'pompe', how: 'Pompes complètes (sur les genoux pour les femmes si besoin, notez-le), sans pause, corps aligné. Arrêtez à la première pompe mal faite.', h: [17, 22, 29, 36], f: [10, 15, 21, 30], f_note: 'Femmes : pompes sur les genoux acceptées.' },
  { id: 'squats', nom: 'Squats en 1 minute', q: 'force_bas', unit: 'répétitions', mv: 'goblet', img: 'test_squat', how: 'Squats au poids du corps, cuisses parallèles au sol, le plus possible en 60 s.', h: [22, 30, 38, 45], f: [18, 25, 33, 40], timer: 60 },
  { id: 'gainage', nom: 'Gainage planche', q: 'gainage', unit: 'secondes', mv: 'gainage', how: 'Planche sur les avant-bras, corps aligné. Arrêtez dès que le bassin tombe ou monte.', h: [30, 60, 90, 120], f: [30, 60, 90, 120], stopwatch: true },
  { id: 'tractions', nom: 'Tractions (si barre)', q: 'force_haut2', unit: 'répétitions', mv: 'tractions', how: 'Tractions complètes, menton au-dessus de la barre, bras tendus en bas. Sans barre : laissez vide.', h: [1, 4, 8, 12], f: [1, 1, 3, 5], optional: true },
  { id: 'souplesse', nom: 'Souplesse (flexion avant)', q: 'souplesse', unit: 'niveau', mv: 'ischios', img: 'test_souplesse', how: 'Debout jambes tendues, penchez-vous lentement vers l’avant. Jusqu’où vont vos mains ?', choices: ['Genoux', 'Tibias', 'Chevilles', 'Bout des doigts au sol', 'Paumes au sol'] },
  { id: 'cardio', nom: 'Cardio', q: 'cardio', mv: 'ef', how: 'Choisissez UN test : Cooper (courir le plus loin possible en 12 min) ou Ruffier-Dickson (30 squats en 45 s, à faire chez soi avec la mesure du pouls).', cardio: true }
];
const COOPER = { h: [1600, 2200, 2400, 2800], f: [1500, 1800, 2200, 2700] };
const QUAL = { force_haut: 'Force haut du corps', force_bas: 'Force jambes', gainage: 'Gainage', souplesse: 'Souplesse', cardio: 'Cardio' };

// ===================== IMAGES DES MOUVEMENTS =====================
// [format, nombre d'images] : photos départ/arrivée (free-exercise-db, domaine public) ou dessins sur mesure
const IMG = {"dc":["jpg",2],"dih":["jpg",2],"pompe":["jpg",2],"dips":["jpg",2],"ecarte":["jpg",2],"tractions":["jpg",2],"rowb":["jpg",2],"rowh":["jpg",2],"tirage":["jpg",2],"sdt":["jpg",2],"sdtr":["jpg",2],"squat":["jpg",2],"goblet":["jpg",2],"fentes":["jpg",2],"presse":["jpg",2],"hipthrust":["jpg",2],"legcurl":["jpg",2],"mollets":["jpg",2],"dm":["jpg",2],"elev":["jpg",2],"facepull":["jpg",2],"curl":["jpg",2],"marteau":["jpg",2],"triceps":["jpg",2],"gainage":["jpg",2],"gainlat":["jpg",2],"releve":["jpg",2],"swing":["jpg",2],"ef":["jpg",2],"fc":["jpg",2],"fl":["jpg",2],"seuil":["jpg",2],"sl":["jpg",2],"cotes":["svg",2],"talons":["jpg",2],"skipping":["jpg",2],"bondissantes":["jpg",2],"chasses":["svg",2],"lignes":["svg",2],"technique":["jpg",2],"z2":["svg",2],"sweet":["jpg",2],"sprints":["svg",2],"velocite":["jpg",2],"danseuse":["svg",2],"reglage":["svg",1],"crawl":["svg",2],"brasse":["svg",2],"dos":["svg",2],"papillon":["svg",2],"rattrape":["svg",2],"planche":["svg",2],"pull":["svg",2],"resp3":["svg",2],"burpee":["svg",2],"jj":["jpg",2],"mc":["jpg",2],"squatjump":["jpg",2],"thruster":["jpg",2],"boxjump":["jpg",2],"corde":["jpg",2],"fentesaut":["jpg",2],"commando":["svg",2],"wallball":["svg",2],"rameur":["jpg",2],"chien":["svg",1],"cobra":["svg",1],"enfant":["jpg",2],"guerrier1":["svg",1],"guerrier2":["svg",1],"pigeon":["svg",1],"chatvache":["jpg",2],"fentebasse":["jpg",2],"ischios":["jpg",2],"thoracique":["jpg",2],"9090":["svg",1],"pont":["jpg",2],"active":["svg",2],"nordique":["svg",2],"montee":["svg",2],"test_squat":["jpg",2],"test_souplesse":["jpg",2],"bandpa":["jpg",2],"rotext":["jpg",2],"oiseauel":["jpg",2],"pallof":["jpg",2],"kickback":["jpg",2],"deadbug":["jpg",2],"superman":["jpg",2],"russian":["jpg",2],"nordic":["jpg",2],"molletexc":["jpg",2],"medrot":["jpg",2],"cou":["jpg",2],"poignet":["jpg",2],"glutepont1":["jpg",2],"worlds":["jpg",2],"hipcircles":["jpg",2],"chevilles":["jpg",2],"quadetir":["jpg",2],"pecsetir":["jpg",2],"molletsetir":["jpg",2],"couetir":["jpg",2],"epaulesmob":["jpg",2],"torsion":["jpg",2],"monster":["svg",2],"clam":["svg",2],"ytw":["svg",2],"birddog":["svg",2],"hollow":["svg",2],"shtaps":["svg",2],"copenhague":["svg",2],"equilibre":["svg",2],"stepdown":["svg",2],"chaise":["svg",1],"extdoigts":["svg",2],"tenue":["svg",1],"cossack":["svg",2],"squatprof":["svg",1],"sleeper":["svg",2],"etirpoignet":["svg",1]};

// ===================== RENFORCEMENT : ÉLASTIQUES, GAINAGE, PRÉVENTION =====================
M('muscu', 'bandpa', 'Écartés à l’élastique (pull-apart)', 'Élastiques', 'Élastique', 1, 'Arrière d’épaule, haut du dos',
  ['Bras tendus devant à hauteur d’épaules, élastique en main.', 'Écartez les bras jusqu’à toucher la poitrine avec l’élastique, omoplates serrées.', 'Revenez lentement sans laisser claquer l’élastique.'],
  ['Hausser les épaules', 'Cambrer le dos'], 'Le meilleur exercice pour compenser les épaules qui s’enroulent.', '3 × 15–20');
M('muscu', 'rotext', 'Rotation externe d’épaule à l’élastique', 'Élastiques', 'Élastique', 1, 'Coiffe des rotateurs (infra-épineux)',
  ['Élastique attaché à hauteur du coude, coude collé au corps à 90°.', 'Tournez l’avant-bras vers l’extérieur sans décoller le coude.', 'Revenez lentement en 2–3 s.'],
  ['Coude qui s’écarte', 'Élastique trop dur'], 'Charge légère, sensation de brûlure mais jamais de douleur. Idéal après la pratique (tennis, padel, hand, volley).', '3 × 12–15 par bras');
M('muscu', 'ytw', 'Y-T-W à l’élastique', 'Élastiques', 'Élastique', 1, 'Trapèzes moyens et inférieurs, omoplates',
  ['Bras tendus au-dessus de la tête en Y, élastique tendu.', 'Ouvrez en T à hauteur d’épaules, puis ramenez les coudes en W.', 'Serrez les omoplates vers le bas à chaque position.'],
  ['Cambrer le bas du dos', 'Monter les épaules aux oreilles'], 'Parfait en échauffement d’épaules.', '3 × 8 cycles');
M('muscu', 'oiseauel', 'Oiseau à l’élastique', 'Élastiques', 'Élastique', 1, 'Arrière d’épaule, rhomboïdes',
  ['Buste penché, élastique sous les pieds.', 'Ouvrez les bras sur les côtés, coudes légèrement fléchis.', 'Revenez lentement.'],
  ['Dos rond', 'Élan'], 'Gardez la nuque dans l’alignement.', '3 × 15');
M('muscu', 'monster', 'Marche latérale avec élastique', 'Élastiques', 'Mini-bande', 1, 'Moyen fessier, stabilité du genou',
  ['Mini-bande au-dessus des genoux ou aux chevilles, demi-squat.', 'Faites des pas latéraux en gardant l’élastique tendu.', 'Genoux poussés vers l’extérieur tout le long.'],
  ['Genoux qui rentrent', 'Se redresser'], 'Protège les genoux des sports d’appuis (foot, ski, basket).', '3 × 10 pas de chaque côté');
M('muscu', 'clam', 'Ouverture de hanche (clamshell)', 'Élastiques', 'Mini-bande', 1, 'Moyen fessier, rotateurs de hanche',
  ['Allongé sur le côté, genoux fléchis, mini-bande au-dessus des genoux.', 'Ouvrez le genou du dessus sans bouger le bassin.', 'Revenez lentement.'],
  ['Bassin qui bascule en arrière', 'Mouvement trop rapide'], 'Main sur la hanche pour vérifier qu’elle ne bouge pas.', '3 × 15 par côté');
M('muscu', 'pallof', 'Pallof press (anti-rotation)', 'Élastiques', 'Élastique ou poulie', 2, 'Gainage, obliques',
  ['De profil par rapport à l’ancrage, élastique tenu contre la poitrine.', 'Poussez les bras tendus devant vous sans laisser le buste tourner.', 'Tenez 2 s puis ramenez.'],
  ['Laisser le buste pivoter', 'Pieds trop serrés'], 'Gainage « anti-rotation » : essentiel pour les sports de rotation (golf, tennis, boxe).', '3 × 10 par côté');
M('muscu', 'kickback', 'Extension de hanche (kickback)', 'Élastiques', 'Élastique ou poulie', 1, 'Grand fessier',
  ['À quatre pattes ou debout, élastique autour du pied.', 'Poussez la jambe vers l’arrière en serrant le fessier.', 'Revenez sans cambrer.'],
  ['Cambrer le bas du dos', 'Balancer la jambe'], 'Ventre rentré pendant tout le mouvement.', '3 × 15 par jambe');
M('muscu', 'deadbug', 'Dead bug', 'Abdos / gainage', 'Tapis', 1, 'Abdominaux profonds',
  ['Sur le dos, bras vers le plafond, genoux à 90° au-dessus des hanches.', 'Allongez bras et jambe opposés en gardant le bas du dos plaqué.', 'Revenez et changez de côté.'],
  ['Dos qui se décolle', 'Aller trop vite'], 'Expirez longuement en allongeant les membres.', '3 × 8 par côté');
M('muscu', 'birddog', 'Bird dog', 'Abdos / gainage', 'Tapis', 1, 'Lombaires, fessiers, gainage',
  ['À quatre pattes, dos plat.', 'Tendez le bras et la jambe opposés à l’horizontale.', 'Tenez 2 s sans bouger le bassin, puis changez.'],
  ['Bassin qui tourne', 'Lever la jambe trop haut'], 'Imaginez un verre d’eau posé sur le bas du dos.', '3 × 8 par côté');
M('muscu', 'hollow', 'Hollow body (position creuse)', 'Abdos / gainage', 'Tapis', 2, 'Abdominaux',
  ['Sur le dos, bas du dos plaqué au sol.', 'Décollez épaules et jambes tendues, bras au-dessus de la tête.', 'Tenez la position en respirant.'],
  ['Dos qui se cambre', 'Jambes trop basses'], 'Trop dur ? Pliez les genoux ou gardez les bras le long du corps.', '3 × 20–40 s');
M('muscu', 'shtaps', 'Planche avec toucher d’épaule', 'Abdos / gainage', 'Tapis', 2, 'Gainage, dentelé, épaules',
  ['Position de pompe bras tendus, pieds écartés.', 'Touchez l’épaule opposée avec une main sans que le bassin bouge.', 'Alternez lentement.'],
  ['Bassin qui se balance', 'Fesses hautes'], 'Plus les pieds sont serrés, plus c’est difficile.', '3 × 20 touches');
M('muscu', 'superman', 'Superman', 'Abdos / gainage', 'Tapis', 1, 'Lombaires, fessiers',
  ['Allongé sur le ventre, bras devant.', 'Décollez bras et jambes quelques centimètres.', 'Tenez 3 s, redescendez.'],
  ['Relever la tête', 'Monter trop haut'], 'Regard vers le sol, nuque longue.', '3 × 10');
M('muscu', 'russian', 'Russian twist', 'Abdos / gainage', 'Poids léger (facultatif)', 2, 'Obliques',
  ['Assis, buste incliné en arrière, pieds au sol ou décollés.', 'Tournez les épaules d’un côté à l’autre.', 'Gardez le dos droit.'],
  ['Dos rond', 'Bouger seulement les bras'], 'C’est la poitrine qui tourne, pas seulement les mains.', '3 × 20');
M('muscu', 'copenhague', 'Gainage Copenhague (adducteurs)', 'Prévention', 'Banc', 3, 'Adducteurs, obliques',
  ['Gainage latéral, jambe du dessus posée sur un banc (genou pour débuter, cheville pour progresser).', 'Montez le bassin jusqu’à l’alignement.', 'Redescendez lentement.'],
  ['Bassin qui tombe', 'Douleur à l’aine (arrêtez)'], 'Ajouté au FIFA 11+, il renforce nettement les adducteurs des footballeurs.', '3 × 5–10 par côté');
M('muscu', 'nordic', 'Nordic hamstring', 'Prévention', 'Partenaire ou cale-pieds', 3, 'Ischio-jambiers (excentrique)',
  ['À genoux sur un coussin, chevilles tenues par un partenaire.', 'Descendez le buste vers l’avant le plus lentement possible, corps droit.', 'Rattrapez-vous avec les mains, remontez en poussant.'],
  ['Plier les hanches', 'Descente trop rapide'], 'L’exercice le plus étudié contre les blessures aux ischios. Commencez à 3–5 répétitions.', '2–3 × 3–8');
M('muscu', 'equilibre', 'Équilibre sur une jambe', 'Prévention', 'Aucun (coussin pour progresser)', 1, 'Chevilles, proprioception',
  ['Debout sur une jambe, genou légèrement fléchi.', 'Tenez 30 s sans poser l’autre pied.', 'Progression : yeux fermés, sur coussin, en lançant une balle.'],
  ['Genou verrouillé', 'Regarder ses pieds'], '5 à 15 minutes, 2 à 3 fois par semaine, réduit les entorses de cheville.', '3 × 30 s par jambe');
M('muscu', 'stepdown', 'Descente de marche (excentrique)', 'Prévention', 'Marche ou box', 2, 'Quadriceps (excentrique), stabilité du genou',
  ['Debout sur une marche, sur une jambe.', 'Descendez l’autre talon vers le sol en 3–4 s, genou dans l’axe du pied.', 'Effleurez le sol et remontez.'],
  ['Genou qui rentre', 'Descente trop rapide'], 'Prépare les cuisses aux descentes (trail, rando, ski).', '3 × 8 par jambe');
M('muscu', 'chaise', 'Chaise au mur', 'Prévention', 'Mur', 1, 'Quadriceps (isométrie)',
  ['Dos contre le mur, cuisses parallèles au sol, genoux au-dessus des chevilles.', 'Tenez la position en respirant.', 'Relevez-vous en glissant le long du mur.'],
  ['Genoux devant les orteils', 'Mains sur les cuisses'], 'Progressez jusqu’à 90–120 s, la durée d’une descente à ski.', '3 × 45–120 s');
M('muscu', 'molletexc', 'Mollet excentrique unipodal', 'Prévention', 'Marche', 2, 'Mollets, tendon d’Achille',
  ['Montez sur la pointe avec les deux pieds.', 'Retirez un pied et descendez sur une jambe en 3 s, talon sous la marche.', 'Remontez à deux pieds.'],
  ['Descendre trop vite', 'Genou verrouillé'], 'Protège le tendon d’Achille des coureurs.', '3 × 12 par jambe');
M('muscu', 'medrot', 'Lancer rotatif de médecine-ball', 'Puissance', 'Médecine-ball + mur', 2, 'Obliques, hanches, puissance',
  ['De profil face à un mur, ballon à hauteur de hanche.', 'Pivotez en poussant avec la jambe arrière et lancez fort contre le mur.', 'Rattrapez et recommencez.'],
  ['Lancer avec les bras', 'Pieds immobiles'], 'Le mouvement part des jambes et des hanches : idéal pour la frappe (boxe, tennis, golf).', '4 × 6 par côté');
M('muscu', 'cou', 'Renforcement isométrique du cou', 'Prévention', 'Mains', 1, 'Muscles du cou',
  ['Assis, tête droite, main sur le front.', 'Poussez la tête contre la main sans bouger, 5–8 s.', 'Répétez à l’arrière et sur les deux côtés.'],
  ['Pousser trop fort d’un coup', 'Bloquer la respiration'], 'Montez progressivement la force. Utile en rugby et sports de combat.', '3 × 4 directions × 8 s');
M('muscu', 'poignet', 'Renforcement des avant-bras', 'Prévention', 'Haltère léger', 1, 'Fléchisseurs et extenseurs du poignet',
  ['Avant-bras posé sur la cuisse, poignet dans le vide.', 'Montez et descendez le poignet lentement, paume vers le bas puis vers le haut.', 'Charge légère, mouvement complet.'],
  ['Charge trop lourde', 'Bouger l’avant-bras'], 'Prévient le « tennis elbow » et renforce la tenue (raquette, escalade, tir).', '3 × 15 par sens');
M('muscu', 'extdoigts', 'Extension des doigts à l’élastique', 'Prévention', 'Élastique', 1, 'Extenseurs des doigts',
  ['Placez un élastique autour du bout des doigts.', 'Écartez les doigts au maximum.', 'Revenez lentement.'],
  ['Mouvement saccadé'], 'Antagoniste indispensable pour les grimpeurs.', '3 × 25');
M('muscu', 'tenue', 'Tenue de bras (isométrie)', 'Prévention', 'Haltère léger ou bouteille', 1, 'Épaule, endurance de tenue',
  ['Debout, bras tendu à l’horizontale, petite charge en main (1–2 kg).', 'Tenez immobile en respirant calmement.', 'Reposez 30 s, changez de bras.'],
  ['Hausser l’épaule', 'Bloquer la respiration'], 'Spécifique au tir : améliore l’endurance de la tenue de l’arme.', '4 × 30–45 s');
M('muscu', 'glutepont1', 'Pont fessier sur une jambe', 'Prévention', 'Tapis', 2, 'Fessiers, ischios',
  ['Sur le dos, un pied au sol, l’autre jambe tendue.', 'Montez le bassin sans le laisser pencher.', 'Redescendez lentement.'],
  ['Bassin qui bascule', 'Pousser avec les lombaires'], 'Bon test de symétrie gauche/droite.', '3 × 10 par jambe');
// ---- Mobilité & souplesse
M('mobilite', 'worlds', 'Le meilleur étirement du monde', 'Corps entier', 'Tapis', 1, 'Hanches, ischios, haut du dos',
  ['Fente avant, main du même côté au sol à l’intérieur du pied.', 'Tournez le buste et tendez le bras vers le plafond.', 'Revenez, puis tendez la jambe avant (étirement des ischios).'],
  ['Genou arrière qui s’effondre'], 'Échauffement complet en une minute.', '5 par côté');
M('mobilite', 'hipcircles', 'Cercles de hanches', 'Hanches', 'Aucun', 1, 'Mobilité de hanche',
  ['Debout, mains sur les hanches ou sur un mur.', 'Décrivez de grands cercles avec le genou levé.', '10 dans un sens, 10 dans l’autre.'],
  ['Bouger le buste'], 'Lent et contrôlé : allez au bout de l’amplitude.', '2 × 10 par sens');
M('mobilite', 'chevilles', 'Mobilité des chevilles', 'Jambes', 'Aucun', 1, 'Chevilles',
  ['Assis ou debout sur une jambe.', 'Faites des cercles complets avec la cheville.', 'Puis genou vers le mur pied à plat (flexion de cheville).'],
  ['Talon qui décolle'], 'Une bonne flexion de cheville améliore squat et course.', '2 × 10 par sens');
M('mobilite', 'quadetir', 'Étirement des quadriceps', 'Jambes', 'Aucun', 1, 'Quadriceps, psoas',
  ['Debout, attrapez la cheville derrière vous.', 'Genoux serrés, bassin légèrement en avant.', 'Tenez en respirant.'],
  ['Cambrer le dos', 'Genou qui part sur le côté'], 'Tenez-vous à un mur pour l’équilibre.', '2 × 30 s par jambe');
M('mobilite', 'pecsetir', 'Étirement pectoraux et épaules', 'Épaules', 'Mur ou cadre de porte', 1, 'Pectoraux, avant d’épaule',
  ['Avant-bras contre un mur ou un cadre de porte, coude à hauteur d’épaule.', 'Tournez doucement le buste à l’opposé.', 'Tenez sans forcer.'],
  ['Hausser l’épaule'], 'Contre la posture « épaules en avant » du bureau.', '2 × 30 s par côté');
M('mobilite', 'molletsetir', 'Étirement des mollets', 'Jambes', 'Mur', 1, 'Mollets',
  ['Mains au mur, une jambe tendue derrière, talon au sol.', 'Avancez le bassin jusqu’à sentir l’étirement.', 'Fléchissez ensuite le genou arrière pour le soléaire.'],
  ['Talon qui décolle'], 'Indispensable pour les coureurs.', '2 × 30 s par jambe');
M('mobilite', 'papillon', 'Papillon (adducteurs)', 'Hanches', 'Tapis', 1, 'Adducteurs',
  ['Assis, plantes de pieds collées, talons vers le bassin.', 'Dos droit, laissez les genoux descendre.', 'Penchez-vous légèrement en avant.'],
  ['Arrondir le dos', 'Appuyer fort sur les genoux'], 'Respirez et laissez la gravité faire.', '2 × 45 s');
M('mobilite', 'couetir', 'Étirement du cou', 'Épaules', 'Aucun', 1, 'Trapèzes, cou',
  ['Assis droit, inclinez l’oreille vers l’épaule.', 'Main sur la tête sans tirer, épaule opposée basse.', 'Tenez puis changez.'],
  ['Tirer sur la tête'], 'Idéal après le travail sur écran.', '2 × 30 s par côté');
M('mobilite', 'epaulesmob', 'Rotations d’épaules (mobilité)', 'Épaules', 'Bâton ou élastique', 1, 'Épaules',
  ['Bâton ou élastique tenu bras tendus, prise large.', 'Passez les bras au-dessus de la tête jusqu’aux fesses.', 'Revenez devant, sans plier les coudes.'],
  ['Prise trop serrée', 'Forcer'], 'Élargissez la prise si ça coince.', '2 × 10');
M('mobilite', 'torsion', 'Torsion allongée', 'Dos', 'Tapis', 1, 'Lombaires, fessiers',
  ['Allongé sur le dos, amenez un genou fléchi de l’autre côté.', 'Bras ouverts, épaules au sol.', 'Respirez et relâchez.'],
  ['Épaule qui décolle'], 'Parfait en fin de séance.', '2 × 45 s par côté');
M('mobilite', 'cossack', 'Squat cosaque', 'Hanches', 'Aucun', 2, 'Adducteurs, hanches',
  ['Pieds très écartés.', 'Descendez sur une jambe en gardant l’autre tendue, pointe vers le haut.', 'Passez de l’autre côté sans vous relever complètement.'],
  ['Talon qui décolle', 'Dos rond'], 'Tenez-vous à un support au début.', '2 × 8 par côté');
M('mobilite', 'squatprof', 'Squat profond tenu', 'Hanches', 'Aucun', 1, 'Hanches, chevilles',
  ['Descendez en squat le plus bas possible, talons au sol.', 'Coudes à l’intérieur des genoux, poussez-les vers l’extérieur.', 'Respirez dans la position.'],
  ['Talons qui décollent'], 'Tenez une barre ou un cadre de porte pour commencer.', '3 × 45 s');
M('mobilite', 'sleeper', 'Sleeper stretch (épaule)', 'Épaules', 'Tapis', 1, 'Rotation interne d’épaule',
  ['Allongé sur le côté, bras du dessous à 90° devant vous, coude plié.', 'Avec l’autre main, poussez doucement l’avant-bras vers le sol.', 'Tenez sans douleur.'],
  ['Forcer', 'Rouler sur le dos'], 'Recommandé pour l’épaule des joueurs de tennis et de padel.', '3 × 30 s');
M('mobilite', 'etirpoignet', 'Étirement des poignets', 'Épaules', 'Aucun', 1, 'Avant-bras',
  ['Bras tendu devant, paume vers l’avant.', 'Tirez doucement les doigts vers vous avec l’autre main.', 'Puis paume vers le bas, doigts vers le sol.'],
  ['Tirer trop fort'], 'Pour les grimpeurs, les tireurs et le travail sur clavier.', '2 × 20 s par sens');

// ---- nouveaux programmes
PROGRAMS.push(
  { id: 'gainel', nom: 'Gainage & élastiques', obj: 'muscle', niv: 1, sem: 6, freq: 3, mat: 'aucun', ic: '🟢',
    desc: 'Renforcement profond, épaules et hanches solides, avec un simple élastique et un tapis. 25 minutes.',
    prog: '+2 répétitions ou +5 s par semaine ; élastique plus dur quand c’est facile.',
    seances: [
      { nom: 'Tronc & épaules', sport: 'muscu', items: [T('deadbug', 3, 40, 30), I('pallof', 3, 10, 45), I('bandpa', 3, 15, 45), I('rotext', 3, 12, 45), I('birddog', 3, 8, 30), T('gainlat', 2, 30, 30)] },
      { nom: 'Hanches & dos', sport: 'muscu', items: [I('monster', 3, 10, 45), I('clam', 3, 15, 30), I('kickback', 3, 15, 30), I('superman', 3, 10, 30), T('hollow', 3, 25, 30), I('shtaps', 3, 20, 45)] }
    ] },
  { id: 'mobfull', nom: 'Mobilité complète', obj: 'mobilite', niv: 1, sem: 4, freq: 5, mat: 'aucun', ic: '🌀',
    desc: 'Une routine de 15 minutes pour toutes les articulations : à faire le matin ou en échauffement.',
    prog: 'Cherchez un peu plus d’amplitude chaque semaine, sans douleur.',
    seances: [
      { nom: 'Routine articulaire', sport: 'mobilite', items: [T('chevilles', 1, 40, 5), T('hipcircles', 1, 40, 5), T('worlds', 2, 45, 10), T('9090', 2, 45, 10), T('epaulesmob', 1, 40, 10), T('thoracique', 2, 40, 10), T('squatprof', 2, 40, 15)] },
      { nom: 'Bas du corps', sport: 'mobilite', items: [T('cossack', 2, 45, 15), T('fentebasse', 2, 40, 10), T('pigeon', 2, 45, 10), T('papillon', 1, 60, 10), T('molletsetir', 2, 30, 10)] }
    ] },
  { id: 'souple', nom: 'Souplesse — étirements profonds', obj: 'mobilite', niv: 1, sem: 6, freq: 3, mat: 'aucun', ic: '🤸',
    desc: 'Étirements tenus pour gagner en souplesse, à faire après l’entraînement ou le soir.',
    prog: 'Tenez chaque étirement 10 s de plus toutes les 2 semaines.',
    seances: [
      { nom: 'Souplesse jambes', sport: 'mobilite', items: [T('ischios', 2, 45, 10), T('quadetir', 2, 40, 10), T('papillon', 2, 45, 10), T('pigeon', 2, 60, 10), T('molletsetir', 2, 40, 10)] },
      { nom: 'Souplesse haut du corps', sport: 'mobilite', items: [T('pecsetir', 2, 40, 10), T('sleeper', 2, 30, 10), T('couetir', 2, 30, 10), T('etirpoignet', 2, 20, 10), T('chien', 2, 40, 10), T('enfant', 1, 60, 0)] }
    ] },
  { id: 'dos', nom: 'Dos solide', obj: 'forme', niv: 1, sem: 6, freq: 3, mat: 'aucun', ic: '🛡️',
    desc: 'Renforcement et mobilité du dos, contre les raideurs de la position assise.',
    prog: 'Tenez 2 s de plus chaque position chaque semaine.',
    seances: [
      { nom: 'Dos & gainage', sport: 'muscu', items: [T('chatvache', 1, 60, 10), I('birddog', 3, 8, 30), T('deadbug', 3, 40, 30), I('pont', 3, 12, 30), I('superman', 3, 10, 30), T('gainlat', 2, 25, 30), T('torsion', 1, 60, 0)] }
    ] }
);

// ===================== PRÉPARATION PHYSIQUE PAR SPORT PRATIQUÉ =====================
// Contenus construits à partir de programmes de prévention publiés (FIFA 11+, prévention de l'épaule des sports de lancer,
// entraînement des antagonistes en escalade, préparation au ski, mobilité du golfeur, tir sportif…)
const SPEC_OLD = {
  foot: { nom: 'Football', ic: '⚽', qual: 'Endurance intermittente, vitesse, changements de direction, frappe', risques: 'Ischio-jambiers, adducteurs, chevilles, genoux (LCA)',
    tips: ['Faites le programme d’échauffement FIFA 11+ avant chaque entraînement : il réduit nettement les blessures.', 'Le Nordic hamstring est l’exercice le plus étudié contre les déchirures des ischios.', 'Ajoutez le gainage Copenhague pour les adducteurs.'],
    src: [['FIFA 11+ : méta-analyse (BJSM)', 'https://bjsm.bmj.com/content/51/7/562'], ['Prévention en football (Aspetar)', 'https://www.aspetar.com/Journal/viewarticle.aspx?id=568']],
    seances: [{ nom: 'Prévention (type FIFA 11+)', sport: 'muscu', items: [I('nordic', 3, 5, 90), I('copenhague', 3, 6, 60), T('equilibre', 3, 30, 20), T('gainage', 3, 40, 30), T('gainlat', 2, 30, 30), I('monster', 2, 10, 30)] },
      { nom: 'Force & explosivité', sport: 'muscu', items: [I('squat', 4, 5, 150), I('fentes', 3, 8, 90), I('hipthrust', 3, 8, 90), I('boxjump', 4, 4, 90), I('mollets', 3, 15, 60), I('pallof', 3, 10, 45)] }] },
  rugby: { nom: 'Rugby', ic: '🏉', qual: 'Force, puissance, résistance aux contacts', risques: 'Cou et commotions, épaules, genoux',
    tips: ['Un programme régulier de renforcement du cou est associé à moins de blessures cervicales.', 'Montez la force du cou très progressivement, en isométrie.', 'Le travail de force maximale protège dans les impacts.'],
    src: [['Renforcement du cou en rugby (JSSM)', 'https://pubmed.ncbi.nlm.nih.gov/?term=neck+strengthening+rugby+injury']],
    seances: [{ nom: 'Force & cou', sport: 'muscu', items: [I('squat', 5, 5, 150), I('dc', 4, 6, 120), I('rowb', 4, 8, 90), I('cou', 3, 4, 45), T('gainage', 3, 45, 30)] },
      { nom: 'Puissance & épaules', sport: 'muscu', items: [I('medrot', 4, 6, 90), I('boxjump', 4, 4, 90), I('tractions', 4, 6, 120), I('dm', 3, 8, 90), I('nordic', 3, 5, 90), I('rotext', 2, 15, 45)] }] },
  basket: { nom: 'Basket', ic: '🏀', qual: 'Détente, appuis, changements de direction', risques: 'Chevilles (entorses), genoux, tendon rotulien',
    tips: ['Un entraînement d’équilibre spécifique, 5 à 10 min 3 fois par semaine, a réduit les entorses de cheville chez des basketteurs.', 'Travaillez la réception de saut genoux dans l’axe.'],
    src: [['Équilibre et entorses en basket (JSSM)', 'https://pubmed.ncbi.nlm.nih.gov/?term=balance+training+ankle+sprain+basketball']],
    seances: [{ nom: 'Appuis & réceptions', sport: 'muscu', items: [T('equilibre', 3, 30, 20), I('squatjump', 4, 6, 60), I('stepdown', 3, 8, 45), I('molletexc', 3, 12, 45), I('monster', 3, 10, 30), T('gainlat', 2, 30, 30)] },
      { nom: 'Force jambes & tronc', sport: 'muscu', items: [I('goblet', 4, 10, 90), I('fentes', 3, 10, 60), I('glutepont1', 3, 10, 45), I('pallof', 3, 10, 45), T('gainage', 3, 45, 30)] }] },
  volley: { nom: 'Volley', ic: '🏐', qual: 'Détente, épaule du smash, réceptions', risques: 'Chevilles, épaules, genoux',
    tips: ['Un programme de plateau d’équilibre a réduit les entorses de cheville chez des volleyeurs.', 'Renforcez la coiffe des rotateurs de l’épaule de frappe.'],
    src: [['Plateau d’équilibre et entorses en volley (AJSM)', 'https://pubmed.ncbi.nlm.nih.gov/?term=balance+board+ankle+sprain+volleyball']],
    seances: [{ nom: 'Chevilles & sauts', sport: 'muscu', items: [T('equilibre', 3, 30, 20), I('squatjump', 4, 6, 60), I('molletexc', 3, 12, 45), I('stepdown', 3, 8, 45), T('gainage', 3, 40, 30)] },
      { nom: 'Épaules & force', sport: 'muscu', items: [I('rotext', 3, 15, 45), I('ytw', 3, 8, 45), I('bandpa', 3, 15, 45), I('goblet', 4, 10, 90), I('pallof', 3, 10, 45)] }] },
  hand: { nom: 'Handball', ic: '🤾', qual: 'Lancer, contacts, appuis', risques: 'Genoux, chevilles, épaule du lanceur',
    tips: ['Les programmes d’échauffement spécifiques au handball peuvent réduire le risque de blessure jusqu’à 50 %.', 'Renforcez les rotateurs externes de l’épaule et les omoplates.'],
    src: [['Prévention en handball (Fit to Play)', 'https://fittoplay.org/sports/handball/handball']],
    seances: [{ nom: 'Épaule du lanceur', sport: 'muscu', items: [I('rotext', 3, 15, 45), I('ytw', 3, 8, 45), I('oiseauel', 3, 15, 45), I('pompe', 3, 12, 60), I('pallof', 3, 10, 45)] },
      { nom: 'Genoux & appuis', sport: 'muscu', items: [T('equilibre', 3, 30, 20), I('nordic', 3, 5, 90), I('stepdown', 3, 8, 45), I('squatjump', 3, 6, 60), I('monster', 3, 10, 30)] }] },
  tennis: { nom: 'Tennis', ic: '🎾', qual: 'Rotation, appuis, épaule et coude', risques: 'Épaule (coiffe), coude, dos, chevilles',
    tips: ['La force des rotateurs externes de l’épaule est essentielle au service.', 'Faites le renforcement de l’épaule après avoir joué, pas avant, pour ne pas la fatiguer.', 'Étirements conseillés : bras croisé et « sleeper stretch ».'],
    src: [['Blessures de l’épaule au tennis (Human Kinetics)', 'https://us.humankinetics.com/blogs/excerpt/shoulder-injuries-in-tennis']],
    seances: [{ nom: 'Épaule & coude (après le tennis)', sport: 'muscu', items: [I('rotext', 3, 15, 45), I('bandpa', 3, 15, 45), I('oiseauel', 3, 15, 45), I('poignet', 3, 15, 45), T('sleeper', 2, 30, 15)] },
      { nom: 'Rotation & appuis', sport: 'muscu', items: [I('medrot', 4, 6, 60), I('pallof', 3, 10, 45), I('russian', 3, 20, 45), I('fentes', 3, 10, 60), T('equilibre', 3, 30, 20)] }] },
  padel: { nom: 'Padel / badminton', ic: '🏸', qual: 'Appuis rapides, épaule, poignet', risques: 'Coude (épicondylite), épaule, chevilles, genoux',
    tips: ['Renforcez la coiffe des rotateurs pour les smashs et les frappes au-dessus de la tête.', 'Gainage anti-rotation (Pallof press), dead bug et planche protègent le dos.', 'Équilibre unipodal, yeux fermés pour progresser, contre les entorses.'],
    src: [['Blessures fréquentes au padel', 'https://padel-rules.pages.dev/player-guidelines/padel-injuries-prevention']],
    seances: [{ nom: 'Épaule, coude & poignet', sport: 'muscu', items: [I('rotext', 3, 15, 45), I('ytw', 3, 8, 45), I('poignet', 3, 15, 45), I('bandpa', 3, 15, 45), T('etirpoignet', 2, 20, 10)] },
      { nom: 'Tronc & appuis', sport: 'muscu', items: [I('pallof', 3, 10, 45), T('deadbug', 3, 40, 30), T('equilibre', 3, 30, 20), I('fentes', 3, 10, 60), I('glutepont1', 3, 10, 45)] }] },
  combat: { nom: 'Boxe / sports de combat', ic: '🥊', qual: 'Puissance de rotation, cardio, gainage, cou', risques: 'Poignets et mains, épaules, cou',
    tips: ['Avant la vitesse, construisez la force et la stabilité en rotation, avec du gainage « anti-rotation ».', 'Les lancers rotatifs de médecine-ball ressemblent au geste du coup de poing.'],
    src: [['Puissance de rotation en boxe (Boxing Science)', 'https://boxingscience.co.uk/rotational-power-exercises/']],
    seances: [{ nom: 'Puissance & rotation', sport: 'muscu', items: [I('medrot', 4, 6, 90), I('pallof', 3, 10, 45), I('pompe', 4, 12, 60), I('tractions', 4, 6, 90), I('cou', 3, 4, 45), I('poignet', 2, 15, 45)] },
      { nom: 'Cardio de combat', sport: 'hiit', items: [T('corde', 3, 120, 60), T('burpee', 4, 30, 30), T('mc', 4, 30, 30), T('squatjump', 3, 30, 30), T('commando', 3, 30, 30)] }] },
  escalade: { nom: 'Escalade', ic: '🧗', qual: 'Force de traction, doigts, gainage', risques: 'Doigts (poulies), épaules, coudes',
    tips: ['L’escalade est un sport de traction : compensez avec les muscles antagonistes (extenseurs des doigts et du poignet, triceps, pectoraux, épaules).', 'Pompes, dips, développé et rotations d’épaule maintiennent l’épaule stable.', 'Débutant : n’abusez pas de la poutre (hangboard).'],
    src: [['Entraîner les antagonistes (Gripped)', 'https://gripped.com/?p=29410'], ['Antagonistes et épaule (Nicros)', 'https://nicros.com/training/training-articles/physical/antagonist-muscle-training-to-prevent-injury/']],
    seances: [{ nom: 'Antagonistes', sport: 'muscu', items: [I('pompe', 3, 12, 60), I('dm', 3, 10, 90), I('rotext', 3, 15, 45), I('extdoigts', 3, 25, 30), I('poignet', 3, 15, 45), I('shtaps', 3, 20, 45)] },
      { nom: 'Traction & gainage', sport: 'muscu', items: [I('tractions', 4, 6, 120), T('hollow', 3, 30, 30), I('releve', 3, 10, 60), I('birddog', 3, 8, 30), I('facepull', 3, 15, 45)] }] },
  ski: { nom: 'Ski', ic: '⛷️', qual: 'Force des cuisses en position fléchie, équilibre, gainage', risques: 'Genoux (entorses, LCA), poignets, épaules',
    tips: ['Commencez la préparation 1 à 2 mois avant le séjour, 2 à 3 fois par semaine.', 'La chaise au mur jusqu’à 90–120 s imite une descente.', 'Faites aussi régler vos fixations par un professionnel : une grande partie des entorses du genou vient d’un mauvais réglage.'],
    src: [['Préparation au ski (Suva)', 'https://www.suva.ch/fr-ch/prevention/loisirs/eviter-les-blessures-durant-les-sports-de-neige/programme-de-fitness-avec-loic?lang=fr-CH'], ['Préparer ses genoux au ski', 'https://lasante.net/fiches-conseil/bien-etre/vacances-et-bien-etre/preparer-ses-genoux-au-ski.htm']],
    seances: [{ nom: 'Cuisses & genoux', sport: 'muscu', items: [T('chaise', 3, 60, 60), I('goblet', 4, 12, 60), I('stepdown', 3, 8, 45), I('monster', 3, 10, 30), I('fentes', 3, 10, 60)] },
      { nom: 'Équilibre & explosivité', sport: 'muscu', items: [T('equilibre', 3, 30, 20), I('squatjump', 3, 8, 60), T('chasses', 3, 30, 30), T('gainlat', 3, 30, 30), T('gainage', 3, 45, 30)] }] },
  golf: { nom: 'Golf', ic: '⛳', qual: 'Rotation du haut du dos, mobilité des hanches, stabilité', risques: 'Bas du dos, coude, épaule',
    tips: ['Si le haut du dos et les hanches tournent mal, c’est le bas du dos qui compense : travaillez leur mobilité.', 'Le gainage anti-rotation stabilise le swing.'],
    src: [['Exercices pour le swing (ACE)', 'https://acefitness.org/resources/everyone/blog/5943/exercises-to-improve-your-golf-swing'], ['Prévenir les blessures au golf', 'https://gaylord.org/patients-families/about/news/news-list/nyt-to-prevent-golfing-injuries-loosen-up-your-spine']],
    seances: [{ nom: 'Mobilité du swing', sport: 'mobilite', items: [T('thoracique', 2, 45, 10), T('worlds', 2, 45, 10), T('9090', 2, 45, 10), T('hipcircles', 1, 40, 5), T('torsion', 1, 60, 0)] },
      { nom: 'Stabilité & rotation', sport: 'muscu', items: [I('pallof', 3, 10, 45), T('deadbug', 3, 40, 30), I('medrot', 3, 6, 60), I('glutepont1', 3, 10, 45), T('equilibre', 3, 30, 20)] }] },
  trail: { nom: 'Trail / rando sportive', ic: '🏔️', qual: 'Endurance, descentes, chevilles', risques: 'Quadriceps et genoux en descente, chevilles, tendon d’Achille',
    tips: ['En descente, les quadriceps travaillent en excentrique (en s’allongeant) : entraînez-les spécifiquement.', 'Mollets en excentrique et équilibre pour les terrains instables.'],
    src: [['Excentrique et descente (CTS)', 'https://trainright.com/eccentric-strength-training-for-improved-downhill-running-performance/']],
    seances: [{ nom: 'Descentes & chevilles', sport: 'muscu', items: [I('stepdown', 3, 8, 45), I('molletexc', 3, 12, 45), T('equilibre', 3, 30, 20), I('fentes', 3, 10, 60), I('nordic', 2, 5, 90)] },
      { nom: 'Tronc & hanches', sport: 'muscu', items: [T('deadbug', 3, 40, 30), I('birddog', 3, 8, 30), I('monster', 3, 10, 30), I('glutepont1', 3, 10, 45), T('gainlat', 2, 30, 30)] }] },
  tir: { nom: 'Tir sportif', ic: '🎯', qual: 'Stabilité, endurance de tenue, gainage, calme', risques: 'Épaule, poignet, cou, dos (positions statiques)',
    tips: ['La stabilité est la base de la précision : le gainage et l’équilibre réduisent les mouvements parasites.', 'Renforcez la tenue du poignet avec des exercices à l’élastique.', 'Une endurance cardio régulière aide à garder le calme et un rythme cardiaque bas.'],
    src: [['Stabilité au pistolet', 'https://tirsportifchabris.fr/blog/entrainement-tir-pistolet'], ['Stand de tir : renforcement du poignet', 'https://tirsportifchabris.fr/blog/stand-de-tir-stab']],
    seances: [{ nom: 'Stabilité & gainage', sport: 'muscu', items: [T('gainage', 3, 45, 30), T('gainlat', 2, 30, 30), T('deadbug', 3, 40, 30), I('birddog', 3, 8, 30), T('equilibre', 3, 30, 20), T('tenue', 4, 30, 30)] },
      { nom: 'Épaules & poignets', sport: 'muscu', items: [I('rotext', 3, 15, 45), I('bandpa', 3, 15, 45), I('oiseauel', 3, 15, 45), I('poignet', 3, 15, 45), T('couetir', 2, 30, 10), T('etirpoignet', 2, 20, 10)] }] }
};


// ===================== EXERCICES : SPORTS DE COMBAT, POIDS DU CORPS, PUISSANCE =====================
M('muscu', 'shadow', 'Shadow boxing', 'Sports de combat', 'Aucun', 1, 'Épaules, jambes, cardio',
  ['En garde, mains hautes, menton rentré.', 'Enchaînez directs, crochets et esquives en vous déplaçant.', 'Rythme régulier pendant tout le round, expirez à chaque frappe.'],
  ['Baisser la garde', 'Rester planté sur place', 'Bloquer la respiration'], 'Visualisez un adversaire : bougez la tête après chaque enchaînement.', '3 × 2–3 min, 1 min de repos');
M('muscu', 'sac', 'Rounds au sac de frappe', 'Sports de combat', 'Sac de frappe + gants', 2, 'Corps entier, puissance, cardio',
  ['Gants et bandes, à distance de bras du sac.', 'Enchaînez combinaisons et déplacements autour du sac.', 'Alternez 20 s en rapidité et 10 s en puissance.'],
  ['Frapper avec les bras seulement', 'Poignet cassé à l’impact', 'Rester collé au sac'], 'La puissance part des pieds et passe par la rotation des hanches.', '3–6 × 3 min, 1 min de repos');
M('muscu', 'sprawl', 'Sprawl', 'Sports de combat', 'Aucun', 2, 'Hanches, gainage, cardio',
  ['Debout en garde.', 'Projetez les jambes en arrière et plaquez les hanches au sol, poitrine haute.', 'Revenez debout en garde le plus vite possible.'],
  ['Atterrir à genoux', 'Dos creusé sans gainage'], 'C’est le réflexe de défense contre une amenée au sol.', '4 × 20–40 s');
M('muscu', 'crevette', 'Échappement de hanche (crevette)', 'Sports de combat', 'Tapis', 1, 'Hanches, gainage latéral',
  ['Sur le dos, pieds au sol.', 'Poussez sur un pied pour chasser les hanches vers l’arrière en pivotant sur l’épaule.', 'Enchaînez d’un côté puis de l’autre en avançant sur le tapis.'],
  ['Pousser avec les mains', 'Rester à plat'], 'Mouvement de base au sol en jiu-jitsu, lutte et MMA.', '4 × longueur de tapis');
M('muscu', 'pontlutte', 'Pont de lutte (progressif)', 'Sports de combat', 'Tapis', 3, 'Nuque, extenseurs du dos, fessiers',
  ['Commencez par un pont fessier, puis un pont sur les mains (pont arrière).', 'Pour les pratiquants confirmés seulement : appui sur le sommet du crâne, avec les mains pour protéger.', 'Petits roulements avant-arrière, très lents.'],
  ['Brûler les étapes', 'Mouvements brusques de la nuque', 'Le faire sans encadrement si débutant'], 'À progresser très lentement ; en cas de douleur au cou, arrêtez.', '3 × 20–30 s');
M('muscu', 'serviette', 'Suspension à la serviette', 'Sports de combat', 'Barre + 2 serviettes', 2, 'Grip, avant-bras, dos',
  ['Passez deux serviettes sur une barre de traction.', 'Agrippez-les et suspendez-vous, épaules engagées.', 'Progression : tractions avec les serviettes.'],
  ['Épaules relâchées aux oreilles'], 'Reproduit la saisie du kimono (judo, jiu-jitsu).', '4 × 20–45 s');
M('muscu', 'uchikomi', 'Uchi-komi à l’élastique', 'Sports de combat', 'Élastique + point d’ancrage', 2, 'Dos, hanches, coordination',
  ['Élastique attaché à hauteur de poitrine, une extrémité dans chaque main.', 'Répétez l’entrée de votre projection (rotation, placement des hanches) contre la tension.', 'Revenez en garde en contrôlant.'],
  ['Tirer avec les bras sans tourner les hanches'], 'Rapidité d’entrée : vitesse maximale, technique propre.', '4 × 15 entrées');
M('muscu', 'genoux', 'Frappes de genou', 'Sports de combat', 'Aucun (sac facultatif)', 1, 'Fléchisseurs de hanche, gainage',
  ['Mains devant comme pour saisir la nuque.', 'Montez le genou vers l’avant en avançant la hanche, buste légèrement en arrière.', 'Alternez droite-gauche.'],
  ['Pencher le buste en avant', 'Genou qui part sur le côté'], 'Base du clinch en boxe thaïe.', '3 × 30–60 s');
M('muscu', 'kickel', 'Kick latéral contrôlé', 'Sports de combat', 'Aucun', 2, 'Moyen fessier, équilibre, ischios',
  ['Armez le genou à hauteur de hanche.', 'Tendez la jambe sur le côté en pivotant le pied d’appui.', 'Tenez 1 s, réarmez et reposez sans perdre l’équilibre.'],
  ['Buste qui tombe', 'Kick lancé sans contrôle'], 'Lent et contrôlé = force et souplesse ; rapide = puissance.', '3 × 8 par jambe');
M('muscu', 'cavalier', 'Position du cavalier', 'Sports de combat', 'Aucun', 1, 'Quadriceps, adducteurs',
  ['Pieds deux fois plus écartés que les épaules.', 'Descendez cuisses presque parallèles au sol, dos droit.', 'Genoux poussés vers l’extérieur, respirez calmement.'],
  ['Genoux qui rentrent', 'Dos penché'], 'Posture de base du karaté et du kung-fu.', '3 × 30–90 s');
M('muscu', 'fenteesc', 'Fente d’escrime', 'Sports de combat', 'Aucun', 2, 'Quadriceps, fessiers, ischios',
  ['En garde : pieds à 90°, genoux fléchis.', 'Bras armé tendu, poussez fort sur la jambe arrière et allongez la jambe avant.', 'Revenez en garde par une poussée de la jambe avant.'],
  ['Genou avant qui dépasse le pied', 'Buste penché en avant'], 'La jambe arrière propulse, la jambe avant freine : travaillez les deux.', '4 × 8 par côté');
M('muscu', 'bearcrawl', 'Marche de l’ours', 'Poids du corps', 'Aucun', 1, 'Épaules, gainage, coordination',
  ['À quatre pattes, genoux décollés de 5 cm.', 'Avancez bras et jambe opposés en même temps.', 'Dos plat, bassin stable.'],
  ['Fesses trop hautes', 'Genoux qui touchent le sol'], 'Excellent échauffement pour les sports de combat.', '4 × 20 m');
M('muscu', 'farmer', 'Marche du fermier', 'Poids du corps', 'Haltères, kettlebells ou sacs', 1, 'Grip, trapèzes, gainage',
  ['Une charge lourde dans chaque main.', 'Marchez droit, épaules basses, petits pas rapides.', 'Posez les charges sans arrondir le dos.'],
  ['Épaules qui tombent en avant', 'Pencher d’un côté'], 'Le meilleur exercice simple pour la poigne.', '4 × 30–40 m');
M('muscu', 'getup', 'Turkish get-up', 'Poids du corps', 'Kettlebell ou haltère', 3, 'Épaules, gainage, mobilité',
  ['Allongé, charge tenue bras tendu vers le plafond.', 'Relevez-vous étape par étape (coude, main, genou, debout) sans quitter la charge des yeux.', 'Redescendez dans l’ordre inverse.'],
  ['Bras qui plie', 'Aller trop vite'], 'Commencez sans charge ou avec une chaussure posée sur le poing.', '3 × 2 par côté');
M('muscu', 'pistol', 'Squat pistol', 'Poids du corps', 'Aucun', 3, 'Quadriceps, fessiers, équilibre',
  ['Sur une jambe, l’autre tendue devant.', 'Descendez le plus bas possible, talon au sol.', 'Remontez sans poser l’autre pied.'],
  ['Talon qui décolle', 'Genou qui rentre'], 'Progression : descendre sur une chaise, puis sur un banc plus bas.', '3 × 3–6 par jambe');
M('muscu', 'pompeincl', 'Pompes inclinées', 'Poids du corps', 'Banc ou table', 1, 'Pectoraux, triceps',
  ['Mains sur un support surélevé.', 'Corps gainé, descendez la poitrine vers le support.', 'Poussez jusqu’à bras tendus.'],
  ['Fesses en l’air', 'Coudes trop écartés'], 'Plus le support est haut, plus c’est facile.', '3 × 8–15');
M('muscu', 'pompedecl', 'Pompes pieds surélevés', 'Poids du corps', 'Banc', 2, 'Haut des pectoraux, épaules',
  ['Pieds sur un banc, mains au sol.', 'Corps aligné, descendez jusqu’à frôler le sol.', 'Remontez sans casser le dos.'],
  ['Dos creusé'], 'Progression vers les pompes en équilibre.', '4 × 8–15');
M('muscu', 'pompediam', 'Pompes mains serrées', 'Poids du corps', 'Aucun', 2, 'Triceps, pectoraux',
  ['Mains rapprochées sous la poitrine.', 'Coudes le long du corps, descendez lentement.', 'Poussez jusqu’à bras tendus.'],
  ['Coudes qui s’écartent'], 'Utile pour la puissance des directs.', '3 × 8–15');
M('muscu', 'pompeexp', 'Pompes explosives', 'Puissance', 'Aucun', 3, 'Pectoraux, triceps, puissance',
  ['Position de pompe.', 'Descendez puis poussez si fort que les mains décollent.', 'Réceptionnez-vous bras légèrement fléchis.'],
  ['Atterrir bras tendus', 'Dos creusé'], 'Peu de répétitions, qualité maximale.', '4 × 4–6');
M('muscu', 'rowinv', 'Rowing inversé', 'Poids du corps', 'Barre basse ou table solide', 1, 'Dos, biceps',
  ['Sous une barre, corps droit, talons au sol.', 'Tirez la poitrine vers la barre en serrant les omoplates.', 'Redescendez lentement.'],
  ['Bassin qui tombe'], 'Plus le corps est horizontal, plus c’est dur.', '3 × 8–15');
M('muscu', 'tracelast', 'Tractions assistées à l’élastique', 'Poids du corps', 'Barre + élastique', 1, 'Dos, biceps',
  ['Élastique accroché à la barre, un pied ou genou dedans.', 'Tirez jusqu’au menton au-dessus de la barre.', 'Redescendez bras tendus.'],
  ['Balancer les jambes'], 'Élastique de moins en moins fort au fil des semaines.', '4 × 5–10');
M('muscu', 'negtraction', 'Tractions négatives', 'Poids du corps', 'Barre', 2, 'Dos, biceps (excentrique)',
  ['Montez menton au-dessus de la barre (saut ou chaise).', 'Descendez le plus lentement possible (4–6 s).', 'Remontez sans tirer et recommencez.'],
  ['Se laisser tomber à la fin'], 'Le moyen le plus sûr d’obtenir sa première traction.', '4 × 3–5');
M('muscu', 'lsit', 'L-sit', 'Poids du corps', 'Barres parallèles ou chaises', 3, 'Abdominaux, triceps, fléchisseurs de hanche',
  ['Appui bras tendus, épaules basses.', 'Levez les jambes tendues à l’horizontale.', 'Tenez la position.'],
  ['Épaules qui remontent', 'Jambes pliées (sauf en progression)'], 'Progression : genoux pliés (tuck), puis une jambe, puis deux.', '4 × 10–20 s');
M('muscu', 'atr', 'Équilibre sur les mains au mur', 'Poids du corps', 'Mur', 3, 'Épaules, gainage',
  ['Mains à 20 cm du mur, montez les pieds en marchant au mur.', 'Corps aligné, regard entre les mains.', 'Tenez, puis redescendez en marchant.'],
  ['Dos très creusé', 'Bras pliés'], 'Commencez en pike (pieds sur une chaise) si l’épaule manque de force.', '4 × 15–45 s');
M('muscu', 'hspu', 'Pompes en équilibre', 'Poids du corps', 'Mur', 3, 'Épaules, triceps',
  ['En équilibre face au mur ou dos au mur.', 'Descendez la tête vers le sol en contrôlant.', 'Poussez jusqu’à bras tendus.'],
  ['Tête qui tape le sol', 'Coudes ouverts'], 'Exercice avancé : maîtrisez d’abord l’équilibre.', '4 × 3–6');
M('muscu', 'suspjambes', 'Relevés de jambes suspendu', 'Poids du corps', 'Barre', 3, 'Abdominaux, grip',
  ['Suspendu à une barre, épaules engagées.', 'Montez les jambes tendues jusqu’à la barre (ou à l’horizontale).', 'Redescendez sans balancer.'],
  ['Balancier', 'Dos qui se cambre'], 'Version facile : genoux pliés vers la poitrine.', '3 × 6–12');
M('muscu', 'medpasse', 'Passe poitrine au médecine-ball', 'Puissance', 'Médecine-ball + mur', 1, 'Pectoraux, triceps, puissance',
  ['Face à un mur, ballon contre la poitrine.', 'Lancez le ballon le plus fort possible en poussant des jambes et des bras.', 'Rattrapez et enchaînez.'],
  ['Lancer seulement avec les bras'], 'Puissance de poussée pour les directs, le pop-up et les contacts.', '4 × 8');
M('muscu', 'medslam', 'Slam au médecine-ball', 'Puissance', 'Médecine-ball (sans rebond)', 1, 'Corps entier, puissance',
  ['Ballon au-dessus de la tête, sur la pointe des pieds.', 'Frappez-le au sol de toutes vos forces en fléchissant hanches et genoux.', 'Ramassez dos droit et recommencez.'],
  ['Dos rond pour ramasser'], 'Défoulant et très efficace en fin de séance.', '4 × 8–10');
M('muscu', 'broadjump', 'Saut en longueur sans élan', 'Puissance', 'Aucun', 2, 'Fessiers, quadriceps, puissance',
  ['Pieds largeur de hanches, balancez les bras.', 'Sautez le plus loin possible en poussant fort.', 'Réception amortie, genoux dans l’axe, tenez 2 s.'],
  ['Réception jambes tendues', 'Genoux qui rentrent'], 'Qualité avant quantité : récupérez bien entre les sauts.', '4 × 4');
M('muscu', 'tuckjump', 'Sauts genoux-poitrine', 'Puissance', 'Aucun', 2, 'Jambes, gainage, explosivité',
  ['Debout, sautez en ramenant les genoux vers la poitrine.', 'Réception souple sur l’avant du pied.', 'Enchaînez sans pause.'],
  ['Atterrir talons en premier'], 'Développe la détente et la vitesse de jambes.', '3 × 8–12');
M('muscu', 'bondlat', 'Bonds latéraux', 'Puissance', 'Aucun', 2, 'Fessiers, adducteurs, appuis',
  ['Sur une jambe, sautez latéralement sur l’autre jambe.', 'Réception stable 1 s, genou dans l’axe.', 'Repartez de l’autre côté.'],
  ['Genou qui rentre à la réception'], 'Appuis de côté : ski, tennis, sports de combat, basket.', '3 × 8 par côté');
M('muscu', 'climber', 'Mountain climbers', 'Poids du corps', 'Aucun', 1, 'Gainage, cardio',
  ['Position de pompe bras tendus.', 'Ramenez alternativement les genoux vers la poitrine en courant.', 'Bassin bas et stable.'],
  ['Fesses en l’air'], 'Variante lente et contrôlée pour débuter.', '4 × 30 s');
M('muscu', 'battle', 'Cordes ondulatoires', 'Puissance', 'Cordes', 2, 'Épaules, cardio, gainage',
  ['Demi-squat, une corde dans chaque main.', 'Faites des vagues rapides en alternant les bras.', 'Gainez, respirez.'],
  ['Dos rond', 'Jambes tendues'], 'Simule l’effort des échanges en combat.', '5 × 20–30 s');
M('muscu', 'adductel', 'Adduction de hanche à l’élastique', 'Prévention', 'Élastique', 1, 'Adducteurs',
  ['Élastique attaché bas à la cheville, de profil.', 'Ramenez la jambe vers l’intérieur devant l’autre.', 'Revenez lentement.'],
  ['Pencher le buste'], 'Protège l’aine ; utile en cavalier, football et arts martiaux.', '3 × 15 par jambe');
M('muscu', 'departs', 'Départs et accélérations', 'Puissance', 'Aucun', 2, 'Jambes, vitesse',
  ['Départ accroupi ou en fente.', 'Accélérez à fond sur 10 à 30 m, buste penché vers l’avant au début.', 'Récupérez complètement en marchant.'],
  ['Se redresser trop tôt', 'Récupération trop courte'], 'La vitesse se travaille frais, en début de séance.', '6–8 × 20 m');
M('muscu', 'popup', 'Pop-up de surf', 'Puissance', 'Aucun (planche facultative)', 2, 'Pectoraux, gainage, mobilité de hanche',
  ['Allongé sur le ventre, mains sous les épaules.', 'Poussez et ramenez les pieds sous vous en un seul mouvement.', 'Arrivez en position de surf, genoux fléchis, regard devant.'],
  ['Passer par les genoux', 'Regarder ses pieds'], 'Rapidité et fluidité avant tout.', '4 × 6–10');
M('muscu', 'ramesurf', 'Rame allongée (paddle)', 'Prévention', 'Banc ou ballon (facultatif)', 1, 'Dorsaux, épaules, lombaires',
  ['Allongé sur le ventre, poitrine légèrement décollée.', 'Ramez en alternant les bras comme sur la planche.', 'Gardez la nuque longue.'],
  ['Trop cambrer', 'Relever la tête'], 'Le pagayage représente une grande partie de l’effort en surf.', '4 × 45–60 s');
M('mobilite', 'ecart', 'Écart latéral assis', 'Hanches', 'Tapis', 2, 'Adducteurs, ischios',
  ['Assis, jambes écartées le plus possible, pointes vers le haut.', 'Dos droit, penchez-vous vers l’avant depuis les hanches.', 'Respirez et relâchez à chaque expiration.'],
  ['Arrondir le dos', 'Forcer en à-coups'], 'Indispensable pour les coups de pied hauts.', '3 × 45 s');
Object.assign(IMG, { shadow: ['svg', 2], sac: ['svg', 2], sprawl: ['svg', 2], crevette: ['svg', 2], pontlutte: ['svg', 2], serviette: ['svg', 2], uchikomi: ['svg', 2],
  genoux: ['svg', 2], kickel: ['svg', 2], cavalier: ['svg', 1], fenteesc: ['svg', 2], bearcrawl: ['svg', 2], farmer: ['jpg', 2], getup: ['jpg', 2], pistol: ['svg', 2],
  pompeincl: ['jpg', 2], pompedecl: ['jpg', 2], pompediam: ['jpg', 2], pompeexp: ['jpg', 2], rowinv: ['jpg', 2], tracelast: ['jpg', 2], negtraction: ['svg', 2], lsit: ['svg', 2],
  atr: ['svg', 2], hspu: ['jpg', 2], suspjambes: ['jpg', 2], medpasse: ['jpg', 2], medslam: ['jpg', 2], broadjump: ['jpg', 2], tuckjump: ['jpg', 2], bondlat: ['jpg', 2],
  climber: ['jpg', 2], battle: ['jpg', 2], adductel: ['svg', 2], departs: ['svg', 2], popup: ['svg', 2], ramesurf: ['svg', 2], ecart: ['svg', 2] });

// ===================== PRÉPARATION PAR SPORT : 3 NIVEAUX =====================
// X(qualité testée, version débutant, intermédiaire, confirmé) — « mouvement séries×répétitions/repos » ou « séries×secondes s/repos »
const QK = { fh: 'force_haut', fb: 'force_bas', g: 'gainage', s: 'souplesse', c: 'cardio' };
const X = (q, ...v) => ({ q: QK[q] || null, v: v.map(s => { const m = s.match(/^(\S+) (\d+)x(\d+)(s?)\/(\d+)$/); if (!m) throw new Error('dose ' + s); return m[4] ? T(m[1], +m[2], +m[3], +m[5]) : I(m[1], +m[2], +m[3], +m[5]); }) });
const SS = (nom, sport, ...slots) => ({ nom, sport, slots });
const LV = ['', 'Débutant', 'Intermédiaire', 'Confirmé'];
const SPCAT = { combat: '🥋 Sports de combat', collectif: '⚽ Sports collectifs', raquette: '🎾 Raquette', nature: '🏔️ Nature & glisse', precision: '🎯 Précision', endurance: '🚣 Endurance', art: '🤸 Gym, danse & athlé' };
const O = k => { const s = SPEC_OLD[k]; return { nom: s.nom, ic: s.ic, qual: s.qual, risques: s.risques, tips: s.tips, src: s.src }; };
const SPEC = {
  boxe: { ...O('combat'), nom: 'Boxe anglaise', ic: '🥊', cat: 'combat', key: ['cardio', 'force_haut', 'gainage'], qual: 'Puissance de frappe, vitesse, cardio par rounds, gainage', risques: 'Poignets et mains, épaules, cou',
    tips: ['Avant la vitesse, construisez la force et la stabilité en rotation, avec du gainage « anti-rotation ».', 'Les lancers rotatifs de médecine-ball ressemblent au geste du coup de poing.', 'Travaillez en rounds de 3 minutes avec 1 minute de repos, comme en combat.'],
    seances: [SS('Puissance & vitesse de frappe', 'muscu', X('c', 'shadow 3x120s/60', 'shadow 4x180s/60', 'shadow 5x180s/45'), X('fh', 'pompeincl 3x10/60', 'pompe 4x12/60', 'pompeexp 4x6/90'), X(null, 'medpasse 3x8/60', 'medrot 4x6/60', 'medrot 5x6/60'), X('g', 'pallof 3x10/45', 'pallof 3x12/45', 'pallof 4x12/45'), X('fb', 'squatjump 3x8/60', 'squatjump 4x8/60', 'broadjump 4x4/90'), X(null, 'cou 2x4/30', 'cou 3x4/30', 'cou 3x4/30')),
      SS('Cardio de ring', 'hiit', X('c', 'corde 3x120s/60', 'corde 4x180s/60', 'corde 5x180s/45'), X('c', 'sac 3x120s/60', 'sac 4x180s/60', 'sac 6x180s/60'), X('c', 'climber 3x20s/40', 'climber 4x30s/30', 'battle 5x30s/30'), X('g', 'gainage 3x30s/30', 'shtaps 3x20/45', 'commando 4x30s/30'), X('fh', 'rowinv 3x10/60', 'rowh 4x10/60', 'tractions 4x6/90'), X(null, 'rotext 2x15/30', 'rotext 3x15/30', 'ytw 3x8/30'))] },
  muaythai: { nom: 'Boxe thaïe / kickboxing', ic: '🦵', cat: 'combat', key: ['cardio', 'souplesse', 'force_bas'], qual: 'Clinch, coups de pied, cardio par rounds, cou solide', risques: 'Tibias, cou, genoux, hanches',
    tips: ['Un cou solide résiste mieux aux frappes et permet de tenir la posture dans le clinch.', 'Durcissez les tibias progressivement : augmentez le volume de coups de pied d’environ 10 à 15 % par semaine.', 'Rounds de 3 minutes au sac, en alternant vitesse et puissance.'],
    src: [['Renforcer le cou pour le clinch (Evolve MMA)', 'https://evolve-mma.com/blog/10-neck-strengthening-exercises-for-a-stronger-muay-thai-clinch-game/'], ['Erreurs fréquentes en muay-thaï (Fairtex)', 'https://www.fairtex.com/blogs/news/what-is-muay-thai']],
    seances: [SS('Clinch & cou', 'muscu', X(null, 'cou 2x4/30', 'cou 3x4/30', 'cou 4x4/30'), X('fh', 'rowinv 3x10/60', 'tractions 4x5/90', 'serviette 4x30s/90'), X('c', 'genoux 3x30s/45', 'genoux 4x45s/45', 'genoux 5x60s/45'), X('fb', 'goblet 3x10/60', 'squat 4x6/120', 'squat 5x5/150'), X('g', 'gainage 3x30s/30', 'pallof 3x10/45', 'hollow 4x30s/30'), X(null, 'farmer 3x30s/60', 'farmer 4x40s/60', 'farmer 5x40s/60')),
      SS('Kicks & cardio', 'hiit', X('c', 'corde 3x120s/60', 'corde 4x180s/45', 'corde 5x180s/45'), X('fb', 'fentes 3x10/60', 'bondlat 3x8/60', 'fentesaut 4x10/60'), X('s', 'kickel 2x6/30', 'kickel 3x8/30', 'kickel 4x10/30'), X('c', 'sac 3x120s/60', 'sac 4x180s/60', 'sac 5x180s/60'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45'), X('s', 'ecart 2x30s/15', 'ecart 3x45s/15', 'ecart 3x60s/15'))] },
  mma: { nom: 'MMA', ic: '🤼', cat: 'combat', key: ['cardio', 'force_haut', 'force_bas', 'gainage'], qual: 'Force, explosivité, poigne, cou, cardio sur 3 à 5 rounds', risques: 'Épaules, genoux, cou, mains',
    tips: ['Un combat dure 3 rounds de 5 minutes (5 pour les combats principaux) : entraînez le cardio en conséquence.', 'Préférez des exercices proches du combat : sprawls plutôt que burpees, cordes ondulatoires plutôt que tapis de course.', 'Cou solide, poigne et endurance aérobie sont prioritaires.'],
    src: [['Guide d’entraînement MMA (TRX)', 'https://www.trxtraining.com/blogs/news/mma-workout-guide'], ['Programme MMA de 12 semaines (Fighters Only)', 'https://fightersonly.com/article/ext/90211'], ['Organiser l’entraînement d’un combattant (SimpliFaster)', 'https://simplifaster.com/?p=34882']],
    seances: [SS('Force de combat', 'muscu', X('fb', 'goblet 3x10/90', 'squat 4x6/120', 'squat 5x4/150'), X('fh', 'rowinv 3x10/60', 'tractions 4x6/90', 'serviette 4x30s/90'), X('fh', 'pompe 3x10/60', 'dc 4x6/120', 'pompeexp 4x6/90'), X(null, 'farmer 3x30s/60', 'farmer 4x40s/60', 'farmer 5x40s/60'), X('g', 'pallof 3x10/45', 'pallof 4x10/45', 'getup 3x2/60'), X(null, 'cou 2x4/30', 'cou 3x4/30', 'cou 4x4/30')),
      SS('Rounds mixtes', 'hiit', X('c', 'shadow 3x120s/60', 'shadow 3x180s/60', 'shadow 4x180s/45'), X('c', 'sprawl 3x20s/40', 'sprawl 4x30s/30', 'sprawl 5x40s/30'), X('c', 'bearcrawl 3x20s/40', 'bearcrawl 4x30s/30', 'battle 5x30s/30'), X('g', 'crevette 3x30s/30', 'crevette 4x40s/30', 'crevette 5x45s/30'), X('c', 'corde 3x120s/60', 'corde 4x180s/60', 'sac 5x180s/60'), X('s', '9090 2x45s/10', '9090 2x60s/10', 'pigeon 2x60s/10'))] },
  judo: { nom: 'Judo', ic: '🥋', cat: 'combat', key: ['force_haut', 'force_bas', 'gainage'], qual: 'Tirage, poigne, explosivité des projections, gainage', risques: 'Épaules (luxations), coudes, genoux, doigts',
    tips: ['La poigne est décisive : marche du fermier, suspensions et tractions à la serviette reproduisent la saisie du kimono.', 'La force maximale et la puissance rendent les entrées en projection plus rapides.', 'Sur une carrière, le judo a un taux de blessure élevé, surtout aux membres supérieurs : renforcez les épaules.'],
    src: [['Musculation pour le judo (StrengthLog)', 'https://www.strengthlog.com/strength-training-for-judo'], ['Préparation physique du judoka', 'https://judodoha2023.com/blog/strength-conditioning-program-competitive-judoka']],
    seances: [SS('Tirage & poigne', 'muscu', X('fh', 'rowinv 3x10/60', 'tractions 4x6/90', 'tractions 5x8/120'), X(null, 'serviette 3x20s/90', 'serviette 4x30s/90', 'serviette 5x40s/90'), X('fh', 'rowh 3x10/60', 'rowb 4x8/90', 'rowb 5x5/120'), X(null, 'farmer 3x30s/60', 'farmer 4x40s/60', 'farmer 4x45s/60'), X(null, 'poignet 2x15/45', 'poignet 3x15/45', 'extdoigts 3x25/30'), X('g', 'birddog 3x8/30', 'pallof 3x10/45', 'getup 3x2/60')),
      SS('Projections & jambes', 'muscu', X('fb', 'goblet 3x10/90', 'squat 4x6/120', 'squat 5x4/150'), X('fb', 'sdtr 3x10/90', 'sdtr 4x8/120', 'sdt 5x4/150'), X('c', 'uchikomi 3x10/45', 'uchikomi 4x15/45', 'uchikomi 5x20/45'), X('fb', 'squatjump 3x6/60', 'boxjump 4x5/90', 'broadjump 5x4/90'), X(null, 'glutepont1 3x10/45', 'pontlutte 3x20s/45', 'pontlutte 3x30s/45'), X(null, 'rotext 2x15/30', 'rotext 3x15/30', 'rotext 3x15/30'))] },
  grappling: { nom: 'Jiu-jitsu brésilien / lutte', ic: '🤼', cat: 'combat', key: ['force_haut', 'gainage', 'cardio'], qual: 'Poigne, tirage, force statique, endurance au sol', risques: 'Coudes, genoux, cou, doigts',
    tips: ['Poigne, tirage et force « statique » pour résister aux avancées de position sont les qualités clés.', 'En compétition, le coude est l’articulation la plus souvent blessée : renforcez bras et épaules, et tapez tôt.', 'Les échappements de hanche et le pont sont vos meilleurs exercices spécifiques.'],
    src: [['Force, puissance et endurance en JJB (NSCA)', 'https://www.nsca.com/contentassets/246f9b22016841e68ad57b43efe15f32/coach-10.2.6-developing-strength-power-and-endurance-in-the-brazilian-jiu-jitsu-athlete.pdf']],
    seances: [SS('Force au sol', 'muscu', X('fb', 'glutepont1 3x10/45', 'hipthrust 4x8/90', 'hipthrust 5x6/120'), X('fh', 'rowinv 3x10/60', 'tractions 4x6/90', 'serviette 5x40s/90'), X(null, 'farmer 3x30s/60', 'farmer 4x40s/60', 'farmer 5x40s/60'), X('g', 'deadbug 3x40s/30', 'hollow 3x30s/30', 'lsit 4x15s/60'), X(null, 'cou 2x4/30', 'pontlutte 3x20s/45', 'pontlutte 3x30s/45'), X('g', 'crevette 3x30s/30', 'crevette 4x40s/30', 'getup 3x2/60')),
      SS('Endurance de combat', 'hiit', X('c', 'bearcrawl 3x20s/40', 'bearcrawl 4x30s/30', 'bearcrawl 5x40s/30'), X('c', 'sprawl 3x20s/40', 'sprawl 4x30s/30', 'sprawl 5x40s/30'), X('fb', 'goblet 3x12/60', 'fentes 4x10/60', 'pistol 4x4/90'), X('fh', 'pompe 3x10/60', 'dips 4x8/90', 'pompeexp 4x6/90'), X('c', 'climber 3x30s/30', 'burpee 4x30s/30', 'battle 5x30s/30'), X('s', '9090 2x45s/10', 'pigeon 2x60s/10', 'squatprof 3x60s/10'))] },
  karate: { nom: 'Karaté / taekwondo', ic: '🥋', cat: 'combat', key: ['souplesse', 'force_bas', 'gainage'], qual: 'Souplesse de hanche, explosivité des jambes, équilibre, gainage', risques: 'Ischios, hanches (adducteurs), chevilles, genoux',
    tips: ['Le soulevé de terre jambes tendues renforce les ischios tout en travaillant leur souplesse : idéal pour les coups de pied hauts.', 'La puissance des coups de pied vient beaucoup des fléchisseurs de hanche : renforcez-les.', 'Équilibre sur une jambe et gainage dans tous les plans pour frapper sans perdre l’appui.'],
    src: [['Exercices pour débuter le taekwondo (Sweet Science of Fighting)', 'https://sweetscienceoffighting.com/taekwondo/exercises-for-beginners'], ['Musculation et taekwondo', 'https://taekwondonation.com/strength-training']],
    seances: [SS('Coups de pied', 'muscu', X('s', 'fentebasse 2x40s/10', 'ecart 3x45s/15', 'ecart 3x60s/15'), X('fb', 'sdtr 3x10/90', 'sdtr 4x8/90', 'pistol 4x5/90'), X('s', 'kickel 2x6/30', 'kickel 3x8/30', 'kickel 4x10/30'), X(null, 'monster 2x10/30', 'monster 3x12/30', 'clam 3x20/30'), X('fb', 'squatjump 3x6/60', 'tuckjump 3x8/60', 'bondlat 4x8/60'), X('g', 'releve 3x8/60', 'releve 3x12/60', 'suspjambes 3x8/60')),
      SS('Explosivité & posture', 'muscu', X('fb', 'cavalier 3x30s/45', 'cavalier 3x60s/45', 'cavalier 4x90s/45'), X('c', 'shadow 3x90s/45', 'shadow 4x120s/45', 'shadow 5x120s/30'), X('fh', 'pompeincl 3x10/60', 'pompe 4x12/60', 'pompeexp 4x6/90'), X('g', 'pallof 3x10/45', 'pallof 4x10/45', 'russian 4x20/45'), X('c', 'jj 3x30s/30', 'tuckjump 4x20s/40', 'fentesaut 5x20s/40'), X('s', 'pigeon 2x45s/10', 'papillon 2x60s/10', 'ecart 3x60s/10'))] },
  escrime: { nom: 'Escrime', ic: '🤺', cat: 'combat', key: ['force_bas', 'cardio'], qual: 'Fente explosive, vitesse de déplacement, équilibre', risques: 'Ischios, genoux, déséquilibre gauche/droite',
    tips: ['L’escrime est surtout anaérobie : la fente et la vitesse de changement de direction reposent sur la force et la puissance.', 'Les ischios sont à renforcer en priorité, et la garde asymétrique crée des déséquilibres à compenser.', 'Travaillez aussi la jambe « faible » et le côté opposé à votre garde.'],
    src: [['Déterminants de la performance en escrime (JSCR, Turner et al.)', 'https://pure.cardiffmet.ac.uk/en/publications/determinants-of-olympic-fencing-performance-and-implications-for-/']],
    seances: [SS('Fente & jambes', 'muscu', X('fb', 'fenteesc 3x6/60', 'fenteesc 4x8/60', 'fenteesc 5x10/60'), X('fb', 'fentes 3x8/60', 'stepdown 3x8/45', 'pistol 4x4/90'), X(null, 'nordic 2x3/90', 'nordic 3x5/90', 'nordic 3x8/90'), X('fb', 'squatjump 3x6/60', 'bondlat 3x8/60', 'broadjump 4x4/90'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('s', 'fentebasse 2x40s/10', 'fentebasse 2x60s/10', 'pigeon 2x60s/10')),
      SS('Équilibrage & vitesse', 'muscu', X(null, 'glutepont1 3x10/45', 'glutepont1 3x12/45', 'glutepont1 4x12/45'), X('c', 'departs 4x5s/60', 'departs 6x5s/60', 'departs 8x5s/60'), X('g', 'pallof 3x10/45', 'gainlat 3x30s/30', 'getup 3x2/60'), X(null, 'rotext 2x15/30', 'facepull 3x15/45', 'ytw 3x8/30'), X(null, 'poignet 2x15/45', 'poignet 3x15/45', 'poignet 3x20/45'), X('c', 'corde 3x60s/30', 'corde 4x90s/30', 'corde 5x120s/30'))] },
  foot: { ...O('foot'), cat: 'collectif', key: ['force_bas', 'cardio', 'gainage'],
    seances: [SS('Prévention (type FIFA 11+)', 'muscu', X(null, 'nordic 2x3/90', 'nordic 3x5/90', 'nordic 3x8/90'), X(null, 'copenhague 2x4/60', 'copenhague 3x6/60', 'copenhague 3x10/60'), X(null, 'equilibre 3x30s/20', 'equilibre 3x30s/20', 'equilibre 3x45s/20'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'shtaps 3x20/45'), X('g', 'gainlat 2x20s/30', 'gainlat 3x30s/30', 'gainlat 3x45s/30'), X(null, 'monster 2x10/30', 'monster 3x10/30', 'monster 3x15/30')),
      SS('Force & vitesse', 'muscu', X('fb', 'goblet 3x10/90', 'squat 4x6/120', 'squat 5x4/150'), X('fb', 'fentes 3x8/60', 'fentes 3x10/60', 'bondlat 4x8/60'), X('fb', 'glutepont1 3x10/45', 'hipthrust 4x8/90', 'hipthrust 5x6/120'), X('c', 'departs 4x5s/60', 'departs 6x5s/60', 'departs 8x5s/60'), X('fb', 'squatjump 3x6/60', 'boxjump 4x5/90', 'broadjump 4x4/90'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45'))] },
  rugby: { ...O('rugby'), cat: 'collectif', key: ['force_haut', 'force_bas', 'gainage'],
    seances: [SS('Force & cou', 'muscu', X('fb', 'goblet 3x10/90', 'squat 4x6/120', 'squat 5x4/180'), X('fh', 'pompe 3x10/60', 'dc 4x6/120', 'dc 5x4/150'), X('fh', 'rowinv 3x10/60', 'rowb 4x8/90', 'tractions 5x5/120'), X(null, 'cou 2x4/30', 'cou 3x4/30', 'cou 4x4/30'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'getup 3x2/60')),
      SS('Puissance & contacts', 'muscu', X('fb', 'squatjump 3x6/60', 'boxjump 4x5/90', 'broadjump 5x4/90'), X('fh', 'medpasse 3x8/60', 'medpasse 4x8/60', 'pompeexp 5x5/90'), X(null, 'medslam 3x8/60', 'medrot 4x6/60', 'medrot 5x6/60'), X(null, 'nordic 2x3/90', 'nordic 3x5/90', 'nordic 3x6/90'), X(null, 'farmer 3x30s/60', 'farmer 4x40s/60', 'farmer 5x40s/60'), X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'ytw 3x8/30'))] },
  basket: { ...O('basket'), cat: 'collectif', key: ['force_bas', 'cardio'],
    seances: [SS('Appuis & réceptions', 'muscu', X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('fb', 'squatjump 3x6/60', 'tuckjump 4x8/60', 'boxjump 5x5/90'), X('fb', 'stepdown 3x8/45', 'stepdown 3x10/45', 'pistol 4x4/90'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45'), X(null, 'monster 2x10/30', 'monster 3x12/30', 'bondlat 4x8/60'), X('g', 'gainlat 2x20s/30', 'gainlat 3x30s/30', 'pallof 4x10/45')),
      SS('Force & détente', 'muscu', X('fb', 'goblet 3x10/90', 'squat 4x6/120', 'squat 5x5/150'), X('fb', 'fentes 3x8/60', 'fentes 4x10/60', 'fentesaut 4x10/60'), X('fb', 'glutepont1 3x10/45', 'hipthrust 4x8/90', 'hipthrust 5x6/120'), X('c', 'departs 4x5s/60', 'departs 6x5s/60', 'departs 8x5s/45'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'hollow 4x30s/30'))] },
  volley: { ...O('volley'), cat: 'collectif', key: ['force_bas', 'force_haut'],
    seances: [SS('Chevilles & sauts', 'muscu', X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('fb', 'squatjump 3x6/60', 'boxjump 4x5/90', 'tuckjump 5x6/60'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45'), X('fb', 'stepdown 3x8/45', 'stepdown 3x10/45', 'pistol 4x4/90'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'shtaps 3x20/45')),
      SS('Épaule de frappe', 'muscu', X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'rotext 3x15/45'), X(null, 'ytw 2x8/30', 'ytw 3x8/30', 'ytw 3x10/30'), X('fh', 'rowinv 3x10/60', 'rowh 4x10/60', 'tractions 4x6/90'), X('fh', 'pompeincl 3x10/60', 'pompe 4x10/60', 'medpasse 4x8/60'), X(null, 'medslam 3x8/60', 'medslam 4x8/60', 'medrot 4x6/60'), X('s', 'sleeper 2x30s/10', 'sleeper 3x30s/10', 'pecsetir 3x30s/10'))] },
  hand: { ...O('hand'), cat: 'collectif', key: ['force_haut', 'force_bas'],
    seances: [SS('Épaule du lanceur', 'muscu', X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'rotext 3x15/45'), X(null, 'ytw 2x8/30', 'ytw 3x8/30', 'oiseauel 3x15/45'), X('fh', 'pompeincl 3x10/60', 'pompe 4x12/60', 'pompeexp 4x6/90'), X('fh', 'rowinv 3x10/60', 'rowh 4x10/60', 'tractions 4x6/90'), X(null, 'medslam 3x8/60', 'medrot 4x6/60', 'medrot 5x6/60'), X('g', 'pallof 3x10/45', 'pallof 4x10/45', 'getup 3x2/60')),
      SS('Genoux & appuis', 'muscu', X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X(null, 'nordic 2x3/90', 'nordic 3x5/90', 'nordic 3x8/90'), X('fb', 'stepdown 3x8/45', 'stepdown 3x10/45', 'pistol 4x4/90'), X('fb', 'squatjump 3x6/60', 'bondlat 3x8/60', 'boxjump 4x5/90'), X(null, 'monster 2x10/30', 'monster 3x12/30', 'copenhague 3x8/60'))] },
  tennis: { ...O('tennis'), cat: 'raquette', key: ['gainage', 'force_bas', 'souplesse'],
    seances: [SS('Épaule & coude (après le tennis)', 'muscu', X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'rotext 3x15/45'), X(null, 'bandpa 2x15/45', 'bandpa 3x15/45', 'ytw 3x10/30'), X(null, 'oiseauel 2x15/45', 'oiseauel 3x15/45', 'facepull 3x15/45'), X(null, 'poignet 2x15/45', 'poignet 3x15/45', 'poignet 3x20/45'), X('s', 'sleeper 2x30s/10', 'sleeper 3x30s/10', 'sleeper 3x30s/10')),
      SS('Rotation & appuis', 'muscu', X(null, 'medrot 3x6/60', 'medrot 4x6/60', 'medrot 5x6/60'), X('g', 'pallof 3x10/45', 'pallof 3x12/45', 'russian 4x20/45'), X('fb', 'fentes 3x8/60', 'fentes 3x10/60', 'bondlat 4x8/60'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('fb', 'goblet 3x10/90', 'goblet 4x10/90', 'squatjump 4x6/60'), X('c', 'departs 4x5s/60', 'departs 6x5s/45', 'departs 8x5s/45'))] },
  padel: { ...O('padel'), cat: 'raquette', key: ['gainage', 'force_bas'],
    seances: [SS('Épaule, coude & poignet', 'muscu', X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'rotext 3x15/45'), X(null, 'ytw 2x8/30', 'ytw 3x8/30', 'ytw 3x10/30'), X(null, 'poignet 2x15/45', 'poignet 3x15/45', 'poignet 3x20/45'), X(null, 'bandpa 2x15/45', 'bandpa 3x15/45', 'facepull 3x15/45'), X('s', 'etirpoignet 2x20s/10', 'etirpoignet 2x20s/10', 'sleeper 3x30s/10')),
      SS('Tronc & appuis', 'muscu', X('g', 'pallof 3x10/45', 'pallof 3x12/45', 'pallof 4x12/45'), X('g', 'deadbug 3x30s/30', 'deadbug 3x40s/30', 'hollow 4x30s/30'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('fb', 'fentes 3x8/60', 'fentes 3x10/60', 'bondlat 4x8/60'), X('fb', 'glutepont1 3x10/45', 'glutepont1 3x12/45', 'pistol 3x5/90'))] },
  escalade: { ...O('escalade'), cat: 'nature', key: ['force_haut', 'gainage'],
    seances: [SS('Antagonistes', 'muscu', X('fh', 'pompeincl 3x10/60', 'pompe 4x12/60', 'pompediam 4x10/60'), X('fh', 'dm 3x10/90', 'dm 4x8/90', 'hspu 4x4/120'), X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'rotext 3x15/45'), X(null, 'extdoigts 3x20/30', 'extdoigts 3x25/30', 'extdoigts 4x30/30'), X(null, 'poignet 2x15/45', 'poignet 3x15/45', 'poignet 3x20/45'), X('g', 'gainage 3x30s/30', 'shtaps 3x20/45', 'shtaps 4x24/45')),
      SS('Traction & gainage', 'muscu', X('fh', 'tracelast 3x6/90', 'tractions 4x5/120', 'tractions 5x8/150'), X('fh', 'rowinv 3x10/60', 'rowinv 4x12/60', 'serviette 4x30s/90'), X('g', 'hollow 3x20s/30', 'hollow 3x30s/30', 'lsit 4x15s/60'), X('g', 'releve 3x8/60', 'releve 3x12/60', 'suspjambes 4x8/60'), X('g', 'birddog 3x8/30', 'birddog 3x10/30', 'getup 3x2/60'), X(null, 'facepull 3x15/45', 'facepull 3x15/45', 'ytw 3x10/30'))] },
  ski: { ...O('ski'), cat: 'nature', key: ['force_bas', 'gainage'],
    seances: [SS('Cuisses & genoux', 'muscu', X('fb', 'chaise 3x45s/60', 'chaise 3x75s/60', 'chaise 4x120s/60'), X('fb', 'goblet 3x10/90', 'goblet 4x12/60', 'pistol 4x4/90'), X('fb', 'stepdown 3x8/45', 'stepdown 3x10/45', 'stepdown 4x12/45'), X(null, 'monster 2x10/30', 'monster 3x12/30', 'monster 3x15/30'), X('fb', 'fentes 3x8/60', 'fentes 4x10/60', 'fentesaut 4x10/60')),
      SS('Équilibre & explosivité', 'muscu', X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('fb', 'squatjump 3x6/60', 'bondlat 3x8/60', 'bondlat 4x10/60'), X('c', 'chasses 3x30s/30', 'chasses 4x30s/30', 'tuckjump 4x20s/40'), X('g', 'gainlat 2x20s/30', 'gainlat 3x30s/30', 'gainlat 3x45s/30'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'getup 3x2/60'))] },
  surf: { nom: 'Surf', ic: '🏄', cat: 'nature', key: ['force_haut', 'gainage', 'souplesse'], qual: 'Endurance à la rame, pop-up explosif, équilibre, mobilité de hanche', risques: 'Épaules (coiffe), lombaires, genoux',
    tips: ['La rame peut représenter jusqu’à 60 % de l’énergie dépensée : dorsaux, arrière d’épaule et coiffe des rotateurs sont prioritaires.', 'Faites 5 minutes de rotations d’épaule à l’élastique avant chaque session.', 'Pompes explosives et sauts pour un pop-up rapide, équilibre pour tenir sur la planche.'],
    src: [['Endurance à la rame (Rapture Camps)', 'https://www.rapturecamps.com/learn-to-surf/surf-fitness/paddle-strength-training'], ['Santé des épaules du surfeur (Rapture Camps)', 'https://www.rapturecamps.com/learn-to-surf/surf-fitness/shoulder-health'], ['Entraînement inspiré du surf (ACE)', 'https://www.acefitness.org/resources/everyone/blog/5493/surfing-inspired-workout/']],
    seances: [SS('Rame & épaules', 'muscu', X(null, 'ramesurf 3x30s/30', 'ramesurf 4x45s/30', 'ramesurf 5x60s/30'), X('fh', 'rowinv 3x10/60', 'tractions 4x5/90', 'tractions 5x8/120'), X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'ytw 3x10/30'), X(null, 'bandpa 2x15/45', 'bandpa 3x15/45', 'facepull 3x15/45'), X('s', 'pecsetir 2x30s/10', 'pecsetir 2x40s/10', 'thoracique 2x45s/10')),
      SS('Pop-up & équilibre', 'muscu', X('fh', 'pompeincl 3x10/60', 'pompe 4x10/60', 'pompeexp 4x6/90'), X('c', 'popup 3x6/45', 'popup 4x8/45', 'popup 5x10/45'), X('fb', 'squatjump 3x6/60', 'squatjump 4x8/60', 'boxjump 4x5/90'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('g', 'pallof 3x10/45', 'pallof 3x12/45', 'russian 4x20/45'), X('s', 'fentebasse 2x40s/10', 'fentebasse 2x60s/10', 'squatprof 3x60s/10'))] },
  trail: { ...O('trail'), cat: 'nature', key: ['force_bas', 'cardio', 'gainage'],
    seances: [SS('Descentes & chevilles', 'muscu', X('fb', 'stepdown 3x8/45', 'stepdown 3x10/45', 'stepdown 4x12/45'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X('fb', 'fentes 3x8/60', 'fentes 4x10/60', 'fentesaut 4x10/60'), X(null, 'nordic 2x3/90', 'nordic 2x5/90', 'nordic 3x6/90')),
      SS('Tronc & hanches', 'muscu', X('g', 'deadbug 3x30s/30', 'deadbug 3x40s/30', 'hollow 4x30s/30'), X('g', 'birddog 3x8/30', 'birddog 3x10/30', 'birddog 4x10/30'), X(null, 'monster 2x10/30', 'monster 3x10/30', 'monster 3x15/30'), X('fb', 'glutepont1 3x10/45', 'glutepont1 3x12/45', 'pistol 3x5/90'), X('g', 'gainlat 2x20s/30', 'gainlat 3x30s/30', 'gainlat 3x45s/30'))] },
  equitation: { nom: 'Équitation', ic: '🏇', cat: 'nature', key: ['gainage', 'souplesse', 'force_bas'], qual: 'Gainage, adducteurs, équilibre, posture du haut du dos', risques: 'Lombaires, chutes, hanches',
    tips: ['Gainage, stabilité et souplesse des hanches, équilibre et symétrie sont les priorités du cavalier.', 'Des adducteurs forts et souples stabilisent la jambe, notamment en cross.', 'L’équilibre réduit le risque de chute, première cause de blessure à cheval.'],
    src: [['Être un cavalier en forme (Penn State Extension)', 'https://extension.psu.edu/being-a-fit-rider-can-help-your-horse'], ['Musculation pour cavaliers (StrengthLog)', 'https://www.strengthlog.com/strength-training-for-equestrians/']],
    seances: [SS('Assiette & gainage', 'muscu', X('g', 'deadbug 3x30s/30', 'deadbug 3x40s/30', 'hollow 4x30s/30'), X('g', 'birddog 3x8/30', 'birddog 3x10/30', 'birddog 4x10/30'), X(null, 'adductel 2x12/30', 'adductel 3x15/30', 'copenhague 3x8/60'), X('fb', 'chaise 3x30s/45', 'chaise 3x60s/45', 'cavalier 4x60s/45'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20')),
      SS('Posture & mobilité', 'muscu', X('fh', 'rowinv 3x10/60', 'rowh 3x10/60', 'rowh 4x10/60'), X(null, 'bandpa 2x15/45', 'bandpa 3x15/45', 'facepull 3x15/45'), X('fb', 'glutepont1 3x10/45', 'glutepont1 3x12/45', 'hipthrust 4x8/90'), X('s', 'papillon 2x45s/10', 'papillon 2x60s/10', 'ecart 3x45s/15'), X('s', 'fentebasse 2x40s/10', 'pigeon 2x45s/10', 'pigeon 2x60s/10'))] },
  golf: { ...O('golf'), cat: 'precision', key: ['souplesse', 'gainage'],
    seances: [SS('Mobilité du swing', 'mobilite', X('s', 'thoracique 2x40s/10', 'thoracique 2x45s/10', 'thoracique 3x45s/10'), X('s', 'worlds 2x40s/10', 'worlds 2x45s/10', 'worlds 3x45s/10'), X('s', '9090 2x40s/10', '9090 2x45s/10', '9090 3x60s/10'), X('s', 'hipcircles 1x40s/5', 'hipcircles 2x40s/5', 'cossack 3x8/30'), X('s', 'torsion 1x60s/0', 'torsion 2x45s/10', 'torsion 2x60s/10')),
      SS('Stabilité & rotation', 'muscu', X('g', 'pallof 3x10/45', 'pallof 3x12/45', 'pallof 4x12/45'), X('g', 'deadbug 3x30s/30', 'deadbug 3x40s/30', 'birddog 4x10/30'), X(null, 'medrot 3x6/60', 'medrot 4x6/60', 'medrot 5x6/60'), X('fb', 'glutepont1 3x10/45', 'glutepont1 3x12/45', 'sdtr 4x8/90'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'))] },
  tir: { ...O('tir'), cat: 'precision', key: ['gainage'],
    seances: [SS('Stabilité & gainage', 'muscu', X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'gainage 4x60s/30'), X('g', 'gainlat 2x20s/30', 'gainlat 2x30s/30', 'gainlat 3x40s/30'), X('g', 'deadbug 3x30s/30', 'deadbug 3x40s/30', 'birddog 4x10/30'), X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X(null, 'tenue 3x20s/30', 'tenue 4x30s/30', 'tenue 5x45s/30')),
      SS('Épaules & poignets', 'muscu', X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'rotext 3x15/45'), X(null, 'bandpa 2x15/45', 'bandpa 3x15/45', 'ytw 3x8/30'), X(null, 'oiseauel 2x15/45', 'oiseauel 3x15/45', 'facepull 3x15/45'), X(null, 'poignet 2x15/45', 'poignet 3x15/45', 'poignet 3x20/45'), X('s', 'couetir 2x30s/10', 'couetir 2x30s/10', 'couetir 2x30s/10'), X('s', 'etirpoignet 2x20s/10', 'etirpoignet 2x20s/10', 'etirpoignet 2x20s/10'))] },
  aviron: { nom: 'Aviron', ic: '🚣', cat: 'endurance', key: ['force_bas', 'gainage', 'cardio'], qual: 'Puissance des jambes, chaîne postérieure, endurance, gainage', risques: 'Lombaires, côtes, poignets',
    tips: ['Les rameurs ont la plus forte fréquence de douleurs lombaires de tous les sportifs : gainage et dos en priorité.', 'Renforcer le haut du dos et le tronc, avec une bonne récupération, réduit le risque de blessure.', 'Augmentez progressivement le volume d’ergomètre, surtout l’hiver.'],
    src: [['Blessures de l’aviron (University of Rochester Medical Center)', 'https://www.urmc.rochester.edu/ortho/sports-medicine/rowing-injuries.shtml'], ['Prévenir les blessures en aviron (Boston Children’s Hospital)', 'https://bchcmg.tch.harvard.edu/sports-injury-prevention/rowing']],
    seances: [SS('Chaîne postérieure & dos', 'muscu', X('fb', 'sdtr 3x10/90', 'sdtr 4x8/90', 'sdt 5x5/150'), X('fb', 'goblet 3x10/90', 'squat 4x6/120', 'squat 5x5/150'), X('fh', 'rowinv 3x10/60', 'rowb 4x8/90', 'rowb 5x6/120'), X('g', 'birddog 3x8/30', 'deadbug 3x40s/30', 'hollow 4x30s/30'), X('g', 'superman 3x10/30', 'superman 3x12/30', 'superman 4x12/30'), X('s', 'ischios 2x40s/10', 'ischios 2x60s/10', 'ischios 3x60s/10')),
      SS('Ergomètre & gainage', 'hiit', X('c', 'rameur 4x60s/60', 'rameur 5x120s/60', 'rameur 6x180s/60'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'gainage 4x60s/30'), X('g', 'gainlat 2x20s/30', 'gainlat 3x30s/30', 'gainlat 3x45s/30'), X(null, 'bandpa 2x15/45', 'facepull 3x15/45', 'ytw 3x10/30'), X('s', 'chatvache 1x60s/10', 'chatvache 2x60s/10', 'thoracique 2x45s/10'))] },
  triathlon: { nom: 'Triathlon', ic: '🏊', cat: 'endurance', key: ['cardio', 'force_bas', 'gainage'], qual: 'Endurance, économie de course, épaules de nageur, gainage', risques: 'Épaules, tendons d’Achille, genoux, lombaires',
    tips: ['Placez la musculation loin des séances clés de natation, vélo ou course.', 'Compensez le crawl par du renforcement de la coiffe et du haut du dos.', 'Mollets et chevilles solides limitent les blessures liées à la course.'],
    seances: [SS('Force pour l’endurance', 'muscu', X('fb', 'goblet 3x12/60', 'squat 4x8/90', 'squat 4x5/120'), X('fb', 'fentes 3x8/60', 'stepdown 3x10/45', 'pistol 3x5/90'), X('fh', 'rowinv 3x10/60', 'tractions 3x5/90', 'tractions 4x8/90'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45'), X('g', 'gainage 3x30s/30', 'gainage 3x45s/30', 'gainage 4x60s/30')),
      SS('Épaules de nageur & tronc', 'muscu', X(null, 'rotext 2x15/45', 'rotext 3x15/45', 'ytw 3x10/30'), X(null, 'bandpa 2x15/45', 'bandpa 3x15/45', 'facepull 3x15/45'), X('g', 'deadbug 3x30s/30', 'deadbug 3x40s/30', 'hollow 4x30s/30'), X('fb', 'glutepont1 3x10/45', 'glutepont1 3x12/45', 'hipthrust 4x8/90'), X('s', 'pecsetir 2x30s/10', 'thoracique 2x45s/10', 'worlds 2x45s/10'))] },
  calisthenie: { nom: 'Street workout / calisthénie', ic: '🤸', cat: 'art', key: ['force_haut', 'gainage', 'force_bas'], qual: 'Force au poids du corps, gainage, équilibre sur les mains', risques: 'Épaules, coudes, poignets',
    tips: ['Progressez par variantes : pompes inclinées → pompes → pieds surélevés → en équilibre.', 'Pour obtenir sa première traction : élastique, puis tractions négatives lentes.', 'Échauffez bien poignets et épaules avant l’équilibre sur les mains.'],
    seances: [SS('Poussée & tirage', 'muscu', X('fh', 'pompeincl 3x10/60', 'pompe 4x12/60', 'pompedecl 4x12/60'), X('fh', 'tracelast 3x6/90', 'tractions 4x6/120', 'tractions 5x10/120'), X('fh', 'pompediam 3x6/60', 'dips 4x8/90', 'dips 5x12/90'), X('fh', 'rowinv 3x10/60', 'rowinv 4x12/60', 'negtraction 4x5/120'), X('g', 'gainage 3x30s/30', 'hollow 3x30s/30', 'lsit 4x15s/60')),
      SS('Figures & jambes', 'muscu', X('fh', 'pompedecl 3x8/60', 'atr 4x20s/60', 'hspu 4x4/120'), X('fb', 'goblet 3x12/60', 'fentes 4x10/60', 'pistol 4x5/90'), X('g', 'releve 3x8/60', 'suspjambes 3x8/60', 'suspjambes 4x12/60'), X('fb', 'squatjump 3x8/60', 'tuckjump 4x8/60', 'broadjump 4x4/90'), X('s', 'squatprof 2x45s/10', 'pigeon 2x60s/10', 'ecart 3x60s/10'))] },
  danse: { nom: 'Danse', ic: '💃', cat: 'art', key: ['souplesse', 'gainage', 'force_bas'], qual: 'Souplesse, équilibre, gainage, force des chevilles, sauts', risques: 'Chevilles, tendon d’Achille, hanches, lombaires',
    tips: ['Le renforcement des mollets et de l’équilibre protège les chevilles, très sollicitées.', 'Un bon gainage permet de tenir les lignes et de sauter sans cambrer.', 'La souplesse se travaille muscles chauds, sans à-coups.'],
    seances: [SS('Équilibre & pointes', 'muscu', X(null, 'equilibre 3x30s/20', 'equilibre 3x45s/20', 'equilibre 4x45s/20'), X(null, 'molletexc 2x12/45', 'molletexc 3x15/45', 'molletexc 4x15/45'), X('fb', 'glutepont1 3x10/45', 'pistol 3x3/90', 'pistol 4x5/90'), X('g', 'deadbug 3x30s/30', 'hollow 3x30s/30', 'lsit 4x10s/60'), X('s', 'kickel 2x6/30', 'kickel 3x8/30', 'kickel 4x10/30')),
      SS('Souplesse & sauts', 'mobilite', X('s', 'ecart 2x30s/15', 'ecart 3x45s/15', 'ecart 3x60s/15'), X('s', 'fentebasse 2x40s/10', 'pigeon 2x45s/10', 'pigeon 3x60s/10'), X('s', 'ischios 2x40s/10', 'ischios 2x60s/10', 'ischios 3x60s/10'), X('fb', 'squatjump 3x6/60', 'tuckjump 3x8/60', 'bondlat 4x8/60'), X('c', 'jj 3x30s/30', 'jj 4x45s/30', 'corde 4x60s/30'))] },
  sprint: { nom: 'Sprint / athlétisme', ic: '🏃', cat: 'art', key: ['force_bas', 'gainage'], qual: 'Vitesse, puissance, raideur des chevilles, ischios solides', risques: 'Ischios, tendon d’Achille, mollets',
    tips: ['La vitesse se travaille en début de séance, frais, avec une récupération complète entre les sprints.', 'Le Nordic hamstring protège les ischios, les muscles les plus souvent blessés en sprint.', 'La force maximale des jambes nourrit la puissance de départ.'],
    seances: [SS('Vitesse', 'course', X('c', 'departs 4x5s/90', 'departs 6x5s/120', 'departs 8x5s/150'), X(null, 'skipping 2x20s/30', 'skipping 3x20s/30', 'bondissantes 4x20s/60'), X('fb', 'squatjump 3x6/60', 'boxjump 4x5/90', 'broadjump 5x4/90'), X(null, 'nordic 2x3/90', 'nordic 3x5/90', 'nordic 3x8/90'), X(null, 'molletexc 2x12/45', 'molletexc 3x12/45', 'molletexc 3x15/45')),
      SS('Force', 'muscu', X('fb', 'goblet 3x10/90', 'squat 4x5/150', 'squat 5x3/180'), X('fb', 'glutepont1 3x10/45', 'hipthrust 4x6/120', 'hipthrust 5x5/150'), X('fb', 'sdtr 3x10/90', 'sdtr 4x6/120', 'sdtr 4x5/150'), X('fb', 'fentes 3x8/60', 'fentes 4x8/90', 'bondlat 4x8/60'), X('g', 'gainage 3x30s/30', 'hollow 3x30s/30', 'pallof 4x10/45'))] }
};
// exercice ajouté quand le test montre un point faible (score ≤ 2/5) sur une qualité clé du sport
const QFIX = { force_haut: X('fh', 'pompeincl 2x8/60', 'pompe 3x10/60', 'pompe 3x15/60'), force_bas: X('fb', 'chaise 2x30s/45', 'goblet 3x12/60', 'fentes 3x10/60'), gainage: X('g', 'gainage 2x20s/30', 'gainage 3x30s/30', 'gainage 3x45s/30'),
  souplesse: X('s', 'worlds 2x40s/10', 'worlds 2x45s/10', 'worlds 3x45s/10'), cardio: X('c', 'jj 3x30s/30', 'corde 3x60s/30', 'corde 4x90s/30') };
OBJ.sport = 'Préparation sportive';
Object.entries(SPEC).forEach(([k, s]) => {
  const p = { id: 'sp_' + k, spec: k, nom: `Préparation ${s.nom}`, obj: 'sport', niv: 2, sem: 6, freq: 2, mat: 'aucun', ic: s.ic,
    desc: `Préparation physique spécifique : ${s.qual.toLowerCase()}. Prévention : ${s.risques.toLowerCase()}. 3 niveaux, ajustés à votre test.`,
    prog: 'À faire 2 fois par semaine en plus de votre pratique, à distance des matchs. Changez de niveau quand tout devient facile.' };
  Object.defineProperty(p, 'seances', { get: () => specSeances(k), enumerable: true });
  PROGRAMS.push(p);
});

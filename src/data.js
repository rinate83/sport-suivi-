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
  { id: 'squats', nom: 'Squats en 1 minute', q: 'force_bas', unit: 'répétitions', mv: 'goblet', how: 'Squats au poids du corps, cuisses parallèles au sol, le plus possible en 60 s.', h: [22, 30, 38, 45], f: [18, 25, 33, 40], timer: 60 },
  { id: 'gainage', nom: 'Gainage planche', q: 'gainage', unit: 'secondes', mv: 'gainage', how: 'Planche sur les avant-bras, corps aligné. Arrêtez dès que le bassin tombe ou monte.', h: [30, 60, 90, 120], f: [30, 60, 90, 120], stopwatch: true },
  { id: 'tractions', nom: 'Tractions (si barre)', q: 'force_haut2', unit: 'répétitions', mv: 'tractions', how: 'Tractions complètes, menton au-dessus de la barre, bras tendus en bas. Sans barre : laissez vide.', h: [1, 4, 8, 12], f: [1, 1, 3, 5], optional: true },
  { id: 'souplesse', nom: 'Souplesse (flexion avant)', q: 'souplesse', unit: 'niveau', mv: 'ischios', how: 'Debout jambes tendues, penchez-vous lentement vers l’avant. Jusqu’où vont vos mains ?', choices: ['Genoux', 'Tibias', 'Chevilles', 'Bout des doigts au sol', 'Paumes au sol'] },
  { id: 'cardio', nom: 'Cardio', q: 'cardio', mv: 'ef', how: 'Choisissez UN test : Cooper (courir le plus loin possible en 12 min) ou Ruffier-Dickson (30 squats en 45 s, à faire chez soi avec la mesure du pouls).', cardio: true }
];
const COOPER = { h: [1600, 2200, 2400, 2800], f: [1500, 1800, 2200, 2700] };
const QUAL = { force_haut: 'Force haut du corps', force_bas: 'Force jambes', gainage: 'Gainage', souplesse: 'Souplesse', cardio: 'Cardio' };

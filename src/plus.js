// ===================== SAUVEGARDE (fichier, sans service extérieur) =====================
function migrate(o) {
  o.body = o.body || []; o.avail = o.avail || {}; o.weekOk = o.weekOk || {}; o.ready = o.ready || {}; o.specLvl = o.specLvl || {}; o.pain = o.pain || {}; o.badges = o.badges || [];
  o.profile.pratique = (o.profile.pratique || []).map(k => k === 'combat' ? 'boxe' : k).filter(k => SPEC[k]);
  if (o.prog && o.prog.id === 'sp_combat') o.prog.id = 'sp_boxe';
  return o;
}
async function idbAll() { const d = await idb(); return new Promise(r => { const out = {}, q = d.transaction('ph').objectStore('ph').openCursor(); q.onsuccess = () => { const c = q.result; if (c) { out[c.key] = c.value; c.continue(); } else r(out); }; q.onerror = () => r(out); }); }
const toDataURL = b => new Promise(r => { if (typeof b === 'string') return r(b); const f = new FileReader(); f.onload = () => r(f.result); f.onerror = () => r(null); f.readAsDataURL(b); });
const daysSince = d => d ? Math.floor((Date.now() - parseD(d)) / 864e5) : 9999;
const needBackup = () => S.sessions.length >= 5 && daysSince(S.lastBackup) > 14;
async function exportData() {
  const ph = {}; try { const all = await idbAll(); for (const [k, v] of Object.entries(all)) { const u = await toDataURL(v); if (u) ph[k] = u; } } catch (e) {}
  S.lastBackup = today(); save();
  const name = `apexfit_${(S.profile.prenom || 'sauvegarde').normalize('NFD').replace(/[^\w]+/g, '_')}_${today()}.json`;
  const file = new File([JSON.stringify({ ...S, _photos: ph })], name, { type: 'application/json' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'Sauvegarde ApexFit' }); toast('💾 Sauvegarde prête'); render(); return; } catch (e) { if (e.name === 'AbortError') { render(); return; } }
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = name; document.body.appendChild(a); a.click(); a.remove(); toast('💾 Sauvegarde téléchargée'); render();
}
function importData(f) {
  if (!f) return;
  f.text().then(async t => {
    const d = JSON.parse(t); if (d.v !== 3) throw 0;
    const ph = d._photos || {}; delete d._photos;
    if (S.sessions.length && !confirm(`Remplacer vos données actuelles (${S.sessions.length} séances) par cette sauvegarde (${(d.sessions || []).length} séances) ?`)) return;
    S = migrate(Object.assign(blank(), d)); save();
    for (const [k, u] of Object.entries(ph)) { try { await idbPut(k, await (await fetch(u)).blob()); } catch (e) {} }
    render(); toast('Données restaurées ✅');
  }).catch(() => toast('Fichier invalide'));
}

// ===================== OBJECTIF COMPÉTITION : PÉRIODISATION =====================
var PH = { fondation: ['🧱', 'Fondation', 'Construire la base : technique et volume modéré.'], construction: ['📈', 'Construction', 'Le volume et les charges progressent.'],
  allegee: ['🌙', 'Semaine allégée', 'Une série de moins pour assimiler le travail (récupération planifiée toutes les 4 semaines).'],
  intensif: ['🔥', 'Intensification', 'Moins de répétitions, charges plus lourdes : qualité maximale.'], affutage: ['🎯', 'Affûtage', 'Volume réduit d’environ 40 % en gardant l’intensité, pour arriver frais le jour J.'],
  recup: ['🛌', 'Récupération', 'Semaine légère après l’objectif : bougez sans forcer.'] };
function phase() {
  const e = S.event; if (!e || !e.date) return null;
  const d = Math.ceil((parseD(e.date) - parseD(today())) / 864e5);
  if (d < -7) return null; if (d < 0) return { k: 'recup', d };
  const w = Math.ceil((d + 1) / 7);
  const k = w <= 1 ? 'affutage' : w <= 4 ? 'intensif' : w % 4 === 0 ? 'allegee' : w <= 12 ? 'construction' : 'fondation';
  return { k, d, w };
}
function applyPhase(s) {
  const p = phase(); if (!p || !s.items) return s;
  s.phase = p.k;
  s.items.forEach(it => {
    if (typeof it.sets !== 'number') return;
    if (p.k === 'affutage') it.sets = Math.max(1, Math.round(it.sets * .6));
    else if (p.k === 'allegee' || p.k === 'recup') it.sets = Math.max(1, it.sets - 1);
    else if (p.k === 'intensif' && it.reps && it.reps > 5) { it.reps = Math.max(3, it.reps - 2); it.rest = (it.rest || 60) + 30; }
  });
  return s;
}
function eventForm() {
  const e = S.event || {};
  sheet(`<h2>🎯 Objectif compétition</h2><p class="mu small">Match, course, combat, passage de grade… Les séances s’organisent en phases jusqu’au jour J : fondation, construction, intensification, puis affûtage.</p>
    <label class="f">Nom de l’objectif</label><input class="in" id="evN" value="${esc(e.nom || '')}" placeholder="Ex. 10 km de Lyon, tournoi de judo">
    <label class="f">Date</label><input class="in" type="date" id="evD" value="${e.date || ''}" min="${today()}">
    <button class="btn pri w" style="margin-top:14px" onclick="if(!$('#evD').value)return toast('Choisissez une date');S.event={nom:$('#evN').value.trim()||'Mon objectif',date:$('#evD').value};save();closeSheet();render();toast('🎯 Objectif enregistré')">Enregistrer</button>
    ${S.event ? `<button class="btn ghost w" style="margin-top:8px" onclick="S.event=null;save();closeSheet();render()">Supprimer l’objectif</button>` : ''}`);
}
function eventCard() {
  const p = phase(); if (!p) return '';
  const [e, n, t] = PH[p.k];
  return `<div class="card evcard" onclick="eventForm()"><div class="row"><div class="em" style="font-size:26px">${e}</div><div style="flex:1;min-width:0"><b>${esc(S.event.nom)} · ${p.d > 0 ? 'J-' + p.d : p.d === 0 ? 'aujourd’hui !' : 'terminé'}</b><div class="mu small">Phase : ${n}. ${t}</div></div></div></div>`;
}

// ===================== DOULEURS : retrait automatique des exercices =====================
var ZONES = { cou: 'Cou', epaule: 'Épaule', coude: 'Coude', poignet: 'Poignet / main', dos: 'Bas du dos', hanche: 'Hanche / aine', genou: 'Genou', cheville: 'Cheville / pied' };
var ZRE = { cou: /\bcou\b|nuque|pont de lutte/, epaule: /épaule|deltoïde|coiffe|pector|dips|développé|pompe|traction|y-t-w|équilibre sur les mains|élévation|face pull|oiseau|rowing|tirage|lancer|slam|cordes|serviette|pull-apart|uchi/,
  coude: /triceps|biceps|curl|dips|traction|coude|pompe/, poignet: /poignet|avant-bras|pompe|planche|ours|équilibre sur les mains|l-sit|burpee|grip|doigts|sac de frappe|mountain/,
  dos: /lombaire|soulevé|swing|good morning|superman|pont de lutte|rowing barre|kettlebell|get-up|turkish|russian/, hanche: /hanche|adduct|copenhague|kick|écart|pigeon|cosaque|fessier|fente/,
  genou: /squat|fente|genou|quadri|saut|jump|pistol|descente de marche|chaise|cavalier|départ|burpee|bond|presse|leg|box|sprint|skipping/, cheville: /mollet|cheville|saut|corde|bond|départ|skipping|jump|sprint|tuck/ };
const mvZoneCache = {};
function mvZones(mv) {
  if (mvZoneCache[mv]) return mvZoneCache[mv];
  const m = LIB.find(x => x.id === mv); const txt = m ? (m.n + ' ' + m.mu).toLowerCase() : '';
  return mvZoneCache[mv] = Object.keys(ZRE).filter(z => ZRE[z].test(txt));
}
const activePain = () => Object.entries(S.pain || {}).filter(([, p]) => p.lvl >= 4).map(([z]) => z);
function filterPain(s) {
  const zs = activePain(); if (!zs.length || !s.items) return s;
  const out = [], keep = [];
  s.items.forEach(it => (mvZones(it.mv).some(z => zs.includes(z)) ? out : keep).push(it));
  if (out.length) { s.items = keep.length ? keep : [T('worlds', 2, 45, 10), T('chatvache', 1, 60, 10)]; s.painRemoved = out.map(it => mvName(it)); }
  return s;
}
function painForm() {
  const P = S.pain || {};
  sheet(`<h2>🩹 Douleurs</h2><p class="mu small">Indiquez une gêne de 0 (rien) à 10. À partir de 4/10, les exercices qui sollicitent la zone sont retirés de vos séances.</p>
    ${Object.entries(ZONES).map(([z, n]) => `<div class="painrow"><span>${n}</span><input type="range" min="0" max="10" value="${P[z] ? P[z].lvl : 0}" data-z="${z}" oninput="this.nextElementSibling.textContent=this.value"><b>${P[z] ? P[z].lvl : 0}</b></div>`).join('')}
    <button class="btn pri w" style="margin-top:14px" onclick="savePain()">Enregistrer</button>
    <p class="mu tiny" style="margin-top:10px">Ceci n’est pas un diagnostic. Douleur forte (7/10 ou plus), qui dure plus d’une semaine, gonflement, fourmillements ou douleur la nuit : consultez un médecin ou un kinésithérapeute.</p>`);
}
function savePain() {
  const P = S.pain || {}, n = {};
  $$('.painrow input').forEach(i => { const v = +i.value, z = i.dataset.z; if (v > 0) n[z] = { lvl: v, since: P[z] && P[z].lvl > 0 ? P[z].since : today() }; });
  S.pain = n; save(); closeSheet(); render();
  const bad = Object.entries(n).filter(([, p]) => p.lvl >= 7 || daysSince(p.since) > 7);
  toast(bad.length ? '⚠️ Douleur importante ou durable : demandez l’avis d’un professionnel de santé' : activePain().length ? '🩹 Séances adaptées : exercices concernés retirés' : '✅ Aucune douleur active', 4000);
}
function painNote() {
  const z = activePain(); if (!z.length) return '';
  const old = Object.entries(S.pain).some(([, p]) => p.lvl >= 7 || daysSince(p.since) > 7);
  return `<div class="tip" style="margin-top:10px;border-color:rgba(244,63,94,.4);background:rgba(244,63,94,.08);color:#fecdd3" onclick="painForm()">🩹 Douleur : ${z.map(k => ZONES[k].toLowerCase()).join(', ')}. Exercices concernés retirés.${old ? ' <b>Consultez si ça persiste.</b>' : ''}</div>`;
}

// ===================== ZONES CARDIO =====================
function hrMax() {
  if (+S.profile.fcmax) return +S.profile.fcmax;
  const seen = Math.max(0, ...S.sessions.filter(x => x.ext && x.ext.hrmax).map(x => x.ext.hrmax));
  return Math.max(seen, Math.round(208 - .7 * (+S.profile.age || 30)));
}
var HRZ = [['Z1', 'Récupération', .5, .6, '#60a5fa'], ['Z2', 'Endurance fondamentale', .6, .7, '#22c55e'], ['Z3', 'Tempo', .7, .8, '#eab308'], ['Z4', 'Seuil', .8, .9, '#f97316'], ['Z5', 'VO2max', .9, 1, '#ef4444']];
function zonesCard() {
  const m = hrMax(), d28 = (() => { const d = new Date(); d.setDate(d.getDate() - 28); return ymd(d); })();
  const L = S.sessions.filter(x => x.date > d28 && x.ext && x.ext.hr), cnt = HRZ.map(([, , a, b]) => L.filter(x => x.ext.hr / m >= a && x.ext.hr / m < b).reduce((s, x) => s + (+x.dur || 0), 0)), tot = cnt.reduce((a, b) => a + b, 0);
  return `<div class="card"><b>❤️ Zones cardio</b><div class="mu tiny" style="margin-top:2px">FC max ${+S.profile.fcmax ? 'saisie' : 'estimée (208 − 0,7 × âge, ou la plus haute importée)'} : <b>${m}</b> bpm · <a style="color:var(--ac2)" onclick="const v=prompt('Votre FC max mesurée (bpm), vide pour l’estimation :',S.profile.fcmax||'');if(v!==null){S.profile.fcmax=+v||'';save();openCoach()}">modifier</a></div>
    ${HRZ.map(([z, n, a, b, c], i) => `<div class="zrow"><i style="background:${c}"></i><b>${z}</b><span>${n}</span><em>${Math.round(m * a)}–${Math.round(m * b)}</em>${tot ? `<small>${Math.round(cnt[i] / tot * 100)} %</small>` : ''}</div>`).join('')}
    <p class="mu tiny" style="margin:8px 0 0">${tot ? 'Répartition de vos séances importées sur 28 jours, d’après la fréquence cardiaque moyenne.' : 'Importez des activités avec cardio (Garmin, Strava) pour voir votre répartition.'} Une formule d’âge peut se tromper de plusieurs battements : une FC max mesurée est plus fiable.</p></div>`;
}

// ===================== MODE SALLE : VOIX ET GRAND AFFICHAGE =====================
function say(t) {
  if (!S.voice || !window.speechSynthesis) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'fr-FR'; u.rate = 1.05; const v = speechSynthesis.getVoices().find(x => /^fr/i.test(x.lang)); if (v) u.voice = v; speechSynthesis.speak(u); } catch (e) {}
}
const sayDur = s => s >= 60 ? `${Math.floor(s / 60)} minute${s >= 120 ? 's' : ''}${s % 60 ? ' ' + (s % 60) : ''}` : `${s} secondes`;
function toggleVoice() { S.voice = !S.voice; save(); if (S.voice) say('Voix activée'); toast(S.voice ? '🔊 Annonces vocales activées' : '🔇 Annonces vocales coupées'); const b = $('#vBtn'); if (b) b.textContent = S.voice ? '🔊' : '🔇'; }
function toggleBig() { S.big = !S.big; save(); const l = $('#live'); if (l) l.classList.toggle('bigmode', !!S.big); toast(S.big ? '🔠 Grand affichage' : 'Affichage normal'); }

// ===================== PARTAGE DE SÉANCES PAR LIEN (sans serveur) =====================
const b64u = buf => { let s = ''; const u = new Uint8Array(buf); for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
async function pack(o) { return b64u(await new Response(new Blob([JSON.stringify(o)]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer()); }
async function unpack(s) { return JSON.parse(await new Response(new Blob([unb64u(s)]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text()); }
const appUrl = () => location.href.split('#')[0].split('?')[0];
function normItems(items) { return (items || []).map(it => ({ mv: it.mv, n: it.n || undefined, rest: it.rest || 60, sets: Array.isArray(it.sets) ? it.sets.map(z => ({ reps: z.reps, sec: z.sec })) : Array.from({ length: it.sets || 3 }, () => ({ reps: it.reps, sec: it.sec })) })); }
async function shareSession(s) {
  const o = { v: 1, from: S.profile.prenom || '', nom: s.nom, sport: s.sport, items: s.items ? normItems(s.items) : null, blocks: s.blocks || null };
  const url = appUrl() + '#s=' + await pack(o), text = `💪 ${o.from ? o.from + ' te partage' : 'Séance partagée'} : « ${s.nom} » sur ApexFit`;
  if (navigator.share) { try { await navigator.share({ title: 'Séance ApexFit', text, url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(url); toast('🔗 Lien copié : envoyez-le à vos amis'); } catch (e) { prompt('Copiez ce lien :', url); }
}
const shareTpl = id => { const t = S.templates.find(x => x.id === id); if (t) shareSession(t); };
async function shareApp() {
  const url = appUrl(), text = 'Je m’entraîne avec ApexFit : programmes, coach, préparation par sport. Gratuit, sans compte, tes données restent sur ton téléphone 💪';
  if (navigator.share) { try { await navigator.share({ title: 'ApexFit', text, url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  try { await navigator.clipboard.writeText(url); toast('🔗 Lien de l’appli copié'); } catch (e) { prompt('Lien de l’appli :', url); }
}
async function checkShared() {
  const m = location.hash.match(/^#s=([\w-]+)/); if (!m) return;
  history.replaceState(null, '', location.pathname + location.search);
  try {
    const o = await unpack(m[1]); if (!o || !o.sport || !SPORTS[o.sport]) throw 0;
    o.items = o.items ? o.items.filter(it => typeof it.mv === 'string').slice(0, 20).map(it => ({ mv: it.mv.slice(0, 40), n: it.n ? String(it.n).slice(0, 60) : undefined, rest: clamp(+it.rest || 60, 0, 600), sets: (it.sets || []).slice(0, 10).map(z => ({ reps: z.reps ? clamp(+z.reps, 1, 100) : undefined, sec: z.sec ? clamp(+z.sec, 1, 3600) : undefined })) })) : null;
    o.blocks = o.blocks ? o.blocks.slice(0, 12).map(b => ({ t: String(b.t || '').slice(0, 60), d: String(b.d || '').slice(0, 200) })) : null;
    window.SHARED = o;
    sheet(`<div style="font-size:40px">📩</div><h2>${o.from ? esc(String(o.from).slice(0, 30)) + ' vous partage une séance' : 'Séance partagée'}</h2><p class="mu small">${SPORTS[o.sport].ic} <b>${esc(String(o.nom || '').slice(0, 80))}</b></p>
      ${o.items ? `<div class="spl">${o.items.map(it => `<div class="spi">${mvImg(it.mv, 'thumb')}<span><b>${esc(mvName(it))}</b><small>${it.sets.length} × ${it.sets[0] ? (it.sets[0].sec ? it.sets[0].sec + ' s' : it.sets[0].reps) : ''} · repos ${it.rest} s</small></span></div>`).join('')}</div>` : ''}
      ${o.blocks ? o.blocks.map(b => `<div class="kpi" style="margin-top:6px"><b>${esc(b.t)}</b><div class="small mu">${esc(b.d)}</div></div>`).join('') : ''}
      <div class="grid2" style="margin-top:14px"><button class="btn pri" onclick="S.templates.push({id:uid(),sport:SHARED.sport,nom:String(SHARED.nom||'Séance partagée').slice(0,80),items:SHARED.items,blocks:SHARED.blocks});save();closeSheet();toast('💾 Ajoutée à vos séances types')">💾 Garder</button><button class="btn" onclick="closeSheet();startLive(JSON.parse(JSON.stringify({...SHARED,nom:String(SHARED.nom||'Séance partagée').slice(0,80)})),{})">${ic('play')}Démarrer</button></div>`);
  } catch (e) { toast('Lien de séance invalide'); }
}

// ===================== BADGES & DÉFI DU MOIS =====================
const totalKm = () => S.sessions.reduce((a, x) => a + distKm(x), 0), totalMin = () => S.sessions.reduce((a, x) => a + (+x.dur || 0), 0);
const prCount = () => S.sessions.reduce((a, s) => a + (s.items || []).reduce((b, it) => b + it.sets.filter(z => z.pr).length, 0), 0);
function weeksOk() { const g = +S.profile.jours || 3; let n = 0; for (let w = 1; w <= 52; w++) { if (weekStats(-w).days >= g) n++; else break; } return n + (weekStats(0).days >= g ? 1 : 0); }
var BADGES = [
  ['first', '🥇', 'Premier pas', '1 séance', () => [S.sessions.length, 1]], ['s10', '🔟', 'Régulier', '10 séances', () => [S.sessions.length, 10]], ['s50', '💪', 'Acharné', '50 séances', () => [S.sessions.length, 50]],
  ['s100', '🏛️', 'Légende', '100 séances', () => [S.sessions.length, 100]], ['st3', '🔥', 'En feu', '3 jours d’affilée', () => [streak(), 3]], ['st7', '☄️', 'Inarrêtable', '7 jours d’affilée', () => [streak(), 7]],
  ['w4', '📆', 'Discipline', '4 semaines d’objectif tenues', () => [weeksOk(), 4]], ['w12', '🗓️', 'Mental d’acier', '12 semaines d’objectif tenues', () => [weeksOk(), 12]],
  ['km50', '🛣️', 'Baroudeur', '50 km au total', () => [Math.floor(totalKm()), 50]], ['km500', '🌍', 'Globe-trotteur', '500 km au total', () => [Math.floor(totalKm()), 500]],
  ['h10', '⏳', 'Endurant', '10 h d’entraînement', () => [Math.floor(totalMin() / 60), 10]], ['h100', '⌛', 'Infatigable', '100 h d’entraînement', () => [Math.floor(totalMin() / 60), 100]],
  ['pr1', '🏅', 'Record !', '1 record battu', () => [prCount(), 1]], ['pr10', '🏆', 'Briseur de records', '10 records battus', () => [prCount(), 10]],
  ['test2', '🧪', 'Progrès mesurés', '2 tests de capacités', () => [S.tests.length, 2]], ['multi', '🎽', 'Polyvalent', '3 sports différents', () => [new Set(S.sessions.map(x => x.sport)).size, 3]],
  ['prog', '📋', 'Programme bouclé', '1 programme terminé', () => [S.progFinished || 0, 1]], ['ready', '🧘', 'À l’écoute', '7 bilans de forme', () => [Object.keys(S.ready || {}).length, 7]]];
function checkBadges(quiet) {
  S.badges = S.badges || []; const got = [];
  BADGES.forEach(([id, e, n, , f]) => { const [c, t] = f(); if (c >= t && !S.badges.includes(id)) { S.badges.push(id); got.push(e + ' ' + n); } });
  if (got.length) { save(); if (!quiet) { setTimeout(() => { toast('🏅 Badge débloqué : ' + got.join(', '), 4000); confetti(80); }, 900); } }
}
function monthChallenge() {
  const d = new Date(), k = d.getMonth() % 3, g = +S.profile.jours || 3, pre = ymd(d).slice(0, 7), L = S.sessions.filter(x => x.date.startsWith(pre));
  const C = [['séances', g * 4, L.length, '💥'], ['minutes d’entraînement', g * 4 * 40, L.reduce((a, x) => a + (+x.dur || 0), 0), '⏱'], ['jours actifs', g * 4, new Set(L.map(x => x.date)).size, '📅']][k];
  return { lab: C[0], target: C[1], cur: C[2], ic: C[3], month: d.toLocaleDateString('fr-FR', { month: 'long' }) };
}
function challengeLine() { const c = monthChallenge(), p = clamp(c.cur / c.target, 0, 1); return `<div class="chal"><span>${c.ic} Défi de ${c.month} : ${Math.min(c.cur, c.target)}/${c.target} ${c.lab}${p >= 1 ? ' ✅' : ''}</span><div class="pbar"><i style="width:${Math.round(p * 100)}%"></i></div></div>`; }
function badgesSection() {
  S.badges = S.badges || [];
  return `<h3 class="sec">Trophées <span class="mu tiny" style="font-weight:600">${S.badges.length}/${BADGES.length}</span></h3><div class="card">${challengeLine()}<div class="badges">${BADGES.map(([id, e, n, d, f]) => { const ok = S.badges.includes(id), [c, t] = f(); return `<div class="bdg ${ok ? 'on' : ''}" title="${esc(d)}"><span>${e}</span><b>${n}</b><small>${ok ? d : Math.min(c, t) + '/' + t}</small></div>`; }).join('')}</div></div>`;
}

// ===================== BILAN DU MOIS EN IMAGE =====================
async function monthReport(off) {
  if (off == null) off = new Date().getDate() <= 3 ? -1 : 0;
  const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + off);
  const pre = ymd(d).slice(0, 7), L = S.sessions.filter(x => x.date.startsWith(pre)), mois = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const min = L.reduce((a, x) => a + (+x.dur || 0), 0), km = L.reduce((a, x) => a + distKm(x), 0), days = new Set(L.map(x => x.date)).size, pr = L.reduce((a, s) => a + (s.items || []).reduce((b, it) => b + it.sets.filter(z => z.pr).length, 0), 0);
  const bySp = {}; L.forEach(x => bySp[x.sport] = (bySp[x.sport] || 0) + 1); const fav = Object.entries(bySp).sort((a, b) => b[1] - a[1])[0];
  const W = 1080, H = 1350, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#0b1220'); bg.addColorStop(1, '#111b2e'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
  g.save(); g.translate(W * .78, 260); for (let i = 0; i < 72; i++) { g.rotate(Math.PI / 36); g.fillStyle = i % 2 ? 'rgba(34,197,94,.10)' : 'rgba(56,189,248,.06)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(1400, -24); g.lineTo(1400, 24); g.fill(); } g.restore();
  const F = (w, s) => `${w} ${s}px -apple-system, "Segoe UI", Roboto, sans-serif`;
  g.fillStyle = '#22c55e'; g.font = F(900, 40); g.fillText('APEXFIT', 80, 120);
  g.fillStyle = '#fff'; g.font = F(900, 92); g.fillText('BILAN', 80, 240); g.fillStyle = '#86efac'; g.fillText(mois.toUpperCase(), 80, 340);
  if (S.profile.prenom) { g.fillStyle = '#94a3b8'; g.font = F(700, 40); g.fillText(S.profile.prenom, 80, 400); }
  const stats = [[L.length, 'séances'], [hmin(min), 'd’entraînement'], [days, 'jours actifs'], [km ? km.toFixed(km < 100 ? 1 : 0) + ' km' : '—', 'parcourus'], [pr, 'records battus'], [fav ? SPORTS[fav[0]].ic + ' ' + SPORTS[fav[0]].nom : '—', 'sport favori']];
  stats.forEach(([v, l], i) => { const x = 80 + (i % 2) * 470, y = 500 + Math.floor(i / 2) * 220; g.fillStyle = 'rgba(255,255,255,.06)'; g.beginPath(); g.roundRect ? g.roundRect(x, y, 440, 190, 28) : g.rect(x, y, 440, 190); g.fill();
    g.fillStyle = '#fff'; g.font = F(900, String(v).length > 10 ? 44 : 72); g.fillText(String(v), x + 32, y + 105); g.fillStyle = '#94a3b8'; g.font = F(700, 34); g.fillText(l, x + 32, y + 158); });
  const wk = [0, 0, 0, 0, 0]; L.forEach(x => { const i = Math.min(4, Math.floor((+x.date.slice(8) - 1) / 7)); wk[i] += +x.dur || 0; }); const mx = Math.max(60, ...wk);
  wk.forEach((v, i) => { const h = v / mx * 150, x = 100 + i * 190; g.fillStyle = v ? '#22c55e' : 'rgba(255,255,255,.1)'; g.fillRect(x, 1210 - h, 120, Math.max(6, h)); g.fillStyle = '#64748b'; g.font = F(700, 26); g.fillText('S' + (i + 1), x + 40, 1250); });
  g.fillStyle = '#64748b'; g.font = F(600, 26); g.fillText(`${(S.badges || []).length} trophées · ${appUrl().replace(/^https?:\/\//, '')}`, 80, 1310);
  const blob = await new Promise(r => c.toBlob(r, 'image/png')), file = new File([blob], `apexfit-bilan-${pre}.png`, { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: 'Mon bilan ApexFit' }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  sheet(`<h2>📸 Bilan de ${mois}</h2><img src="${URL.createObjectURL(blob)}" style="width:100%;border-radius:16px;margin-top:10px" alt="Bilan du mois"><a class="btn pri w" style="margin-top:12px" href="${URL.createObjectURL(blob)}" download="apexfit-bilan-${pre}.png">⬇️ Enregistrer l’image</a>`);
}

// ===================== ÉVOLUTION DU TEST =====================
var QCOL = ['#818cf8', '#22c55e', '#f59e0b', '#c084fc', '#38bdf8'];
function testEvo() {
  const T = S.tests.filter(t => t.scores); if (T.length < 2) return '';
  return `<div class="card"><b>📈 Évolution de vos capacités</b><canvas class="ch" id="testEvo" height="170" style="margin-top:8px"></canvas><div class="legend">${Object.entries(QUAL).map(([k, n], i) => `<span><i style="background:${QCOL[i]}"></i>${n}</span>`).join('')}</div></div>`;
}
function drawTestEvo() {
  const c = $('#testEvo'); if (!c) return; const T = S.tests.filter(t => t.scores), w = c.clientWidth || 320, h = 170, r = devicePixelRatio || 1;
  c.width = w * r; c.height = h * r; const g = c.getContext('2d'); g.scale(r, r);
  const x = i => 24 + i * (w - 40) / Math.max(1, T.length - 1), y = v => h - 20 - (v - 1) / 4 * (h - 36);
  g.strokeStyle = 'rgba(255,255,255,.08)'; for (let v = 1; v <= 5; v++) { g.beginPath(); g.moveTo(20, y(v)); g.lineTo(w - 10, y(v)); g.stroke(); g.fillStyle = '#64748b'; g.font = '10px sans-serif'; g.fillText(v, 6, y(v) + 3); }
  Object.keys(QUAL).forEach((k, qi) => { const pts = T.map((t, i) => t.scores[k] != null ? [x(i), y(t.scores[k])] : null).filter(Boolean); if (pts.length < 1) return;
    g.strokeStyle = QCOL[qi]; g.lineWidth = 2.5; g.beginPath(); pts.forEach(([a, b], i) => i ? g.lineTo(a, b + qi * .8) : g.moveTo(a, b + qi * .8)); g.stroke(); g.fillStyle = QCOL[qi]; pts.forEach(([a, b]) => { g.beginPath(); g.arc(a, b + qi * .8, 3.5, 0, 7); g.fill(); }); });
  g.fillStyle = '#64748b'; g.font = '10px sans-serif'; T.forEach((t, i) => g.fillText(fmtDate(t.date, { day: 'numeric', month: 'short' }), Math.min(w - 44, Math.max(0, x(i) - 18)), h - 4));
}
const retestDue = () => { const t = S.tests.at(-1); return t && daysSince(t.date) >= 42; };

// ===================== NUTRITION : REPÈRES SIMPLES =====================
function nutritionCard() {
  const p = +S.profile.poids; if (!p) return `<div class="card"><b>🍽️ Repères nutrition</b><p class="mu small" style="margin:6px 0 0">Indiquez votre poids dans le profil pour obtenir vos repères en protéines.</p></div>`;
  return `<div class="card"><b>🍽️ Repères nutrition</b><div class="grid2" style="margin-top:10px"><div class="kpi"><div class="l">Protéines par jour</div><div class="v" style="font-size:20px">${Math.round(p * 1.4)}–${Math.round(p * 2)} g</div></div><div class="kpi"><div class="l">Par repas</div><div class="v" style="font-size:20px">${clamp(Math.round(p * .25), 20, 40)} g</div></div></div>
    <p class="mu small" style="margin:10px 0 0;line-height:1.5">Pour les sportifs, 1,4 à 2 g de protéines par kg et par jour, réparties toutes les 3 à 4 heures, suffisent à construire et garder du muscle. Privilégiez des aliments variés ; buvez régulièrement, davantage les jours d’entraînement et quand il fait chaud.</p>
    <p class="mu tiny" style="margin:6px 0 0">Source : position de l’International Society of Sports Nutrition (2017). En cas de maladie rénale, de grossesse ou de régime particulier, demandez l’avis d’un professionnel.</p></div>`;
}

// ===================== SAISIE RAPIDE : DICTÉE OU TEXTE =====================
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
var ALIAS = { 'pompe': 'pompe', 'traction': 'tractions', 'squat': 'squat', 'gainage': 'gainage', 'planche': 'gainage', 'dips': 'dips', 'developpe couche': 'dc', 'developpe militaire': 'dm', 'souleve de terre': 'sdt',
  'fente': 'fentes', 'abdo': 'releve', 'burpee': 'burpee', 'corde': 'corde', 'curl': 'curl', 'hip thrust': 'hipthrust', 'rowing': 'rowh', 'mollet': 'mollets', 'jumping jack': 'jj', 'mountain': 'climber', 'kettlebell': 'swing', 'shadow': 'shadow', 'sac': 'sac', 'gainage lateral': 'gainlat' };
function matchMv(f) {
  const t = norm(f); let best = null, sc = 0;
  Object.entries(ALIAS).forEach(([a, id]) => { if (t.includes(a) && a.length + 2 > sc) { best = id; sc = a.length + 2; } });
  LIB.forEach(m => { const w = norm(m.n).split(/[^a-z0-9]+/).filter(x => x.length > 3); const k = w.filter(x => t.includes(x)).length; if (k && k * 4 > sc) { best = m.id; sc = k * 4; } });
  return best;
}
function parseLog(txt) {
  const t = norm(txt), num = s => +String(s).replace(',', '.');
  const card = t.match(/(cour[su]|footing|jogging|run|velo|vtt|natation|nage|marche|rando)/);
  const km = t.match(/(\d+(?:[.,]\d+)?)\s*(km|kilometre)/), mn = t.match(/(\d+)\s*(min|minute)/), hh = t.match(/(\d+)\s*h\s*(\d+)?/);
  const dur = hh ? +hh[1] * 60 + (+hh[2] || 0) : mn ? +mn[1] : 0;
  if (card && (km || dur)) {
    const sp = /velo|vtt/.test(card[1]) ? 'velo' : /nat|nage/.test(card[1]) ? 'natation' : /marche|rando/.test(card[1]) ? 'marche' : 'course';
    const s = { id: uid(), date: today(), sport: sp, nom: SPORTS[sp].nom, dur: dur || Math.round(num(km[1]) * 6), rpe: 6, notes: txt.slice(0, 200) };
    if (km) s.dist = sp === 'natation' ? Math.round(num(km[1]) * 1000) : num(km[1]);
    const m = t.match(/(\d+)\s*m(?:etres)?\b/); if (sp === 'natation' && !km && m) s.dist = +m[1];
    return s;
  }
  const items = [];
  t.split(/,|;|\n|\bpuis\b|\bensuite\b|\bet apres\b|\.\s/).forEach(f => {
    const mv = matchMv(f); if (!mv) return;
    const sr = f.match(/(\d+)\s*(?:series?|x|fois|×)\s*(?:de\s*)?(\d+)/), kg = f.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|kilo)/), sec = f.match(/(\d+)\s*(?:s|sec|secondes?)\b/), mi = f.match(/(\d+)\s*min/);
    const n = sr ? clamp(+sr[1], 1, 15) : 3, reps = sr ? clamp(+sr[2], 1, 200) : 10, secs = sec ? +sec[1] : mi ? +mi[1] * 60 : 0;
    items.push({ mv, rest: 90, sets: Array.from({ length: n }, () => secs ? { sec: secs, done: true } : { reps, kg: kg ? num(kg[1]) : '', done: true }) });
  });
  if (!items.length) return null;
  return { id: uid(), date: today(), sport: items.some(it => SPORTS[(LIB.find(m => m.id === it.mv) || {}).s || 'muscu'].kind === 'force') ? 'muscu' : 'hiit', nom: 'Séance dictée', dur: dur || Math.max(10, items.reduce((a, it) => a + it.sets.length, 0) * 3), rpe: 7, notes: txt.slice(0, 200), items };
}
function quickLog() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  sheet(`<h2>🎙️ Raconter sa séance</h2><p class="mu small">Dites ou écrivez ce que vous avez fait, par exemple :<br>« squat 4 séries de 8 à 80 kg, pompes 3 x 15, gainage 3 fois 45 secondes »<br>« course 8 km en 45 minutes »</p>
    <textarea class="in" id="qlT" rows="4" placeholder="Ce que j’ai fait aujourd’hui…" style="margin-top:10px"></textarea>
    <div class="grid2" style="margin-top:10px">${SR ? `<button class="btn" id="qlMic" onclick="qlListen()">🎤 Dicter</button>` : `<div class="mu tiny" style="align-self:center">Astuce : touchez le micro 🎤 du clavier pour dicter.</div>`}<button class="btn pri" onclick="qlParse()">Analyser</button></div>
    <div id="qlOut" style="margin-top:12px"></div>`);
}
function qlListen() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition, r = new SR(), b = $('#qlMic'); r.lang = 'fr-FR'; r.interimResults = true;
  r.onresult = e => { $('#qlT').value = [...e.results].map(x => x[0].transcript).join(' '); };
  r.onend = () => { if (b) b.textContent = '🎤 Dicter'; qlParse(); }; r.onerror = () => toast('Micro indisponible : utilisez la dictée du clavier');
  try { r.start(); if (b) b.textContent = '⏺ J’écoute…'; } catch (e) {}
}
async function qlParse() {
  const txt = ($('#qlT').value || '').trim(), out = $('#qlOut'); if (!txt) return;
  let s = parseLog(txt);
  if (!s && aiOn()) {
    out.innerHTML = '<div class="aiload"><i></i><i></i><i></i> L’IA interprète…</div>';
    try {
      const ids = LIB.map(m => m.id + ':' + m.n).join('; ');
      const j = JSON.parse((await aiCall('Tu convertis la description d’une séance de sport en JSON. Réponds uniquement en JSON.', `Texte : « ${txt} ». Format : {"sport":"muscu|course|velo|natation|hiit|mobilite|marche|autre","duree_min":45,"distance":0,"items":[{"id":"identifiant","series":3,"reps":10,"kg":0,"sec":0}]}. Identifiants : ${ids}`, true)).replace(/^```json|```$/g, ''));
      const items = (j.items || []).filter(x => LIB.some(m => m.id === x.id)).map(x => ({ mv: x.id, rest: 90, sets: Array.from({ length: clamp(+x.series || 3, 1, 15) }, () => +x.sec ? { sec: +x.sec, done: true } : { reps: clamp(+x.reps || 10, 1, 200), kg: +x.kg || '', done: true }) }));
      const sp = SPORTS[j.sport] ? j.sport : 'autre';
      s = { id: uid(), date: today(), sport: sp, nom: SPORTS[sp].nom, dur: clamp(+j.duree_min || 30, 1, 600), rpe: 7, notes: txt.slice(0, 200) }; if (items.length) s.items = items; if (+j.distance && SPORTS[sp].dist) s.dist = +j.distance;
    } catch (e) { s = null; }
  }
  if (!s) { out.innerHTML = '<div class="tip">🤔 Je n’ai pas reconnu d’exercice. Essayez « squat 3 séries de 10 » ou « course 5 km en 30 minutes ».</div>'; return; }
  window.QL = s;
  out.innerHTML = `<div class="kpi"><b>${SPORTS[s.sport].ic} ${esc(s.nom)}</b><div class="mu small">${s.dur} min${s.dist ? ' · ' + s.dist + ' ' + SPORTS[s.sport].dist : ''}</div>
    ${s.items ? `<div class="spl">${s.items.map(it => `<div class="spi">${mvImg(it.mv, 'thumb')}<span><b>${esc(mvName(it))}</b><small>${it.sets.length} × ${it.sets[0].sec ? it.sets[0].sec + ' s' : it.sets[0].reps}${it.sets[0].kg ? ' à ' + it.sets[0].kg + ' kg' : ''}</small></span></div>`).join('')}</div>` : ''}</div>
    <button class="btn pri w" style="margin-top:10px" onclick="closeSheet();addSession(QL)">${ic('check')}Enregistrer</button>`;
}

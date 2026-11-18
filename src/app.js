const APEX_ID = 'apexfit-rinate83-7f3c9e'; // empreinte de l’auteur original
// ===================== COMPATIBILITÉ (iPhone anciens) + ERREURS VISIBLES =====================
if (!Array.prototype.at) Object.defineProperty(Array.prototype, 'at', { value: function (i) { i = Math.trunc(i) || 0; if (i < 0) i += this.length; return this[i]; }, writable: true, configurable: true });
if (!Array.prototype.flat) Object.defineProperty(Array.prototype, 'flat', { value: function () { return [].concat(...this); }, writable: true, configurable: true });
if (!Array.prototype.flatMap) Object.defineProperty(Array.prototype, 'flatMap', { value: function (f) { return [].concat(...this.map(f)); }, writable: true, configurable: true });
window.addEventListener('error', e => showErr(e.message));
window.addEventListener('unhandledrejection', e => showErr(e.reason && e.reason.message || String(e.reason)));
function showErr(m) { try { const d = document.createElement('div'); d.className = 'toast'; d.style.background = '#7f1d1d'; d.textContent = '⚠️ Erreur : ' + m + ' — envoyez une capture'; document.body.appendChild(d); setTimeout(() => d.remove(), 7000); } catch (e) {} }

// ===================== OUTILS =====================
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const today = () => ymd(new Date());
const fmtDate = (s, o = { weekday: 'long', day: 'numeric', month: 'long' }) => parseD(s).toLocaleDateString('fr-FR', o);
const mmss = s => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
const hmin = m => m >= 60 ? `${Math.floor(m / 60)} h ${pad(Math.round(m % 60))}` : `${Math.round(m)} min`;
const mvById = id => LIB.find(m => m.id === id);
// image d'un mouvement : 2 images = animation départ ↔ arrivée
function mvImg(id, cls = '') {
  const m = IMG[id]; if (!m) return '';
  const src = i => `img/${id}-${i}.${m[0]}`;
  return `<span class="mvimg ${cls} ${m[1] > 1 ? 'anim' : ''}"><img src="${src(0)}" alt="" loading="lazy">${m[1] > 1 ? `<img src="${src(1)}" alt="" loading="lazy">` : ''}</span>`;
}
const mvName = it => (mvById(it.mv) || {}).n || it.n || it.mv;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const monday = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
const ICONS = {
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>', grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>', user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>', check: '<path d="M20 6 9 17l-5-5"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
  play: '<path d="M7 4v16l13-8z"/>', trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>', save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-5 5-5 8-1-1-2-2-2-4-2 2-2 5-2 8 0 4 3 7 7 7z"/>', test: '<path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1L14 9V3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>', edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'
};
const ic = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;
function toast(t, ms = 2600) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), ms); }
function beep(f = 880, ms = 180) { try { const a = beep.ctx || (beep.ctx = new (window.AudioContext || window.webkitAudioContext)()), o = a.createOscillator(), g = a.createGain(); o.frequency.value = f; o.connect(g); g.connect(a.destination); g.gain.setValueAtTime(.25, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + ms / 1000); o.start(); o.stop(a.currentTime + ms / 1000); } catch (e) {} try { navigator.vibrate && navigator.vibrate(200); } catch (e) {} }

// ===================== DONNÉES =====================
const KEY = 'apexfit_v3';
let S = load();
function blank() { return { v: 3, profile: { prenom: '', age: 30, sexe: 'h', poids: '', taille: '', obj: 'forme', jours: 3, mat: ['aucun'], sports: [] }, sessions: [], templates: [], tests: [], prog: null, goals: [], skipTest: false, body: [], remind: null, avail: {}, weekOk: {} }; }
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 3) { return migrate(Object.assign(blank(), s)); } } catch (e) {}
  const s = blank();
  try { // reprise des données de l'ancienne version (apexfit_state)
    const o = JSON.parse(localStorage.getItem('apexfit_state'));
    if (o && Array.isArray(o.workouts)) {
      const map = { 'Développé Couché': 'dc', 'Squat': 'squat', 'Tractions': 'tractions', 'Développé Militaire': 'dm', 'Soulevé de Terre': 'sdt', 'Curl Biceps': 'curl' };
      o.workouts.forEach(w => {
        if (w.type === 'running') s.sessions.push({ id: uid(), date: w.date, sport: 'course', nom: 'Course', dur: +w.duration || 0, dist: +w.distance || 0, deniv: +w.elevation || 0, rpe: 0 });
        else if (w.type === 'muscu') s.sessions.push({ id: uid(), date: w.date, sport: 'muscu', nom: w.exercise, dur: (w.sets || 3) * 3, rpe: 0, items: [{ mv: map[w.exercise] || w.exercise, n: w.exercise, sets: Array.from({ length: w.sets || 1 }, () => ({ reps: w.reps, kg: w.weight, done: true })) }] });
      });
      (o.goals || []).forEach(g => s.goals.push({ id: uid(), type: g.unit === 'km' ? 'km' : 'seances', sport: g.unit === 'km' ? 'course' : (g.id === 2 ? 'muscu' : 'all'), target: g.target, titre: g.title, penalite: g.penalty }));
      s.profile.sports = [...new Set(s.sessions.map(x => x.sport))];
    }
  } catch (e) {}
  if (!s.goals.length) s.goals = [{ id: uid(), type: 'seances', sport: 'all', target: 3, titre: '3 séances par semaine', penalite: '50 burpees' }];
  return s;
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('⚠️ Mémoire pleine : exportez vos données (Profil)'); } }
const sessionsOf = sp => S.sessions.filter(x => !sp || x.sport === sp);
const practiced = () => { const set = new Set([...(S.profile.sports || []), ...S.sessions.map(x => x.sport)]); return Object.keys(SPORTS).filter(k => set.has(k)); };
const distKm = x => !x.dist ? 0 : (SPORTS[x.sport] && SPORTS[x.sport].dist === 'm' ? x.dist / 1000 : x.dist);
const volKg = x => (x.items || []).reduce((a, it) => a + it.sets.filter(s => s.done).reduce((b, s) => b + (+s.reps || 0) * (+s.kg || 0), 0), 0);
const e1rm = (kg, r) => kg * (1 + r / 30);

// ===================== NAVIGATION =====================
let route = { v: 'home' }, calMonth = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
function go(v, p = {}) { if (v === 'sport' && p.sp !== route.sp) { spTab = 'suivi'; libQ = ''; libG = 'Tous'; } route = Object.assign({ v }, p); render(); window.scrollTo(0, 0); }
function render() {
  const v = route.v; document.body.classList.toggle('calm', !!S.calm);
  $$('.nav button[data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === v || (v === 'sport' && b.dataset.v === 'sports')));
  const back = v === 'sport';
  $('#top').innerHTML = `${back ? `<button class="back" onclick="go('sports')">${ic('left')}</button>` : '<img src="icons/icon.svg" alt="">'}
    <div><b>${back ? esc(SPORTS[route.sp].ic + ' ' + SPORTS[route.sp].nom) : 'APEX<span>FIT</span>'}</b><small>${back ? 'Suivi, mouvements, séances types' : greeting()}</small></div>
    <div class="streak ${streak() ? 'hot' : ''}">${ic('flame')}<span>${streak()} j</span></div>`;
  try { ({ home: vHome, sports: vSports, sport: vSport, programmes: vProgrammes, profil: vProfil })[v]();
  enhance();
  }
  catch (e) { console.error(e); $('#view').innerHTML = `<div class="card empty"><div class="e">⚠️</div>Un problème d’affichage est survenu.<br><small class="mu">${esc(e.message)}</small></div>`; }
}
function greeting() { const h = new Date().getHours(); return `${h < 18 ? 'Bonjour' : 'Bonsoir'}${S.profile.prenom ? ' ' + esc(S.profile.prenom) : ''} · ${fmtDate(today(), { weekday: 'long', day: 'numeric', month: 'long' })}`; }
// série réelle : jours consécutifs avec au moins une séance (aujourd'hui ou hier pour ne pas casser la série du jour)
function streak() {
  const days = new Set(S.sessions.map(x => x.date)); let d = new Date(); if (!days.has(ymd(d))) d.setDate(d.getDate() - 1);
  let n = 0; while (days.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); } return n;
}
// ===================== CALORIES (MET × kg × heures — Compendium 2024) =====================
// Estimation brute (repos inclus). Mesure de la montre prioritaire si l'activité est importée.
const RUN_MPH = [[4, 6.5], [5, 8.5], [5.5, 9], [6, 9.3], [6.7, 10.5], [7, 11], [7.5, 11.8], [8, 12], [9, 13], [10, 14.8], [11, 16.8], [12, 18.5]];
function interp(T, x) { if (x <= T[0][0]) return T[0][1] * x / T[0][0] > 6 ? T[0][1] * x / T[0][0] : 6; for (let i = 1; i < T.length; i++) if (x <= T[i][0]) { const [a, va] = T[i - 1], [b, vb] = T[i]; return va + (vb - va) * (x - a) / (b - a); } return T.at(-1)[1]; }
function bodyKg() { if (+S.profile.poids) return +S.profile.poids; const b = (S.body || []).filter(x => +x.poids).sort((a, c) => a.date.localeCompare(c.date)).at(-1); return b ? +b.poids : 0; }
const usesKg = s => (s.items || []).some(it => it.sets.some(z => z.done && +z.kg));
function metOf(s) {
  const r = +s.rpe || 6, h = (+s.dur || 0) / 60, km = distKm(s), kmh = h ? km / h : 0, mph = kmh / 1.609;
  switch (s.sport) {
    case 'course': return kmh > 4 ? interp(RUN_MPH, mph) : r >= 8 ? 11 : r >= 6 ? 9.3 : 8.5;
    case 'velo': return kmh > 3 ? (mph < 10 ? 4 : mph < 12 ? 6.8 : mph < 14 ? 8 : mph < 16 ? 10 : mph < 20 ? 12 : 16.8) : r >= 8 ? 10 : r >= 6 ? 8 : 6.8;
    case 'natation': return r >= 7 ? 9.8 : 5.8;
    case 'marche': return (s.deniv && km && s.deniv / km > 30) ? 6 : kmh >= 5.6 ? 4.3 : kmh >= 4.5 ? 3.5 : kmh > 0 ? 3 : r >= 7 ? 6 : 4.3;
    case 'mobilite': return r >= 6 ? 4 : 2.3;
    case 'hiit': return r >= 8 ? 7.5 : r >= 6 ? 7 : 6;
    case 'muscu': return usesKg(s) ? (r >= 8 ? 6 : r >= 5 ? 5 : 3.5) : (r >= 8 ? 6.5 : r >= 5 ? 3.8 : 2.8);
    default: return r >= 8 ? 7.5 : r >= 5 ? 5.5 : 3.5;
  }
}
function kcalOf(s) {
  if (s.ext && +s.ext.kcal) return { k: Math.round(+s.ext.kcal), src: 'montre' };
  const kg = bodyKg() || 70, age = +S.profile.age || 30, f = age >= 60 ? 2.7 / 3.5 : 1; // ≥ 60 ans : métabolisme de repos plus bas (Compendium seniors)
  let h = (+s.dur || 0) / 60;
  if (!h && s.sport === 'course' && distKm(s)) return { k: Math.round(distKm(s) * kg * f), met: 0, kg, est: !bodyKg() }; // ≈ 1 kcal/kg/km
  if (!h) return null; const met = metOf(s);
  return { k: Math.round(met * kg * h * f), met: +met.toFixed(1), kg, est: !bodyKg() };
}
const kc = s => (kcalOf(s) || {}).k || 0;
const kcTxt = k => '≈ ' + (k >= 1000 ? (k / 1000).toFixed(1).replace('.', ',') + ' k' : k) + ' kcal';
function kcalInfo() {
  sheet(`<h2>🔥 Calories : comment c’est calculé</h2><p class="small">Estimation <b>MET × poids (kg) × durée (h)</b>, avec les valeurs du <b>Compendium des activités physiques 2024</b> (référence scientifique).</p>
    <div class="card"><p class="small" style="margin:0">• <b>Course / vélo / marche</b> : selon la vitesse (distance ÷ durée).<br>• <b>Muscu, HIIT, poids du corps, yoga</b> : selon le ressenti (RPE) et la présence de charges.<br>• <b>Activités importées</b> : la valeur mesurée par la montre est utilisée en priorité.<br>• <b>60 ans et plus</b> : valeur corrigée (métabolisme de repos plus bas).</p></div>
    <p class="mu small">Poids utilisé : <b>${bodyKg() || 70} kg</b>${bodyKg() ? '' : ' (par défaut — indiquez votre poids dans « Corps » pour être plus juste)'}.</p>
    <p class="mu small">⚠️ C’est une estimation brute (elle inclut ce que vous auriez dépensé au repos) : comptez ±20–30 % selon la personne. Utile pour comparer vos semaines, pas pour compter au gramme près.</p>`);
}

function weekStats(off = 0) {
  const a = monday(new Date()); a.setDate(a.getDate() + 7 * off); const b = new Date(a); b.setDate(b.getDate() + 7);
  const L = S.sessions.filter(x => { const d = parseD(x.date); return d >= a && d < b; });
  return { L, n: L.length, min: L.reduce((s, x) => s + (+x.dur || 0), 0), km: L.reduce((s, x) => s + distKm(x), 0), kcal: L.reduce((s, x) => s + kc(x), 0), days: new Set(L.map(x => x.date)).size, a };
}

// ===================== ACCUEIL : RÉCAP + CALENDRIER =====================
// ===================== BANNIÈRES MANGA (dessins originaux) =====================
// silhouette « encrée » : membres épais à bouts ronds, contour blanc façon case de manga
function mgFig(p, props = '') {
  const L = (a, b, c) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}${c ? `L${c[0]} ${c[1]}` : ''}`;
  const limbs = [L(p.sh, p.e1, p.h1), L(p.sh, p.e2, p.h2), L(p.hip, p.k1, p.f1), L(p.hip, p.k2, p.f2)].join('');
  const torso = L(p.sh, p.hip);
  const fist = (h, r = 8) => `<circle cx="${h[0]}" cy="${h[1]}" r="${r}"/>`;
  const body = (col, w, hr) => `<g stroke="${col}" fill="${col}" stroke-linecap="round" stroke-linejoin="round"><path d="${torso}" stroke-width="${w + 10}" fill="none"/><path d="${limbs}" stroke-width="${w}" fill="none"/><circle cx="${p.head[0]}" cy="${p.head[1]}" r="${hr}"/>${fist(p.h1, w / 2 + 2)}${fist(p.h2, w / 2 + 2)}</g>`;
  const burst = Array.from({ length: 28 }, (_, i) => { const r = i % 2 ? 62 : 96, t = i / 28 * Math.PI * 2; return `${(100 + r * Math.cos(t)).toFixed(1)},${(104 + r * Math.sin(t) * .9).toFixed(1)}`; }).join(' ');
  return `<polygon points="${burst}" fill="var(--mc)" opacity=".28" stroke="#0b0b0f" stroke-width="2.5" stroke-linejoin="round"/>${props}${body('#fff', 22, 19)}${body('#0b0b0f', 14, 15)}`;
}
var MG_POSE = {
  sprint: { head: [112, 46], sh: [104, 68], hip: [86, 112], e1: [128, 84], h1: [146, 66], e2: [80, 82], h2: [62, 100], k1: [116, 132], f1: [104, 166], k2: [62, 128], f2: [42, 150] },
  lift: { head: [100, 62], sh: [100, 84], hip: [100, 128], e1: [72, 58], h1: [62, 30], e2: [128, 58], h2: [138, 30], k1: [80, 150], f1: [74, 182], k2: [120, 150], f2: [126, 182] },
  punch: { head: [96, 52], sh: [100, 74], hip: [92, 120], e1: [130, 70], h1: [162, 62], e2: [78, 92], h2: [86, 72], k1: [118, 146], f1: [130, 180], k2: [70, 148], f2: [54, 178] },
  victory: { head: [100, 56], sh: [100, 78], hip: [100, 124], e1: [78, 52], h1: [70, 24], e2: [122, 52], h2: [130, 24], k1: [88, 152], f1: [84, 184], k2: [114, 152], f2: [118, 184] },
  focus: { head: [100, 66], sh: [100, 88], hip: [100, 134], e1: [80, 112], h1: [96, 120], e2: [120, 112], h2: [104, 120], k1: [66, 150], f1: [118, 158], k2: [134, 150], f2: [82, 158] },
  pull: { head: [100, 60], sh: [100, 80], hip: [100, 124], e1: [74, 52], h1: [70, 22], e2: [126, 52], h2: [130, 22], k1: [94, 154], f1: [104, 176], k2: [108, 150], f2: [116, 172] },
  rest: { head: [58, 128], sh: [76, 140], hip: [120, 146], e1: [70, 160], h1: [56, 150], e2: [94, 158], h2: [110, 154], k1: [146, 130], f1: [170, 152], k2: [148, 146], f2: [176, 164] }
};
var MG_PROPS = {
  lift: '<g stroke="#fff" stroke-width="12" stroke-linecap="round"><path d="M28 28H172"/></g><g stroke="#0b0b0f" stroke-width="6" stroke-linecap="round"><path d="M28 28H172"/></g><g fill="#0b0b0f" stroke="#fff" stroke-width="3"><rect x="20" y="10" width="14" height="36" rx="3"/><rect x="166" y="10" width="14" height="36" rx="3"/></g>',
  pull: '<path d="M40 22H160" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M40 22H160" stroke="#0b0b0f" stroke-width="6" stroke-linecap="round"/>',
  punch: '<g fill="none" stroke="#0b0b0f" stroke-width="4" stroke-linecap="round" opacity=".9"><path d="M176 50l18-8M178 64h20M176 78l18 8"/></g>',
  rest: '<text x="128" y="92" font-size="26" font-weight="900" fill="#0b0b0f" stroke="#fff" stroke-width="5" paint-order="stroke" font-family="system-ui">Z</text><text x="150" y="70" font-size="20" font-weight="900" fill="#0b0b0f" stroke="#fff" stroke-width="5" paint-order="stroke" font-family="system-ui">z</text><text x="166" y="52" font-size="15" font-weight="900" fill="#0b0b0f" stroke="#fff" stroke-width="4" paint-order="stroke" font-family="system-ui">z</text>',
  focus: '<g fill="none" stroke="#0b0b0f" stroke-width="3" opacity=".55"><path d="M100 18c-30 30-50 60-50 100M100 18c30 30 50 60 50 100"/><path d="M100 4c-40 36-64 72-64 120M100 4c40 36 64 72 64 120" opacity=".6"/></g>'
};
// sfx = onomatopées japonaises courantes en manga (son de pression, de choc, d'élan…)
var BANNERS = [
  { k: 'force1', pose: 'punch', c: '#ef4444', sfx: 'ドン!', t: 'Dépasse tes limites !', s: 'La force naît là où tu voulais abandonner.' },
  { k: 'force2', pose: 'lift', c: '#f59e0b', sfx: 'ゴゴゴ', t: 'Chaque répétition compte', s: 'Petit à petit, ton corps forge sa légende.' },
  { k: 'cardio', pose: 'sprint', c: '#22d3ee', sfx: 'シュッ', t: 'Plus vite qu’hier !', s: 'Ton seul rival, c’est le toi d’hier.' },
  { k: 'mental', pose: 'focus', c: '#a78bfa', sfx: 'ゴゴゴ', t: 'L’esprit d’abord', s: 'Respire. Concentre-toi. Le corps suivra.' },
  { k: 'grit', pose: 'pull', c: '#f43f5e', sfx: 'グッ!', t: 'Ne lâche rien !', s: 'Encore une. Puis encore une.' },
  { k: 'rise', pose: 'victory', c: '#22c55e', sfx: 'キラッ', t: 'Ton futur toi te dit merci', s: 'La discipline d’aujourd’hui, c’est la victoire de demain.' },
  { k: 'start', pose: 'sprint', c: '#f97316', sfx: 'ダッ!', t: 'Le premier pas est le plus dur', s: 'Tu es déjà en route. Continue !' }
];
var MG_SPECIAL = {
  rest: { pose: 'rest', c: '#60a5fa', sfx: 'スー…', t: 'Jour de récupération', s: 'Le muscle se construit pendant le repos. Recharge tes batteries.' },
  win: { pose: 'victory', c: '#facc15', sfx: 'ドーン!', t: 'Mission accomplie !', s: 'Séance terminée. Tu as gagné ce combat.' },
  pr: { pose: 'lift', c: '#facc15', sfx: 'ズドン!', t: 'Nouveau record !', s: 'Niveau supérieur débloqué.' },
  go: { pose: 'punch', c: '#ef4444', sfx: 'いくぞ!', t: 'C’est parti !', s: 'Donne tout.' }
};
function mangaBanner(b, opt = {}) {
  const sub = opt.sub || b.s, tag = opt.tag || '';
  return `<div class="manga ${opt.cls || ''}" style="--mc:${b.c}" ${opt.click ? `onclick="${opt.click}"` : ''}>
    <div class="mg-lines"></div><div class="mg-dots"></div>
    <div class="mg-sfx">${b.sfx}</div>
    <svg class="mg-fig" viewBox="0 0 200 200" aria-hidden="true">${mgFig(MG_POSE[b.pose], MG_PROPS[b.pose] || '')}</svg>
    <div class="mg-txt">${tag ? `<span class="mg-tag">${tag}</span>` : ''}<b>${esc(b.t)}</b><small>${esc(sub)}</small></div>
  </div>`;
}
// bannière du jour sur l'accueil : change chaque jour, ou d'un geste
var mgIdx = null;
function homeBanner() {
  if (S.manga === false) return '';
  const done = S.sessions.some(x => x.date === today()), planned = plannedMap().has(today());
  const streak = (() => { let n = 0; const d = new Date(); if (!S.sessions.some(x => x.date === ymd(d))) d.setDate(d.getDate() - 1); while (S.sessions.some(x => x.date === ymd(d))) { n++; d.setDate(d.getDate() - 1); } return n; })();
  if (done) return mangaBanner(MG_SPECIAL.win, { tag: 'Aujourd’hui ✓', sub: streak > 1 ? `${streak} jours d’affilée. Rien ne peut t’arrêter !` : MG_SPECIAL.win.s, click: 'nextBanner()' });
  if (!planned && (S.prog || (S.remind && S.remind.days.length)) && mgIdx == null) return mangaBanner(MG_SPECIAL.rest, { tag: 'Repos', click: 'nextBanner()' });
  const i = mgIdx == null ? Math.floor(Date.now() / 864e5) % BANNERS.length : mgIdx;
  return mangaBanner(BANNERS[i], { tag: streak > 1 ? `🔥 ${streak} jours` : 'Motivation du jour', click: 'nextBanner()' });
}
function nextBanner() {
  haptic(10); mgIdx = ((mgIdx == null ? Math.floor(Date.now() / 864e5) % BANNERS.length : mgIdx) + 1) % BANNERS.length;
  const el = $('#view .manga'); if (el) { el.outerHTML = mangaBanner(BANNERS[mgIdx], { tag: 'Motivation', click: 'nextBanner()', cls: 'slam' }); }
}
// écran plein « coup de manga » : départ de séance, record
function mangaSplash(kind, sub, ms = 1500) {
  if (S.manga === false || S.calm) return;
  const d = document.createElement('div'); d.className = 'mg-splash';
  d.innerHTML = mangaBanner(MG_SPECIAL[kind], { cls: 'slam big', sub: sub || MG_SPECIAL[kind].s });
  d.onclick = () => d.remove(); document.body.appendChild(d); haptic([20, 30, 40]);
  setTimeout(() => { d.classList.add('out'); setTimeout(() => d.remove(), 350); }, ms);
}

// ===================== COACH ADAPTATIF (sans clé) + IA (clé gratuite facultative) =====================
// ---- forme du jour : sommeil, énergie, courbatures, stress (1 à 5)
var READY_Q = [['sleep', '😴', 'Sommeil', ['Très mauvais', 'Mauvais', 'Moyen', 'Bon', 'Excellent']], ['energy', '⚡', 'Énergie', ['À plat', 'Faible', 'Moyenne', 'Bonne', 'Au top']],
  ['sore', '🦵', 'Courbatures', ['Très fortes', 'Fortes', 'Légères', 'Quasi rien', 'Aucune']], ['stress', '🧠', 'Stress', ['Très élevé', 'Élevé', 'Moyen', 'Faible', 'Zen']]];
function readyToday() { const r = (S.ready || {})[today()]; if (!r) return null; const v = READY_Q.map(([k]) => r[k] || 3), avg = v.reduce((a, b) => a + b, 0) / v.length; return { ...r, avg, mode: avg >= 3.5 ? 'go' : avg >= 2.5 ? 'light' : 'rest' }; }
var MODE = { go: ['🟢', 'En forme', 'Séance normale : vous pouvez viser les progressions proposées.'], light: ['🟠', 'Forme moyenne', 'Séance allégée conseillée : version express, une série de moins, sans chercher de record.'], rest: ['🔴', 'Fatigue', 'Récupération conseillée : mobilité douce ou marche, et reportez la séance intense.'] };
function readyForm(after) {
  const r = (S.ready || {})[today()] || {};
  sheet(`<h2>Comment vous sentez-vous ?</h2><p class="mu small">30 secondes pour adapter la séance du jour à votre forme.</p>
    ${READY_Q.map(([k, e, l, lab]) => `<label class="f">${e} ${l}</label><div class="rq" data-k="${k}">${[1, 2, 3, 4, 5].map(v => `<button class="${(r[k] || 0) === v ? 'on' : ''}" onclick="this.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('on'));this.classList.add('on');haptic(5)" title="${lab[v - 1]}"><b>${v}</b><small>${lab[v - 1]}</small></button>`).join('')}</div>`).join('')}
    <button class="btn pri w" style="margin-top:16px" onclick="saveReady(${after ? 1 : 0})">Valider</button>`);
}
function saveReady(after) {
  const r = {}; $$('.rq').forEach(d => { const b = d.querySelector('button.on'); r[d.dataset.k] = b ? +b.querySelector('b').textContent : 3; });
  S.ready = S.ready || {}; S.ready[today()] = r; save(); closeSheet(); const t = readyToday(); toast(`${MODE[t.mode][0]} ${MODE[t.mode][1]} : ${t.mode === 'go' ? 'go !' : t.mode === 'light' ? 'séance allégée' : 'récupération'}`, 3200); render();
  if (after) startAdapted();
}
// démarre la prochaine séance adaptée à la forme du jour
function startAdapted() {
  const t = readyToday(), nx = nextProgSession();
  if (!t) { if (nx) return startProgSession(0); return plusMenu(); }
  if (t.mode === 'rest') { const m = PROGRAMS.find(p => p.id === 'mobfull'); if (m) startLive(JSON.parse(JSON.stringify(m.seances[0])), {}); toast('🧘 Récupération active : la séance du programme est gardée pour un autre jour', 4000); return; }
  if (nx) startProgSession(t.mode === 'light' ? 1 : 0); else plusMenu();
}
// ---- charge d'entraînement : effort ressenti × durée (méthode « session-RPE »)
const sLoad = x => (+x.dur || 0) * (+x.rpe || 5);
function loadStats() {
  const now = new Date(), d0 = n => { const d = new Date(now); d.setDate(d.getDate() - n); return ymd(d); };
  const acute = S.sessions.filter(x => x.date > d0(7)).reduce((a, x) => a + sLoad(x), 0);
  const chronic = S.sessions.filter(x => x.date > d0(28)).reduce((a, x) => a + sLoad(x), 0) / 4;
  const ratio = chronic ? acute / chronic : null, hist = S.sessions.some(x => x.date <= d0(21));
  return { acute: Math.round(acute), chronic: Math.round(chronic), ratio, hist };
}
// ---- conseils automatiques (règles simples, sans IA)
function coachTips() {
  const T = [], L = loadStats(), r = readyToday(), last = S.sessions.slice(-3), t = S.tests.at(-1);
  if (r) T.push([MODE[r.mode][0], MODE[r.mode][2]]);
  else T.push(['📝', 'Indiquez votre forme du jour : la séance sera ajustée automatiquement.']);
  if (L.ratio != null && L.hist) {
    if (L.ratio > 1.5) T.push(['⚠️', `Charge de la semaine bien plus haute que d’habitude (×${L.ratio.toFixed(1)}). Allégez les prochains jours pour limiter le risque de blessure.`]);
    else if (L.ratio < 0.8) T.push(['📉', 'Charge en baisse par rapport à vos 4 dernières semaines : reprenez progressivement votre rythme.']);
    else T.push(['✅', 'Charge d’entraînement équilibrée par rapport à vos 4 dernières semaines.']);
  }
  if (last.length >= 2 && last.slice(-2).every(x => +x.rpe >= 9)) T.push(['😮‍💨', 'Vos 2 dernières séances étaient très dures (effort 9–10/10). Prévoyez une séance légère ou un jour de repos.']);
  // mouvements qui stagnent : 3 séances sans progrès de charge → décharge de 10 %
  const stall = []; const byMv = {};
  S.sessions.slice(-30).forEach(s => (s.items || []).forEach(it => { const b = Math.max(0, ...it.sets.filter(z => z.done && z.kg).map(z => +z.kg)); if (b) (byMv[it.mv] = byMv[it.mv] || []).push(b); }));
  Object.entries(byMv).forEach(([mv, v]) => { if (v.length >= 4 && Math.max(...v.slice(-3)) <= v[v.length - 4]) stall.push(mv); });
  if (stall.length) T.push(['🔁', `Stagnation sur ${stall.slice(0, 3).map(m => mvName({ mv: m })).join(', ')} : baissez la charge de 10 % pendant une semaine puis repartez (décharge).`]);
  if (t) { const days = Math.round((Date.now() - parseD(t.date)) / 864e5); if (days > 42) T.push(['🧪', `Votre dernier test date de ${days} jours : refaites-le pour mettre à jour niveaux et exercices.`]); }
  else T.push(['🧪', 'Faites le test de capacités : niveaux, exercices et conseils seront personnalisés.']);
  const imp = S.sessions.filter(x => x.ext).length; if (!imp) T.push(['⌚', 'Importez vos activités Garmin ou Strava pour que le coach tienne compte de tout votre entraînement.']);
  return T;
}
// ---- IA : Google Gemini (clé gratuite) ou fournisseur compatible OpenAI (Groq, OpenRouter, Mistral…)
const AIK = 'apexfit_ai';
const aiCfg = () => { try { return JSON.parse(localStorage.getItem(AIK)) || {}; } catch (e) { return {}; } };
const aiOn = () => !!aiCfg().key;
function aiSaveCfg() {
  const c = { prov: $('#aiProv').value, key: $('#aiKey').value.trim(), base: ($('#aiBase') || {}).value || '', model: ($('#aiModel') || {}).value || '' };
  try { localStorage.setItem(AIK, JSON.stringify(c)); } catch (e) {}
  toast(c.key ? '🤖 Clé enregistrée sur cet appareil' : 'Clé supprimée'); openCoach();
}
async function aiCall(system, user, json) {
  const c = aiCfg(); if (!c.key) throw new Error('Aucune clé IA');
  if ((c.prov || 'gemini') === 'gemini') {
    const models = c.model ? [c.model] : ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];
    let err;
    for (const m of models) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': c.key },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { temperature: .6, maxOutputTokens: 2048, ...(json ? { responseMimeType: 'application/json' } : {}) } }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok) { const t = (((d.candidates || [])[0] || {}).content || {}).parts; if (t) return t.map(p => p.text || '').join(''); err = new Error('Réponse vide'); continue; }
      err = new Error((d.error && d.error.message) || 'Erreur ' + r.status); if (r.status === 400 || r.status === 401 || r.status === 403) break;
    }
    throw err;
  }
  const base = (c.base || 'https://api.groq.com/openai/v1').replace(/\/$/, '');
  const r = await fetch(base + '/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.key },
    body: JSON.stringify({ model: c.model || 'llama-3.3-70b-versatile', temperature: .6, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], ...(json ? { response_format: { type: 'json_object' } } : {}) }) });
  const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error((d.error && (d.error.message || d.error)) || 'Erreur ' + r.status);
  return d.choices[0].message.content;
}
// contexte envoyé à l'IA : résumé, sans nom ni données superflues
function aiContext() {
  const P = S.profile, t = S.tests.at(-1), L = loadStats(), r = readyToday(), nx = nextProgSession(), d28 = (() => { const d = new Date(); d.setDate(d.getDate() - 28); return ymd(d); })();
  const ses = S.sessions.filter(x => x.date > d28).slice(-40).map(x => ({ date: x.date, sport: x.sport, nom: x.nom || '', min: x.dur, effort: x.rpe, km: distKm(x) ? +distKm(x).toFixed(1) : undefined, kcal: kc(x) || undefined, fc: x.ext && x.ext.hr || undefined,
    exos: x.items ? x.items.map(it => `${it.n || mvName(it)}: ${it.sets.filter(z => z.done).map(z => (z.sec ? z.sec + 's' : z.reps) + (z.kg ? '×' + z.kg + 'kg' : '')).join(', ')}`).slice(0, 8) : undefined }));
  return JSON.stringify({ profil: { age: P.age, sexe: P.sexe, poids: P.poids, taille: P.taille, objectif: OBJ[P.obj], seances_semaine_voulues: P.jours, materiel: P.mat, sports_pratiques: (P.pratique || []).map(k => SPEC[k] && SPEC[k].nom) },
    test: t ? { date: t.date, niveau: t.levelTxt, scores_sur_5: Object.fromEntries(Object.entries(t.scores).map(([k, v]) => [QUAL[k], v])), mesures: t.res } : null,
    forme_du_jour: r ? { sommeil: r.sleep, energie: r.energy, courbatures: r.sore, stress: r.stress, note_sur_5: +r.avg.toFixed(1) } : null,
    charge: { semaine: L.acute, moyenne_4_semaines: L.chronic, ratio: L.ratio && +L.ratio.toFixed(2) },
    programme: S.prog ? { nom: (PROGRAMS.find(p => p.id === S.prog.id) || {}).nom, faites: S.prog.done.length } : null,
    prochaine_seance: nx ? { nom: nx.s.nom, sport: nx.s.sport, exercices: (nx.s.items || []).map(it => ({ id: it.mv, nom: mvName(it), series: it.sets, reps: it.reps, sec: it.sec, repos: it.rest })), blocs: nx.s.blocks } : null,
    seances_28_jours: ses });
}
const AI_SYS = 'Tu es le coach sportif de l’application ApexFit. Réponds en français, de façon concrète, bienveillante et concise (moins de 220 mots), avec des listes courtes. Base-toi uniquement sur les données fournies. Tu n’es pas médecin : en cas de douleur, de malaise ou de problème de santé, conseille de consulter un professionnel. Ne propose jamais de régime extrême ni de surentraînement.';
// rendu simple : **gras**, listes, retours à la ligne
const mdLite = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/^#{1,4} ?(.+)$/gm, '<b>$1</b>').replace(/^\s*[-*•] (.+)$/gm, '<li>$1</li>').replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m.replace(/\n/g, '')}</ul>`).replace(/\n{2,}/g, '\n').replace(/\n/g, '<br>').replace(/<br><ul>/g, '<ul>');
async function aiAsk(kind) {
  const out = $('#aiOut'); if (!out) return; out.innerHTML = '<div class="aiload"><i></i><i></i><i></i> Le coach réfléchit…</div>'; haptic(8);
  const q = kind === 'chat' ? ($('#aiQ').value || '').trim() : '';
  if (kind === 'chat' && !q) { out.innerHTML = ''; return; }
  const prompt = { week: 'Analyse mes 4 dernières semaines : points positifs, points à corriger, et 3 actions précises pour la semaine prochaine (fréquence, intensité, récupération, exercices).',
    plan: 'Propose ma semaine idéale (jours, type de séance, durée, intensité) en tenant compte de mon objectif, de ma forme, de ma charge et de mes sports pratiqués.', chat: q }[kind];
  try {
    const txt = await aiCall(AI_SYS, `Données de l’utilisateur (JSON) :\n${aiContext()}\n\nDemande : ${prompt}`);
    out.innerHTML = `<div class="aibox">${mdLite(txt)}</div>`; S.aiLast = { date: today(), kind, txt: txt.slice(0, 4000) }; save();
  } catch (e) { out.innerHTML = `<div class="tip" style="border-color:rgba(244,63,94,.4);color:#fda4af">⚠️ ${esc(e.message)}${/quota|429|rate/i.test(e.message) ? '<br>Limite gratuite atteinte : réessayez plus tard.' : /key|API_KEY|401|403/i.test(e.message) ? '<br>Vérifiez votre clé dans les réglages ci-dessous.' : ''}</div>`; }
}
// l'IA ajuste la prochaine séance : uniquement des exercices de la bibliothèque, valeurs bornées
async function aiAdapt() {
  const nx = nextProgSession(), out = $('#aiOut'); if (!out) return;
  if (!nx || !nx.s.items) { out.innerHTML = '<div class="tip">Aucune séance de musculation à adapter : lancez un programme ou une préparation sportive.</div>'; return; }
  out.innerHTML = '<div class="aiload"><i></i><i></i><i></i> Adaptation de la séance…</div>';
  const ids = LIB.filter(m => SPORTS[m.s].kind === 'force').map(m => m.id);
  const prompt = `Adapte la prochaine séance à ma forme du jour, à ma charge et à mon test. Garde la même logique. Réponds UNIQUEMENT en JSON : {"resume":"une phrase","items":[{"id":"identifiant","series":3,"reps":10,"sec":0,"repos":60,"note":"conseil court"}]}. Utilise "reps" OU "sec" (l’autre à 0). Identifiants autorisés : ${ids.join(',')}.`;
  try {
    const raw = await aiCall(AI_SYS, `Données (JSON) :\n${aiContext()}\n\n${prompt}`, true);
    const j = JSON.parse(raw.replace(/^```json|```$/g, '').trim());
    const items = (j.items || []).filter(x => ids.includes(x.id)).slice(0, 10).map(x => { const sec = clamp(Math.round(+x.sec || 0), 0, 600), it = { mv: x.id, sets: clamp(Math.round(+x.series || 3), 1, 8), rest: clamp(Math.round(+x.repos || 60), 0, 300), note: String(x.note || '').slice(0, 140) }; if (sec >= 5) it.sec = sec; else it.reps = clamp(Math.round(+x.reps || 10), 1, 50); return it; });
    if (!items.length) throw new Error('Proposition inutilisable, réessayez.');
    window.AI_SESS = { nom: nx.s.nom + ' · adaptée IA', sport: nx.s.sport, items, key: nx.s.key };
    out.innerHTML = `<div class="aibox"><b>🤖 ${esc(String(j.resume || 'Séance adaptée'))}</b><div class="spl">${items.map(it => `<div class="spi">${mvImg(it.mv, 'thumb')}<span><b>${esc(mvName(it))}</b><small>${it.sets} × ${it.sec ? it.sec + ' s' : it.reps} · repos ${it.rest} s${it.note ? ' · ' + esc(it.note) : ''}</small></span></div>`).join('')}</div>
      <div class="grid2" style="margin-top:12px"><button class="btn pri" onclick="closeSheet();startLive(AI_SESS,{src:{type:'prog',key:AI_SESS.key}})">${ic('play')}Lancer</button><button class="btn" onclick="aiAdapt()">↻ Autre</button></div></div>`;
  } catch (e) { out.innerHTML = `<div class="tip" style="border-color:rgba(244,63,94,.4);color:#fda4af">⚠️ ${esc(e.message)}</div>`; }
}
function openCoach() {
  const r = readyToday(), L = loadStats(), c = aiCfg(), tips = coachTips();
  const g = L.ratio == null ? 0 : clamp(L.ratio / 2, 0, 1);
  let h = `<h2>🤖 Coach</h2><p class="mu small">Adapte vos séances à votre forme, votre charge et votre test.</p>
    <div class="card" style="margin-top:10px"><div class="row"><div style="font-size:30px">${r ? MODE[r.mode][0] : '📝'}</div><div style="flex:1"><b>Forme du jour</b><div class="mu small">${r ? `${MODE[r.mode][1]} · ${r.avg.toFixed(1)}/5` : 'Pas encore renseignée'}</div></div><button class="btn sm" onclick="readyForm()">${r ? 'Modifier' : 'Renseigner'}</button></div>
    <button class="btn pri w" style="margin-top:12px" onclick="closeSheet();startAdapted()">${ic('play')}Séance adaptée à ma forme</button></div>
    <div class="card"><b>Charge d’entraînement</b><div class="mu tiny" style="margin-top:2px">Effort ressenti × durée · 7 jours comparés à la moyenne de 4 semaines</div>
      <div class="gauge"><i style="left:${g * 100}%"></i></div><div class="row mu tiny" style="justify-content:space-between"><span>Sous-charge</span><span>Équilibrée</span><span>Risque</span></div>
      <div class="grid3" style="margin-top:10px"><div class="kpi"><div class="l">7 jours</div><div class="v" style="font-size:18px">${L.acute}</div></div><div class="kpi"><div class="l">Moy. 4 sem.</div><div class="v" style="font-size:18px">${L.chronic}</div></div><div class="kpi"><div class="l">Ratio</div><div class="v" style="font-size:18px">${L.ratio == null ? '—' : L.ratio.toFixed(2)}</div></div></div></div>
    <div class="grid2"><button class="btn" onclick="painForm()">🩹 Douleurs${activePain().length ? ' (' + activePain().length + ')' : ''}</button><button class="btn" onclick="eventForm()">🎯 Objectif${S.event ? ' ✓' : ''}</button></div>${eventCard()}${zonesCard()}
    <h3 class="sec">Conseils du coach</h3><div class="card">${tips.map(([e, t]) => `<div class="tipline"><span>${e}</span><p>${esc(t)}</p></div>`).join('')}</div>
    <h3 class="sec">Coach IA ${aiOn() ? '<span class="mu tiny" style="font-weight:600">· connecté</span>' : ''}</h3>`;
  if (aiOn()) h += `<div class="card"><div class="grid2"><button class="btn" onclick="aiAsk('week')">📊 Analyser mes 4 semaines</button><button class="btn" onclick="aiAdapt()">🎯 Adapter ma séance</button></div>
      <button class="btn w" style="margin-top:8px" onclick="aiAsk('plan')">🗓️ Ma semaine idéale</button>
      <div class="row" style="margin-top:10px;gap:8px"><input class="in" id="aiQ" placeholder="Posez une question au coach…" onkeydown="if(event.key==='Enter')aiAsk('chat')"><button class="btn pri sm" onclick="aiAsk('chat')">${ic('right')}</button></div>
      <div id="aiOut" style="margin-top:12px">${S.aiLast ? `<div class="aibox"><div class="mu tiny">Dernière réponse (${fmtDate(S.aiLast.date, { day: 'numeric', month: 'short' })})</div>${mdLite(S.aiLast.txt)}</div>` : ''}</div>
      <p class="mu tiny" style="margin-top:10px">Un résumé de vos séances, de votre test et de votre forme est envoyé au fournisseur d’IA (sans votre prénom). Les conseils de l’IA peuvent se tromper : en cas de douleur, consultez.</p></div>`;
  else h += `<div class="card"><b>Activer l’IA gratuite (2 minutes)</b><ol class="small" style="padding-left:18px;line-height:1.6;margin:8px 0">
      <li>Ouvrez <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style="color:var(--ac2)">Google AI Studio</a> avec un compte Google.</li><li>Touchez « Create API key » et copiez la clé.</li><li>Collez-la ci-dessous : elle reste sur cet appareil.</li></ol>
      <p class="mu tiny">Gratuit avec des limites d’utilisation. Sur l’offre gratuite, Google peut utiliser les échanges pour améliorer ses produits. Sans clé, le coach ci-dessus fonctionne quand même.</p></div>`;
  h += `<details class="card"${aiOn() ? '' : ' open'}><summary><b>⚙️ Réglages de l’IA</b></summary>
    <label class="f">Fournisseur</label><select class="in" id="aiProv" onchange="$('#aiAdv').style.display=this.value==='openai'?'':'none'"><option value="gemini" ${(c.prov || 'gemini') === 'gemini' ? 'selected' : ''}>Google Gemini (gratuit)</option><option value="openai" ${c.prov === 'openai' ? 'selected' : ''}>Compatible OpenAI (Groq, OpenRouter, Mistral…)</option></select>
    <label class="f">Clé API</label><input class="in" id="aiKey" type="password" autocomplete="off" value="${esc(c.key || '')}" placeholder="Collez votre clé">
    <div id="aiAdv" style="${c.prov === 'openai' ? '' : 'display:none'}"><label class="f">Adresse de l’API</label><input class="in" id="aiBase" value="${esc(c.base || 'https://api.groq.com/openai/v1')}"></div>
    <label class="f">Modèle (facultatif)</label><input class="in" id="aiModel" value="${esc(c.model || '')}" placeholder="${c.prov === 'openai' ? 'llama-3.3-70b-versatile' : 'automatique'}">
    <div class="grid2" style="margin-top:12px"><button class="btn pri" onclick="aiSaveCfg()">Enregistrer</button><button class="btn ghost" onclick="$('#aiKey').value='';aiSaveCfg()">Supprimer la clé</button></div></details>`;
  const sh = $('#sheetBg .sheet'); if (sh && sh.querySelector('#aiProv')) { sh.innerHTML = '<div class="grab"></div>' + h; } else sheet(h);
}

// ===================== IMPORT GARMIN / STRAVA : fichiers FIT, GPX, TCX, ZIP, GZ =====================
var FIT_SPORT = { 1: 'course', 2: 'velo', 5: 'natation', 11: 'marche', 17: 'marche', 10: 'muscu', 4: 'muscu', 62: 'hiit', 43: 'marche', 15: 'autre', 37: 'autre' };
const gunzip = async buf => new Uint8Array(await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
const inflateRaw = async buf => new Uint8Array(await new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
// lecteur FIT minimal : messages « session » (18), sinon points (20) pour reconstituer l'activité
function parseFIT(u8) {
  const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength), hs = u8[0];
  if (u8.length < 14 || String.fromCharCode(u8[8], u8[9], u8[10], u8[11]) !== '.FIT') throw new Error('Fichier FIT invalide');
  const end = Math.min(u8.length, hs + dv.getUint32(4, true)), defs = {}, sessions = [], rec = { t0: null, t1: null, dist: null, hr: [] };
  let p = hs, lastTs = 0;
  const rd = (o, size, le) => size === 1 ? dv.getUint8(o) : size === 2 ? dv.getUint16(o, le) : size === 4 ? dv.getUint32(o, le) : null;
  const INV = { 1: 0xFF, 2: 0xFFFF, 4: 0xFFFFFFFF };
  while (p < end) {
    const h = u8[p++];
    if (h & 0x80) { const def = defs[(h >> 5) & 3]; if (!def) break; p += def.len; continue; }
    if (h & 0x40) {
      const loc = h & 0x0F, dev = h & 0x20; p++; const le = u8[p++] === 0, gnum = le ? dv.getUint16(p, true) : dv.getUint16(p, false); p += 2;
      const n = u8[p++], f = []; let len = 0;
      for (let i = 0; i < n; i++) { f.push({ num: u8[p], size: u8[p + 1] }); len += u8[p + 1]; p += 3; }
      if (dev) { const nd = u8[p++]; for (let i = 0; i < nd; i++) { len += u8[p + 1]; p += 3; } }
      defs[loc] = { gnum, le, f, len }; continue;
    }
    const def = defs[h & 0x0F]; if (!def) break;
    let o = p; const v = {};
    for (const fd of def.f) { if ([1, 2, 4].includes(fd.size)) { const x = rd(o, fd.size, def.le); if (x !== INV[fd.size]) v[fd.num] = x; } o += fd.size; }
    if (v[253] != null) lastTs = v[253];
    if (def.gnum === 18) sessions.push({ start: v[2] != null ? v[2] : v[253], sport: v[5], sub: v[6], el: v[7] != null ? v[7] / 1000 : null, tm: v[8] != null ? v[8] / 1000 : null, dist: v[9] != null ? v[9] / 100 : null, kcal: v[11], hr: v[16], hrmax: v[17], asc: v[22] });
    if (def.gnum === 20 && v[253] != null) { if (rec.t0 == null) rec.t0 = v[253]; rec.t1 = v[253]; if (v[5] != null) rec.dist = v[5] / 100; if (v[3] != null) rec.hr.push(v[3]); }
    if (def.gnum === 12 && v[0] != null) rec.sport = v[0];
    p += def.len;
  }
  const FE = 631065600; // époque FIT (31/12/1989) en secondes Unix
  const out = sessions.filter(s => s.start != null).map(s => ({ start: new Date((s.start + FE) * 1000), sport: s.sport, sub: s.sub, sec: s.tm || s.el, m: s.dist, kcal: s.kcal, hr: s.hr, hrmax: s.hrmax, asc: s.asc }));
  if (!out.length && rec.t0 != null) out.push({ start: new Date((rec.t0 + FE) * 1000), sport: rec.sport, sec: rec.t1 - rec.t0, m: rec.dist, hr: rec.hr.length ? Math.round(rec.hr.reduce((a, b) => a + b, 0) / rec.hr.length) : null });
  return out;
}
const hav = (a, b) => { const R = 6371000, r = Math.PI / 180, dLa = (b[0] - a[0]) * r, dLo = (b[1] - a[1]) * r, x = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const XSPORT = s => { s = String(s || '').toLowerCase(); return /run|course|9\b/.test(s) ? 'course' : /bik|cycl|ride|vélo|velo|1\b/.test(s) ? 'velo' : /swim|nata/.test(s) ? 'natation' : /walk|hik|marche|rando/.test(s) ? 'marche' : /weight|strength|muscu/.test(s) ? 'muscu' : /yoga/.test(s) ? 'mobilite' : null; };
function parseXML(txt) {
  const doc = new DOMParser().parseFromString(txt, 'application/xml'), q = (el, n) => [...el.getElementsByTagName('*')].filter(e => e.localName === n);
  const name = (q(doc, 'name')[0] || {}).textContent || '';
  if (q(doc, 'gpx').length || doc.documentElement.localName === 'gpx') {
    const pts = q(doc, 'trkpt').map(e => ({ ll: [+e.getAttribute('lat'), +e.getAttribute('lon')], ele: +((q(e, 'ele')[0] || {}).textContent || NaN), t: (q(e, 'time')[0] || {}).textContent, hr: +((q(e, 'hr')[0] || {}).textContent || NaN) })).filter(x => x.t);
    if (!pts.length) return [];
    let m = 0, asc = 0; for (let i = 1; i < pts.length; i++) { m += hav(pts[i - 1].ll, pts[i].ll); const d = pts[i].ele - pts[i - 1].ele; if (d > 0.5) asc += d; }
    const hr = pts.map(x => x.hr).filter(x => x > 0);
    return [{ start: new Date(pts[0].t), sec: (new Date(pts.at(-1).t) - new Date(pts[0].t)) / 1000, m, asc: Math.round(asc), hr: hr.length ? Math.round(hr.reduce((a, b) => a + b, 0) / hr.length) : null, xs: XSPORT((q(doc, 'type')[0] || {}).textContent) || XSPORT(name), name }];
  }
  return q(doc, 'Activity').map(a => {
    const laps = q(a, 'Lap'), num = (el, n) => +((q(el, n)[0] || {}).textContent || 0);
    const hrs = laps.map(l => +((q(l, 'AverageHeartRateBpm')[0] || { textContent: '' }).textContent.trim() || 0)).filter(Boolean);
    const alt = q(a, 'AltitudeMeters').map(e => +e.textContent); let asc = 0; for (let i = 1; i < alt.length; i++) { const d = alt[i] - alt[i - 1]; if (d > 0.5) asc += d; }
    return { start: new Date((q(a, 'Id')[0] || {}).textContent), sec: laps.reduce((s, l) => s + num(l, 'TotalTimeSeconds'), 0), m: laps.reduce((s, l) => s + num(l, 'DistanceMeters'), 0), kcal: laps.reduce((s, l) => s + num(l, 'Calories'), 0), hr: hrs.length ? Math.round(hrs.reduce((x, y) => x + y, 0) / hrs.length) : null, asc: Math.round(asc), xs: XSPORT(a.getAttribute('Sport')), name };
  }).filter(x => !isNaN(x.start));
}
// lecture d'un ZIP (export Garmin « original », archive Strava) sans tout charger en mémoire
async function* zipEntries(file) {
  const tailLen = Math.min(file.size, 66000), tail = new Uint8Array(await file.slice(file.size - tailLen).arrayBuffer()), tv = new DataView(tail.buffer);
  let e = -1; for (let i = tail.length - 22; i >= 0; i--) if (tv.getUint32(i, true) === 0x06054b50) { e = i; break; }
  if (e < 0) throw new Error('ZIP illisible');
  const n = tv.getUint16(e + 10, true), cdSize = tv.getUint32(e + 12, true), cdOff = tv.getUint32(e + 16, true);
  const cd = new Uint8Array(await file.slice(cdOff, cdOff + cdSize).arrayBuffer()), cv = new DataView(cd.buffer), dec = new TextDecoder();
  for (let i = 0, p = 0; i < n && p < cd.length; i++) {
    const method = cv.getUint16(p + 10, true), csize = cv.getUint32(p + 20, true), nl = cv.getUint16(p + 28, true), xl = cv.getUint16(p + 30, true), cl = cv.getUint16(p + 32, true), lo = cv.getUint32(p + 42, true);
    const name = dec.decode(cd.subarray(p + 46, p + 46 + nl)); p += 46 + nl + xl + cl;
    if (!/\.(fit|gpx|tcx)(\.gz)?$/i.test(name)) continue;
    const lh = new DataView(await file.slice(lo, lo + 30).arrayBuffer()), start = lo + 30 + lh.getUint16(26, true) + lh.getUint16(28, true);
    const raw = new Uint8Array(await file.slice(start, start + csize).arrayBuffer());
    yield { name, data: method === 8 ? await inflateRaw(raw) : raw };
  }
}
function toSession(a, src) {
  let sport = a.xs || (a.sport != null ? (a.sport === 10 && a.sub === 20 ? 'muscu' : FIT_SPORT[a.sport] || 'autre') : 'autre');
  const P = S.profile, hrmax = 220 - (+P.age || 35), pct = a.hr ? a.hr / hrmax : 0;
  const rpe = !pct ? 5 : pct < .6 ? 3 : pct < .7 ? 4 : pct < .78 ? 5 : pct < .85 ? 6 : pct < .9 ? 7 : 8;
  const sp = SPORTS[sport], s = { id: uid(), date: ymd(a.start), sport, nom: a.name || `${sp.nom} (${src})`, dur: Math.max(1, Math.round((a.sec || 0) / 60)), rpe, notes: '',
    ext: { src, start: a.start.toISOString().slice(0, 16), hr: a.hr || null, hrmax: a.hrmax || null, kcal: a.kcal || null } };
  if (sp.dist && a.m) s.dist = sp.dist === 'm' ? Math.round(a.m) : +(a.m / 1000).toFixed(2);
  if (sp.deniv && a.asc) s.deniv = Math.round(a.asc);
  return s;
}
async function importFiles(files) {
  const out = $('#impOut'); let added = 0, dup = 0, bad = 0, seen = 0;
  const known = new Set(S.sessions.filter(x => x.ext).map(x => x.ext.start + x.sport));
  const src = $('#impSrc') ? $('#impSrc').value : 'fichier';
  const take = (acts) => acts.forEach(a => { if (!a.start || isNaN(a.start) || !a.sec) return; const s = toSession(a, src), k = s.ext.start + s.sport; if (known.has(k)) { dup++; return; } known.add(k); S.sessions.push(s); if (!S.profile.sports.includes(s.sport)) S.profile.sports.push(s.sport); added++; });
  const one = async (name, data) => {
    seen++; if (out && seen % 10 === 0) out.innerHTML = `<div class="aiload"><i></i><i></i><i></i> ${seen} fichiers lus…</div>`;
    try {
      if (/\.gz$/i.test(name)) { data = await gunzip(data); name = name.replace(/\.gz$/i, ''); }
      if (/\.fit$/i.test(name)) take(parseFIT(data)); else take(parseXML(new TextDecoder().decode(data)));
    } catch (e) { bad++; }
  };
  if (out) out.innerHTML = '<div class="aiload"><i></i><i></i><i></i> Lecture des fichiers…</div>';
  for (const f of files) {
    try {
      if (/\.zip$/i.test(f.name)) { for await (const z of zipEntries(f)) await one(z.name, z.data); }
      else await one(f.name, new Uint8Array(await f.arrayBuffer()));
    } catch (e) { bad++; }
  }
  save(); render();
  const msg = `${added} activité${added > 1 ? 's' : ''} importée${added > 1 ? 's' : ''}${dup ? ` · ${dup} déjà présente${dup > 1 ? 's' : ''}` : ''}${bad ? ` · ${bad} fichier${bad > 1 ? 's' : ''} illisible${bad > 1 ? 's' : ''}` : ''}`;
  if (out) out.innerHTML = `<div class="tip">${added ? '✅' : 'ℹ️'} ${msg}</div>`; toast((added ? '⌚ ' : '') + msg, 3500); if (added) confetti(60);
}
function openConnect() {
  const imp = S.sessions.filter(x => x.ext), bySrc = s => imp.filter(x => x.ext.src === s).length;
  sheet(`<h2>⌚ Garmin & Strava</h2><p class="mu small">Importez vos activités : elles comptent dans vos statistiques, votre calendrier et la charge suivie par le coach.</p>
    <div class="card"><b>Importer des fichiers</b><p class="mu small" style="margin:6px 0 10px">Formats : .fit, .gpx, .tcx, .zip, .gz. Plusieurs fichiers ou une archive complète d’un coup.</p>
      <label class="f">Provenance</label><select class="in" id="impSrc"><option value="garmin">Garmin</option><option value="strava">Strava</option><option value="fichier">Autre (montre, appli…)</option></select>
      <label class="btn pri w" style="margin-top:12px">${ic('plus')}Choisir les fichiers<input type="file" multiple accept=".fit,.gpx,.tcx,.zip,.gz,application/zip,application/gzip,application/octet-stream" style="display:none" onchange="importFiles([...this.files]);this.value=''"></label>
      <div id="impOut" style="margin-top:10px"></div>
      ${imp.length ? `<p class="mu tiny" style="margin-top:8px">Déjà importées : ${imp.length} (Garmin ${bySrc('garmin')}, Strava ${bySrc('strava')}, autres ${bySrc('fichier')}). <a style="color:#fda4af" onclick="if(confirm('Supprimer les ${imp.length} activités importées ?')){S.sessions=S.sessions.filter(x=>!x.ext);save();closeSheet();render();toast('Activités importées supprimées')}">Tout supprimer</a></p>` : ''}</div>
    <details class="card"><summary><b>🟦 Depuis Garmin Connect</b></summary><ol class="small" style="padding-left:18px;line-height:1.6;margin-top:8px">
      <li><b>Une activité</b> : sur connect.garmin.com, ouvrez l’activité → ⚙️ → « Exporter l’original » (fichier .zip) puis importez-le ici.</li>
      <li><b>Tout l’historique</b> : sur votre compte Garmin, rubrique gestion des données → « Exporter vos données ». Vous recevez un lien par e-mail ; importez l’archive .zip ici.</li>
      <li><b>Astuce</b> : si votre montre synchronise déjà vers Strava, un seul export Strava suffit.</li></ol></details>
    <details class="card"><summary><b>🟧 Depuis Strava</b></summary><ol class="small" style="padding-left:18px;line-height:1.6;margin-top:8px">
      <li><b>Une activité</b> : sur strava.com (navigateur), ouvrez l’activité → menu « ⋯ » → « Exporter l’original » ou « Exporter GPX ».</li>
      <li><b>Tout l’historique</b> : Paramètres → Mon compte → « Télécharger ou supprimer votre compte » → « Demander votre archive ». Importez le .zip reçu par e-mail.</li></ol></details>
    <details class="card"><summary><b>Pourquoi pas une connexion automatique ?</b></summary><p class="small" style="line-height:1.55;margin-top:8px">ApexFit fonctionne sans serveur, et vos données restent sur votre téléphone. Une connexion directe Strava demande un serveur, un abonnement développeur, et les conditions de Strava interdisent d’utiliser ses données dans une IA. Garmin réserve son API complète aux entreprises ; l’accès personnel ouvert en 2026 n’est pas prévu pour une appli web sans serveur comme celle-ci. L’import de vos propres fichiers évite tout cela.</p></details>`);
}

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
  const name = `apexfit_${(S.profile.prenom || 'sauvegarde').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '_')}_${today()}.json`;
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
  try { window.history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
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
  const kcal = L.reduce((a, x) => a + kc(x), 0), stats = [[L.length, `séances · ${days} jours`], [hmin(min), 'd’entraînement'], [kcal ? '≈ ' + kcal.toLocaleString('fr-FR') : '—', 'kcal dépensées (est.)'], [km ? km.toFixed(km < 100 ? 1 : 0) + ' km' : '—', 'parcourus'], [pr, 'records battus'], [fav ? SPORTS[fav[0]].ic + ' ' + SPORTS[fav[0]].nom : '—', 'sport favori']];
  stats.forEach(([v, l], i) => { const x = 80 + (i % 2) * 470, y = 450 + Math.floor(i / 2) * 200; g.fillStyle = 'rgba(255,255,255,.06)'; g.beginPath(); g.roundRect ? g.roundRect(x, y, 440, 176, 28) : g.rect(x, y, 440, 176); g.fill();
    g.fillStyle = '#fff'; g.font = F(900, String(v).length > 10 ? 44 : 68); g.fillText(String(v), x + 32, y + 96); g.fillStyle = '#94a3b8'; g.font = F(700, 32); g.fillText(l, x + 32, y + 146); });
  const wk = [0, 0, 0, 0, 0]; L.forEach(x => { const i = Math.min(4, Math.floor((+x.date.slice(8) - 1) / 7)); wk[i] += +x.dur || 0; }); const mx = Math.max(60, ...wk);
  wk.forEach((v, i) => { const h = v / mx * 110, x = 100 + i * 190; g.fillStyle = v ? '#22c55e' : 'rgba(255,255,255,.1)'; g.fillRect(x, 1220 - h, 120, Math.max(6, h)); g.fillStyle = '#64748b'; g.font = F(700, 26); g.fillText('S' + (i + 1), x + 40, 1250); });
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

function vHome() {
  const w = weekStats(), goal = +S.profile.jours || 3, p = clamp(Math.round(w.days / goal * 100), 0, 100), prev = weekStats(-1);
  const delta = w.min - prev.min, nx = nextProgSession(), lastTest = S.tests.at(-1), r = readyToday(), tp = plannedMap().get(today());
  const doneToday = S.sessions.filter(x => x.date === today()), ph = phase();
  let h = homeBanner();
  // ---- carte unique « Aujourd'hui » : séance, forme du jour, douleurs, phase
  {
    const title = doneToday.length ? `✅ ${doneToday.length > 1 ? doneToday.length + ' séances faites' : 'Séance faite'} aujourd’hui` : nx ? (tp && tp.express ? '⏱ Aujourd’hui (journée chargée)' : tp ? '🔔 Séance prévue aujourd’hui' : 'Prochaine séance') : 'Aujourd’hui';
    const sub = doneToday.length ? doneToday.map(x => esc(x.nom || SPORTS[x.sport].nom)).join(' · ') + (streak() > 1 ? ` · 🔥 ${streak()} jours d’affilée` : '') : nx ? `${SPORTS[nx.s.sport].ic} ${esc(nx.s.nom)} · ${esc(sessDesc(nx.s))}` : 'Choisissez une séance ou un programme.';
    h += `<div class="card today"><div class="mu tiny" style="text-transform:uppercase;letter-spacing:.08em;font-weight:800">${title}</div><div style="font-size:16px;font-weight:700;margin-top:6px;line-height:1.35">${sub}</div>
      ${nx && !doneToday.length ? `<div class="pbar" style="margin:10px 0 4px"><i style="width:${Math.round(nx.done / nx.total * 100)}%"></i></div><div class="mu tiny">${esc(nx.p.nom)} · ${nx.done}/${nx.total} séances${ph ? ' · ' + PH[ph.k][0] + ' ' + PH[ph.k][1] : ''}</div>` : ''}
      <div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap"><button class="chipb ${r ? 'ok' : ''}" onclick="readyForm()">${r ? MODE[r.mode][0] + ' ' + MODE[r.mode][1] : '📝 Forme du jour'}</button>${activePain().length ? `<button class="chipb bad" onclick="painForm()">🩹 ${activePain().map(z => ZONES[z]).join(', ')}</button>` : ''}<button class="chipb" onclick="openCoach()">🤖 Coach</button></div>
      ${doneToday.length ? '' : `<div class="grid2" style="margin-top:12px">${nx ? `<button class="btn pri" onclick="startAdapted()">${ic('play')}${r && r.mode !== 'go' ? 'Séance adaptée' : 'Démarrer'}</button><button class="btn" onclick="startProgSession(1)">⏱ Express</button>` : `<button class="btn pri" onclick="plusMenu()">${ic('plus')}Nouvelle séance</button><button class="btn" onclick="go('programmes')">📋 Programmes</button>`}</div>`}</div>`;
  }
  // ---- semaine + défi du mois
  h += `<div class="card hero"><div class="row" style="position:relative;gap:16px">
    <div class="ring" style="--p:${p}"><div><b>${w.days}/${goal}</b><small>jours</small></div></div>
    <div style="flex:1"><div class="mu small">Cette semaine</div><div style="font-size:22px;font-weight:800;margin:2px 0">${w.n} séance${w.n > 1 ? 's' : ''} · ${hmin(w.min)}</div>
    <div class="mu small">${w.km ? w.km.toFixed(1) + ' km · ' : ''}${w.kcal ? '🔥 ' + kcTxt(w.kcal) + ' · ' : ''}${prev.min || w.min ? (delta >= 0 ? '▲ ' : '▼ ') + hmin(Math.abs(delta)) + ' vs sem. dernière' : 'Commencez votre semaine !'}</div></div></div>
    <canvas class="ch" id="weekChart" height="110" style="margin-top:12px;position:relative"></canvas>${challengeLine()}</div>`;
  // ---- rappels utiles uniquement (au plus 2)
  const alerts = [];
  if (S.event && ph) alerts.push(eventCard());
  const pp = planPrompt(); if (pp) alerts.push(pp);
  if (!lastTest && !S.skipTest) alerts.push(`<div class="card" style="border-color:rgba(245,158,11,.4)"><div class="row"><div class="em" style="font-size:28px">🧪</div><div style="flex:1"><b>Faites le test de capacités</b><div class="mu small">15–25 min pour un programme et des exercices adaptés à votre niveau.</div></div></div>
    <div class="grid2" style="margin-top:12px"><button class="btn pri" onclick="startTest()">${ic('test')}Commencer</button><button class="btn ghost" onclick="S.skipTest=true;save();render()">Plus tard</button></div></div>`);
  else if (retestDue()) alerts.push(`<div class="card row" onclick="startTest()" style="cursor:pointer"><div class="em" style="font-size:26px">🧪</div><div style="flex:1"><b>C’est l’heure du retest</b><div class="mu small">6 semaines depuis votre dernier test : mesurez vos progrès.</div></div>${ic('right')}</div>`);
  if (needBackup()) alerts.push(`<div class="card row" onclick="exportData()" style="cursor:pointer;border-color:rgba(56,189,248,.4)"><div class="em" style="font-size:26px">💾</div><div style="flex:1"><b>Pensez à sauvegarder</b><div class="mu small">${S.lastBackup ? 'Dernière sauvegarde il y a ' + daysSince(S.lastBackup) + ' jours.' : 'Aucune sauvegarde : un geste suffit (Fichiers, iCloud, AirDrop).'}</div></div>${ic('right')}</div>`);
  h += alerts.slice(0, 2).join('');
  h += `<h3 class="sec">Calendrier</h3><div class="card">${calendar()}</div>`;
  const last = [...S.sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  h += last.length ? `<h3 class="sec">Dernières séances <a onclick="go('sports')">Tout voir</a></h3>${last.map(sessRow).join('')}` : `<div class="card empty"><div class="e">🏁</div>Enregistrez une première séance avec le bouton <b>+</b>.</div>`;
  $('#view').innerHTML = h;
  weekChart();
}
function spCard(k) {
  const L = sessionsOf(k), m = new Date().getMonth(), y = new Date().getFullYear(), mo = L.filter(x => { const d = parseD(x.date); return d.getMonth() === m && d.getFullYear() === y; });
  const sp = SPORTS[k], extra = sp.dist ? `${mo.reduce((a, x) => a + distKm(x), 0).toFixed(1)} km` : hmin(mo.reduce((a, x) => a + (+x.dur || 0), 0));
  return `<button class="sp" style="--c:${sp.c}" onclick="go('sport',{sp:'${k}'})"><span class="e">${sp.ic}</span><span><b>${sp.nom}</b><br><small>${mo.length} ce mois · ${extra}</small></span></button>`;
}
function weekChart(k = 1) {
  const c = $('#weekChart'); if (!c) return; const W = c.width = c.clientWidth * 2, H = c.height = 240, x = c.getContext('2d'), a = monday(new Date());
  const days = [...Array(7)].map((_, i) => { const d = new Date(a); d.setDate(d.getDate() + i); return ymd(d); });
  const per = days.map(d => S.sessions.filter(s => s.date === d)), mx = Math.max(30, ...per.map(L => L.reduce((s, z) => s + (+z.dur || 0), 0)));
  const bw = W / 7, lab = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  per.forEach((L, i) => {
    let y = H - 40; const x0 = i * bw + bw * .22, w = bw * .56;
    x.fillStyle = 'rgba(255,255,255,.06)'; roundRect(x, x0, 16, w, H - 56, 12); x.fill();
    L.forEach(s => { const h = (+s.dur || 0) / mx * (H - 60) * k; x.fillStyle = SPORTS[s.sport].c; roundRect(x, x0, y - h, w, Math.max(h, 6), 10); x.fill(); y -= h; });
    x.fillStyle = days[i] === today() ? '#4ade80' : '#64708a'; x.font = '700 22px -apple-system,system-ui'; x.textAlign = 'center'; x.fillText(lab[i], x0 + w / 2, H - 8);
  });
}
function roundRect(x, a, b, w, h, r) { r = Math.min(r, w / 2, h / 2); x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
function calendar() {
  const y = calMonth.getFullYear(), m = calMonth.getMonth(), first = new Date(y, m, 1), start = monday(first), plan = plannedDays();
  let h = `<div class="cal-h"><button onclick="calMonth=new Date(${y},${m - 1},1);render()">${ic('left')}</button><b style="text-transform:capitalize">${first.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</b><button onclick="calMonth=new Date(${y},${m + 1},1);render()">${ic('right')}</button></div><div class="cal">`;
  h += ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => `<div class="dn">${d}</div>`).join('');
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(d.getDate() + i); const k = ymd(d), L = S.sessions.filter(s => s.date === k);
    if (i >= 35 && d.getMonth() !== m) break;
    h += `<div class="d${d.getMonth() !== m ? ' out' : ''}${k === today() ? ' today' : ''}${L.length ? ' act' : ''}${plan.has(k) && !L.length ? ' plan' : ''}${S.avail[k] ? ' av-' + S.avail[k] : ''}" onclick="openDay('${k}')"><span>${d.getDate()}</span><span class="dots">${[...new Set(L.map(s => s.sport))].map(s => `<i style="background:${SPORTS[s].c}"></i>`).join('')}</span></div>`;
  }
  const used = [...new Set(S.sessions.map(s => s.sport))];
  return h + `</div><div class="legend">${used.map(s => `<span><i style="background:${SPORTS[s].c}"></i>${SPORTS[s].nom}</span>`).join('')}${plan.size ? '<span><i style="border:1.5px solid var(--warn)"></i>Séance prévue</span>' : ''}${Object.keys(S.avail).length ? '<span><i style="background:#475569"></i>Indisponible</span><span>⏱ Peu de temps</span>' : ''}</div>`;
}
// jours prévus par le programme suivi (selon la fréquence, à partir d'aujourd'hui)
function defaultDays() { const p = S.prog && PROGRAMS.find(x => x.id === S.prog.id), f = p ? p.freq : (+S.profile.jours || 3); return { 2: [1, 4], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5], 7: [0, 1, 2, 3, 4, 5, 6] }[f] || [0, 2, 4]; }
// ---- planning de la semaine : jours préférés, indisponibilités, séances « express » les jours chargés
const pref = () => S.remind && S.remind.days.length ? S.remind.days : defaultDays();
const wantPerWeek = () => { const p = S.prog && PROGRAMS.find(x => x.id === S.prog.id); return p ? p.freq : (+S.profile.jours || 3); };
function weekDates(off) { const a = monday(new Date()); a.setDate(a.getDate() + 7 * off); return [...Array(7)].map((_, i) => { const d = new Date(a); d.setDate(d.getDate() + i); return ymd(d); }); }
function weekPlan(off = 0) {
  const days = weekDates(off), t = today(), hasSess = d => S.sessions.some(x => x.date === d);
  const done = off === 0 ? S.sessions.filter(x => days.includes(x.date)).length : 0, want = Math.max(0, wantPerWeek() - done);
  const cand = days.filter(d => d >= t && S.avail[d] !== 'off' && !hasSess(d)), P = pref(), chosen = [];
  cand.filter(d => P.includes((parseD(d).getDay() + 6) % 7)).forEach(d => { if (chosen.length < want) chosen.push(d); });
  while (chosen.length < want) { // compléter en espaçant au maximum les séances
    const rest = cand.filter(d => !chosen.includes(d)); if (!rest.length) break;
    const gap = d => Math.min(9, ...chosen.concat(days.filter(hasSess)).map(c => Math.abs(parseD(d) - parseD(c)) / 864e5));
    chosen.push(rest.sort((x, y) => gap(y) - gap(x) || (S.avail[x] === 'court') - (S.avail[y] === 'court'))[0]);
  }
  chosen.sort();
  // séances du programme dans l'ordre (la semaine suivante reprend après celles de cette semaine)
  let queue = [];
  if (S.prog) { const p = PROGRAMS.find(x => x.id === S.prog.id); if (p) queue = progSessions(p).filter(x => !S.prog.done.includes(x.key)); }
  const skip = off === 1 ? weekPlan(0).items.length : 0;
  const items = chosen.map((d, i) => { const base = queue[skip + i]; let s = base ? personalize(JSON.parse(JSON.stringify(base))) : null; const ex = S.avail[d] === 'court'; if (s && ex) s = express(s); return { date: d, s, express: ex }; });
  return { days, items, want, missing: Math.max(0, want - chosen.length), done };
}
function plannedMap() {
  const m = new Map(); [0, 1].forEach(o => weekPlan(o).items.forEach(it => m.set(it.date, it)));
  if (S.prog || (S.remind && S.remind.days.length)) for (let w = 2; w < 6; w++) weekDates(w).forEach(d => { if (pref().includes((parseD(d).getDay() + 6) % 7) && S.avail[d] !== 'off') m.set(d, { date: d }); });
  return m;
}
function plannedDays() { return new Set(plannedMap().keys()); }
// version courte d'une séance : 4 exercices maximum, une série de moins, cardio raccourci
function express(s) {
  const x = JSON.parse(JSON.stringify(s)); x.express = true; x.nom = x.nom + ' · express';
  if (x.items) x.items = x.items.slice(0, 4).map(it => typeof it.sets === 'number' ? { ...it, sets: Math.max(2, it.sets - 1) } : it);
  if (x.blocks) x.blocks = x.blocks.map(b => /corps/i.test(b.t) ? { ...b, d: b.d + ' — version courte : environ la moitié' } : b);
  return x;
}
const AV = { ok: ['✅', 'Disponible'], court: ['⏱', 'Peu de temps'], off: ['❌', 'Indisponible'] };
function setAvail(d, v) { if (v === 'ok') delete S.avail[d]; else S.avail[d] = v; save(); }
let planOff = 0;
function openPlanner(off) {
  if (off != null) planOff = off; const P = weekPlan(planOff), ws = P.days[0], t = today();
  const lab = d => parseD(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
  const plan = new Map(P.items.map(i => [i.date, i]));
  let h = `<h2>📅 Planifier ${planOff ? 'la semaine prochaine' : 'cette semaine'}</h2><p class="mu small">Indiquez les jours où vous avez quelque chose de prévu : vos ${P.want + P.done} séances sont réparties sur les autres jours, en version express les jours chargés.</p>
    <div class="seg"><button class="${planOff === 0 ? 'on' : ''}" onclick="openPlanner(0)">Cette semaine</button><button class="${planOff === 1 ? 'on' : ''}" onclick="openPlanner(1)">Semaine prochaine</button></div>`;
  h += P.days.map(d => { const past = d < t, v = S.avail[d] || 'ok', it = plan.get(d), did = S.sessions.filter(x => x.date === d);
    return `<div class="dayrow ${past ? 'past' : ''} ${v}"><div class="dl"><b style="text-transform:capitalize">${lab(d)}</b><small>${did.length ? '✓ ' + did.map(x => esc(x.nom || SPORTS[x.sport].nom)).join(', ') : it ? `${it.express ? '⏱ ' : '💪 '}${it.s ? esc(it.s.nom) : 'Séance prévue'}` : past ? '' : v === 'off' ? 'Pas d’entraînement' : 'Repos'}</small></div>
      ${past ? '' : `<div class="avb">${Object.entries(AV).map(([k, [e, l]]) => `<button class="${v === k ? 'on ' + k : ''}" title="${l}" onclick="setAvail('${d}','${k}');openPlanner()">${e}</button>`).join('')}</div>`}</div>`; }).join('');
  if (P.missing) h += `<div class="tip" style="border-color:rgba(245,158,11,.4);background:rgba(245,158,11,.08);color:#fde68a">⚠️ ${P.missing} séance${P.missing > 1 ? 's' : ''} ne rentre${P.missing > 1 ? 'nt' : ''} pas cette semaine : ${S.prog ? 'le programme reprendra là où vous en êtes, sans rien sauter.' : 'pas de souci, gardez le rythme la semaine suivante.'} Astuce : marquez un jour chargé « ⏱ Peu de temps » plutôt que « ❌ » pour faire une séance express.</div>`;
  else h += `<div class="tip">✅ Semaine prête : ${P.items.length} séance${P.items.length > 1 ? 's' : ''} prévue${P.items.length > 1 ? 's' : ''}${P.items.some(i => i.express) ? ', dont des versions express les jours chargés' : ''}.</div>`;
  h += `<p class="mu tiny" style="margin-top:10px">✅ disponible · ⏱ peu de temps (séance express) · ❌ indisponible</p>
    <button class="btn pri w" style="margin-top:8px" onclick="S.weekOk['${ws}']=1;save();closeSheet();render();toast('Semaine planifiée 📅')">Valider ma semaine</button>`;
  const sh = $('#sheetBg .sheet'); if (sh) { sh.innerHTML = '<div class="grab"></div>' + h; } else sheet(h);
}
// carte « planifiez votre semaine » : le week-end pour la semaine suivante, le lundi pour la semaine en cours
function planPrompt() {
  const d = new Date().getDay(), off = d === 6 || d === 0 ? 1 : d === 1 ? 0 : null; if (off == null) return '';
  const ws = weekDates(off)[0]; if (S.weekOk[ws]) return '';
  return `<div class="card plancard"><div class="row"><div class="em" style="font-size:28px">📅</div><div style="flex:1"><b>Planifiez ${off ? 'la semaine prochaine' : 'votre semaine'}</b><div class="mu small">Des choses de prévu ? Indiquez vos indisponibilités, l’entraînement s’adapte.</div></div></div>
    <div class="grid2" style="margin-top:12px"><button class="btn pri" onclick="openPlanner(${off})">Planifier</button><button class="btn ghost" onclick="S.weekOk['${ws}']=1;save();render()">Semaine normale</button></div></div>`;
}
function sessDesc(s) { return s.items ? s.items.slice(0, 4).map(mvName).join(' · ') + (s.items.length > 4 ? ' …' : '') : (s.blocks || []).map(b => b.d).join(' · ').slice(0, 90); }
function sessRow(s) {
  const sp = SPORTS[s.sport], info = [s.dur ? hmin(s.dur) : '', s.dist ? (sp.dist === 'm' ? s.dist + ' m' : (+s.dist).toFixed(2) + ' km') : '', s.items ? s.items.length + ' exos' : '', s.rpe ? 'RPE ' + s.rpe : '', kc(s) ? '🔥 ' + kc(s) : ''].filter(Boolean).join(' · ');
  return `<button class="li" onclick="openSession('${s.id}')"><span class="em" style="background:${sp.c}22">${sp.ic}</span><span class="t"><b>${esc(s.nom || sp.nom)}</b><small>${fmtDate(s.date, { weekday: 'short', day: 'numeric', month: 'short' })} · ${info}</small></span><span class="chev">${ic('right')}</span></button>`;
}
function openDay(k) {
  const L = S.sessions.filter(s => s.date === k);
  const v = S.avail[k] || 'ok', pl = plannedMap().get(k);
  sheet(`<h2 style="text-transform:capitalize">${fmtDate(k)}</h2><p class="mu small">${L.length ? L.length + ' séance(s)' : pl ? (pl.express ? '⏱ Séance express prévue' : '💪 Séance prévue') + (pl.s ? ' : ' + esc(pl.s.nom) : '') : 'Aucune séance ce jour-là.'}</p>${L.map(sessRow).join('')}
    ${k >= today() ? `<label class="f">Ce jour-là, je suis…</label><div class="seg" style="margin-top:6px">${Object.entries(AV).map(([x, [e, l]]) => `<button class="${v === x ? 'on' : ''}" onclick="setAvail('${k}','${x}');openDay('${k}');render()">${e} ${l}</button>`).join('')}</div>` : ''}
    <button class="btn pri w" style="margin-top:14px" onclick="closeSheet();logForm(null,'${k}')">${ic('plus')}Ajouter une séance ce jour</button>`);
}
function openSession(id) {
  const s = S.sessions.find(x => x.id === id); if (!s) return; const sp = SPORTS[s.sport];
  let h = `<h2>${sp.ic} ${esc(s.nom || sp.nom)}</h2><p class="mu small" style="text-transform:capitalize">${fmtDate(s.date)}</p><div class="grid3" style="margin-top:10px">
    <div class="kpi"><div class="l">Durée</div><div class="v">${s.dur ? hmin(s.dur) : '—'}</div></div>
    <div class="kpi"><div class="l">${s.items ? 'Volume' : 'Distance'}</div><div class="v">${s.items ? Math.round(volKg(s)) + '<small> kg</small>' : s.dist ? (sp.dist === 'm' ? s.dist + '<small> m</small>' : (+s.dist).toFixed(2) + '<small> km</small>') : '—'}</div></div>
    <div class="kpi"><div class="l">Ressenti</div><div class="v">${s.rpe ? s.rpe + '<small>/10</small>' : '—'}</div></div></div>`;
  { const K = kcalOf(s); if (K) h += `<p class="mu small" style="margin-top:8px" onclick="kcalInfo()">🔥 Dépense : <b style="color:var(--tx)">${kcTxt(K.k)}</b> ${K.src ? '(mesurée par la montre)' : `(estimation · MET ${String(K.met).replace('.', ',')} · ${K.kg} kg${K.est ? ' par défaut' : ''})`} <span style="color:var(--ac2)">ⓘ</span></p>`; }
  if (s.sport === 'course' && s.dist && s.dur) h += `<p class="mu small">Allure moyenne : <b style="color:var(--tx)">${pace(s.dur / s.dist)}/km</b>${s.deniv ? ' · D+ ' + s.deniv + ' m' : ''}</p>`;
  if (s.items) h += s.items.map(it => `<div class="kpi" style="margin-top:8px"><b>${esc(mvName(it))}</b><div class="mu small" style="margin-top:4px">${it.sets.filter(z => z.done).map(z => z.sec ? z.sec + ' s' : (z.reps || 0) + (z.kg ? ' × ' + z.kg + ' kg' : ' reps')).join(' · ') || 'Aucune série validée'}</div></div>`).join('');
  if (s.blocks) h += s.blocks.map(b => `<div class="kpi" style="margin-top:8px"><b>${esc(b.t)}</b><div class="mu small">${esc(b.d)}</div></div>`).join('');
  if (s.notes) h += `<p class="small" style="margin-top:10px">📝 ${esc(s.notes)}</p>`;
  h += `<div class="grid2" style="margin-top:14px"><button class="btn" onclick="saveAsTemplate('${s.id}')">${ic('save')}Séance type</button><button class="btn" onclick="replay('${s.id}')">${ic('play')}Refaire</button></div>
    <button class="btn dan w" style="margin-top:8px" onclick="if(confirm('Supprimer cette séance ?')){S.sessions=S.sessions.filter(x=>x.id!=='${s.id}');save();closeSheet();render();toast('Séance supprimée')}">${ic('trash')}Supprimer</button>`;
  sheet(h);
}
const pace = minPerKm => { const s = Math.round(minPerKm * 60); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };

// ===================== FEUILLES =====================
function sheet(html) { closeSheet(); const b = document.createElement('div'); b.className = 'sheet-bg'; b.id = 'sheetBg'; b.innerHTML = `<div class="sheet"><div class="grab"></div>${html}</div>`; b.addEventListener('click', e => { if (e.target === b) closeSheet(); }); document.body.appendChild(b); swipeClose(b.firstChild); }
function closeSheet() { const b = $('#sheetBg'); if (b) b.remove(); }
function swipeClose(sh) {
  let y0 = null, dy = 0;
  sh.addEventListener('touchstart', e => { if (sh.scrollTop > 0) return; y0 = e.touches[0].clientY; dy = 0; sh.style.transition = 'none'; }, { passive: true });
  sh.addEventListener('touchmove', e => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); if (dy > 0) sh.style.transform = `translateY(${dy}px)`; }, { passive: true });
  sh.addEventListener('touchend', () => { if (y0 == null) return; y0 = null; sh.style.transition = 'transform .25s ease';
    if (dy > 110) { sh.style.transform = 'translateY(100%)'; haptic(10); setTimeout(closeSheet, 200); } else sh.style.transform = ''; });
}

// ===================== PAGE SPORTS =====================
function vSports() {
  const P = practiced(), others = Object.keys(SPORTS).filter(k => !P.includes(k));
  $('#view').innerHTML = `<h1 class="vt">Mes sports</h1>${P.length ? `<div class="sports">${P.map(spCard).join('')}</div>` : '<div class="card empty"><div class="e">🏁</div>Aucun sport encore. Choisissez-en un ci-dessous.</div>'}
    <h3 class="sec">${P.length ? 'Autres sports' : 'Tous les sports'}</h3><div class="sports">${others.map(k => `<button class="sp off" style="--c:${SPORTS[k].c}" onclick="addSport('${k}')"><span class="e">${SPORTS[k].ic}</span><span><b>${SPORTS[k].nom}</b><br><small>+ Ajouter</small></span></button>`).join('')}</div>`;
}
function addSport(k) { if (!S.profile.sports.includes(k)) S.profile.sports.push(k); save(); go('sport', { sp: k }); }

// ===================== PAGE D'UN SPORT =====================
let spTab = 'suivi', libQ = '', libG = 'Tous';
function vSport() {
  const k = route.sp, sp = SPORTS[k], L = sessionsOf(k).sort((a, b) => b.date.localeCompare(a.date)), tpl = S.templates.filter(t => t.sport === k);
  const nLib = LIB.filter(m => m.s === k || (k === 'marche' && m.s === 'marche')).length;
  let h = `<div class="grid2"><button class="btn pri" onclick="startPicker('${k}')">${ic('play')}Démarrer</button><button class="btn" onclick="logForm('${k}')">${ic('plus')}Enregistrer</button></div>
    <div class="seg">${[['suivi', 'Suivi'], ['lib', `Mouvements (${nLib})`], ['tpl', `Séances types (${tpl.length})`]].map(([t, l]) => `<button class="${spTab === t ? 'on' : ''}" onclick="spTab='${t}';render()">${l}</button>`).join('')}</div>`;
  if (spTab === 'suivi') {
    const tot = L.reduce((a, x) => a + (+x.dur || 0), 0), km = L.reduce((a, x) => a + distKm(x), 0);
    h += `<div class="grid3"><div class="kpi"><div class="l">Séances</div><div class="v">${L.length}</div></div><div class="kpi"><div class="l">Temps</div><div class="v" style="font-size:20px">${hmin(tot)}</div></div>
      <div class="kpi"><div class="l">${sp.dist ? 'Distance' : sp.kind === 'force' ? 'Volume' : 'Ressenti moy.'}</div><div class="v" style="font-size:20px">${sp.dist ? km.toFixed(1) + '<small> km</small>' : sp.kind === 'force' ? Math.round(L.reduce((a, x) => a + volKg(x), 0) / 1000 * 10) / 10 + '<small> t</small>' : avgRpe(L)}</div></div></div>`;
    h += records(k, L);
    h += `<h3 class="sec">Évolution</h3><div class="card">${k === 'muscu' ? exoPicker(L) : ''}<canvas class="ch" id="spChart" height="200"></canvas><div class="mu tiny" id="spChartL"></div></div>`;
    h += `<h3 class="sec">Historique</h3>${L.length ? L.slice(0, 40).map(sessRow).join('') : `<div class="card empty"><div class="e">${sp.ic}</div>Pas encore de séance de ${sp.nom.toLowerCase()}.</div>`}`;
  } else if (spTab === 'lib') h += libView(k);
  else h += tplView(k, tpl);
  $('#view').innerHTML = h;
  if (spTab === 'suivi') spChart(k, L);
}
const avgRpe = L => { const r = L.filter(x => x.rpe); return r.length ? (r.reduce((a, x) => a + +x.rpe, 0) / r.length).toFixed(1) + '<small>/10</small>' : '—'; };
function records(k, L) {
  const sp = SPORTS[k]; if (!L.length) return '';
  const R = [];
  if (sp.dist) {
    const lg = L.reduce((a, x) => distKm(x) > distKm(a) ? x : a, L[0]); R.push(['Plus longue', sp.dist === 'm' ? lg.dist + ' m' : distKm(lg).toFixed(2) + ' km', lg.date]);
    if (k === 'course') { const r = L.filter(x => x.dist >= 3 && x.dur); if (r.length) { const b = r.reduce((a, x) => x.dur / x.dist < a.dur / a.dist ? x : a); R.push(['Meilleure allure (≥ 3 km)', pace(b.dur / b.dist) + '/km', b.date]); } }
    const dp = L.reduce((a, x) => (+x.deniv || 0) > (+a.deniv || 0) ? x : a, L[0]); if (dp.deniv) R.push(['Plus gros D+', dp.deniv + ' m', dp.date]);
  } else if (sp.kind === 'force') {
    const best = {}; L.forEach(x => (x.items || []).forEach(it => it.sets.filter(z => z.done && z.kg && z.reps).forEach(z => { const v = e1rm(+z.kg, +z.reps); if (!best[it.mv] || v > best[it.mv].v) best[it.mv] = { v, z, d: x.date, n: mvName(it) }; })));
    Object.values(best).sort((a, b) => b.v - a.v).slice(0, 4).forEach(b => R.push([b.n, `${b.z.reps} × ${b.z.kg} kg <small class="mu">(1RM ≈ ${Math.round(b.v)} kg)</small>`, b.d]));
    const lg = L.reduce((a, x) => (+x.dur || 0) > (+a.dur || 0) ? x : a, L[0]); if (!R.length && lg.dur) R.push(['Plus longue séance', hmin(lg.dur), lg.date]);
  }
  return R.length ? `<h3 class="sec">Records</h3><div class="card">${R.map(([a, b, d]) => `<div class="row" style="justify-content:space-between;padding:6px 0"><span class="mu small">🏅 ${esc(a)}</span><span style="text-align:right"><b>${b}</b><br><small class="mu tiny">${fmtDate(d, { day: 'numeric', month: 'short' })}</small></span></div>`).join('')}</div>` : '';
}
let chartExo = null;
function exoPicker(L) {
  const ids = [...new Set(L.flatMap(x => (x.items || []).filter(it => it.sets.some(z => z.done && z.kg)).map(it => it.mv)))];
  if (!ids.length) return ''; if (!ids.includes(chartExo)) chartExo = ids[0];
  return `<div class="chips" style="margin-bottom:10px">${ids.map(id => `<button class="chip ${id === chartExo ? 'on' : ''}" onclick="chartExo='${id}';render()">${esc(mvName({ mv: id }))}</button>`).join('')}</div>`;
}
function spChart(k, L) {
  const c = $('#spChart'); if (!c) return; const sp = SPORTS[k]; let pts = [], lab = '';
  if (k === 'muscu' && chartExo) {
    pts = [...L].reverse().map(x => { const it = (x.items || []).find(i => i.mv === chartExo); if (!it) return null; const v = Math.max(0, ...it.sets.filter(z => z.done && z.kg).map(z => e1rm(+z.kg, +z.reps || 1))); return v ? [x.date, v] : null; }).filter(Boolean);
    lab = '1RM estimé (kg) — formule d’Epley, par séance';
  } else { // par semaine sur 12 semaines
    const a = monday(new Date()); a.setDate(a.getDate() - 77);
    for (let w = 0; w < 12; w++) { const s0 = new Date(a); s0.setDate(s0.getDate() + w * 7); const s1 = new Date(s0); s1.setDate(s1.getDate() + 7); const W = L.filter(x => { const d = parseD(x.date); return d >= s0 && d < s1; }); pts.push([ymd(s0), sp.dist ? W.reduce((s, x) => s + distKm(x), 0) : W.reduce((s, x) => s + (+x.dur || 0), 0)]); }
    lab = sp.dist ? 'Kilomètres par semaine (12 dernières semaines)' : 'Minutes par semaine (12 dernières semaines)';
  }
  $('#spChartL').textContent = lab; drawLine(c, pts, sp.c, !(k === 'muscu' && chartExo));
}
function drawLine(c, pts, col, bars, zoom) {
  const W = c.width = c.clientWidth * 2, H = c.height = 400, x = c.getContext('2d'), P = 60; x.clearRect(0, 0, W, H);
  if (!pts.length) { x.fillStyle = '#64708a'; x.font = '26px system-ui'; x.textAlign = 'center'; x.fillText('Pas encore assez de données', W / 2, H / 2); return; }
  const lo = zoom ? Math.min(...pts.map(p => p[1])) - 1 : 0, mx0 = Math.max(1, ...pts.map(p => p[1])), mx = zoom ? mx0 + 1 - lo : mx0 * 1.15, n = pts.length, X = i => P + (n === 1 ? (W - P - 20) / 2 : i * (W - P - 20) / (n - 1)), Y = v => H - 40 - (v - lo) / mx * (H - 70);
  x.strokeStyle = 'rgba(255,255,255,.06)'; x.fillStyle = '#64708a'; x.font = '20px system-ui'; x.textAlign = 'right';
  for (let k = 0; k <= 3; k++) { const v = lo + mx * k / 3; x.beginPath(); x.moveTo(P, Y(v)); x.lineTo(W - 10, Y(v)); x.stroke(); x.fillText(v >= 100 ? Math.round(v) : v.toFixed(1), P - 8, Y(v) + 7); }
  x.textAlign = 'center'; pts.forEach((p, i) => { if (n <= 8 || i % Math.ceil(n / 6) === 0) x.fillText(parseD(p[0]).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }), X(i), H - 10); });
  if (bars) { const bw = Math.min(46, (W - P) / n * .6); pts.forEach((p, i) => { x.fillStyle = col; x.globalAlpha = p[0] >= ymd(monday(new Date())) ? 1 : .55; roundRect(x, X(i) - bw / 2, Y(p[1]), bw, Math.max(4, H - 40 - Y(p[1])), 8); x.fill(); }); x.globalAlpha = 1; return; }
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, col + '66'); g.addColorStop(1, col + '00');
  x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(X(i), Y(p[1])) : x.moveTo(X(i), Y(p[1]))); x.lineTo(X(n - 1), H - 40); x.lineTo(X(0), H - 40); x.fillStyle = g; x.fill();
  x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(X(i), Y(p[1])) : x.moveTo(X(i), Y(p[1]))); x.strokeStyle = col; x.lineWidth = 5; x.stroke();
  pts.forEach((p, i) => { x.beginPath(); x.arc(X(i), Y(p[1]), 7, 0, 7); x.fillStyle = col; x.fill(); });
}

// ---- Bibliothèque de mouvements
function libView(k) {
  const all = LIB.filter(m => m.s === k), groups = ['Tous', ...new Set(all.map(m => m.g))];
  if (!groups.includes(libG)) libG = 'Tous';
  const q = libQ.toLowerCase(), L = all.filter(m => (libG === 'Tous' || m.g === libG) && (!q || (m.n + m.mu + m.g).toLowerCase().includes(q)));
  if (!all.length) return `<div class="card empty"><div class="e">📚</div>Pour ce sport, ajoutez librement vos activités avec « Enregistrer ».</div>`;
  return `<input class="in" placeholder="Rechercher un mouvement, un muscle…" value="${esc(libQ)}" oninput="libQ=this.value;const p=this.selectionStart;render();const i=$('.in');i.focus();i.setSelectionRange(p,p)">
    <div class="chips" style="margin:10px 0">${groups.map(g => `<button class="chip ${g === libG ? 'on' : ''}" onclick="libG='${esc(g)}';render()">${esc(g)}</button>`).join('')}</div>
    ${L.map(m => `<button class="li" onclick="openMv('${m.id}')">${mvImg(m.id, 'thumb') || `<span class="em">${SPORTS[m.s].ic}</span>`}<span class="t"><b>${esc(m.n)}</b><small>${esc(m.mu)} · ${esc(m.mat)}</small></span>${lvl(m.niv)}</button>`).join('') || '<div class="empty">Aucun résultat</div>'}`;
}
const lvl = n => `<span class="lvl" title="Niveau ${n}/3">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
function openMv(id, fromLive) {
  const m = mvById(id); if (!m) return;
  sheet(`${mvImg(m.id, 'big')}${IMG[m.id] && IMG[m.id][1] > 1 ? '<div class="mu tiny" style="text-align:center;margin:-4px 0 8px">Position de départ ↔ position d’arrivée</div>' : ''}
    <div class="mu tiny" style="text-transform:uppercase;letter-spacing:.08em;font-weight:800">${SPORTS[m.s].nom} · ${esc(m.g)}</div><h2>${esc(m.n)}</h2>
    <div class="row" style="flex-wrap:wrap;gap:6px;margin:8px 0"><span class="pill">💪 ${esc(m.mu)}</span><span class="pill">🧰 ${esc(m.mat)}</span><span class="pill">Niveau ${lvl(m.niv)}</span>${m.dose ? `<span class="pill ok">⏱ ${esc(m.dose)}</span>` : ''}</div>
    <h3 class="sec" style="margin-top:14px">Exécution</h3><ol class="how">${m.how.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
    <h3 class="sec">Erreurs fréquentes</h3><ul class="err">${m.err.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    ${m.tip ? `<div class="tip">💡 ${esc(m.tip)}</div>` : ''}
    <a class="btn w" style="margin-top:14px;text-decoration:none" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(m.n + ' technique exécution')}">${ic('play')}Voir des vidéos de démonstration</a>
    ${fromLive ? '' : `<button class="btn pri w" style="margin-top:8px" onclick="closeSheet();quickStart('${m.s}','${m.id}')">${ic('plus')}Faire une séance avec ce mouvement</button>`}`);
}

// ---- Séances types
function tplView(k, tpl) {
  return `<button class="btn w" onclick="startLive({sport:'${k}',nom:'Nouvelle séance type',items:${SPORTS[k].kind === 'cardio' ? 'null' : '[]'},blocks:${SPORTS[k].kind === 'cardio' ? "[{t:'Échauffement',d:'10 min'},{t:'Corps de séance',d:''},{t:'Retour au calme',d:'5 min'}]" : 'null'}},{tplMode:true})">${ic('plus')}Créer une séance type</button>
    <p class="mu small" style="margin:10px 4px">Astuce : après chaque séance, cochez « Enregistrer comme séance type » pour la refaire en un geste.</p>
    ${tpl.length ? tpl.map(t => `<div class="li" style="cursor:default"><span class="em">${SPORTS[t.sport].ic}</span><span class="t"><b>${esc(t.nom)}</b><small>${esc(sessDesc(t))}</small></span>
      <button class="btn sm" onclick="shareTpl('${t.id}')" aria-label="Partager">🔗</button><button class="btn sm pri" onclick="startTpl('${t.id}')">${ic('play')}</button><button class="btn sm" onclick="if(confirm('Supprimer la séance type ?')){S.templates=S.templates.filter(x=>x.id!=='${t.id}');save();render()}">${ic('trash')}</button></div>`).join('') : '<div class="card empty"><div class="e">💾</div>Aucune séance type pour l’instant.</div>'}`;
}
function startTpl(id) { const t = S.templates.find(x => x.id === id); if (t) startLive(JSON.parse(JSON.stringify(t)), { src: { type: 'tpl', id } }); }
function saveAsTemplate(id) {
  const s = S.sessions.find(x => x.id === id); const nom = prompt('Nom de la séance type :', s.nom || SPORTS[s.sport].nom); if (!nom) return;
  S.templates.push(toTemplate(s, nom)); save(); toast('Séance type enregistrée 💾'); closeSheet();
}
function toTemplate(s, nom) {
  return { id: uid(), sport: s.sport, nom, items: s.items ? s.items.map(it => ({ mv: it.mv, n: it.n, rest: it.rest || 90, sets: it.sets.map(z => ({ reps: z.reps, kg: z.kg, sec: z.sec })) })) : null, blocks: s.blocks ? s.blocks.map(b => ({ t: b.t, d: b.d })) : null, dist: s.dist || null };
}
function replay(id) { const s = S.sessions.find(x => x.id === id); closeSheet(); startLive(toTemplate(s, s.nom || SPORTS[s.sport].nom)); }

// ===================== + : DÉMARRER / ENREGISTRER =====================
function plusMenu() {
  sheet(`<h2>Nouvelle séance</h2><p class="mu small">Que voulez-vous faire ?</p>
    ${nextProgSession() ? `<button class="li" onclick="closeSheet();startProgSession()"><span class="em">📋</span><span class="t"><b>Séance du programme</b><small>${esc(nextProgSession().s.nom)}</small></span>${ic('right')}</button>` : ''}
    <button class="li" onclick="startPicker()"><span class="em">▶️</span><span class="t"><b>Démarrer une séance</b><small>Chrono, séries, minuteur de repos</small></span>${ic('right')}</button>
    <button class="li" onclick="quickLog()"><span class="em">🎙️</span><span class="t"><b>Raconter sa séance</b><small>Dictée ou texte : « squat 3 séries de 10 »</small></span>${ic('right')}</button>
    <button class="li" onclick="closeSheet();logForm()"><span class="em">✍️</span><span class="t"><b>Enregistrer une séance faite</b><small>Course, vélo, natation, autre…</small></span>${ic('right')}</button>
    <button class="li" onclick="closeSheet();startTest()"><span class="em">🧪</span><span class="t"><b>Test de capacités</b><small>Évaluer son niveau et recevoir un programme</small></span>${ic('right')}</button>`);
}
function startPicker(k) {
  if (!k) return sheet(`<h2>Quel sport ?</h2><div class="sports" style="margin-top:12px">${Object.keys(SPORTS).map(s => `<button class="sp" style="--c:${SPORTS[s].c}" onclick="startPicker('${s}')"><span class="e">${SPORTS[s].ic}</span><b>${SPORTS[s].nom}</b></button>`).join('')}</div>`);
  const tpl = S.templates.filter(t => t.sport === k), sp = SPORTS[k];
  const ready = READY = PROGRAMS.flatMap(p => (p.seances || []).filter(s => s.sport === k).map(s => ({ s, p })));
  sheet(`<h2>${sp.ic} ${sp.nom}</h2>
    <button class="li" onclick="closeSheet();startLive({sport:'${k}',nom:'${esc(sp.nom)}',items:${sp.kind === 'cardio' ? 'null' : '[]'},blocks:${sp.kind === 'cardio' ? '[]' : 'null'}})"><span class="em">✨</span><span class="t"><b>Séance libre</b><small>${sp.kind === 'cardio' ? 'Chrono puis distance' : 'Ajoutez vos exercices au fur et à mesure'}</small></span>${ic('right')}</button>
    ${tpl.length ? `<h3 class="sec">Mes séances types</h3>${tpl.map(t => `<button class="li" onclick="closeSheet();startTpl('${t.id}')"><span class="em">💾</span><span class="t"><b>${esc(t.nom)}</b><small>${esc(sessDesc(t))}</small></span>${ic('play')}</button>`).join('')}` : ''}
    ${ready.length ? `<h3 class="sec">Séances prêtes</h3>${ready.slice(0, 8).map(({ s, p }, i) => `<button class="li" onclick="closeSheet();startReady(${i})"><span class="em">${p.ic}</span><span class="t"><b>${esc(s.nom)}</b><small>${esc(p.nom)}</small></span>${ic('play')}</button>`).join('')}` : ''}`);
}
let READY = [];
function startReady(i) { const r = READY[i]; if (r) startLive(personalize(JSON.parse(JSON.stringify(r.s)))); }
function quickStart(sport, mv) { startLive({ sport, nom: mvById(mv).n, items: SPORTS[sport].kind === 'cardio' ? null : [newItem(mv)], blocks: SPORTS[sport].kind === 'cardio' ? [{ t: mvById(mv).n, d: mvById(mv).dose || '' }] : null }); }
function newItem(mv) { const it = newItem0(mv); if (L && !L.tplMode) applySuggestions([it]); return it; }
function newItem0(mv) {
  const m = mvById(mv), timed = m && /(\d+)\s*s\b|min/.test(m.dose || '') && /gainage|Postures|Hanches|Dos|Jambes|Cardio|Gainage/.test(m.g) && !/rep/.test(m.dose);
  const last = lastPerf(mv);
  if (last) return { mv, rest: 90, sets: last.sets.map(z => ({ reps: z.reps, kg: z.kg, sec: z.sec })) };
  return { mv, rest: timed ? 30 : 90, sets: [1, 2, 3].map(() => timed ? { sec: 30 } : { reps: 10, kg: '' }) };
}
function lastPerf(mv) { for (const s of [...S.sessions].sort((a, b) => b.date.localeCompare(a.date))) { const it = (s.items || []).find(i => i.mv === mv && i.sets.some(z => z.done)); if (it) return { date: s.date, sets: it.sets.filter(z => z.done) }; } return null; }

// ---- formulaire d'enregistrement rapide
function logForm(k, date) {
  const sports = Object.keys(SPORTS), sp = k || (practiced()[0] || 'course');
  sheet(`<h2>Enregistrer une séance</h2><label class="f">Sport<select class="in" id="lfS" onchange="lfFields()">${sports.map(s => `<option value="${s}" ${s === sp ? 'selected' : ''}>${SPORTS[s].ic} ${SPORTS[s].nom}</option>`).join('')}</select></label>
    <div class="grid2"><label class="f">Date<input class="in" type="date" id="lfD" value="${date || today()}"></label><label class="f">Durée (min)<input class="in" type="number" inputmode="numeric" id="lfT" placeholder="45"></label></div>
    <div id="lfX"></div><label class="f">Nom (facultatif)<input class="in" id="lfN" placeholder="Ex. : Sortie du dimanche"></label>
    <label class="f">Ressenti de l'effort : <b id="lfRv">6</b>/10<input type="range" min="1" max="10" value="6" id="lfR" oninput="$('#lfRv').textContent=this.value"></label>
    <label class="f">Notes<textarea class="in" id="lfNo" placeholder="Météo, sensations, douleurs…"></textarea></label>
    <button class="btn pri w" style="margin-top:14px" onclick="lfSave()">${ic('check')}Enregistrer</button>
    <p class="mu tiny" style="text-align:center;margin-top:8px">Pour la musculation, utilisez plutôt « Démarrer » : séries, charges et repos sont suivis.</p>`);
  lfFields();
}
function lfFields() {
  const sp = SPORTS[$('#lfS').value];
  $('#lfX').innerHTML = sp.dist ? `<div class="grid2"><label class="f">Distance (${sp.dist})<input class="in" type="number" step="${sp.dist === 'm' ? 25 : 0.01}" inputmode="decimal" id="lfDi" placeholder="${sp.dist === 'm' ? 1500 : 10}"></label>${sp.deniv ? '<label class="f">Dénivelé + (m)<input class="in" type="number" inputmode="numeric" id="lfDe" placeholder="0"></label>' : '<span></span>'}</div>` : '';
}
function lfSave() {
  const sport = $('#lfS').value, dur = +$('#lfT').value, dist = $('#lfDi') ? +$('#lfDi').value : 0;
  if (!dur && !dist) return toast('Indiquez au moins une durée ou une distance');
  const s = { id: uid(), date: $('#lfD').value || today(), sport, nom: $('#lfN').value.trim() || SPORTS[sport].nom, dur, rpe: +$('#lfR').value, notes: $('#lfNo').value.trim() };
  if (dist) s.dist = dist; if ($('#lfDe') && +$('#lfDe').value) s.deniv = +$('#lfDe').value;
  addSession(s); closeSheet();
}
function addSession(s) {
  S.sessions.push(s); if (!S.profile.sports.includes(s.sport)) S.profile.sports.push(s.sport);
  save(); render(); toast(`✅ Séance enregistrée${streak() > 1 ? ` · série de ${streak()} jours 🔥` : ''}`); checkBadges();
}

// ===================== PROGRESSION AUTOMATIQUE =====================
// Double progression : toutes les séries réussies la dernière fois -> on augmente ; 2 échecs de suite -> on allège de 10 %.
const BIG = ['squat', 'sdt', 'sdtr', 'presse', 'hipthrust', 'fentes'];
const r25 = v => Math.round(v / 2.5) * 2.5;
function mvHistory(mv, n = 3) {
  const out = [];
  for (const s of [...S.sessions].sort((a, b) => b.date.localeCompare(a.date))) { const it = (s.items || []).find(i => i.mv === mv && i.sets.some(z => z.done)); if (it) { out.push({ s, it }); if (out.length >= n) break; } }
  return out;
}
function success(h) {
  const it = h.it, tg = it.target || Math.max(...it.sets.map(z => +z.reps || 0));
  if (it.sets.some(z => z.sec != null)) return it.sets.every(z => z.done);
  return it.sets.every(z => z.done && (+z.reps || 0) >= tg) && !(h.s.rpe >= 10);
}
// Échelle de progression : au plafond sur toutes les séries -> proposer la variante plus dure
function ladderOf(mv) { const c = LADDERS.find(c => c.includes(mv)); if (!c) return null; const i = c.indexOf(mv); return { next: c[i + 1] || null, prev: c[i - 1] || null, cap: LADDER_CAP[mv] || 15 }; }
function ladderUp(mv, done) {
  const l = ladderOf(mv); if (!l || !l.next || !done.length) return null;
  const v = done.map(z => z.sec != null ? +z.sec || 0 : +z.reps || 0);
  if (done.length < 2 || Math.min(...v) < l.cap) return null;
  return { next: l.next, why: `⤴ ${done.length} séries à ${l.cap}${done[0].sec != null ? ' s' : ''} ou plus : passez à « ${mvById(l.next).n} »`, up: 1 };
}
function switchMv(i, to) {
  const it = L.items[i], m = mvById(to), l = ladderOf(to), timed = it.sets.some(z => z.sec != null);
  const start = timed ? 20 : Math.max(4, Math.round((l ? l.cap : 12) * .5));
  it.mv = to; delete it.n; it.sug = { why: `Nouvelle variante : ${m.n}. Repartez à ${start}${timed ? ' s' : ' répétitions'} et remontez.`, up: 1 };
  it.sets.forEach(z => { if (timed) z.sec = start; else z.reps = start; }); it.target = timed ? 0 : start; renderLive(); toast('⤴ ' + m.n);
}
// total de répétitions (ou secondes) validées, comparé à la dernière fois
function itTotal(sets) { return sets.filter(z => z.done !== false).reduce((a, z) => a + (z.sec != null ? +z.sec || 0 : +z.reps || 0), 0); }
function totalsHtml(items) {
  const rows = items.filter(it => !it.sets.some(z => +z.kg)).map(it => { const done = it.sets.filter(z => z.done); if (!done.length) return ''; const t = itTotal(done), lp = lastPerf(it.mv), p = lp ? itTotal(lp.sets) : null, u = done[0].sec != null ? ' s' : ''; return `<span class="chip" style="margin:3px 4px 0 0">${esc(mvName(it))} : <b>${t}${u}</b>${p != null ? ` <span style="color:${t >= p ? '#4ade80' : '#fb7185'}">${t >= p ? '+' : ''}${t - p}</span>` : ''}</span>`; }).filter(Boolean);
  return rows.length ? `<div style="margin-top:8px"><div class="mu tiny">Total par exercice (vs dernière fois)</div><div style="display:flex;flex-wrap:wrap">${rows.join('')}</div></div>` : '';
}
function suggest(mv, targetReps, isTimed) {
  const H = mvHistory(mv); if (!H.length) return null;
  const last = H[0].it, done = last.sets.filter(z => z.done), kg = Math.max(0, ...done.map(z => +z.kg || 0));
  if (isTimed) { const up = ladderUp(mv, done); if (up) return up; const s = Math.max(...done.map(z => +z.sec || 0)); return success(H[0]) ? { sec: s + 5, why: '↑ +5 s : tenu la dernière fois', up: 1 } : { sec: s, why: '= même durée que la dernière fois' }; }
  if (!kg) { const up = ladderUp(mv, done); if (up) return up; const r = Math.max(...done.map(z => +z.reps || 0)); return success(H[0]) ? { reps: r + 1, why: '↑ +1 répétition : séance précédente réussie', up: 1 } : { reps: r, why: '= mêmes répétitions : consolidez' }; }
  if (success(H[0])) { const inc = BIG.includes(mv) ? 5 : 2.5; return { kg: kg + inc, why: `↑ +${String(inc).replace('.', ',')} kg : toutes les séries réussies la dernière fois`, up: 1 }; }
  if (H.length >= 2 && !success(H[1])) return { kg: r25(kg * .9), why: '↓ −10 % : 2 séances difficiles d’affilée, on repart plus léger', down: 1 };
  return { kg, why: '= même charge : terminez toutes les séries avant d’augmenter' };
}
// séries d'échauffement pour les exercices lourds
function warmup(mv, kg) {
  if (!kg || kg < 30 || !['dc', 'squat', 'sdt', 'dm', 'rowb', 'presse', 'hipthrust', 'sdtr', 'dih'].includes(mv)) return '';
  const bar = 20, w = [[.4, 8], [.6, 5], [.8, 3]].map(([p, r]) => `${r} × ${String(Math.max(bar, r25(kg * p))).replace('.', ',')} kg`).filter((v, i, A) => A.indexOf(v) === i);
  return `Échauffement conseillé : ${['10 × barre (20 kg)', ...w].join(' · ')}`;
}
function applySuggestions(items) {
  if (L && L.tplMode) return items;
  items.forEach(it => {
    const timed = it.sets.some(z => z.sec != null), tg = it.target || (timed ? 0 : Math.max(...it.sets.map(z => +z.reps || 0)));
    it.target = tg || it.target; const sg = suggest(it.mv, tg, timed); if (!sg) return; it.sug = sg;
    it.sets.forEach(z => { if (sg.kg != null) z.kg = sg.kg; if (sg.sec != null && z.sec != null) z.sec = sg.sec; if (sg.reps != null && !timed && !z.kg) z.reps = Math.max(+z.reps || 0, sg.reps); });
  });
  return items;
}

// ===================== SÉANCE EN DIRECT =====================
let L = null, liveTick = null, rest = null;
function startLive(sess, opt = {}) {
  closeSheet();
  const progItems = sess.items && sess.items.some(it => typeof it.sets === 'number');
  L = { sport: sess.sport, nom: sess.nom, items: sess.items && !progItems ? sess.items.map(it => ({ mv: it.mv, n: it.n, rest: it.rest ?? 90, sets: (it.sets || []).map(z => ({ ...z, done: false })) })) : null,
    blocks: sess.blocks ? sess.blocks.map(b => ({ ...b, done: false })) : null, start: Date.now(), src: opt.src || null, tplMode: !!opt.tplMode, dist: sess.dist || '' };
  // éléments de programme { mv, sets: nombre, reps|sec }
  if (progItems) L.items = sess.items.map(it => ({ mv: it.mv, rest: it.rest ?? 90, target: it.reps || 0, ...(it.tempo ? { tempo: it.tempo } : {}), sets: Array.from({ length: it.sets }, () => it.sec ? { sec: it.sec, done: false } : { reps: it.reps, kg: '', done: false }) }));
  if (L.items && !L.tplMode) applySuggestions(L.items);
  document.body.style.overflow = 'hidden'; renderLive(); if (!L.tplMode) { mangaSplash('go', L.nom || SPORTS[L.sport].nom, 1300); say('C’est parti : ' + (L.nom || SPORTS[L.sport].nom)); } if (sess.painRemoved && sess.painRemoved.length) setTimeout(() => toast('🩹 Retiré à cause de votre douleur : ' + sess.painRemoved.join(', '), 4500), 1500); if (sess.phase && PH[sess.phase]) setTimeout(() => toast(PH[sess.phase][0] + ' Phase ' + PH[sess.phase][1] + ' : séance ajustée', 3000), 3200); clearInterval(liveTick); liveTick = setInterval(() => { const c = $('#liveClock'); if (c) c.textContent = mmss((Date.now() - L.start) / 1000); }, 1000);
  try { navigator.wakeLock && navigator.wakeLock.request('screen').then(w => L.wake = w).catch(() => {}); } catch (e) {}
}
function renderLive() {
  let el = $('#live'); if (!el) { el = document.createElement('div'); el.id = 'live'; el.className = 'live'; document.body.appendChild(el); } el.classList.toggle('bigmode', !!S.big);
  const sp = SPORTS[L.sport], force = !!L.items, hasKg = L.sport === 'muscu';
  let h = `<div class="lh"><button class="back btn sm ghost" onclick="quitLive()">${ic('x')}</button><div style="flex:1;min-width:0"><input class="in" style="margin:0;padding:6px 8px;font-weight:800;background:transparent;border-color:transparent" value="${esc(L.nom)}" onchange="L.nom=this.value"><div class="mu tiny" style="padding-left:8px">${sp.ic} ${sp.nom}${L.tplMode ? ' · création de séance type' : ''}</div></div>
    ${L.tplMode ? '' : `<button class="icob" id="vBtn" onclick="toggleVoice()" aria-label="Annonces vocales">${S.voice ? '🔊' : '🔇'}</button>`}${L.tplMode ? '' : `<span class="clock" id="liveClock">${mmss((Date.now() - L.start) / 1000)}</span>`}<button class="btn sm pri" onclick="finishLive()">${L.tplMode ? 'Enregistrer' : 'Terminer'}</button></div>`;
  if (force) {
    h += L.items.map((it, i) => {
      const last = lastPerf(it.mv), m = mvById(it.mv), timed = it.sets.some(z => z.sec != null);
      return `<div class="ex"><div class="eh">${m ? `<span onclick="openMv('${it.mv}',1)" style="cursor:pointer">${mvImg(it.mv, 'thumb')}</span>` : ''}<b onclick="openMv('${it.mv}',1)" style="cursor:pointer">${esc(mvName(it))} <span class="mu">${m ? ic('info', 'i small') : ''}</span></b>
        <button class="btn sm ghost" onclick="L.items.splice(${i},1);renderLive()">${ic('trash')}</button></div>
        ${it.sug && !L.tplMode ? `<div class="sug ${it.sug.up ? 'up' : it.sug.down ? 'down' : ''}">${esc(it.sug.why)}${it.sug.next ? ` <button class="btn sm pri" style="margin-left:6px;padding:4px 10px" onclick="switchMv(${i},'${it.sug.next}')">Passer</button>` : ''}</div>` : ''}${it.tempo && TEMPO[it.tempo] ? `<div class="last">${TEMPO[it.tempo][0]} Tempo : ${TEMPO[it.tempo][1]}</div>` : ''}${!L.tplMode && hasKg && it.sets[0] && warmup(it.mv, +it.sets[0].kg) ? `<div class="last">🔥 ${warmup(it.mv, +it.sets[0].kg)}</div>` : ''}
        ${last && !L.tplMode ? `<div class="last">Dernière fois (${fmtDate(last.date, { day: 'numeric', month: 'short' })}) : ${last.sets.map(z => z.sec ? z.sec + ' s' : z.reps + (z.kg ? '×' + z.kg : '')).join(' · ')}</div>` : ''}
        <div class="set ${timed ? 't3' : hasKg ? '' : 't3'}"><span></span>${timed ? '<span class="lab">Durée (s)</span>' : '<span class="lab">Reps</span>' + (hasKg ? '<span class="lab">Kg</span>' : '')}<span></span></div>
        ${it.sets.map((z, j) => `<div class="set ${timed || !hasKg ? 't3' : ''} ${z.done ? 'done' : ''}"><span class="n">${j + 1}</span>
          ${timed ? `<input type="number" inputmode="numeric" value="${z.sec ?? ''}" onchange="L.items[${i}].sets[${j}].sec=+this.value">` : `<input type="number" inputmode="numeric" value="${z.reps ?? ''}" onchange="L.items[${i}].sets[${j}].reps=+this.value">${hasKg ? `<input type="number" inputmode="decimal" step="0.5" value="${z.kg ?? ''}" placeholder="—" onchange="L.items[${i}].sets[${j}].kg=this.value===''?'':+this.value">` : ''}`}
          ${L.tplMode ? `<button class="ok" onclick="L.items[${i}].sets.splice(${j},1);renderLive()">${ic('x')}</button>` : `<button class="ok" onclick="toggleSet(${i},${j})">${timed && !z.done ? ic('play') : ic('check')}</button>`}</div>`).join('')}
        <div class="row" style="margin-top:10px;justify-content:space-between"><button class="btn sm" onclick="addSet(${i})">${ic('plus')}Série</button>${!hasKg || !it.sets.some(z => +z.kg) ? (() => { const d = it.sets.filter(z => z.done); return d.length ? `<span class="mu tiny">Total ${itTotal(d)}${timed ? ' s' : ''}${last ? ' / ' + itTotal(last.sets) : ''}</span>` : ''; })() : ''}
        <span class="mu small">Repos <input type="number" style="width:60px;padding:6px;border-radius:9px;border:1px solid var(--line2);background:#0a1120;text-align:center" value="${it.rest}" onchange="L.items[${i}].rest=+this.value"> s</span></div></div>`;
    }).join('');
    h += `<div style="padding:12px 16px"><button class="btn w" onclick="pickExo()">${ic('plus')}Ajouter un exercice</button></div>`;
  } else {
    h += `<div style="padding:14px 16px">${L.tplMode ? '' : `<div class="bigclock" id="liveClock2">${mmss((Date.now() - L.start) / 1000)}</div><p class="mu small" style="text-align:center;margin-top:-6px">Lancez votre activité, l’écran reste allumé. Cochez chaque étape.</p>`}
      ${L.blocks.map((b, i) => `<div class="block ${b.done ? 'done' : ''}" ${L.tplMode ? '' : `onclick="L.blocks[${i}].done=!L.blocks[${i}].done;renderLive()"`}><span class="ck">${b.done ? ic('check') : ''}</span><div style="flex:1">
        ${L.tplMode ? `<input class="in" style="margin:0 0 6px" value="${esc(b.t)}" onchange="L.blocks[${i}].t=this.value"><textarea class="in" style="margin:0;min-height:50px" onchange="L.blocks[${i}].d=this.value">${esc(b.d)}</textarea>` : `<b>${esc(b.t)}</b><div class="mu small">${esc(b.d)}</div>`}</div>
        ${L.tplMode ? `<button class="btn sm ghost" onclick="L.blocks.splice(${i},1);renderLive()">${ic('trash')}</button>` : ''}</div>`).join('')}
      <button class="btn w" style="margin-top:10px" onclick="L.blocks.push({t:'Étape',d:''});${L.tplMode ? '' : 'L.blocks.at(-1).t=prompt(\'Étape (ex. 6 × 400 m)\')||\'Étape\';'}renderLive()">${ic('plus')}Ajouter une étape</button></div>`;
  }
  $('#live').innerHTML = h;
  if (!force && !L.tplMode) { clearInterval(L.t2); L.t2 = setInterval(() => { const c = $('#liveClock2'); if (c) c.textContent = mmss((Date.now() - L.start) / 1000); else clearInterval(L.t2); }, 1000); }
}
function addSet(i) { const s = L.items[i].sets, p = s.at(-1) || { reps: 10, kg: '' }; s.push(p.sec != null ? { sec: p.sec } : { reps: p.reps, kg: p.kg }); renderLive(); }
function toggleSet(i, j) {
  const it = L.items[i], z = it.sets[j];
  if (z.sec != null && !z.done) return countdown(z.sec, mvName(it), () => { z.done = true; renderLive(); setDoneFx(i, j); restStart(it.rest, i, j); });
  z.done = !z.done; renderLive(); if (z.done) { setDoneFx(i, j); restStart(it.rest, i, j); }
}
function setDoneFx(i, j) {
  haptic(15);
  const rows = $$('#live .ex')[i] ? $$('#live .ex')[i].querySelectorAll('.set:not(:first-of-type)') : [], row = [...$$('#live .ex')[i].querySelectorAll('.set')].filter(r => r.querySelector('.n'))[j];
  if (row) row.classList.add('pop');
  const it = L.items[i], z = it.sets[j];
  if (it.sets.every(s => s.done)) { const card = $$('#live .ex')[i]; card && card.classList.add('allDone'); }
  // record : meilleur 1RM estimé jamais fait sur ce mouvement
  if (z.kg && z.reps) {
    const v = e1rm(+z.kg, +z.reps); let best = 0;
    S.sessions.forEach(s => (s.items || []).forEach(x => { if (x.mv === it.mv) x.sets.forEach(q => { if (q.done && q.kg && q.reps) best = Math.max(best, e1rm(+q.kg, +q.reps)); }); }));
    if (best && v > best + 0.01 && !z.pr) { z.pr = true; confetti(70); toast(`🏅 Nouveau record sur ${mvName(it)} ! 1RM ≈ ${Math.round(v)} kg`, 3500); mangaSplash('pr', `${mvName(it)} · ${z.kg} kg × ${z.reps} (1RM ≈ ${Math.round(v)} kg)`, 1800); haptic([30, 40, 30]); }
  }
  // fait défiler jusqu'à la prochaine série à faire
  setTimeout(() => { const nx = $('#live .set:not(.done) .ok'); if (nx) nx.closest('.set').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 350);
}
function nextLabel(i, j) { const it = L.items[i]; if (j + 1 < it.sets.length) return `${mvName(it)} — série ${j + 2}`; const n = L.items[i + 1]; return n ? `${mvName(n)} — série 1` : 'Dernière série faite 💪'; }
function restStart(sec, i, j) {
  if (!sec) return; restStop(); const end = Date.now() + sec * 1000, tot = sec;
  const b = document.createElement('div'); b.className = 'restbar'; b.id = 'restbar';
  b.innerHTML = `<span class="big" id="restT">${mmss(sec)}</span><div style="flex:1;min-width:0"><b>Repos</b><div class="mu tiny" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Ensuite : ${esc(nextLabel(i, j))}</div></div>
    <button class="btn sm" onclick="rest.end+=15000">+15</button><button class="btn sm pri" onclick="restStop()">Passer</button><span class="prog" id="restP"></span>`;
  document.body.appendChild(b); rest = { end, t: null, s10: false }; say('Repos ' + sayDur(sec));
  rest.t = setInterval(() => { const r = Math.max(0, (rest.end - Date.now()) / 1000); $('#restT').textContent = mmss(Math.ceil(r)); $('#restP').style.width = (100 - r / tot * 100) + '%'; const rb = $('#restbar'); rb && rb.classList.toggle('last', r <= 3); if (r <= 3 && r > 2.8) beep(660, 120); if (r <= 10 && !rest.s10 && tot > 15) { rest.s10 = true; say('Dix secondes'); } if (r <= 0) { beep(990, 400); say('C’est reparti : ' + nextLabel(i, j)); restStop(); } }, 200);
}
function restDone() { const d = rest && rest.done; restStop(); if (d) d(); }
function restStop() { if (rest) clearInterval(rest.t); rest = null; const b = $('#restbar'); if (b) b.remove(); }
function countdown(sec, label, done) {
  restStop(); let r = sec; const b = document.createElement('div'); b.className = 'restbar'; b.id = 'restbar'; b.style.background = '#1a1530'; b.style.borderColor = 'rgba(129,140,248,.6)';
  b.innerHTML = `<span class="big" id="restT" style="color:#a5b4fc">${mmss(r)}</span><div style="flex:1"><b>${esc(label)}</b><div class="mu tiny">C’est parti, tenez bon !</div></div><button class="btn sm" onclick="restDone()">Fini</button>`;
  document.body.appendChild(b); beep(880, 150); say(label + ', ' + sayDur(sec)); rest = { done, t: setInterval(() => { r--; if (r === 10 && sec > 20) say('Dix secondes'); const t = $('#restT'); if (t) t.textContent = mmss(Math.max(0, r)); if (r === 3 || r === 2 || r === 1) beep(660, 100); if (r <= 0) { beep(990, 450); say('Terminé'); restDone(); } }, 1000) };
}
function pickExo() {
  const own = LIB.filter(m => m.s === L.sport), other = LIB.filter(m => m.s !== L.sport && SPORTS[m.s].kind === 'force');
  const row = m => `<button class="li" onclick="L.items.push(newItem('${m.id}'));closeSheet();renderLive()">${mvImg(m.id, 'thumb')}<span class="t"><b>${esc(m.n)}</b><small>${esc(m.g)} · ${esc(m.mat)}</small></span>${ic('plus')}</button>`;
  sheet(`<h2>Ajouter un exercice</h2><input class="in" placeholder="Rechercher…" oninput="$$('#pk .li').forEach(b=>b.style.display=b.textContent.toLowerCase().includes(this.value.toLowerCase())?'':'none')">
    <div id="pk" style="margin-top:10px">${own.map(row).join('')}<h3 class="sec">Autres disciplines</h3>${other.map(row).join('')}
    <button class="li" onclick="const n=prompt('Nom de l’exercice :');if(n){L.items.push({mv:'perso_'+uid(),n,rest:90,sets:[{reps:10,kg:''},{reps:10,kg:''},{reps:10,kg:''}]});closeSheet();renderLive()}"><span class="em">✍️</span><span class="t"><b>Exercice personnalisé</b><small>Hors bibliothèque</small></span>${ic('plus')}</button></div>`);
}
function quitLive() { if (L.tplMode || confirm('Quitter la séance sans l’enregistrer ?')) endLive(); }
function endLive() { clearInterval(liveTick); clearInterval(L && L.t2); restStop(); try { L && L.wake && L.wake.release(); } catch (e) {} L = null; const el = $('#live'); if (el) el.remove(); document.body.style.overflow = ''; }
function finishLive() {
  const sp = SPORTS[L.sport], dur = Math.max(1, Math.round((Date.now() - L.start) / 60000));
  if (L.tplMode) { const nom = L.nom.trim() || sp.nom; S.templates.push(toTemplate({ sport: L.sport, items: L.items, blocks: L.blocks, dist: +L.dist || null }, nom)); save(); endLive(); render(); return toast('Séance type enregistrée 💾'); }
  const doneSets = L.items ? L.items.reduce((a, it) => a + it.sets.filter(z => z.done).length, 0) : 1;
  if (L.items && !doneSets && !confirm('Aucune série validée. Terminer quand même ?')) return;
  sheet(`${S.manga === false ? '<h2>Bravo ! 🎉</h2>' : mangaBanner(MG_SPECIAL.win, { cls: 'slam', tag: 'Victoire' })}<p class="mu small">${L.items ? doneSets + ' séries validées · ' : ''}${hmin(dur)}</p>
    <div class="grid2"><label class="f">Durée (min)<input class="in" type="number" id="fiT" value="${dur}" oninput="fiKcal()"></label>${sp.dist ? `<label class="f">Distance (${sp.dist})<input class="in" type="number" step="0.01" inputmode="decimal" id="fiD" value="${L.dist || ''}" oninput="fiKcal()"></label>` : '<span></span>'}</div>
    ${sp.deniv ? '<label class="f">Dénivelé + (m)<input class="in" type="number" id="fiE"></label>' : ''}
    <label class="f">Ressenti de l'effort : <b id="fiRv">7</b>/10<input type="range" min="1" max="10" value="7" id="fiR" oninput="$('#fiRv').textContent=this.value;fiKcal()"></label>
    <p class="mu small" id="fiK" onclick="kcalInfo()" style="margin:6px 0 0"></p>${L.items ? totalsHtml(L.items) : ''}
    <label class="f">Notes<textarea class="in" id="fiN" placeholder="Sensations, douleurs…"></textarea></label>
    <label class="row" style="margin-top:14px;gap:10px;font-weight:650"><input type="checkbox" id="fiTpl" style="width:22px;height:22px;accent-color:#22c55e" ${L.src && L.src.type === 'tpl' ? '' : ''}> Enregistrer comme séance type</label>
    <button class="btn pri w" style="margin-top:14px" onclick="saveLive()">${ic('check')}Enregistrer la séance</button>`);
  fiKcal();
}
function fiKcal() { const el = $('#fiK'); if (!el || !L) return; const K = kcalOf({ sport: L.sport, dur: +$('#fiT').value || 0, rpe: +$('#fiR').value, dist: $('#fiD') ? +$('#fiD').value : 0, items: L.items }); el.innerHTML = K ? `🔥 Dépense estimée : <b style="color:var(--tx)">${kcTxt(K.k)}</b> <span style="color:var(--ac2)">ⓘ</span>` : ''; }
function saveLive() {
  const s = { id: uid(), date: today(), sport: L.sport, nom: L.nom, dur: +$('#fiT').value || 0, rpe: +$('#fiR').value, notes: $('#fiN').value.trim() };
  if ($('#fiD') && +$('#fiD').value) s.dist = +$('#fiD').value; if ($('#fiE') && +$('#fiE').value) s.deniv = +$('#fiE').value;
  if (L.items) s.items = L.items.map(it => ({ mv: it.mv, n: it.n || mvName(it), rest: it.rest, target: it.target || 0, ...(it.tempo ? { tempo: it.tempo } : {}), sets: it.sets.map(z => ({ reps: z.reps, kg: z.kg, sec: z.sec, done: !!z.done })) }));
  if (L.blocks) s.blocks = L.blocks.map(b => ({ t: b.t, d: b.d, done: b.done }));
  if (L.src && L.src.type === 'prog' && S.prog) { s.prog = S.prog.id; S.prog.done.push(L.src.key); }
  if ($('#fiTpl').checked) { const tp = toTemplate(s, s.nom); tp.items && tp.items.forEach(it => it.sets.forEach(z => delete z.done)); S.templates.push(tp); }
  closeSheet(); endLive(); addSession(s); confetti(140); haptic([20, 50, 20]);
  if (s.prog) { const nx = nextProgSession(); if (!nx) { S.progFinished = (S.progFinished || 0) + 1; save(); } if (!nx) toast('🏆 Programme terminé ! Refaites le test pour mesurer vos progrès.', 5000); }
}

// ===================== PROGRAMMES =====================
let progF = 'tous';
function progSessions(p) { return p.weeks ? p.weeks.flat() : Array.from({ length: p.sem }, (_, w) => p.seances.map((s, i) => ({ ...s, nom: `Sem. ${w + 1} · ${s.nom}`, key: `${w}-${i}`, week: w + 1 }))).flat().map((s, i) => ({ ...s, key: s.key || String(i) })); }
function nextProgSession() {
  if (!S.prog) return null; const p = PROGRAMS.find(x => x.id === S.prog.id); if (!p) return null;
  const all = progSessions(p).map((s, i) => ({ ...s, key: s.key || String(i) })), s = all.find(x => !S.prog.done.includes(x.key));
  return s ? { p, s: personalize(JSON.parse(JSON.stringify(s))), done: S.prog.done.length, total: all.length } : null;
}
function startProgSession(ex) { const nx = nextProgSession(); if (nx) startLive(ex ? express(nx.s) : nx.s, { src: { type: 'prog', key: nx.s.key } }); }
function vProgrammes() {
  const t = S.tests.at(-1), rec = recommend();
  let h = `<h1 class="vt">Programmes</h1>`;
  h += t ? `<div class="card"><div class="row"><div class="em" style="font-size:28px">🧪</div><div style="flex:1"><b>Votre niveau : ${t.levelTxt}</b><div class="mu small">Test du ${fmtDate(t.date, { day: 'numeric', month: 'long' })} · objectif ${OBJ[S.profile.obj].toLowerCase()}</div></div><button class="btn sm" onclick="showTest(${S.tests.length - 1})">Détail</button></div>
      <button class="btn w" style="margin-top:12px" onclick="startTest()">${ic('test')}Refaire le test</button></div>`
    : `<div class="card" style="border-color:rgba(245,158,11,.45)"><b>🧪 Avant de choisir : testez vos capacités</b><p class="mu small">Une séance structurée (échauffement + 5 tests) pour connaître votre niveau et adapter les séries, durées et allures du programme.</p><button class="btn pri w" onclick="startTest()">${ic('test')}Faire le test</button></div>`;
  const nx = nextProgSession();
  if (S.prog) { const p = PROGRAMS.find(x => x.id === S.prog.id); h += `<h3 class="sec">En cours</h3><div class="card"><div class="row"><div class="em" style="font-size:28px">${p.ic}</div><div style="flex:1"><b>${p.nom}</b><div class="mu small">${nx ? 'Prochaine : ' + esc(nx.s.nom) : 'Terminé 🏆'}</div></div></div>
      ${nx ? `<div class="pbar" style="margin:12px 0 6px"><i style="width:${Math.round(nx.done / nx.total * 100)}%"></i></div><div class="mu tiny">${nx.done}/${nx.total} séances</div>` : ''}
      <div class="grid2" style="margin-top:12px">${nx ? `<button class="btn pri" onclick="startProgSession()">${ic('play')}Démarrer</button>` : ''}<button class="btn dan" onclick="if(confirm('Arrêter ce programme ?')){S.prog=null;save();render()}">Arrêter</button></div></div>`; }
  const pr = S.profile.pratique || [];
  h += `<h3 class="sec">Préparation pour vos sports <a onclick="sportsPicker()">${pr.length ? 'Modifier' : '+ Ajouter'}</a></h3>`;
  h += pr.length ? pr.map(k => `<button class="li" onclick="openSpec('${k}')"><span class="em" style="font-size:24px">${SPEC[k].ic}</span><span class="t"><b>Préparation ${esc(SPEC[k].nom)}</b><small>Niveau ${LV[specLevel(k)]} · ${esc(SPEC[k].qual)}</small></span>${ic('right')}</button>`).join('')
    : `<div class="card"><div class="row"><div class="em" style="font-size:26px">🏅</div><div style="flex:1"><b>Vous pratiquez un sport ?</b><div class="mu small">Football, tennis, escalade, ski, tir… Recevez une préparation physique et des exercices de prévention spécifiques.</div></div></div><button class="btn w" style="margin-top:10px" onclick="sportsPicker()">Choisir mes sports</button></div>`;
  if (rec.length) h += `<h3 class="sec">Recommandés pour vous</h3>${rec.slice(0, 3).map(p => progRow(p, true)).join('')}`;
  h += `<h3 class="sec">Tous les programmes</h3><div class="chips" style="margin-bottom:10px">${[['tous', 'Tous'], ['pdc', '🏠 Sans matériel'], ...Object.entries(OBJ)].map(([k, v]) => `<button class="chip ${progF === k ? 'on' : ''}" onclick="progF='${k}';render()">${v}</button>`).join('')}</div>`;
  h += PROGRAMS.filter(p => (progF === 'tous' && !p.spec) || (progF === 'pdc' && p.mat === 'aucun' && !p.spec && !p.gen && p.seances.some(x => x.items)) || p.obj === progF).map(p => progRow(p)).join('');
  $('#view').innerHTML = h;
}
const NIV = ['', 'Débutant', 'Intermédiaire', 'Confirmé'];
function progRow(p, star) { return `<button class="li" onclick="openProg('${p.id}')"><span class="em" style="font-size:24px">${p.ic}</span><span class="t"><b>${star ? '⭐ ' : ''}${esc(p.nom)}</b><small>${NIV[p.niv]} · ${p.sem} sem. · ${p.freq}×/sem · ${OBJ[p.obj]}</small></span>${ic('right')}</button>`; }
function openProg(id) {
  const p = PROGRAMS.find(x => x.id === id), S0 = (p.weeks ? p.weeks[0] : p.seances).map(s => personalize(JSON.parse(JSON.stringify(s))));
  sheet(`<div style="font-size:40px">${p.ic}</div><h2>${esc(p.nom)}</h2><div class="row" style="gap:6px;flex-wrap:wrap;margin:8px 0"><span class="pill">${NIV[p.niv]}</span><span class="pill">${p.sem} semaines</span><span class="pill">${p.freq} séances / sem.</span><span class="pill">${{ aucun: 'Sans matériel', salle: 'Salle', piscine: 'Piscine', velo: 'Vélo' }[p.mat]}</span></div>
    <p>${esc(p.desc)}</p><div class="tip">📈 Progression : ${esc(p.prog)}</div>
    ${S.tests.length ? '<p class="mu small" style="margin-top:10px">✅ Séries, durées et allures adaptées à votre test.</p>' : ''}
    <h3 class="sec">${p.weeks ? 'Semaine 1' : 'Les séances'}</h3>${S0.map(s => `<div class="kpi" style="margin-top:8px"><b>${SPORTS[s.sport].ic} ${esc(s.nom)}</b><div class="mu small" style="margin-top:4px">${s.items ? s.items.map(it => `${esc(mvName(it))} ${it.sec ? it.sets + '×' + it.sec + ' s' : it.sets + '×' + it.reps}`).join(' · ') : s.blocks.map(b => `<b>${esc(b.t)}</b> : ${esc(b.d)}`).join('<br>')}</div></div>`).join('')}
    <button class="btn pri w" style="margin-top:14px" onclick="S.prog={id:'${p.id}',start:today(),done:[]};S.profile.jours=Math.max(S.profile.jours,${p.freq});save();closeSheet();go('home');toast('Programme lancé : bonne séance ! 💪')">${S.prog && S.prog.id === p.id ? 'Recommencer ce programme' : 'Suivre ce programme'}</button>`);
}

// ===================== TEST DE CAPACITÉS =====================
let TS = null;
function startTest() {
  closeSheet(); TS = { step: 0, res: {}, cardio: 'cooper' };
  const el = document.createElement('div'); el.id = 'live'; el.className = 'live'; document.body.appendChild(el); document.body.style.overflow = 'hidden'; renderTest();
}
function testShell(title, body, foot) {
  const n = TESTS.length + 3;
  $('#live').innerHTML = `<div class="lh"><button class="back btn sm ghost" onclick="if(confirm('Quitter le test ?'))endTest()">${ic('x')}</button><div style="flex:1"><div class="test-step">Test de capacités · étape ${TS.step + 1}/${n}</div><b>${title}</b></div></div>
    <div class="pbar" style="margin:0 16px;height:5px"><i style="width:${(TS.step + 1) / n * 100}%"></i></div><div style="padding:16px">${body}</div>
    <div style="position:fixed;left:0;right:0;bottom:0;padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:linear-gradient(transparent,var(--bg) 30%)"><div style="max-width:620px;margin:0 auto" class="grid2">${foot}</div></div>`;
}
function endTest() { clearInterval(TS && TS.t); TS = null; const el = $('#live'); if (el) el.remove(); document.body.style.overflow = ''; render(); }
function renderTest() {
  clearInterval(TS.t); const P = S.profile, st = TS.step;
  const back = st ? `<button class="btn" onclick="TS.step--;renderTest()">Retour</button>` : '<span></span>';
  if (st === 0) return testShell('Votre profil', `<p class="mu">Ces informations servent à comparer vos résultats aux repères de votre âge et à choisir le bon programme.</p>
      <div class="grid2"><label class="f">Prénom<input class="in" id="tP" value="${esc(P.prenom)}"></label><label class="f">Âge<input class="in" type="number" id="tA" value="${P.age || ''}"></label></div>
      <div class="grid3"><label class="f">Sexe<select class="in" id="tS"><option value="h" ${P.sexe === 'h' ? 'selected' : ''}>Homme</option><option value="f" ${P.sexe === 'f' ? 'selected' : ''}>Femme</option></select></label><label class="f">Poids (kg)<input class="in" type="number" id="tW" value="${P.poids || ''}"></label><label class="f">Taille (cm)<input class="in" type="number" id="tH" value="${P.taille || ''}"></label></div>
      <label class="f">Objectif principal<select class="in" id="tO">${Object.entries(OBJ).map(([k, v]) => `<option value="${k}" ${P.obj === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
      <label class="f">Séances possibles par semaine<select class="in" id="tJ">${[2, 3, 4, 5].map(n => `<option ${+P.jours === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="f">Vous pratiquez un sport ? (préparation spécifique)</label>${sportChips(P.pratique || [], 'tSp')}
      <label class="f">Matériel disponible</label><div class="chips" style="flex-wrap:wrap">${[['aucun', 'Rien (maison)'], ['halteres', 'Haltères / kettlebell'], ['barre', 'Barre de traction'], ['salle', 'Salle de sport'], ['piscine', 'Piscine'], ['velo', 'Vélo']].map(([k, v]) => `<button class="chip ${P.mat.includes(k) ? 'on' : ''}" onclick="this.classList.toggle('on')" data-m="${k}">${v}</button>`).join('')}</div>
      <div class="tip" style="margin-top:14px">⚠️ En cas de problème de santé, de douleur ou de reprise après une longue pause, demandez l’avis d’un médecin avant les tests d’effort maximal.</div>`,
    `<span></span><button class="btn pri" onclick="saveTestProfile()">Continuer</button>`);
  if (st === 1) return testShell('Échauffement — 6 minutes', `<p class="mu">Indispensable avant de pousser au maximum. Suivez le minuteur.</p>
      ${[['Marche sur place puis trottinement', '1 min'], ['Jumping jacks', '1 min'], ['Rotations d’épaules et de hanches', '1 min'], ['10 squats lents + 10 fentes', '1 min 30'], ['5 pompes faciles (genoux)', '30 s'], ['Montées de genoux', '1 min']].map(([a, b]) => `<div class="block"><span class="ck"></span><div style="flex:1"><b>${a}</b><div class="mu small">${b}</div></div></div>`).join('')}
      <div class="bigclock" id="tC">06:00</div><button class="btn w" onclick="testTimer(360,'tC')">${ic('play')}Lancer le minuteur</button>`,
    `${back}<button class="btn pri" onclick="TS.step++;renderTest()">Je suis échauffé</button>`);
  const ti = st - 2;
  if (ti < TESTS.length) {
    const t = TESTS[ti], m = mvById(t.mv), v = TS.res[t.id];
    let body = `${mvImg(t.img || t.mv, 'big')}<p>${esc(t.how)}</p>${m && !t.img ? `<button class="btn sm" onclick="openMv('${m.id}',1)">${ic('info')}Technique : ${esc(m.n)}</button>` : ''}${t.f_note && P.sexe === 'f' ? `<p class="mu small">${t.f_note}</p>` : ''}`;
    if (t.choices) body += `<div class="choice">${t.choices.map((c, i) => `<button class="btn ${v === i ? 'on' : ''}" onclick="TS.res.${t.id}=${i};renderTest()">${c}</button>`).join('')}</div>`;
    else if (t.cardio) {
      body += `<div class="seg" style="margin-top:14px"><button class="${TS.cardio === 'cooper' ? 'on' : ''}" onclick="TS.cardio='cooper';renderTest()">🏃 Cooper 12 min</button><button class="${TS.cardio === 'ruffier' ? 'on' : ''}" onclick="TS.cardio='ruffier';renderTest()">❤️ Ruffier (maison)</button></div>`;
      body += TS.cardio === 'cooper' ? `<p class="mu small">Sur une piste ou un parcours mesuré (montre GPS), courez à allure régulière le plus loin possible en 12 minutes. Marcher est autorisé.</p><div class="bigclock" id="tC">12:00</div><button class="btn w" onclick="testTimer(720,'tC')">${ic('play')}Lancer 12 min</button>
          <label class="f">Distance parcourue (mètres)<input class="in" type="number" inputmode="numeric" id="tV" value="${TS.res.cooper || ''}" placeholder="2300"></label>`
        : `<ol class="how"><li>Allongé 5 min au calme, puis prenez votre pouls sur 15 s × 4 → <b>P0</b>.</li><li>Faites 30 squats complets en 45 secondes.</li><li>Debout aussitôt : pouls sur 15 s × 4 → <b>P1</b>.</li><li>Allongé, 1 minute après la fin : pouls → <b>P2</b>.</li></ol>
          <div class="bigclock" id="tC">00:45</div><button class="btn w" onclick="testTimer(45,'tC')">${ic('play')}Minuteur 45 s</button>
          <div class="grid3"><label class="f">P0<input class="in" type="number" id="r0" value="${(TS.res.ruffier || [])[0] || ''}"></label><label class="f">P1<input class="in" type="number" id="r1" value="${(TS.res.ruffier || [])[1] || ''}"></label><label class="f">P2<input class="in" type="number" id="r2" value="${(TS.res.ruffier || [])[2] || ''}"></label></div>`;
    } else {
      if (t.timer) body += `<div class="bigclock" id="tC">${mmss(t.timer)}</div><button class="btn w" onclick="testTimer(${t.timer},'tC')">${ic('play')}Lancer ${t.timer} s</button>`;
      if (t.stopwatch) body += `<div class="bigclock" id="tC">00:00</div><div class="grid2"><button class="btn" onclick="testWatch('tC')">${ic('play')}Départ</button><button class="btn" onclick="testWatchStop()">${ic('check')}Stop</button></div>`;
      body += `<label class="f">Résultat (${t.unit})<input class="in" type="number" inputmode="numeric" id="tV" value="${v ?? ''}" placeholder="${t.optional ? 'Laisser vide si pas de barre' : ''}"></label>`;
    }
    return testShell(t.nom, body, `${back}<button class="btn pri" onclick="saveTestValue(${ti})">${ti === TESTS.length - 1 ? 'Voir mes résultats' : 'Suivant'}</button>`);
  }
  // résultats
  const r = scoreTest(TS.res);
  return testShell('Vos résultats', testResultHTML(r, true), `${back}<button class="btn pri" onclick="saveTest()">${ic('check')}Enregistrer</button>`), drawRadar(r.scores);
}
function saveTestProfile() {
  const P = S.profile; P.prenom = $('#tP').value.trim(); P.age = +$('#tA').value || 30; P.sexe = $('#tS').value; P.poids = +$('#tW').value || ''; P.taille = +$('#tH').value || ''; P.obj = $('#tO').value; P.jours = +$('#tJ').value;
  P.pratique = pickedSports('tSp');
  P.mat = $$('#live .chip.on[data-m]').map(b => b.dataset.m); if (!P.mat.length) P.mat = ['aucun']; save(); TS.step++; renderTest();
}
function saveTestValue(ti) {
  const t = TESTS[ti];
  if (t.cardio) { if (TS.cardio === 'cooper') { const v = +$('#tV').value; if (!v) return toast('Indiquez la distance (ou passez au test Ruffier)'); TS.res.cooper = v; delete TS.res.ruffier; } else { const a = [+$('#r0').value, +$('#r1').value, +$('#r2').value]; if (a.some(x => !x)) return toast('Indiquez les 3 mesures de pouls'); TS.res.ruffier = a; delete TS.res.cooper; } }
  else if (!t.choices) { const v = $('#tV').value; if (v === '' && !t.optional) return toast('Indiquez votre résultat'); if (v !== '') TS.res[t.id] = +v; else delete TS.res[t.id]; }
  else if (TS.res[t.id] == null) return toast('Choisissez une réponse');
  TS.step++; renderTest();
}
function testTimer(sec, id) { clearInterval(TS.t); let r = sec; beep(880, 150); TS.t = setInterval(() => { r--; const e = $('#' + id); if (!e) return clearInterval(TS.t); e.textContent = mmss(Math.max(0, r)); if (r <= 3 && r > 0) beep(660, 100); if (r <= 0) { clearInterval(TS.t); beep(990, 500); } }, 1000); }
function testWatch(id) { clearInterval(TS.t); const t0 = Date.now(); beep(880, 150); TS.t = setInterval(() => { const e = $('#' + id); if (!e) return clearInterval(TS.t); e.textContent = mmss((Date.now() - t0) / 1000); TS.w = Math.round((Date.now() - t0) / 1000); }, 250); }
function testWatchStop() { clearInterval(TS.t); beep(990, 300); if (TS.w) $('#tV').value = TS.w; }
// barèmes : seuils [faible, moyen, bon, très bon] -> score 1..5, ajustés avec l'âge
function band(v, th) { let s = 1; th.forEach(t => { if (v >= t) s++; }); return s; }
function scoreTest(res) {
  const P = S.profile, age = +P.age || 30, f = 1 - 0.08 * Math.max(0, (age - 30) / 10), sx = P.sexe === 'f' ? 'f' : 'h', sc = {}, info = {};
  const T = id => TESTS.find(t => t.id === id), adj = th => th.map(v => Math.round(v * f));
  if (res.pompes != null) sc.force_haut = band(res.pompes, adj(T('pompes')[sx]));
  if (res.tractions != null) { const s2 = band(res.tractions, T('tractions')[sx]); sc.force_haut = sc.force_haut ? Math.round((sc.force_haut + s2) / 2) : s2; }
  if (res.squats != null) sc.force_bas = band(res.squats, adj(T('squats')[sx]));
  if (res.gainage != null) sc.gainage = band(res.gainage, adj(T('gainage')[sx]));
  if (res.souplesse != null) sc.souplesse = res.souplesse + 1;
  if (res.cooper) { sc.cardio = band(res.cooper, COOPER[sx].map(v => v - Math.round(100 * Math.max(0, (age - 30) / 10)))); info.vo2 = Math.max(10, (res.cooper - 504.9) / 44.73); info.vma = res.cooper / 200 * 1.05; }
  if (res.ruffier) { const [a, b, c] = res.ruffier, ix = (a + b + c - 200) / 10; info.ruffier = ix; sc.cardio = ix < 0 ? 5 : ix < 5 ? 4 : ix < 10 ? 3 : ix < 15 ? 2 : 1; }
  const vals = Object.values(sc), avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
  const level = avg < 2.4 ? 1 : avg < 3.6 ? 2 : 3;
  if (P.poids && P.taille) info.imc = P.poids / (P.taille / 100) ** 2;
  return { scores: sc, avg, level, levelTxt: NIV[level], info, res: { ...res } };
}
function testResultHTML(r, fresh) {
  const sc = r.scores, weak = Object.entries(sc).sort((a, b) => a[1] - b[1])[0], strong = Object.entries(sc).sort((a, b) => b[1] - a[1])[0], word = ['', 'À travailler', 'Faible', 'Moyen', 'Bon', 'Excellent'];
  let h = `<div class="card hero" style="text-align:center"><div class="mu small">Niveau global</div><div style="font-size:30px;font-weight:800;margin:4px 0">${r.levelTxt}</div><div class="mu small">Score moyen ${r.avg.toFixed(1)} / 5</div></div>
    <div class="card"><canvas id="radar" class="ch" height="300"></canvas>${Object.entries(QUAL).filter(([k]) => sc[k]).map(([k, v]) => `<div class="score"><span>${v}</span><div class="pbar"><i style="width:${sc[k] * 20}%"></i></div><b style="width:78px;text-align:right;font-size:13px">${word[sc[k]]}</b></div>`).join('')}</div>`;
  const I = r.info, R = r.res;
  h += `<div class="card"><b>Vos mesures</b><div class="mu small" style="margin-top:6px;line-height:1.7">${R.pompes != null ? `Pompes : <b>${R.pompes}</b> · ` : ''}${R.squats != null ? `Squats/min : <b>${R.squats}</b> · ` : ''}${R.gainage != null ? `Gainage : <b>${R.gainage} s</b> · ` : ''}${R.tractions != null ? `Tractions : <b>${R.tractions}</b> · ` : ''}${R.souplesse != null ? `Souplesse : <b>${TESTS.find(t => t.id === 'souplesse').choices[R.souplesse]}</b>` : ''}
    ${R.cooper ? `<br>Cooper : <b>${R.cooper} m</b> → VO₂max estimée <b>${I.vo2.toFixed(0)}</b> ml/kg/min · VMA ≈ <b>${I.vma.toFixed(1)} km/h</b>` : ''}${I.ruffier != null ? `<br>Indice de Ruffier : <b>${I.ruffier.toFixed(1)}</b>` : ''}${I.imc ? `<br>IMC : <b>${I.imc.toFixed(1)}</b>` : ''}</div></div>`;
  if (I.vma) h += `<div class="card"><b>🏃 Vos allures d’entraînement</b><div class="mu small" style="margin-top:6px;line-height:1.8">Endurance fondamentale (70 % VMA) : <b>${pace(60 / (I.vma * .7))}/km</b><br>Seuil (85 %) : <b>${pace(60 / (I.vma * .85))}/km</b><br>Fractionné court (100 %) : <b>${pace(60 / I.vma)}/km</b> · 400 m en <b>${mmss(400 / (I.vma / 3.6))}</b></div></div>`;
  h += `<div class="card"><b>💡 Analyse</b><p class="small" style="line-height:1.55">Point fort : <b>${QUAL[strong[0]]}</b>. À améliorer en priorité : <b>${QUAL[weak[0]]}</b>.
    ${weak[0] === 'cardio' ? 'Ajoutez 2 séances d’endurance fondamentale par semaine.' : weak[0] === 'souplesse' ? 'Ajoutez 10 min de mobilité après chaque séance (programme Mobilité).' : weak[0] === 'gainage' ? 'Terminez chaque séance par 3 séries de gainage.' : 'Les séances de renforcement de votre programme cibleront ce point.'}</p></div>`;
  const rec = recommend(r).slice(0, 3);
  if (rec.length) h += `<h3 class="sec">Programmes conseillés</h3>${rec.map((p, i) => `<button class="li" onclick="${fresh ? 'saveTest(true);' : ''}openProg('${p.id}')"><span class="em" style="font-size:24px">${p.ic}</span><span class="t"><b>${i === 0 ? '⭐ ' : ''}${esc(p.nom)}</b><small>${NIV[p.niv]} · ${p.freq}×/sem · ${p.sem} sem.</small></span>${ic('right')}</button>`).join('')}`;
  return h;
}
function drawRadar(sc) {
  const c = $('#radar'); if (!c) return; const W = c.width = c.clientWidth * 2, H = c.height = 600, x = c.getContext('2d'), K = Object.keys(QUAL).filter(k => sc[k]), n = K.length; if (n < 3) return c.remove();
  const cx = W / 2, cy = H / 2 + 10, R = Math.min(W, H) / 2 - 80, P = (i, r) => [cx + Math.sin(i / n * 2 * Math.PI) * r, cy - Math.cos(i / n * 2 * Math.PI) * r];
  x.strokeStyle = 'rgba(255,255,255,.09)'; x.lineWidth = 2;
  for (let l = 1; l <= 5; l++) { x.beginPath(); K.forEach((_, i) => { const [a, b] = P(i, R * l / 5); i ? x.lineTo(a, b) : x.moveTo(a, b); }); x.closePath(); x.stroke(); }
  x.beginPath(); K.forEach((k, i) => { const [a, b] = P(i, R * sc[k] / 5); i ? x.lineTo(a, b) : x.moveTo(a, b); }); x.closePath(); x.fillStyle = 'rgba(34,197,94,.3)'; x.fill(); x.strokeStyle = '#4ade80'; x.lineWidth = 5; x.stroke();
  x.fillStyle = '#c7d2e3'; x.font = '600 24px -apple-system,system-ui'; x.textAlign = 'center'; K.forEach((k, i) => { const [a, b] = P(i, R + 44); x.fillText(QUAL[k], a, b + 8); });
}
function saveTest(silent) {
  const r = scoreTest(TS.res); S.tests.push({ date: today(), ...r }); S.skipTest = true; save();
  endTest(); confetti(120); if (!silent) { go('programmes'); toast('Résultats enregistrés ✅ Voici vos programmes conseillés'); }
}
function showTest(i) { const t = S.tests[i]; sheet(`<h2>Test du ${fmtDate(t.date, { day: 'numeric', month: 'long', year: 'numeric' })}</h2>${testResultHTML(t)}${i > 0 ? compareTests(S.tests[i - 1], t) : ''}`); setTimeout(() => drawRadar(t.scores), 30); }
function compareTests(a, b) { const R = ['pompes', 'squats', 'gainage', 'tractions', 'cooper']; const rows = R.filter(k => a.res[k] != null && b.res[k] != null).map(k => { const d = b.res[k] - a.res[k]; return `<div class="row" style="justify-content:space-between;padding:4px 0"><span class="mu small">${TESTS.find(t => t.id === k)?.nom || 'Cooper (m)'}</span><b>${a.res[k]} → ${b.res[k]} <span style="color:${d >= 0 ? '#4ade80' : '#fb7185'}">${d >= 0 ? '+' : ''}${d}</span></b></div>`; }); return rows.length ? `<h3 class="sec">Évolution depuis le test précédent</h3><div class="card">${rows.join('')}</div>` : ''; }
// recommandation : objectif, niveau, matériel et disponibilité
function recommend(r) {
  const t = r || S.tests.at(-1), P = S.profile, lvl = t ? t.level : 1, mat = P.mat || ['aucun'];
  const ok = p => p.mat === 'aucun' || (p.mat === 'salle' && mat.includes('salle')) || (p.mat === 'piscine' && mat.includes('piscine')) || (p.mat === 'velo' && mat.includes('velo'));
  const weakCardio = t && t.scores.cardio && t.scores.cardio <= 2;
  const pr = P.pratique || [];
  return PROGRAMS.filter(ok).filter(p => !p.spec || pr.includes(p.spec)).map(p => ({ p, s: (p.spec ? -1 : 0) + (p.obj === P.obj ? 0 : 3) + Math.abs(p.niv - lvl) * 1.5 + (p.freq > (+P.jours || 3) ? 2 : 0) + (weakCardio && p.obj === 'endurance' && p.niv === 1 ? -1 : 0) })).sort((a, b) => a.s - b.s).map(x => x.p);
}
// ---- sports pratiqués : choix groupé par catégorie
function sportChips(sel, id) {
  return Object.entries(SPCAT).map(([c, lab]) => `<div class="mu tiny" style="margin:12px 0 6px;font-weight:800;letter-spacing:.04em">${lab}</div><div class="chips" style="flex-wrap:wrap" id="${id}_${c}">${Object.entries(SPEC).filter(([, s]) => s.cat === c).map(([k, s]) => `<button class="chip ${sel.includes(k) ? 'on' : ''}" data-sp="${k}" onclick="this.classList.toggle('on')">${s.ic} ${s.nom}</button>`).join('')}</div>`).join('');
}
const pickedSports = id => $$(`[id^="${id}_"] .chip.on`).map(b => b.dataset.sp);
function sportsPicker() {
  const pr = S.profile.pratique || [];
  sheet(`<h2>Mes sports pratiqués</h2><p class="mu small">En club ou en loisir. Pour chaque sport : une préparation physique en 3 niveaux, ajustée à votre test, les risques de blessure et des exercices de prévention.</p>
    ${sportChips(pr, 'spP')}
    <button class="btn pri w" style="margin-top:16px" onclick="S.profile.pratique=pickedSports('spP');save();closeSheet();render()">Enregistrer</button>`);
}
// ---- niveau : choisi par l'utilisateur, sinon celui du test ; chaque exercice suit le score de la qualité qu'il travaille
const recLevel = () => { const t = S.tests.at(-1); return t ? t.level : 1; };
const specLevel = k => (S.specLvl && S.specLvl[k]) || recLevel();
function qLvl(q, L) {
  const t = S.tests.at(-1); if (!q || !t || t.scores[q] == null) return L;
  const v = t.scores[q], ql = v <= 2 ? 1 : v === 3 ? 2 : 3;
  return clamp(ql, Math.max(1, L - 1), Math.min(3, L + 1));
}
function weakKey(k) { const t = S.tests.at(-1); if (!t) return null; return SPEC[k].key.filter(q => t.scores[q] != null && t.scores[q] <= 2).sort((a, b) => t.scores[a] - t.scores[b])[0] || null; }
function specSession(k, i, L) {
  const s = SPEC[k].seances[i], adj = [];
  const items = s.slots.map(sl => { const l = qLvl(sl.q, L); const it = JSON.parse(JSON.stringify(sl.v[l - 1])); if (l !== L) { it.adj = l > L ? 'up' : 'down'; adj.push({ q: sl.q, l, mv: it.mv }); } return it; });
  const wq = weakKey(k);
  if (wq) { const it = JSON.parse(JSON.stringify(QFIX[wq].v[Math.min(L, 2) - 1])); if (!items.some(x => x.mv === it.mv)) { it.fix = wq; items.push(it); } }
  return { nom: `${s.nom} · ${LV[L]}`, sport: s.sport, items, lvl: L, adj, fix: wq };
}
function specSeances(k) { const L = specLevel(k); return SPEC[k].seances.map((_, i) => specSession(k, i, L)); }
function setSpecLvl(k, l) { S.specLvl = S.specLvl || {}; if (l === recLevel()) delete S.specLvl[k]; else S.specLvl[k] = l; save(); haptic(8); openSpec(k, true); }
function openSpec(k, re) {
  const s = SPEC[k], L = specLevel(k), rec = recLevel(), t = S.tests.at(-1), wq = weakKey(k);
  const S0 = specSeances(k).map(x => personalize(x));
  READY = S0.map(x => ({ s: x }));
  const sc = q => t && t.scores[q] != null ? ` (${t.scores[q]}/5)` : '';
  let h = `<div class="row" style="gap:12px"><div style="font-size:40px">${s.ic}</div><div style="flex:1"><h2 style="margin:0">Préparation ${esc(s.nom)}</h2><div class="mu small">${esc(SPCAT[s.cat])}</div></div></div>
    <label class="f" style="margin-top:14px">Niveau de la préparation</label>
    <div class="seg lv3">${[1, 2, 3].map(l => `<button class="${L === l ? 'on' : ''}" onclick="setSpecLvl('${k}',${l})">${LV[l]}${l === rec && t ? '<i>conseillé</i>' : ''}</button>`).join('')}</div>
    <div class="tip" style="margin-top:10px">${t ? `🧪 D’après votre test (${esc(t.levelTxt)}), le niveau conseillé est <b>${LV[rec]}</b>. Chaque exercice est ensuite ajusté selon la qualité qu’il travaille : ${s.key.map(q => esc(QUAL[q]) + sc(q)).join(', ')}.` : '🧪 Faites le test de capacités pour obtenir un niveau conseillé et des exercices ajustés à vos points forts et faibles. <a onclick="closeSheet();startTest()" style="color:var(--ac2);font-weight:700">Faire le test</a>'}</div>
    ${wq ? `<div class="tip" style="margin-top:8px;border-color:rgba(245,158,11,.4);background:rgba(245,158,11,.08);color:#fde68a">🎯 Point faible détecté : <b>${esc(QUAL[wq])}</b>${sc(wq)}. Un exercice ciblé est ajouté à chaque séance.</div>` : ''}
    <div class="grid2" style="margin-top:12px"><div class="kpi"><div class="l">Qualités clés</div><div class="small" style="margin-top:4px">${esc(s.qual)}</div></div>
    <div class="kpi" style="border-color:rgba(244,63,94,.35)"><div class="l" style="color:#fda4af">Zones à protéger</div><div class="small" style="margin-top:4px">${esc(s.risques)}</div></div></div>
    <h3 class="sec">Séances · ${LV[L]}</h3>${S0.map((x, i) => `<div class="kpi" style="margin-top:8px"><div class="row" style="justify-content:space-between"><b>${SPORTS[x.sport].ic} ${esc(x.nom)}</b><span class="row" style="gap:6px"><button class="btn sm" onclick="shareSession(READY[${i}].s)" aria-label="Partager">🔗</button><button class="btn sm pri" onclick="closeSheet();startReady(${i})">${ic('play')}</button></span></div>
      <div class="spl">${x.items.map(it => `<div class="spi" onclick="openMv('${it.mv}',1)">${mvImg(it.mv, 'thumb')}<span><b>${esc(mvName(it))}</b><small>${typeof it.sets === 'number' ? it.sets + ' × ' + (it.sec ? it.sec + ' s' : it.reps) : ''}${it.rest ? ' · repos ' + it.rest + ' s' : ''}</small></span>${it.fix ? '<em class="b fix">point faible</em>' : it.adj === 'up' ? '<em class="b up">▲ plus dur</em>' : it.adj === 'down' ? '<em class="b down">▼ plus facile</em>' : ''}</div>`).join('')}</div></div>`).join('')}
    ${S.prog && S.prog.id === 'sp_' + k ? `<div class="tip" style="margin-top:14px">✅ Préparation suivie : ${S.prog.done.length} séance(s) faite(s). Le niveau choisi s’applique aux prochaines séances.</div>` : `<button class="btn pri w" style="margin-top:14px" onclick="S.prog={id:'sp_${k}',start:today(),done:[]};save();closeSheet();go('home');toast('Préparation ${esc(s.nom)} lancée 💪')">Suivre la préparation (6 semaines, 2×/sem.)</button>`}
    <h3 class="sec">Conseils</h3><ul class="small" style="padding-left:18px;line-height:1.5">${s.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    ${s.src && s.src.length ? `<p class="mu tiny" style="margin-top:12px">Sources : ${s.src.map(([a, u]) => `<a href="${u}" target="_blank" rel="noopener" style="color:var(--ac2)">${esc(a)}</a>`).join(' · ')}</p>` : ''}
    <p class="mu tiny">En cas de douleur ou de blessure, demandez l’avis d’un kiné ou d’un médecin. Les exercices avancés (pont de lutte, équilibre sur les mains…) se pratiquent idéalement avec un encadrement.</p>`;
  const sh = re && $('#sheetBg .sheet'); if (sh) { const st = sh.scrollTop; sh.innerHTML = '<div class="grab"></div>' + h; sh.scrollTop = st; } else sheet(h);
}
// adapte une séance aux résultats du test (répétitions, durées, allures)
function personalize(s) {
  const t = S.tests.at(-1); if (!t) return filterPain(applyPhase(s)); const R = t.res;
  if (s.items) s.items.forEach(it => {
    if (it.mv === 'pompe' && R.pompes) it.reps = clamp(Math.round(R.pompes * .6), 3, 40);
    if (it.mv === 'tractions' && R.tractions != null) it.reps = R.tractions >= 2 ? clamp(Math.round(R.tractions * .6), 1, 15) : 3;
    if (it.mv === 'gainage' && R.gainage && it.sec) it.sec = clamp(Math.round(R.gainage * .5 / 5) * 5, 15, 120);
    if (it.mv === 'gainlat' && R.gainage && it.sec) it.sec = clamp(Math.round(R.gainage * .35 / 5) * 5, 15, 60);
    if (it.mv === 'goblet' && R.squats && !S.profile.mat.some(m => m === 'halteres' || m === 'salle')) it.reps = clamp(Math.round(R.squats * .4), 8, 30);
  });
  const vma = t.info && t.info.vma;
  if (s.blocks && vma && s.sport === 'course') s.blocks = s.blocks.map(b => ({ ...b, d: b.d + (/endurance|footing|course lente|continue/i.test(b.d) ? ` (≈ ${pace(60 / (vma * .7))}/km)` : /VMA|30\/30/i.test(b.d) ? ` (≈ ${pace(60 / vma)}/km)` : /seuil|allure 10 km/i.test(b.d) ? ` (≈ ${pace(60 / (vma * .87))}/km)` : '') }));
  return filterPain(applyPhase(s));
}

// ===================== PROFIL & OBJECTIFS =====================
function goalProgress(g, off = 0) {
  const w = weekStats(off), L = w.L.filter(x => g.sport === 'all' || x.sport === g.sport);
  const v = g.type === 'km' ? L.reduce((a, x) => a + distKm(x), 0) : g.type === 'minutes' ? L.reduce((a, x) => a + (+x.dur || 0), 0) : L.length;
  return { v, p: clamp(v / g.target, 0, 1) };
}
function vProfil() {
  const first = S.sessions.length ? monday(parseD(S.sessions.map(x => x.date).sort()[0])) : new Date(), P = S.profile, rate = (() => { let ok = 0, n = 0; for (let w = 1; w <= 8; w++) { if (weekStats(-w).a < first) break; S.goals.forEach(g => { n++; if (goalProgress(g, -w).p >= 1) ok++; }); } return n ? Math.round(ok / n * 100) + '<small>%</small>' : '—'; })();
  const missed = S.goals.filter(g => goalProgress(g, -1).p < 1 && S.sessions.some(x => parseD(x.date) < weekStats(-1).a));
  let h = `<h1 class="vt">Profil</h1><div class="card"><div class="row"><div class="em" style="font-size:30px">👤</div><div style="flex:1"><b style="font-size:17px">${esc(P.prenom || 'Sportif')}</b><div class="mu small">${P.age ? P.age + ' ans · ' : ''}${OBJ[P.obj]} · ${P.jours} séances/sem.</div></div><button class="btn sm" onclick="editProfile()">${ic('edit')}</button></div>
    <div class="grid3" style="margin-top:12px"><div class="kpi"><div class="l">Séances</div><div class="v">${S.sessions.length}</div></div><div class="kpi"><div class="l">Temps total</div><div class="v" style="font-size:19px">${hmin(S.sessions.reduce((a, x) => a + (+x.dur || 0), 0))}</div></div><div class="kpi"><div class="l">Objectifs tenus</div><div class="v">${rate}</div></div></div>
    <p class="mu small" style="margin:10px 0 0" onclick="kcalInfo()">🔥 Dépense totale estimée : <b style="color:var(--tx)">${kcTxt(S.sessions.reduce((a, x) => a + kc(x), 0))}</b> · ce mois-ci ${kcTxt(S.sessions.filter(x => x.date.startsWith(today().slice(0, 7))).reduce((a, x) => a + kc(x), 0))} <span style="color:var(--ac2)">ⓘ</span></p></div>`;
  const prt = S.profile.pratique || [];
  h += `<h3 class="sec">Mes sports pratiqués <a onclick="sportsPicker()">Modifier</a></h3><div class="card">${prt.length ? `<div class="chips" style="flex-wrap:wrap">${prt.map(k => `<button class="chip on" onclick="openSpec('${k}')">${SPEC[k].ic} ${SPEC[k].nom}</button>`).join('')}</div>` : '<p class="mu small" style="margin:0">Ajoutez votre sport pour recevoir une préparation spécifique.</p>'}</div>
    <h3 class="sec">Ma semaine</h3><div class="card"><p class="mu small" style="margin-top:0">Indiquez vos jours indisponibles ou chargés : les séances sont réparties automatiquement.</p><div class="grid2"><button class="btn" onclick="openPlanner(0)">📅 Cette semaine</button><button class="btn" onclick="openPlanner(1)">📅 Semaine prochaine</button></div></div>`;
  h += `<h3 class="sec">Motivation</h3><div class="card"><label class="row" style="gap:12px;cursor:pointer"><span class="em" style="font-size:26px">💥</span><span style="flex:1"><b>Bannières style manga</b><span class="mu small" style="display:block">Accueil, départ de séance, records et victoire</span></span><input type="checkbox" style="width:24px;height:24px;accent-color:#22c55e" ${S.manga === false ? '' : 'checked'} onchange="S.manga=this.checked;save();toast(this.checked?'💥 Bannières activées':'Bannières désactivées')"></label></div>`;
  h += badgesSection() + `<div class="grid2" style="margin-top:10px"><button class="btn" onclick="monthReport()">📸 Bilan du mois</button><button class="btn" onclick="shareApp()">📤 Partager l’appli</button></div>`;
  h += `<h3 class="sec">Entraînement</h3><div class="grid3"><button class="btn" onclick="eventForm()">🎯 Objectif</button><button class="btn" onclick="painForm()">🩹 Douleurs</button><button class="btn" onclick="openCoach()">❤️ Zones</button></div>${eventCard()}${painNote()}` + nutritionCard();
  h += `<h3 class="sec">Affichage & séance</h3><div class="card">${[['voice', '🔊 Annonces vocales pendant la séance (repos, départ)'], ['big', '🔠 Grand affichage en séance (mode salle)'], ['calm', '🌿 Réduire les animations']].map(([k, l]) => `<label class="row tgl"><span style="flex:1">${l}</span><input type="checkbox" ${S[k] ? 'checked' : ''} onchange="S.${k}=this.checked;save();render()"></label>`).join('')}</div>`;
  h += `<h3 class="sec">Connexions & coach</h3><div class="card"><div class="grid2"><button class="btn" onclick="openConnect()">⌚ Garmin & Strava</button><button class="btn" onclick="openCoach()">🤖 Coach${aiOn() ? ' IA ✓' : ''}</button></div><p class="mu tiny" style="margin:8px 0 0">${S.sessions.filter(x => x.ext).length} activité(s) importée(s) · IA ${aiOn() ? 'activée' : 'non activée (facultative)'}</p></div>`;
  h += bodySection() + remindSection();
  h += `<h3 class="sec">Objectifs de la semaine <a onclick="goalForm()">+ Ajouter</a></h3>`;
  h += S.goals.map(g => { const r = goalProgress(g); return `<div class="card"><div class="row" style="justify-content:space-between"><b>${esc(g.titre)}</b><button class="btn sm ghost" onclick="S.goals=S.goals.filter(x=>x.id!=='${g.id}');save();render()">${ic('trash')}</button></div>
    <div class="pbar" style="margin:10px 0 6px"><i style="width:${r.p * 100}%"></i></div><div class="row" style="justify-content:space-between"><span class="mu small">${g.type === 'km' ? r.v.toFixed(1) : Math.round(r.v)} / ${g.target} ${g.type === 'km' ? 'km' : g.type === 'minutes' ? 'min' : 'séances'}</span>${r.p >= 1 ? '<span class="pill ok">Réussi ✓</span>' : `<span class="pill dan">Pénalité : ${esc(g.penalite || '—')}</span>`}</div></div>`; }).join('') || '<div class="card empty">Aucun objectif.</div>';
  if (missed.length) h += `<div class="card" style="border-color:rgba(244,63,94,.4)"><b>⚠️ Semaine dernière : objectif manqué</b><div class="mu small" style="margin-top:6px">${missed.map(g => `${esc(g.titre)} → <b style="color:#fda4af">${esc(g.penalite)}</b>`).join('<br>')}</div></div>`;
  h += `<h3 class="sec">Tests de capacités</h3>${testEvo()}${retestDue() ? '<div class="tip" style="margin-bottom:8px">🧪 Votre dernier test date de plus de 6 semaines : refaites-le pour mesurer vos progrès.</div>' : ''}${S.tests.length ? S.tests.map((t, i) => `<button class="li" onclick="showTest(${i})"><span class="em">🧪</span><span class="t"><b>${t.levelTxt} · ${t.avg.toFixed(1)}/5</b><small>${fmtDate(t.date, { day: 'numeric', month: 'long', year: 'numeric' })}</small></span>${ic('right')}</button>`).reverse().join('') : ''}<button class="btn w" style="margin-top:8px" onclick="startTest()">${ic('test')}${S.tests.length ? 'Refaire le test (conseillé toutes les 6 semaines)' : 'Faire le test'}</button>`;
  h += `<h3 class="sec">Données</h3><div class="card"><p class="mu small" style="margin-top:0">Vos données restent sur cet appareil. Sauvegardez-les dans Fichiers, iCloud Drive ou par AirDrop (photos incluses). Dernière sauvegarde : <b>${S.lastBackup ? fmtDate(S.lastBackup, { day: 'numeric', month: 'long' }) : 'jamais'}</b>.</p><div class="grid2"><button class="btn" onclick="exportData()">⬇️ Sauvegarder</button><label class="btn" style="cursor:pointer">⬆️ Restaurer<input type="file" accept=".json" hidden onchange="importData(this.files[0])"></label></div>
    <button class="btn dan w" style="margin-top:8px" onclick="if(confirm('Effacer toutes les données ?')&&confirm('Vraiment tout effacer ?')){localStorage.removeItem(KEY);localStorage.removeItem('apexfit_state');S=blank();save();render()}">Tout effacer</button></div>
    <p class="mu tiny" style="text-align:center;margin:18px 0">ApexFit v3.9 · données 100 % locales<br>Photos d’exercices : free-exercise-db (domaine public)</p>`;
  $('#view').innerHTML = h;
  bodyChart(); loadThumbs(); drawTestEvo();
}
function editProfile() {
  const P = S.profile;
  sheet(`<h2>Mon profil</h2><div class="grid2"><label class="f">Prénom<input class="in" id="pP" value="${esc(P.prenom)}"></label><label class="f">Âge<input class="in" type="number" id="pA" value="${P.age || ''}"></label></div>
    <label class="f">Objectif<select class="in" id="pO">${Object.entries(OBJ).map(([k, v]) => `<option value="${k}" ${P.obj === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
    <label class="f">Séances visées par semaine<input class="in" type="number" min="1" max="7" id="pJ" value="${P.jours}"></label>
    <button class="btn pri w" style="margin-top:14px" onclick="Object.assign(S.profile,{prenom:$('#pP').value.trim(),age:+$('#pA').value||30,obj:$('#pO').value,jours:clamp(+$('#pJ').value||3,1,7)});save();closeSheet();render()">Enregistrer</button>`);
}
function goalForm() {
  sheet(`<h2>Nouvel objectif hebdo</h2><label class="f">Type<select class="in" id="gT"><option value="seances">Nombre de séances</option><option value="km">Kilomètres</option><option value="minutes">Minutes d’activité</option></select></label>
    <label class="f">Sport<select class="in" id="gS"><option value="all">Tous les sports</option>${Object.keys(SPORTS).map(k => `<option value="${k}">${SPORTS[k].nom}</option>`).join('')}</select></label>
    <label class="f">Cible par semaine<input class="in" type="number" id="gV" value="3"></label><label class="f">Pénalité si raté<input class="in" id="gP" placeholder="Ex. : 50 burpees"></label>
    <button class="btn pri w" style="margin-top:14px" onclick="goalAdd()">Ajouter</button>`);
}
function goalAdd() {
  const t = $('#gT').value, sp = $('#gS').value, v = +$('#gV').value; if (!v) return toast('Indiquez une cible');
  S.goals.push({ id: uid(), type: t, sport: sp, target: v, penalite: $('#gP').value.trim() || '—', titre: `${v} ${t === 'km' ? 'km' : t === 'minutes' ? 'min' : 'séances'}${sp === 'all' ? '' : ' de ' + SPORTS[sp].nom.toLowerCase()} par semaine` }); save(); closeSheet(); render();
}

// ===================== CORPS : POIDS, MENSURATIONS, PHOTOS =====================
const MES = { poids: ['Poids', 'kg'], taille_t: ['Tour de taille', 'cm'], hanches: ['Hanches', 'cm'], poitrine: ['Poitrine', 'cm'], bras: ['Bras', 'cm'], cuisse: ['Cuisse', 'cm'], mg: ['Masse grasse', '%'] };
let bodyM = 'poids';
function bodySection() {
  const B = [...S.body].sort((a, b) => a.date.localeCompare(b.date)), keys = Object.keys(MES).filter(k => B.some(b => b[k] != null && b[k] !== ''));
  if (!keys.includes(bodyM)) bodyM = keys[0] || 'poids';
  let h = `<h3 class="sec" id="corps">Corps & mensurations <a onclick="bodyForm()">+ Mesure</a></h3>`;
  if (!B.length) return h + `<div class="card empty"><div class="e">⚖️</div>Notez votre poids et vos mensurations (et des photos) pour suivre votre transformation.<br><button class="btn pri" style="margin-top:12px" onclick="bodyForm()">${ic('plus')}Première mesure</button></div>`;
  const first = B.find(b => b[bodyM] != null && b[bodyM] !== ''), last = [...B].reverse().find(b => b[bodyM] != null && b[bodyM] !== ''), d = last && first ? last[bodyM] - first[bodyM] : 0;
  const P = S.profile, imc = last && last.poids && P.taille ? last.poids / (P.taille / 100) ** 2 : 0;
  h += `<div class="card"><div class="chips" style="margin-bottom:10px">${keys.map(k => `<button class="chip ${k === bodyM ? 'on' : ''}" onclick="bodyM='${k}';render()">${MES[k][0]}</button>`).join('')}</div>
    <div class="grid3"><div class="kpi"><div class="l">Actuel</div><div class="v">${last ? String(last[bodyM]).replace('.', ',') : '—'}<small> ${MES[bodyM][1]}</small></div></div>
    <div class="kpi"><div class="l">Évolution</div><div class="v" style="color:${d <= 0 ? '#4ade80' : '#fbbf24'}">${d > 0 ? '+' : ''}${d.toFixed(1).replace('.', ',')}<small> ${MES[bodyM][1]}</small></div></div>
    <div class="kpi"><div class="l">${imc ? 'IMC' : 'Mesures'}</div><div class="v">${imc ? imc.toFixed(1).replace('.', ',') : B.length}</div></div></div>
    <canvas class="ch" id="bodyChart" height="180" style="margin-top:10px"></canvas></div>`;
  const ph = B.filter(b => b.photo);
  h += `<div class="card"><div class="row" style="justify-content:space-between"><b>📸 Photos de progression</b>${ph.length >= 2 ? `<button class="btn sm" onclick="compareForm()">Avant / après</button>` : ''}</div>
    ${ph.length ? `<div class="thumbs">${ph.slice(-8).reverse().map(b => `<button class="th" onclick="viewPhoto('${b.id}')"><img data-ph="${b.photo}" alt=""><span>${fmtDate(b.date, { day: 'numeric', month: 'short' })}</span></button>`).join('')}</div>` : '<p class="mu small">Ajoutez une photo à vos mesures (même pose, même lumière) pour comparer.</p>'}</div>`;
  h += [...B].reverse().slice(0, 6).map(b => `<div class="li" style="cursor:default"><span class="em">⚖️</span><span class="t"><b>${fmtDate(b.date, { day: 'numeric', month: 'long', year: 'numeric' })}</b><small>${Object.keys(MES).filter(k => b[k] != null && b[k] !== '').map(k => `${MES[k][0]} ${String(b[k]).replace('.', ',')} ${MES[k][1]}`).join(' · ')}${b.photo ? ' · 📸' : ''}</small></span><button class="btn sm ghost" onclick="if(confirm('Supprimer cette mesure ?')){delPhoto('${b.photo || ''}');S.body=S.body.filter(x=>x.id!=='${b.id}');save();render()}">${ic('trash')}</button></div>`).join('');
  return h;
}
function bodyChart() { const c = $('#bodyChart'); if (!c) return; const B = [...S.body].filter(b => b[bodyM] != null && b[bodyM] !== '').sort((a, b) => a.date.localeCompare(b.date)); drawLine(c, B.map(b => [b.date, +b[bodyM]]), '#22c55e', false, true); }
function bodyForm() {
  const last = [...S.body].sort((a, b) => a.date.localeCompare(b.date)).at(-1) || {};
  sheet(`<h2>Nouvelle mesure</h2><p class="mu small">Mesurez-vous le matin, à jeun, dans les mêmes conditions. Tout est facultatif sauf la date.</p>
    <label class="f">Date<input class="in" type="date" id="bD" value="${today()}"></label>
    <div class="grid2">${Object.entries(MES).map(([k, [n, u]]) => `<label class="f">${n} (${u})<input class="in" type="number" step="0.1" inputmode="decimal" id="b_${k}" placeholder="${last[k] != null ? String(last[k]).replace('.', ',') : ''}"></label>`).join('')}</div>
    <label class="btn w" style="margin-top:14px;cursor:pointer">📸 Ajouter une photo<input type="file" accept="image/*" hidden onchange="pickPhoto(this.files[0])"></label><div id="bPh" class="mu small" style="text-align:center;margin-top:6px"></div>
    <button class="btn pri w" style="margin-top:12px" onclick="bodySave()">${ic('check')}Enregistrer</button>`);
}
let pendingPhoto = null;
async function pickPhoto(f) {
  if (!f) return; try {
    const url = URL.createObjectURL(f), img = await new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = url; });
    const k = Math.min(1, 900 / Math.max(img.width, img.height)), c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
    pendingPhoto = await new Promise(r => c.toBlob(r, 'image/jpeg', .82)); $('#bPh').innerHTML = `<img src="${URL.createObjectURL(pendingPhoto)}" style="max-height:140px;border-radius:12px;margin-top:6px">`;
  } catch (e) { toast('Photo illisible'); }
}
async function bodySave() {
  const b = { id: uid(), date: $('#bD').value || today() }; let any = false;
  Object.keys(MES).forEach(k => { const v = $('#b_' + k).value.replace(',', '.'); if (v !== '' && !isNaN(+v)) { b[k] = +v; any = true; } });
  if (!any && !pendingPhoto) return toast('Indiquez au moins une mesure ou une photo');
  if (pendingPhoto) { b.photo = 'ph_' + b.id; await idbPut(b.photo, pendingPhoto); pendingPhoto = null; }
  if (b.poids) S.profile.poids = b.poids;
  S.body.push(b); save(); closeSheet(); lastKey = ''; render(); toast('Mesure enregistrée ✅'); haptic(15);
}
// photos : IndexedDB (trop lourdes pour le stockage simple)
function idb() { return new Promise((r, j) => { const q = indexedDB.open('apexfit', 1); q.onupgradeneeded = () => q.result.createObjectStore('ph'); q.onsuccess = () => r(q.result); q.onerror = () => j(q.error); }); }
async function idbPut(k, v) { const d = await idb(); return new Promise((r, j) => { const t = d.transaction('ph', 'readwrite'); t.objectStore('ph').put(v, k); t.oncomplete = r; t.onerror = () => j(t.error); }); }
async function idbGet(k) { const d = await idb(); return new Promise(r => { const q = d.transaction('ph').objectStore('ph').get(k); q.onsuccess = () => r(q.result); q.onerror = () => r(null); }); }
function delPhoto(k) { if (!k) return; idb().then(d => d.transaction('ph', 'readwrite').objectStore('ph').delete(k)).catch(() => {}); }
const urlCache = {};
async function photoURL(k) { if (urlCache[k]) return urlCache[k]; const b = await idbGet(k); return b ? (urlCache[k] = URL.createObjectURL(b)) : ''; }
function loadThumbs() { $$('img[data-ph]').forEach(async i => { i.src = await photoURL(i.dataset.ph); }); }
async function viewPhoto(id) { const b = S.body.find(x => x.id === id); sheet(`<h2>${fmtDate(b.date, { day: 'numeric', month: 'long', year: 'numeric' })}</h2><img src="${await photoURL(b.photo)}" style="width:100%;border-radius:16px;margin-top:8px"><p class="mu small">${Object.keys(MES).filter(k => b[k] != null).map(k => `${MES[k][0]} ${String(b[k]).replace('.', ',')} ${MES[k][1]}`).join(' · ')}</p>`); }
async function compareForm(i0, i1) {
  const ph = [...S.body].filter(b => b.photo).sort((a, b) => a.date.localeCompare(b.date)); const A = ph[i0 ?? 0], B = ph[i1 ?? ph.length - 1];
  const opt = sel => ph.map((b, i) => `<option value="${i}" ${b === sel ? 'selected' : ''}>${fmtDate(b.date, { day: 'numeric', month: 'short', year: '2-digit' })}</option>`).join('');
  const dw = A.poids && B.poids ? B.poids - A.poids : null;
  sheet(`<h2>Avant / après</h2><div class="grid2"><select class="in" id="cA" onchange="compareForm(+this.value,+$('#cB').value)">${opt(A)}</select><select class="in" id="cB" onchange="compareForm(+$('#cA').value,+this.value)">${opt(B)}</select></div>
    <div class="cmp" id="cmp"><img src="${await photoURL(B.photo)}"><img id="cmpA" src="${await photoURL(A.photo)}" style="clip-path:inset(0 50% 0 0)"><div class="cmpBar" id="cmpBar"></div>
    <span class="cmpL">Avant</span><span class="cmpR">Après</span></div><input type="range" min="0" max="100" value="50" oninput="$('#cmpA').style.clipPath='inset(0 '+(100-this.value)+'% 0 0)';$('#cmpBar').style.left=this.value+'%'">
    ${dw != null ? `<p class="small" style="text-align:center">Poids : <b>${String(A.poids).replace('.', ',')} → ${String(B.poids).replace('.', ',')} kg</b> (${dw > 0 ? '+' : ''}${dw.toFixed(1).replace('.', ',')} kg) en ${Math.round((parseD(B.date) - parseD(A.date)) / 864e5)} jours</p>` : ''}`);
}
function spark(c, v) {
  if (!c || v.length < 2) return; const x = c.getContext('2d'), W = c.width, H = c.height, mn = Math.min(...v), mx = Math.max(...v), r = mx - mn || 1;
  const P = v.map((y, i) => [4 + i * (W - 8) / (v.length - 1), H - 6 - (y - mn) / r * (H - 12)]);
  x.beginPath(); P.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.strokeStyle = v.at(-1) <= v[0] ? '#4ade80' : '#fbbf24'; x.lineWidth = 4; x.lineJoin = 'round'; x.stroke();
  const [a, b] = P.at(-1); x.beginPath(); x.arc(a, b, 5, 0, 7); x.fillStyle = x.strokeStyle; x.fill();
}

// ===================== RAPPELS =====================
const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], ICSD = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
function remindSection() {
  const R0 = S.remind;
  return `<h3 class="sec">Rappels de séance</h3><div class="card"><p class="mu small" style="margin-top:0">${R0 ? `Jours : <b style="color:var(--tx)">${R0.days.map(d => JOURS[d]).join(', ')}</b> à <b style="color:var(--tx)">${R0.time}</b>` : 'Choisissez vos jours et votre heure d’entraînement : l’appli les ajoute à votre calendrier avec une alerte.'}</p>
    <button class="btn w ${R0 ? '' : 'pri'}" onclick="remindForm()">🔔 ${R0 ? 'Modifier les rappels' : 'Programmer mes rappels'}</button></div>`;
}
function remindForm() {
  const R0 = S.remind || { days: defaultDays(), time: '18:30', alert: 15 };
  sheet(`<h2>Rappels de séance</h2><p class="mu small">Les rappels sont ajoutés au <b>calendrier de votre téléphone</b> : vous recevez une alerte même appli fermée.</p>
    <label class="f">Jours d’entraînement</label><div class="chips" style="flex-wrap:wrap" id="rD">${JOURS.map((j, i) => `<button class="chip ${R0.days.includes(i) ? 'on' : ''}" data-d="${i}" onclick="this.classList.toggle('on')">${j}</button>`).join('')}</div>
    <div class="grid2"><label class="f">Heure<input class="in" type="time" id="rT" value="${R0.time}"></label><label class="f">Alerte<select class="in" id="rA">${[[0, 'À l’heure'], [15, '15 min avant'], [30, '30 min avant'], [60, '1 h avant']].map(([v, l]) => `<option value="${v}" ${R0.alert === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
    <button class="btn pri w" style="margin-top:14px" onclick="remindSave()">📅 Ajouter à mon calendrier</button>
    ${S.remind ? `<button class="btn dan w" style="margin-top:8px" onclick="S.remind=null;save();closeSheet();render();toast('Rappels désactivés dans l’appli (supprimez aussi l’événement du calendrier)')">Désactiver les rappels</button>` : ''}
    <p class="mu tiny" style="margin-top:10px">Sur iPhone : touchez le fichier téléchargé puis « Ajouter tout ». Pour changer d’horaire, supprimez l’ancien événement « ApexFit » de votre calendrier.</p>`);
}
function remindSave() {
  const days = $$('#rD .chip.on').map(b => +b.dataset.d).sort(); if (!days.length) return toast('Choisissez au moins un jour');
  S.remind = { days, time: $('#rT').value || '18:30', alert: +$('#rA').value }; save();
  const [hh, mm] = S.remind.time.split(':').map(Number), d = new Date(); d.setHours(hh, mm, 0, 0);
  while (!days.includes((d.getDay() + 6) % 7) || d < new Date()) d.setDate(d.getDate() + 1);
  const f = x => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`, now = new Date();
  const p = S.prog && PROGRAMS.find(x => x.id === S.prog.id);
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ApexFit//FR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:apexfit-rappel-${uid()}@apexfit`, `DTSTAMP:${f(now)}`, `DTSTART:${f(d)}`, 'DURATION:PT1H',
    `RRULE:FREQ=WEEKLY;BYDAY=${days.map(i => ICSD[i]).join(',')}`, `SUMMARY:💪 Séance ApexFit${p ? ' — ' + p.nom : ''}`, `DESCRIPTION:Ouvrez ApexFit pour démarrer votre séance : ${location.href.split('#')[0]}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:C’est l’heure de votre séance ApexFit 💪', `TRIGGER:-PT${S.remind.alert}M`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'apexfit-rappels.ics'; document.body.appendChild(a); a.click(); a.remove();
  closeSheet(); lastKey = ''; render(); toast('📅 Fichier calendrier créé : ouvrez-le pour ajouter les rappels', 4500);
}

// ===================== INTERACTIONS DYNAMIQUES =====================
const haptic = p => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
const reduced = () => !!S.calm || matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastKey = '';
function enhance() {
  const key = route.v + (route.sp || '') + (route.v === 'sport' ? spTab : '') + (route.v === 'programmes' ? progF : '');
  const fresh = key !== lastKey; lastKey = key;
  if (fresh && !reduced()) {
    [...$('#view').children].forEach((el, i) => { el.style.setProperty('--i', Math.min(i, 12)); el.classList.add('rise'); });
    countUp(); fillBars(); ringFill();
    if ($('#weekChart')) { const t0 = performance.now(); const st = t => { const k = Math.min(1, (t - t0) / 700); weekChart(1 - Math.pow(1 - k, 3)); if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); }
  }
  const cal = $('#view .cal'); if (cal) swipeCal(cal.parentElement);
  $$('#view .li[onclick^="openSession"]').forEach(swipeDelete);
}
// chiffres qui défilent jusqu'à leur valeur
function countUp() {
  $$('#view .kpi .v, #view .ring b, #view .hero [data-count]').forEach(el => {
    const tn = [...el.childNodes].find(n => n.nodeType === 3 && /\d/.test(n.textContent)); if (!tn) return;
    const m = tn.textContent.match(/(\d+(?:[.,]\d+)?)/); if (!m) return;
    const target = parseFloat(m[1].replace(',', '.')), dec = (m[1].split(/[.,]/)[1] || '').length, pre = tn.textContent.slice(0, m.index), post = tn.textContent.slice(m.index + m[1].length);
    if (!target) return; const t0 = performance.now(), D = 800;
    const st = t => { const k = Math.min(1, (t - t0) / D), v = target * (1 - Math.pow(1 - k, 3)); tn.textContent = pre + v.toFixed(dec) + post; if (k < 1) requestAnimationFrame(st); };
    requestAnimationFrame(st);
  });
}
function fillBars() { $$('#view .pbar i').forEach(i => { const w = i.style.width; i.style.width = '0'; requestAnimationFrame(() => requestAnimationFrame(() => { i.style.width = w; })); }); }
function ringFill() { const r = $('#view .ring'); if (!r) return; const p = +getComputedStyle(r).getPropertyValue('--p') || 0, t0 = performance.now(); const st = t => { const k = Math.min(1, (t - t0) / 900); r.style.setProperty('--p', (p * (1 - Math.pow(1 - k, 3))).toFixed(1)); if (k < 1) requestAnimationFrame(st); }; requestAnimationFrame(st); }
// calendrier : balayer pour changer de mois
function swipeCal(box) {
  if (box.dataset.sw) return; box.dataset.sw = 1; let x0 = null, y0 = 0;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  box.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + (dx < 0 ? 1 : -1), 1); haptic(8); render(); const c = $('#view .cal'); if (c) c.classList.add(dx < 0 ? 'slideL' : 'slideR'); } });
}
// séance : balayer vers la gauche pour supprimer (avec annulation)
function swipeDelete(el) {
  if (el.dataset.sw) return; el.dataset.sw = 1; let x0 = null, y0 = 0, dx = 0, moved = false;
  const id = (el.getAttribute('onclick').match(/openSession\('([^']+)'\)/) || [])[1]; if (!id) return;
  el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; dx = 0; moved = false; el.style.transition = 'none'; }, { passive: true });
  el.addEventListener('touchmove', e => { if (x0 == null) return; dx = Math.min(0, e.touches[0].clientX - x0); if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(e.touches[0].clientY - y0)) { moved = true; el.style.transform = `translateX(${dx}px)`; el.style.boxShadow = `inset ${-dx}px 0 0 rgba(244,63,94,${Math.min(.5, -dx / 300)})`; } }, { passive: true });
  el.addEventListener('touchend', () => { if (x0 == null) return; x0 = null; el.style.transition = 'transform .25s, box-shadow .25s';
    if (dx < -110) { el.style.transform = 'translateX(-110%)'; haptic(20); setTimeout(() => deleteWithUndo(id), 220); } else { el.style.transform = ''; el.style.boxShadow = ''; } });
  el.addEventListener('click', e => { if (moved) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
}
function deleteWithUndo(id) {
  const i = S.sessions.findIndex(x => x.id === id); if (i < 0) return; const [s] = S.sessions.splice(i, 1); save(); lastKey = ''; render();
  const d = document.createElement('div'); d.className = 'toast'; d.innerHTML = `Séance supprimée <button class="btn sm" style="margin-left:10px;padding:6px 10px">Annuler</button>`; document.body.appendChild(d);
  d.querySelector('button').onclick = () => { S.sessions.splice(i, 0, s); save(); lastKey = ''; render(); d.remove(); haptic(10); };
  setTimeout(() => d.remove(), 5000);
}
// confettis
function confetti(n = 100) {
  if (reduced()) return; const c = document.createElement('canvas'), W = c.width = innerWidth * 2, H = c.height = innerHeight * 2, x = c.getContext('2d');
  c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:300'; document.body.appendChild(c);
  const col = ['#22c55e', '#4ade80', '#14b8a6', '#facc15', '#818cf8', '#f472b6', '#fb923c'];
  const P = Array.from({ length: n }, () => ({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .55, vx: (Math.random() - .5) * 34, vy: -Math.random() * 46 - 18, r: Math.random() * 10 + 6, a: Math.random() * 6, va: (Math.random() - .5) * .4, c: col[Math.random() * col.length | 0] }));
  const t0 = performance.now(); const st = t => { x.clearRect(0, 0, W, H); P.forEach(p => { p.vy += 1.4; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); });
    if (t - t0 < 2200) requestAnimationFrame(st); else c.remove(); }; requestAnimationFrame(st);
}
// petite vibration à chaque bouton (Android ; ignoré sur iPhone)
document.addEventListener('pointerdown', e => { if (e.target.closest('button, .li, .sp, .d, .block')) haptic(6); }, { passive: true });

// ===================== DÉMARRAGE =====================
if (!window.__TEST__) {

$('#nav').innerHTML = `<button data-v="home" onclick="go('home')">${ic('home')}Accueil</button><button data-v="sports" onclick="go('sports')">${ic('grid')}Sports</button>
  <button class="plus" onclick="plusMenu()" aria-label="Nouvelle séance">${ic('plus')}</button><button data-v="programmes" onclick="go('programmes')">${ic('list')}Programmes</button><button data-v="profil" onclick="go('profil')">${ic('user')}Profil</button>`;
save(); render(); checkBadges(true); checkShared(); window.addEventListener('hashchange', checkShared);
window.addEventListener('resize', () => { if (route.v === 'home') weekChart(); });
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
}

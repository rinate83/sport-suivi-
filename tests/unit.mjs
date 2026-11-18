// Tests des calculs d'ApexFit (sans navigateur) : node tests/unit.mjs
import fs from 'fs'; import assert from 'assert/strict';
const store = {};
const el = () => ({ innerHTML: '', style: {}, classList: { toggle() {}, add() {}, remove() {} }, appendChild() {}, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] });
globalThis.window = globalThis; globalThis.__TEST__ = true;
globalThis.localStorage = { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
globalThis.document = { addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], createElement: el, body: el(), documentElement: el() };
globalThis.matchMedia = () => ({ matches: false }); globalThis.addEventListener = () => {}; globalThis.innerWidth = 390; globalThis.innerHeight = 844;
const src = fs.readFileSync(new URL('../src/data.js', import.meta.url), 'utf8') + '\n' + fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
(0, eval)(src.replace(/^(const|let) /gm, 'var ') + '\nglobalThis.__ctx = { get S() { return S; }, set S(v) { S = v; } };');
let ok = 0; const t = (name, f) => Promise.resolve().then(f).then(() => { ok++; console.log('✓', name); }).catch(e => { console.error('✗', name, '\n ', e.message); process.exitCode = 1; });
const S = () => __ctx.S;

await t('données : toutes les séances de sport utilisent des exercices existants', () => {
  const ids = new Set(LIB.map(m => m.id));
  for (const [k, s] of Object.entries(SPEC)) s.seances.forEach(se => se.slots.forEach(sl => sl.v.forEach(it => assert.ok(ids.has(it.mv), k + ':' + it.mv))));
  PROGRAMS.filter(p => !p.spec).forEach(p => (p.weeks ? p.weeks.flat() : p.seances).forEach(s => (s.items || []).forEach(it => assert.ok(ids.has(it.mv), p.id + ':' + it.mv))));
});
await t('données : chaque exercice a une image', () => LIB.forEach(m => assert.ok(IMG[m.id], 'image ' + m.id)));
await t('niveaux : 3 niveaux par séance de sport', () => { for (const k of Object.keys(SPEC)) for (let l = 1; l <= 3; l++) assert.ok(specSession(k, 0, l).items.length >= 4); });
await t('niveaux : un point faible au test rend l’exercice plus facile', () => {
  S().tests = [{ date: today(), scores: { force_haut: 5, force_bas: 3, gainage: 1, souplesse: 3, cardio: 3 }, level: 2, levelTxt: 'Intermédiaire', res: {} }];
  assert.equal(qLvl('gainage', 2), 1); assert.equal(qLvl('force_haut', 2), 3); assert.equal(qLvl('force_haut', 1), 2);
  assert.ok(specSession('boxe', 0, 2).items.some(i => i.fix === 'gainage'));
  S().tests = [];
});
await t('périodisation : affûtage la dernière semaine, -40 % de séries', () => {
  const d = new Date(); d.setDate(d.getDate() + 5); S().event = { nom: 'Course', date: ymd(d) };
  assert.equal(phase().k, 'affutage'); const s = applyPhase({ items: [{ mv: 'squat', sets: 5, reps: 5 }] }); assert.equal(s.items[0].sets, 3);
  d.setDate(d.getDate() + 14); S().event.date = ymd(d); assert.equal(phase().k, 'intensif');
  S().event = null; assert.equal(phase(), null);
});
await t('douleurs : genou à 5/10 retire squat et fentes, garde les pompes', () => {
  S().pain = { genou: { lvl: 5, since: today() } };
  const s = filterPain({ items: [{ mv: 'squat' }, { mv: 'fentes' }, { mv: 'pompe' }] });
  assert.deepEqual(s.items.map(i => i.mv), ['pompe']); assert.equal(s.painRemoved.length, 2);
  S().pain = { genou: { lvl: 2, since: today() } }; assert.equal(filterPain({ items: [{ mv: 'squat' }] }).items.length, 1); S().pain = {};
});
await t('import FIT : séance de course lue correctement', () => {
  const FE = 631065600, ts = Math.floor(Date.UTC(2026, 10, 10, 7, 30) / 1000) - FE, b = [];
  const u8 = (...v) => v.forEach(x => b.push(x & 255)), u16 = v => u8(v, v >> 8), u32 = v => u8(v, v >> 8, v >> 16, v >> 24);
  u8(0x41, 0, 0); u16(18); u8(8); [[253, 4], [2, 4], [5, 1], [7, 4], [8, 4], [9, 4], [16, 1], [22, 2]].forEach(([n, s]) => u8(n, s, s === 4 ? 0x86 : s === 2 ? 0x84 : 2));
  u8(1); u32(ts + 2700); u32(ts); u8(1); u32(2700000); u32(2700000); u32(820000); u8(152); u16(85);
  const head = [12, 0x10, 0x34, 0x08, b.length & 255, (b.length >> 8) & 255, 0, 0, 46, 70, 73, 84];
  const a = parseFIT(new Uint8Array([...head, ...b, 0, 0]))[0];
  assert.equal(Math.round(a.sec), 2700); assert.equal(a.m, 8200); assert.equal(a.hr, 152); assert.equal(a.asc, 85);
  const s = toSession(a, 'garmin'); assert.equal(s.sport, 'course'); assert.equal(s.dist, 8.2); assert.equal(s.dur, 45);
});
await t('saisie rapide : « squat 4 séries de 8 à 80 kg, pompes 3 x 15 »', () => {
  const s = parseLog('squat 4 séries de 8 à 80 kg, pompes 3 x 15, gainage 3 fois 45 secondes');
  assert.equal(s.items[0].mv, 'squat'); assert.equal(s.items[0].sets.length, 4); assert.equal(s.items[0].sets[0].kg, 80);
  assert.equal(s.items[1].mv, 'pompe'); assert.equal(s.items[1].sets[0].reps, 15); assert.equal(s.items[2].sets[0].sec, 45);
  const c = parseLog('course 8 km en 45 minutes'); assert.equal(c.sport, 'course'); assert.equal(c.dist, 8); assert.equal(c.dur, 45);
});
await t('partage : une séance survit au lien compressé', async () => {
  const o = { nom: 'Haut du corps', sport: 'muscu', items: normItems([{ mv: 'pompe', sets: 3, reps: 12, rest: 60 }]) };
  const back = await unpack(await pack(o)); assert.deepEqual(back, JSON.parse(JSON.stringify(o)));
});
await t('charge : effort × durée sur 7 jours', () => {
  S().sessions = [{ id: 'a', date: today(), sport: 'course', dur: 40, rpe: 5 }]; assert.equal(loadStats().acute, 200); S().sessions = [];
});
await t('calories : MET × kg × h (Compendium 2024) et montre prioritaire', () => {
  S().profile.poids = 70; S().profile.age = 30;
  const run = kcalOf({ sport: 'course', dur: 60, dist: 10, rpe: 6 }); // 10 km/h ≈ 6,2 mph -> MET ≈ 9,7
  assert.ok(run.k > 640 && run.k < 700, 'course ' + run.k);
  assert.equal(kcalOf({ sport: 'mobilite', dur: 60, rpe: 3 }).k, Math.round(2.3 * 70));
  assert.equal(kcalOf({ sport: 'course', dur: 30, rpe: 6, ext: { kcal: 412 } }).k, 412);
  S().profile.age = 65; assert.ok(kcalOf({ sport: 'mobilite', dur: 60, rpe: 3 }).k < 161); S().profile.age = 30;
  S().profile.poids = ''; assert.equal(kcalOf({ sport: 'hiit', dur: 30, rpe: 9 }).est, true);
});
await t('poids du corps : 3 séries au plafond -> variante plus dure proposée', () => {
  S().sessions = [{ id: 'a', date: '2026-01-05', sport: 'muscu', rpe: 7, items: [{ mv: 'pompe', target: 15, sets: [15, 16, 15].map(r => ({ reps: r, done: true })) }] }];
  const sg = suggest('pompe', 15, false); assert.equal(sg.next, 'pompediam');
  S().sessions[0].items[0].sets[2].reps = 12; assert.equal(suggest('pompe', 15, false).next, undefined);
  S().sessions = [];
  ['pdc1', 'pdc2', 'pdc3', 'pdcx'].forEach(id => assert.ok(PROGRAMS.find(p => p.id === id && p.mat === 'aucun')));
  LADDERS.flat().forEach(id => assert.ok(mvById(id), id));
});

console.log(`\n${ok} tests réussis`);

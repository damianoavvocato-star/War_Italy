import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../www/index.html", import.meta.url), "utf8");
const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
assert.ok(scriptMatch, "script principale del gioco presente");
const script = scriptMatch[1];
const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("JavaScript di gioco valido", () => {
  assert.doesNotThrow(() => new Function(script));
});

test("ID HTML univoci e riferimenti DOM risolti", () => {
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, "non devono esserci ID duplicati");
  const refs = [...script.matchAll(/\$\(["']([^"']+)["']\)/g)].map((m) => m[1]);
  const missing = [...new Set(refs.filter((id) => !ids.includes(id)))];
  assert.deepEqual(missing, [], "tutti i riferimenti DOM devono esistere");
});

test("una sola azione per avvio campagna e fine turno", () => {
  assert.equal((script.match(/\$\(["']endTurn["']\)\.(?:onclick|addEventListener)/g) || []).length, 1);
  assert.equal((script.match(/\$\(["']enterGame["']\)\.(?:onclick|addEventListener)/g) || []).length, 1);
});

test("quattro fazioni, dodici regioni e sei tecnologie", () => {
  assert.equal((script.match(/name:"(?:Repubblica Italiana|Legione Mediterranea|Corporazione Aquila|Alleanza Alpina)"/g) || []).length, 4);
  assert.equal((script.match(/\{name:"(?:Valle d'Aosta|Piemonte|Liguria|Lombardia|Trentino-Alto Adige|Veneto|Emilia-Romagna|Toscana|Lazio|Campania|Puglia|Sicilia)"/g) || []).length, 12);
  for (const key of ["land", "air", "cyber", "logistics", "renewables", "shield"]) {
    assert.match(script, new RegExp(key + ":false"));
  }
});

test("difficoltà campagna configurabile, bilanciata e salvata", () => {
  for (const level of ["easy", "standard", "hard"]) {
    assert.match(html, new RegExp('option value="' + level + '"'));
  }
  assert.match(script, /difficultyFactor=difficulty==="hard"/);
  assert.match(script, /JSON.stringify\(\{player,difficulty,turn,res/);
  assert.match(script, /difficulty=\["easy","standard","hard"\]\.includes\(s\.difficulty\)/);
});

test("backup JSON esportabili e importazioni validate", () => {
  assert.match(html, /id="exportSave"/);
  assert.match(html, /id="importSave"/);
  assert.match(script, /function validateSaveData\(data\)/);
  assert.match(script, /if\(!validateSaveData\(data\)\)/);
  assert.match(script, /URL\.createObjectURL\(blob\)/);
});

test("menu compatto, salvataggi e sistemi principali presenti", () => {
  for (const tab of ["overview", "military", "economy", "research", "system"]) {
    assert.match(html, new RegExp('data-menu-tab="' + tab + '"'));
  }
  for (const id of ["saveGame", "loadGame", "attackLand", "diplomacyOffer", "endTurn", "build"]) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
});

test("versione 3.0.0 coerente tra app e pacchetto", () => {
  assert.match(html, /BUILD 3\.0\.0/);
  assert.equal(packageJson.version, "3.0.0");
});

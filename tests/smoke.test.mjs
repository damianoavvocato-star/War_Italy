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

test("quattro fazioni, 110 province e sei tecnologie", () => {
  assert.equal((script.match(/name:"(?:Repubblica Italiana|Legione Mediterranea|Corporazione Aquila|Alleanza Alpina)"/g) || []).length, 4);
  const regionBlock=script.slice(script.indexOf("const regions=["),script.indexOf("const initialRegions"));
  assert.equal((regionBlock.match(/\{name:/g) || []).length, 110);
  for (const key of ["land", "air", "cyber", "logistics", "renewables", "shield"]) assert.match(script, new RegExp(key + ":false"));
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

test("mappa strategica dell'Italia presente e interattiva", () => {
  assert.match(html, /MAPPA STRATEGICA · ITALIA/);
  assert.match(html, /viewBox="0 0 100 140"/);
  assert.match(html, /MAR ADRIATICO/);
  assert.match(html, /MAR TIRRENO/);
  for (let i = 0; i < 110; i++) assert.match(html, new RegExp('id="province-' + i + '"'));
  assert.match(script, /province\.setAttribute\("class","province "\+r\.owner\+\(selectedRegion===i\?" selected":""\)\)/);
  assert.match(script, /const strategicMapPositions=\[\[/);
});

test("versione 4.4.0 coerente tra app e pacchetto", () => {
  assert.match(html, /BUILD 4\.4\.0/);
  assert.equal(packageJson.version, "4.4.0");
});


test("diplomazia 4.4: alleanze condizionate, sanzioni e stato geopolitico", () => {
  for (const id of ["nationalStability", "unrestCount", "sanctionsCount", "allianceCount", "geopoliticsStatus", "treatySanctions", "liftSanctions"]) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
  assert.match(script, /function imposeSanctions\(\)/);
  assert.match(script, /function liftSanctions\(\)/);
  assert.match(script, /type==="alleanza"&&\(rivalRelations\[key\]\|\|0\)<20&&diplomaticPrestige<25/);
  assert.match(script, /rivalSanctions\[rival\]/);
  assert.match(script, /sanctionsCount/);
});

test("stabilità provinciale, programma civile e rivolte con migrazione compatibile", () => {
  assert.match(script, /function getNationalStability\(\)/);
  assert.match(script, /function processStabilityTurn\(\)/);
  assert.match(script, /function stabilizeSelectedProvince\(\)/);
  assert.match(script, /if\(r\.stability<=18&&Math\.random\(\)</);
  assert.match(script, /r\.owner=neighbor\?"enemy":"neutral"/);
  assert.match(script, /rivalSanctions,agents/);
  assert.match(script, /rivalSanctions=s\.rivalSanctions\|\|\{\}/);
  assert.match(script, /stability:Number\.isFinite\(direct\.stability\)/);
  assert.match(script, /stability:Number\.isFinite\(old\.stability\)/);
  assert.match(html, /id="stabilizeProvince"/);
});

test("battaglie tattiche con terreno, copertura e meteo", () => {
  for (const id of ["battleTerrain", "battleWeather", "battleCover", "battleTacticalInfo"]) assert.match(html, new RegExp('id="' + id + '"'));
  assert.match(script, /const terrainName=mountain\?/);
  assert.match(script, /const coverFactor=domain==="land"/);
  assert.match(script, /const weather=\["SERENO","PIOGGIA","NEBBIA"\]/);
  assert.match(script, /\*b\.coverFactor/);
  assert.match(script, /b\.terrainName/);
});

test("logistica con carburante, munizioni, consumo, rifornimento e migrazione salvataggi", () => {
  for (const id of ["fuel", "ammo", "refuel", "supplyStatus"]) assert.match(html, new RegExp('id="' + id + '"'));
  assert.match(script, /function processLogistics\(\)/);
  assert.match(script, /fuelUse=units\+commandos/);
  assert.match(script, /ammoUse=units\*2/);
  assert.match(script, /supplyFuel,supplyAmmo/);
  assert.match(script, /res=\{euros:0,energy:0,materials:0,morale:0,fuel:140,ammo:120/);
  assert.match(script, /processLogistics\(\)/);
});

test("nomi delle 110 province attivabili con zoom cartografico", () => {
  assert.match(html, /id="mapProvinceLabelsToggle"/);
  assert.match(script, /provinceLabelLayer/);
  assert.match(script, /provinceLabelsEnabled&&mapZoom>=1\.6/);
  assert.match(script, /data-province/);
  assert.match(script, /updateProvinceLabels\(\)/);
});

test("atlante multilivello con zoom, pan e livelli cartografici", () => {
  for (const id of ["mapWorld", "mapZoomIn", "mapZoomOut", "mapZoomReadout", "mapReset", "mapTerrainToggle", "mapBordersToggle", "mapCitiesToggle", "mapSettlementsToggle", "mapDetailToggle"]) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
  assert.match(html, /mapZoom=Math\.max\(1,Math\.min\(2\.6,next\)\)/);
  assert.match(html, /mapGrid\.addEventListener\("pointermove"/);
  assert.match(html, /toggleMapLayer\(button,klass\)/);
  assert.match(html, /class="terrain-detail"/);
  assert.match(html, /class="mountain"/);
  assert.match(html, /class="road"/);
  assert.match(html, /class="city-layer"/);
  assert.match(html, /class="port-layer"/);
  assert.match(html, /Porto di Genova/);
  assert.match(html, /Porto di Trieste/);
  assert.match(html, /Porto di Cagliari/);
  assert.match(html, /toggleMapLayer\(event.currentTarget,"settlements"\)/);
  assert.match(html, /class="detail-boundaries"/);
  assert.match(html, /toggleMapLayer\(event.currentTarget,"detail"\)/);
  assert.match(html, /MILANO/);
  assert.match(html, /CAGLIARI/);
});

test("selezione diretta dei territori e fronti contigui", () => {
  assert.match(html, /id="province-0" role="button" tabindex="0"/);
  assert.match(script, /mapSvg\.querySelectorAll\("\.province\[id\^='province-'\]"\)/);
  assert.match(script, /const regionAdjacency=\[\[/);
  assert.match(script, /function hasAdjacentTerritory\(index,owner,faction=null\)/);
  assert.match(script, /armyLocation===null/);
  assert.match(script, /regionAdjacency\[armyLocation\]/);
  assert.match(script, /territorio neutrale collegato al fronte/);
  assert.match(script, /l\\u2019esercito deve trovarsi in un territorio confinante/);
  assert.match(script, /free\.filter\(r=>hasAdjacentTerritory\(regions\.indexOf\(r\),"enemy",rivalNames\[rival\]\)\)/);
});

test("eserciti e flotte schierati, spostabili e salvati", () => {
  assert.match(script, /marker\.className="army-marker"/);
  assert.match(script, /marker\.className="fleet-marker"/);
  assert.match(script, /id="moveArmy"/);
  assert.match(script, /id="moveFleet"/);
  assert.match(script, /function canMoveArmyTo\(index\)/);
  assert.match(script, /function canMoveFleetTo\(index\)/);
  assert.match(script, /function moveArmyToSelected\(\)/);
  assert.match(script, /function moveFleetToSelected\(\)/);
  assert.match(script, /armyLocation,fleetLocation,regions/);
  assert.match(script, /s\.armyLocation/);
  assert.match(script, /armyLocation=b\.regionIndex/);
});

test("atlante amministrativo con 110 province ISTAT", () => {
  assert.match(html, /id="mapProvincesToggle"/);
  assert.match(html, /Confini amministrativi provinciali: ISTAT 2026/);
  assert.match(html, /class="province-layer"/);
  assert.equal((html.match(/class="province neutral" id="province-\d+"/g) || []).length, 110);
  assert.match(html, /data-province="Torino"/);
  assert.match(html, /data-province="Roma"/);
  assert.match(html, /data-province="Cagliari"/);
  assert.match(script, /toggleMapLayer\(event.currentTarget,"provinces"\)/);
});

test("110 province giocabili e migrazione dei vecchi salvataggi", () => {
  assert.match(html, /110 PROVINCE/);
  assert.equal((html.match(/class="region-outline"/g) || []).length, 20);
  assert.match(script, /data\.regions\.length===12\?legacyRegionNames/);
  assert.match(script, /savedByName\.get\(base\.name\)/);
  assert.match(script, /armyLocation=armyIndex/);
});

test("WAR ITALY 4.0 usa province reali, confini regionali e migrazione 3.x", () => {
  assert.equal((html.match(/class="province neutral" id="province-\d+"/g) || []).length, 110);
  assert.equal((html.match(/class="region-outline"/g) || []).length, 20);
  assert.match(script, /\[12,20,110\]\.includes\(data\.regions\.length\)/);
  assert.match(script, /const savedByRegion=new Map/);
  assert.match(script, /regionProvinceCounts/);
  assert.match(script, /function isCoastalRegion\(name\)/);
  assert.match(script, /110 PROVINCE/);
  assert.match(html, /id="mapRegionsToggle"/);
});

test("l'esercito può essere ridislocato dopo la perdita di una provincia", () => {
  assert.match(script, /armyLocation===null\?\(units\+tanks\+commandos>0\)/);
  assert.match(script, /SCHIERA ESERCITO QUI/);
  assert.match(script, /const lostIndex=regions\.indexOf\(target\)/);
});

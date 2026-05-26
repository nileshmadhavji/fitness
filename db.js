// db.js — real SQLite (sql.js / WASM) running in the browser.
// Persists the whole DB file into IndexedDB so it survives reloads,
// and can export/import an actual .db file.

const DB = (() => {
  let SQL = null;
  let db = null;
  const IDB_NAME = "lean5-db";
  const IDB_STORE = "files";
  const IDB_KEY = "gym.db";

  // ---- tiny IndexedDB helpers (to store the binary DB blob) ----
  function idbOpen() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(IDB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(IDB_STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function idbGet() {
    const d = await idbOpen();
    return new Promise((res, rej) => {
      const tx = d.transaction(IDB_STORE, "readonly");
      const rq = tx.objectStore(IDB_STORE).get(IDB_KEY);
      rq.onsuccess = () => res(rq.result || null);
      rq.onerror = () => rej(rq.error);
    });
  }
  async function idbPut(bytes) {
    const d = await idbOpen();
    return new Promise((res, rej) => {
      const tx = d.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(bytes, IDB_KEY);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }

  const SCHEMA = `
    CREATE TABLE IF NOT EXISTS workout_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      ex_id TEXT NOT NULL,
      weight TEXT,
      reps TEXT,
      logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS run_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      distance_km REAL,
      minutes REAL,
      note TEXT,
      logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cal_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT,
      calories INTEGER,
      logged_at TEXT NOT NULL
    );
  `;

  async function init() {
    SQL = await initSqlJs({
      locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`
    });
    let saved = null;
    try { saved = await idbGet(); } catch (e) { saved = null; }
    db = saved ? new SQL.Database(new Uint8Array(saved)) : new SQL.Database();
    db.run(SCHEMA);
    await save();
  }

  async function save() {
    if (!db) return;
    try { await idbPut(db.export()); } catch (e) { /* storage blocked — session still works */ }
  }

  // run a statement with params, then persist
  async function run(sql, params = []) {
    db.run(sql, params);
    await save();
  }

  // query → array of plain objects
  function all(sql, params = []) {
    const res = db.exec(sql, params);
    if (!res.length) return [];
    const { columns, values } = res[0];
    return values.map(row => {
      const o = {};
      columns.forEach((c, i) => o[c] = row[i]);
      return o;
    });
  }

  // ---- export / import a real .db file ----
  function exportFile() {
    const blob = new Blob([db.export()], { type: "application/octet-stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gym.db";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async function importFile(file) {
    const buf = new Uint8Array(await file.arrayBuffer());
    db = new SQL.Database(buf);
    db.run(SCHEMA);
    await save();
  }

  return { init, run, all, save, exportFile, importFile };
})();

// db.js — real SQLite (sql.js / WASM) in the browser.

const DB = (() => {
  let SQL = null, db = null;
  const IDB_NAME = "lean5-db", IDB_STORE = "files", IDB_KEY = "gym.db";

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
      const rq = d.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(IDB_KEY);
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
      day TEXT NOT NULL, ex_id TEXT NOT NULL,
      weight TEXT, reps TEXT, logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS run_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      distance_km REAL, minutes REAL, note TEXT, logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS weight_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kg REAL NOT NULL, logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS food_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, calories INTEGER NOT NULL,
      protein REAL DEFAULT 0, fat REAL DEFAULT 0, carbs REAL DEFAULT 0,
      sugar REAL DEFAULT 0, iron REAL DEFAULT 0, zinc REAL DEFAULT 0, potassium REAL DEFAULT 0,
      logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS water_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ml INTEGER NOT NULL, logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, calories INTEGER NOT NULL, logged_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY, value TEXT
    );
    CREATE TABLE IF NOT EXISTS custom_foods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, category TEXT NOT NULL,
      calories INTEGER NOT NULL,
      protein REAL DEFAULT 0, fat REAL DEFAULT 0, carbs REAL DEFAULT 0,
      sugar REAL DEFAULT 0, iron REAL DEFAULT 0, zinc REAL DEFAULT 0, potassium REAL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `;

  async function init() {
    SQL = await initSqlJs({
      locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`
    });
    let saved = null;
    try { saved = await idbGet(); } catch (e) {}
    db = saved ? new SQL.Database(new Uint8Array(saved)) : new SQL.Database();
    db.run(SCHEMA);
    migrate();        // bring older databases up to the current schema
    await save();
  }

  // Add any columns that older saved databases are missing.
  // CREATE TABLE IF NOT EXISTS won't alter an existing table, so we do it here.
  function migrate() {
    const need = {
      food_log: {
        protein: "REAL DEFAULT 0", fat: "REAL DEFAULT 0", carbs: "REAL DEFAULT 0",
        sugar: "REAL DEFAULT 0", iron: "REAL DEFAULT 0", zinc: "REAL DEFAULT 0",
        potassium: "REAL DEFAULT 0"
      }
    };
    for (const table in need) {
      let cols = [];
      try {
        const r = db.exec(`PRAGMA table_info(${table})`);
        if (r.length) cols = r[0].values.map(v => v[1]);
      } catch (e) { continue; }
      for (const col in need[table]) {
        if (!cols.includes(col)) {
          try { db.run(`ALTER TABLE ${table} ADD COLUMN ${col} ${need[table][col]}`); }
          catch (e) { /* already there or table missing */ }
        }
      }
    }
  }
  async function save() { if (!db) return; try { await idbPut(db.export()); } catch (e) {} }
  async function run(sql, params = []) { db.run(sql, params); await save(); }
  function all(sql, params = []) {
    const res = db.exec(sql, params);
    if (!res.length) return [];
    const { columns, values } = res[0];
    return values.map(row => { const o = {}; columns.forEach((c, i) => o[c] = row[i]); return o; });
  }
  function exportFile() {
    const blob = new Blob([db.export()], { type: "application/octet-stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gym.db"; a.click();
    URL.revokeObjectURL(a.href);
  }
  async function importFile(file) {
    db = new SQL.Database(new Uint8Array(await file.arrayBuffer()));
    db.run(SCHEMA);
    await save();
  }
  return { init, run, all, save, exportFile, importFile };
})();

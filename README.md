# Lean 5

A simple gym tracker — three tabs: **Workout · Run · Cals**.
Navy and lime, built to live on your phone.

The training plan never changes. You just log each session and try to
beat last time — progressive overload, nothing else to think about.

## Running it

It's a static site. No build step, no install.

- **Locally:** open `index.html` in a browser. (First load needs internet
  to fetch the SQLite engine; after that it works offline.)
- **On GitHub Pages:** push this folder to a repo, then in the repo go to
  **Settings → Pages → Build from branch → main / root**. Your app will be
  live at `https://<your-username>.github.io/<repo-name>/`.
- On your phone, open that URL and use **Add to Home Screen** so it opens
  like an app.

## How your data is stored

This uses **real SQLite** — the `sql.js` library, which is SQLite compiled
to WebAssembly so it runs inside the browser. Tables: `workout_log`,
`run_log`, `cal_log`.

The database is saved automatically into the browser's IndexedDB on the
device you use, so it survives closing and reopening the app.

Important honest caveats:
- The data is **per-device and per-browser**. It does not sync.
- Clearing your browser data will erase it.
- Use the **Export gym.db** button to download the actual database file as
  a backup, or to move it to another device. **Import .db** loads it back.
- Commit an exported `gym.db` to the repo if you want a versioned backup.

## Files

| File         | What it does                                  |
|--------------|-----------------------------------------------|
| `index.html` | App shell and bottom tab bar                  |
| `styles.css` | Navy / lime styling                           |
| `db.js`      | SQLite (WASM) setup, schema, save/export      |
| `app.js`     | The three tabs, the fixed Lean 5 plan, logic  |

## The plan

| Day | Workout | Focus           |
|-----|---------|-----------------|
| Mon | W44     | Heavy full-body |
| Tue | W32     | Upper push/pull |
| Wed | —       | Rest / walk     |
| Thu | W37     | Legs + back     |
| Fri | W41     | Deadlift        |
| Sat | W33     | Conditioning    |
| Sun | —       | Rest            |

To change exercises or progression, edit the `PLAN` object at the top of
`app.js`.

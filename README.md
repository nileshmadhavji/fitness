# REP

A no-clutter training tracker. Five tabs: **Today · Workout · Run · Weight · Food**.
Black with Apple-Fitness colours, built to live on your phone.

## Today
A dashboard that opens first: today's planned workout (by weekday), calories
left, water progress, and current weight with progress to target. Tap any
card to jump to its tab.

## Workout
Five fixed sessions named by type — Full Body, Upper Body, Legs & Back,
Deadlift, Conditioning. Each exercise shows last time's numbers; type today's,
Save, beat it next time.

## Run
Treadmill interval timers at the top — five belt-aware presets (30/30, 60/60,
30/90, 45/75, 20/40). Each runs fullscreen with screen wake-lock, beeps, and a
dedicated "Slow Down" phase between work and rest so the timing matches a real
treadmill belt. Below: log distance, time and a note, with a green chart of
distance over time.

## Weight
Log weight whenever, with a date field so you can backdate entries. Green trend chart with a dashed target line, current
weight in kg + stone/lb, kg lost, kg to target. Start 82.1 kg (12 st 13 lb),
target 72 kg.

## Food
Daily calorie budget (2100 default, editable). Tap a food to subtract it from
the ring — the big number is what's left, red if over. Under the ring, today's
protein / carbs / fat / sugar totals, plus an iron / zinc / potassium line.
56 foods from your meal plan and M&S/Tesco ranges, each with full nutrition.
Water tracker here too: tap a glass (250 ml each) toward the 2.5 L goal.

## Running it
Static site, no build step.
- **Locally:** open `index.html` (first load needs internet for the SQLite engine).
- **GitHub Pages:** push these files to the repo root, then Settings → Pages →
  Deploy from branch → main / root.
- On your phone: open the URL, Add to Home Screen.

## Data
Real SQLite (`sql.js`, WebAssembly) in the browser. Tables: `workout_log`,
`run_log`, `weight_log`, `food_log`, `water_log`, `settings`. Saved to the
browser's IndexedDB on the device — does not sync. Use **Backup .db** to
download the file; **Restore** loads it back.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Shell + tab bar |
| `styles.css` | Apple Fitness styling |
| `db.js` | SQLite setup, save, backup/restore |
| `app.js` | The five tabs, plan, food list |

Edit the constants at the top of `app.js` to change anything:
`START_KG`, `TARGET_KG`, `DEFAULT_BUDGET`, `WATER_GOAL_ML`, `PLAN`, `FOODS`.

## Install to home screen
On iPhone: open the GitHub Pages URL in Safari, tap Share, then "Add to Home
Screen". It opens fullscreen with its own icon, no address bar — like a native
app. (Android Chrome offers an "Install" prompt.) The manifest, icons and
Apple meta tags are already wired up.

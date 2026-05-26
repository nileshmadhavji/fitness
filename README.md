# Lean 5

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
Log distance, time and a note. Green chart of distance over time, plus total
km and pace per run.

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

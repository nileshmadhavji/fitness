// app.js — three-tab app: Workout | Run | Cals

// ---- the fixed Lean 5 plan ----
const PLAN = {
  w44: {
    name: "W44", full: "Heavy", eyebrow: "Monday",
    warm: "Incline press ups x10 + Scapular pulls x10 — 3 rounds",
    ex: [
      {id:"bench",  badge:"A",  name:"Barbell Bench Press",        target:"4 × 3"},
      {id:"squat",  badge:"B1", name:"Back Squat",                 target:"3 × 8"},
      {id:"pullup", badge:"B2", name:"Banded Pull-Up",             target:"3 × 12"},
      {id:"chest",  badge:"C1", name:"Seated Chest Press",         target:"3 × 8 · slow"},
      {id:"rdl",    badge:"C2", name:"Dumbbell Romanian Deadlift", target:"3 × 8"},
      {id:"row",    badge:"D",  name:"Single Arm Seated Row",      target:"4 × 10/10"},
    ]
  },
  w32: {
    name: "W32", full: "Upper", eyebrow: "Tuesday",
    warm: "Incline press ups x8 + Scapular press ups x10 — 3 rounds",
    ex: [
      {id:"bench",   badge:"A",  name:"Barbell Bench Press",          target:"5 × 4 · power"},
      {id:"incline", badge:"B1", name:"Incline Dumbbell Bench Press", target:"3 × 12"},
      {id:"csrow",   badge:"B2", name:"Chest Supported Dumbbell Row", target:"3 × 12"},
      {id:"legext",  badge:"C1", name:"Leg Extensions",               target:"3 × 8 · slow"},
      {id:"lu",      badge:"C2", name:"Lu Raise",                     target:"3 × 10"},
      {id:"erg",     badge:"D",  name:"Row Intervals",                target:"800/600/400/200m"},
    ]
  },
  w37: {
    name: "W37", full: "Legs + Back", eyebrow: "Thursday",
    warm: "Deadhangs + Cossack squats x8/8 + Row 8kcal — 3 rounds",
    ex: [
      {id:"latpd",  badge:"A",  name:"Lat Pulldown",            target:"4 × 6 · heavy"},
      {id:"fsquat", badge:"B",  name:"Front Squat",             target:"4 × 4"},
      {id:"dbbench",badge:"C1", name:"Dumbbell Bench Press",    target:"4 × 8"},
      {id:"sarow",  badge:"C2", name:"Single Arm Dumbbell Row", target:"4 × 10/10"},
      {id:"lunge",  badge:"D1", name:"Walking Lunge",           target:"3 × 12/12"},
      {id:"invrow", badge:"D2", name:"Inverted Row Hold",       target:"3 × 12"},
    ]
  },
  w41: {
    name: "W41", full: "Deadlift", eyebrow: "Friday",
    warm: "Row 2min, then Glute Bridge x10 — 3 rounds",
    ex: [
      {id:"dl",    badge:"A",  name:"Deadlift",                    target:"3 × 6 · power"},
      {id:"curl",  badge:"B1", name:"Incline Dumbbell Bicep Curl", target:"3 × 12"},
      {id:"lat",   badge:"B2", name:"Lateral Raises",              target:"3 × 12 · slow"},
      {id:"knee",  badge:"C1", name:"Dip Support Knee Raise",      target:"4 × 10"},
      {id:"crunch",badge:"C2", name:"Dumbbell Crunch",             target:"4 × 10"},
    ]
  },
  w33: {
    name: "W33", full: "Conditioning", eyebrow: "Saturday",
    warm: "",
    ex: [
      {id:"dip",   badge:"A1", name:"Strict Dip",       target:"3 × 8–10"},
      {id:"dragon",badge:"A2", name:"Dragon Flag",      target:"3 × 3"},
      {id:"ldrow", badge:"B",  name:"Lat Dumbbell Row", target:"3 × 6/6"},
      {id:"metcon",badge:"C",  name:"Metcon",           target:"4 rounds"},
    ]
  }
};
const DAYS = ["w44","w32","w37","w41","w33"];

let activeTab = "workout";
let activeDay = "w44";
const setTicks = {}; // {day: {exId: [bool]}}

const $app = document.getElementById("app");

function flash(msg) {
  let f = document.querySelector(".flash");
  if (!f) { f = document.createElement("div"); f.className = "flash"; document.body.appendChild(f); }
  f.textContent = msg;
  f.classList.add("show");
  setTimeout(() => f.classList.remove("show"), 1900);
}

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

// ---------- WORKOUT ----------
function lastFor(day, exId) {
  const rows = DB.all(
    "SELECT weight, reps, logged_at FROM workout_log WHERE day=? AND ex_id=? ORDER BY id DESC LIMIT 1",
    [day, exId]
  );
  return rows[0] || null;
}

function renderWorkout() {
  const plan = PLAN[activeDay];
  let h = `
    <div class="screen-head">
      <div class="eyebrow">${plan.eyebrow} · ${plan.full}</div>
      <h1>${plan.name}</h1>
    </div>
    <div class="pills">
      ${DAYS.map(d => `<button class="pill ${d===activeDay?"active":""}" data-day="${d}">${PLAN[d].name}</button>`).join("")}
    </div>
    <div class="progress-rule">
      <b>Progressive overload.</b> Hit every set at the top of the rep range → add 2.5kg next time.
      Missed reps → keep the same weight. Stuck twice → drop 10% and build back.
    </div>
  `;
  if (plan.warm) h += `<div class="warm"><b>Warmup</b> · ${plan.warm}</div>`;

  plan.ex.forEach(ex => {
    const last = lastFor(activeDay, ex.id);
    const ticks = (setTicks[activeDay] && setTicks[activeDay][ex.id]) || [];
    const setCount = parseInt(ex.target) || 0;
    let dots = "";
    for (let i = 0; i < setCount; i++) {
      dots += `<button class="dot ${ticks[i]?"on":""}" data-tick="${ex.id}" data-i="${i}">${i+1}</button>`;
    }
    h += `
      <div class="card">
        <div class="ex-top">
          <span class="ex-badge">${ex.badge}</span>
          <span class="ex-name">${ex.name}</span>
        </div>
        <div class="ex-sub">Target ${ex.target}</div>
        ${last
          ? `<div class="ex-last">Last · <b>${last.weight||"–"}${isNum(last.weight)?"kg":""} × ${last.reps||"–"}</b> &nbsp;(${fmtDate(last.logged_at)})</div>`
          : `<div class="ex-last">No history yet — log your first session.</div>`}
        <div class="row-inputs">
          <div class="fld"><label>Weight kg</label>
            <input type="number" inputmode="decimal" id="w-${ex.id}" placeholder="${last?last.weight||"":""}"></div>
          <div class="fld"><label>Reps</label>
            <input type="text" id="r-${ex.id}" placeholder="${last?last.reps||"":""}"></div>
        </div>
        ${dots ? `<div class="dots">${dots}</div>` : ""}
      </div>
    `;
  });

  h += `<button class="btn btn-primary" id="saveWorkout">Save ${plan.name} Session</button>`;
  h += `<div style="height:14px"></div>`;
  h += dataToolsHTML();
  $app.innerHTML = h;
}

function isNum(v){ return v !== "" && v != null && !isNaN(parseFloat(v)); }

async function saveWorkout() {
  const plan = PLAN[activeDay];
  const now = new Date().toISOString();
  let count = 0;
  for (const ex of plan.ex) {
    const w = document.getElementById("w-"+ex.id).value.trim();
    const r = document.getElementById("r-"+ex.id).value.trim();
    if (!w && !r) continue;
    await DB.run(
      "INSERT INTO workout_log (day, ex_id, weight, reps, logged_at) VALUES (?,?,?,?,?)",
      [activeDay, ex.id, w, r, now]
    );
    count++;
  }
  setTicks[activeDay] = {};
  if (count) { flash(`Saved · beat it next time`); renderWorkout(); }
  else flash("Nothing entered");
}

// ---------- RUN ----------
function renderRun() {
  const rows = DB.all("SELECT * FROM run_log ORDER BY id DESC LIMIT 30");
  const totalKm = DB.all("SELECT COALESCE(SUM(distance_km),0) k FROM run_log")[0].k;
  let h = `
    <div class="screen-head">
      <div class="eyebrow">Cardio</div>
      <h1>Run</h1>
    </div>
    <div class="card">
      <div class="stat-big">
        <div class="num">${(+totalKm).toFixed(1)}</div>
        <div class="unit">total km logged</div>
      </div>
    </div>
    <div class="card tight">
      <div class="field-block"><label>Distance (km)</label>
        <input type="number" inputmode="decimal" id="runDist" placeholder="5"></div>
      <div class="field-block"><label>Time (minutes)</label>
        <input type="number" inputmode="decimal" id="runMin" placeholder="28"></div>
      <div class="field-block"><label>Note (optional)</label>
        <input type="text" id="runNote" placeholder="easy pace"></div>
      <button class="btn btn-primary" id="saveRun">Log Run</button>
    </div>
    <div class="list-head">Recent runs</div>
  `;
  if (!rows.length) {
    h += `<div class="empty">No runs logged yet.</div>`;
  } else {
    rows.forEach(r => {
      const pace = (r.distance_km && r.minutes)
        ? (r.minutes / r.distance_km).toFixed(1) + " min/km" : "";
      h += `
        <div class="entry">
          <div>
            <div class="e-main">${(+r.distance_km).toFixed(1)} km${r.note?" · "+escapeHtml(r.note):""}</div>
            <div class="e-sub">${fmtDate(r.logged_at)}${pace?" · "+pace:""}</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <span class="e-val">${r.minutes?(+r.minutes)+"m":""}</span>
            <button class="del" data-del-run="${r.id}">✕</button>
          </div>
        </div>`;
    });
  }
  h += `<div style="height:14px"></div>` + dataToolsHTML();
  $app.innerHTML = h;
}

async function saveRun() {
  const dist = document.getElementById("runDist").value.trim();
  const min = document.getElementById("runMin").value.trim();
  const note = document.getElementById("runNote").value.trim();
  if (!dist && !min) { flash("Enter a distance or time"); return; }
  await DB.run(
    "INSERT INTO run_log (distance_km, minutes, note, logged_at) VALUES (?,?,?,?)",
    [dist?+dist:0, min?+min:null, note, new Date().toISOString()]
  );
  flash("Run logged");
  renderRun();
}

// ---------- CALS ----------
function renderCals() {
  const today = new Date().toISOString().slice(0,10);
  const rows = DB.all(
    "SELECT * FROM cal_log WHERE substr(logged_at,1,10)=? ORDER BY id DESC", [today]
  );
  const todayTotal = rows.reduce((s,r)=>s+(r.calories||0),0);
  let h = `
    <div class="screen-head">
      <div class="eyebrow">Today</div>
      <h1>Cals</h1>
    </div>
    <div class="card">
      <div class="stat-big">
        <div class="num">${todayTotal}</div>
        <div class="unit">calories logged today</div>
      </div>
    </div>
    <div class="card tight">
      <div class="field-block"><label>What</label>
        <input type="text" id="calLabel" placeholder="Lunch"></div>
      <div class="field-block"><label>Calories</label>
        <input type="number" inputmode="numeric" id="calAmt" placeholder="600"></div>
      <button class="btn btn-primary" id="saveCal">Add</button>
    </div>
    <div class="list-head">Today's entries</div>
  `;
  if (!rows.length) {
    h += `<div class="empty">Nothing logged today.</div>`;
  } else {
    rows.forEach(r => {
      h += `
        <div class="entry">
          <div>
            <div class="e-main">${escapeHtml(r.label||"Entry")}</div>
            <div class="e-sub">${new Date(r.logged_at).toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"})}</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <span class="e-val">${r.calories}</span>
            <button class="del" data-del-cal="${r.id}">✕</button>
          </div>
        </div>`;
    });
  }
  h += `<div style="height:14px"></div>` + dataToolsHTML();
  $app.innerHTML = h;
}

async function saveCal() {
  const label = document.getElementById("calLabel").value.trim();
  const amt = document.getElementById("calAmt").value.trim();
  if (!amt) { flash("Enter a calorie amount"); return; }
  await DB.run(
    "INSERT INTO cal_log (label, calories, logged_at) VALUES (?,?,?)",
    [label, parseInt(amt), new Date().toISOString()]
  );
  flash("Added");
  renderCals();
}

// ---------- shared: data tools ----------
function dataToolsHTML() {
  return `
    <div class="data-tools">
      <div class="list-head" style="margin-top:0">Your data</div>
      <div class="btn-row">
        <button class="btn btn-ghost" id="exportDb">Export gym.db</button>
        <button class="btn btn-ghost" id="importDb">Import .db</button>
      </div>
      <input type="file" id="importFile" accept=".db,.sqlite" hidden>
      <div class="data-note">
        Saved on this device automatically. Export the file to back it up
        or move it to another phone.
      </div>
    </div>`;
}

function escapeHtml(s){
  return (s||"").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
}

// ---------- render dispatch ----------
function render() {
  if (activeTab === "workout") renderWorkout();
  else if (activeTab === "run") renderRun();
  else renderCals();
  document.querySelectorAll(".tab").forEach(t =>
    t.classList.toggle("active", t.dataset.tab === activeTab));
}

// ---------- events (delegated) ----------
document.addEventListener("click", async (e) => {
  const t = e.target.closest("button, input");
  if (!t) return;

  if (t.dataset.tab) { activeTab = t.dataset.tab; render(); window.scrollTo(0,0); return; }
  if (t.dataset.day) { activeDay = t.dataset.day; renderWorkout(); window.scrollTo(0,0); return; }

  if (t.dataset.tick) {
    const { tick, i } = t.dataset;
    setTicks[activeDay] = setTicks[activeDay] || {};
    setTicks[activeDay][tick] = setTicks[activeDay][tick] || [];
    setTicks[activeDay][tick][+i] = !setTicks[activeDay][tick][+i];
    renderWorkout();
    return;
  }

  if (t.id === "saveWorkout") return saveWorkout();
  if (t.id === "saveRun")     return saveRun();
  if (t.id === "saveCal")     return saveCal();

  if (t.dataset.delRun) { await DB.run("DELETE FROM run_log WHERE id=?", [+t.dataset.delRun]); renderRun(); return; }
  if (t.dataset.delCal) { await DB.run("DELETE FROM cal_log WHERE id=?", [+t.dataset.delCal]); renderCals(); return; }

  if (t.id === "exportDb") { DB.exportFile(); flash("gym.db downloaded"); return; }
  if (t.id === "importDb") { document.getElementById("importFile").click(); return; }
});

document.addEventListener("change", async (e) => {
  if (e.target.id === "importFile" && e.target.files[0]) {
    await DB.importFile(e.target.files[0]);
    flash("Database imported");
    render();
  }
});

// ---------- boot ----------
(async function () {
  try {
    await DB.init();
    document.getElementById("tabbar").hidden = false;
    render();
  } catch (err) {
    $app.innerHTML = `<div class="empty">Couldn't start the database.<br>
      Make sure you're online for first load.<br><small>${escapeHtml(String(err))}</small></div>`;
  }
})();

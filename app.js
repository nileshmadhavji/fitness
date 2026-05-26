// app.js — five tabs: Today | Workout | Run | Weight | Food

const PLAN = [
  { key:"full",  type:"Full Body",   sub:"Heavy day",
    warm:"Incline press ups x10 + Scapular pulls x10 — 3 rounds",
    ex:[
      {id:"bench", name:"Barbell Bench Press",        sets:4, reps:"3"},
      {id:"squat", name:"Back Squat",                 sets:3, reps:"8"},
      {id:"pullup",name:"Banded Pull-Up",             sets:3, reps:"12"},
      {id:"chest", name:"Seated Chest Press",         sets:3, reps:"8"},
      {id:"rdl",   name:"Dumbbell Romanian Deadlift", sets:3, reps:"8"},
      {id:"row",   name:"Single Arm Seated Row",      sets:4, reps:"10"},
    ]},
  { key:"upper", type:"Upper Body",  sub:"Push & pull",
    warm:"Incline press ups x8 + Scapular press ups x10 — 3 rounds",
    ex:[
      {id:"bench",  name:"Barbell Bench Press",          sets:5, reps:"4"},
      {id:"incline",name:"Incline Dumbbell Bench Press", sets:3, reps:"12"},
      {id:"csrow",  name:"Chest Supported Row",          sets:3, reps:"12"},
      {id:"legext", name:"Leg Extensions",               sets:3, reps:"8"},
      {id:"lu",     name:"Lu Raise",                     sets:3, reps:"10"},
      {id:"erg",    name:"Row Intervals",                sets:4, reps:"800/600/400/200m"},
    ]},
  { key:"legs",  type:"Legs & Back", sub:"Lower focus",
    warm:"Deadhangs + Cossack squats x8/8 + Row 8kcal — 3 rounds",
    ex:[
      {id:"latpd",  name:"Lat Pulldown",            sets:4, reps:"6"},
      {id:"fsquat", name:"Front Squat",             sets:4, reps:"4"},
      {id:"dbbench",name:"Dumbbell Bench Press",    sets:4, reps:"8"},
      {id:"sarow",  name:"Single Arm Dumbbell Row", sets:4, reps:"10"},
      {id:"lunge",  name:"Walking Lunge",           sets:3, reps:"12"},
      {id:"invrow", name:"Inverted Row Hold",       sets:3, reps:"12"},
    ]},
  { key:"power", type:"Deadlift",    sub:"Power & core",
    warm:"Row 2min, then Glute Bridge x10 — 3 rounds",
    ex:[
      {id:"dl",    name:"Deadlift",                    sets:3, reps:"6"},
      {id:"curl",  name:"Incline Dumbbell Bicep Curl", sets:3, reps:"12"},
      {id:"lat",   name:"Lateral Raises",              sets:3, reps:"12"},
      {id:"knee",  name:"Dip Support Knee Raise",      sets:4, reps:"10"},
      {id:"crunch",name:"Dumbbell Crunch",             sets:4, reps:"10"},
    ]},
  { key:"cond",  type:"Conditioning", sub:"Metcon",
    warm:"",
    ex:[
      {id:"dip",   name:"Strict Dip",        sets:3, reps:"8-10"},
      {id:"dragon",name:"Dragon Flag",       sets:3, reps:"3"},
      {id:"ldrow", name:"Lat Dumbbell Row",  sets:3, reps:"6"},
      {id:"metcon",name:"Metcon — 4 rounds", sets:4, reps:"round"},
    ]},
];

// weekday -> plan index (Mon=full, Tue=upper, Thu=legs, Fri=power, Sat=cond)
const DAY_OF_WEEK = { 1:0, 2:1, 4:2, 5:3, 6:4 };

const FOODS = [
  {cat:"Breakfast",name:"Oats & Yogurt",cal:470,p:40,f:10,c:50,s:8,fe:3.8,zn:3.2,k:820},
  {cat:"Breakfast",name:"Protein Smoothie",cal:340,p:35,f:9,c:40,s:16,fe:2.5,zn:2.0,k:780},
  {cat:"Breakfast",name:"Toast & Yogurt",cal:320,p:30,f:12,c:35,s:6,fe:2.0,zn:1.8,k:420},
  {cat:"Breakfast",name:"Avocado Toast",cal:350,p:30,f:15,c:35,s:5,fe:2.3,zn:2.1,k:620},
  {cat:"Breakfast",name:"Fruit & Yogurt Bowl",cal:360,p:28,f:8,c:40,s:14,fe:2.2,zn:1.7,k:510},
  {cat:"Breakfast",name:"Paneer Bhurji & Toast",cal:490,p:38,f:14,c:40,s:7,fe:2.8,zn:3.4,k:540},
  {cat:"Breakfast",name:"Salted Caramel Overnight Oats",cal:290,p:12,f:7,c:41,s:15,fe:2.0,zn:1.2,k:280},
  {cat:"Lunch",name:"M&S Falafel & Houmous Wrap",cal:460,p:20,f:18,c:50,s:5,fe:4.0,zn:1.9,k:580},
  {cat:"Lunch",name:"Plant Kitchen Sandwich",cal:430,p:22,f:12,c:45,s:8,fe:3.2,zn:1.7,k:430},
  {cat:"Lunch",name:"Homemade Chickpea Salad",cal:320,p:20,f:10,c:35,s:6,fe:3.5,zn:1.8,k:620},
  {cat:"Lunch",name:"Bateta Sak & Rice",cal:430,p:14,f:15,c:55,s:5,fe:2.4,zn:1.3,k:710},
  {cat:"Lunch",name:"Protein Yogurt Meal",cal:300,p:30,f:12,c:18,s:12,fe:1.1,zn:1.7,k:420},
  {cat:"Lunch",name:"Paneer Wrap",cal:470,p:35,f:18,c:30,s:4,fe:2.7,zn:3.0,k:520},
  {cat:"Lunch",name:"M&S 3 Bean Wrap",cal:430,p:14,f:16,c:52,s:6,fe:3.8,zn:1.8,k:520},
  {cat:"Lunch",name:"M&S Wensleydale & Carrot Sandwich",cal:480,p:17,f:23,c:49,s:11,fe:2.1,zn:2.3,k:310},
  {cat:"Lunch",name:"M&S Mexican Rice Pot",cal:385,p:10,f:11,c:58,s:5,fe:2.5,zn:1.5,k:430},
  {cat:"Lunch",name:"M&S Cheese & Tomato Sub Roll",cal:510,p:22,f:21,c:54,s:8,fe:2.4,zn:2.8,k:390},
  {cat:"Lunch",name:"M&S Bean & Sweet Potato Wrap",cal:445,p:13,f:14,c:61,s:9,fe:3.5,zn:1.7,k:600},
  {cat:"Lunch",name:"M&S Spinach Falafel Wrap",cal:450,p:15,f:17,c:56,s:5,fe:4.0,zn:1.9,k:590},
  {cat:"Lunch",name:"M&S Mexican Rice & Avocado",cal:360,p:8,f:13,c:49,s:4,fe:2.2,zn:1.1,k:510},
  {cat:"Lunch",name:"M&S 3 Bean Salad",cal:270,p:11,f:8,c:33,s:5,fe:3.2,zn:1.5,k:540},
  {cat:"Lunch",name:"Tesco Falafel & Houmous Wrap",cal:470,p:16,f:18,c:58,s:6,fe:4.1,zn:2.0,k:610},
  {cat:"Lunch",name:"Tesco Spicy Bean Wrap",cal:430,p:14,f:13,c:60,s:7,fe:3.6,zn:1.7,k:560},
  {cat:"Dinner",name:"Rajma & Rice",cal:430,p:22,f:7,c:55,s:5,fe:4.5,zn:2.0,k:760},
  {cat:"Dinner",name:"Veg Stir-Fry & Rice",cal:300,p:14,f:8,c:45,s:6,fe:2.1,zn:1.0,k:540},
  {cat:"Dinner",name:"Chana Masala",cal:310,p:18,f:6,c:30,s:7,fe:3.9,zn:1.8,k:680},
  {cat:"Dinner",name:"Stuffed Paratha + Yogurt",cal:360,p:18,f:10,c:40,s:5,fe:2.2,zn:1.4,k:390},
  {cat:"Dinner",name:"Vegetable Khichdi",cal:410,p:20,f:6,c:50,s:4,fe:3.1,zn:1.5,k:620},
  {cat:"Dinner",name:"Mixed Vegetable Curry",cal:240,p:8,f:12,c:20,s:8,fe:1.8,zn:0.9,k:510},
  {cat:"Dinner",name:"Spinach Lentil Pancake",cal:260,p:16,f:6,c:25,s:3,fe:4.8,zn:1.6,k:710},
  {cat:"Dinner",name:"Spinach Chickpea Wrap",cal:330,p:20,f:8,c:30,s:4,fe:4.5,zn:1.9,k:690},
  {cat:"Dinner",name:"Sweet Potato & Yogurt",cal:220,p:10,f:5,c:35,s:9,fe:1.4,zn:0.8,k:780},
  {cat:"Dinner",name:"Iron-Boost Smoothie",cal:320,p:30,f:10,c:35,s:14,fe:3.9,zn:2.0,k:840},
  {cat:"Dinner",name:"Chilli Paneer (100g)",cal:360,p:22,f:22,c:16,s:7,fe:1.5,zn:2.8,k:480},
  {cat:"Dinner",name:"Chilli Paneer (200g)",cal:620,p:40,f:42,c:18,s:8,fe:2.5,zn:5.1,k:720},
  {cat:"Dinner",name:"Paneer Butter Masala (100g)",cal:430,p:20,f:30,c:18,s:9,fe:1.8,zn:2.5,k:540},
  {cat:"Dinner",name:"Paneer Butter Masala (200g)",cal:720,p:38,f:54,c:22,s:10,fe:2.8,zn:4.8,k:760},
  {cat:"Snacks",name:"Bulk Aftermath Shake",cal:370,p:40,f:7,c:30,s:5,fe:1.5,zn:2.0,k:420},
  {cat:"Snacks",name:"Grenade Bar",cal:220,p:20,f:8,c:18,s:2,fe:1.8,zn:1.2,k:180},
  {cat:"Snacks",name:"Grenade Bar (Half)",cal:110,p:10,f:4,c:9,s:1,fe:0.9,zn:0.6,k:90},
  {cat:"Snacks",name:"Greek Yogurt & Berries",cal:140,p:18,f:2,c:10,s:8,fe:0.5,zn:1.0,k:260},
  {cat:"Snacks",name:"Protein Porridge",cal:230,p:20,f:4,c:30,s:5,fe:1.9,zn:1.4,k:260},
  {cat:"Snacks",name:"Protein Yogurt",cal:150,p:25,f:4,c:8,s:7,fe:0.2,zn:1.1,k:250},
  {cat:"Snacks",name:"Cottage Cheese & Crackers",cal:160,p:18,f:3,c:15,s:3,fe:0.6,zn:1.1,k:220},
  {cat:"Snacks",name:"Cottage Cheese & Cucumber",cal:110,p:15,f:2,c:6,s:4,fe:0.4,zn:1.0,k:240},
  {cat:"Snacks",name:"Edamame Pot",cal:130,p:11,f:5,c:8,s:2,fe:2.2,zn:1.0,k:480},
  {cat:"Snacks",name:"Banana & Peanut Butter",cal:180,p:5,f:7,c:25,s:13,fe:0.8,zn:0.7,k:430},
  {cat:"Snacks",name:"Handful of Almonds",cal:180,p:7,f:15,c:5,s:1,fe:1.1,zn:0.9,k:220},
  {cat:"Snacks",name:"Banana + Coconut Water",cal:150,p:3,f:1,c:30,s:18,fe:0.5,zn:0.3,k:720},
  {cat:"Snacks",name:"M&S Carrot Cake High Protein",cal:320,p:20,f:11,c:32,s:18,fe:1.9,zn:1.3,k:250},
  {cat:"Snacks",name:"M&S Carrot Sticks & Houmous",cal:210,p:5,f:12,c:18,s:7,fe:1.6,zn:0.9,k:320},
  {cat:"Snacks",name:"M&S Red Pepper Pitta Chips",cal:190,p:4,f:5,c:30,s:2,fe:1.4,zn:0.8,k:170},
  {cat:"Snacks",name:"M&S Popped Chips",cal:95,p:2,f:2,c:16,s:1,fe:0.5,zn:0.3,k:120},
  {cat:"Snacks",name:"M&S Good Gut Kefir Drink",cal:140,p:9,f:4,c:15,s:14,fe:0.1,zn:0.9,k:390},
  {cat:"Snacks",name:"Graham's Protein 25g Mango",cal:190,p:25,f:0.5,c:18,s:17,fe:0.1,zn:1.0,k:410},
  {cat:"Snacks",name:"Jimmy's / Myprotein Iced Coffee",cal:143,p:12,f:2.9,c:12,s:10,fe:0.1,zn:0.5,k:300},
];
const FOOD_CATS = ["Breakfast","Lunch","Dinner","Snacks"];

const DEFAULT_BUDGET = 2100;
const START_KG = 82.1;
const TARGET_KG = 72;
const WATER_GOAL_ML = 2500;
const GLASS_ML = 250;            // one tap = 250 ml
const GLASS_COUNT = WATER_GOAL_ML / GLASS_ML;

let activeTab = "today";
let activeDay = 0;
const $app = document.getElementById("app");

function flash(msg){
  let f = document.querySelector(".flash");
  if(!f){ f=document.createElement("div"); f.className="flash"; document.body.appendChild(f); }
  f.textContent = msg; f.classList.add("show");
  setTimeout(()=>f.classList.remove("show"), 1700);
}
function esc(s){ return (s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function fmtDate(iso){ return new Date(iso).toLocaleDateString(undefined,{day:"numeric",month:"short"}); }
function kgToStone(kg){
  const totalLb = kg*2.2046226;
  let st=Math.floor(totalLb/14), lb=Math.round(totalLb-st*14);
  if(lb===14){ st++; lb=0; }
  return st+" st "+lb+" lb";
}

// ---------- data helpers ----------
function lastFor(dayKey, exId){
  return DB.all("SELECT weight,reps FROM workout_log WHERE day=? AND ex_id=? ORDER BY id DESC LIMIT 1",[dayKey,exId])[0]||null;
}
function getBudget(){
  const r = DB.all("SELECT value FROM settings WHERE key='budget'")[0];
  return r ? parseInt(r.value) : DEFAULT_BUDGET;
}
function macrosToday(){
  const r = DB.all(`SELECT COALESCE(SUM(calories),0) cal, COALESCE(SUM(protein),0) p,
    COALESCE(SUM(fat),0) f, COALESCE(SUM(carbs),0) c, COALESCE(SUM(sugar),0) s,
    COALESCE(SUM(iron),0) fe, COALESCE(SUM(zinc),0) zn, COALESCE(SUM(potassium),0) k
    FROM food_log WHERE substr(logged_at,1,10)=?`,[todayISO()])[0];
  return r;
}
function caloriesToday(){ return macrosToday().cal; }
function waterToday(){
  return DB.all("SELECT COALESCE(SUM(ml),0) m FROM water_log WHERE substr(logged_at,1,10)=?",[todayISO()])[0].m;
}
function latestWeight(){
  const r = DB.all("SELECT kg FROM weight_log ORDER BY logged_at DESC LIMIT 1")[0];
  return r ? r.kg : START_KG;
}
function todaysPlanIndex(){
  const dow = new Date().getDay();
  return DAY_OF_WEEK[dow] !== undefined ? DAY_OF_WEEK[dow] : -1;
}

// ---------- generic chart ----------
function lineChart(points, opts){
  // points: [{label, value}] ; opts: {targetValue, targetLabel}
  const W=500,H=200,padL=8,padR=8,padT=16,padB=24;
  if(points.length<2){
    return `<div class="chart-card" style="text-align:center;color:var(--dim);padding:34px 12px;font-size:0.85rem">
      ${opts.emptyMsg||"Log at least 2 entries to see the chart."}</div>`;
  }
  const vals = points.map(p=>p.value).concat(opts.targetValue!=null?[opts.targetValue]:[]);
  let min=Math.min(...vals), max=Math.max(...vals);
  const span=(max-min)||1; min-=span*0.12; max+=span*0.12;
  const x=i=>padL+(i/(points.length-1))*(W-padL-padR);
  const y=v=>padT+(1-(v-min)/(max-min))*(H-padT-padB);
  const linePts=points.map((p,i)=>`${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const areaPts=`${x(0)},${y(min)} ${linePts} ${x(points.length-1)},${y(min)}`;
  const dots=points.map((p,i)=>`<circle class="weight-dot" cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3"/>`).join("");
  let targetSvg="";
  if(opts.targetValue!=null){
    const ty=y(opts.targetValue).toFixed(1);
    targetSvg=`<line class="target-line" x1="${padL}" y1="${ty}" x2="${W-padR}" y2="${ty}"/>
      <text class="chart-lbl" x="${W-padR}" y="${(+ty-5)}" text-anchor="end">${opts.targetLabel||""}</text>`;
  }
  return `<div class="chart-card">
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#92e82a" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#92e82a" stop-opacity="0"/>
      </linearGradient></defs>
      <polygon points="${areaPts}" fill="url(#lg)"/>
      ${targetSvg}
      <polyline class="weight-line" points="${linePts}"/>
      ${dots}
      <text class="chart-lbl" x="${padL}" y="${H-6}">${points[0].label}</text>
      <text class="chart-lbl" x="${W-padR}" y="${H-6}" text-anchor="end">${points[points.length-1].label}</text>
    </svg>
  </div>`;
}

// ---------- TODAY (dashboard) ----------
function ringSvg(size, stroke, pct, color){
  const r=(size-stroke)/2, c=2*Math.PI*r;
  const dash=c*Math.max(0,Math.min(1,pct));
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#2c2c2e" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}"
      stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${dash} ${c}"/>
  </svg>`;
}
function renderToday(){
  const pi = todaysPlanIndex();
  const budget=getBudget(), used=caloriesToday(), left=budget-used;
  const water=waterToday();
  const wRows=DB.all("SELECT kg,logged_at FROM weight_log ORDER BY logged_at ASC");
  const lw=latestWeight();
  const calOver=left<0;

  let h=`<div class="head">
    <div class="date">${new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"})}</div>
    <h1>Today</h1></div>`;

  // workout
  if(pi>=0){
    h+=`<div class="dash-card dash-workout" data-goto="workout" data-goday="${pi}" style="cursor:pointer">
      <div class="dc-head"><span class="dc-title">Workout</span><span class="dc-go">Open ›</span></div>
      <div class="dw-type">${PLAN[pi].type}</div>
      <div class="dw-sub">${PLAN[pi].sub} · ${PLAN[pi].ex.length} exercises</div>
    </div>`;
  } else {
    h+=`<div class="dash-card dash-workout">
      <div class="dc-head"><span class="dc-title">Workout</span></div>
      <div class="dw-type">Rest day</div>
      <div class="dw-sub">Recovery — walk or stretch</div>
    </div>`;
  }

  // calories + weight side by side
  h+=`<div class="dash-split">
    <div class="dash-card" data-goto="food" style="cursor:pointer">
      <div class="dc-head"><span class="dc-title">Calories</span></div>
      <div class="mini-ring">
        ${ringSvg(64,9,used/budget,calOver?"var(--move)":"var(--exercise)")}
        <div class="mr-text">
          <div class="mr-big ${calOver?"over":""}">${Math.abs(left)}</div>
          <div class="mr-lbl">${calOver?"over":"left"}</div>
        </div>
      </div>
    </div>
    <div class="dash-card dash-weight" data-goto="weight" style="cursor:pointer">
      <div class="dc-head"><span class="dc-title">Weight</span></div>
      <div class="dwt-big">${lw.toFixed(1)} kg</div>
      <div class="dwt-sub">${(START_KG-lw)>=0?"−":"+"}${Math.abs(START_KG-lw).toFixed(1)} kg · ${Math.max(0,lw-TARGET_KG).toFixed(1)} to go</div>
    </div>
  </div>`;

  // water
  h+=`<div class="dash-card">
    <div class="dc-head"><span class="dc-title">Water</span></div>
    ${waterBlock(water)}
  </div>`;

  h+=toolsHTML();
  $app.innerHTML=h;
}

// ---------- water block (shared: dashboard + food) ----------
function waterBlock(ml){
  const glasses=Math.round(ml/GLASS_ML);
  let g="";
  for(let i=0;i<GLASS_COUNT;i++){
    g+=`<button class="glass ${i<glasses?"full":""}" data-water="${i}"></button>`;
  }
  return `<div class="water-stat">
      <span class="ws-big">${(ml/1000).toFixed(2)}L</span>
      <span class="ws-goal">/ ${(WATER_GOAL_ML/1000).toFixed(1)}L goal</span>
    </div>
    <div class="water-row">${g}</div>`;
}
async function setWater(targetGlasses){
  // tapping glass N means "I've had N+1 glasses" — set total to that
  const want=(targetGlasses+1)*GLASS_ML;
  const have=waterToday();
  const t=todayISO();
  if(want<=have){
    // tapping a filled glass at/below current => reduce to that count
    await DB.run("DELETE FROM water_log WHERE substr(logged_at,1,10)=?",[t]);
    if(targetGlasses>0)
      await DB.run("INSERT INTO water_log (ml,logged_at) VALUES (?,?)",[targetGlasses*GLASS_ML,new Date().toISOString()]);
  } else {
    await DB.run("DELETE FROM water_log WHERE substr(logged_at,1,10)=?",[t]);
    await DB.run("INSERT INTO water_log (ml,logged_at) VALUES (?,?)",[want,new Date().toISOString()]);
  }
}

// ---------- WORKOUT ----------
function renderWorkout(){
  const d=PLAN[activeDay];
  let h=`<div class="head"><div class="date">${d.sub}</div><h1>${d.type}</h1></div>
    <div class="days">
      ${PLAN.map((p,i)=>`<button class="day ${i===activeDay?"active":""}" data-day="${i}">${p.type}</button>`).join("")}
    </div>`;
  if(d.warm) h+=`<div class="warm"><b>Warmup</b> &nbsp;${esc(d.warm)}</div>`;
  d.ex.forEach(ex=>{
    const last=lastFor(d.key,ex.id);
    h+=`<div class="ex-block">
      <div class="ex-name">${esc(ex.name)}</div>
      <div class="ex-meta">${ex.sets}&times;${ex.reps}${last?` &nbsp;·&nbsp; last <b>${esc(last.weight||"–")}${/^\d/.test(last.weight||"")?"kg":""}&times;${esc(last.reps||"–")}</b>`:""}</div>
      <div class="logline">
        <input type="number" inputmode="decimal" id="w-${ex.id}" placeholder="${last?(last.weight||"kg"):"kg"}">
        <input type="text" id="r-${ex.id}" placeholder="${last?(last.reps||"reps"):"reps"}">
      </div>
    </div>`;
  });
  h+=`<button class="btn btn-go" id="saveWorkout">Save Session</button>`+toolsHTML();
  $app.innerHTML=h;
}
async function saveWorkout(){
  const d=PLAN[activeDay], now=new Date().toISOString();
  let n=0;
  for(const ex of d.ex){
    const w=document.getElementById("w-"+ex.id).value.trim();
    const r=document.getElementById("r-"+ex.id).value.trim();
    if(!w && !r) continue;
    await DB.run("INSERT INTO workout_log (day,ex_id,weight,reps,logged_at) VALUES (?,?,?,?,?)",[d.key,ex.id,w,r,now]);
    n++;
  }
  flash(n?"Saved":"Nothing entered");
  if(n) renderWorkout();
}

// ---------- RUN ----------
function renderRun(){
  const rows=DB.all("SELECT * FROM run_log ORDER BY logged_at ASC");
  const total=rows.reduce((s,r)=>s+(r.distance_km||0),0);
  let h=`<div class="head"><div class="date">Cardio</div><h1>Run</h1></div>
    <div class="stat"><div class="num">${total.toFixed(1)}</div><div class="unit">total km logged</div></div>`;
  h+=lineChart(rows.map(r=>({label:fmtDate(r.logged_at),value:r.distance_km||0})),
    {emptyMsg:"Log at least 2 runs to see your distance chart."});
  h+=`<div class="card">
    <div class="field-row">
      <div class="field"><label>Distance km</label><input type="number" inputmode="decimal" id="runDist" placeholder="5"></div>
      <div class="field"><label>Time min</label><input type="number" inputmode="decimal" id="runMin" placeholder="28"></div>
    </div>
    <div class="field"><label>Note</label><input type="text" id="runNote" placeholder="easy pace"></div>
    <button class="btn btn-go" id="saveRun">Log Run</button>
  </div>
  <div class="cat-head">Recent runs</div>`;
  if(!rows.length) h+=`<div class="empty">No runs logged yet.</div>`;
  else [...rows].reverse().forEach(r=>{
    const pace=(r.distance_km&&r.minutes)?(r.minutes/r.distance_km).toFixed(1)+" min/km":"";
    h+=`<div class="entry">
      <div class="entry-main">
        <div class="entry-name">${(+r.distance_km).toFixed(1)} km${r.note?" · "+esc(r.note):""}</div>
        <div class="entry-sub">${fmtDate(r.logged_at)}${pace?" · "+pace:""}</div>
      </div>
      <span class="entry-val">${r.minutes?(+r.minutes)+"m":""}</span>
      <button class="x" data-del-run="${r.id}">✕</button>
    </div>`;
  });
  h+=toolsHTML();
  $app.innerHTML=h;
}
async function saveRun(){
  const dist=document.getElementById("runDist").value.trim();
  const min=document.getElementById("runMin").value.trim();
  const note=document.getElementById("runNote").value.trim();
  if(!dist && !min){ flash("Enter a distance or time"); return; }
  await DB.run("INSERT INTO run_log (distance_km,minutes,note,logged_at) VALUES (?,?,?,?)",
    [dist?+dist:0,min?+min:null,note,new Date().toISOString()]);
  flash("Run logged"); renderRun();
}

// ---------- WEIGHT ----------
function renderWeight(){
  const rows=DB.all("SELECT * FROM weight_log ORDER BY logged_at ASC");
  const latest=rows.length?rows[rows.length-1].kg:START_KG;
  const first=rows.length?rows[0].kg:START_KG;
  const lost=first-latest, toGo=latest-TARGET_KG;

  let h=`<div class="head"><div class="date">Progress</div><h1>Weight</h1></div>
    <div class="stat">
      <div class="num">${latest.toFixed(1)}</div>
      <div class="unit">${kgToStone(latest)} · current</div>
    </div>
    <div class="progress-row">
      <div class="p-item"><div class="p-val p-lost">${lost>=0?"−":"+"}${Math.abs(lost).toFixed(1)}</div><div class="p-lbl">kg ${lost>=0?"lost":"gained"}</div></div>
      <div class="p-item"><div class="p-val">${TARGET_KG}</div><div class="p-lbl">target kg</div></div>
      <div class="p-item"><div class="p-val p-togo">${toGo>0?toGo.toFixed(1):"0"}</div><div class="p-lbl">kg to go</div></div>
    </div>`;
  h+=lineChart(rows.map(r=>({label:fmtDate(r.logged_at),value:r.kg})),
    {targetValue:TARGET_KG,targetLabel:"target "+TARGET_KG+"kg",
     emptyMsg:"Log at least 2 weigh-ins to see your trend chart."});
  h+=`<div class="card">
    <div class="field-row">
      <div class="field"><label>Weight (kg)</label>
        <input type="number" inputmode="decimal" id="wKg" placeholder="${latest.toFixed(1)}"></div>
      <div class="field"><label>Date</label>
        <input type="date" id="wDate" value="${todayISO()}" max="${todayISO()}"></div>
    </div>
    <button class="btn btn-go" id="saveWeight">Log Weight</button>
  </div>`;
  if(rows.length){
    h+=`<div class="cat-head">History</div>`;
    [...rows].reverse().forEach(r=>{
      h+=`<div class="entry">
        <div class="entry-main">
          <div class="entry-name">${r.kg.toFixed(1)} kg</div>
          <div class="entry-sub">${fmtDate(r.logged_at)} · ${kgToStone(r.kg)}</div>
        </div>
        <button class="x" data-del-weight="${r.id}">✕</button>
      </div>`;
    });
  }
  h+=toolsHTML();
  $app.innerHTML=h;
}
async function saveWeight(){
  const v=document.getElementById("wKg").value.trim();
  const dEl=document.getElementById("wDate");
  const d=(dEl&&dEl.value)?dEl.value:todayISO();
  if(!v||isNaN(parseFloat(v))){ flash("Enter a weight"); return; }
  // one entry per day — replace if that date already logged
  await DB.run("DELETE FROM weight_log WHERE substr(logged_at,1,10)=?",[d]);
  // store at noon on the chosen date so ordering is stable
  await DB.run("INSERT INTO weight_log (kg,logged_at) VALUES (?,?)",[parseFloat(v),d+"T12:00:00.000Z"]);
  flash("Weight logged"); renderWeight();
}

// ---------- FOOD ----------
function renderFood(){
  const budget=getBudget();
  const eaten=DB.all("SELECT * FROM food_log WHERE substr(logged_at,1,10)=? ORDER BY id DESC",[todayISO()]);
  const m=macrosToday();
  const used=m.cal, left=budget-used, over=left<0;
  const R=88,C=2*Math.PI*R;
  const dash=C*(over?1:Math.max(0,Math.min(1,used/budget)));

  let h=`<div class="head"><div class="date">${new Date().toLocaleDateString(undefined,{weekday:"long"})}</div><h1>Food</h1></div>
    <div class="ring-card">
      <div class="ring-wrap">
        <svg width="210" height="210" viewBox="0 0 210 210">
          <circle cx="105" cy="105" r="${R}" fill="none" stroke="#2c2c2e" stroke-width="19"/>
          <circle cx="105" cy="105" r="${R}" fill="none" stroke="${over?'var(--move)':'var(--exercise)'}"
            stroke-width="19" stroke-linecap="round" stroke-dasharray="${dash} ${C}"/>
        </svg>
        <div class="ring-center"><div class="big ${over?"over":""}">${Math.abs(left)}</div><div class="lbl">${over?"over":"left"}</div></div>
      </div>
      <div class="ring-sub"><b>${used}</b> eaten · <b>${budget}</b> budget &nbsp;<button class="link-btn" id="editBudget">edit</button></div>
    </div>

    <div class="macro-row">
      <div class="macro m-p"><div class="m-val">${Math.round(m.p)}g</div><div class="m-lbl">Protein</div></div>
      <div class="macro m-c"><div class="m-val">${Math.round(m.c)}g</div><div class="m-lbl">Carbs</div></div>
      <div class="macro m-f"><div class="m-val">${Math.round(m.f)}g</div><div class="m-lbl">Fat</div></div>
      <div class="macro m-s"><div class="m-val">${Math.round(m.s)}g</div><div class="m-lbl">Sugar</div></div>
    </div>
    <div class="micro-line">
      <span>Iron <b>${m.fe.toFixed(1)}mg</b></span>
      <span>Zinc <b>${m.zn.toFixed(1)}mg</b></span>
      <span>Potassium <b>${Math.round(m.k)}mg</b></span>
    </div>`;

  h+=`<div class="dash-card"><div class="dc-head"><span class="dc-title">Water</span></div>${waterBlock(waterToday())}</div>`;

  if(eaten.length){
    h+=`<div class="cat-head">Eaten today</div>`;
    eaten.forEach(e=>{
      h+=`<div class="entry">
        <span class="entry-main"><span class="entry-name">${esc(e.name)}</span>
          <span class="entry-sub">${Math.round(e.protein)}p · ${Math.round(e.carbs)}c · ${Math.round(e.fat)}f · ${Math.round(e.sugar)} sugar</span></span>
        <span class="entry-val" style="color:var(--move)">−${e.calories}</span>
        <button class="x" data-del-food="${e.id}">✕</button>
      </div>`;
    });
  }
  h+=`<div class="divider"></div>`;
  FOOD_CATS.forEach(cat=>{
    h+=`<div class="cat-head">${cat}</div>`;
    FOODS.filter(f=>f.cat===cat).forEach(f=>{
      h+=`<button class="food" data-food="${esc(f.name)}">
        <div class="food-main">
          <div class="food-name">${esc(f.name)}</div>
          <div class="food-macro">${f.p}p · ${f.c}c · ${f.f}f · ${f.s} sugar</div>
        </div>
        <div class="food-cal">${f.cal}<span> cal</span></div>
      </button>`;
    });
  });
  h+=toolsHTML();
  $app.innerHTML=h;
}
async function eatFood(name){
  const f = FOODS.find(x=>x.name===name);
  if(!f) return;
  await DB.run(`INSERT INTO food_log (name,calories,protein,fat,carbs,sugar,iron,zinc,potassium,logged_at)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [f.name,f.cal,f.p,f.f,f.c,f.s,f.fe,f.zn,f.k,new Date().toISOString()]);
  flash(`−${f.cal} cal`); renderFood();
}

// ---------- shared ----------
function toolsHTML(){
  return `<div class="tools">
      <button class="btn btn-sub" id="exportDb">Backup .db</button>
      <button class="btn btn-sub" id="importDb">Restore</button>
    </div>
    <input type="file" id="importFile" accept=".db,.sqlite" hidden>
    <div class="tools-note">Saved on this device. Backup to keep a copy or move phones.</div>`;
}
function render(){
  if(activeTab==="today") renderToday();
  else if(activeTab==="workout") renderWorkout();
  else if(activeTab==="run") renderRun();
  else if(activeTab==="weight") renderWeight();
  else renderFood();
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===activeTab));
}

// ---------- events ----------
document.addEventListener("click", async (e)=>{
  const t=e.target.closest("button, [data-goto]");
  if(!t) return;

  if(t.dataset.goto){
    activeTab=t.dataset.goto;
    if(t.dataset.goday!==undefined) activeDay=+t.dataset.goday;
    render(); scrollTo(0,0); return;
  }
  if(t.dataset.tab){ activeTab=t.dataset.tab; render(); scrollTo(0,0); return; }
  if(t.dataset.day!==undefined){ activeDay=+t.dataset.day; renderWorkout(); scrollTo(0,0); return; }

  if(t.dataset.water!==undefined){
    await setWater(+t.dataset.water);
    render();
    return;
  }

  if(t.id==="saveWorkout") return saveWorkout();
  if(t.id==="saveRun")     return saveRun();
  if(t.id==="saveWeight")  return saveWeight();

  if(t.dataset.food) return eatFood(t.dataset.food);
  if(t.dataset.delFood){ await DB.run("DELETE FROM food_log WHERE id=?",[+t.dataset.delFood]); renderFood(); return; }
  if(t.dataset.delRun){ await DB.run("DELETE FROM run_log WHERE id=?",[+t.dataset.delRun]); renderRun(); return; }
  if(t.dataset.delWeight){ await DB.run("DELETE FROM weight_log WHERE id=?",[+t.dataset.delWeight]); renderWeight(); return; }

  if(t.id==="editBudget"){
    const v=prompt("Daily calorie budget",getBudget());
    if(v && !isNaN(parseInt(v))){
      const n=String(parseInt(v));
      await DB.run("INSERT INTO settings (key,value) VALUES ('budget',?) ON CONFLICT(key) DO UPDATE SET value=?",[n,n]);
      renderFood();
    }
    return;
  }
  if(t.id==="exportDb"){ DB.exportFile(); flash("gym.db saved"); return; }
  if(t.id==="importDb"){ document.getElementById("importFile").click(); return; }
});
document.addEventListener("change", async (e)=>{
  if(e.target.id==="importFile" && e.target.files[0]){
    await DB.importFile(e.target.files[0]); flash("Restored"); render();
  }
});

// ---------- boot ----------
(async function(){
  try{
    await DB.init();
    document.getElementById("tabbar").hidden=false;
    render();
  }catch(err){
    $app.innerHTML=`<div class="empty">Couldn't start the database.<br>Be online for first load.<br><small>${esc(String(err))}</small></div>`;
  }
})();

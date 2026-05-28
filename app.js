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
  {cat:"Breakfast",name:"Salted Caramel Overnight Oats",cal:250,p:20,f:5,c:28,s:9,fe:1.2,zn:1.0,k:320},
  {cat:"Breakfast",name:"M&S Brainfood Yogurt Bowl",cal:220,p:14,f:6,c:24,s:15,fe:1.5,zn:1.0,k:300},
  {cat:"Lunch",name:"M&S Falafel & Houmous Wrap",cal:460,p:20,f:18,c:50,s:5,fe:4.0,zn:1.9,k:580},
  {cat:"Lunch",name:"Plant Kitchen Sandwich",cal:430,p:22,f:12,c:45,s:8,fe:3.2,zn:1.7,k:430},
  {cat:"Lunch",name:"Homemade Chickpea Salad",cal:320,p:20,f:10,c:35,s:6,fe:3.5,zn:1.8,k:620},
  {cat:"Lunch",name:"Bateta Sak & Rice",cal:430,p:14,f:15,c:55,s:5,fe:2.4,zn:1.3,k:710},
  {cat:"Lunch",name:"Protein Yogurt Meal",cal:300,p:30,f:12,c:18,s:12,fe:1.1,zn:1.7,k:420},
  {cat:"Lunch",name:"Paneer Wrap",cal:470,p:35,f:18,c:30,s:4,fe:2.7,zn:3.0,k:520},
  {cat:"Lunch",name:"M&S 3 Bean Wrap",cal:430,p:14,f:16,c:52,s:6,fe:3.8,zn:1.8,k:520},
  {cat:"Lunch",name:"M&S Wensleydale & Carrot Sandwich",cal:480,p:17,f:23,c:49,s:11,fe:2.1,zn:2.3,k:310},
  {cat:"Lunch",name:"M&S Mexican Rice Pot",cal:360,p:9,f:12,c:50,s:5,fe:2.0,zn:1.2,k:450},
  {cat:"Lunch",name:"M&S Cheese & Tomato Sub Roll",cal:510,p:22,f:21,c:54,s:8,fe:2.4,zn:2.8,k:390},
  {cat:"Lunch",name:"M&S Bean & Sweet Potato Wrap",cal:445,p:13,f:14,c:61,s:9,fe:3.5,zn:1.7,k:600},
  {cat:"Lunch",name:"M&S Spinach Falafel Wrap",cal:450,p:15,f:17,c:56,s:5,fe:4.0,zn:1.9,k:590},
  {cat:"Lunch",name:"M&S Mexican Rice & Avocado",cal:360,p:8,f:13,c:49,s:4,fe:2.2,zn:1.1,k:510},
  {cat:"Lunch",name:"M&S 3 Bean Salad",cal:240,p:11,f:7,c:28,s:5,fe:2.5,zn:1.5,k:500},
  {cat:"Lunch",name:"Plant Chef Tagine Wrap",cal:430,p:12,f:15,c:55,s:8,fe:2.0,zn:1.0,k:400},
  {cat:"Lunch",name:"Tesco Falafel & Houmous Wrap",cal:470,p:16,f:18,c:58,s:6,fe:4.1,zn:2.0,k:610},
  {cat:"Lunch",name:"Tesco Spicy Bean Wrap",cal:430,p:14,f:13,c:60,s:7,fe:3.6,zn:1.7,k:560},
  {cat:"Lunch",name:"Protein Pasta + White Sauce",cal:520,p:32,f:16,c:62,s:8,fe:2.5,zn:2.0,k:480},
  {cat:"Dinner",name:"Rajma & Rice",cal:430,p:22,f:7,c:55,s:5,fe:4.5,zn:2.0,k:760},
  {cat:"Dinner",name:"Veg Stir-Fry & Rice",cal:300,p:14,f:8,c:45,s:6,fe:2.1,zn:1.0,k:540},
  {cat:"Dinner",name:"Chana Masala",cal:310,p:18,f:6,c:30,s:7,fe:3.9,zn:1.8,k:680},
  {cat:"Dinner",name:"Chana Shak",cal:280,p:12,f:9,c:35,s:6,fe:4.0,zn:2.0,k:700},
  {cat:"Dinner",name:"Stuffed Paratha + Yogurt",cal:360,p:18,f:10,c:40,s:5,fe:2.2,zn:1.4,k:390},
  {cat:"Dinner",name:"Vegetable Khichdi",cal:250,p:9,f:5,c:40,s:3,fe:2.0,zn:1.0,k:350},
  {cat:"Dinner",name:"Mixed Vegetable Curry",cal:240,p:8,f:12,c:20,s:8,fe:1.8,zn:0.9,k:510},
  {cat:"Dinner",name:"Yellow Lentil Dal",cal:220,p:14,f:5,c:30,s:4,fe:3.0,zn:1.5,k:650},
  {cat:"Dinner",name:"Basmati Rice (1 cup)",cal:210,p:4,f:1,c:45,s:0,fe:0.2,zn:0.7,k:55},
  {cat:"Dinner",name:"Matar Bhaath",cal:360,p:8,f:7,c:60,s:5,fe:2.0,zn:1.0,k:400},
  {cat:"Dinner",name:"Spinach Lentil Pancake",cal:260,p:16,f:6,c:25,s:3,fe:4.8,zn:1.6,k:710},
  {cat:"Dinner",name:"Spinach Chickpea Wrap",cal:330,p:20,f:8,c:30,s:4,fe:4.5,zn:1.9,k:690},
  {cat:"Dinner",name:"Sweet Potato & Yogurt",cal:220,p:10,f:5,c:35,s:9,fe:1.4,zn:0.8,k:780},
  {cat:"Dinner",name:"Iron-Boost Smoothie",cal:320,p:30,f:10,c:35,s:14,fe:3.9,zn:2.0,k:840},
  {cat:"Dinner",name:"Chilli Paneer",cal:360,p:19,f:24,c:14,s:6,fe:1.4,zn:2.3,k:320},
  {cat:"Dinner",name:"Paneer Bhurji",cal:330,p:20,f:25,c:7,s:5,fe:1.2,zn:2.4,k:280},
  {cat:"Dinner",name:"Palak Paneer",cal:310,p:18,f:22,c:10,s:4,fe:3.5,zn:2.1,k:620},
  {cat:"Dinner",name:"Paneer Tikka",cal:290,p:21,f:20,c:6,s:4,fe:1.1,zn:2.5,k:250},
  {cat:"Dinner",name:"Shahi Paneer",cal:420,p:17,f:34,c:12,s:6,fe:1.0,zn:2.0,k:300},
  {cat:"Dinner",name:"Kadai Paneer",cal:340,p:18,f:24,c:11,s:5,fe:1.5,zn:2.2,k:350},
  {cat:"Dinner",name:"Matar Paneer",cal:350,p:18,f:23,c:15,s:6,fe:2.0,zn:2.1,k:450},
  {cat:"Dinner",name:"Paneer Butter Masala",cal:430,p:17,f:35,c:11,s:7,fe:1.1,zn:2.0,k:310},
  {cat:"Dinner",name:"Saag Paneer",cal:320,p:18,f:22,c:9,s:4,fe:3.8,zn:2.2,k:650},
  {cat:"Dinner",name:"Achari Paneer",cal:340,p:19,f:25,c:8,s:4,fe:1.3,zn:2.3,k:290},
  {cat:"Drinks",name:"Coffee + Semi-Skimmed Milk",cal:35,p:2,f:1.5,c:3,s:3,fe:0.02,zn:0.2,k:90},
  {cat:"Drinks",name:"Tea + Semi-Skimmed Milk",cal:30,p:1.5,f:1,c:3,s:3,fe:0.02,zn:0.1,k:70},
  {cat:"Drinks",name:"Royal Masala Chai",cal:80,p:2,f:2,c:13,s:10,fe:0.2,zn:0.2,k:120},
  {cat:"Drinks",name:"Bulk Aftermath (2 scoops)",cal:290,p:34,f:3,c:30,s:3,fe:1.0,zn:1.0,k:350},
  {cat:"Drinks",name:"Bulk Protein Shake (1 scoop)",cal:120,p:24,f:2,c:3,s:1,fe:0.3,zn:0.5,k:180},
  {cat:"Drinks",name:"BCAA Drink",cal:10,p:2,f:0,c:0,s:0,fe:0,zn:0,k:10},
  {cat:"Drinks",name:"Creatine Drink",cal:0,p:0,f:0,c:0,s:0,fe:0,zn:0,k:0},
  {cat:"Drinks",name:"Vita Coco Coconut Water",cal:60,p:0,f:0,c:15,s:14,fe:0.7,zn:0.2,k:600},
  {cat:"Drinks",name:"Beetroot Juice",cal:70,p:2,f:0,c:15,s:12,fe:0.8,zn:0.3,k:300},
  {cat:"Drinks",name:"Beetroot + Berry Juice",cal:85,p:1,f:0,c:19,s:16,fe:0.7,zn:0.2,k:280},
  {cat:"Drinks",name:"Fresh Mango Milkshake",cal:90,p:2,f:2,c:16,s:15,fe:0.1,zn:0.2,k:150},
  {cat:"Drinks",name:"Coke Zero",cal:2,p:0,f:0,c:0,s:0,fe:0,zn:0,k:10},
  {cat:"Drinks",name:"Water (500ml)",cal:0,p:0,f:0,c:0,s:0,fe:0,zn:0,k:0},
  {cat:"Snacks",name:"Grenade Bar",cal:220,p:20,f:8,c:18,s:2,fe:1.0,zn:0.5,k:120},
  {cat:"Snacks",name:"Grenade Bar (Half)",cal:110,p:10,f:4,c:9,s:1,fe:0.5,zn:0.3,k:60},
  {cat:"Snacks",name:"Greek Yogurt & Berries",cal:140,p:18,f:2,c:10,s:8,fe:0.5,zn:1.0,k:260},
  {cat:"Snacks",name:"Protein Porridge",cal:230,p:20,f:4,c:30,s:5,fe:1.9,zn:1.4,k:260},
  {cat:"Snacks",name:"0% Greek Yogurt (200g)",cal:110,p:20,f:0,c:7,s:7,fe:0.2,zn:1.0,k:280},
  {cat:"Snacks",name:"Bonafide Greek Yogurt (3 tbsp)",cal:90,p:5,f:5,c:4,s:4,fe:0.1,zn:0.6,k:140},
  {cat:"Snacks",name:"M&S Protein Yogurt",cal:150,p:25,f:1,c:10,s:9,fe:0.2,zn:1.0,k:250},
  {cat:"Snacks",name:"Cottage Cheese 0% (100g)",cal:80,p:14,f:1,c:3,s:3,fe:0.1,zn:0.4,k:100},
  {cat:"Snacks",name:"Cottage Cheese & Crackers",cal:159,p:18,f:3,c:15,s:3,fe:0.6,zn:1.1,k:220},
  {cat:"Snacks",name:"Cottage Cheese & Cucumber",cal:110,p:15,f:2,c:6,s:4,fe:0.4,zn:1.0,k:240},
  {cat:"Snacks",name:"Paneer (Full Fat, 100g)",cal:265,p:18,f:21,c:2,s:2,fe:0.2,zn:2.0,k:140},
  {cat:"Snacks",name:"Edamame Pot",cal:130,p:11,f:5,c:8,s:2,fe:2.2,zn:1.0,k:480},
  {cat:"Snacks",name:"Banana & Peanut Butter",cal:180,p:5,f:7,c:25,s:13,fe:0.8,zn:0.7,k:430},
  {cat:"Snacks",name:"Handful of Almonds",cal:180,p:7,f:15,c:5,s:1,fe:1.1,zn:0.9,k:220},
  {cat:"Snacks",name:"M&S Carrot Cake High Protein",cal:320,p:20,f:11,c:32,s:18,fe:1.9,zn:1.3,k:250},
  {cat:"Snacks",name:"M&S Carrot Sticks & Houmous",cal:140,p:4,f:8,c:12,s:5,fe:1.0,zn:0.8,k:250},
  {cat:"Snacks",name:"M&S Red Pepper Pitta Chips",cal:190,p:4,f:5,c:30,s:2,fe:1.4,zn:0.8,k:170},
  {cat:"Snacks",name:"M&S Popped Chips",cal:95,p:2,f:2,c:16,s:1,fe:0.5,zn:0.3,k:120},
  {cat:"Snacks",name:"M&S Good Gut Kefir Drink",cal:140,p:9,f:4,c:15,s:14,fe:0.1,zn:0.9,k:390},
  {cat:"Snacks",name:"Graham's Protein 25g Mango",cal:190,p:25,f:0.5,c:18,s:17,fe:0.1,zn:1.0,k:410},
  {cat:"Snacks",name:"Jimmy's / Myprotein Iced Coffee",cal:143,p:12,f:2.9,c:12,s:10,fe:0.1,zn:0.5,k:300},
  {cat:"Supplements",name:"Ashwagandha + Lion's Mane Gummy",cal:15,p:0,f:0,c:3,s:2,fe:0,zn:0,k:5},
  {cat:"Supplements",name:"Bassets Multivitamin",cal:8,p:0,f:0,c:2,s:2,fe:0.2,zn:0.1,k:5},
  {cat:"Supplements",name:"Creatine (9.5g)",cal:0,p:0,f:0,c:0,s:0,fe:0,zn:0,k:0},
  {cat:"Supplements",name:"BCAA (9.5g)",cal:10,p:2,f:0,c:0,s:0,fe:0,zn:0,k:10},
  {cat:"Breakfast",name:"Toast with Butter (1 slice)",cal:130,p:3,f:6,c:16,s:1,fe:0.8,zn:0.3,k:55},
  {cat:"Breakfast",name:"Toast with Butter (2 slices)",cal:260,p:6,f:12,c:32,s:2,fe:1.6,zn:0.6,k:110},
  {cat:"Breakfast",name:"Cornflakes (bowl)",cal:265,p:8,f:3,c:49,s:11,fe:6.0,zn:1.2,k:330},
  {cat:"Breakfast",name:"Coco Pops (bowl)",cal:270,p:8,f:4,c:50,s:24,fe:6.5,zn:1.2,k:340},
  {cat:"Breakfast",name:"Weetabix x2 (bowl)",cal:210,p:10,f:3.5,c:32,s:9,fe:5.0,zn:1.6,k:430},
  {cat:"Breakfast",name:"Porridge (bowl)",cal:265,p:12,f:6.5,c:40,s:8,fe:2.8,zn:1.6,k:440},
  {cat:"Breakfast",name:"Kefir Drink",cal:140,p:9,f:4,c:15,s:14,fe:0.1,zn:0.9,k:390},
  {cat:"Breakfast",name:"Good Gut Yogurt",cal:120,p:8,f:3,c:14,s:12,fe:0.1,zn:0.8,k:300},
  {cat:"Fruits",name:"Banana",cal:110,p:1,f:0,c:28,s:15,fe:0.3,zn:0.2,k:450},
  {cat:"Fruits",name:"Apple",cal:95,p:0.5,f:0,c:25,s:19,fe:0.2,zn:0.1,k:195},
  {cat:"Fruits",name:"Pear",cal:100,p:1,f:0,c:27,s:17,fe:0.3,zn:0.2,k:210},
  {cat:"Fruits",name:"Orange",cal:65,p:1,f:0,c:16,s:12,fe:0.1,zn:0.1,k:240},
  {cat:"Fruits",name:"Satsuma / Clementine",cal:35,p:0.7,f:0,c:9,s:7,fe:0.1,zn:0.1,k:130},
  {cat:"Fruits",name:"Grapes (small bunch, 100g)",cal:70,p:0.7,f:0,c:18,s:16,fe:0.4,zn:0.1,k:190},
  {cat:"Fruits",name:"Strawberries (100g)",cal:33,p:0.7,f:0,c:8,s:5,fe:0.4,zn:0.1,k:150},
  {cat:"Fruits",name:"Blueberries (100g)",cal:57,p:0.7,f:0,c:14,s:10,fe:0.3,zn:0.2,k:77},
  {cat:"Fruits",name:"Mixed Berries (80g)",cal:40,p:0.6,f:0,c:9,s:6,fe:0.3,zn:0.1,k:100},
  {cat:"Fruits",name:"Mango (100g)",cal:60,p:0.8,f:0,c:15,s:14,fe:0.2,zn:0.1,k:170},
  {cat:"Fruits",name:"Kiwi",cal:42,p:0.8,f:0,c:10,s:6,fe:0.2,zn:0.1,k:215},
  {cat:"Fruits",name:"Pineapple (100g)",cal:50,p:0.5,f:0,c:13,s:10,fe:0.3,zn:0.1,k:110},
  {cat:"Fruits",name:"Watermelon (100g)",cal:30,p:0.6,f:0,c:8,s:6,fe:0.2,zn:0.1,k:112},
  {cat:"Fruits",name:"Pomegranate (half)",cal:70,p:1.5,f:1,c:16,s:12,fe:0.2,zn:0.2,k:210},
  {cat:"Fruits",name:"Dates x3",cal:60,p:0.5,f:0,c:16,s:14,fe:0.3,zn:0.1,k:140},
];
const FOOD_CATS = ["Breakfast","Lunch","Dinner","Drinks","Fruits","Snacks","Supplements"];

// ---- treadmill interval timer presets ----
// trans = belt slowdown window (its own phase between work and rest)
const TIMER_PRESETS = [
  {id:"t3030", name:"30 / 30 × 10", work:30, rest:30, trans:8, rounds:10,
   note:"Sprint / walk · belt-aware"},
  {id:"t6060", name:"60 / 60 × 10", work:60, rest:60, trans:8, rounds:10,
   note:"Run / walk · classic"},
  {id:"t3090", name:"30 / 90 × 8", work:30, rest:90, trans:8, rounds:8,
   note:"Hard sprints, long recovery"},
  {id:"t4575", name:"45 / 75 × 8", work:45, rest:75, trans:8, rounds:8,
   note:"Middle-ground intervals"},
  {id:"t2040", name:"20 / 40 × 12", work:20, rest:40, trans:6, rounds:12,
   note:"Short sharp sprints"},
  {id:"t3m1m", name:"3min / 1min × 6", work:180, rest:60, trans:8, rounds:6,
   note:"Endurance intervals"},
];

// ---- core / ab interval timers (best of the originals) ----
const CORE_PRESETS = [
  {id:"c1", name:"Core 5 — Plank Series", work:30, rest:15, trans:0, rounds:5,
   work_label:"Plank", note:"Everyday core"},
  {id:"c3", name:"Tabata Plank", work:20, rest:10, trans:0, rounds:8,
   work_label:"Hold", note:"Short & sharp"},
  {id:"c4", name:"Anti-Sit — Plank & Reverse", work:30, rest:30, trans:0, rounds:6,
   work_label:"Plank / Reverse", note:"Alternating holds"},
  {id:"c5", name:"Abs of Steel — Endurance", work:90, rest:30, trans:0, rounds:5,
   work_label:"Plank Hold", note:"Long grindy holds"},
];
const TIMER_PREP = 10;   // build-up before round 1

const DEFAULT_BUDGET = 2100;          // cut target — editable in-app
const GOAL_PROTEIN = 150;             // g — kept high to protect muscle in a deficit
const GOAL_CARBS   = 190;             // g — flexed down to create the deficit
const GOAL_FAT     = 65;              // g
const GOAL_IRON    = 18;              // mg minimum
const GOAL_ZINC    = 11;              // mg minimum (vegetarian-leaning, training)
const GOAL_POTASSIUM = 3500;          // mg minimum
const START_KG = 82.1;
const TARGET_KG = 72;
const WATER_GOAL_ML = 3000;
const GLASS_ML = 250;            // one tap = 250 ml
const GLASS_COUNT = WATER_GOAL_ML / GLASS_ML;

let activeTab = "today";
let activeDay = 0;
let runSubTab = "timer";  // "timer" | "log"
let foodSearch = "";
let foodPortion = {};       // {foodName: multiplier}, defaults to 1
let showAddFood = false;
let editingFood = null;     // for editing a custom food
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
function getSetting(key, fallback){
  const r = DB.all("SELECT value FROM settings WHERE key=?",[key])[0];
  return r ? r.value : fallback;
}
async function setSetting(key, value){
  const v = String(value);
  await DB.run("INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=?",[key,v,v]);
}
function getBudget(){ return parseInt(getSetting('budget', DEFAULT_BUDGET)); }
function goalProtein(){ return parseInt(getSetting('goal_protein', GOAL_PROTEIN)); }
function goalCarbs(){ return parseInt(getSetting('goal_carbs', GOAL_CARBS)); }
function goalFat(){ return parseInt(getSetting('goal_fat', GOAL_FAT)); }
function waterGoalMl(){ return parseInt(getSetting('water_goal', WATER_GOAL_ML)); }
function goalZinc(){ return parseInt(getSetting('goal_zinc', GOAL_ZINC)); }
function portionIncrement(){ return parseFloat(getSetting('portion_step', 0.25)); }
function startKg(){ return parseFloat(getSetting('start_kg', START_KG)); }
function targetKg(){ return parseFloat(getSetting('target_kg', TARGET_KG)); }
function eatBackMode(){ return getSetting('eatback', 'off'); }  // off | half | full
function burnedToday(){
  return DB.all("SELECT COALESCE(SUM(calories),0) c FROM activity_log WHERE substr(logged_at,1,10)=?",[todayISO()])[0].c;
}
function effectiveBudget(){
  const base=getBudget();
  const mode=eatBackMode();
  if(mode==='off') return base;
  const burned=burnedToday();
  return base + Math.round(burned * (mode==='full'?1:0.5));
}
function macrosToday(){
  const r = DB.all(`SELECT COALESCE(SUM(calories),0) cal, COALESCE(SUM(protein),0) p,
    COALESCE(SUM(fat),0) f, COALESCE(SUM(carbs),0) c, COALESCE(SUM(sugar),0) s,
    COALESCE(SUM(iron),0) fe, COALESCE(SUM(zinc),0) zn, COALESCE(SUM(potassium),0) k
    FROM food_log WHERE substr(logged_at,1,10)=?`,[todayISO()])[0];
  return r;
}

function customFoods(){
  return DB.all("SELECT * FROM custom_foods ORDER BY id DESC").map(r=>({
    cat: r.category, name: r.name, cal: r.calories,
    p: r.protein, c: r.carbs, f: r.fat, s: r.sugar,
    fe: r.iron, zn: r.zinc, k: r.potassium,
    custom: true, id: r.id
  }));
}
function allFoods(){
  // user's custom foods first within each category, then built-ins
  const cust = customFoods();
  const map = new Map();
  cust.forEach(f => map.set(f.name.toLowerCase(), f));
  FOODS.forEach(f => { if(!map.has(f.name.toLowerCase())) map.set(f.name.toLowerCase(), f); });
  return [...map.values()];
}
function recentFoods(limit=6){
  // most-eaten in last 14 days, by name, joined back to current food data
  const rows = DB.all(`
    SELECT name, COUNT(*) c FROM food_log
    WHERE date(substr(logged_at,1,10)) >= date('now','-14 days')
    GROUP BY name ORDER BY c DESC, MAX(logged_at) DESC LIMIT ?`,[limit]);
  const all = allFoods();
  const byName = new Map(all.map(f=>[f.name.toLowerCase(), f]));
  return rows.map(r => byName.get(r.name.toLowerCase())).filter(Boolean);
}
function filterFoods(list, q){
  if(!q) return list;
  q = q.toLowerCase().trim();
  return list.filter(f => f.name.toLowerCase().includes(q));
}
function portionOf(name){ return foodPortion[name] || 1; }
function setPortion(name, mult){
  if(mult===1) delete foodPortion[name]; else foodPortion[name]=mult;
}
function caloriesToday(){ return macrosToday().cal; }
function waterToday(){
  return DB.all("SELECT COALESCE(SUM(ml),0) m FROM water_log WHERE substr(logged_at,1,10)=?",[todayISO()])[0].m;
}
function latestWeight(){
  const r = DB.all("SELECT kg FROM weight_log ORDER BY logged_at DESC LIMIT 1")[0];
  return r ? r.kg : startKg();
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
  const budget=effectiveBudget();
  const m=macrosToday();
  const used=m.cal, left=budget-used, calOver=left<0;
  const water=waterToday();
  const lw=latestWeight();
  const R=78, C=2*Math.PI*R;
  const dash=C*(calOver?1:Math.max(0,Math.min(1,used/budget)));

  let h=`<div class="head head-with-action">
    <div>
      <div class="date">${new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"})}</div>
      <h1>Today</h1>
    </div>
    <button class="gear-btn" data-tab="settings" aria-label="Settings">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3.2"/>
        <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-2-3.4-2.3 1a7.6 7.6 0 0 0-2.6-1.5L14 .9h-4l-.5 2.7A7.6 7.6 0 0 0 6.9 5l-2.3-1-2 3.4 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5 2 3.4 2.3-1a7.6 7.6 0 0 0 2.6 1.5l.5 2.7h4l.5-2.7a7.6 7.6 0 0 0 2.6-1.5l2.3 1 2-3.4z"/>
      </svg>
    </button>
  </div>`;

  // --- FOOD: calorie ring + macros, the headline of the day ---
  h+=`<div class="dash-card" data-goto="food" style="cursor:pointer">
    <div class="dc-head"><span class="dc-title">Calories</span><span class="dc-go">Food ›</span></div>
    <div class="ring-card" style="padding:6px 0 2px">
      <div class="ring-wrap" style="width:188px;height:188px">
        <svg width="188" height="188" viewBox="0 0 188 188">
          <circle cx="94" cy="94" r="${R}" fill="none" stroke="#2c2c2e" stroke-width="17"/>
          <circle cx="94" cy="94" r="${R}" fill="none" stroke="${calOver?'var(--move)':'var(--exercise)'}"
            stroke-width="17" stroke-linecap="round" stroke-dasharray="${dash} ${C}"
            transform="rotate(-90 94 94)"/>
        </svg>
        <div class="ring-center">
          <div class="big ${calOver?"over":""}" style="font-size:2.6rem">${Math.abs(left)}</div>
          <div class="lbl">${calOver?"over":"left"}</div>
        </div>
      </div>
      <div class="ring-sub"><b>${used}</b> eaten · <b>${budget}</b> budget</div>
    </div>
    <div class="macro-row" style="margin-top:10px">
      <div class="macro m-p ${m.p>=goalProtein()?"hit":""}"><div class="m-val">${Math.round(m.p)}<span class="m-goal">/${goalProtein()}</span></div><div class="m-lbl">Protein</div></div>
      <div class="macro m-c ${m.c>=goalCarbs()?"hit":""}"><div class="m-val">${Math.round(m.c)}<span class="m-goal">/${goalCarbs()}</span></div><div class="m-lbl">Carbs</div></div>
      <div class="macro m-f ${m.f>=goalFat()?"hit":""}"><div class="m-val">${Math.round(m.f)}<span class="m-goal">/${goalFat()}</span></div><div class="m-lbl">Fat</div></div>
      <div class="macro m-s"><div class="m-val">${Math.round(m.s)}g</div><div class="m-lbl">Sugar</div></div>
    </div>
  </div>`;

  // --- workout ---
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

  // --- quick links: timer + log run ---
  h+=`<div class="dash-split">
    <button class="dash-card quick-link" data-gorun="timer">
      <div class="ql-icon"><svg viewBox="0 0 48 48" fill="none" stroke="#92e82a" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="25" r="14"/><path d="M24 25 L24 16"/><path d="M24 25 L31 29"/></svg></div>
      <div class="ql-text"><div class="ql-title">Timer</div><div class="ql-sub">Intervals & core</div></div>
    </button>
    <button class="dash-card quick-link" data-gorun="log">
      <div class="ql-icon"><svg viewBox="0 0 48 48" fill="none" stroke="#92e82a" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15 L21 24 L12 33"/><path d="M22 15 L31 24 L22 33"/><path d="M32 15 L41 24 L32 33"/></svg></div>
      <div class="ql-text"><div class="ql-title">Log Run</div><div class="ql-sub">Distance & time</div></div>
    </button>
  </div>`;

  // --- weight + water side by side ---
  h+=`<div class="dash-split">
    <div class="dash-card dash-weight" data-goto="weight" style="cursor:pointer">
      <div class="dc-head"><span class="dc-title">Weight</span></div>
      <div class="dwt-big">${lw.toFixed(1)} kg</div>
      <div class="dwt-sub">${(startKg()-lw)>=0?"−":"+"}${Math.abs(startKg()-lw).toFixed(1)} kg · ${Math.max(0,lw-targetKg()).toFixed(1)} to go</div>
    </div>
    <div class="dash-card" data-goto="weight" style="cursor:pointer">
      <div class="dc-head"><span class="dc-title">Water</span></div>
      <div class="dwt-big" style="color:var(--stand)">${(water/1000).toFixed(2)}L</div>
      <div class="dwt-sub">of 2.5L goal</div>
    </div>
  </div>`;

  h+=toolsHTML();
  $app.innerHTML=h;
}


// ---------- water block (shared: dashboard + food) ----------
function waterBlock(ml){
  const goalMl=waterGoalMl();
  const pct=Math.min(100, Math.round(ml/goalMl*100));
  return `<div class="water-slim">
      <button class="water-pm" data-water-add="-250" aria-label="less water">−</button>
      <div class="water-mid">
        <div class="water-amt"><span class="wa-big">${(ml/1000).toFixed(2)}</span><span class="wa-lbl">L</span>
          <span class="wa-goal">/ ${(goalMl/1000).toFixed(1)}L</span></div>
        <div class="water-bar"><span style="width:${pct}%"></span></div>
      </div>
      <button class="water-pm" data-water-add="250" aria-label="more water">+</button>
    </div>`;
}
async function adjustWater(deltaMl){
  const t = todayISO();
  const have = waterToday();
  const want = Math.max(0, have + deltaMl);
  await DB.run("DELETE FROM water_log WHERE substr(logged_at,1,10)=?",[t]);
  if(want>0)
    await DB.run("INSERT INTO water_log (ml,logged_at) VALUES (?,?)",[want, new Date().toISOString()]);
  render();
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
    <div class="subtabs">
      <button class="subtab ${runSubTab==="timer"?"active":""}" data-runsub="timer">Timer</button>
      <button class="subtab ${runSubTab==="log"?"active":""}" data-runsub="log">Log Run</button>
    </div>`;

  if(runSubTab==="timer"){
    h+=`<div class="timer-list-head">Treadmill Intervals</div>`;
    TIMER_PRESETS.forEach(p=>{
      h+=`<button class="timer-preset" data-timer="${p.id}">
        <div class="tp-main">
          <div class="tp-name">${esc(p.name)}</div>
          <div class="tp-detail">${esc(p.note)} · ${p.trans}s belt slowdown</div>
        </div>
        <div class="tp-go">▶</div>
      </button>`;
    });
    h+=`<div class="timer-list-head">Core Timers</div>`;
    CORE_PRESETS.forEach(p=>{
      h+=`<button class="timer-preset" data-coretimer="${p.id}">
        <div class="tp-main">
          <div class="tp-name">${esc(p.name)}</div>
          <div class="tp-detail">${esc(p.note)} · ${p.rounds}× ${p.work}s / ${p.rest}s</div>
        </div>
        <div class="tp-go">▶</div>
      </button>`;
    });
  } else {
    h+=`<div class="stat"><div class="num">${total.toFixed(1)}</div><div class="unit">total km logged</div></div>`;
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

    // --- activity / calorie burn ---
    const burned=burnedToday();
    const mode=eatBackMode();
    h+=`<div class="cat-head" style="margin-top:22px">Activity Burn</div>`;
    h+=`<div class="card">
      <div class="set-note">Burned today: <b style="color:var(--exercise)">${burned} cal</b> ·
        ${mode==='off'?'not added to budget':mode==='half'?'half added to budget':'added to budget'}
        <button class="link-btn" data-tab="settings">change</button></div>
      <div class="burn-grid">
        <button class="burn-btn" data-burn="Walk 30min" data-bcal="150">Walk 30min<span>150</span></button>
        <button class="burn-btn" data-burn="Walk 1hr" data-bcal="300">Walk 1hr<span>300</span></button>
        <button class="burn-btn" data-burn="7k Walk" data-bcal="500">7k Walk<span>500</span></button>
        <button class="burn-btn" data-burn="Treadmill session" data-bcal="350">Treadmill<span>350</span></button>
      </div>
      <div class="field-row" style="margin-top:8px">
        <div class="field"><label>Custom — what</label><input type="text" id="burnName" placeholder="cycle"></div>
        <div class="field field-date"><label>Cals</label><input type="number" inputmode="numeric" id="burnCal" placeholder="250"></div>
      </div>
      <button class="btn btn-sub" id="saveBurn">Log Custom Burn</button>
    </div>`;
    const acts=DB.all("SELECT * FROM activity_log WHERE substr(logged_at,1,10)=? ORDER BY id DESC",[todayISO()]);
    if(acts.length){
      h+=`<div class="cat-head">Logged today</div>`;
      acts.forEach(a=>{
        h+=`<div class="entry">
          <span class="entry-main"><span class="entry-name">${esc(a.name)}</span></span>
          <span class="entry-val">${a.calories} cal</span>
          <button class="x" data-del-act="${a.id}">✕</button>
        </div>`;
      });
    }
  }
  h+=toolsHTML();
  $app.innerHTML=h;
}

async function logBurn(name, cal){
  await DB.run("INSERT INTO activity_log (name,calories,logged_at) VALUES (?,?,?)",
    [name,cal,new Date().toISOString()]);
  flash(`+${cal} cal burned`);
  renderRun();
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
  const latest=rows.length?rows[rows.length-1].kg:startKg();
  const first=rows.length?rows[0].kg:startKg();
  const lost=first-latest, toGo=latest-targetKg();

  let h=`<div class="head"><div class="date">Progress</div><h1>Weight</h1></div>
    <div class="stat">
      <div class="num">${latest.toFixed(1)}</div>
      <div class="unit">${kgToStone(latest)} · current</div>
    </div>
    <div class="progress-row">
      <div class="p-item"><div class="p-val p-lost">${lost>=0?"−":"+"}${Math.abs(lost).toFixed(1)}</div><div class="p-lbl">kg ${lost>=0?"lost":"gained"}</div></div>
      <div class="p-item"><div class="p-val">${targetKg()}</div><div class="p-lbl">target kg</div></div>
      <div class="p-item"><div class="p-val p-togo">${toGo>0?toGo.toFixed(1):"0"}</div><div class="p-lbl">kg to go</div></div>
    </div>`;
  h+=lineChart(rows.map(r=>({label:fmtDate(r.logged_at),value:r.kg})),
    {targetValue:targetKg(),targetLabel:"target "+targetKg()+"kg",
     emptyMsg:"Log at least 2 weigh-ins to see your trend chart."});
  h+=`<div class="card">
    <div class="field-row">
      <div class="field"><label>Weight (kg)</label>
        <input type="number" inputmode="decimal" id="wKg" placeholder="${latest.toFixed(1)}"></div>
      <div class="field field-date"><label>Date</label>
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
function foodRowHTML(f){
  const pc=f.p*4, cc=f.c*4, fc=f.f*9;
  const tot=Math.max(pc+cc+fc,1);
  const pPct=Math.round(pc/tot*100), cPct=Math.round(cc/tot*100);
  const fPct=100-pPct-cPct;
  const dense=f.cal>0 && (f.p/f.cal)>=0.10;
  return `<button class="food" data-food="${esc(f.name)}">
    <div class="food-main">
      <div class="food-name">${esc(f.name)}${f.custom?'<span class="custom-pill">mine</span>':""}</div>
      <div class="food-bar">
        <span style="width:${pPct}%" class="fb-p"></span>
        <span style="width:${cPct}%" class="fb-c"></span>
        <span style="width:${fPct}%" class="fb-f"></span>
      </div>
      <div class="food-macro">
        <b class="fm-p ${dense?"lean":""}">${f.p}g protein</b>
        <span>${f.c}c · ${f.f}f · ${f.s}sug</span>
      </div>
    </div>
    <div class="food-cal">${f.cal}<span> cal</span></div>
  </button>`;
}

function renderFood(){
  const budget=effectiveBudget();
  const eaten=DB.all("SELECT * FROM food_log WHERE substr(logged_at,1,10)=? ORDER BY id DESC",[todayISO()]);
  const m=macrosToday();
  const used=m.cal, left=budget-used, over=left<0;
  const R=88,C=2*Math.PI*R;
  const dash=C*(over?1:Math.max(0,Math.min(1,used/budget)));

  let h=`<div class="head head-with-action">
    <div><div class="date">${new Date().toLocaleDateString(undefined,{weekday:"long"})}</div><h1>Food</h1></div>
    <button class="gear-btn" data-toggle-add aria-label="Add food">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </button>
  </div>
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
      <div class="macro m-p ${m.p>=goalProtein()?"hit":""}"><div class="m-val">${Math.round(m.p)}<span class="m-goal">/${goalProtein()}</span></div><div class="m-lbl">Protein</div></div>
      <div class="macro m-c ${m.c>=goalCarbs()?"hit":""}"><div class="m-val">${Math.round(m.c)}<span class="m-goal">/${goalCarbs()}</span></div><div class="m-lbl">Carbs</div></div>
      <div class="macro m-f ${m.f>=goalFat()?"hit":""}"><div class="m-val">${Math.round(m.f)}<span class="m-goal">/${goalFat()}</span></div><div class="m-lbl">Fat</div></div>
      <div class="macro m-s"><div class="m-val">${Math.round(m.s)}g</div><div class="m-lbl">Sugar</div></div>
    </div>
    <div class="micro-line">
      <span class="${m.fe>=GOAL_IRON?"micro-hit":""}">Iron <b>${m.fe.toFixed(1)}</b>/${GOAL_IRON}mg</span>
      <span class="${m.zn>=goalZinc()?"micro-hit":""}">Zinc <b>${m.zn.toFixed(1)}</b>/${goalZinc()}mg</span>
      <span class="${m.k>=GOAL_POTASSIUM?"micro-hit":""}">K <b>${Math.round(m.k)}</b>/${GOAL_POTASSIUM}mg</span>
    </div>`;

  h+=`<div class="dash-card"><div class="dc-head"><span class="dc-title">Water</span></div>${waterBlock(waterToday())}</div>`;

  // --- Eaten today: clipped + scrollable ---
  if(eaten.length){
    h+=`<div class="cat-head">Eaten today <span style="color:var(--dim);font-weight:600">· ${eaten.length}</span></div>
    <div class="eaten-scroll">`;
    eaten.forEach(e=>{
      h+=`<div class="entry eaten-entry">
        <div class="entry-main">
          <div class="entry-name">${esc(e.name)}</div>
          <div class="entry-sub">${Math.round(e.protein)}p · ${Math.round(e.carbs)}c · ${Math.round(e.fat)}f</div>
        </div>
        <div class="entry-cal">−${e.calories}</div>
        <div class="entry-pm">
          <button class="pm-btn" data-adjust-food="${e.id}|-1" aria-label="less">−</button>
          <button class="pm-btn" data-adjust-food="${e.id}|1" aria-label="more">+</button>
          <button class="x" data-del-food="${e.id}">✕</button>
        </div>
      </div>`;
    });
    h+=`</div>`;
  }

  // --- Add Food form (toggleable) ---
  if(showAddFood){
    const ef=editingFood||{};
    h+=`<div class="cat-head">${editingFood?"Edit Food":"Add New Food"}</div>
    <div class="card add-food-card">
      <div class="set-note" style="margin-bottom:8px">Paste from ChatGPT, a label, or a recipe. Fill what you know — leave blank for 0.</div>
      <div class="field"><label>Name</label><input id="nf-name" type="text" value="${esc(ef.name||"")}" placeholder="e.g. Aloo Paratha"></div>
      <div class="field"><label>Category</label>
        <select id="nf-cat">
          ${FOOD_CATS.map(c=>`<option value="${c}" ${ef.cat===c?"selected":""}>${c}</option>`).join("")}
        </select>
      </div>
      <div class="field-row">
        <div class="field"><label>Calories</label><input id="nf-cal" type="number" inputmode="numeric" value="${ef.cal||""}" placeholder="0"></div>
        <div class="field"><label>Protein (g)</label><input id="nf-p" type="number" inputmode="decimal" value="${ef.p||""}" placeholder="0"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Carbs (g)</label><input id="nf-c" type="number" inputmode="decimal" value="${ef.c||""}" placeholder="0"></div>
        <div class="field"><label>Fat (g)</label><input id="nf-f" type="number" inputmode="decimal" value="${ef.f||""}" placeholder="0"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Sugar (g)</label><input id="nf-s" type="number" inputmode="decimal" value="${ef.s||""}" placeholder="0"></div>
        <div class="field"><label>Iron (mg)</label><input id="nf-fe" type="number" inputmode="decimal" step="0.1" value="${ef.fe||""}" placeholder="0"></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Zinc (mg)</label><input id="nf-zn" type="number" inputmode="decimal" step="0.1" value="${ef.zn||""}" placeholder="0"></div>
        <div class="field"><label>Potassium (mg)</label><input id="nf-k" type="number" inputmode="numeric" value="${ef.k||""}" placeholder="0"></div>
      </div>
      <div class="row-2">
        <button class="btn btn-sub" data-toggle-add>Cancel</button>
        <button class="btn btn-go" id="saveCustomFood">${editingFood?"Save Changes":"Add Food"}</button>
      </div>
    </div>`;
  }

  // --- Search bar ---
  h+=`<div class="food-search">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
    <input id="foodSearch" type="search" placeholder="Search foods…" value="${esc(foodSearch)}" autocomplete="off">
    ${foodSearch?'<button class="search-clear" data-clear-search>✕</button>':""}
  </div>`;

  const everything = allFoods();
  if(foodSearch){
    const hits = filterFoods(everything, foodSearch);
    h+=`<div class="cat-head">Results <span style="color:var(--dim);font-weight:600">· ${hits.length}</span></div>`;
    if(hits.length===0){
      h+=`<div class="set-note" style="padding:10px 4px">No matches. <button class="link-btn" data-toggle-add>Add "${esc(foodSearch)}" as a new food?</button></div>`;
    } else {
      h+=`<div class="search-results">`;
      hits.slice(0,30).forEach(f=> h+=foodRowHTML(f));
      h+=`</div>`;
    }
  } else {
    // --- Recents ---
    const recents = recentFoods(6);
    if(recents.length){
      h+=`<div class="cat-head">Recent</div><div class="food-scroll">`;
      recents.forEach(f=> h+=foodRowHTML(f));
      h+=`</div>`;
    }
    // --- Categories ---
    FOOD_CATS.forEach(cat=>{
      const items = everything.filter(f=>f.cat===cat);
      if(!items.length) return;
      h+=`<div class="cat-head">${cat} <span style="color:var(--dim);font-weight:600">· ${items.length}</span></div>`;
      h+=`<div class="food-scroll">`;
      items.forEach(f=> h+=foodRowHTML(f));
      h+=`</div>`;
    });
  }

  h+=toolsHTML();
  $app.innerHTML=h;
  // wire the search input — keep state on input
  const si=document.getElementById("foodSearch");
  if(si){
    si.addEventListener("input", e=>{
      foodSearch = e.target.value;
      // re-render but preserve focus + caret
      const caret = e.target.selectionStart;
      renderFood();
      const ns = document.getElementById("foodSearch");
      if(ns){ ns.focus(); ns.setSelectionRange(caret,caret); }
    });
  }
}

async function eatFood(name){
  const f = allFoods().find(x=>x.name===name);
  if(!f) return;
  const mult = portionOf(name);
  const cal = Math.round(f.cal*mult);
  await DB.run(`INSERT INTO food_log (name,calories,protein,fat,carbs,sugar,iron,zinc,potassium,logged_at)
    VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [f.name, cal, f.p*mult, f.f*mult, f.c*mult, f.s*mult, f.fe*mult, f.zn*mult, f.k*mult,
     new Date().toISOString()]);
  setPortion(name, 1);   // reset portion after logging
  flash(`−${cal} cal · ${mult===1?"":mult+"× "}${f.name}`);
  renderFood();
}
async function adjustFood(id, direction){
  const step = portionIncrement();
  const e = DB.all("SELECT * FROM food_log WHERE id=?",[id])[0];
  if(!e) return;
  // figure out the original (1x) values by dividing current values by the implied multiplier
  // but we never stored the multiplier — so: derive step values from the FOOD that matches by name
  const base = allFoods().find(x=>x.name===e.name);
  if(!base){ flash("Can't adjust — food not found"); return; }
  // increment math: take the *base* per-serving values × step × direction
  const dCal = Math.round(base.cal*step*direction);
  if(direction<0 && e.calories+dCal<=0){
    // would go to 0 or below — just delete it
    await DB.run("DELETE FROM food_log WHERE id=?",[id]);
    flash(`Removed ${e.name}`);
    renderFood();
    return;
  }
  await DB.run(`UPDATE food_log SET
    calories=calories+?, protein=protein+?, fat=fat+?, carbs=carbs+?,
    sugar=sugar+?, iron=iron+?, zinc=zinc+?, potassium=potassium+?
    WHERE id=?`,
    [dCal, base.p*step*direction, base.f*step*direction, base.c*step*direction,
     base.s*step*direction, base.fe*step*direction, base.zn*step*direction, base.k*step*direction, id]);
  flash(`${direction>0?"+":""}${dCal} cal`);
  renderFood();
}
async function unlogFood(id){
  await DB.run("DELETE FROM food_log WHERE id=?",[id]);
  renderFood();
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
function renderSettings(){
  const eb=eatBackMode();
  let h=`<div class="head">
    <div class="date">Preferences</div>
    <h1>Settings</h1></div>`;

  // --- daily targets ---
  h+=`<div class="cat-head">Daily Targets</div>
  <div class="card">
    <div class="set-row"><span class="set-lbl">Calories</span>
      <input type="number" inputmode="numeric" id="set-budget" value="${getBudget()}"></div>
    <div class="set-row"><span class="set-lbl">Protein (g)</span>
      <input type="number" inputmode="numeric" id="set-protein" value="${goalProtein()}"></div>
    <div class="set-row"><span class="set-lbl">Carbs (g)</span>
      <input type="number" inputmode="numeric" id="set-carbs" value="${goalCarbs()}"></div>
    <div class="set-row"><span class="set-lbl">Fat (g)</span>
      <input type="number" inputmode="numeric" id="set-fat" value="${goalFat()}"></div>
    <div class="set-row"><span class="set-lbl">Water goal (L)</span>
      <input type="number" inputmode="decimal" step="0.5" id="set-water" value="${(waterGoalMl()/1000).toFixed(1)}"></div>
    <div class="set-row"><span class="set-lbl">Portion +/− step</span>
      <select id="set-portionstep">
        ${[["0.25","¼ serving"],["0.5","½ serving"],["1","1 serving"]].map(([v,l])=>
          `<option value="${v}" ${parseFloat(v)===portionIncrement()?"selected":""}>${l}</option>`).join("")}
      </select></div>
  </div>`;

  // --- eat-back mode ---
  h+=`<div class="cat-head">Exercise Calories</div>
  <div class="card">
    <div class="set-note">When you log a walk or session on the Run tab, should those burned calories be added back to your food budget?</div>
    <div class="seg">
      <button class="seg-btn ${eb==='off'?'on':''}" data-eatback="off">Don't eat back</button>
      <button class="seg-btn ${eb==='half'?'on':''}" data-eatback="half">Half</button>
      <button class="seg-btn ${eb==='full'?'on':''}" data-eatback="full">Full</button>
    </div>
    <div class="set-note" style="margin-top:8px">${
      eb==='off' ? "Burns are logged but your budget stays fixed — the deficit just gets bigger. Best for leaning out."
      : eb==='half' ? "Half of burned calories are added to today's budget — a hedge against overestimated burns."
      : "All burned calories are added to today's budget."
    }</div>
  </div>`;

  // --- weight goals ---
  h+=`<div class="cat-head">Weight</div>
  <div class="card">
    <div class="set-row"><span class="set-lbl">Start (kg)</span>
      <input type="number" inputmode="decimal" step="0.1" id="set-startkg" value="${getSetting('start_kg',START_KG)}"></div>
    <div class="set-row"><span class="set-lbl">Target (kg)</span>
      <input type="number" inputmode="decimal" step="0.1" id="set-targetkg" value="${getSetting('target_kg',TARGET_KG)}"></div>
  </div>`;

  h+=`<button class="btn btn-go" id="saveSettings">Save Settings</button>`;

  // --- data ---
  h+=`<div class="cat-head">Your Data</div>` + toolsHTML();
  $app.innerHTML=h;
}

function render(){
  if(activeTab==="today") renderToday();
  else if(activeTab==="settings") renderSettings();
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

  if(t.dataset.gorun){
    activeTab="run"; runSubTab=t.dataset.gorun;
    render(); scrollTo(0,0); return;
  }
  if(t.dataset.goto){
    activeTab=t.dataset.goto;
    if(t.dataset.goday!==undefined) activeDay=+t.dataset.goday;
    render(); scrollTo(0,0); return;
  }
  if(t.dataset.tab){ activeTab=t.dataset.tab; render(); scrollTo(0,0); return; }
  if(t.dataset.day!==undefined){ activeDay=+t.dataset.day; renderWorkout(); scrollTo(0,0); return; }
  if(t.dataset.runsub){ runSubTab=t.dataset.runsub; renderRun(); scrollTo(0,0); return; }

  if(t.dataset.waterAdd!==undefined){
    return adjustWater(parseInt(t.dataset.waterAdd));
  }

  if(t.dataset.timer){
    const p=TIMER_PRESETS.find(x=>x.id===t.dataset.timer);
    if(p) Timer.open(p);
    return;
  }
  if(t.dataset.coretimer){
    const p=CORE_PRESETS.find(x=>x.id===t.dataset.coretimer);
    if(p) Timer.open(p);
    return;
  }
  if(t.id==="saveWorkout") return saveWorkout();
  if(t.id==="saveRun")     return saveRun();
  if(t.dataset.burn) return logBurn(t.dataset.burn, +t.dataset.bcal);
  if(t.id==="saveBurn"){
    const n=document.getElementById("burnName").value.trim();
    const c=document.getElementById("burnCal").value.trim();
    if(!c||isNaN(parseInt(c))){ flash("Enter calories"); return; }
    return logBurn(n||"Activity", parseInt(c));
  }
  if(t.dataset.delAct){ await DB.run("DELETE FROM activity_log WHERE id=?",[+t.dataset.delAct]); renderRun(); return; }
  if(t.id==="saveWeight")  return saveWeight();

  // --- food row clicks ---
  if(t.dataset.adjustFood){
    const [id, dir] = t.dataset.adjustFood.split("|");
    return adjustFood(+id, parseInt(dir));
  }
  // tap a food row to log 1 serving
  const foodEl = t.closest && t.closest(".food");
  if(foodEl && foodEl.dataset.food){
    return eatFood(foodEl.dataset.food);
  }
  if(t.dataset.delFood){ await DB.run("DELETE FROM food_log WHERE id=?",[+t.dataset.delFood]); renderFood(); return; }
  if(t.hasAttribute && t.hasAttribute("data-clear-search")){ foodSearch=""; renderFood(); return; }
  if(t.hasAttribute && t.hasAttribute("data-toggle-add") ||
     (t.closest && t.closest("[data-toggle-add]"))){
    showAddFood = !showAddFood;
    if(!showAddFood) editingFood = null;
    renderFood();
    if(showAddFood) setTimeout(()=>{const n=document.getElementById("nf-name"); if(n) n.focus();},50);
    return;
  }
  if(t.id==="saveCustomFood"){
    const v=(id)=>document.getElementById(id).value.trim();
    const name=v("nf-name");
    if(!name){ flash("Name required"); return; }
    const cat=document.getElementById("nf-cat").value;
    const cal=parseInt(v("nf-cal"))||0;
    const p=parseFloat(v("nf-p"))||0;
    const c=parseFloat(v("nf-c"))||0;
    const f=parseFloat(v("nf-f"))||0;
    const su=parseFloat(v("nf-s"))||0;
    const fe=parseFloat(v("nf-fe"))||0;
    const zn=parseFloat(v("nf-zn"))||0;
    const k=parseInt(v("nf-k"))||0;
    if(editingFood && editingFood.id){
      await DB.run(`UPDATE custom_foods SET name=?,category=?,calories=?,protein=?,fat=?,carbs=?,sugar=?,iron=?,zinc=?,potassium=? WHERE id=?`,
        [name,cat,cal,p,f,c,su,fe,zn,k,editingFood.id]);
      flash("Updated");
    } else {
      await DB.run(`INSERT INTO custom_foods (name,category,calories,protein,fat,carbs,sugar,iron,zinc,potassium,created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [name,cat,cal,p,f,c,su,fe,zn,k,new Date().toISOString()]);
      flash("Food added");
    }
    showAddFood=false; editingFood=null;
    renderFood();
    return;
  }
  if(t.dataset.delRun){ await DB.run("DELETE FROM run_log WHERE id=?",[+t.dataset.delRun]); renderRun(); return; }
  if(t.dataset.delWeight){ await DB.run("DELETE FROM weight_log WHERE id=?",[+t.dataset.delWeight]); renderWeight(); return; }

  if(t.id==="editBudget"){ activeTab="settings"; render(); scrollTo(0,0); return; }

  if(t.dataset.eatback){
    await setSetting('eatback', t.dataset.eatback);
    renderSettings();
    return;
  }
  if(t.id==="saveSettings"){
    const num=(id)=>document.getElementById(id).value.trim();
    const b=num('set-budget'), p=num('set-protein'), c=num('set-carbs'),
          f=num('set-fat'), w=num('set-water'),
          sk=num('set-startkg'), tk=num('set-targetkg');
    if(b) await setSetting('budget', parseInt(b));
    if(p) await setSetting('goal_protein', parseInt(p));
    if(c) await setSetting('goal_carbs', parseInt(c));
    if(f) await setSetting('goal_fat', parseInt(f));
    if(w) await setSetting('water_goal', Math.round(parseFloat(w)*1000));
    const ps = document.getElementById('set-portionstep');
    if(ps) await setSetting('portion_step', ps.value);
    if(sk) await setSetting('start_kg', parseFloat(sk));
    if(tk) await setSetting('target_kg', parseFloat(tk));
    flash("Settings saved");
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

// ---------- TREADMILL TIMER ENGINE ----------
const Timer = (function(){
  let cfg=null, tick=null, wake=null;
  let phase="prepare", round=0, left=TIMER_PREP, paused=false, phaseTotal=TIMER_PREP;
  const RING_C = 2*Math.PI*110;  // ring circumference (r=110)

  const scr=()=>document.getElementById("timerScreen");
  const el=id=>document.getElementById(id);

  function beep(kind){
    // short WebAudio tone — no audio file needed
    try{
      const ac=new (window.AudioContext||window.webkitAudioContext)();
      const o=ac.createOscillator(), g=ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.frequency.value = kind==="go"?880:(kind==="done"?1100:440);
      g.gain.value=0.25;
      o.start();
      o.stop(ac.currentTime + (kind==="done"?0.5:0.18));
    }catch(e){}
    if(navigator.vibrate) navigator.vibrate(kind==="done"?[200,80,200]:120);
  }

  async function wakeOn(){
    try{ if("wakeLock" in navigator) wake=await navigator.wakeLock.request("screen"); }catch(e){}
  }
  function wakeOff(){ try{ if(wake){ wake.release(); wake=null; } }catch(e){} }

  async function fullscreen(){
    const d=document.documentElement;
    try{
      if(!document.fullscreenElement){
        if(d.requestFullscreen) await d.requestFullscreen();
        else if(d.webkitRequestFullscreen) await d.webkitRequestFullscreen();
      }
    }catch(e){}
  }
  function exitFullscreen(){
    try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(e){}
  }

  function fmt(s){
    if(s>=60){ const m=Math.floor(s/60); return m+":"+String(s%60).padStart(2,"0"); }
    return String(s);
  }

  function paint(){
    const s=scr();
    s.className="timer-screen show ph-"+
      (phase==="prepare"?"prepare":phase==="work"?"work":phase==="transition"?"trans":phase==="rest"?"rest":"done");
    if(phase==="work" && left<=3) s.classList.add("ending");

    if(phase==="done"){
      el("tsPhase").textContent="Complete";
      el("tsRound").textContent=cfg.rounds+" rounds done";
      el("tsCount").textContent="✓";
      el("tsMsg").textContent="Good work";
      return;
    }
    el("tsPhase").textContent =
      phase==="prepare"?"Get Ready":phase==="work"?cfg.workLabel:
      phase==="transition"?"Slow Down":"Recover";
    el("tsRound").textContent="Round "+Math.min(round+1,cfg.rounds)+" / "+cfg.rounds;
    const c=el("tsCount");
    c.textContent=fmt(left);
    c.classList.toggle("small", left>=60);
    el("tsMsg").textContent =
      phase==="transition"?"Drop the belt speed":"";

    // progress ring — empties as the interval counts down
    const ring=el("tsRing");
    if(ring){
      const frac = phaseTotal>0 ? left/phaseTotal : 0;
      ring.style.strokeDasharray = RING_C;
      ring.style.strokeDashoffset = RING_C*(1-frac);
    }
  }

  function step(){
    if(paused) return;
    if(left>1){ left--; paint(); 
      if(phase==="work" && left<=3) beep("tick");
      return;
    }
    // phase finished — advance
    if(phase==="prepare"){
      phase="work"; left=cfg.work; phaseTotal=cfg.work; beep("go"); paint(); return;
    }
    if(phase==="work"){
      if(cfg.trans>0){ phase="transition"; left=cfg.trans; phaseTotal=cfg.trans; beep("tick"); paint(); return; }
      toRest(); return;
    }
    if(phase==="transition"){ toRest(); return; }
    if(phase==="rest"){
      round++;
      if(round>=cfg.rounds){ finish(); return; }
      phase="work"; left=cfg.work; phaseTotal=cfg.work; beep("go"); paint(); return;
    }
  }
  function toRest(){
    phase="rest"; left=cfg.rest; phaseTotal=cfg.rest; beep("tick"); paint();
  }
  function finish(){
    clearInterval(tick); tick=null;
    phase="done"; beep("done"); paint();
    wakeOff();
    setTimeout(close, 2600);
  }

  async function open(preset){
    cfg={...preset, workLabel: preset.work_label || "Run"};
    phase="prepare"; round=0; left=TIMER_PREP; phaseTotal=TIMER_PREP; paused=false;
    scr().classList.add("show");
    paint();
    await wakeOn();
    await fullscreen();
    tick=setInterval(step,1000);
  }
  function close(){
    clearInterval(tick); tick=null;
    wakeOff(); exitFullscreen();
    scr().classList.remove("show");
  }
  function togglePause(){
    paused=!paused;
    el("tsPause").textContent=paused?"Resume":"Pause";
  }

  return { open, close, togglePause };
})();

// timer screen controls
document.addEventListener("click",(e)=>{
  if(e.target.id==="tsPause") Timer.togglePause();
  if(e.target.id==="tsQuit") Timer.close();
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

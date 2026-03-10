// ============================================================
// SILV MARKET — data.js
// ✅ THIS IS THE ONLY FILE YOU NEED TO EDIT
// Change prices, names, stock here
// After editing: save → git add . → git commit -m "update" → git push
// ============================================================

// ── PROMO CODES ──────────────────────────────────────────────
const PROMOS = {SILV20:20, BRAINROT20:20, DISCORD10:10, GAG15:15, MM2SAVE:15};

// ── PAYMENT LINKS ────────────────────────────────────────────
const PAY_LINKS = {
  pp: 'https://paypal.me/YOURPAYPAL',
  ca: 'https://cash.app/$YOURCASHTAG',
  cr: '#crypto',
  cd: 'https://paypal.me/YOURPAYPAL',
};

// ── ROBUX ─────────────────────────────────────────────────────
const ROBUX = [
  {a:1000,p:6},{a:2000,p:12},{a:3000,p:18},
  {a:5000,p:30,best:true},{a:10000,p:60},{a:20000,p:120},
];

// ── BLOX FRUITS ───────────────────────────────────────────────
const FRUITS = [
  {n:'Dragon',  em:'🐉',type:'Beast',  rar:'mythical', norm:18.99,perm:32.49,badge:'myth',stock:3, cat:'beast'},
  {n:'Kitsune', em:'🦊',type:'Beast',  rar:'mythical', norm:22.99,perm:39.99,badge:'myth',stock:2, cat:'beast'},
  {n:'Leopard', em:'🐆',type:'Beast',  rar:'mythical', norm:16.99,perm:29.99,badge:'myth',stock:5, cat:'beast'},
  {n:'Spirit',  em:'👻',type:'Natural',rar:'mythical', norm:14.99,perm:26.99,badge:'myth',stock:4, cat:'mythical'},
  {n:'Gravity', em:'⚛️',type:'Natural',rar:'mythical', norm:10.99,perm:22.49,badge:'myth',stock:8, cat:'mythical'},
  {n:'Control', em:'🌀',type:'Natural',rar:'mythical', norm:12.99,perm:23.99,badge:'myth',stock:3, cat:'mythical'},
  {n:'Venom',   em:'☠️',type:'Natural',rar:'mythical', norm:11.49,perm:21.99,badge:'myth',stock:6, cat:'mythical'},
  {n:'Dough',   em:'🍞',type:'Natural',rar:'legendary',norm:9.99, perm:18.49,badge:'hot', stock:11,cat:'legendary'},
  {n:'Shadow',  em:'🦇',type:'Natural',rar:'legendary',norm:7.99, perm:14.99,badge:'leg', stock:7, cat:'legendary'},
  {n:'Blizzard',em:'❄️',type:'Logia',  rar:'legendary',norm:8.49, perm:15.99,badge:'leg', stock:9, cat:'legendary'},
  {n:'Portal',  em:'🌀',type:'Natural',rar:'legendary',norm:7.49, perm:13.99,badge:'leg', stock:14,cat:'legendary'},
  {n:'Buddha',  em:'🧘',type:'Natural',rar:'legendary',norm:5.49, perm:10.79,badge:'hot', stock:20,cat:'legendary'},
  {n:'Quake',   em:'🌍',type:'Natural',rar:'legendary',norm:5.99, perm:11.49,badge:'leg', stock:12,cat:'legendary'},
  {n:'Mammoth', em:'🦣',type:'Beast',  rar:'legendary',norm:8.99, perm:16.49,badge:'leg', stock:5, cat:'beast'},
  {n:'T-Rex',   em:'🦖',type:'Beast',  rar:'legendary',norm:9.49, perm:17.99,badge:'leg', stock:4, cat:'beast'},
  {n:'Yeti',    em:'🏔️',type:'Beast',  rar:'legendary',norm:6.99, perm:13.49,badge:'leg', stock:8, cat:'beast'},
  {n:'Phoenix', em:'🔥',type:'Beast',  rar:'legendary',norm:7.99, perm:14.99,badge:'leg', stock:6, cat:'beast'},
  {n:'Pain',    em:'💜',type:'Natural',rar:'legendary',norm:8.49, perm:15.99,badge:'new', stock:7, cat:'legendary'},
  {n:'Eagle',   em:'🦅',type:'Beast',  rar:'legendary',norm:6.49, perm:12.99,badge:'new', stock:9, cat:'beast'},
  {n:'Creation',em:'🛡️',type:'Natural',rar:'legendary',norm:5.49, perm:10.49,badge:'leg', stock:16,cat:'legendary'},
  {n:'Light',   em:'✨',type:'Logia',  rar:'rare',norm:3.99,perm:7.49, badge:'rare',stock:25,cat:'logia'},
  {n:'Magma',   em:'🌋',type:'Logia',  rar:'rare',norm:3.49,perm:6.99, badge:'rare',stock:22,cat:'logia'},
  {n:'Ice',     em:'🧊',type:'Logia',  rar:'rare',norm:2.99,perm:5.99, badge:'rare',stock:30,cat:'logia'},
  {n:'Sand',    em:'🏜️',type:'Logia',  rar:'rare',norm:2.49,perm:4.99, badge:'rare',stock:28,cat:'logia'},
  {n:'Dark',    em:'🌑',type:'Logia',  rar:'rare',norm:2.49,perm:4.99, badge:'rare',stock:27,cat:'logia'},
  {n:'Gas',     em:'💨',type:'Logia',  rar:'rare',norm:2.99,perm:5.99, badge:'new',  stock:18,cat:'logia'},
  {n:'Flame',   em:'🔥',type:'Logia',  rar:'rare',norm:2.49,perm:4.99, badge:'rare',stock:32,cat:'logia'},
  {n:'Rubber',  em:'🎈',type:'Natural',rar:'rare',norm:2.99,perm:5.99, badge:'rare',stock:20,cat:'rare'},
  {n:'Diamond', em:'💎',type:'Logia',  rar:'rare',norm:2.49,perm:4.99, badge:'rare',stock:24,cat:'logia'},
];

const FRUIT_SKINS = [
  {n:'Dragon Skin - Crimson',em:'🔴',type:'Skin',rar:'legendary',norm:9.99, perm:null,badge:'leg', stock:3,cat:'skin'},
  {n:'Dragon Skin - Void',   em:'⚫',type:'Skin',rar:'legendary',norm:11.99,perm:null,badge:'leg', stock:2,cat:'skin'},
  {n:'Buddha Skin - Golden', em:'🌟',type:'Skin',rar:'rare',     norm:5.99, perm:null,badge:'rare',stock:8,cat:'skin'},
  {n:'Dough Skin - Dark',    em:'🍫',type:'Skin',rar:'rare',     norm:6.99, perm:null,badge:'rare',stock:5,cat:'skin'},
  {n:'Leopard Skin - White', em:'🤍',type:'Skin',rar:'legendary',norm:10.99,perm:null,badge:'leg', stock:3,cat:'skin'},
];

const BF_GP = [
  {n:'2x Money + 2x Mastery', em:'💰',type:'Gamepass',rar:'rare',norm:5.89, perm:null,badge:'hot', stock:99,cat:'gamepass'},
  {n:'+1 Fruit Storage (x2)', em:'📦',type:'Gamepass',rar:'rare',norm:5.19, perm:null,badge:'',    stock:99,cat:'gamepass'},
  {n:'Premium Ship',          em:'⛵',type:'Gamepass',rar:'rare',norm:4.99, perm:null,badge:'',    stock:99,cat:'gamepass'},
  {n:'Gamepass Bundle',       em:'🎮',type:'Gamepass',rar:'leg', norm:12.99,perm:null,badge:'sale',stock:99,cat:'gamepass'},
];

// ── GROW A GARDEN ─────────────────────────────────────────────
const GAG = [
  {n:'Godly Seed Pack',    em:'🌟',cat:'seeds', p:8.99, rar:'legendary',badge:'leg', stock:4, bg:'r-legendary'},
  {n:'Dragon Fruit Seed',  em:'🐉',cat:'seeds', p:12.99,rar:'mythical', badge:'myth',stock:2, bg:'r-mythical'},
  {n:'Rainbow Seed',       em:'🌈',cat:'seeds', p:6.99, rar:'legendary',badge:'leg', stock:7, bg:'r-green'},
  {n:'Galaxy Seed',        em:'🌌',cat:'seeds', p:9.99, rar:'mythical', badge:'myth',stock:3, bg:'r-mythical'},
  {n:'Golden Apple Seed',  em:'🍏',cat:'seeds', p:4.99, rar:'rare',     badge:'rare',stock:15,bg:'r-green'},
  {n:'Crystal Seed',       em:'💎',cat:'seeds', p:5.99, rar:'rare',     badge:'rare',stock:11,bg:'r-rare'},
  {n:'Shadow Mushroom',    em:'🍄',cat:'seeds', p:4.49, rar:'rare',     badge:'',    stock:9, bg:'r-dark'},
  {n:'Godly Bee',          em:'🐝',cat:'pets',  p:14.99,rar:'mythical', badge:'myth',stock:3, bg:'r-mythical'},
  {n:'Rainbow Butterfly',  em:'🦋',cat:'pets',  p:11.99,rar:'legendary',badge:'leg', stock:5, bg:'r-pink'},
  {n:'Golden Ladybug',     em:'🐞',cat:'pets',  p:8.99, rar:'legendary',badge:'hot', stock:7, bg:'r-legendary'},
  {n:'Crystal Snail',      em:'🐌',cat:'pets',  p:6.99, rar:'rare',     badge:'rare',stock:12,bg:'r-rare'},
  {n:'Shadow Cat',         em:'🐈',cat:'pets',  p:9.99, rar:'legendary',badge:'leg', stock:6, bg:'r-dark'},
  {n:'Godly Watering Can', em:'🚿',cat:'tools', p:19.99,rar:'mythical', badge:'myth',stock:2, bg:'r-mythical'},
  {n:'Golden Trowel',      em:'🪴',cat:'tools', p:12.99,rar:'legendary',badge:'leg', stock:5, bg:'r-legendary'},
  {n:'Rainbow Fertilizer', em:'🌈',cat:'tools', p:8.99, rar:'legendary',badge:'leg', stock:8, bg:'r-green'},
  {n:'Crystal Sprinkler',  em:'💦',cat:'tools', p:10.99,rar:'legendary',badge:'hot', stock:4, bg:'r-rare'},
  {n:'Auto-Harvest Tool',  em:'⚙️',cat:'tools', p:6.99, rar:'rare',     badge:'',    stock:10,bg:'r-rare'},
  {n:'5,000 Garden Tokens',em:'💰',cat:'tokens',p:12.99,rar:'rare',     badge:'hot', stock:99,bg:'r-legendary'},
  {n:'10,000 Tokens',      em:'💎',cat:'tokens',p:22.99,rar:'legendary',badge:'best',stock:99,bg:'r-mythical'},
  {n:'Token Doubler 24hr', em:'✨',cat:'tokens',p:4.99, rar:'rare',     badge:'',    stock:99,bg:'r-rare'},
];

// ── ADOPT ME ─────────────────────────────────────────────────
const AM = [
  {n:'Neon FR Unicorn', em:'🦄',p:8.99, oldP:null, badge:'hot', rar:'leg', sub:'neon',      bg:'r-pink',    stock:6},
  {n:'Shadow Dragon',   em:'🐉',p:22.99,oldP:28.99,badge:'sale',rar:'myth',sub:'legendary', bg:'r-mythical',stock:3},
  {n:'Bat Dragon',      em:'🦇',p:18.99,oldP:null, badge:'rare',rar:'myth',sub:'legendary', bg:'r-dark',    stock:4},
  {n:'Frost Dragon',    em:'❄️',p:16.99,oldP:null, badge:'rare',rar:'myth',sub:'legendary', bg:'r-rare',    stock:5},
  {n:'Mega Neon Fox',   em:'🦊',p:6.49, oldP:null, badge:'',    rar:'leg', sub:'mega',      bg:'r-legendary',stock:9},
  {n:'Neon Cerberus',   em:'🐺',p:11.99,oldP:null, badge:'new', rar:'leg', sub:'neon',      bg:'r-rare',    stock:7},
  {n:'FR Parrot',       em:'🦜',p:4.99, oldP:null, badge:'',    rar:'leg', sub:'legendary', bg:'r-green',   stock:12},
  {n:'Golden Dragon',   em:'✨',p:28.99,oldP:null, badge:'hot', rar:'myth',sub:'legendary', bg:'r-legendary',stock:2},
  {n:'Neon Giraffe',    em:'🦒',p:7.99, oldP:null, badge:'',    rar:'leg', sub:'neon',      bg:'r-legendary',stock:10},
  {n:'Neon Axolotl',    em:'🦎',p:5.99, oldP:null, badge:'new', rar:'leg', sub:'neon',      bg:'r-pink',    stock:8},
  {n:'Mega Neon Cat',   em:'🐱',p:4.49, oldP:null, badge:'',    rar:'leg', sub:'mega',      bg:'r-uncommon',stock:11},
  {n:'Mega Neon Panda', em:'🐼',p:9.99, oldP:null, badge:'oos', rar:'leg', sub:'mega',      bg:'r-green',   stock:0,oos:true},
];

// ── MM2 ───────────────────────────────────────────────────────
const MM2 = [
  {n:'Chroma Laser',    em:'🗡️',p:15.99,oldP:null, badge:'hot', sub:'chroma',type:'knife', stock:5, bg:'r-rare'},
  {n:"Nik's Scythe",    em:'🔪',p:34.99,oldP:null, badge:'rare',sub:'godly', type:'scythe',stock:2, bg:'r-mythical'},
  {n:'Elderwood Scythe',em:'⚔️',p:8.49, oldP:null, badge:'',    sub:'godly', type:'scythe',stock:8, bg:'r-legendary'},
  {n:'Chroma Tides',    em:'🌊',p:12.99,oldP:16.99,badge:'sale',sub:'chroma',type:'knife', stock:6, bg:'r-rare'},
  {n:'Corrupt',         em:'💜',p:22.99,oldP:null, badge:'hot', sub:'godly', type:'knife', stock:3, bg:'r-mythical'},
  {n:'Chroma Saw',      em:'🩸',p:18.99,oldP:null, badge:'rare',sub:'chroma',type:'knife', stock:4, bg:'r-rare'},
  {n:'Eternal',         em:'⚡',p:19.99,oldP:null, badge:'rare',sub:'godly', type:'knife', stock:5, bg:'r-legendary'},
  {n:'Hallows Blade',   em:'🎃',p:11.99,oldP:null, badge:'',    sub:'godly', type:'knife', stock:7, bg:'r-rare'},
  {n:'Chroma Luger',    em:'🔫',p:9.99, oldP:null, badge:'',    sub:'chroma',type:'gun',   stock:9, bg:'r-rare'},
  {n:'Icewing',         em:'❄️',p:7.99, oldP:null, badge:'',    sub:'godly', type:'knife', stock:11,bg:'r-rare'},
  {n:'Godly Pack x5',   em:'🎁',p:29.99,oldP:null, badge:'best',sub:'bundle',type:'bundle',stock:99,bg:'r-mythical'},
];

// ── STEAL A BRAINROT ─────────────────────────────────────────
const BRAINROT = [
  {n:'Dragon Cannelloni', em:'🐲',p:4.99,sub:'pets',    badge:'hot',   stock:8, bg:'r-mythical'},
  {n:'MLG Frog Bundle',   em:'🐸',p:3.49,sub:'bundles', badge:'bundle',stock:12,bg:'r-pink'},
  {n:'Ultra OP Pack x3',  em:'👾',p:6.99,sub:'packs',   badge:'',      stock:15,bg:'r-mythical'},
  {n:'Exclusive Starter', em:'⭐',p:9.99,oldP:13.99,sub:'bundles',badge:'sale',stock:7,bg:'r-dark'},
  {n:'Skibidi Toilet Pet',em:'🚽',p:2.99,sub:'pets',    badge:'new',   stock:20,bg:'r-mythical'},
  {n:'Sigma Pet Bundle',  em:'💪',p:5.99,sub:'bundles', badge:'hot',   stock:10,bg:'r-purple'},
  {n:'Rizz Dragon',       em:'😏',p:7.99,sub:'pets',    badge:'rare',  stock:5, bg:'r-mythical'},
  {n:'Gyatt Bunny',       em:'🐇',p:3.99,sub:'pets',    badge:'new',   stock:14,bg:'r-pink'},
  {n:'Mewing Cat',        em:'😤',p:2.49,sub:'pets',    badge:'',      stock:18,bg:'r-mythical'},
  {n:'NPC Pet',           em:'🤖',p:3.99,sub:'pets',    badge:'new',   stock:11,bg:'r-dark'},
];

// ── RIVALS ───────────────────────────────────────────────────
const RIVALS = [
  {n:'Ranked Boost x10',    em:'🏆',p:7.99, sub:'boost',    badge:'hot', stock:99,bg:'r-rare'},
  {n:'Exclusive Char Skin', em:'🎭',p:12.99,sub:'skin',     badge:'rare',stock:4, bg:'r-legendary'},
  {n:'Rivals Ultimate Pack',em:'💎',p:19.99,sub:'bundle',   badge:'best',stock:3, bg:'r-mythical'},
  {n:'XP Boost 24hr',       em:'⚡',p:4.99, sub:'boost',    badge:'',    stock:99,bg:'r-rare'},
  {n:'Custom Title',        em:'🏅',p:3.99, sub:'skin',     badge:'new', stock:99,bg:'r-uncommon'},
  {n:'Character Bundle',    em:'🥊',p:14.99,sub:'bundle',   badge:'sale',stock:5, bg:'r-legendary'},
  {n:'Rivals Coins 5k',     em:'🪙',p:9.99, sub:'currency', badge:'hot', stock:99,bg:'r-legendary'},
  {n:'Win Streak Pack',     em:'🔥',p:11.99,sub:'bundle',   badge:'hot', stock:7, bg:'r-rare'},
];

// ── 99 NIGHTS ────────────────────────────────────────────────
const NIGHTS = [
  {n:'Night Guardian Pet',em:'🌙',p:6.99, sub:'pets',    badge:'rare',stock:5, bg:'r-mythical'},
  {n:'99 Nights Bundle',  em:'⭐',p:14.99,sub:'bundles', badge:'best',stock:3, bg:'r-legendary'},
  {n:'Shadow Wolf Pet',   em:'🐺',p:8.99, sub:'pets',    badge:'hot', stock:6, bg:'r-mythical'},
  {n:'Moonstone Pack',    em:'💎',p:11.99,sub:'bundles', badge:'rare',stock:4, bg:'r-rare'},
  {n:'Night Boost x2',    em:'⚡',p:4.99, sub:'bundles', badge:'',    stock:99,bg:'r-rare'},
  {n:'Eternal Night Pet', em:'🦉',p:9.99, sub:'pets',    badge:'new', stock:7, bg:'r-mythical'},
  {n:'Night Coins 10k',   em:'🪙',p:7.49, sub:'currency',badge:'',    stock:99,bg:'r-legendary'},
  {n:'Dark Crystal Egg',  em:'🥚',p:5.99, sub:'pets',    badge:'new', stock:8, bg:'r-rare'},
];

// ── ESCAPE TSUNAMI ───────────────────────────────────────────
const TSUNAMI = [
  {n:'Tsunami Bundle',   em:'🌊',p:5.99, sub:'bundles', badge:'new', stock:10,bg:'r-blue'},
  {n:'Surfboard Pet',    em:'🏄',p:3.49, sub:'pets',    badge:'',    stock:15,bg:'r-blue'},
  {n:'Tsunami God Pack', em:'⚡',p:8.99, sub:'bundles', badge:'hot', stock:5, bg:'r-mythical'},
  {n:'Wave Rider Skin',  em:'🌀',p:6.49, sub:'bundles', badge:'rare',stock:7, bg:'r-blue'},
  {n:'Poseidon Pet',     em:'🔱',p:11.99,sub:'pets',    badge:'rare',stock:3, bg:'r-legendary'},
  {n:'Tsunami Coins 5k', em:'🪙',p:4.99, sub:'currency',badge:'',    stock:99,bg:'r-uncommon'},
];

// ── BEST SELLERS ─────────────────────────────────────────────
const BESTSELLERS = [
  {n:'Permanent Dragon',  em:'🐉',p:'$32.49',game:'Blox Fruits',  badge:'best',stock:3, bg:'r-mythical'},
  {n:"Nik's Scythe",      em:'🔪',p:'$34.99',game:'MM2',          badge:'hot', stock:2, bg:'r-mythical'},
  {n:'Shadow Dragon',     em:'🐉',p:'$22.99',game:'Adopt Me',     badge:'hot', stock:4, bg:'r-mythical'},
  {n:'Permanent Leopard', em:'🐆',p:'$29.99',game:'Blox Fruits',  badge:'best',stock:5, bg:'r-mythical'},
  {n:'Godly Watering Can',em:'🚿',p:'$19.99',game:'Grow a Garden',badge:'hot', stock:2, bg:'r-mythical'},
  {n:'Rivals Ultimate',   em:'💎',p:'$19.99',game:'Rivals',       badge:'best',stock:3, bg:'r-legendary'},
  {n:'5,000 Robux',       em:'💎',p:'$30.00',game:'Robux',        badge:'hot', stock:99,bg:'r-robux'},
  {n:'99 Nights Bundle',  em:'🌙',p:'$14.99',game:'99 Nights',    badge:'best',stock:3, bg:'r-legendary'},
];
// Silv Market — Cloudflare Pages Middleware
// Intercepts game route requests (/mm2, /bf, /rivals etc.) and injects
// game-specific <title>, OG meta tags, and window.__SILVGAME so the
// client-side JS knows which section to show — all without changing the URL.

const GAMES = {
  bf: {
    title: 'Blox Fruits — Silv Market',
    description: 'Buy Blox Fruits permanent fruits, skins, gamepasses & accounts. Mythical, legendary & rare fruits at the best prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-6e85e925dd676943f02e20d4acded146/500/280/Image/Jpeg/noFilter',
    themeColor: '#ff6a00',
  },
  mm2: {
    title: 'Murder Mystery 2 — Silv Market',
    description: 'Buy MM2 godly knives, chroma weapons, sets & bundles. Best prices on all MM2 items. Instant delivery, verified sellers.',
    image: 'https://tr.rbxcdn.com/180DAY-5ba706807447783862364dfef7a465ff/500/280/Image/Jpeg/noFilter',
    themeColor: '#ff3366',
  },
  gag: {
    title: 'Grow a Garden — Silv Market',
    description: 'Buy Grow a Garden pets, seeds, tools & tokens. Rare & legendary pets at the cheapest prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-58ac6aee17065476c9d28128261b7f89/500/280/Image/Jpeg/noFilter',
    themeColor: '#22c55e',
  },
  am: {
    title: 'Adopt Me — Silv Market',
    description: 'Buy Adopt Me legendary pets, neons & megas. Best prices on all Adopt Me items. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-f8e24fd31411b2a73beb4eadc2c68cb5/500/280/Image/Jpeg/noFilter',
    themeColor: '#f472b6',
  },
  brainrot: {
    title: 'Steal a Brainrot — Silv Market',
    description: 'Buy Steal a Brainrot units. God-tier, meta & starter items including Dragon Cannelloni, Garama, Meowl & more. Best prices.',
    image: 'https://tr.rbxcdn.com/180DAY-81af62355a65c70eadeece0e274e007c/500/280/Image/Jpeg/noFilter',
    themeColor: '#a855f7',
  },
  rivals: {
    title: 'Rivals — Silv Market',
    description: 'Buy Rivals bundles, skin cases & season passes at the best prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-95e911d989ab6695547496e422901164/500/280/Image/Jpeg/noFilter',
    themeColor: '#f87171',
  },
  gpo: {
    title: 'Grand Piece Online — Silv Market',
    description: 'Buy Grand Piece Online fruits, swords, bundles & currency. Best prices on all GPO items. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-5dfa86c9bab8fb4f1641f42ce7b55c17/500/280/Image/Jpeg/noFilter',
    themeColor: '#38bdf8',
  },
  sp: {
    title: 'Sailor Piece — Silv Market',
    description: 'Buy Sailor Piece fruits, swords, bundles, keys & currency. Best prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-e9318db1d02c8414ff1b9773cdce9b82/500/280/Image/Jpeg/noFilter',
    themeColor: '#60a5fa',
  },
  bb: {
    title: 'Blade Ball — Silv Market',
    description: 'Buy Blade Ball tokens, items & cosmetics. Cheapest Blade Ball prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-e596ebf44a1b6bf3e8d1c5771bcfa75b/500/280/Image/Jpeg/noFilter',
    themeColor: '#f59e0b',
  },
  av: {
    title: 'Anime Vanguards — Silv Market',
    description: 'Buy Anime Vanguards units, gems & currency. Best prices on all AV items. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-a431b823ab2064797935d736e92eff6e/500/280/Image/Jpeg/noFilter',
    themeColor: '#818cf8',
  },
  bl: {
    title: 'Bloodlines — Silv Market',
    description: 'Buy Bloodlines eyes, races, spins & currency. Best prices on all Bloodlines items. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-3279db75df02809097530f4f5ea2c116/500/280/Image/Jpeg/noFilter',
    themeColor: '#fb7185',
  },
  nights: {
    title: '99 Nights — Silv Market',
    description: 'Buy 99 Nights items, gems & currency at the best prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-c366802209f06d9e481d4b4849090a83/500/280/Image/Jpeg/noFilter',
    themeColor: '#7c3aed',
  },
  tsunami: {
    title: 'Escape Tsunami — Silv Market',
    description: 'Buy Escape Tsunami items at the best prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-6bf2e48fbc5a1a283e1d6c78991071a3/500/280/Image/Jpeg/noFilter',
    themeColor: '#0ea5e9',
  },
  fisch: {
    title: 'Fisch — Silv Market',
    description: 'Buy Fisch rods, items & currency. Best prices on all Fisch items. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-7be8adea549d39261c3244e497428dfb/500/280/Image/Jpeg/noFilter',
    themeColor: '#34d399',
  },
  bss: {
    title: 'Bee Swarm Simulator — Silv Market',
    description: 'Buy Bee Swarm Simulator items, tickets & currency at the best prices. Instant delivery.',
    image: 'https://tr.rbxcdn.com/180DAY-bd8954a21f77ce1c1689abfce713d358/500/280/Image/Jpeg/noFilter',
    themeColor: '#fbbf24',
  },
  robux: {
    title: 'Buy Cheap Robux — Silv Market',
    description: 'Buy Robux at the cheapest prices. Fast, safe & trusted. Instant delivery.',
    image: 'https://silvmarket.shop/images/logo.png',
    themeColor: '#00b06f',
  },
};

// Slug aliases that 301-redirect to canonical route
const SLUG_MAP = {
  'blox-fruits':    'bf',
  'murder-mystery': 'mm2',
  'adopt-me':       'am',
  'grow-a-garden':  'gag',
  'sailor-piece':   'sp',
  'grand-piece':    'gpo',
  'blade-ball':     'bb',
  'anime-vanguards':'av',
  'bee-swarm':      'bss',
};

function esc(str) {
  return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Only intercept GET requests without file extensions
  if (request.method !== 'GET') return next();
  if (/\.[a-z0-9]{1,5}$/i.test(url.pathname)) return next();

  const rawPath = url.pathname.replace(/^\/+|\/+$/g, '');

  // 301 redirect slug aliases to canonical route
  if (SLUG_MAP[rawPath]) {
    return Response.redirect(new URL('/' + SLUG_MAP[rawPath], url), 301);
  }

  const game = GAMES[rawPath];
  if (!game) return next();

  // Fetch index.html from Cloudflare Pages static assets
  let html;
  try {
    const assetReq = new Request(new URL('/index.html', url), { headers: request.headers });
    const assetRes = await env.ASSETS.fetch(assetReq);
    if (!assetRes.ok) return next();
    html = await assetRes.text();
  } catch {
    return next();
  }

  // Inject window.__SILVGAME so client JS scrolls to the right section
  const gameScript = `<script>window.__SILVGAME='${rawPath}';</script>`;

  // Swap meta tags
  html = html
    .replace(/<title>[^<]*<\/title>/,
      `<title>${esc(game.title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/,
      `<meta name="description" content="${esc(game.description)}"/>`)
    .replace(/<meta property="og:title"[^>]*\/>/,
      `<meta property="og:title" content="${esc(game.title)}"/>`)
    .replace(/<meta property="og:description"[^>]*\/>/,
      `<meta property="og:description" content="${esc(game.description)}"/>`)
    .replace(/<meta property="og:image"[^>]*\/>/,
      `<meta property="og:image" content="${game.image}"/>`)
    .replace(/<meta property="og:image:width"[^>]*\/>/,
      `<meta property="og:image:width" content="500"/>`)
    .replace(/<meta property="og:image:height"[^>]*\/>/,
      `<meta property="og:image:height" content="280"/>`)
    .replace(/<meta property="og:url"[^>]*\/>/,
      `<meta property="og:url" content="${esc(url.href)}"/>`)
    .replace(/<meta name="twitter:title"[^>]*\/>/,
      `<meta name="twitter:title" content="${esc(game.title)}"/>`)
    .replace(/<meta name="twitter:description"[^>]*\/>/,
      `<meta name="twitter:description" content="${esc(game.description)}"/>`)
    .replace(/<meta name="twitter:image"[^>]*\/>/,
      `<meta name="twitter:image" content="${game.image}"/>`)
    .replace(/<meta name="theme-color"[^>]*>/,
      `<meta name="theme-color" content="${game.themeColor}">`)
    .replace('</head>', `${gameScript}\n</head>`);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

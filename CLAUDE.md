# Silv Market — Project Context for Claude

## Project Overview
Silv Market is a premium Roblox items shop. Static site hosted on **GitHub Pages**.

## Repositories
- **Website:** github.com/silentslnt/silvmarket → deploys to silvmarket.shop (GitHub Pages)
- **Bot:** github.com/silentslnt/silvreview → runs on Railway (silvreview-production.up.railway.app)

## Tech Stack
- **Frontend:** Pure HTML/CSS/JS — single file `index.html` (no frameworks)
- **Bot/Backend:** Node.js + Discord.js on Railway
- **Payments:** Stripe (card), Crypto (CoinGecko rates)
- **Email:** Resend API (password reset, transactional)
- **Domain:** silvmarket.shop

## Hosting Notes (IMPORTANT)
- Hosted on **GitHub Pages**, NOT Netlify
- `_redirects` files do NOT work — use `404.html` for URL routing
- `404.html` catches unknown paths (e.g. `/rivals`) and redirects to `/?game=<id>`
- GitHub Pages CDN (Varnish) has ~10 min cache TTL — changes take up to 10 min to propagate
- Clean URLs like `/account`, `/loyalty` work because `account.html` / `loyalty.html` exist

## Key Constants (Easy Edit Zone — top of index.html script)
```js
const SITE_LOGO_URL       = 'https://silvmarket.shop/images/logo.png'
const SITE_FAVICON        = 'https://silvmarket.shop/images/logo.png'
const SITE_NAME           = 'SILV MARKET'
const DISCORD_INVITE      = 'https://discord.gg/brianrots'
const DISCORD_AUTH_URL = 'https://silvreview-production.up.railway.app/auth/discord'
const BOT_WEBHOOK_URL     = 'https://silvreview-production.up.railway.app/order'
const BOT_WEBHOOK_SECRET  = 'sltnslntslnt'
const CRYPTO_WALLETS      = { BTC, ETH, SOL, USDT, LTC }
const PAY_LINKS           = { dc: Stripe link, cr: '#crypto' }
const PROMOS              = {}  // empty — codes verified server-side via POST /verify-promo
```

## Railway Environment Variables (silvreview bot)
```
BOT_TOKEN
GUILD_ID
RECEIPT_CHANNEL_ID
ORDER_LOGS_CHANNEL_ID
PENDING_CHANNEL_ID
ACCOUNT_LOGS_CHANNEL_ID
TICKET_CATEGORY_ID
STAFF_ROLE_ID
WEBHOOK_SECRET=sltnslntslnt
PORT=3000
GITHUB_TOKEN
GITHUB_OWNER=silentslnt
GITHUB_REPO=silvmarket
GITHUB_BRANCH=main
GITHUB_FILE=index.html
STRIPE_SECRET_KEY
DISCORD_CLIENT_SECRET
RESEND_API_KEY
```

## Item Data Structure
Items live as JS arrays in index.html:
- `FRUITS` — Blox Fruits (norm/perm pricing, type, rar, cat)
- `FRUIT_SKINS`, `BF_GP` — BF skins and gamepasses
- `GAG` — Grow a Garden (cat: seeds/pets/tools/tokens)
- `AM` — Adopt Me (sub: neon/mega/legendary)
- `MM2` — Murder Mystery 2 (sub: godly/chroma/bundle)
- `BRAINROT` — Steal a Brainrot
- `RIVALS`, `NIGHTS`, `TSUNAMI`
- `GPO` — Grand Piece Online (sub: fruits/swords/bundles/currency)
- `SP` — Sailor Piece (sub: fruits/swords/bundles/currency/keys/rerolls)
- `BB` — Blade Ball, `AV` — Anime Vanguards, `BL` — Bloodlines
- `FISCH`, `BSS`, `VBL`, `DTH` — Fisch, Bee Swarm Simulator, Volleyball Legends, Death Ball
- `PS99` — Pet Simulator 99 (sub: gems/huge/titanic/rainbow/eggs/other)
- `BESTSELLERS` — hardcoded featured items

## PS99 Specifics
- Game key: `ps99`, CSS class: `g-ps99` (color: `#06b6d4` cyan)
- Images: `https://silvmarket.shop/images/PetSim99%20logo.webp` (icon, used for all non-gem items), `https://silvmarket.shop/images/ps99gems.webp` (gems)
- JS constants: `_ps99Icon`, `_ps99Gems` defined just before `_dcBoostImg`
- Subcategories: gems / huge / titanic / rainbow / eggs / other
- Gem bulk discount rule: per-gem rate must decrease as quantity increases (1B rate > 5B rate > 10B rate > 20B rate)
- Current gem prices: 100M=$0.55, 500M=$0.65, 1B=$1.19, 5B=$5.49, 10B=$9.99, 20B=$17.99
- 404.html routes: `/ps99`, `/pet-simulator`, `/petsim99` → `/?game=ps99`

## Bot Files (silvreview repo)
- `bot.js` — main bot + Express webhook server
- `shop-editor.js` — Discord shop editor (edits index.html via GitHub API)
- `orders.json` — order storage + ticket counter (__ticketCounter key)
- `accounts.json` — account storage { nextId, accounts:{} }
- `promos.json` — promo codes storage (managed via !addpromo / !removepromo)

## Bot Endpoints
- `POST /order` — new order webhook (secret: sltnslntslnt)
- `POST /create-checkout` — Stripe checkout session (builds line_items from cart array)
- `POST /account` — new account signup log
- `POST /account/order` — update account order history
- `GET /verify/:key` — verify claim key
- `GET /shop-data` — live shop data
- `POST /forgot-password` — send reset code via Resend (rate limited: 5/min per IP)
- `POST /verify-reset-code` — validate reset code
- `POST /reset-password` — complete password reset
- `POST /verify-promo` — verify single promo code (requires webhook secret, never exposes full list)
- `GET /promos` — list all promos (requires webhook secret — internal/admin only)
- `POST /login` — cross-device login (rate limited: 15/min per IP)
- `GET /auth/discord` — start Discord OAuth (redirects to Discord consent, pass ?email= to link account)
- `GET /auth/discord/callback` — Discord OAuth callback (exchanges code, guilds.join, links account, redirects to auth-callback.html)
- `POST /create-ticket` — manually create ticket for an order (admin only)

## Bot Security
- In-memory rate limiter on `/order` (20/min), `/login` (15/min), `/forgot-password` (5/min), `/verify-promo` (30/min)
- All sensitive endpoints require `x-silv-secret` header
- Promo codes never exposed client-side — verified via `/verify-promo` endpoint

## Bot Commands (admin only — requires ManageGuild)
### Orders
- `!orders` — list recent orders
- `!deliver <ORDER_ID>` — mark delivered
- `!confirm <ORDER_ID>` — approve pending payment
- `!deny <ORDER_ID>` — reject pending payment
- `!testorder` — test full order flow
- `!fake on/off/now` — toggle fake receipt mode

### Shop Editor
- `!shop` — show editor panel
- `!listitems <game>` — list items (game keys: bf/gag/am/mm2/brainrot/rivals/nights/tsunami/gpo/sp/bb/av/bl + any added via !addgame)
- `!additem <game> "<name>" <price> <stock> <emoji> <badge>`
- `!edititem <game> "<name>"` — guided edit session
- `!removeitem "<name>"`
- `!setprice "<name>" <price>`
- `!setstock "<name>" <qty>`

### Game Sections (dynamic)
- `!addgame <key> "<name>" <emoji> <color>` — creates full game section in index.html and registers key in shop-editor.js
- `!addsubcat <game> <subcat> "<emoji> Label"` — adds a subcategory filter to a game section
- Bot self-updates shop-editor.js on GitHub so new keys persist on redeploy
- `!addsubcat` works on games created via `!addgame` and on gpo/sp; not on rivals/nights/tsunami

### Images
- `!addimage "<name>"` — upload image → saves to GitHub images/ folder permanently
- `!editimage "<name>"` — replace existing image
- `!viewimage "<name>"` — view current image embed
- `!removeimage "<name>"` — remove image from item
- `!images <game>` — show image status for all items in game

### Promos
- `!addpromo CODE 20` — add promo code (stored in promos.json on Railway)
- `!removepromo CODE`
- `!listpromos`

### Accounts
- `!account <email or #id>` — look up account
- `!accounts` — list last 10 accounts

## Ticket Format
- Channel name: `🛒・order-N` (N = auto-incrementing from 1)
- Stored in orders.json under `__ticketCounter`
- Claim key shown in DMs only — never in ticket channel

## Website Features
- Item detail modal (click any item)
- View All overlay per category with filters + sort
- Global search bar (indexes all items across all games via `buildSearchIndex()` / `ALL_PRODUCTS`)
- Per-section instant search bar in every game section (filters live as you type)
- Game section URLs: silvmarket.shop/rivals, /mm2, /gag, /ps99, etc. (via 404.html redirect)
- Login/Signup system (localStorage + cross-device via bot)
- Account page (/account) — orders, settings, security/2FA, change password, My Favourites
- Loyalty rewards page (/loyalty) — 6 tiers (Awakened→Celestial), 10pts per $1 spent
- Forgot password (Resend email with 6-digit code)
- Discord OAuth (server-side via bot — guilds.join + identify, replaces Vaultcord)
- Cart + checkout (Stripe / Crypto)
- Promo codes (server-side verified)
- Fake receipt mode for testing
- Language/currency selector (17 currencies, globe button in nav): USD, EUR, GBP, CAD, AUD, BRL, MXN, INR, PHP, KRW, JPY, TRY, PLN, SEK, AED, SGD, CHF
- Favourites system (heart button on cards, saved to silv_favs localStorage)
- Dev mode (bypass payment for test orders — account setting)
- Clicking a favourited item navigates to /?open=<name> which pops the item detail modal
- Section background wallpaper: `#sectionBg` div fades in Roblox CDN game art when entering a game section (`setSectionBg(key)`, `_secBgMap` maps keys to image URLs, cross-fades on section switch)

## URL Routing (GitHub Pages)
- `/account` → `account.html` (file exists)
- `/loyalty` → `loyalty.html` (file exists)
- `/rivals`, `/mm2`, `/gag`, `/bf`, etc. → `404.html` → JS redirects to `/?game=<id>`
- `/?game=<id>` → `index.html` reads param, smooth-scrolls to that section
- `/?open=<name>` → `index.html` reads param, opens item detail modal
- Do NOT use `_redirects` — this is GitHub Pages, not Netlify

## Design
- Dark void black background (#07031a)
- Neon pink/purple accent (#ff10f0, #9333ea)
- Fonts: Orbitron (headers), Rajdhani (body), Inter (misc)
- All CSS inline in index.html — no external stylesheet

## Adding a New Game — Required Checklist
When adding a new game section, ALL of the following must be done or the game will be broken:
1. `const GAMENAME = [...]` data array in index.html (with `sub`, `rar`, `bg`, `img` fields)
2. Section HTML: `<section class="S" id="key">` with jump-row filter buttons, sec-ctrl-row, and `<div class="h-scroll" id="keyGrid">`
3. `filterKEY(btn,sub)` function
4. `init()`: add `document.getElementById('keyGrid').innerHTML=GAMENAME.map(i=>mkCard(i,'key','g-key')).join('');tagOrder('keyGrid');`
5. `ALL_SECTION_IDS`: add `'key'`
6. `GAME_SUBS`: add `key: [{label,fn,val}...]`
7. `VIEW_ALL_CONFIG`: add `key: {title, img, items:()=>GAMENAME, filters:[...]}`
8. `HM_GAMES`: add `{key, name, em, img}` entry
9. `#gsDrop` HTML: add `.gd-item` with `data-key="key"` and `onclick="selectGame(this,'Name','em','key')"`
10. `gameLbl` map in `mkCard`: add `key:'Display Name'`
11. `buildSearchIndex()`: add `push(GAMENAME, 'Display Name')`
12. `_bsFullConfig`: add entry if items have `badge:'hot'/'best'/'myth'`
13. `404.html` GAME_MAP: add `'key':'key'` and slug aliases
14. `shop-editor.js`: add to `GAME_NAMES`, `GAME_ARRAY`, and `ITEM_FACTORY`
15. CSS: add `.g-key{color:#hexcolor}` to the game badge color block

## Important Notes
- index.html is ~8000+ lines — always validate JS before saving
- BOT_WEBHOOK_SECRET = sltnslntslnt (hardcoded in index.html Easy Edit Zone)
- Images stored at silvmarket.shop/images/ (GitHub repo images/ folder)
- OG embed uses logo.png as right-side thumbnail (256x256, twitter:card=summary)
- accounts.json and orders.json auto-created by bot on first use
- Password reset codes stored in memory (RESET_CODES object) — cleared on redeploy
- Passwords hashed with PBKDF2 (60k iterations, email salt) client-side before sending to bot
- Loyalty points stored in localStorage as silv_tokens_<email>
- Favourites stored in localStorage as silv_favs (array of item name strings)
- "All Games" endless scroll mode has been removed — never re-add it; `selectGame()` and `goToGame()` always show only the target section
- KRW and JPY use no-decimal price formatting in `fmtPrice()`

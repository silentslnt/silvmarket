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
const VAULTCORD_CLIENT_ID = '1481122330041258141'
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
- `BESTSELLERS` — hardcoded featured items

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
- Global search bar (indexes all items across all games)
- Per-section instant search bar in every game section (filters live as you type)
- Game section URLs: silvmarket.shop/rivals, /mm2, /gag, etc. (via 404.html redirect)
- Login/Signup system (localStorage + cross-device via bot)
- Account page (/account) — orders, settings, security/2FA, change password, My Favourites
- Loyalty rewards page (/loyalty) — 6 tiers (Awakened→Celestial), 10pts per $1 spent
- Forgot password (Resend email with 6-digit code)
- Discord OAuth via Vaultcord
- Cart + checkout (Stripe / Crypto)
- Promo codes (server-side verified)
- Fake receipt mode for testing
- Language/currency selector (11 currencies, globe button in nav)
- Favourites system (heart button on cards, saved to silv_favs localStorage)
- Dev mode (bypass payment for test orders — account setting)
- Clicking a favourited item navigates to /?open=<name> which pops the item detail modal

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

## Important Notes
- index.html is ~7000+ lines — always validate JS before saving
- BOT_WEBHOOK_SECRET = sltnslntslnt (hardcoded in index.html Easy Edit Zone)
- Images stored at silvmarket.shop/images/ (GitHub repo images/ folder)
- OG embed uses logo.png as right-side thumbnail (256x256, twitter:card=summary)
- accounts.json and orders.json auto-created by bot on first use
- Password reset codes stored in memory (RESET_CODES object) — cleared on redeploy
- Passwords hashed with PBKDF2 (60k iterations, email salt) client-side before sending to bot
- Loyalty points stored in localStorage as silv_tokens_<email>
- Favourites stored in localStorage as silv_favs (array of item name strings)

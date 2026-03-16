# Silv Market — Project Context for Claude

## Project Overview
Silv Market is a premium Roblox items shop. Static site hosted on GitHub Pages / Netlify.

## Repositories
- **Website:** github.com/silentslnt/silvmarket → deploys to silvmarket.shop (Netlify)
- **Bot:** github.com/silentslnt/silvreview → runs on Railway (silvreview-production.up.railway.app)

## Tech Stack
- **Frontend:** Pure HTML/CSS/JS — single file `index.html` (no frameworks)
- **Bot/Backend:** Node.js + Discord.js on Railway
- **Payments:** Stripe (card), Crypto (CoinGecko rates)
- **Email:** Resend API (password reset, transactional)
- **Domain:** silvmarket.shop (bought via Netlify)

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
const PROMOS              = { SILV20:20, BRAINROT20:20, DISCORD10:10, GAG15:15, MM2SAVE:15 }
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
- `BESTSELLERS` — hardcoded featured items

## Bot Files (silvreview repo)
- `bot.js` — main bot + Express webhook server
- `shop-editor.js` — Discord shop editor (edits index.html via GitHub API)
- `orders.json` — order storage + ticket counter (__ticketCounter key)
- `accounts.json` — account storage { nextId, accounts:{} }

## Bot Endpoints
- `POST /order` — new order webhook (secret: sltnslntslnt)
- `POST /create-checkout` — Stripe checkout session
- `POST /account` — new account signup log
- `POST /account/order` — update account order history
- `GET /verify/:key` — verify claim key
- `GET /shop-data` — live shop data
- `POST /forgot-password` — send reset code via Resend
- `POST /verify-reset-code` — validate reset code
- `POST /reset-password` — complete password reset

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
- `!listitems <game>` — list items (game keys: bf/gag/am/mm2/brainrot/rivals/nights/tsunami)
- `!additem <game> "<name>" <price> <stock> <emoji> <badge>`
- `!edititem <game> "<name>"` — guided edit session
- `!removeitem "<name>"`
- `!setprice "<name>" <price>`
- `!setstock "<name>" <qty>`

### Images
- `!addimage "<name>"` — upload image → saves to GitHub images/ folder permanently
- `!editimage "<name>"` — replace existing image
- `!viewimage "<name>"` — view current image embed
- `!removeimage "<name>"` — remove image from item
- `!images <game>` — show image status for all items in game

### Promos
- `!addpromo CODE 20` — add promo code
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
- Search bar (indexes all items)
- Login/Signup system (localStorage)
- Account panel (orders, settings, security/2FA, change password)
- Forgot password (Resend email with 6-digit code)
- Discord OAuth via Vaultcord
- Cart + checkout (Stripe / Crypto)
- Promo codes with % discount
- Fake receipt mode for testing

## Design
- Dark void black background (#07031a)
- Neon pink/purple accent (#ff10f0, #9333ea)
- Fonts: Orbitron (headers), Rajdhani (body), Inter (misc)
- All CSS inline in index.html — no external stylesheet

## Important Notes
- index.html is ~3700 lines — always validate JS with node --check before saving
- BOT_WEBHOOK_SECRET = sltnslntslnt (hardcoded in index.html Easy Edit Zone)
- Images stored at silvmarket.shop/images/ (GitHub repo images/ folder)
- OG embed uses logo.png as right-side thumbnail (256x256, twitter:card=summary)
- accounts.json and orders.json auto-created by bot on first use
- Password reset codes stored in memory (RESET_CODES object) — cleared on redeploy

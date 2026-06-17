# AI Operating Platform Deck

Interactive external-facing deck for the PRM Billing AI Operating Platform.

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

Optional UI login (when `APP_PASSWORD` is set):

```bash
APP_USERNAME=prm APP_PASSWORD=PrmAIBrain2026! npm start
```

Open `http://localhost:3000` — you'll be redirected to the sign-in page.

## Railway deployment

This app is Railway-ready:

- `package.json` defines `npm start`.
- `server.js` serves the static deck and uses Railway's `PORT` environment variable.
- `railway.json` tells Railway to use Nixpacks and run `npm start`.

### Required environment variables (Railway)

| Variable | Value |
|----------|-------|
| `APP_USERNAME` | `prm` |
| `APP_PASSWORD` | `PrmAIBrain2026!` |

When `APP_PASSWORD` is set, visitors are redirected to a **sign-in page** (`/login.html`) before the deck loads. Sessions last 24 hours via secure cookie.

Optional: set `SESSION_SECRET` for cookie signing (defaults to `APP_PASSWORD`).

### Search engine blocking

- `robots.txt` disallows all crawlers (`Disallow: /`).
- HTML pages include `noindex, nofollow, noarchive` meta tags.
- Responses include `X-Robots-Tag: noindex, nofollow, noarchive`.

## Access credentials (share with invited viewers only)

| Field | Value |
|-------|-------|
| URL | https://aibrain-production.up.railway.app/ |
| Username | `prm` |
| Password | `PrmAIBrain2026!` |

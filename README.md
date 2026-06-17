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

### Environment variables (Railway)

Auth is **on by default on Railway**. Set any one password variable (they are equivalent):

| Variable | Recommended value |
|----------|-------------------|
| `APP_USERNAME` or `DECK_USERNAME` | `prm` |
| `APP_PASSWORD` or `DECK_PASSWORD` or `SITE_PASSWORD` | `PrmAIBrain2026!` |

If none are set on Railway, the documented default password above is used automatically.

To disable auth locally only: `AUTH_DISABLED=true npm start`

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

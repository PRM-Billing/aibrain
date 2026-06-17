# AI Operating Platform Deck

Interactive external-facing deck for the PRM Billing AI Operating Platform.

## Run locally

```bash
AUTH_DISABLED=true npm start
```

Then open `http://localhost:3000` (no login when auth disabled).

To test the sign-in flow locally:

```bash
APP_USERNAME=prm APP_PASSWORD=PrmAIBrain2026! npm start
```

## Railway deployment

This app is Railway-ready:

- `package.json` defines `npm start`.
- `server.js` serves the static deck and uses Railway's `PORT` environment variable.
- `railway.json` tells Railway to use Nixpacks and run `npm start`.

Auth is **on by default**. Override with env vars or disable locally with `AUTH_DISABLED=true`.

| Variable | Default |
|----------|---------|
| `APP_USERNAME` / `DECK_USERNAME` | `prm` |
| `APP_PASSWORD` / `DECK_PASSWORD` / `SITE_PASSWORD` | `PrmAIBrain2026!` |
| `AUTH_DISABLED` | unset (auth on) |

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

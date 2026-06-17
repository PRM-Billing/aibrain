# Aura Video Deck

Cinematic, autoplaying sales presentation for **Aura by PRM** — the intelligent meeting agent and organizational AI platform. Built with React, Vite, TypeScript, and GSAP.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (Vite dev server).

## Production build

```bash
npm install
npm run build
npm start
```

The Express server serves the built app from `dist/` and gates access behind session login.

## Run locally (no login)

```bash
AUTH_DISABLED=true npm start
```

Then open `http://localhost:3000`.

To test the sign-in flow locally:

```bash
APP_USERNAME=prm APP_PASSWORD=PrmAIBrain2026! npm start
```

## Railway deployment

This app is Railway-ready:

- `npm run build` produces `dist/` via Vite.
- `npm start` runs `server.js`, which serves `dist/` and uses Railway's `PORT`.
- `railway.json` runs `npm install && npm run build` then `npm start`.

Auth is **on by default**. Override with env vars or disable locally with `AUTH_DISABLED=true`.

| Variable | Default |
|----------|---------|
| `APP_USERNAME` / `DECK_USERNAME` | `prm` |
| `APP_PASSWORD` / `DECK_PASSWORD` / `SITE_PASSWORD` | `PrmAIBrain2026!` |
| `AUTH_DISABLED` | unset (auth on) |

### Search engine blocking

- `public/robots.txt` disallows all crawlers (`Disallow: /`).
- HTML pages include `noindex, nofollow, noarchive` meta tags.
- Responses include `X-Robots-Tag: noindex, nofollow, noarchive`.

## Voiceover (future)

Each scene has a duration and narration script in `src/narration/narration.ts`. Drop MP3 files at `public/audio/{scene-id}.mp3` to drive scene advance from audio instead of the timer.

## Access credentials (share with invited viewers only)

| Field | Value |
|-------|-------|
| URL | https://aibrain-production.up.railway.app/ |
| Username | `prm` |
| Password | `PrmAIBrain2026!` |

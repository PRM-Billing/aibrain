# AI Operating Platform Deck

Interactive external-facing deck for the PRM Billing AI Operating Platform.

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

## Railway deployment

This app is Railway-ready:

- `package.json` defines `npm start`.
- `server.js` serves the static deck and uses Railway's `PORT` environment variable.
- `railway.json` tells Railway to use Nixpacks and run `npm start`.

No secrets or environment variables are required.

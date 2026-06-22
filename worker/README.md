# portfolio-chat (Cloudflare Worker)

Holds the Gemini API key as a **secret** and proxies chat requests from the
portfolio frontend to the Gemini REST API. The key never reaches the browser.

## Deploy (one-time)

1. Install dependencies:
   ```bash
   cd worker
   npm install
   ```
2. Log in to Cloudflare:
   ```bash
   npx wrangler login
   ```
3. Set the API key as a secret (you'll be prompted to paste it — never commit it):
   ```bash
   npm run secret
   # or: npx wrangler secret put GEMINI_API_KEY
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
   Note the deployed URL, e.g. `https://portfolio-chat.<your-subdomain>.workers.dev`.

5. Put that URL into the frontend:
   - Either edit `DEFAULT_WORKER_URL` in `src/lib/geminiClient.ts`, or
   - Set `VITE_CHAT_WORKER_URL` when building: `VITE_CHAT_WORKER_URL=https://portfolio-chat.<your-subdomain>.workers.dev/chat npm run build`

## Local dev

```bash
cd worker
npm install
npm run dev   # starts wrangler dev at http://localhost:8787
```

Then run the portfolio with the override:
```bash
VITE_CHAT_WORKER_URL=http://localhost:8787/chat npm run dev
```

For local `wrangler dev`, set the key in `.dev.vars` (gitignored — create it yourself):
```
GEMINI_API_KEY=your-key-here
```

## Allowed origins

Edit `ALLOWED_ORIGINS` in `wrangler.toml` (comma-separated). Already configured
for `http://localhost:5173` and `https://excellent-torch.github.io`.

## Model

`gemini-2.5-flash-lite` (free tier, smallest Flash). Change `GEMINI_MODEL` in
`src/index.ts` if needed.

## Rate limit

~10 requests/min per IP via the Workers Cache API.

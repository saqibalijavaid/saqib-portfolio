# vistalabs-website

Official corporate website for VistaLabs.

## Development

```bash
npm install
npm run dev          # Vite dev server (frontend only)
```

The contact form posts to `/api/contact`, a Vercel serverless function. To exercise that endpoint locally you need the Vercel CLI:

```bash
npm i -g vercel      # one-time
vercel dev           # serves the SPA + the api/ routes together
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Var                   | Where used                | Notes                                                        |
| --------------------- | ------------------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`      | `api/contact.ts` (server) | Get one at <https://resend.com/api-keys>.                    |
| `CONTACT_TO_EMAIL`    | `api/contact.ts` (server) | Inbox that receives form submissions.                        |
| `CONTACT_FROM_EMAIL` | `api/contact.ts` (server) | Verified sender on a domain you've added to Resend.          |

For production, set the same vars in the Vercel dashboard (Production + Preview).

## Build

```bash
npm run build
npm run lint
```

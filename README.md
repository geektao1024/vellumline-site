# Vellum & Line SEO Site

Vellum & Line is a marketing and SEO site for a browser-based custom map poster studio.

The site is responsible for:

- the public homepage;
- Terraink alternative and comparison landing pages;
- product notes, update logs, and simple example pages;
- routing visitors into the map poster studio at `/app`.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Studio Integration

The embedded studio is built from `studio/` and synced into `public/app`.

```bash
pnpm app:integrate
```

The root site should stay indexable. The `/app` studio is kept as the conversion tool and currently uses `noindex, follow`.

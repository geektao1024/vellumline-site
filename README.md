# Vellum & Line - Custom Map Poster Maker

Vellum & Line is a browser-based custom map poster maker for creating printable
city map posters, route posters, wedding map posters, travel memories, and
personalized map art from real places, addresses, coordinates, and routes.

The public site lives at [vellumline.app](https://vellumline.app) and routes
visitors into the poster studio at [vellumline.app/app](https://vellumline.app/app).

## What This Repository Contains

This repository powers the marketing, SEO, and embedded studio experience for
Vellum & Line:

- a brand-led homepage for Vellum & Line;
- dedicated landing pages for map poster maker, city map poster maker, route
  poster maker, and wedding map poster search intent;
- Terraink alternative, Terraink app, Terraink review, and Terraink comparison
  pages for users researching map poster tools;
- product notes, update logs, legal pages, robots rules, and sitemap generation;
- the browser poster studio built from `studio/` and synced into `public/app`.

Vellum & Line is independent and is not affiliated with Terraink or TerraInk.
Terraink-related pages are comparison and alternative pages for searchers who
want a practical map poster workflow.

## Live SEO Pages

| Page                                                                         | Search intent                                   |
| ---------------------------------------------------------------------------- | ----------------------------------------------- |
| [`/`](https://vellumline.app/)                                               | Vellum & Line brand and custom map poster maker |
| [`/app`](https://vellumline.app/app)                                         | Browser-based map poster studio                 |
| [`/map-poster-maker`](https://vellumline.app/map-poster-maker)               | Online map poster maker                         |
| [`/city-map-poster-maker`](https://vellumline.app/city-map-poster-maker)     | City and hometown map posters                   |
| [`/route-poster-maker`](https://vellumline.app/route-poster-maker)           | Running, cycling, travel, and route posters     |
| [`/wedding-map-poster`](https://vellumline.app/wedding-map-poster)           | Wedding venue and anniversary map posters       |
| [`/terraink-alternative`](https://vellumline.app/terraink-alternative)       | Terraink alternative intent                     |
| [`/terraink-vs-vellum-line`](https://vellumline.app/terraink-vs-vellum-line) | Terraink vs Vellum & Line comparison            |

The indexable page inventory is maintained in
[`src/config/seo/pages.ts`](src/config/seo/pages.ts). Sitemap output includes
the public SEO pages plus the studio entry at `/app`.

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

The root site and `/app` studio should remain indexable. The studio is the
conversion surface for map poster visitors and is included in the root sitemap.

## Deployment

The site is built with Next.js and deployed to Cloudflare through OpenNext.

```bash
pnpm build
pnpm cf:deploy
```

Before publishing SEO changes, verify:

- homepage metadata and visible H1 copy still lead with Vellum & Line;
- competitor terms such as Terraink stay secondary and comparison-focused;
- `/robots.txt` points to `https://vellumline.app/sitemap.xml`;
- `/sitemap.xml` includes the intended public pages and `/app`;
- `/app/robots.txt` and `/app/sitemap.xml` redirect to the root SEO files.

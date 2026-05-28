# Vellum & Line

Vellum & Line is a browser-based MVP for creating printable map art from cities,
routes, addresses, and meaningful places.

This validation fork is based on the open-source Terraink project. It is not
affiliated with, endorsed by, or presented as the official Terraink service.

## What It Does

- Search for a city, address, or coordinate.
- Preview OpenStreetMap-based map art in the browser.
- Choose poster layouts, wallpaper sizes, themes, and typography.
- Add route and marker details.
- Export print-ready PNG, PDF, or SVG files.

## Local Development

```bash
bun install
bun run dev
```

The development server is served by Vite, usually at:

```text
http://localhost:5173/
```

## Build

```bash
bun run typecheck
bun run build
```

## Environment

Copy `.env.example` to `.env` when preparing a public preview:

```bash
cp .env.example .env
```

Important values for launch:

- `VITE_REPO_URL`
- `VITE_REPO_API_URL`
- `VITE_CONTACT_EMAIL`
- `VITE_PRIVACY_URL`
- `VITE_APP_CREDIT_URL`

## License And Attribution

This repository keeps the upstream license boundary intact:

- New Terraink code after April 3, 2026 is licensed under AGPL-3.0.
- Older code remains covered by the included `LICENSE-OLD`.
- Terraink trademark rights are separate from the open-source license.

See `LICENSE`, `LICENSE-OLD`, and `TRADEMARK.md` before deploying or
redistributing this fork.

Map data and rendering providers:

- OpenStreetMap contributors
- OpenMapTiles
- OpenFreeMap
- Nominatim
- MapLibre GL

## MVP Planning

The traffic-validation plan is documented in:

```text
docs/terraink-mvp-handoff.md
```

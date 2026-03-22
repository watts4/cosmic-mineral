# CosmicMineral

A daily planetary-mineral alignment report generator. Real-time astronomical data meets crystallographic science — enter your birth date and get a scientifically-flavored alignment score with your mineral affinity for the day.

## Features

- **Live astronomy engine** — computes real planetary positions for the current date
- **3D planet visualization** — animated globe rendered with CSS/SVG
- **Mineral alignment scoring** — matches planetary configurations to mineral properties
- **Alignment score ring** — animated score from 0–100 with color-coded status (nominal / elevated / critical)
- **Daily report** — regenerates each day based on actual ephemeris data

## Stack

- React + TypeScript (Vite)
- Custom astronomy computation library (`src/lib/astronomy`)
- Custom alignment/fortune generator (`src/lib/fortune`)
- Mineral data catalog (`src/data/minerals`)
- Deployed to Firebase / Netlify

## Run Locally

```bash
npm install
npm run dev
```

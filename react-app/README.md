# BetterSolano React

React + TypeScript migration of BetterSolano.org using Next.js 14.

## Getting Started

```bash
cd react-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
react-app/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── home/         # Homepage components
│   │   └── layout/       # Layout components (Header, Footer, etc.)
│   ├── data/             # Static data and translations
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # Global CSS
│   └── types/            # TypeScript type definitions
├── public/               # Static assets (copy from original assets/)
└── package.json
```

## Migration Notes

- Original CSS preserved in `globals.css`
- Translations migrated to TypeScript
- Services data imported from JSON
- Multi-language support via custom hook
- Leaflet maps use react-leaflet

## Before Production

1. Copy `assets/` folder to `public/assets/`
2. Copy `data/` JSON files to `src/data/`
3. Update API endpoints for weather/exchange rates
4. Configure environment variables

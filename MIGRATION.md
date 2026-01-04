# Migration Guide: Static HTML to React + TypeScript

This document provides guidance for contributors migrating from the static HTML version to the React + TypeScript version of BetterSolano.org.

## Overview

BetterSolano.org now has two versions:

| Version | Branch | Status | Technology |
|---------|--------|--------|------------|
| Static HTML | `main` | Stable (Legacy) | HTML5, CSS3, Vanilla JavaScript |
| React + TypeScript | `react-typescript` | Active Development | Next.js 14, React 18, TypeScript |

## Version Comparison

### Static HTML Version

**Location:** Root directory (`/`)

**Characteristics:**
- Pure HTML5 with semantic markup
- Vanilla CSS with custom properties
- Vanilla JavaScript (ES6+)
- No build step required for development
- Direct file serving

**Best for:**
- Simple content updates
- Quick fixes
- Contributors unfamiliar with React

### React + TypeScript Version

**Location:** `/react-app/` directory

**Characteristics:**
- Next.js 14 with App Router
- TypeScript for type safety
- React 18 with Server Components
- Component-based architecture
- Built-in routing and SSR

**Best for:**
- New feature development
- Complex UI interactions
- Long-term maintenance
- Scalable architecture

## Getting Started with React Version

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18 or higher |
| npm | v9 or higher |
| Git | Latest |

### Setup

```bash
# Clone the repository
git clone https://github.com/BetterSolano/bettersolano.git
cd bettersolano

# Switch to React branch
git checkout react-typescript

# Navigate to React app
cd react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

## Directory Structure Comparison

### Static HTML

```
bettersolano/
├── index.html
├── services/
├── government/
├── budget/
├── assets/
│   ├── css/
│   └── js/
└── data/
```

### React + TypeScript

```
bettersolano/
├── react-app/
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── data/          # Static data and translations
│   ├── public/
│   │   └── assets/        # Static assets (images, CSS)
│   └── package.json
└── ... (static HTML files)
```

## Component Mapping

This table shows which static HTML files correspond to which React components:

| Static HTML | React Component | Location |
|-------------|-----------------|----------|
| `index.html` | `page.tsx` | `src/app/page.tsx` |
| `services/index.html` | `page.tsx` | `src/app/services/page.tsx` |
| `government/index.html` | `page.tsx` | `src/app/government/page.tsx` |
| `budget/index.html` | `page.tsx` | `src/app/budget/page.tsx` |
| `statistics/index.html` | `page.tsx` | `src/app/statistics/page.tsx` |
| `contact/index.html` | `page.tsx` | `src/app/contact/page.tsx` |

## Key Differences

### Routing

**Static HTML:** File-based with `.html` extensions
```
/services/business.html
```

**React:** Next.js App Router (folder-based)
```
/services/business (maps to src/app/services/business/page.tsx)
```

### Styling

Both versions share the same CSS files from `public/assets/css/`. The React version imports these stylesheets in the root layout.

### State Management

**Static HTML:** DOM manipulation with vanilla JavaScript

**React:** React Context API for global state (e.g., `LanguageContext` for translations)

### Data Fetching

**Static HTML:** Inline data or fetch from JSON files

**React:** Server Components with direct data access or client-side hooks

## Contributing to React Version

### Code Style

| Guideline | Description |
|-----------|-------------|
| TypeScript | Use strict typing; avoid `any` |
| Components | Functional components with hooks |
| Naming | PascalCase for components, camelCase for functions |
| Files | One component per file; name matches component |
| Imports | Use absolute imports with `@/` prefix |

### Creating a New Page

1. Create a folder in `src/app/` matching the route
2. Add a `page.tsx` file with the page component
3. Export the component as default
4. Add any client interactivity with `'use client'` directive

Example:
```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <main>
      <h1>New Page</h1>
    </main>
  );
}
```

### Creating a Component

1. Add file to `src/components/`
2. Export as default or named export
3. Include TypeScript interface for props

Example:
```typescript
// src/components/ExampleCard.tsx
interface ExampleCardProps {
  title: string;
  description: string;
}

export default function ExampleCard({ title, description }: ExampleCardProps) {
  return (
    <div className="example-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

## Transition Timeline

| Phase | Timeframe | Action |
|-------|-----------|--------|
| Phase 1 | Current | Both versions maintained in parallel |
| Phase 2 | 3 months | React version becomes primary for new features |
| Phase 3 | 6 months | Evaluate community adoption |
| Phase 4 | TBD | Static HTML moved to `legacy` branch |

## Questions and Support

- Open an issue on GitHub with the `react` label
- Join our Discord community for real-time discussion
- Email: volunteer@bettersolano.org

---

Last updated: January 2026

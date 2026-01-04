# Announcement: React + TypeScript Version Available

## Summary

We are pleased to announce that a React + TypeScript version of BetterSolano.org is now available on the `react-typescript` branch. This modernized version offers improved developer experience, type safety, and component-based architecture while maintaining full feature parity with the static HTML version.

## Open Source Availability

This repository is open source under the **MIT License** and **CC BY 4.0** and is freely available for use, modification, redistribution, and publication by any individual or organization that wishes to implement it in their respective local government unit (LGU) across the Philippines.

We encourage other municipalities to adopt and customize this project in support of transparency, accessibility, modernization, and public service delivery to their communities.

## Background

BetterSolano.org was originally built with static HTML, CSS, and vanilla JavaScript to ensure maximum accessibility and simplicity. As the project has grown and more contributors have joined, we received feedback requesting modern tooling support.

The React + TypeScript version addresses these requests while preserving the static HTML version for contributors who prefer the original approach.

## What This Means for Contributors

### No Immediate Action Required

The static HTML version on the `main` branch remains fully supported. Contributors can continue working with the existing codebase without any changes.

### New Option Available

Contributors who prefer React and TypeScript may now work on the `react-typescript` branch. Both versions are maintained in parallel.

## Version Comparison

| Aspect | Static HTML (main) | React + TypeScript |
|--------|-------------------|-------------------|
| Technology | HTML5, CSS3, Vanilla JS | Next.js 14, React 18, TypeScript |
| Build Required | No | Yes (npm) |
| Type Safety | No | Yes |
| Component Reuse | Manual | Built-in |
| Learning Curve | Lower | Moderate |
| Status | Stable | Active Development |

## Getting Started with React Version

```bash
git checkout react-typescript
cd react-app
npm install
npm run dev
```

See [MIGRATION.md](../../MIGRATION.md) for detailed setup instructions and contribution guidelines.

## Timeline

| Phase | Timeframe | Description |
|-------|-----------|-------------|
| Current | Now | Parallel maintenance of both versions |
| Evaluation | 3-6 months | Assess community adoption and feedback |
| Decision | TBD | Determine long-term direction based on contributor preference |

## Providing Feedback

We welcome feedback on both versions. Please:

- Open an issue with the `react` label for React-specific feedback
- Join the discussion in our Discord community
- Email volunteer@bettersolano.org with questions

## Acknowledgments

Thank you to all contributors who have helped build BetterSolano.org. Your continued participation, regardless of which version you prefer, is valued and appreciated. Shout out to Gat. @jasontorres for the support!
---

Ramon Logan Jr.
BetterSolano.org 

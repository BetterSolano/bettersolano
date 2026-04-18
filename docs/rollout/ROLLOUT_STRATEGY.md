# ROLLOUT_STRATEGY.md

**Document Status:** Draft 1.0
**Target Audience:** Technical Leads, Frontend Developers, LGU Data Custodians
**Reference Implementation:** BetterSolano (GitHub)

## Executive Summary

This document serves as the authoritative "Source of Truth" for deploying the BetterLGU transparency platform. It outlines the mandatory design standards, data synchronization protocols, and architectural decisions required to scale the BetterSolano template to other Local Government Units (LGUs). All contributors must adhere to the "Kapwa" design values and the data normalization standards defined herein to ensure the platform remains accessible, maintainable, and civic-centric.

---

## 1. The "Kapwa" Design Compliance Checklist

Adherence to the [Kapwa Design Values](https://github.com/bettergovph/kapwa/wiki/Design-Values) is not optional; it is the fundamental requirement for this initiative. Our technology must serve the constituent, not the developer.

### 1.1 Implementation of Design Values

- **Value: Accessibility is Democracy**
  - **Requirement:** The platform must be accessible to constituents with older devices and limited digital literacy.
  - **Implementation:** All interactive elements must strictly follow semantic HTML. Use `<button>` for actions and `<a>` for navigation. Do not use `<div>` or `<span>` as clickable elements without proper ARIA roles.
  - **Compliance Check:** All deployments must pass an automated Lighthouse audit with a score of 90+ on Accessibility.

- **Value: Ingenuity in Simplicity (Diskarte)**
  - **Requirement:** Avoid over-engineering. The solution must be deployable on free or low-cost infrastructure (e.g., GitHub Pages) to respect public funds.
  - **Implementation:** Prioritize static site generation (SSG) or client-side rendering with static JSON over complex server-side databases unless strictly necessary.

### 1.2 Low Bandwidth Optimization & WCAG 2.1 AA

Given the mobile data context in the Philippines (prepaid metering, fluctuating 3G/4G signals), the following technical constraints apply:

- **Asset Weight:** The initial page load (First Contentful Paint) must be under 300KB (gzipped).
- **Image Handling:**
  - All images must utilize `loading="lazy"`.
  - Images must be served in WebP format with high-compression settings.
  - Decorative images are strictly prohibited; visual assets must serve a communicative purpose.
- **Contrast & Readability:** Text contrast ratios must meet the WCAG 2.1 AA standard (minimum 4.5:1 for normal text).
- **Offline First:** Service Workers must be configured to cache "Core Modules" (Emergency Numbers, Service Directory) for offline access.

---

## 2. Data Ingestion & Synchronization Strategy

To maintain a standardized schema across different LGUs, developers must normalize raw data from official government sources into the application's local JSON stores (`/data/*.json`).

### 2.1 Data Mapping Protocol

Developers are responsible for ETL (Extract, Transform, Load) operations mapping external data fields to the BetterLGU internal schema.

| Data Domain         | Official Source (Primary)  | Secondary Verification    | Internal Target Schema          |
| :------------------ | :------------------------- | :------------------------ | :------------------------------ |
| **Demographics**    | **PSA** (psa.gov.ph)       | Local CBMS Data           | `data/demographics.json`        |
| **Fiscal Data**     | **BLGF** (blgf.gov.ph)     | LGU Accounting Office     | `data/fiscal_transparency.json` |
| **Competitiveness** | **CMCI** (cmci.dti.gov.ph) | DTI Provincial Office     | `data/indices.json`             |
| **Ordinances**      | **Sangguniang Bayan**      | Official SB Facebook Page | `data/legislative.json`         |
| **Services**        | **Citizen's Charter**      | Department Heads          | `data/services.json`            |

### 2.2 Integration Workflows

1.  **Open Data Aggregation:**
    - Scripts should query `data.gov.ph` APIs where available. If APIs are unavailable, CSV exports must be parsed and validated against the `BetterLGU` TypeScript interfaces before commitment to the repository.
2.  **Request-Based Ingestion:**
    - For data not publicly available, developers must utilize the **FOI Portal** (foi.gov.ph) to request datasets. Pending FOI requests should be tracked in the project issue tracker.
3.  **Search Indexing (Meilisearch):**
    - For enterprise-grade retrieval, the aggregated JSON files should be indexed into a self-hosted Meilisearch instance (optional for basic deployments, mandatory for provincial/city level).
    - **Index UID:** `lgu_services`, `lgu_officials`.
    - **Searchable Attributes:** `service_name`, `keywords`, `official_name`, `ordinance_title`.

---

## 3. Component Reusability & Architecture

This section defines the architectural modularity required to allow LGUs to select the stack that matches their technical capacity.

### 3.1 Stack Comparison Matrix

| Feature         | **BetterSolano A (Lightweight)** | **BetterSolano B (React/TS)**              |
| :-------------- | :------------------------------- | :----------------------------------------- |
| **Core Tech**   | Vanilla JS, Bootstrap 5, Leaflet | React, TypeScript, Tailwind                |
| **Data Store**  | Static JSON Fetching             | Typed JSON Imports / Context API           |
| **Hosting**     | GitHub Pages (Zero Config)       | Vercel / Netlify / GitHub Actions          |
| **Maintenance** | Low (Accessible to novice devs)  | Medium (Requires build pipeline knowledge) |
| **Use Case**    | 4th-6th Class Municipalities     | Cities and 1st Class Municipalities        |

### 3.2 Core Reusable Modules

Developers must utilize the following schema structures to ensure portability between the Vanilla and React versions.

- **Module A: Service Directory**
  - **Function:** Displays the Citizen's Charter (Requirements, Fees, Processing Time).
  - **Schema:** `Service { id, department, steps: [], requirements: [], fees: [] }`
  - **Reusability:** The JSON data structure must remain identical regardless of the frontend framework used.

- **Module B: Official Directory**
  - **Function:** Lists elected officials with contact routing.
  - **Schema:** `Official { name, position, committee_chairmanship: [], contact_channels: {} }`

- **Module C: Legislative Tracking**
  - **Function:** Searchable database of Ordinances and Resolutions.
  - **Schema:** `Legislation { reference_no, title, author, date_approved, pdf_url, tags: [] }`

---

## 4. The "LGU Synchronization" Protocol (Human-in-the-Loop)

To prevent "Zombie Projects" (software that exists but is outdated), every repository must contain a `TEAM_SYNC.md` file. This establishes clear ownership of the data pipeline.

### 4.1 TEAM_SYNC.md Template

All new repositories must initialize with the following template:

```markdown
# LGU Synchronization Protocol

**LGU Name:** [Insert Municipality/City]
**Last Sync Date:** [YYYY-MM-DD]

## Roles & Responsibilities

### 1. Developer Team (Code Maintainers)

- **Lead Maintainer:** [Name/GitHub Handle] - Responsible for merge requests and deployment.
- **Frontend Dev:** [Name] - Responsible for UI/UX and Accessibility updates.

### 2. Data Custodians (Source of Truth)

- **Designation:** [e.g., Municipal Planning & Development Coordinator (MPDC)]
- **Responsibility:** Provides the raw CSV/Excel files for the Citizen's Charter and Annual Budget.
- **Contact Protocol:** [e.g., Email submission by the 5th of every month]

### 3. Content Approvers (Gatekeepers)

- **Designation:** [e.g., Information Officer / Mayor's Chief of Staff]
- **Responsibility:** Verifies that the data on the staging site matches the official hard copies before production deployment.

## Change Management Log

- [YYYY-MM-DD]: Updated Revenue Code 2026 data. Verified by [Approver Name].
- [YYYY-MM-DD]: Patched navigation bug. Approved by [Lead Maintainer].
```

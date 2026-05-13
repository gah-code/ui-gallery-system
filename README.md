# UI Gallery System

A UI-first, Storybook-centered, gallery/index-driven frontend system.

## Current Phase

Phase 7 — Storybook Productization

## Current Focus

Phase 7 Storybook productization:

- Storybook hierarchy and coverage audit complete
- Storybook hierarchy standardized
- story naming and usage notes standardized
- accessibility coverage reviewed
- interaction/state coverage reviewed
- final Storybook productization review complete
- next: Phase 7 formal closeout

## Phase 6 Status

Phase 6 — Gallery Index + Demo Pages is complete.

The project now has app-side gallery/demo surfaces for:

- Static gallery metadata
- Gallery Index
- Gallery Category Browsing
- Demo Page Shell
- Section Comparison Pages
- Gallery Metadata Connection

## Phase 5 Status

Phase 5 — Section Components is complete.

The project now has reusable section components for:

- Navigation
- Hero
- Footer
- CTA Section
- Feature Row

## Phase 4 Status

Phase 4 — Component Library Batch 2 is complete.

The project now has reusable components for:

- Carousel
- Testimonials
- Customer Logos
- Featured-In Logos
- Steps
- Forms
- Tables
- Pricing Tables
- Modal

## Phase 3 Status

Phase 3 — Component Library Batch 1 is complete.

The project now has reusable components for:

- Card
- Breadcrumbs
- Pagination
- Alert
- Stats
- Gallery
- Feature Box
- Preview/Profile Card
- Accordion
- Tabs

## Phase 2 Status

Phase 2 — Layout Patterns is complete.

The project now has reusable layout patterns for:

- Row
- Grid
- SingleColumn
- Sidebar
- Magazine
- ZPattern
- FPattern
- Asymmetric

## Phase 1 Status

Phase 1 — Elements + Foundations is complete.

The project now has:

- token foundations
- base/global styles
- typography roles
- foundation Storybook docs
- primitive UI elements for Text, Button, Image, Tag, Input, Icon, and Status Label

## Phase 0 Status

Phase 0 — Baseline + Gallery Inventory is complete.

The gallery inventory is currently provisional because no source-backed visual reference was found in the repo. This can be refined later when a design board or reference image is added.

## Project Direction

Build the UI system first.  
Defer Contentful until UI contracts are stable.

## Build Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Key Documents

- `TASKS.md`
- `docs/IMPLEMENTATION-ROADMAP.md`
- `docs/GALLERY-TAXONOMY.md`
- `docs/GALLERY-INVENTORY.md`
- `docs/phases/PHASE-0-BASELINE.md`
- `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`
- `docs/phases/PHASE-2-LAYOUT-PATTERNS.md`
- `docs/phases/PHASE-3-COMPONENT-LIBRARY-BATCH-1.md`
- `docs/phases/PHASE-4-COMPONENT-LIBRARY-BATCH-2.md`
- `docs/phases/PHASE-5-SECTION-COMPONENTS.md`
- `docs/phases/PHASE-6-GALLERY-INDEX-DEMO-PAGES.md`
- `docs/phases/PHASE-7-STORYBOOK-PRODUCTIZATION.md`
- `docs/system/ARCHITECTURE.md`
- `docs/system/FOUNDATIONS.md`
- `docs/system/PRIMITIVE-CONTRACTS.md`
- `docs/system/LAYOUT-PATTERNS.md`
- `docs/system/PATTERN-CONTRACTS.md`
- `docs/system/COMPONENTS.md`
- `docs/system/COMPONENT-CONTRACTS.md`
- `docs/system/COMPONENT-BATCH-2-CONTRACTS.md`
- `docs/system/SECTIONS.md`
- `docs/system/SECTION-CONTRACTS.md`
- `docs/system/GALLERY.md`
- `docs/system/GALLERY-CONTRACTS.md`
- `docs/system/STORYBOOK.md`
- `docs/system/STORYBOOK-CONTRACTS.md`
- `docs/system/STORYBOOK-AUDIT.md`

## Runtime

Use Node v22.12.0 for this project.

```bash
nvm use
npm install
```

The default shell Node may not be the correct runtime. Use `.nvmrc` before running Vite or Storybook commands.

## Development

```bash
npm run dev
npm run storybook
```

Storybook is the primary design-system workspace.

## Verification

```bash
npm run build
npm run build-storybook
npm run lint
```

## Contentful Status

Deferred.

Contentful should be introduced later through adapters and normalized UI data contracts.

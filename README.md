# UI Gallery System

A UI-first, Storybook-centered, gallery/index-driven frontend system.

## Current Phase

Phase 4 — Component Library Batch 2

## Current Focus

Phase 4 component-library implementation:

- Carousel component complete
- Testimonials component complete
- Customer Logos component complete
- Featured-In Logos component complete
- Steps component next

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
- `docs/system/ARCHITECTURE.md`
- `docs/system/FOUNDATIONS.md`
- `docs/system/PRIMITIVE-CONTRACTS.md`
- `docs/system/LAYOUT-PATTERNS.md`
- `docs/system/PATTERN-CONTRACTS.md`
- `docs/system/COMPONENTS.md`
- `docs/system/COMPONENT-CONTRACTS.md`
- `docs/system/COMPONENT-BATCH-2-CONTRACTS.md`

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

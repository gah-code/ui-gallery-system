# UI Gallery System

A UI-first, Storybook-centered, gallery/index-driven frontend system.

## Current Phase

Phase 9 — Static Data Shape Freeze

## Current Focus

Phase 9 planning is active.

Current planning-side work:

- shared gallery theme contract patch complete
- next: continue static data shape freeze planning before implementation

## Phase 8 Status

Phase 8 — Responsive Polish + Section Contract Refinement is complete.

Completed:

- DemoShell Beacon Bar Polish
- responsive behavior audit
- prioritized responsive patch queue
- SectionComparison responsive patch
- Footer responsive patch
- Navigation responsive patch
- gallery/demo responsive stress stories
- section contract refinement review
- Gallery Surface Layout Polish
- Beacon Bar System Alignment

No section or component API refinements were required.

## Phase 7 Status

Phase 7 — Storybook Productization is complete.

Storybook now has:

- standardized hierarchy
- starter artifact cleanup
- standardized story naming and usage notes
- reviewed accessibility coverage
- reviewed interaction/state coverage
- final productization review complete

Storybook remains the primary design-system workspace.

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
- `docs/phases/PHASE-8-RESPONSIVE-POLISH-SECTION-CONTRACTS.md`
- `docs/phases/PHASE-9-STATIC-DATA-SHAPE-FREEZE.md`
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
- `docs/system/RESPONSIVE-REVIEW.md`
- `docs/system/RESPONSIVE-AUDIT.md`
- `docs/system/RESPONSIVE-PATCH-QUEUE.md`
- `docs/system/SECTION-REFINEMENT-CONTRACTS.md`
- `docs/system/SECTION-CONTRACT-REFINEMENT-REVIEW.md`

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

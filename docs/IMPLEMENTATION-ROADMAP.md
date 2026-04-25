# Implementation Roadmap

## Project Direction

UI-first now. Contentful later.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Phase 0 — Baseline + Gallery Inventory

Status: Complete

Goal: Establish project structure, ownership boundaries, and build inventory.

### Deliverables

- `TASKS.md`
- `docs/GALLERY-TAXONOMY.md`
- `docs/GALLERY-INVENTORY.md`
- `docs/phases/PHASE-0-BASELINE.md`
- `docs/system/ARCHITECTURE.md`

### Closeout Summary

Phase 0 established the project baseline, architecture ownership boundaries, gallery taxonomy, and provisional gallery inventory.

The gallery inventory is provisional because no source-backed reference image was found during this pass.

This does not block Phase 1. A future source-backed visual board can refine the inventory later.

## Phase 1 — Elements + Foundations

Status: Complete

Goal: Build tokens, typography, text, buttons, images, inputs, and tags.

### Closeout Summary

Phase 1 established the foundation layer and all planned primitive UI elements.

Completed:

- token files
- base/global styles
- typography roles
- foundation Storybook docs
- Text
- Button
- Image
- Tag
- Input
- Icon
- Status Label

Phase 2 — Layout Patterns is now the active phase.

### Deliverables

- `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`
- `docs/system/FOUNDATIONS.md`
- `docs/system/PRIMITIVE-CONTRACTS.md`
- `src/styles/tokens.css.ts`
- `src/styles/global.css.ts`
- `src/styles/typography.css.ts`
- `src/styles/index.ts`
- foundation Storybook docs
- `src/components/ui/Text`
- `src/components/ui/Button`
- `src/components/ui/Image`
- `src/components/ui/Tag`
- `src/components/ui/Input`
- `src/components/ui/Icon`
- `src/components/ui/StatusLabel`
- primitive components later

## Phase 2 — Layout Patterns

Status: Active

Goal: Build reusable layout systems before richer components.

### Current Focus

Row, Grid, SingleColumn, and Sidebar patterns implemented. Magazine pattern is next.

### Deliverables

- `docs/phases/PHASE-2-LAYOUT-PATTERNS.md`
- `docs/system/LAYOUT-PATTERNS.md`
- `docs/system/PATTERN-CONTRACTS.md`
- `src/components/patterns/Row`
- `src/components/patterns/Grid`
- `src/components/patterns/SingleColumn`
- `src/components/patterns/Sidebar`
- layout pattern components later
- layout pattern Storybook docs later

## Phase 3 — Component Library Batch 1

Goal: Build foundational reusable components.

Includes:

- Breadcrumbs
- Pagination
- Alerts
- Stats
- Gallery
- Feature box
- Preview/profile cards
- Accordion
- Tabs

## Phase 4 — Component Library Batch 2

Goal: Build heavier interactive and content-rich components.

Includes:

- Carousel
- Testimonials
- Logos
- Steps
- Forms
- Tables
- Pricing tables
- Modals

## Phase 5 — Section Components

Goal: Compose primitives, components, and patterns into section-level surfaces.

Includes:

- Navigation
- Hero
- Footer
- CTA
- Feature row

## Phase 6 — Gallery Index + Demo Pages

Goal: Make the app browsable as a UI reference system.

## Phase 7 — Storybook Productization

Goal: Make Storybook the system of record for the UI layer.

## Phase 8 — Responsive Polish + Section Contract Refinement

Goal: Validate responsive behavior and section-level contracts.

## Phase 9 — Static Data Shape Freeze

Goal: Lock UI data contracts before CMS modeling.

## Phase 10 — Contentful Readiness

Goal: Plan CMS mapping after UI contracts stabilize.

## Phase 11 — Contentful Integration later

Goal: Integrate Contentful through adapters and normalized data models.

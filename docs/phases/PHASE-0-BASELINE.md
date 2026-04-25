# Phase 0 — Baseline + Gallery Inventory

## Status

Complete

## Goal

Create the project baseline, document architecture ownership, and convert the gallery idea into a structured build inventory.

## Why Now

Before building components, the project needs a stable map: what belongs to primitives, patterns, sections, Storybook, static fixtures, and future CMS mapping.

## Scope

- Confirm project setup
- Confirm Storybook setup
- Confirm styling architecture
- Define repo ownership boundaries
- Define gallery taxonomy
- Define build inventory
- Define what ships in Storybook vs app shell
- Create initial roadmap and task tracker
- Confirm Phase 1 entry point without starting Phase 1

## Not in Scope

- Building final components
- Building final section designs
- Creating Contentful models
- Fetching live CMS data
- Over-polishing visuals before foundations exist
- Starting Phase 1 implementation

## Deliverables

- `TASKS.md`
- `README.md`
- `docs/IMPLEMENTATION-ROADMAP.md`
- `docs/GALLERY-TAXONOMY.md`
- `docs/GALLERY-INVENTORY.md`
- `docs/system/ARCHITECTURE.md`

## Baseline Snapshot

### Runtime

- Node: v22.12.0
- npm: 10.9.0
- Framework: React + TypeScript
- Build tool: Vite
- Styling: vanilla-extract
- Storybook: React + Vite

### Runtime Note

Use `.nvmrc` and run `nvm use` before Vite or Storybook commands. The default shell Node may not be the verified runtime.

### Current Routes

- `/` — initial app route

### Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

### Layout Ownership

- `src/components/layout/*` owns shell, page frame, and global layout concerns.

### Page Ownership

- Pages own route-level behavior and decide which sections render.

### Primitive Ownership

- `src/components/ui/*` owns low-level reusable UI primitives.

### Pattern Ownership

- `src/components/patterns/*` owns reusable layout patterns.

### Section Ownership

- `src/components/sections/*` owns route-level section composition.

### Content Boundary

- `src/content/*` is reserved for future content integration.
- No raw CMS assumptions should enter UI components.
- Contentful is deferred until UI contracts are stable.

### Storybook State

- Storybook is installed as the design-system workspace.
- Storybook is the primary design-system workspace for foundations, primitives, patterns, components, sections, responsive contracts, and state coverage.
- Foundation stories should live in `src/stories/foundations`.
- Component-specific stories should be colocated later.

### Testing State

- Baseline testing state:
  - lint: Pass
  - build: Pass
  - Storybook build: Pass
  - unit tests: Not configured

### Styling Architecture

- `src/styles/*` owns tokens, base styles, and global rhythm.
- Component visuals should stay colocated with components.
- Section visuals should stay colocated with sections.

## Gallery Inventory

The detailed inventory lives in `docs/GALLERY-INVENTORY.md`.

### Inventory Status

Provisional. No source-backed gallery/reference board was found in the repo during this pass.

### Elements

- Text
- Buttons
- Images
- Inputs
- Tags
- Icons
- Status labels

### Layout Patterns

- Row of cards
- Grid of cards
- Single-column layout
- Sidebar layout
- Multi-column / magazine layout
- Z-pattern
- F-pattern
- Asymmetry / experimental layout

### Reusable Components

- Cards
- Alerts
- Breadcrumbs
- Pagination
- Tabs
- Accordion
- Stats
- Carousel
- Testimonials
- Logos
- Forms
- Tables
- Pricing tables
- Modals
- Feature boxes
- Profile / preview cards
- Steps

### Section Components

- Navigation
- Hero
- Footer
- CTA section
- Feature row

### Gallery / Demo Surfaces

- Gallery index
- Category filtering
- Demo pages
- Section comparison pages
- Storybook documentation surfaces

### Future CMS / Data Mapping

- Static fixtures first
- UI data contracts second
- Contentful modeling later
- CMS adapters last

## Phase 1 Entry Point

Phase 1 — Elements + Foundations is the next active phase after Phase 0 closeout.

The first Phase 1 workstream is Elements + Foundations: token foundation scope, color tokens, typography tokens, spacing tokens, radius tokens, shadow tokens, motion/focus tokens, base/global style entry points, foundation Storybook docs, and primitive API planning before implementation.

## Acceptance Criteria

- [x] Project scaffold is created
- [x] Storybook runs locally
- [x] Storybook builds successfully
- [x] vanilla-extract is configured
- [x] Baseline architecture is documented
- [x] Gallery taxonomy is documented
- [x] Roadmap is created
- [x] Task tracker reflects Phase 0 completion and Phase 1 activation
- [x] Contentful is explicitly deferred
- [x] Gallery inventory doc is created
- [x] Inventory is grouped by dependency order
- [x] Items are assigned to build phases
- [x] Phase 1 entry point is confirmed
- [x] README, TASKS, roadmap, taxonomy, and phase doc agree

## Verification Commands

```bash
npm run dev
npm run build
npm run storybook
npm run build-storybook
npm run lint
```

## Closeout Note

Phase 0 is complete as a docs-first baseline and provisional gallery inventory pass.

Completed outcomes:

- Project scaffold verified.
- Storybook verified as the primary design-system workspace.
- vanilla-extract configured.
- Architecture ownership boundaries documented.
- Gallery taxonomy documented.
- Gallery inventory created.
- Inventory grouped by dependency order.
- Inventory items assigned to build phases.
- Contentful explicitly deferred.
- Phase 1 entry point confirmed.

Inventory status:

- Provisional.
- No source-backed gallery/reference image was found in the repo during this pass.
- A future visual reference may be added later to refine the inventory, but it does not block Phase 1.

Verification:

- `npm run build` passed.
- `npm run build-storybook` passed.
- `npm run lint` passed.
- `npm run test` is not configured.

Phase 0 closed with Phase 1 — Elements + Foundations as the next active phase.

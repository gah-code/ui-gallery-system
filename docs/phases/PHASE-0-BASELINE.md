# Phase 0 — Baseline + Gallery Inventory

## Status

Active

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

## Not in Scope

- Building final components
- Building final section designs
- Creating Contentful models
- Fetching live CMS data
- Over-polishing visuals before foundations exist

## Baseline Snapshot

### Runtime

- Node: v22.12.0
- npm: 10.9.0
- Framework: React + TypeScript
- Build tool: Vite
- Styling: vanilla-extract
- Storybook: React + Vite

### Current Routes

- `/` — initial app route

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

### Storybook State

- Storybook is installed as the design-system workspace.
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

## Acceptance Criteria

- [x] Project scaffold is created
- [x] Storybook runs locally
- [x] Storybook builds successfully
- [x] vanilla-extract is configured
- [x] Baseline architecture is documented
- [x] Gallery taxonomy is documented
- [x] Roadmap is created
- [x] Task tracker reflects Phase 0 as active
- [x] Contentful is explicitly deferred

## Verification Commands

```bash
npm run dev
npm run build
npm run storybook
npm run build-storybook
```

## Closeout / Reopen Notes

Phase 0 is still active.

Do not close this phase until TASKS.md, this phase document, and the roadmap all agree.

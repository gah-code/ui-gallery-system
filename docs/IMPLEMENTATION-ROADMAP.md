# Implementation Roadmap

## Project Direction

UI-first now. Contentful later.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Phase 0 — Baseline + Gallery Inventory

Status: Active

Goal: Establish project structure, ownership boundaries, and build inventory.

### Deliverables

- `TASKS.md`
- `docs/GALLERY-TAXONOMY.md`
- `docs/GALLERY-INVENTORY.md`
- `docs/phases/PHASE-0-BASELINE.md`
- `docs/system/ARCHITECTURE.md`

### Phase 1 Entry Gate

Phase 1 starts only after:

- baseline architecture is documented
- gallery inventory is accounted for
- Storybook remains confirmed as the design-system workspace
- planning docs agree
- Phase 0 is formally closed

## Phase 1 — Elements + Foundations

Goal: Build tokens, typography, text, buttons, images, inputs, and tags.

## Phase 2 — Layout Patterns

Goal: Build reusable layout systems before richer components.

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

## Phase 11 — Contentful Integration

Goal: Integrate Contentful through adapters and normalized data models.

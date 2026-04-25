# Gallery Taxonomy

## Related Documents

- `docs/GALLERY-INVENTORY.md`
- `docs/IMPLEMENTATION-ROADMAP.md`
- `docs/phases/PHASE-0-BASELINE.md`
- `docs/system/ARCHITECTURE.md`

## Phase 0 Closeout Note

The taxonomy is accepted as the organizing model for the provisional gallery inventory.

Future source-backed visual references should map back into this taxonomy rather than replacing the dependency order.

## Purpose

This taxonomy defines how the UI gallery system organizes design work before implementation begins.

The build order is dependency-first, not visual-excitement-first.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## 1. Elements

Smallest reusable interface pieces.

- Text
- Buttons
- Images
- Inputs
- Tags
- Icons
- Status labels

## 2. Layout Patterns

Reusable spatial systems.

- Row of cards
- Grid of cards
- Single-column
- Sidebar
- Multi-column / magazine
- Z-pattern
- F-pattern
- Asymmetry / experimental

## 3. Reusable Components

Portable UI objects built from elements and patterns.

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

## 4. Section Components

Route-level compositions.

- Navigation
- Hero
- Footer
- CTA section
- Feature row

## 5. Gallery / Demo Surfaces

Experience-level documentation and browsing surfaces.

- Gallery index
- Filtered browsing
- Demo routes
- Section comparison pages
- Storybook documentation

## 6. Storybook Productization

Storybook is the primary design-system workspace and should validate the system before it is treated as stable.

- Foundation docs
- Primitive stories
- Pattern stories
- Component stories
- Section stories
- Responsive contract stories
- State coverage stories

## 7. Future CMS Mapping

Deferred until UI contracts stabilize.

- Static fixtures
- Normalized UI data contracts
- Content model proposal
- CMS adapters
- Contentful integration

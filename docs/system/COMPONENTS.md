# Components

## Purpose

Components are reusable UI objects built from foundations, primitives, and layout patterns.

They should be portable, accessible, and Storybook-validated before being used in section-level compositions.

## Ownership

| Area | Owner |
|---|---|
| Primitive elements | `src/components/ui/*` |
| Layout patterns | `src/components/patterns/*` |
| Reusable components | `src/components/components/*` |
| Section composition | `src/components/sections/*` |
| Component stories | colocated with implemented components |

## Dependency Rule

Components may compose:

- foundations
- primitives
- layout patterns

Components should not depend on:

- raw CMS data
- page routes
- section-specific assumptions
- Contentful response shapes

## Phase 3 Component Batch

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

## Implemented Components

- `src/components/components/Card`
- `src/components/components/Breadcrumbs`
- `src/components/components/Pagination`
- `src/components/components/Alert`
- `src/components/components/Stats`
- `src/components/components/Gallery`
- `src/components/components/FeatureBox`
- `src/components/components/PreviewProfileCard`
- `src/components/components/Accordion`
- `src/components/components/Tabs`

## Roadmap

Phase 3 Component Library Batch 1 is complete. Phase 4 Component Library Batch 2 is complete.

Phase 5 Section Components is active for planning/contracts before implementation.

## Phase 4 — Component Library Batch 2

Status: Complete

Batch 2 scope:

- Carousel
- Testimonials
- Customer Logos
- Featured-In Logos
- Steps
- Forms
- Tables
- Pricing Tables
- Modals

Batch 2 components are richer, more interactive, or more content-heavy than Batch 1.

They should compose:

- foundations
- primitives
- layout patterns
- Batch 1 components where useful

They should not introduce CMS assumptions or section-level behavior.

## Implemented Phase 4 Components

- `src/components/components/Carousel`
- `src/components/components/Testimonials`
- `src/components/components/CustomerLogos`
- `src/components/components/FeaturedInLogos`
- `src/components/components/Steps`
- `src/components/components/Forms`
- `src/components/components/Tables`
- `src/components/components/PricingTables`
- `src/components/components/Modal`

## Phase 4 Completion Note

All planned Component Library Batch 2 components have been implemented and accepted for Phase 4 closeout.

Implemented components:

- `src/components/components/Carousel`
- `src/components/components/Testimonials`
- `src/components/components/CustomerLogos`
- `src/components/components/FeaturedInLogos`
- `src/components/components/Steps`
- `src/components/components/Forms`
- `src/components/components/Tables`
- `src/components/components/PricingTables`
- `src/components/components/Modal`

## Phase 3 Completion Note

All planned Component Library Batch 1 components have been implemented and accepted for Phase 3 closeout.

Implemented components:

- `src/components/components/Card`
- `src/components/components/Breadcrumbs`
- `src/components/components/Pagination`
- `src/components/components/Alert`
- `src/components/components/Stats`
- `src/components/components/Gallery`
- `src/components/components/FeatureBox`
- `src/components/components/PreviewProfileCard`
- `src/components/components/Accordion`
- `src/components/components/Tabs`

## Storybook Role

Storybook should validate:

- canonical usage
- variants
- content density
- long-copy behavior
- missing media/content states
- interaction states
- accessibility expectations
- responsive behavior where relevant

## Not in Scope Yet

- Section components
- Gallery/demo pages
- Contentful

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

## Roadmap

Card, Breadcrumbs, Pagination, Alert, Stats, Gallery, and Feature Box components implemented. Preview/Profile Card component is next.

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

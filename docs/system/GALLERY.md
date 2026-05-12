# Gallery System

## Purpose

The gallery system provides app-side browsing and demo surfaces for the UI system.

It helps explore the completed layers:

- foundations
- primitives
- layout patterns
- reusable components
- section components

## Ownership

| Area | Owner |
|---|---|
| Storybook design-system documentation | Storybook stories |
| Gallery metadata | `src/data/*` |
| Gallery/demo pages | `src/components/sections/*` app-side gallery/demo surfaces |
| UI primitives | `src/components/ui/*` |
| Layout patterns | `src/components/patterns/*` |
| Reusable components | `src/components/components/*` |
| Section components | `src/components/sections/*` |

## Gallery Principles

- Gallery pages are browsing surfaces.
- Storybook remains the design-system workspace.
- Gallery metadata should be static first.
- Gallery metadata should not assume CMS shape.
- Gallery pages should compose existing system pieces.
- Gallery pages should not redefine component APIs.
- Demo pages should use realistic content states.
- Demo pages should not become production route templates.

## Implemented Metadata Files

- `src/data/gallery/types.ts`
- `src/data/gallery/categories.ts`
- `src/data/gallery/items.ts`
- `src/data/gallery/helpers.ts`
- `src/data/gallery/index.ts`

## Implemented Gallery Surfaces

- `src/components/sections/GalleryIndex`
- `src/components/sections/GalleryCategoryBrowser`
- `src/components/sections/DemoPageShell`
- `src/components/sections/SectionComparison`

## Metadata Connection Note

Static metadata in `src/data/gallery/*` now powers the gallery index and category browsing surfaces.

Gallery/demo metadata remains static-first and CMS-free.

## Category Model

Categories:

- Foundations
- Primitives
- Patterns
- Components
- Sections

## Not in Scope Yet

- Contentful
- CMS adapters
- advanced search
- analytics
- production navigation/routing strategy

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
- `src/components/sections/GallerySurfaceLayout`
- `src/components/sections/DemoPageShell`
- `src/components/sections/SectionComparison`

## Metadata Connection Note

Static metadata in `src/data/gallery/*` now powers the gallery index and category browsing surfaces.

Gallery/demo metadata remains static-first and CMS-free.

## Phase 6 Completion Note

All planned gallery/demo surfaces have been implemented and accepted for Phase 6 closeout.

Implemented gallery/demo surfaces:

- `src/data/gallery`
- `src/components/sections/GalleryIndex`
- `src/components/sections/GalleryCategoryBrowser`
- `src/components/sections/DemoPageShell`
- `src/components/sections/SectionComparison`

Gallery surfaces are app-side browsing aids.

Storybook remains the primary design-system workspace.

## Phase 8 DemoShell Polish Note

DemoPageShell received a small Phase 8 polish pass through the DemoShell Beacon Bar side quest.

The shell now includes:

- a slim project utility bar
- local light/dark shell behavior
- GitHub and LinkedIn social actions
- focused Storybook dark-mode validation
- responsive utility-area wrapping

This is an additive refinement of an existing app-side gallery/demo surface.

It does not reopen Phase 6, change DemoPageShell's core purpose, or introduce Contentful assumptions.

## Phase 8 Gallery Surface Layout Polish Note

GalleryIndex and GalleryCategoryBrowser remain implemented Phase 6 surfaces.

Phase 8 added GallerySurfaceLayout as a composed app-side gallery landing flow.

The layout improves responsive separation between the gallery overview and category browsing without changing either component API.

No category routes, production routing, CMS assumptions, or Contentful work were introduced.

## Phase 8 Closeout Note

The Phase 8 closeout confirmed gallery/demo responsive polish is complete.

Gallery/demo surfaces remain app-side browsing aids, and Storybook remains the primary design-system workspace.

## Beacon Bar Alignment Note

GalleryIndex and GalleryCategoryBrowser now share a consistent Beacon Bar pattern through the composed GallerySurfaceLayout as Phase 8 polish.

This improves app-side gallery cohesion without changing the gallery metadata model or adding routes.

The Phase 8 closeout review refresh includes this alignment work.

## Phase 8 Gallery Polish Note

Phase 8 added gallery/demo polish without reopening Phase 6.

Completed:

- DemoShell Beacon Bar Polish
- Gallery Surface Layout Polish
- Beacon Bar System Alignment
- gallery/demo responsive stress story coverage

No category routes, production routing, CMS assumptions, metadata shape changes, or Contentful work were introduced.

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

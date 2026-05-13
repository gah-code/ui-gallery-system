# Gallery Contracts

## Purpose

Gallery contracts define the expected metadata, browsing behavior, and demo surface boundaries before implementation.

## Contract Rules

- Gallery metadata should be static first.
- Gallery metadata should describe system pieces, not CMS content.
- Gallery pages should compose existing UI system layers.
- Gallery pages should not become the source of truth for component APIs.
- Storybook remains the primary design-system workspace.
- Demo pages should show realistic usage, not every possible state.
- Category browsing should stay simple at first.

## Implementation Order

```txt
Gallery metadata -> Gallery index -> Category browsing -> Demo shell -> Section comparison pages -> Gallery metadata connection
```

## Implemented Surfaces

- Gallery Index: Implemented
- Gallery Category Browsing: Implemented
- Gallery Surface Layout: Implemented as Phase 8 polish
- Demo Page Shell: Implemented
- Section Comparison Pages: Implemented
- Gallery Metadata Connection: Implemented

## Metadata Contract

### GalleryItem

Status: Implemented

Fields:

- id
- title
- category
- status
- description
- phase
- path
- storybook
- tags
- notes

### GalleryCategory

Status: Implemented

Values:

- foundation
- primitive
- pattern
- component
- section

### GalleryStatus

Status: Implemented

Values:

- planned
- implemented
- review
- deprecated

The metadata contract is static-first and may be refined during the later static data shape freeze phase.

## Phase 6 Completion Note

All planned gallery/demo contracts have been implemented.

Status:

- Static Gallery Metadata: Implemented
- Gallery Index: Implemented
- Gallery Category Browsing: Implemented
- Demo Page Shell: Implemented
- Section Comparison Pages: Implemented
- Gallery Metadata Connection: Implemented

The metadata contract remains eligible for refinement during the later static data shape freeze phase.

## Phase 8 DemoShell Beacon Bar Contract Note

Status: Implemented

DemoPageShell now supports a small shell-level utility area for:

- project identity
- GitHub and LinkedIn profile actions
- local light/dark shell theme behavior
- responsive utility-bar wrapping

This remains an app-side demo shell contract.

It does not create production routing, CMS assumptions, or a broad app-wide theme system.

## Phase 8 Gallery Surface Layout Contract Note

Status: Implemented

GallerySurfaceLayout composes GalleryIndex and GalleryCategoryBrowser into one app-side landing flow.

It preserves the existing GalleryIndex and GalleryCategoryBrowser contracts.

It does not create category routes, production routing, CMS assumptions, or Contentful integration.

## Phase 8 Closeout Contract Note

The Phase 8 closeout review confirmed gallery/demo contracts remain stable.

No gallery/demo API, routing, CMS, or Contentful changes were required for Phase 8 formal closeout.

## Beacon Bar Alignment Contract Note

GalleryBeaconBar provides a shared project identity, secondary social actions, and local theme toggle pattern for gallery/demo surfaces.

GallerySurfaceLayout owns the app-side instance so GalleryIndex and GalleryCategoryBrowser remain focused on overview and category browsing.

No gallery metadata, routing, CMS, or Contentful contracts changed.

The Phase 8 closeout review refresh includes this contract alignment.

## Phase 9 Shared Gallery Theme Contract Note

Status: Implemented

The shared gallery theme contract patch moved gallery/demo theme ownership to GallerySurfaceLayout.

Current behavior:

- GallerySurfaceLayout owns the shared light/dark theme state for the composed gallery flow.
- GallerySurfaceLayout applies the inherited `data-theme` root.
- GalleryBeaconBar controls the shared state when rendered inside GallerySurfaceLayout.
- GalleryIndex and GalleryCategoryBrowser inherit scoped gallery theme variables.
- DemoPageShell supports controlled theme behavior while preserving local fallback behavior.

No gallery metadata shapes, category routes, production routes, CMS assumptions, or Contentful work were introduced.

## Phase 8 Gallery Polish Note

Phase 8 added gallery/demo polish without reopening Phase 6.

Completed:

- DemoShell Beacon Bar Polish
- Gallery Surface Layout Polish
- Beacon Bar System Alignment
- gallery/demo responsive stress story coverage

No category routes, production routing, CMS assumptions, metadata shape changes, or Contentful work were introduced.

## Browsing Behavior

Initial browsing should support:

- category grouping
- item title
- item description
- item status
- item phase
- optional tags
- optional links to demo/story surfaces

Do not implement advanced search yet.

## Demo Surface Boundaries

Demo surfaces should:

- use existing components
- show realistic compositions
- explain purpose and usage
- remain clearly separate from production pages

Demo surfaces should not:

- fetch live data
- assume Contentful
- implement app-shell behavior
- become production marketing pages

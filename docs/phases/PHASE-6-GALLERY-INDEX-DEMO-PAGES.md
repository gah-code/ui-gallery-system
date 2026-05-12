# Phase 6 — Gallery Index + Demo Pages

## Status

Active

## Goal

Define and implement browsable gallery and demo surfaces that make the completed UI system easier to explore, compare, and validate.

## Why Now

Phases 1–5 established the design-system layers:

- foundations
- primitives
- layout patterns
- reusable components
- section components

Phase 6 can now create gallery and demo surfaces that organize those system pieces into a usable reference experience.

## Scope

Phase 6 covers:

- gallery index surface
- gallery category browsing
- demo page shell
- section comparison pages
- gallery metadata connection to primitives, patterns, components, and sections

## Not in Scope

- Storybook productization as a dedicated phase
- static data shape freeze
- Contentful
- CMS models
- live data fetching
- production route architecture
- final marketing site composition
- advanced search
- advanced filtering
- analytics instrumentation

## Architecture Boundaries

- Gallery/demo pages may use existing primitives, patterns, components, and sections.
- Gallery/demo pages should not redefine component APIs.
- Gallery/demo pages should not introduce raw CMS data.
- `src/data/*` may hold typed static gallery metadata later.
- `src/content/*` remains a future content boundary only.
- Storybook remains the primary design-system workspace.
- Gallery pages are browsing/demo surfaces, not the final source of design-system truth.

## Build Order

```txt
gallery/demo contracts -> gallery metadata model -> gallery index -> category browsing -> demo shell -> section comparison pages -> gallery closeout review
```

## Gallery Surface Types

### Gallery Index

Status: Implemented

Purpose:

Provide a browsable entry point into the UI system.

Should include categories for:

- foundations
- primitives
- layout patterns
- reusable components
- section components

Expected behavior:

- Show category cards or grouped links.
- Explain what each category owns.
- Link to demo/category surfaces when available.
- Avoid duplicating Storybook in full.

Storybook relationship:

- Gallery index helps app-side browsing.
- Storybook remains the detailed design-system workspace.

Build order:

1

---

### Gallery Category Browsing

Status: Implemented

Purpose:

Allow users to browse system pieces by category.

Expected categories:

- Foundations
- Primitives
- Patterns
- Components
- Sections

Expected behavior:

- Support category metadata.
- Support item metadata.
- Show implementation status.
- Link to Storybook or local demo surfaces where useful.

Build order:

2

---

### Demo Page Shell

Status: Implemented

Purpose:

Provide a reusable app-side page frame for demo pages.

Expected behavior:

- Simple demo layout.
- Consistent heading and description.
- Optional navigation back to gallery.
- No route-level business logic.
- No CMS assumptions.

Build order:

3

---

### Section Comparison Pages

Status: Planned

Purpose:

Compare section variants and content states in one place.

Expected behavior:

- Show sections with realistic content.
- Compare variants without becoming production pages.
- Validate responsive behavior.
- Keep demos clearly separated from reusable components.

Build order:

4

---

### Gallery Metadata Connection

Status: Planned

Purpose:

Define a simple metadata model that can describe primitives, patterns, components, and sections.

Expected metadata fields:

- id
- title
- category
- status
- description
- phase
- path
- storybook reference, if available
- tags
- notes

Build order:

5

## Metadata Model Draft

```ts
type GalleryCategory =
  | 'foundation'
  | 'primitive'
  | 'pattern'
  | 'component'
  | 'section';

type GalleryStatus =
  | 'planned'
  | 'implemented'
  | 'review'
  | 'deprecated';

type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  status: GalleryStatus;
  description: string;
  phase: string;
  path?: string;
  storybook?: string;
  tags?: string[];
  notes?: string;
};
```

## Storybook Relationship

Storybook remains the primary design-system workspace.

Phase 6 app-side gallery surfaces should:

- provide a browsing entry point
- make the system easier to explore
- use realistic demo content
- link conceptually to Storybook coverage
- avoid duplicating every story state

Phase 6 should not:

- replace Storybook
- become the source of API truth
- bypass colocated stories
- introduce CMS or route-specific assumptions

## Acceptance Criteria

Phase 6 planning is complete when:

- [x] Phase 6 planning doc exists
- [x] Gallery index scope is defined
- [x] Demo page scope is defined
- [x] Gallery metadata model is drafted
- [x] Browsing/filtering behavior is defined
- [x] Routing/demo surface boundaries are defined
- [x] Storybook relationship is defined
- [x] Implementation order is confirmed
- [x] TASKS.md reflects the next implementation step
- [x] Verification commands pass

## Verification Commands

```bash
nvm use
npm run build
npm run build-storybook
npm run lint
```

## Closeout / Reopen Notes

Phase 6 is active.

This document currently defines planning and contracts only.

Do not close Phase 6 until gallery/demo surfaces are implemented, documented, validated, and planning state agrees.

## Static Gallery Metadata Implementation Note

Static gallery metadata has been implemented as the first Phase 6 implementation pass.

It includes:

- typed gallery category model
- typed gallery status model
- typed gallery item model
- category summaries
- static gallery items for foundations
- static gallery items for primitives
- static gallery items for layout patterns
- static gallery items for reusable components
- static gallery items for section components
- optional metadata helpers

Gallery index UI, category browsing UI, and demo page shell are now implemented. Section comparison pages have not started.

## Gallery Index Surface Implementation Note

The gallery index surface has been implemented as the second Phase 6 implementation pass.

It uses static gallery metadata to show:

- gallery title and description
- total item count
- implemented item count
- category count
- category summaries
- category item previews
- Storybook relationship note

Category browsing UI and demo page shell are now implemented. Section comparison pages have not started.

## Gallery Category Browsing Implementation Note

Gallery category browsing has been implemented as the third Phase 6 implementation pass.

It uses static gallery metadata to show:

- category selector controls
- selected category summary
- selected category item count
- selected category implemented count
- item cards by category
- item phase/status/path/storybook metadata
- item tags

Demo page shell is now implemented. Section comparison pages have not started.

## Demo Page Shell Implementation Note

The demo page shell has been implemented as the fourth Phase 6 implementation pass.

It supports:

- consistent demo-page header
- metadata row
- actions row
- framed or unframed content area
- empty content fallback
- compact/default/spacious densities
- Storybook relationship note

Section comparison pages have not started.

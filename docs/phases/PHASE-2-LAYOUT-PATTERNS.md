# Phase 2 — Layout Patterns

## Status

Active — Layout implementation started

## Goal

Define and implement reusable layout patterns that future components, sections, gallery pages, and Storybook examples can depend on.

## Why Now

Phase 1 created the foundational visual language and primitive elements.

Before building reusable components like cards, stats, tabs, accordions, alerts, or pricing tables, the project needs stable layout contracts.

Layout patterns should define spatial behavior before richer components are composed.

## Scope

Phase 2 covers reusable layout pattern abstractions for:

- row/card layout
- grid/card layout
- single-column layout
- sidebar layout
- multi-column / magazine layout
- Z-pattern layout
- F-pattern layout
- asymmetry / experimental layout

## Not in Scope

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
- Section components
- Gallery/demo pages
- Contentful
- CMS models
- Live data fetching

## Architecture Boundaries

- `src/components/patterns/*` owns reusable layout pattern abstractions.
- `src/components/ui/*` owns primitives only.
- `src/components/sections/*` remains reserved for section-level composition.
- `src/styles/*` owns tokens, base styles, and global rhythm.
- `src/stories/patterns/*` owns cross-cutting layout pattern Storybook docs.
- Pattern-specific stories may be colocated once patterns are implemented.
- Patterns must not know about raw CMS data.
- `src/content/*` remains a future content boundary only.

## Build Order

```txt
layout contract docs -> shared layout utilities if needed -> row/grid patterns -> single-column/sidebar patterns -> magazine/Z/F/asymmetry patterns -> Storybook pattern validation
```

## Responsive Principles

Layout patterns should define explicit behavior across viewport ranges.

General rule:

- small: stacked and readable
- medium: introduce columns only when content can breathe
- large: allow denser layout when useful
- extra-wide: only expand when the pattern benefits from it

Patterns must avoid:

- squeezing content too early
- relying on visual coincidence
- creating horizontal scrolling as the default fix
- forcing equal-width columns when content needs more readable space
- using CMS assumptions to shape layout contracts

## Pattern Contracts

### Row Layout

Purpose:

Display a small set of related items in a horizontal or wrapping row.

Expected usage:

- feature previews
- small card groups
- stats groups
- logo rows later

Responsive contract:

- small: stacked
- medium: two-column or wrapping row
- large: row layout when item width remains readable

Storybook coverage later:

- 2 items
- 3 items
- 4 items
- long content stress

Build phase:

Phase 2

---

### Grid Layout

Purpose:

Display repeatable items in a responsive grid.

Expected usage:

- card collections
- gallery items
- feature collections
- component previews later

Responsive contract:

- small: 1 column
- medium: 2 columns
- large: 3 columns or more only when justified
- support uneven content heights

Storybook coverage later:

- sparse grid
- dense grid
- uneven content heights
- long-copy items

Build phase:

Phase 2

---

### Single Column Layout

Purpose:

Create readable stacked content with controlled measure.

Expected usage:

- editorial content
- documentation-like sections
- narrow content blocks
- form blocks later

Responsive contract:

- keep readable measure
- avoid stretching text too wide
- support vertical rhythm

Storybook coverage later:

- short content
- long content
- mixed primitive content

Build phase:

Phase 2

---

### Sidebar Layout

Purpose:

Pair main content with supporting secondary content.

Expected usage:

- docs layouts
- filter/sidebar surfaces later
- metadata/sidebar content

Responsive contract:

- small: stacked
- medium/large: main + sidebar when width allows
- sidebar must not crush main content

Storybook coverage later:

- left sidebar
- right sidebar
- long main content
- dense sidebar content

Build phase:

Phase 2

---

### Multi-column / Magazine Layout

Purpose:

Create editorial layouts with mixed-width content blocks.

Expected usage:

- marketing/editorial sections
- feature storytelling
- visual content pairings

Responsive contract:

- small: stacked
- medium: simple two-column if readable
- large: mixed-width columns
- maintain strong hierarchy

Storybook coverage later:

- image + text
- dense editorial blocks
- uneven content
- missing media

Build phase:

Phase 2

---

### Z-pattern Layout

Purpose:

Create alternating visual/text rhythm for journey-style content.

Expected usage:

- feature walkthroughs
- process steps
- product storytelling later

Responsive contract:

- small: stacked
- medium/large: alternating layout
- should remain understandable if media is missing

Storybook coverage later:

- 2 rows
- 3 rows
- missing media
- long copy

Build phase:

Phase 2

---

### F-pattern Layout

Purpose:

Create scan-friendly hierarchy for content-heavy layouts.

Expected usage:

- landing content blocks
- documentation previews
- content-heavy sections later

Responsive contract:

- prioritize heading, summary, key action, then supporting content
- support content-heavy examples without visual collapse

Storybook coverage later:

- sparse content
- dense content
- content with actions
- long-copy stress

Build phase:

Phase 2

---

### Asymmetry / Experimental Layout

Purpose:

Support intentional uneven layouts while preserving responsive safety.

Expected usage:

- premium editorial moments
- portfolio/feature compositions
- visual storytelling later

Responsive contract:

- small: stacked
- medium: cautious asymmetry
- large: intentional offset/mixed placement
- must degrade gracefully

Storybook coverage later:

- default
- reduced content
- long copy
- missing media

Build phase:

Phase 2

## Storybook Plan

Pattern stories should validate layout contracts, not final visuals.

Storybook should demonstrate:

- responsive behavior
- content density
- long-copy stress
- sparse content
- uneven content heights
- missing media where relevant
- stacked-to-column transitions

Planned pattern Storybook surfaces:

- `src/stories/patterns/LayoutPatternsOverview.stories.tsx`
- colocated pattern stories once implementation begins

## Row Pattern Implementation Note

The Row pattern has been implemented as the first Phase 2 layout pattern.

It supports:

- stacked small-screen behavior
- wrapping row behavior when space allows
- gap variants
- alignment variants
- justification variants
- configurable minimum item width
- long-content safety

Grid has since been implemented. Remaining layout patterns after Grid have not started.

## Grid Pattern Implementation Note

The Grid pattern has been implemented as the second Phase 2 layout pattern.

It supports:

- responsive auto-fit grid behavior
- column mode presets
- gap variants
- configurable minimum item width
- alignment options
- sparse and dense collections
- uneven content height support
- long-copy safety

SingleColumn has since been implemented. Remaining layout patterns after SingleColumn have not started.

## SingleColumn Pattern Implementation Note

The SingleColumn pattern has been implemented as the third Phase 2 layout pattern.

It supports:

- readable max-width variants
- vertical rhythm
- gap variants
- alignment variants
- positioning options
- long-content safety
- mixed primitive content composition

Remaining layout patterns have not started.

## Acceptance Criteria

Phase 2 planning is complete when:

- [x] Phase 2 planning doc exists
- [x] Layout pattern scope is defined
- [x] Responsive rules are documented
- [x] Pattern contracts are defined
- [x] Storybook validation requirements are defined
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

Phase 2 is active.

This document defines planning, contracts, and current implementation notes.

Do not close Phase 2 until layout patterns are implemented, documented, validated in Storybook, and planning state agrees.

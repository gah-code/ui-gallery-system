# Phase 3 — Component Library Batch 1

## Status

Active — Component implementation started

## Goal

Define and implement the first reusable component batch using the completed foundations, primitives, and layout patterns.

## Why Now

Phase 1 established foundations and primitives.

Phase 2 established reusable layout patterns.

Phase 3 can now build reusable components that compose primitives and patterns without reinventing low-level styling or layout behavior.

## Scope

Phase 3 covers the first reusable component batch:

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

## Not in Scope

- Carousel
- Testimonials
- Logos
- Forms
- Tables
- Pricing tables
- Modals
- Section components
- Gallery index pages
- Demo pages
- Contentful
- CMS models
- Live data fetching

## Architecture Boundaries

- `src/components/ui/*` owns primitive UI elements.
- `src/components/patterns/*` owns reusable layout pattern abstractions.
- `src/components/components/*` owns reusable component-library components.
- Component-library components should compose primitives and patterns.
- Component-library components should not own route-level section composition.
- `src/components/sections/*` remains reserved for section-level compositions.
- `src/content/*` remains a future content boundary only.
- Components must not know about raw CMS data.
- Component-specific stories should be colocated once implemented.
- Storybook remains the primary design-system workspace.

## Build Order

```txt
component contracts -> dependency map -> Card -> Breadcrumbs -> Pagination -> Alert -> Stats -> Gallery -> Feature Box -> Preview/Profile Card -> Accordion -> Tabs
```

## Dependency Principles

Components should use existing system pieces:

- Text for typography
- Button for actions
- Image for media
- Tag for metadata
- Icon for decorative/functional icon slots
- StatusLabel for compact status messaging
- Row/Grid/SingleColumn/Sidebar/Magazine as layout helpers when useful

Components should avoid:

- duplicating primitive behavior
- duplicating layout pattern logic
- hardcoding CMS-shaped data
- becoming section-specific too early

## Component Contracts

### Card

Status: Implemented

Purpose:

Reusable content container for previews, summaries, metadata, and actions.

Depends on:

- Text
- Button
- Image
- Tag
- StatusLabel
- Grid/Row patterns when used in collections

Expected variants:

- default
- media
- compact
- horizontal, if justified
- interactive/link card, if accessible

Accessibility expectations:

- Avoid making the entire card interactive unless semantics are clear.
- If clickable, ensure focus and link behavior are accessible.
- Preserve heading hierarchy via composed Text semantics.

Storybook coverage:

- default
- with media
- with tags
- with action
- long-copy
- missing media
- dense metadata

Build order:

1

---

### Breadcrumbs

Status: Implemented

Purpose:

Show page hierarchy and navigation context.

Depends on:

- Text
- Icon, optional
- Button/link styling conventions where useful

Expected variants:

- default
- long trail
- truncated trail, if needed
- current page state

Accessibility expectations:

- Use navigation landmark.
- Use ordered list semantics if practical.
- Mark current page with `aria-current="page"`.

Storybook coverage:

- short trail
- long trail
- current page
- overflow/truncation behavior

Build order:

2

---

### Pagination

Status: Implemented

Purpose:

Navigate paginated collections.

Depends on:

- Button
- Text
- Icon, optional

Expected variants:

- default
- compact
- many pages
- first page
- last page
- disabled previous/next

Accessibility expectations:

- Use navigation landmark.
- Current page must be announced.
- Controls need clear accessible labels.

Storybook coverage:

- default
- first page
- middle page
- last page
- many pages
- compact

Build order:

3

---

### Alert

Status: Implemented

Purpose:

Communicate important messages, warnings, success states, errors, or information.

Depends on:

- Text
- Icon
- StatusLabel, optional
- Button, optional

Expected variants:

- info
- success
- warning
- error
- neutral

Accessibility expectations:

- Do not rely on color alone.
- Use appropriate roles only when urgency requires it.
- Avoid `role="alert"` by default for non-urgent messages.

Storybook coverage:

- all variants
- with icon
- with action
- long message
- compact message

Build order:

4

---

### Stats

Status: Implemented

Purpose:

Display key metrics, proof points, or summary numbers.

Depends on:

- Text
- Icon, optional
- Row/Grid patterns

Expected variants:

- 2-up
- 3-up
- 4-up
- compact
- with icon

Accessibility expectations:

- Numbers need readable labels and context.
- Avoid purely decorative meaning.

Storybook coverage:

- default
- 2 stats
- 3 stats
- 4 stats
- long labels
- with icons

Build order:

5

---

### Gallery

Status: Implemented

Purpose:

Display a collection of visual or content items.

Depends on:

- Image
- Text
- Tag
- Grid pattern

Expected variants:

- image grid
- mixed content grid
- sparse
- dense
- missing image

Accessibility expectations:

- Images need meaningful alt text unless decorative.
- Captions and labels should be readable.
- Avoid assuming CMS image structure.

Storybook coverage:

- default
- sparse
- dense
- missing image
- mixed content
- long captions

Build order:

6

---

### Feature Box

Status: Implemented

Purpose:

Highlight a feature, benefit, or capability in a compact reusable block.

Depends on:

- Text
- Icon
- Button, optional
- Tag, optional
- Row/Grid patterns for collections

Expected variants:

- icon feature
- image feature
- compact
- with action
- dense copy

Accessibility expectations:

- Icons should not replace meaningful labels.
- Actions must use accessible Button/link behavior.

Storybook coverage:

- default
- with icon
- with action
- dense copy
- long heading

Build order:

7

---

### Preview/Profile Card

Status: Planned

Purpose:

Preview a person, article, case study, project, or profile-like content.

Depends on:

- Card
- Image
- Text
- Tag
- Button
- StatusLabel, optional

Expected variants:

- profile card
- article preview
- project preview
- missing image
- dense metadata

Accessibility expectations:

- Link destination should be clear.
- Image alt text should match content meaning.
- Preserve readable metadata.

Storybook coverage:

- profile
- article
- project
- missing image
- long copy
- dense metadata

Build order:

8

---

### Accordion

Status: Planned

Purpose:

Reveal and hide stacked content sections.

Depends on:

- Text
- Button
- Icon
- Motion tokens

Expected variants:

- single item
- multiple items
- long content
- initially open item
- multiple-open behavior only if intentionally supported

Accessibility expectations:

- Use button controls.
- Expose expanded state.
- Associate buttons and panels.
- Keyboard behavior should follow native button expectations.

Storybook coverage:

- default
- multiple items
- long content
- initially open
- dense FAQ-style content

Build order:

9

---

### Tabs

Status: Planned

Purpose:

Switch between related content panels.

Depends on:

- Button or button-like tab controls
- Text
- Focus styles
- Motion tokens, optional

Expected variants:

- default
- dense
- long labels
- horizontal tab list
- responsive overflow guidance

Accessibility expectations:

- Define ARIA tab semantics if using real tabs.
- Keyboard behavior must be intentional.
- Panels should be associated with tabs.

Storybook coverage:

- default
- long labels
- dense labels
- keyboard/focus guidance
- mixed panel content

Build order:

10

## Card Component Implementation Note

The Card component has been implemented as the first Phase 3 reusable component.

It supports:

- default card content
- media slot
- compact variant
- horizontal variant
- tags
- status label
- metadata
- actions
- footer content
- title-scoped link behavior
- long-copy safety
- missing-media safety

Subsequent notes track later Phase 3 component implementation.

## Breadcrumbs Component Implementation Note

The Breadcrumbs component has been implemented as the second Phase 3 reusable component.

It supports:

- navigation landmark
- ordered list semantics
- current page state
- separator variants
- size variants
- long-label wrapping
- empty-items fallback

Pagination is now implemented in the note below.

## Pagination Component Implementation Note

The Pagination component has been implemented as the third Phase 3 reusable component.

It supports:

- current page state
- page range rendering
- ellipsis for many pages
- previous/next controls
- disabled boundary states
- compact variant
- button mode through `onPageChange`
- link mode through `getPageHref`
- accessible navigation semantics

Alert is now implemented in the note below.

## Alert Component Implementation Note

The Alert component has been implemented as the fourth Phase 3 reusable component.

It supports:

- info, success, warning, error, and neutral variants
- default and compact densities
- title + message usage
- message-only usage
- optional icon slot
- optional actions slot
- long-message safety
- explicit urgent role usage when needed

Stats is now implemented in the note below.

## Stats Component Implementation Note

The Stats component has been implemented as the fifth Phase 3 reusable component.

It supports:

- responsive stat collections
- 2-up, 3-up, and 4-up layouts
- compact/default/spacious densities
- optional icon slots
- tone variants
- long-label safety
- empty-items fallback
- accessible value + label pairing

Gallery is now implemented in the note below.

## Gallery Component Implementation Note

The Gallery component has been implemented as the sixth Phase 3 reusable component.

It supports:

- responsive visual/content collections
- auto/two/three/four column modes
- compact/default/spacious densities
- surface tone variants
- Image primitive composition
- title/caption/description content
- tag metadata
- title-scoped link behavior
- missing-image fallback
- text-only items
- empty-items fallback

Feature Box is now implemented in the note below.

## Feature Box Component Implementation Note

The Feature Box component has been implemented as the seventh Phase 3 reusable component.

It supports:

- default feature content
- icon feature usage
- media slot usage
- compact/default/spacious densities
- surface tone variants
- centered or start alignment
- tag metadata
- status metadata
- action slot
- long-heading and dense-copy safety

Remaining Phase 3 components have not started.

## Storybook Plan

Component stories should validate canonical usage and important states.

Storybook should demonstrate:

- default usage
- sparse content
- dense content
- long-copy stress
- missing media where relevant
- accessibility states
- responsive behavior where layout matters
- interaction expectations for Accordion/Tabs

## Acceptance Criteria

Phase 3 planning is complete when:

- [x] Phase 3 planning doc exists
- [x] Component batch 1 scope is defined
- [x] Component API contracts are defined
- [x] Dependency map is defined
- [x] Accessibility expectations are defined
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

Phase 3 is active.

Component implementation has started with Card, Breadcrumbs, Pagination, Alert, Stats, Gallery, and Feature Box.

Do not close Phase 3 until Component Library Batch 1 is implemented, documented, validated in Storybook, and planning state agrees.

# Phase 4 — Component Library Batch 2

## Status

Active — Implementation Started

## Goal

Define and implement the second reusable component batch using completed foundations, primitives, layout patterns, and Batch 1 components.

## Why Now

Phase 3 established foundational reusable components.

Phase 4 can now build richer, more interactive, and more content-heavy components that depend on the lower-level system.

## Scope

Phase 4 covers the second reusable component batch:

- Carousel
- Testimonials
- Customer Logos
- Featured-In Logos
- Steps
- Forms
- Tables
- Pricing Tables
- Modals

## Not in Scope

- Section components
- Navigation sections
- Hero sections
- Footer sections
- CTA sections
- Feature rows
- Gallery index pages
- Demo pages
- Storybook productization as a dedicated phase
- Static data shape freeze
- Contentful
- CMS models
- Live data fetching

## Architecture Boundaries

- `src/components/ui/*` owns primitive UI elements.
- `src/components/patterns/*` owns reusable layout pattern abstractions.
- `src/components/components/*` owns reusable component-library components.
- `src/components/sections/*` remains reserved for section-level compositions.
- `src/content/*` remains a future content boundary only.
- Components must not know about raw CMS data.
- Component-specific stories should be colocated once implemented.
- Storybook remains the primary design-system workspace.

## Build Order

```txt
component contracts -> dependency map -> Carousel -> Testimonials -> Customer Logos -> Featured-In Logos -> Steps -> Forms -> Tables -> Pricing Tables -> Modals
```

## Dependency Principles

Phase 4 components should use existing system pieces:

- Text for typography
- Button for actions
- Image for media
- Tag for metadata
- Icon for decorative/functional icon slots
- StatusLabel for compact status messaging
- Input for field controls
- Row/Grid/SingleColumn/Sidebar/Magazine patterns when useful
- Card, Alert, Stats, Gallery, Accordion, and Tabs when useful

Phase 4 components should avoid:

- duplicating primitive behavior
- duplicating layout pattern logic
- hardcoding CMS-shaped data
- becoming section-specific too early
- implementing route/page behavior

## Component Contracts

### Carousel

Status: Implemented

Purpose:

Display a sequence of related content items with accessible navigation controls.

Depends on:

- Button
- Icon
- Card or custom item slots
- motion/focus tokens

Expected variants:

- basic carousel
- card carousel
- media carousel
- testimonial carousel if useful later

Accessibility expectations:

- Controls must have clear labels.
- Keyboard/focus behavior must be predictable.
- Motion should respect reduced-motion preferences.
- Auto-play should not be introduced by default.

Storybook coverage:

- default
- few items
- many items
- card items
- keyboard/focus guidance
- reduced-motion notes

Build order:

1

---

### Testimonials

Status: Implemented

Purpose:

Show customer/user quotes, endorsements, or proof statements.

Depends on:

- Text
- Image
- Card
- Grid/Row patterns
- Carousel later only if needed

Expected variants:

- single quote
- grid of quotes
- with avatar
- with company/role
- long quote

Accessibility expectations:

- Quote attribution must be clear.
- Avatar images need meaningful alt text unless decorative.
- Do not rely on logos alone for attribution.

Storybook coverage:

- single
- grid
- long quote
- missing avatar
- with company metadata

Build order:

2

---

### Customer Logos

Status: Implemented

Purpose:

Display customer or partner logos in a reusable layout.

Depends on:

- Image
- Row/Grid patterns

Expected variants:

- row
- grid
- dense
- monochrome-like presentation if supported visually

Accessibility expectations:

- Logo alt text should identify brand unless decorative.
- Decorative logo clouds must be intentionally marked decorative.

Storybook coverage:

- row
- grid
- many logos
- missing logo fallback
- decorative logo guidance

Build order:

3

---

### Featured-In Logos

Status: Implemented

Purpose:

Display press, publication, or featured-in logos separately from customer logos.

Depends on:

- Image
- Row/Grid patterns
- Text for heading/context if needed

Expected variants:

- row
- grid
- compact
- with heading/context

Accessibility expectations:

- Publication logo alt text should identify source unless decorative.
- Should not be confused with customer logos.

Storybook coverage:

- row
- grid
- compact
- with context
- accessibility notes

Build order:

4

---

### Steps

Status: Implemented

Purpose:

Show process, sequence, onboarding flow, or ordered guidance.

Depends on:

- Text
- Icon
- Row/Grid/SingleColumn patterns

Expected variants:

- numbered steps
- icon steps
- vertical steps
- compact steps
- long-copy step

Accessibility expectations:

- Sequence must be clear without visual styling alone.
- Ordered list semantics should be considered where appropriate.

Storybook coverage:

- 3 steps
- 5 steps
- vertical
- with icons
- long-copy step
- responsive behavior

Build order:

5

---

### Forms

Status: Implemented

Purpose:

Compose Input, Button, Alert, and field guidance into reusable form surfaces.

Depends on:

- Input
- Button
- Alert
- Text
- SingleColumn/Grid patterns

Expected variants:

- basic form
- contact form
- inline form
- error state
- success state
- disabled/loading submit

Accessibility expectations:

- Labels required.
- Error messaging must connect to fields.
- Submit state must be clear.
- Avoid adding real validation logic unless intentionally scoped.

Storybook coverage:

- default
- contact form
- error state
- success state
- loading/disabled submit
- accessibility notes

Build order:

6

---

### Tables

Status: Implemented

Purpose:

Display structured comparative or tabular data.

Depends on:

- Text
- StatusLabel
- Tag
- Button, optional

Expected variants:

- simple table
- dense table
- responsive overflow
- with status
- with actions

Accessibility expectations:

- Use table semantics where data is tabular.
- Headers must be meaningful.
- Responsive behavior must preserve readability.

Storybook coverage:

- default
- dense
- responsive overflow
- with status
- long cell content

Build order:

7

---

### Pricing Tables

Status: Planned

Purpose:

Compare plans, prices, features, and actions.

Depends on:

- Card
- Table or Grid pattern
- Button
- Tag
- StatusLabel
- Text

Expected variants:

- 2 plans
- 3 plans
- featured plan
- dense feature list
- compact comparison

Accessibility expectations:

- Plan comparison must remain readable.
- Featured plan must not rely only on visual emphasis.
- Actions must be accessible.

Storybook coverage:

- default
- featured plan
- long feature list
- compact
- responsive behavior

Build order:

8

---

### Modals

Status: Planned

Purpose:

Display focused layered content or confirmation flows.

Depends on:

- Button
- Text
- Focus management
- motion/focus tokens

Expected variants:

- basic modal
- confirmation modal
- form modal
- long content

Accessibility expectations:

- Focus trap required.
- Escape close behavior must be defined.
- Dialog semantics required.
- Background content should not be reachable while open.
- This component should be scoped carefully.

Storybook coverage:

- default
- confirmation
- form modal
- long content
- keyboard/focus guidance

Build order:

9

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
- interaction expectations for Carousel, Forms, and Modals

## Acceptance Criteria

Phase 4 planning is complete when:

- [x] Phase 4 planning doc exists
- [x] Component batch 2 scope is defined
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

Phase 4 is active.

## Carousel Component Implementation Note

The Carousel component has been implemented as the first Phase 4 reusable component.

It supports:

- labeled carousel region
- previous/next controls
- disabled boundary states
- current slide state
- status text
- gap variants
- item-per-view variants
- card/media/custom item content
- empty-items fallback
- no autoplay by default

Testimonials is now implemented in the note below.

## Testimonials Component Implementation Note

The Testimonials component has been implemented as the second Phase 4 reusable component.

It supports:

- grid testimonials
- single quote layout
- featured quote layout
- avatar usage
- missing-avatar safety
- long-quote safety
- attribution metadata
- tag metadata
- empty-items fallback
- optional Carousel composition in Storybook

Customer Logos is now implemented in the note below.

## Customer Logos Component Implementation Note

The Customer Logos component has been implemented as the third Phase 4 reusable component.

It supports:

- row, grid, and dense layouts
- column variants
- density variants
- plain/subtle/card tones
- optional heading and description
- visible brand names
- linked logo items
- decorative logo-cloud behavior
- missing-logo fallback
- empty-items fallback

Featured-In Logos is now implemented in the note below.

## Featured-In Logos Component Implementation Note

The Featured-In Logos component has been implemented as the fourth Phase 4 reusable component.

It supports:

- row, grid, and compact layouts
- column variants
- density variants
- plain/subtle/card/editorial tones
- optional heading and description
- visible source names
- linked logo items
- decorative logo-strip behavior
- missing-logo fallback
- empty-items fallback

Steps is now implemented in the note below.

## Steps Component Implementation Note

The Steps component has been implemented as the fifth Phase 4 reusable component.

It supports:

- ordered-list semantics
- numbered steps
- icon steps
- plain steps
- vertical, horizontal, and responsive layouts
- compact/default/spacious densities
- current/complete/disabled/default statuses
- metadata and actions slots
- long-copy safety
- empty-items fallback

Forms is now implemented in the note below.

## Forms Component Implementation Note

The Forms component has been implemented as the sixth Phase 4 reusable component.

It supports:

- stacked, grid, and inline form layouts
- compact/default/spacious densities
- default/subtle/outline tones
- title and description content
- passed field nodes
- form-level status messages
- actions slot
- footer/disclaimer content
- disabled form behavior
- helper/error/success Storybook states

Tables is now implemented in the note below.

## Tables Component Implementation Note

The Tables component has been implemented as the seventh Phase 4 reusable component.

It supports:

- semantic table markup
- title and description
- caption
- configurable columns
- custom cell rendering
- compact/default/spacious densities
- default/subtle/outline tones
- striped rows
- responsive overflow behavior
- status/tag/action cell content
- long-cell content safety
- empty-row fallback

Remaining Phase 4 components have not started.

Do not close Phase 4 until Component Library Batch 2 is implemented, documented, validated in Storybook, and planning state agrees.

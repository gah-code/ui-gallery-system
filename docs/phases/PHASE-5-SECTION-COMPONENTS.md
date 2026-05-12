# Phase 5 — Section Components

## Status

Active — Implementation Started

## Goal

Define and implement reusable section-level compositions using completed foundations, primitives, layout patterns, and component-library components.

## Why Now

Phases 1–4 established the system foundation:

- primitives
- layout patterns
- reusable component-library components

Phase 5 can now compose those pieces into route-level section surfaces without reinventing lower-level UI contracts.

## Scope

Phase 5 covers section-level components:

- Navigation
- Hero
- Footer
- CTA Section
- Feature Row

## Not in Scope

- Gallery index pages
- Demo pages
- Storybook productization as a dedicated phase
- Static data shape freeze
- Contentful
- CMS models
- Live data fetching
- Full page templates
- Route ownership

## Architecture Boundaries

- `src/components/sections/*` owns section-level compositions.
- `src/components/components/*` owns reusable component-library components.
- `src/components/patterns/*` owns reusable layout abstractions.
- `src/components/ui/*` owns primitive UI elements.
- `src/styles/*` owns tokens, base styles, and global rhythm.
- `src/content/*` remains a future content boundary only.
- Sections must not consume raw CMS data.
- Sections should accept render-safe props or static fixtures.
- Section-specific stories should be colocated once implemented.
- Storybook remains the primary design-system workspace.

## Build Order

```txt
section contracts -> dependency map -> Navigation -> Hero -> Footer -> CTA Section -> Feature Row
```

## Dependency Principles

Sections should compose existing system pieces:

- Text for typography
- Button for actions
- Image for media
- Tag and StatusLabel for metadata/status
- Row, Grid, SingleColumn, Sidebar, Magazine, ZPattern, FPattern, Asymmetric for layout
- Card, FeatureBox, Stats, Gallery, Testimonials, CustomerLogos, FeaturedInLogos, Forms, Steps, and other components where useful

Sections should avoid:

- duplicating primitive behavior
- duplicating layout pattern logic
- hardcoding CMS-shaped data
- becoming route/page templates
- owning app shell concerns
- becoming one-off designs without reusable contracts

## Section Contracts

### Navigation

Status: Implemented

Purpose:

Provide primary site navigation, brand entry point, and optional primary action.

Depends on:

- Text
- Button
- Icon, optional
- Row or custom layout
- future routing/link conventions

Expected variants:

- default
- minimal
- with primary action
- many links
- compact/mobile guidance

Accessibility expectations:

- Use `nav` landmark.
- Provide accessible label when needed.
- Link text should be descriptive.
- Current page state should be supported if useful.
- Mobile/menu behavior should be scoped carefully and not overbuilt unless required.

Storybook coverage:

- default
- minimal
- with CTA
- many links
- current page state
- responsive behavior notes

Build order:

1

---

### Hero

Status: Implemented

Purpose:

Introduce a page or major content surface with headline, supporting copy, actions, and optional media.

Depends on:

- Text
- Button
- Image
- Tag
- StatusLabel
- SingleColumn
- Magazine
- Asymmetric
- Stats or FeatureBox where useful

Expected variants:

- text-only
- with media
- centered
- split
- with metadata/status
- long-copy stress

Accessibility expectations:

- Heading semantics must be preserved.
- Media needs meaningful alt text or decorative intent.
- Actions need accessible labels.
- Layout must not obscure heading hierarchy.

Storybook coverage:

- default
- text only
- with media
- centered
- split
- long copy
- missing media
- responsive contract

Build order:

2

---

### Footer

Status: Implemented

Purpose:

Close the page with secondary navigation, metadata, legal/social links, and optional short brand statement.

Depends on:

- Text
- Button/link conventions
- Row/Grid/SingleColumn
- Icon, optional

Expected variants:

- minimal
- multi-column
- with social links
- with legal links
- long link groups

Accessibility expectations:

- Use semantic footer element where appropriate.
- Link groups should have clear headings.
- Social/icon links need accessible names.
- Legal/metadata text should remain readable.

Storybook coverage:

- minimal
- multi-column
- social links
- legal links
- long link groups
- responsive behavior

Build order:

3

---

### CTA Section

Status: Implemented

Purpose:

Drive a focused action within or near the end of a page.

Depends on:

- Text
- Button
- SingleColumn
- Asymmetric or Magazine where useful
- Forms or Alert where useful only if scoped

Expected variants:

- centered
- split
- compact
- with secondary action
- long-copy stress

Accessibility expectations:

- Heading and action relationship should be clear.
- Buttons/links must be accessible.
- Section should not become a full form flow unless explicitly scoped.

Storybook coverage:

- default
- centered
- split
- two actions
- long copy
- responsive contract

Build order:

4

---

### Feature Row

Status: Implemented

Purpose:

Display a row or grid of related features using existing FeatureBox/Card components.

Depends on:

- FeatureBox
- Card, optional
- Row/Grid
- Text
- Button, optional

Expected variants:

- 2 features
- 3 features
- 4 features
- with icons
- with actions
- sparse content
- long-copy feature

Accessibility expectations:

- Feature meaning should be text-based.
- Icons should be supplemental.
- If actions are present, each action destination should be clear.

Storybook coverage:

- default
- 2-up
- 3-up
- 4-up
- with icons
- with actions
- long-copy stress
- responsive behavior

Build order:

5

## Storybook Plan

Section stories should validate realistic page-level content states.

Storybook should demonstrate:

- default usage
- sparse content
- dense content
- long-copy stress
- missing media where relevant
- responsive behavior
- accessibility expectations
- section composition boundaries
- realistic content, not only ideal demos

## Acceptance Criteria

Phase 5 planning is complete when:

- [x] Phase 5 planning doc exists
- [x] Section scope is defined
- [x] Section API contracts are defined
- [x] Dependency map is defined
- [x] Responsive section contracts are defined
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

Phase 5 is active.

All planned Phase 5 section components are now implemented in the notes below.

## Navigation Section Implementation Note

The Navigation section has been implemented as the first Phase 5 section component.

It supports:

- semantic nav landmark
- brand area
- primary links
- current page state
- optional action area
- default/minimal/centered variants
- compact/default/spacious densities
- wrapping responsive behavior
- no-links fallback

Hero is now implemented in the note below.

## Hero Section Implementation Note

The Hero section has been implemented as the second Phase 5 section component.

It supports:

- semantic section rendering
- default/centered/split/media variants
- compact/default/spacious densities
- controlled content width
- eyebrow metadata
- status label
- tags
- actions
- media slot
- footer slot
- content-only fallback when media is missing
- responsive split behavior

Footer is now implemented in the note below.

## Footer Section Implementation Note

The Footer section has been implemented as the third Phase 5 section component.

It supports:

- semantic footer rendering
- brand area
- optional brand statement
- grouped footer links
- social/action links
- legal links
- metadata/copyright
- minimal/multi-column/centered variants
- compact/default/spacious densities
- long-link-group safety
- responsive stacking behavior

CTA Section is now implemented in the note below.

## CTA Section Implementation Note

The CTA Section has been implemented as the fourth Phase 5 section component.

It supports:

- semantic section rendering
- centered, split, and compact variants
- default/subtle/raised/outline/brand tones
- compact/default/spacious densities
- controlled content width
- framed surface option
- eyebrow metadata
- status label
- tags
- actions
- support slot
- footer slot
- long-copy safety
- responsive split behavior

Feature Row is now implemented in the note below.

## Feature Row Section Implementation Note

The Feature Row section has been implemented as the fifth and final Phase 5 section component.

It supports:

- semantic section rendering
- section header content
- eyebrow metadata
- status label
- tags
- section actions
- feature grid/row/centered variants
- auto/two/three/four column configurations
- compact/default/spacious densities
- FeatureBox-based feature items
- feature icons/media/actions
- long-copy safety
- empty-state fallback
- responsive stacking behavior

All planned Phase 5 section components are now implemented.

Phase 5 is not closed until planning docs, Storybook coverage, and verification are reviewed together.

Do not close Phase 5 until section components are implemented, documented, validated in Storybook, and planning state agrees.

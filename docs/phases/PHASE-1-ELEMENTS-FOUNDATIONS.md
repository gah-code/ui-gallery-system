# Phase 1 — Elements + Foundations

## Status

Active — Primitive implementation in progress

## Goal

Define and implement the foundational UI layer that future layout patterns, components, sections, gallery pages, and Storybook documentation will depend on.

## Why Now

The project needs stable foundations before layout patterns and reusable components are built.

Phase 1 creates the visual and interaction grammar of the system:

- tokens
- base styles
- typography roles
- primitive element contracts
- Storybook foundation documentation

## Scope

### Foundations

- color tokens
- typography tokens
- spacing tokens
- radius tokens
- shadow tokens
- motion tokens
- focus tokens
- surface/background rules
- base/global style entry points

### Primitive Elements

- Text
- Button
- Image
- Tag
- Input
- Icon
- Status label

### Storybook Foundations

- tokens overview
- typography roles
- spacing/rhythm
- surfaces/backgrounds
- focus states
- primitive usage guidance

## Not in Scope

- Layout patterns
- Cards
- Navigation
- Hero sections
- Footer sections
- Gallery index
- Contentful
- CMS models
- Live data fetching
- Final app page composition

## Architecture Boundaries

- `src/styles/*` owns tokens, base styles, and global rhythm.
- `src/components/ui/*` owns primitive UI contracts.
- `src/stories/foundations/*` owns cross-cutting Storybook foundation docs.
- Components must not import raw CMS data.
- `src/content/*` remains a future content boundary only.

## Build Order

```txt
foundation tokens -> base styles -> typography roles -> primitive API contracts -> primitive implementation -> foundation Storybook docs -> primitive Storybook docs
```

## Implementation Note

Foundation implementation started with token files, base/global styles, typography roles, and Storybook foundation docs.

Text primitive implementation has started the primitive component sequence.

Button primitive implementation is complete.

Image primitive implementation is complete.

Tag primitive implementation is complete.

Input primitive implementation is complete.

Icon primitive implementation is complete.

Status Label primitive has not started yet.

## Text Primitive Implementation Note

The Text primitive has been implemented as the first primitive element.

It uses:

- typography role classes
- token-driven tones
- semantic `as` rendering
- alignment variants
- colocated Storybook coverage

Button, Image, Tag, Input, and Icon are now implemented. Status Label has not started.

## Button Primitive Implementation Note

The Button primitive has been implemented as the second primitive element.

It supports:

- variants
- sizes
- disabled state
- loading state
- optional icons
- full-width behavior
- native button rendering
- link rendering through `href`

Image, Tag, Input, and Icon are now implemented. Status Label has not started.

## Image Primitive Implementation Note

The Image primitive has been implemented as the third primitive element.

It supports:

- responsive image rendering
- aspect-ratio variants
- object-fit variants
- radius variants
- missing-image fallback
- decorative image usage

Tag, Input, and Icon are now implemented. Status Label has not started.

## Tag Primitive Implementation Note

The Tag primitive has been implemented as the fourth primitive element.

It supports:

- semantic variants
- size variants
- shape variants
- optional icons
- long-label handling
- status/category/metadata usage

Input and Icon are now implemented. Status Label has not started.

## Input Primitive Implementation Note

The Input primitive has been implemented as the fifth primitive element.

It supports:

- labels
- helper text
- error text
- disabled state
- required state
- size variants
- textarea/multiline mode
- accessible descriptions

Icon is now implemented. Status Label has not started.

## Icon Primitive Implementation Note

The Icon primitive has been implemented as the sixth primitive element.

It supports:

- size variants
- tone variants
- decorative icon usage
- functional icon usage with labels
- inline SVG/content wrapping

Status Label remains the final Phase 1 primitive.

## Token Categories

### Color Tokens

Purpose:

- brand colors
- neutral colors
- surface colors
- text colors
- border colors
- status colors

Initial token groups:

- `color.brand`
- `color.neutral`
- `color.surface`
- `color.text`
- `color.border`
- `color.status.success`
- `color.status.warning`
- `color.status.error`
- `color.status.info`

### Typography Tokens

Purpose:

- font families
- font sizes
- line heights
- font weights
- letter spacing
- readable measure

Initial token groups:

- `font.family`
- `font.size`
- `font.weight`
- `font.lineHeight`
- `font.letterSpacing`
- `font.measure`

### Spacing Tokens

Purpose:

- layout rhythm
- component padding
- stack gaps
- inline gaps
- section spacing later

Initial token groups:

- `space.0`
- `space.1`
- `space.2`
- `space.3`
- `space.4`
- `space.5`
- `space.6`
- `space.8`
- `space.10`
- `space.12`
- `space.16`

### Radius Tokens

Purpose:

- consistent corner styles

Initial token groups:

- `radius.none`
- `radius.sm`
- `radius.md`
- `radius.lg`
- `radius.xl`
- `radius.full`

### Shadow Tokens

Purpose:

- depth and elevation

Initial token groups:

- `shadow.none`
- `shadow.sm`
- `shadow.md`
- `shadow.lg`

### Motion Tokens

Purpose:

- consistent transitions
- reduced-motion-safe behavior

Initial token groups:

- `motion.duration.fast`
- `motion.duration.base`
- `motion.duration.slow`
- `motion.easing.standard`

### Focus Tokens

Purpose:

- accessible and consistent keyboard focus styling

Initial token groups:

- `focus.ring.color`
- `focus.ring.width`
- `focus.ring.offset`

## Primitive API Contracts

### Text

Status: Implemented

Purpose:

Render semantic text with system typography roles.

Expected props:

- `as`
- `variant`
- `tone`
- `align`
- `children`
- `className`

Expected variants:

- `display`
- `heading`
- `subheading`
- `body`
- `caption`
- `label`
- `metadata`

Accessibility notes:

- Preserve semantic HTML.
- Do not choose heading levels purely for visual size.

Storybook coverage:

- default
- all variants
- long copy
- responsive rhythm example

---

### Button

Status: Implemented

Purpose:

Render accessible actions and links with consistent states.

Expected props:

- `variant`
- `size`
- `disabled`
- `loading`
- `icon`
- `iconPosition`
- `children`
- `className`

Expected variants:

- `primary`
- `secondary`
- `ghost`
- `link`

Expected sizes:

- `sm`
- `md`
- `lg`

Accessibility notes:

- Real buttons for actions.
- Links for navigation.
- Loading state should preserve label context.
- Focus must be visible.

Storybook coverage:

- variants
- sizes
- disabled
- loading
- with icon

---

### Image

Status: Implemented

Purpose:

Render responsive images with consistent aspect-ratio and fallback behavior.

Expected props:

- `src`
- `alt`
- `aspectRatio`
- `fit`
- `radius`
- `loading`
- `decorative`
- `fallback`
- `className`
- `imageClassName`

Expected variants:

- default
- auto
- square
- wide
- portrait
- video
- logo-safe

Expected fit options:

- `cover`
- `contain`
- `fill`

Expected radius options:

- `none`
- `sm`
- `md`
- `lg`
- `xl`
- `full`

Accessibility notes:

- Require meaningful `alt` text unless decorative.
- Decorative images should use empty alt text intentionally.

Storybook coverage:

- default
- aspect ratios
- missing image fallback
- decorative image guidance

---

### Tag

Status: Implemented

Purpose:

Render category, status, or metadata pills.

Expected props:

- `as`
- `variant`
- `size`
- `shape`
- `icon`
- `children`
- `className`

Expected variants:

- `neutral`
- `brand`
- `success`
- `warning`
- `error`
- `info`

Expected sizes:

- `sm`
- `md`

Expected shapes:

- `default`
- `pill`

Accessibility notes:

- Status tags should not rely on color alone.
- Use readable text labels.
- Tags are not interactive in this phase.

Storybook coverage:

- all variants
- sizes and shapes
- long label
- multiple tags
- status examples
- optional icon

---

### Input

Status: Implemented

Purpose:

Render accessible form controls with consistent label, helper, and error patterns.

Expected props:

- `id`
- `label`
- `type`
- `value`
- `placeholder`
- `helperText`
- `error`
- `disabled`
- `required`
- `size`
- `multiline`
- `rows`
- `className`
- `controlClassName`

Expected sizes:

- `sm`
- `md`
- `lg`

Expected states:

- default
- focus
- disabled
- error
- required
- with helper text

Accessibility notes:

- Labels required.
- Error text should be programmatically associated with field.
- Required state should not rely only on visual decoration.

Storybook coverage:

- default
- sizes
- helper text
- error
- disabled
- required
- multiline
- no-label guidance

---

### Icon

Status: Implemented

Purpose:

Provide a consistent wrapper contract for decorative or functional icons.

Expected props:

- `children`
- `size`
- `tone`
- `decorative`
- `label`
- `className`

Expected sizes:

- `sm`
- `md`
- `lg`
- `xl`

Expected tones:

- `current`
- `primary`
- `secondary`
- `muted`
- `inverse`
- `brand`
- `success`
- `warning`
- `error`
- `info`

Accessibility notes:

- Decorative icons should be hidden from assistive technology.
- Functional icon-only usage needs a label.
- Functional icons should use `decorative={false}` and provide `label`.

Storybook coverage:

- decorative
- functional
- tones
- icon-only guidance
- size examples

---

### Status Label

Status: Not started

Purpose:

Communicate status using text, icon, and tone.

Expected props:

- `status`
- `children`
- `icon`
- `className`

Expected statuses:

- `success`
- `warning`
- `error`
- `info`
- `neutral`

Accessibility notes:

- Do not rely on color alone.
- Use clear text labels.

Storybook coverage:

- all statuses
- with icon
- long message
- compact usage

## Storybook Foundation Plan

Foundation stories should live in:

```txt
src/stories/foundations/
```

Planned foundation stories:

- `Tokens.stories.tsx`
- `Typography.stories.tsx`
- `Spacing.stories.tsx`
- `Surfaces.stories.tsx`
- `FocusStates.stories.tsx`

Primitive stories should be colocated with primitive components later.

## Acceptance Criteria

Phase 1 planning is complete when:

- [x] Phase 1 planning doc exists
- [x] Token categories are defined
- [x] Primitive API contracts are defined
- [x] Storybook foundation plan is defined
- [x] Architecture boundaries remain intact
- [x] Contentful remains deferred
- [x] TASKS.md reflects the next implementation step
- [x] Foundation token files are implemented
- [x] Base/global styles are implemented
- [x] Typography role styles are implemented
- [x] Foundation Storybook docs are implemented
- [x] Text primitive is implemented
- [x] Button primitive is implemented
- [x] Image primitive is implemented
- [x] Tag primitive is implemented
- [x] Input primitive is implemented
- [x] Icon primitive is implemented
- [x] Verification commands pass

## Verification Commands

```bash
nvm use
npm run build
npm run build-storybook
npm run lint
```

## Closeout / Reopen Notes

Phase 1 is active.

This document now tracks foundation implementation progress.

Do not close Phase 1 until foundations and primitive elements are implemented, documented, and verified.

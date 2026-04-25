# Phase 1 — Elements + Foundations

## Status

Active — Planning

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
- Input
- Tag
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

Purpose:

Render responsive images with consistent aspect-ratio and fallback behavior.

Expected props:

- `src`
- `alt`
- `aspectRatio`
- `fit`
- `loading`
- `className`

Expected variants:

- default
- square
- wide
- portrait
- logo-safe

Accessibility notes:

- Require meaningful `alt` text unless decorative.
- Decorative images should use empty alt text intentionally.

Storybook coverage:

- default
- aspect ratios
- missing image fallback
- decorative image guidance

---

### Input

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
- `className`

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
- helper text
- error
- disabled
- required

---

### Tag

Purpose:

Render category, status, or metadata pills.

Expected props:

- `variant`
- `size`
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

Accessibility notes:

- Status tags should not rely on color alone.
- Use readable text labels.

Storybook coverage:

- all variants
- long label
- multiple tags
- status examples

---

### Icon

Purpose:

Provide a consistent wrapper contract for decorative or functional icons.

Expected props:

- `name` or `children`
- `size`
- `tone`
- `decorative`
- `label`
- `className`

Expected sizes:

- `sm`
- `md`
- `lg`

Accessibility notes:

- Decorative icons should be hidden from assistive technology.
- Functional icon-only usage needs a label.

Storybook coverage:

- decorative
- functional
- icon-only guidance
- size examples

---

### Status Label

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

This document currently defines planning and contracts only.

Do not close Phase 1 until foundations and primitive elements are implemented, documented, and verified.

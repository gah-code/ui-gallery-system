# Foundations

## Purpose

Foundations define the shared visual and interaction grammar of the UI system.

They should be stable before layout patterns, reusable components, and sections are built.

## Foundation Ownership

| Foundation Area | Owner |
|---|---|
| Tokens | `src/styles/*` |
| Base styles | `src/styles/*` |
| Typography roles | `src/styles/*` and `src/components/ui/Text` later |
| Primitive contracts | `src/components/ui/*` |
| Foundation stories | `src/stories/foundations/*` |

## Token Categories

- Color
- Typography
- Spacing
- Radius
- Shadow
- Motion
- Focus

## Implemented Foundation Files

- `src/styles/tokens.css.ts`
- `src/styles/global.css.ts`
- `src/styles/typography.css.ts`
- `src/styles/index.ts`

## Foundation Storybook Docs

- `src/stories/foundations/Tokens.stories.tsx`
- `src/stories/foundations/Typography.stories.tsx`
- `src/stories/foundations/Spacing.stories.tsx`
- `src/stories/foundations/Surfaces.stories.tsx`
- `src/stories/foundations/FocusStates.stories.tsx`

## Implemented Primitive Consumers

- `src/components/ui/Text`
- `src/components/ui/Button`
- `src/components/ui/Image`
- `src/components/ui/Tag`
- `src/components/ui/Input`
- `src/components/ui/Icon`
- `src/components/ui/StatusLabel`

## Phase 1 Completion Note

The foundation layer is implemented and accepted for Phase 1 closeout.

Implemented foundation files:

- `src/styles/tokens.css.ts`
- `src/styles/global.css.ts`
- `src/styles/typography.css.ts`
- `src/styles/index.ts`

Implemented primitive consumers:

- `src/components/ui/Text`
- `src/components/ui/Button`
- `src/components/ui/Image`
- `src/components/ui/Tag`
- `src/components/ui/Input`
- `src/components/ui/Icon`
- `src/components/ui/StatusLabel`

## Base Style Expectations

Base styles should define:

- document defaults
- box sizing
- body background
- text rendering
- link defaults
- image defaults
- reduced-motion behavior
- focus visibility

## Storybook Role

Storybook is the primary design-system workspace.

Storybook should validate:

- token usage
- typography rhythm
- spacing scale
- surface rules
- focus states
- primitive states

## Not in Scope Yet

- Layout patterns
- Cards
- Sections
- Gallery pages
- Contentful

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

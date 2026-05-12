# Sections

## Purpose

Sections are route-level composition surfaces built from foundations, primitives, layout patterns, and reusable components.

They should be reusable enough for page assembly, but not so broad that they become full page templates.

## Ownership

| Area | Owner |
|---|---|
| Primitive elements | `src/components/ui/*` |
| Layout patterns | `src/components/patterns/*` |
| Reusable components | `src/components/components/*` |
| Section components | `src/components/sections/*` |
| Section stories | colocated with implemented sections |

## Dependency Rule

Sections may compose:

- foundations
- primitives
- layout patterns
- component-library components

Sections should not depend on:

- raw CMS data
- page routes
- Contentful response shapes
- app shell ownership
- one-off route-only assumptions

## Phase 5 Section Scope

- Navigation
- Hero
- Footer
- CTA Section
- Feature Row

## Implemented Sections

- `src/components/sections/Navigation`
- `src/components/sections/Hero`
- `src/components/sections/Footer`
- `src/components/sections/CTASection`
- `src/components/sections/FeatureRow`

## Roadmap

Phase 5 is complete. Phase 6 — Gallery Index + Demo Pages is active for planning before implementation.

## Phase 5 Completion Note

All planned section components have been implemented and accepted for Phase 5 closeout.

Implemented sections:

- `src/components/sections/Navigation`
- `src/components/sections/Hero`
- `src/components/sections/Footer`
- `src/components/sections/CTASection`
- `src/components/sections/FeatureRow`

## Storybook Role

Storybook should validate:

- realistic section content
- responsive behavior
- sparse content
- dense content
- long-copy behavior
- missing media/content states
- accessibility expectations
- section composition boundaries

## Not in Scope Yet

- Gallery/demo pages
- Static data shape freeze
- Contentful
- Full route templates

# Layout Patterns

## Purpose

Layout patterns define reusable spatial contracts for arranging primitives, components, and sections.

They should stabilize before richer reusable components are built.

## Ownership

| Area | Owner |
|---|---|
| Pattern components | `src/components/patterns/*` |
| Pattern Storybook docs | `src/stories/patterns/*` and colocated stories later |
| Tokens and rhythm | `src/styles/*` |
| Primitive content | `src/components/ui/*` |

## Build Order

```txt
row -> grid -> single-column -> sidebar -> multi-column/magazine -> Z-pattern -> F-pattern -> asymmetry/experimental
```

## Layout Principles

- Start stacked on small screens.
- Introduce columns only when content can remain readable.
- Prefer readable rhythm over visual density.
- Avoid horizontal scroll as a default layout fix.
- Avoid equal-width layouts where content needs more breathing room.
- Patterns should not know about CMS data.
- Patterns should compose children; they should not own business content.
- Storybook should validate responsive behavior and content stress.

## Planned Patterns

- Row
- Grid
- SingleColumn
- Sidebar
- Magazine
- ZPattern
- FPattern
- Asymmetric

## Implemented Patterns

- `src/components/patterns/Row`
- `src/components/patterns/Grid`
- `src/components/patterns/SingleColumn`
- `src/components/patterns/Sidebar`
- `src/components/patterns/Magazine`
- `src/components/patterns/ZPattern`
- `src/components/patterns/FPattern`

## Not in Scope Yet

- Card components
- Section components
- Gallery index pages
- Contentful

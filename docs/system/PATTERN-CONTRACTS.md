# Pattern Contracts

## Purpose

Pattern contracts define the expected behavior of reusable layout abstractions before implementation.

## Contract Rules

- Patterns own layout, spacing, and responsive structure.
- Patterns do not own business content.
- Patterns should accept children or simple layout slots.
- Patterns should compose primitives and future components without knowing about CMS data.
- Patterns should remain useful in both app surfaces and Storybook.
- Pattern stories should validate realistic content density and responsive behavior.

## Implementation Order

```txt
Row -> Grid -> SingleColumn -> Sidebar -> Magazine -> ZPattern -> FPattern -> Asymmetric
```

## Pattern List

### Row

Status: Implemented

Primary role:

Small horizontal or wrapping group layout.

### Grid

Status: Implemented

Primary role:

Responsive repeatable item layout.

### SingleColumn

Status: Implemented

Primary role:

Readable stacked content layout.

### Sidebar

Status: Implemented

Primary role:

Main content plus supporting side content.

### Magazine

Status: Planned

Primary role:

Mixed-width editorial layout.

### ZPattern

Status: Planned

Primary role:

Alternating visual/text journey layout.

### FPattern

Status: Planned

Primary role:

Scan-friendly content-heavy hierarchy.

### Asymmetric

Status: Planned

Primary role:

Intentional uneven layout with safe responsive fallback.

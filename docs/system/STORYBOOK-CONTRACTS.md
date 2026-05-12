# Storybook Contracts

## Purpose

Storybook contracts define how stories should be organized, named, documented, and reviewed before productization work begins.

## Contract Rules

- Storybook remains the primary design-system workspace.
- Story files should stay colocated with implemented UI pieces where practical.
- Cross-cutting documentation stories may live under `src/stories/*`.
- Storybook stories should not rely on CMS data.
- Storybook stories should use realistic static demo data.
- Story names should be stable and descriptive.
- Accessibility notes should be included where behavior or semantics matter.
- Responsive and content stress states should be represented.

## Planned Productization Order

```txt
Information architecture review -> naming standardization -> documentation notes -> coverage gap audit -> accessibility audit -> interaction/state audit -> final Storybook productization review
```

## Information Architecture Status

Status: Implemented

Story hierarchy now follows:

- Foundations
- Primitives
- Layout Patterns
- Components / Batch 1
- Components / Batch 2
- Sections
- Gallery

## Naming Standards Status

Status: Planned for implementation

## Documentation Standards Status

Status: Planned for implementation

## Coverage Audit Status

Status: Initial audit implemented

## Accessibility Audit Status

Status: Initial audit implemented

## Interaction/State Audit Status

Status: Initial audit implemented

## Storybook Audit Status

Status: Implemented

Audit document:

- `docs/system/STORYBOOK-AUDIT.md`

The audit identifies current hierarchy, coverage strengths, coverage gaps, naming consistency, documentation notes, accessibility coverage, and interaction/state coverage.

No story renaming, moving, or rewriting was performed during the audit pass.

## Hierarchy Standardization Status

Status: Implemented

Story titles now use the standardized top-level hierarchy. Colocated story files remain in place, and confirmed starter `Example/*` artifacts were removed.

No component APIs were changed.

No MDX docs were added.

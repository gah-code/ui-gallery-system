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

Status: Implemented

Story names were reviewed and standardized around clear names such as:

- Default
- Variants
- Sizes
- States
- ResponsiveContract
- AccessibilityNotes
- LongCopyStress
- EmptyState
- MissingMedia
- WithActions
- WithMedia

## Documentation Standards Status

Status: Partially Implemented

Lightweight usage notes were reviewed/refined in story files where helpful.

MDX/docs surfaces have not been added yet.

## Coverage Audit Status

Status: Initial audit implemented

## Accessibility Audit Status

Status: Implemented

Accessibility coverage was reviewed across high-priority stories.

The review focused on:

- semantic HTML
- landmarks
- headings
- buttons and links
- forms
- tables
- dialogs
- tabs
- accordions
- carousels
- current-state semantics
- color/icon supplementation

## Interaction/State Audit Status

Status: Implemented

Interaction and state coverage was reviewed across high-priority stories.

The review focused on:

- disabled states
- loading states
- current/selected states
- expanded/collapsed states
- controlled/uncontrolled stories
- keyboard/focus guidance
- boundary states
- responsive state behavior

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

## Story Naming + Usage Notes Status

Status: Implemented

Story export names and lightweight usage notes were standardized where useful.

No story files were moved.

No component APIs were changed.

The accessibility coverage pass is complete and tracked separately in Accessibility Audit Status.

No interaction/state testing setup was completed in this step.

## Interaction / State Coverage Status

Status: Implemented

Interaction and state stories were reviewed/refined where useful.

No story files were moved.

No component APIs were changed.

No formal interaction test infrastructure was added.

MDX/docs surfaces have not been added yet.

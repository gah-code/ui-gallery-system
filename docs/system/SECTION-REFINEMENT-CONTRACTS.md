# Section Refinement Contracts

## Purpose

Section refinement contracts define how Phase 8 should evaluate section-level API and responsive refinements before changing implementation code.

## Status

Active — Phase 8

## Contract Rules

- Section API refinements should be evidence-driven.
- Responsive issues should be audited before patches are made.
- Existing section APIs should remain stable unless the audit identifies a clear need.
- Component APIs should not change as part of section responsive polish.
- Storybook remains the primary design-system workspace for responsive examples.
- App-side gallery/demo surfaces remain browsing and comparison aids.
- Contentful remains deferred.

## Responsive Audit Relationship

Section contract refinements should be made only after the responsive audit identifies a clear need.

Current audit reference:

- `docs/system/RESPONSIVE-AUDIT.md`

No section API refinements were made during the audit pass.

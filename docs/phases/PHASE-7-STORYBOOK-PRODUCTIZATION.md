# Phase 7 — Storybook Productization

## Status

Active

## Goal

Make Storybook the polished system of record for the UI layer by standardizing story hierarchy, documentation patterns, coverage expectations, accessibility notes, and interaction/state validation.

## Why Now

Phases 1–6 built the complete UI system and app-side gallery/demo surfaces.

Storybook already exists and validates individual pieces, but Phase 7 should productize it into a more consistent design-system workspace.

## Scope

Phase 7 covers:

- Storybook information architecture
- story hierarchy review
- story naming standards
- story description and usage note standards
- MDX/docs surface planning
- coverage gap review
- accessibility review expectations
- interaction/state coverage review
- consistency across foundations, primitives, patterns, components, sections, and gallery/demo surfaces

## Not in Scope

- Building new UI primitives
- Building new layout patterns
- Building new components
- Building new sections
- Building gallery/demo pages
- Static data shape freeze
- Contentful
- CMS models
- Live data fetching

## Architecture Boundaries

- Storybook is the primary design-system workspace.
- App-side gallery/demo surfaces are browsing aids, not the Storybook source of truth.
- Component-specific stories should remain colocated.
- Cross-cutting foundation stories may remain in `src/stories/foundations`.
- Cross-cutting pattern/component/section overview stories may remain in `src/stories/*` where appropriate.
- Storybook productization should not change component APIs unless a defect is found and separately documented.
- Storybook productization should not introduce CMS assumptions.

## Build Order

```txt
storybook contracts -> information architecture -> naming standards -> documentation standards -> coverage audit -> accessibility audit -> interaction/state audit -> implementation passes
```

## Storybook Information Architecture

Planned top-level story groups:

- Foundations
- Primitives
- Layout Patterns
- Components / Batch 1
- Components / Batch 2
- Sections
- Gallery / Demo Surfaces
- System Notes, if useful

## Story Naming Standards

Stories should use clear, stable names:

- Default
- Variants
- Sizes
- States
- ResponsiveContract
- AccessibilityNotes
- LongCopyStress
- EmptyState
- WithActions
- WithMedia

Avoid unclear names such as:

- Test
- Example
- Stuff
- New
- Random

## Documentation Standards

Each major story file should communicate:

- what the component or surface is for
- what it composes
- important accessibility expectations
- important responsive expectations
- what is intentionally out of scope
- how it relates to Storybook versus app-side gallery/demo surfaces when relevant

## Coverage Expectations

Storybook should validate:

- canonical/default usage
- variants
- sizes/densities
- states
- long-copy stress
- empty/missing data states
- media fallback states
- responsive behavior
- accessibility expectations
- interaction behavior where relevant

## Accessibility Review Expectations

Audit stories for:

- visible focus states
- semantic roles and landmarks
- button/link correctness
- form label/error/helper behavior
- table semantics
- dialog semantics and focus behavior
- tabs/accordion semantics
- current-page/current-state semantics
- color/icon not being the only source of meaning

## Interaction/State Review Expectations

Audit interactive stories for:

- buttons/links
- inputs/forms
- pagination
- carousel controls
- accordion expansion
- tabs keyboard behavior
- modal open/close/focus behavior
- loading/disabled states where supported

## Acceptance Criteria

Phase 7 planning is complete when:

- [x] Phase 7 planning doc exists
- [x] Storybook information architecture is defined
- [x] story naming standards are defined
- [x] documentation standards are defined
- [x] coverage expectations are defined
- [x] accessibility review expectations are defined
- [x] interaction/state review expectations are defined
- [x] implementation order is confirmed
- [x] TASKS.md reflects the next implementation step
- [x] verification commands pass

## Verification Commands

```bash
nvm use
npm run build
npm run build-storybook
npm run lint
```

## Closeout / Reopen Notes

Phase 7 is active.

This document defines planning/contracts and tracks Phase 7 implementation notes.

Do not close Phase 7 until Storybook productization work is implemented, reviewed, documented, and planning state agrees.

## Storybook Hierarchy + Coverage Audit Implementation Note

The Storybook hierarchy and coverage audit has been completed as the first Phase 7 implementation pass.

The audit documents:

- current story structure
- foundation story coverage
- primitive story coverage
- layout pattern story coverage
- component story coverage
- section story coverage
- gallery/demo story coverage
- naming consistency
- documentation note coverage
- accessibility coverage
- interaction/state coverage
- recommended productization passes

No story files were renamed, moved, or rewritten during this pass.

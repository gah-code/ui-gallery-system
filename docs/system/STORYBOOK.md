# Storybook System

## Purpose

Storybook is the primary design-system workspace for the UI layer.

It validates and documents:

- foundations
- primitives
- layout patterns
- reusable components
- section components
- app-side gallery/demo surfaces when useful

## Ownership

| Area | Owner |
|---|---|
| Storybook configuration | `.storybook/*` |
| Foundation stories | `src/stories/foundations/*` |
| Pattern overview stories | `src/stories/patterns/*` |
| Component overview stories | `src/stories/components/*`, if present |
| Component-specific stories | colocated with component folders |
| Section-specific stories | colocated with section folders |

## Relationship to App Gallery

Storybook is the system of record for detailed UI states.

App-side gallery/demo surfaces are browsing aids.

Storybook should capture:

- API usage
- variants
- states
- accessibility expectations
- interaction behavior
- responsive stress cases

App-side gallery/demo surfaces should capture:

- browsing
- comparison
- high-level exploration
- realistic app-side demos

## Documentation Standards

Stories should include meaningful names and notes when relevant.

Important story types:

- Default
- Variants
- States
- ResponsiveContract
- AccessibilityNotes
- LongCopyStress
- EmptyState
- MissingMedia
- WithActions
- WithMedia

## Accessibility Standards

Stories should document accessibility expectations for:

- landmarks
- headings
- links/buttons
- forms
- tables
- dialogs
- tabs
- accordions
- carousels
- color/icon supplementation

## Interaction Standards

Interactive components should include stories for:

- default behavior
- disabled states
- keyboard behavior
- controlled/uncontrolled behavior where relevant
- focus behavior
- loading states where relevant

## Audit Note

The initial Storybook hierarchy and coverage audit is documented in:

- `docs/system/STORYBOOK-AUDIT.md`

## Hierarchy Standardization Note

Storybook hierarchy now follows:

- Foundations
- Primitives
- Layout Patterns
- Components / Batch 1
- Components / Batch 2
- Sections
- Gallery

Details are tracked in `docs/system/STORYBOOK-AUDIT.md`.

## Not in Scope

- CMS data
- Contentful integration
- production routing
- app analytics

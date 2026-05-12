# Section Contracts

## Purpose

Section contracts define expected API, dependencies, responsive behavior, accessibility expectations, and Storybook coverage before implementation.

## Contract Rules

- Sections compose primitives, layout patterns, and reusable components.
- Sections should not duplicate primitive behavior.
- Sections should not duplicate layout pattern contracts.
- Sections should not know about CMS data.
- Sections should not own route/page behavior.
- Section-specific stories should be colocated.
- Responsive behavior must be explicit.

## Implementation Order

```txt
Navigation -> Hero -> Footer -> CTASection -> FeatureRow
```

## Section Status

### Navigation

Status: Planned

Primary role:

Primary site navigation and brand/action entry point.

### Hero

Status: Planned

Primary role:

Page introduction with headline, copy, actions, and optional media.

### Footer

Status: Planned

Primary role:

Page close with secondary navigation, metadata, legal/social links.

### CTASection

Status: Planned

Primary role:

Focused action section.

### FeatureRow

Status: Planned

Primary role:

Row/grid of related features using FeatureBox/Card components.

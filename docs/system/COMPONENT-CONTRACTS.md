# Component Contracts

## Purpose

Component contracts define expected API, dependencies, accessibility behavior, and Storybook coverage before implementation.

## Contract Rules

- Components compose primitives and patterns.
- Components should not duplicate primitive behavior.
- Components should not duplicate layout pattern contracts.
- Components should not know about CMS data.
- Components should remain useful in app surfaces and Storybook.
- Component-specific stories should be colocated.
- Interactive components must define keyboard/focus behavior.

## Implementation Order

```txt
Card -> Breadcrumbs -> Pagination -> Alert -> Stats -> Gallery -> FeatureBox -> PreviewProfileCard -> Accordion -> Tabs
```

## Component Status

### Card

Status: Implemented

### Breadcrumbs

Status: Implemented

### Pagination

Status: Implemented

### Alert

Status: Implemented

### Stats

Status: Implemented

### Gallery

Status: Implemented

### FeatureBox

Status: Implemented

### PreviewProfileCard

Status: Planned

### Accordion

Status: Planned

### Tabs

Status: Planned

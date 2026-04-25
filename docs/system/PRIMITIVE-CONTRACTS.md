# Primitive Contracts

## Purpose

Primitive contracts define the expected API and behavior of the smallest reusable UI elements before implementation.

## Planning Status

These contracts are planning-only.

Primitive implementation has not started.

## Build Order

```txt
Text -> Button -> Image -> Tag -> Input -> Icon -> Status Label
```

## Contract Rules

- Primitives should be reusable.
- Primitives should not know about routes.
- Primitives should not know about CMS data.
- Primitives should expose clear semantic props.
- Primitives should preserve accessibility.
- Primitives should be documented in Storybook.
- Primitive-specific stories should be colocated with components once implemented.

## Primitive List

### Text

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Button

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Image

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Tag

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Input

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Icon

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Status Label

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

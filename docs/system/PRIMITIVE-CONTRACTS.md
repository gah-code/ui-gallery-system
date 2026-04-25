# Primitive Contracts

## Purpose

Primitive contracts define the expected API and behavior of the smallest reusable UI elements before implementation.

## Planning Status

These contracts guide primitive implementation.

Text and Button implementation have started the primitive sequence.

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

Status: Implemented

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Button

Status: Implemented

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Image

Status: Not started

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Tag

Status: Not started

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Input

Status: Not started

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Icon

Status: Not started

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

### Status Label

Status: Not started

See `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`.

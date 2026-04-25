# UI Gallery System

A UI-first, Storybook-centered, gallery/index-driven frontend system.

## Current Phase

Phase 2 — Layout Patterns

## Current Focus

Phase 2 layout pattern implementation:

- Row pattern complete
- Grid pattern next

## Phase 1 Status

Phase 1 — Elements + Foundations is complete.

The project now has:

- token foundations
- base/global styles
- typography roles
- foundation Storybook docs
- primitive UI elements for Text, Button, Image, Tag, Input, Icon, and Status Label

## Phase 0 Status

Phase 0 — Baseline + Gallery Inventory is complete.

The gallery inventory is currently provisional because no source-backed visual reference was found in the repo. This can be refined later when a design board or reference image is added.

## Project Direction

Build the UI system first.  
Defer Contentful until UI contracts are stable.

## Build Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Key Documents

- `TASKS.md`
- `docs/IMPLEMENTATION-ROADMAP.md`
- `docs/GALLERY-TAXONOMY.md`
- `docs/GALLERY-INVENTORY.md`
- `docs/phases/PHASE-0-BASELINE.md`
- `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`
- `docs/phases/PHASE-2-LAYOUT-PATTERNS.md`
- `docs/system/ARCHITECTURE.md`
- `docs/system/FOUNDATIONS.md`
- `docs/system/PRIMITIVE-CONTRACTS.md`
- `docs/system/LAYOUT-PATTERNS.md`
- `docs/system/PATTERN-CONTRACTS.md`

## Runtime

Use Node v22.12.0 for this project.

```bash
nvm use
npm install
```

The default shell Node may not be the correct runtime. Use `.nvmrc` before running Vite or Storybook commands.

## Development

```bash
npm run dev
npm run storybook
```

Storybook is the primary design-system workspace.

## Verification

```bash
npm run build
npm run build-storybook
npm run lint
```

## Contentful Status

Deferred.

Contentful should be introduced later through adapters and normalized UI data contracts.

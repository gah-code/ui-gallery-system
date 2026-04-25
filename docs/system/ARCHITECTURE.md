# Architecture Contract

## Runtime Requirement

Use Node v22.12.0 for this project.

```bash
nvm use
```

The default shell Node may not be the correct runtime. Use `.nvmrc` before running Vite or Storybook commands.

## Current Architecture Phase

Phase 2 — Layout Patterns is active.

Phase 2 planning/contracts are complete.

Layout implementation has started with `src/components/patterns/Row`, `src/components/patterns/Grid`, and `src/components/patterns/SingleColumn`.

Phase 1 — Elements + Foundations is complete.

Architecture boundaries remain:

- `src/styles/*` owns foundations.
- `src/components/ui/*` owns primitives.
- `src/components/patterns/*` owns reusable layout pattern abstractions.
- `src/components/sections/*` remains reserved for section-level compositions.
- `src/content/*` remains future content boundary only.
- Storybook remains the primary design-system workspace.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Ownership Map

```txt
src/components/ui        -> reusable primitives
src/components/patterns  -> layout/pattern abstractions
src/components/sections  -> section-level compositions
src/components/layout    -> shell/chrome/layout ownership
src/content              -> future content boundary, no CMS yet
src/data                 -> typed static fixtures later
src/styles               -> tokens, base styles, global rhythm
src/stories              -> foundation and cross-cutting Storybook docs
docs                     -> roadmap, phase records, taxonomy, architecture notes
```

## Ownership Boundaries

| Area | Owns | Does Not Own |
|---|---|---|
| `src/components/ui` | reusable primitives | route-level composition |
| `src/components/patterns` | layout/pattern abstractions | business content |
| `src/components/sections` | section composition | raw CMS data |
| `src/components/layout` | shell/chrome/page frame | individual component variants |
| `src/content` | future content boundary | current CMS integration |
| `src/data` | future typed fixtures | live CMS fetching |
| `src/styles` | tokens/base/global rhythm | component-specific visuals |
| `src/stories` | Storybook foundations and cross-cutting docs | app routes |
| `docs` | roadmap, phase records, architecture notes | implementation code |

## Current Foundation Ownership

- `src/styles/*` owns foundation tokens, base/global styles, and typography role styles.
- `src/stories/foundations/*` owns cross-cutting Storybook foundation docs.
- `src/components/ui/*` owns primitive components.
- Primitive-specific stories are colocated with their primitives.
- `src/content/*` remains a future content boundary only.

## Naming Rules

- Use descriptive component names that describe UI responsibility, not CMS source names.
- Keep primitive names generic and reusable.
- Keep pattern names layout-oriented.
- Keep section names route-composition oriented.
- Keep future content/data naming normalized to UI contracts before any CMS mapping.

## Storybook Role

Storybook is the primary design-system workspace.

It should validate:

- foundations
- primitives
- layout patterns
- components
- sections
- responsive contracts
- state coverage

## Storybook Boundary

- Foundation and cross-cutting docs live under `src/stories/*`.
- Component-specific stories should be colocated with components later.
- Storybook stories can use static fixtures, but should not fetch live CMS data.

## App-Shell Boundary

- The app shell owns route rendering, page frame, and demo/gallery browsing surfaces.
- Pages decide which sections render.
- UI components must not depend on raw CMS assumptions.

## Content Boundary

`src/content/*` is reserved for future Contentful integration.

No raw CMS assumptions should enter components during the UI-first phases.

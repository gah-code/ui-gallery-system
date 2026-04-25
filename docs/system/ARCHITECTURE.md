# Architecture Contract

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

## Naming Rules

- Use descriptive component names that describe UI responsibility, not CMS source names.
- Keep primitive names generic and reusable.
- Keep pattern names layout-oriented.
- Keep section names route-composition oriented.
- Keep future content/data naming normalized to UI contracts before any CMS mapping.

## Storybook Boundary

- Storybook is the design-system workspace and documentation surface.
- Foundation and cross-cutting docs live under `src/stories/*`.
- Component-specific stories should be colocated with components later.
- Storybook stories can use static fixtures, but should not fetch live CMS data.

## App-Shell Boundary

- The app shell owns route rendering, page frame, and demo/gallery browsing surfaces.
- Pages decide which sections render.
- UI components must not depend on raw CMS assumptions.

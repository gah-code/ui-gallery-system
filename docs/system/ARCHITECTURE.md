# Architecture Contract

## Separately governed Greenfield 06.2 candidate

The owner accepted corrected planning revalidation **PASS WITH NOTES**, selected a separate portfolio entry in this npm package and Cloudflare Pages as the intended host, and authorized offline contracts/fixtures plus Node 22.23.3 alignment. The 26-path implementation is EXTERNALLY ACCEPTED — PASS WITH NOTES. The documentation-only reconciliation candidate is COMPLETE; External Final Validation is PENDING. Formal 06.2 approval/checkpoint/freeze is not established by this pass. See [Portfolio contracts](PORTFOLIO-CONTRACTS.md) and [Portfolio architecture](PORTFOLIO-ARCHITECTURE.md). CMS ledger `06.1-planning-1` belongs to incoming checkpoint `9738cb34127b36cbb118de2438fc4db656b5dc0d`; the local [candidate ledger](../../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md) records `06.2-reconciliation-1`. Effective contract version remains **UNASSIGNED UNTIL 06.2 APPROVAL**; reserved label `portfolio-contract-v1.0.0` awaits the [proposed paired-checkpoint rule](../../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-062-qualifying-checkpoint-rule). This is an offline workstream, with no live Contentful integration.

Frontend Phase 9 remains in planning and its existing UI debt stays open. The planning/future-integration statements in this document refer to that independent lifecycle; the new offline portfolio contracts are a separate, reviewable input. Greenfield 06.3–06.6 and frontend Phase 9/10 need their own gates and authority.


## Runtime Requirement

Use exact Node v22.23.3 for this frontend. The owner-authorized Phase 06 / Batch 06.2 same-major runtime correction resolves the Node 22.12.0 incompatibility with locked ESLint 10.2.1; the dependency graph is unchanged.

Use `nvm use` only when Node 22.23.3 is already installed there. This candidate uses a verified isolated official distribution with bundled npm 10.9.9; see [Runtime activation](../../README.md#runtime) for its exact command-scoped PATH. Historical baseline/test records retain their original runtime identities.

## Current Architecture Phase

Phase 9 — Static Data Shape Freeze is active.

Phase 8 — Responsive Polish + Section Contract Refinement is complete.

Phase 7 — Storybook Productization is complete.

Architecture boundaries remain:

- `src/styles/*` owns foundations.
- `src/components/ui/*` owns primitive elements.
- `src/components/patterns/*` owns reusable layout pattern abstractions.
- `src/components/components/*` owns reusable component-library components.
- `src/components/sections/*` owns section-level compositions and app-side gallery/demo surfaces.
- `src/data/*` owns typed static fixtures and gallery metadata.
- `.storybook/*` owns Storybook configuration.
- `src/content/portfolio/contracts/*` holds the separately governed offline contracts; other content integration remains future work.
- Storybook remains the primary design-system workspace.

Gallery index, category browsing, GallerySurfaceLayout, DemoPageShell, and SectionComparison compose existing system pieces and static gallery metadata as app-side gallery/demo surfaces.

SectionComparison composes completed Phase 5 section components for app-side comparison demos.

Gallery metadata is static-first under `src/data/gallery/*` and now represents the implemented UI layers plus Phase 6 gallery/demo surfaces.

Responsive behavior audit is complete.

Responsive patch queue is documented.

SectionComparison responsive patch is complete.

Footer responsive patch is complete.

Navigation responsive patch is complete.

Gallery/demo responsive stress story coverage is complete.

Prioritized responsive patch queue is complete.

Section contract refinement review is complete.

No required section API refinements were found.

No responsive patches were applied during the prioritization pass.

No responsive patches were applied during the audit pass.

No section APIs were changed.

No component APIs were changed.

Phase 8 closeout review is complete.

Beacon Bar System Alignment is complete.

Phase 8 closeout review has been refreshed after Beacon Bar System Alignment.

Phase 8 formal closeout is complete.

Phase 9 should begin with static data shape freeze planning before implementation.

Static data shape freeze has not been implemented.

Contentful remains deferred.

Contentful remains deferred until UI data contracts are stable.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Ownership Map

```txt
src/components/ui        -> reusable primitives
src/components/patterns  -> layout/pattern abstractions
src/components/components -> reusable component-library components
src/components/sections  -> section-level compositions
src/components/layout    -> shell/chrome/layout ownership
src/content              -> offline portfolio contracts; live CMS deferred
src/data                 -> typed static fixtures and static gallery metadata
src/styles               -> tokens, base styles, global rhythm
src/stories              -> foundation and cross-cutting Storybook docs
docs                     -> roadmap, phase records, taxonomy, architecture notes
```

## Ownership Boundaries

| Area | Owns | Does Not Own |
|---|---|---|
| `src/components/ui` | reusable primitives | route-level composition |
| `src/components/patterns` | layout/pattern abstractions | business content |
| `src/components/components` | reusable component-library components | section composition |
| `src/components/sections` | section composition | raw CMS data |
| `src/components/layout` | shell/chrome/page frame | individual component variants |
| `src/content` | offline portfolio contracts; future integration boundary | current live CMS integration |
| `src/data` | typed static fixtures and static gallery metadata | live CMS fetching |
| `src/styles` | tokens/base/global rhythm | component-specific visuals |
| `src/stories` | Storybook foundations and cross-cutting docs | app routes |
| `docs` | roadmap, phase records, architecture notes | implementation code |

## Current Foundation Ownership

- `src/styles/*` owns foundation tokens, base/global styles, and typography role styles.
- `src/stories/foundations/*` owns cross-cutting Storybook foundation docs.
- `src/components/ui/*` owns primitive components.
- Primitive-specific stories are colocated with their primitives.
- `src/content/portfolio/contracts/*` holds offline contracts; live content integration remains future work.

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
- Component-specific stories remain colocated with components.
- Storybook stories can use static fixtures, but should not fetch live CMS data.

## App-Shell Boundary

- The app shell owns route rendering, page frame, and demo/gallery browsing surfaces.
- Pages decide which sections render.
- UI components must not depend on raw CMS assumptions.

## Content Boundary

`src/content/portfolio/contracts/*` now owns offline portfolio types. Runtime Contentful integration remains future work.

No raw CMS assumptions should enter components during the UI-first phases.

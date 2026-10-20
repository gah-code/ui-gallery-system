# Architecture Contract

## Separately governed Greenfield 06.3 candidate

06.2 is APPROVED / CHECKPOINTED; `portfolio-contract-v1.0.0` is EFFECTIVE / FROZEN and unchanged. The corrected twelve-path 06.3 implementation is EXTERNALLY ACCEPTED — PASS WITH NOTES; I-063-01 is CLOSED for the accepted bytes. Documentation reconciliation is COMPLETE / READY FOR EXTERNAL FINAL VALIDATION; that validation remains PENDING. Formal 06.3 approval/checkpoint is NOT ESTABLISHED. The [candidate mapping ledger](../../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md) proposes documentation revision `06.3-reconciliation-1`; the [proposed 06.3 qualifying-checkpoint rule](../../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-063-qualifying-checkpoint-rule) is PROPOSED FOR EXTERNAL FINAL VALIDATION. The [06.3 evidence report](../../../contentful-greenfield-starter/content-model/reports/PHASE-06-BATCH-06.3-PURE-ADAPTERS-RESOLUTION-URLS-AND-FOCUSED-OFFLINE-TESTS.md) owns the original NEEDS REVISION history, corrected acceptance and inherited 183-test result (21 fixture + 67 adapter + 95 assembly), with no project checks rerun here. N-063-01 remains NONBLOCKING / deferred to the separately authorized 06.4 emitter. 06.4 is NOT AUTHORIZED; Phase 07 is NOT STARTED. The CMS report, candidate ledger and proposed rule links are sibling-checkout pointers to uncommitted reconciliation documents. The established 06.2 pair is recorded in the report.

Frontend Phase 9 remains in planning and its existing UI debt stays open. This accepted pure portfolio boundary does not start, approve, freeze or close that independent lifecycle. Greenfield consumers/rendering, hosting and live Contentful integration remain deferred; no architecture, runtime instructions or user commands change here.


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

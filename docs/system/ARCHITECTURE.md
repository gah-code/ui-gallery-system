# Architecture Contract

## Separately governed Greenfield 06.4 conditional candidate

06.1, 06.2 and 06.3 are APPROVED / CHECKPOINTED. The incoming 06.3 pair is established under its accepted containing-commit rule; older PENDING/PROPOSED wording is a historical reconciliation snapshot. The eighteen-file 06.4 runtime is implemented offline and accepted at source/non-browser scope. This documentation-only conditional non-release reconciliation prepares candidate ledger `06.4-reconciliation-1`; External Final Validation is PENDING and 06.4 is NOT CHECKPOINTED. `portfolio-contract-v1.0.0` remains EFFECTIVE / FROZEN / UNCHANGED.

[D-064-01](../../../contentful-greenfield-starter/docs/DECISIONS.md#d-064-01) is EXTERNALLY ACCEPTED WITH CONDITIONS and OWNER ADOPTED by risk owner Gilberto Haro. All 246 MB cases remain NOT RUN and six VISUAL records remain PARTIAL; zero completed parameterized browser cases. Obligations are due during 06.5 Consolidated Frontend Validation, before its final acceptance, with no automatic extension. I-064-03 browser closure is OPEN; V-064-01 historical Playwright BLOCKED / NOT RUN remains. N-063-01 is accepted only for local emitted ordering/membership. Public preview/deployment/publication/release and 06.6/Phase 06 closeout remain blocked on required evidence.

The CMS [candidate mapping ledger](../../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md), [06.4 report and exact deferred inventory](../../../contentful-greenfield-starter/content-model/reports/PHASE-06-BATCH-06.4-FIXTURE-CONSUMER-PARITY-AND-ROUTE-RUNTIME-INTEGRATION.md#deferred-case-inventory) and [proposed conditional paired-checkpoint rule](../../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-064-conditional-qualifying-checkpoint-rule) own these bindings. Exact-byte External Final Validation, separate Git authorization, both qualifying commits/pushes, clean synchronization and External Checkpoint Validation precede 06.5 eligibility; separate 06.5 execution authorization is still required. This pass reruns no tests, typecheck, lint, builds or browser checks. Phase 07 is NOT STARTED; frontend Phase 9 and its UI debt remain independent. The CMS links are sibling-checkout pointers to the pending documentation candidate; the established incoming 06.3 pair is recorded in the ledger/report.

Frontend Phase 9 remains in planning with its existing UI/accessibility debt open. Greenfield 06.4 adds the separate offline portfolio runtime; it does not replace the gallery or alter this independent lifecycle. Gallery/Storybook compile/discovery evidence is inherited; browser/provider proof, hosting and live Contentful transport remain unestablished. No runtime command or configuration changes in this documentation pass.


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

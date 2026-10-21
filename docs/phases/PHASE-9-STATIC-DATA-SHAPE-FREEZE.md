# Phase 9 — Static Data Shape Freeze

## Separately governed Greenfield 06.4 conditional candidate

06.1, 06.2 and 06.3 are APPROVED / CHECKPOINTED. The incoming 06.3 pair is established under its accepted containing-commit rule; older PENDING/PROPOSED wording is a historical reconciliation snapshot. The eighteen-file 06.4 runtime is implemented offline and accepted at source/non-browser scope. This documentation-only conditional non-release reconciliation prepares candidate ledger `06.4-reconciliation-1`; External Final Validation is PENDING and 06.4 is NOT CHECKPOINTED. `portfolio-contract-v1.0.0` remains EFFECTIVE / FROZEN / UNCHANGED.

[D-064-01](../../../contentful-greenfield-starter/docs/DECISIONS.md#d-064-01) is EXTERNALLY ACCEPTED WITH CONDITIONS and OWNER ADOPTED by risk owner Gilberto Haro. All 246 MB cases remain NOT RUN and six VISUAL records remain PARTIAL; zero completed parameterized browser cases. Obligations are due during 06.5 Consolidated Frontend Validation, before its final acceptance, with no automatic extension. I-064-03 browser closure is OPEN; V-064-01 historical Playwright BLOCKED / NOT RUN remains. N-063-01 is accepted only for local emitted ordering/membership. Public preview/deployment/publication/release and 06.6/Phase 06 closeout remain blocked on required evidence.

The CMS [candidate mapping ledger](../../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md), [06.4 report and exact deferred inventory](../../../contentful-greenfield-starter/content-model/reports/PHASE-06-BATCH-06.4-FIXTURE-CONSUMER-PARITY-AND-ROUTE-RUNTIME-INTEGRATION.md#deferred-case-inventory) and [proposed conditional paired-checkpoint rule](../../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-064-conditional-qualifying-checkpoint-rule) own these bindings. Exact-byte External Final Validation, separate Git authorization, both qualifying commits/pushes, clean synchronization and External Checkpoint Validation precede 06.5 eligibility; separate 06.5 execution authorization is still required. This pass reruns no tests, typecheck, lint, builds or browser checks. Phase 07 is NOT STARTED; frontend Phase 9 and its UI debt remain independent. The CMS links are sibling-checkout pointers to the pending documentation candidate; the established incoming 06.3 pair is recorded in the ledger/report.

Frontend Phase 9 remains in planning with its existing UI/accessibility debt open. Greenfield 06.4 adds the separate offline portfolio runtime; it does not replace the gallery or alter this independent lifecycle. Gallery/Storybook compile/discovery evidence is inherited; browser/provider proof, hosting and live Contentful transport remain unestablished. No runtime command or configuration changes in this documentation pass.


## Status

Active — Planning

## Purpose

Phase 9 freezes UI-facing static data shapes before later CMS and Contentful modeling.

This phase starts with planning and contract alignment before static data shape implementation.

## Current Focus

- plan static data shape freeze scope
- inventory existing static metadata and fixture needs
- define UI data contract boundaries
- define fixture ownership rules
- define normalized view model expectations
- identify data shapes needed by sections
- identify data shapes needed by gallery/demo surfaces
- confirm implementation order for Phase 9

## Planning-Side Contract Patch — Shared Gallery Theme Contract

Status: Implemented

The shared gallery theme contract patch aligned dark-mode ownership across gallery/demo surfaces before static data contracts are frozen.

Completed:

- `GallerySurfaceLayout` owns the shared gallery/demo theme state.
- `GallerySurfaceLayout` applies one inherited `data-theme` root.
- `GalleryBeaconBar` is controlled by the shared theme state in the composed gallery flow.
- `GalleryIndex` responds to the inherited gallery theme variables.
- `GalleryCategoryBrowser` responds to the inherited gallery theme variables.
- `DemoPageShell` supports controlled theme behavior while preserving local fallback behavior.
- Storybook validates the synced gallery dark-mode state.

This did not start static data shape freeze implementation.

This did not reopen Phase 8.

This did not introduce routes, CMS assumptions, metadata shape changes, Contentful work, or broad primitive/component API changes.

## Boundaries

- Phase 8 remains complete.
- Static data shape freeze implementation has not started.
- Contentful remains deferred.
- Storybook remains the primary design-system workspace.

# Phase 9 — Static Data Shape Freeze

## Separately governed Greenfield 06.3 candidate

06.2 is APPROVED / CHECKPOINTED; `portfolio-contract-v1.0.0` is EFFECTIVE / FROZEN and unchanged. The corrected twelve-path 06.3 implementation is EXTERNALLY ACCEPTED — PASS WITH NOTES; I-063-01 is CLOSED for the accepted bytes. Documentation reconciliation is COMPLETE / READY FOR EXTERNAL FINAL VALIDATION; that validation remains PENDING. Formal 06.3 approval/checkpoint is NOT ESTABLISHED. The [candidate mapping ledger](../../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md) proposes documentation revision `06.3-reconciliation-1`; the [proposed 06.3 qualifying-checkpoint rule](../../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-063-qualifying-checkpoint-rule) is PROPOSED FOR EXTERNAL FINAL VALIDATION. The [06.3 evidence report](../../../contentful-greenfield-starter/content-model/reports/PHASE-06-BATCH-06.3-PURE-ADAPTERS-RESOLUTION-URLS-AND-FOCUSED-OFFLINE-TESTS.md) owns the original NEEDS REVISION history, corrected acceptance and inherited 183-test result (21 fixture + 67 adapter + 95 assembly), with no project checks rerun here. N-063-01 remains NONBLOCKING / deferred to the separately authorized 06.4 emitter. 06.4 is NOT AUTHORIZED; Phase 07 is NOT STARTED. The CMS report, candidate ledger and proposed rule links are sibling-checkout pointers to uncommitted reconciliation documents. The established 06.2 pair is recorded in the report.

Frontend Phase 9 remains in planning and its existing UI debt stays open. This accepted pure portfolio boundary does not start, approve, freeze or close that independent lifecycle. Greenfield consumers/rendering, hosting and live Contentful integration remain deferred; no architecture, runtime instructions or user commands change here.


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

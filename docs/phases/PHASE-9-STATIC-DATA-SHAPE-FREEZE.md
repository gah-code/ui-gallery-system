# Phase 9 — Static Data Shape Freeze

## Separately governed Greenfield 06.2 candidate

The owner accepted corrected planning revalidation **PASS WITH NOTES**, selected a separate portfolio entry in this npm package and Cloudflare Pages as the intended host, and authorized offline contracts/fixtures plus Node 22.23.3 alignment. The 26-path implementation is EXTERNALLY ACCEPTED — PASS WITH NOTES. The documentation-only reconciliation candidate is COMPLETE; External Final Validation is PENDING. Formal 06.2 approval/checkpoint/freeze is not established by this pass. See [Portfolio contracts](../system/PORTFOLIO-CONTRACTS.md) and [Portfolio architecture](../system/PORTFOLIO-ARCHITECTURE.md). CMS ledger `06.1-planning-1` belongs to incoming checkpoint `9738cb34127b36cbb118de2438fc4db656b5dc0d`; the local [candidate ledger](../../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md) records `06.2-reconciliation-1`. Effective contract version remains **UNASSIGNED UNTIL 06.2 APPROVAL**; reserved label `portfolio-contract-v1.0.0` awaits the [proposed paired-checkpoint rule](../../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-062-qualifying-checkpoint-rule). This is an offline workstream, with no live Contentful integration.

Frontend Phase 9 remains in planning and its existing UI debt stays open. The planning/future-integration statements in this document refer to that independent lifecycle; the new offline portfolio contracts are a separate, reviewable input. Greenfield 06.3–06.6 and frontend Phase 9/10 need their own gates and authority.


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

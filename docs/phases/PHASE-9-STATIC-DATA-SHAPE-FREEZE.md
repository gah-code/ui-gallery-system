# Phase 9 — Static Data Shape Freeze

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

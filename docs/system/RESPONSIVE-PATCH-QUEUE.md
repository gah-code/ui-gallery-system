# Responsive Patch Queue

## Status

Complete

## Purpose

This document converts the Phase 8 responsive audit into an ordered patch queue.

It defines which responsive issues should be patched first, why they matter, which files are likely involved, and how each patch should be validated.

## Source Audit

This queue is based on:

- `docs/system/RESPONSIVE-AUDIT.md`

## Prioritization Rules

Patch candidates are ranked by:

1. user-facing readability impact
2. responsive stability impact
3. Storybook/demo validation value
4. implementation risk
5. contract clarity
6. whether the issue affects reusable section behavior
7. whether the fix can be small and local

## Priority Levels

### High Priority

Issues that affect readability, usability, or demo validation quality.

### Medium Priority

Issues that improve polish and resilience but are not blocking.

### Low Priority

Optional enhancements that should only be handled if they remain useful after high/medium patches.

---

# Patch Candidate 1 — SectionComparison Mobile Density + Focus Clipping

## Status

Implemented

## Priority

High

## Reason

`SectionComparison` is a key app-side demo surface for reviewing section behavior. If mobile density or focus clipping makes it hard to inspect sections, it weakens Phase 6/8 validation.

## Expected Files

```txt
src/components/sections/SectionComparison/SectionComparison.css.ts
src/components/sections/SectionComparison/SectionComparison.stories.tsx
```

## Likely Patch Type

- reduce nested frame crowding on small screens
- improve demo frame spacing
- protect focus outlines from clipping
- improve mobile scan path
- possibly adjust `overflow` behavior on demo frames

## Acceptance Criteria

- mobile demo frames remain readable
- focus outlines are not clipped
- nested sections do not feel overly cramped
- large-screen comparison layout remains intact
- Storybook still validates comparison behavior

## Verification

```bash
npm run build
npm run build-storybook
npm run lint
```

## Implementation Note

SectionComparison mobile density and focus clipping have been patched.

Completed:

- reduced mobile demo-frame density
- improved spacing rhythm for comparison groups
- protected focus outlines from clipping
- preserved large-screen comparison behavior
- kept the patch local to SectionComparison

No section APIs were changed.

No component APIs were changed.

---

# Patch Candidate 2 — Footer Bottom Row Wrapping

## Status

Implemented

## Priority

High

## Reason

Footer is a common page-level section. Legal links, social links, and metadata need to wrap predictably across screen sizes.

## Expected Files

```txt
src/components/sections/Footer/Footer.css.ts
src/components/sections/Footer/Footer.stories.tsx
```

## Likely Patch Type

- improve bottom-row wrapping
- improve small-screen alignment
- protect metadata/legal/social groups from crowding
- preserve centered/minimal/multi-column variants

## Acceptance Criteria

- footer metadata remains readable
- legal links wrap cleanly
- social links wrap cleanly
- bottom row does not crowd on small screens
- existing footer variants still work

## Verification

```bash
npm run build
npm run build-storybook
npm run lint
```

## Implementation Note

Footer bottom-row wrapping has been patched.

Completed:

- improved small-screen bottom-row stacking
- improved legal link wrapping
- improved social link wrapping
- protected metadata readability
- preserved centered/minimal/multi-column variants
- kept the patch local to Footer

No section APIs were changed.

No component APIs were changed.

---

# Patch Candidate 3 — Navigation Long-Label Resilience

## Status

Implemented

## Priority

Medium

## Reason

Navigation already wraps, but long labels can stress spacing and scan rhythm. This should be hardened without introducing a complex mobile menu.

## Expected Files

```txt
src/components/sections/Navigation/Navigation.css.ts
src/components/sections/Navigation/Navigation.stories.tsx
```

## Likely Patch Type

- improve long label wrapping
- protect link spacing
- possibly add or refine a long-label Storybook state
- preserve no-hamburger scope

## Acceptance Criteria

- long labels wrap safely
- many-link navigation remains readable
- actions do not crowd link groups
- no complex mobile menu is introduced
- current-page state remains visible

## Verification

```bash
npm run build
npm run build-storybook
npm run lint
```

## Implementation Note

Navigation long-label resilience has been patched.

Completed:

- improved long label wrapping
- improved brand text safety
- improved many-link wrapping
- protected action wrapping
- preserved current-page visibility
- preserved the no-hamburger responsive scope
- kept the patch local to Navigation

No section APIs were changed.

No component APIs were changed.

---

# Patch Candidate 4 — Gallery/Demo Responsive Stress Stories

## Status

Implemented

## Priority

Medium

## Reason

The responsive audit found the gallery/demo surfaces are generally strong, but Storybook should make stress behavior easier to validate.

## Expected Files

```txt
src/components/sections/GalleryIndex/GalleryIndex.stories.tsx
src/components/sections/GalleryCategoryBrowser/GalleryCategoryBrowser.stories.tsx
src/components/sections/DemoPageShell/DemoPageShell.stories.tsx
src/components/sections/SectionComparison/SectionComparison.stories.tsx
```

## Likely Patch Type

- add or refine focused responsive stress stories
- show dense category/card states
- show long metadata/path/tag states
- validate beacon bar wrapping after DemoShell polish

## Acceptance Criteria

- gallery/demo responsive stress behavior is visible in Storybook
- story count remains disciplined
- no app routes are added
- no CMS assumptions are introduced
- Storybook remains the validation surface

## Verification

```bash
npm run build
npm run build-storybook
npm run lint
```

## Implementation Note

Gallery/demo responsive stress story coverage has been added or refined.

Completed:

- added/refined focused responsive stress stories for gallery/demo surfaces
- improved visibility of long-copy, metadata, path, tag, utility-bar, and dense-comparison behavior
- preserved app-side gallery/demo boundaries
- kept the patch limited to Storybook validation and directly relevant docs

No section APIs were changed.

No component APIs were changed.

No Contentful assumptions were introduced.

---

# Recommended Patch Order

```txt
1. SectionComparison mobile density + focus clipping
2. Footer bottom-row wrapping
3. Navigation long-label resilience
4. Gallery/demo responsive stress stories
```

## Rationale

Start with issues that most affect review quality and page-level usability.

Then patch resilience and validation visibility.

## Non-Goals

This queue does not authorize:

- broad section rewrites
- section API changes
- component API changes
- new layout patterns
- new routes
- CMS assumptions
- Contentful integration

## Patch Queue Completion Note

Status: Complete

The prioritized responsive patch queue is complete.

Completed:

- SectionComparison mobile density + focus clipping
- Footer bottom-row wrapping
- Navigation long-label resilience
- Gallery/demo responsive stress stories

No section APIs were changed.

No component APIs were changed.

Section contract refinement review is documented separately in:

- `docs/system/SECTION-CONTRACT-REFINEMENT-REVIEW.md`

Phase 8 closeout confirmed this patch queue is complete.

# Responsive Audit

## Status

Active — Audit

## Purpose

This audit reviews responsive behavior across section components and gallery/demo surfaces before targeted Phase 8 patches are made.

## Audit Scope

Reviewed surfaces:

### Section Components

- Navigation
- Hero
- Footer
- CTASection
- FeatureRow

### Gallery / Demo Surfaces

- GalleryIndex
- GalleryCategoryBrowser
- DemoPageShell
- SectionComparison

## Review Criteria

Each surface is reviewed for:

- small-screen stacking
- medium-screen transition behavior
- large-screen density
- extra-wide behavior
- readable line length
- safe wrapping for long labels and copy
- action wrapping
- metadata/tag wrapping
- media fallback behavior
- no accidental horizontal overflow
- touch-friendly control spacing
- content order and scan path
- empty/missing content fallback behavior

## Section Findings

### Navigation

Status: Reviewed

Strengths:

- Default navigation stacks on small screens and switches to brand / links / actions columns at `860px`.
- Links and actions use wrapping flex rows, which protects common medium-width cases.
- Storybook covers `ManyLinks`, `NoLinks`, `CurrentPage`, density variants, `ResponsiveContract`, and accessibility notes.
- No hamburger behavior is introduced; the section remains a visible, content-first navigation surface.

Risks / Issues:

- The `minimal` variant uses `1fr auto` at all widths, so long brand text plus actions could become cramped on very small screens.
- Link labels do not currently opt into aggressive wrapping, so unusually long unbroken labels remain a potential overflow edge case.
- Many-link navigation can become tall on mobile. That appears intentional for this phase, but it should remain an explicit product decision.

Recommended Follow-Up:

- Add a targeted responsive patch or story for long brand / long label navigation states.
- Consider `overflowWrap` on links if long CMS-provided labels become likely in later phases.
- Keep no-hamburger behavior documented unless production navigation requirements change.

---

### Hero

Status: Reviewed

Strengths:

- Hero variants stack by default and only move split/media layouts to two columns at `900px`.
- Heading and intro copy use `overflowWrap: anywhere`.
- Metadata, tags, and actions wrap.
- Storybook includes `LongCopyStress`, `MissingMedia`, `WithMedia`, `WithTags`, `WithActions`, and `ResponsiveContract`.

Risks / Issues:

- Default and spacious densities use large vertical padding, which can feel tall on very small screens.
- Media is caller-owned; a non-responsive media node could still create overflow if it does not follow the system image/media contract.

Recommended Follow-Up:

- Visually review compact/default/spacious hero density on narrow mobile viewports.
- Keep the media fallback and responsive image expectation documented for callers.

---

### Footer

Status: Reviewed

Strengths:

- Footer stacks on small screens and introduces multi-column behavior at `900px`.
- Link groups use `auto-fit` with safe `minmax(min(100%, 10rem), 1fr)` columns.
- Footer links use `overflowWrap: anywhere`.
- Bottom metadata, legal, and social rows wrap.
- Storybook includes long-copy, social, legal, actions, density, responsive, and accessibility stories.

Risks / Issues:

- The bottom row uses `justify-content: space-between`; when it wraps, mobile distribution may feel uneven.
- Large numbers of legal/social links may remain readable but visually busy.

Recommended Follow-Up:

- Consider a small mobile-specific bottom-row alignment patch if visual QA confirms awkward spacing.
- Add or review a dense legal/social footer example before patching.

---

### CTASection

Status: Reviewed

Strengths:

- CTASection stacks by default and only uses split layout at `900px`.
- Heading and body copy use `overflowWrap: anywhere`.
- Metadata, tags, and actions wrap.
- Support slot is constrained with `minWidth: 0`.
- Storybook covers centered, split, compact, two actions, support content, brand tone, framed, long copy, responsive, and accessibility states.

Risks / Issues:

- Split layout reserves a `16rem` minimum support column at large breakpoints; dense support content could squeeze the main copy in edge cases.
- Brand tone readability depends on caller-provided action/support content preserving contrast.

Recommended Follow-Up:

- Review split CTA with dense support content at tablet-to-desktop transition widths.
- Keep brand-tone child content expectations documented.

---

### FeatureRow

Status: Reviewed

Strengths:

- Feature rows stack first and introduce two-, three-, and four-column layouts through explicit breakpoints.
- `auto` columns use safe `auto-fit` behavior.
- Header, metadata, intro, and actions are wrap-safe.
- Feature containers reset `minWidth`.
- Storybook covers two/three/four features, icons, actions, media, centered layout, sparse content, long copy, empty state, responsive contract, and accessibility notes.

Risks / Issues:

- Four-column layouts can become visually dense at extra-wide breakpoints when feature copy is long.
- Fixed column modes are more rigid than `auto` for unknown future content.

Recommended Follow-Up:

- Review four-column density with long feature copy before deciding whether contract refinements are needed.
- Prefer `columns="auto"` for unknown or CMS-like future content unless a specific visual grid is required.

## Gallery / Demo Findings

### GalleryIndex

Status: Reviewed

Strengths:

- Summary cards and category cards use safe `auto-fit` grids.
- Category metadata wraps.
- Preview item labels use `overflowWrap: anywhere`.
- The surface uses a constrained wide measure and readable header width.

Risks / Issues:

- Storybook does not currently include a dedicated responsive or long-copy stress story for this surface.
- Category descriptions are static and currently safe, but future longer metadata may need explicit stress coverage.

Recommended Follow-Up:

- Add a focused responsive/long-copy Storybook example in a later patch pass if gallery metadata grows.
- Keep the current auto-fit grid approach.

---

### GalleryCategoryBrowser

Status: Reviewed

Strengths:

- Category selector controls wrap.
- Item cards use safe `auto-fit` grid behavior.
- Metadata and tags wrap.
- Long path and Storybook references use `overflowWrap: anywhere`.
- Category summary and item cards preserve `minWidth: 0`.

Risks / Issues:

- Storybook covers category states and metadata behavior, but not a dedicated responsive stress case with long paths/tags.
- The selector is safe for current five categories; larger future category sets may need a stronger control pattern.

Recommended Follow-Up:

- Add a later responsive stress story for long metadata/path/tag combinations.
- Defer stronger filtering or control changes until data shape freeze or later product requirements justify them.

---

### DemoPageShell

Status: Reviewed

Strengths:

- The beacon bar stacks on small screens, wraps utility actions, and aligns horizontally from `48rem`.
- Local light/dark shell variables preserve the shell-level theme boundary.
- Metadata, action rows, content frame, and empty state are wrap-safe.
- Storybook includes compact, spacious, metadata, actions, framed, dark mode, empty, long-copy, Storybook relationship, and accessibility states.

Risks / Issues:

- The dark-mode text override prioritizes readability but flattens secondary/muted tone nuance inside the dark shell.
- Local theme state intentionally does not persist across sessions.

Recommended Follow-Up:

- Visually review dark mode and consider more nuanced local dark text tone variables if needed.
- Keep the local-only theme boundary unless a later phase introduces an intentional global theme system.

---

### SectionComparison

Status: Reviewed

Strengths:

- Comparison groups and demo frames stack vertically, avoiding complex nested grids.
- Demo labels wrap.
- Nested sections retain their own responsive behavior.
- Storybook includes default, custom intro, dense comparison, Storybook relationship, and accessibility stories.

Risks / Issues:

- Nested sections include their own section padding, which makes the comparison surface visually dense and long on smaller screens.
- `overflow: hidden` on demo frames helps containment but should be checked against visible focus outlines near frame edges.
- There is no dedicated responsive-contract story for the comparison surface beyond dense comparison.

Recommended Follow-Up:

- Consider a targeted visual-density pass for nested demo frames if mobile review confirms excessive vertical weight.
- Review focus outlines inside clipped demo frames before deciding whether frame overflow needs adjustment.
- Add a responsive comparison story or note if the surface becomes a primary review tool.

## Storybook Responsive Coverage Review

Strengths:

- Section components have broad responsive-focused Storybook coverage.
- Navigation, Hero, Footer, CTASection, and FeatureRow each include `ResponsiveContract` stories.
- Hero, Footer, CTASection, FeatureRow, and DemoPageShell include long-copy or equivalent stress states.
- FeatureRow includes an explicit empty state.
- Hero includes missing-media coverage.
- DemoPageShell includes a dark-mode responsive utility-bar story.

Gaps:

- GalleryIndex does not yet have a dedicated responsive or long-copy stress story.
- GalleryCategoryBrowser does not yet have a dedicated long path/tag responsive stress story.
- SectionComparison has `DenseComparison` but no explicit `ResponsiveContract` story.
- Footer bottom-row wrapping should be visually reviewed with dense legal/social link sets.

## Priority Recommendations

### High Priority

- No blocking responsive defects were identified from code/story inspection.

### Medium Priority

- Add targeted Storybook responsive stress coverage for GalleryIndex and GalleryCategoryBrowser.
- Review and potentially patch Footer bottom-row wrapping/alignment on mobile.
- Review SectionComparison mobile density and focus outline clipping.
- Review Navigation long brand / long link labels in minimal and many-link states.

### Low Priority

- Tune DemoPageShell dark-mode text tone nuance if visual review shows the current readable override is too flat.
- Consider guidance that `FeatureRow` should prefer `columns="auto"` for unknown future content.
- Consider a responsive comparison note/story for SectionComparison if it becomes a frequent QA surface.

## Phase 8 Patch Candidates

1. Section responsive patches
   - Footer bottom-row mobile alignment.
   - Navigation long-label overflow protection.
   - SectionComparison frame density/focus containment if confirmed visually.
2. Gallery/demo responsive patches
   - GalleryIndex responsive/long-copy stress coverage.
   - GalleryCategoryBrowser long path/tag stress coverage.
   - DemoPageShell dark-mode tone refinement if needed.
3. Storybook responsive example updates
   - Add focused responsive stories for gallery/demo surfaces.
   - Avoid story sprawl by adding only the stress states that map to audit risks.
4. Section contract refinements, only if justified
   - Document when `FeatureRow` should use fixed columns versus `auto`.
   - Document Navigation no-hamburger behavior as an intentional section contract.

## Closeout / Reopen Notes

This audit does not patch responsive behavior.

It prepares targeted responsive polish work for later Phase 8 passes.

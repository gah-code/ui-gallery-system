# Storybook Audit

## Status

Active — Audit

## Purpose

This audit records the current Storybook hierarchy, coverage, naming consistency, documentation notes, accessibility notes, and interaction/state coverage before productization edits begin.

## Audit Scope

Storybook audit covers:

- foundations
- primitives
- layout patterns
- component library batch 1
- component library batch 2
- section components
- gallery/demo surfaces
- overview stories, if present

## Current Storybook Structure

Current Storybook file discovery found 49 Storybook-matched files and 43 colocated stories under `src/components`.

```txt
.storybook/main.ts
.storybook/preview.ts
src/stories/foundations/*.stories.tsx
src/stories/patterns/*.stories.tsx
src/components/ui/*/*.stories.tsx
src/components/patterns/*/*.stories.tsx
src/components/components/*/*.stories.tsx
src/components/sections/*/*.stories.tsx
```

Notes:

- Foundation stories live under `src/stories/foundations/*`.
- Layout pattern overview documentation exists under `src/stories/patterns/*`.
- Primitive, pattern, component, section, and gallery/demo stories are colocated with implementation folders.
- Starter Storybook example files were removed during hierarchy standardization.
- No `src/stories/components/*` overview story folder currently exists.

## Storybook Configuration

Storybook configuration is defined in `.storybook/*`.

- Framework: `@storybook/react-vite`
- Story globs: `../src/**/*.mdx` and `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Addons: `@chromatic-com/storybook`, `@storybook/addon-vitest`, `@storybook/addon-a11y`, `@storybook/addon-docs`
- Global style import: `.storybook/preview.ts` imports `../src/styles`
- Controls matchers: color and date matchers are configured
- Accessibility addon: configured with `a11y.test: 'todo'`
- Interaction/test tooling: addon-vitest is installed, but no `npm run test` script is configured
- Storybook build script: `npm run build-storybook`

## Story Inventory

### Foundations

Existing foundation stories:

- `src/stories/foundations/Tokens.stories.tsx` — `Foundations/Tokens`, story: `Overview`
- `src/stories/foundations/Typography.stories.tsx` — `Foundations/Typography`, story: `Roles`
- `src/stories/foundations/Spacing.stories.tsx` — `Foundations/Spacing`, story: `Scale`
- `src/stories/foundations/Surfaces.stories.tsx` — `Foundations/Surfaces`, story: `SurfaceRules`
- `src/stories/foundations/FocusStates.stories.tsx` — `Foundations/Focus States`, story: `FocusVisible`

### Primitives

Existing primitive stories:

- `src/components/ui/Text/Text.stories.tsx` — `Primitives/Text`, stories: `Default`, `Variants`, `Tones`, `Alignment`, `SemanticHeadings`, `LongCopyStress`
- `src/components/ui/Button/Button.stories.tsx` — `Primitives/Button`, stories: `Default`, `Variants`, `Sizes`, `States`, `WithIcons`, `LinkButton`, `FullWidth`, `IconOnly`, `AccessibilityNotes`
- `src/components/ui/Image/Image.stories.tsx` — `Primitives/Image`, stories: `Default`, `AspectRatios`, `ObjectFit`, `Radius`, `MissingMedia`, `AccessibilityNotes`, `LogoSafe`
- `src/components/ui/Tag/Tag.stories.tsx` — `Primitives/Tag`, stories: `Default`, `Variants`, `Sizes`, `Shapes`, `LongCopyStress`, `MultipleTags`, `WithStatus`, `WithIcon`, `AccessibilityNotes`
- `src/components/ui/Input/Input.stories.tsx` — `Primitives/Input`, stories: `Default`, `Sizes`, `WithHelperText`, `ErrorState`, `Disabled`, `Required`, `Multiline`, `States`, `AccessibilityNotes`
- `src/components/ui/Icon/Icon.stories.tsx` — `Primitives/Icon`, stories: `Default`, `Sizes`, `Tones`, `FunctionalIcon`, `InlineWithText`, `AccessibilityNotes`
- `src/components/ui/StatusLabel/StatusLabel.stories.tsx` — `Primitives/Status Label`, stories: `Default`, `Statuses`, `Sizes`, `WithIcon`, `LongCopyStress`, `CompactUsage`, `AccessibilityNotes`

### Layout Patterns

Existing layout pattern stories:

- `src/components/patterns/Row/Row.stories.tsx` — `Layout Patterns/Row`, includes layout counts, gap, alignment, long-content, and responsive contract stories
- `src/components/patterns/Grid/Grid.stories.tsx` — `Layout Patterns/Grid`, includes column modes, gaps, sparse/dense content, uneven heights, long-copy, and responsive contract stories
- `src/components/patterns/SingleColumn/SingleColumn.stories.tsx` — `Layout Patterns/Single Column`, includes width, gap, alignment, centered/short/long content, mixed primitive content, and responsive contract stories
- `src/components/patterns/Sidebar/Sidebar.stories.tsx` — `Layout Patterns/Sidebar`, includes sidebar placement, widths, gaps, long main content, dense sidebar content, stretch alignment, and responsive contract stories
- `src/components/patterns/Magazine/Magazine.stories.tsx` — `Layout Patterns/Magazine`, includes variants, media/content lead, reverse, missing media, dense editorial content, long-copy, mixed primitive content, and responsive contract stories
- `src/components/patterns/ZPattern/ZPattern.stories.tsx` — `Layout Patterns/Z Pattern`, includes row counts, media position, per-item overrides, missing media, long-copy, mixed primitive content, and responsive contract stories
- `src/components/patterns/FPattern/FPattern.stories.tsx` — `Layout Patterns/F Pattern`, includes sparse/dense content, actions, rail, wide lead, long-copy, footer, mixed primitive content, and responsive contract stories
- `src/components/patterns/Asymmetric/Asymmetric.stories.tsx` — `Layout Patterns/Asymmetric`, includes lead variants, offset/reverse, missing secondary content, accent, reduced content, long-copy, mixed primitive content, and responsive contract stories
- `src/stories/patterns/LayoutPatternsOverview.stories.tsx` — `Layout Patterns/Overview`, story: `Overview`

### Component Library Batch 1

Existing Batch 1 component stories:

- `src/components/components/Card/Card.stories.tsx` — broad content, media, metadata, actions, long-copy, missing-media, responsive contract, and accessibility coverage
- `src/components/components/Breadcrumbs/Breadcrumbs.stories.tsx` — trail length, current page, separators, sizes, long labels, empty items, and accessibility coverage
- `src/components/components/Pagination/Pagination.stories.tsx` — first/middle/last pages, many pages, compact, prev/next options, link mode, labels, and accessibility coverage
- `src/components/components/Alert/Alert.stories.tsx` — variants, compact, message-only, icon/action, long message, urgent role guidance, and accessibility coverage
- `src/components/components/Stats/Stats.stories.tsx` — counts, density, icons, tone variants, long labels, empty state, responsive contract, and accessibility coverage
- `src/components/components/Gallery/Gallery.stories.tsx` — sparse/dense content, missing image, text-only items, mixed content, long captions, tags, links, columns, empty state, responsive contract, and accessibility coverage
- `src/components/components/FeatureBox/FeatureBox.stories.tsx` — icon/media/action/tag/status, centered, dense copy, long heading, tone variants, responsive contract, and accessibility coverage
- `src/components/components/PreviewProfileCard/PreviewProfileCard.stories.tsx` — profile/article/project/case study, missing image, density/layout, metadata, long copy, linked title, actions, image shapes, responsive contract, and accessibility coverage
- `src/components/components/Accordion/Accordion.stories.tsx` — multiple items, long content, initial state, multiple-open state, disabled item, density/tone, FAQ content, and accessibility coverage
- `src/components/components/Tabs/Tabs.stories.tsx` — initial/controlled state, long/dense labels, disabled tab, mixed panels, density/tone, and accessibility coverage

### Component Library Batch 2

Existing Batch 2 component stories:

- `src/components/components/Carousel/Carousel.stories.tsx` — item volume, card/media items, per-view options, hidden status/controls, disabled controls, empty state, keyboard guidance, reduced motion, and accessibility coverage
- `src/components/components/Testimonials/Testimonials.stories.tsx` — quote count, featured quote, avatars/missing avatars, long quote, dense content, company metadata, tags, centered, carousel composition, empty state, and accessibility coverage
- `src/components/components/CustomerLogos/CustomerLogos.stories.tsx` — grid/dense/many logos, card tone, heading, brand names, linked logos, missing-logo fallback, decorative cloud, empty state, and accessibility coverage
- `src/components/components/FeaturedInLogos/FeaturedInLogos.stories.tsx` — grid/compact/many logos, editorial tone, heading, source names, linked logos, missing-logo fallback, decorative strip, empty state, and accessibility coverage
- `src/components/components/Steps/Steps.stories.tsx` — step count, icon steps, vertical/horizontal layout, density, statuses, long-copy step, actions, empty state, and accessibility coverage
- `src/components/components/Forms/Forms.stories.tsx` — default/contact/inline/grid forms, error/success/disabled/loading states, helper text, footer, and accessibility coverage
- `src/components/components/Tables/Tables.stories.tsx` — density, striped rows, responsive overflow, status/tags/actions, long cell content, empty rows, caption/description, and accessibility coverage
- `src/components/components/PricingTables/PricingTables.stories.tsx` — plan count, featured plan, density, long features, missing optional fields, custom actions, empty plans, responsive contract, and accessibility coverage
- `src/components/components/Modal/Modal.stories.tsx` — default/confirmation/form modal, long content, sizes, footer omission, close behavior, keyboard/focus guidance, and accessibility coverage

### Section Components

Existing section stories:

- `src/components/sections/Navigation/Navigation.stories.tsx` — default, minimal, CTA, many links, current page, centered, density, no links, responsive contract, and accessibility coverage
- `src/components/sections/Hero/Hero.stories.tsx` — default, text-only, media, centered/split variants, status/metadata, tags, actions, long copy, missing media, responsive contract, and accessibility coverage
- `src/components/sections/Footer/Footer.stories.tsx` — minimal, multi-column, centered, social/legal links, long link groups, brand statement, actions, density, responsive contract, and accessibility coverage
- `src/components/sections/CTASection/CTASection.stories.tsx` — default, centered/split/compact, two actions, status/metadata, tags, support content, brand tone, framed, long copy, responsive contract, and accessibility coverage
- `src/components/sections/FeatureRow/FeatureRow.stories.tsx` — feature counts, icons, actions, media, centered, sparse content, long-copy feature, empty state, responsive contract, and accessibility coverage

### Gallery / Demo Surfaces

Existing gallery/demo stories:

- `src/components/sections/GalleryIndex/GalleryIndex.stories.tsx` — default, custom intro, short preview lists, metadata summary, Storybook relationship, and accessibility coverage
- `src/components/sections/GalleryCategoryBrowser/GalleryCategoryBrowser.stories.tsx` — default, foundations/components/sections defaults, custom intro, metadata behavior, selector state coverage, Storybook relationship, and accessibility coverage
- `src/components/sections/DemoPageShell/DemoPageShell.stories.tsx` — default, compact/spacious density, metadata, actions, framed content, empty content, long description, Storybook relationship, and accessibility coverage
- `src/components/sections/SectionComparison/SectionComparison.stories.tsx` — default, custom intro, dense comparison, Storybook relationship, and accessibility coverage

### Overview and Starter Stories

Existing overview/starter stories:

- `src/stories/patterns/LayoutPatternsOverview.stories.tsx` — planned cross-cutting pattern overview
- Starter `Example/*` stories and the default `Configure.mdx` starter docs surface were removed during hierarchy standardization.

## Coverage Strengths

- All implemented primitives have colocated Storybook coverage.
- All implemented layout patterns have colocated Storybook coverage with responsive contract stories.
- All Batch 1 and Batch 2 reusable components have colocated Storybook coverage.
- All Phase 5 section components have colocated stories with responsive and accessibility notes.
- Phase 6 gallery/demo surfaces have Storybook stories and explicit Storybook relationship notes.
- Complex interactive components such as Button, Input, Accordion, Tabs, Carousel, Modal, Forms, Pagination, and GalleryCategoryBrowser include meaningful state and accessibility-oriented stories.
- Content stress states are common across patterns, sections, and component-library stories.
- Empty/missing-content states are represented for many collection, media, and data-display components.

## Coverage Gaps

- Primitive stories now include improved lightweight accessibility notes in high-value files.
- Layout pattern stories have strong responsive coverage but usually do not include dedicated `AccessibilityNotes` stories.
- Common long-copy story names have been standardized to `LongCopyStress` where useful.
- Common missing-media story names have been standardized to `MissingMedia` where the missing content is visual media. Domain-specific names such as `MissingOptionalFields` remain where clearer.
- Gallery/demo surface stories explain the Storybook relationship and now include dedicated accessibility notes.
- There is no component-library overview story under `src/stories/components/*`.
- Storybook addon-vitest is configured, but there is no project-level `npm run test` script or formal interaction test suite.

## Naming Consistency Review

Consistent patterns already present:

- `Default` is common across primitives, patterns, components, sections, and gallery/demo surfaces.
- `Variants`, `Sizes`, `States`, `WithActions`, `WithMedia`, `EmptyState`, `ResponsiveContract`, and `AccessibilityNotes` are used frequently.
- Section stories are especially consistent with `ResponsiveContract` and `AccessibilityNotes`.

Remaining inconsistencies to address later:

- Some stories intentionally retain domain-specific names such as `KeyboardFocusGuidance`, `ReducedMotionNotes`, `UrgentRoleGuidance`, `DenseFAQ`, and `StorybookRelationship` because they describe specific guidance rather than generic states.
- Foundation story names use domain-specific labels such as `Overview`, `Roles`, `Scale`, `SurfaceRules`, and `FocusVisible`; these are reasonable but should be documented as foundation-specific exceptions.

Preferred names remain:

- Default
- Variants
- Sizes
- States
- ResponsiveContract
- AccessibilityNotes
- LongCopyStress
- EmptyState
- MissingMedia
- WithActions
- WithMedia

## Documentation Notes Review

Strong documentation patterns:

- Many stories include explicit responsive, accessibility, or relationship note stories.
- Phase 5 sections include clear responsive/accessibility stories.
- Phase 6 gallery/demo surfaces include Storybook relationship stories.
- Interactive components include guidance stories for keyboard, focus, close behavior, urgent alert roles, and reduced motion.

Needs improvement:

- Lightweight story descriptions and usage notes have been standardized where helpful; MDX/docs surfaces were reviewed and are not required for Phase 7 closeout at this time.
- Foundation stories are useful but have minimal explicit productization structure.
- Primitive notes are improved, and the targeted accessibility coverage review is complete.

## Accessibility Review

Coverage currently exists for:

- focus states through `Foundations/Focus States`
- button/link correctness through Button, Navigation, Breadcrumbs, Pagination, Card, and other action stories
- form labels/helper/error states through Input and Forms stories
- table semantics through Tables accessibility coverage
- dialog semantics and focus behavior through Modal stories
- tabs and accordion semantics through Tabs and Accordion stories
- carousel controls, reduced motion, and accessibility through Carousel stories
- current page/current state through Navigation, Breadcrumbs, and Pagination stories
- color/icon supplementation through Icon, StatusLabel, Alert, and logo/testimonial stories

Accessibility gaps to address later:

- Layout pattern accessibility guidance can be revisited later if a specific documentation gap appears.
- Consider documenting the Storybook a11y addon `todo` mode and whether a later pass should tighten it.
- Formal automated accessibility enforcement remains outside this notes-focused review.

## Interaction / State Review

Coverage currently exists for:

- Button variants, sizes, states, links, full-width, and icon-only usage
- Input helper, error, disabled, required, multiline, and no-label usage
- Pagination first/middle/last, many pages, compact, link mode, and label variations
- Carousel controls, hidden controls/status, disabled controls, keyboard focus guidance, and reduced motion
- Accordion initial open, multi-open, disabled item, density, and tone states
- Tabs initial selected, controlled, disabled tab, dense labels, density, and tone states
- Modal close behavior, form modal, long content, sizes, footer omission, keyboard/focus guidance
- Forms disabled, loading, success, error, helper text, and footer states

Interaction gaps to address later:

- There are not yet formal interaction tests despite addon-vitest being configured.
- Controlled/uncontrolled behavior is covered where supported, but many components are intentionally presentational and do not own controlled state.
- Keyboard/focus behavior is documented for several complex components, but it is not enforced by automated interaction tests.

## Recommended Productization Passes

Recommended next implementation passes:

```txt
1. Phase 7 formal closeout
```

Hierarchy standardization is complete. Story naming and usage notes standardization is complete. Accessibility coverage review is complete. Interaction/state coverage review is complete. Final Storybook productization review is complete. The next follow-up pass should perform Phase 7 formal closeout.

## Hierarchy Standardization Update

Status: Implemented

The Storybook title hierarchy has been standardized around:

- `Foundations/*`
- `Primitives/*`
- `Layout Patterns/*`
- `Components/Batch 1/*`
- `Components/Batch 2/*`
- `Sections/*`
- `Gallery/*`

Starter `Example/*` stories were handled as follows:

- Deleted `src/stories/Button.stories.ts`
- Deleted `src/stories/Button.tsx`
- Deleted `src/stories/Header.stories.ts`
- Deleted `src/stories/Header.tsx`
- Deleted `src/stories/Page.stories.ts`
- Deleted `src/stories/Page.tsx`
- Deleted `src/stories/Configure.mdx`
- Deleted starter-only CSS files under `src/stories`
- Deleted starter-only assets under `src/stories/assets`

Story title updates were limited to Storybook hierarchy paths and matching static Storybook reference strings in gallery metadata.

No component APIs were changed.

No MDX docs were added.

No accessibility or interaction coverage pass was performed in this step.

## Story Naming + Usage Notes Update

Status: Implemented

The Storybook story naming and usage notes pass has been completed.

Completed work:

- reviewed story export names for clarity and consistency
- standardized unclear story names where needed
- renamed common long-copy stress stories to `LongCopyStress`
- renamed common empty collection stories to `EmptyState`
- renamed missing-media stories to `MissingMedia` where the missing content is visual media
- renamed singular action story names to `WithActions` where multiple action nodes are demonstrated
- refined primitive-level usage notes where helpful
- added a lightweight Button accessibility/usage note story
- preserved colocated story files
- preserved component APIs

No MDX docs were added.

No formal accessibility coverage pass was completed in this step.

No formal interaction/state testing setup was completed in this step.

## Remaining Usage Note Gaps

- Primitive, component, section, and gallery/demo accessibility notes are improved.
- Gallery/demo surfaces rely on Storybook stories rather than MDX documentation; this is acceptable for Phase 7 closeout.
- Interaction guidance stories exist for complex components, and the notes-focused interaction/state coverage review is complete.

## Accessibility Coverage Review Update

Status: Implemented

The accessibility coverage review has been completed.

Completed work:

- reviewed high-priority primitive, component, section, and gallery/demo stories
- added or refined lightweight `AccessibilityNotes` stories where helpful
- added accessibility notes for Tag, Card, GalleryIndex, GalleryCategoryBrowser, DemoPageShell, and SectionComparison
- emphasized semantic HTML, accessible names, focus behavior, table/dialog/form semantics, and color/icon supplementation
- preserved colocated story files
- preserved component APIs

No MDX docs were added.

No formal interaction/state testing setup was completed in this step.

## Remaining Accessibility Coverage Gaps

- Layout pattern stories remain primarily documented through responsive contracts rather than dedicated accessibility notes.
- Storybook a11y addon enforcement remains in `todo` mode.
- Formal interaction test automation remains outside this notes-focused review.

## Interaction / State Coverage Review Update

Status: Implemented

The interaction/state coverage review has been completed.

Completed work:

- reviewed high-priority interactive and stateful stories
- refined Button state coverage with disabled, loading, and disabled-link guidance
- added an Input `States` story covering helper, error, disabled, required, and multiline states together
- added a GalleryCategoryBrowser `States` story for selected category and pressed-control behavior
- confirmed existing coverage for Pagination, Accordion, Tabs, Carousel, Forms, Modal, Navigation, and CTASection
- emphasized native behavior, keyboard behavior, controlled/uncontrolled behavior, and visual state coverage
- preserved colocated story files
- preserved component APIs

No MDX docs were added.

No formal interaction testing setup was completed in this step.

## Remaining Interaction / State Coverage Gaps

- Formal `play`-based interaction tests are not configured as a project-level test workflow.
- MDX/docs surfaces were reviewed and are not required for Phase 7 closeout at this time.
- Final Storybook productization review is complete.

## Final Review Update

Status: Implemented

The final Storybook productization review confirms that the current Storybook workspace is ready for Phase 7 closeout.

Remaining non-blocking considerations:

- formal interaction testing is not configured
- MDX docs can be revisited later if needed
- future phases may refine static data and CMS-facing docs

## Closeout / Reopen Notes

The audit pass did not rename, move, or rewrite stories.

The hierarchy standardization pass updated story titles and removed confirmed starter artifacts, but did not change story examples broadly.

The story naming and usage notes pass standardized export names and lightweight notes without moving files, changing APIs, adding MDX docs, or completing the accessibility/interaction coverage passes.

The accessibility coverage review added or refined lightweight accessibility notes without moving files, changing APIs, adding MDX docs, or adding formal interaction tests.

The interaction/state coverage review added or refined lightweight state stories without moving files, changing APIs, adding MDX docs, or adding formal interaction tests.

The final Storybook productization review completed without adding MDX docs, moving story files, changing component APIs, or beginning Phase 8.

Phase 7 is ready for formal closeout.

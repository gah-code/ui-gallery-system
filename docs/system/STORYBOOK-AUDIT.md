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

Current Storybook file discovery found 53 Storybook-matched files and 43 colocated stories under `src/components`.

```txt
.storybook/main.ts
.storybook/preview.ts
src/stories/*.stories.ts
src/stories/*.mdx
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
- Starter Storybook example files still exist under `src/stories/*` with `Example/*` titles.
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

- `src/components/ui/Text/Text.stories.tsx` — `UI/Text`, stories: `Default`, `Variants`, `Tones`, `Alignment`, `SemanticHeadings`, `LongCopy`
- `src/components/ui/Button/Button.stories.tsx` — `UI/Button`, stories: `Default`, `Variants`, `Sizes`, `States`, `WithIcons`, `LinkButton`, `FullWidth`, `IconOnly`
- `src/components/ui/Image/Image.stories.tsx` — `UI/Image`, stories: `Default`, `AspectRatios`, `ObjectFit`, `Radius`, `MissingImageFallback`, `DecorativeImage`, `LogoSafe`
- `src/components/ui/Tag/Tag.stories.tsx` — `UI/Tag`, stories: `Default`, `Variants`, `Sizes`, `Shapes`, `LongLabel`, `MultipleTags`, `StatusExamples`, `WithIcon`
- `src/components/ui/Input/Input.stories.tsx` — `UI/Input`, stories: `Default`, `Sizes`, `WithHelperText`, `ErrorState`, `Disabled`, `Required`, `Multiline`, `NoLabel`
- `src/components/ui/Icon/Icon.stories.tsx` — `UI/Icon`, stories: `Default`, `Sizes`, `Tones`, `FunctionalIcon`, `InlineWithText`, `IconOnlyGuidance`
- `src/components/ui/StatusLabel/StatusLabel.stories.tsx` — `UI/StatusLabel`, stories: `Default`, `Statuses`, `Sizes`, `WithIcon`, `LongMessage`, `CompactUsage`, `StatusMeaning`

### Layout Patterns

Existing layout pattern stories:

- `src/components/patterns/Row/Row.stories.tsx` — `Patterns/Row`, includes layout counts, gap, alignment, long-content, and responsive contract stories
- `src/components/patterns/Grid/Grid.stories.tsx` — `Patterns/Grid`, includes column modes, gaps, sparse/dense content, uneven heights, long-copy, and responsive contract stories
- `src/components/patterns/SingleColumn/SingleColumn.stories.tsx` — `Patterns/SingleColumn`, includes width, gap, alignment, centered/short/long content, mixed primitive content, and responsive contract stories
- `src/components/patterns/Sidebar/Sidebar.stories.tsx` — `Patterns/Sidebar`, includes sidebar placement, widths, gaps, long main content, dense sidebar content, stretch alignment, and responsive contract stories
- `src/components/patterns/Magazine/Magazine.stories.tsx` — `Patterns/Magazine`, includes variants, media/content lead, reverse, missing media, dense editorial content, long-copy, mixed primitive content, and responsive contract stories
- `src/components/patterns/ZPattern/ZPattern.stories.tsx` — `Patterns/ZPattern`, includes row counts, media position, per-item overrides, missing media, long-copy, mixed primitive content, and responsive contract stories
- `src/components/patterns/FPattern/FPattern.stories.tsx` — `Patterns/FPattern`, includes sparse/dense content, actions, rail, wide lead, long-copy, footer, mixed primitive content, and responsive contract stories
- `src/components/patterns/Asymmetric/Asymmetric.stories.tsx` — `Patterns/Asymmetric`, includes lead variants, offset/reverse, missing secondary content, accent, reduced content, long-copy, mixed primitive content, and responsive contract stories
- `src/stories/patterns/LayoutPatternsOverview.stories.tsx` — `Patterns/Layout Patterns Overview`, story: `Overview`

### Component Library Batch 1

Existing Batch 1 component stories:

- `src/components/components/Card/Card.stories.tsx` — broad content, media, metadata, actions, long-copy, missing-media, and responsive contract coverage
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

- `src/components/sections/GalleryIndex/GalleryIndex.stories.tsx` — default, custom intro, short preview lists, metadata summary, and Storybook relationship
- `src/components/sections/GalleryCategoryBrowser/GalleryCategoryBrowser.stories.tsx` — default, foundations/components/sections defaults, custom intro, metadata behavior, and Storybook relationship
- `src/components/sections/DemoPageShell/DemoPageShell.stories.tsx` — default, compact/spacious density, metadata, actions, framed content, empty content, long description, and Storybook relationship
- `src/components/sections/SectionComparison/SectionComparison.stories.tsx` — default, custom intro, dense comparison, and Storybook relationship

### Overview and Starter Stories

Existing overview/starter stories:

- `src/stories/patterns/LayoutPatternsOverview.stories.tsx` — planned cross-cutting pattern overview
- `src/stories/Button.stories.ts` — `Example/Button`, starter Storybook example
- `src/stories/Header.stories.ts` — `Example/Header`, starter Storybook example
- `src/stories/Page.stories.ts` — `Example/Page`, starter Storybook example
- `src/stories/Configure.mdx` — default starter configure docs surface

## Coverage Strengths

- All implemented primitives have colocated Storybook coverage.
- All implemented layout patterns have colocated Storybook coverage with responsive contract stories.
- All Batch 1 and Batch 2 reusable components have colocated Storybook coverage.
- All Phase 5 section components have colocated stories with responsive and accessibility notes.
- Phase 6 gallery/demo surfaces have Storybook stories and explicit Storybook relationship notes.
- Complex interactive components such as Accordion, Tabs, Carousel, Modal, Forms, and Pagination already include meaningful state and accessibility-oriented stories.
- Content stress states are common across patterns, sections, and component-library stories.
- Empty/missing-content states are represented for many collection, media, and data-display components.

## Coverage Gaps

- Starter `Example/*` stories remain in `src/stories/*` and are not aligned with the planned Phase 7 information architecture.
- Primitive stories use `UI/*` titles while Phase 7 contracts define a planned `Primitives` top-level group.
- Primitive stories generally do not expose dedicated `AccessibilityNotes` or `ResponsiveContract` stories, even when accessibility guidance exists in focused stories such as `IconOnlyGuidance`, `StatusMeaning`, or `NoLabel`.
- Layout pattern stories have strong responsive coverage but usually do not include dedicated `AccessibilityNotes` stories.
- Some component-library stories use names like `LongCopy`, `LongContent`, `LongMessage`, or `DenseCopy` instead of the planned standard `LongCopyStress` naming.
- Some missing-content stories use names like `MissingImage`, `MissingImageFallback`, `MissingLogoFallback`, or `MissingOptionalFields`; naming can be standardized where useful.
- Gallery/demo surface stories explain the Storybook relationship but generally do not have dedicated `AccessibilityNotes` or `ResponsiveContract` stories.
- There is no component-library overview story under `src/stories/components/*`.
- Storybook addon-vitest is configured, but there is no project-level `npm run test` script.

## Naming Consistency Review

Consistent patterns already present:

- `Default` is common across primitives, patterns, components, sections, and gallery/demo surfaces.
- `Variants`, `Sizes`, `States`, `WithActions`, `WithMedia`, `EmptyItems`, `ResponsiveContract`, and `AccessibilityNotes` are used frequently.
- Section stories are especially consistent with `ResponsiveContract` and `AccessibilityNotes`.

Inconsistencies to address later:

- Primitive stories are grouped under `UI/*`, not `Primitives/*`.
- Starter stories are grouped under `Example/*`.
- Some stories use singular or component-specific alternatives such as `WithAction`, `LongCopy`, `LongContent`, `LongMessage`, `DenseCopy`, `MissingImage`, `MissingMedia`, `MissingLogoFallback`, and `EmptyItems`.
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

- Story descriptions and usage notes are not standardized across all story files.
- Foundation stories are useful but have minimal explicit productization structure.
- Primitive stories often rely on example coverage rather than explicit notes about scope, accessibility, and responsive expectations.
- Starter MDX content is still present and does not reflect the project-specific UI system.

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

- Add or standardize primitive-level `AccessibilityNotes` stories where the behavior is important.
- Decide whether layout patterns need dedicated `AccessibilityNotes` stories or documented exceptions.
- Add accessibility notes to gallery/demo surfaces where they frame demo behavior.
- Consider documenting the Storybook a11y addon `todo` mode and whether a later pass should tighten it.

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
- Controlled/uncontrolled behavior is covered in Tabs but not consistently documented for every interactive primitive or component.
- Keyboard/focus behavior is documented for several complex components, but not standardized as a required story naming pattern.
- Loading/disabled states are present where supported but should be audited systematically during the interaction/state pass.

## Recommended Productization Passes

Recommended next implementation passes:

```txt
1. Storybook hierarchy standardization
2. Story naming and notes cleanup
3. Accessibility notes coverage pass
4. Interaction/state coverage pass
5. Storybook docs/MDX surface pass, if needed
6. Final Storybook productization review
```

The first follow-up pass should standardize Storybook hierarchy because it affects where naming, notes, and docs work should land.

## Closeout / Reopen Notes

This audit does not rename, move, or rewrite stories.

It prepares the Storybook productization implementation work.

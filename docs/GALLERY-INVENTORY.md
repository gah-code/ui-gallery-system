# Gallery Inventory

## Status

Provisional

## Source

- Reference image / design board: Not found in the current repo.
- Notes: Inventory is based on the existing gallery taxonomy and Phase 0 planning brief. Existing starter assets are not treated as a source-backed gallery reference.

## Purpose

This document converts the gallery/reference material into a build inventory organized by dependency order.

The goal is not to build everything now.

The goal is to account for the system before implementation begins.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

---

# 1. Elements

Elements are the smallest reusable interface pieces.

They should be built first because layout patterns, components, and sections depend on them.

## Text

### Inventory

- Eyebrow text
- Headings
- Body copy
- Captions
- Labels
- Metadata text

### Depends On

- Typography tokens
- Spacing tokens
- Color tokens

### Build Notes

- Needs typography roles.
- Should use design tokens.
- Should support responsive rhythm.

### Storybook Coverage

- Default
- Long copy
- Small text
- Label/caption examples

### Build Phase

Phase 1 — Elements + Foundations

---

## Buttons

### Inventory

- Primary button
- Secondary button
- Text/link button
- Icon button if visible or expected

### Depends On

- Color tokens
- Spacing tokens
- Radius tokens
- Focus tokens
- Motion tokens

### Build Notes

- Needs hover, focus, disabled, and loading states.
- Should support accessible focus styling.

### Storybook Coverage

- Default
- Secondary
- Disabled
- Loading if supported
- With icon if needed

### Build Phase

Phase 1 — Elements + Foundations

---

## Images

### Inventory

- Responsive image
- Card image
- Section image
- Logo image if relevant

### Depends On

- Radius tokens
- Aspect ratio rules
- Layout rhythm

### Build Notes

- Needs aspect-ratio handling.
- Needs missing-image behavior later.

### Storybook Coverage

- Default
- Wide
- Square
- Missing image placeholder

### Build Phase

Phase 1 — Elements + Foundations

---

## Inputs

### Inventory

- Text input
- Textarea
- Select or dropdown if expected
- Checkbox/radio if expected

### Depends On

- Form tokens
- Focus tokens
- Error/status tokens

### Build Notes

- Needs error, disabled, focus, and helper text states.

### Storybook Coverage

- Default
- Error
- Disabled
- With helper text

### Build Phase

Phase 1 — Elements + Foundations

---

## Tags

### Inventory

- Category tag
- Status tag
- Metadata pill

### Depends On

- Color tokens
- Radius tokens
- Typography tokens

### Build Notes

- Should support semantic variants.

### Storybook Coverage

- Default
- Multiple tags
- Long label
- Status variants

### Build Phase

Phase 1 — Elements + Foundations

---

## Icons

### Inventory

- Decorative icon
- Functional icon
- Status icon if needed

### Depends On

- Size tokens
- Color tokens
- Accessibility rules

### Build Notes

- Decorative icons should be hidden from assistive tech.
- Functional icons need labels.
- Icon sizing should be token-aligned.

### Storybook Coverage

- Decorative
- With label
- Icon-only usage guidance

### Build Phase

Phase 1 — Elements + Foundations

---

## Status Labels

### Inventory

- Success
- Warning
- Error
- Info
- Neutral

### Depends On

- Status color tokens
- Icon rules
- Text labels

### Build Notes

- Should not rely on color alone.

### Storybook Coverage

- All status variants
- Long message
- With icon

### Build Phase

Phase 1 — Elements + Foundations

---

# 2. Layout Patterns

Layout patterns should be built after elements and foundations.

They define spatial contracts before richer components are built.

## Row of Cards

### Inventory

- Horizontal card group

### Depends On

- Spacing tokens
- Card primitives later
- Responsive layout rules

### Responsive Contract

- Small: stacked
- Medium: 2-column if space allows
- Large: row/grid

### Storybook Coverage

- 2 cards
- 3 cards
- 4 cards
- Long-copy card

### Build Phase

Phase 2 — Layout Patterns

---

## Grid of Cards

### Inventory

- Repeating card layout

### Depends On

- Spacing tokens
- Container rules
- Card primitives later

### Responsive Contract

- Small: 1 column
- Medium: 2 columns
- Large: 3 columns or more if justified

### Storybook Coverage

- Sparse grid
- Dense grid
- Uneven content heights

### Build Phase

Phase 2 — Layout Patterns

---

## Single Column

### Inventory

- Reading layout
- Narrow content stack

### Depends On

- Typography measure
- Container width
- Vertical rhythm

### Responsive Contract

- Maintain readable measure.
- Avoid stretching text too wide.

### Storybook Coverage

- Short content
- Long content

### Build Phase

Phase 2 — Layout Patterns

---

## Sidebar

### Inventory

- Main content + supporting sidebar

### Depends On

- Container rules
- Responsive stacking rules
- Spacing tokens

### Responsive Contract

- Small: stacked
- Large: sidebar layout

### Storybook Coverage

- Left sidebar
- Right sidebar
- Sticky/sidebar note if needed

### Build Phase

Phase 2 — Layout Patterns

---

## Multi-column / Magazine

### Inventory

- Editorial layout
- Mixed-width content blocks

### Depends On

- Grid system
- Typography rhythm
- Image rules

### Responsive Contract

- Small: stacked
- Large: mixed columns

### Storybook Coverage

- Image + text
- Dense editorial blocks

### Build Phase

Phase 2 — Layout Patterns

---

## Z-pattern

### Inventory

- Alternating image/text journey

### Depends On

- Image element
- Text element
- Grid layout

### Responsive Contract

- Small: stacked
- Large: alternating layout

### Storybook Coverage

- 2 rows
- 3 rows
- Missing image

### Build Phase

Phase 2 — Layout Patterns

---

## F-pattern

### Inventory

- Scan-friendly content hierarchy

### Depends On

- Typography hierarchy
- Content grouping
- Spacing rhythm

### Responsive Contract

- Prioritize heading, summary, and key actions.

### Storybook Coverage

- Content-heavy example
- Sparse example

### Build Phase

Phase 2 — Layout Patterns

---

## Asymmetry / Experimental

### Inventory

- Intentional uneven layout or offset composition

### Depends On

- Grid system
- Container rules
- Responsive fallback rules

### Responsive Contract

- Must degrade gracefully to stacked layout.

### Storybook Coverage

- Default
- Reduced content
- Long copy

### Build Phase

Phase 2 — Layout Patterns

---

# 3. Reusable Components

Reusable components should be built after elements and layout patterns.

They should not own page-level layout.

## Cards

### Purpose

Reusable content preview or summary surface.

### Depends On

- Text
- Images
- Tags
- Buttons
- Grid/row patterns

### Expected Variants

- Default
- Dense
- Sparse
- Long-copy
- Missing media

### Accessibility Notes

- Entire card should not become a focus trap.
- If the card is clickable, define link behavior clearly.

### Storybook Coverage

- Canonical example
- Long-copy card
- Missing image
- Dense card

### Build Phase

Phase 3 — Component Library Batch 1

---

## Alerts

### Purpose

Communicate status, warning, success, error, or informational messages.

### Depends On

- Text
- Icons
- Status labels

### Expected Variants

- Info
- Success
- Warning
- Error
- Neutral

### Accessibility Notes

- Use appropriate semantics for urgent messages.
- Do not rely on color alone.

### Storybook Coverage

- All variants
- Long message
- With action

### Build Phase

Phase 3 — Component Library Batch 1

---

## Breadcrumbs

### Purpose

Show page hierarchy and navigation context.

### Depends On

- Text
- Links
- Icons if needed

### Expected Variants

- Default
- Long trail
- Truncated trail

### Accessibility Notes

- Use navigation landmark.
- Mark current page appropriately.

### Storybook Coverage

- Short trail
- Long trail
- Current page state

### Build Phase

Phase 3 — Component Library Batch 1

---

## Pagination

### Purpose

Navigate paginated collections.

### Depends On

- Buttons
- Text
- Icons if needed

### Expected Variants

- Default
- Compact
- Many pages
- Disabled previous/next

### Accessibility Notes

- Use clear labels for page controls.
- Current page must be announced.

### Storybook Coverage

- Default
- First page
- Middle page
- Last page

### Build Phase

Phase 3 — Component Library Batch 1

---

## Tabs

### Purpose

Switch between related content panels.

### Depends On

- Buttons
- Text
- Focus styles

### Expected Variants

- Default
- Dense
- Long labels

### Accessibility Notes

- Keyboard behavior must be defined.
- ARIA tab semantics required if implemented as tabs.

### Storybook Coverage

- Default
- Long labels
- Keyboard/focus guidance

### Build Phase

Phase 3 — Component Library Batch 1

---

## Accordion

### Purpose

Reveal and hide stacked content sections.

### Depends On

- Text
- Buttons
- Icons
- Motion tokens

### Expected Variants

- Single-open
- Multi-open if needed
- Long content

### Accessibility Notes

- Buttons must control panels.
- Expanded state must be exposed.

### Storybook Coverage

- Default
- Multiple items
- Long content

### Build Phase

Phase 3 — Component Library Batch 1

---

## Stats

### Purpose

Display key metrics or proof points.

### Depends On

- Text
- Grid/row patterns
- Optional icons

### Expected Variants

- 2-up
- 3-up
- 4-up
- Dense

### Accessibility Notes

- Numbers need readable labels and context.

### Storybook Coverage

- Default
- Dense
- Long label

### Build Phase

Phase 3 — Component Library Batch 1

---

## Feature Boxes

### Purpose

Highlight product, service, or content features.

### Depends On

- Text
- Icons
- Cards
- Grid patterns

### Expected Variants

- Icon feature
- Image feature
- Dense feature

### Accessibility Notes

- Icons should not replace meaningful labels.

### Storybook Coverage

- Default
- 3-up
- Long copy

### Build Phase

Phase 3 — Component Library Batch 1

---

## Profile / Preview Cards

### Purpose

Preview a person, article, case study, or project.

### Depends On

- Cards
- Images
- Text
- Tags
- Buttons/links

### Expected Variants

- Profile card
- Article preview
- Project preview
- Missing image

### Accessibility Notes

- Link destination should be clear.

### Storybook Coverage

- Default
- Long copy
- Missing image
- Dense metadata

### Build Phase

Phase 3 — Component Library Batch 1

---

## Carousel

### Purpose

Display a sequence of related content items.

### Depends On

- Buttons
- Cards
- Focus styles
- Motion tokens

### Expected Variants

- Cards
- Testimonials
- Logos if needed

### Accessibility Notes

- Keyboard navigation required.
- Motion must respect reduced motion.
- Controls need clear labels.

### Storybook Coverage

- Default
- Few items
- Many items
- Reduced-motion notes

### Build Phase

Phase 4 — Component Library Batch 2

---

## Testimonials

### Purpose

Show customer/user quotes or endorsements.

### Depends On

- Text
- Images
- Cards
- Logos if needed

### Expected Variants

- Single quote
- Grid
- Carousel-ready

### Accessibility Notes

- Quote attribution must be clear.

### Storybook Coverage

- Single
- Grid
- Long quote
- Missing avatar

### Build Phase

Phase 4 — Component Library Batch 2

---

## Logos

### Purpose

Show customer, partner, or featured-in logos.

### Depends On

- Images
- Grid/row patterns

### Expected Variants

- Customer logos
- Featured-in logos
- Monochrome if needed

### Accessibility Notes

- Logo alt text should identify brand unless decorative.

### Storybook Coverage

- Grid
- Row
- Many logos
- Missing logo fallback

### Build Phase

Phase 4 — Component Library Batch 2

---

## Forms

### Purpose

Collect user input.

### Depends On

- Inputs
- Buttons
- Labels
- Status labels
- Alerts

### Expected Variants

- Basic form
- Contact form
- Inline form
- Error state
- Success state

### Accessibility Notes

- Labels required.
- Error messaging must connect to fields.

### Storybook Coverage

- Default
- Error
- Success
- Disabled/loading submit

### Build Phase

Phase 4 — Component Library Batch 2

---

## Tables

### Purpose

Display structured comparative data.

### Depends On

- Text
- Status labels
- Layout overflow rules

### Expected Variants

- Simple table
- Dense table
- Responsive table

### Accessibility Notes

- Use table semantics where tabular data is real.
- Headers must be meaningful.

### Storybook Coverage

- Default
- Dense
- Responsive overflow

### Build Phase

Phase 4 — Component Library Batch 2

---

## Pricing Tables

### Purpose

Compare plans, prices, and features.

### Depends On

- Cards
- Tables
- Buttons
- Tags
- Status labels

### Expected Variants

- 2 plans
- 3 plans
- Featured plan
- Dense feature list

### Accessibility Notes

- Plan comparison must remain readable and structured.

### Storybook Coverage

- Default
- Featured plan
- Long feature list

### Build Phase

Phase 4 — Component Library Batch 2

---

## Modals

### Purpose

Display focused layered content or actions.

### Depends On

- Buttons
- Focus management
- Motion tokens

### Expected Variants

- Basic modal
- Confirmation
- Form modal

### Accessibility Notes

- Focus trap required.
- Escape close behavior must be defined.
- Background content should not be reachable while open.

### Storybook Coverage

- Default
- Confirmation
- Long content
- Keyboard guidance

### Build Phase

Phase 4 — Component Library Batch 2

---

## Steps

### Purpose

Show process, sequence, or onboarding flow.

### Depends On

- Text
- Icons
- Grid/row patterns

### Expected Variants

- Numbered steps
- Icon steps
- Vertical steps

### Accessibility Notes

- Sequence must be clear without visual styling alone.

### Storybook Coverage

- 3 steps
- 5 steps
- Long-copy step

### Build Phase

Phase 4 — Component Library Batch 2

---

# 4. Section Components

Sections should be built after elements, layout patterns, and reusable components exist.

Sections compose the system. They should not reinvent primitives.

## Navigation

### Purpose

Provide primary site navigation and brand entry point.

### Depends On

- Text
- Buttons/links
- Layout shell
- Responsive behavior

### Expected Content States

- Default
- Few links
- Many links
- With primary action

### Responsive Contract

- Small: compact/mobile navigation
- Medium: simplified horizontal or menu pattern
- Large: full horizontal navigation

### Storybook Coverage

- Default
- Many links
- With CTA
- Mobile behavior notes

### Build Phase

Phase 5 — Section Components

---

## Hero

### Purpose

Introduce the page and drive the primary action.

### Depends On

- Text
- Buttons
- Images
- Tags
- Layout patterns

### Expected Content States

- Default
- Text only
- With media
- Long copy
- Sparse content

### Responsive Contract

- Small: stacked content
- Medium: controlled two-column when media exists
- Large: intentional spacious composition

### Storybook Coverage

- Default
- Text only
- With media
- Long-copy
- Missing-media

### Build Phase

Phase 5 — Section Components

---

## Footer

### Purpose

Close the page with navigation, metadata, and secondary links.

### Depends On

- Text
- Links
- Layout patterns

### Expected Content States

- Minimal footer
- Multi-column footer
- Legal/social links

### Responsive Contract

- Small: stacked
- Large: multi-column

### Storybook Coverage

- Minimal
- Full
- Long link groups

### Build Phase

Phase 5 — Section Components

---

## CTA Section

### Purpose

Drive a focused action within or near the end of a page.

### Depends On

- Text
- Buttons
- Layout patterns

### Expected Content States

- Default
- Centered
- Split
- Long copy

### Responsive Contract

- Small: stacked/centered
- Large: split or wide layout if justified

### Storybook Coverage

- Default
- Long copy
- Two-button CTA

### Build Phase

Phase 5 — Section Components

---

## Feature Row

### Purpose

Display a row or sequence of related features.

### Depends On

- Feature boxes
- Grid/row patterns
- Icons/images

### Expected Content States

- 2 features
- 3 features
- 4 features
- Long-copy feature

### Responsive Contract

- Small: stacked
- Medium: 2-column
- Large: row/grid

### Storybook Coverage

- 3-up
- 4-up
- Long-copy
- Sparse

### Build Phase

Phase 5 — Section Components

---

# 5. Gallery / Demo Surfaces

Gallery and demo surfaces should be built only after sections exist.

## Gallery Index

### Purpose

Browsable index of the UI system.

### Filters

- Elements
- Layout patterns
- Components
- Sections

### Depends On

- Stable inventory
- Component metadata
- Demo content

### Build Phase

Phase 6 — Gallery Index + Demo Pages

---

## Demo Pages

### Purpose

Show realistic page compositions using sections and components.

### Depends On

- Section components
- Static fixtures
- Layout shell

### Build Phase

Phase 6 — Gallery Index + Demo Pages

---

## Section Comparison Pages

### Purpose

Compare section variants and content states.

### Depends On

- Section components
- Storybook examples
- Static fixtures

### Build Phase

Phase 6 — Gallery Index + Demo Pages

---

# 6. Storybook Productization Notes

Storybook should remain the primary design-system workspace.

## Foundations Needed

- Tokens
- Typography
- Spacing/layout rhythm
- Surface/background rules
- Focus states
- Motion/reduced-motion guidance

## Story Types

- Foundation stories
- Primitive stories
- Pattern stories
- Component stories
- Section stories
- Responsive contract stories
- State coverage stories

### Build Phase

Phase 7 — Storybook Productization

---

# 7. Future CMS / Data Contract Notes

Contentful is deferred.

The UI system should first use typed static fixtures and normalized view models.

Future data layers should map into existing UI contracts instead of forcing CMS structure into components.

## Future Data Contract Candidates

- Navigation item
- Hero section data
- CTA section data
- Feature item
- Card item
- Testimonial item
- Logo item
- Pricing plan
- Form field
- Table data
- Gallery item

## Not Now

- No Contentful models
- No CMS SDK
- No live data fetching
- No raw CMS response shapes in components

### Build Phase

Phase 9 — Static Data Shape Freeze  
Phase 10 — Contentful Readiness  
Phase 11 — Contentful Integration later

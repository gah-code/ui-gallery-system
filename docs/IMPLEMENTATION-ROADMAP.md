# Implementation Roadmap

## Separately governed Greenfield 06.2 candidate

The owner accepted corrected planning revalidation **PASS WITH NOTES**, selected a separate portfolio entry in this npm package and Cloudflare Pages as the intended host, and authorized offline contracts/fixtures plus Node 22.23.3 alignment. The 26-path implementation is EXTERNALLY ACCEPTED — PASS WITH NOTES. The documentation-only reconciliation candidate is COMPLETE; External Final Validation is PENDING. Formal 06.2 approval/checkpoint/freeze is not established by this pass. See [Portfolio contracts](system/PORTFOLIO-CONTRACTS.md) and [Portfolio architecture](system/PORTFOLIO-ARCHITECTURE.md). CMS ledger `06.1-planning-1` belongs to incoming checkpoint `9738cb34127b36cbb118de2438fc4db656b5dc0d`; the local [candidate ledger](../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md) records `06.2-reconciliation-1`. Effective contract version remains **UNASSIGNED UNTIL 06.2 APPROVAL**; reserved label `portfolio-contract-v1.0.0` awaits the [proposed paired-checkpoint rule](../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-062-qualifying-checkpoint-rule). This is an offline workstream, with no live Contentful integration.

Frontend Phase 9 remains in planning and its existing UI debt stays open. The planning/future-integration statements in this document refer to that independent lifecycle; the new offline portfolio contracts are a separate, reviewable input. Greenfield 06.3–06.6 and frontend Phase 9/10 need their own gates and authority.


## Project Direction

UI-first now. Contentful later.

## Build Dependency Order

```txt
elements -> layout patterns -> components -> sections -> gallery/demo -> Storybook productization -> data-shape freeze -> Contentful readiness -> Contentful integration later
```

## Phase 0 — Baseline + Gallery Inventory

Status: Complete

Goal: Establish project structure, ownership boundaries, and build inventory.

### Deliverables

- `TASKS.md`
- `docs/GALLERY-TAXONOMY.md`
- `docs/GALLERY-INVENTORY.md`
- `docs/phases/PHASE-0-BASELINE.md`
- `docs/system/ARCHITECTURE.md`

### Closeout Summary

Phase 0 established the project baseline, architecture ownership boundaries, gallery taxonomy, and provisional gallery inventory.

The gallery inventory is provisional because no source-backed reference image was found during this pass.

This does not block Phase 1. A future source-backed visual board can refine the inventory later.

## Phase 1 — Elements + Foundations

Status: Complete

Goal: Build tokens, typography, text, buttons, images, inputs, and tags.

### Closeout Summary

Phase 1 established the foundation layer and all planned primitive UI elements.

Completed:

- token files
- base/global styles
- typography roles
- foundation Storybook docs
- Text
- Button
- Image
- Tag
- Input
- Icon
- Status Label

Phase 2 — Layout Patterns is now the active phase.

### Deliverables

- `docs/phases/PHASE-1-ELEMENTS-FOUNDATIONS.md`
- `docs/system/FOUNDATIONS.md`
- `docs/system/PRIMITIVE-CONTRACTS.md`
- `src/styles/tokens.css.ts`
- `src/styles/global.css.ts`
- `src/styles/typography.css.ts`
- `src/styles/index.ts`
- foundation Storybook docs
- `src/components/ui/Text`
- `src/components/ui/Button`
- `src/components/ui/Image`
- `src/components/ui/Tag`
- `src/components/ui/Input`
- `src/components/ui/Icon`
- `src/components/ui/StatusLabel`
- primitive components later

## Phase 2 — Layout Patterns

Status: Complete

Goal: Build reusable layout systems before richer components.

### Closeout Summary

Phase 2 established all planned reusable layout patterns.

Completed:

- Row
- Grid
- SingleColumn
- Sidebar
- Magazine
- ZPattern
- FPattern
- Asymmetric

Phase 3 — Component Library Batch 1 is complete.

### Deliverables

- `docs/phases/PHASE-2-LAYOUT-PATTERNS.md`
- `docs/system/LAYOUT-PATTERNS.md`
- `docs/system/PATTERN-CONTRACTS.md`
- `src/components/patterns/Row`
- `src/components/patterns/Grid`
- `src/components/patterns/SingleColumn`
- `src/components/patterns/Sidebar`
- `src/components/patterns/Magazine`
- `src/components/patterns/ZPattern`
- `src/components/patterns/FPattern`
- `src/components/patterns/Asymmetric`
- layout pattern components
- layout pattern Storybook docs

## Phase 3 — Component Library Batch 1

Status: Complete

Goal: Build foundational reusable components.

### Closeout Summary

Phase 3 established the first reusable component-library batch.

Completed:

- Card
- Breadcrumbs
- Pagination
- Alert
- Stats
- Gallery
- Feature Box
- Preview/Profile Card
- Accordion
- Tabs

Phase 4 — Component Library Batch 2 is complete.

### Deliverables

- `docs/phases/PHASE-3-COMPONENT-LIBRARY-BATCH-1.md`
- `docs/system/COMPONENTS.md`
- `docs/system/COMPONENT-CONTRACTS.md`
- `src/components/components`
- `src/components/components/Card`
- `src/components/components/Breadcrumbs`
- `src/components/components/Pagination`
- `src/components/components/Alert`
- `src/components/components/Stats`
- `src/components/components/Gallery`
- `src/components/components/FeatureBox`
- `src/components/components/PreviewProfileCard`
- `src/components/components/Accordion`
- `src/components/components/Tabs`
- component implementations later
- component Storybook docs later

Includes:

- Card
- Breadcrumbs
- Pagination
- Alert
- Stats
- Gallery
- Feature Box
- Preview/Profile Card
- Accordion
- Tabs

## Phase 4 — Component Library Batch 2

Status: Complete

Goal: Build heavier interactive and content-rich components.

### Closeout Summary

Phase 4 established the second reusable component-library batch.

Completed:

- Carousel
- Testimonials
- Customer Logos
- Featured-In Logos
- Steps
- Forms
- Tables
- Pricing Tables
- Modal

Phase 5 — Section Components was activated after Phase 4 and is now complete.

### Deliverables

- `docs/phases/PHASE-4-COMPONENT-LIBRARY-BATCH-2.md`
- `docs/system/COMPONENT-BATCH-2-CONTRACTS.md`
- updated `docs/system/COMPONENTS.md`
- `src/components/components/Carousel`
- `src/components/components/Testimonials`
- `src/components/components/CustomerLogos`
- `src/components/components/FeaturedInLogos`
- `src/components/components/Steps`
- `src/components/components/Forms`
- `src/components/components/Tables`
- `src/components/components/PricingTables`
- `src/components/components/Modal`
- implemented component files
- component Storybook docs

Includes:

- Carousel
- Testimonials
- Customer Logos
- Featured-In Logos
- Steps
- Forms
- Tables
- Pricing Tables
- Modals

## Phase 5 — Section Components

Status: Complete

Goal: Compose primitives, components, and patterns into section-level surfaces.

### Closeout Summary

Phase 5 established reusable section-level compositions.

Completed:

- Navigation
- Hero
- Footer
- CTA Section
- Feature Row

Phase 6 — Gallery Index + Demo Pages was activated after Phase 5 and is now complete.

### Deliverables

- `docs/phases/PHASE-5-SECTION-COMPONENTS.md`
- `docs/system/SECTIONS.md`
- `docs/system/SECTION-CONTRACTS.md`
- `src/components/sections/Navigation`
- `src/components/sections/Hero`
- `src/components/sections/Footer`
- `src/components/sections/CTASection`
- `src/components/sections/FeatureRow`
- section implementations complete
- section Storybook docs complete

Includes:

- Navigation
- Hero
- Footer
- CTA
- Feature row

## Phase 6 — Gallery Index + Demo Pages

Status: Complete

Goal: Make the app browsable as a UI reference system.

### Closeout Summary

Phase 6 established app-side gallery and demo surfaces.

Completed:

- Static gallery metadata
- Gallery Index
- Gallery Category Browsing
- Demo Page Shell
- Section Comparison Pages
- Gallery Metadata Connection

Phase 7 — Storybook Productization became active after Phase 6 closeout and is now complete.

### Deliverables

- `docs/phases/PHASE-6-GALLERY-INDEX-DEMO-PAGES.md`
- `docs/system/GALLERY.md`
- `docs/system/GALLERY-CONTRACTS.md`
- `src/data/gallery`
- `src/components/sections/GalleryIndex`
- `src/components/sections/GalleryCategoryBrowser`
- `src/components/sections/DemoPageShell`
- `src/components/sections/SectionComparison`
- gallery metadata connection complete

## Phase 7 — Storybook Productization

Status: Complete

Goal: Make Storybook the system of record for the UI layer.

### Closeout Summary

Phase 7 productized Storybook as the primary design-system workspace.

Completed:

- Storybook planning/contracts
- Storybook hierarchy and coverage audit
- hierarchy standardization
- starter artifact cleanup
- story naming and usage notes standardization
- accessibility coverage review
- interaction/state coverage review
- final productization review

Phase 8 — Responsive Polish + Section Contract Refinement was activated after Phase 7 and is now complete.

## Phase 8 — Responsive Polish + Section Contract Refinement

Status: Complete

Goal: Validate responsive behavior and section-level contracts.

### Current Focus

Completed.

Responsive behavior audit completed.

Responsive patch candidates prioritized as the implementation queue for targeted Phase 8 patches.

SectionComparison responsive patch completed as the first targeted Phase 8 patch.

Footer bottom-row responsive patch completed as the second targeted Phase 8 patch.

Navigation long-label responsive patch completed as the third targeted Phase 8 patch.

Gallery/demo responsive stress stories completed. Prioritized responsive patch queue is complete.

Section contract refinement review completed. No required section API refinements were found.

Gallery Surface Layout Polish completed as a small app-side gallery composition side quest.

Phase 8 closeout review completed before formal closeout.

Beacon Bar System Alignment completed as a small final Phase 8 side quest.

Phase 8 closeout review refreshed after Beacon Bar System Alignment before formal closeout.

### Closeout Summary

Phase 8 completed responsive polish and section contract review.

Completed:

- DemoShell Beacon Bar Polish
- responsive behavior audit
- responsive patch prioritization
- SectionComparison responsive patch
- Footer responsive patch
- Navigation responsive patch
- gallery/demo responsive stress stories
- section contract refinement review
- Gallery Surface Layout Polish
- Beacon Bar System Alignment
- closeout review
- closeout review refresh

No section or component API refinements were required.

Phase 9 — Static Data Shape Freeze is now the active phase.

## Phase 9 — Static Data Shape Freeze

Status: Active

Goal: Lock UI data contracts before CMS modeling.

### Current Focus

Plan static data shape freeze scope, UI data contract boundaries, fixture ownership rules, and normalized view model expectations before implementation.

## Phase 10 — Contentful Readiness

Goal: Plan CMS mapping after UI contracts stabilize.

## Phase 11 — Contentful Integration later

Goal: Integrate Contentful through adapters and normalized data models.

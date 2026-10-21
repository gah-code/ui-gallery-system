# Implementation Roadmap

## Separately governed Greenfield 06.4 conditional candidate

06.1, 06.2 and 06.3 are APPROVED / CHECKPOINTED. The incoming 06.3 pair is established under its accepted containing-commit rule; older PENDING/PROPOSED wording is a historical reconciliation snapshot. The eighteen-file 06.4 runtime is implemented offline and accepted at source/non-browser scope. This documentation-only conditional non-release reconciliation prepares candidate ledger `06.4-reconciliation-1`; External Final Validation is PENDING and 06.4 is NOT CHECKPOINTED. `portfolio-contract-v1.0.0` remains EFFECTIVE / FROZEN / UNCHANGED.

[D-064-01](../../contentful-greenfield-starter/docs/DECISIONS.md#d-064-01) is EXTERNALLY ACCEPTED WITH CONDITIONS and OWNER ADOPTED by risk owner Gilberto Haro. All 246 MB cases remain NOT RUN and six VISUAL records remain PARTIAL; zero completed parameterized browser cases. Obligations are due during 06.5 Consolidated Frontend Validation, before its final acceptance, with no automatic extension. I-064-03 browser closure is OPEN; V-064-01 historical Playwright BLOCKED / NOT RUN remains. N-063-01 is accepted only for local emitted ordering/membership. Public preview/deployment/publication/release and 06.6/Phase 06 closeout remain blocked on required evidence.

The CMS [candidate mapping ledger](../../contentful-greenfield-starter/docs/system/FRONTEND-CONTRACT-MAPPING.md), [06.4 report and exact deferred inventory](../../contentful-greenfield-starter/content-model/reports/PHASE-06-BATCH-06.4-FIXTURE-CONSUMER-PARITY-AND-ROUTE-RUNTIME-INTEGRATION.md#deferred-case-inventory) and [proposed conditional paired-checkpoint rule](../../contentful-greenfield-starter/docs/phases/PHASE-06-FRONTEND-CONTRACTS-AND-ADAPTER-BOUNDARY.md#batch-064-conditional-qualifying-checkpoint-rule) own these bindings. Exact-byte External Final Validation, separate Git authorization, both qualifying commits/pushes, clean synchronization and External Checkpoint Validation precede 06.5 eligibility; separate 06.5 execution authorization is still required. This pass reruns no tests, typecheck, lint, builds or browser checks. Phase 07 is NOT STARTED; frontend Phase 9 and its UI debt remain independent. The CMS links are sibling-checkout pointers to the pending documentation candidate; the established incoming 06.3 pair is recorded in the ledger/report.

Frontend Phase 9 remains in planning with its existing UI/accessibility debt open. Greenfield 06.4 adds the separate offline portfolio runtime; it does not replace the gallery or alter this independent lifecycle. Gallery/Storybook compile/discovery evidence is inherited; browser/provider proof, hosting and live Contentful transport remain unestablished. No runtime command or configuration changes in this documentation pass.


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

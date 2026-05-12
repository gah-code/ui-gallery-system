# Gallery Contracts

## Purpose

Gallery contracts define the expected metadata, browsing behavior, and demo surface boundaries before implementation.

## Contract Rules

- Gallery metadata should be static first.
- Gallery metadata should describe system pieces, not CMS content.
- Gallery pages should compose existing UI system layers.
- Gallery pages should not become the source of truth for component APIs.
- Storybook remains the primary design-system workspace.
- Demo pages should show realistic usage, not every possible state.
- Category browsing should stay simple at first.

## Implementation Order

```txt
Gallery metadata -> Gallery index -> Category browsing -> Demo shell -> Section comparison pages -> Gallery metadata connection
```

## Implemented Surfaces

- Gallery Index: Implemented
- Gallery Category Browsing: Implemented
- Demo Page Shell: Implemented
- Section Comparison Pages: Implemented
- Gallery Metadata Connection: Implemented

## Metadata Contract

### GalleryItem

Status: Implemented

Fields:

- id
- title
- category
- status
- description
- phase
- path
- storybook
- tags
- notes

### GalleryCategory

Status: Implemented

Values:

- foundation
- primitive
- pattern
- component
- section

### GalleryStatus

Status: Implemented

Values:

- planned
- implemented
- review
- deprecated

The metadata contract is static-first and may be refined during the later static data shape freeze phase.

## Browsing Behavior

Initial browsing should support:

- category grouping
- item title
- item description
- item status
- item phase
- optional tags
- optional links to demo/story surfaces

Do not implement advanced search yet.

## Demo Surface Boundaries

Demo surfaces should:

- use existing components
- show realistic compositions
- explain purpose and usage
- remain clearly separate from production pages

Demo surfaces should not:

- fetch live data
- assume Contentful
- implement app-shell behavior
- become production marketing pages

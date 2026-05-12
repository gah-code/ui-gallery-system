import type { GalleryCategorySummary } from './types';

export const galleryCategories: GalleryCategorySummary[] = [
  {
    id: 'foundation',
    title: 'Foundations',
    description: 'Tokens, base styles, typography roles, spacing, surfaces, and focus states.',
  },
  {
    id: 'primitive',
    title: 'Primitives',
    description: 'Low-level reusable UI elements such as Text, Button, Image, Input, Tag, Icon, and Status Label.',
  },
  {
    id: 'pattern',
    title: 'Layout Patterns',
    description: 'Reusable spatial systems for rows, grids, columns, sidebars, editorial layouts, and responsive composition.',
  },
  {
    id: 'component',
    title: 'Components',
    description: 'Reusable UI objects composed from primitives and layout patterns.',
  },
  {
    id: 'section',
    title: 'Sections',
    description: 'Section-level page compositions built from the complete UI system.',
  },
];

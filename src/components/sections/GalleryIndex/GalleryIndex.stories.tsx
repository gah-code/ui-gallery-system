import type { Meta, StoryObj } from '@storybook/react-vite';
import { GalleryIndex } from './GalleryIndex';

const meta = {
  title: 'Gallery/Gallery Index',
  component: GalleryIndex,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GalleryIndex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomIntro: Story = {
  args: {
    title: 'System browser',
    description:
      'A metadata-driven entry point for scanning completed foundations, primitives, patterns, components, and sections.',
  },
};

export const ShortPreviewLists: Story = {
  args: {
    previewItemLimit: 3,
  },
};

export const MetadataSummary: Story = {
  args: {
    title: 'Metadata summary',
    description:
      'Summary cards are calculated from static gallery metadata and category definitions.',
  },
};

export const ResponsiveStress: Story = {
  args: {
    title: 'Responsive metadata gallery index with extended category and preview content',
    description:
      'This story validates long heading copy, long descriptive copy, metadata summary cards, category card wrapping, preview list wrapping, and category descriptions across narrow, medium, and wide Storybook viewports.',
    previewItemLimit: 8,
  },
};

export const StorybookRelationship: Story = {
  args: {
    title: 'Gallery and Storybook relationship',
    description:
      'GalleryIndex is an app-side browsing aid. Storybook remains the primary design-system workspace.',
  },
};

export const AccessibilityNotes: Story = {
  args: {
    title: 'Gallery index accessibility notes',
    description:
      'GalleryIndex uses semantic section structure, readable headings, text-based category summaries, and visible counts so status and grouping are not communicated by layout or color alone.',
  },
};

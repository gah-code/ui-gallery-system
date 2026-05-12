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

export const StorybookRelationship: Story = {
  args: {
    title: 'Gallery and Storybook relationship',
    description:
      'GalleryIndex is an app-side browsing aid. Storybook remains the primary design-system workspace.',
  },
};

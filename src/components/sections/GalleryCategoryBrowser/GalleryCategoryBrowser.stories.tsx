import type { Meta, StoryObj } from '@storybook/react-vite';
import { GalleryCategoryBrowser } from './GalleryCategoryBrowser';

const meta = {
  title: 'Gallery/Gallery Category Browser',
  component: GalleryCategoryBrowser,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GalleryCategoryBrowser>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FoundationsDefault: Story = {
  args: {
    defaultCategory: 'foundation',
  },
};

export const ComponentsDefault: Story = {
  args: {
    defaultCategory: 'component',
  },
};

export const SectionsDefault: Story = {
  args: {
    defaultCategory: 'section',
  },
};

export const CustomIntro: Story = {
  args: {
    title: 'Browse by system layer',
    description:
      'Use category controls to inspect each metadata group without introducing app routes or advanced filters.',
  },
};

export const MetadataBehavior: Story = {
  args: {
    defaultCategory: 'component',
    title: 'Metadata-driven item cards',
    description:
      'Each card is rendered from static gallery metadata including phase, status, source path, Storybook reference, and tags.',
  },
};

export const States: Story = {
  args: {
    defaultCategory: 'section',
    title: 'Category selection states',
    description:
      'The browser starts with a selected category and uses button controls with pressed state to switch between metadata groups without route-level navigation.',
  },
};

export const StorybookRelationship: Story = {
  args: {
    defaultCategory: 'primitive',
    title: 'Gallery and Storybook relationship',
    description:
      'GalleryCategoryBrowser is an app-side browsing aid. Storybook remains the primary design-system workspace.',
  },
};

export const AccessibilityNotes: Story = {
  args: {
    defaultCategory: 'component',
    title: 'Category browser accessibility notes',
    description:
      'GalleryCategoryBrowser uses button controls for category selection, visible selected-category copy, and text metadata for phase, status, paths, Storybook references, and tags.',
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionComparison } from './SectionComparison';

const meta = {
  title: 'Sections/SectionComparison',
  component: SectionComparison,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SectionComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomIntro: Story = {
  args: {
    title: 'Completed section component comparisons',
    description:
      'A custom introduction for comparing Navigation, Hero, CTA Section, Feature Row, and Footer variants with realistic demo content.',
  },
};

export const DenseComparison: Story = {
  args: {
    title: 'Dense section comparison surface',
    description:
      'This story keeps the full comparison content in one app-side surface to validate long-page density, grouping, and responsive stacking.',
  },
};

export const StorybookRelationship: Story = {
  args: {
    title: 'Storybook relationship',
    description:
      'SectionComparison is an app-side comparison demo. Storybook remains the primary design-system workspace.',
  },
};

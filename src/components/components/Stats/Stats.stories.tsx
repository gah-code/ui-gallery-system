import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { Stats } from './Stats';
import type { StatItem, StatTone } from './Stats';

const defaultItems: StatItem[] = [
  {
    id: 'uptime',
    value: '99.9%',
    label: 'Platform uptime',
    description: 'Measured across core production surfaces.',
    tone: 'success',
  },
  {
    id: 'teams',
    value: '42',
    label: 'Teams onboarded',
    description: 'Active product and design teams.',
    tone: 'brand',
  },
  {
    id: 'hours',
    value: '18k',
    label: 'Hours saved',
    description: 'Estimated through reusable UI workflows.',
    tone: 'info',
  },
];

const meta = {
  title: 'Components/Batch 1/Stats',
  component: Stats,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: defaultItems,
  },
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.wide,
} as const;

const iconItems: StatItem[] = defaultItems.map((item, index) => ({
  ...item,
  icon: ['A', 'B', 'C'][index],
}));

const tones: StatTone[] = ['neutral', 'brand', 'success', 'warning', 'error', 'info'];

export const Default: Story = {
  render: () => <Stats items={defaultItems} columns="three" />,
};

export const TwoStats: Story = {
  render: () => (
    <Stats
      columns="two"
      items={[
        { value: '2x', label: 'Faster composition', description: 'Compared to ad hoc layouts.' },
        { value: '12', label: 'Reusable contracts', description: 'Across primitives and patterns.' },
      ]}
    />
  ),
};

export const ThreeStats: Story = {
  render: () => <Stats items={defaultItems} columns="three" />,
};

export const FourStats: Story = {
  render: () => (
    <Stats
      columns="four"
      items={[
        ...defaultItems,
        {
          id: 'components',
          value: '4',
          label: 'Components complete',
          description: 'Completed before this Stats pass.',
          tone: 'neutral',
        },
      ]}
    />
  ),
};

export const Compact: Story = {
  render: () => <Stats items={defaultItems} columns="three" density="compact" />,
};

export const Spacious: Story = {
  render: () => <Stats items={defaultItems} columns="three" density="spacious" align="center" />,
};

export const WithIcons: Story = {
  render: () => <Stats items={iconItems} columns="three" align="center" />,
};

export const ToneVariants: Story = {
  render: () => (
    <Stats
      columns="three"
      items={tones.map((tone) => ({
        id: tone,
        value: tone === 'neutral' ? '100' : '+24%',
        label: `${tone} tone`,
        description: 'Tone reinforces the stat but does not replace the label.',
        tone,
      }))}
    />
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <Stats
      columns="two"
      items={[
        {
          value: '128%',
          label: 'Extremely long stat label that should wrap without breaking the card layout',
          description:
            'Long descriptions should remain readable and expand vertically instead of forcing cramped columns.',
          tone: 'warning',
        },
        {
          value: '7.4m',
          label: 'Another intentionally verbose proof point label for wrapping validation',
          description:
            'The component should preserve readable value, label, and description hierarchy.',
          tone: 'info',
        },
      ]}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Empty items render no stats collection.</Text>
      <Stats items={[]} />
    </section>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Stats stack on small screens and introduce columns only when each metric remains readable.
      </Text>
      <Stats items={defaultItems} columns="auto" />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Stats should pair each number with a readable label or description. Icons and color are
        supplemental.
      </Text>
      <Stats items={iconItems} columns="three" />
    </section>
  ),
};

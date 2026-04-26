import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../components/ui/Text';
import { Tag } from '../../components/ui/Tag';
import { vars } from '../../styles';

const meta = {
  title: 'Patterns/Layout Patterns Overview',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const patterns = [
  { name: 'Row', status: 'Implemented' },
  { name: 'Grid', status: 'Implemented' },
  { name: 'SingleColumn', status: 'Implemented' },
  { name: 'Sidebar', status: 'Implemented' },
  { name: 'Magazine', status: 'Implemented' },
  { name: 'ZPattern', status: 'Implemented' },
  { name: 'FPattern', status: 'Implemented' },
  { name: 'Asymmetric', status: 'Planned' },
] as const;

export const Overview: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4], maxWidth: vars.font.measure.narrow }}>
      <Text variant="heading" as="h2">
        Phase 2 Layout Patterns
      </Text>
      <Text tone="secondary">
        Layout pattern stories validate spatial contracts, responsive behavior, and content stress.
        They are not final component or section demos.
      </Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: vars.space[2] }}>
        {patterns.map((pattern) => (
          <Tag key={pattern.name} variant={pattern.status === 'Implemented' ? 'success' : 'neutral'}>
            {pattern.name}: {pattern.status}
          </Tag>
        ))}
      </div>
    </section>
  ),
};

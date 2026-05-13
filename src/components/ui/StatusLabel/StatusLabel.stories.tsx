import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../Text';
import { StatusLabel } from './StatusLabel';
import type { StatusLabelSize, StatusLabelStatus } from './StatusLabel';

const meta = {
  title: 'Primitives/Status Label',
  component: StatusLabel,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Archived',
  },
} satisfies Meta<typeof StatusLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses: Array<{ status: StatusLabelStatus; label: string }> = [
  { status: 'success', label: 'Published' },
  { status: 'warning', label: 'Needs review' },
  { status: 'error', label: 'Blocked' },
  { status: 'info', label: 'Draft' },
  { status: 'neutral', label: 'Archived' },
];

const sizes: StatusLabelSize[] = ['sm', 'md'];
const demoIcon = <span aria-hidden="true">●</span>;

const wrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[2],
  flexWrap: 'wrap',
} as const;

const stackStyle = {
  display: 'grid',
  gap: vars.space[3],
  maxWidth: vars.font.measure.narrow,
} as const;

export const Default: Story = {
  render: () => <StatusLabel>Archived</StatusLabel>,
};

export const Statuses: Story = {
  render: () => (
    <section style={wrapStyle}>
      {statuses.map(({ status, label }) => (
        <StatusLabel key={status} status={status}>
          {label}
        </StatusLabel>
      ))}
    </section>
  ),
};

export const Sizes: Story = {
  render: () => (
    <section style={wrapStyle}>
      {sizes.map((size) => (
        <StatusLabel key={size} size={size} status="info">
          {size} status
        </StatusLabel>
      ))}
    </section>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <section style={wrapStyle}>
      {statuses.map(({ status, label }) => (
        <StatusLabel key={status} status={status} icon={demoIcon}>
          {label}
        </StatusLabel>
      ))}
    </section>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <div style={{ maxWidth: '16rem' }}>
      <StatusLabel status="warning">
        Needs review before publishing because required supporting content is incomplete
      </StatusLabel>
    </div>
  ),
};

export const CompactUsage: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[2], maxWidth: '32rem' }}>
      {statuses.map(({ status, label }) => (
        <div
          key={status}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(8rem, 1fr) auto',
            alignItems: 'center',
            gap: vars.space[3],
            paddingBlock: vars.space[1],
          }}
        >
          <Text variant="label">{label} item</Text>
          <StatusLabel status={status} size="sm">
            {label}
          </StatusLabel>
        </div>
      ))}
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={stackStyle}>
      <Text>
        Status labels should not rely on color alone. The visible text must carry the status
        meaning.
      </Text>
      <Text>
        Use StatusLabel for compact status communication. Use a future Alert component for larger
        messages or urgent announcements.
      </Text>
      <div style={wrapStyle}>
        <StatusLabel status="success">Success: Published</StatusLabel>
        <StatusLabel status="error">Error: Blocked</StatusLabel>
      </div>
    </section>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Input } from '../../ui/Input';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { vars } from '../../../styles';
import { FPattern } from './FPattern';

const meta = {
  title: 'Patterns/FPattern',
  component: FPattern,
  parameters: {
    layout: 'padded',
  },
  args: {
    lead: null,
  },
} satisfies Meta<typeof FPattern>;

export default meta;
type Story = StoryObj<typeof FPattern>;

const panelStyle = {
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

const mutedPanelStyle = {
  ...panelStyle,
  background: vars.color.surface.subtle,
  boxShadow: 'none',
} as const;

function LeadContent({ dense = false, long = false }: { dense?: boolean; long?: boolean }) {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: vars.space[2] }}>
        <Tag variant="brand">F-pattern</Tag>
        {dense ? <StatusLabel status="info">Content heavy</StatusLabel> : null}
      </div>
      <Text variant="display" as="h2">
        Lead with the strongest scan path
      </Text>
      <Text tone="secondary">
        FPattern keeps the heading, summary, and actions first, then places supporting content where
        it can be scanned without competing with the primary message.
      </Text>
      {long ? (
        <>
          <Text>
            This longer content validates that the lead area remains readable when paragraphs grow.
            The layout should support documentation previews, landing content blocks, editorial
            summaries, and action-oriented surfaces without becoming a full component system.
          </Text>
          <Text>
            On smaller screens, the hierarchy stacks in source order. At larger widths, supporting
            content can sit beside the lead only when the lead copy has enough room to breathe.
          </Text>
        </>
      ) : null}
    </>
  );
}

function SupportContent({ dense = false }: { dense?: boolean }) {
  const items = dense
    ? ['Audience', 'Use case', 'Status', 'Dependencies', 'Next action', 'Owner']
    : ['Audience', 'Use case', 'Next action'];

  return (
    <div style={mutedPanelStyle}>
      <Text variant="label" tone="muted">
        Supporting scan rail
      </Text>
      {items.map((item, index) => (
        <div key={item} style={{ display: 'grid', gap: vars.space[1] }}>
          <Text variant="label">{item}</Text>
          <Text tone="secondary">
            {index % 2 === 0 ? 'Primary supporting detail.' : 'Additional context for scanning.'}
          </Text>
        </div>
      ))}
    </div>
  );
}

const actions = (
  <>
    <Button>Primary action</Button>
    <Button variant="secondary">Secondary action</Button>
  </>
);

export const Default: Story = {
  render: () => <FPattern lead={<LeadContent />} support={<SupportContent />} actions={actions} />,
};

export const SparseContent: Story = {
  render: () => (
    <FPattern
      density="compact"
      lead={
        <>
          <Tag variant="neutral">Sparse</Tag>
          <Text variant="heading" as="h2">
            Short lead content
          </Text>
          <Text tone="secondary">A compact example with minimal supporting detail.</Text>
        </>
      }
      support={<Text tone="secondary">A single supporting note.</Text>}
    />
  ),
};

export const DenseContent: Story = {
  render: () => (
    <FPattern
      density="spacious"
      lead={<LeadContent dense long />}
      support={<SupportContent dense />}
      actions={actions}
      footer={
        <div style={panelStyle}>
          <Text variant="label" tone="muted">
            Details
          </Text>
          <Text>
            The footer spans the full pattern width at larger breakpoints and remains stacked in the
            normal scan order on small screens.
          </Text>
        </div>
      }
    />
  ),
};

export const WithActions: Story = {
  render: () => <FPattern lead={<LeadContent />} support={<SupportContent />} actions={actions} />,
};

export const WithRail: Story = {
  render: () => (
    <FPattern
      layout="withRail"
      lead={<LeadContent long />}
      support={
        <div style={panelStyle}>
          <StatusLabel status="warning">Needs review</StatusLabel>
          <Input label="Reference note" placeholder="Add a short note" />
          <Button variant="secondary" fullWidth>
            Save note
          </Button>
        </div>
      }
      actions={actions}
    />
  ),
};

export const WideLead: Story = {
  render: () => (
    <FPattern
      layout="wideLead"
      lead={<LeadContent long />}
      support={<SupportContent />}
      actions={actions}
    />
  ),
};

export const LongCopyStress: Story = {
  render: () => <FPattern lead={<LeadContent dense long />} support={<SupportContent dense />} />,
};

export const WithFooter: Story = {
  render: () => (
    <FPattern
      lead={<LeadContent />}
      support={<SupportContent />}
      actions={actions}
      footer={
        <div style={panelStyle}>
          <Text variant="heading" as="h3">
            Full-width detail area
          </Text>
          <Text tone="secondary">
            This area can hold extended details, caveats, or supporting documentation previews while
            staying inside the layout pattern contract.
          </Text>
        </div>
      }
    />
  ),
};

export const MixedPrimitiveContent: Story = {
  render: () => (
    <FPattern
      layout="wideLead"
      lead={
        <>
          <Image alt="" decorative aspectRatio="wide" radius="lg" fallback="Lead visual" />
          <LeadContent />
        </>
      }
      support={
        <div style={panelStyle}>
          <StatusLabel status="success">Published</StatusLabel>
          <Tag variant="brand" shape="pill">
            Primitive composition
          </Tag>
          <Text tone="secondary">
            The pattern composes primitives without introducing a reusable card or section.
          </Text>
        </div>
      }
      actions={actions}
    />
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4] }}>
      <Text>
        Small screens stack in scan order. Larger screens introduce supporting content beside the
        lead only when the lead content keeps readable space.
      </Text>
      <FPattern lead={<LeadContent long />} support={<SupportContent dense />} actions={actions} />
    </section>
  ),
};

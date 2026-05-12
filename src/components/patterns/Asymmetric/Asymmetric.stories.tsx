import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { vars } from '../../../styles';
import { Asymmetric } from './Asymmetric';

const meta = {
  title: 'Layout Patterns/Asymmetric',
  component: Asymmetric,
  parameters: {
    layout: 'padded',
  },
  args: {
    primary: null,
  },
} satisfies Meta<typeof Asymmetric>;

export default meta;
type Story = StoryObj<typeof Asymmetric>;

const panelStyle = {
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

const accentStyle = {
  ...panelStyle,
  background: vars.color.surface.subtle,
  boxShadow: 'none',
} as const;

function PrimaryContent({ long = false, reduced = false }: { long?: boolean; reduced?: boolean }) {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: vars.space[2] }}>
        <Tag variant="brand">Asymmetric</Tag>
        {!reduced ? <StatusLabel status="info">Editorial moment</StatusLabel> : null}
      </div>
      <Text variant={reduced ? 'heading' : 'display'} as="h2">
        Intentional uneven composition
      </Text>
      <Text tone="secondary">
        Asymmetric creates visual tension while keeping a safe stacked fallback and readable content
        hierarchy across breakpoints.
      </Text>
      {long ? (
        <>
          <Text>
            This longer primary content validates that the layout does not squeeze copy into an
            unreadable measure. The pattern is intended for expressive editorial moments, premium
            feature compositions, and portfolio storytelling without taking ownership of content.
          </Text>
          <Text>
            Larger screens introduce uneven columns only when the viewport can preserve enough space
            for the primary and secondary areas to remain useful.
          </Text>
        </>
      ) : null}
      {!reduced ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: vars.space[3] }}>
          <Button>Explore pattern</Button>
          <Button variant="secondary">View contract</Button>
        </div>
      ) : null}
    </>
  );
}

function SecondaryContent({ media = true, long = false }: { media?: boolean; long?: boolean }) {
  return (
    <div style={panelStyle}>
      {media ? <Image alt="" decorative aspectRatio="portrait" radius="lg" fallback="Secondary media" /> : null}
      <Text variant="label" tone="muted">
        Secondary surface
      </Text>
      <Text tone="secondary">
        Supporting content gets visual weight without overpowering the primary message.
      </Text>
      {long ? (
        <Text>
          This secondary copy intentionally runs longer to verify that offset and uneven-column
          treatments remain stable under content pressure.
        </Text>
      ) : null}
    </div>
  );
}

export const Default: Story = {
  render: () => <Asymmetric primary={<PrimaryContent />} secondary={<SecondaryContent />} />,
};

export const PrimaryLead: Story = {
  render: () => (
    <Asymmetric layout="primaryLead" primary={<PrimaryContent long />} secondary={<SecondaryContent />} />
  ),
};

export const SecondaryLead: Story = {
  render: () => (
    <Asymmetric
      layout="secondaryLead"
      primary={<PrimaryContent />}
      secondary={<SecondaryContent long />}
    />
  ),
};

export const OffsetLayout: Story = {
  render: () => (
    <Asymmetric
      layout="offset"
      offset="md"
      align="start"
      primary={<PrimaryContent />}
      secondary={<SecondaryContent />}
    />
  ),
};

export const ReverseLayout: Story = {
  render: () => (
    <Asymmetric reverse primary={<PrimaryContent />} secondary={<SecondaryContent media={false} />} />
  ),
};

export const MissingSecondary: Story = {
  render: () => <Asymmetric primary={<PrimaryContent long />} />,
};

export const WithAccent: Story = {
  render: () => (
    <Asymmetric
      primary={<PrimaryContent />}
      secondary={<SecondaryContent />}
      accent={
        <div style={accentStyle}>
          <Text variant="heading" as="h3">
            Full-width accent content
          </Text>
          <Text tone="secondary">
            Accent content spans the pattern at larger widths and stays in normal stacked order on
            smaller screens.
          </Text>
        </div>
      }
    />
  ),
};

export const ReducedContent: Story = {
  render: () => (
    <Asymmetric
      gap="md"
      primary={<PrimaryContent reduced />}
      secondary={<StatusLabel status="neutral">Reduced secondary</StatusLabel>}
    />
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <Asymmetric
      align="start"
      layout="primaryLead"
      primary={<PrimaryContent long />}
      secondary={<SecondaryContent long />}
      accent={
        <Text tone="secondary">
          Long-copy stress should preserve readable hierarchy, avoid horizontal scrolling, and keep
          offset treatments from becoming structural requirements.
        </Text>
      }
    />
  ),
};

export const MixedPrimitiveContent: Story = {
  render: () => (
    <Asymmetric
      layout="offset"
      offset="sm"
      primary={
        <>
          <Image alt="" decorative aspectRatio="wide" radius="lg" fallback="Primary visual" />
          <PrimaryContent />
        </>
      }
      secondary={
        <div style={panelStyle}>
          <StatusLabel status="success">Ready</StatusLabel>
          <Tag variant="brand" shape="pill">
            Primitive composition
          </Tag>
          <Text tone="secondary">
            The layout composes primitives without creating cards, sections, or CMS-aware surfaces.
          </Text>
          <Button variant="secondary" fullWidth>
            Review details
          </Button>
        </div>
      }
    />
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4] }}>
      <Text>
        Small screens stack safely. Larger screens introduce asymmetry only when content has enough
        space to remain readable.
      </Text>
      <Asymmetric
        layout="offset"
        offset="lg"
        primary={<PrimaryContent long />}
        secondary={<SecondaryContent long />}
      />
    </section>
  ),
};

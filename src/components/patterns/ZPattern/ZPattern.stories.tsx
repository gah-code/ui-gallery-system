import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { vars } from '../../../styles';
import { ZPattern } from './ZPattern';
import type { ZPatternItem } from './ZPattern';

const meta = {
  title: 'Patterns/ZPattern',
  component: ZPattern,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof ZPattern>;

export default meta;
type Story = StoryObj<typeof ZPattern>;

const panelStyle = {
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

function DemoMedia({ label }: { label: string }) {
  return <Image alt="" decorative aspectRatio="wide" radius="lg" fallback={label} />;
}

function StepContent({ step, title, long = false }: { step: string; title: string; long?: boolean }) {
  return (
    <div style={{ display: 'grid', gap: vars.space[4] }}>
      <div style={{ display: 'flex', gap: vars.space[2], flexWrap: 'wrap' }}>
        <Tag variant="brand">{step}</Tag>
        {long ? <StatusLabel status="info">Detailed step</StatusLabel> : null}
      </div>
      <Text variant="heading" as="h2">
        {title}
      </Text>
      <Text tone="secondary">
        ZPattern creates a journey rhythm by alternating media and content as the viewport allows.
      </Text>
      {long ? (
        <>
          <Text>
            This longer copy validates that the row remains readable without squeezing text into a
            narrow column. The pattern should support feature walkthroughs, process steps, and
            product storytelling without owning any business content.
          </Text>
          <Text>
            On small screens, every row stacks in source order. At larger widths, media and content
            can alternate to create a clear visual path.
          </Text>
        </>
      ) : null}
      <Button variant="secondary">Learn more</Button>
    </div>
  );
}

const threeItems: ZPatternItem[] = [
  {
    id: 'discover',
    media: <DemoMedia label="Discovery media" />,
    content: <StepContent step="Step 1" title="Discover the opportunity" />,
  },
  {
    id: 'shape',
    media: <DemoMedia label="Planning media" />,
    content: <StepContent step="Step 2" title="Shape the direction" />,
  },
  {
    id: 'deliver',
    media: <DemoMedia label="Delivery media" />,
    content: <StepContent step="Step 3" title="Deliver the system" />,
  },
];

const twoItems = threeItems.slice(0, 2);

export const Default: Story = {
  render: () => <ZPattern items={threeItems} />,
};

export const TwoRows: Story = {
  render: () => <ZPattern items={twoItems} />,
};

export const ThreeRows: Story = {
  render: () => <ZPattern items={threeItems} />,
};

export const MediaLeft: Story = {
  render: () => <ZPattern items={threeItems} mediaPosition="left" />,
};

export const MediaRight: Story = {
  render: () => <ZPattern items={threeItems} mediaPosition="right" />,
};

export const PerItemOverride: Story = {
  render: () => (
    <ZPattern
      items={[
        { ...threeItems[0], mediaPosition: 'right' },
        { ...threeItems[1], mediaPosition: 'left' },
        { ...threeItems[2], mediaPosition: 'right' },
      ]}
    />
  ),
};

export const MissingMedia: Story = {
  render: () => (
    <ZPattern
      items={[
        threeItems[0],
        {
          id: 'content-only',
          content: <StepContent step="Step 2" title="Continue without media" long />,
        },
        threeItems[2],
      ]}
    />
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <ZPattern
      align="start"
      items={[
        { ...threeItems[0], content: <StepContent step="Step 1" title="Long discovery copy" long /> },
        { ...threeItems[1], content: <StepContent step="Step 2" title="Long planning copy" long /> },
        { ...threeItems[2], content: <StepContent step="Step 3" title="Long delivery copy" long /> },
      ]}
    />
  ),
};

export const MixedPrimitiveContent: Story = {
  render: () => (
    <ZPattern
      items={[
        {
          id: 'mixed-one',
          media: (
            <div style={panelStyle}>
              <Image alt="" decorative aspectRatio="portrait" fallback="Primitive media" />
              <StatusLabel status="success">Available</StatusLabel>
            </div>
          ),
          content: (
            <div style={{ display: 'grid', gap: vars.space[4] }}>
              <Tag variant="brand">Mixed primitives</Tag>
              <Text variant="heading" as="h2">
                Compose primitives in each journey row
              </Text>
              <Text>
                ZPattern provides the alternating layout only. The caller owns the Text, Tags,
                Buttons, and media content.
              </Text>
              <Button>Continue</Button>
            </div>
          ),
        },
        threeItems[1],
      ]}
    />
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4] }}>
      <Text>
        Small screens stack each row. Medium and larger screens alternate media/content only when
        each side remains readable.
      </Text>
      <ZPattern items={threeItems} />
    </section>
  ),
};

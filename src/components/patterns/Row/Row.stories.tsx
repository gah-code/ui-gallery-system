import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../ui/Text';
import { Tag } from '../../ui/Tag';
import { vars } from '../../../styles';
import { Row } from './Row';
import type { RowAlign, RowGap } from './Row';

const meta = {
  title: 'Layout Patterns/Row',
  component: Row,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Row content',
  },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

const gaps: RowGap[] = ['sm', 'md', 'lg', 'xl'];
const aligns: RowAlign[] = ['start', 'center', 'end', 'stretch'];

const demoBlockStyle = {
  display: 'grid',
  gap: vars.space[2],
  minHeight: '8rem',
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

const shortBlockStyle = {
  ...demoBlockStyle,
  minHeight: '5rem',
} as const;

const tallBlockStyle = {
  ...demoBlockStyle,
  minHeight: '10rem',
} as const;

function DemoBlock({ title, children }: { title: string; children: string }) {
  return (
    <article style={demoBlockStyle}>
      <Tag variant="brand" size="sm">
        Demo item
      </Tag>
      <Text variant="heading" as="h3">
        {title}
      </Text>
      <Text tone="secondary">{children}</Text>
    </article>
  );
}

export const Default: Story = {
  render: () => (
    <Row>
      <DemoBlock title="Discover" children="A compact item in a related row." />
      <DemoBlock title="Compare" children="Rows wrap when each item can keep readable width." />
      <DemoBlock title="Choose" children="The pattern owns layout, not business content." />
    </Row>
  ),
};

export const TwoItems: Story = {
  render: () => (
    <Row minItemWidth="18rem">
      <DemoBlock title="Primary" children="Two-item rows support simple paired content." />
      <DemoBlock title="Secondary" children="The pair stacks on small screens." />
    </Row>
  ),
};

export const ThreeItems: Story = {
  render: () => (
    <Row>
      <DemoBlock title="First" children="Common feature-row behavior." />
      <DemoBlock title="Second" children="Balanced content can sit in a row." />
      <DemoBlock title="Third" children="Wrapping remains available when space tightens." />
    </Row>
  ),
};

export const FourItems: Story = {
  render: () => (
    <Row minItemWidth="14rem">
      <DemoBlock title="One" children="Four items can wrap safely." />
      <DemoBlock title="Two" children="No card component is created here." />
      <DemoBlock title="Three" children="The item width remains configurable." />
      <DemoBlock title="Four" children="Useful for future compact groups." />
    </Row>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[6] }}>
      {gaps.map((gap) => (
        <div key={gap} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">gap: {gap}</Text>
          <Row gap={gap} minItemWidth="10rem">
            <div style={shortBlockStyle}>One</div>
            <div style={shortBlockStyle}>Two</div>
            <div style={shortBlockStyle}>Three</div>
          </Row>
        </div>
      ))}
    </section>
  ),
};

export const Alignment: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[6] }}>
      {aligns.map((align) => (
        <div key={align} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">align: {align}</Text>
          <Row align={align} minItemWidth="10rem">
            <div style={shortBlockStyle}>Short</div>
            <div style={tallBlockStyle}>Taller item</div>
            <div style={shortBlockStyle}>Short</div>
          </Row>
        </div>
      ))}
    </section>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <Row minItemWidth="18rem">
      <DemoBlock
        title="Readable item"
        children="This item has normal copy and establishes the expected baseline."
      />
      <DemoBlock
        title="Long content stays safe"
        children="This item contains a much longer description to confirm the row wraps and preserves readable width instead of squeezing every item into a narrow horizontal strip too early."
      />
      <DemoBlock
        title="Another item"
        children="Siblings should continue to participate in the row without depending on equal content length."
      />
    </Row>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4], maxWidth: vars.font.measure.wide }}>
      <Text>
        Small screens stack. Medium and larger screens wrap into rows only when each item can
        preserve readable width.
      </Text>
      <Row minItemWidth="17rem" gap="lg">
        <DemoBlock title="Stack first" children="The default small-screen behavior is vertical." />
        <DemoBlock title="Wrap later" children="Rows begin at medium widths and keep item width safe." />
        <DemoBlock title="No CMS assumptions" children="The pattern only composes children." />
      </Row>
    </section>
  ),
};

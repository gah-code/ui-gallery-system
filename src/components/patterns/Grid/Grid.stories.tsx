import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../ui/Text';
import { Tag } from '../../ui/Tag';
import { vars } from '../../../styles';
import { Grid } from './Grid';
import type { GridColumns, GridGap } from './Grid';

const meta = {
  title: 'Patterns/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Grid content',
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const columnModes: GridColumns[] = ['auto', 'two', 'three', 'four'];
const gaps: GridGap[] = ['sm', 'md', 'lg', 'xl'];

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

const compactBlockStyle = {
  ...demoBlockStyle,
  minHeight: '5rem',
} as const;

const denseItems = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);

function DemoBlock({ title, children }: { title: string; children: string }) {
  return (
    <article style={demoBlockStyle}>
      <Tag variant="brand" size="sm">
        Grid item
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
    <Grid minItemWidth="15rem">
      <DemoBlock title="Auto fit" children="The default grid repeats items when width allows." />
      <DemoBlock title="Readable cells" children="Minimum item width prevents early squeezing." />
      <DemoBlock title="Flexible content" children="The pattern composes children only." />
      <DemoBlock title="Collection ready" children="Useful for future repeatable item layouts." />
    </Grid>
  ),
};

export const ColumnModes: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {columnModes.map((columns) => (
        <div key={columns} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">columns: {columns}</Text>
          <Grid columns={columns} minItemWidth="12rem">
            <div style={compactBlockStyle}>One</div>
            <div style={compactBlockStyle}>Two</div>
            <div style={compactBlockStyle}>Three</div>
            <div style={compactBlockStyle}>Four</div>
          </Grid>
        </div>
      ))}
    </section>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[6] }}>
      {gaps.map((gap) => (
        <div key={gap} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">gap: {gap}</Text>
          <Grid gap={gap} minItemWidth="10rem">
            <div style={compactBlockStyle}>One</div>
            <div style={compactBlockStyle}>Two</div>
            <div style={compactBlockStyle}>Three</div>
          </Grid>
        </div>
      ))}
    </section>
  ),
};

export const SparseGrid: Story = {
  render: () => (
    <Grid minItemWidth="18rem">
      <DemoBlock title="First item" children="Sparse collections should still feel intentional." />
      <DemoBlock title="Second item" children="Two items can share space without a special component." />
    </Grid>
  ),
};

export const DenseGrid: Story = {
  render: () => (
    <Grid minItemWidth="12rem" gap="sm">
      {denseItems.map((item) => (
        <article key={item} style={compactBlockStyle}>
          <Text variant="label">{item}</Text>
          <Text tone="secondary">Dense collection preview.</Text>
        </article>
      ))}
    </Grid>
  ),
};

export const UnevenContentHeights: Story = {
  render: () => (
    <Grid minItemWidth="16rem" align="start">
      <DemoBlock title="Short" children="Short item." />
      <DemoBlock
        title="Medium"
        children="This item has a little more text so height differences can appear naturally in the grid."
      />
      <DemoBlock
        title="Longer"
        children="This grid should tolerate uneven content heights without clipping or relying on a fixed card abstraction. Future components can decide whether equal heights are desirable."
      />
      <DemoBlock title="Short again" children="Another compact item." />
    </Grid>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <Grid minItemWidth="18rem">
      <DemoBlock
        title="Readable grid cell"
        children="Normal copy establishes the baseline rhythm for repeatable content."
      />
      <DemoBlock
        title="Long copy remains safe"
        children="This block intentionally contains a longer paragraph to confirm that the grid preserves readable width and lets content expand vertically instead of squeezing text into awkward narrow columns."
      />
      <DemoBlock
        title="Sibling item"
        children="The surrounding items continue to participate in the same responsive contract."
      />
    </Grid>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4], maxWidth: vars.font.measure.wide }}>
      <Text>
        Small screens use one column. Medium screens introduce columns only when items remain
        readable. Large screens can increase density when justified.
      </Text>
      <Grid minItemWidth="16rem" gap="lg">
        <DemoBlock title="One column first" children="The auto grid starts from readable stacked flow." />
        <DemoBlock title="Columns later" children="Columns appear when the minimum item width can fit." />
        <DemoBlock title="Density with care" children="More columns are useful only when content remains legible." />
        <DemoBlock title="Content agnostic" children="No cards, CMS data, or section logic live in Grid." />
      </Grid>
    </section>
  ),
};

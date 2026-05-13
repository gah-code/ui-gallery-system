import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Input } from '../../ui/Input';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { vars } from '../../../styles';
import { SingleColumn } from './SingleColumn';
import type {
  SingleColumnAlign,
  SingleColumnGap,
  SingleColumnWidth,
} from './SingleColumn';

const meta = {
  title: 'Layout Patterns/Single Column',
  component: SingleColumn,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'SingleColumn content',
  },
} satisfies Meta<typeof SingleColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

const widths: SingleColumnWidth[] = ['narrow', 'comfortable', 'wide', 'full'];
const gaps: SingleColumnGap[] = ['sm', 'md', 'lg', 'xl'];
const alignments: SingleColumnAlign[] = ['start', 'center', 'end', 'stretch'];

const panelStyle = {
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

const swatchStyle = {
  minHeight: '4rem',
  padding: vars.space[3],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface.subtle,
} as const;

function EditorialCopy() {
  return (
    <>
      <Tag variant="brand">Single column</Tag>
      <Text variant="display" as="h2">
        A readable stacked layout for focused content
      </Text>
      <Text variant="subheading" as="p">
        This pattern controls measure and rhythm without owning the content itself.
      </Text>
      <Text>
        SingleColumn is intended for editorial sections, documentation-like content, form blocks,
        and focused surfaces where stretching text across the full viewport would reduce readability.
      </Text>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <SingleColumn>
      <EditorialCopy />
    </SingleColumn>
  ),
};

export const WidthVariants: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {widths.map((width) => (
        <SingleColumn key={width} width={width} gap="sm">
          <Text variant="label">width: {width}</Text>
          <div style={panelStyle}>
            <Text>
              Width variants control readable measure. Use full width intentionally when content is
              not primarily long-form text.
            </Text>
          </div>
        </SingleColumn>
      ))}
    </section>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {gaps.map((gap) => (
        <SingleColumn key={gap} gap={gap} width="narrow">
          <Text variant="label">gap: {gap}</Text>
          <div style={swatchStyle}>First block</div>
          <div style={swatchStyle}>Second block</div>
          <div style={swatchStyle}>Third block</div>
        </SingleColumn>
      ))}
    </section>
  ),
};

export const Alignment: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {alignments.map((align) => (
        <SingleColumn key={align} align={align} width="comfortable">
          <Text variant="label">align: {align}</Text>
          <Tag variant="info">Primitive content</Tag>
          <div style={{ ...panelStyle, width: align === 'stretch' ? '100%' : 'fit-content' }}>
            <Text>Alignment controls child placement and text alignment inside the column.</Text>
          </div>
        </SingleColumn>
      ))}
    </section>
  ),
};

export const CenteredPosition: Story = {
  render: () => (
    <SingleColumn align="center" position="center" width="narrow">
      <Tag variant="success">Centered</Tag>
      <Text variant="heading" as="h2">
        Centered readable measure
      </Text>
      <Text tone="secondary">
        Positioning moves the whole column, while alignment controls how children sit inside it.
      </Text>
      <Button>Action</Button>
    </SingleColumn>
  ),
};

export const ShortContent: Story = {
  render: () => (
    <SingleColumn width="narrow" gap="sm">
      <Text variant="heading" as="h2">
        Short content
      </Text>
      <Text>Compact content should not need a special wrapper.</Text>
    </SingleColumn>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <SingleColumn width="comfortable" gap="lg">
      <Text variant="heading" as="h2">
        Long-form content keeps a readable measure
      </Text>
      <Text>
        This story intentionally uses paragraph-heavy content to validate line length and rhythm.
        The column keeps text from stretching too wide on large screens while remaining fully stacked
        across viewport sizes.
      </Text>
      <Text>
        Future sections can compose this pattern around richer components, but the layout contract
        stays content-agnostic. It manages width, spacing, alignment, and safety for long children.
      </Text>
      <Text>
        The default comfortable measure should be appropriate for most focused reading surfaces.
        Narrow and wide variants are available when the content type needs a tighter or broader
        presentation.
      </Text>
    </SingleColumn>
  ),
};

export const MixedPrimitiveContent: Story = {
  render: () => (
    <SingleColumn width="comfortable" gap="lg">
      <Image alt="" decorative fallback="Media placeholder" aspectRatio="wide" fit="cover" />
      <Tag variant="brand">Mixed primitives</Tag>
      <Text variant="heading" as="h2">
        SingleColumn composes existing primitives
      </Text>
      <Text tone="secondary">
        This is still a layout pattern, not a card, section, or form system.
      </Text>
      <Input label="Email" placeholder="name@example.com" helperText="Demo input inside a layout pattern." />
      <Button>Continue</Button>
    </SingleColumn>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <SingleColumn width="comfortable" gap="lg">
      <Text variant="heading" as="h2">
        Responsive contract
      </Text>
      <Text>
        SingleColumn keeps stacked content readable across viewports. Width variants control measure;
        full should be used intentionally.
      </Text>
      <Text tone="secondary">
        The pattern does not introduce columns at larger viewports. It protects focused content by
        controlling max width and vertical rhythm.
      </Text>
    </SingleColumn>
  ),
};

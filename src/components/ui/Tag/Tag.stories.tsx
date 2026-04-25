import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../Text';
import { Tag } from './Tag';
import type { TagShape, TagSize, TagVariant } from './Tag';

const meta = {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Category',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: TagVariant[] = ['neutral', 'brand', 'success', 'warning', 'error', 'info'];
const sizes: TagSize[] = ['sm', 'md'];
const shapes: TagShape[] = ['default', 'pill'];
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
} as const;

export const Default: Story = {
  render: () => <Tag>Category</Tag>,
};

export const Variants: Story = {
  render: () => (
    <section style={wrapStyle}>
      {variants.map((variant) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </section>
  ),
};

export const Sizes: Story = {
  render: () => (
    <section style={wrapStyle}>
      {sizes.map((size) => (
        <Tag key={size} size={size}>
          {size}
        </Tag>
      ))}
    </section>
  ),
};

export const Shapes: Story = {
  render: () => (
    <section style={wrapStyle}>
      {shapes.map((shape) => (
        <Tag key={shape} shape={shape}>
          {shape}
        </Tag>
      ))}
    </section>
  ),
};

export const LongLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '14rem' }}>
      <Tag>
        Very long category label that needs to wrap safely inside a constrained interface area
      </Tag>
    </div>
  ),
};

export const MultipleTags: Story = {
  render: () => (
    <section style={{ ...wrapStyle, maxWidth: '28rem' }}>
      <Tag>Design system</Tag>
      <Tag variant="brand">Featured</Tag>
      <Tag>Documentation</Tag>
      <Tag>Responsive</Tag>
      <Tag>Accessibility</Tag>
      <Tag>Storybook</Tag>
    </section>
  ),
};

export const StatusExamples: Story = {
  render: () => (
    <section style={{ ...stackStyle, maxWidth: vars.font.measure.narrow }}>
      <Text>
        Status tags should not rely on color alone. The text label should carry meaning.
      </Text>
      <div style={wrapStyle}>
        <Tag variant="success">Success: Published</Tag>
        <Tag variant="warning">Warning: Needs review</Tag>
        <Tag variant="error">Error: Blocked</Tag>
        <Tag variant="info">Info: Draft</Tag>
      </div>
    </section>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <section style={wrapStyle}>
      <Tag icon={demoIcon}>With icon</Tag>
      <Tag icon={demoIcon} variant="success">
        Published
      </Tag>
      <Tag icon={demoIcon} variant="warning">
        Needs review
      </Tag>
    </section>
  ),
};

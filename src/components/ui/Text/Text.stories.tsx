import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from './Text';
import type { TextAlign, TextTone, TextVariant } from './Text';

const meta = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Text renders semantic copy with system typography roles.',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: TextVariant[] = [
  'display',
  'heading',
  'subheading',
  'body',
  'caption',
  'label',
  'metadata',
];

const tones: TextTone[] = [
  'primary',
  'secondary',
  'muted',
  'inverse',
  'link',
  'success',
  'warning',
  'error',
  'info',
];

const alignments: TextAlign[] = ['start', 'center', 'end'];

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[4],
  maxWidth: vars.font.measure.comfortable,
} as const;

export const Default: Story = {
  render: () => <Text>Text renders semantic copy with system typography roles.</Text>,
};

export const Variants: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {variants.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant === 'metadata' ? 'Metadata label' : `${variant} text role`}
        </Text>
      ))}
    </section>
  ),
};

export const Tones: Story = {
  render: () => (
    <section style={{ ...surfaceStyle, background: vars.color.surface.page }}>
      {tones.map((tone) => (
        <Text key={tone} tone={tone}>
          {tone} tone
        </Text>
      ))}
      <div style={{ background: vars.color.surface.inverse, padding: vars.space[4] }}>
        <Text tone="inverse">inverse tone on an inverse surface</Text>
      </div>
    </section>
  ),
};

export const Alignment: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4], maxWidth: vars.font.measure.narrow }}>
      {alignments.map((align) => (
        <Text key={align} align={align}>
          This line uses {align} alignment.
        </Text>
      ))}
    </section>
  ),
};

export const SemanticHeadings: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text variant="metadata">Semantic rendering</Text>
      <Text as="h1" variant="display">
        Page title rendered as h1
      </Text>
      <Text as="h2" variant="heading">
        Section title rendered as h2
      </Text>
      <Text as="p" variant="subheading">
        Use `as` for document semantics and `variant` for visual style.
      </Text>
    </section>
  ),
};

export const LongCopy: Story = {
  render: () => (
    <article style={surfaceStyle}>
      <Text variant="metadata">Long copy rhythm</Text>
      <Text as="h2" variant="heading">
        A reusable text contract for future UI surfaces
      </Text>
      <Text>
        The Text primitive keeps semantic rendering separate from visual styling. This lets future
        components choose the correct document element while still using consistent typography,
        tone, and alignment rules from the foundation layer.
      </Text>
      <Text tone="secondary">
        Long copy should remain readable without requiring every component to redefine line height,
        spacing, color, or font choices.
      </Text>
    </article>
  ),
};

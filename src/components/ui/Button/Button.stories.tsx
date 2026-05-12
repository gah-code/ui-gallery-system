import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../Text';
import { Button } from './Button';
import type { ButtonSize, ButtonVariant } from './Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'link'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
const demoIcon = <span aria-hidden="true">→</span>;
const iconOnlyGlyph = <span aria-hidden="true">+</span>;

const stackStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[3],
  flexWrap: 'wrap',
} as const;

export const Default: Story = {
  render: () => <Button>Primary action</Button>,
};

export const Variants: Story = {
  render: () => (
    <section style={stackStyle}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </section>
  ),
};

export const Sizes: Story = {
  render: () => (
    <section style={stackStyle}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </section>
  ),
};

export const States: Story = {
  render: () => (
    <section style={stackStyle}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
      <Button href="https://storybook.js.org/" disabled>
        Disabled link
      </Button>
    </section>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <section style={stackStyle}>
      <Button icon={demoIcon}>Icon left</Button>
      <Button icon={demoIcon} iconPosition="right" variant="secondary">
        Icon right
      </Button>
    </section>
  ),
};

export const LinkButton: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[3], maxWidth: vars.font.measure.narrow }}>
      <Text>
        Use native button rendering for actions and href rendering for navigation.
      </Text>
      <Button href="https://storybook.js.org/" variant="link">
        Navigate to Storybook
      </Button>
    </section>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: '22rem' }}>
      <Button fullWidth>Full-width action</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <section style={{ ...stackStyle, alignItems: 'center' }}>
      <Button icon={iconOnlyGlyph} aria-label="Add item" />
      <Text variant="caption" tone="secondary">
        Icon-only buttons require an accessible label.
      </Text>
    </section>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../Button';
import { Text } from '../Text';
import { Icon } from './Icon';
import type { IconSize, IconTone } from './Icon';

function DemoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.75 14.6 9l5.8.84-4.2 4.1.99 5.78L12 17l-5.19 2.72.99-5.78-4.2-4.1L9.4 9 12 3.75Z" />
    </svg>
  );
}

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  args: {
    children: <DemoIcon />,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: IconSize[] = ['sm', 'md', 'lg', 'xl'];
const tones: IconTone[] = [
  'current',
  'primary',
  'secondary',
  'muted',
  'inverse',
  'brand',
  'success',
  'warning',
  'error',
  'info',
];

const wrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[4],
  flexWrap: 'wrap',
} as const;

const stackStyle = {
  display: 'grid',
  gap: vars.space[3],
  maxWidth: vars.font.measure.narrow,
} as const;

export const Default: Story = {
  render: () => (
    <Icon>
      <DemoIcon />
    </Icon>
  ),
};

export const Sizes: Story = {
  render: () => (
    <section style={wrapStyle}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'inline-flex', alignItems: 'center', gap: vars.space[2] }}>
          <Icon size={size} tone="brand">
            <DemoIcon />
          </Icon>
          <Text variant="label">{size}</Text>
        </div>
      ))}
    </section>
  ),
};

export const Tones: Story = {
  render: () => (
    <section style={{ ...wrapStyle, color: vars.color.text.primary }}>
      {tones.map((tone) => {
        const content = (
          <>
            <Icon tone={tone}>
              <DemoIcon />
            </Icon>
            <Text variant="label" tone={tone === 'current' ? 'primary' : 'secondary'}>
              {tone}
            </Text>
          </>
        );

        return tone === 'inverse' ? (
          <div
            key={tone}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: vars.space[2],
              padding: vars.space[2],
              background: vars.color.surface.inverse,
            }}
          >
            {content}
          </div>
        ) : (
          <div key={tone} style={{ display: 'inline-flex', alignItems: 'center', gap: vars.space[2] }}>
            {content}
          </div>
        );
      })}
    </section>
  ),
};

export const FunctionalIcon: Story = {
  render: () => (
    <section style={stackStyle}>
      <Text>Functional icons need an accessible label.</Text>
      <Icon decorative={false} label="Featured item" tone="brand" size="lg">
        <DemoIcon />
      </Icon>
    </section>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <Text as="p">
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: vars.space[1] }}>
        <Icon size="sm" tone="success">
          <DemoIcon />
        </Icon>
        Inline icon aligned with text
      </span>
    </Text>
  ),
};

export const IconOnlyGuidance: Story = {
  render: () => (
    <section style={stackStyle}>
      <Text>Icon-only interactive controls should provide an accessible label on the control.</Text>
      <Button icon={<DemoIcon />} aria-label="Save item" />
    </section>
  ),
};

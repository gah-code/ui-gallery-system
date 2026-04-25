import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../Text';
import { Input } from './Input';
import type { InputSize } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Email address',
    placeholder: 'name@example.com',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: InputSize[] = ['sm', 'md', 'lg'];

const stackStyle = {
  display: 'grid',
  gap: vars.space[4],
  maxWidth: '28rem',
} as const;

export const Default: Story = {
  render: () => <Input label="Email address" placeholder="name@example.com" />,
};

export const Sizes: Story = {
  render: () => (
    <section style={stackStyle}>
      {sizes.map((size) => (
        <Input key={size} label={`${size} input`} size={size} placeholder={`${size} size`} />
      ))}
    </section>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <Input
      label="Username"
      placeholder="your-name"
      helperText="Use 3-20 characters. Letters, numbers, and hyphens are supported."
    />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Input
      label="Email address"
      placeholder="name@example.com"
      defaultValue="not-an-email"
      error="Enter a valid email address."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Input
      label="Account ID"
      defaultValue="acct_12345"
      helperText="This value is managed by the system."
      disabled
    />
  ),
};

export const Required: Story = {
  render: () => (
    <Input
      label="Project name"
      placeholder="UI gallery system"
      helperText="Required fields show a visible marker and use the native required attribute."
      required
    />
  ),
};

export const Multiline: Story = {
  render: () => (
    <Input
      label="Description"
      placeholder="Describe the content or component state."
      helperText="Textarea mode supports longer copy and vertical resizing."
      multiline
      rows={5}
    />
  ),
};

export const NoLabel: Story = {
  render: () => (
    <section style={stackStyle}>
      <Text>
        Inputs should have a visible label whenever possible. If no visible label is used, provide
        an accessible name.
      </Text>
      <Input aria-label="Search components" placeholder="Search components" />
    </section>
  ),
};

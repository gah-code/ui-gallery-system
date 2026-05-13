import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { Alert } from './Alert';
import type { AlertVariant } from './Alert';

const meta = {
  title: 'Components/Batch 1/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Information available',
    children: 'This message provides useful context without interrupting the current workflow.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: AlertVariant[] = ['info', 'success', 'warning', 'error', 'neutral'];

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[4],
  maxWidth: vars.font.measure.comfortable,
} as const;

const iconMap: Record<AlertVariant, string> = {
  info: 'i',
  success: 'OK',
  warning: '!',
  error: 'X',
  neutral: '.',
};

function DemoIcon({ variant }: { variant: AlertVariant }) {
  return (
    <span aria-hidden="true" style={{ fontWeight: vars.font.weight.bold }}>
      {iconMap[variant]}
    </span>
  );
}

export const Default: Story = {
  render: () => (
    <Alert title="Information available">
      This message provides useful context without interrupting the current workflow.
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {variants.map((variant) => (
        <Alert key={variant} variant={variant} title={`${variant} alert`}>
          Visible text carries the meaning; color only reinforces the state.
        </Alert>
      ))}
    </section>
  ),
};

export const Compact: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Alert density="compact" variant="success" title="Compact success">
        Compact density keeps alert messaging small for dense interfaces.
      </Alert>
    </section>
  ),
};

export const MessageOnly: Story = {
  render: () => (
    <Alert variant="neutral">
      Message-only usage is supported when a title would add unnecessary repetition.
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {variants.map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          icon={<DemoIcon variant={variant} />}
          title={`${variant} with icon`}
        >
          The icon is supplemental and hidden from assistive technology.
        </Alert>
      ))}
    </section>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert
      variant="warning"
      title="Review recommended"
      actions={
        <>
          <Button size="sm">Review now</Button>
          <Button size="sm" variant="secondary">Dismiss</Button>
        </>
      }
    >
      Use the action slot for follow-up controls without making Alert own button behavior.
    </Alert>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <Alert variant="info" title="Long message remains readable">
      This alert intentionally includes a longer message to validate wrapping and vertical rhythm.
      Alerts should remain compact message surfaces rather than becoming full banners or section
      components, but they still need to support enough text for meaningful context.
    </Alert>
  ),
};

export const UrgentRoleGuidance: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Use role="alert" only for urgent live messages that should be announced immediately.
      </Text>
      <Alert role="alert" variant="error" title="Urgent error">
        This example explicitly opts into urgent announcement behavior.
      </Alert>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Alert does not use role="alert" by default. Use role="alert" only for urgent live messages.
        Visible text must carry meaning; color and icons are supplemental.
      </Text>
      <Alert variant="success" icon={<DemoIcon variant="success" />} title="Accessible success">
        The visible title and message explain the state without relying on color or icon alone.
      </Alert>
    </section>
  ),
};

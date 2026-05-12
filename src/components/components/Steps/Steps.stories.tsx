import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { Steps, type StepItem } from './Steps';

const meta = {
  title: 'Components/Batch 2/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

const storySurfaceStyle = {
  display: 'grid',
  gap: vars.space[6],
  maxWidth: vars.font.measure.wide,
} as const;

const noteStyle = {
  display: 'grid',
  gap: vars.space[3],
  maxWidth: vars.font.measure.comfortable,
} as const;

const baseSteps: StepItem[] = [
  {
    id: 'scope',
    title: 'Define the scope',
    description: 'Confirm the outcome, dependencies, and boundaries before implementation starts.',
  },
  {
    id: 'compose',
    title: 'Compose the system pieces',
    description: 'Use primitives, layout patterns, and reusable components instead of duplicating behavior.',
  },
  {
    id: 'verify',
    title: 'Verify the result',
    description: 'Run build checks and confirm docs, stories, and component exports agree.',
  },
];

const fiveSteps: StepItem[] = [
  ...baseSteps,
  {
    id: 'review',
    title: 'Review in Storybook',
    description: 'Validate responsive behavior, long copy, and interaction expectations.',
  },
  {
    id: 'ship',
    title: 'Prepare the next pass',
    description: 'Leave the phase state clear so the next component can start safely.',
  },
];

const iconSteps: StepItem[] = [
  {
    id: 'plan',
    title: 'Plan',
    description: 'Capture the sequence before changing implementation files.',
    icon: '1',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Implement only the scoped reusable component.',
    icon: '2',
  },
  {
    id: 'check',
    title: 'Check',
    description: 'Verify behavior and planning state together.',
    icon: '3',
  },
];

const statusSteps: StepItem[] = [
  {
    id: 'done',
    title: 'Planning complete',
    description: 'Contracts, dependencies, and Storybook expectations are documented.',
    status: 'complete',
    meta: <Tag variant="success">Complete</Tag>,
  },
  {
    id: 'current',
    title: 'Component implementation',
    description: 'The active step uses current status styling while visible text carries meaning.',
    status: 'current',
    meta: <Tag variant="brand">Current</Tag>,
  },
  {
    id: 'default',
    title: 'Verification',
    description: 'Build, Storybook build, and lint run after implementation.',
    status: 'default',
  },
  {
    id: 'disabled',
    title: 'Closeout',
    description: 'Disabled status is visual only; callers must disable interactive actions themselves.',
    status: 'disabled',
    meta: <Tag variant="neutral">Not started</Tag>,
  },
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={baseSteps} />
    </section>
  ),
};

export const ThreeSteps: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={baseSteps} layout="responsive" />
    </section>
  ),
};

export const FiveSteps: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={fiveSteps} layout="responsive" />
    </section>
  ),
};

export const IconSteps: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={iconSteps} variant="icon" layout="responsive" />
    </section>
  ),
};

export const Vertical: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={fiveSteps} layout="vertical" />
    </section>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={baseSteps} layout="horizontal" />
    </section>
  ),
};

export const Compact: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={fiveSteps} density="compact" layout="vertical" />
    </section>
  ),
};

export const Spacious: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={baseSteps} density="spacious" />
    </section>
  ),
};

export const Statuses: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={statusSteps} layout="vertical" />
    </section>
  ),
};

export const LongCopyStep: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps
        items={[
          {
            id: 'long',
            title:
              'Review extremely long setup instructions that must wrap without breaking the ordered sequence layout',
            description:
              'This story validates long-copy safety for process steps where labels, descriptions, metadata, or implementation guidance may run longer than ideal while still needing to preserve readable order and hierarchy.',
          },
          ...baseSteps.slice(1),
        ]}
        layout="vertical"
      />
    </section>
  ),
};

export const WithActions: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps
        items={[
          {
            id: 'read',
            title: 'Read the contract',
            description: 'Actions are caller-provided and remain outside the Steps behavior contract.',
            actions: <Button variant="secondary">Open contract</Button>,
          },
          {
            id: 'continue',
            title: 'Continue implementation',
            description: 'The component does not enable or disable actions automatically.',
            actions: <Button>Continue</Button>,
          },
        ]}
        layout="vertical"
      />
    </section>
  ),
};

export const EmptyItems: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Steps items={[]} />
      <Text tone="secondary">Empty step arrays render nothing.</Text>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <Steps items={statusSteps.slice(0, 3)} layout="vertical" />
      <Text tone="secondary">
        Steps use ordered-list semantics. Sequence is visible through text and/or numbering; icons
        and status styling are supplemental.
      </Text>
    </section>
  ),
};

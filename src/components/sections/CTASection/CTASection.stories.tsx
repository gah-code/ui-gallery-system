import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../../components/Alert';
import { FeatureBox } from '../../components/FeatureBox';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { CTASection } from './CTASection';

const defaultActions = (
  <>
    <Button href="#start">Start building</Button>
    <Button href="#docs" variant="secondary">
      View docs
    </Button>
  </>
);

const meta = {
  title: 'Sections/CTA Section',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Ready to compose the next page surface?',
    description:
      'Use CTASection to create a focused action moment with clear copy, accessible actions, and responsive layout behavior.',
    actions: defaultActions,
  },
} satisfies Meta<typeof CTASection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    variant: 'centered',
    contentWidth: 'narrow',
    title: 'A centered action with controlled measure',
    description:
      'Centered CTAs should keep text readable and make the primary action easy to find.',
  },
};

export const Split: Story = {
  args: {
    variant: 'split',
    contentWidth: 'comfortable',
    title: 'Pair the action with supporting context',
    description:
      'Split layout stacks on small screens and uses a support column only when support content exists.',
    support: (
      <FeatureBox
        title="Support content"
        description="This slot can hold an alert, visual, lightweight form composition, or supporting component without owning the business flow."
        status={{ label: 'Scoped slot', status: 'info' }}
        tone="raised"
      />
    ),
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    density: 'compact',
    title: 'Compact CTA for tight page moments',
    description: 'Use compact density when the CTA needs less vertical space.',
  },
};

export const TwoActions: Story = {
  args: {
    title: 'Choose the right next step',
    description:
      'Primary and secondary actions are caller-provided nodes, usually Button or accessible links.',
    actions: (
      <>
        <Button href="#primary">Primary action</Button>
        <Button href="#secondary" variant="secondary">
          Secondary action
        </Button>
      </>
    ),
  },
};

export const WithStatusAndMetadata: Story = {
  args: {
    eyebrow: 'Phase 5 sections',
    status: { label: 'Implementation active', status: 'info' },
    title: 'Metadata can clarify why this action matters',
    description:
      'Eyebrow metadata and status labels wrap safely and do not rely on color alone for meaning.',
  },
};

export const WithTags: Story = {
  args: {
    title: 'Use tags for short supporting context',
    description:
      'Tags can identify audience, priority, release stage, or content type without turning the CTA into route data.',
    tags: [
      { label: 'Reusable', variant: 'brand' },
      { label: 'Accessible', variant: 'success' },
      { label: 'Responsive', variant: 'info' },
    ],
  },
};

export const WithSupportContent: Story = {
  args: {
    variant: 'split',
    title: 'Support content stays scoped',
    description:
      'Support content can reinforce the action without making CTASection responsible for submission, routing, or product flow.',
    support: (
      <Alert variant="info" title="Support slot guidance">
        This slot is presentational. Use it for supporting context, not for route-level behavior or business logic.
      </Alert>
    ),
  },
};

export const BrandTone: Story = {
  args: {
    tone: 'brand',
    title: 'Brand tone for high-emphasis calls to action',
    description:
      'Brand tone uses inverse text treatment while preserving the same semantic structure and caller-provided actions.',
    actions: (
      <>
        <Button href="#start" variant="secondary">
          Start now
        </Button>
        <Button href="#learn" variant="ghost">
          Learn more
        </Button>
      </>
    ),
  },
};

export const Framed: Story = {
  args: {
    tone: 'raised',
    framed: true,
    title: 'A framed CTA surface',
    description:
      'Use framed CTAs when the action should read as a contained section inside a larger page rhythm.',
  },
};

export const LongCopy: Story = {
  args: {
    density: 'spacious',
    title:
      'A deliberately long CTA heading that should wrap cleanly without clipping, truncation, or layout overflow',
    description:
      'This story validates long-copy behavior for realistic content. The section keeps heading, description, metadata, actions, support content, and footer content in a safe responsive grid without becoming a full page template.',
    footer: (
      <Text as="p" variant="caption" tone="muted">
        Footer notes can provide concise disclaimers, timing details, or contextual reminders.
      </Text>
    ),
  },
};

export const ResponsiveContract: Story = {
  render: () => (
    <CTASection
      variant="split"
      title="Responsive behavior contract"
      description="CTASection stacks on small screens. Split layout only introduces a support column when support content exists and width allows."
      actions={defaultActions}
      support={
        <Alert variant="success" title="Responsive support">
          Resize the viewport to confirm the support slot stacks before becoming a readable second column.
        </Alert>
      }
    />
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <CTASection
      title="CTASection accessibility notes"
      description="CTASection preserves heading semantics and expects actions to be accessible Button or link nodes. It does not implement form submission or business flow."
      actions={<Button href="#accessibility">Review accessibility guidance</Button>}
    />
  ),
};

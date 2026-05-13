import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { FeatureBox } from './FeatureBox';

const meta = {
  title: 'Components/Batch 1/Feature Box',
  component: FeatureBox,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Reusable feature block',
    description:
      'Highlight a capability or benefit without taking over section-level layout responsibility.',
  },
} satisfies Meta<typeof FeatureBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.comfortable,
} as const;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))',
  gap: vars.space[4],
} as const;

function SparkIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 28 28" width="28">
      <path
        d="M14 3l2.7 7.3L24 13l-7.3 2.7L14 23l-2.7-7.3L4 13l7.3-2.7L14 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Default: Story = {
  render: () => (
    <FeatureBox
      eyebrow="Capability"
      title="Reusable feature block"
      description="Use FeatureBox for compact feature, benefit, service, or value proposition summaries."
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <FeatureBox
      variant="icon"
      icon={<SparkIcon />}
      title="Icon-supported feature"
      description="The icon is supplemental and decorative by default; visible text carries the meaning."
    />
  ),
};

export const WithMedia: Story = {
  render: () => (
    <FeatureBox
      variant="media"
      media={
        <Image
          alt="Abstract feature preview"
          aspectRatio="wide"
          fallback="Feature media"
          radius="none"
        />
      }
      title="Media-supported feature"
      description="The media slot composes the Image primitive without assuming a CMS image shape."
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <FeatureBox
      variant="compact"
      title="Compact feature"
      description="Reduced spacing supports dense component collections without creating a new section pattern."
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <FeatureBox
      title="Actionable feature"
      description="Actions are passed as nodes so callers can choose accessible button or link behavior."
      actions={<Button variant="secondary">Learn more</Button>}
    />
  ),
};

export const WithTagsAndStatus: Story = {
  render: () => (
    <FeatureBox
      status={{ label: 'Available', status: 'success' }}
      tags={[
        { label: 'Workflow', variant: 'brand' },
        { label: 'Reusable', variant: 'info' },
      ]}
      title="Metadata-supported feature"
      description="Tags and status labels provide compact context while preserving readable feature text."
    />
  ),
};

export const Centered: Story = {
  render: () => (
    <FeatureBox
      align="center"
      icon={<SparkIcon />}
      title="Centered presentation"
      description="Center alignment supports compact marketing or product moments inside a parent layout pattern."
    />
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <FeatureBox
      density="spacious"
      eyebrow="Dense copy stress"
      title="Feature blocks can hold more content when necessary"
      description="This example intentionally includes more copy than ideal to validate wrapping, vertical rhythm, and the component boundary. FeatureBox remains a reusable block and does not become a feature section, route composition, or gallery page."
      footer={<Text variant="caption" tone="muted">Footer content stays scoped to this block.</Text>}
    />
  ),
};

export const LongHeading: Story = {
  render: () => (
    <FeatureBox
      title="A very long feature heading that should wrap safely without causing horizontal overflow or collapsing the content block"
      description="Long headings and descriptions use wrapping safeguards so the component remains stable in narrow containers."
    />
  ),
};

export const ToneVariants: Story = {
  render: () => (
    <section style={gridStyle}>
      {(['default', 'subtle', 'raised', 'outline'] as const).map((tone) => (
        <FeatureBox
          key={tone}
          tone={tone}
          title={`${tone} tone`}
          description="Surface tone changes presentation without changing the component contract."
        />
      ))}
    </section>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        FeatureBox is a reusable content block. It can live inside Row/Grid patterns later but does
        not own section-level layout.
      </Text>
      <section style={gridStyle}>
        <FeatureBox icon={<SparkIcon />} title="Composable" description="Works in parent grids." />
        <FeatureBox title="Scoped" description="Does not create route or section layout." />
        <FeatureBox title="Readable" description="Copy wraps safely at smaller widths." />
      </section>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Icons are supplemental and decorative by default. Meaning is carried by visible text. Actions
        should use accessible Button or link behavior.
      </Text>
      <FeatureBox
        icon={<SparkIcon />}
        title="Accessible feature summary"
        description="The title and description explain the capability; the icon only supports recognition."
        actions={<Button href="#feature-box-accessibility" variant="link">Read guidance</Button>}
      />
    </section>
  ),
};

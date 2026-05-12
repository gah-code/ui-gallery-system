import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { Card } from './Card';

const meta = {
  title: 'Components/Batch 1/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Reusable content card',
    description: 'Cards compose primitive content into portable preview and summary surfaces.',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const storySurfaceStyle = {
  display: 'grid',
  gap: vars.space[6],
  maxWidth: vars.font.measure.comfortable,
} as const;

const wideSurfaceStyle = {
  display: 'grid',
  gap: vars.space[6],
  maxWidth: vars.font.measure.wide,
} as const;

const mediaSlot = (
  <Image
    alt=""
    decorative
    aspectRatio="wide"
    radius="none"
    fallback="Media slot"
  />
);

const portraitMediaSlot = (
  <Image
    alt=""
    decorative
    aspectRatio="portrait"
    radius="none"
    fallback="Portrait media"
  />
);

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        title="Reusable content card"
        description="Cards compose primitive content into portable preview and summary surfaces."
      />
    </section>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        variant="media"
        media={mediaSlot}
        eyebrow="Pattern preview"
        title="Card with a media slot"
        description="Media is passed as a slot so the component does not own image data shape or CMS assumptions."
      />
    </section>
  ),
};

export const Compact: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        variant="compact"
        title="Compact card"
        description="Compact cards reduce internal spacing for dense summaries."
        tags={[{ label: 'Compact', variant: 'brand' }]}
      />
    </section>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <section style={wideSurfaceStyle}>
      <Card
        variant="horizontal"
        tone="raised"
        media={portraitMediaSlot}
        eyebrow="Responsive layout"
        title="Horizontal when width allows"
        description="The horizontal variant stacks on small screens and only introduces media/content columns at larger widths."
      />
    </section>
  ),
};

export const WithTags: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        title="Tagged content"
        description="Tags use the existing Tag primitive and remain optional metadata."
        tags={[
          { label: 'Feature', variant: 'brand' },
          { label: 'Stable', variant: 'success' },
          { label: 'Docs', variant: 'info' },
        ]}
      />
    </section>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        title="Status-aware card"
        description="Status messaging composes the StatusLabel primitive without creating new status styling."
        status={{ label: 'Available', status: 'success' }}
      />
    </section>
  ),
};

export const WithActions: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        title="Action card"
        description="Actions are passed as nodes so callers can choose Button behavior without the Card owning it."
        actions={
          <>
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary</Button>
          </>
        }
      />
    </section>
  ),
};

export const LinkedTitle: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        href="#linked-title"
        title="Only the title is linked"
        description="The card avoids whole-surface click behavior by default, which prevents invalid nested interactive content."
        actions={<Button variant="secondary">Separate action</Button>}
      />
    </section>
  ),
};

export const LongCopy: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        title="Long copy remains readable"
        description="This card intentionally includes longer descriptive content to confirm that typography, wrapping, and vertical rhythm remain stable without forcing fixed heights or truncation."
        footer={
          <Text tone="secondary">
            Footer content can carry supporting details, secondary metadata, or disclosure text while
            remaining independent of the main description.
          </Text>
        }
      >
        <Text tone="secondary">
          Additional slotted body content can be composed when a summary needs more than title and
          description. The card still keeps layout behavior local and avoids section-specific logic.
        </Text>
      </Card>
    </section>
  ),
};

export const MissingMedia: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        variant="horizontal"
        title="Missing media fallback"
        description="When media is omitted, the card falls back to a normal stacked content layout instead of reserving an empty column."
        tags={[{ label: 'No media' }]}
      />
    </section>
  ),
};

export const DenseMetadata: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Card
        tone="subtle"
        title="Dense metadata"
        description="Dense metadata combines status, tags, and custom meta content without introducing a new metadata component."
        status={{ label: 'In review', status: 'warning' }}
        tags={[
          { label: 'Case study', variant: 'brand' },
          { label: 'Editorial', variant: 'info' },
          { label: 'Longform', variant: 'neutral' },
        ]}
        meta={<Text variant="metadata">Updated Apr 2026</Text>}
        actions={<Button variant="link" href="#dense-metadata">Read more</Button>}
      />
    </section>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={wideSurfaceStyle}>
      <Text>
        Card supports stacked content by default. Horizontal layout only becomes two-column when
        width allows. Link behavior is title-scoped by default to avoid invalid nested interactive
        content.
      </Text>
      <Card
        variant="horizontal"
        media={mediaSlot}
        href="#responsive-card"
        title="Responsive and accessible by default"
        description="The card composes media, text, metadata, actions, and footer content while keeping the interactive link scoped to the title."
        status={{ label: 'Contract', status: 'info' }}
        tags={[{ label: 'Responsive' }, { label: 'Accessible', variant: 'success' }]}
        actions={<Button>Review contract</Button>}
      />
    </section>
  ),
};

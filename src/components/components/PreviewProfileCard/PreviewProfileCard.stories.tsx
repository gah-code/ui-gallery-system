import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { PreviewProfileCard } from './PreviewProfileCard';
import type { PreviewProfileCardImageShape } from './PreviewProfileCard';

const meta = {
  title: 'Components/Batch 1/Preview Profile Card',
  component: PreviewProfileCard,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Jordan Lee',
    summary: 'Product designer focused on modular systems and accessible interface patterns.',
  },
} satisfies Meta<typeof PreviewProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.comfortable,
} as const;

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
  gap: vars.space[4],
} as const;

const profileImage = {
  alt: 'Portrait of Jordan Lee',
};

const articleImage = {
  alt: 'Abstract editorial preview',
};

export const Profile: Story = {
  render: () => (
    <PreviewProfileCard
      variant="profile"
      image={profileImage}
      eyebrow="Team"
      title="Jordan Lee"
      summary="Product designer focused on modular systems and accessible interface patterns."
      description="Design systems, prototyping, accessibility reviews."
      tags={[{ label: 'Design', variant: 'brand' }, { label: 'A11y', variant: 'info' }]}
    />
  ),
};

export const ArticlePreview: Story = {
  render: () => (
    <PreviewProfileCard
      variant="article"
      image={articleImage}
      imageShape="rounded"
      eyebrow="Article"
      title="Designing previews without route assumptions"
      summary="A reusable preview card can show article-like content while keeping links scoped and data normalized."
      description="6 min read"
      tags={[{ label: 'Editorial' }, { label: 'Systems', variant: 'brand' }]}
      href="#article-preview"
    />
  ),
};

export const ProjectPreview: Story = {
  render: () => (
    <PreviewProfileCard
      variant="project"
      image={{ alt: 'Project interface preview' }}
      imageShape="square"
      title="Component inventory refresh"
      summary="A project preview with action support and clear destination behavior."
      status={{ label: 'In review', status: 'warning' }}
      actions={<Button variant="secondary">View project</Button>}
    />
  ),
};

export const CaseStudyPreview: Story = {
  render: () => (
    <PreviewProfileCard
      variant="caseStudy"
      tone="raised"
      image={{ alt: 'Case study visual preview' }}
      eyebrow="Case study"
      title="Improving browse-to-build handoff"
      summary="A compact case-study preview with status, metadata, and a title-scoped destination."
      status={{ label: 'Published', status: 'success' }}
      meta={<Text as="span" variant="caption" tone="muted">2026</Text>}
      href="#case-study-preview"
    />
  ),
};

export const MissingImage: Story = {
  render: () => (
    <PreviewProfileCard
      variant="article"
      image={{ alt: 'Missing article image' }}
      title="Missing image fallback"
      summary="An image object without a source uses the Image primitive fallback and keeps the card stable."
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <PreviewProfileCard
      layout="compact"
      image={{ alt: 'Compact profile image' }}
      title="Compact profile"
      summary="Reduced spacing supports dense preview lists."
      tags={[{ label: 'Compact' }]}
    />
  ),
};

export const Horizontal: Story = {
  render: () => (
    <PreviewProfileCard
      layout="horizontal"
      variant="project"
      image={{ alt: 'Horizontal project preview' }}
      imageShape="rounded"
      title="Horizontal preview"
      summary="Horizontal layout stacks first, then becomes two-column only when the viewport can preserve readable content."
      actions={<Button variant="secondary">Open preview</Button>}
    />
  ),
};

export const DenseMetadata: Story = {
  render: () => (
    <PreviewProfileCard
      variant="caseStudy"
      image={{ alt: 'Dense metadata preview' }}
      title="Dense metadata example"
      summary="Tags, status, and custom metadata wrap safely without becoming a CMS-shaped content model."
      status={{ label: 'Featured', status: 'info' }}
      tags={[
        { label: 'Case Study', variant: 'brand' },
        { label: 'Research' },
        { label: 'Launch', variant: 'success' },
      ]}
      meta={<Text as="span" variant="caption" tone="muted">Updated Apr 2026</Text>}
    />
  ),
};

export const LongCopy: Story = {
  render: () => (
    <PreviewProfileCard
      density="spacious"
      variant="article"
      image={{ alt: 'Long copy article preview' }}
      title="A long preview title that should wrap safely across multiple lines without causing horizontal overflow"
      summary="This summary intentionally includes more copy than ideal to validate long-copy behavior, vertical rhythm, and safe wrapping inside the reusable card surface. The component remains a preview object rather than a route-level article section."
      description="Long copy should expand the card vertically while preserving metadata and action placement."
    />
  ),
};

export const LinkedTitle: Story = {
  render: () => (
    <PreviewProfileCard
      variant="article"
      image={{ alt: 'Linked title preview' }}
      title="Only the title is linked"
      summary="The whole card is not clickable, avoiding nested interactive ambiguity when actions are also present."
      href="#linked-title"
      actions={<Button variant="ghost">Secondary action</Button>}
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <PreviewProfileCard
      variant="project"
      image={{ alt: 'Action preview visual' }}
      title="Action-ready preview"
      summary="Actions are passed as nodes so consumers can choose accessible Button or link behavior."
      actions={
        <>
          <Button>Open</Button>
          <Button variant="secondary">Save</Button>
        </>
      }
    />
  ),
};

export const ImageShapes: Story = {
  render: () => (
    <section style={gridStyle}>
      {(['rounded', 'circle', 'square'] as PreviewProfileCardImageShape[]).map((shape) => (
        <PreviewProfileCard
          key={shape}
          image={{ alt: `${shape} preview image` }}
          imageShape={shape}
          title={`${shape} image`}
          summary="Image shape changes presentation without changing the preview content contract."
        />
      ))}
    </section>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        PreviewProfileCard stacks by default. Horizontal layout only becomes two-column when content
        can remain readable. Links are title-scoped by default.
      </Text>
      <PreviewProfileCard
        layout="horizontal"
        image={{ alt: 'Responsive preview image' }}
        title="Responsive preview behavior"
        summary="This story validates the component contract without creating a section-level layout."
      />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Images use the Image primitive. Meaningful images need alt text; decorative images should be
        marked decorative. Whole-card click behavior is avoided by default.
      </Text>
      <PreviewProfileCard
        image={{ alt: 'Accessible profile preview' }}
        title="Accessible preview surface"
        summary="The image, title, summary, metadata, and actions keep separate semantics."
        href="#accessibility-notes"
      />
    </section>
  ),
};

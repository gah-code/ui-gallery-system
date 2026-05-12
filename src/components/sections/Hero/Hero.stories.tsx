import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { Hero } from './Hero';

function demoImage(label: string, accent = '#2563eb') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" role="img" aria-label="${label}"><rect width="1200" height="760" fill="#f8fafc"/><rect x="96" y="84" width="1008" height="592" rx="42" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/><circle cx="180" cy="160" r="18" fill="${accent}"/><circle cx="238" cy="160" r="18" fill="#94a3b8"/><circle cx="296" cy="160" r="18" fill="#cbd5e1"/><rect x="156" y="234" width="376" height="46" rx="16" fill="#e2e8f0"/><rect x="156" y="318" width="760" height="34" rx="14" fill="#cbd5e1"/><rect x="156" y="386" width="620" height="34" rx="14" fill="#e2e8f0"/><rect x="156" y="500" width="260" height="78" rx="22" fill="${accent}"/><rect x="470" y="500" width="390" height="78" rx="22" fill="#dbeafe"/></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const meta = {
  title: 'Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Build consistent product surfaces without rebuilding the system',
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultActions = (
  <>
    <Button href="#start">Start building</Button>
    <Button href="#docs" variant="secondary">
      View docs
    </Button>
  </>
);

export const Default: Story = {
  args: {
    intro:
      'Compose production-ready primitives, layout patterns, and reusable components into focused page introductions.',
    actions: defaultActions,
  },
};

export const TextOnly: Story = {
  args: {
    title: 'A focused content-first hero',
    intro:
      'Use the text-only hero when the headline and supporting copy carry the page introduction without needing media.',
  },
};

export const WithMedia: Story = {
  args: {
    variant: 'media',
    contentWidth: 'wide',
    title: 'A hero with media that stays readable',
    intro:
      'The media variant stacks on narrow screens and only introduces columns when there is enough room.',
    actions: defaultActions,
    media: (
      <Image
        src={demoImage('Product dashboard preview')}
        alt="Product dashboard preview"
        aspectRatio="wide"
        radius="xl"
      />
    ),
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    title: 'Centered launch message with controlled measure',
    intro:
      'Centered heroes keep the content width constrained so long lines remain readable across viewport sizes.',
    tags: [
      { label: 'Design system', variant: 'brand' },
      { label: 'Reusable sections' },
    ],
    actions: defaultActions,
  },
};

export const Split: Story = {
  args: {
    variant: 'split',
    contentWidth: 'wide',
    title: 'Split layout for high-context introductions',
    intro:
      'Use split heroes when the media supports the main message without replacing the heading or call to action.',
    media: (
      <Image
        src={demoImage('Editorial layout preview', '#0f766e')}
        alt="Editorial layout preview"
        aspectRatio="wide"
        radius="xl"
      />
    ),
  },
};

export const WithStatusAndMetadata: Story = {
  args: {
    eyebrow: 'Phase 5 section layer',
    status: { label: 'Active', status: 'info' },
    title: 'Metadata and status can introduce context before the heading',
    intro:
      'Status and eyebrow content wrap safely and remain text-based so meaning is not carried by color alone.',
    actions: defaultActions,
  },
};

export const WithTags: Story = {
  args: {
    title: 'Tag-supported hero content',
    intro:
      'Tags can describe category, audience, release stage, or other short metadata without becoming route data.',
    tags: [
      { label: 'Composable', variant: 'brand' },
      { label: 'Accessible', variant: 'success' },
      { label: 'Responsive', variant: 'info' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: 'Action-focused hero',
    intro:
      'Actions are caller-provided nodes, usually Button or accessible link components from the app layer.',
    actions: (
      <>
        <Button href="#primary">Primary action</Button>
        <Button href="#secondary" variant="secondary">
          Secondary action
        </Button>
        <Button href="#tertiary" variant="ghost">
          Tertiary link
        </Button>
      </>
    ),
  },
};

export const LongCopy: Story = {
  args: {
    density: 'spacious',
    title:
      'A deliberately long hero headline that should wrap cleanly without clipping, overflow, or forcing unreadable layout decisions',
    intro:
      'This story validates long-copy behavior for hero sections with dense explanatory text. The component keeps heading, intro, metadata, actions, and footer content in a safe grid stack so authors can provide realistic content without breaking the layout.',
    footer: (
      <Text as="p" variant="caption" tone="muted">
        Footer notes remain optional and should support concise disclaimers or supporting context.
      </Text>
    ),
  },
};

export const MissingMedia: Story = {
  args: {
    variant: 'split',
    title: 'Split variant without media falls back to content-only layout',
    intro:
      'When media is omitted, Hero avoids rendering an empty second column and preserves a readable text layout.',
    actions: defaultActions,
  },
};

export const ResponsiveContract: Story = {
  render: () => (
    <Hero
      variant="media"
      contentWidth="wide"
      title="Responsive behavior contract"
      intro="Hero stacks on small screens. Split/media variants only become two-column when media exists and there is enough width."
      media={
        <Image
          src={demoImage('Responsive hero media preview', '#7c3aed')}
          alt="Responsive hero media preview"
          aspectRatio="wide"
          radius="xl"
        />
      }
    />
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <Hero
      title="Hero accessibility notes"
      intro="Hero preserves heading semantics, keeps media caller-provided through the Image primitive, and expects actions to be accessible Button or link nodes."
      actions={<Button href="#accessibility">Review accessibility guidance</Button>}
    />
  ),
};

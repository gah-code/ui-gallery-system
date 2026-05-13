import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { FeatureRow, type FeatureRowItem } from './FeatureRow';

function demoImage(label: string, accent = '#2563eb') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-label="${label}"><rect width="960" height="540" rx="36" fill="#f8fafc"/><rect x="84" y="80" width="792" height="380" rx="32" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/><rect x="140" y="138" width="260" height="44" rx="14" fill="${accent}"/><rect x="140" y="230" width="590" height="30" rx="12" fill="#cbd5e1"/><rect x="140" y="296" width="450" height="30" rx="12" fill="#e2e8f0"/><rect x="140" y="362" width="220" height="60" rx="18" fill="#dbeafe"/></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const features: FeatureRowItem[] = [
  {
    id: 'contracts',
    title: 'Contract-first sections',
    description:
      'Compose sections from existing primitives, patterns, and components without duplicating lower-level behavior.',
    status: { label: 'Stable', status: 'success' },
  },
  {
    id: 'responsive',
    title: 'Responsive by default',
    description:
      'Feature layouts stack first and introduce columns only when feature cards remain readable.',
    tags: [{ label: 'Responsive', variant: 'info' }],
  },
  {
    id: 'storybook',
    title: 'Storybook validated',
    description:
      'Stories cover ideal, sparse, dense, long-copy, and responsive feature content states.',
    tags: [{ label: 'Design system', variant: 'brand' }],
  },
];

const meta = {
  title: 'Sections/Feature Row',
  component: FeatureRow,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    eyebrow: 'Feature row section',
    title: 'Reusable feature groups for page assembly',
    intro:
      'FeatureRow displays related capabilities using FeatureBox while keeping feature meaning text-based and icons supplemental.',
    features,
  },
} satisfies Meta<typeof FeatureRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoFeatures: Story = {
  args: {
    columns: 'two',
    features: features.slice(0, 2),
  },
};

export const ThreeFeatures: Story = {
  args: {
    columns: 'three',
    features,
  },
};

export const FourFeatures: Story = {
  args: {
    columns: 'four',
    features: [
      ...features,
      {
        id: 'boundaries',
        title: 'Clear ownership boundaries',
        description:
          'Sections compose the system without becoming page templates, app shell, or CMS integrations.',
        tags: [{ label: 'Scoped', variant: 'neutral' }],
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    features: [
      {
        id: 'one',
        title: 'Plan',
        description: 'Define section scope and content expectations before implementation.',
        icon: '01',
      },
      {
        id: 'two',
        title: 'Compose',
        description: 'Use FeatureBox, primitives, and layout contracts instead of custom one-offs.',
        icon: '02',
      },
      {
        id: 'three',
        title: 'Validate',
        description: 'Check responsive behavior and accessibility expectations in Storybook.',
        icon: '03',
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    actions: (
      <Button href="#all-features" variant="secondary">
        View all features
      </Button>
    ),
    features: features.map((feature) => ({
      ...feature,
      actions: (
        <Button href={`#${feature.id}`} variant="link" size="sm">
          Learn more
        </Button>
      ),
    })),
  },
};

export const WithMedia: Story = {
  args: {
    columns: 'two',
    features: [
      {
        id: 'media-one',
        title: 'Media-supported feature',
        description:
          'Media can support a feature, but the visible title and description still carry the meaning.',
        media: (
          <Image
            src={demoImage('Feature preview one')}
            alt="Feature preview one"
            aspectRatio="wide"
            radius="lg"
          />
        ),
      },
      {
        id: 'media-two',
        title: 'Supplemental visual context',
        description:
          'Use media to clarify the feature without making the feature dependent on the image alone.',
        media: (
          <Image
            src={demoImage('Feature preview two', '#0f766e')}
            alt="Feature preview two"
            aspectRatio="wide"
            radius="lg"
          />
        ),
      },
    ],
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    title: 'Centered feature group',
    intro:
      'Centered layout aligns the section header and feature content while preserving text-first feature meaning.',
  },
};

export const SparseContent: Story = {
  args: {
    title: 'Sparse feature content',
    intro: 'FeatureRow supports compact feature items without requiring every optional field.',
    features: [
      { id: 'fast', title: 'Fast setup' },
      { id: 'typed', title: 'Typed props' },
      { id: 'scoped', title: 'Scoped ownership' },
    ],
  },
};

export const LongCopyStress: Story = {
  args: {
    columns: 'two',
    density: 'spacious',
    features: [
      {
        id: 'long-one',
        title:
          'A deliberately long feature title that should wrap cleanly without forcing layout overflow',
        description:
          'This feature validates long-copy behavior for realistic section content. FeatureRow delegates individual feature presentation to FeatureBox while the section grid keeps columns readable and wraps content safely.',
      },
      {
        id: 'long-two',
        title: 'A second feature with long supporting copy',
        description:
          'Long descriptions should remain readable across breakpoints. Icons, media, tags, and actions are optional and should never be required for the feature to make sense.',
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    title: 'No features available',
    intro: 'If no features are provided, an optional empty message can be rendered.',
    features: [],
    emptyMessage: 'No feature items are available for this section.',
  },
};

export const ResponsiveContract: Story = {
  render: () => (
    <FeatureRow
      title="Responsive behavior contract"
      intro="FeatureRow stacks on small screens and introduces columns only when feature blocks remain readable."
      columns="four"
      features={[
        ...features,
        {
          id: 'contract-fourth',
          title: 'Readable columns only',
          description: 'The four-up layout waits for wide viewports before adding the fourth column.',
        },
      ]}
    />
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <FeatureRow
      title="FeatureRow accessibility notes"
      intro="Feature meaning should be carried by visible text. Icons and media are supplemental. Actions should use accessible Button or link nodes."
      features={features}
      actions={
        <Button href="#accessibility" variant="secondary">
          Review accessibility guidance
        </Button>
      }
    />
  ),
};

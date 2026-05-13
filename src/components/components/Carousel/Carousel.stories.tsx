import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { Card } from '../Card';
import { Carousel, type CarouselItem } from './Carousel';

const meta = {
  title: 'Components/Batch 2/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  args: {
    label: 'Featured carousel',
    description: 'A carousel for related reusable content items.',
    items: [],
  },
} satisfies Meta<typeof Carousel>;

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

const basicItems: CarouselItem[] = [
  {
    id: 'planning',
    label: 'Slide 1 of 3: Planning',
    content: (
      <Card
        title="Plan the interface contract"
        description="Define content, states, and accessibility expectations before composing a larger surface."
        tags={[{ label: 'Planning', variant: 'brand' }]}
      />
    ),
  },
  {
    id: 'compose',
    label: 'Slide 2 of 3: Composition',
    content: (
      <Card
        title="Compose existing primitives"
        description="Use Text, Button, Image, and Batch 1 components instead of duplicating lower-level behavior."
        tags={[{ label: 'Composition', variant: 'info' }]}
      />
    ),
  },
  {
    id: 'validate',
    label: 'Slide 3 of 3: Validation',
    content: (
      <Card
        title="Validate in Storybook"
        description="Storybook remains the design-system workspace for component states and interaction guidance."
        tags={[{ label: 'Storybook', variant: 'success' }]}
      />
    ),
  },
];

const manyItems: CarouselItem[] = Array.from({ length: 9 }, (_, index) => ({
  id: `item-${index + 1}`,
  label: `Slide ${index + 1} of 9`,
  content: (
    <Card
      variant="compact"
      title={`Carousel item ${index + 1}`}
      description="Repeated items validate scroll behavior, disabled boundaries, and long-track navigation."
      tags={[{ label: index % 2 === 0 ? 'Even' : 'Odd', variant: 'neutral' }]}
    />
  ),
}));

const mediaItems: CarouselItem[] = [
  {
    id: 'media-1',
    content: (
      <Card
        variant="media"
        media={<Image alt="" decorative aspectRatio="wide" radius="none" fallback="Media one" />}
        title="Media-first item"
        description="Media content is passed through composed primitives rather than Carousel-specific image data."
      />
    ),
  },
  {
    id: 'media-2',
    content: (
      <Card
        variant="media"
        media={<Image alt="" decorative aspectRatio="wide" radius="none" fallback="Media two" />}
        title="Stable fallback media"
        description="The Image primitive owns missing-source behavior and accessible image semantics."
      />
    ),
  },
  {
    id: 'media-3',
    content: (
      <Card
        variant="media"
        media={<Image alt="" decorative aspectRatio="wide" radius="none" fallback="Media three" />}
        title="Custom slide content"
        description="Slides accept any React content so Carousel avoids CMS-shaped assumptions."
      />
    ),
  },
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Featured process"
        description="Default carousel with one readable item per view."
        items={basicItems}
      />
    </section>
  ),
};

export const FewItems: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Two-slide carousel"
        description="Few items keep the same controls and disabled boundary behavior."
        items={basicItems.slice(0, 2)}
      />
    </section>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Many carousel items"
        description="A longer sequence validates scrolling, current status, and boundary controls."
        items={manyItems}
        itemsPerView="auto"
      />
    </section>
  ),
};

export const CardItems: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Card item carousel"
        description="Cards can be used directly as slide content."
        items={basicItems}
        itemsPerView="two"
      />
    </section>
  ),
};

export const MediaItems: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Media carousel"
        description="Media slides compose Image and Card primitives without adding carousel-specific media contracts."
        items={mediaItems}
      />
    </section>
  ),
};

export const TwoPerView: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Two items per view"
        description="The layout still starts as one item on small screens and adds columns when readable."
        items={manyItems.slice(0, 5)}
        itemsPerView="two"
      />
    </section>
  ),
};

export const ThreePerView: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Three items per view"
        description="Three-up presentation is reserved for wider screens."
        items={manyItems.slice(0, 6)}
        itemsPerView="three"
        gap="lg"
      />
    </section>
  ),
};

export const HiddenStatus: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Carousel without visible status"
        description="Controls still work when the status text is hidden."
        items={basicItems}
        showStatus={false}
      />
    </section>
  ),
};

export const HiddenControls: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Scrollable carousel"
        description="Controls can be hidden when a scroll-only presentation is needed."
        items={manyItems.slice(0, 5)}
        showControls={false}
        itemsPerView="auto"
      />
    </section>
  ),
};

export const DisabledControls: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Disabled boundary controls"
        description="A single-item carousel disables both previous and next controls."
        items={basicItems.slice(0, 1)}
      />
    </section>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel label="Empty carousel" items={[]} />
      <Text tone="secondary">Empty item arrays render nothing.</Text>
    </section>
  ),
};

export const KeyboardFocusGuidance: Story = {
  render: () => (
    <section style={noteStyle}>
      <Carousel
        label="Keyboard-friendly carousel"
        description="Focus the viewport and use ArrowLeft or ArrowRight to move through slides."
        items={basicItems}
      />
      <Text tone="secondary">
        Carousel controls use native buttons. The scroll viewport is focusable so keyboard users can
        reach the carousel region.
      </Text>
    </section>
  ),
};

export const ReducedMotionNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <Carousel
        label="Reduced-motion guidance"
        description="The component avoids autoplay and keeps motion user-triggered."
        items={basicItems}
      />
      <Text tone="secondary">
        Carousel does not autoplay. Motion is limited to user-triggered scrolling and should respect
        reduced-motion preferences.
      </Text>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <Carousel
        label="Accessible carousel notes"
        description="Previous and next controls expose clear labels and disabled boundary states."
        items={basicItems}
      />
      <Text tone="secondary">
        Carousel renders a labeled section, uses clear previous/next labels, disables controls at
        boundaries, and announces slide position when status is visible.
      </Text>
    </section>
  ),
};

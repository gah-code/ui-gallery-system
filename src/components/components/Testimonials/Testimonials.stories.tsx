import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { Card } from '../Card';
import { Carousel, type CarouselItem } from '../Carousel';
import { Testimonials, type TestimonialItem } from './Testimonials';

const meta = {
  title: 'Components/Batch 2/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof Testimonials>;

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

const avatarSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect width="64" height="64" fill="%23e8edff"/%3E%3Ccircle cx="32" cy="25" r="12" fill="%233f4fd1"/%3E%3Cpath d="M14 58c3-13 12-20 18-20s15 7 18 20" fill="%233f4fd1"/%3E%3C/svg%3E';

const testimonials: TestimonialItem[] = [
  {
    id: 'maya',
    quote:
      'The system gave our team reusable building blocks without forcing us into a page-specific template.',
    name: 'Maya Chen',
    role: 'Design Systems Lead',
    company: 'Northstar Labs',
    avatar: {
      src: avatarSrc,
      alt: 'Portrait of Maya Chen',
      decorative: false,
    },
    tags: [{ label: 'Design system', variant: 'brand' }],
  },
  {
    id: 'omar',
    quote:
      'We moved faster because the UI contracts were already clear before implementation started.',
    name: 'Omar Reyes',
    role: 'Product Director',
    company: 'Fieldnote',
    avatar: {
      src: avatarSrc,
      alt: 'Portrait of Omar Reyes',
      decorative: false,
    },
    tags: [{ label: 'Product', variant: 'info' }],
  },
  {
    id: 'sana',
    quote:
      'Storybook coverage made edge cases visible early, especially long copy and missing media states.',
    name: 'Sana Patel',
    role: 'Frontend Engineer',
    company: 'Framepoint',
    avatar: {
      src: avatarSrc,
      alt: 'Portrait of Sana Patel',
      decorative: false,
    },
    tags: [{ label: 'Engineering', variant: 'success' }],
  },
];

const testimonialsWithoutAvatars: TestimonialItem[] = testimonials.map((entry) => ({
  id: `${entry.id}-without-avatar`,
  quote: entry.quote,
  name: entry.name,
  role: entry.role,
  company: entry.company,
  tags: entry.tags,
}));

const denseTestimonials: TestimonialItem[] = Array.from({ length: 8 }, (_, index) => ({
  id: `dense-${index + 1}`,
  quote: 'Reusable contracts helped our team validate content and interaction states before page assembly.',
  name: `Reviewer ${index + 1}`,
  role: index % 2 === 0 ? 'Team Lead' : 'Contributor',
  company: index % 3 === 0 ? 'Atlas Studio' : 'Signal Works',
  tags: [{ label: index % 2 === 0 ? 'Workflow' : 'Validation', variant: 'neutral' }],
}));

const longQuote: TestimonialItem[] = [
  {
    id: 'long',
    quote:
      'The most useful part was not only having reusable visuals, but having a clear contract for when to use each component, how it should behave with dense content, and what accessibility expectations needed to be preserved as the system grew.',
    name: 'Jordan Ellis',
    role: 'UX Architect',
    company: 'Continuum',
    tags: [
      { label: 'Long quote', variant: 'warning' },
      { label: 'Readable', variant: 'success' },
    ],
  },
];

const carouselItems: CarouselItem[] = testimonials.map((entry) => ({
  id: entry.id,
  label: `Testimonial from ${entry.name}`,
  content: (
    <Card
      title={entry.name}
      description={entry.quote}
      tags={entry.tags}
      meta={
        <Text as="span" variant="caption" tone="muted">
          {entry.role} at {entry.company}
        </Text>
      }
    />
  ),
}));

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials items={testimonials} />
    </section>
  ),
};

export const SingleQuote: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials layout="single" items={testimonials.slice(0, 1)} tone="raised" />
    </section>
  ),
};

export const FeaturedQuote: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials
        layout="featured"
        density="spacious"
        tone="raised"
        items={longQuote}
      />
    </section>
  ),
};

export const WithAvatars: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials items={testimonials} columns="three" tone="subtle" />
    </section>
  ),
};

export const MissingMedia: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials
        items={testimonialsWithoutAvatars}
        columns="three"
      />
    </section>
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials layout="single" items={longQuote} tone="outline" />
    </section>
  ),
};

export const DenseTestimonials: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials
        items={denseTestimonials}
        columns="three"
        density="compact"
        showQuoteMark={false}
      />
    </section>
  ),
};

export const WithCompanyMetadata: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials items={testimonials} columns="two" />
    </section>
  ),
};

export const WithTags: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials items={testimonials} columns="three" tone="raised" />
    </section>
  ),
};

export const Centered: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials
        layout="featured"
        align="center"
        density="spacious"
        items={testimonials.slice(0, 1)}
      />
    </section>
  ),
};

export const CarouselComposition: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Carousel
        label="Testimonial carousel composition"
        description="Carousel can compose testimonial-like cards without Testimonials depending on Carousel internally."
        items={carouselItems}
        itemsPerView="two"
      />
    </section>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Testimonials items={[]} />
      <Text tone="secondary">Empty testimonial arrays render nothing.</Text>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <Testimonials layout="single" items={testimonials.slice(0, 1)} />
      <Text tone="secondary">
        Testimonials use figure, blockquote, and figcaption semantics. Attribution should be clear
        and near the quote. Avatar images need meaningful alt text unless decorative.
      </Text>
    </section>
  ),
};

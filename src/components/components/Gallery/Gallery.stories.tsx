import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { Gallery } from './Gallery';
import type { GalleryColumns, GalleryItem } from './Gallery';

const galleryItems: GalleryItem[] = [
  {
    id: 'alpha',
    image: { alt: 'Abstract blue interface panel' },
    title: 'System surface',
    caption: 'Reusable component gallery item.',
    description: 'Image fallback appears because no source URL is required for Storybook coverage.',
    tags: [{ label: 'UI', variant: 'brand' }],
  },
  {
    id: 'beta',
    image: { alt: 'Abstract green product panel' },
    title: 'Product moment',
    caption: 'A compact visual summary.',
    description: 'Gallery composes image, caption, description, and tags without CMS assumptions.',
    tags: [{ label: 'Product', variant: 'success' }],
  },
  {
    id: 'gamma',
    image: { alt: 'Abstract orange editorial panel' },
    title: 'Editorial block',
    caption: 'Caption text remains readable.',
    description: 'Longer descriptions expand vertically and preserve the item surface.',
    tags: [{ label: 'Editorial', variant: 'warning' }],
  },
];

const meta = {
  title: 'Components/Gallery',
  component: Gallery,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: galleryItems,
  },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.wide,
} as const;

const denseItems: GalleryItem[] = Array.from({ length: 9 }, (_, index) => ({
  id: `dense-${index + 1}`,
  image: { alt: `Gallery placeholder ${index + 1}` },
  title: `Item ${index + 1}`,
  caption: 'Dense gallery item.',
  tags: [{ label: index % 2 === 0 ? 'Visual' : 'Mixed' }],
}));

const columnModes: GalleryColumns[] = ['auto', 'two', 'three', 'four'];

export const Default: Story = {
  render: () => <Gallery items={galleryItems} columns="three" />,
};

export const Sparse: Story = {
  render: () => <Gallery items={galleryItems.slice(0, 2)} columns="two" />,
};

export const Dense: Story = {
  render: () => <Gallery items={denseItems} columns="three" density="compact" />,
};

export const MissingImageFallback: Story = {
  render: () => (
    <Gallery
      columns="three"
      items={galleryItems.map((item) => ({
        ...item,
        image: { alt: `${item.title} fallback image` },
      }))}
    />
  ),
};

export const WithoutImages: Story = {
  render: () => (
    <Gallery
      columns="three"
      tone="subtle"
      items={galleryItems.map((item) => ({
        id: item.id,
        title: item.title,
        caption: item.caption,
        description: item.description,
        tags: item.tags,
        href: item.href,
      }))}
    />
  ),
};

export const MixedContent: Story = {
  render: () => (
    <Gallery
      columns="auto"
      tone="raised"
      items={[
        galleryItems[0],
        {
          id: 'text-only',
          title: 'Text-only item',
          caption: 'No image object means no media area is rendered.',
          description: 'Mixed galleries can combine image-backed and text-only entries.',
          tags: [{ label: 'Text', variant: 'info' }],
        },
        {
          id: 'minimal',
          image: { alt: 'Minimal visual item' },
          caption: 'Caption-only item.',
        },
      ]}
    />
  ),
};

export const LongCaptions: Story = {
  render: () => (
    <Gallery
      columns="two"
      items={[
        {
          image: { alt: 'Long caption fallback image' },
          title: 'Long caption',
          caption:
            'This intentionally long caption should wrap safely inside the gallery item without forcing horizontal overflow or clipping important context.',
          description:
            'Descriptions should also wrap naturally and keep a readable rhythm inside the item body.',
        },
        {
          image: { alt: 'Long description fallback image' },
          title: 'Long description',
          caption: 'Caption text.',
          description:
            'This longer description validates that mixed content galleries can support editorial context while remaining a reusable component rather than a section or page layout.',
        },
      ]}
    />
  ),
};

export const WithTags: Story = {
  render: () => (
    <Gallery
      columns="three"
      items={galleryItems.map((item, index) => ({
        ...item,
        tags: [
          ...(item.tags ?? []),
          { label: index === 0 ? 'Featured' : 'Gallery', variant: 'info' },
        ],
      }))}
    />
  ),
};

export const LinkedTitles: Story = {
  render: () => (
    <Gallery
      columns="three"
      items={galleryItems.map((item) => ({
        ...item,
        href: `#${item.id}`,
      }))}
    />
  ),
};

export const ColumnModes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {columnModes.map((columns) => (
        <div key={columns} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">columns: {columns}</Text>
          <Gallery items={galleryItems} columns={columns} density="compact" />
        </div>
      ))}
    </section>
  ),
};

export const EmptyItems: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Empty items render no gallery collection.</Text>
      <Gallery items={[]} />
    </section>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Gallery stacks naturally on small screens and introduces columns only when items remain
        readable.
      </Text>
      <Gallery items={denseItems.slice(0, 6)} columns="auto" />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Gallery images use the Image primitive. Meaningful images need alt text; decorative images
        should be marked decorative. Linked behavior is title-scoped by default.
      </Text>
      <Gallery items={galleryItems} columns="three" />
    </section>
  ),
};

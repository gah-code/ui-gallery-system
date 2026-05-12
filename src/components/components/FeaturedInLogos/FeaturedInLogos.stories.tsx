import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { FeaturedInLogos, type FeaturedInLogoItem } from './FeaturedInLogos';

const meta = {
  title: 'Components/Batch 2/Featured In Logos',
  component: FeaturedInLogos,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof FeaturedInLogos>;

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

function logoDataUri(name: string, color: string) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 80" role="img"><rect width="260" height="80" rx="10" fill="#f8fafc"/><path d="M24 18h212v44H24z" fill="${color}"/><text x="130" y="49" fill="#ffffff" font-family="Georgia, serif" font-size="24" font-weight="700" text-anchor="middle">${initials}</text></svg>`,
  )}`;
}

const logos: FeaturedInLogoItem[] = [
  {
    id: 'daily-observer',
    name: 'Daily Observer',
    logo: { src: logoDataUri('Daily Observer', '#111827'), alt: 'Daily Observer logo' },
  },
  {
    id: 'design-weekly',
    name: 'Design Weekly',
    logo: { src: logoDataUri('Design Weekly', '#1d4ed8'), alt: 'Design Weekly logo' },
  },
  {
    id: 'product-review',
    name: 'Product Review',
    logo: { src: logoDataUri('Product Review', '#b45309'), alt: 'Product Review logo' },
  },
  {
    id: 'founders-journal',
    name: 'Founders Journal',
    logo: { src: logoDataUri('Founders Journal', '#15803d'), alt: 'Founders Journal logo' },
  },
  {
    id: 'market-index',
    name: 'Market Index',
    logo: { src: logoDataUri('Market Index', '#7c3aed'), alt: 'Market Index logo' },
  },
];

const manyLogos: FeaturedInLogoItem[] = Array.from({ length: 12 }, (_, index) => {
  const name = `Source ${index + 1}`;
  const colors = ['#111827', '#1d4ed8', '#b45309', '#15803d', '#7c3aed'];

  return {
    id: `source-${index + 1}`,
    name,
    logo: {
      src: logoDataUri(name, colors[index % colors.length]),
      alt: `${name} logo`,
    },
  };
});

const linkedLogos: FeaturedInLogoItem[] = logos.slice(0, 4).map((entry) => ({
  ...entry,
  href: `#${entry.id}`,
}));

const missingLogoItems: FeaturedInLogoItem[] = [
  { id: 'missing-1', name: 'Missing Journal', logo: { alt: 'Missing Journal logo' } },
  { id: 'missing-2', name: 'Unavailable Review', logo: { alt: 'Unavailable Review logo' } },
  { id: 'missing-3', name: 'Offline Media', logo: { alt: 'Offline Media logo' } },
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={logos} />
    </section>
  ),
};

export const Grid: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={logos} layout="grid" columns="three" tone="subtle" />
    </section>
  ),
};

export const Compact: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos
        items={manyLogos.slice(0, 10)}
        layout="compact"
        columns="five"
        density="compact"
      />
    </section>
  ),
};

export const ManyLogos: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={manyLogos} layout="grid" columns="four" density="compact" />
    </section>
  ),
};

export const EditorialTone: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={logos} layout="grid" columns="three" tone="editorial" />
    </section>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos
        title="Featured in independent coverage"
        description="FeaturedInLogos is for press, publication, media, award, or featured-in sources rather than customers or partners."
        items={logos}
        layout="grid"
        columns="three"
      />
    </section>
  ),
};

export const WithSourceNames: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={logos} layout="grid" columns="three" tone="subtle" showNames />
    </section>
  ),
};

export const LinkedLogos: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={linkedLogos} layout="grid" columns="four" tone="card" showNames />
    </section>
  ),
};

export const MissingLogoFallback: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos
        items={missingLogoItems}
        layout="grid"
        columns="three"
        tone="card"
        showNames
      />
    </section>
  ),
};

export const DecorativeLogoStrip: Story = {
  render: () => (
    <section style={noteStyle}>
      <FeaturedInLogos
        title="Decorative featured-in strip"
        description="Use decorative mode only when publication logos are supplemental and repeated source identity is not required for understanding."
        items={logos}
        layout="compact"
        columns="five"
        density="compact"
        decorative
      />
      <Text tone="secondary">
        Decorative logo strips intentionally hide logo images from assistive technology. If source
        identity communicates meaning, keep logos meaningful and provide alt text.
      </Text>
    </section>
  ),
};

export const EmptyItems: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <FeaturedInLogos items={[]} />
      <Text tone="secondary">Empty featured-in logo arrays render nothing.</Text>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <FeaturedInLogos items={linkedLogos.slice(0, 3)} layout="grid" columns="three" showNames />
      <Text tone="secondary">
        Featured-in logos need meaningful alt text when they communicate source identity.
        Decorative logo strips should intentionally mark logos decorative. Linked logos need clear
        accessible names.
      </Text>
    </section>
  ),
};

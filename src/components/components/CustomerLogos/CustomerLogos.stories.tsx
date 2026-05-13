import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { CustomerLogos, type CustomerLogoItem } from './CustomerLogos';

const meta = {
  title: 'Components/Batch 2/Customer Logos',
  component: CustomerLogos,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof CustomerLogos>;

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
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" role="img"><rect width="240" height="80" rx="12" fill="#f8fafc"/><path d="M22 40c0-17 13-30 30-30h136c17 0 30 13 30 30s-13 30-30 30H52c-17 0-30-13-30-30Z" fill="${color}"/><text x="120" y="48" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="700" text-anchor="middle">${initials}</text></svg>`,
  )}`;
}

const logos: CustomerLogoItem[] = [
  {
    id: 'northstar',
    name: 'Northstar Labs',
    logo: { src: logoDataUri('Northstar Labs', '#3f4fd1'), alt: 'Northstar Labs logo' },
  },
  {
    id: 'fieldnote',
    name: 'Fieldnote',
    logo: { src: logoDataUri('Fieldnote', '#15803d'), alt: 'Fieldnote logo' },
  },
  {
    id: 'framepoint',
    name: 'Framepoint',
    logo: { src: logoDataUri('Framepoint', '#1d4ed8'), alt: 'Framepoint logo' },
  },
  {
    id: 'continuum',
    name: 'Continuum',
    logo: { src: logoDataUri('Continuum', '#b45309'), alt: 'Continuum logo' },
  },
  {
    id: 'atlas',
    name: 'Atlas Studio',
    logo: { src: logoDataUri('Atlas Studio', '#334155'), alt: 'Atlas Studio logo' },
  },
  {
    id: 'signal',
    name: 'Signal Works',
    logo: { src: logoDataUri('Signal Works', '#b91c1c'), alt: 'Signal Works logo' },
  },
];

const manyLogos: CustomerLogoItem[] = Array.from({ length: 14 }, (_, index) => {
  const name = `Customer ${index + 1}`;
  const colors = ['#3f4fd1', '#15803d', '#1d4ed8', '#b45309', '#334155', '#b91c1c'];

  return {
    id: `customer-${index + 1}`,
    name,
    logo: {
      src: logoDataUri(name, colors[index % colors.length]),
      alt: `${name} logo`,
    },
  };
});

const linkedLogos: CustomerLogoItem[] = logos.slice(0, 4).map((entry) => ({
  ...entry,
  href: `#${entry.id}`,
}));

const missingLogoItems: CustomerLogoItem[] = [
  { id: 'missing-1', name: 'Missing One', logo: { alt: 'Missing One logo' } },
  { id: 'missing-2', name: 'Missing Two', logo: { alt: 'Missing Two logo' } },
  { id: 'missing-3', name: 'Missing Three', logo: { alt: 'Missing Three logo' } },
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={logos.slice(0, 5)} />
    </section>
  ),
};

export const Grid: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={logos} layout="grid" columns="three" tone="subtle" />
    </section>
  ),
};

export const Dense: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={manyLogos.slice(0, 10)} layout="dense" columns="six" density="compact" />
    </section>
  ),
};

export const ManyLogos: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={manyLogos} layout="grid" columns="four" density="compact" />
    </section>
  ),
};

export const CardTone: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={logos} layout="grid" columns="three" tone="card" />
    </section>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos
        title="Trusted by product teams"
        description="CustomerLogos can include lightweight context without becoming a customer-logo section."
        items={logos}
        layout="grid"
        columns="three"
      />
    </section>
  ),
};

export const WithBrandNames: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={logos} layout="grid" columns="three" tone="subtle" showNames />
    </section>
  ),
};

export const LinkedLogos: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={linkedLogos} layout="grid" columns="four" tone="card" showNames />
    </section>
  ),
};

export const MissingMedia: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={missingLogoItems} layout="grid" columns="three" tone="card" showNames />
    </section>
  ),
};

export const DecorativeLogoCloud: Story = {
  render: () => (
    <section style={noteStyle}>
      <CustomerLogos
        title="Decorative customer logo cloud"
        description="Use decorative mode only when logos are supplemental and not needed to understand the content."
        items={logos}
        layout="dense"
        columns="six"
        density="compact"
        decorative
      />
      <Text tone="secondary">
        Decorative logo clouds intentionally hide logo images from assistive technology. If the
        brand identities matter, keep logos meaningful and provide alt text.
      </Text>
    </section>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <CustomerLogos items={[]} />
      <Text tone="secondary">Empty logo arrays render nothing.</Text>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <CustomerLogos items={linkedLogos.slice(0, 3)} layout="grid" columns="three" showNames />
      <Text tone="secondary">
        Customer logos need meaningful alt text when they communicate brand identity. Decorative
        logo clouds should intentionally mark logos decorative. Linked logos need clear accessible
        names.
      </Text>
    </section>
  ),
};

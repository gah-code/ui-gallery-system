import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../Text';
import { Image } from './Image';
import type { ImageAspectRatio, ImageFit, ImageRadius } from './Image';

const meta = {
  title: 'UI/Image',
  component: Image,
  parameters: {
    layout: 'padded',
  },
  args: {
    alt: 'Abstract landscape placeholder',
    src: getDemoImage('Responsive image'),
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const aspectRatios: ImageAspectRatio[] = ['square', 'wide', 'portrait', 'video', 'logo'];
const fits: ImageFit[] = ['cover', 'contain', 'fill'];
const radii: ImageRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
  gap: vars.space[4],
  maxWidth: vars.font.measure.wide,
} as const;

const stackStyle = {
  display: 'grid',
  gap: vars.space[3],
} as const;

function getDemoImage(label: string, background = '#e8edff', foreground = '#303b9f') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <rect width="1200" height="800" fill="${background}" />
      <circle cx="285" cy="235" r="120" fill="${foreground}" opacity="0.16" />
      <path d="M100 650 410 350 620 550 770 415 1100 650Z" fill="${foreground}" opacity="0.28" />
      <text x="600" y="405" text-anchor="middle" font-family="system-ui, sans-serif" font-size="64" font-weight="700" fill="${foreground}">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <Image src={getDemoImage('Default')} alt="Abstract landscape placeholder" />
    </div>
  ),
};

export const AspectRatios: Story = {
  render: () => (
    <section style={gridStyle}>
      {aspectRatios.map((aspectRatio) => (
        <div key={aspectRatio} style={stackStyle}>
          <Text variant="label">{aspectRatio}</Text>
          <Image
            src={getDemoImage(aspectRatio)}
            alt={`${aspectRatio} aspect ratio placeholder`}
            aspectRatio={aspectRatio}
          />
        </div>
      ))}
    </section>
  ),
};

export const ObjectFit: Story = {
  render: () => (
    <section style={gridStyle}>
      {fits.map((fit) => (
        <div key={fit} style={stackStyle}>
          <Text variant="label">{fit}</Text>
          <Image
            src={getDemoImage(fit, '#f1f5f9', '#3f4fd1')}
            alt={`${fit} object fit placeholder`}
            aspectRatio="square"
            fit={fit}
          />
        </div>
      ))}
    </section>
  ),
};

export const Radius: Story = {
  render: () => (
    <section style={gridStyle}>
      {radii.map((radius) => (
        <div key={radius} style={stackStyle}>
          <Text variant="label">{radius}</Text>
          <Image
            src={getDemoImage(radius, '#f8fafc', '#334155')}
            alt={`${radius} radius placeholder`}
            aspectRatio="square"
            radius={radius}
          />
        </div>
      ))}
    </section>
  ),
};

export const MissingImageFallback: Story = {
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <Image alt="Missing source example" aspectRatio="wide" fallback="Image source missing" />
    </div>
  ),
};

export const DecorativeImage: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4], maxWidth: vars.font.measure.narrow }}>
      <Text>
        Use decorative images only when the image adds no meaning. Decorative images render with
        empty alt text.
      </Text>
      <Image
        src={getDemoImage('Decorative', '#f5f7ff', '#4f63ff')}
        alt=""
        decorative
        aspectRatio="wide"
      />
    </section>
  ),
};

export const LogoSafe: Story = {
  render: () => (
    <div style={{ maxWidth: '28rem' }}>
      <Image
        src={getDemoImage('LOGO', '#ffffff', '#0f172a')}
        alt="Placeholder brand logo"
        aspectRatio="logo"
        fit="contain"
      />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../styles';
import { typography } from '../../styles';

type ColorSwatch = {
  name: string;
  value: string;
};

type TokenCard = {
  name: string;
  value: string;
  preview?: string;
};

const colorGroups: Record<string, ColorSwatch[]> = {
  Brand: [
    { name: 'brand.50', value: vars.color.brand[50] },
    { name: 'brand.100', value: vars.color.brand[100] },
    { name: 'brand.500', value: vars.color.brand[500] },
    { name: 'brand.600', value: vars.color.brand[600] },
    { name: 'brand.700', value: vars.color.brand[700] },
  ],
  Neutral: [
    { name: 'neutral.0', value: vars.color.neutral[0] },
    { name: 'neutral.50', value: vars.color.neutral[50] },
    { name: 'neutral.100', value: vars.color.neutral[100] },
    { name: 'neutral.200', value: vars.color.neutral[200] },
    { name: 'neutral.300', value: vars.color.neutral[300] },
    { name: 'neutral.500', value: vars.color.neutral[500] },
    { name: 'neutral.700', value: vars.color.neutral[700] },
    { name: 'neutral.900', value: vars.color.neutral[900] },
  ],
  Surface: [
    { name: 'surface.page', value: vars.color.surface.page },
    { name: 'surface.subtle', value: vars.color.surface.subtle },
    { name: 'surface.raised', value: vars.color.surface.raised },
    { name: 'surface.inverse', value: vars.color.surface.inverse },
  ],
  Text: [
    { name: 'text.primary', value: vars.color.text.primary },
    { name: 'text.secondary', value: vars.color.text.secondary },
    { name: 'text.muted', value: vars.color.text.muted },
    { name: 'text.inverse', value: vars.color.text.inverse },
    { name: 'text.link', value: vars.color.text.link },
  ],
  Status: [
    { name: 'status.success', value: vars.color.status.success },
    { name: 'status.warning', value: vars.color.status.warning },
    { name: 'status.error', value: vars.color.status.error },
    { name: 'status.info', value: vars.color.status.info },
  ],
};

const radiusTokens: TokenCard[] = [
  { name: 'radius.none', value: vars.radius.none },
  { name: 'radius.sm', value: vars.radius.sm },
  { name: 'radius.md', value: vars.radius.md },
  { name: 'radius.lg', value: vars.radius.lg },
  { name: 'radius.xl', value: vars.radius.xl },
  { name: 'radius.full', value: vars.radius.full },
];

const shadowTokens: TokenCard[] = [
  { name: 'shadow.none', value: vars.shadow.none },
  { name: 'shadow.sm', value: vars.shadow.sm },
  { name: 'shadow.md', value: vars.shadow.md },
  { name: 'shadow.lg', value: vars.shadow.lg },
];

const meta = {
  title: 'Foundations/Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <main style={{ display: 'grid', gap: vars.space[8], maxWidth: vars.font.measure.wide }}>
      <header style={{ display: 'grid', gap: vars.space[2] }}>
        <p className={typography.metadata}>Foundation tokens</p>
        <h1 className={typography.heading}>Token overview</h1>
        <p className={typography.body} style={{ maxWidth: vars.font.measure.narrow }}>
          Token values are exposed through vanilla-extract CSS variables and should be used by
          foundations, primitives, and later layout patterns.
        </p>
      </header>

      {Object.entries(colorGroups).map(([group, swatches]) => (
        <section key={group} style={{ display: 'grid', gap: vars.space[4] }}>
          <h2 className={typography.label}>{group} colors</h2>
          <div
            style={{
              display: 'grid',
              gap: vars.space[3],
              gridTemplateColumns: 'repeat(auto-fit, minmax(9rem, 1fr))',
            }}
          >
            {swatches.map((swatch) => (
              <div key={swatch.name} style={{ display: 'grid', gap: vars.space[2] }}>
                <div
                  aria-label={`${swatch.name} color sample`}
                  style={{
                    minHeight: '4rem',
                    border: `1px solid ${vars.color.border.subtle}`,
                    borderRadius: vars.radius.lg,
                    background: swatch.value,
                  }}
                />
                <code style={{ color: vars.color.text.secondary }}>{swatch.name}</code>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ display: 'grid', gap: vars.space[4] }}>
        <h2 className={typography.label}>Radius</h2>
        <div style={{ display: 'flex', gap: vars.space[4], flexWrap: 'wrap' }}>
          {radiusTokens.map((token) => (
            <div key={token.name} style={{ display: 'grid', gap: vars.space[2] }}>
              <div
                style={{
                  width: '5rem',
                  height: '5rem',
                  borderRadius: token.value,
                  border: `1px solid ${vars.color.border.strong}`,
                  background: vars.color.surface.subtle,
                }}
              />
              <code>{token.name}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gap: vars.space[4] }}>
        <h2 className={typography.label}>Shadows</h2>
        <div style={{ display: 'flex', gap: vars.space[4], flexWrap: 'wrap' }}>
          {shadowTokens.map((token) => (
            <div key={token.name} style={{ display: 'grid', gap: vars.space[2] }}>
              <div
                style={{
                  width: '8rem',
                  height: '5rem',
                  borderRadius: vars.radius.lg,
                  boxShadow: token.value,
                  border: `1px solid ${vars.color.border.subtle}`,
                  background: vars.color.surface.raised,
                }}
              />
              <code>{token.name}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  ),
};

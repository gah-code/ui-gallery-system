import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography, vars } from '../../styles';

const meta = {
  title: 'Foundations/Surfaces',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaces = [
  {
    name: 'surface.page',
    background: vars.color.surface.page,
    color: vars.color.text.primary,
    border: vars.color.border.subtle,
  },
  {
    name: 'surface.subtle',
    background: vars.color.surface.subtle,
    color: vars.color.text.primary,
    border: vars.color.border.subtle,
  },
  {
    name: 'surface.raised',
    background: vars.color.surface.raised,
    color: vars.color.text.primary,
    border: vars.color.border.strong,
    shadow: vars.shadow.md,
  },
  {
    name: 'surface.inverse',
    background: vars.color.surface.inverse,
    color: vars.color.text.inverse,
    border: vars.color.surface.inverse,
  },
];

export const SurfaceRules: Story = {
  render: () => (
    <main style={{ padding: vars.space[8], background: vars.color.surface.subtle, minHeight: '100vh' }}>
      <div style={{ display: 'grid', gap: vars.space[6], maxWidth: vars.font.measure.wide }}>
        <header style={{ display: 'grid', gap: vars.space[2] }}>
          <p className={typography.metadata}>Foundation surfaces</p>
          <h1 className={typography.heading}>Surface and background rules</h1>
          <p className={typography.body} style={{ maxWidth: vars.font.measure.narrow }}>
            Surface tokens define page backgrounds, subtle regions, raised panels, and inverse treatments.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gap: vars.space[4],
            gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
          }}
        >
          {surfaces.map((surface) => (
            <article
              key={surface.name}
              style={{
                minHeight: '12rem',
                display: 'grid',
                alignContent: 'end',
                gap: vars.space[2],
                padding: vars.space[5],
                border: `1px solid ${surface.border}`,
                borderRadius: vars.radius.xl,
                background: surface.background,
                boxShadow: surface.shadow ?? vars.shadow.none,
                color: surface.color,
              }}
            >
              <strong>{surface.name}</strong>
              <span>Use for consistent surface hierarchy.</span>
            </article>
          ))}
        </section>
      </div>
    </main>
  ),
};

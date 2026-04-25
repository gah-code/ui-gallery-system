import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography, vars } from '../../styles';

const meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spaces = [
  ['0', vars.space[0]],
  ['1', vars.space[1]],
  ['2', vars.space[2]],
  ['3', vars.space[3]],
  ['4', vars.space[4]],
  ['5', vars.space[5]],
  ['6', vars.space[6]],
  ['8', vars.space[8]],
  ['10', vars.space[10]],
  ['12', vars.space[12]],
  ['16', vars.space[16]],
  ['20', vars.space[20]],
  ['24', vars.space[24]],
] as const;

export const Scale: Story = {
  render: () => (
    <main style={{ display: 'grid', gap: vars.space[6], maxWidth: vars.font.measure.comfortable }}>
      <header style={{ display: 'grid', gap: vars.space[2] }}>
        <p className={typography.metadata}>Foundation spacing</p>
        <h1 className={typography.heading}>Spacing scale</h1>
        <p className={typography.body}>
          Spacing tokens define stack rhythm, inline gaps, component padding, and later section spacing.
        </p>
      </header>

      <section style={{ display: 'grid', gap: vars.space[3] }}>
        {spaces.map(([name, value]) => (
          <div
            key={name}
            style={{
              display: 'grid',
              gridTemplateColumns: '5rem minmax(0, 1fr) 5rem',
              gap: vars.space[4],
              alignItems: 'center',
            }}
          >
            <code>space.{name}</code>
            <div
              style={{
                width: value,
                height: vars.space[4],
                borderRadius: vars.radius.sm,
                background: vars.color.brand[500],
              }}
            />
            <code>{value}</code>
          </div>
        ))}
      </section>
    </main>
  ),
};

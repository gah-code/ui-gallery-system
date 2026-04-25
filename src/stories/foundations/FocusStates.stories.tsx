import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography, vars } from '../../styles';

const meta = {
  title: 'Foundations/Focus States',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FocusVisible: Story = {
  render: () => (
    <main style={{ display: 'grid', gap: vars.space[6], maxWidth: vars.font.measure.narrow }}>
      <header style={{ display: 'grid', gap: vars.space[2] }}>
        <p className={typography.metadata}>Foundation focus</p>
        <h1 className={typography.heading}>Keyboard focus states</h1>
        <p className={typography.body}>
          Use Tab to move through the controls. The global focus ring should remain visible and consistent.
        </p>
      </header>

      <section style={{ display: 'flex', gap: vars.space[4], alignItems: 'center', flexWrap: 'wrap' }}>
        <a href="https://storybook.js.org/" target="_blank" rel="noreferrer">
          Focusable link
        </a>
        <button
          type="button"
          style={{
            border: `1px solid ${vars.color.border.strong}`,
            borderRadius: vars.radius.md,
            background: vars.color.brand[500],
            color: vars.color.text.inverse,
            cursor: 'pointer',
            padding: `${vars.space[2]} ${vars.space[4]}`,
          }}
        >
          Demo button
        </button>
        <label style={{ display: 'grid', gap: vars.space[2], color: vars.color.text.secondary }}>
          Demo input
          <input
            placeholder="Focus me"
            style={{
              border: `1px solid ${vars.color.border.strong}`,
              borderRadius: vars.radius.md,
              padding: `${vars.space[2]} ${vars.space[3]}`,
            }}
          />
        </label>
      </section>
    </main>
  ),
};

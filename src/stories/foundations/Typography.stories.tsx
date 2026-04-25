import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography, vars } from '../../styles';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const examples = [
  { role: 'display', className: typography.display, text: 'Build a dependable UI system' },
  { role: 'heading', className: typography.heading, text: 'Foundation typography role' },
  { role: 'subheading', className: typography.subheading, text: 'Readable hierarchy for supporting copy.' },
  {
    role: 'body',
    className: typography.body,
    text: 'Body text should remain comfortable across long-form documentation, product copy, and component examples.',
  },
  { role: 'caption', className: typography.caption, text: 'Caption text for helper details and short annotations.' },
  { role: 'label', className: typography.label, text: 'Label text' },
  { role: 'metadata', className: typography.metadata, text: 'Metadata text' },
];

export const Roles: Story = {
  render: () => (
    <main style={{ display: 'grid', gap: vars.space[6], maxWidth: vars.font.measure.comfortable }}>
      <header style={{ display: 'grid', gap: vars.space[2] }}>
        <p className={typography.metadata}>Foundation typography</p>
        <h1 className={typography.heading}>Typography roles</h1>
        <p className={typography.body}>
          These classes document the initial type roles before the Text primitive is implemented.
        </p>
      </header>

      <section style={{ display: 'grid', gap: vars.space[5] }}>
        {examples.map((example) => (
          <article
            key={example.role}
            style={{
              display: 'grid',
              gap: vars.space[2],
              paddingBlockEnd: vars.space[4],
              borderBottom: `1px solid ${vars.color.border.subtle}`,
            }}
          >
            <code style={{ color: vars.color.text.muted }}>{example.role}</code>
            <p className={example.className}>{example.text}</p>
          </article>
        ))}
      </section>
    </main>
  ),
};

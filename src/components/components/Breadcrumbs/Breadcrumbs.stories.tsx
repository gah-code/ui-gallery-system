import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbSeparator, BreadcrumbSize } from './Breadcrumbs';

const meta = {
  title: 'Components/Batch 1/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [
      { label: 'Home', href: '#home' },
      { label: 'Components', href: '#components' },
      { label: 'Breadcrumbs' },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const separators: BreadcrumbSeparator[] = ['slash', 'chevron', 'dot'];
const sizesList: BreadcrumbSize[] = ['sm', 'md'];

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.comfortable,
} as const;

export const Default: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#home' },
        { label: 'Components', href: '#components' },
        { label: 'Breadcrumbs' },
      ]}
    />
  ),
};

export const ShortTrail: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#home' },
        { label: 'Current page' },
      ]}
    />
  ),
};

export const LongTrail: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#home' },
        { label: 'System', href: '#system' },
        { label: 'Components', href: '#components' },
        { label: 'Navigation', href: '#navigation' },
        { label: 'Hierarchy', href: '#hierarchy' },
        { label: 'Breadcrumbs' },
      ]}
    />
  ),
};

export const CurrentPage: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#home' },
        { label: 'Docs', href: '#docs' },
        { label: 'Current page with explicit state', href: '#current', current: true },
      ]}
    />
  ),
};

export const Separators: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {separators.map((separator) => (
        <div key={separator} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">separator: {separator}</Text>
          <Breadcrumbs
            separator={separator}
            items={[
              { label: 'Home', href: '#home' },
              { label: 'Library', href: '#library' },
              { label: 'Breadcrumbs' },
            ]}
          />
        </div>
      ))}
    </section>
  ),
};

export const Sizes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {sizesList.map((size) => (
        <div key={size} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">size: {size}</Text>
          <Breadcrumbs
            size={size}
            items={[
              { label: 'Home', href: '#home' },
              { label: 'Components', href: '#components' },
              { label: 'Breadcrumbs' },
            ]}
          />
        </div>
      ))}
    </section>
  ),
};

export const LongLabels: Story = {
  render: () => (
    <section style={{ ...surfaceStyle, maxWidth: '20rem' }}>
      <Text tone="secondary">Constrained container to validate wrapping behavior.</Text>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#home' },
          {
            label: 'Very long documentation category label that should wrap safely',
            href: '#long-category',
          },
          {
            label: 'Current page with a long descriptive label that should not break layout',
          },
        ]}
      />
    </section>
  ),
};

export const EmptyItems: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Empty items render no breadcrumb navigation.</Text>
      <Breadcrumbs items={[]} />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Breadcrumbs render a nav landmark, ordered list, decorative separators, and aria-current for
        the current page.
      </Text>
      <Breadcrumbs
        label="Example breadcrumb"
        items={[
          { label: 'Home', href: '#home' },
          { label: 'Examples', href: '#examples' },
          { label: 'Accessibility notes' },
        ]}
      />
    </section>
  ),
};

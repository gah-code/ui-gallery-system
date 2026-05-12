import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Batch 1/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  args: {
    currentPage: 2,
    totalPages: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.comfortable,
} as const;

export const Default: Story = {
  render: () => <Pagination currentPage={2} totalPages={10} />,
};

export const FirstPage: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Previous is disabled on the first page.</Text>
      <Pagination currentPage={1} totalPages={10} />
    </section>
  ),
};

export const MiddlePage: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Middle pages show sibling context and ellipsis when needed.</Text>
      <Pagination currentPage={8} totalPages={20} />
    </section>
  ),
};

export const LastPage: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Next is disabled on the last page.</Text>
      <Pagination currentPage={10} totalPages={10} />
    </section>
  ),
};

export const ManyPages: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Large page counts collapse safely with decorative ellipsis items.</Text>
      <Pagination currentPage={42} totalPages={120} siblingCount={1} boundaryCount={1} />
    </section>
  ),
};

export const Compact: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Compact pagination reduces spacing for dense surfaces.</Text>
      <Pagination currentPage={4} totalPages={12} size="sm" variant="compact" />
    </section>
  ),
};

export const WithoutPrevNext: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Previous and next controls can be hidden when page-only navigation is preferred.</Text>
      <Pagination currentPage={3} totalPages={8} showPrevNext={false} />
    </section>
  ),
};

export const LinkMode: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Providing getPageHref renders link controls without assuming a router.</Text>
      <Pagination
        currentPage={5}
        totalPages={15}
        getPageHref={(page) => `#page-${page}`}
      />
    </section>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text tone="secondary">Previous and next labels can adapt to product language.</Text>
      <Pagination
        currentPage={3}
        totalPages={7}
        previousLabel="Back"
        nextLabel="Forward"
      />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Pagination renders a nav landmark, marks the current page with aria-current, disables
        previous/next at boundaries, and supports button or link rendering.
      </Text>
      <Pagination currentPage={6} totalPages={24} />
    </section>
  ),
};

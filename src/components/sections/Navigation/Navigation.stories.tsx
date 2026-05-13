import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { Navigation, type NavigationItem } from './Navigation';

const meta = {
  title: 'Sections/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    brand: 'Northstar UI',
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: NavigationItem[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Components', href: '#components' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
];

const manyItems: NavigationItem[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Components', href: '#components' },
  { label: 'Patterns', href: '#patterns' },
  { label: 'Sections', href: '#sections' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Support', href: '#support' },
];

const noteStyle = {
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[6],
  maxWidth: vars.font.measure.comfortable,
} as const;

export const Default: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems}
      actions={<Button href="#start">Get started</Button>}
    />
  ),
};

export const Minimal: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems.slice(0, 2)}
      variant="minimal"
      density="compact"
    />
  ),
};

export const WithCTA: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems}
      actions={
        <>
          <Button href="#docs" variant="ghost">
            Docs
          </Button>
          <Button href="#start">Start building</Button>
        </>
      }
    />
  ),
};

export const ManyLinks: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={manyItems}
      actions={<Button href="#contact" variant="secondary">Contact</Button>}
    />
  ),
};

export const LongLabels: Story = {
  render: () => (
    <section>
      <Navigation
        brand="Northstar Product Experience Design System"
        items={[
          { label: 'Platform orchestration overview', href: '#platform' },
          { label: 'Reusable component documentation', href: '#components', current: true },
          { label: 'Responsive section composition patterns', href: '#sections' },
          { label: 'Accessibility and interaction guidance', href: '#accessibility' },
          { label: 'Implementation roadmap and release notes', href: '#roadmap' },
        ]}
        actions={
          <>
            <Button href="#contact" variant="ghost">
              Contact solutions
            </Button>
            <Button href="#start">Start implementation</Button>
          </>
        }
      />
      <div style={noteStyle}>
        <Text as="h3" variant="heading">
          Long-label wrapping
        </Text>
        <Text as="p" variant="body" tone="secondary">
          Long brand text, link labels, current-page state, and actions wrap without adding a
          hamburger menu or route behavior.
        </Text>
      </div>
    </section>
  ),
};

export const CurrentPage: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems.map((item) => ({
        ...item,
        current: item.label === 'Components',
      }))}
      actions={<Button href="#start">Get started</Button>}
    />
  ),
};

export const Centered: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems.slice(0, 3)}
      actions={<Button href="#start" variant="secondary">Start</Button>}
      variant="centered"
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems}
      actions={<Button href="#start" size="sm">Start</Button>}
      density="compact"
    />
  ),
};

export const Spacious: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      items={defaultItems}
      actions={<Button href="#start">Get started</Button>}
      density="spacious"
    />
  ),
};

export const NoLinks: Story = {
  render: () => (
    <Navigation
      brand="Northstar UI"
      actions={<Button href="#start">Get started</Button>}
      variant="minimal"
    />
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section>
      <Navigation
        brand="Northstar UI"
        items={manyItems}
        actions={<Button href="#start">Get started</Button>}
      />
      <div style={noteStyle}>
        <Text as="h3" variant="heading">
          Responsive contract
        </Text>
        <Text as="p" variant="body" tone="secondary">
          Navigation wraps safely on smaller screens. This pass does not implement a complex mobile
          menu; that can be scoped later if needed.
        </Text>
      </div>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section>
      <Navigation
        brand="Northstar UI"
        items={defaultItems.map((item) => ({
          ...item,
          current: item.label === 'Docs',
        }))}
        actions={<Button href="#start">Get started</Button>}
        label="Primary site navigation"
      />
      <div style={noteStyle}>
        <Text as="h3" variant="heading">
          Accessibility notes
        </Text>
        <Text as="p" variant="body" tone="secondary">
          Navigation uses a nav landmark, descriptive links, and aria-current for the current page.
          Actions should be accessible Button or link nodes.
        </Text>
      </div>
    </section>
  ),
};

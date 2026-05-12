import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Alert } from '../Alert';
import { Button } from '../../ui/Button';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { Tabs } from './Tabs';
import type { TabItem, TabsDensity, TabsTone } from './Tabs';

const baseItems: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <Text tone="secondary">
        Tabs switch between related panels while keeping all content scoped to the component.
      </Text>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <Text tone="secondary">
        Each tab trigger is associated with a panel through aria-controls and aria-labelledby.
      </Text>
    ),
  },
  {
    id: 'usage',
    label: 'Usage',
    content: (
      <Text tone="secondary">
        Use tabs for related views at the same hierarchy level, not for route-level navigation.
      </Text>
    ),
  },
];

const meta = {
  title: 'Components/Batch 1/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: baseItems,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.comfortable,
} as const;

const longLabelItems: TabItem[] = [
  {
    id: 'long-1',
    label: 'Very long tab label for product overview',
    content: <Text tone="secondary">Long labels stay on one line and the tab list scrolls.</Text>,
  },
  {
    id: 'long-2',
    label: 'Implementation and dependency guidance',
    content: <Text tone="secondary">Horizontal overflow keeps labels readable.</Text>,
  },
  {
    id: 'long-3',
    label: 'Accessibility and keyboard behavior notes',
    content: <Text tone="secondary">Focus remains visible while moving through tabs.</Text>,
  },
];

const denseItems: TabItem[] = Array.from({ length: 8 }, (_, index) => ({
  id: `tab-${index + 1}`,
  label: `Tab ${index + 1}`,
  content: <Text tone="secondary">Panel content for tab {index + 1}.</Text>,
}));

function ControlledTabsExample() {
  const [selectedId, setSelectedId] = useState('details');

  return (
    <section style={surfaceStyle}>
      <Text tone="secondary">Controlled selected id: {selectedId}</Text>
      <Tabs items={baseItems} selectedId={selectedId} onSelectedChange={setSelectedId} />
    </section>
  );
}

export const Default: Story = {
  render: () => <Tabs items={baseItems} />,
};

export const InitiallySelected: Story = {
  render: () => <Tabs items={baseItems} defaultSelectedId="usage" />,
};

export const Controlled: Story = {
  render: () => <ControlledTabsExample />,
};

export const LongLabels: Story = {
  render: () => <Tabs items={longLabelItems} />,
};

export const DenseLabels: Story = {
  render: () => <Tabs items={denseItems} density="compact" tone="subtle" />,
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs
      items={[
        baseItems[0],
        {
          id: 'disabled',
          label: 'Disabled',
          content: <Text tone="secondary">Disabled tab content is not activated.</Text>,
          disabled: true,
        },
        baseItems[2],
      ]}
    />
  ),
};

export const MixedPanelContent: Story = {
  render: () => (
    <Tabs
      items={[
        {
          id: 'summary',
          label: 'Summary',
          content: (
            <div style={{ display: 'grid', gap: vars.space[3] }}>
              <Text variant="heading">Mixed panel content</Text>
              <Text tone="secondary">Panels can contain primitives and reusable components.</Text>
              <div style={{ display: 'flex', gap: vars.space[2], flexWrap: 'wrap' }}>
                <Tag variant="brand">Reusable</Tag>
                <Tag variant="info">Accessible</Tag>
              </div>
            </div>
          ),
        },
        {
          id: 'alert',
          label: 'Alert',
          content: (
            <Alert title="Panel alert" variant="info">
              This demonstrates component composition inside a tab panel.
            </Alert>
          ),
        },
        {
          id: 'actions',
          label: 'Actions',
          content: <Button variant="secondary">Panel action</Button>,
        },
      ]}
    />
  ),
};

export const Densities: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {(['compact', 'default', 'spacious'] as TabsDensity[]).map((density) => (
        <div key={density} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">density: {density}</Text>
          <Tabs items={baseItems} density={density} />
        </div>
      ))}
    </section>
  ),
};

export const ToneVariants: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {(['default', 'subtle', 'outline'] as TabsTone[]).map((tone) => (
        <div key={tone} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">tone: {tone}</Text>
          <Tabs items={baseItems} tone={tone} />
        </div>
      ))}
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Tabs use role=&quot;tablist&quot;, role=&quot;tab&quot;, role=&quot;tabpanel&quot;,
        aria-selected, aria-controls, and aria-labelledby. ArrowLeft and ArrowRight move between
        enabled tabs.
      </Text>
      <Tabs items={baseItems} defaultSelectedId="overview" />
    </section>
  ),
};

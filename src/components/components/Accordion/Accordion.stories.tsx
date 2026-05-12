import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { Accordion } from './Accordion';
import type { AccordionDensity, AccordionItem, AccordionTone } from './Accordion';

const baseItems: AccordionItem[] = [
  {
    id: 'overview',
    title: 'What does the Accordion component do?',
    content: (
      <Text tone="secondary">
        Accordion reveals and hides stacked content sections using native button controls and
        associated panels.
      </Text>
    ),
  },
  {
    id: 'usage',
    title: 'When should I use it?',
    content: (
      <Text tone="secondary">
        Use it for compact FAQ-style content, progressive disclosure, or grouped details where all
        content does not need to be visible at once.
      </Text>
    ),
  },
  {
    id: 'boundary',
    title: 'What is out of scope?',
    content: (
      <Text tone="secondary">
        This component is not a section builder, navigation system, or CMS-shaped content model.
      </Text>
    ),
  },
];

const meta = {
  title: 'Components/Batch 1/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  args: {
    items: baseItems,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceStyle = {
  display: 'grid',
  gap: vars.space[5],
  maxWidth: vars.font.measure.comfortable,
} as const;

const longContentItems: AccordionItem[] = [
  {
    id: 'long-content',
    title: 'How does long content behave inside a panel?',
    content: (
      <div style={{ display: 'grid', gap: vars.space[3] }}>
        <Text tone="secondary">
          Long content wraps inside the panel and expands vertically. The accordion does not clamp or
          hide content beyond the collapsed panel state.
        </Text>
        <Text tone="secondary">
          This keeps the component useful for explanatory copy, compact docs, and FAQ answers while
          preserving clear trigger and panel semantics.
        </Text>
      </div>
    ),
  },
  ...baseItems,
];

const faqItems: AccordionItem[] = [
  {
    id: 'faq-1',
    title: 'Can Accordion render FAQ content?',
    content: <Text tone="secondary">Yes, FAQ-style content is a canonical use case.</Text>,
  },
  {
    id: 'faq-2',
    title: 'Can multiple FAQ answers remain open?',
    content: <Text tone="secondary">Yes, set allowMultiple when that behavior is intentional.</Text>,
  },
  {
    id: 'faq-3',
    title: 'Does it implement custom arrow-key navigation?',
    content: (
      <Text tone="secondary">
        Not in this pass. Native button keyboard behavior is the supported interaction scope.
      </Text>
    ),
  },
  {
    id: 'faq-4',
    title: 'Does it fetch content from a CMS?',
    content: <Text tone="secondary">No. Items are plain UI data passed by the caller.</Text>,
  },
];

export const Default: Story = {
  render: () => <Accordion items={baseItems} />,
};

export const MultipleItems: Story = {
  render: () => (
    <Accordion
      items={[
        ...baseItems,
        {
          id: 'extra',
          title: 'Can it support additional items?',
          content: <Text tone="secondary">Yes. Items render as a stacked group.</Text>,
        },
      ]}
    />
  ),
};

export const LongContent: Story = {
  render: () => <Accordion items={longContentItems} defaultOpenItems={['long-content']} />,
};

export const InitiallyOpen: Story = {
  render: () => <Accordion items={baseItems} defaultOpenItems={['usage']} />,
};

export const AllowMultipleOpen: Story = {
  render: () => (
    <Accordion allowMultiple items={baseItems} defaultOpenItems={['overview', 'usage']} />
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion
      items={[
        baseItems[0],
        {
          id: 'disabled',
          title: 'This item is disabled',
          content: <Text tone="secondary">Disabled items do not toggle.</Text>,
          disabled: true,
        },
        baseItems[2],
      ]}
    />
  ),
};

export const DenseFAQ: Story = {
  render: () => <Accordion items={faqItems} density="compact" tone="subtle" />,
};

export const Densities: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {(['compact', 'default', 'spacious'] as AccordionDensity[]).map((density) => (
        <div key={density} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">density: {density}</Text>
          <Accordion items={baseItems.slice(0, 2)} density={density} />
        </div>
      ))}
    </section>
  ),
};

export const ToneVariants: Story = {
  render: () => (
    <section style={surfaceStyle}>
      {(['default', 'subtle', 'outline'] as AccordionTone[]).map((tone) => (
        <div key={tone} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">tone: {tone}</Text>
          <Accordion items={baseItems.slice(0, 2)} tone={tone} />
        </div>
      ))}
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={surfaceStyle}>
      <Text>
        Accordion uses native button controls, aria-expanded, aria-controls, and associated panels.
        Native button keyboard behavior is used in this pass.
      </Text>
      <Accordion items={baseItems} defaultOpenItems={['overview']} />
    </section>
  ),
};

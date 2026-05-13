import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { DemoPageShell } from './DemoPageShell';

const meta = {
  title: 'Gallery/Demo Page Shell',
  component: DemoPageShell,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'Demo page shell',
    description: 'A reusable app-side frame for presenting gallery and demo examples consistently.',
  },
} satisfies Meta<typeof DemoPageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoContent = (
  <Text as="p" variant="body" tone="secondary">
    Demo content renders inside the shell content area. Future gallery demos can place composed
    primitives, patterns, components, or sections here without becoming production page templates.
  </Text>
);

export const Default: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    children: demoContent,
  },
};

export const Compact: Story = {
  args: {
    density: 'compact',
    phase: 'Phase 6',
    category: 'Gallery',
    children: demoContent,
  },
};

export const Spacious: Story = {
  args: {
    density: 'spacious',
    phase: 'Phase 6',
    category: 'Gallery',
    children: demoContent,
  },
};

export const WithMetadata: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Demo surfaces',
    status: 'review',
    tags: ['metadata-driven', 'app-side', 'storybook-linked'],
    children: demoContent,
  },
};

export const WithActions: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    actions: (
      <>
        <Button type="button">View examples</Button>
        <Button type="button" variant="secondary">
          Back to gallery
        </Button>
      </>
    ),
    children: demoContent,
  },
};

export const FramedContent: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    framed: true,
    children: (
      <Text as="p" variant="body" tone="secondary">
        Framed content provides a consistent surface for demos that need separation from the page
        background.
      </Text>
    ),
  },
};

export const EmptyContent: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    emptyMessage: 'This demo shell is ready, but no example content has been attached yet.',
  },
};

export const LongCopyStress: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    title: 'Demo shell with long descriptive content',
    description:
      'This story validates that the demo page shell can handle longer explanatory copy without breaking layout, overflowing its container, or confusing the relationship between metadata, actions, and the content area that follows.',
    children: demoContent,
  },
};

export const StorybookRelationship: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    title: 'Storybook relationship',
    description:
      'DemoPageShell is for app-side demos. Storybook remains the primary design-system workspace.',
    children: (
      <Text as="p" variant="body" tone="secondary">
        Use this shell for browsable app-side demo pages while keeping detailed component state,
        API, and interaction validation in Storybook.
      </Text>
    ),
  },
};

export const AccessibilityNotes: Story = {
  args: {
    phase: 'Phase 6',
    category: 'Gallery',
    title: 'Demo shell accessibility notes',
    description:
      'DemoPageShell provides a consistent heading, metadata row, optional action row, and content region. Actions remain caller-owned nodes and should keep native button or link semantics.',
    children: (
      <Text as="p" variant="body" tone="secondary">
        Metadata should remain visible text, empty states should be announced as normal page
        content, and demo framing should not replace component-level accessibility validation.
      </Text>
    ),
  },
};

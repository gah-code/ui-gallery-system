import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { DemoPageShell, type DemoPageShellTheme } from './DemoPageShell';

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

function ControlledDemoShellStory() {
  const [theme, setTheme] = useState<DemoPageShellTheme>('dark');

  return (
    <DemoPageShell
      theme={theme}
      onThemeToggle={() =>
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
      }
      phase="Phase 9"
      category="Planning-side contract patch"
      title="Demo shell controlled theme"
      description="This story validates that DemoPageShell can inherit a caller-owned theme while preserving its local fallback behavior for existing usage."
      tags={['controlled-theme', 'gallery-demo-contract', 'local-fallback-preserved']}
      framed
    >
      <Text as="p" variant="body" tone="secondary">
        The utility toggle updates caller-owned theme state in this story, matching the shared
        gallery/demo contract without requiring a global ThemeProvider.
      </Text>
    </DemoPageShell>
  );
}

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

export const DarkMode: Story = {
  args: {
    initialTheme: 'dark',
    phase: 'Phase 8',
    category: 'Responsive polish',
    title: 'Demo shell dark mode',
    description:
      'This story validates the DemoPageShell beacon bar, social actions, local dark-mode surface, and responsive utility-area wrapping.',
    tags: ['beacon-bar', 'dark-mode', 'responsive'],
    framed: true,
    children: (
      <Text as="p" variant="body" tone="secondary">
        The utility bar should stack cleanly on small screens, wrap actions at medium widths, and
        align identity and actions horizontally on larger screens without changing the shell purpose.
      </Text>
    ),
  },
};

export const InheritedTheme: Story = {
  render: () => <ControlledDemoShellStory />,
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

export const ResponsiveStress: Story = {
  args: {
    initialTheme: 'dark',
    projectLabel: 'UI Roadmap / Demo System / Responsive Validation Workspace',
    phase: 'Phase 8 responsive polish and section contract refinement',
    category: 'Gallery and demo surfaces',
    status: 'review',
    tags: [
      'responsive-stress',
      'beacon-bar',
      'metadata-wrapping',
      'action-wrapping',
      'dark-shell',
      'storybook-validation',
    ],
    title:
      'Demo shell responsive stress state with long utility identity, metadata, actions, and framed content',
    description:
      'This story validates the DemoPageShell beacon bar, local dark shell, project identity text, metadata row, actions, framed content, and note area when copy and tags wrap across viewport sizes.',
    actions: (
      <>
        <Button type="button">Review responsive behavior</Button>
        <Button type="button" variant="secondary">
          Compare app-side demos
        </Button>
        <Button type="button" variant="ghost">
          Open Storybook notes
        </Button>
      </>
    ),
    framed: true,
    children: (
      <Text as="p" variant="body" tone="secondary">
        Framed content remains readable while the utility bar stacks on small screens, action groups
        wrap at medium widths, and metadata tags avoid forcing horizontal overflow.
      </Text>
    ),
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

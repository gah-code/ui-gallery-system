import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { vars } from '../../../styles';
import { Sidebar } from './Sidebar';
import type { SidebarGap, SidebarWidth } from './Sidebar';

const meta = {
  title: 'Layout Patterns/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
  },
  args: {
    main: 'Main content',
    sidebar: 'Sidebar content',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const gaps: SidebarGap[] = ['sm', 'md', 'lg', 'xl'];
const widths: SidebarWidth[] = ['sm', 'md', 'lg'];

const panelStyle = {
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

const sidebarPanelStyle = {
  ...panelStyle,
  background: vars.color.surface.subtle,
} as const;

function MainContent({ long = false }: { long?: boolean }) {
  return (
    <article style={panelStyle}>
      <Tag variant="brand">Main</Tag>
      <Text variant="heading" as="h2">
        Main content keeps priority
      </Text>
      <Text tone="secondary">
        Sidebar composes content slots and protects the main area from being crushed by supporting
        content.
      </Text>
      {long ? (
        <>
          <Text>
            This long main content validates that the pattern can support documentation-style or
            editorial areas with several paragraphs. The sidebar should remain secondary and should
            not force the primary content into an unreadable width.
          </Text>
          <Text>
            Future docs pages, filter layouts, metadata panels, or supporting navigation areas can
            use this spatial contract without the pattern knowing anything about business content.
          </Text>
          <Text>
            On small screens, the layout stacks so the reading flow stays predictable. At larger
            widths, the layout switches to a main plus sidebar structure.
          </Text>
        </>
      ) : null}
      <Button>Primary action</Button>
    </article>
  );
}

function SidebarContent({ dense = false }: { dense?: boolean }) {
  const items = dense
    ? ['Overview', 'Details', 'Metadata', 'Filters', 'Actions', 'Related', 'Archive', 'Settings']
    : ['Overview', 'Details', 'Actions'];

  return (
    <div style={sidebarPanelStyle}>
      <Text variant="label">Supporting content</Text>
      <StatusLabel status="info">Secondary</StatusLabel>
      <div style={{ display: 'grid', gap: vars.space[2] }}>
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
      {dense ? <Input label="Filter" placeholder="Search sidebar" /> : null}
    </div>
  );
}

export const Default: Story = {
  render: () => <Sidebar main={<MainContent />} sidebar={<SidebarContent />} />,
};

export const LeftSidebar: Story = {
  render: () => <Sidebar side="left" main={<MainContent />} sidebar={<SidebarContent />} />,
};

export const SidebarWidths: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {widths.map((sidebarWidth) => (
        <div key={sidebarWidth} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">sidebarWidth: {sidebarWidth}</Text>
          <Sidebar
            sidebarWidth={sidebarWidth}
            main={<MainContent />}
            sidebar={<SidebarContent dense={sidebarWidth === 'lg'} />}
          />
        </div>
      ))}
    </section>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {gaps.map((gap) => (
        <div key={gap} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">gap: {gap}</Text>
          <Sidebar gap={gap} main={<MainContent />} sidebar={<SidebarContent />} />
        </div>
      ))}
    </section>
  ),
};

export const LongCopyStress: Story = {
  render: () => <Sidebar main={<MainContent long />} sidebar={<SidebarContent />} />,
};

export const DenseSidebarContent: Story = {
  render: () => <Sidebar main={<MainContent />} sidebar={<SidebarContent dense />} />,
};

export const StretchAlignment: Story = {
  render: () => <Sidebar align="stretch" main={<MainContent long />} sidebar={<SidebarContent dense />} />,
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4] }}>
      <Text>
        Small screens stack. Larger screens use a main + sidebar layout only when the main content
        keeps readable space.
      </Text>
      <Sidebar main={<MainContent long />} sidebar={<SidebarContent dense />} sidebarWidth="18rem" />
    </section>
  ),
};

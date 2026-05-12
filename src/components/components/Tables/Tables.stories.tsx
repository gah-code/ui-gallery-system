import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { Tables, type TableColumn, type TableRow } from './Tables';

const meta = {
  title: 'Components/Batch 2/Tables',
  component: Tables,
  parameters: {
    layout: 'padded',
  },
  args: {
    columns: [],
    rows: [],
  },
} satisfies Meta<typeof Tables>;

export default meta;
type Story = StoryObj<typeof meta>;

const storySurfaceStyle = {
  display: 'grid',
  gap: vars.space[6],
  maxWidth: vars.font.measure.wide,
} as const;

const noteStyle = {
  display: 'grid',
  gap: vars.space[3],
  maxWidth: vars.font.measure.comfortable,
} as const;

type ProjectRow = TableRow & {
  project: string;
  owner: string;
  status: string;
  priority: string;
  budget: string;
  timeline: string;
  summary: string;
};

const rows: ProjectRow[] = [
  {
    project: 'Design system refresh',
    owner: 'Product Design',
    status: 'On track',
    priority: 'High',
    budget: '$42,000',
    timeline: 'Q2',
    summary: 'Refresh component foundations and align token usage across product surfaces.',
  },
  {
    project: 'Billing workflow',
    owner: 'Platform',
    status: 'Needs review',
    priority: 'Medium',
    budget: '$28,000',
    timeline: 'Q3',
    summary: 'Simplify invoice review, approvals, and payment method changes.',
  },
  {
    project: 'Partner portal',
    owner: 'Growth',
    status: 'Blocked',
    priority: 'Low',
    budget: '$18,000',
    timeline: 'Q4',
    summary: 'Provide partners with shared campaign assets and status visibility.',
  },
];

const columns: Array<TableColumn<ProjectRow>> = [
  { id: 'project', header: 'Project', accessor: 'project' },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
  { id: 'timeline', header: 'Timeline', accessor: 'timeline' },
  { id: 'budget', header: 'Budget', accessor: 'budget', align: 'end' },
];

const statusColumns: Array<TableColumn<ProjectRow>> = [
  { id: 'project', header: 'Project', accessor: 'project' },
  {
    id: 'status',
    header: 'Status',
    render: (row) => {
      if (row.status === 'On track') return <StatusLabel status="success">On track</StatusLabel>;
      if (row.status === 'Needs review') return <StatusLabel status="warning">Needs review</StatusLabel>;
      return <StatusLabel status="error">Blocked</StatusLabel>;
    },
  },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
];

const tagColumns: Array<TableColumn<ProjectRow>> = [
  { id: 'project', header: 'Project', accessor: 'project' },
  {
    id: 'priority',
    header: 'Priority',
    render: (row) => (
      <Tag variant={row.priority === 'High' ? 'brand' : row.priority === 'Medium' ? 'warning' : 'neutral'}>
        {row.priority}
      </Tag>
    ),
  },
  { id: 'summary', header: 'Summary', accessor: 'summary' },
];

const actionColumns: Array<TableColumn<ProjectRow>> = [
  { id: 'project', header: 'Project', accessor: 'project' },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
  {
    id: 'actions',
    header: 'Actions',
    align: 'end',
    render: (row) => (
      <Button size="sm" variant="secondary" type="button">
        Review {row.project}
      </Button>
    ),
  },
];

const overflowColumns: Array<TableColumn<ProjectRow>> = [
  { id: 'project', header: 'Project', accessor: 'project' },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
  { id: 'status', header: 'Status', accessor: 'status' },
  { id: 'priority', header: 'Priority', accessor: 'priority' },
  { id: 'budget', header: 'Budget', accessor: 'budget', align: 'end' },
  { id: 'timeline', header: 'Timeline', accessor: 'timeline' },
  { id: 'summary', header: 'Summary', accessor: 'summary' },
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={columns} rows={rows} />
    </section>
  ),
};

export const Dense: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={columns} rows={rows} density="compact" />
    </section>
  ),
};

export const Spacious: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={columns} rows={rows} density="spacious" />
    </section>
  ),
};

export const StripedRows: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={columns} rows={rows} striped tone="subtle" />
    </section>
  ),
};

export const ResponsiveOverflow: Story = {
  render: () => (
    <section style={{ ...storySurfaceStyle, maxWidth: '34rem' }}>
      <Tables
        title="Overflow preserved"
        description="Wide tables keep table semantics and use horizontal scrolling instead of changing into non-table markup."
        columns={overflowColumns}
        rows={rows}
        caption="Project planning table with enough columns to demonstrate overflow."
      />
    </section>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={statusColumns} rows={rows} />
    </section>
  ),
};

export const WithTags: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={tagColumns} rows={rows} tone="outline" />
    </section>
  ),
};

export const WithActions: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={actionColumns} rows={rows} />
    </section>
  ),
};

export const LongCellContent: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables
        columns={[
          { id: 'project', header: 'Project', accessor: 'project' },
          { id: 'summary', header: 'Summary', accessor: 'summary' },
        ]}
        rows={[
          {
            project: 'Very long implementation planning item',
            summary:
              'This cell intentionally contains a long paragraph of text to verify that table cells wrap safely without breaking semantic table structure or causing unreadable overflow inside the cell content area.',
          },
          ...rows.slice(1),
        ]}
      />
    </section>
  ),
};

export const EmptyRows: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables columns={columns} rows={[]} emptyMessage="No projects match the current view." />
    </section>
  ),
};

export const WithCaptionAndDescription: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Tables
        title="Project budget table"
        description="Use title and description for surrounding context, and caption for the semantic table label."
        caption="Project budgets by owner and timeline."
        columns={columns}
        rows={rows}
        striped
      />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <Tables columns={statusColumns} rows={rows.slice(0, 2)} caption="Accessible project status table." />
      <Text tone="secondary">
        Tables use semantic table markup. Headers use scope="col". Responsive behavior is handled
        with horizontal overflow to preserve table semantics.
      </Text>
    </section>
  ),
};

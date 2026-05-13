import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { GalleryBeaconBar } from './GalleryBeaconBar';

const noteStyle = {
  display: 'grid',
  gap: vars.space[2],
  padding: vars.space[5],
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
  background: vars.color.surface.page,
} as const;

const meta = {
  title: 'Gallery/Gallery Beacon Bar',
  component: GalleryBeaconBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GalleryBeaconBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  args: {
    theme: 'dark',
    label: 'UI Roadmap / Demo System',
    description: 'Dark-mode beacon bar state for app-side gallery surfaces.',
  },
};

export const ResponsiveContract: Story = {
  render: () => (
    <>
      <div style={noteStyle}>
        <Text as="p" variant="body" tone="secondary">
          GalleryBeaconBar stacks identity and actions on small screens, wraps actions at medium
          widths, and aligns identity with actions horizontally on larger screens without adding
          routes, CMS assumptions, or app-wide theme infrastructure.
        </Text>
      </div>
      <GalleryBeaconBar
        label="UI Roadmap / Demo System / Gallery and Demo Surface Alignment"
        description="This long project identity validates wrapping, social actions, and the local theme toggle across responsive Storybook viewports."
      />
    </>
  ),
};

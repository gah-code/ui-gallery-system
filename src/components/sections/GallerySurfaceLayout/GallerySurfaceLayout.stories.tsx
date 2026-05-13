import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Text } from '../../ui/Text';
import { GallerySurfaceLayout } from './GallerySurfaceLayout';

const noteStyle = {
  display: 'grid',
  gap: vars.space[2],
  padding: vars.space[5],
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
  background: vars.color.surface.subtle,
} as const;

const meta = {
  title: 'Gallery/Gallery Surface Layout',
  component: GallerySurfaceLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GallerySurfaceLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutNavigationHint: Story = {
  args: {
    showNavigationHint: false,
  },
};

export const DarkMode: Story = {
  args: {
    initialTheme: 'dark',
  },
};

export const ResponsiveContract: Story = {
  render: () => (
    <>
      <div style={noteStyle}>
        <Text as="p" variant="body" tone="secondary">
          GallerySurfaceLayout keeps GalleryIndex and GalleryCategoryBrowser separate while
          giving the app a single polished gallery landing flow. It owns the shared gallery
          theme state, applies one inherited data-theme root, and does not create routes or
          replace Storybook.
        </Text>
      </div>
      <GallerySurfaceLayout />
    </>
  ),
};

export const BeaconBarAlignment: Story = {
  render: () => (
    <>
      <div style={noteStyle}>
        <Text as="p" variant="body" tone="secondary">
          The composed gallery surface owns one shared Beacon Bar so GalleryIndex and
          GalleryCategoryBrowser stay focused on their original Phase 6 responsibilities without
          duplicating utility bars.
        </Text>
      </div>
      <GallerySurfaceLayout />
    </>
  ),
};

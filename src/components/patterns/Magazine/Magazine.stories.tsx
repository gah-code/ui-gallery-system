import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { vars } from '../../../styles';
import { Magazine } from './Magazine';
import type { MagazineLayout } from './Magazine';

const meta = {
  title: 'Layout Patterns/Magazine',
  component: Magazine,
  parameters: {
    layout: 'padded',
  },
  args: {
    content: 'Magazine content',
  },
} satisfies Meta<typeof Magazine>;

export default meta;
type Story = StoryObj<typeof Magazine>;

const layouts: MagazineLayout[] = ['balanced', 'mediaLead', 'contentLead', 'split'];

const panelStyle = {
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm,
} as const;

function DemoMedia({ label = 'Editorial media' }: { label?: string }) {
  return (
    <Image
      alt=""
      decorative
      aspectRatio="wide"
      fit="cover"
      radius="lg"
      fallback={label}
    />
  );
}

function DemoContent({ dense = false, long = false }: { dense?: boolean; long?: boolean }) {
  return (
    <div style={{ display: 'grid', gap: vars.space[4] }}>
      <div style={{ display: 'flex', gap: vars.space[2], flexWrap: 'wrap' }}>
        <Tag variant="brand">Editorial</Tag>
        {dense ? <StatusLabel status="info">Feature story</StatusLabel> : null}
      </div>
      <Text variant="display" as="h2">
        Mixed-width storytelling layout
      </Text>
      <Text variant="subheading" as="p">
        Magazine supports image and text pairings without becoming a section or card component.
      </Text>
      <Text>
        The pattern manages the spatial contract: stacking, gaps, alignment, and responsive editorial
        columns. Content remains owned by the caller.
      </Text>
      {long ? (
        <>
          <Text>
            This longer paragraph validates that editorial content can grow vertically while the
            layout preserves readable width. The pattern should not squeeze copy or media into
            awkward columns just to preserve a visual composition.
          </Text>
          <Text>
            At larger widths, variants can shift hierarchy toward media or content. At smaller
            widths, the layout returns to a predictable stacked reading order.
          </Text>
        </>
      ) : null}
      {dense ? (
        <div style={{ display: 'flex', gap: vars.space[2], flexWrap: 'wrap' }}>
          <Tag>Research</Tag>
          <Tag>Visual system</Tag>
          <Tag>Responsive</Tag>
          <Tag>Case study</Tag>
        </div>
      ) : null}
      <Button>Read more</Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <Magazine media={<DemoMedia />} content={<DemoContent />} />,
};

export const LayoutVariants: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[8] }}>
      {layouts.map((layout) => (
        <div key={layout} style={{ display: 'grid', gap: vars.space[2] }}>
          <Text variant="label">layout: {layout}</Text>
          <Magazine layout={layout} media={<DemoMedia label={`${layout} media`} />} content={<DemoContent />} />
        </div>
      ))}
    </section>
  ),
};

export const MediaLead: Story = {
  render: () => <Magazine layout="mediaLead" media={<DemoMedia label="Media lead" />} content={<DemoContent />} />,
};

export const ContentLead: Story = {
  render: () => (
    <Magazine layout="contentLead" media={<DemoMedia label="Supporting media" />} content={<DemoContent dense />} />
  ),
};

export const ReverseLayout: Story = {
  render: () => <Magazine reverse media={<DemoMedia label="Reversed media" />} content={<DemoContent />} />,
};

export const MissingMedia: Story = {
  render: () => <Magazine content={<DemoContent dense />} />,
};

export const DenseEditorialContent: Story = {
  render: () => (
    <Magazine
      layout="contentLead"
      align="start"
      media={<DemoMedia label="Dense editorial media" />}
      content={<DemoContent dense />}
    />
  ),
};

export const LongCopyStress: Story = {
  render: () => (
    <Magazine
      layout="split"
      align="start"
      media={<DemoMedia label="Long-copy media" />}
      content={<DemoContent long />}
    />
  ),
};

export const MixedPrimitiveContent: Story = {
  render: () => (
    <Magazine
      gap="xl"
      media={
        <div style={panelStyle}>
          <Image alt="" decorative aspectRatio="portrait" fallback="Portrait media" />
          <StatusLabel status="success">Available</StatusLabel>
        </div>
      }
      content={
        <div style={{ display: 'grid', gap: vars.space[4] }}>
          <Tag variant="brand">Mixed primitives</Tag>
          <Text variant="heading" as="h2">
            Primitive composition inside Magazine
          </Text>
          <Text>
            Existing primitives can be composed into the media and content slots without creating a
            reusable card, section, or CMS-specific shape.
          </Text>
          <div style={{ display: 'flex', gap: vars.space[2], flexWrap: 'wrap' }}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </div>
      }
    />
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={{ display: 'grid', gap: vars.space[4] }}>
      <Text>
        Small screens stack. Medium and large screens introduce editorial columns only when content
        and media can remain readable.
      </Text>
      <Magazine layout="mediaLead" media={<DemoMedia />} content={<DemoContent long />} />
    </section>
  ),
};

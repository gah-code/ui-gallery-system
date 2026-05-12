import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { Footer, type FooterLinkGroup } from './Footer';

const linkGroups: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Components', href: '#components' },
      { label: 'Sections', href: '#sections' },
      { label: 'Patterns', href: '#patterns' },
      { label: 'Foundations', href: '#foundations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Storybook', href: '#storybook' },
      { label: 'Release notes', href: '#releases' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const legalLinks = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Security', href: '#security' },
];

const socialLinks = [
  { label: 'GH', href: '#github', ariaLabel: 'GitHub profile' },
  { label: 'LI', href: '#linkedin', ariaLabel: 'LinkedIn profile' },
  { label: 'YT', href: '#youtube', ariaLabel: 'YouTube channel' },
];

const meta = {
  title: 'Sections/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    brand: 'UI Gallery System',
    description:
      'Reusable section components for composing consistent page surfaces without owning route templates.',
    linkGroups,
    legalLinks,
    socialLinks,
    meta: '© 2026 UI Gallery System. All rights reserved.',
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    linkGroups: [],
    socialLinks: [],
    legalLinks: [],
    description: undefined,
    meta: '© 2026 UI Gallery System.',
  },
};

export const MultiColumn: Story = {};

export const Centered: Story = {
  args: {
    variant: 'centered',
    linkGroups: [linkGroups[0]],
    description: 'A centered footer works for compact marketing surfaces or simple pages.',
  },
};

export const WithSocialLinks: Story = {
  args: {
    linkGroups: [],
    legalLinks: [],
    socialLinks,
    description: 'Social links may use short visible labels or icon-like text with accessible names.',
  },
};

export const WithLegalLinks: Story = {
  args: {
    linkGroups: [],
    socialLinks: [],
    legalLinks,
    description: 'Legal links remain distinct from grouped footer navigation.',
  },
};

export const LongLinkGroups: Story = {
  args: {
    linkGroups: [
      {
        title: 'Detailed product areas',
        links: [
          { label: 'Reusable primitives and accessibility contracts', href: '#primitives' },
          { label: 'Layout pattern guidance for responsive page composition', href: '#layout' },
          { label: 'Component library batch documentation and examples', href: '#components' },
          { label: 'Section-level composition boundaries and ownership notes', href: '#sections' },
          { label: 'Future CMS adapter and content-normalization readiness', href: '#cms' },
        ],
      },
      {
        title: 'Support resources',
        links: [
          { label: 'Design system operating model', href: '#operating-model' },
          { label: 'Contribution workflow and review expectations', href: '#workflow' },
          { label: 'Accessibility and keyboard interaction checklist', href: '#a11y' },
          { label: 'Responsive behavior validation notes', href: '#responsive' },
        ],
      },
    ],
  },
};

export const BrandStatement: Story = {
  args: {
    linkGroups: [],
    socialLinks: [],
    legalLinks,
    description:
      'A short brand statement can describe the system or product without turning the footer into a full page template.',
  },
};

export const WithActions: Story = {
  args: {
    linkGroups: [linkGroups[0]],
    actions: (
      <>
        <Button href="#start" size="sm">
          Start building
        </Button>
        <Button href="#docs" variant="secondary" size="sm">
          Read docs
        </Button>
      </>
    ),
  },
};

export const Compact: Story = {
  args: {
    density: 'compact',
  },
};

export const Spacious: Story = {
  args: {
    density: 'spacious',
  },
};

export const ResponsiveContract: Story = {
  render: () => (
    <Footer
      brand="Responsive footer"
      description="Footer stacks on small screens and introduces multi-column link groups only when there is enough width."
      linkGroups={linkGroups}
      legalLinks={legalLinks}
      socialLinks={socialLinks}
      meta="Responsive behavior should preserve readable link groups and legal metadata."
    />
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <Footer
      variant="minimal"
      brand="Footer accessibility notes"
      description={
        <Text as="span" variant="body" tone="secondary">
          Footer uses a semantic footer by default. Link groups have headings.
          Social/icon links need accessible names. Legal and metadata content should
          remain readable.
        </Text>
      }
      socialLinks={socialLinks}
      legalLinks={legalLinks}
      meta="Use descriptive link text and aria-labels for compact social links."
    />
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';
import { PricingTables, type PricingPlan } from './PricingTables';

const meta = {
  title: 'Components/PricingTables',
  component: PricingTables,
  parameters: {
    layout: 'padded',
  },
  args: {
    plans: [],
  },
} satisfies Meta<typeof PricingTables>;

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

const standardPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams validating a new workflow.',
    price: '$19',
    period: 'per seat / month',
    features: ['Core workspace', 'Shared components', 'Basic support'],
    action: <Button variant="secondary">Start Starter</Button>,
    footer: 'No payment logic is included in this component.',
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For growing teams standardizing reusable UI delivery.',
    price: '$49',
    period: 'per seat / month',
    badge: 'Popular',
    featured: true,
    featuredLabel: 'Recommended plan',
    features: ['Everything in Starter', 'Approval workflows', 'Advanced Storybook reviews'],
    action: <Button>Choose Team</Button>,
    footer: 'Visible featured label avoids relying on visual emphasis alone.',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with governance and support needs.',
    price: 'Custom',
    period: 'annual contract',
    features: ['Dedicated onboarding', 'Security review support', 'Priority response'],
    action: <Button variant="secondary">Contact sales</Button>,
  },
];

const fourPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['One workspace', 'Community examples', 'Basic export'],
    action: <Button variant="secondary">Try Free</Button>,
  },
  ...standardPlans,
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables
        title="Plan comparison"
        description="Reusable pricing cards compare plans without implementing checkout or billing."
        plans={standardPlans}
        columns="three"
      />
    </section>
  ),
};

export const TwoPlans: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={standardPlans.slice(0, 2)} columns="two" />
    </section>
  ),
};

export const ThreePlans: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={standardPlans} columns="three" />
    </section>
  ),
};

export const FourPlans: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={fourPlans} columns="four" />
    </section>
  ),
};

export const FeaturedPlan: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={standardPlans} columns="three" tone="raised" />
    </section>
  ),
};

export const Compact: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={standardPlans} columns="three" density="compact" />
    </section>
  ),
};

export const Spacious: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={standardPlans.slice(0, 2)} columns="two" density="spacious" />
    </section>
  ),
};

export const LongFeatureList: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables
        plans={[
          {
            id: 'scale',
            name: 'Scale',
            description: 'For teams with long procurement and implementation requirements.',
            price: '$99',
            period: 'per seat / month',
            featured: true,
            featuredLabel: 'Best for scale teams',
            features: [
              'Unlimited reusable component workspaces across product areas',
              'Detailed implementation review notes that can wrap across multiple lines safely',
              'Governance workflow exports for design, engineering, and product stakeholders',
              'Priority support during launch windows',
              'Quarterly architecture reviews',
              'Shared reporting templates',
            ],
            action: <Button>Choose Scale</Button>,
          },
        ]}
        columns="auto"
      />
    </section>
  ),
};

export const MissingOptionalFields: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables
        plans={[
          {
            id: 'simple',
            name: 'Simple',
            price: '$12',
            features: ['One plan name', 'One price', 'Feature list only'],
          },
          {
            id: 'custom',
            name: 'Custom',
            price: 'Talk to us',
            features: ['Flexible terms', 'Custom onboarding'],
          },
        ]}
        columns="two"
        tone="outline"
      />
    </section>
  ),
};

export const CustomActions: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables
        plans={standardPlans.map((plan) => ({
          ...plan,
          action: (
            <>
              <Button>{plan.price === 'Custom' ? 'Contact sales' : 'Select plan'}</Button>
              <Button variant="ghost">Compare</Button>
            </>
          ),
        }))}
        columns="three"
      />
    </section>
  ),
};

export const EmptyPlans: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <PricingTables plans={[]} />
      <Text tone="secondary">Empty plan arrays render nothing.</Text>
    </section>
  ),
};

export const ResponsiveContract: Story = {
  render: () => (
    <section style={noteStyle}>
      <PricingTables plans={fourPlans} columns="four" density="compact" />
      <Text tone="secondary">
        PricingTables stack on small screens and introduce columns only when plan cards remain
        readable.
      </Text>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <PricingTables plans={standardPlans.slice(0, 2)} columns="two" />
      <Text tone="secondary">
        Pricing comparison uses visible plan names, prices, feature lists, and actions. Featured
        plans include a visible label and do not rely on visual emphasis alone. This component does
        not implement billing or checkout behavior.
      </Text>
    </section>
  ),
};

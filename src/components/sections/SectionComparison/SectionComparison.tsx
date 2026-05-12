import type { HTMLAttributes, ReactNode } from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { CTASection } from '../CTASection';
import { DemoPageShell } from '../DemoPageShell';
import { FeatureRow } from '../FeatureRow';
import { Footer } from '../Footer';
import { Hero } from '../Hero';
import { Navigation } from '../Navigation';
import {
  demoContent,
  demoFrame,
  demoLabel,
  examples,
  group,
  groupHeader,
  note,
  root,
} from './SectionComparison.css';

export type SectionComparisonProps = {
  title?: string;
  description?: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

function DemoFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <article className={demoFrame}>
      <div className={demoLabel}>
        <Tag variant="brand">Variant</Tag>
        <Text as="h3" variant="label">
          {label}
        </Text>
      </div>
      <div className={demoContent}>{children}</div>
    </article>
  );
}

export function SectionComparison({
  title = 'Section Comparison Pages',
  description = 'Compare completed section components with realistic content states. These examples are app-side demos, not production page templates.',
  className,
  ...rest
}: SectionComparisonProps) {
  return (
    <DemoPageShell
      title={title}
      description={description}
      phase="Phase 6"
      category="Sections"
      tags={['comparison', 'sections', 'demo']}
      framed={false}
      className={className}
      {...rest}
    >
      <div className={root}>
        <section className={group}>
          <div className={groupHeader}>
            <Text as="h2" variant="heading">
              Navigation
            </Text>
            <Text as="p" variant="body" tone="secondary">
              Primary navigation variations with current state, actions, and link density.
            </Text>
          </div>

          <div className={examples}>
            <DemoFrame label="Default navigation">
              <Navigation
                brand="UI Gallery"
                items={[
                  { label: 'Foundations', href: '#foundations' },
                  { label: 'Components', href: '#components', current: true },
                  { label: 'Sections', href: '#sections' },
                ]}
                actions={<Button size="sm">View Storybook</Button>}
              />
            </DemoFrame>

            <DemoFrame label="Many-link navigation">
              <Navigation
                brand="System"
                density="compact"
                items={[
                  { label: 'Tokens', href: '#tokens' },
                  { label: 'Primitives', href: '#primitives' },
                  { label: 'Patterns', href: '#patterns' },
                  { label: 'Components', href: '#components' },
                  { label: 'Sections', href: '#sections', current: true },
                  { label: 'Gallery', href: '#gallery' },
                ]}
              />
            </DemoFrame>

            <DemoFrame label="Centered navigation">
              <Navigation
                variant="centered"
                brand="Gallery System"
                items={[
                  { label: 'Browse', href: '#browse' },
                  { label: 'Compare', href: '#compare', current: true },
                ]}
              />
            </DemoFrame>
          </div>
        </section>

        <section className={group}>
          <div className={groupHeader}>
            <Text as="h2" variant="heading">
              Hero
            </Text>
            <Text as="p" variant="body" tone="secondary">
              Introductory hero variants with actions, metadata, and optional media.
            </Text>
          </div>

          <div className={examples}>
            <DemoFrame label="Centered hero">
              <Hero
                variant="centered"
                title="Build from a stable UI system"
                intro="Foundations, primitives, patterns, components, and sections now move as one connected design language."
                status={{ label: 'Implemented', status: 'success' }}
                actions={
                  <>
                    <Button>Explore gallery</Button>
                    <Button variant="secondary">Read docs</Button>
                  </>
                }
              />
            </DemoFrame>

            <DemoFrame label="Split hero with media">
              <Hero
                variant="split"
                title="Preview realistic content states"
                intro="Demo surfaces help compare variants without becoming production pages."
                media={
                  <Image
                    alt="Demo placeholder"
                    aspectRatio="wide"
                    fallback="Demo media placeholder"
                  />
                }
                actions={<Button>Open comparison</Button>}
              />
            </DemoFrame>

            <DemoFrame label="Text-only hero">
              <Hero
                density="compact"
                title="Content-only states remain valid"
                intro="Missing media falls back to a clean text-first layout."
                tags={[{ label: 'text-only', variant: 'info' }]}
              />
            </DemoFrame>
          </div>
        </section>

        <section className={group}>
          <div className={groupHeader}>
            <Text as="h2" variant="heading">
              CTA Section
            </Text>
            <Text as="p" variant="body" tone="secondary">
              Focused action sections for page moments and conversion surfaces.
            </Text>
          </div>

          <div className={examples}>
            <DemoFrame label="Centered CTA">
              <CTASection
                title="Ready to continue the build?"
                description="Move from sections into gallery/demo surfaces with confidence."
                actions={<Button>Continue roadmap</Button>}
                framed
              />
            </DemoFrame>

            <DemoFrame label="Split CTA with support content">
              <CTASection
                variant="split"
                title="Validate before scaling"
                description="Use comparison surfaces to inspect responsive and content-heavy states."
                actions={<Button>Review examples</Button>}
                support={
                  <Alert title="Demo-only surface" variant="info">
                    This support slot is for comparison content, not business logic.
                  </Alert>
                }
              />
            </DemoFrame>

            <DemoFrame label="Brand CTA">
              <CTASection
                tone="brand"
                title="Keep implementation boundaries visible"
                description="Demo surfaces can look polished while staying separate from production page composition."
                actions={<Button variant="secondary">Review boundary</Button>}
              />
            </DemoFrame>
          </div>
        </section>

        <section className={group}>
          <div className={groupHeader}>
            <Text as="h2" variant="heading">
              Feature Row
            </Text>
            <Text as="p" variant="body" tone="secondary">
              Feature collections composed from FeatureBox and layout contracts.
            </Text>
          </div>

          <div className={examples}>
            <DemoFrame label="Three-feature row">
              <FeatureRow
                title="System strengths"
                intro="Feature rows should communicate meaning through text first."
                features={[
                  {
                    title: 'Composable',
                    description: 'Built from primitives, patterns, and reusable components.',
                  },
                  {
                    title: 'Responsive',
                    description: 'Layouts stack first and only add columns when readable.',
                  },
                  {
                    title: 'Documented',
                    description: 'Planning state and implementation state move together.',
                  },
                ]}
              />
            </DemoFrame>

            <DemoFrame label="Two-feature centered row">
              <FeatureRow
                variant="centered"
                columns="two"
                density="compact"
                title="Comparison-ready features"
                features={[
                  {
                    title: 'Variant-aware',
                    description: 'Shows realistic differences without every Storybook state.',
                  },
                  {
                    title: 'CMS-free',
                    description: 'Uses static demo content and existing component APIs only.',
                  },
                ]}
              />
            </DemoFrame>
          </div>
        </section>

        <section className={group}>
          <div className={groupHeader}>
            <Text as="h2" variant="heading">
              Footer
            </Text>
            <Text as="p" variant="body" tone="secondary">
              Footer variants with brand statements, grouped links, legal links, and metadata.
            </Text>
          </div>

          <div className={examples}>
            <DemoFrame label="Multi-column footer">
              <Footer
                brand="UI Gallery"
                description="A reusable design-system gallery built in explicit phases."
                linkGroups={[
                  {
                    title: 'System',
                    links: [
                      { label: 'Foundations', href: '#foundations' },
                      { label: 'Components', href: '#components' },
                      { label: 'Sections', href: '#sections' },
                    ],
                  },
                  {
                    title: 'Process',
                    links: [
                      { label: 'Roadmap', href: '#roadmap' },
                      { label: 'Storybook', href: '#storybook' },
                    ],
                  },
                ]}
                legalLinks={[{ label: 'Privacy', href: '#privacy' }]}
                socialLinks={[
                  { label: 'GitHub', href: '#github', ariaLabel: 'GitHub profile' },
                ]}
                meta="(c) UI Gallery System"
              />
            </DemoFrame>

            <DemoFrame label="Centered footer">
              <Footer
                variant="centered"
                brand="Gallery System"
                description="Centered footer content for sparse closing surfaces."
                legalLinks={[{ label: 'Terms', href: '#terms' }]}
                meta="Phase 6 demo surface"
              />
            </DemoFrame>
          </div>
        </section>

        <div className={note}>
          <Text as="p" variant="body" tone="secondary">
            SectionComparison is a demo surface for comparing implemented section variants. It does
            not replace Storybook or define production route behavior.
          </Text>
        </div>
      </div>
    </DemoPageShell>
  );
}

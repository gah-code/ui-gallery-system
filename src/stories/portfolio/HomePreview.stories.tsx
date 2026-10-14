import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useRef, useState, type MouseEvent } from 'react';
import { Card } from '../../components/components/Card';
import { Grid } from '../../components/patterns/Grid';
import { Footer } from '../../components/sections/Footer';
import { Hero } from '../../components/sections/Hero';
import { Navigation } from '../../components/sections/Navigation';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { Tag } from '../../components/ui/Tag';
import { Text } from '../../components/ui/Text';
import portrait from './assets/profile-portrait.jpg';
import resume from './assets/resume.pdf?url';
import migrationImage from './assets/enterprise-cms-migration.png';
import contentfulImage from './assets/contentful-greenfield-starter.png';
import galleryImage from './assets/ui-gallery-system.png';
import * as styles from './HomePreview.css';

// Development-only props, not a shared content model or CMS fallback.
const content = {
  name: 'Gilberto Alejandro Haro',
  shortName: 'Gilberto Haro',
  profession: 'Web Content & Marketing Technologist',
  introduction: 'Building scalable interfaces and content systems for modern web experiences.',
  contact: 'Interfaces. Content. Systems.',
  linkedin: 'https://www.linkedin.com/in/gilbertoharo/',
  github: 'https://github.com/gah-code',
  navigation: ['About', 'Work', 'Projects', 'Writing', 'Tools', 'Contact'].map((label) => ({
    label,
    href: `#${label.toLowerCase()}`,
  })),
  capabilities: ['CMS Operations', 'Frontend Systems', 'QA & Accessibility', 'Workflow Automation'],
  projects: [
    {
      title: 'Enterprise CMS Migration',
      description:
        'Content migration, metadata, publishing, and quality review across an enterprise CMS transition.',
      discipline: 'Content operations',
      image: migrationImage,
      alt: 'Conceptual illustration of an enterprise CMS migration workflow, with content, metadata, and quality-review stages.',
    },
    {
      title: 'Contentful Greenfield Starter',
      description:
        'Semantic content modeling and governed CMS workflows before frontend integration.',
      discipline: 'Content architecture',
      image: contentfulImage,
      alt: 'Conceptual illustration of a semantic Contentful model and its planning, modeling, migration, and delivery workflow.',
    },
    {
      title: 'UI Gallery System',
      description:
        'Reusable interface components and a Storybook-centered design-system workspace.',
      discipline: 'Interface systems',
      image: galleryImage,
      alt: 'Conceptual illustration of reusable interface components and a Storybook-centered design-system workspace.',
    },
  ],
  experience: [
    { company: 'Hogarth/WWP at Apple', role: 'Content Manager', dates: 'April 2025\u2013April 2026' },
    { company: 'Woods Hole Oceanographic Institution', role: 'Frontend Developer', dates: 'March 2025\u2013April 2025' },
    { company: 'Robert Half International', role: 'Marketing Web Developer', dates: 'April 2023\u2013November 2024' },
    { company: 'DigitalNEST', role: 'Web Developer Specialist', dates: 'August 2022\u2013April 2023' },
  ],
  writing: ['Web Development Certifications and Learning Journey', 'State Management in React', 'About Me'],
  tools: ['Contentful', 'Adobe Experience Manager', 'WordPress', 'React', 'TypeScript', 'Storybook'],
};

function ArrowIcon() {
  return <Icon><svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></Icon>;
}

function CapabilityIcon({ index }: { index: number }) {
  const symbols = [
    <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7" /></>,
    <path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18" />,
    <><path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5Z" /><path d="m8 12 3 3 5-6" /></>,
    <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h9v6m-3-3 3 3 3-3M15 18H6v-6m-3 3 3-3 3 3" /></>,
  ];
  return <Icon size="lg"><svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{symbols[index]}</svg></Icon>;
}

function keepSectionLinkInPreview(event: MouseEvent<HTMLDivElement>) {
  const link = event.target instanceof Element
    ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
    : null;

  // Storybook defaults links to _parent; section anchors belong to this iframe.
  if (link) link.target = '_self';
}

function PortfolioHomePreview(props: typeof content) {
  const { name, shortName, profession, introduction, contact, linkedin, github, navigation, capabilities, projects, experience, writing, tools } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const brand = <span className={styles.brand}><span className={styles.monogram} aria-hidden="true">GH</span>{shortName}</span>;
  const emphasizedPhrase = 'modern web experiences.';
  const heroTitle = introduction.endsWith(emphasizedPhrase)
    ? <>{introduction.slice(0, -emphasizedPhrase.length)}<span className={styles.headlineAccent}>{emphasizedPhrase}</span></>
    : introduction;
  return (
    <div
      className={styles.page}
      id="portfolio-top"
      tabIndex={-1}
      onClickCapture={keepSectionLinkInPreview}
    >
      <a className={styles.skipLink} href="#portfolio-main">Skip to content</a>
      <header>
        <div
          className={styles.mobileHeader}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && menuOpen) {
              event.preventDefault();
              setMenuOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          <div className={styles.mobileHeaderRow}>
            <a href="#portfolio-top" className={styles.mobileBrand}>{brand}</a>
            <div className={styles.mobileActions}>
              <Button href={resume} download="gilberto-haro-resume.pdf" size="sm"
                className={styles.mobileResume} aria-label="Download resume (PDF)" title="Download resume (PDF)"
                icon={<Icon><svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4" /></svg></Icon>}
              />
              <button
                ref={menuButton}
                type="button"
                className={styles.menuButton}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                title={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <Icon><svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round">
                  <path d={menuOpen ? 'm6 6 12 12M6 18 18 6' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg></Icon>
              </button>
            </div>
          </div>
          <nav id={menuId} hidden={!menuOpen} aria-label="Mobile primary navigation" className={styles.mobileLinks}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => {
                setMenuOpen(false);
                document.getElementById(item.href.slice(1))?.focus();
              }}>{item.label}</a>
            ))}
          </nav>
        </div>
        <Navigation
          className={styles.navigation}
          brand={brand}
          brandHref="#portfolio-top"
          density="default"
          linksClassName={styles.navigationLinks}
          actionsClassName={styles.navigationActions}
          items={navigation}
          actions={
            <Button href={resume} download="gilberto-haro-resume.pdf" size="sm" className={styles.resumeButton}
              iconPosition="right" icon={<Icon size="sm"><svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4" /></svg></Icon>}
              aria-label="Download resume (PDF)">
              Resume
            </Button>
          }
        />
      </header>
      <main id="portfolio-main" tabIndex={-1}>
        <Hero
          id="about" tabIndex={-1} aria-label="About Gilberto Haro"
          className={styles.hero}
          contentClassName={styles.heroContent}
          mediaClassName={styles.heroMedia}
          variant="split"
          contentWidth="full"
          density="default"
          eyebrow={<span className={styles.eyebrow}>{name}</span>}
          title={heroTitle}
          intro={profession}
          actions={
            <>
              <Button href="#projects" className={styles.heroAction} icon={<ArrowIcon />} iconPosition="right">View projects</Button>
              <Button href="#contact" className={styles.heroAction} variant="secondary">Contact</Button>
            </>
          }
          media={<>
            <img className={styles.portrait} src={portrait} width={2000} height={2000}
              alt="A person with a backpack and two dogs overlooking mountain ridges at sunset." />
            <div className={styles.heroBadge}>
              <span className={styles.iconSurface}><CapabilityIcon index={1} /></span>
              <Text as="span" variant="label">CMS + Frontend</Text>
            </div>
          </>}
        />
        <div className={styles.sections}>
          <Grid columns="four" gap="md" className={styles.capabilities} aria-label="Capabilities">
            {capabilities.map((label, index) => (
              <Card key={label} as="div" tone="outline" className={styles.capability} bodyClassName={styles.capabilityBody} padding="md">
                <div className={styles.capabilityContent}>
                  <span className={styles.iconSurface}><CapabilityIcon index={index} /></span>
                  <Text as="p" variant="body" className={styles.capabilityLabel}>{label}</Text>
                </div>
              </Card>
            ))}
          </Grid>
          <section id="projects" tabIndex={-1} aria-labelledby="projects-heading" className={styles.section}>
            <Text as="h2" variant="subheading" id="projects-heading" className={styles.sectionTitle}>Featured projects</Text>
            <Grid columns="three" gap="lg">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className={styles.projectCard}
                  bodyClassName={styles.projectBody}
                  mediaClassName={styles.projectMedia}
                  variant="media"
                  tone="outline"
                  padding="lg"
                  media={<figure className={styles.projectFigure}>
                    <img src={project.image} alt={project.alt} className={styles.projectImage} loading="lazy" />
                    <figcaption className={styles.caption}>Conceptual illustration</figcaption>
                  </figure>}
                  title={project.title}
                  description={project.description}
                  footer={<div className={styles.projectTags}><Tag shape="default" size="sm">{project.discipline}</Tag></div>}
                />
              ))}
            </Grid>
          </section>
          <div className={styles.workAndWriting}>
            <section id="work" tabIndex={-1} aria-labelledby="work-heading" className={styles.section}>
              <Text as="h2" variant="subheading" id="work-heading" className={styles.sectionTitle}>Experience</Text>
              <ol className={styles.timeline}>
                {experience.map((item) => (
                  <li key={item.company} className={styles.timelineItem}>
                    <Text as="p" variant="caption" tone="muted" className={styles.dates}>{item.dates}</Text>
                    <div className={styles.experienceDetails}>
                      <Text as="h3" variant="body" className={styles.role}>{item.role}</Text>
                      <Text as="p" variant="body" tone="secondary">{item.company}</Text>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section id="writing" tabIndex={-1} aria-labelledby="writing-heading" className={styles.writing}>
              <Text as="h2" variant="subheading" id="writing-heading" className={styles.sectionTitle}>Writing preview</Text>
              <ul className={styles.writingList}>
                {writing.map((title) => (
                  <li key={title} className={styles.writingItem}>
                    <Text as="h3" variant="subheading" className={styles.writingTitle}>{title}</Text>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <section id="tools" tabIndex={-1} aria-labelledby="tools-heading" className={styles.section}>
            <Text as="h2" variant="subheading" id="tools-heading" className={styles.sectionTitle}>Skills &amp; tools</Text>
            <ul className={styles.tools}>
              {tools.map((tool) => <li key={tool}><Tag shape="default" variant="neutral" className={styles.tool}>{tool}</Tag></li>)}
            </ul>
          </section>
          <section id="contact" tabIndex={-1} aria-labelledby="contact-heading" className={styles.contact}>
            <div className={styles.contactCopy}>
              <Text as="h2" variant="heading" id="contact-heading" className={styles.contactTitle}>{contact}</Text>
              <Text as="p" variant="body" className={styles.contactProfession}>{profession}</Text>
            </div>
            <Button href={linkedin} target="_blank" rel="noopener noreferrer" variant="secondary" className={styles.contactButton}
              icon={<ArrowIcon />} iconPosition="right" aria-label="Connect on LinkedIn (opens in a new tab)">
              Connect on LinkedIn
            </Button>
          </section>
        </div>
      </main>
      <Footer
        className={styles.footer}
        brandClassName={styles.footerBrand}
        variant="minimal"
        density="compact"
        brand={brand}
        brandHref="#portfolio-top"
        description={profession}
        actions={<nav className={styles.footerNavigation} aria-label="Footer navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>}
        meta={name}
        socialLinks={[{ label: 'LinkedIn', href: linkedin }, { label: 'GitHub', href: github }]}
      />
    </div>
  );
}

const meta = {
  title: 'Portfolio',
  component: PortfolioHomePreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reference-guided, fixture-backed portfolio homepage. The approved outdoor portrait, sanitized public resume, and conceptual project illustrations are local assets; illustrations are not product screenshots. Existing public component props and composition-scoped tokens only. No production routes, shared schema freeze, CMS access, or phase advancement.',
      },
    },
  },
  args: content,
} satisfies Meta<typeof PortfolioHomePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePreview: Story = {};

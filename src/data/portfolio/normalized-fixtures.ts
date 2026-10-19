// Independently stored expected projections, never computed from source-fixtures or a production adapter.
// These are offline expectations, not public eligibility or preview authentication evidence.
import type { SiteChrome, ProfileView, ProfileSummary, AuthorSummary, SocialLinkView, SiteNavigationLink, SkillSummary, SkillGroupView, ToolSummary, ToolView, ProjectPreview, ProjectDetail, ArticlePreview, ArticleDetail, ExperienceSummary, ExperienceView } from '../../content/portfolio/contracts/domain';
import type { Ready, EmptyFor, PreviewDetail, ContactData, PublicEmptyMetadata, NoPublicMetadata, PreviewMetadata, RouteByKey, ReadyDataByRoute, PublicResultByRoute } from '../../content/portfolio/contracts/pages';
import { fixtureId, fixtureText, fixtureNonEmptyText, fixtureSlug, fixtureHttps, fixtureDate, fixtureInteger, fixtureNonNegativeInteger,
assetProfilePortrait, assetResumePublic, assetProjectEnterpriseCmsMigration, assetProjectContentfulGreenfieldStarter, assetProjectUiGallerySystem, assetProjectSystemDiagram, assetArticleLearningJourney, assetSiteSocialDefault } from './media';

const skillFrontendDevelopment = {
  "id": fixtureId("seed05-skill-frontend-development"),
  "name": fixtureText("Frontend Development"),
  "summary": fixtureText("Build and debug responsive web interfaces."),
  "proofSummary": fixtureText("WHOI work used HTML, CSS, and JavaScript to debug responsive behavior; UI Gallery System provides additional frontend project context.")
} as const satisfies SkillSummary;

const skillDesignSystems = {
  "id": fixtureId("seed05-skill-design-systems"),
  "name": fixtureText("Design Systems"),
  "summary": fixtureText("Organize reusable UI components and layout patterns."),
  "proofSummary": fixtureText("UI Gallery System uses Storybook to develop foundations, layout patterns, reusable components, and responsive gallery surfaces.")
} as const satisfies SkillSummary;

const skillAccessibilityWcag = {
  "id": fixtureId("seed05-skill-accessibility-wcag"),
  "name": fixtureText("Accessibility / WCAG"),
  "summary": fixtureText("Review interfaces for accessibility and usability issues."),
  "proofSummary": fixtureText("Robert Half cross-device QA included accessibility and usability issue identification before launch.")
} as const satisfies SkillSummary;

const skillContentModeling = {
  "id": fixtureId("seed05-skill-content-modeling"),
  "name": fixtureText("Content Modeling"),
  "summary": fixtureText("Define semantic content types, fields, and relationships before frontend integration."),
  "proofSummary": fixtureText("Contentful Greenfield Starter freezes a ten-type semantic model with explicit field, reference, and validation contracts.")
} as const satisfies SkillSummary;

const skillCmsOperations = {
  "id": fixtureId("seed05-skill-cms-operations"),
  "name": fixtureText("CMS Operations"),
  "summary": fixtureText("Coordinate CMS publishing, content quality, and delivery workflows."),
  "proofSummary": fixtureText("Hogarth work covered AEM content operations; DigitalNEST work covered WordPress website maintenance and publishing.")
} as const satisfies SkillSummary;

const skillContentMigration = {
  "id": fixtureId("seed05-skill-content-migration"),
  "name": fixtureText("Content Migration"),
  "summary": fixtureText("Prepare and validate structured content for CMS transitions."),
  "proofSummary": fixtureText("Robert Half work included Drupal-to-AEM content mapping, metadata validation, redirects, and migration QA.")
} as const satisfies SkillSummary;

const skillLocalization = {
  "id": fixtureId("seed05-skill-localization"),
  "name": fixtureText("Localization"),
  "summary": fixtureText("Coordinate localized content and publishing requirements."),
  "proofSummary": fixtureText("Hogarth work involved customer-facing content across global markets, localization, stakeholder requirements, and publishing standards.")
} as const satisfies SkillSummary;

const skillWebQaUat = {
  "id": fixtureId("seed05-skill-web-qa-uat"),
  "name": fixtureText("Web QA / UAT"),
  "summary": fixtureText("Test web experiences across devices and document delivery issues."),
  "proofSummary": fixtureText("Robert Half UAT covered responsive behavior, functionality, redirects, performance, accessibility, and SEO before launch.")
} as const satisfies SkillSummary;

const skillSeoMetadataGovernance = {
  "id": fixtureId("seed05-skill-seo-metadata-governance"),
  "name": fixtureText("SEO & Metadata Governance"),
  "summary": fixtureText("Review metadata, search visibility, and redirect behavior within content workflows."),
  "proofSummary": fixtureText("Robert Half migration work included metadata validation, redirect checks, and SEO QA; DigitalNEST work included SEO integration.")
} as const satisfies SkillSummary;

const skillWorkflowAutomation = {
  "id": fixtureId("seed05-skill-workflow-automation"),
  "name": fixtureText("Workflow Automation"),
  "summary": fixtureText("Reduce repetitive reporting and production steps through controlled workflows."),
  "proofSummary": fixtureText("Hogarth work used API-based reporting and LLM-assisted automation to improve workflow visibility and reduce repetitive reporting.")
} as const satisfies SkillSummary;

const skillApiIntegration = {
  "id": fixtureId("seed05-skill-api-integration"),
  "name": fixtureText("API Integration"),
  "summary": fixtureText("Connect content and reporting workflows through API data."),
  "proofSummary": fixtureText("The resume records API-based reporting at Hogarth; the Contentful project includes guarded SDK-based CMS tooling.")
} as const satisfies SkillSummary;

const skillTechnicalDocumentationGovernance = {
  "id": fixtureId("seed05-skill-technical-documentation-governance"),
  "name": fixtureText("Technical Documentation & Governance"),
  "summary": fixtureText("Maintain traceable content contracts, workflow guidance, and delivery records."),
  "proofSummary": fixtureText("Contentful Greenfield Starter documents model contracts, approval gates, and editorial guidance; the resume records requirements and delivery-status coordination.")
} as const satisfies SkillSummary;

const socialLinkLinkedin = {
  "id": fixtureId("seed05-social-link-linkedin"),
  "platform": "linkedin",
  "label": fixtureText("LinkedIn"),
  "href": fixtureHttps("https://www.linkedin.com/in/gilbertoharo/"),
  "sortOrder": fixtureNonNegativeInteger(1)
} as const satisfies SocialLinkView;

const socialLinkGithub = {
  "id": fixtureId("seed05-social-link-github"),
  "platform": "github",
  "label": fixtureText("GitHub"),
  "href": fixtureHttps("https://github.com/gah-code"),
  "sortOrder": fixtureNonNegativeInteger(2)
} as const satisfies SocialLinkView;

const navigationItemAbout = {
  "id": fixtureId("seed05-navigation-item-about"),
  "label": fixtureText("About"),
  "description": fixtureText("Professional story, positioning, and working approach."),
  "routeKey": "about",
  "href": "/about"
} as const satisfies SiteNavigationLink;

const navigationItemWork = {
  "id": fixtureId("seed05-navigation-item-work"),
  "label": fixtureText("Work"),
  "description": fixtureText("Professional experience and delivery context."),
  "routeKey": "work",
  "href": "/work"
} as const satisfies SiteNavigationLink;

const navigationItemProjects = {
  "id": fixtureId("seed05-navigation-item-projects"),
  "label": fixtureText("Projects"),
  "description": fixtureText("Selected case studies and technical projects."),
  "routeKey": "projects",
  "href": "/projects"
} as const satisfies SiteNavigationLink;

const navigationItemWriting = {
  "id": fixtureId("seed05-navigation-item-writing"),
  "label": fixtureText("Writing"),
  "description": fixtureText("Articles on frontend engineering, content systems, and professional learning."),
  "routeKey": "writing",
  "href": "/writing"
} as const satisfies SiteNavigationLink;

const navigationItemTools = {
  "id": fixtureId("seed05-navigation-item-tools"),
  "label": fixtureText("Tools"),
  "description": fixtureText("Platforms, frameworks, and tools used in practical work."),
  "routeKey": "tools",
  "href": "/tools"
} as const satisfies SiteNavigationLink;

const navigationItemContact = {
  "id": fixtureId("seed05-navigation-item-contact"),
  "label": fixtureText("Contact"),
  "description": fixtureText("Professional contact and collaboration information."),
  "routeKey": "contact",
  "href": "/contact"
} as const satisfies SiteNavigationLink;

export const siteChrome = {
  "id": fixtureId("seed05-site-settings-primary"),
  "siteName": fixtureText("Gilberto Haro"),
  "siteDescription": fixtureText("Web engineer focused on resilient interfaces, structured content systems, CMS operations, and thoughtful digital experiences."),
  "primaryNavigation": [navigationItemAbout, navigationItemWork, navigationItemProjects, navigationItemWriting, navigationItemTools, navigationItemContact],
  "footerNavigation": [navigationItemAbout, navigationItemProjects, navigationItemWriting, navigationItemContact],
  "socialLinks": [socialLinkLinkedin, socialLinkGithub]
} as const satisfies SiteChrome;

export const profile = {
  "id": fixtureId("seed05-person-profile-gilberto-haro"),
  "name": fixtureText("Gilberto Alejandro Haro"),
  "primaryTitle": fixtureText("Web Content & Marketing Technologist"),
  "positioningStatement": fixtureText("Building scalable interfaces and content systems for modern web experiences."),
  "shortBio": fixtureText("Web content and marketing technologist with experience across enterprise website operations, CMS/DXP publishing, frontend implementation, content migration, metadata governance, localization, QA, and workflow optimization."),
  "location": fixtureText("San Jose, California"),
  "availabilityStatus": fixtureText("Open to relevant web, content systems, CMS operations, and frontend opportunities."),
  "workPreference": fixtureText("Open to remote and hybrid opportunities in frontend engineering, CMS/content systems, and web operations."),
  "contactIntro": fixtureText("Interested in web platforms, content systems, or bringing more structure to a marketing site? I'm open to relevant roles and collaborations."),
  "longBio": {
    "policy": "profile-long",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Gilberto's path into web technology grew from creative media and photography into frontend development, CMS operations, and content systems. Work with digital tools led to structured web-development study and professional roles in website delivery.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "His experience spans enterprise website operations, CMS publishing, frontend implementation, content migration, metadata governance, localization, content QA, and workflow optimization. His work includes Adobe Experience Manager and WordPress operations, alongside Contentful modeling and governance in the Greenfield Starter project.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "His project work connects semantic content contracts with reusable interfaces: the Contentful Greenfield Starter establishes a governed CMS model, while UI Gallery System develops a Storybook-centered UI workspace before CMS integration.",
        "marks": []
      }]
    }]
  },
  "profileImage": assetProfilePortrait,
  "resume": assetResumePublic,
  "learningHighlights": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Current public materials describe an ongoing learning path across frontend engineering, content systems, component architecture, design systems, Contentful, AEM, AI-assisted workflows, and technical publishing.",
        "marks": []
      }]
    }]
  },
  "socialLinks": [socialLinkLinkedin, socialLinkGithub]
} as const satisfies ProfileView;

export const profileSummary = {
  "id": fixtureId("seed05-person-profile-gilberto-haro"),
  "name": fixtureText("Gilberto Alejandro Haro"),
  "primaryTitle": fixtureText("Web Content & Marketing Technologist"),
  "positioningStatement": fixtureText("Building scalable interfaces and content systems for modern web experiences."),
  "shortBio": fixtureText("Web content and marketing technologist with experience across enterprise website operations, CMS/DXP publishing, frontend implementation, content migration, metadata governance, localization, QA, and workflow optimization."),
  "location": fixtureText("San Jose, California"),
  "profileImage": assetProfilePortrait
} as const satisfies ProfileSummary;

export const authorSummary = {
  "id": fixtureId("seed05-person-profile-gilberto-haro"),
  "name": fixtureText("Gilberto Alejandro Haro"),
  "primaryTitle": fixtureText("Web Content & Marketing Technologist"),
  "profileImage": assetProfilePortrait
} as const satisfies AuthorSummary;

export const contact = {
  "intro": fixtureText("Interested in web platforms, content systems, or bringing more structure to a marketing site? I'm open to relevant roles and collaborations."),
  "channels": [{
    "kind": "social",
    "platform": "linkedin",
    "label": socialLinkLinkedin.label,
    "href": socialLinkLinkedin.href
  }, {
    "kind": "social",
    "platform": "github",
    "label": socialLinkGithub.label,
    "href": socialLinkGithub.href
  }],
  "resume": assetResumePublic,
  "availability": fixtureText("Open to relevant web, content systems, CMS operations, and frontend opportunities."),
  "workPreference": fixtureText("Open to remote and hybrid opportunities in frontend engineering, CMS/content systems, and web operations."),
  "location": fixtureText("San Jose, California")
} as const satisfies ContactData;

const toolContentfulSummary = {
  "id": fixtureId("seed05-tool-contentful"),
  "name": fixtureText("Contentful"),
  "usageContext": fixtureText("Used for semantic content modeling, migration-driven schema governance, and editorial workflows in the Contentful Greenfield Starter."),
  "category": "cms-platform"
} as const satisfies ToolSummary;

const toolAdobeExperienceManagerSummary = {
  "id": fixtureId("seed05-tool-adobe-experience-manager"),
  "name": fixtureText("Adobe Experience Manager"),
  "usageContext": fixtureText("Used for enterprise CMS publishing, metadata and localization operations, and Drupal-to-AEM migration work."),
  "category": "cms-platform"
} as const satisfies ToolSummary;

const toolWordpressSummary = {
  "id": fixtureId("seed05-tool-wordpress"),
  "name": fixtureText("WordPress"),
  "usageContext": fixtureText("Used to develop, maintain, update, and debug websites and support CMS publishing and SEO integration at DigitalNEST."),
  "category": "cms-platform"
} as const satisfies ToolSummary;

const toolReactSummary = {
  "id": fixtureId("seed05-tool-react"),
  "name": fixtureText("React"),
  "usageContext": fixtureText("Used in the UI Gallery System frontend workspace alongside TypeScript and Storybook."),
  "category": "frontend-framework"
} as const satisfies ToolSummary;

const toolTypescriptSummary = {
  "id": fixtureId("seed05-tool-typescript"),
  "name": fixtureText("TypeScript"),
  "usageContext": fixtureText("Used alongside React and Storybook in UI Gallery System's frontend component work."),
  "category": "language-runtime"
} as const satisfies ToolSummary;

const toolStorybookSummary = {
  "id": fixtureId("seed05-tool-storybook"),
  "name": fixtureText("Storybook"),
  "usageContext": fixtureText("Used as UI Gallery System's primary workspace for reusable components, layout patterns, and responsive review before CMS integration."),
  "category": "design-qa"
} as const satisfies ToolSummary;

const skillGroupFrontendUiEngineering = {
  "id": fixtureId("seed05-skill-group-frontend-ui-engineering"),
  "name": fixtureText("Frontend & UI Engineering"),
  "skills": [skillFrontendDevelopment, skillDesignSystems, skillAccessibilityWcag]
} as const satisfies SkillGroupView;

const skillGroupContentCmsOperations = {
  "id": fixtureId("seed05-skill-group-content-cms-operations"),
  "name": fixtureText("Content & CMS Operations"),
  "skills": [skillContentModeling, skillCmsOperations, skillContentMigration, skillLocalization]
} as const satisfies SkillGroupView;

const skillGroupQualityDiscoverability = {
  "id": fixtureId("seed05-skill-group-quality-discoverability"),
  "name": fixtureText("Quality & Discoverability"),
  "skills": [skillWebQaUat, skillSeoMetadataGovernance]
} as const satisfies SkillGroupView;

const skillGroupAutomationDelivery = {
  "id": fixtureId("seed05-skill-group-automation-delivery"),
  "name": fixtureText("Automation & Delivery"),
  "skills": [skillWorkflowAutomation, skillApiIntegration, skillTechnicalDocumentationGovernance]
} as const satisfies SkillGroupView;

const projectEnterpriseCmsMigrationPreview = {
  "id": fixtureId("seed05-project-enterprise-cms-migration"),
  "slug": fixtureSlug("enterprise-cms-migration"),
  "href": `/projects/${fixtureSlug("enterprise-cms-migration")}`,
  "title": fixtureText("Multi-Country Drupal to Adobe Experience Manager Migration"),
  "summary": fixtureText("Supported a multi-country Drupal-to-AEM migration involving 30,000+ content items through content mapping, metadata validation, redirects, publishing standards, QA, and workflow improvements."),
  "role": fixtureText("Marketing Web Developer supporting content migration and web production at Robert Half International."),
  "outcome": fixtureText("Improved web production throughput through semi-automated tracking, standardized handoffs, and clearer task visibility, helping advance the content migration timeline by six months."),
  "projectType": "migration-replatforming",
  "heroImage": assetProjectEnterpriseCmsMigration,
  "tags": [],
  "skills": [skillCmsOperations, skillContentMigration, skillWebQaUat, skillSeoMetadataGovernance, skillAccessibilityWcag, skillLocalization, skillTechnicalDocumentationGovernance],
  "tools": [toolAdobeExperienceManagerSummary]
} as const satisfies ProjectPreview;

const projectContentfulGreenfieldStarterPreview = {
  "id": fixtureId("seed05-project-contentful-greenfield-starter"),
  "slug": fixtureSlug("contentful-greenfield-starter"),
  "href": `/projects/${fixtureSlug("contentful-greenfield-starter")}`,
  "title": fixtureText("Contentful Greenfield Starter"),
  "summary": fixtureText("A production-minded Contentful architecture project centered on semantic modeling, migration-driven schema governance, safe environment workflows, editorial QA, deterministic recovery, and CMS-agnostic frontend boundaries."),
  "role": fixtureText("Semantic content modeling, migration governance, and CMS workflow documentation."),
  "outcome": fixtureText("The semantic model was frozen as v1.0.0 after Phase 04 with zero material model drift. Exhaustive live editorial QA was not completed and remains documented debt."),
  "projectType": "cms-architecture",
  "heroImage": assetProjectContentfulGreenfieldStarter,
  "tags": [],
  "skills": [skillContentModeling, skillCmsOperations, skillContentMigration, skillWorkflowAutomation, skillApiIntegration, skillTechnicalDocumentationGovernance],
  "tools": [toolContentfulSummary]
} as const satisfies ProjectPreview;

const projectUiGallerySystemPreview = {
  "id": fixtureId("seed05-project-ui-gallery-system"),
  "slug": fixtureSlug("ui-gallery-system"),
  "href": `/projects/${fixtureSlug("ui-gallery-system")}`,
  "title": fixtureText("UI Gallery System"),
  "summary": fixtureText("A UI-first, Storybook-centered frontend design-system project built through foundations, layout patterns, reusable components, sections, responsive refinement, and gallery/demo surfaces before CMS integration."),
  "role": fixtureText("Frontend component and design-system development in a Storybook-centered workspace."),
  "outcome": fixtureText("A UI-first component and gallery workspace provides a foundation for later CMS integration."),
  "projectType": "case-study",
  "heroImage": assetProjectUiGallerySystem,
  "tags": [],
  "skills": [skillFrontendDevelopment, skillDesignSystems, skillAccessibilityWcag, skillWebQaUat, skillTechnicalDocumentationGovernance],
  "tools": [toolReactSummary, toolTypescriptSummary, toolStorybookSummary]
} as const satisfies ProjectPreview;

const articleWebDevelopmentCertificationsLearningJourneyPreview = {
  "id": fixtureId("seed05-article-web-development-certifications-learning-journey"),
  "slug": fixtureSlug("web-development-certifications-learning-journey"),
  "href": `/writing/${fixtureSlug("web-development-certifications-learning-journey")}`,
  "title": fixtureText("Web Development Certifications and Learning Journey"),
  "excerpt": fixtureText("A practical look at 700+ hours of web development learning, certifications, and coursework across frontend, UX, JavaScript ecosystems, and modern web development."),
  "publishDate": fixtureDate("2026-09-22"),
  "tags": [],
  "author": authorSummary,
  "heroImage": assetArticleLearningJourney
} as const satisfies ArticlePreview;

const articleStateManagementInReactPreview = {
  "id": fixtureId("seed05-article-state-management-in-react"),
  "slug": fixtureSlug("state-management-in-react"),
  "href": `/writing/${fixtureSlug("state-management-in-react")}`,
  "title": fixtureText("State Management in React"),
  "excerpt": fixtureText("A deep dive into React state management, including local and shared state, synchronization, and deciding where state should live."),
  "publishDate": fixtureDate("2026-09-22"),
  "tags": [],
  "author": authorSummary
} as const satisfies ArticlePreview;

const articleAboutMePreview = {
  "id": fixtureId("seed05-article-about-me"),
  "slug": fixtureSlug("about-me"),
  "href": `/writing/${fixtureSlug("about-me")}`,
  "title": fixtureText("About Me"),
  "excerpt": fixtureText("A personal story about the path from creative media and photography into frontend web development, content systems, UI engineering, and modern web technology."),
  "publishDate": fixtureDate("2026-09-22"),
  "tags": [],
  "author": authorSummary
} as const satisfies ArticlePreview;

const experienceHogarthWwpAppleContentManagerSummary = {
  "id": fixtureId("seed05-experience-hogarth-wwp-apple-content-manager"),
  "company": fixtureText("Hogarth/WWP at Apple"),
  "role": fixtureText("Content Manager"),
  "summary": fixtureText("Managed enterprise AEM/CMS content operations supporting major product initiatives, including publishing, DAM coordination, metadata, localization, content QA, launch readiness, stakeholder coordination, and workflow automation."),
  "start": {
    "year": fixtureInteger(2025),
    "month": 4,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2026),
    "month": 4,
    "precision": "month"
  },
  "currentRole": false
} as const satisfies ExperienceSummary;

const experienceWhoiFrontendDeveloperSummary = {
  "id": fixtureId("seed05-experience-whoi-frontend-developer"),
  "company": fixtureText("Woods Hole Oceanographic Institution"),
  "role": fixtureText("Frontend Developer"),
  "summary": fixtureText("Debugged responsive frontend behavior using HTML, CSS, JavaScript, browser developer tools, and web-quality practices to improve usability, consistency, and performance."),
  "start": {
    "year": fixtureInteger(2025),
    "month": 3,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2025),
    "month": 4,
    "precision": "month"
  },
  "currentRole": false
} as const satisfies ExperienceSummary;

const experienceRobertHalfMarketingWebDeveloperSummary = {
  "id": fixtureId("seed05-experience-robert-half-marketing-web-developer"),
  "company": fixtureText("Robert Half International"),
  "role": fixtureText("Marketing Web Developer"),
  "summary": fixtureText("Supported a large-scale multi-country Drupal-to-AEM migration with content mapping, metadata validation, redirects, publishing standards, accessibility/SEO QA, cross-device UAT, and workflow improvements."),
  "start": {
    "year": fixtureInteger(2023),
    "month": 4,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2024),
    "month": 11,
    "precision": "month"
  },
  "currentRole": false
} as const satisfies ExperienceSummary;

const experienceDigitalnestWebDevelopmentSpecialistSummary = {
  "id": fixtureId("seed05-experience-digitalnest-web-development-specialist"),
  "company": fixtureText("DigitalNEST"),
  "role": fixtureText("Web Developer Specialist"),
  "summary": fixtureText("Developed, maintained, updated, and debugged WordPress websites while supporting website operations, CMS publishing, SEO integration, frontend quality, and collaborative project delivery."),
  "start": {
    "year": fixtureInteger(2022),
    "month": 8,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2023),
    "month": 4,
    "precision": "month"
  },
  "currentRole": false
} as const satisfies ExperienceSummary;

const projectEnterpriseCmsMigration = {
  "id": fixtureId("seed05-project-enterprise-cms-migration"),
  "slug": fixtureSlug("enterprise-cms-migration"),
  "href": `/projects/${fixtureSlug("enterprise-cms-migration")}`,
  "title": fixtureText("Multi-Country Drupal to Adobe Experience Manager Migration"),
  "summary": fixtureText("Supported a multi-country Drupal-to-AEM migration involving 30,000+ content items through content mapping, metadata validation, redirects, publishing standards, QA, and workflow improvements."),
  "role": fixtureText("Marketing Web Developer supporting content migration and web production at Robert Half International."),
  "outcome": fixtureText("Improved web production throughput through semi-automated tracking, standardized handoffs, and clearer task visibility, helping advance the content migration timeline by six months."),
  "projectType": "migration-replatforming",
  "heroImage": assetProjectEnterpriseCmsMigration,
  "tags": [],
  "skills": [skillCmsOperations, skillContentMigration, skillWebQaUat, skillSeoMetadataGovernance, skillAccessibilityWcag, skillLocalization, skillTechnicalDocumentationGovernance],
  "tools": [toolAdobeExperienceManagerSummary],
  "problem": fixtureText("Prepare and validate website content for a multi-country transition from Drupal to Adobe Experience Manager."),
  "approach": fixtureText("Supported content mapping, metadata validation, redirects, publishing standards, and migration QA. Performed cross-device UAT and reviewed accessibility, SEO, responsive behavior, and launch readiness."),
  "caseStudyBody": {
    "policy": "body",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "The migration work combined structured content preparation with website production and review. Contributions included content audits, component-based authoring, migration validation, testing, and launch-readiness activities.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Cross-device UAT identified usability, accessibility, SEO, redirect, functional, responsive, and performance issues before launch. Issue tracking and standardized handoffs supported coordination across the work.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "The work connected content quality checks with production coordination, using clearer task visibility and handoffs to support migration delivery.",
        "marks": []
      }]
    }]
  },
  "galleryImages": [assetProjectSystemDiagram],
  "seo": {

  },
  "relatedProjects": [],
  "relatedArticles": []
} as const satisfies ProjectDetail;

const projectContentfulGreenfieldStarter = {
  "id": fixtureId("seed05-project-contentful-greenfield-starter"),
  "slug": fixtureSlug("contentful-greenfield-starter"),
  "href": `/projects/${fixtureSlug("contentful-greenfield-starter")}`,
  "title": fixtureText("Contentful Greenfield Starter"),
  "summary": fixtureText("A production-minded Contentful architecture project centered on semantic modeling, migration-driven schema governance, safe environment workflows, editorial QA, deterministic recovery, and CMS-agnostic frontend boundaries."),
  "role": fixtureText("Semantic content modeling, migration governance, and CMS workflow documentation."),
  "outcome": fixtureText("The semantic model was frozen as v1.0.0 after Phase 04 with zero material model drift. Exhaustive live editorial QA was not completed and remains documented debt."),
  "projectType": "cms-architecture",
  "heroImage": assetProjectContentfulGreenfieldStarter,
  "tags": [],
  "skills": [skillContentModeling, skillCmsOperations, skillContentMigration, skillWorkflowAutomation, skillApiIntegration, skillTechnicalDocumentationGovernance],
  "tools": [toolContentfulSummary],
  "problem": fixtureText("Establish a structured, governed Contentful model for a personal website before frontend integration."),
  "approach": fixtureText("Define content and route contracts, implement a version-controlled model migration, verify recovery, and document editorial QA and phase approval gates."),
  "caseStudyBody": {
    "policy": "body",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "The project demonstrates an enterprise-style operating model for a personal Contentful implementation: requirements and route contracts first, semantic content modeling, version-controlled migration, model portability, clean-room recovery, editorial QA, and evidence-based phase gates.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "The current model has been frozen as v1.0.0 after Phase 04.",
        "marks": []
      }]
    }]
  },
  "galleryImages": [],
  "seo": {

  },
  "relatedProjects": [],
  "relatedArticles": []
} as const satisfies ProjectDetail;

const projectUiGallerySystem = {
  "id": fixtureId("seed05-project-ui-gallery-system"),
  "slug": fixtureSlug("ui-gallery-system"),
  "href": `/projects/${fixtureSlug("ui-gallery-system")}`,
  "title": fixtureText("UI Gallery System"),
  "summary": fixtureText("A UI-first, Storybook-centered frontend design-system project built through foundations, layout patterns, reusable components, sections, responsive refinement, and gallery/demo surfaces before CMS integration."),
  "role": fixtureText("Frontend component and design-system development in a Storybook-centered workspace."),
  "outcome": fixtureText("A UI-first component and gallery workspace provides a foundation for later CMS integration."),
  "projectType": "case-study",
  "heroImage": assetProjectUiGallerySystem,
  "tags": [],
  "skills": [skillFrontendDevelopment, skillDesignSystems, skillAccessibilityWcag, skillWebQaUat, skillTechnicalDocumentationGovernance],
  "tools": [toolReactSummary, toolTypescriptSummary, toolStorybookSummary],
  "problem": fixtureText("Stabilize reusable UI components and interface contracts before Contentful integration."),
  "approach": fixtureText("Use Storybook as the UI workspace for foundations, layout patterns, reusable components, responsive refinement, and static data-shape planning."),
  "caseStudyBody": {
    "policy": "body",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "The project intentionally stabilizes UI contracts before Contentful integration. Storybook acts as the primary design-system workspace, while the implementation grows through primitives, patterns, components, sections, responsive QA, and static data-shape planning.",
        "marks": []
      }]
    }]
  },
  "galleryImages": [],
  "seo": {

  },
  "relatedProjects": [],
  "relatedArticles": []
} as const satisfies ProjectDetail;

const articleWebDevelopmentCertificationsLearningJourney = {
  "id": fixtureId("seed05-article-web-development-certifications-learning-journey"),
  "slug": fixtureSlug("web-development-certifications-learning-journey"),
  "href": `/writing/${fixtureSlug("web-development-certifications-learning-journey")}`,
  "title": fixtureText("Web Development Certifications and Learning Journey"),
  "excerpt": fixtureText("A practical look at 700+ hours of web development learning, certifications, and coursework across frontend, UX, JavaScript ecosystems, and modern web development."),
  "publishDate": fixtureDate("2026-09-22"),
  "tags": [],
  "author": authorSummary,
  "heroImage": assetArticleLearningJourney,
  "body": {
    "policy": "body",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "My web-development learning path has been a mix of structured coursework, certifications, hands-on projects, and professional application. Over time, I have invested more than 700 hours studying the fundamentals and building practical experience across HTML, CSS, JavaScript, React, responsive design, UX, Node.js, MongoDB, Gatsby, Next.js, and related web technologies.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "I started by learning how the web works at a foundational level: how browsers interpret documents, how layouts respond across devices, and how JavaScript adds behavior to interfaces. From there, I moved into deeper frontend work with React, state management, component architecture, routing, reusable UI patterns, and increasingly structured approaches to design systems.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Professional work changed how I approached learning. CMS migrations, publishing workflows, accessibility review, localization, metadata governance, QA, and enterprise content operations made the relationship between frontend engineering and content systems much clearer. I began thinking less about individual pages and more about systems: reusable components, semantic content models, governance, predictable workflows, and long-term maintainability.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "More recently, that learning has expanded into Contentful, structured content architecture, AI-assisted workflows, and the operational side of modern websites. The goal is no longer simply to collect technologies or complete courses. I want each area of study to strengthen how I solve real web problems: building interfaces that are easier to maintain, content systems that are easier to operate, and workflows that are easier for teams to understand.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "I continue to treat learning as an active part of the work. Courses provide structure, projects provide experimentation, and professional experience provides the constraints that turn technical knowledge into practical judgment.",
        "marks": []
      }]
    }]
  },
  "seo": {
    "socialImage": assetSiteSocialDefault
  },
  "relatedProjects": [],
  "relatedArticles": [],
  "skills": [skillFrontendDevelopment, skillTechnicalDocumentationGovernance],
  "tools": [toolReactSummary, toolTypescriptSummary]
} as const satisfies ArticleDetail;

const articleStateManagementInReact = {
  "id": fixtureId("seed05-article-state-management-in-react"),
  "slug": fixtureSlug("state-management-in-react"),
  "href": `/writing/${fixtureSlug("state-management-in-react")}`,
  "title": fixtureText("State Management in React"),
  "excerpt": fixtureText("A deep dive into React state management, including local and shared state, synchronization, and deciding where state should live."),
  "publishDate": fixtureDate("2026-09-22"),
  "tags": [],
  "author": authorSummary,
  "body": {
    "policy": "body",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "State management in React starts with a simple question: ",
        "marks": []
      }, {
        "kind": "text",
        "text": "where should this value live?",
        "marks": ["bold"]
      }, {
        "kind": "text",
        "text": " Not every piece of state needs a global store, and not every value belongs inside the component that first uses it.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Local state is usually the right choice when a value belongs to one component or a small part of the interface. Examples include whether a menu is open, the current value of a form field, or which tab is selected. Keeping that state close to the component makes the relationship between the data and the UI easier to understand.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Shared state becomes necessary when multiple components need the same information or when updates in one part of the interface must affect another. In those cases, lifting state into a common parent, using React Context, or introducing a dedicated state-management pattern can make the data flow more predictable.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "The important part is not choosing the most powerful tool. It is choosing the smallest approach that still makes ownership clear. State that is pushed too high can create unnecessary coupling. State that is kept too low can lead to duplication and synchronization problems.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "I think about React state in terms of ownership, lifetime, and consumers. Who owns this value? How long should it exist? Which components need it? Does it come from user interaction, application data, or a server request? Answering those questions usually points toward the appropriate location.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Good state management is less about a specific library and more about maintaining a clear mental model. When data ownership is explicit, components become easier to reason about, test, reuse, and change.",
        "marks": []
      }]
    }]
  },
  "seo": {
    "socialImage": assetSiteSocialDefault
  },
  "relatedProjects": [],
  "relatedArticles": [],
  "skills": [skillFrontendDevelopment],
  "tools": [toolReactSummary]
} as const satisfies ArticleDetail;

const articleAboutMe = {
  "id": fixtureId("seed05-article-about-me"),
  "slug": fixtureSlug("about-me"),
  "href": `/writing/${fixtureSlug("about-me")}`,
  "title": fixtureText("About Me"),
  "excerpt": fixtureText("A personal story about the path from creative media and photography into frontend web development, content systems, UI engineering, and modern web technology."),
  "publishDate": fixtureDate("2026-09-22"),
  "tags": [],
  "author": authorSummary,
  "body": {
    "policy": "body",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "My path into web development began through creative work. Before working professionally with websites and content systems, I spent years around photography, design, editing tools, and digital media. That experience taught me to pay attention to presentation, composition, detail, and the way people interact with visual information.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Working with digital tools gradually made me more curious about the systems behind them. I began studying web development and learning how browsers, HTML, CSS, JavaScript, and responsive layouts work together. Courses and personal projects eventually grew into professional opportunities where I could apply that knowledge to real websites.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "My early professional work involved WordPress development and website maintenance. From there, I moved into larger CMS and web-operations environments, including enterprise content migration, Adobe Experience Manager, localization, metadata, QA, publishing workflows, and frontend implementation.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Over time, I found that my strongest interests sit at the intersection of engineering and content operations. I enjoy building interfaces, but I also care about how content is modeled, governed, migrated, reviewed, and delivered. That is what led me toward Contentful, structured content architecture, design systems, and the broader idea of content systems rather than isolated web pages.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Today, I think of my work as connecting three areas: frontend engineering, CMS/content systems, and operational quality. I want to build web experiences that are maintainable for developers, understandable for content teams, and reliable for the people using them.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "That combination of creativity, technical problem-solving, and structured content work continues to shape the kind of projects and roles I pursue.",
        "marks": []
      }]
    }]
  },
  "seo": {
    "socialImage": assetSiteSocialDefault
  },
  "relatedProjects": [],
  "relatedArticles": [],
  "skills": [skillFrontendDevelopment, skillCmsOperations, skillDesignSystems],
  "tools": [toolWordpressSummary, toolReactSummary]
} as const satisfies ArticleDetail;

const experienceHogarthWwpAppleContentManager = {
  "id": fixtureId("seed05-experience-hogarth-wwp-apple-content-manager"),
  "company": fixtureText("Hogarth/WWP at Apple"),
  "role": fixtureText("Content Manager"),
  "summary": fixtureText("Managed enterprise AEM/CMS content operations supporting major product initiatives, including publishing, DAM coordination, metadata, localization, content QA, launch readiness, stakeholder coordination, and workflow automation."),
  "start": {
    "year": fixtureInteger(2025),
    "month": 4,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2026),
    "month": 4,
    "precision": "month"
  },
  "currentRole": false,
  "location": fixtureText("Sunnyvale, California"),
  "responsibilities": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Managed enterprise AEM/CMS publishing, DAM coordination, metadata, localization, content QA, and launch readiness. Coordinated stakeholder requirements, production dependencies, and delivery status.",
        "marks": []
      }]
    }]
  },
  "achievements": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Improved workflow visibility through API-based reporting and LLM-assisted automation, reducing repetitive reporting work.",
        "marks": []
      }]
    }]
  },
  "skills": [skillCmsOperations, skillLocalization, skillWebQaUat, skillWorkflowAutomation, skillTechnicalDocumentationGovernance],
  "tools": [toolAdobeExperienceManagerSummary],
  "relatedArticles": [],
  "relatedProjects": []
} as const satisfies ExperienceView;

const experienceWhoiFrontendDeveloper = {
  "id": fixtureId("seed05-experience-whoi-frontend-developer"),
  "company": fixtureText("Woods Hole Oceanographic Institution"),
  "role": fixtureText("Frontend Developer"),
  "summary": fixtureText("Debugged responsive frontend behavior using HTML, CSS, JavaScript, browser developer tools, and web-quality practices to improve usability, consistency, and performance."),
  "start": {
    "year": fixtureInteger(2025),
    "month": 3,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2025),
    "month": 4,
    "precision": "month"
  },
  "currentRole": false,
  "location": fixtureText("San Jose, CA"),
  "responsibilities": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Debugged responsive frontend behavior with HTML, CSS, JavaScript, and browser development tools, with usability, visual consistency, and page performance as review goals.",
        "marks": []
      }]
    }]
  },
  "achievements": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Resolved frontend and responsive issues across existing pages, improving visual consistency and usability through browser-based debugging and targeted HTML, CSS, and JavaScript fixes.",
        "marks": []
      }]
    }]
  },
  "skills": [skillFrontendDevelopment, skillWebQaUat, skillAccessibilityWcag],
  "tools": [],
  "relatedArticles": [],
  "relatedProjects": []
} as const satisfies ExperienceView;

const experienceRobertHalfMarketingWebDeveloper = {
  "id": fixtureId("seed05-experience-robert-half-marketing-web-developer"),
  "company": fixtureText("Robert Half International"),
  "role": fixtureText("Marketing Web Developer"),
  "summary": fixtureText("Supported a large-scale multi-country Drupal-to-AEM migration with content mapping, metadata validation, redirects, publishing standards, accessibility/SEO QA, cross-device UAT, and workflow improvements."),
  "start": {
    "year": fixtureInteger(2023),
    "month": 4,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2024),
    "month": 11,
    "precision": "month"
  },
  "currentRole": false,
  "location": fixtureText("San Jose, California"),
  "responsibilities": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Supported multi-country Drupal-to-AEM content migration, content audits, metadata validation, redirects, publishing standards, and component-based authoring.",
        "marks": []
      }]
    }, {
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Performed cross-device UAT and QA, identifying usability, accessibility, SEO, redirect, functional, responsive, and performance issues before launch.",
        "marks": []
      }]
    }]
  },
  "achievements": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Improved web production throughput through semi-automated tracking, standardized handoffs, and clearer task visibility.",
        "marks": []
      }]
    }]
  },
  "skills": [skillCmsOperations, skillContentMigration, skillWebQaUat, skillAccessibilityWcag, skillSeoMetadataGovernance, skillLocalization, skillTechnicalDocumentationGovernance],
  "tools": [toolAdobeExperienceManagerSummary],
  "relatedArticles": [],
  "relatedProjects": []
} as const satisfies ExperienceView;

const experienceDigitalnestWebDevelopmentSpecialist = {
  "id": fixtureId("seed05-experience-digitalnest-web-development-specialist"),
  "company": fixtureText("DigitalNEST"),
  "role": fixtureText("Web Developer Specialist"),
  "summary": fixtureText("Developed, maintained, updated, and debugged WordPress websites while supporting website operations, CMS publishing, SEO integration, frontend quality, and collaborative project delivery."),
  "start": {
    "year": fixtureInteger(2022),
    "month": 8,
    "precision": "month"
  },
  "end": {
    "year": fixtureInteger(2023),
    "month": 4,
    "precision": "month"
  },
  "currentRole": false,
  "location": fixtureText("Gilroy, California"),
  "responsibilities": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Developed, maintained, updated, and debugged WordPress websites, supporting website operations, CMS publishing, SEO integration, and frontend quality.",
        "marks": []
      }]
    }]
  },
  "achievements": {
    "policy": "simple",
    "blocks": [{
      "kind": "paragraph",
      "children": [{
        "kind": "text",
        "text": "Delivered and maintained WordPress website updates across client and internal projects, resolving frontend issues while supporting publishing, SEO, and day-to-day site quality.",
        "marks": []
      }]
    }]
  },
  "skills": [skillFrontendDevelopment, skillCmsOperations, skillWebQaUat, skillSeoMetadataGovernance],
  "tools": [toolWordpressSummary],
  "relatedArticles": [],
  "relatedProjects": []
} as const satisfies ExperienceView;

const toolAdobeExperienceManager = {
  "id": fixtureId("seed05-tool-adobe-experience-manager"),
  "name": fixtureText("Adobe Experience Manager"),
  "usageContext": fixtureText("Used for enterprise CMS publishing, metadata and localization operations, and Drupal-to-AEM migration work."),
  "category": "cms-platform",
  "skills": [skillCmsOperations, skillContentMigration, skillLocalization, skillWebQaUat, skillSeoMetadataGovernance],
  "proof": {
    "projects": [projectEnterpriseCmsMigrationPreview],
    "experience": [experienceHogarthWwpAppleContentManagerSummary, experienceRobertHalfMarketingWebDeveloperSummary],
    "articles": []
  }
} as const satisfies ToolView;

const toolContentful = {
  "id": fixtureId("seed05-tool-contentful"),
  "name": fixtureText("Contentful"),
  "usageContext": fixtureText("Used for semantic content modeling, migration-driven schema governance, and editorial workflows in the Contentful Greenfield Starter."),
  "category": "cms-platform",
  "skills": [skillContentModeling, skillCmsOperations, skillContentMigration, skillWorkflowAutomation],
  "proof": {
    "projects": [projectContentfulGreenfieldStarterPreview],
    "experience": [],
    "articles": []
  }
} as const satisfies ToolView;

const toolWordpress = {
  "id": fixtureId("seed05-tool-wordpress"),
  "name": fixtureText("WordPress"),
  "usageContext": fixtureText("Used to develop, maintain, update, and debug websites and support CMS publishing and SEO integration at DigitalNEST."),
  "category": "cms-platform",
  "skills": [skillCmsOperations, skillFrontendDevelopment, skillSeoMetadataGovernance],
  "proof": {
    "projects": [],
    "experience": [experienceDigitalnestWebDevelopmentSpecialistSummary],
    "articles": [articleAboutMePreview]
  }
} as const satisfies ToolView;

const toolReact = {
  "id": fixtureId("seed05-tool-react"),
  "name": fixtureText("React"),
  "usageContext": fixtureText("Used in the UI Gallery System frontend workspace alongside TypeScript and Storybook."),
  "category": "frontend-framework",
  "skills": [skillFrontendDevelopment, skillDesignSystems],
  "proof": {
    "projects": [projectUiGallerySystemPreview],
    "experience": [],
    "articles": [articleAboutMePreview, articleStateManagementInReactPreview, articleWebDevelopmentCertificationsLearningJourneyPreview]
  }
} as const satisfies ToolView;

const toolTypescript = {
  "id": fixtureId("seed05-tool-typescript"),
  "name": fixtureText("TypeScript"),
  "usageContext": fixtureText("Used alongside React and Storybook in UI Gallery System's frontend component work."),
  "category": "language-runtime",
  "skills": [skillFrontendDevelopment, skillDesignSystems],
  "proof": {
    "projects": [projectUiGallerySystemPreview],
    "experience": [],
    "articles": [articleWebDevelopmentCertificationsLearningJourneyPreview]
  }
} as const satisfies ToolView;

const toolStorybook = {
  "id": fixtureId("seed05-tool-storybook"),
  "name": fixtureText("Storybook"),
  "usageContext": fixtureText("Used as UI Gallery System's primary workspace for reusable components, layout patterns, and responsive review before CMS integration."),
  "category": "design-qa",
  "skills": [skillDesignSystems, skillAccessibilityWcag, skillWebQaUat],
  "proof": {
    "projects": [projectUiGallerySystemPreview],
    "experience": [],
    "articles": []
  }
} as const satisfies ToolView;

export const skills = [skillFrontendDevelopment, skillDesignSystems, skillAccessibilityWcag, skillContentModeling, skillCmsOperations, skillContentMigration, skillLocalization, skillWebQaUat, skillSeoMetadataGovernance, skillWorkflowAutomation, skillApiIntegration, skillTechnicalDocumentationGovernance] as const satisfies readonly SkillSummary[];

export const socialLinks = [socialLinkLinkedin, socialLinkGithub] as const satisfies readonly SocialLinkView[];

export const navigation = [navigationItemAbout, navigationItemWork, navigationItemProjects, navigationItemWriting, navigationItemTools, navigationItemContact] as const satisfies readonly SiteNavigationLink[];

export const skillGroups = [skillGroupAutomationDelivery, skillGroupContentCmsOperations, skillGroupFrontendUiEngineering, skillGroupQualityDiscoverability] as const satisfies readonly SkillGroupView[];

export const tools = [toolAdobeExperienceManager, toolContentful, toolWordpress, toolReact, toolTypescript, toolStorybook] as const satisfies readonly ToolView[];

export const projects = [projectContentfulGreenfieldStarter, projectEnterpriseCmsMigration, projectUiGallerySystem] as const satisfies readonly ProjectDetail[];

export const projectPreviews = [projectContentfulGreenfieldStarterPreview, projectEnterpriseCmsMigrationPreview, projectUiGallerySystemPreview] as const satisfies readonly ProjectPreview[];

export const articles = [articleAboutMe, articleStateManagementInReact, articleWebDevelopmentCertificationsLearningJourney] as const satisfies readonly ArticleDetail[];

export const articlePreviews = [articleAboutMePreview, articleStateManagementInReactPreview, articleWebDevelopmentCertificationsLearningJourneyPreview] as const satisfies readonly ArticlePreview[];

export const experiences = [experienceHogarthWwpAppleContentManager, experienceWhoiFrontendDeveloper, experienceRobertHalfMarketingWebDeveloper, experienceDigitalnestWebDevelopmentSpecialist] as const satisfies readonly ExperienceView[];

export const experienceSummaries = [experienceHogarthWwpAppleContentManagerSummary, experienceWhoiFrontendDeveloperSummary, experienceRobertHalfMarketingWebDeveloperSummary, experienceDigitalnestWebDevelopmentSpecialistSummary] as const satisfies readonly ExperienceSummary[];

export const normalizedRecords = { sites: [siteChrome], profiles: [profile], socials: socialLinks, navigation, projects, articles, experience: experiences, skills, groups: skillGroups, tools } as const;
export const pageData = {
  home: { profile: profileSummary, projects: [projectPreviews[0], projectPreviews[1], projectPreviews[2]], writing: [articlePreviews[0], articlePreviews[1], articlePreviews[2]], experience: [experienceSummaries[0], experienceSummaries[1]], skillGroups, tools, contact },
  about: { profile, skillGroups, experience: experienceSummaries, tools, contact },
  work: { experiences, contact }, projects: { projects: projectPreviews, contact },
  project: { project: projects[0], contact }, writing: { articles: articlePreviews, contact },
  article: { article: articles[0], contact }, tools: { tools, skillGroups, contact },
  contact: { profile: profileSummary, contact },
} as const satisfies ReadyDataByRoute;
export const routes = {
  home: { route: 'home', path: '/' }, about: { route: 'about', path: '/about' },
  work: { route: 'work', path: '/work' }, projects: { route: 'projects', path: '/projects' },
  project: { route: 'project', path: projects[0].href, slug: projects[0].slug },
  writing: { route: 'writing', path: '/writing' },
  article: { route: 'article', path: articles[0].href, slug: articles[0].slug },
  tools: { route: 'tools', path: '/tools' }, contact: { route: 'contact', path: '/contact' },
} as const satisfies RouteByKey;
export const emptyMetadata = { title: fixtureNonEmptyText('No eligible items'), description: fixtureNonEmptyText('No eligible items are available.'), breadcrumbs: [], robots: 'noindex,follow', sitemapEligible: false } as const satisfies PublicEmptyMetadata;
export const failureMetadata = { title: fixtureNonEmptyText('Content unavailable'), description: fixtureNonEmptyText('Content is unavailable.'), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } as const satisfies NoPublicMetadata;
export const previewMetadata = { ...failureMetadata, cacheControl: 'no-store' } as const satisfies PreviewMetadata;

export const homeReady = { route: 'home', routeInfo: routes.home, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.home, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Gilberto Alejandro Haro - Web Content & Marketing Technologist"), description: fixtureNonEmptyText(profile.shortBio), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'home', 'PUBLIC'>;

export const aboutReady = { route: 'about', routeInfo: routes.about, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.about, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("About Gilberto Alejandro Haro | Gilberto Haro"), description: fixtureNonEmptyText(siteChrome.siteDescription), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'about', 'PUBLIC'>;

export const workReady = { route: 'work', routeInfo: routes.work, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.work, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Work & Experience | Gilberto Haro"), description: fixtureNonEmptyText(siteChrome.siteDescription), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'work', 'PUBLIC'>;

export const projectsReady = { route: 'projects', routeInfo: routes.projects, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.projects, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Projects & Case Studies | Gilberto Haro"), description: fixtureNonEmptyText(siteChrome.siteDescription), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'projects', 'PUBLIC'>;

export const projectReady = { route: 'project', routeInfo: routes.project, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.project, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Contentful Greenfield Starter | Gilberto Haro"), description: fixtureNonEmptyText(projects[0].summary), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'project', 'PUBLIC'>;

export const writingReady = { route: 'writing', routeInfo: routes.writing, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.writing, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Writing | Gilberto Haro"), description: fixtureNonEmptyText(siteChrome.siteDescription), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'writing', 'PUBLIC'>;

export const articleReady = { route: 'article', routeInfo: routes.article, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.article, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("About Me | Gilberto Haro"), description: fixtureNonEmptyText(articles[0].excerpt), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'article', 'PUBLIC'>;

export const toolsReady = { route: 'tools', routeInfo: routes.tools, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.tools, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Tools & Platforms | Gilberto Haro"), description: fixtureNonEmptyText(siteChrome.siteDescription), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'tools', 'PUBLIC'>;

export const contactReady = { route: 'contact', routeInfo: routes.contact, audience: 'PUBLIC', state: 'READY', httpStatus: 200, diagnostics: [], data: pageData.contact, chrome: siteChrome, metadata: { mode: 'offline-demo', title: fixtureNonEmptyText("Contact | Gilberto Haro"), description: fixtureNonEmptyText(siteChrome.siteDescription), breadcrumbs: [], robots: 'noindex,nofollow', sitemapEligible: false } } as const satisfies Ready<'contact', 'PUBLIC'>;

export const workEmpty = { route: 'work', routeInfo: routes.work, audience: 'PUBLIC', state: 'EMPTY', httpStatus: 200, diagnostics: [{ code: 'COLLECTION_EMPTY', message: 'No eligible items are available.' }], data: { experiences: [], contact }, chrome: siteChrome, metadata: emptyMetadata } as const satisfies EmptyFor<'work', 'PUBLIC'>;

export const projectsEmpty = { route: 'projects', routeInfo: routes.projects, audience: 'PUBLIC', state: 'EMPTY', httpStatus: 200, diagnostics: [{ code: 'COLLECTION_EMPTY', message: 'No eligible items are available.' }], data: { projects: [], contact }, chrome: siteChrome, metadata: emptyMetadata } as const satisfies EmptyFor<'projects', 'PUBLIC'>;

export const writingEmpty = { route: 'writing', routeInfo: routes.writing, audience: 'PUBLIC', state: 'EMPTY', httpStatus: 200, diagnostics: [{ code: 'COLLECTION_EMPTY', message: 'No eligible items are available.' }], data: { articles: [], contact }, chrome: siteChrome, metadata: emptyMetadata } as const satisfies EmptyFor<'writing', 'PUBLIC'>;

export const toolsEmpty = { route: 'tools', routeInfo: routes.tools, audience: 'PUBLIC', state: 'EMPTY', httpStatus: 200, diagnostics: [{ code: 'COLLECTION_EMPTY', message: 'No eligible items are available.' }], data: { tools: [], contact, skillGroups }, chrome: siteChrome, metadata: emptyMetadata } as const satisfies EmptyFor<'tools', 'PUBLIC'>;

export const previewProject = { ...projectReady, audience: 'TRUSTED_PREVIEW', state: 'DRAFT_PREVIEW', metadata: previewMetadata } as const satisfies PreviewDetail<'project'>;
export const previewArticle = { ...articleReady, audience: 'TRUSTED_PREVIEW', state: 'DRAFT_PREVIEW', metadata: previewMetadata } as const satisfies PreviewDetail<'article'>;
export const projectMissing = { route: 'project', routeInfo: routes.project, audience: 'PUBLIC', state: 'MISSING', httpStatus: 404, diagnostics: [{ code: 'ROUTE_NOT_FOUND', message: 'This page could not be found.' }], metadata: failureMetadata } as const satisfies PublicResultByRoute['project'];
export const homeError = { route: 'home', routeInfo: routes.home, audience: 'PUBLIC', state: 'ERROR', httpStatus: 503, diagnostics: [{ code: 'CONTENT_UNAVAILABLE', message: 'Content is unavailable.' }], metadata: failureMetadata } as const satisfies PublicResultByRoute['home'];
export const readyResults = { home: homeReady, about: aboutReady, work: workReady, projects: projectsReady, project: projectReady, writing: writingReady, article: articleReady, tools: toolsReady, contact: contactReady } as const satisfies PublicResultByRoute;
export const emptyResults = { work: workEmpty, projects: projectsEmpty, writing: writingEmpty, tools: toolsEmpty } as const;

// S: independent expected vocabulary examples. Field-level adapter mapping remains Q3.
export const normalizedMarkExamples = [
  { kind: 'text', text: 'Fixture bold', marks: ['bold'] },
  { kind: 'text', text: 'Fixture italic', marks: ['italic'] },
  { kind: 'text', text: 'Fixture underline', marks: ['underline'] },
  { kind: 'text', text: 'Fixture code', marks: ['code'] },
  { kind: 'text', text: 'Fixture superscript', marks: ['superscript'] },
  { kind: 'text', text: 'Fixture subscript', marks: ['subscript'] },
  { kind: 'text', text: 'Fixture strikethrough', marks: ['strikethrough'] },
] as const satisfies readonly import('../../content/portfolio/contracts/rich-text').TextRun<'profile-long'>[];
export const normalizedStructureExamples = {
  policy: 'body', blocks: [
    { kind: 'heading', level: 2, children: [{ kind: 'text', text: 'Fixture heading', marks: [] }] },
    { kind: 'heading', level: 3, children: [{ kind: 'text', text: 'Fixture subheading', marks: [] }] },
    { kind: 'quote', blocks: [{ kind: 'paragraph', children: [{ kind: 'text', text: 'Fixture quote', marks: [] }] }] },
    { kind: 'list', ordered: false, items: [{ blocks: [{ kind: 'paragraph', children: [{ kind: 'text', text: 'Fixture item', marks: [] }] }] }] },
    { kind: 'list', ordered: true, items: [{ blocks: [{ kind: 'paragraph', children: [{ kind: 'link', href: fixtureHttps('https://example.test/fixture'), children: [{ kind: 'text', text: 'Fixture link', marks: [] }] }] }] }] },
    { kind: 'figure', image: assetProjectSystemDiagram },
    { kind: 'attachment', document: assetResumePublic },
  ],
} as const satisfies import('../../content/portfolio/contracts/rich-text').RichTextDocument<'body'>;

// Reserved-host release-metadata assertion only; never production origin configuration.
export const offlineReleaseMetadataExpectation = {
  mode: 'release', title: projectReady.metadata.title, description: projectReady.metadata.description,
  breadcrumbs: [], canonical: fixtureHttps('https://example.test/projects/contentful-greenfield-starter'),
  robots: 'index,follow', sitemapEligible: true,
  openGraph: { title: projectReady.metadata.title, description: projectReady.metadata.description,
    url: fixtureHttps('https://example.test/projects/contentful-greenfield-starter'),
    siteName: siteChrome.siteName, type: 'website', image: projects[0].heroImage },
} as const satisfies import('../../content/portfolio/contracts/pages').PublicReadyMetadata;

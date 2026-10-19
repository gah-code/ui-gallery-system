// Fixture-only constructors: explicit checks precede each branded narrowing.
// Production source/URL/media validation remains 06.3 work.
import type { Id, Text, NonEmptyText, Slug, HttpsUrl, FixtureAssetPath, PositiveInteger, NonNegativeInteger, Integer } from '../../content/portfolio/contracts/values';
import type { CalendarDate } from '../../content/portfolio/contracts/domain';
import type { MeaningfulImage, DocumentLink } from '../../content/portfolio/contracts/media';

function assertId(value: unknown): asserts value is Id {
  if (!(typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value))) throw new Error('Invalid fixture Id');
}
export function fixtureId(value: unknown): Id { assertId(value); return value; }

function assertText(value: unknown): asserts value is Text {
  if (!(typeof value === 'string' && value.trim().length > 0 && !value.includes('\0'))) throw new Error('Invalid fixture Text');
}
export function fixtureText(value: unknown): Text { assertText(value); return value; }

function assertNonEmptyText(value: unknown): asserts value is NonEmptyText {
  if (!(typeof value === 'string' && value.trim().length > 0 && !value.includes('\0'))) throw new Error('Invalid fixture NonEmptyText');
}
export function fixtureNonEmptyText(value: unknown): NonEmptyText { assertNonEmptyText(value); return value; }

function assertSlug(value: unknown): asserts value is Slug {
  if (!(typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))) throw new Error('Invalid fixture Slug');
}
export function fixtureSlug(value: unknown): Slug { assertSlug(value); return value; }

function assertInteger(value: unknown): asserts value is Integer {
  if (!(typeof value === 'number' && Number.isSafeInteger(value))) throw new Error('Invalid fixture Integer');
}
export function fixtureInteger(value: unknown): Integer { assertInteger(value); return value; }

function assertPositiveInteger(value: unknown): asserts value is PositiveInteger {
  if (!(typeof value === 'number' && Number.isSafeInteger(value) && value > 0)) throw new Error('Invalid fixture PositiveInteger');
}
export function fixturePositiveInteger(value: unknown): PositiveInteger { assertPositiveInteger(value); return value; }

function assertNonNegativeInteger(value: unknown): asserts value is NonNegativeInteger {
  if (!(typeof value === 'number' && Number.isSafeInteger(value) && value >= 0)) throw new Error('Invalid fixture NonNegativeInteger');
}
export function fixtureNonNegativeInteger(value: unknown): NonNegativeInteger { assertNonNegativeInteger(value); return value; }

function assertFixtureHttps(value: unknown): asserts value is HttpsUrl {
  if (typeof value !== 'string' || /\s/.test(value)) throw new Error('Invalid fixture URL');
  const url = new URL(value);
  // Reviewed fixture destinations and the reserved offline assertion host only.
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      !['github.com', 'www.linkedin.com', 'example.test'].includes(url.hostname)) throw new Error('Invalid fixture URL');
}
export function fixtureHttps(value: unknown): HttpsUrl { assertFixtureHttps(value); return value; }
function assertCalendarDate(value: unknown): asserts value is CalendarDate {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Invalid fixture date');
  const date = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('Invalid fixture date');
}
export function fixtureDate(value: unknown): CalendarDate { assertCalendarDate(value); return value; }
import assetUrl0 from "../../stories/portfolio/assets/profile-portrait.jpg";
import assetUrl1 from "../../stories/portfolio/assets/resume.pdf";
import assetUrl2 from "../../stories/portfolio/assets/enterprise-cms-migration.png";
import assetUrl3 from "../../stories/portfolio/assets/contentful-greenfield-starter.png";
import assetUrl4 from "../../stories/portfolio/assets/ui-gallery-system.png";
import assetUrl5 from "./assets/content-migration-workflow.png";
import assetUrl6 from "./assets/web-development-learning-journey.png";
import assetUrl7 from "./assets/default-social-image.png";

const approvedImportedPaths = new Set([assetUrl0, assetUrl1, assetUrl2, assetUrl3, assetUrl4, assetUrl5, assetUrl6, assetUrl7]);

function assertFixturePath(value: unknown): asserts value is FixtureAssetPath {
  if (typeof value !== 'string' || !approvedImportedPaths.has(value) || !value.startsWith('/') || value.startsWith('//') || value.includes('..')) throw new Error('Unapproved fixture asset path');
}
function fixturePath(value: unknown): FixtureAssetPath { assertFixturePath(value); return value; }

export const assetProfilePortrait = {
  "id": fixtureId("seed05-asset-profile-portrait"),
  "src": fixturePath(assetUrl0),
  "mime": "image/jpeg",
  "width": fixturePositiveInteger(2000),
  "height": fixturePositiveInteger(2000),
  "title": fixtureText("Profile portrait - Gilberto Alejandro Haro"),
  "description": fixtureText("Selected outdoor profile image showing a person with a backpack and two dogs on a mountain ridge at sunset."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("A person with a backpack stands on a mountain ridge at sunset with two dogs.")
  }
} as const satisfies MeaningfulImage;

export const assetResumePublic = {
  "id": fixtureId("seed05-asset-resume-public"),
  "href": fixturePath(assetUrl1),
  "mime": "application/pdf",
  "fileName": fixtureNonEmptyText("gilberto-haro-resume.pdf"),
  "bytes": fixturePositiveInteger(41035),
  "label": fixtureNonEmptyText("Download Gilberto Alejandro Haro's professional resume (PDF, 2 pages).")
} as const satisfies DocumentLink;

export const assetProjectEnterpriseCmsMigration = {
  "id": fixtureId("seed05-asset-project-enterprise-cms-migration"),
  "src": fixturePath(assetUrl2),
  "mime": "image/png",
  "width": fixturePositiveInteger(1731),
  "height": fixturePositiveInteger(909),
  "title": fixtureText("Enterprise CMS Migration - conceptual case study illustration"),
  "description": fixtureText("Conceptual portfolio illustration showing legacy content, metadata, localization, quality review, and migration into a structured CMS."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("Conceptual illustration showing legacy content, metadata, localization, and QA flowing into a structured CMS.")
  }
} as const satisfies MeaningfulImage;

export const assetProjectContentfulGreenfieldStarter = {
  "id": fixtureId("seed05-asset-project-contentful-greenfield-starter"),
  "src": fixturePath(assetUrl3),
  "mime": "image/png",
  "width": fixturePositiveInteger(1731),
  "height": fixturePositiveInteger(909),
  "title": fixtureText("Contentful Greenfield Starter - v1 semantic model illustration"),
  "description": fixtureText("Conceptual portfolio diagram showing the frozen v1.0.0 Contentful Greenfield Starter semantic model and governed content workflow."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("Conceptual diagram of the Contentful Greenfield Starter showing ten semantic content types and a governed content-model workflow.")
  }
} as const satisfies MeaningfulImage;

export const assetProjectUiGallerySystem = {
  "id": fixtureId("seed05-asset-project-ui-gallery-system"),
  "src": fixturePath(assetUrl4),
  "mime": "image/png",
  "width": fixturePositiveInteger(1731),
  "height": fixturePositiveInteger(909),
  "title": fixtureText("UI Gallery System - conceptual component illustration"),
  "description": fixtureText("Conceptual portfolio illustration representing reusable components, interface patterns, design tokens, and a component-gallery workspace."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("Conceptual illustration of a reusable component gallery with interface patterns, design tokens, and UI building blocks.")
  }
} as const satisfies MeaningfulImage;

export const assetProjectSystemDiagram = {
  "id": fixtureId("seed05-asset-project-system-diagram"),
  "src": fixturePath(assetUrl5),
  "mime": "image/png",
  "width": fixturePositiveInteger(1731),
  "height": fixturePositiveInteger(909),
  "title": fixtureText("Content Migration Workflow - illustrative system diagram"),
  "description": fixtureText("Generalized conceptual migration diagram showing content preparation, field mapping, editorial review, QA, and delivery."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("Illustrative content migration workflow showing preparation, field mapping, editorial review, and final delivery.")
  }
} as const satisfies MeaningfulImage;

export const assetArticleLearningJourney = {
  "id": fixtureId("seed05-asset-article-learning-journey"),
  "src": fixturePath(assetUrl6),
  "mime": "image/png",
  "width": fixturePositiveInteger(1731),
  "height": fixturePositiveInteger(909),
  "title": fixtureText("Web Development Learning Journey - conceptual article illustration"),
  "description": fixtureText("Conceptual portfolio illustration representing study, hands-on practice, project building, and applying web-development skills."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("Conceptual learning path showing study, hands-on practice, project building, and applying web development skills.")
  }
} as const satisfies MeaningfulImage;

export const assetSiteSocialDefault = {
  "id": fixtureId("seed05-asset-site-social-default"),
  "src": fixturePath(assetUrl7),
  "mime": "image/png",
  "width": fixturePositiveInteger(1731),
  "height": fixturePositiveInteger(909),
  "title": fixtureText("Gilberto Haro - default portfolio social image"),
  "description": fixtureText("Default conceptual portfolio-sharing graphic for Gilberto Alejandro Haro and his Web Content & Marketing Technologist positioning."),
  "accessibility": {
    "kind": "meaningful",
    "alt": fixtureNonEmptyText("Portfolio identity graphic for Gilberto Alejandro Haro, Web Content & Marketing Technologist, with conceptual web and content-system imagery.")
  }
} as const satisfies MeaningfulImage;

// Identity/provenance assertions only; never a rendered page field.
export const mediaIdentities = [{
  "id": "seed05-asset-profile-portrait",
  "frontendPath": "src/stories/portfolio/assets/profile-portrait.jpg",
  "path": "content-model/seed/phase-05/assets/gilberto-haro-profile-portrait.jpg",
  "mime": "image/jpeg",
  "bytes": 118413,
  "sha256": "596c8af888628c751470195e7d2b401d1a3ed90c4232f9884d1cf07b3e5f335b",
  "accessibility": {
    "treatment": "meaningful",
    "text": "A person with a backpack stands on a mountain ridge at sunset with two dogs.",
    "requirement": "Describe the reviewed scene without inferring a precise location, capture date, dog breeds, or the person's identity."
  },
  "dimensions": {
    "width": 2000,
    "height": 2000
  }
}, {
  "id": "seed05-asset-resume-public",
  "frontendPath": "src/stories/portfolio/assets/resume.pdf",
  "path": "content-model/seed/phase-05/assets/gilberto-haro-resume.pdf",
  "mime": "application/pdf",
  "bytes": 41035,
  "sha256": "0bdb479fff44f5dd8147cb009de258a03111311f93a0edf9ec7c2c3d6141ba7f",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Download Gilberto Alejandro Haro's professional resume (PDF, 2 pages).",
    "requirement": "Document Asset with descriptive link context, not image alt text. Selectable text, headings, logical reading sequence, approved public links, and both rendered pages checked locally.",
    "review": {
      "status": "PASS",
      "pages": 2,
      "selectableText": true,
      "taggedStructure": true,
      "clipping": "NONE",
      "fullPdfUaConformance": "NOT CLAIMED"
    }
  },
  "dimensions": null
}, {
  "id": "seed05-asset-project-enterprise-cms-migration",
  "frontendPath": "src/stories/portfolio/assets/enterprise-cms-migration.png",
  "path": "content-model/seed/phase-05/assets/enterprise-cms-migration.png",
  "mime": "image/png",
  "bytes": 1725854,
  "sha256": "a9ffc5988bfb65f93155791348bf804ef6d46e8a9e63d928f484d77d7a777a96",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Conceptual illustration showing legacy content, metadata, localization, and QA flowing into a structured CMS.",
    "requirement": "Use the approved conceptual-image description; do not present illustration text or imagery as independent factual evidence."
  },
  "dimensions": {
    "width": 1731,
    "height": 909
  }
}, {
  "id": "seed05-asset-project-contentful-greenfield-starter",
  "frontendPath": "src/stories/portfolio/assets/contentful-greenfield-starter.png",
  "path": "content-model/seed/phase-05/assets/contentful-greenfield-starter.png",
  "mime": "image/png",
  "bytes": 1555038,
  "sha256": "9db18f4bfc7c891128353ab085e7bc434289f9ebfdd400ac1a628d0a093a1b9c",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Conceptual diagram of the Contentful Greenfield Starter showing ten semantic content types and a governed content-model workflow.",
    "requirement": "Use the approved conceptual-image description; do not present illustration text or imagery as independent factual evidence."
  },
  "dimensions": {
    "width": 1731,
    "height": 909
  }
}, {
  "id": "seed05-asset-project-ui-gallery-system",
  "frontendPath": "src/stories/portfolio/assets/ui-gallery-system.png",
  "path": "content-model/seed/phase-05/assets/ui-gallery-system.png",
  "mime": "image/png",
  "bytes": 1667403,
  "sha256": "be864131249a822b772b85ce2637edc0a6fc94d5813abeba9f76ba385996f2dc",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Conceptual illustration of a reusable component gallery with interface patterns, design tokens, and UI building blocks.",
    "requirement": "Use the approved conceptual-image description; do not present illustration text or imagery as independent factual evidence."
  },
  "dimensions": {
    "width": 1731,
    "height": 909
  }
}, {
  "id": "seed05-asset-project-system-diagram",
  "frontendPath": "src/data/portfolio/assets/content-migration-workflow.png",
  "path": "content-model/seed/phase-05/assets/content-migration-workflow.png",
  "mime": "image/png",
  "bytes": 1635129,
  "sha256": "3cfc3130fbec41af7253bda0e3f6c5eb45fdb3676453ac31346fcd38d2bde6b5",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Illustrative content migration workflow showing preparation, field mapping, editorial review, and final delivery.",
    "requirement": "Use the approved conceptual-image description; do not present illustration text or imagery as independent factual evidence."
  },
  "dimensions": {
    "width": 1731,
    "height": 909
  }
}, {
  "id": "seed05-asset-article-learning-journey",
  "frontendPath": "src/data/portfolio/assets/web-development-learning-journey.png",
  "path": "content-model/seed/phase-05/assets/web-development-learning-journey.png",
  "mime": "image/png",
  "bytes": 1640698,
  "sha256": "5b5b160bd3fa603da460de9d1fd0474d95398c762344dc7a4b3d493ab5a5f6f5",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Conceptual learning path showing study, hands-on practice, project building, and applying web development skills.",
    "requirement": "Use the approved conceptual-image description; do not present illustration text or imagery as independent factual evidence."
  },
  "dimensions": {
    "width": 1731,
    "height": 909
  }
}, {
  "id": "seed05-asset-site-social-default",
  "frontendPath": "src/data/portfolio/assets/default-social-image.png",
  "path": "content-model/seed/phase-05/assets/default-social-image.png",
  "mime": "image/png",
  "bytes": 1758838,
  "sha256": "a585e5c2f0720dafaf3a295c142121888ad5fad5284dba145c0822d14a24368a",
  "accessibility": {
    "treatment": "meaningful",
    "text": "Portfolio identity graphic for Gilberto Alejandro Haro, Web Content & Marketing Technologist, with conceptual web and content-system imagery.",
    "requirement": "Use the approved conceptual-image description; do not present illustration text or imagery as independent factual evidence."
  },
  "dimensions": {
    "width": 1731,
    "height": 909
  }
}] as const;
export const fixtureImages = [assetProfilePortrait, assetProjectEnterpriseCmsMigration, assetProjectContentfulGreenfieldStarter, assetProjectUiGallerySystem, assetProjectSystemDiagram, assetArticleLearningJourney, assetSiteSocialDefault] as const;

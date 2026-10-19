import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import type { PublicResultByRoute, TrustedPreviewResultByRoute, PublicRouteResult, EmptyFor, ArticlePageData } from '../../content/portfolio/contracts/pages';
import type { ProjectPreview, ProfileView, ProjectDetail, ArticleDetail, ExperienceView } from '../../content/portfolio/contracts/domain';
import type { Block } from '../../content/portfolio/contracts/rich-text';
import type { SourceEntry } from './source-fixtures';
import { representativeEntries, representativeAssets, sourceProvenance, sourceEntry, whoiToolsAbsent, whoiToolsEmpty, malformedSourceCases, simulatedContexts, sourceMarkExamples, sourceStructureExamples, sourceRichTextNegativeExamples, sourceFixtureContextPolicy, sourceFixtureContexts, simulatedRevisionFacts } from './source-fixtures';
import { normalizedRecords, profile, siteChrome, contact, projects, projectPreviews, articles, articlePreviews, experiences, tools, skillGroups, pageData, readyResults, emptyResults, homeReady, workEmpty, projectReady, articleReady, projectsEmpty, previewProject, previewArticle, projectMissing, homeError, normalizedMarkExamples, normalizedStructureExamples, offlineReleaseMetadataExpectation } from './normalized-fixtures';
import { mediaIdentities, fixtureImages, assetResumePublic, fixtureId, fixtureText, fixtureNonEmptyText, fixtureSlug, fixtureDate, fixtureInteger, fixturePositiveInteger, fixtureNonNegativeInteger, fixtureHttps } from './media';
import { scenarioFamilies, artifactRequestMatrix, artifactCapacity } from './scenarios';

// Q1: concrete positive fixtures; assemblers remain unimplemented until 06.3.
const positiveHome = homeReady satisfies PublicResultByRoute['home'];
const positiveEmpty = workEmpty satisfies PublicResultByRoute['work'];
const positiveProject = projectReady satisfies PublicResultByRoute['project'];
const positiveArticle = articleReady satisfies PublicResultByRoute['article'];
const positivePreview = previewProject satisfies TrustedPreviewResultByRoute['project'];
type Assignable<A, B> = [A] extends [B] ? true : false;
type AssertFalse<T extends false> = T;
export type NegativeTypeAssertions = [
  AssertFalse<Assignable<Omit<typeof homeReady, 'state'> & { state: 'EMPTY' }, PublicResultByRoute['home']>>,
  AssertFalse<Assignable<Omit<typeof projectReady, 'state'> & { state: 'EMPTY' }, PublicResultByRoute['project']>>,
  AssertFalse<Assignable<Omit<typeof articleReady, 'state'> & { state: 'EMPTY' }, PublicResultByRoute['article']>>,
  AssertFalse<Assignable<Omit<typeof projectReady, 'data'> & { data: ArticlePageData }, PublicResultByRoute['project']>>,
  AssertFalse<Assignable<typeof previewProject, PublicRouteResult>>,
  AssertFalse<Assignable<Omit<typeof projectsEmpty, 'data'> & { data: { projects: readonly [ProjectPreview]; contact: typeof contact } }, EmptyFor<'projects', 'PUBLIC'>>>,
];
export type RichTextNegativeAssertions = [
  AssertFalse<Assignable<{ kind: 'text'; text: string; marks: readonly ['underline'] }, import('../../content/portfolio/contracts/rich-text').TextRun<'body'>>>,
  AssertFalse<Assignable<{ kind: 'heading'; level: 2; children: readonly [] }, import('../../content/portfolio/contracts/rich-text').AllowedBlock<'simple'>>>,
];

const root = fileURLToPath(new URL('../../../', import.meta.url));
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected fixture record');
  return Object.fromEntries(Object.entries(value));
}
function array(value: unknown): readonly unknown[] {
  if (!Array.isArray(value)) throw new Error('Expected fixture array');
  return value;
}
function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => [k, stable(v)]));
  return value;
}
const sha = (value: string | Uint8Array) => createHash('sha256').update(value).digest('hex');
function authored(entry: SourceEntry, field: string): unknown {
  return entry.fields[field]?.['en-US'];
}
function ids(value: unknown): unknown[] { return array(value).map(item => record(item).id); }
function sourceIds(entry: SourceEntry, field: string): unknown[] {
  const value = authored(entry, field);
  return value === undefined ? [] : array(value).map(item => record(record(item).sys).id);
}
function sourceTextRuns(value: unknown): unknown[] {
  const node = record(value);
  if (node.nodeType === 'text') return [{ text: node.value, marks: array(node.marks).map(mark => record(mark).type) }];
  return array(node.content).flatMap(sourceTextRuns);
}
function normalizedTextRuns(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(normalizedTextRuns);
  if (!value || typeof value !== 'object') return [];
  const node = record(value);
  if (node.kind === 'text') return [{ text: node.text, marks: node.marks }];
  return Object.values(node).flatMap(normalizedTextRuns);
}
function assertNoRawEnvelope(value: unknown): void {
  if (Array.isArray(value)) { value.forEach(assertNoRawEnvelope); return; }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    expect(['sys', 'fields', 'includes', 'en-US', 'nodeType', 'publication', 'publicSafety', 'datePrecision', 'source']).not.toContain(key);
    assertNoRawEnvelope(child);
  }
}

describe('Q1 correlated contract fixtures', () => {
  it('checks the five positive R2 fixtures at runtime as well as compile time', () => {
    expect([positiveHome.route, positiveEmpty.state, positiveProject.route, positiveArticle.route, positivePreview.audience]).toEqual(['home', 'EMPTY', 'project', 'article', 'TRUSTED_PREVIEW']);
    expect(positiveProject.data.project.id).toBe(projects[0].id);
    expect(positiveArticle.data.article.id).toBe(articles[0].id);
  });
  it('has all nine READY route/payload identities with offline metadata', () => {
    expect(Object.keys(readyResults)).toEqual(['home', 'about', 'work', 'projects', 'project', 'writing', 'article', 'tools', 'contact']);
    for (const [key, result] of Object.entries(readyResults)) {
      expect(result.route).toBe(key); expect(result.routeInfo.route).toBe(key);
      expect(result.state).toBe('READY'); expect(result.httpStatus).toBe(200);
      expect(result.metadata).toMatchObject({ mode: 'offline-demo', robots: 'noindex,nofollow', sitemapEligible: false });
      expect(result.metadata).not.toHaveProperty('canonical'); expect(result.metadata).not.toHaveProperty('openGraph');
    }
  });
  it('keeps four exact primary EMPTY collections and viable contact', () => {
    const primary = { work: 'experiences', projects: 'projects', writing: 'articles', tools: 'tools' } as const;
    for (const [key, result] of Object.entries(emptyResults)) {
      expect(result.state).toBe('EMPTY'); expect(result.metadata.robots).toBe('noindex,follow');
      expect(result.data.contact.channels.length).toBeGreaterThan(0);
      const field = Object.entries(primary).find(([route]) => route === key)?.[1];
      expect(field).toBeDefined(); expect(field && record(result.data)[field]).toEqual([]);
    }
  });
  it('separates preview and generic failure envelopes without leaking private diagnostics', () => {
    for (const result of [previewProject, previewArticle]) {
      expect(result.metadata.cacheControl).toBe('no-store'); expect(result.metadata).not.toHaveProperty('canonical');
      expect(result.audience).toBe('TRUSTED_PREVIEW'); expect(result.state).toBe('DRAFT_PREVIEW');
    }
    for (const result of [projectMissing, homeError]) {
      expect(result).not.toHaveProperty('data'); expect(result).not.toHaveProperty('chrome');
      expect(result.metadata).not.toHaveProperty('openGraph'); expect(result.metadata.robots).toBe('noindex,nofollow');
      expect(Object.keys(result.diagnostics[0])).toEqual(['code', 'message']);
      expect(JSON.stringify(result.diagnostics)).not.toMatch(/seed05|fields|stack|token/);
    }
  });
});

describe('Q2 independent source and normalized invariants', () => {
  it('preserves all 42 exact field snapshots and eight source Asset identities', () => {
    expect(representativeEntries).toHaveLength(42); expect(representativeAssets).toHaveLength(8);
    expect(new Set(representativeEntries.map(e => e.sys.id)).size).toBe(42);
    expect(new Set(representativeEntries.map(e => e.sys.contentType.sys.id)).size).toBe(10);
    for (const provenance of sourceProvenance.records) {
      expect(provenance.publication).toBe('draft');
      expect(sha(JSON.stringify(stable(sourceEntry(provenance.id).fields)))).toBe(provenance.fieldsSha256);
      for (const [field, decision] of Object.entries(provenance.optionalFields)) {
        expect(Object.hasOwn(sourceEntry(provenance.id).fields, field)).toBe(decision.decision === 'include');
      }
    }
    expect(simulatedContexts.publicEligible.simulation).toBe(true);
    expect(simulatedContexts.trustedPreview.authentication).toBe('SIMULATED_ONLY');
    expect(simulatedContexts.trustedPreview).not.toHaveProperty('access');
  });
  it('represents all ten domains while retaining exact plain scalar source values', () => {
    expect(Object.keys(normalizedRecords)).toHaveLength(10);
    const all = Object.values(normalizedRecords).flat();
    expect(all).toHaveLength(42);
    const plain = ['name', 'primaryTitle', 'positioningStatement', 'shortBio', 'location', 'availabilityStatus', 'workPreference', 'contactIntro', 'siteName', 'siteDescription', 'platform', 'label', 'routeKey', 'description', 'title', 'summary', 'projectType', 'role', 'outcome', 'problem', 'approach', 'company', 'proofSummary', 'category', 'usageContext', 'sortOrder'];
    for (const value of all) {
      const normalized = record(value); const source = sourceEntry(value.id);
      for (const key of plain) if (Object.hasOwn(normalized, key)) expect(normalized[key]).toEqual(authored(source, key));
    }
    expect(profile.primaryTitle).toBe('Web Content & Marketing Technologist');
    expect(contact.channels.map(channel => channel.href)).toEqual(['https://www.linkedin.com/in/gilbertoharo/', 'https://github.com/gah-code']);
    expect(profile).not.toHaveProperty('publicEmail'); expect(profile).not.toHaveProperty('phone');
    expect(profile).not.toHaveProperty('secondaryTitle');
    for (const value of projects) expect(value).not.toHaveProperty('projectStatus');
    for (const value of articles) { expect(value).not.toHaveProperty('category'); expect(value).not.toHaveProperty('contentPillar'); }
  });
  it('preserves authored reference order independently of page collection ordering', () => {
    for (const [list, fields] of [[projects, ['skills', 'tools', 'galleryImages', 'relatedProjects']], [articles, ['skills', 'tools', 'relatedProjects', 'relatedArticles']], [experiences, ['skills', 'tools', 'relatedArticles']], [tools, ['skills']], [skillGroups, ['skills']]] as const) {
      for (const value of list) for (const field of fields) expect(ids(record(value)[field])).toEqual(sourceIds(sourceEntry(value.id), field));
    }
    expect(ids(siteChrome.primaryNavigation)).toEqual(sourceIds(sourceEntry(siteChrome.id), 'primaryNavigationItems'));
    expect(ids(siteChrome.footerNavigation)).toEqual(sourceIds(sourceEntry(siteChrome.id), 'footerNavigationItems'));
    expect(ids(profile.socialLinks)).toEqual(sourceIds(sourceEntry(profile.id), 'socialLinks'));
    for (const value of skillGroups) expect(value.skills.length).toBeGreaterThan(0);
  });
  it('keeps deterministic collection order and bounded Home selections', () => {
    expect(projects.map(p => p.slug)).toEqual(['contentful-greenfield-starter', 'enterprise-cms-migration', 'ui-gallery-system']);
    expect(articles.map(a => a.slug)).toEqual(['about-me', 'state-management-in-react', 'web-development-certifications-learning-journey']);
    expect(experiences.map(e => e.id)).toEqual(['seed05-experience-hogarth-wwp-apple-content-manager', 'seed05-experience-whoi-frontend-developer', 'seed05-experience-robert-half-marketing-web-developer', 'seed05-experience-digitalnest-web-development-specialist']);
    expect(tools.map(t => t.name)).toEqual(['Adobe Experience Manager', 'Contentful', 'WordPress', 'React', 'TypeScript', 'Storybook']);
    expect(skillGroups.map(g => g.name)).toEqual(['Automation & Delivery', 'Content & CMS Operations', 'Frontend & UI Engineering', 'Quality & Discoverability']);
    expect(pageData.home.projects).toEqual(projectPreviews.slice(0, 3)); expect(pageData.home.writing).toEqual(articlePreviews.slice(0, 3));
    expect(pageData.home.experience.map(e => e.id)).toEqual(experiences.slice(0, 2).map(e => e.id)); expect(pageData.home.tools).toHaveLength(6);
  });
  it('checks tool reverse proof against authored source links, with finite summaries', () => {
    for (const tool of tools) {
      for (const [key, candidates] of [['projects', projects], ['experience', experiences], ['articles', articles]] as const) {
        const expected = candidates.filter(value => sourceIds(sourceEntry(value.id), 'tools').includes(tool.id)).map(value => value.id);
        expect(ids(tool.proof[key])).toEqual(expected);
      }
      for (const p of tool.proof.projects) expect(p).not.toHaveProperty('caseStudyBody');
      for (const a of tool.proof.articles) expect(a).not.toHaveProperty('body');
      for (const e of tool.proof.experience) expect(e).not.toHaveProperty('responsibilities');
    }
    for (const value of projects) expect(value.relatedArticles).toEqual([]);
    for (const value of experiences) expect(value.relatedProjects).toEqual([]);
  });
  it('preserves all six Rich Text fields, paragraph sequences, text and marks', () => {
    const specimens: readonly (readonly [string, string, unknown])[] = [
      [profile.id, 'longBio', profile.longBio], [profile.id, 'learningHighlights', profile.learningHighlights],
      ...projects.map(p => [p.id, 'caseStudyBody', p.caseStudyBody] as const),
      ...articles.map(a => [a.id, 'body', a.body] as const),
      ...experiences.flatMap(e => [[e.id, 'responsibilities', e.responsibilities] as const, [e.id, 'achievements', e.achievements] as const]),
    ];
    for (const [id, field, normalized] of specimens) {
      const source = authored(sourceEntry(id), field);
      expect(normalizedTextRuns(normalized)).toEqual(sourceTextRuns(source));
      expect(array(record(normalized).blocks)).toHaveLength(array(record(source).content).length);
    }
    expect(articles.map(a => a.body.blocks.length)).toEqual([6, 6, 5]);
    expect(normalizedTextRuns(articles[1].body)).toContainEqual({ text: 'where should this value live?', marks: ['bold'] });
    for (const p of projects) expect(typeof p.problem).toBe('string');
  });
  it('preserves eight month-only provenance values and day-precision article dates', () => {
    let count = 0;
    for (const value of experiences) {
      const provenance = sourceProvenance.records.find(row => row.id === value.id);
      expect(provenance).toBeDefined();
      for (const [field, normalized] of [['startDate', value.start], ['endDate', value.end]] as const) {
        const precision = record(record(provenance).datePrecision)[field];
        expect(precision).toMatchObject({ sourcePrecision: 'month', dayIsEncoding: true });
        const date = String(authored(sourceEntry(value.id), field));
        expect(normalized).toEqual({ year: Number(date.slice(0, 4)), month: Number(date.slice(5, 7)), precision: 'month' });
        expect(normalized).not.toHaveProperty('day'); count++;
      }
    }
    expect(count).toBe(8); expect(articles.every(a => a.publishDate === '2026-09-22')).toBe(true);
  });
  it('bounds the WHOI optional-empty representation example to the exact entry/field', () => {
    const absent = record(whoiToolsAbsent); const empty = record(whoiToolsEmpty);
    expect(record(absent.sys).id).toBe('seed05-experience-whoi-frontend-developer');
    expect(record(absent.fields)).not.toHaveProperty('tools');
    expect(record(empty.fields).tools).toEqual({ 'en-US': [] });
    expect(record(absent.fields)).toEqual(Object.fromEntries(Object.entries(record(empty.fields)).filter(([key]) => key !== 'tools')));
    expect(experiences[1].tools).toEqual([]);
    expect(record(record(malformedSourceCases.whoiWrongLocale).fields).tools).toEqual({ 'fr-FR': [] });
    expect(record(record(malformedSourceCases.whoiNull).fields).tools).toEqual({ 'en-US': null });
  });
  it('keeps malformed source inputs honest and separate from positive normalized fixtures', () => {
    expect(Object.keys(malformedSourceCases)).toHaveLength(18);
    expect(record(record(malformedSourceCases.requiredNull).fields).title).toEqual({ 'en-US': null });
    expect(record(record(malformedSourceCases.invalidSlug).fields).slug).toEqual({ 'en-US': '../escape' });
    assertNoRawEnvelope(normalizedRecords); assertNoRawEnvelope(pageData);
    expect(JSON.parse(JSON.stringify(pageData))).toEqual(pageData);
  });
});

describe('Q2 media and fixture constructors', () => {
  it('verifies all eight approved local byte identities without networking', () => {
    expect(mediaIdentities).toHaveLength(8); expect(fixtureImages).toHaveLength(7);
    expect(mediaIdentities.filter(a => a.frontendPath.startsWith('src/data/portfolio/assets/'))).toHaveLength(3);
    for (const asset of mediaIdentities) {
      const bytes = readFileSync(resolve(root, asset.frontendPath));
      expect(bytes.length).toBe(asset.bytes); expect(sha(bytes)).toBe(asset.sha256);
      if (asset.mime === 'image/png') {
        expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
        expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([1731, 909]);
      }
      if (asset.mime === 'application/pdf') expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
      const image = fixtureImages.find(image => image.id === asset.id);
      if (image) expect(image.accessibility.alt).toBe(asset.accessibility.text);
    }
    expect(assetResumePublic.label).toBe("Download Gilberto Alejandro Haro's professional resume (PDF, 2 pages).");
  });
  it('rejects invalid fixture brands instead of using broad casts', () => {
    for (const make of [fixtureId, fixtureText, fixtureNonEmptyText, fixtureSlug]) expect(() => make('')).toThrow();
    expect(() => fixtureId('bad id')).toThrow(); expect(() => fixtureSlug('../escape')).toThrow();
    expect(() => fixtureDate('2025-02-30')).toThrow(); expect(fixtureDate('2024-02-29')).toBe('2024-02-29');
    expect(() => fixtureInteger(1.5)).toThrow(); expect(() => fixturePositiveInteger(0)).toThrow(); expect(() => fixtureNonNegativeInteger(-1)).toThrow();
    for (const url of ['http://example.test', 'javascript:alert(1)', 'https://localhost/', 'https://user:pass@example.test/', ' https://example.test/fixture']) expect(() => fixtureHttps(url)).toThrow();
  });
});

describe('Q2 coverage declarations and boundary ownership', () => {
  it('declares exactly 50 unique families with honest future execution status and valid fixture links', () => {
    expect(scenarioFamilies).toHaveLength(50); expect(new Set(scenarioFamilies.map(s => s.id)).size).toBe(50);
    for (const scenario of scenarioFamilies) {
      expect(scenario.execution).toContain('SPECIFIED_ONLY'); expect(scenario.expected.length).toBeGreaterThan(0);
      if (scenario.fixtureRef.startsWith('ready.')) expect(Object.hasOwn(readyResults, scenario.fixtureRef.slice(6))).toBe(true);
      if (scenario.fixtureRef.startsWith('empty.')) expect(Object.hasOwn(emptyResults, scenario.fixtureRef.slice(6))).toBe(true);
    }
    expect(scenarioFamilies.some(s => s.id === 'F-RESULT-CORRELATION')).toBe(true);
    expect(scenarioFamilies.some(s => s.id === 'F-ARTIFACT-NAMESPACE')).toBe(true);
  });
  it('retains 94 symbolic request specifications and capacity arithmetic without claiming HTTP proof', () => {
    expect(artifactRequestMatrix).toHaveLength(94); expect(new Set(artifactRequestMatrix.map(row => row.id)).size).toBe(94);
    expect(artifactRequestMatrix.every(row => row.future_proof_gate.includes('NOT RUN'))).toBe(true);
    expect(artifactCapacity.fixedRules + artifactCapacity.rulesPerDetail * artifactCapacity.maximumDetails).toBe(1997);
    expect(artifactCapacity.fixedRules + artifactCapacity.rulesPerDetail * artifactCapacity.firstRejectedDetails).toBeGreaterThan(2000);
  });
  it('keeps the six contract modules type-only with acyclic ownership and no source imports', () => {
    const modules = ['values', 'media', 'rich-text', 'domain', 'pages', 'boundary'];
    for (const [index, name] of modules.entries()) {
      const code = readFileSync(resolve(root, `src/content/portfolio/contracts/${name}.ts`), 'utf8');
      expect(code).not.toMatch(/^(?:export )?(?:function|class|const|let|var)\b/m);
      for (const match of code.matchAll(/^import\s+(.*?)from\s+['"]\.\/(.*?)['"]/gm)) {
        expect(match[1]?.startsWith('type ')).toBe(true);
        expect(modules.indexOf(match[2] ?? '')).toBeLessThan(index);
      }
      expect(code).not.toMatch(/process\.env|fetch\(|loadEnv|dotenv|source-fixtures/);
    }
    const expected = readFileSync(resolve(root, 'src/data/portfolio/normalized-fixtures.ts'), 'utf8');
    expect(expected).not.toMatch(/from ['"].*(?:source-fixtures|contentful-greenfield-starter|normalize|assemble)/);
  });
});

// Compile-time witnesses for optional fields and policy-specific blocks.
export type OptionalityWitnesses = [ProfileView['publicEmail'], ProjectDetail['projectStatus'], ArticleDetail['category'], ExperienceView['currentRole'], Block<'body'>];

describe('Q2 synthetic Rich Text support vocabulary', () => {
  it('preserves all seven supported standard/simple marks and explicit structural examples', () => {
    expect(sourceMarkExamples.map(node => ({ text: node.value, marks: node.marks.map(mark => mark.type) }))).toEqual(normalizedMarkExamples.map(({ text, marks }) => ({ text, marks })));
    expect(normalizedMarkExamples.flatMap(node => node.marks)).toEqual(['bold', 'italic', 'underline', 'code', 'superscript', 'subscript', 'strikethrough']);
    expect(sourceStructureExamples.flatMap(sourceTextRuns)).toEqual(normalizedTextRuns(normalizedStructureExamples.blocks.filter(block => block.kind !== 'figure' && block.kind !== 'attachment')));
    expect(normalizedStructureExamples.blocks.map(block => block.kind)).toEqual(['heading', 'heading', 'quote', 'list', 'list', 'figure', 'attachment']);
    expect(Object.keys(sourceRichTextNegativeExamples)).toHaveLength(7);
  });
});

describe('Q2 simulated context and metadata evidence', () => {
  it('binds all 50 records to explicitly simulated revision facts and reviewed field provenance', () => {
    expect(simulatedRevisionFacts.representativeDraft).toHaveLength(50);
    expect(simulatedRevisionFacts.publicEligible).toHaveLength(50);
    expect(simulatedRevisionFacts.representativeDraft.every(f => f.publication === 'draft')).toBe(true);
    expect(simulatedRevisionFacts.publicEligible.every(f => f.publication === 'published-revision')).toBe(true);
    expect(new Set(simulatedRevisionFacts.publicEligible.map(f => f.id)).size).toBe(50);
    expect(sourceFixtureContexts.trustedPreview.access).toBe('SIMULATED_ONLY_NOT_AUTH_CAPABILITY');
    expect(sourceFixtureContexts.publicEligible.simulation).toBe(true);
    expect(sourceFixtureContextPolicy.reviewedAccessibility).toHaveLength(8);
    expect(sourceFixtureContextPolicy.employmentPrecision).toHaveLength(4);
    for (const image of fixtureImages) {
      expect(sourceFixtureContextPolicy.reviewedAccessibility.find(a => a.id === image.id)?.text).toBe(image.accessibility.alt);
    }
  });
  it('checks a reserved-host release expectation separately from all offline page results', () => {
    expect(offlineReleaseMetadataExpectation.canonical).toBe('https://example.test' + projects[0].href);
    expect(offlineReleaseMetadataExpectation.openGraph.url).toBe(offlineReleaseMetadataExpectation.canonical);
    expect(offlineReleaseMetadataExpectation.robots).toBe('index,follow');
    expect(offlineReleaseMetadataExpectation.sitemapEligible).toBe(true);
    for (const page of Object.values(readyResults)) expect(page.metadata).not.toHaveProperty('canonical');
  });
});

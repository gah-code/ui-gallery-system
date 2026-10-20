import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import type { Id, Path } from './contracts/values';
import type { ImageView } from './contracts/media';
import type { AssembleRoute, NormalizeSource, PortfolioGraph, PublicNormalizationContext, PublicPageContext, RevisionEligibility, RouteParseResult, TrustedPreviewNormalizationContext, TrustedPreviewPageContext, ValidatedPreviewAccess } from './contracts/boundary';
import type { MatchedRoute, PublicResultByRoute, PublicRouteResult, TrustedPreviewResultByRoute } from './contracts/pages';
import { normalizeSource } from './source';
import { assembleRoute, safeDiagnostics } from './assemble';
import { artifactManifest, eligibleRoutes, parseRoute } from './routes';
import { articlePath, artifactIdentity, assetUrl, decodeArtifact, projectPath, slug, staticPaths } from './urls';
import { detailBreadcrumbs } from './metadata';
import { representativeEntries, representativeAssets, sourceFixtureContextPolicy, simulatedRevisionFacts } from '../../data/portfolio/source-fixtures';
import { readyResults, routes, emptyResults, homeError, projectMissing, previewProject, previewArticle, offlineReleaseMetadataExpectation } from '../../data/portfolio/normalized-fixtures';
import { fixtureId, fixtureNonEmptyText, fixtureImages, assetResumePublic, assetSiteSocialDefault, fixtureHttps } from '../../data/portfolio/media';
import { artifactRequestMatrix, scenarioFamilies } from '../../data/portfolio/scenarios';

function rec(value: unknown): Record<string,unknown> { if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected object'); return Object.fromEntries(Object.entries(value)); }
function context(): PublicNormalizationContext {
  return {audience:'PUBLIC',policy:{locale:'en-US',articlePrecision:'day',sourceComparison:'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',reviewedAccessibility:new Map<Id,ImageView['accessibility']>(sourceFixtureContextPolicy.reviewedAccessibility.map(a => [fixtureId(a.id),{kind:'meaningful',alt:fixtureNonEmptyText(a.text)}])),employmentPrecision:new Map(sourceFixtureContextPolicy.employmentPrecision.map(p => [fixtureId(p.id),'month' as const]))},revisionFacts:new Map<Id,RevisionEligibility>(simulatedRevisionFacts.publicEligible.map(f => [fixtureId(f.id),{revision:fixtureId(f.revision),publication:f.publication,publicSafety:f.publicSafety}]))};
}
function snapshot(entries: readonly unknown[] = representativeEntries) {
  const revision = (input: unknown) => { const r = rec(input), sys = rec(r.sys); return {...r,sys:{...sys,revisionId:`simulation-revision-${String(sys.id)}`}}; };
  return {kind:'portfolio-offline-snapshot',completeness:'COMPLETE',entries:entries.map(revision),assets:representativeAssets.map(revision)};
}
function field(entries: readonly unknown[], identity: string, name: string, value: unknown): unknown[] { return entries.map(entry => { const r = rec(entry); if (rec(r.sys).id !== identity) return entry; const fields = {...rec(r.fields)}; if (value === undefined) delete fields[name]; else fields[name] = {'en-US':value}; return {...r,fields}; }); }
function first(type: string) { const r = representativeEntries.find(e => e.sys.contentType.sys.id === type); if (!r) throw new Error('Fixture type absent'); return r; }
function good(input: unknown = snapshot(), c = context()) { const result = normalizeSource(input,c); if (!result.ok) throw new Error(JSON.stringify(result.diagnostics)); return result.graph; }
const offline: PublicPageContext = {audience:'PUBLIC',mode:'offline-demo',policy:{locale:'en-US',selectionAndOrder:'SECTION_5_INITIAL_POLICY',intentionallyPublicEmptyRoutes:[]}};
const defaultImage = {...assetSiteSocialDefault,src:assetUrl('https://assets.example.test/default-social-image.png')};
const release: PublicPageContext = {...offline,mode:'release',policy:{...offline.policy,siteOrigin:fixtureHttps('https://example.test'),defaultSocialImage:defaultImage}};
function publication(types: readonly string[], state: RevisionEligibility['publication'] = 'draft'): PublicNormalizationContext {
  const c = context(); const ids = new Set<string>(representativeEntries.filter(e => types.includes(e.sys.contentType.sys.id)).map(e => e.sys.id));
  return {...c,revisionFacts:new Map([...c.revisionFacts].map(([id,f]) => [id,ids.has(id) ? {...f,publication:state} : f]))};
}
/** Private test double for a caller that already authenticated. This is NOT an authentication proof. */
function callerValidatedPreviewTestDouble(): ValidatedPreviewAccess {
  const value = {subject:fixtureId('synthetic-test-reviewer'),scope:'portfolio-preview' as const};
  if (!value.subject || value.scope !== 'portfolio-preview') throw new Error('Invalid test double');
  return value as ValidatedPreviewAccess;
}
const previewAccess = callerValidatedPreviewTestDouble();
const previewPage: TrustedPreviewPageContext = {audience:'TRUSTED_PREVIEW',mode:'trusted-preview',policy:offline.policy,access:previewAccess};
function previewGraph(input: unknown = snapshot()) {
  const c: TrustedPreviewNormalizationContext = {...context(),audience:'TRUSTED_PREVIEW',access:previewAccess,revisionFacts:new Map(simulatedRevisionFacts.representativeDraft.map(f => [fixtureId(f.id),{revision:fixtureId(f.revision),publication:f.publication,publicSafety:f.publicSafety}]))};
  const r = normalizeSource(input,c); if (!r.ok) throw new Error(JSON.stringify(r.diagnostics)); return r.graph;
}
const transport = new Map([
  ['seed05-asset-profile-portrait','https://assets.example.test/gilberto-haro-profile-portrait.jpg'],['seed05-asset-resume-public','https://assets.example.test/gilberto-haro-resume.pdf'],
  ['seed05-asset-project-enterprise-cms-migration','https://assets.example.test/enterprise-cms-migration.png'],['seed05-asset-project-contentful-greenfield-starter','https://assets.example.test/contentful-greenfield-starter.png'],
  ['seed05-asset-project-ui-gallery-system','https://assets.example.test/ui-gallery-system.png'],['seed05-asset-project-system-diagram','https://assets.example.test/content-migration-workflow.png'],
  ['seed05-asset-article-learning-journey','https://assets.example.test/web-development-learning-journey.png'],['seed05-asset-site-social-default','https://assets.example.test/default-social-image.png'],
]);
function bridge(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(bridge); if (!value || typeof value !== 'object') return value;
  const r = rec(value), out = Object.fromEntries(Object.entries(r).map(([k,v]) => [k,bridge(v)]));
  if (typeof r.id === 'string' && transport.has(r.id)) {
    if ('src' in r) { expect(r.src).toBe(fixtureImages.find(i => i.id === r.id)?.src); out.src = transport.get(r.id); }
    if ('href' in r) { expect(r.id).toBe(assetResumePublic.id); expect(r.href).toBe(assetResumePublic.href); out.href = transport.get(r.id); }
  }
  return out;
}
function noRaw(value: unknown): void {
  if (Array.isArray(value)) { value.forEach(noRaw); return; } if (!value || typeof value !== 'object') return;
  expect(value).not.toBeInstanceOf(Map);
  for (const [k,v] of Object.entries(value)) {
    if (k === 'policy') { expect(['body','simple','profile-long']).toContain(v); expect(Object.keys(value).sort()).toEqual(['blocks','policy']); expect(Array.isArray(rec(value).blocks)).toBe(true); }
    expect(['sys','fields','en-US','includes','nodeType','revision','revisionFacts','eligibility','access','sourceComparison','publication','publicSafety']).not.toContain(k); noRaw(v);
  }
}

const normalizerWitness: NormalizeSource = normalizeSource;
const assemblerWitness: AssembleRoute = assembleRoute;
const parserWitness: (input: unknown) => RouteParseResult = parseRoute;
function projectResultWitness(graph: PortfolioGraph<'PUBLIC'>) { return assembleRoute(routes.project,graph,offline); }
function articleResultWitness(graph: PortfolioGraph<'PUBLIC'>) { return assembleRoute(routes.article,graph,offline); }
function previewResultWitness(graph: PortfolioGraph<'TRUSTED_PREVIEW'>) { return assembleRoute(routes.project,graph,previewPage); }
type Assignable<A,B> = [A] extends [B] ? true : false;
type False<T extends false> = T;
type True<T extends true> = T;
export type ActualApiWitnesses = [True<Assignable<ReturnType<typeof projectResultWitness>,PublicResultByRoute['project']>>,False<Assignable<ReturnType<typeof projectResultWitness>,PublicResultByRoute['article']>>,True<Assignable<ReturnType<typeof articleResultWitness>,PublicResultByRoute['article']>>,True<Assignable<ReturnType<typeof previewResultWitness>,TrustedPreviewResultByRoute['project']>>,False<Assignable<ReturnType<typeof previewResultWitness>,PublicRouteResult>>];

describe('Q3 page assembly', () => {
  it.each(Object.values(routes))('[F-HOME F-ABOUT F-WORK F-PROJECTS F-PROJECT F-WRITING F-ARTICLE F-TOOLS F-CONTACT F-RAW-BOUNDARY] matches independent nine-route fixture $route', route => {
    const g = good(), result = assembleRoute(route,g,offline); expect(result).toEqual(bridge(readyResults[route.route])); noRaw(result); expect(assembleRoute(route,g,offline)).toEqual(result);
    const parsed = parseRoute(route.path); expect(parsed).toEqual({kind:'MATCHED',match:route}); if (parsed.kind === 'MATCHED') expect(assembleRoute(parsed.match,g,offline)).toEqual(result);
  });
  it.each([['work','experienceItem'],['projects','project'],['writing','article'],['tools','tool']] as const)('[F-EMPTY-WORK F-EMPTY-PROJECTS F-EMPTY-WRITING F-EMPTY-TOOLS] resolves %s EMPTY only from complete source', (route,type) => {
    const g = good(snapshot(),publication([type])); const result = assembleRoute(routes[route],g,offline); expect(result).toEqual(bridge(emptyResults[route])); expect(result.metadata).not.toHaveProperty('canonical'); noRaw(result);
    const releaseEmpty = assembleRoute(routes[route],g,{...release,policy:{...release.policy,intentionallyPublicEmptyRoutes:[route]}}); expect(releaseEmpty.state).toBe('EMPTY'); expect(releaseEmpty.metadata).toMatchObject({robots:'noindex,follow',sitemapEligible:false,canonical:`https://example.test${routes[route].path}`}); expect(releaseEmpty.metadata).not.toHaveProperty('openGraph');
  });
  it('[F-HOME-NOPROOF F-CONTACT-NONE F-SINGLETON] fails readiness without proof/contact or unambiguous eligible singletons', () => {
    expect(assembleRoute(routes.home,good(snapshot(),publication(['project','article','experienceItem'])),offline)).toEqual(homeError);
    const entries = field(representativeEntries,first('personProfile').sys.id,'socialLinks',[]); expect(assembleRoute(routes.contact,good(snapshot(entries)),offline).state).toBe('ERROR');
    for (const type of ['siteSettings','personProfile']) {
      const c = context(), original = first(type), extra = {...original,sys:{...original.sys,id:`synthetic-extra-${type}`}}, facts = new Map(c.revisionFacts); facts.set(fixtureId(extra.sys.id),{revision:fixtureId(`simulation-revision-${extra.sys.id}`),publication:'published-revision',publicSafety:'approved'});
      expect(assembleRoute(routes.home,good(snapshot([...representativeEntries,extra]),{...c,revisionFacts:facts}),offline)).toEqual(homeError);
    }
    expect(assembleRoute(routes.home,good(snapshot(),publication(['siteSettings'])),offline)).toEqual(homeError);
    expect(assembleRoute(routes.home,good(snapshot(),publication(['personProfile','article'])),offline)).toEqual(homeError);
  });
  it('[F-SLUG F-DRAFT F-PUBLICATION] keeps unknown/stale/draft/archived details indistinguishable and private', () => {
    for (const state of ['draft','archived'] as const) {
      const g = good(snapshot(),publication(['project'],state)); const missing = assembleRoute(routes.project,g,offline); expect(missing).toEqual(projectMissing);
      expect(eligibleRoutes(g).some(p => p.startsWith('/projects/'))).toBe(false); expect(JSON.stringify(missing.diagnostics)).not.toMatch(/seed05|draft|fields|revision/);
    }
    for (const value of ['unknown','stale']) { const parsed = parseRoute(`/projects/${value}`); if (parsed.kind !== 'MATCHED') throw new Error('Expected match'); expect(assembleRoute(parsed.match,good(),offline).state).toBe('MISSING'); }
    const c = publication(['project']); let entries = field(representativeEntries,first('project').sys.id,'projectStatus','completed'); entries = field(entries,first('article').sys.id,'publishDate','2020-01-01'); expect(assembleRoute(routes.project,good(snapshot(entries),c),offline).state).toBe('MISSING');
  });
  it('[F-PREVIEW-NEW F-RESULT-CORRELATION] exercises an explicitly private caller-validated preview test double', () => {
    const graph = previewGraph(); expect(assembleRoute(routes.project,graph,previewPage)).toEqual(bridge(previewProject)); expect(assembleRoute(routes.article,graph,previewPage)).toEqual(bridge(previewArticle));
    expect(assembleRoute(routes.about,graph,previewPage)).toMatchObject({state:'READY',audience:'TRUSTED_PREVIEW',metadata:{cacheControl:'no-store',robots:'noindex,nofollow',sitemapEligible:false}});
    const entries = field(representativeEntries,first('project').sys.id,'slug','new-draft-slug'); const parsed = parseRoute('/projects/new-draft-slug'); if (parsed.kind !== 'MATCHED') throw new Error('Expected match');
    const out = assembleRoute(parsed.match,previewGraph(snapshot(entries)),previewPage); expect(out.state).toBe('DRAFT_PREVIEW'); expect(out.metadata).not.toHaveProperty('canonical'); noRaw(out);
    expect(eligibleRoutes(good(snapshot(entries),publication(['project'])))).not.toContain('/projects/new-draft-slug');
    for (const bad of [undefined,'SIMULATED_ONLY_NOT_AUTH_CAPABILITY',{subject:'test',scope:'wrong'}]) {
      const invalid = {...context(),audience:'TRUSTED_PREVIEW',access:bad} as unknown as TrustedPreviewNormalizationContext;
      expect(normalizeSource(snapshot(),invalid).ok).toBe(false);
      expect(assembleRoute(routes.project,graph,{...previewPage,access:bad} as TrustedPreviewPageContext).state).toBe('ERROR');
    }
  });
  it.each(['sample','404','index'])('[F-SLUG-CROSS-TYPE] independently resolves equal legal %s slugs in both types', value => {
    let entries = field(representativeEntries,first('project').sys.id,'slug',value); entries = field(entries,first('article').sys.id,'slug',value); const g = good(snapshot(entries));
    const p = {route:'project',path:projectPath(slug(value)),slug:slug(value)} as const, a = {route:'article',path:articlePath(slug(value)),slug:slug(value)} as const;
    const pr = assembleRoute(p,g,release), ar = assembleRoute(a,g,release); expect(pr.state).toBe('READY'); expect(ar.state).toBe('READY'); expect(pr.metadata.canonical).toBe(`https://example.test/projects/${value}`); expect(ar.metadata.canonical).toBe(`https://example.test/writing/${value}`); expect(artifactIdentity(p.path).file).not.toBe(artifactIdentity(a.path).file);
  });
  it.each(['project','article'])('[F-SLUG-DUPLICATE] rejects duplicate slugs within %s', type => {
    const matching = representativeEntries.filter(e => e.sys.contentType.sys.id === type); const [a,b] = matching; if (!a || !b) throw new Error('Fixtures missing');
    const result = normalizeSource(snapshot(field(representativeEntries,b.sys.id,'slug',rec(rec(a.fields).slug)['en-US'])),context()); expect(result.ok).toBe(false); expect(result.diagnostics[0]?.code).toBe('SLUG_AMBIGUOUS');
  });
  it('[F-ORDER] sorts collections and reverse proof deterministically while preserving authored sequences', () => {
    const forward = good(), reversed = good(snapshot([...representativeEntries].reverse())); for (const route of Object.values(routes)) expect(assembleRoute(route,reversed,offline)).toEqual(assembleRoute(route,forward,offline));
    const skills = representativeEntries.filter(e => e.sys.contentType.sys.id === 'skill').slice(0,2); const [one,two] = skills; if (!one || !two) throw new Error('Missing skills');
    const target = first('skillGroup'); const entries = field(representativeEntries,target.sys.id,'skills',[{sys:{type:'Link',linkType:'Entry',id:two.sys.id}},{sys:{type:'Link',linkType:'Entry',id:one.sys.id}}]); expect(good(snapshot(entries)).records.groups.get(fixtureId(target.sys.id))?.skills.map(s => s.id)).toEqual([two.sys.id,one.sys.id]);
    const workId = first('experienceItem').sys.id; let changed = field(representativeEntries,workId,'endDate',undefined); changed = field(changed,workId,'isCurrentRole',true); const work = assembleRoute(routes.work,good(snapshot(changed)),offline); expect(work.state).toBe('READY'); if (work.state === 'READY') expect(work.data.experiences[0].id).toBe(workId);
  });
  it('[F-SEO F-SEO-CONFIG] composes exact release fallback chains and fails closed on absent configuration', () => {
    const g = good(); expect(assembleRoute(routes.project,g,release).metadata).toEqual(bridge(offlineReleaseMetadataExpectation));
    for (const mode of [offline,release]) { const out = assembleRoute(routes.article,g,mode); expect(out.state).toBe('READY'); if (out.state === 'READY' && out.metadata.mode === 'release') expect(out.metadata.openGraph.type).toBe('article'); }
    let entries = field(representativeEntries,readyResults.project.data.project.id,'seoTitle','Editorial override'); entries = field(entries,readyResults.project.data.project.id,'seoDescription','Editorial description'); entries = field(entries,readyResults.project.data.project.id,'socialImage',{sys:{type:'Link',linkType:'Asset',id:assetSiteSocialDefault.id}});
    const override = assembleRoute(routes.project,good(snapshot(entries)),release); expect(override.metadata).toMatchObject({title:'Editorial override | Gilberto Haro',description:'Editorial description',openGraph:{image:defaultImage}});
    entries = field(entries,readyResults.project.data.project.id,'seoTitle','  '); entries = field(entries,readyResults.project.data.project.id,'seoDescription',''); expect(assembleRoute(routes.project,good(snapshot(entries)),release).metadata.title).toBe(readyResults.project.metadata.title);
    expect(assembleRoute(routes.article,g,release).metadata).toMatchObject({openGraph:{image:defaultImage}});
    for (const policy of [offline.policy,{...release.policy,siteOrigin:fixtureHttps('https://example.test/preview')},{...release.policy,defaultSocialImage:undefined}]) expect(assembleRoute(routes.home,g,{...release,policy} as PublicPageContext)).toEqual(homeError);
    const bc = detailBreadcrumbs(routes.project,readyResults.project.data.project.title); expect(bc.map(b => b.href)).toEqual(['/','/projects',routes.project.path]);
    expect(assembleRoute(routes.project,g,offline).metadata.breadcrumbs).toEqual([]); // Visible breadcrumb UI remains deferred, matching the frozen oracle.
  });
  it('[F-RESULT-CORRELATION F-RAW-BOUNDARY F-MEDIA-LOAD] exercises actual API witnesses and the closed diagnostic projection', () => {
    expect(normalizerWitness(snapshot(),context()).ok).toBe(true); const g = good(); expect(assemblerWitness(routes.home,g,offline).route).toBe('home'); expect(parserWitness('/').kind).toBe('MATCHED'); expect(projectResultWitness(g).route).toBe('project'); expect(articleResultWitness(g).route).toBe('article'); expect(previewResultWitness(previewGraph()).audience).toBe('TRUSTED_PREVIEW');
    expect(safeDiagnostics('MEDIA')).toEqual([{code:'MEDIA_UNAVAILABLE',message:'This media is unavailable.'}]); // Actual image-load UI requires 06.4/browser proof.
    const wrongSlug: MatchedRoute = {route:'project',path:routes.project.path,slug:slug('different')}; expect(assembleRoute(wrongSlug,g,offline).state).toBe('ERROR');
    for (const state of ['EMPTY','MISSING','ERROR','MEDIA'] as const) noRaw(safeDiagnostics(state));
  });
});

describe('Q3 paths and pure R1 intents; no HTTP proof', () => {
  it.each(['','projects/a','//projects/a','/projects/','/projects/A','/projects/a_b','/projects/a/b','/projects/%2f','/projects/%252f','/projects/..','/projects/a\\b','/projects/a\0','/projects/a.html','/projects/a/','/unknown-page','/tools/tool'])('[F-SLUG F-PATH-HTTP] rejects unsupported observable path %j', path => { expect(parseRoute(path)).toEqual({kind:'UNMATCHED',reason:'PATH_NOT_SUPPORTED'}); });
  it('[F-SLUG F-PATH-HTTP] tracking queries and fragments neither change canonical identity nor grant preview', () => {
    expect(parseRoute('/projects/sample?preview=true#section')).toEqual(parseRoute('/projects/sample')); const p = parseRoute(`${routes.project.path}?preview=true`); if (p.kind !== 'MATCHED') throw new Error('Expected match'); expect(assembleRoute(p.match,good(snapshot(),publication(['project'])),offline).state).toBe('MISSING');
  });
  it('[F-ARTIFACT-NAMESPACE] encodes the full canonical ASCII path reversibly with canonical 64-hex chunks', () => {
    for (const path of [...Object.values(staticPaths),...['sample','404','index','a'.repeat(80)].flatMap(s => [projectPath(slug(s)),articlePath(slug(s))])]) {
      const i = artifactIdentity(path); expect(decodeArtifact(i.internal)).toBe(path); expect(i.file).toBe(`dist-portfolio${i.internal}.html`); expect(i.internal).toMatch(/^\/_portfolio-docs\/(?:d-[a-f0-9]{2,64}\/)+page$/); expect(i.file).not.toMatch(/\/(?:404|index)\.html$/);
    }
    for (const malformed of ['/_portfolio-docs/d-2F/page','/_portfolio-docs/d-2/page','/_portfolio-docs/d-2f/d-61/page','/_portfolio-docs/d-2f626164/page']) expect(() => decodeArtifact(malformed)).toThrow();
  });
  it('[F-ARTIFACT-NAMESPACE F-PATH-HTTP] checks all 94 frozen symbolic rule intentions without serving requests', () => {
    expect(artifactRequestMatrix).toHaveLength(94); const fixed = Object.values(staticPaths);
    const details = ['sample','404','index'].flatMap(s => [projectPath(slug(s)),articlePath(slug(s))]);
    const full = artifactManifest([...fixed,...details]); const removed = artifactManifest([...fixed,projectPath(slug('sample')),articlePath(slug('sample'))]);
    for (const row of artifactRequestMatrix) {
      const m = row.scenario.startsWith('alternate manifest:') ? removed : full; const rule = m.rules.find(r => r.from === row.request);
      expect(rule?.status ?? 404,row.id).toBe(row.status_intent); expect(rule?.status === 308 ? rule.to : null,row.id).toBe(row.location);
      if (rule?.status === 200) expect(`${rule.to.slice(1)}.html`,row.id).toBe(row.physical_artifact);
    }
  });
  it('[F-ARTIFACT-NAMESPACE] enforces 41 + 6N capacity, line length, collisions and complete static membership', () => {
    const fixed = Object.values(staticPaths), paths: Path[] = Array.from({length:326},(_,i) => projectPath(slug(`synthetic-${i}`)));
    expect(artifactManifest([...fixed,...paths]).ruleCount).toBe(1997); expect(() => artifactManifest([...fixed,...paths,projectPath(slug('one-more'))])).toThrow(); expect(() => artifactManifest([...fixed,projectPath(slug('a'.repeat(600)))])).toThrow(); expect(() => artifactManifest([...fixed,'/'])).toThrow(); expect(() => artifactManifest(['/'])).toThrow();
    const g = good(snapshot(),publication(['project'])); const manifest = artifactManifest(eligibleRoutes(g)); expect(manifest.documents.some(d => d.canonical.startsWith('/projects/'))).toBe(false);
  });
  it('[F-RAW-BOUNDARY F-PRESERVE-UI] retains pure production imports and the frozen scenario inventory', () => {
    expect(scenarioFamilies).toHaveLength(50);
    for (const file of ['source','resolve','normalize','rich-text','urls','routes','metadata','assemble']) {
      const source = readFileSync(new URL(`./${file}.ts`,import.meta.url),'utf8');
      expect(source).not.toMatch(/from ['"][^'"]*(?:data\/portfolio|stories|\.test|node:|contentful)/); expect(source).not.toMatch(/\b(?:fetch|XMLHttpRequest|localStorage|sessionStorage)\s*\(|process\.env|Date\.now|Math\.random/);
      expect(source).not.toMatch(/\bany\b|@ts-ignore|@ts-nocheck|eslint-disable/);
    }
  });
});

describe('I-063-01 release social-image boundary', () => {
  it('[F-SEO F-RAW-BOUNDARY] projects all valid required and optional default-image values', () => {
    const result = assembleRoute(routes.home,good(),release);
    expect(result.state).toBe('READY');
    if (result.state !== 'READY' || result.metadata.mode !== 'release') throw new Error('Expected release READY');
    const image = result.metadata.openGraph.image;
    expect(image).toEqual(defaultImage);
    expect(Object.keys(image).sort()).toEqual(['accessibility','description','height','id','mime','src','title','width']);
    expect(Object.keys(image.accessibility).sort()).toEqual(['alt','kind']);
    expect(image).not.toBe(defaultImage);
    expect(image.accessibility).not.toBe(defaultImage.accessibility);
    noRaw(result);
  });
  it('[F-SEO] keeps optional default-image title and description absent', () => {
    const image = {id:defaultImage.id,src:defaultImage.src,mime:defaultImage.mime,width:defaultImage.width,height:defaultImage.height,accessibility:{kind:'meaningful',alt:defaultImage.accessibility.alt}} as const;
    const result = assembleRoute(routes.home,good(),{...release,policy:{...release.policy,defaultSocialImage:image}});
    expect(result.state).toBe('READY');
    if (result.state !== 'READY' || result.metadata.mode !== 'release') throw new Error('Expected release READY');
    expect(result.metadata.openGraph.image).toEqual(image);
    expect(Object.keys(result.metadata.openGraph.image).sort()).toEqual(['accessibility','height','id','mime','src','width']);
    expect(Object.keys(result.metadata.openGraph.image.accessibility).sort()).toEqual(['alt','kind']);
    noRaw(result);
  });
  it('[F-RAW-BOUNDARY] projects typed enriched image and accessibility without mutation or aliasing', () => {
    // Structural subtyping is legitimate public API input: no malformed-input cast here.
    const extras = Object.freeze({sys:Object.freeze({id:'private-source-id'}),fields:Object.freeze({'en-US':'private-field'}),'en-US':'private-locale',includes:Object.freeze([]),revisionFacts:'private-revision',internalContext:'private-context',arbitraryPrivateKey:'private-extra'});
    const accessibility = Object.freeze({...defaultImage.accessibility,...extras});
    const image = Object.freeze({...defaultImage,...extras,accessibility});
    const policy = Object.freeze({...release.policy,defaultSocialImage:image,internalContext:'private-policy'});
    const page: PublicPageContext = Object.freeze({...release,policy});
    const before = structuredClone(page), graph = good();
    const firstResult = assembleRoute(routes.home,graph,page), secondResult = assembleRoute(routes.home,graph,page);
    expect(firstResult.state).toBe('READY'); expect(secondResult).toEqual(firstResult);
    if (firstResult.state !== 'READY' || firstResult.metadata.mode !== 'release' || secondResult.state !== 'READY' || secondResult.metadata.mode !== 'release') throw new Error('Expected release READY');
    for (const result of [firstResult,secondResult]) {
      if (result.metadata.mode !== 'release') throw new Error('Expected release metadata');
      const output = result.metadata.openGraph.image;
      expect(output).toEqual(defaultImage);
      expect(Object.keys(output).sort()).toEqual(['accessibility','description','height','id','mime','src','title','width']);
      expect(Object.keys(output.accessibility).sort()).toEqual(['alt','kind']);
      expect(output).not.toBe(image); expect(output.accessibility).not.toBe(accessibility);
      noRaw(result);
    }
    expect(firstResult.metadata.openGraph.image).not.toBe(secondResult.metadata.openGraph.image);
    expect(firstResult.metadata.openGraph.image.accessibility).not.toBe(secondResult.metadata.openGraph.image.accessibility);
    expect(page).toEqual(before); expect(page.policy).toBe(policy); expect(policy.defaultSocialImage).toBe(image); expect(image.accessibility).toBe(accessibility);
  });
  const missingId = Object.fromEntries(Object.entries(defaultImage).filter(([key]) => key !== 'id'));
  const malformed: readonly (readonly [string,unknown])[] = [
    ['missing id',missingId],
    ...[['undefined',undefined],['blank',''],['whitespace',' \t '],['null',null],['numeric',42],['object',{}],['control','bad\nid']].map(([label,value]) => [`${label} id`,{...defaultImage,id:value}] as const),
    ...['title','description'].flatMap(key => [['null',null],['array',[]],['object',{privateValue:'private-known-field'}],['blank',''],['whitespace',' \t '],['numeric',42]].map(([label,value]) => [`${label} ${key}`,{...defaultImage,[key]:value}] as const)),
    ...[['zero width',0],['negative width',-1],['fractional width',1.5],['NaN width',NaN],['infinite width',Infinity],['unsafe width',Number.MAX_SAFE_INTEGER+1]].map(([label,value]) => [String(label),{...defaultImage,width:value}] as const),
    ['zero height',{...defaultImage,height:0}], ['string height',{...defaultImage,height:'1200'}],
    ['unsupported MIME',{...defaultImage,mime:'application/pdf'}], ['missing MIME',{...defaultImage,mime:undefined}],
    ['null image',null], ['array image',[]], ['string image','private-image'],
    ['null accessibility',{...defaultImage,accessibility:null}], ['array accessibility',{...defaultImage,accessibility:[]}], ['missing accessibility',{...defaultImage,accessibility:undefined}],
    ['decorative accessibility',{...defaultImage,accessibility:{kind:'decorative',alt:''}}],
    ['blank alt',{...defaultImage,accessibility:{kind:'meaningful',alt:' \t '}}], ['numeric alt',{...defaultImage,accessibility:{kind:'meaningful',alt:42}}], ['missing alt',{...defaultImage,accessibility:{kind:'meaningful'}}],
    ['HTTP src',{...defaultImage,src:'http://assets.example.test/private-image.png'}], ['relative src',{...defaultImage,src:'/private-image.png'}], ['script src',{...defaultImage,src:'javascript:private-image'}],
  ];
  it.each(malformed)('[F-SEO-CONFIG F-RAW-BOUNDARY] rejects %s with a closed safe ERROR', (_label,image) => {
    // Deliberately malformed runtime value crosses the typed API only in this negative test.
    const page = {...release,policy:{...release.policy,defaultSocialImage:image}} as unknown as PublicPageContext;
    const before = structuredClone(page);
    const result = assembleRoute(routes.home,good(),page);
    expect(result).toEqual(homeError);
    expect(result.metadata).not.toHaveProperty('openGraph'); expect(result.metadata).not.toHaveProperty('canonical');
    expect(result).not.toHaveProperty('data'); expect(result).not.toHaveProperty('chrome');
    expect(result.diagnostics).toEqual([{code:'CONTENT_UNAVAILABLE',message:'Content is unavailable.'}]);
    noRaw(result); expect(page).toEqual(before);
  });
  it.each(['https://assets.example.test/correction.png','//assets.example.test/correction.png'])('[F-SEO F-RAW-BOUNDARY] emits validated HTTPS for %s without changing input', src => {
    // Protocol-relative source deliberately models unvalidated runtime input to the typed policy.
    const image = Object.freeze({...defaultImage,src,accessibility:Object.freeze({...defaultImage.accessibility})});
    const page = {...release,policy:{...release.policy,defaultSocialImage:image}} as unknown as PublicPageContext;
    const before = structuredClone(page), graph = good();
    const result = assembleRoute(routes.home,graph,page);
    expect(result.state).toBe('READY');
    if (result.state !== 'READY' || result.metadata.mode !== 'release') throw new Error('Expected release READY');
    expect(result.metadata.openGraph.image).toEqual({...defaultImage,src:'https://assets.example.test/correction.png'});
    expect(result.metadata.openGraph.image).not.toBe(image); expect(result.metadata.openGraph.image.accessibility).not.toBe(image.accessibility);
    expect(assembleRoute(routes.home,graph,page)).toEqual(result); expect(page).toEqual(before); expect(image.src).toBe(src); noRaw(result);
  });
  it('[F-SEO F-SEO-CONFIG] preserves Project and Article override then hero then default precedence', () => {
    for (const route of [routes.project,routes.article]) {
      const target = readyResults[route.route].data;
      const detailId = 'project' in target ? target.project.id : target.article.id;
      const heroId = readyResults.project.data.project.heroImage.id;
      let entries = field(representativeEntries,detailId,'heroImage',{sys:{type:'Link',linkType:'Asset',id:heroId}});
      entries = field(entries,detailId,'socialImage',{sys:{type:'Link',linkType:'Asset',id:defaultImage.id}});
      const overrideGraph = good(snapshot(entries));
      const override = assembleRoute(route,overrideGraph,release);
      expect(override.state).toBe('READY'); expect(override.metadata).toMatchObject({openGraph:{image:defaultImage}}); noRaw(override);
      entries = field(entries,detailId,'socialImage',undefined);
      const hero = assembleRoute(route,good(snapshot(entries)),release);
      expect(hero.state).toBe('READY'); expect(hero.metadata).toMatchObject({openGraph:{image:{id:heroId}}}); noRaw(hero);
      // A valid editorial override or hero must not mask invalid mandatory site policy.
      const invalid = {...release,policy:{...release.policy,defaultSocialImage:{...defaultImage,id:42}}} as unknown as PublicPageContext;
      for (const graph of [overrideGraph,good(snapshot(entries))]) {
        const result = assembleRoute(route,graph,invalid);
        expect(result.state).toBe('ERROR'); expect(result.metadata).not.toHaveProperty('openGraph'); noRaw(result);
      }
      if (route.route === 'article') {
        entries = field(entries,detailId,'heroImage',undefined);
        const fallback = assembleRoute(route,good(snapshot(entries)),release);
        expect(fallback.state).toBe('READY'); expect(fallback.metadata).toMatchObject({openGraph:{image:defaultImage}}); noRaw(fallback);
      }
    }
  });
  it('[F-SEO F-RAW-BOUNDARY] retains nonpublic offline and trusted-preview metadata with enriched policy', () => {
    const image = {...defaultImage,internalContext:'private-context',accessibility:{...defaultImage.accessibility,arbitraryPrivateKey:'private-extra'}};
    const policy = {...release.policy,defaultSocialImage:image};
    const demo = assembleRoute(routes.home,good(),{...offline,policy});
    const preview = assembleRoute(routes.article,previewGraph(),{...previewPage,policy});
    expect(demo.state).toBe('READY'); expect(demo.metadata).toMatchObject({mode:'offline-demo',robots:'noindex,nofollow',sitemapEligible:false});
    expect(preview.state).toBe('DRAFT_PREVIEW'); expect(preview.metadata).toMatchObject({cacheControl:'no-store',robots:'noindex,nofollow',sitemapEligible:false});
    for (const result of [demo,preview]) { expect(result.metadata).not.toHaveProperty('openGraph'); expect(result.metadata).not.toHaveProperty('canonical'); noRaw(result); }
  });
});

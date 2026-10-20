import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import type { Id } from './contracts/values';
import type { ImageView } from './contracts/media';
import type { NormalizationPolicy, PublicNormalizationContext, RevisionEligibility } from './contracts/boundary';
import { normalizeSource } from './source';
import { normalizeRichText } from './rich-text';
import { calendarDate, yearMonth } from './normalize';
import { assetUrl, email, externalUrl, mailto, slug } from './urls';
import { representativeEntries, representativeAssets, malformedSourceCases, sourceFixtureContextPolicy, simulatedRevisionFacts, sourceMarkExamples, sourceStructureExamples } from '../../data/portfolio/source-fixtures';
import { normalizedRecords, normalizedMarkExamples, normalizedStructureExamples } from '../../data/portfolio/normalized-fixtures';
import { fixtureId, fixtureNonEmptyText, fixtureImages, assetResumePublic, mediaIdentities } from '../../data/portfolio/media';

function rec(value: unknown): Record<string,unknown> { if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected object'); return Object.fromEntries(Object.entries(value)); }
function values(value: unknown): unknown[] { if (!Array.isArray(value)) throw new Error('Expected array'); return value; }
function context(): PublicNormalizationContext {
  const policy: NormalizationPolicy = {locale:'en-US',articlePrecision:'day',sourceComparison:'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',
    reviewedAccessibility:new Map<Id,ImageView['accessibility']>(sourceFixtureContextPolicy.reviewedAccessibility.map(a => [fixtureId(a.id),{kind:'meaningful',alt:fixtureNonEmptyText(a.text)}])),
    employmentPrecision:new Map(sourceFixtureContextPolicy.employmentPrecision.map(p => [fixtureId(p.id),'month' as const]))};
  return {audience:'PUBLIC',policy,revisionFacts:new Map<Id,RevisionEligibility>(simulatedRevisionFacts.publicEligible.map(f => [fixtureId(f.id),{revision:fixtureId(f.revision),publication:f.publication,publicSafety:f.publicSafety}]))};
}
function snapshot(entries: readonly unknown[] = representativeEntries, assets: readonly unknown[] = representativeAssets) {
  const revision = (input: unknown) => { const r = rec(input), sys = rec(r.sys); return {...r,sys:{...sys,revisionId:`simulation-revision-${String(sys.id)}`}}; };
  return {kind:'portfolio-offline-snapshot',completeness:'COMPLETE',entries:entries.map(revision),assets:assets.map(revision)};
}
const absent = Symbol('absent');
function field(entries: readonly unknown[], identity: string, name: string, value: unknown, locale = 'en-US'): unknown[] {
  return entries.map(entry => { const r = rec(entry); if (rec(r.sys).id !== identity) return entry; const fields = {...rec(r.fields)}; if (value === absent) delete fields[name]; else fields[name] = {[locale]:value}; return {...r,fields}; });
}
function first(type: string) { const r = representativeEntries.find(e => e.sys.contentType.sys.id === type); if (!r) throw new Error('Fixture type absent'); return r; }
function good(input: unknown = snapshot(), c = context()) { const result = normalizeSource(input,c); if (!result.ok) throw new Error(JSON.stringify(result.diagnostics)); return result.graph; }
function code(input: unknown, c = context()) { const result = normalizeSource(input,c); expect(result.ok).toBe(false); if (result.ok) throw new Error('Unexpected success'); return result.diagnostics[0].code; }
const link = (id: string, kind = 'Entry') => ({sys:{type:'Link',linkType:kind,id}});
const transport = new Map([
  ['seed05-asset-profile-portrait','https://assets.example.test/gilberto-haro-profile-portrait.jpg'],
  ['seed05-asset-resume-public','https://assets.example.test/gilberto-haro-resume.pdf'],
  ['seed05-asset-project-enterprise-cms-migration','https://assets.example.test/enterprise-cms-migration.png'],
  ['seed05-asset-project-contentful-greenfield-starter','https://assets.example.test/contentful-greenfield-starter.png'],
  ['seed05-asset-project-ui-gallery-system','https://assets.example.test/ui-gallery-system.png'],
  ['seed05-asset-project-system-diagram','https://assets.example.test/content-migration-workflow.png'],
  ['seed05-asset-article-learning-journey','https://assets.example.test/web-development-learning-journey.png'],
  ['seed05-asset-site-social-default','https://assets.example.test/default-social-image.png'],
]);
/** Only identity-bound media src/href changes; all other keys and properties remain exact oracle values. */
function bridge(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(bridge);
  if (!value || typeof value !== 'object') return value;
  const r = rec(value), result = Object.fromEntries(Object.entries(r).map(([k,v]) => [k,bridge(v)]));
  if (typeof r.id === 'string' && transport.has(r.id)) {
    if ('src' in r) { expect(r.src).toBe(fixtureImages.find(i => i.id === r.id)?.src); result.src = transport.get(r.id); }
    if ('href' in r) { expect(r.id).toBe(assetResumePublic.id); expect(r.href).toBe(assetResumePublic.href); result.href = transport.get(r.id); }
  }
  return result;
}
function freeze(value: unknown): void { if (value && typeof value === 'object') { Object.freeze(value); Object.values(value).forEach(freeze); } }
const textNode = (value = 'Neutral test text', marks: readonly unknown[] = []) => ({nodeType:'text',value,marks,data:{}});
const paragraph = (children: readonly unknown[] = [textNode()]) => ({nodeType:'paragraph',data:{},content:children});
const document = (content: readonly unknown[] = [paragraph()]) => ({nodeType:'document',data:{},content});
const noMedia = () => { throw new Error('Unexpected media'); };

describe('Q3 adapters', () => {
  it('[F-RAW-BOUNDARY F-OPTIONAL F-ORDER F-REVERSE F-DATES] matches all ten independent normalized domains and preserves input', () => {
    const input = snapshot(); freeze(input); const c = context(); const factsBefore = [...c.revisionFacts]; const policyBefore = [...c.policy.reviewedAccessibility];
    const graph = good(input,c);
    for (const [name,expected] of Object.entries(normalizedRecords)) {
      const actual = rec(graph.records)[name]; const list = actual instanceof Map ? [...actual.values()] : values(actual);
      const byId = (a: unknown,b: unknown) => String(rec(a).id).localeCompare(String(rec(b).id),'en');
      expect([...list].sort(byId)).toEqual([...expected].map(bridge).sort(byId));
    }
    expect(good(input,c)).toEqual(graph); expect([...c.revisionFacts]).toEqual(factsBefore); expect([...c.policy.reviewedAccessibility]).toEqual(policyBefore);
  });
  it('[F-MEDIA] independently binds eight transport differences to unchanged media identities and source descriptors', () => {
    for (const identity of mediaIdentities) {
      const bytes = readFileSync(new URL(`../../../${identity.frontendPath}`,import.meta.url));
      expect(bytes.length).toBe(identity.bytes); expect(createHash('sha256').update(bytes).digest('hex')).toBe(identity.sha256);
      const source = representativeAssets.find(a => a.sys.id === identity.id); expect(source).toBeDefined();
      const file = rec(rec(source?.fields.file)['en-US']); expect(`https:${String(file.url)}`).toBe(transport.get(identity.id));
    }
    expect(transport.size).toBe(8);
  });
  it('[F-SOURCE-FAILURE] requires explicit complete acquisition and matching per-record revision facts', () => {
    for (const input of [representativeEntries,{...snapshot(),completeness:'PARTIAL'},{...snapshot(),error:'acquisition failed'},{entries:[],assets:[]},null]) expect(code(input)).toBe('SOURCE_UNAVAILABLE');
    const input = snapshot(); const firstEntry = input.entries[0]; if (!firstEntry) throw new Error('Missing fixture');
    expect(code({...input,entries:[{...firstEntry,sys:{...firstEntry.sys,revisionId:'different-revision'}},...input.entries.slice(1)]})).toBe('SOURCE_UNAVAILABLE');
    expect(code(snapshot(),{...context(),revisionFacts:new Map()})).toBe('SOURCE_UNAVAILABLE');
    expect(good(snapshot([],[])).records.sites).toEqual([]);
  });
  it('[F-SOURCE-FAILURE F-RAW-BOUNDARY] generalizes identities and values and accepts a differently sized valid dataset', () => {
    const ids = new Set<string>([...representativeEntries,...representativeAssets].map(r => r.sys.id));
    function rename(v: unknown): unknown {
      if (typeof v === 'string' && ids.has(v)) return `synthetic-${v}`;
      if (Array.isArray(v)) return v.map(rename);
      if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k,x]) => [k,rename(x)]));
      return v;
    }
    const c = context(); const renamedContext: PublicNormalizationContext = {...c,policy:{...c.policy,reviewedAccessibility:new Map([...c.policy.reviewedAccessibility].map(([k,v]) => [fixtureId(`synthetic-${k}`),v])),employmentPrecision:new Map([...c.policy.employmentPrecision].map(([k,v]) => [fixtureId(`synthetic-${k}`),v]))},revisionFacts:new Map([...c.revisionFacts].map(([k,v]) => [fixtureId(`synthetic-${k}`),{...v,revision:fixtureId(`simulation-revision-synthetic-${k}`)}]))};
    const entries = field(representativeEntries,first('skill').sys.id,'name','Different capability').map(rename);
    const graph = good(snapshot(entries,representativeAssets.map(rename)),renamedContext);
    expect(graph.records.skills.get(fixtureId(`synthetic-${first('skill').sys.id}`))?.name).toBe('Different capability');
    expect([...graph.records.projects.keys()].every(k => k.startsWith('synthetic-'))).toBe(true);
    const added = {...first('skill'),sys:{...first('skill').sys,id:'synthetic-extra-skill'},fields:{name:{'en-US':'Additional neutral capability'}}};
    const facts = new Map(c.revisionFacts); facts.set(fixtureId(added.sys.id),{revision:fixtureId(`simulation-revision-${added.sys.id}`),publication:'published-revision',publicSafety:'approved'});
    expect(good(snapshot([...representativeEntries,added]),{...c,revisionFacts:facts}).records.skills.size).toBe(13);
    const minimalProfile = field([first('personProfile')],first('personProfile').sys.id,'resume',absent)[0];
    const minimal = [first('siteSettings'),minimalProfile,...representativeEntries.filter(e => ['navigationItem','socialLink'].includes(e.sys.contentType.sys.id))];
    const small = good(snapshot(minimal,[representativeAssets[0]])); expect(small.records.projects.size).toBe(0); expect(small.records.profiles).toHaveLength(1);
  });
  it.each(Object.entries(malformedSourceCases))('[F-REQUIRED F-LOCALE F-WHOI-BOUNDARY F-REF F-DATES F-RT-ARTICLE F-CYCLE] rejects frozen malformed case %s', (_name,bad) => {
    const key = rec(rec(bad).sys).id; const entries = representativeEntries.map(e => e.sys.id === key ? bad : e); expect(normalizeSource(snapshot(entries),context()).ok).toBe(false);
  });
  it.each(['siteSettings','personProfile','socialLink','navigationItem','project','article','experienceItem','skill','skillGroup','tool'])('[F-REQUIRED F-LOCALE] validates required fields in %s before preview', type => {
    const r = first(type), name = type === 'siteSettings' ? 'siteName' : type === 'socialLink' || type === 'navigationItem' ? 'label' : type === 'project' || type === 'article' ? 'title' : type === 'experienceItem' ? 'company' : 'name';
    for (const bad of [absent,' ',null,12,[],{}]) expect(normalizeSource(snapshot(field(representativeEntries,r.sys.id,name,bad)),context()).ok).toBe(false);
    expect(code(snapshot(field(representativeEntries,r.sys.id,name,'Neutral','fr-FR')))).toBe('LOCALE_MISMATCH');
    expect(normalizeSource(snapshot(field(representativeEntries,r.sys.id,name,'x'.repeat(type === 'navigationItem' ? 41 : 121))),context()).ok).toBe(false);
  });
  it('[F-OPTIONAL F-LOCALE F-WHOI] validates optional presence, source limits/enums and the exact WHOI diagnostic', () => {
    const project = first('project').sys.id, profile = first('personProfile').sys.id;
    for (const [name,value] of [['summary','x'.repeat(301)],['role','x'.repeat(1201)],['projectType','unknown'],['projectStatus','unknown'],['tags',Array(13).fill('tag')],['tags',['x'.repeat(41)]],['seoTitle','x'.repeat(91)],['seoDescription','x'.repeat(221)],['liveUrl',''],['projectStatus',null]] as const) expect(normalizeSource(snapshot(field(representativeEntries,project,name,value)),context()).ok).toBe(false);
    expect(code(snapshot(field(representativeEntries,profile,'secondaryTitle','Neutral','fr-FR')))).toBe('LOCALE_MISMATCH');
    const whoi = 'seed05-experience-whoi-frontend-developer';
    for (const value of [absent,[]]) { const r = normalizeSource(snapshot(field(representativeEntries,whoi,'tools',value)),context()); expect(r.ok).toBe(true); expect(r.diagnostics).toContainEqual({code:'WHOI_OPTIONAL_EMPTY',severity:'info',entityId:whoi,fieldPath:'/fields/tools'}); }
    const other = first('experienceItem').sys.id; const r = normalizeSource(snapshot(field(representativeEntries,other,'tools',[])),context()); expect(r.ok).toBe(true); expect(r.diagnostics.filter(d => d.code === 'WHOI_OPTIONAL_EMPTY').every(d => d.entityId === whoi)).toBe(true);
  });
  it('[F-OPTIONAL] projects optional scalar/enumeration/date/media fields absent from the representative dataset', () => {
    let entries: readonly unknown[] = representativeEntries;
    const edits = [[first('personProfile').sys.id,{secondaryTitle:'Secondary title',publicEmail:'person@example.test'}],[first('project').sys.id,{projectStatus:'ongoing',contextSummary:'Neutral context',metrics:'Neutral metric',liveUrl:'https://example.test/live',repositoryUrl:'https://example.test/source',tags:['Neutral'],seoTitle:'Override',seoDescription:'Description',socialImage:link(representativeAssets[0].sys.id,'Asset')}],[first('article').sys.id,{updatedDate:'2026-09-23',contentPillar:'cms-architecture',category:'field-note',tags:['Article'],seoTitle:'Article override'}],[first('experienceItem').sys.id,{employmentType:'contract',companyUrl:'https://example.test/company',contextSummary:'Context',metrics:'Metric'}],[first('tool').sys.id,{externalUrl:'https://example.test/tool'}]] as const;
    for (const [key,fields] of edits) for (const [name,value] of Object.entries(fields)) entries = field(entries,key,name,value);
    const g = good(snapshot(entries)); expect(g.records.profiles[0]?.publicEmail).toBe('person@example.test'); expect(g.records.projects.get(fixtureId(first('project').sys.id))).toMatchObject({projectStatus:'ongoing',tags:['Neutral'],seo:{title:'Override',description:'Description'}}); expect(g.records.articles.get(fixtureId(first('article').sys.id))).toMatchObject({updatedDate:'2026-09-23',category:'field-note'}); expect(g.records.experience.get(fixtureId(first('experienceItem').sys.id))?.employmentType).toBe('contract');
  });
});

const relationships = [
  ['siteSettings','primaryNavigationItems','navigationItem',true],['siteSettings','footerNavigationItems','navigationItem',true],['siteSettings','socialLinks','socialLink',true],['personProfile','socialLinks','socialLink',true],
  ['project','skills','skill',true],['project','tools','tool',true],['project','relatedExperience','experienceItem',false],['project','relatedProjects','project',true],
  ['article','authorProfile','personProfile',false],['article','relatedProjects','project',true],['article','relatedArticles','article',true],['article','skills','skill',true],['article','tools','tool',true],
  ['experienceItem','skills','skill',true],['experienceItem','tools','tool',true],['experienceItem','relatedArticles','article',true],['skillGroup','skills','skill',true],['tool','skills','skill',true],
] as const;
describe('Q3 references and eligibility', () => {
  it.each(relationships)('[F-REF] validates authored relationship %s.%s target %s', (type,name,target,many) => {
    const source = first(type), validTarget = representativeEntries.find(e => e.sys.contentType.sys.id === target && e.sys.id !== source.sys.id); if (!validTarget) throw new Error('Missing target');
    const wrongTarget = first(target === 'skill' ? 'tool' : 'skill').sys.id;
    for (const bad of [link(validTarget.sys.id,'Asset'),link(wrongTarget),link('synthetic-unresolved')]) expect(normalizeSource(snapshot(field(representativeEntries,source.sys.id,name,many ? [bad] : bad)),context()).ok).toBe(false);
    expect(normalizeSource(snapshot(field(representativeEntries,source.sys.id,name,many ? link(validTarget.sys.id) : [link(validTarget.sys.id)])),context()).ok).toBe(false);
    if (many) expect(code(snapshot(field(representativeEntries,source.sys.id,name,[link(validTarget.sys.id),link(validTarget.sys.id)])))).toBe('REFERENCE_CARDINALITY');
    expect(normalizeSource(snapshot(field(representativeEntries,source.sys.id,name,many ? [link(validTarget.sys.id)] : link(validTarget.sys.id))),context()).ok).toBe(true);
  });
  it('[F-PUBLICATION F-REF-INELIGIBLE] excludes optional draft targets privately and rejects required draft author/media', () => {
    const c = context(), facts = new Map(c.revisionFacts), tool = fixtureId(first('tool').sys.id); const prior = facts.get(tool); if (!prior) throw new Error('Missing fact'); facts.set(tool,{...prior,publication:'draft'});
    const result = normalizeSource(snapshot(),{...c,revisionFacts:facts}); expect(result.ok).toBe(true); if (result.ok) { expect(result.graph.records.tools.has(tool)).toBe(false); expect([...result.graph.records.projects.values()].some(p => p.tools.some(t => t.id === tool))).toBe(false); } expect(result.diagnostics.some(d => d.code === 'TARGET_INELIGIBLE')).toBe(true);
    for (const key of [first('personProfile').sys.id,representativeAssets[0].sys.id]) { const f = new Map(c.revisionFacts), old = f.get(fixtureId(key)); if (!old) throw new Error('Missing fact'); f.set(fixtureId(key),{...old,publication:'draft'}); expect(code(snapshot(),{...c,revisionFacts:f})).toBe('TARGET_INELIGIBLE'); }
    for (const change of [{publication:'unknown'},{publicSafety:'unknown'},{revision:'old-revision'}]) { const f = new Map(c.revisionFacts); const key = fixtureId(first('project').sys.id), old = f.get(key); if (!old) throw new Error('Missing fact'); const bad: unknown = {...c,revisionFacts:new Map([...f].map(([id,v]) => [id,id === key ? {...old,...change} : v]))}; expect(normalizeSource(snapshot(),bad as PublicNormalizationContext).ok).toBe(false); }
  });
  it('[F-CYCLE F-ORDER F-REVERSE] retains finite mutual previews and derives only approved reverse joins', () => {
    const [p1,p2] = representativeEntries.filter(e => e.sys.contentType.sys.id === 'project'); const [a1,a2] = representativeEntries.filter(e => e.sys.contentType.sys.id === 'article'); if (!p1 || !p2 || !a1 || !a2) throw new Error('Missing fixtures');
    let entries = field(representativeEntries,p1.sys.id,'relatedProjects',[link(p2.sys.id)]); entries = field(entries,p2.sys.id,'relatedProjects',[link(p1.sys.id)]); entries = field(entries,a1.sys.id,'relatedArticles',[link(a2.sys.id)]); entries = field(entries,a2.sys.id,'relatedArticles',[link(a1.sys.id)]);
    entries = field(entries,p1.sys.id,'relatedExperience',link(first('experienceItem').sys.id)); entries = field(entries,a1.sys.id,'relatedProjects',[link(p2.sys.id),link(p1.sys.id)]);
    const r = normalizeSource(snapshot(entries),context()); expect(r.ok).toBe(true); expect(r.diagnostics.filter(d => d.code === 'RELATED_CYCLE')).toHaveLength(2); if (!r.ok) return;
    const p = r.graph.records.projects.get(fixtureId(p1.sys.id)); expect(p?.relatedProjects.map(x => x.id)).toEqual([p2.sys.id]); expect(p?.relatedProjects[0]).not.toHaveProperty('relatedProjects'); expect(p?.relatedArticles.some(x => x.id === a1.sys.id)).toBe(true);
    expect(r.graph.records.experience.get(fixtureId(first('experienceItem').sys.id))?.relatedProjects.map(x => x.id)).toContain(p1.sys.id); expect(r.graph.records.articles.get(fixtureId(a1.sys.id))?.relatedProjects.map(x => x.id)).toEqual([p2.sys.id,p1.sys.id]);
    expect(good(snapshot([...entries].reverse(),[...representativeAssets].reverse())).records.projects.get(fixtureId(p1.sys.id))).toEqual(p);
    expect(code(snapshot(field(entries,p1.sys.id,'relatedArticles',[])))).toBe('SOURCE_INVALID');
  });
});

const richFields = [['personProfile','longBio','profile-long',true],['personProfile','learningHighlights','simple',false],['project','caseStudyBody','body',false],['article','body','body',true],['experienceItem','responsibilities','simple',true],['experienceItem','achievements','simple',true]] as const;
describe('Q3 Rich Text media dates URLs', () => {
  it.each(richFields)('[F-RT-PROFILE-LONG F-RT-LEARNING F-RT-PROJECT F-RT-ARTICLE F-RT-DUTIES F-RT-ACHIEVEMENTS] validates %s.%s with %s policy', (type,name,policy,required) => {
    for (const mark of ['bold','italic','underline','code','superscript','subscript','strikethrough']) {
      const r = normalizeSource(snapshot(field(representativeEntries,first(type).sys.id,name,document([paragraph([textNode('Exact prose',[{type:mark}])])]))),context()); expect(r.ok).toBe(policy !== 'body' || ['bold','italic','code'].includes(mark));
    }
    const empty = normalizeSource(snapshot(field(representativeEntries,first(type).sys.id,name,document([]))),context()); expect(empty.ok).toBe(!required);
    for (const bad of [{nodeType:'heading-1',data:{},content:[]},{nodeType:'embedded-entry-block',data:{target:link(first('tool').sys.id)},content:[]},{nodeType:'table',data:{},content:[]}]) expect(normalizeSource(snapshot(field(representativeEntries,first(type).sys.id,name,document([bad]))),context()).ok).toBe(false);
    if (policy === 'simple') for (const bad of [sourceStructureExamples[0],sourceStructureExamples[5]]) expect(normalizeSource(snapshot(field(representativeEntries,first(type).sys.id,name,document([bad]))),context()).ok).toBe(false);
  });
  it('[F-RT-STRUCTURE F-RT-PROJECT] preserves exact marks, links, nesting, image and PDF properties', () => {
    expect(normalizeRichText(document([paragraph(sourceMarkExamples)]),'profile-long',true,noMedia)).toEqual({policy:'profile-long',blocks:[{kind:'paragraph',children:normalizedMarkExamples}]});
    const media = (key: Id) => { if (key === assetResumePublic.id) return {...assetResumePublic,href:assetUrl(transport.get(key))}; const image = fixtureImages.find(a => a.id === key); if (!image) throw new Error('Unknown test media'); return {...image,src:assetUrl(transport.get(key))}; };
    expect(normalizeRichText(document(sourceStructureExamples),'body',true,media)).toEqual(bridge(normalizedStructureExamples));
    const nested = {nodeType:'unordered-list',data:{},content:[{nodeType:'list-item',data:{},content:[paragraph(),{nodeType:'ordered-list',data:{},content:[{nodeType:'list-item',data:{},content:[paragraph([textNode('Nested')])]}]}]}]};
    const out = normalizeRichText(document([nested]),'simple',true,noMedia); expect(JSON.stringify(out)).toContain('Nested'); expect(JSON.stringify(out)).not.toContain('nodeType');
    const invalidDocuments = [
      document([{nodeType:'list-item',data:{},content:[]}]),
      document([paragraph([{nodeType:'hyperlink',data:{uri:'javascript:alert(1)'},content:[textNode()]}])]),
      document([paragraph([textNode('x',[{type:'future-mark'}])])]),
    ];
    for (const bad of invalidDocuments) expect(() => normalizeRichText(bad,'body',false,noMedia)).toThrow();
    const cycle: Record<string,unknown> = {nodeType:'unordered-list',data:{}}; cycle.content = [{nodeType:'list-item',data:{},content:[cycle]}]; expect(() => normalizeRichText(document([cycle]),'simple',false,noMedia)).toThrow('RT_STRUCTURE');
    const codeText = '<script>not executable</script>'; expect(normalizeRichText(document([paragraph([textNode(codeText,[{type:'code'}])])]),'body',true,noMedia)?.blocks[0]).toEqual({kind:'paragraph',children:[{kind:'text',text:codeText,marks:['code']}]});
  });
  it('[F-MEDIA] rejects invalid present images/documents and permits explicitly decorative logos only', () => {
    const asset = representativeAssets[0], file = asset.fields.file['en-US'];
    for (const bad of [{...file,contentType:'application/pdf'},{...file,url:'data:image/png,bad'},{...file,details:{size:1}},{...file,details:{size:0,image:{width:1,height:1}}},{...file,details:{size:1,image:{width:0,height:1}}}]) expect(normalizeSource(snapshot(representativeEntries,field(representativeAssets,asset.sys.id,'file',bad)),context()).ok).toBe(false);
    const c = context(), reviewed = new Map(c.policy.reviewedAccessibility); reviewed.set(fixtureId(asset.sys.id),{kind:'decorative',alt:''}); expect(code(snapshot(),{...c,policy:{...c.policy,reviewedAccessibility:reviewed}})).toBe('MEDIA_INVALID');
    reviewed.set(fixtureId(asset.sys.id),{kind:'meaningful',alt:fixtureNonEmptyText('Reviewed portrait')});
    reviewed.set(fixtureId(representativeAssets[7].sys.id),{kind:'decorative',alt:''});
    expect(code(snapshot(),{...c,policy:{...c.policy,reviewedAccessibility:reviewed}})).toBe('MEDIA_INVALID'); // Existing social images remain meaningful.
    const logo = {...representativeAssets[7],sys:{id:'synthetic-decorative-logo',type:'Asset' as const}};
    const logoReview = new Map(c.policy.reviewedAccessibility); logoReview.set(fixtureId(logo.sys.id),{kind:'decorative',alt:''});
    const facts = new Map(c.revisionFacts); facts.set(fixtureId(logo.sys.id),{revision:fixtureId(`simulation-revision-${logo.sys.id}`),publication:'published-revision',publicSafety:'approved'});
    const g = good(snapshot(field(representativeEntries,first('tool').sys.id,'logo',link(logo.sys.id,'Asset')),[...representativeAssets,logo]),{...c,revisionFacts:facts,policy:{...c.policy,reviewedAccessibility:logoReview}}); expect(g.records.tools.get(fixtureId(first('tool').sys.id))?.logo?.accessibility).toEqual({kind:'decorative',alt:''});
    expect(normalizeSource(snapshot(field(representativeEntries,first('personProfile').sys.id,'resume',link(asset.sys.id,'Asset'))),context()).ok).toBe(false);
  });
  it('[F-DATES] validates calendar days, explicit employment precision, unknown end and conflicts without clock conversion', () => {
    expect(calendarDate('2024-02-29')).toBe('2024-02-29'); for (const bad of ['2025-02-29','2024-13-01','2024-00-01','2024-04-31','2024-01-01T00:00:00Z']) expect(() => calendarDate(bad)).toThrow();
    expect(() => yearMonth('2024-01-01',undefined)).toThrow(); expect(() => yearMonth('2024-01-15','month')).toThrow();
    const identity = first('experienceItem').sys.id; let entries = field(representativeEntries,identity,'endDate',absent); entries = field(entries,identity,'isCurrentRole',absent);
    const g = good(snapshot(entries)); expect(g.records.experience.get(fixtureId(identity))).not.toHaveProperty('end'); expect(g.records.experience.get(fixtureId(identity))).not.toHaveProperty('currentRole');
    expect(code(snapshot(field(representativeEntries,first('article').sys.id,'updatedDate','2025-01-01')))).toBe('DATE_CONFLICT');
  });
  it('[F-REF F-SEO-CONFIG] validates external, asset, internal slug and email schemes without network access', () => {
    for (const bad of ['http://example.test/a','https://user:pass@example.test/a','https://127.0.0.1/a','https://localhost/a','https://host.local/a','//example.test/a','https://example.test/\\escape','https://example.test/a b','javascript:alert(1)','file:///tmp/a','https://-bad.example.test/a']) expect(() => externalUrl(bad)).toThrow();
    expect(externalUrl('https://example.test/path?q=1#section')).toBe('https://example.test/path?q=1#section'); expect(assetUrl('//assets.example.test/a.png')).toBe('https://assets.example.test/a.png');
    expect(mailto(email('person+neutral@example.test'))).toBe('mailto:person%2Bneutral@example.test'); for (const bad of ['a@example.test?bcc=x','a\n@example.test','no-at']) expect(() => email(bad)).toThrow();
    expect(slug('404')).toBe('404'); expect(slug('index')).toBe('index'); for (const bad of ['A','a_b','a/b','a--b','%2f','']) expect(() => slug(bad)).toThrow();
  });
});

describe('Q3 boundary review regressions', () => {

  it('[F-SOURCE-FAILURE F-PUBLICATION F-REF-INELIGIBLE F-RAW-BOUNDARY] rejects duplicate identities, unsupported record types and hostile field names; excludes unsafe revisions', () => {
    expect(code(snapshot([...representativeEntries,representativeEntries[0]]))).toBe('SOURCE_INVALID');
    const input = snapshot(); const r = input.entries[0]; if (!r) throw new Error('Missing record');
    expect(code({...input,entries:[{...r,sys:{...r.sys,type:'Asset'}},...input.entries.slice(1)]})).toBe('SOURCE_TYPE');
    const unknownType = {...r,sys:{...r.sys,contentType:{sys:{type:'Link',linkType:'ContentType',id:'invented-type'}}}};
    expect(code({...input,entries:[unknownType,...input.entries.slice(1)]})).toBe('SOURCE_TYPE');
    const hostileFields = {...rec(rec(r).fields),...rec(JSON.parse('{"__proto__":{"en-US":{"polluted":true}}}'))};
    expect(code({...input,entries:[{...r,fields:hostileFields},...input.entries.slice(1)]})).toBe('SOURCE_INVALID');
    expect(Object.hasOwn({},'polluted')).toBe(false);
    const c = context(), facts = new Map(c.revisionFacts), key = fixtureId(first('tool').sys.id), old = facts.get(key); if (!old) throw new Error('Missing fact');
    facts.set(key,{...old,publicSafety:'not-approved'}); const g = good(snapshot(),{...c,revisionFacts:facts}); expect(g.records.tools.has(key)).toBe(false);
  });
  it('[F-WHOI-BOUNDARY F-ORDER] preserves nonempty authored WHOI tool order without applying the historical empty exception', () => {
    const key = 'seed05-experience-whoi-frontend-developer', tools = representativeEntries.filter(e => e.sys.contentType.sys.id === 'tool').slice(0,2); const [a,b] = tools; if (!a || !b) throw new Error('Missing tools');
    const result = normalizeSource(snapshot(field(representativeEntries,key,'tools',[link(b.sys.id),link(a.sys.id)])),context()); expect(result.ok).toBe(true);
    if (result.ok) expect(result.graph.records.experience.get(fixtureId(key))?.tools.map(t => t.id)).toEqual([b.sys.id,a.sys.id]);
    expect(result.diagnostics.some(d => d.code === 'WHOI_OPTIONAL_EMPTY')).toBe(false);
  });
  it('[F-RT-PROJECT F-RT-STRUCTURE F-MEDIA] rejects invalid embedded asset kinds, identities and unsupported MIME before empty omission', () => {
    const project = first('project').sys.id;
    for (const target of [link(representativeAssets[0].sys.id,'Entry'),link('missing-asset','Asset'),link(first('skill').sys.id,'Asset')]) {
      const body = document([{nodeType:'embedded-asset-block',data:{target},content:[]}]); expect(normalizeSource(snapshot(field(representativeEntries,project,'caseStudyBody',body)),context()).ok).toBe(false);
    }
    const asset = representativeAssets[0]; const invalid = {...asset.fields.file['en-US'],contentType:'application/zip'};
    expect(code(snapshot(representativeEntries,field(representativeAssets,asset.sys.id,'file',invalid)))).toBe('UNSUPPORTED_MEDIA');
  });
});

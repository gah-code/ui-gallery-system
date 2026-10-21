import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { isDeepStrictEqual } from 'node:util';
import type { PublicNormalizationContext, PublicPageContext } from '../content/portfolio/contracts/boundary';
import type { Id, Path } from '../content/portfolio/contracts/values';
import type { ImageView } from '../content/portfolio/contracts/media';
import type { PublicRouteResult, PageMetadata } from '../content/portfolio/contracts/pages';
import { normalizeSource } from '../content/portfolio/source';
import { assembleRoute } from '../content/portfolio/assemble';
import { artifactManifest, eligibleRoutes, parseRoute } from '../content/portfolio/routes';
import { assetUrl, staticPaths, projectPath, slug, artifactIdentity } from '../content/portfolio/urls';
import { representativeEntries, representativeAssets, sourceFixtureContextPolicy, simulatedRevisionFacts } from '../data/portfolio/source-fixtures';
import * as fixtures from '../data/portfolio/normalized-fixtures';
import { fixtureId, fixtureNonEmptyText, fixtureImages, assetResumePublic, assetSiteSocialDefault, fixtureHttps, mediaIdentities } from '../data/portfolio/media';
import { artifactRequestMatrix } from '../data/portfolio/scenarios';
import { PageView, PortfolioErrorBoundary, type PageInput } from './PageView';
import { RichText } from './RichText';
import { validateBootstrap, identifierPrefix } from './entry-client';

const offline:PublicPageContext={audience:'PUBLIC',mode:'offline-demo',policy:{locale:'en-US',selectionAndOrder:'SECTION_5_INITIAL_POLICY',intentionallyPublicEmptyRoutes:[]}};
const transport=new Map([
  ['seed05-asset-profile-portrait','gilberto-haro-profile-portrait.jpg'],['seed05-asset-resume-public','gilberto-haro-resume.pdf'],
  ['seed05-asset-project-enterprise-cms-migration','enterprise-cms-migration.png'],['seed05-asset-project-contentful-greenfield-starter','contentful-greenfield-starter.png'],['seed05-asset-project-ui-gallery-system','ui-gallery-system.png'],
  ['seed05-asset-project-system-diagram','content-migration-workflow.png'],['seed05-asset-article-learning-journey','web-development-learning-journey.png'],['seed05-asset-site-social-default','default-social-image.png'],
].map(([id,file]) => [id,`https://assets.example.test/${file}`]));
function rec(v:unknown):Record<string,unknown> {if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('Expected object');return Object.fromEntries(Object.entries(v));}
function requireEqual(a:unknown,b:unknown,message:string):void {if (!isDeepStrictEqual(a,b)) throw new Error(message);}
/** Identity-bound transport projection: all other media fields must match exactly. */
function localMedia(v:unknown):unknown {
  if (Array.isArray(v)) return v.map(localMedia);
  if (!v || typeof v !== 'object') return v;
  const r=rec(v);
  if (typeof r.id === 'string' && transport.has(r.id) && ('src' in r || 'href' in r)) {
    const expected=[...fixtureImages,assetResumePublic].find(a => a.id === r.id);
    if (!expected) throw new Error('Unknown media identity');
    const k='src' in expected ? 'src' : 'href';
    requireEqual(r,{...expected,[k]:transport.get(r.id)},'Media identity or non-transport property mismatch');
    return {...expected};
  }
  return Object.fromEntries(Object.entries(r).map(([k,x]) => [k,localMedia(x)]));
}
function graph(entries:readonly unknown[]=representativeEntries) {
  const revision=(v:unknown) => {const r=rec(v),s=rec(r.sys);return {...r,sys:{...s,revisionId:`simulation-revision-${String(s.id)}`}};};
  const context:PublicNormalizationContext={audience:'PUBLIC',policy:{locale:'en-US',articlePrecision:'day',sourceComparison:'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',reviewedAccessibility:new Map<Id,ImageView['accessibility']>(sourceFixtureContextPolicy.reviewedAccessibility.map(a => [fixtureId(a.id),{kind:'meaningful',alt:fixtureNonEmptyText(a.text)}])),employmentPrecision:new Map(sourceFixtureContextPolicy.employmentPrecision.map(a => [fixtureId(a.id),'month' as const]))},revisionFacts:new Map(simulatedRevisionFacts.publicEligible.map(f => [fixtureId(f.id),{revision:fixtureId(f.revision),publication:f.publication,publicSafety:f.publicSafety}]))};
  const result=normalizeSource({kind:'portfolio-offline-snapshot',completeness:'COMPLETE',entries:entries.map(revision),assets:representativeAssets.map(revision)},context);
  if (!result.ok) throw new Error('Offline source normalization failed');return result.graph;
}
export function representative() {
  const g=graph(),paths=eligibleRoutes(g);
  const pages=paths.map(path => {
    const route=parseRoute(path);if (route.kind !== 'MATCHED') throw new Error('Invalid enumerated path');
    const assembled=assembleRoute(route.match,g,offline);if (assembled.state !== 'READY') throw new Error('Readiness failure');
    const local=localMedia(assembled) as PublicRouteResult;
    const expected=fixtures.readyResults[route.match.route];
    if (expected.routeInfo.path === path) requireEqual(local,expected,`Independent fixture mismatch: ${path}`);
    else if (local.state === 'READY' && local.route === 'project') requireEqual(local.data.project,fixtures.projects.find(p => p.href === path),'Independent project mismatch');
    else if (local.state === 'READY' && local.route === 'article') requireEqual(local.data.article,fixtures.articles.find(a => a.href === path),'Independent article mismatch');
    else throw new Error('Missing independent oracle');
    return {path,page:local};
  });return {pages,manifest:artifactManifest(paths)};
}
export function emitRules(paths:readonly Path[]) {
  const manifest=artifactManifest(paths);
  return [...manifest.rules].sort((a,b) => b.status-a.status || (a.from < b.from ? -1 : a.from > b.from ? 1 : 0)).map(r => `${r.from} ${r.to} ${r.status}`).join('\n')+'\n';
}
export function safeJson(value:unknown):string {return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g,c => `\\u${c.charCodeAt(0).toString(16).padStart(4,'0')}`);}
export function head(metadata:PageMetadata):string {
  const m=metadata;
  return renderToStaticMarkup(<><title>{m.title}</title><meta name="description" content={m.description}/><meta name="robots" content={m.robots}/>{m.canonical && <link rel="canonical" href={m.canonical}/>} {m.openGraph && <><meta property="og:title" content={m.openGraph.title}/><meta property="og:description" content={m.openGraph.description}/><meta property="og:url" content={m.openGraph.url}/><meta property="og:type" content={m.openGraph.type}/><meta property="og:site_name" content={m.openGraph.siteName}/><meta property="og:image" content={m.openGraph.image.src}/><meta property="og:image:alt" content={m.openGraph.image.accessibility.alt}/><meta property="og:image:width" content={String(m.openGraph.image.width)}/><meta property="og:image:height" content={String(m.openGraph.image.height)}/></>}</>);
}
export function render(page:PageInput,template:string,client:{js:string;css:readonly string[]}):string {
  if (page.state === 'ERROR' || page.state === 'DRAFT_PREVIEW' || ('audience' in page && page.audience !== 'PUBLIC')) throw new Error('Public build state rejected');
  const value=page.state === 'MISSING' ? {state:'MISSING' as const} : page;
  const bootstrap={version:1,identifierPrefix,page:value};validateBootstrap(bootstrap);
  const metadata=value.state === 'MISSING' ? {title:'Page not found',description:'This page could not be found.',robots:'noindex,nofollow',sitemapEligible:false,breadcrumbs:[]} as unknown as PageMetadata : value.metadata;
  const html=renderToString(<PortfolioErrorBoundary><PageView page={value}/></PortfolioErrorBoundary>,{identifierPrefix});
  if (html.includes('<!--$')) throw new Error('Suspended output rejected');
  const slots:Readonly<Record<string,string>>={
    '<!--portfolio-head-->':head(metadata)+client.css.map(href => renderToStaticMarkup(<link rel="stylesheet" href={href}/>)).join(''),
    '<!--portfolio-body-->':html,
    '<!--portfolio-bootstrap-->':`<script id="portfolio-data" type="application/json">${safeJson(bootstrap)}</script>`+renderToStaticMarkup(<script type="module" src={client.js}/>)
  };
  for(const marker of Object.keys(slots)) if(template.split(marker).length!==2) throw new Error('Invalid portfolio template slots');
  // One pass over the original template: authored dollar tokens and marker text are literal.
  return template.replace(/<!--portfolio-(?:head|body|bootstrap)-->/g,marker=>slots[marker]!);
}
export function verificationInputs() {
  const g=graph();
  const enriched={...assetSiteSocialDefault,src:assetUrl('https://assets.example.test/default-social-image.png'),sys:{private:'PRIVATE-MARKER'},fields:{secret:'PRIVATE-MARKER'},accessibility:{...assetSiteSocialDefault.accessibility,fields:{secret:'PRIVATE-MARKER'}}};
  const release:PublicPageContext={...offline,mode:'release',policy:{...offline.policy,siteOrigin:fixtureHttps('https://example.test'),defaultSocialImage:enriched}};
  const before=JSON.stringify(enriched);
  const releasePage=assembleRoute(fixtures.routes.home,g,release);
  if (releasePage.state !== 'READY') throw new Error('Synthetic release failed');
  const releaseHead=head(releasePage.metadata);requireEqual(JSON.stringify(enriched),before,'Input mutation');
  const syntheticEntries=representativeEntries.map(e => {
    const type=e.sys.contentType.sys.id;if (type !== 'project' && type !== 'article') return e;
    const items=representativeEntries.filter(x => x.sys.contentType.sys.id === type),index=items.findIndex(x => x.sys.id === e.sys.id);
    return {...e,fields:{...e.fields,slug:{'en-US':['sample','404','index'][index]}}};
  });
  const syntheticGraph=graph(syntheticEntries);
  const synthetic=eligibleRoutes(syntheticGraph).map(path => {const r=parseRoute(path);if (r.kind !== 'MATCHED') throw new Error('Synthetic path');return {path,page:localMedia(assembleRoute(r.match,syntheticGraph,offline)) as PublicRouteResult};});
  const atCapacity=[...Object.values(staticPaths),...Array.from({length:326},(_,i) => projectPath(slug(`capacity-${i}`)))];
  return {fixtureResults:fixtures.readyResults,emptyResults:fixtures.emptyResults,error:fixtures.homeError,missing:fixtures.projectMissing,preview:fixtures.previewProject,
    media:[...fixtureImages,assetResumePublic],mediaIdentities,requestMatrix:artifactRequestMatrix,synthetic,staticPaths:Object.values(staticPaths),atCapacity,
    releaseHead,releaseMetadata:releasePage.metadata,releaseInputPreserved:JSON.stringify(enriched) === before,
    richTextHtml:renderToStaticMarkup(<><RichText document={{policy:'profile-long',blocks:[{kind:'paragraph',children:fixtures.normalizedMarkExamples}]}}/><RichText document={fixtures.normalizedStructureExamples}/></>)};
}

export function representativeIdentity(path:Path):string {return artifactIdentity(path).file.slice('dist-portfolio/'.length);}

// Server-only regression access; this does not enter the browser module graph.
import { SourceFault } from '../content/portfolio/resolve';
export function sourceFaultType() {return SourceFault;}
export { validateBootstrap };
export function isolatedErrorDocument(template:string,client:{js:string;css:readonly string[]}):string {
  const missing=render({state:'MISSING'},template,client);
  const before=renderToString(<PortfolioErrorBoundary><PageView page={{state:'MISSING'}}/></PortfolioErrorBoundary>,{identifierPrefix});
  const after=renderToString(<PortfolioErrorBoundary><PageView page={{state:'ERROR'}}/></PortfolioErrorBoundary>,{identifierPrefix});
  return missing.replace(before,()=>after).replace(safeJson({version:1,identifierPrefix,page:{state:'MISSING'}}),()=>safeJson({version:1,identifierPrefix,page:{state:'ERROR'}}));
}

export function serverBoundaryFailure():string {
  function Fault():never {throw new Error('Controlled portfolio render regression');}
  return renderToString(<PortfolioErrorBoundary><Fault/></PortfolioErrorBoundary>,{identifierPrefix});
}

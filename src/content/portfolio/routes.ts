import type { PortfolioGraph, RouteParseResult } from './contracts/boundary';
import type { MatchedRoute } from './contracts/pages';
import type { Audience, Path } from './contracts/values';
import { articlePath, artifactIdentity, hasControl, projectPath, slug, staticPaths } from './urls';
import { compare } from './normalize';

/** Parse canonical pathname separately from lookup. Queries/fragments never establish preview access. */
export function parseRoute(input: unknown): RouteParseResult {
  const unmatched = {kind:'UNMATCHED',reason:'PATH_NOT_SUPPORTED'} as const;
  if (typeof input !== 'string' || (hasControl(input) || /\s/.test(input) || input.includes('\\'))) return unmatched;
  const path = input.split(/[?#]/,1)[0];
  switch (path) {
    case '/': return {kind:'MATCHED',match:{route:'home',path}};
    case '/about': return {kind:'MATCHED',match:{route:'about',path}};
    case '/work': return {kind:'MATCHED',match:{route:'work',path}};
    case '/projects': return {kind:'MATCHED',match:{route:'projects',path}};
    case '/writing': return {kind:'MATCHED',match:{route:'writing',path}};
    case '/tools': return {kind:'MATCHED',match:{route:'tools',path}};
    case '/contact': return {kind:'MATCHED',match:{route:'contact',path}};
  }
  if (!path) return unmatched;
  const parts = /^\/(projects|writing)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(path);
  if (!parts?.[2]) return unmatched;
  const s = slug(parts[2]);
  return parts[1] === 'projects' ? {kind:'MATCHED',match:{route:'project',slug:s,path:projectPath(s)}} : {kind:'MATCHED',match:{route:'article',slug:s,path:articlePath(s)}};
}
export function lookupDetail<A extends Audience>(route: Extract<MatchedRoute,{route:'project'}>, graph: PortfolioGraph<A>): ReturnType<PortfolioGraph<A>['records']['projects']['get']>;
export function lookupDetail<A extends Audience>(route: Extract<MatchedRoute,{route:'article'}>, graph: PortfolioGraph<A>): ReturnType<PortfolioGraph<A>['records']['articles']['get']>;
export function lookupDetail<A extends Audience>(route: Extract<MatchedRoute,{route:'project'|'article'}>, graph: PortfolioGraph<A>) {
  if (route.route === 'project') { const key = graph.projectBySlug.get(route.slug); return key === undefined ? undefined : graph.records.projects.get(key); }
  const key = graph.articleBySlug.get(route.slug); return key === undefined ? undefined : graph.records.articles.get(key);
}
export function eligibleRoutes(graph: PortfolioGraph<'PUBLIC'>): readonly Path[] {
  if (graph.audience !== 'PUBLIC' || graph.completeness !== 'COMPLETE') throw new Error('Invalid enumeration graph');
  const eligible = new Set([...graph.eligibility].filter(([,f]) => f.publication === 'published-revision' && f.publicSafety === 'approved').map(([id]) => id));
  return [...Object.values(staticPaths),...[...graph.records.projects.values()].filter(p => eligible.has(p.id)).map(p => projectPath(p.slug)).sort(compare),...[...graph.records.articles.values()].filter(a => eligible.has(a.id)).map(a => articlePath(a.slug)).sort(compare)];
}
export type ArtifactRule = Readonly<{ from: string; to: string; status:200|308 }>;
/** Pure R1 intent manifest: no HTML, provider configuration, HTTP or filesystem effects. */
export function artifactManifest(paths: readonly Path[]): Readonly<{ documents: readonly ReturnType<typeof artifactIdentity>[]; rules: readonly ArtifactRule[]; ruleCount: number }> {
  const fixed = Object.values(staticPaths);
  if (new Set(paths).size !== paths.length || fixed.some(p => !paths.includes(p))) throw new Error('Incomplete or duplicate route manifest');
  const documents = paths.map(artifactIdentity); const rules: ArtifactRule[] = [];
  for (const doc of documents) {
    const p = doc.canonical, i = doc.internal;
    rules.push({from:p,to:i,status:200});
    if (p !== '/') rules.push({from:`${p}/`,to:p,status:308},{from:`${p}.html`,to:p,status:308});
    else rules.push({from:'/index.html',to:p,status:308});
    rules.push({from:i,to:p,status:308},{from:`${i}.html`,to:p,status:308},{from:`${i}/`,to:p,status:308});
  }
  const details = paths.length-fixed.length;
  if (rules.length !== 41+6*details || rules.length > 2000 || rules.some(r => `${r.from} ${r.to} ${r.status}`.length > 1000) || new Set(rules.map(r => r.from)).size !== rules.length) throw new Error('R1 manifest capacity or collision');
  return {documents,rules,ruleCount:rules.length};
}

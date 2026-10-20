import type { PageContext, PortfolioGraph, PublicPageContext, TrustedPreviewPageContext } from './contracts/boundary';
import type { Audience } from './contracts/values';
import type { ArticleDetail, ProfileView, ProjectDetail, SiteChrome } from './contracts/domain';
import type { CollectionKey, ContactChannel, ContactData, EmptyDataByRoute, EmptyMetadata, Failure, MatchedRoute, PublicDiagnostic, PublicResultByRoute, PublicRouteResult, Ready, ReadyDataByRoute, ResultIdentity, RouteByKey, RouteKey, TrustedPreviewResultByRoute, TrustedPreviewRouteResult } from './contracts/pages';
import { articleOrder, articlePreview, experienceOrder, experienceSummary, groupOrder, profileSummary, projectOrder, projectPreview, toolOrder } from './normalize';
import { emptyMetadata, failureMetadata, previewMetadata, readyMetadata, validatePagePolicy } from './metadata';
import { fail, nonempty, text } from './resolve';
import { lookupDetail, parseRoute } from './routes';
import { validatePreviewAccess } from './source';
import { mailto } from './urls';

const emptyDiagnostic = {code:'COLLECTION_EMPTY',message:'No eligible items are available.'} as const;
const missingDiagnostic = {code:'ROUTE_NOT_FOUND',message:'This page could not be found.'} as const;
const unavailableDiagnostic = {code:'CONTENT_UNAVAILABLE',message:'Content is unavailable.'} as const;
/** Closed projection: private IDs, paths, titles, stack and revision facts are never copied. */
export function safeDiagnostics(state: 'EMPTY'|'MISSING'|'ERROR'|'MEDIA'): readonly PublicDiagnostic[] {
  return [state === 'EMPTY' ? emptyDiagnostic : state === 'MISSING' ? missingDiagnostic : state === 'MEDIA' ? {code:'MEDIA_UNAVAILABLE',message:'This media is unavailable.'} : unavailableDiagnostic];
}
function contactData(profile: ProfileView): ContactData {
  const channels: ContactChannel[] = profile.socialLinks.map(s => ({kind:'social',platform:s.platform,label:s.label,href:s.href}));
  if (profile.publicEmail) channels.push({kind:'email',label:text(profile.publicEmail),email:profile.publicEmail,href:mailto(profile.publicEmail)});
  return {intro:profile.contactIntro ?? profile.positioningStatement,channels:nonempty(channels,'CONTACT_UNAVAILABLE'),...(profile.resume ? {resume:profile.resume} : {}),...(profile.availabilityStatus === undefined ? {} : {availability:profile.availabilityStatus}),...(profile.workPreference === undefined ? {} : {workPreference:profile.workPreference}),...(profile.location === undefined ? {} : {location:profile.location})};
}
function prepare(graph: PortfolioGraph<Audience>, context: PageContext, route: MatchedRoute) {
  if (graph.audience !== context.audience || graph.completeness !== 'COMPLETE') fail('SOURCE_INVALID');
  const parsed = parseRoute(route.path);
  if (parsed.kind !== 'MATCHED' || parsed.match.route !== route.route || ('slug' in route && (!('slug' in parsed.match) || parsed.match.slug !== route.slug))) fail('SOURCE_INVALID');
  validatePagePolicy(context); if (context.audience === 'TRUSTED_PREVIEW') validatePreviewAccess(context.access);
  const r = graph.records;
  if (r.sites.length > 1 || r.profiles.length > 1) fail('SINGLETON_AMBIGUOUS');
  const site = r.sites[0], profile = r.profiles[0]; if (!site) fail('SITE_MISSING'); if (!profile) fail('PROFILE_MISSING');
  const contact = contactData(profile);
  return {site,profile,contact,projects:[...r.projects.values()].sort(projectOrder).map(projectPreview),writing:[...r.articles.values()].sort(articleOrder).map(articlePreview),experience:[...r.experience.values()].sort(experienceOrder),groups:[...r.groups.values()].sort(groupOrder),tools:[...r.tools.values()].sort(toolOrder)};
}
function ready<K extends RouteKey>(route: RouteByKey[K] & { readonly route: K }, data: NoInfer<ReadyDataByRoute[K]>, site: SiteChrome, profile: ProfileView, detail: ProjectDetail|ArticleDetail|undefined, context: PageContext): Ready<K,'PUBLIC'>|Ready<K,'TRUSTED_PREVIEW'> {
  if (context.audience === 'PUBLIC') return {route:route.route,routeInfo:route,audience:'PUBLIC',state:'READY',httpStatus:200,diagnostics:[],data,chrome:site,metadata:readyMetadata(route,site,profile,detail,context)};
  return {route:route.route,routeInfo:route,audience:'TRUSTED_PREVIEW',state:'READY',httpStatus:200,diagnostics:[],data,chrome:site,metadata:previewMetadata()};
}
type EmptyResult<K extends CollectionKey,A extends Audience> = ResultIdentity<K,A> & {readonly state:'EMPTY';readonly httpStatus:200;readonly data:EmptyDataByRoute[K];readonly chrome:SiteChrome;readonly metadata:EmptyMetadata<A>};
function empty<K extends CollectionKey>(route: RouteByKey[K] & { readonly route: K }, data: NoInfer<EmptyDataByRoute[K]>, site: SiteChrome, context: PageContext): EmptyResult<K,'PUBLIC'>|EmptyResult<K,'TRUSTED_PREVIEW'> {
  if (context.audience === 'PUBLIC') return {route:route.route,routeInfo:route,audience:'PUBLIC',state:'EMPTY',httpStatus:200,diagnostics:safeDiagnostics('EMPTY'),data,chrome:site,metadata:emptyMetadata(route,context)};
  return {route:route.route,routeInfo:route,audience:'TRUSTED_PREVIEW',state:'EMPTY',httpStatus:200,diagnostics:safeDiagnostics('EMPTY'),data,chrome:site,metadata:previewMetadata()};
}
function error<K extends RouteKey>(route: RouteByKey[K] & { readonly route: K }, context: PageContext): Failure<K,'PUBLIC'>|Failure<K,'TRUSTED_PREVIEW'> {
  if (context.audience === 'TRUSTED_PREVIEW') return {route:route.route,routeInfo:route,audience:'TRUSTED_PREVIEW',state:'ERROR',httpStatus:503,diagnostics:safeDiagnostics('ERROR'),metadata:previewMetadata()};
  return {route:route.route,routeInfo:route,audience:'PUBLIC',state:'ERROR',httpStatus:503,diagnostics:safeDiagnostics('ERROR'),metadata:failureMetadata()};
}

export function assembleRoute<R extends MatchedRoute>(route: R, graph: PortfolioGraph<'PUBLIC'>, context: PublicPageContext): PublicResultByRoute[R['route']];
export function assembleRoute<R extends MatchedRoute>(route: R, graph: PortfolioGraph<'TRUSTED_PREVIEW'>, context: TrustedPreviewPageContext): TrustedPreviewResultByRoute[R['route']];
export function assembleRoute(route: MatchedRoute, graph: PortfolioGraph<Audience>, context: PageContext): PublicRouteResult|TrustedPreviewRouteResult {
  try {
    const p = prepare(graph,context,route), {site,profile,contact} = p;
    switch (route.route) {
      case 'home': {
        const projects = p.projects.slice(0,3), writing = p.writing.slice(0,3), experience = p.experience.slice(0,2).map(experienceSummary);
        const base = {profile:profileSummary(profile),projects,writing,experience,skillGroups:p.groups,tools:p.tools.slice(0,6),contact};
        if (projects.length) return ready(route,{...base,projects:nonempty(projects)},site,profile,undefined,context);
        if (writing.length) return ready(route,{...base,writing:nonempty(writing)},site,profile,undefined,context);
        if (experience.length) return ready(route,{...base,experience:nonempty(experience)},site,profile,undefined,context);
        return fail('HOME_NOT_READY');
      }
      case 'about': return ready(route,{profile,skillGroups:p.groups,experience:p.experience.map(experienceSummary),tools:p.tools,contact},site,profile,undefined,context);
      case 'work': return p.experience.length ? ready(route,{experiences:nonempty(p.experience),contact},site,profile,undefined,context) : empty(route,{experiences:[],contact},site,context);
      case 'projects': return p.projects.length ? ready(route,{projects:nonempty(p.projects),contact},site,profile,undefined,context) : empty(route,{projects:[],contact},site,context);
      case 'writing': return p.writing.length ? ready(route,{articles:nonempty(p.writing),contact},site,profile,undefined,context) : empty(route,{articles:[],contact},site,context);
      case 'tools': return p.tools.length ? ready(route,{tools:nonempty(p.tools),skillGroups:p.groups,contact},site,profile,undefined,context) : empty(route,{tools:[],skillGroups:p.groups,contact},site,context);
      case 'contact': return ready(route,{profile:profileSummary(profile),contact},site,profile,undefined,context);
      case 'project': {
        const project = lookupDetail(route,graph);
        if (!project) return context.audience === 'PUBLIC' ? {route:'project',routeInfo:route,audience:'PUBLIC',state:'MISSING',httpStatus:404,diagnostics:safeDiagnostics('MISSING'),metadata:failureMetadata()} : {route:'project',routeInfo:route,audience:'TRUSTED_PREVIEW',state:'MISSING',httpStatus:404,diagnostics:safeDiagnostics('MISSING'),metadata:previewMetadata()};
        if (context.audience === 'TRUSTED_PREVIEW' && graph.eligibility.get(project.id)?.publication === 'draft') return {route:'project',routeInfo:route,audience:'TRUSTED_PREVIEW',state:'DRAFT_PREVIEW',httpStatus:200,diagnostics:[],data:{project,contact},chrome:site,metadata:previewMetadata()};
        return ready(route,{project,contact},site,profile,project,context);
      }
      case 'article': {
        const article = lookupDetail(route,graph);
        if (!article) return context.audience === 'PUBLIC' ? {route:'article',routeInfo:route,audience:'PUBLIC',state:'MISSING',httpStatus:404,diagnostics:safeDiagnostics('MISSING'),metadata:failureMetadata()} : {route:'article',routeInfo:route,audience:'TRUSTED_PREVIEW',state:'MISSING',httpStatus:404,diagnostics:safeDiagnostics('MISSING'),metadata:previewMetadata()};
        if (context.audience === 'TRUSTED_PREVIEW' && graph.eligibility.get(article.id)?.publication === 'draft') return {route:'article',routeInfo:route,audience:'TRUSTED_PREVIEW',state:'DRAFT_PREVIEW',httpStatus:200,diagnostics:[],data:{article,contact},chrome:site,metadata:previewMetadata()};
        return ready(route,{article,contact},site,profile,article,context);
      }
    }
  } catch {
    // Explicit dispatch preserves route/payload correlation even on failures; no whole-result assertion.
    switch (route.route) {
      case 'home': return error(route,context); case 'about': return error(route,context); case 'work': return error(route,context);
      case 'projects': return error(route,context); case 'project': return error(route,context); case 'writing': return error(route,context);
      case 'article': return error(route,context); case 'tools': return error(route,context); case 'contact': return error(route,context);
    }
  }
}

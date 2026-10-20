import type { PageContext, PublicPageContext } from './contracts/boundary';
import type { ArticleDetail, ProfileView, ProjectDetail, SiteChrome } from './contracts/domain';
import type { CollectionKey, MatchedRoute, MetadataBase, NoPublicMetadata, PreviewMetadata, PublicEmptyMetadata, PublicReadyMetadata } from './contracts/pages';
import type { MeaningfulImage } from './contracts/media';
import { fail, id, member, nonemptyText, positive, record, text } from './resolve';
import { assetUrl, canonicalUrl, siteOrigin } from './urls';

export function failureMetadata(): NoPublicMetadata {
  return {title:nonemptyText('Content unavailable'),description:nonemptyText('Content is unavailable.'),breadcrumbs:[],robots:'noindex,nofollow',sitemapEligible:false};
}
export function previewMetadata(): PreviewMetadata { return {...failureMetadata(),cacheControl:'no-store'}; }
/** Validate runtime policy data and copy only the frozen public image fields. */
function meaningfulImage(value: unknown): MeaningfulImage {
  const image = record(value), accessibility = record(image.accessibility);
  if (accessibility.kind !== 'meaningful') fail('SITE_POLICY_INVALID');
  return {
    id:id(image.id),src:assetUrl(image.src),
    mime:member(image.mime,['image/jpeg','image/png','image/webp','image/avif','image/gif','image/svg+xml']),
    width:positive(image.width),height:positive(image.height),
    ...(image.title === undefined ? {} : {title:text(image.title)}),
    ...(image.description === undefined ? {} : {description:text(image.description)}),
    accessibility:{kind:'meaningful',alt:nonemptyText(accessibility.alt)},
  };
}
function validatedDefaultImage(context: PageContext): MeaningfulImage|undefined {
  const p = context.policy;
  if (!p || p.locale !== 'en-US' || p.selectionAndOrder !== 'SECTION_5_INITIAL_POLICY' || !Array.isArray(p.intentionallyPublicEmptyRoutes) || p.intentionallyPublicEmptyRoutes.some(k => !['work','projects','writing','tools'].includes(k)) || new Set(p.intentionallyPublicEmptyRoutes).size !== p.intentionallyPublicEmptyRoutes.length) fail('SITE_POLICY_INVALID');
  if (context.audience === 'PUBLIC') {
    if (context.mode !== 'release' && context.mode !== 'offline-demo') fail('SITE_POLICY_INVALID');
  } else if (context.audience !== 'TRUSTED_PREVIEW' || context.mode !== 'trusted-preview') fail('SITE_POLICY_INVALID');
  if (context.mode === 'release') {
    if (!p.siteOrigin || !p.defaultSocialImage) fail('SITE_POLICY_INVALID');
    try {
      siteOrigin(p.siteOrigin);
      return meaningfulImage(p.defaultSocialImage);
    } catch { fail('SITE_POLICY_INVALID'); }
  }
  return undefined;
}
export function validatePagePolicy(context: PageContext): void { validatedDefaultImage(context); }
/** Candidate breadcrumbs for a future visible detail UI; frozen page fixtures currently select []. */
export function detailBreadcrumbs(route: Extract<MatchedRoute,{route:'project'|'article'}>, title: string): MetadataBase['breadcrumbs'] {
  return [{label:text('Home'),href:'/'},route.route === 'project' ? {label:text('Projects'),href:'/projects'} : {label:text('Writing'),href:'/writing'},{label:text(title),href:route.path}];
}
export function readyMetadata(route: MatchedRoute, site: SiteChrome, profile: ProfileView, detail: ProjectDetail|ArticleDetail|undefined, context: PublicPageContext): PublicReadyMetadata {
  const defaultImage = validatedDefaultImage(context);
  const labels = {home:`${profile.name} - ${profile.primaryTitle}`,about:`About ${profile.name} | ${site.siteName}`,work:`Work & Experience | ${site.siteName}`,projects:`Projects & Case Studies | ${site.siteName}`,writing:`Writing | ${site.siteName}`,tools:`Tools & Platforms | ${site.siteName}`,contact:`Contact | ${site.siteName}`} as const;
  const title = route.route === 'project' || route.route === 'article' ? `${detail?.seo.title ?? detail?.title ?? ''} | ${site.siteName}` : labels[route.route];
  if ((route.route === 'project' || route.route === 'article') && !detail) fail('SITE_POLICY_INVALID');
  const description = detail ? detail.seo.description ?? ('summary' in detail ? detail.summary : detail.excerpt) : route.route === 'home' ? profile.shortBio : site.siteDescription ?? profile.shortBio;
  const base: MetadataBase = {title:nonemptyText(title),description:nonemptyText(description),breadcrumbs:[]};
  if (context.mode === 'offline-demo') return {...base,mode:'offline-demo',robots:'noindex,nofollow',sitemapEligible:false};
  const origin = context.policy.siteOrigin; const image = detail?.seo.socialImage ?? detail?.heroImage ?? defaultImage;
  if (!origin || !image) fail('SITE_POLICY_INVALID');
  const canonical = canonicalUrl(origin,route.path);
  return {...base,mode:'release',canonical,robots:'index,follow',sitemapEligible:true,openGraph:{title:base.title,description:base.description,url:canonical,siteName:site.siteName,type:route.route === 'article' ? 'article' : 'website',image}};
}
export function emptyMetadata(route: Extract<MatchedRoute,{route:CollectionKey}>, context: PublicPageContext): PublicEmptyMetadata {
  validatePagePolicy(context);
  const origin = context.policy.siteOrigin;
  const canonical = context.mode === 'release' && origin && context.policy.intentionallyPublicEmptyRoutes.includes(route.route) ? canonicalUrl(origin,route.path) : undefined;
  return {title:nonemptyText('No eligible items'),description:nonemptyText('No eligible items are available.'),breadcrumbs:[],robots:'noindex,follow',sitemapEligible:false,...(canonical ? {canonical} : {})};
}

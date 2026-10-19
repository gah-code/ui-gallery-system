// Internal type-only boundary. Brands/literals do not establish authorization or source validity.
import type { Id, Audience, Slug, HttpsUrl, NonEmpty, DiagnosticCode, Path } from './values';
import type { SiteChrome, ProfileView, SocialLinkView, SiteNavigationLink, ProjectDetail, ArticleDetail, ExperienceView, SkillSummary, SkillGroupView, ToolView } from './domain';
import type { CollectionKey, MatchedRoute, PublicResultByRoute, TrustedPreviewResultByRoute } from './pages';
import type { ImageView, MeaningfulImage } from './media';
export type InternalDiagnostic = Readonly<{ code: DiagnosticCode; severity: 'info' | 'warning' | 'error'; entityId?: Id; fieldPath?: string; route?: Path }>;
export type RevisionEligibility = Readonly<{
  revision:Id;
  publication:'published-revision'|'draft'|'archived'|'unknown';
  publicSafety:'approved'|'not-approved'|'unknown';
}>;
export type PortfolioGraph<A extends Audience> = Readonly<{
  audience:A;
  completeness:'COMPLETE';
  records:Readonly<{
    sites:readonly SiteChrome[]; profiles:readonly ProfileView[];
    socials:ReadonlyMap<Id,SocialLinkView>;
    navigation:ReadonlyMap<Id,SiteNavigationLink>;
    projects:ReadonlyMap<Id,ProjectDetail>;
    articles:ReadonlyMap<Id,ArticleDetail>;
    experience:ReadonlyMap<Id,ExperienceView>;
    skills:ReadonlyMap<Id,SkillSummary>;
    groups:ReadonlyMap<Id,SkillGroupView>;
    tools:ReadonlyMap<Id,ToolView>;
  }>;
  projectBySlug:ReadonlyMap<Slug,Id>;
  articleBySlug:ReadonlyMap<Slug,Id>;
  eligibility:ReadonlyMap<Id,RevisionEligibility>;
}>;
export type NormalizationPolicy = Readonly<{
  locale:'en-US';
  reviewedAccessibility:ReadonlyMap<Id,ImageView['accessibility']>;
  employmentPrecision:ReadonlyMap<Id,'month'>;
  articlePrecision:'day';
  sourceComparison:'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION';
}>;
declare const previewAccessBrand:unique symbol;
export type ValidatedPreviewAccess = Readonly<{
  [previewAccessBrand]:true;
  subject:Id;
  scope:'portfolio-preview';
}>;
export type PublicNormalizationContext = Readonly<{
  audience:'PUBLIC'; policy:NormalizationPolicy;
  revisionFacts:ReadonlyMap<Id,RevisionEligibility>;
}>;
export type TrustedPreviewNormalizationContext = Readonly<{
  audience:'TRUSTED_PREVIEW'; policy:NormalizationPolicy;
  revisionFacts:ReadonlyMap<Id,RevisionEligibility>;
  access:ValidatedPreviewAccess;
}>;
export type PagePolicy = Readonly<{
  locale:'en-US';
  selectionAndOrder:'SECTION_5_INITIAL_POLICY';
  siteOrigin?:HttpsUrl;
  defaultSocialImage?:MeaningfulImage;
  intentionallyPublicEmptyRoutes:readonly CollectionKey[];
}>;
export type PublicPageContext = Readonly<{
  audience:'PUBLIC'; mode:'release'|'offline-demo'; policy:PagePolicy;
}>;
export type TrustedPreviewPageContext = Readonly<{
  audience:'TRUSTED_PREVIEW'; mode:'trusted-preview'; policy:PagePolicy;
  access:ValidatedPreviewAccess;
}>;
export type NormalizationResult<G> =
  | { readonly ok:true; readonly graph:G;
      readonly diagnostics:readonly InternalDiagnostic[] }
  | { readonly ok:false; readonly graph?:never;
      readonly diagnostics:NonEmpty<InternalDiagnostic> };
export type NormalizationContext =
  PublicNormalizationContext | TrustedPreviewNormalizationContext;
export type PageContext = PublicPageContext | TrustedPreviewPageContext;


export type RouteParseResult = Readonly<{ kind: 'MATCHED'; match: MatchedRoute }> | Readonly<{ kind: 'UNMATCHED'; reason: 'PATH_NOT_SUPPORTED' }>;
// Future 06.3 callable contracts, without runtime declarations or implementations.
export interface NormalizeSource {
  (input: unknown, context: PublicNormalizationContext): NormalizationResult<PortfolioGraph<'PUBLIC'>>;
  (input: unknown, context: TrustedPreviewNormalizationContext): NormalizationResult<PortfolioGraph<'TRUSTED_PREVIEW'>>;
}
export interface AssembleRoute {
  <R extends MatchedRoute>(route: R, graph: PortfolioGraph<'PUBLIC'>, context: PublicPageContext): PublicResultByRoute[R['route']];
  <R extends MatchedRoute>(route: R, graph: PortfolioGraph<'TRUSTED_PREVIEW'>, context: TrustedPreviewPageContext): TrustedPreviewResultByRoute[R['route']];
}

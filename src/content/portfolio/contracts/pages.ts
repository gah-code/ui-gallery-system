import type { Audience, NonEmpty, Empty, Text, NonEmptyText, HttpsUrl, Email, MailtoUrl, Slug, ProjectPath, ArticlePath, Path } from './values';
import type { ProfileView, ProfileSummary, SiteChrome, SocialPlatform, ProjectPreview, ProjectDetail, ArticlePreview, ArticleDetail, ExperienceSummary, ExperienceView, SkillGroupView, ToolSummary, ToolView } from './domain';
import type { DocumentLink, MeaningfulImage } from './media';
export type ContactChannel = Readonly<{ kind: 'social'; platform: SocialPlatform; label: Text; href: HttpsUrl }> | Readonly<{ kind: 'email'; label: Text; email: Email; href: MailtoUrl }>;
export type ContactData = Readonly<{ intro: Text; channels: NonEmpty<ContactChannel>; resume?: DocumentLink; availability?: Text; workPreference?: Text; location?: Text }>;
export type HomePageData = Readonly<{ profile: ProfileSummary; projects: readonly ProjectPreview[]; writing: readonly ArticlePreview[]; experience: readonly ExperienceSummary[]; skillGroups: readonly SkillGroupView[]; tools: readonly ToolSummary[]; contact: ContactData }>;
export type AboutPageData = Readonly<{ profile: ProfileView; skillGroups: readonly SkillGroupView[]; experience: readonly ExperienceSummary[]; tools: readonly ToolSummary[]; contact: ContactData }>;
export type WorkPageData = Readonly<{ experiences: readonly ExperienceView[]; contact: ContactData }>;
export type ProjectsPageData = Readonly<{ projects: readonly ProjectPreview[]; contact: ContactData }>;
export type ProjectPageData = Readonly<{ project: ProjectDetail; contact: ContactData }>;
export type WritingPageData = Readonly<{ articles: readonly ArticlePreview[]; contact: ContactData }>;
export type ArticlePageData = Readonly<{ article: ArticleDetail; contact: ContactData }>;
export type ToolsPageData = Readonly<{ tools: readonly ToolView[]; skillGroups: readonly SkillGroupView[]; contact: ContactData }>;
export type ContactPageData = Readonly<{ profile: ProfileSummary; contact: ContactData }>;
export type PageMetadata = Readonly<{
  title: NonEmptyText; description: NonEmptyText; canonical?: HttpsUrl;
  robots: 'index,follow' | 'noindex,follow' | 'noindex,nofollow'; sitemapEligible: boolean;
  openGraph?: Readonly<{ title: NonEmptyText; description: NonEmptyText; url?: HttpsUrl; siteName: Text; type: 'website' | 'article'; image: MeaningfulImage }>;
  breadcrumbs: readonly Readonly<{ label: Text; href: Path }>[];
}>;

export type HomeReadyData = HomePageData & (
  | { readonly projects: NonEmpty<ProjectPreview> }
  | { readonly writing: NonEmpty<ArticlePreview> }
  | { readonly experience: NonEmpty<ExperienceSummary> }
);
export type ReadyDataByRoute = {
  home: HomeReadyData;
  about: AboutPageData;
  work: Omit<WorkPageData, 'experiences'> & {
    readonly experiences: NonEmpty<ExperienceView> };
  projects: Omit<ProjectsPageData, 'projects'> & {
    readonly projects: NonEmpty<ProjectPreview> };
  project: ProjectPageData;
  writing: Omit<WritingPageData, 'articles'> & {
    readonly articles: NonEmpty<ArticlePreview> };
  article: ArticlePageData;
  tools: Omit<ToolsPageData, 'tools'> & {
    readonly tools: NonEmpty<ToolView> };
  contact: ContactPageData;
};
export type RouteKey = keyof ReadyDataByRoute;
export type CollectionKey = 'work' | 'projects' | 'writing' | 'tools';
export type DetailKey = 'project' | 'article';
export type EmptyDataByRoute = {
  work: Omit<WorkPageData, 'experiences'> & { readonly experiences: Empty };
  projects: Omit<ProjectsPageData, 'projects'> & { readonly projects: Empty };
  writing: Omit<WritingPageData, 'articles'> & { readonly articles: Empty };
  tools: Omit<ToolsPageData, 'tools'> & { readonly tools: Empty };
};
export type RouteByKey = {
  home: { readonly route:'home'; readonly path:'/' };
  about: { readonly route:'about'; readonly path:'/about' };
  work: { readonly route:'work'; readonly path:'/work' };
  projects: { readonly route:'projects'; readonly path:'/projects' };
  project: { readonly route:'project'; readonly path:ProjectPath;
    readonly slug:Slug };
  writing: { readonly route:'writing'; readonly path:'/writing' };
  article: { readonly route:'article'; readonly path:ArticlePath;
    readonly slug:Slug };
  tools: { readonly route:'tools'; readonly path:'/tools' };
  contact: { readonly route:'contact'; readonly path:'/contact' };
};
export type MatchedRoute = RouteByKey[RouteKey];
export type PageDataByRoute = ReadyDataByRoute;
// No independent PageData union is accepted by the assembler.

export type MetadataBase = Omit<PageMetadata,
  'canonical' | 'robots' | 'sitemapEligible' | 'openGraph'>;
export type NoPublicMetadata = MetadataBase & {
  readonly canonical?: never;
  readonly openGraph?: never;
  readonly robots:'noindex,nofollow';
  readonly sitemapEligible:false;
};
export type PublicReadyMetadata =
  | (MetadataBase & {
      readonly mode:'release';
      readonly canonical:HttpsUrl;
      readonly robots:'index,follow';
      readonly sitemapEligible:true;
      readonly openGraph: {
        readonly title:NonEmptyText; readonly description:NonEmptyText;
        readonly url:HttpsUrl; readonly siteName:Text;
        readonly type:'website'|'article'; readonly image:MeaningfulImage;
      };
    })
  | (NoPublicMetadata & { readonly mode:'offline-demo' });
export type PublicEmptyMetadata = MetadataBase & {
  readonly canonical?:HttpsUrl;
  readonly openGraph?:never;
  readonly robots:'noindex,follow';
  readonly sitemapEligible:false;
};
export type PreviewMetadata = NoPublicMetadata & {
  readonly cacheControl:'no-store';
};
export type ReadyMetadata<A extends Audience> =
  A extends 'PUBLIC' ? PublicReadyMetadata : PreviewMetadata;
export type EmptyMetadata<A extends Audience> =
  A extends 'PUBLIC' ? PublicEmptyMetadata : PreviewMetadata;
export type FailureMetadata<A extends Audience> =
  A extends 'PUBLIC' ? NoPublicMetadata : PreviewMetadata;

// Closed message projection: no entity IDs, field paths, raw values or stack.
export type PublicDiagnostic =
  | { readonly code:'COLLECTION_EMPTY';
      readonly message:'No eligible items are available.' }
  | { readonly code:'ROUTE_NOT_FOUND';
      readonly message:'This page could not be found.' }
  | { readonly code:'CONTENT_UNAVAILABLE';
      readonly message:'Content is unavailable.' }
  | { readonly code:'MEDIA_UNAVAILABLE';
      readonly message:'This media is unavailable.' };
export type ResultIdentity<K extends RouteKey, A extends Audience> = {
  readonly route:K;
  readonly routeInfo:RouteByKey[K];
  readonly audience:A;
  readonly diagnostics:readonly PublicDiagnostic[];
};
export type Ready<K extends RouteKey, A extends Audience> =
  ResultIdentity<K,A> & {
    readonly state:'READY'; readonly httpStatus:200;
    readonly data:ReadyDataByRoute[K]; readonly chrome:SiteChrome;
    readonly metadata:ReadyMetadata<A>;
  };
export type EmptyFor<K extends RouteKey, A extends Audience> =
  K extends CollectionKey ? ResultIdentity<K,A> & {
    readonly state:'EMPTY'; readonly httpStatus:200;
    readonly data:EmptyDataByRoute[K]; readonly chrome:SiteChrome;
    readonly metadata:EmptyMetadata<A>;
  } : never;
export type MissingFor<K extends RouteKey, A extends Audience> =
  K extends DetailKey ? ResultIdentity<K,A> & {
    readonly state:'MISSING'; readonly httpStatus:404;
    readonly data?:never; readonly chrome?:never;
    readonly metadata:FailureMetadata<A>;
  } : never;
export type Failure<K extends RouteKey, A extends Audience> =
  ResultIdentity<K,A> & {
    readonly state:'ERROR'; readonly httpStatus:500|503;
    readonly data?:never; readonly chrome?:never;
    readonly metadata:FailureMetadata<A>;
  };
export type PreviewDetail<K extends RouteKey> =
  K extends DetailKey ? ResultIdentity<K,'TRUSTED_PREVIEW'> & {
    readonly state:'DRAFT_PREVIEW'; readonly httpStatus:200;
    readonly data:ReadyDataByRoute[K]; readonly chrome:SiteChrome;
    readonly metadata:PreviewMetadata;
  } : never;
export type PublicResultByRoute = {
  [K in RouteKey]:
    | Ready<K,'PUBLIC'> | EmptyFor<K,'PUBLIC'>
    | MissingFor<K,'PUBLIC'> | Failure<K,'PUBLIC'>
};
export type TrustedPreviewResultByRoute = {
  [K in RouteKey]:
    | Ready<K,'TRUSTED_PREVIEW'> | EmptyFor<K,'TRUSTED_PREVIEW'>
    | MissingFor<K,'TRUSTED_PREVIEW'> | Failure<K,'TRUSTED_PREVIEW'>
    | PreviewDetail<K>
};
export type PublicRouteResult = PublicResultByRoute[RouteKey];
export type TrustedPreviewRouteResult = TrustedPreviewResultByRoute[RouteKey];

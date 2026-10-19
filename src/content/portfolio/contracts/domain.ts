import type { Id, Text, NonEmpty, Slug, ProjectPath, ArticlePath, HttpsUrl, Email, StaticRouteKey, StaticPath, NonNegativeInteger, Integer } from './values';
import type { MeaningfulImage, ImageView, DocumentLink, EditorialMetadata } from './media';
import type { RichTextDocument } from './rich-text';
export type SocialPlatform = 'linkedin' | 'github' | 'personal-site' | 'figma' | 'medium' | 'devto' | 'substack' | 'x' | 'bluesky' | 'mastodon' | 'other';
export type ProjectType = 'case-study' | 'cms-architecture' | 'content-modeling' | 'migration-replatforming' | 'frontend-integration' | 'content-operations' | 'workflow-automation';
export type ProjectStatus = 'completed' | 'ongoing' | 'in-progress' | 'archived';
export type ArticlePillar = 'cms-architecture' | 'frontend-implementation' | 'content-operations' | 'migration-strategy' | 'seo-accessibility-content-quality' | 'ai-assisted-workflows';
export type ArticleCategory = 'technical-guide' | 'field-note' | 'strategy-note' | 'case-study-note' | 'reflection';
export type EmploymentType = 'full-time' | 'contract' | 'consulting' | 'freelance' | 'part-time' | 'internship' | 'volunteer';
export type ToolCategory = 'cms-platform' | 'frontend-framework' | 'language-runtime' | 'design-qa' | 'seo-analytics' | 'deployment-devops' | 'collaboration-workflow' | 'automation-ai';
export type YearMonth = Readonly<{ year: Integer; month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; precision: 'month' }>;
declare const dateBrand: unique symbol;
export type CalendarDate = string & { readonly [dateBrand]: 'CalendarDate' };
export type SocialLinkView = Readonly<{ id: Id; platform: SocialPlatform; label: Text; href: HttpsUrl; sortOrder?: NonNegativeInteger }>;
export type SiteNavigationLink = Readonly<{ id: Id; label: Text; routeKey: StaticRouteKey; href: StaticPath; description?: Text }>;
export type SiteChrome = Readonly<{ id: Id; siteName: Text; siteDescription?: Text; primaryNavigation: NonEmpty<SiteNavigationLink>; footerNavigation: readonly SiteNavigationLink[]; socialLinks: readonly SocialLinkView[] }>;
export type ProfileView = Readonly<{
  id: Id; name: Text; primaryTitle: Text; secondaryTitle?: Text; positioningStatement: Text;
  shortBio: Text; longBio: RichTextDocument<'profile-long'>; profileImage: MeaningfulImage;
  publicEmail?: Email; location?: Text; availabilityStatus?: Text; workPreference?: Text;
  contactIntro?: Text; resume?: DocumentLink; learningHighlights?: RichTextDocument<'simple'>;
  socialLinks: readonly SocialLinkView[];
}>;
export type ProfileSummary = Pick<ProfileView, 'id' | 'name' | 'primaryTitle' | 'secondaryTitle' | 'positioningStatement' | 'shortBio' | 'profileImage' | 'location'>;
export type AuthorSummary = Pick<ProfileView, 'id' | 'name' | 'primaryTitle' | 'profileImage'>;
export type SkillSummary = Readonly<{ id: Id; name: Text; summary?: Text; proofSummary?: Text }>;
export type SkillGroupView = Readonly<{ id: Id; name: Text; description?: Text; sortOrder?: NonNegativeInteger; skills: NonEmpty<SkillSummary> }>;
export type ToolSummary = Readonly<{ id: Id; name: Text; category: ToolCategory; usageContext: Text; externalUrl?: HttpsUrl; logo?: ImageView }>;
export type ProjectPreview = Readonly<{
  id: Id; slug: Slug; href: ProjectPath; title: Text; summary: Text; projectType: ProjectType;
  projectStatus?: ProjectStatus; role: Text; contextSummary?: Text; outcome: Text;
  heroImage: MeaningfulImage; tags: readonly Text[]; skills: readonly SkillSummary[]; tools: readonly ToolSummary[];
}>;
export type ProjectDetail = ProjectPreview & Readonly<{
  problem: Text; approach: Text; caseStudyBody?: RichTextDocument<'body'>; metrics?: Text;
  galleryImages: readonly MeaningfulImage[]; liveUrl?: HttpsUrl; repositoryUrl?: HttpsUrl;
  seo: EditorialMetadata; relatedExperience?: ExperienceSummary;
  relatedProjects: readonly ProjectPreview[]; relatedArticles: readonly ArticlePreview[];
}>;
export type ArticlePreview = Readonly<{
  id: Id; slug: Slug; href: ArticlePath; title: Text; excerpt: Text; publishDate: CalendarDate;
  updatedDate?: CalendarDate; contentPillar?: ArticlePillar; category?: ArticleCategory;
  tags: readonly Text[]; heroImage?: MeaningfulImage; author: AuthorSummary;
}>;
export type ArticleDetail = ArticlePreview & Readonly<{
  body: RichTextDocument<'body'>; seo: EditorialMetadata; relatedProjects: readonly ProjectPreview[];
  relatedArticles: readonly ArticlePreview[]; skills: readonly SkillSummary[]; tools: readonly ToolSummary[];
}>;
export type ExperienceSummary = Readonly<{ id: Id; company: Text; role: Text; start: YearMonth; end?: YearMonth; currentRole?: boolean; summary: Text }>;
export type ExperienceView = ExperienceSummary & Readonly<{
  responsibilities: RichTextDocument<'simple'>; achievements: RichTextDocument<'simple'>;
  location?: Text; employmentType?: EmploymentType; companyUrl?: HttpsUrl; companyLogo?: ImageView;
  metrics?: Text; contextSummary?: Text; skills: readonly SkillSummary[]; tools: readonly ToolSummary[];
  relatedArticles: readonly ArticlePreview[]; relatedProjects: readonly ProjectPreview[];
}>;
export type ToolView = ToolSummary & Readonly<{ skills: readonly SkillSummary[]; proof: Readonly<{ projects: readonly ProjectPreview[]; experience: readonly ExperienceSummary[]; articles: readonly ArticlePreview[] }> }>;

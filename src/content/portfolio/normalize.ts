import type { NormalizationPolicy, InternalDiagnostic, PortfolioGraph } from './contracts/boundary';
import type { ArticleDetail, ArticlePreview, AuthorSummary, CalendarDate, ExperienceSummary, ExperienceView, ProfileSummary, ProfileView, ProjectDetail, ProjectPreview, SkillGroupView, SkillSummary, SocialLinkView, SiteChrome, SiteNavigationLink, ToolSummary, ToolView, YearMonth } from './contracts/domain';
import type { DocumentLink, EditorialMetadata, ImageView, MeaningfulImage } from './contracts/media';
import type { Id, Integer } from './contracts/values';
import { array, enums, fail, member, nonempty, nonemptyText, nonnegative, positive, record, referenceIds, schema, text } from './resolve';
import type { ContentType, SourceRecord } from './resolve';
import { articlePath, assetUrl, email, externalUrl, projectPath, slug, staticPaths } from './urls';
import { normalizeRichText } from './rich-text';

export function calendarDate(value: unknown): CalendarDate {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail('DATE_INVALID');
  const year = Number(value.slice(0,4)), month = Number(value.slice(5,7)), day = Number(value.slice(8,10));
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const max = [31,leap ? 29 : 28,31,30,31,30,31,31,30,31,30,31][month-1];
  if (year < 1 || max === undefined || day < 1 || day > max) fail('DATE_INVALID');
  return value as CalendarDate;
}
export function yearMonth(value: unknown, precision: unknown): YearMonth {
  const date = calendarDate(value);
  if (precision !== 'month' || !date.endsWith('-01')) fail('DATE_INVALID');
  const year = Number(date.slice(0,4)), month = Number(date.slice(5,7));
  // Calendar validation proves integral year and month 1..12; precision is supplied, never inferred.
  return {year:year as Integer,month:month as YearMonth['month'],precision:'month'};
}
function required<T>(value: T | undefined): T { if (value === undefined) fail('REQUIRED_FIELD'); return value; }
function meaningful(value: ImageView | DocumentLink): MeaningfulImage {
  if (value.mime === 'application/pdf' || value.accessibility.kind !== 'meaningful') fail('MEDIA_INVALID');
  return {...value,accessibility:{kind:'meaningful',alt:value.accessibility.alt}};
}
export function normalizeAssets(records: ReadonlyMap<Id, SourceRecord>, policy: NormalizationPolicy): ReadonlyMap<Id, ImageView|DocumentLink> {
  const assets = new Map<Id, ImageView|DocumentLink>();
  for (const r of records.values()) {
    if (r.type !== 'Asset') continue;
    if (Object.keys(r.fields).some(k => !['title','description','file'].includes(k))) fail('MEDIA_INVALID',r.id);
    const f = record(r.fields.file,'MEDIA_INVALID'), details = record(f.details,'MEDIA_INVALID');
    const href = assetUrl(f.url), fileName = nonemptyText(f.fileName), bytes = positive(details.size);
    const accessibility = policy.reviewedAccessibility.get(r.id);
    if (!accessibility) fail('MEDIA_INVALID',r.id);
    if (f.contentType === 'application/pdf') {
      if (accessibility.kind !== 'meaningful') fail('MEDIA_INVALID',r.id);
      // Reviewed document treatment shares the context vocabulary, but projects to a link label, not alt.
      assets.set(r.id,{id:r.id,href,mime:'application/pdf',fileName,bytes,label:nonemptyText(accessibility.alt)});
    } else {
      const imageMimes = ['image/jpeg','image/png','image/webp','image/avif','image/gif','image/svg+xml'] as const;
      if (!imageMimes.some(m => m === f.contentType)) fail('UNSUPPORTED_MEDIA',r.id);
      const mime = member(f.contentType,imageMimes);
      const dimensions = record(details.image,'MEDIA_INVALID');
      assets.set(r.id,{id:r.id,src:href,mime,width:positive(dimensions.width),height:positive(dimensions.height),
        ...(r.fields.title === undefined ? {} : {title:text(r.fields.title)}),
        ...(r.fields.description === undefined ? {} : {description:text(r.fields.description)}),
        accessibility:accessibility.kind === 'meaningful' ? {kind:'meaningful',alt:nonemptyText(accessibility.alt)} : {kind:'decorative',alt:''}});
    }
    // Validate present metadata even for PDF, whose UI projection intentionally has no title/description fields.
    if (r.fields.title !== undefined) text(r.fields.title);
    if (r.fields.description !== undefined) text(r.fields.description);
  }
  return assets;
}
export function profileSummary(p: ProfileView): ProfileSummary {
  return {id:p.id,name:p.name,primaryTitle:p.primaryTitle,positioningStatement:p.positioningStatement,shortBio:p.shortBio,profileImage:p.profileImage,
    ...(p.secondaryTitle === undefined ? {} : {secondaryTitle:p.secondaryTitle}),...(p.location === undefined ? {} : {location:p.location})};
}
export function authorSummary(p: ProfileView): AuthorSummary { return {id:p.id,name:p.name,primaryTitle:p.primaryTitle,profileImage:p.profileImage}; }
export function projectPreview(p: ProjectPreview): ProjectPreview {
  return {id:p.id,slug:p.slug,href:p.href,title:p.title,summary:p.summary,projectType:p.projectType,role:p.role,outcome:p.outcome,heroImage:p.heroImage,tags:p.tags,skills:p.skills,tools:p.tools,
    ...(p.projectStatus === undefined ? {} : {projectStatus:p.projectStatus}),...(p.contextSummary === undefined ? {} : {contextSummary:p.contextSummary})};
}
export function articlePreview(a: ArticlePreview): ArticlePreview {
  return {id:a.id,slug:a.slug,href:a.href,title:a.title,excerpt:a.excerpt,publishDate:a.publishDate,tags:a.tags,author:a.author,
    ...(a.updatedDate === undefined ? {} : {updatedDate:a.updatedDate}),...(a.heroImage === undefined ? {} : {heroImage:a.heroImage}),
    ...(a.category === undefined ? {} : {category:a.category}),...(a.contentPillar === undefined ? {} : {contentPillar:a.contentPillar})};
}
export function experienceSummary(e: ExperienceSummary): ExperienceSummary {
  return {id:e.id,company:e.company,role:e.role,start:e.start,summary:e.summary,...(e.end === undefined ? {} : {end:e.end}),...(e.currentRole === undefined ? {} : {currentRole:e.currentRole})};
}
export const compare = (a: string, b: string): number => a < b ? -1 : a > b ? 1 : 0;
export const projectOrder = (a: ProjectPreview,b: ProjectPreview): number => compare(a.slug,b.slug) || compare(a.id,b.id);
export const articleOrder = (a: ArticlePreview,b: ArticlePreview): number => compare(b.publishDate,a.publishDate) || compare(a.slug,b.slug) || compare(a.id,b.id);
const monthNumber = (v: YearMonth): number => v.year * 12 + v.month;
export const experienceOrder = (a: ExperienceSummary,b: ExperienceSummary): number => Number(b.currentRole === true)-Number(a.currentRole === true) || monthNumber(b.start)-monthNumber(a.start) || (b.end ? monthNumber(b.end) : -1)-(a.end ? monthNumber(a.end) : -1) || compare(a.id,b.id);
export const toolOrder = (a: ToolSummary,b: ToolSummary): number => enums.toolCategory.indexOf(a.category)-enums.toolCategory.indexOf(b.category) || compare(a.name.toLowerCase(),b.name.toLowerCase()) || compare(a.id,b.id);
export const groupOrder = (a: SkillGroupView,b: SkillGroupView): number => (a.sortOrder ?? Infinity)-(b.sortOrder ?? Infinity) || compare(a.name.toLowerCase(),b.name.toLowerCase()) || compare(a.id,b.id);

/** Called first for every canonical record, then for the audience-eligible subgraph. */
export function projectRecords(records: ReadonlyMap<Id,SourceRecord>, active: ReadonlySet<Id>, assets: ReadonlyMap<Id,ImageView|DocumentLink>, policy: NormalizationPolicy, diagnostics: InternalDiagnostic[]): PortfolioGraph<'PUBLIC'>['records'] {
  const rows = (type: ContentType): readonly SourceRecord[] => [...records.values()].filter(r => r.type === type && active.has(r.id));
  function ids(r: SourceRecord, field: string): readonly Id[] {
    const all = referenceIds(r,field);
    const accepted = all.filter(key => {
      if (active.has(key)) return true;
      diagnostics.push({code:'TARGET_INELIGIBLE',severity:'warning',entityId:r.id,fieldPath:field}); return false;
    });
    if (r.type !== 'Asset' && schema[r.type][field]?.required && accepted.length !== all.length) fail('TARGET_INELIGIBLE',r.id,field);
    return accepted;
  }
  function refs<T>(r: SourceRecord, field: string, map: ReadonlyMap<Id,T>): readonly T[] {
    return ids(r,field).map(key => { const value = map.get(key); if (!value) fail('REFERENCE_MISSING',r.id,field); return value; });
  }
  function media(r: SourceRecord, field: string): ImageView|DocumentLink|undefined {
    const key = ids(r,field)[0]; return key === undefined ? undefined : required(assets.get(key));
  }
  function image(r: SourceRecord, field: string): ImageView|undefined {
    const m = media(r,field); if (m?.mime === 'application/pdf') fail('MEDIA_INVALID',r.id,field); return m;
  }
  function meaningfulImage(r: SourceRecord, field: string): MeaningfulImage|undefined {
    const m = media(r,field); return m === undefined ? undefined : meaningful(m);
  }
  function embedded(key: Id): MeaningfulImage|DocumentLink {
    if (!active.has(key)) fail('TARGET_INELIGIBLE',key);
    const m = assets.get(key); if (!m) fail('REFERENCE_MISSING',key);
    return m.mime === 'application/pdf' ? m : meaningful(m);
  }
  function editorial(r: SourceRecord): EditorialMetadata {
    const title = r.fields.seoTitle === undefined ? undefined : String(r.fields.seoTitle).trim();
    const description = r.fields.seoDescription === undefined ? undefined : String(r.fields.seoDescription).trim();
    const socialImage = meaningfulImage(r,'socialImage');
    return {...(title ? {title:nonemptyText(title)} : {}),...(description ? {description:nonemptyText(description)} : {}),...(socialImage ? {socialImage} : {})};
  }
  function tags(r: SourceRecord) { return r.fields.tags === undefined ? [] : array(r.fields.tags).map(v => text(v,40)); }
  const socials = new Map<Id,SocialLinkView>();
  for (const r of rows('socialLink')) socials.set(r.id,{id:r.id,platform:member(r.fields.platform,enums.platform),label:text(r.fields.label),href:externalUrl(r.fields.url),...(r.fields.sortOrder === undefined ? {} : {sortOrder:nonnegative(r.fields.sortOrder)})});
  const navigation = new Map<Id,SiteNavigationLink>();
  for (const r of rows('navigationItem')) { const routeKey = member(r.fields.routeKey,enums.routeKey); navigation.set(r.id,{id:r.id,label:text(r.fields.label),routeKey,href:staticPaths[routeKey],...(r.fields.description === undefined ? {} : {description:text(r.fields.description)})}); }
  const skills = new Map<Id,SkillSummary>();
  for (const r of rows('skill')) skills.set(r.id,{id:r.id,name:text(r.fields.name),...(r.fields.summary === undefined ? {} : {summary:text(r.fields.summary)}),...(r.fields.proofSummary === undefined ? {} : {proofSummary:text(r.fields.proofSummary)})});
  const profiles = new Map<Id,ProfileView>();
  for (const r of rows('personProfile')) {
    const resume = media(r,'resume'); if (resume && resume.mime !== 'application/pdf') fail('MEDIA_INVALID',r.id,'resume');
    const learning = r.fields.learningHighlights === undefined ? undefined : normalizeRichText(r.fields.learningHighlights,'simple',false,embedded);
    if (r.fields.learningHighlights !== undefined && !learning) diagnostics.push({code:'RT_EMPTY',severity:'info',entityId:r.id,fieldPath:'learningHighlights'});
    profiles.set(r.id,{id:r.id,name:text(r.fields.name),primaryTitle:text(r.fields.primaryTitle),positioningStatement:text(r.fields.positioningStatement),shortBio:text(r.fields.shortBio),longBio:required(normalizeRichText(r.fields.longBio,'profile-long',true,embedded)),profileImage:required(meaningfulImage(r,'profileImage')),socialLinks:refs(r,'socialLinks',socials),
      ...(r.fields.secondaryTitle === undefined ? {} : {secondaryTitle:text(r.fields.secondaryTitle)}),...(r.fields.publicEmail === undefined ? {} : {publicEmail:email(r.fields.publicEmail)}),
      ...(r.fields.location === undefined ? {} : {location:text(r.fields.location)}),...(r.fields.availabilityStatus === undefined ? {} : {availabilityStatus:text(r.fields.availabilityStatus)}),
      ...(r.fields.workPreference === undefined ? {} : {workPreference:text(r.fields.workPreference)}),...(r.fields.contactIntro === undefined ? {} : {contactIntro:text(r.fields.contactIntro)}),...(resume ? {resume} : {}),...(learning ? {learningHighlights:learning} : {})});
  }
  const toolSummaries = new Map<Id,ToolSummary>();
  for (const r of rows('tool')) {
    const logo = image(r,'logo'); toolSummaries.set(r.id,{id:r.id,name:text(r.fields.name),category:member(r.fields.category,enums.toolCategory),usageContext:text(r.fields.usageContext),...(r.fields.externalUrl === undefined ? {} : {externalUrl:externalUrl(r.fields.externalUrl)}),...(logo ? {logo} : {})});
  }
  const experienceSummaries = new Map<Id,ExperienceSummary>();
  for (const r of rows('experienceItem')) {
    const start = yearMonth(r.fields.startDate,policy.employmentPrecision.get(r.id));
    const end = r.fields.endDate === undefined ? undefined : yearMonth(r.fields.endDate,policy.employmentPrecision.get(r.id));
    const current = r.fields.isCurrentRole;
    if (current !== undefined && typeof current !== 'boolean') fail('SOURCE_TYPE',r.id);
    if (end && (monthNumber(end) < monthNumber(start) || current === true)) fail('DATE_CONFLICT',r.id);
    experienceSummaries.set(r.id,{id:r.id,company:text(r.fields.company),role:text(r.fields.role),summary:text(r.fields.summary),start,...(end ? {end} : {}),...(current === undefined ? {} : {currentRole:current})});
    if (r.id === 'seed05-experience-whoi-frontend-developer' && (r.fields.tools === undefined || array(r.fields.tools).length === 0)) diagnostics.push({code:'WHOI_OPTIONAL_EMPTY',severity:'info',entityId:r.id,fieldPath:'/fields/tools'});
  }
  const projectPreviews = new Map<Id,ProjectPreview>();
  for (const r of rows('project')) {
    const s = slug(r.fields.slug); projectPreviews.set(r.id,{id:r.id,slug:s,href:projectPath(s),title:text(r.fields.title),summary:text(r.fields.summary),projectType:member(r.fields.projectType,enums.projectType),role:text(r.fields.role),outcome:text(r.fields.outcome),heroImage:required(meaningfulImage(r,'heroImage')),tags:tags(r),skills:refs(r,'skills',skills),tools:refs(r,'tools',toolSummaries),
      ...(r.fields.projectStatus === undefined ? {} : {projectStatus:member(r.fields.projectStatus,enums.projectStatus)}),...(r.fields.contextSummary === undefined ? {} : {contextSummary:text(r.fields.contextSummary)})});
  }
  const articlePreviews = new Map<Id,ArticlePreview>();
  for (const r of rows('article')) {
    const s = slug(r.fields.slug), publishDate = calendarDate(r.fields.publishDate);
    const updatedDate = r.fields.updatedDate === undefined ? undefined : calendarDate(r.fields.updatedDate);
    if (updatedDate && updatedDate < publishDate) fail('DATE_CONFLICT',r.id);
    const heroImage = meaningfulImage(r,'heroImage');
    articlePreviews.set(r.id,{id:r.id,slug:s,href:articlePath(s),title:text(r.fields.title),excerpt:text(r.fields.excerpt),publishDate,tags:tags(r),author:authorSummary(required(refs(r,'authorProfile',profiles)[0])),
      ...(updatedDate ? {updatedDate} : {}),...(heroImage ? {heroImage} : {}),...(r.fields.contentPillar === undefined ? {} : {contentPillar:member(r.fields.contentPillar,enums.contentPillar)}),...(r.fields.category === undefined ? {} : {category:member(r.fields.category,enums.category)})});
  }
  const groups = new Map<Id,SkillGroupView>();
  for (const r of rows('skillGroup')) groups.set(r.id,{id:r.id,name:text(r.fields.name),skills:nonempty(refs(r,'skills',skills)),...(r.fields.description === undefined ? {} : {description:text(r.fields.description)}),...(r.fields.sortOrder === undefined ? {} : {sortOrder:nonnegative(r.fields.sortOrder)})});
  const sites: SiteChrome[] = rows('siteSettings').map(r => ({id:r.id,siteName:text(r.fields.siteName),primaryNavigation:nonempty(refs(r,'primaryNavigationItems',navigation)),footerNavigation:refs(r,'footerNavigationItems',navigation),socialLinks:refs(r,'socialLinks',socials),...(r.fields.siteDescription === undefined ? {} : {siteDescription:text(r.fields.siteDescription)})}));
  function reverse<T>(type: ContentType, field: string, target: Id, map: ReadonlyMap<Id,T>, order: (a:T,b:T)=>number): readonly T[] {
    return rows(type).filter(r => referenceIds(r,field).includes(target)).map(r => required(map.get(r.id))).sort(order);
  }
  const projects = new Map<Id,ProjectDetail>();
  for (const r of rows('project')) {
    const body = r.fields.caseStudyBody === undefined ? undefined : normalizeRichText(r.fields.caseStudyBody,'body',false,embedded);
    if (r.fields.caseStudyBody !== undefined && !body) diagnostics.push({code:'RT_EMPTY',severity:'info',entityId:r.id,fieldPath:'caseStudyBody'});
    const relatedExperience = refs(r,'relatedExperience',experienceSummaries)[0];
    projects.set(r.id,{...required(projectPreviews.get(r.id)),problem:text(r.fields.problem),approach:text(r.fields.approach),galleryImages:ids(r,'galleryImages').map(key => meaningful(required(assets.get(key)))),seo:editorial(r),relatedProjects:refs(r,'relatedProjects',projectPreviews),relatedArticles:reverse('article','relatedProjects',r.id,articlePreviews,articleOrder),
      ...(body ? {caseStudyBody:body} : {}),...(relatedExperience ? {relatedExperience} : {}),...(r.fields.metrics === undefined ? {} : {metrics:text(r.fields.metrics)}),...(r.fields.liveUrl === undefined ? {} : {liveUrl:externalUrl(r.fields.liveUrl)}),...(r.fields.repositoryUrl === undefined ? {} : {repositoryUrl:externalUrl(r.fields.repositoryUrl)})});
  }
  const articles = new Map<Id,ArticleDetail>();
  for (const r of rows('article')) articles.set(r.id,{...required(articlePreviews.get(r.id)),body:required(normalizeRichText(r.fields.body,'body',true,embedded)),seo:editorial(r),relatedProjects:refs(r,'relatedProjects',projectPreviews),relatedArticles:refs(r,'relatedArticles',articlePreviews),skills:refs(r,'skills',skills),tools:refs(r,'tools',toolSummaries)});
  const experience = new Map<Id,ExperienceView>();
  for (const r of rows('experienceItem')) {
    const companyLogo = image(r,'companyLogo');
    experience.set(r.id,{...required(experienceSummaries.get(r.id)),responsibilities:required(normalizeRichText(r.fields.responsibilities,'simple',true,embedded)),achievements:required(normalizeRichText(r.fields.achievements,'simple',true,embedded)),skills:refs(r,'skills',skills),tools:refs(r,'tools',toolSummaries),relatedArticles:refs(r,'relatedArticles',articlePreviews),relatedProjects:reverse('project','relatedExperience',r.id,projectPreviews,projectOrder),
      ...(r.fields.location === undefined ? {} : {location:text(r.fields.location)}),...(r.fields.employmentType === undefined ? {} : {employmentType:member(r.fields.employmentType,enums.employmentType)}),...(r.fields.companyUrl === undefined ? {} : {companyUrl:externalUrl(r.fields.companyUrl)}),...(companyLogo ? {companyLogo} : {}),...(r.fields.metrics === undefined ? {} : {metrics:text(r.fields.metrics)}),...(r.fields.contextSummary === undefined ? {} : {contextSummary:text(r.fields.contextSummary)})});
  }
  const tools = new Map<Id,ToolView>();
  for (const r of rows('tool')) tools.set(r.id,{...required(toolSummaries.get(r.id)),skills:refs(r,'skills',skills),proof:{projects:reverse('project','tools',r.id,projectPreviews,projectOrder),experience:reverse('experienceItem','tools',r.id,experienceSummaries,experienceOrder),articles:reverse('article','tools',r.id,articlePreviews,articleOrder)}});
  return {sites,profiles:[...profiles.values()],socials,navigation,projects,articles,experience,skills,groups,tools};
}

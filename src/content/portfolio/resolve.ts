import type { DiagnosticCode, Id, NonEmpty, NonEmptyText, NonNegativeInteger, PositiveInteger, Text } from './contracts/values';
import type { InternalDiagnostic, RevisionEligibility } from './contracts/boundary';
import { email, externalUrl, hasControl, slug } from './urls';

export class SourceFault extends Error {
  constructor(readonly code: DiagnosticCode, readonly entityId?: Id, readonly fieldPath?: string) { super(code); }
}
export function fail(code: DiagnosticCode, entityId?: Id, fieldPath?: string): never { throw new SourceFault(code, entityId, fieldPath); }
export function record(value: unknown, code: DiagnosticCode = 'SOURCE_TYPE'): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) fail(code);
  return value as Record<string, unknown>; // Object shape checked; members deliberately remain unknown.
}
export function array(value: unknown, code: DiagnosticCode = 'SOURCE_TYPE'): readonly unknown[] {
  if (!Array.isArray(value)) fail(code);
  return value;
}
export function id(value: unknown): Id {
  if (typeof value !== 'string' || !value.trim() || hasControl(value)) fail('SOURCE_TYPE');
  return value as Id;
}
export function text(value: unknown, max = Infinity): Text {
  if (typeof value !== 'string' || !value.trim() || value.includes('\0') || value.length > max) fail('REQUIRED_FIELD');
  return value as Text;
}
export function nonemptyText(value: unknown): NonEmptyText { return text(value) as string as NonEmptyText; }
export function positive(value: unknown): PositiveInteger {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value <= 0) fail('MEDIA_INVALID');
  return value as PositiveInteger;
}
export function nonnegative(value: unknown): NonNegativeInteger {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) fail('SOURCE_TYPE');
  return value as NonNegativeInteger;
}
export function member<const T extends readonly string[]>(value: unknown, choices: T): T[number] {
  if (typeof value !== 'string' || !choices.some(choice => choice === value)) fail('SOURCE_TYPE');
  return value as T[number]; // Exact runtime membership test, not an unchecked domain-object assertion.
}
export function nonempty<T>(values: readonly T[], code: DiagnosticCode = 'REFERENCE_CARDINALITY'): NonEmpty<T> {
  const [first, ...rest] = values;
  if (first === undefined) fail(code);
  return [first, ...rest];
}
export const types = ['siteSettings', 'personProfile', 'socialLink', 'navigationItem', 'project', 'article', 'experienceItem', 'skill', 'skillGroup', 'tool'] as const;
export type ContentType = typeof types[number];
export const enums = {
  platform: ['linkedin','github','personal-site','figma','medium','devto','substack','x','bluesky','mastodon','other'],
  routeKey: ['home','about','work','projects','writing','tools','contact'],
  projectType: ['case-study','cms-architecture','content-modeling','migration-replatforming','frontend-integration','content-operations','workflow-automation'],
  projectStatus: ['completed','ongoing','in-progress','archived'],
  contentPillar: ['cms-architecture','frontend-implementation','content-operations','migration-strategy','seo-accessibility-content-quality','ai-assisted-workflows'],
  category: ['technical-guide','field-note','strategy-note','case-study-note','reflection'],
  employmentType: ['full-time','contract','consulting','freelance','part-time','internship','volunteer'],
  toolCategory: ['cms-platform','frontend-framework','language-runtime','design-qa','seo-analytics','deployment-devops','collaboration-workflow','automation-ai'],
} as const;
type Rule = Readonly<{ kind: 'text'|'seo'|'url'|'email'|'slug'|'integer'|'boolean'|'date'|'rich'|'tags'|'link'; required?: boolean; max?: number; values?: readonly string[]; target?: ContentType|'Asset'; many?: boolean }>;
const t = (max: number, required = false): Rule => ({ kind:'text', max, required });
const choice = (values: readonly string[], required = false): Rule => ({ kind:'text', values, required });
const link = (target: ContentType|'Asset', many = false, required = false): Rule => ({ kind:'link', target, many, required });
const rich = (required = false): Rule => ({ kind:'rich', required });
const url: Rule = {kind:'url'};
const seo = { seoTitle:{kind:'seo',max:90}, seoDescription:{kind:'seo',max:220}, socialImage:link('Asset') } as const;
const tags: Rule = {kind:'tags'};
/** Exactly the 99 frozen stored fields; reverse joins never enter this schema. */
export const schema: Readonly<Record<ContentType, Readonly<Record<string, Rule>>>> = {
  siteSettings:{siteName:t(120,true),siteDescription:t(300),primaryNavigationItems:link('navigationItem',true,true),footerNavigationItems:link('navigationItem',true),socialLinks:link('socialLink',true)},
  personProfile:{name:t(120,true),primaryTitle:t(120,true),secondaryTitle:t(120),positioningStatement:t(1200,true),shortBio:t(300,true),longBio:rich(true),profileImage:link('Asset',false,true),publicEmail:{kind:'email'},location:t(120),availabilityStatus:t(120),workPreference:t(1200),contactIntro:t(1200),resume:link('Asset'),learningHighlights:rich(),socialLinks:link('socialLink',true)},
  socialLink:{platform:choice(enums.platform,true),label:t(120,true),url:{kind:'url',required:true},sortOrder:{kind:'integer'}},
  navigationItem:{label:t(40,true),routeKey:choice(enums.routeKey,true),description:t(300)},
  project:{title:t(120,true),slug:{kind:'slug',required:true},summary:t(300,true),projectType:choice(enums.projectType,true),projectStatus:choice(enums.projectStatus),role:t(1200,true),contextSummary:t(1200),problem:t(1200,true),approach:t(1200,true),outcome:t(1200,true),caseStudyBody:rich(),metrics:t(1200),heroImage:link('Asset',false,true),galleryImages:link('Asset',true),liveUrl:url,repositoryUrl:url,tags,...seo,skills:link('skill',true),tools:link('tool',true),relatedExperience:link('experienceItem'),relatedProjects:link('project',true)},
  article:{title:t(120,true),slug:{kind:'slug',required:true},excerpt:t(300,true),body:rich(true),publishDate:{kind:'date',required:true},updatedDate:{kind:'date'},contentPillar:choice(enums.contentPillar),category:choice(enums.category),tags,heroImage:link('Asset'),...seo,authorProfile:link('personProfile',false,true),relatedProjects:link('project',true),relatedArticles:link('article',true),skills:link('skill',true),tools:link('tool',true)},
  experienceItem:{company:t(120,true),role:t(120,true),startDate:{kind:'date',required:true},endDate:{kind:'date'},isCurrentRole:{kind:'boolean'},summary:t(300,true),responsibilities:rich(true),achievements:rich(true),location:t(120),employmentType:choice(enums.employmentType),companyUrl:url,companyLogo:link('Asset'),metrics:t(1200),contextSummary:t(1200),skills:link('skill',true),tools:link('tool',true),relatedArticles:link('article',true)},
  skill:{name:t(120,true),summary:t(300),proofSummary:t(1200)},
  skillGroup:{name:t(120,true),description:t(300),sortOrder:{kind:'integer'},skills:link('skill',true,true)},
  tool:{name:t(120,true),category:choice(enums.toolCategory,true),usageContext:t(1200,true),externalUrl:url,logo:link('Asset'),skills:link('skill',true)},
};
export type SourceRecord = Readonly<{ id: Id; type: ContentType|'Asset'; revision: Id; fields: Readonly<Record<string, unknown>> }>;
export function localizedFields(value: unknown): Readonly<Record<string, unknown>> {
  const fields = record(value); const result: [string, unknown][] = [];
  for (const [name, envelope] of Object.entries(fields)) {
    const localized = record(envelope, 'LOCALE_MISMATCH');
    if (Object.keys(localized).length !== 1 || !Object.hasOwn(localized,'en-US')) fail('LOCALE_MISMATCH');
    if (localized['en-US'] === null || localized['en-US'] === undefined) fail('SOURCE_TYPE');
    result.push([name,localized['en-US']]);
  }
  return Object.fromEntries(result);
}
export function linkId(value: unknown, kind: 'Asset'|'Entry'): Id {
  const r = record(value, 'REFERENCE_KIND'); const sys = record(r.sys, 'REFERENCE_KIND');
  if (sys.type !== 'Link' || sys.linkType !== kind) fail('REFERENCE_KIND');
  return id(sys.id);
}
export function referenceIds(r: SourceRecord, field: string): readonly Id[] {
  if (r.type === 'Asset') fail('SOURCE_TYPE');
  const rule = schema[r.type][field]; if (!rule || rule.kind !== 'link') fail('SOURCE_TYPE');
  const value = r.fields[field]; if (value === undefined) return [];
  if (!rule.many && Array.isArray(value)) fail('REFERENCE_CARDINALITY',r.id,field);
  return (rule.many ? array(value, 'REFERENCE_CARDINALITY') : [value]).map(v => linkId(v, rule.target === 'Asset' ? 'Asset' : 'Entry'));
}
export function indexRecords(entries: unknown, assets: unknown): ReadonlyMap<Id, SourceRecord> {
  const result = new Map<Id, SourceRecord>();
  // Explicit implementation safety ceiling, not a CMS cardinality constraint.
  if (array(entries).length + array(assets).length > 100000) fail('SOURCE_INVALID');
  for (const [values, kind] of [[array(entries),'Entry'],[array(assets),'Asset']] as const) for (const value of values) {
    const r = record(value); const sys = record(r.sys); if (sys.type !== kind) fail('SOURCE_TYPE');
    const key = id(sys.id); if (result.has(key)) fail('SOURCE_INVALID',key);
    let type: ContentType|'Asset' = 'Asset';
    if (kind === 'Entry') {
      const c = record(record(sys.contentType).sys);
      if (c.type !== 'Link' || c.linkType !== 'ContentType') fail('SOURCE_TYPE',key);
      type = member(c.id,types);
    }
    result.set(key,{id:key,type,revision:id(sys.revisionId),fields:localizedFields(r.fields)});
  }
  return result;
}
export function validateFields(records: ReadonlyMap<Id, SourceRecord>): void {
  const slugs = new Map<string, Id>();
  for (const r of records.values()) {
    if (r.type === 'Asset') continue;
    const rules = schema[r.type];
    if (Object.keys(r.fields).some(k => !Object.hasOwn(rules,k))) fail('SOURCE_INVALID',r.id);
    for (const [name, rule] of Object.entries(rules)) {
      const value = r.fields[name];
      if (value === undefined) { if (rule.required) fail('REQUIRED_FIELD',r.id,name); continue; }
      try {
        switch (rule.kind) {
          case 'text': text(value,rule.max); if (rule.values) member(value,rule.values); break;
          case 'seo': if (typeof value !== 'string' || value.includes('\0') || value.length > (rule.max ?? Infinity)) fail('SOURCE_TYPE'); break;
          case 'url': externalUrl(value); break;
          case 'email': email(value); break;
          case 'slug': {
            const s = slug(value); const key = `${r.type}:${s}`; if (slugs.has(key)) fail('SLUG_AMBIGUOUS'); slugs.set(key,r.id); break;
          }
          case 'integer': nonnegative(value); break;
          case 'boolean': if (typeof value !== 'boolean') fail('SOURCE_TYPE'); break;
          case 'date': text(value); break; // Exact date/calendar conflicts are validated in normalize.ts.
          case 'rich': record(value); break; // Full policy/structure validation precedes preview projection.
          case 'tags': { const values = array(value); if (values.length > 12) fail('SOURCE_INVALID'); values.forEach(v => text(v,40)); break; }
          case 'link': {
            const ids = referenceIds(r,name);
            if ((rule.required && ids.length === 0) || new Set(ids).size !== ids.length) fail('REFERENCE_CARDINALITY');
            for (const targetId of ids) {
              const target = records.get(targetId); if (!target) fail('REFERENCE_MISSING');
              if (target.type !== rule.target) fail('REFERENCE_TYPE');
              if (targetId === r.id) fail('SELF_REFERENCE');
            }
            break;
          }
        }
      } catch (error) { if (error instanceof SourceFault) fail(error.code,r.id,name); fail('SOURCE_INVALID',r.id,name); }
    }
  }
}
/** Iterative DFS terminates even for long cycles; derived reverse views are not authored edges. */
export function relatedCycles(records: ReadonlyMap<Id, SourceRecord>): readonly InternalDiagnostic[] {
  const done = new Set<Id>(); const active = new Set<Id>(); const diagnostics: InternalDiagnostic[] = [];
  for (const r of records.values()) {
    if (done.has(r.id) || !['project','article'].includes(r.type)) continue;
    const stack: {id:Id; exit:boolean}[] = [{id:r.id,exit:false}];
    while (stack.length) {
      const frame = stack.pop(); if (!frame) break;
      if (frame.exit) { active.delete(frame.id); done.add(frame.id); continue; }
      if (active.has(frame.id)) { diagnostics.push({code:'RELATED_CYCLE',severity:'warning',entityId:frame.id}); continue; }
      if (done.has(frame.id)) continue;
      const current = records.get(frame.id); if (!current) fail('REFERENCE_MISSING');
      active.add(frame.id); stack.push({id:frame.id,exit:true});
      const field = current.type === 'project' ? 'relatedProjects' : 'relatedArticles';
      for (const target of [...referenceIds(current,field)].reverse()) stack.push({id:target,exit:false});
    }
  }
  return diagnostics;
}
export function revisionFact(value: unknown, source: SourceRecord): RevisionEligibility {
  const r = record(value,'SOURCE_UNAVAILABLE');
  if (id(r.revision) !== source.revision) fail('SOURCE_UNAVAILABLE',source.id);
  return {revision:source.revision,publication:member(r.publication,['published-revision','draft','archived','unknown']),publicSafety:member(r.publicSafety,['approved','not-approved','unknown'])};
}

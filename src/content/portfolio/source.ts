import type { Audience, Id } from './contracts/values';
import type { ImageView } from './contracts/media';
import type { InternalDiagnostic, NormalizationContext, NormalizationPolicy, NormalizationResult, PortfolioGraph, PublicNormalizationContext, RevisionEligibility, TrustedPreviewNormalizationContext } from './contracts/boundary';
import { fail, id, indexRecords, member, nonemptyText, record, relatedCycles, revisionFact, SourceFault, validateFields } from './resolve';
import { normalizeAssets, projectRecords } from './normalize';

/**
 * Accepted private input envelope:
 * { kind:'portfolio-offline-snapshot', completeness:'COMPLETE', entries:[], assets:[] }.
 * Each constructed source sys has an explicit revisionId matching its trusted context fact.
 * COMPLETE is a caller assertion about acquisition coverage, not inferred from record count.
 * This pure boundary validates that assertion's shape and all records/links; it cannot prove
 * transport completeness or authenticate an erased TypeScript brand. Partial/error acquisitions
 * must never be wrapped as COMPLETE. Live transport and preview authentication remain later gates.
 */
export function validatePreviewAccess(value: unknown): void {
  const access = record(value,'SITE_POLICY_INVALID');
  if (access.scope !== 'portfolio-preview') fail('SITE_POLICY_INVALID');
  id(access.subject);
  // A string fixture marker cannot pass. Structurally valid access still relies on the trusted caller.
}
function checkedPolicy(value: unknown): NormalizationPolicy {
  const p = record(value,'SITE_POLICY_INVALID');
  if (p.locale !== 'en-US' || p.articlePrecision !== 'day' || p.sourceComparison !== 'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION' || !(p.reviewedAccessibility instanceof Map) || !(p.employmentPrecision instanceof Map)) fail('SITE_POLICY_INVALID');
  const reviewedAccessibility = new Map<Id,ImageView['accessibility']>();
  for (const [key,value] of p.reviewedAccessibility) {
    const a = record(value,'MEDIA_INVALID'); const kind = member(a.kind,['meaningful','decorative']);
    if (kind === 'decorative' && a.alt !== '') fail('MEDIA_INVALID');
    reviewedAccessibility.set(id(key),kind === 'meaningful' ? {kind,alt:nonemptyText(a.alt)} : {kind,alt:''});
  }
  const employmentPrecision = new Map<Id,'month'>();
  for (const [key,value] of p.employmentPrecision) { if (value !== 'month') fail('DATE_INVALID'); employmentPrecision.set(id(key),value); }
  return {locale:'en-US',articlePrecision:'day',sourceComparison:'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',reviewedAccessibility,employmentPrecision};
}
function normalize<A extends Audience>(input: unknown, context: NormalizationContext, audience: A): NormalizationResult<PortfolioGraph<A>> {
  try {
    const c = record(context,'SITE_POLICY_INVALID');
    if (c.audience !== audience || !(c.revisionFacts instanceof Map)) fail('SITE_POLICY_INVALID');
    if (audience === 'TRUSTED_PREVIEW') validatePreviewAccess(c.access);
    const policy = checkedPolicy(c.policy);
    const snapshot = record(input,'SOURCE_UNAVAILABLE');
    if (snapshot.kind !== 'portfolio-offline-snapshot' || snapshot.completeness !== 'COMPLETE' || Object.keys(snapshot).some(k => !['kind','completeness','entries','assets'].includes(k))) fail('SOURCE_UNAVAILABLE');
    const indexed = indexRecords(snapshot.entries,snapshot.assets);
    validateFields(indexed);
    const facts = new Map<Id,RevisionEligibility>(); const active = new Set<Id>();
    const diagnostics: InternalDiagnostic[] = [...relatedCycles(indexed)];
    for (const r of indexed.values()) {
      const fact = revisionFact(c.revisionFacts.get(r.id),r); facts.set(r.id,fact);
      if (fact.publication === 'unknown' || fact.publicSafety === 'unknown') fail('SOURCE_UNAVAILABLE',r.id);
      const eligible = fact.publicSafety === 'approved' && (fact.publication === 'published-revision' || (audience === 'TRUSTED_PREVIEW' && fact.publication === 'draft'));
      if (eligible) active.add(r.id); else diagnostics.push({code:'TARGET_INELIGIBLE',severity:'info',entityId:r.id});
    }
    const assets = normalizeAssets(indexed,policy);
    // Validate full canonical bodies/media/dates even when previews or audience filtering would hide them.
    projectRecords(indexed,new Set(indexed.keys()),assets,policy,[]);
    const records = projectRecords(indexed,active,assets,policy,diagnostics);
    return {ok:true,graph:{audience,completeness:'COMPLETE',records,projectBySlug:new Map([...records.projects.values()].map(p => [p.slug,p.id])),articleBySlug:new Map([...records.articles.values()].map(a => [a.slug,a.id])),eligibility:facts},diagnostics};
  } catch (error) {
    const fault = error instanceof SourceFault ? error : new SourceFault('SOURCE_INVALID');
    return {ok:false,diagnostics:[{code:fault.code,severity:'error',...(fault.entityId === undefined ? {} : {entityId:fault.entityId}),...(fault.fieldPath === undefined ? {} : {fieldPath:fault.fieldPath})}]};
  }
}
export function normalizeSource(input: unknown, context: PublicNormalizationContext): NormalizationResult<PortfolioGraph<'PUBLIC'>>;
export function normalizeSource(input: unknown, context: TrustedPreviewNormalizationContext): NormalizationResult<PortfolioGraph<'TRUSTED_PREVIEW'>>;
export function normalizeSource(input: unknown, context: NormalizationContext): NormalizationResult<PortfolioGraph<'PUBLIC'>> | NormalizationResult<PortfolioGraph<'TRUSTED_PREVIEW'>> {
  if (context?.audience === 'PUBLIC') return normalize(input,context,'PUBLIC');
  return normalize(input,context,'TRUSTED_PREVIEW');
}

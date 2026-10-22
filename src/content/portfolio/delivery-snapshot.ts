import { createHash } from 'node:crypto';
import type { PublicNormalizationContext, RevisionEligibility } from './contracts/boundary';
import type { SiteChrome } from './contracts/domain';
import type { ImageView } from './contracts/media';
import type { Id } from './contracts/values';
import { normalizeSource } from './source';

/** This private protocol is a simulation, not a Contentful wire/API contract. */
export const MOCK_TARGET = Object.freeze({origin:'https://portfolio-delivery.invalid',space:'mock-portfolio-space',environment:'mock-published',locale:'en-US'});
export const MOCK_CONTENT_TYPES = ['siteSettings','personProfile','socialLink','navigationItem','project','article','experienceItem','skill','skillGroup','tool'] as const;
export type MockContentType = typeof MOCK_CONTENT_TYPES[number];
export type MockTarget = Readonly<{origin:string;space:string;environment:string;locale:string}>;
export type MockCollection = 'entries'|'assets';
export type MockLimits = Readonly<{
  pageSize:number;maxRequests:number;maxPages:number;maxEntries:number;maxAssets:number;maxRecords:number;
  maxBodyBytes:number;maxTotalBodyBytes:number;requestTimeoutMs:number;totalTimeoutMs:number;maxDepth:number;maxIdentityLength:number;
}>;
export const DEFAULT_LIMITS: MockLimits = Object.freeze({pageSize:25,maxRequests:16,maxPages:16,maxEntries:256,maxAssets:64,maxRecords:320,maxBodyBytes:1048576,maxTotalBodyBytes:4194304,requestTimeoutMs:2000,totalTimeoutMs:10000,maxDepth:64,maxIdentityLength:128});
export type MockErrorCode = 'INVALID_INPUT'|'MANIFEST_INVALID'|'LIMIT_INVALID'|'TARGET_INVALID'|'METHOD_INVALID'|'TRANSPORT_REQUIRED'|'ABORTED'|'REQUEST_TIMEOUT'|'TOTAL_TIMEOUT'|'REQUEST_LIMIT'|'PAGE_LIMIT'|'RECORD_LIMIT'|'BODY_LIMIT'|'BYTE_LIMIT'|'HTTP_STATUS'|'REDIRECT'|'TRANSPORT_REJECTED'|'WIRE_INVALID'|'PAGE_INVALID'|'INVENTORY_MISMATCH'|'POLICY_INVALID'|'RECEIPT_INVALID'|'NORMALIZATION_FAILED'|'SITE_COUNT';
export class MockFault extends Error {
  readonly code: MockErrorCode;

  constructor(code: MockErrorCode) {
    super(code);
    this.code = code;
  }
}
export function rejectMock(code:MockErrorCode): never { throw new MockFault(code); }
export type MockFailure = Readonly<{ok:false;error:Readonly<{code:MockErrorCode}>;measurement?:Readonly<{requests:number;pages:number;bodyBytes:number;elapsedMs:number}>}>;
export function mockFailure(error:unknown, fallback:MockErrorCode = 'INVALID_INPUT'): MockFailure {
  return {ok:false,error:{code:error instanceof MockFault ? error.code : fallback}};
}
export function objectShape(value:unknown, keys:readonly string[], code:MockErrorCode): Record<string,unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value) || ![Object.prototype,null].includes(Object.getPrototypeOf(value))) rejectMock(code);
  const own = Reflect.ownKeys(value);
  if (own.length !== keys.length || own.some(k => typeof k !== 'string' || !keys.includes(k))) rejectMock(code);
  for (const key of own) { const d = Object.getOwnPropertyDescriptor(value,key); if (!d || !('value' in d) || !d.enumerable) rejectMock(code); }
  return value as Record<string,unknown>;
}
/** Validate descriptors and a bounded depth before recursion; never invoke input getters/toJSON. */
export function canonicalJson(value:unknown, maxDepth = DEFAULT_LIMITS.maxDepth): string {
  if (!Number.isSafeInteger(maxDepth) || maxDepth < 1 || maxDepth > DEFAULT_LIMITS.maxDepth) rejectMock('INVALID_INPUT');
  const active = new Set<object>(); let nodes = 0, characters = 0;
  function visit(v:unknown, depth:number): string {
    if (++nodes > 1000000) rejectMock('INVALID_INPUT');
    if (v === null) return 'null';
    if (typeof v === 'string') { characters += v.length; if (characters > DEFAULT_LIMITS.maxTotalBodyBytes) rejectMock('INVALID_INPUT'); return JSON.stringify(v); }
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (typeof v === 'number') { if (!Number.isFinite(v)) rejectMock('INVALID_INPUT'); return JSON.stringify(v); }
    if (typeof v !== 'object' || depth > maxDepth || active.has(v)) rejectMock('INVALID_INPUT');
    const proto = Object.getPrototypeOf(v), keys = Reflect.ownKeys(v);
    if (Array.isArray(v)) {
      if (proto !== Array.prototype || keys.length !== v.length + 1 || v.length > 1000000) rejectMock('INVALID_INPUT');
      active.add(v); const values:string[] = [];
      for (let i=0; i<v.length; i++) { const d=Object.getOwnPropertyDescriptor(v,String(i)); if (!d || !('value' in d) || !d.enumerable) rejectMock('INVALID_INPUT'); values.push(visit(d.value,depth+1)); }
      active.delete(v); return `[${values.join(',')}]`;
    }
    if (proto !== Object.prototype && proto !== null) rejectMock('INVALID_INPUT');
    if (keys.some(k => typeof k !== 'string' || [...k].some(character=>character.charCodeAt(0)>127))) rejectMock('INVALID_INPUT');
    active.add(v); const values:string[] = [];
    for (const key of (keys as string[]).sort()) {
      const d=Object.getOwnPropertyDescriptor(v,key); if (!d || !('value' in d) || !d.enumerable) rejectMock('INVALID_INPUT');
      characters += key.length; if (characters > DEFAULT_LIMITS.maxTotalBodyBytes) rejectMock('INVALID_INPUT');
      values.push(`${JSON.stringify(key)}:${visit(d.value,depth+1)}`);
    }
    active.delete(v); return `{${values.join(',')}}`;
  }
  return visit(value,1);
}
export function sha256Canonical(value:unknown): string { return createHash('sha256').update(canonicalJson(value),'utf8').digest('hex'); }
export function sha256Bytes(value:Uint8Array): string { return createHash('sha256').update(value).digest('hex'); }
export function jsonCopy<T>(value:T, maxDepth = DEFAULT_LIMITS.maxDepth): T { return JSON.parse(canonicalJson(value,maxDepth)) as T; }
export function limitsFor(value:Partial<MockLimits> = {}): MockLimits {
  try {
    const supplied=jsonCopy(value);
    if (!supplied || typeof supplied !== 'object' || Array.isArray(supplied)) rejectMock('LIMIT_INVALID');
    if (Object.keys(supplied).some(k => !Object.hasOwn(DEFAULT_LIMITS,k))) rejectMock('LIMIT_INVALID');
    const limits={...DEFAULT_LIMITS,...supplied};
    for (const key of Object.keys(DEFAULT_LIMITS) as (keyof MockLimits)[]) {
      const n=limits[key], ceiling=DEFAULT_LIMITS[key];
      if (!Number.isSafeInteger(n) || n<0 || n>ceiling) rejectMock('LIMIT_INVALID');
      if (['requestTimeoutMs','totalTimeoutMs','maxDepth','maxIdentityLength'].includes(key) && n===0) rejectMock('LIMIT_INVALID');
    }
    if (limits.pageSize!==25) rejectMock('LIMIT_INVALID'); return Object.freeze(limits);
  } catch { return rejectMock('LIMIT_INVALID'); }
}
export function targetMatches(value:unknown): boolean {
  try { objectShape(value,['origin','space','environment','locale'],'TARGET_INVALID'); return canonicalJson(value)===canonicalJson(MOCK_TARGET); } catch { return false; }
}
function identity(value:unknown, limits:MockLimits, code:MockErrorCode): string {
  if (typeof value!=='string' || value.length>limits.maxIdentityLength || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value)) rejectMock(code); return value;
}
export type MockEntry = Readonly<{kind:'Entry';id:string;contentTypeId:MockContentType;revisionToken:string;fields:Readonly<Record<string,unknown>>}>;
export type MockAsset = Readonly<{kind:'Asset';id:string;revisionToken:string;fields:Readonly<Record<string,unknown>>}>;
export type MockRecord = MockEntry|MockAsset;
export type EntryManifestRow = Readonly<{id:string;contentTypeId:MockContentType;revisionToken:string;recordSha256:string}>;
export type AssetManifestRow = Readonly<{id:string;revisionToken:string;recordSha256:string}>;
export type ExpectedManifest = Readonly<{kind:'SYNTHETIC_EXPECTED_POPULATION';target:MockTarget;snapshotId:string;contentTypes:readonly MockContentType[];entries:readonly EntryManifestRow[];assets:readonly AssetManifestRow[]}>;
export function prepareManifest(input:unknown, limits:MockLimits = DEFAULT_LIMITS): ExpectedManifest {
  try {
    const m=objectShape(jsonCopy(input),['kind','target','snapshotId','contentTypes','entries','assets'],'MANIFEST_INVALID');
    if (m.kind!=='SYNTHETIC_EXPECTED_POPULATION' || !targetMatches(m.target)) rejectMock('MANIFEST_INVALID');
    identity(m.snapshotId,limits,'MANIFEST_INVALID');
    const contentTypes=m.contentTypes;
    if (!Array.isArray(contentTypes) || contentTypes.length!==MOCK_CONTENT_TYPES.length || new Set(contentTypes).size!==MOCK_CONTENT_TYPES.length || MOCK_CONTENT_TYPES.some(t => !contentTypes.includes(t))) rejectMock('MANIFEST_INVALID');
    if (!Array.isArray(m.entries) || !Array.isArray(m.assets)) rejectMock('MANIFEST_INVALID');
    if (m.entries.length>limits.maxEntries || m.assets.length>limits.maxAssets || m.entries.length+m.assets.length>limits.maxRecords) rejectMock('RECORD_LIMIT');
    const seen=new Set<string>();
    for (const collection of ['entries','assets'] as const) {
      let previous='';
      for (const value of m[collection] as unknown[]) {
        const row=objectShape(value,collection==='entries' ? ['id','contentTypeId','revisionToken','recordSha256'] : ['id','revisionToken','recordSha256'],'MANIFEST_INVALID');
        const id=identity(row.id,limits,'MANIFEST_INVALID'); identity(row.revisionToken,limits,'MANIFEST_INVALID');
        if (id<=previous || seen.has(id) || typeof row.recordSha256!=='string' || !/^[a-f0-9]{64}$/.test(row.recordSha256)) rejectMock('MANIFEST_INVALID');
        if (collection==='entries' && !MOCK_CONTENT_TYPES.some(t=>t===row.contentTypeId)) rejectMock('MANIFEST_INVALID');
        previous=id; seen.add(id);
      }
    }
    return m as unknown as ExpectedManifest;
  } catch (error) { if (error instanceof MockFault && error.code==='RECORD_LIMIT') throw error; return rejectMock('MANIFEST_INVALID'); }
}
export function validateRecordSlice(input:unknown, manifest:ExpectedManifest, collection:MockCollection, skip:number, limits:MockLimits): readonly MockRecord[] {
  if (!Array.isArray(input)) rejectMock('INVENTORY_MISMATCH');
  const expected=manifest[collection].slice(skip,skip+limits.pageSize);
  if (input.length!==expected.length) rejectMock('INVENTORY_MISMATCH');
  return input.map((value,index) => {
    try {
      const row=expected[index]; if (!row) rejectMock('INVENTORY_MISMATCH');
      const r=objectShape(value,collection==='entries' ? ['kind','id','contentTypeId','revisionToken','fields'] : ['kind','id','revisionToken','fields'],'INVENTORY_MISMATCH');
      if (r.kind!==(collection==='entries'?'Entry':'Asset') || r.id!==row.id || r.revisionToken!==row.revisionToken || (collection==='entries' && r.contentTypeId!==(row as EntryManifestRow).contentTypeId)) rejectMock('INVENTORY_MISMATCH');
      if (!r.fields || typeof r.fields!=='object' || Array.isArray(r.fields)) rejectMock('INVENTORY_MISMATCH');
      if (sha256Canonical(r)!==row.recordSha256) rejectMock('INVENTORY_MISMATCH');
      return jsonCopy(r,limits.maxDepth) as unknown as MockRecord;
    } catch { return rejectMock('INVENTORY_MISMATCH'); }
  });
}
export type MockContext = PublicNormalizationContext;
/** Copy the separately supplied facts before transport can mutate caller state. */
export function prepareContext(input:MockContext, manifest:ExpectedManifest): MockContext {
  try {
    const c=objectShape(input,['audience','policy','revisionFacts'],'POLICY_INVALID');
    const p=objectShape(c.policy,['locale','reviewedAccessibility','employmentPrecision','articlePrecision','sourceComparison'],'POLICY_INVALID');
    if (c.audience!=='PUBLIC' || p.locale!=='en-US' || p.articlePrecision!=='day' || p.sourceComparison!=='STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION') rejectMock('POLICY_INVALID');
    function entries(value:unknown): [unknown,unknown][] {
      if (!(value instanceof Map) || Object.getPrototypeOf(value)!==Map.prototype || value.size>DEFAULT_LIMITS.maxRecords) rejectMock('POLICY_INVALID');
      return [...Map.prototype.entries.call(value)] as [unknown,unknown][];
    }
    const revisionFacts=new Map<Id,RevisionEligibility>();
    for (const [key,value] of entries(c.revisionFacts)) {
      const id=identity(key,DEFAULT_LIMITS,'POLICY_INVALID') as Id;
      const fact=objectShape(jsonCopy(value),['revision','publication','publicSafety'],'POLICY_INVALID');
      identity(fact.revision,DEFAULT_LIMITS,'POLICY_INVALID');
      if (!['published-revision','draft','archived','unknown'].includes(String(fact.publication)) || !['approved','not-approved','unknown'].includes(String(fact.publicSafety))) rejectMock('POLICY_INVALID');
      revisionFacts.set(id,fact as unknown as RevisionEligibility);
    }
    for (const row of [...manifest.entries,...manifest.assets]) {
      const fact=revisionFacts.get(row.id as Id);
      if (!fact || fact.revision!==row.revisionToken || fact.publication!=='published-revision' || fact.publicSafety!=='approved') rejectMock('POLICY_INVALID');
    }
    const reviewedAccessibility=new Map<Id,ImageView['accessibility']>();
    for (const [key,value] of entries(p.reviewedAccessibility)) reviewedAccessibility.set(identity(key,DEFAULT_LIMITS,'POLICY_INVALID') as Id,jsonCopy(value) as ImageView['accessibility']);
    const employmentPrecision=new Map<Id,'month'>();
    for (const [key,value] of entries(p.employmentPrecision)) {
      if (value!=='month') rejectMock('POLICY_INVALID'); employmentPrecision.set(identity(key,DEFAULT_LIMITS,'POLICY_INVALID') as Id,'month');
    }
    return {audience:'PUBLIC',revisionFacts,policy:{locale:'en-US',articlePrecision:'day',sourceComparison:'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',reviewedAccessibility,employmentPrecision}};
  } catch { return rejectMock('POLICY_INVALID'); }
}
export type MockPage = Readonly<{schema:'portfolio-mock-page-v1';target:MockTarget;snapshotId:string;collection:MockCollection;skip:number;limit:number;total:number;items:readonly MockRecord[]}>;
export function pageFor(manifest:ExpectedManifest, collection:MockCollection, skip:number, records:readonly MockRecord[]): MockPage {
  return {schema:'portfolio-mock-page-v1',target:MOCK_TARGET,snapshotId:manifest.snapshotId,collection,skip,limit:25,total:manifest[collection].length,items:records};
}
export type PageMeasurement = Readonly<{collection:MockCollection;skip:number;limit:number;total:number;bodyBytes:number;bodySha256:string;elapsedMs:number}>;
export type MockReceipt = Readonly<{
  kind:'MOCK_ACQUISITION_RECEIPT';provenance:'SYNTHETIC_MOCK_ONLY';contentful_verified:false;public_delivery_verified:false;
  target:MockTarget;snapshotId:string;manifestDigest:string;
  counts:Readonly<{requests:number;pages:number;entries:number;assets:number;records:number;bodyBytes:number}>;
  timing:Readonly<{elapsedMs:number;requestElapsedMs:readonly number[]}>;
  inventory:Readonly<{entries:readonly EntryManifestRow[];assets:readonly AssetManifestRow[]}>;
  pages:readonly PageMeasurement[];coverage:'COMPLETE';normalization:'VALIDATED';
}>;
export type MockSuccess = Readonly<{ok:true;chrome:SiteChrome;receipt:MockReceipt}>;
export type MockResult = MockSuccess|MockFailure;
export function receiptFor(manifest:ExpectedManifest, pages:readonly PageMeasurement[], elapsedMs:number): MockReceipt {
  return {kind:'MOCK_ACQUISITION_RECEIPT',provenance:'SYNTHETIC_MOCK_ONLY',contentful_verified:false,public_delivery_verified:false,target:MOCK_TARGET,snapshotId:manifest.snapshotId,manifestDigest:sha256Canonical(manifest),counts:{requests:pages.length,pages:pages.length,entries:manifest.entries.length,assets:manifest.assets.length,records:manifest.entries.length+manifest.assets.length,bodyBytes:pages.reduce((n,p)=>n+p.bodyBytes,0)},timing:{elapsedMs,requestElapsedMs:pages.map(p=>p.elapsedMs)},inventory:{entries:manifest.entries,assets:manifest.assets},pages,coverage:'COMPLETE',normalization:'VALIDATED'};
}
/** Erased types/brands are not authority: independently recheck every receipt assertion. */
export function projectDeliverySnapshot(input:Readonly<{records:readonly MockRecord[];manifest:unknown;receipt:unknown;context:MockContext;limits?:Partial<MockLimits>}>): MockResult {
  try {
    const limits=limitsFor(input.limits), manifest=prepareManifest(input.manifest,limits), context=prepareContext(input.context,manifest);
    const records=jsonCopy(input.records,limits.maxDepth);
    if (!Array.isArray(records) || records.length!==manifest.entries.length+manifest.assets.length) rejectMock('INVENTORY_MISMATCH');
    const receipt=jsonCopy(input.receipt) as MockReceipt;
    objectShape(receipt,['kind','provenance','contentful_verified','public_delivery_verified','target','snapshotId','manifestDigest','counts','timing','inventory','pages','coverage','normalization'],'RECEIPT_INVALID');
    objectShape(receipt.timing,['elapsedMs','requestElapsedMs'],'RECEIPT_INVALID');
    if (!Array.isArray(receipt.pages) || !Array.isArray(receipt.timing.requestElapsedMs) || !Number.isFinite(receipt.timing.elapsedMs) || receipt.timing.elapsedMs<0 || receipt.timing.elapsedMs>=limits.totalTimeoutMs) rejectMock('RECEIPT_INVALID');
    const expectedPages:PageMeasurement[]=[]; let offset=0;
    for (const collection of ['entries','assets'] as const) {
      const size=manifest[collection].length; let skip=0;
      do {
        const slice=records.slice(offset+skip,offset+skip+Math.min(25,size-skip));
        validateRecordSlice(slice,manifest,collection,skip,limits);
        const original=receipt.pages[expectedPages.length];
        if (!original || !Number.isFinite(original.elapsedMs) || original.elapsedMs<0 || original.elapsedMs>=limits.requestTimeoutMs) rejectMock('RECEIPT_INVALID');
        const bytes=new TextEncoder().encode(canonicalJson(pageFor(manifest,collection,skip,slice),limits.maxDepth));
        if (bytes.length>limits.maxBodyBytes) rejectMock('RECEIPT_INVALID');
        expectedPages.push({collection,skip,limit:25,total:size,bodyBytes:bytes.length,bodySha256:sha256Bytes(bytes),elapsedMs:original.elapsedMs}); skip+=slice.length;
      } while (skip<size);
      offset+=size;
    }
    const expected=receiptFor(manifest,expectedPages,receipt.timing.elapsedMs);
    if (expectedPages.length>limits.maxPages || expectedPages.length>limits.maxRequests || expected.counts.bodyBytes>limits.maxTotalBodyBytes || expected.timing.requestElapsedMs.reduce((n,v)=>n+v,0)>expected.timing.elapsedMs+0.000001 || canonicalJson(receipt)!==canonicalJson(expected)) rejectMock('RECEIPT_INVALID');
    function project(r:MockRecord) {
      return {sys:{id:r.id,type:r.kind,revisionId:r.revisionToken,...(r.kind==='Entry'?{contentType:{sys:{type:'Link',linkType:'ContentType',id:r.contentTypeId}}}:{})},fields:r.fields};
    }
    // This COMPLETE assertion is constructed only after both independently bound inventories agree.
    const snapshot={kind:'portfolio-offline-snapshot',completeness:'COMPLETE',entries:records.filter(r=>r.kind==='Entry').map(project),assets:records.filter(r=>r.kind==='Asset').map(project)};
    const normalized=normalizeSource(snapshot,context);
    if (!normalized.ok) rejectMock('NORMALIZATION_FAILED');
    if (normalized.graph.records.sites.length!==1) rejectMock('SITE_COUNT');
    const chrome=normalized.graph.records.sites[0]; if (!chrome) rejectMock('SITE_COUNT');
    return {ok:true,chrome,receipt:expected};
  } catch (error) { return mockFailure(error); }
}

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import type { PublicNormalizationContext, RevisionEligibility } from './contracts/boundary';
import type { Id } from './contracts/values';
import type { ImageView } from './contracts/media';
import { acquireMockDelivery } from './delivery.server';
import type { AcquireOptions, MockRequest, MockResponse, MockTransport } from './delivery.server';
import { canonicalJson, DEFAULT_LIMITS, MOCK_CONTENT_TYPES, MOCK_TARGET, MockFault, mockFailure, projectDeliverySnapshot, rejectMock } from './delivery-snapshot';
import type { ExpectedManifest, MockRecord } from './delivery-snapshot';
import { representativeEntries, representativeAssets, malformedSourceCases, sourceFixtureContextPolicy } from '../../data/portfolio/source-fixtures';
import { siteChrome } from '../../data/portfolio/normalized-fixtures';
import { fixtureId, fixtureNonEmptyText } from '../../data/portfolio/media';

// This is synthetic, independently bound test data, not an observation of a live CMS.
const TARGET = { origin: 'https://portfolio-delivery.invalid', space: 'mock-portfolio-space', environment: 'mock-published', locale: 'en-US' } as const;
const TYPES = ['siteSettings', 'personProfile', 'socialLink', 'navigationItem', 'project', 'article', 'experienceItem', 'skill', 'skillGroup', 'tool'] as const;
const MARKER = 'synthetic-private-marker-never-a-real-token';
const encoder = new TextEncoder();
type Population = { entries: MockRecord[]; assets: MockRecord[] };
type Page = Record<string, unknown>;
type PageChange = (page: Page, request: MockRequest) => void;
type ResponseChange = (response: MockResponse, request: MockRequest) => MockResponse;
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Test expected an object');
  return value as Record<string, unknown>;
}
function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error('Test expected an array');
  return value;
}
function required<T>(value: T | undefined): T {
  if (value === undefined) throw new Error('Missing independent test fixture');
  return value;
}
/** Test-owned canonicalizer: the acceptance manifest does not call candidate digest code. */
function independentCanonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(independentCanonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${independentCanonical(object(value)[key])}`).join(',')}}`;
  const scalar = JSON.stringify(value);
  if (scalar === undefined || (typeof value === 'number' && !Number.isFinite(value))) throw new Error('Invalid independent fixture scalar');
  return scalar;
}
function digest(value: unknown): string { return createHash('sha256').update(independentCanonical(value)).digest('hex'); }
function freeze(value: unknown): void {
  if (!value || typeof value !== 'object' || ArrayBuffer.isView(value)) return;
  if (value instanceof Map) for (const [key, item] of value) { freeze(key); freeze(item); }
  else for (const item of Object.values(value)) freeze(item);
  Object.freeze(value);
}
function entry(raw: unknown): MockRecord {
  const source = object(raw), sys = object(source.sys);
  return { kind: 'Entry', id: String(sys.id), contentTypeId: String(object(object(sys.contentType).sys).id) as typeof TYPES[number], revisionToken: `synthetic-revision-${String(sys.id)}`, fields: structuredClone(object(source.fields)) };
}
function population(): Population {
  const order = (a: MockRecord, b: MockRecord) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  return {
    entries: representativeEntries.map(entry).sort(order),
    assets: representativeAssets.map(a => ({ kind: 'Asset' as const, id: a.sys.id, revisionToken: `synthetic-revision-${a.sys.id}`, fields: structuredClone(a.fields) })).sort(order),
  };
}
function manifest(pop: Population): ExpectedManifest {
  return {
    kind: 'SYNTHETIC_EXPECTED_POPULATION', target: { ...TARGET }, snapshotId: 'synthetic-whole-population-v1', contentTypes: [...TYPES],
    entries: pop.entries.map(r => { if (r.kind !== 'Entry') throw new Error('Expected independent entry'); return { id: r.id, contentTypeId: r.contentTypeId, revisionToken: r.revisionToken, recordSha256: digest(r) }; }),
    assets: pop.assets.map(r => ({ id: r.id, revisionToken: r.revisionToken, recordSha256: digest(r) })),
  };
}
function context(pop: Population): PublicNormalizationContext {
  return {
    audience: 'PUBLIC',
    policy: {
      locale: 'en-US', articlePrecision: 'day', sourceComparison: 'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',
      reviewedAccessibility: new Map<Id, ImageView['accessibility']>(sourceFixtureContextPolicy.reviewedAccessibility.map(a => [fixtureId(a.id), { kind: 'meaningful', alt: fixtureNonEmptyText(a.text) }])),
      employmentPrecision: new Map(sourceFixtureContextPolicy.employmentPrecision.map(p => [fixtureId(p.id), 'month' as const])),
    },
    revisionFacts: new Map<Id, RevisionEligibility>([...pop.entries, ...pop.assets].map(r => [fixtureId(r.id), { revision: fixtureId(r.revisionToken), publication: 'published-revision', publicSafety: 'approved' }])),
  };
}
function contextIdentity(c: PublicNormalizationContext): string {
  return independentCanonical({ audience: c.audience, revisionFacts: [...c.revisionFacts], policy: { ...c.policy, reviewedAccessibility: [...c.policy.reviewedAccessibility], employmentPrecision: [...c.policy.employmentPrecision] } });
}
function harness(pop = population(), changePage?: PageChange, changeResponse?: ResponseChange) {
  // Manifest and policy are fixed independently before the first transport call.
  const expected = manifest(pop), policy = context(pop);
  const calls: MockRequest[] = [], pages: Page[] = [], bodies: Uint8Array[] = [];
  const transport: MockTransport = async (request, signal) => {
    if (signal.aborted) throw new Error('Synthetic mock was already cancelled');
    calls.push(structuredClone(request));
    const collection = pop[request.collection];
    const page: Page = { schema: 'portfolio-mock-page-v1', target: { ...TARGET }, snapshotId: expected.snapshotId, collection: request.collection, skip: request.skip, limit: 25, total: collection.length, items: structuredClone(collection.slice(request.skip, request.skip + 25)) };
    changePage?.(page, request);
    pages.push(page);
    const response: MockResponse = { status: 200, redirected: false, finalTarget: { ...TARGET }, body: encoder.encode(independentCanonical(page)) };
    const final = changeResponse ? changeResponse(response, request) : response;
    bodies.push(final.body);
    return final;
  };
  const options: AcquireOptions = { manifest: expected, context: policy, credentialMarker: MARKER };
  return { pop, manifest: expected, context: policy, options, transport, calls, pages, bodies };
}
type Harness = ReturnType<typeof harness>;
function run(h: Harness, overrides: Partial<AcquireOptions> = {}) { return acquireMockDelivery({ ...h.options, transport: h.transport, ...overrides }); }
function failure(result: Awaited<ReturnType<typeof acquireMockDelivery>>, code: string) {
  expect(result.ok).toBe(false);
  if (result.ok) throw new Error('Unexpected synthetic acquisition success');
  expect(result.error).toEqual({ code });
  for (const key of ['chrome', 'receipt', 'snapshot', 'graph']) expect(result).not.toHaveProperty(key);
  expect(JSON.stringify(result)).not.toContain('COMPLETE');
  expect(JSON.stringify(result)).not.toContain(MARKER);
  return result;
}
function first(pop: Population, type: typeof TYPES[number]): MockRecord {
  return required(pop.entries.find(r => r.kind === 'Entry' && r.contentTypeId === type));
}
function setField(record: MockRecord, field: string, value: unknown, locale = 'en-US'): void { object(record.fields)[field] = { [locale]: value }; }
function link(id: string) { return { sys: { type: 'Link', linkType: 'Entry', id } }; }
function withMoreEntries(count: number): Population {
  const pop = population();
  while (pop.entries.length < count) {
    const id = `synthetic-extra-skill-${String(pop.entries.length).padStart(3, '0')}`;
    pop.entries.push({ kind: 'Entry', id, contentTypeId: 'skill', revisionToken: `synthetic-revision-${id}`, fields: { name: { 'en-US': 'Independent synthetic skill' } } });
  }
  pop.entries.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  return pop;
}

describe('mock delivery: independent complete synthetic population', () => {
  it('binds the selected synthetic target, all ten types and finite numeric ceilings', () => {
    expect(MOCK_TARGET).toEqual(TARGET); expect(MOCK_CONTENT_TYPES).toEqual(TYPES);
    expect(DEFAULT_LIMITS).toEqual({ pageSize: 25, maxRequests: 16, maxPages: 16, maxEntries: 256, maxAssets: 64, maxRecords: 320, maxBodyBytes: 1048576, maxTotalBodyBytes: 4194304, requestTimeoutMs: 2000, totalTimeoutMs: 10000, maxDepth: 64, maxIdentityLength: 128 });
  });
  it('acquires all ten types across entry pages plus assets sequentially and matches the independent SiteChrome oracle', async () => {
    const h = harness();
    expect(h.pop.entries.length).toBeGreaterThan(25); expect(h.pop.assets.length).toBeGreaterThan(0);
    expect(new Set(h.pop.entries.map(r => r.kind === 'Entry' ? r.contentTypeId : 'invalid'))).toEqual(new Set(TYPES));
    let active = 0, maximum = 0;
    const transport: MockTransport = async (request, signal) => { active++; maximum = Math.max(active, maximum); await Promise.resolve(); const value = await h.transport(request, signal); active--; return value; };
    const result = await run(h, { transport });
    expect(result.ok).toBe(true); if (!result.ok) return;
    expect(result.chrome).toEqual(siteChrome);
    expect(result.chrome.primaryNavigation.map(n => n.href)).toEqual(['/about', '/work', '/projects', '/writing', '/tools', '/contact']);
    expect(result.chrome.footerNavigation.map(n => n.href)).toEqual(['/about', '/projects', '/writing', '/contact']);
    expect(result.chrome.socialLinks.map(n => n.href)).toEqual(siteChrome.socialLinks.map(n => n.href));
    expect(maximum).toBe(1);
    const expectedRequests = Math.ceil(h.pop.entries.length / 25) + Math.ceil(h.pop.assets.length / 25);
    expect(h.calls).toHaveLength(expectedRequests);
    expect(h.calls.map(c => [c.collection, c.skip])).toEqual([['entries', 0], ['entries', 25], ['assets', 0]]);
    for (const call of h.calls) expect(call).toEqual({ mode: 'SYNTHETIC_MOCK_ONLY', method: 'GET', target: TARGET, collection: call.collection, snapshotId: h.manifest.snapshotId, skip: call.skip, limit: 25, credentialMarker: MARKER });
    expect(result.receipt).toMatchObject({ kind: 'MOCK_ACQUISITION_RECEIPT', provenance: 'SYNTHETIC_MOCK_ONLY', contentful_verified: false, public_delivery_verified: false, target: TARGET, snapshotId: h.manifest.snapshotId, manifestDigest: digest(h.manifest), coverage: 'COMPLETE', normalization: 'VALIDATED', counts: { requests: expectedRequests, pages: expectedRequests, entries: h.pop.entries.length, assets: h.pop.assets.length, records: h.pop.entries.length + h.pop.assets.length, bodyBytes: h.bodies.reduce((sum, body) => sum + body.byteLength, 0) }, inventory: { entries: h.manifest.entries, assets: h.manifest.assets } });
    expect(result.receipt.timing.requestElapsedMs).toHaveLength(expectedRequests);
    expect(result.receipt.timing.elapsedMs).toBeGreaterThanOrEqual(0);
    expect(JSON.stringify(result)).not.toContain(MARKER);
    expect(Object.keys(result.chrome).sort()).toEqual(Object.keys(siteChrome).sort());
  });
  it('accepts an independently bound exact multiple of page size without requesting an extra entry page', async () => {
    const h = harness(withMoreEntries(50)), result = await run(h);
    expect(result.ok).toBe(true); if (result.ok) expect(result.chrome).toEqual(siteChrome);
    expect(h.calls.map(c => [c.collection, c.skip])).toEqual([['entries', 0], ['entries', 25], ['assets', 0]]);
    expect(array(required(h.pages[1]).items)).toHaveLength(25);
  });
  it.each(['both', 'entries', 'assets'] as const)('validates mandatory empty %s collection pages without manufacturing an eligible complete graph', async empty => {
    const pop = population(); if (empty !== 'assets') pop.entries = []; if (empty !== 'entries') pop.assets = [];
    const h = harness(pop), result = await run(h);
    failure(result, empty === 'assets' ? 'NORMALIZATION_FAILED' : 'SITE_COUNT');
    for (const collection of ['entries', 'assets'] as const) if (pop[collection].length === 0) {
      const pages = h.pages.filter(p => p.collection === collection); expect(pages).toHaveLength(1);
      expect(pages[0]).toMatchObject({ skip: 0, limit: 25, total: 0, items: [] });
    }
  });
  it('preserves deep-frozen caller records, manifest, policy and response bytes', async () => {
    const h = harness(), sourceBefore = independentCanonical(h.pop), manifestBefore = independentCanonical(h.manifest), policyBefore = contextIdentity(h.context);
    freeze(h.pop); freeze(h.manifest); freeze(h.context);
    const bodyHashes: string[] = [];
    const transport: MockTransport = async (request, signal) => { const response = await h.transport(request, signal); bodyHashes.push(createHash('sha256').update(response.body).digest('hex')); return Object.freeze(response); };
    const result = await run(h, { transport }); expect(result.ok).toBe(true);
    expect(independentCanonical(h.pop)).toBe(sourceBefore); expect(independentCanonical(h.manifest)).toBe(manifestBefore); expect(contextIdentity(h.context)).toBe(policyBefore);
    expect(h.bodies.map(b => createHash('sha256').update(b).digest('hex'))).toEqual(bodyHashes);
  });
  it('holds the independently prebound manifest fixed even if a malicious mock mutates the caller copy', async () => {
    const h: Harness = harness(population(), page => {
      const record = object(required(array(page.items)[0])); object(record.fields).unexpected = { 'en-US': 'Changed after binding' };
      object(required(h.manifest.entries[0])).recordSha256 = digest(record);
    });
    failure(await run(h), 'INVENTORY_MISMATCH'); expect(h.calls).toHaveLength(1);
  });
});

describe('mock delivery: request, manifest and exact population rejection', () => {
  it.each(['POST', 'HEAD', 'get', 'DELETE'])('rejects method %s before any mock invocation', async method => { const h = harness(); failure(await run(h, { method }), 'METHOD_INVALID'); expect(h.calls).toHaveLength(0); });
  it.each(['origin', 'space', 'environment', 'locale'] as const)('rejects a changed request target %s before any mock invocation', async key => {
    const h = harness(), target = { ...TARGET, [key]: key === 'locale' ? 'fr-FR' : 'unapproved' };
    failure(await run(h, { target } as Partial<AcquireOptions>), 'TARGET_INVALID'); expect(h.calls).toHaveLength(0);
  });
  it('requires an injected transport and never falls back to global fetch', async () => {
    const h = harness(), fetch = vi.spyOn(globalThis, 'fetch').mockImplementation(() => { throw new Error('Unexpected global fetch'); });
    try { failure(await acquireMockDelivery(h.options), 'TRANSPORT_REQUIRED'); expect(fetch).not.toHaveBeenCalled(); } finally { fetch.mockRestore(); }
  });
  const manifestChanges: readonly [string, (m: Record<string, unknown>) => void][] = [
    ['kind', m => { m.kind = 'UNTRUSTED'; }], ['snapshot', m => { m.snapshotId = ''; }], ['snapshot length', m => { m.snapshotId = 'a'.repeat(129); }],
    ['target', m => { object(m.target).locale = 'fr-FR'; }], ['missing declared type', m => { array(m.contentTypes).pop(); }], ['duplicate declared type', m => { array(m.contentTypes)[1] = array(m.contentTypes)[0]; }],
    ['duplicate entry identity', m => { array(m.entries).splice(1, 0, structuredClone(array(m.entries)[0])); }], ['unsorted entries', m => { array(m.entries).reverse(); }],
    ['cross-kind identity', m => { object(required(array(m.assets)[0])).id = object(required(array(m.entries)[0])).id; }], ['unknown content type', m => { object(required(array(m.entries)[0])).contentTypeId = 'futureType'; }],
    ['unknown manifest key', m => { m.receivedTotals = 1; }], ['invalid identity', m => { object(required(array(m.entries)[0])).id = '../escape'; }],
    ['long identity', m => { object(required(array(m.entries)[0])).id = 'a'.repeat(129); }], ['invalid revision', m => { object(required(array(m.entries)[0])).revisionToken = 'bad revision'; }],
    ['invalid digest', m => { object(required(array(m.entries)[0])).recordSha256 = 'not-a-digest'; }], ['extra row key', m => { object(required(array(m.entries)[0])).unverified = true; }],
  ];
  it.each(manifestChanges)('rejects malformed independent manifest: %s', async (_name, change) => { const h = harness(); change(object(h.manifest)); failure(await run(h), 'MANIFEST_INVALID'); expect(h.calls).toHaveLength(0); });
  const pageChanges: readonly [string, PageChange][] = [
    ['schema', p => { p.schema = 'future-page'; }], ['snapshot instability', p => { p.snapshotId = 'mixed-snapshot'; }], ['target locale', p => { object(p.target).locale = 'fr-FR'; }],
    ['collection', p => { p.collection = 'assets'; }], ['skip gap', p => { p.skip = 1; }], ['limit', p => { p.limit = 24; }], ['altered total', p => { p.total = Number(p.total) + 1; }], ['extra page key', p => { p.next = 'unapproved'; }],
  ];
  it.each(pageChanges)('rejects page contract mismatch: %s', async (_name, change) => { const h = harness(population(), change); failure(await run(h), 'PAGE_INVALID'); expect(h.calls).toHaveLength(1); });
  const inventoryChanges: readonly [string, PageChange][] = [
    ['zero progress', p => { p.items = []; }], ['premature short page', p => { array(p.items).pop(); }], ['additional record', p => { array(p.items).push(structuredClone(array(p.items)[0])); }],
    ['duplicate identity', p => { array(p.items)[1] = structuredClone(array(p.items)[0]); }], ['out-of-order records', p => { array(p.items).reverse(); }],
    ['missing expected identity', p => { object(required(array(p.items)[0])).id = 'synthetic-unexpected'; }], ['cross-kind resource', p => { object(required(array(p.items)[0])).kind = 'Asset'; }],
    ['altered revision', p => { object(required(array(p.items)[0])).revisionToken = 'changed-revision'; }], ['altered known content type', p => { object(required(array(p.items)[0])).contentTypeId = 'skill'; }],
    ['altered content digest', p => { object(object(required(array(p.items)[0])).fields).unexpected = { 'en-US': 'Silent mutation' }; }], ['extra record key', p => { object(required(array(p.items)[0])).extra = 'unbound'; }],
  ];
  it.each(inventoryChanges)('rejects incomplete or unstable inventory: %s', async (_name, change) => { const h = harness(population(), change); failure(await run(h), 'INVENTORY_MISMATCH'); expect(h.calls).toHaveLength(1); });
  it('rejects second-page snapshot instability without returning the previously acquired entry page', async () => {
    const h = harness(population(), (page, request) => { if (request.skip > 0) page.snapshotId = 'second-page-snapshot'; });
    failure(await run(h), 'PAGE_INVALID'); expect(h.calls).toHaveLength(2);
  });
  it('rejects a changed asset revision after all entry pages without exposing a partial receipt', async () => {
    const h = harness(population(), (page, request) => { if (request.collection === 'assets') object(required(array(page.items)[0])).revisionToken = 'altered-asset'; });
    failure(await run(h), 'INVENTORY_MISMATCH'); expect(required(h.calls.at(-1)).collection).toBe('assets');
  });
});

describe('mock delivery: wire, transport and finite budgets', () => {
  it.each([401, 403, 429, 500, 502, 503])('rejects synthetic HTTP-like %s without retry or response disclosure', async status => {
    const h = harness(population(), undefined, r => ({ ...r, status })); failure(await run(h), 'HTTP_STATUS'); expect(h.calls).toHaveLength(1);
  });
  it('rejects redirects without following them', async () => { const h = harness(population(), undefined, r => ({ ...r, redirected: true })); failure(await run(h), 'REDIRECT'); expect(h.calls).toHaveLength(1); });
  it('rejects a changed final transport target', async () => { const h = harness(population(), undefined, r => ({ ...r, finalTarget: { ...TARGET, environment: 'wrong-target' } } as MockResponse)); failure(await run(h), 'TARGET_INVALID'); expect(h.calls).toHaveLength(1); });
  it('sanitizes rejected mock exceptions and does not retry', async () => {
    const h = harness(); let calls = 0;
    const result = await run(h, { transport: async () => { calls++; throw new Error(`Private response ${MARKER}`); } });
    failure(result, 'TRANSPORT_REJECTED'); expect(JSON.stringify(result)).not.toContain('Private response'); expect(calls).toBe(1);
  });
  const wires: readonly [string, (body: Uint8Array) => Uint8Array][] = [
    ['invalid UTF-8', () => new Uint8Array([0xc3, 0x28])], ['BOM', b => new Uint8Array([0xef, 0xbb, 0xbf, ...b])], ['invalid JSON', () => encoder.encode('{')],
    ['duplicate JSON keys', () => encoder.encode('{"x":1,"x":2}')], ['noncanonical whitespace', b => encoder.encode(` ${new TextDecoder().decode(b)}`)],
    ['noncanonical number', b => encoder.encode(new TextDecoder().decode(b).replace('"skip":0', '"skip":0e0'))], ['non-ASCII key', () => encoder.encode('{"é":1}')],
    ['excessive depth', () => encoder.encode(`${'['.repeat(65)}0${']'.repeat(65)}`)],
  ];
  it.each(wires)('rejects unsafe/noncanonical response body: %s', async (_name, transform) => { const h = harness(population(), undefined, r => ({ ...r, body: transform(r.body) })); failure(await run(h), 'WIRE_INVALID'); });
  it('enforces the one MiB body ceiling before parsing oversized bytes', async () => {
    const h = harness(population(), undefined, r => ({ ...r, body: new Uint8Array(1048577) })); failure(await run(h), 'BODY_LIMIT'); expect(h.calls).toHaveLength(1);
  });
  it.each(['own', 'subclass'] as const)('enforces actual body bytes despite a spoofed %s byteLength getter', async location => {
    let getterReads = 0;
    class SpoofedBytes extends Uint8Array {}
    const body = location === 'subclass' ? new SpoofedBytes(1048577) : new Uint8Array(1048577);
    Object.defineProperty(location === 'subclass' ? SpoofedBytes.prototype : body, 'byteLength', { get() { getterReads++; return 0; } });
    const h = harness(population(), undefined, response => ({ ...response, body }));
    failure(await run(h), 'BODY_LIMIT'); expect(h.calls).toHaveLength(1); expect(getterReads).toBe(0);
  });
  it('copies actual typed-array bytes without invoking a mock-owned iterator or length getter', async () => {
    let getterReads = 0;
    const h = harness(population(), undefined, response => {
      for (const key of [Symbol.iterator, 'length']) Object.defineProperty(response.body, key, { get() { getterReads++; throw new Error('Mock-owned iterator or length must not run'); } });
      return response;
    });
    const result = await run(h); expect(result.ok).toBe(true); if (result.ok) expect(result.chrome).toEqual(siteChrome);
    expect(getterReads).toBe(0);
  });
  it.each([
    ['maxRequests', 1, 'REQUEST_LIMIT', 1], ['maxPages', 1, 'PAGE_LIMIT', 1], ['maxEntries', 1, 'RECORD_LIMIT', 0], ['maxAssets', 1, 'RECORD_LIMIT', 0],
    ['maxRecords', 1, 'RECORD_LIMIT', 0], ['maxBodyBytes', 1, 'BODY_LIMIT', 1], ['maxTotalBodyBytes', 1, 'BYTE_LIMIT', 1],
    ['maxRequests', 0, 'REQUEST_LIMIT', 0], ['maxPages', 0, 'PAGE_LIMIT', 0],
  ] as const)('enforces lowered %s=%s with no retry', async (key, value, code, expectedCalls) => {
    const h = harness(); failure(await run(h, { limits: { [key]: value } }), code); expect(h.calls).toHaveLength(expectedCalls);
  });
  it('enforces cumulative body bytes across otherwise valid pages', async () => {
    const reference = harness(); await reference.transport({ mode: 'SYNTHETIC_MOCK_ONLY', method: 'GET', target: TARGET, collection: 'entries', snapshotId: reference.manifest.snapshotId, skip: 0, limit: 25, credentialMarker: MARKER }, new AbortController().signal);
    const firstPageBytes = required(reference.bodies[0]).byteLength, h = harness();
    failure(await run(h, { limits: { maxTotalBodyBytes: firstPageBytes } }), 'BYTE_LIMIT'); expect(h.calls).toHaveLength(2);
  });
  it('rejects an independently declared 257-entry inventory before any transport', async () => { const h = harness(withMoreEntries(257)); failure(await run(h), 'RECORD_LIMIT'); expect(h.calls).toHaveLength(0); });
  it('rejects an independently declared 65-asset inventory before any transport', async () => {
    const pop = population(), sample = required(pop.assets[0]);
    while (pop.assets.length < 65) { const id = `synthetic-extra-asset-${String(pop.assets.length).padStart(3, '0')}`; pop.assets.push({ ...structuredClone(sample), id, revisionToken: `synthetic-revision-${id}` }); }
    pop.assets.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    const h = harness(pop); failure(await run(h), 'RECORD_LIMIT'); expect(h.calls).toHaveLength(0);
  });
  it.each(Object.entries(DEFAULT_LIMITS))('never permits raising ceiling %s', async (key, value) => { const h = harness(); failure(await run(h, { limits: { [key]: value + 1 } }), 'LIMIT_INVALID'); expect(h.calls).toHaveLength(0); });
  it('keeps page size fixed at 25 even when a caller requests a smaller value', async () => { const h = harness(); failure(await run(h, { limits: { pageSize: 24 } }), 'LIMIT_INVALID'); expect(h.calls).toHaveLength(0); });
  it('cancels an already aborted request before invoking transport', async () => { const h = harness(), controller = new AbortController(); controller.abort(); failure(await run(h, { signal: controller.signal }), 'ABORTED'); expect(h.calls).toHaveLength(0); });
  it('propagates caller cancellation to the in-flight mock', async () => {
    const h = harness(), controller = new AbortController(); let aborted = false, calls = 0;
    const transport: MockTransport = (_request, signal) => new Promise((_resolve, reject) => { calls++; signal.addEventListener('abort', () => { aborted = true; reject(new Error('Private abort')); }, { once: true }); queueMicrotask(() => controller.abort()); });
    failure(await run(h, { transport, signal: controller.signal }), 'ABORTED'); expect(aborted).toBe(true); expect(calls).toBe(1);
  });
  it.each([['requestTimeoutMs', 'REQUEST_TIMEOUT'], ['totalTimeoutMs', 'TOTAL_TIMEOUT']] as const)('uses a real cancellation timer for %s and never accepts a late success', async (limit, code) => {
    const h = harness(); let aborted = false, calls = 0, finish: ((value: MockResponse) => void) | undefined;
    const transport: MockTransport = (_request, signal) => new Promise(resolve => { calls++; finish = resolve; signal.addEventListener('abort', () => { aborted = true; }, { once: true }); });
    const result = await run(h, { transport, limits: { [limit]: 50 } });
    failure(result, code); expect(aborted).toBe(true); expect(calls).toBe(1);
    required(finish)({ status: 200, redirected: false, finalTarget: TARGET, body: encoder.encode('{}') }); await Promise.resolve(); failure(result, code);
  });
  it.each([['request', 2001, 'REQUEST_TIMEOUT'], ['total', 10001, 'TOTAL_TIMEOUT']] as const)('includes full response acquisition in measured %s timeout', async (_name, elapsed, code) => {
    const h = harness(); let now = 0;
    const transport: MockTransport = async (request, signal) => { const response = await h.transport(request, signal); now = elapsed; return response; };
    failure(await run(h, { transport, clock: () => now }), code); expect(h.calls).toHaveLength(1);
  });
});

describe('mock delivery: unchanged source semantics and separate synthetic eligibility', () => {
  it.each(Object.entries(malformedSourceCases))('rejects frozen malformed source %s even if the independent manifest binds those bytes', async (_name, bad) => {
    const pop = population(), replacement = entry(bad); pop.entries = pop.entries.map(r => r.id === replacement.id ? replacement : r);
    failure(await run(harness(pop)), 'NORMALIZATION_FAILED');
  });
  it.each([
    ['missing', null], ['draft', { publication: 'draft' }], ['archived', { publication: 'archived' }], ['unknown publication', { publication: 'unknown' }],
    ['not approved', { publicSafety: 'not-approved' }], ['unknown safety', { publicSafety: 'unknown' }], ['mismatched revision', { revision: 'unbound-revision' }],
  ] as const)('rejects %s publication/safety evidence rather than filtering a false COMPLETE graph', async (_name, change) => {
    const h = harness(), facts = new Map(h.context.revisionFacts), id = fixtureId(first(h.pop, 'tool').id);
    if (change === null) facts.delete(id); else facts.set(id, { ...required(facts.get(id)), ...change } as RevisionEligibility);
    failure(await run(h, { context: { ...h.context, revisionFacts: facts } }), 'POLICY_INVALID');
  });
  it('requires matching approved revision facts for assets as well as entries', async () => {
    const h = harness(), facts = new Map(h.context.revisionFacts), id = fixtureId(required(h.pop.assets[0]).id);
    facts.set(id, { ...required(facts.get(id)), publicSafety: 'not-approved' }); failure(await run(h, { context: { ...h.context, revisionFacts: facts } }), 'POLICY_INVALID');
  });
  it('does not synthesize missing accessibility approval', async () => {
    const h = harness(), reviewedAccessibility = new Map(h.context.policy.reviewedAccessibility); reviewedAccessibility.delete(fixtureId('seed05-asset-profile-portrait'));
    failure(await run(h, { context: { ...h.context, policy: { ...h.context.policy, reviewedAccessibility } } }), 'NORMALIZATION_FAILED');
  });
  it('preserves month precision policy and rejects a missing employment precision review', async () => {
    const h = harness(), employmentPrecision = new Map(h.context.policy.employmentPrecision); employmentPrecision.delete(fixtureId(first(h.pop, 'experienceItem').id));
    failure(await run(h, { context: { ...h.context, policy: { ...h.context.policy, employmentPrecision } } }), 'NORMALIZATION_FAILED');
  });
  it('validates non-chrome article day precision rather than normalizing only settings', async () => {
    const pop = population(); setField(first(pop, 'article'), 'publishDate', '2026-10'); failure(await run(harness(pop)), 'NORMALIZATION_FAILED');
  });
  it('validates non-chrome media URLs in a fully bound population', async () => {
    const pop = population(), asset = required(pop.assets.find(a => a.id === 'seed05-asset-project-ui-gallery-system'));
    object(object(asset.fields.file)['en-US']).url = 'javascript:unsafe'; failure(await run(harness(pop)), 'NORMALIZATION_FAILED');
  });
  it('requires exactly one eligible site: zero', async () => { const pop = population(); pop.entries = pop.entries.filter(r => r.kind !== 'Entry' || r.contentTypeId !== 'siteSettings'); failure(await run(harness(pop)), 'SITE_COUNT'); });
  it('requires exactly one eligible site: multiple', async () => {
    const pop = population(), site = structuredClone(first(pop, 'siteSettings')); object(site).id = 'synthetic-second-site'; object(site).revisionToken = 'synthetic-second-site-revision'; pop.entries.push(site); pop.entries.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    failure(await run(harness(pop)), 'SITE_COUNT');
  });
  it('retains the frozen allowance for finite mutual optional project previews', async () => {
    const pop = population(), projects = pop.entries.filter(r => r.kind === 'Entry' && r.contentTypeId === 'project'), a = required(projects[0]), b = required(projects[1]);
    setField(a, 'relatedProjects', [link(b.id)]); setField(b, 'relatedProjects', [link(a.id)]);
    const result = await run(harness(pop)); expect(result.ok).toBe(true); if (result.ok) expect(result.chrome).toEqual(siteChrome);
  });
  it('rejects a cyclic authored structure before canonical hashing can recurse indefinitely', () => { const cycle: unknown[] = []; cycle.push(cycle); expect(() => canonicalJson(cycle)).toThrow(); });
  it.each([['nonfinite', NaN], ['undefined', undefined], ['function', () => 0], ['custom prototype', new Date(0)], ['non-ASCII key', { é: 1 }]])('rejects non-JSON canonical input %s', (_name, value) => { expect(() => canonicalJson(value)).toThrow(); });
  it('rejects accessors without executing them', () => { let accessed = false; const input = Object.defineProperty({}, 'field', { enumerable: true, get() { accessed = true; return 'not JSON'; } }); expect(() => canonicalJson(input)).toThrow(); expect(accessed).toBe(false); });
  it('does not read process environment or use a default fetch entry in either new boundary module', () => {
    for (const name of ['delivery.server.ts', 'delivery-snapshot.ts']) {
      const source = readFileSync(new URL(name, import.meta.url), 'utf8');
      expect(source).not.toMatch(/process\s*\.\s*env|import\s*\.\s*meta\s*\.\s*env/);
      expect(source).not.toMatch(/(?:globalThis\s*\.\s*)?fetch\s*\(/);
    }
  });
});

describe('mock delivery: receipt is private evidence, never authentication by branding', () => {
  const changes: readonly [string, (receipt: Record<string, unknown>) => void][] = [
    ['kind', r => { r.kind = 'FORGED'; }], ['provenance', r => { r.provenance = 'CONTENTFUL'; }], ['Contentful claim', r => { r.contentful_verified = true; }], ['public-delivery claim', r => { r.public_delivery_verified = true; }],
    ['target', r => { object(r.target).space = 'other'; }], ['snapshot', r => { r.snapshotId = 'other-snapshot'; }], ['manifest digest', r => { r.manifestDigest = 'a'.repeat(64); }],
    ['record count', r => { object(r.counts).records = 1; }], ['request count', r => { object(r.counts).requests = 1; }], ['body bytes', r => { object(r.counts).bodyBytes = 1; }],
    ['inventory', r => { array(object(r.inventory).entries).pop(); }], ['page digest', r => { object(required(array(r.pages)[0])).bodySha256 = 'b'.repeat(64); }],
    ['coverage', r => { r.coverage = 'PARTIAL'; }], ['normalization', r => { r.normalization = 'SKIPPED'; }], ['timing', r => { object(r.timing).elapsedMs = -1; }],
  ];
  it.each(changes)('rejects forged receipt %s against actual records, independent manifest and policy', async (_name, change) => {
    const h = harness(), result = await run(h); expect(result.ok).toBe(true); if (!result.ok) return;
    const receipt = structuredClone(result.receipt); change(object(receipt));
    failure(projectDeliverySnapshot({ records: [...h.pop.entries, ...h.pop.assets], manifest: h.manifest, receipt, context: h.context }), 'RECEIPT_INVALID');
  });
  it('rechecks actual source records rather than trusting a structurally valid success receipt', async () => {
    const h = harness(), result = await run(h); expect(result.ok).toBe(true); if (!result.ok) return;
    setField(first(h.pop, 'siteSettings'), 'siteName', 'Altered after acquisition');
    failure(projectDeliverySnapshot({ records: [...h.pop.entries, ...h.pop.assets], manifest: h.manifest, receipt: result.receipt, context: h.context }), 'INVENTORY_MISMATCH');
  });
  it('rechecks independently supplied policy rather than trusting a successful receipt', async () => {
    const h = harness(), result = await run(h); expect(result.ok).toBe(true); if (!result.ok) return;
    failure(projectDeliverySnapshot({ records: [...h.pop.entries, ...h.pop.assets], manifest: h.manifest, receipt: result.receipt, context: { ...h.context, revisionFacts: new Map() } }), 'POLICY_INVALID');
  });
  it('revalidates an authentic receipt without mutating it or the supplied manifest', async () => {
    const h = harness(), result = await run(h); expect(result.ok).toBe(true); if (!result.ok) return;
    const before = independentCanonical(result.receipt); freeze(result.receipt); freeze(h.manifest);
    const projected = projectDeliverySnapshot({ records: [...h.pop.entries, ...h.pop.assets], manifest: h.manifest, receipt: result.receipt, context: h.context });
    expect(projected.ok).toBe(true); if (projected.ok) expect(projected.chrome).toEqual(siteChrome);
    expect(independentCanonical(result.receipt)).toBe(before);
  });
});

describe('mock delivery: MockFault erasable-field compatibility', () => {
  it('preserves the exact supplied code, message and inherited Error name', () => {
    const fault = new MockFault('INVALID_INPUT');
    expect(fault.code).toBe('INVALID_INPUT');
    expect(fault.message).toBe('INVALID_INPUT');
    expect(fault.name).toBe('Error');
  });
  it('preserves MockFault and Error instances and their prototype chain', () => {
    const fault = new MockFault('MANIFEST_INVALID');
    expect(fault).toBeInstanceOf(MockFault);
    expect(fault).toBeInstanceOf(Error);
    expect(Object.getPrototypeOf(fault)).toBe(MockFault.prototype);
    expect(Object.getPrototypeOf(MockFault.prototype)).toBe(Error.prototype);
  });
  it('retains an own writable enumerable configurable code data property', () => {
    const fault = new MockFault('POLICY_INVALID');
    expect(Object.hasOwn(fault, 'code')).toBe(true);
    expect(Object.getOwnPropertyDescriptor(fault, 'code')).toEqual({
      value: 'POLICY_INVALID',
      writable: true,
      enumerable: true,
      configurable: true,
    });
  });
  it('preserves thrown MockFault behavior and exact private failure serialization', () => {
    let caught: unknown;
    try {
      rejectMock('WIRE_INVALID');
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(MockFault);
    expect(caught).toBeInstanceOf(Error);
    expect(caught).toHaveProperty('message', 'WIRE_INVALID');
    const result = mockFailure(caught, 'INVALID_INPUT');
    expect(result).toEqual({ ok: false, error: { code: 'WIRE_INVALID' } });
    expect(JSON.stringify(result)).toBe('{"ok":false,"error":{"code":"WIRE_INVALID"}}');
  });
});

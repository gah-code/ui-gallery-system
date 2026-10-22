import {
  DEFAULT_LIMITS, MOCK_TARGET, MockFault, canonicalJson, jsonCopy, limitsFor, mockFailure,
  objectShape, prepareContext, prepareManifest, projectDeliverySnapshot, receiptFor, rejectMock,
  sha256Bytes, targetMatches, validateRecordSlice,
} from './delivery-snapshot';
import type {
  ExpectedManifest, MockCollection, MockContext, MockErrorCode, MockLimits, MockRecord,
  MockResult, MockTarget, PageMeasurement,
} from './delivery-snapshot';

export type MockRequest = Readonly<{
  mode:'SYNTHETIC_MOCK_ONLY';method:'GET';target:MockTarget;collection:MockCollection;
  snapshotId:string;skip:number;limit:25;credentialMarker:string;
}>;
export type MockResponse = Readonly<{status:number;redirected:boolean;finalTarget:MockTarget;body:Uint8Array}>;
export type MockTransport = (request:MockRequest, signal:AbortSignal)=>Promise<MockResponse>;
export type AcquireOptions = Readonly<{
  transport?:MockTransport;method?:string;target?:unknown;credentialMarker:string;
  manifest:unknown;context:MockContext;limits?:Partial<MockLimits>;signal?:AbortSignal;clock?:()=>number;
}>;

// Read typed-array internal slots, never overridable byteLength/length/iterator properties.
const typedArrayByteLength=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array.prototype),'byteLength')?.get;
const typedArraySet=Uint8Array.prototype.set;

/** The bounded pre-scan avoids giving JSON.parse an arbitrarily deep body. */
function wireJson(bytes:Uint8Array, limits:MockLimits): unknown {
  try {
    const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);
    if (text.charCodeAt(0)===0xfeff) rejectMock('WIRE_INVALID');
    let depth=0, string=false, escaped=false;
    for (const c of text) {
      if (string) { if (escaped) escaped=false; else if (c==='\\') escaped=true; else if (c==='"') string=false; }
      else if (c==='"') string=true;
      else if (c==='{' || c==='[') { if (++depth>limits.maxDepth) rejectMock('WIRE_INVALID'); }
      else if (c==='}' || c===']') { if (--depth<0) rejectMock('WIRE_INVALID'); }
    }
    if (depth!==0 || string) rejectMock('WIRE_INVALID');
    const parsed:unknown=JSON.parse(text);
    if (canonicalJson(parsed,limits.maxDepth)!==text) rejectMock('WIRE_INVALID'); return parsed;
  } catch { return rejectMock('WIRE_INVALID'); }
}
function validatePage(body:unknown, manifest:ExpectedManifest, collection:MockCollection, skip:number, limits:MockLimits): readonly MockRecord[] {
  const p=objectShape(body,['schema','target','snapshotId','collection','skip','limit','total','items'],'PAGE_INVALID');
  if (p.schema!=='portfolio-mock-page-v1' || !targetMatches(p.target) || p.snapshotId!==manifest.snapshotId || p.collection!==collection || p.skip!==skip || p.limit!==25 || p.total!==manifest[collection].length) rejectMock('PAGE_INVALID');
  return validateRecordSlice(p.items,manifest,collection,skip,limits);
}
function checkedOptions(input:AcquireOptions): AcquireOptions {
  if (!input || typeof input!=='object' || Object.getPrototypeOf(input)!==Object.prototype) rejectMock('INVALID_INPUT');
  const allowed=['transport','method','target','credentialMarker','manifest','context','limits','signal','clock'];
  const keys=Reflect.ownKeys(input);
  if (keys.some(k=>typeof k!=='string' || !allowed.includes(k))) rejectMock('INVALID_INPUT');
  for (const key of keys) { const d=Object.getOwnPropertyDescriptor(input,key); if (!d || !('value' in d) || !d.enumerable) rejectMock('INVALID_INPUT'); }
  if (input.method!==undefined && input.method!=='GET') rejectMock('METHOD_INVALID');
  if (input.target!==undefined && !targetMatches(input.target)) rejectMock('TARGET_INVALID');
  if (typeof input.transport!=='function') rejectMock('TRANSPORT_REQUIRED');
  if (typeof input.credentialMarker!=='string' || !/^[\x20-\x7e]{1,128}$/.test(input.credentialMarker)) rejectMock('INVALID_INPUT');
  if (input.clock!==undefined && typeof input.clock!=='function') rejectMock('INVALID_INPUT');
  if (input.signal!==undefined && !(input.signal instanceof AbortSignal)) rejectMock('INVALID_INPUT');
  return input;
}

/** No env lookup, fetch fallback, redirect, retry, listener or concurrent request exists here. */
export async function acquireMockDelivery(input:AcquireOptions): Promise<MockResult> {
  let requests=0, pageCount=0, bodyBytes=0, lastElapsed=0;
  const realAcquisitionStart=performance.now();
  try {
    const options=checkedOptions(input), limits=limitsFor(options.limits);
    if (options.signal?.aborted) rejectMock('ABORTED');
    const clock=options.clock ?? (()=>performance.now()), realStart=performance.now();
    const start=clock(); if (!Number.isFinite(start)) rejectMock('INVALID_INPUT');
    let previous=start;
    function elapsed(): number {
      const now=clock(); if (!Number.isFinite(now) || now<previous) rejectMock('INVALID_INPUT');
      previous=now; lastElapsed=Math.max(now-start,performance.now()-realStart); return lastElapsed;
    }
    function alive(): number {
      if (options.signal?.aborted) rejectMock('ABORTED');
      const duration=elapsed(); if (duration>=limits.totalTimeoutMs) rejectMock('TOTAL_TIMEOUT'); return duration;
    }
    // These independent authorities are copied before the first injected transport call.
    const manifest=prepareManifest(options.manifest,limits), context=prepareContext(options.context,manifest);
    const transport=options.transport; if (!transport) rejectMock('TRANSPORT_REQUIRED');
    const marker=options.credentialMarker, records:MockRecord[]=[], pages:PageMeasurement[]=[];
    alive();
    for (const collection of ['entries','assets'] as const) {
      let skip=0;
      do {
        const acquisitionBefore=alive(), logicalRequestStart=previous;
        if (requests>=limits.maxRequests) rejectMock('REQUEST_LIMIT');
        if (pageCount>=limits.maxPages) rejectMock('PAGE_LIMIT');
        const request:MockRequest=Object.freeze({mode:'SYNTHETIC_MOCK_ONLY',method:'GET',target:MOCK_TARGET,collection,snapshotId:manifest.snapshotId,skip,limit:25,credentialMarker:marker});
        const controller=new AbortController(), realRequestStart=performance.now();
        requests++;
        const totalRemaining=limits.totalTimeoutMs-acquisitionBefore;
        const deadline=Math.min(limits.requestTimeoutMs,totalRemaining);
        const timeoutCode:MockErrorCode=totalRemaining<=limits.requestTimeoutMs?'TOTAL_TIMEOUT':'REQUEST_TIMEOUT';
        const response=await new Promise<MockResponse>((resolve,reject)=>{
          let settled=false;
          const finish=(error:MockFault|undefined, value?:MockResponse) => {
            if (settled) return; settled=true; clearTimeout(timer); options.signal?.removeEventListener('abort',abort);
            if (error) { controller.abort(); reject(error); } else if (value) resolve(value); else reject(new MockFault('TRANSPORT_REJECTED'));
          };
          const abort=()=>finish(new MockFault('ABORTED'));
          const timer=setTimeout(()=>finish(new MockFault(timeoutCode)),deadline);
          options.signal?.addEventListener('abort',abort,{once:true});
          if (options.signal?.aborted) { abort(); return; }
          Promise.resolve().then(()=>transport(request,controller.signal)).then(
            value=>finish(undefined,value),
            ()=>finish(new MockFault('TRANSPORT_REJECTED')),
          );
        });
        // Blocking or late work cannot beat a delayed event-loop timer, nor a simulated clock.
        try { alive(); } catch (error) { controller.abort(); throw error; }
        const requestElapsed=Math.max(previous-logicalRequestStart,performance.now()-realRequestStart);
        if (requestElapsed>=limits.requestTimeoutMs) { controller.abort(); rejectMock('REQUEST_TIMEOUT'); }
        const r=objectShape(response,['status','redirected','finalTarget','body'],'WIRE_INVALID');
        if (r.redirected!==false) rejectMock('REDIRECT');
        if (!Number.isSafeInteger(r.status) || r.status!==200) rejectMock('HTTP_STATUS');
        if (!targetMatches(r.finalTarget)) rejectMock('TARGET_INVALID');
        if (!(r.body instanceof Uint8Array)) rejectMock('WIRE_INVALID');
        let length:number;
        try {
          if (!typedArrayByteLength) rejectMock('WIRE_INVALID');
          const actual:unknown=typedArrayByteLength.call(r.body);
          if (typeof actual!=='number' || !Number.isSafeInteger(actual) || actual<0) rejectMock('WIRE_INVALID');
          length=actual;
        } catch { return rejectMock('WIRE_INVALID'); }
        if (length>limits.maxBodyBytes) rejectMock('BODY_LIMIT');
        if (bodyBytes+length>limits.maxTotalBodyBytes) rejectMock('BYTE_LIMIT');
        bodyBytes+=length;
        // Own the bytes so the injected transport cannot mutate a page during validation.
        const bytes=new Uint8Array(length);
        try { typedArraySet.call(bytes,r.body); } catch { return rejectMock('WIRE_INVALID'); }
        const accepted=validatePage(wireJson(bytes,limits),manifest,collection,skip,limits);
        if (records.length+accepted.length>limits.maxRecords) rejectMock('RECORD_LIMIT');
        records.push(...accepted); pageCount++;
        pages.push({collection,skip,limit:25,total:manifest[collection].length,bodyBytes:length,bodySha256:sha256Bytes(bytes),elapsedMs:requestElapsed});
        skip+=accepted.length;
        alive();
      } while (skip<manifest[collection].length);
    }
    const duration=alive();
    const result=projectDeliverySnapshot({records,manifest,context,receipt:receiptFor(manifest,pages,duration),limits});
    // Synchronous full-graph normalization is also inside the acquisition's total deadline.
    const finalDuration=alive();
    if (!result.ok) return {...result,measurement:{requests,pages:pageCount,bodyBytes,elapsedMs:finalDuration}};
    // Measured total includes normalization; the private receipt is not a UI payload.
    return {...result,receipt:{...result.receipt,timing:{...result.receipt.timing,elapsedMs:finalDuration}}};
  } catch (error) {
    return {...mockFailure(error),measurement:{requests,pages:pageCount,bodyBytes,elapsedMs:Math.max(lastElapsed,performance.now()-realAcquisitionStart)}};
  }
}

// Re-export only pure protocol helpers/types. Importing this server module never starts acquisition.
export { DEFAULT_LIMITS, MOCK_TARGET, canonicalJson, jsonCopy };

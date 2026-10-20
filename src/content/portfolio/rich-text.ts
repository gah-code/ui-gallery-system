import type { Block, Inline, ListBlock, Mark, Paragraph, RichTextDocument, RichTextPolicy, TextRun } from './contracts/rich-text';
import type { DocumentLink, MeaningfulImage } from './contracts/media';
import type { Id } from './contracts/values';
import { array, fail, linkId, member, record } from './resolve';
import { externalUrl } from './urls';

type MediaResolver = (id: Id) => MeaningfulImage | DocumentLink;
const marks = ['bold','italic','underline','code','superscript','subscript','strikethrough'] as const;
const bodyMarks = ['bold','italic','code'] as const;
/** Runtime policy checks justify the three overloads; no document or graph is asserted. */
export function normalizeRichText(value: unknown, policy: 'body', required: boolean, media: MediaResolver): RichTextDocument<'body'> | undefined;
export function normalizeRichText(value: unknown, policy: 'simple', required: boolean, media: MediaResolver): RichTextDocument<'simple'> | undefined;
export function normalizeRichText(value: unknown, policy: 'profile-long', required: boolean, media: MediaResolver): RichTextDocument<'profile-long'> | undefined;
export function normalizeRichText(value: unknown, policy: RichTextPolicy, required: boolean, media: MediaResolver): RichTextDocument<RichTextPolicy> | undefined {
  // Explicit defensive limits on input processing, not changed source-model cardinalities.
  let visited = 0;
  let meaningful = false;
  function node(input: unknown, depth: number): Record<string, unknown> {
    if (++visited > 50000 || depth > 64) fail('RT_STRUCTURE');
    const n = record(input,'RT_STRUCTURE');
    if (typeof n.nodeType !== 'string') fail('RT_NODE');
    record(n.data,'RT_STRUCTURE');
    return n;
  }
  function emptyData(n: Record<string, unknown>): void {
    if (Object.keys(record(n.data)).length) fail('RT_STRUCTURE');
  }
  function run(input: unknown, depth: number): TextRun {
    const n = node(input,depth); if (n.nodeType !== 'text' || typeof n.value !== 'string' || n.value.includes('\0')) fail('RT_STRUCTURE');
    emptyData(n);
    if ('content' in n) fail('RT_STRUCTURE');
    const mapped: Mark[] = array(n.marks,'RT_MARK').map(raw => {
      const m = record(raw,'RT_MARK'); if (Object.keys(m).length !== 1) fail('RT_MARK');
      if (!marks.some(mark => mark === m.type)) fail('UNSUPPORTED_MARK');
      if (policy === 'body' && !bodyMarks.some(mark => mark === m.type)) fail('RT_MARK');
      return member(m.type,marks);
    });
    if (new Set(mapped).size !== mapped.length) fail('RT_MARK');
    if (n.value.trim()) meaningful = true;
    return {kind:'text',text:n.value,marks:mapped};
  }
  function inline(input: unknown, depth: number): Inline {
    const n = record(input,'RT_STRUCTURE');
    if (n.nodeType === 'text') return run(input,depth);
    const checked = node(input,depth); if (checked.nodeType !== 'hyperlink') fail('RT_NODE');
    const data = record(checked.data,'RT_LINK'); if (Object.keys(data).length !== 1) fail('RT_LINK');
    let href;
    try { href = externalUrl(data.uri); } catch { fail('RT_LINK'); }
    const children = array(checked.content,'RT_STRUCTURE'); if (!children.length) fail('RT_STRUCTURE');
    return {kind:'link',href,children:children.map(c => run(c,depth+1))};
  }
  function paragraph(input: unknown, depth: number): Paragraph {
    const n = node(input,depth); if (n.nodeType !== 'paragraph') fail('RT_STRUCTURE'); emptyData(n);
    return {kind:'paragraph',children:array(n.content,'RT_STRUCTURE').map(c => inline(c,depth+1))};
  }
  function list(input: unknown, depth: number): ListBlock {
    const n = node(input,depth); if (n.nodeType !== 'ordered-list' && n.nodeType !== 'unordered-list') fail('RT_STRUCTURE'); emptyData(n);
    const items = array(n.content,'RT_STRUCTURE'); if (!items.length) fail('RT_STRUCTURE');
    return {kind:'list',ordered:n.nodeType === 'ordered-list',items:items.map(item => {
      const i = node(item,depth+1); if (i.nodeType !== 'list-item') fail('RT_STRUCTURE'); emptyData(i);
      const children = array(i.content,'RT_STRUCTURE'); if (!children.length) fail('RT_STRUCTURE');
      return {blocks:children.map(c => {
        const child = record(c,'RT_STRUCTURE');
        if (child.nodeType === 'paragraph') return paragraph(c,depth+2);
        if (child.nodeType === 'ordered-list' || child.nodeType === 'unordered-list') return list(c,depth+2);
        return fail('RT_STRUCTURE');
      })};
    })};
  }
  function block(input: unknown, depth: number): Block {
    const n = record(input,'RT_STRUCTURE');
    if (n.nodeType === 'paragraph') return paragraph(input,depth);
    if (n.nodeType === 'ordered-list' || n.nodeType === 'unordered-list') return list(input,depth);
    const checked = node(input,depth);
    if (policy === 'simple') fail('RT_NODE');
    if (checked.nodeType === 'heading-2' || checked.nodeType === 'heading-3') {
      emptyData(checked);
      return {kind:'heading',level:checked.nodeType === 'heading-2' ? 2 : 3,children:array(checked.content,'RT_STRUCTURE').map(c => inline(c,depth+1))};
    }
    if (checked.nodeType === 'blockquote') {
      emptyData(checked); const children = array(checked.content,'RT_STRUCTURE'); if (!children.length) fail('RT_STRUCTURE');
      return {kind:'quote',blocks:children.map(c => paragraph(c,depth+1))};
    }
    if (policy === 'body' && checked.nodeType === 'embedded-asset-block') {
      const data = record(checked.data,'RT_STRUCTURE');
      if (Object.keys(data).length !== 1 || array(checked.content,'RT_STRUCTURE').length) fail('RT_STRUCTURE');
      const resolved = media(linkId(data.target,'Asset')); meaningful = true;
      return resolved.mime === 'application/pdf' ? {kind:'attachment',document:resolved} : {kind:'figure',image:resolved};
    }
    return fail('RT_NODE');
  }
  const root = node(value,0); if (root.nodeType !== 'document') fail('RT_STRUCTURE'); emptyData(root);
  const blocks = array(root.content,'RT_STRUCTURE').map(c => block(c,1));
  if (!meaningful) { if (required) fail('RT_EMPTY'); return undefined; }
  return {policy,blocks};
}

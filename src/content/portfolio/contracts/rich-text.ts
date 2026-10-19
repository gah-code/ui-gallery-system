import type { HttpsUrl } from './values';
import type { MeaningfulImage, DocumentLink } from './media';
export type RichTextPolicy = 'profile-long' | 'simple' | 'body';
export type Mark = 'bold' | 'italic' | 'underline' | 'code' | 'superscript' | 'subscript' | 'strikethrough';
export type BodyMark = Extract<Mark, 'bold' | 'italic' | 'code'>;
export type PolicyMark<P extends RichTextPolicy> = P extends 'body' ? BodyMark : Mark;
export type TextRun<P extends RichTextPolicy = RichTextPolicy> = Readonly<{ kind: 'text'; text: string; marks: readonly PolicyMark<P>[] }>;
export type Inline<P extends RichTextPolicy = RichTextPolicy> = TextRun<P> | Readonly<{ kind: 'link'; href: HttpsUrl; children: readonly TextRun<P>[] }>;
export type Paragraph<P extends RichTextPolicy = RichTextPolicy> = Readonly<{ kind: 'paragraph'; children: readonly Inline<P>[] }>;
export type ListItem<P extends RichTextPolicy = RichTextPolicy> = Readonly<{ blocks: readonly (Paragraph<P> | ListBlock<P>)[] }>;
export type ListBlock<P extends RichTextPolicy = RichTextPolicy> = Readonly<{ kind: 'list'; ordered: boolean; items: readonly ListItem<P>[] }>;
export type Block<P extends RichTextPolicy = RichTextPolicy> =
  | Paragraph<P> | ListBlock<P>
  | Readonly<{ kind: 'heading'; level: 2 | 3; children: readonly Inline<P>[] }>
  | Readonly<{ kind: 'quote'; blocks: readonly Paragraph<P>[] }>
  | Readonly<{ kind: 'figure'; image: MeaningfulImage }>
  | Readonly<{ kind: 'attachment'; document: DocumentLink }>;
export type AllowedBlock<P extends RichTextPolicy> = P extends 'simple'
  ? Paragraph<P> | ListBlock<P>
  : P extends 'profile-long' ? Exclude<Block<P>, { kind: 'figure' | 'attachment' }> : Block<P>;
export type RichTextDocument<P extends RichTextPolicy> = Readonly<{ policy: P; blocks: readonly AllowedBlock<P>[] }>;

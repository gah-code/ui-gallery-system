import type { Id, AssetUrl, PositiveInteger, Text, NonEmptyText } from './values';
export type ImageMime = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif' | 'image/gif' | 'image/svg+xml';
export type ImageView = Readonly<{
  id: Id; src: AssetUrl; mime: ImageMime;
  width: PositiveInteger; height: PositiveInteger;
  title?: Text; description?: Text;
  accessibility: Readonly<{ kind: 'meaningful'; alt: NonEmptyText } | { kind: 'decorative'; alt: '' }>;
}>;
export type MeaningfulImage = ImageView & { readonly accessibility: Readonly<{ kind: 'meaningful'; alt: NonEmptyText }> };
export type DocumentLink = Readonly<{
  id: Id; href: AssetUrl; mime: 'application/pdf'; fileName: NonEmptyText;
  bytes: PositiveInteger; label: NonEmptyText; downloadName?: NonEmptyText;
}>;
export type EditorialMetadata = Readonly<{ title?: NonEmptyText; description?: NonEmptyText; socialImage?: MeaningfulImage }>;

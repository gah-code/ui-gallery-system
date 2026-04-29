import type { HTMLAttributes, ReactNode } from 'react';
import { Image, type ImageProps } from '../../ui/Image';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  body,
  bodyDensity,
  caption as captionClass,
  columns as columnClasses,
  description as descriptionClass,
  gaps,
  item as itemClass,
  media as mediaClass,
  meta,
  root,
  titleLink,
  tones,
} from './Gallery.css';

export type GalleryColumns = 'auto' | 'two' | 'three' | 'four';
export type GalleryDensity = 'default' | 'compact' | 'spacious';
export type GalleryTone = 'default' | 'subtle' | 'raised';

export type GalleryTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type GalleryItem = {
  id?: string;
  image?: {
    src?: string;
    alt: string;
    decorative?: boolean;
  };
  title?: ReactNode;
  caption?: ReactNode;
  description?: ReactNode;
  tags?: GalleryTag[];
  href?: string;
};

export type GalleryProps = {
  items: GalleryItem[];
  columns?: GalleryColumns;
  density?: GalleryDensity;
  tone?: GalleryTone;
  imageAspectRatio?: ImageProps['aspectRatio'];
  className?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Gallery({
  items,
  columns = 'auto',
  density = 'default',
  tone = 'default',
  imageAspectRatio = 'wide',
  className,
  itemClassName,
  ...rest
}: GalleryProps) {
  if (items.length === 0) {
    return null;
  }

  const classes = [root, columnClasses[columns], gaps[density], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {items.map((entry, index) => {
        const hasMeta = Boolean(entry.tags?.length);
        const hasBody = Boolean(entry.title || entry.caption || entry.description || hasMeta);

        return (
          <article
            className={[itemClass, tones[tone], itemClassName].filter(Boolean).join(' ')}
            key={entry.id ?? index}
          >
            {entry.image ? (
              <div className={mediaClass}>
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  decorative={entry.image.decorative}
                  aspectRatio={imageAspectRatio}
                  radius="none"
                  fallback="Image unavailable"
                />
              </div>
            ) : null}

            {hasBody ? (
              <div className={[body, bodyDensity[density]].join(' ')}>
                {hasMeta ? (
                  <div className={meta}>
                    {entry.tags?.map((tag) => (
                      <Tag key={tag.label} variant={tag.variant ?? 'neutral'}>
                        {tag.label}
                      </Tag>
                    ))}
                  </div>
                ) : null}

                {entry.title ? (
                  <Text as="h3" variant="heading">
                    {entry.href ? (
                      <a className={titleLink} href={entry.href}>
                        {entry.title}
                      </a>
                    ) : (
                      entry.title
                    )}
                  </Text>
                ) : null}

                {entry.caption ? (
                  <Text as="p" variant="caption" tone="muted" className={captionClass}>
                    {entry.caption}
                  </Text>
                ) : null}

                {entry.description ? (
                  <Text as="p" variant="body" tone="secondary" className={descriptionClass}>
                    {entry.description}
                  </Text>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

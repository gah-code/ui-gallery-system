import type { HTMLAttributes, ReactNode } from 'react';
import { Image } from '../../ui/Image';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  alignments,
  attribution,
  attributionNoAvatar,
  avatar as avatarClass,
  columns as columnClasses,
  densities,
  featured as featuredClass,
  gaps,
  item as itemClass,
  layouts,
  meta,
  metaLine,
  quote as quoteClass,
  quoteMark,
  root,
  tagRow,
  tones,
} from './Testimonials.css';

export type TestimonialLayout = 'single' | 'grid' | 'featured';
export type TestimonialColumns = 'auto' | 'two' | 'three';
export type TestimonialDensity = 'compact' | 'default' | 'spacious';
export type TestimonialTone = 'default' | 'subtle' | 'raised' | 'outline';
export type TestimonialAlign = 'start' | 'center';

export type TestimonialTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type TestimonialItem = {
  id?: string;
  quote: ReactNode;
  name: ReactNode;
  role?: ReactNode;
  company?: ReactNode;
  avatar?: {
    src?: string;
    alt: string;
    decorative?: boolean;
  };
  tags?: TestimonialTag[];
};

export type TestimonialsProps = {
  items: TestimonialItem[];
  layout?: TestimonialLayout;
  columns?: TestimonialColumns;
  density?: TestimonialDensity;
  tone?: TestimonialTone;
  align?: TestimonialAlign;
  showQuoteMark?: boolean;
  className?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

function AttributionMeta({
  role,
  company,
}: {
  role?: ReactNode;
  company?: ReactNode;
}) {
  if (!role && !company) {
    return null;
  }

  return (
    <Text as="span" variant="caption" tone="muted" className={metaLine}>
      {role ? <span>{role}</span> : null}
      {role && company ? <span aria-hidden="true">-</span> : null}
      {company ? <span>{company}</span> : null}
    </Text>
  );
}

export function Testimonials({
  items,
  layout = 'grid',
  columns = 'auto',
  density = 'default',
  tone = 'default',
  align = 'start',
  showQuoteMark = true,
  className,
  itemClassName,
  ...rest
}: TestimonialsProps) {
  if (items.length === 0) {
    return null;
  }

  const rootClasses = [
    root,
    layouts[layout],
    layout === 'grid' ? columnClasses[columns] : undefined,
    gaps[density],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} {...rest}>
      {items.map((entry, index) => {
        const hasAvatar = Boolean(entry.avatar);
        const hasTags = Boolean(entry.tags?.length);

        return (
          <figure
            className={[
              itemClass,
              tones[tone],
              densities[density],
              alignments[align],
              layout === 'featured' ? featuredClass : undefined,
              itemClassName,
            ]
              .filter(Boolean)
              .join(' ')}
            key={entry.id ?? index}
          >
            <blockquote className={quoteClass}>
              {showQuoteMark ? (
                <span className={quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
              ) : null}
              <Text as="p" variant={layout === 'featured' ? 'subheading' : 'body'}>
                {entry.quote}
              </Text>
            </blockquote>

            {hasTags ? (
              <div className={tagRow}>
                {entry.tags?.map((tag) => (
                  <Tag key={tag.label} variant={tag.variant ?? 'neutral'}>
                    {tag.label}
                  </Tag>
                ))}
              </div>
            ) : null}

            <figcaption
              className={[attribution, !hasAvatar ? attributionNoAvatar : undefined]
                .filter(Boolean)
                .join(' ')}
            >
              {entry.avatar ? (
                <div className={avatarClass}>
                  <Image
                    src={entry.avatar.src}
                    alt={entry.avatar.alt}
                    decorative={entry.avatar.decorative}
                    aspectRatio="square"
                    radius="full"
                    fallback="Avatar unavailable"
                  />
                </div>
              ) : null}

              <div className={meta}>
                <Text as="span" variant="label">
                  {entry.name}
                </Text>
                <AttributionMeta role={entry.role} company={entry.company} />
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

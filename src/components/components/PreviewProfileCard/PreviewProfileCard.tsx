import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Image, type ImageProps } from '../../ui/Image';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  body,
  bodySpacing,
  content as contentClass,
  description as descriptionClass,
  details,
  imageShapes,
  layouts,
  media as mediaClass,
  meta as metaClass,
  root,
  summary as summaryClass,
  title as titleClass,
  titleLink,
  tones,
} from './PreviewProfileCard.css';

export type PreviewProfileCardVariant = 'profile' | 'article' | 'project' | 'caseStudy';
export type PreviewProfileCardLayout = 'stacked' | 'horizontal' | 'compact';
export type PreviewProfileCardTone = 'default' | 'subtle' | 'raised' | 'outline';
export type PreviewProfileCardDensity = 'default' | 'compact' | 'spacious';
export type PreviewProfileCardImageShape = 'rounded' | 'circle' | 'square';

export type PreviewProfileCardTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type PreviewProfileCardStatus = {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

export type PreviewProfileCardImage = {
  src?: string;
  alt: string;
  decorative?: boolean;
  aspectRatio?: ImageProps['aspectRatio'];
};

export type PreviewProfileCardProps = {
  as?: ElementType;
  variant?: PreviewProfileCardVariant;
  layout?: PreviewProfileCardLayout;
  tone?: PreviewProfileCardTone;
  density?: PreviewProfileCardDensity;
  image?: PreviewProfileCardImage;
  imageShape?: PreviewProfileCardImageShape;
  eyebrow?: ReactNode;
  title?: ReactNode;
  summary?: ReactNode;
  description?: ReactNode;
  tags?: PreviewProfileCardTag[];
  status?: PreviewProfileCardStatus;
  meta?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  href?: string;
  className?: string;
  mediaClassName?: string;
  bodyClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function PreviewProfileCard({
  as: Component = 'article',
  variant = 'profile',
  layout = 'stacked',
  tone = 'default',
  density = 'default',
  image,
  imageShape = variant === 'profile' ? 'circle' : 'rounded',
  eyebrow,
  title,
  summary,
  description,
  tags,
  status,
  meta,
  actions,
  footer,
  href,
  className,
  mediaClassName,
  bodyClassName,
  ...rest
}: PreviewProfileCardProps) {
  const hasMeta = Boolean((tags && tags.length > 0) || status || meta);
  const bodyDensity = layout === 'compact' ? 'compact' : density;
  const resolvedLayout = layout === 'horizontal' && !image ? 'stacked' : layout;

  return (
    <Component
      className={[root, tones[tone], layouts[resolvedLayout], className]
        .filter(Boolean)
        .join(' ')}
      data-variant={variant}
      {...rest}
    >
      {image ? (
        <div
          className={[mediaClass, imageShapes[imageShape], mediaClassName]
            .filter(Boolean)
            .join(' ')}
        >
          <Image
            src={image.src}
            alt={image.alt}
            decorative={image.decorative}
            aspectRatio={image.aspectRatio ?? (imageShape === 'circle' ? 'square' : 'wide')}
            radius={imageShape === 'circle' ? 'full' : imageShape === 'square' ? 'md' : 'lg'}
            fallback="Image unavailable"
          />
        </div>
      ) : null}

      <div className={[body, bodySpacing[bodyDensity], bodyClassName].filter(Boolean).join(' ')}>
        {hasMeta ? (
          <div className={metaClass}>
            {status ? (
              <StatusLabel status={status.status ?? 'neutral'}>{status.label}</StatusLabel>
            ) : null}
            {tags?.map((tag) => (
              <Tag key={tag.label} variant={tag.variant ?? 'neutral'}>
                {tag.label}
              </Tag>
            ))}
            {meta}
          </div>
        ) : null}

        <div className={contentClass}>
          {eyebrow ? (
            <Text as="p" variant="metadata" tone="muted">
              {eyebrow}
            </Text>
          ) : null}

          {title ? (
            <Text as="h3" variant="heading" className={titleClass}>
              {href ? (
                <a className={titleLink} href={href}>
                  {title}
                </a>
              ) : (
                title
              )}
            </Text>
          ) : null}

          {summary ? (
            <Text as="p" variant="body" tone="secondary" className={summaryClass}>
              {summary}
            </Text>
          ) : null}

          {description ? (
            <Text as="p" variant="caption" tone="muted" className={descriptionClass}>
              {description}
            </Text>
          ) : null}
        </div>

        {actions ? <div className={actionsClass}>{actions}</div> : null}
        {footer ? <div className={details}>{footer}</div> : null}
      </div>
    </Component>
  );
}

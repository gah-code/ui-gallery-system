import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  alignments,
  body,
  content as contentClass,
  densities,
  description as descriptionClass,
  footer as footerClass,
  iconSizes,
  iconWrap,
  media as mediaClass,
  meta,
  root,
  title as titleClass,
  tones,
  variants,
} from './FeatureBox.css';

export type FeatureBoxVariant = 'default' | 'icon' | 'media' | 'compact';
export type FeatureBoxTone = 'default' | 'subtle' | 'raised' | 'outline';
export type FeatureBoxDensity = 'compact' | 'default' | 'spacious';
export type FeatureBoxAlign = 'start' | 'center';
export type FeatureBoxIconSize = 'sm' | 'md' | 'lg';

export type FeatureBoxTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type FeatureBoxStatus = {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

export type FeatureBoxProps = {
  as?: ElementType;
  variant?: FeatureBoxVariant;
  tone?: FeatureBoxTone;
  density?: FeatureBoxDensity;
  align?: FeatureBoxAlign;
  icon?: ReactNode;
  iconSize?: FeatureBoxIconSize;
  media?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  tags?: FeatureBoxTag[];
  status?: FeatureBoxStatus;
  actions?: ReactNode;
  footer?: ReactNode;
  className?: string;
  mediaClassName?: string;
  bodyClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function FeatureBox({
  as: Component = 'article',
  variant = 'default',
  tone = 'default',
  density = 'default',
  align = 'start',
  icon,
  iconSize = 'md',
  media,
  eyebrow,
  title,
  description,
  tags,
  status,
  actions,
  footer,
  className,
  mediaClassName,
  bodyClassName,
  ...rest
}: FeatureBoxProps) {
  const hasMeta = Boolean((tags && tags.length > 0) || status);
  const hasContent = Boolean(eyebrow || title || description);
  const resolvedDensity = variant === 'compact' ? 'compact' : density;

  const rootClasses = [root, tones[tone], variants[variant], className]
    .filter(Boolean)
    .join(' ');
  const bodyClasses = [body, densities[resolvedDensity], alignments[align], bodyClassName]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={rootClasses} {...rest}>
      {media ? (
        <div className={[mediaClass, mediaClassName].filter(Boolean).join(' ')}>{media}</div>
      ) : null}

      <div className={bodyClasses}>
        {icon ? (
          <span className={[iconWrap, iconSizes[iconSize]].join(' ')} aria-hidden="true">
            {icon}
          </span>
        ) : null}

        {hasMeta ? (
          <div className={meta}>
            {status ? (
              <StatusLabel status={status.status ?? 'neutral'}>{status.label}</StatusLabel>
            ) : null}
            {tags?.map((tag) => (
              <Tag key={tag.label} variant={tag.variant ?? 'neutral'}>
                {tag.label}
              </Tag>
            ))}
          </div>
        ) : null}

        {hasContent ? (
          <div className={contentClass}>
            {eyebrow ? (
              <Text as="p" variant="metadata" tone="muted">
                {eyebrow}
              </Text>
            ) : null}
            {title ? (
              <Text as="h3" variant="heading" className={titleClass}>
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text as="p" variant="body" tone="secondary" className={descriptionClass}>
                {description}
              </Text>
            ) : null}
          </div>
        ) : null}

        {actions ? <div className={actionsClass}>{actions}</div> : null}
        {footer ? <div className={footerClass}>{footer}</div> : null}
      </div>
    </Component>
  );
}

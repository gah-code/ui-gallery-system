import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  actionsCentered,
  content as contentClass,
  contentCentered,
  densities,
  footer as footerClass,
  heading,
  inner,
  intro as introClass,
  media as mediaClass,
  meta,
  metaCentered,
  root,
  variants,
  widths,
} from './Hero.css';

export type HeroVariant = 'default' | 'centered' | 'split' | 'media';
export type HeroDensity = 'compact' | 'default' | 'spacious';
export type HeroWidth = 'narrow' | 'comfortable' | 'wide' | 'full';

export type HeroTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type HeroStatus = {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

export type HeroProps = {
  as?: ElementType;
  variant?: HeroVariant;
  density?: HeroDensity;
  contentWidth?: HeroWidth;
  eyebrow?: ReactNode;
  status?: HeroStatus;
  title: ReactNode;
  intro?: ReactNode;
  tags?: HeroTag[];
  actions?: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  mediaClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function Hero({
  as: Component = 'section',
  variant = 'default',
  density = 'default',
  contentWidth = 'comfortable',
  eyebrow,
  status,
  title,
  intro,
  tags,
  actions,
  media,
  footer,
  className,
  contentClassName,
  mediaClassName,
  ...rest
}: HeroProps) {
  const isCentered = variant === 'centered';
  const hasMeta = Boolean(eyebrow || status || tags?.length);
  const shouldUseTwoColumn = Boolean(
    media && (variant === 'split' || variant === 'media'),
  );
  const resolvedVariant = shouldUseTwoColumn ? variant : 'default';

  return (
    <Component className={[root, className].filter(Boolean).join(' ')} {...rest}>
      <div
        className={[
          inner,
          densities[density],
          variants[isCentered ? 'centered' : resolvedVariant],
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className={[
            contentClass,
            widths[contentWidth],
            isCentered ? contentCentered : undefined,
            contentClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {hasMeta ? (
            <div
              className={[meta, isCentered ? metaCentered : undefined]
                .filter(Boolean)
                .join(' ')}
            >
              {status ? (
                <StatusLabel status={status.status ?? 'neutral'}>
                  {status.label}
                </StatusLabel>
              ) : null}
              {eyebrow ? (
                <Text as="p" variant="metadata" tone="muted">
                  {eyebrow}
                </Text>
              ) : null}
              {tags?.map((tag) => (
                <Tag key={tag.label} variant={tag.variant ?? 'neutral'}>
                  {tag.label}
                </Tag>
              ))}
            </div>
          ) : null}

          <Text as="h1" variant="display" className={heading}>
            {title}
          </Text>

          {intro ? (
            <Text as="p" variant="subheading" tone="secondary" className={introClass}>
              {intro}
            </Text>
          ) : null}

          {actions ? (
            <div
              className={[actionsClass, isCentered ? actionsCentered : undefined]
                .filter(Boolean)
                .join(' ')}
            >
              {actions}
            </div>
          ) : null}

          {footer ? <div className={footerClass}>{footer}</div> : null}
        </div>

        {shouldUseTwoColumn ? (
          <div className={[mediaClass, mediaClassName].filter(Boolean).join(' ')}>
            {media}
          </div>
        ) : null}
      </div>
    </Component>
  );
}

import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  body,
  clickable,
  compactBody,
  content as contentClass,
  footer as footerClass,
  header,
  media as mediaClass,
  meta as metaClass,
  paddings,
  root,
  tones,
  variants,
} from './Card.css';

export type CardVariant = 'default' | 'media' | 'compact' | 'horizontal';
export type CardTone = 'default' | 'subtle' | 'raised' | 'outline';
export type CardPadding = 'sm' | 'md' | 'lg';

export type CardTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type CardStatus = {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

export type CardProps = {
  as?: ElementType;
  variant?: CardVariant;
  tone?: CardTone;
  padding?: CardPadding;
  media?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  tags?: CardTag[];
  status?: CardStatus;
  meta?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  href?: string;
  children?: ReactNode;
  className?: string;
  mediaClassName?: string;
  bodyClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'title'>;

export function Card({
  as: Component = 'article',
  variant = 'default',
  tone = 'default',
  padding = 'md',
  media,
  eyebrow,
  title,
  description,
  tags,
  status,
  meta,
  actions,
  footer,
  href,
  children,
  className,
  mediaClassName,
  bodyClassName,
  ...rest
}: CardProps) {
  const hasMeta = Boolean((tags && tags.length > 0) || status || meta);
  const hasHeader = Boolean(eyebrow || title || description);
  const hasContent = Boolean(children);
  const isCompact = variant === 'compact';
  const resolvedVariant = variant === 'horizontal' && !media ? 'default' : variant;

  const rootClasses = [
    root,
    tones[tone],
    variants[resolvedVariant],
    href ? clickable : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const bodyClasses = [
    body,
    isCompact ? compactBody : paddings[padding],
    bodyClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const titleContent =
    href && title ? (
      <a href={href}>{title}</a>
    ) : (
      title
    );

  return (
    <Component className={rootClasses} {...rest}>
      {media ? (
        <div className={[mediaClass, mediaClassName].filter(Boolean).join(' ')}>
          {media}
        </div>
      ) : null}

      <div className={bodyClasses}>
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

        {hasHeader ? (
          <div className={header}>
            {eyebrow ? (
              <Text as="p" variant="metadata" tone="muted">
                {eyebrow}
              </Text>
            ) : null}
            {title ? (
              <Text as="h3" variant="heading">
                {titleContent}
              </Text>
            ) : null}
            {description ? (
              <Text as="p" variant="body" tone="secondary">
                {description}
              </Text>
            ) : null}
          </div>
        ) : null}

        {hasContent ? <div className={contentClass}>{children}</div> : null}
        {actions ? <div className={actionsClass}>{actions}</div> : null}
        {footer ? <div className={footerClass}>{footer}</div> : null}
      </div>
    </Component>
  );
}

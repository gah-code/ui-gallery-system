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
  framed as framedClass,
  heading,
  inner,
  meta,
  metaCentered,
  root,
  support as supportClass,
  text,
  tones,
  variants,
  widths,
} from './CTASection.css';

export type CTASectionVariant = 'centered' | 'split' | 'compact';
export type CTASectionTone = 'default' | 'subtle' | 'raised' | 'outline' | 'brand';
export type CTASectionDensity = 'compact' | 'default' | 'spacious';
export type CTASectionWidth = 'narrow' | 'comfortable' | 'wide' | 'full';

export type CTASectionTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type CTASectionStatus = {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

export type CTASectionProps = {
  as?: ElementType;
  variant?: CTASectionVariant;
  tone?: CTASectionTone;
  density?: CTASectionDensity;
  contentWidth?: CTASectionWidth;
  framed?: boolean;
  eyebrow?: ReactNode;
  status?: CTASectionStatus;
  title: ReactNode;
  description?: ReactNode;
  tags?: CTASectionTag[];
  actions?: ReactNode;
  support?: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  supportClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function CTASection({
  as: Component = 'section',
  variant = 'centered',
  tone = 'default',
  density = 'default',
  contentWidth = 'comfortable',
  framed = false,
  eyebrow,
  status,
  title,
  description,
  tags,
  actions,
  support,
  footer,
  className,
  contentClassName,
  supportClassName,
  ...rest
}: CTASectionProps) {
  const hasMeta = Boolean(eyebrow || status || tags?.length);
  const isCentered = variant === 'centered';
  const resolvedVariant = variant === 'split' && support ? 'split' : variant === 'compact' ? 'compact' : 'centered';
  const textTone = tone === 'brand' ? 'inverse' : 'primary';
  const bodyTone = tone === 'brand' ? 'inverse' : 'secondary';
  const metadataTone = tone === 'brand' ? 'inverse' : 'muted';

  return (
    <Component className={[root, tones[tone], className].filter(Boolean).join(' ')} {...rest}>
      <div
        className={[
          inner,
          densities[density],
          variants[resolvedVariant],
          framed ? framedClass : undefined,
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
                <Text as="p" variant="metadata" tone={metadataTone}>
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

          <Text as="h2" variant="heading" tone={textTone} className={heading}>
            {title}
          </Text>

          {description ? (
            <Text as="p" variant="body" tone={bodyTone} className={text}>
              {description}
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

        {resolvedVariant === 'split' && support ? (
          <div className={[supportClass, supportClassName].filter(Boolean).join(' ')}>
            {support}
          </div>
        ) : null}
      </div>
    </Component>
  );
}

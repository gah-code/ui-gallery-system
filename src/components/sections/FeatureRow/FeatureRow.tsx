import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { FeatureBox } from '../../components/FeatureBox';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  actionsCentered,
  columns as columnClasses,
  densities,
  empty as emptyClass,
  features as featuresClass,
  gaps,
  header,
  headerCentered,
  heading,
  inner,
  intro as introClass,
  meta,
  metaCentered,
  root,
  tones,
  variants,
} from './FeatureRow.css';

export type FeatureRowVariant = 'grid' | 'row' | 'centered';
export type FeatureRowColumns = 'auto' | 'two' | 'three' | 'four';
export type FeatureRowDensity = 'compact' | 'default' | 'spacious';
export type FeatureRowTone = 'default' | 'subtle' | 'raised' | 'outline';

export type FeatureRowTag = {
  label: string;
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
};

export type FeatureRowStatus = {
  label: string;
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

export type FeatureRowItem = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  media?: ReactNode;
  tags?: FeatureRowTag[];
  status?: FeatureRowStatus;
  actions?: ReactNode;
};

export type FeatureRowProps = {
  as?: ElementType;
  variant?: FeatureRowVariant;
  columns?: FeatureRowColumns;
  density?: FeatureRowDensity;
  tone?: FeatureRowTone;
  eyebrow?: ReactNode;
  status?: FeatureRowStatus;
  title?: ReactNode;
  intro?: ReactNode;
  tags?: FeatureRowTag[];
  features: FeatureRowItem[];
  actions?: ReactNode;
  emptyMessage?: ReactNode;
  className?: string;
  headerClassName?: string;
  featuresClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

export function FeatureRow({
  as: Component = 'section',
  variant = 'grid',
  columns = 'three',
  density = 'default',
  tone = 'default',
  eyebrow,
  status,
  title,
  intro,
  tags,
  features,
  actions,
  emptyMessage,
  className,
  headerClassName,
  featuresClassName,
  ...rest
}: FeatureRowProps) {
  const isCentered = variant === 'centered';
  const hasHeader = Boolean(eyebrow || status || tags?.length || title || intro || actions);
  const hasMeta = Boolean(eyebrow || status || tags?.length);
  const hasFeatures = features.length > 0;

  return (
    <Component className={[root, tones[tone], className].filter(Boolean).join(' ')} {...rest}>
      <div className={[inner, densities[density]].filter(Boolean).join(' ')}>
        {hasHeader ? (
          <div
            className={[header, isCentered ? headerCentered : undefined, headerClassName]
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

            {title ? (
              <Text as="h2" variant="heading" className={heading}>
                {title}
              </Text>
            ) : null}

            {intro ? (
              <Text as="p" variant="body" tone="secondary" className={introClass}>
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
          </div>
        ) : null}

        {hasFeatures ? (
          <div
            className={[
              featuresClass,
              variants[variant],
              columnClasses[columns],
              gaps[density],
              featuresClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {features.map((feature, index) => (
              <FeatureBox
                key={feature.id ?? index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                media={feature.media}
                tags={feature.tags}
                status={feature.status}
                actions={feature.actions}
                density={density}
                align={isCentered ? 'center' : 'start'}
              />
            ))}
          </div>
        ) : emptyMessage ? (
          <Text as="p" variant="body" tone="muted" className={emptyClass}>
            {emptyMessage}
          </Text>
        ) : null}
      </div>
    </Component>
  );
}

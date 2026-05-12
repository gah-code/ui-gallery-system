import type { HTMLAttributes, ReactNode } from 'react';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  columns as columnClasses,
  featured as featuredClass,
  featureItem,
  featureList,
  featureMarker,
  footer as footerClass,
  gaps,
  header,
  meta,
  period as periodClass,
  plan as planClass,
  planDensities,
  planHeader,
  plans as plansClass,
  price as priceClass,
  priceBlock,
  root,
  tones,
} from './PricingTables.css';

export type PricingTablesColumns = 'auto' | 'two' | 'three' | 'four';
export type PricingTablesDensity = 'compact' | 'default' | 'spacious';
export type PricingTablesTone = 'default' | 'subtle' | 'raised' | 'outline';

export type PricingPlan = {
  id?: string;
  name: ReactNode;
  description?: ReactNode;
  price: ReactNode;
  period?: ReactNode;
  badge?: ReactNode;
  featured?: boolean;
  featuredLabel?: ReactNode;
  features: ReactNode[];
  action?: ReactNode;
  footer?: ReactNode;
};

export type PricingTablesProps = {
  plans: PricingPlan[];
  title?: ReactNode;
  description?: ReactNode;
  columns?: PricingTablesColumns;
  density?: PricingTablesDensity;
  tone?: PricingTablesTone;
  className?: string;
  planClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function PricingTables({
  plans,
  title,
  description,
  columns = 'auto',
  density = 'default',
  tone = 'default',
  className,
  planClassName,
  ...rest
}: PricingTablesProps) {
  if (plans.length === 0) {
    return null;
  }

  return (
    <div className={[root, className].filter(Boolean).join(' ')} {...rest}>
      {title || description ? (
        <div className={header}>
          {title ? (
            <Text as="h3" variant="heading">
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text as="p" variant="body" tone="secondary">
              {description}
            </Text>
          ) : null}
        </div>
      ) : null}

      <div className={[plansClass, columnClasses[columns], gaps[density]].join(' ')}>
        {plans.map((pricingPlan, index) => {
          const isFeatured = Boolean(pricingPlan.featured);
          const visibleFeaturedLabel = pricingPlan.featuredLabel ?? 'Featured';

          return (
            <article
              className={[
                planClass,
                tones[tone],
                planDensities[density],
                isFeatured ? featuredClass : undefined,
                planClassName,
              ]
                .filter(Boolean)
                .join(' ')}
              key={pricingPlan.id ?? index}
            >
              {pricingPlan.badge || isFeatured ? (
                <div className={meta}>
                  {isFeatured ? (
                    <StatusLabel status="info">{visibleFeaturedLabel}</StatusLabel>
                  ) : null}
                  {pricingPlan.badge ? <Tag variant="brand">{pricingPlan.badge}</Tag> : null}
                </div>
              ) : null}

              <div className={planHeader}>
                <Text as="h3" variant="heading">
                  {pricingPlan.name}
                </Text>
                {pricingPlan.description ? (
                  <Text as="p" variant="body" tone="secondary">
                    {pricingPlan.description}
                  </Text>
                ) : null}
              </div>

              <div className={priceBlock}>
                <Text as="p" variant="display" className={priceClass}>
                  {pricingPlan.price}
                </Text>
                {pricingPlan.period ? (
                  <Text as="span" variant="caption" tone="muted" className={periodClass}>
                    {pricingPlan.period}
                  </Text>
                ) : null}
              </div>

              <ul className={featureList}>
                {pricingPlan.features.map((feature, featureIndex) => (
                  <li className={featureItem} key={featureIndex}>
                    <span className={featureMarker} aria-hidden="true">
                      +
                    </span>
                    <Text as="span" variant="body" tone="secondary">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>

              {pricingPlan.action ? <div className={actionsClass}>{pricingPlan.action}</div> : null}

              {pricingPlan.footer ? (
                <Text as="p" variant="caption" tone="muted" className={footerClass}>
                  {pricingPlan.footer}
                </Text>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

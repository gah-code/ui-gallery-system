import type { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  alignments,
  columns as columnClasses,
  densities,
  description as descriptionClass,
  gaps,
  icon as iconClass,
  item as itemClass,
  label as labelClass,
  root,
  tones,
  value as valueClass,
} from './Stats.css';

export type StatsColumns = 'auto' | 'two' | 'three' | 'four';
export type StatsDensity = 'default' | 'compact' | 'spacious';
export type StatsAlign = 'start' | 'center';
export type StatTone = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';

export type StatItem = {
  id?: string;
  value: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  tone?: StatTone;
};

export type StatsProps = {
  items: StatItem[];
  columns?: StatsColumns;
  density?: StatsDensity;
  align?: StatsAlign;
  className?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Stats({
  items,
  columns = 'auto',
  density = 'default',
  align = 'start',
  className,
  itemClassName,
  ...rest
}: StatsProps) {
  if (items.length === 0) {
    return null;
  }

  const classes = [root, columnClasses[columns], gaps[density], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {items.map((stat, index) => {
        const tone = stat.tone ?? 'neutral';

        return (
          <div
            className={[itemClass, densities[density], alignments[align], itemClassName]
              .filter(Boolean)
              .join(' ')}
            key={stat.id ?? index}
          >
            {stat.icon ? (
              <span className={[iconClass, tones[tone]].join(' ')} aria-hidden="true">
                {stat.icon}
              </span>
            ) : null}

            <Text
              as="p"
              variant="display"
              tone="primary"
              className={[valueClass, tones[tone]].join(' ')}
            >
              {stat.value}
            </Text>

            <Text as="p" variant="label" tone="primary" className={labelClass}>
              {stat.label}
            </Text>

            {stat.description ? (
              <Text as="p" variant="caption" tone="secondary" className={descriptionClass}>
                {stat.description}
              </Text>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

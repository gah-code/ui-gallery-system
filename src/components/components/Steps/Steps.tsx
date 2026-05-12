import type { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  body,
  bodyDensities,
  description as descriptionClass,
  gaps,
  layouts,
  list,
  marker,
  markerTones,
  meta as metaClass,
  root,
  step,
  title as titleClass,
} from './Steps.css';

export type StepsLayout = 'vertical' | 'horizontal' | 'responsive';
export type StepsVariant = 'numbered' | 'icon' | 'plain';
export type StepsDensity = 'compact' | 'default' | 'spacious';
export type StepStatus = 'default' | 'current' | 'complete' | 'disabled';

export type StepItem = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: StepStatus;
  meta?: ReactNode;
  actions?: ReactNode;
};

export type StepsProps = {
  items: StepItem[];
  layout?: StepsLayout;
  variant?: StepsVariant;
  density?: StepsDensity;
  className?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLOListElement>;

export function Steps({
  items,
  layout = 'responsive',
  variant = 'numbered',
  density = 'default',
  className,
  itemClassName,
  ...rest
}: StepsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ol
      className={[root, list, layouts[layout], gaps[density], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {items.map((entry, index) => {
        const status = entry.status ?? 'default';
        const markerContent =
          variant === 'icon' && entry.icon ? entry.icon : variant === 'plain' ? '' : index + 1;

        return (
          <li className={[step, itemClassName].filter(Boolean).join(' ')} key={entry.id ?? index}>
            <span className={[marker, markerTones[status]].join(' ')} aria-hidden="true">
              {markerContent}
            </span>

            <div className={[body, bodyDensities[density]].join(' ')}>
              <Text as="h3" variant="label" className={titleClass}>
                {entry.title}
              </Text>

              {entry.description ? (
                <Text as="p" variant="body" tone="secondary" className={descriptionClass}>
                  {entry.description}
                </Text>
              ) : null}

              {entry.meta ? <div className={metaClass}>{entry.meta}</div> : null}
              {entry.actions ? <div className={actionsClass}>{entry.actions}</div> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

import type { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  content as contentClass,
  densities,
  icon as iconClass,
  message as messageClass,
  noIcon,
  root,
  variants,
} from './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type AlertDensity = 'default' | 'compact';

export type AlertProps = {
  variant?: AlertVariant;
  density?: AlertDensity;
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Alert({
  variant = 'info',
  density = 'default',
  title,
  children,
  icon,
  actions,
  className,
  role,
  ...rest
}: AlertProps) {
  const classes = [
    root,
    variants[variant],
    densities[density],
    !icon ? noIcon : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role={role} {...rest}>
      {icon ? (
        <span className={iconClass} aria-hidden="true">
          {icon}
        </span>
      ) : null}

      <div className={contentClass}>
        {title ? (
          <Text as="p" variant="label" tone="primary">
            {title}
          </Text>
        ) : null}

        {children ? (
          <Text as="div" variant="body" tone="secondary" className={messageClass}>
            {children}
          </Text>
        ) : null}

        {actions ? <div className={actionsClass}>{actions}</div> : null}
      </div>
    </div>
  );
}

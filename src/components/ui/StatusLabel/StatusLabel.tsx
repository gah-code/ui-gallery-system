import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  base,
  icon as iconClass,
  message,
  sizes,
  statuses,
  withIcon,
} from './StatusLabel.css';

export type StatusLabelStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type StatusLabelSize = 'sm' | 'md';

export type StatusLabelProps = {
  as?: ElementType;
  status?: StatusLabelStatus;
  size?: StatusLabelSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function StatusLabel({
  as: Component = 'span',
  status = 'neutral',
  size = 'md',
  icon,
  children,
  className,
  ...rest
}: StatusLabelProps) {
  const classes = [
    base,
    statuses[status],
    sizes[size],
    icon ? withIcon : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {icon ? (
        <span className={iconClass} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={message}>{children}</span>
    </Component>
  );
}

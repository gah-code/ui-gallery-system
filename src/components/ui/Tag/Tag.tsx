import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { base, icon as iconClass, shapes, sizes, variants, withIcon } from './Tag.css';

export type TagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md';
export type TagShape = 'default' | 'pill';

export type TagProps = {
  as?: ElementType;
  variant?: TagVariant;
  size?: TagSize;
  shape?: TagShape;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Tag({
  as: Component = 'span',
  variant = 'neutral',
  size = 'md',
  shape = 'pill',
  icon,
  children,
  className,
  ...rest
}: TagProps) {
  const classes = [
    base,
    variants[variant],
    sizes[size],
    shapes[shape],
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
      <span>{children}</span>
    </Component>
  );
}

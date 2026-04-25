import type { HTMLAttributes, ReactNode } from 'react';
import { base, sizes, tones } from './Icon.css';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconTone =
  | 'current'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

type SharedIconProps = {
  children: ReactNode;
  size?: IconSize;
  tone?: IconTone;
  className?: string;
};

type DecorativeIconProps = SharedIconProps & {
  decorative?: true;
  label?: never;
};

type FunctionalIconProps = SharedIconProps & {
  decorative: false;
  label: string;
};

export type IconProps = (DecorativeIconProps | FunctionalIconProps) &
  HTMLAttributes<HTMLSpanElement>;

export function Icon({
  children,
  size = 'md',
  tone = 'current',
  decorative = true,
  label,
  className,
  ...rest
}: IconProps) {
  const classes = [base, sizes[size], tones[tone], className].filter(Boolean).join(' ');
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label };

  return (
    <span className={classes} {...rest} {...accessibilityProps}>
      {children}
    </span>
  );
}

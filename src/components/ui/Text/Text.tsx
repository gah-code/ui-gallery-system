import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { alignments, base, tones, variants } from './Text.css';

export type TextVariant =
  | 'display'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'label'
  | 'metadata';

export type TextTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'link'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type TextAlign = 'start' | 'center' | 'end';

export type TextProps = {
  as?: ElementType;
  variant?: TextVariant;
  tone?: TextTone;
  align?: TextAlign;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Text({
  as: Component = 'p',
  variant = 'body',
  tone = 'primary',
  align = 'start',
  className,
  children,
  ...rest
}: TextProps) {
  const classes = [base, variants[variant], tones[tone], alignments[align], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

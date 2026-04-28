import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  accent as accentClass,
  accentFullWidth,
  aligns,
  gaps,
  layouts,
  offsets,
  primary as primaryClass,
  root,
  secondary as secondaryClass,
} from './Asymmetric.css';

export type AsymmetricGap = 'sm' | 'md' | 'lg' | 'xl';
export type AsymmetricLayout = 'default' | 'primaryLead' | 'secondaryLead' | 'offset';
export type AsymmetricAlign = 'start' | 'center' | 'stretch';
export type AsymmetricOffset = 'none' | 'sm' | 'md' | 'lg';

export type AsymmetricProps = {
  as?: ElementType;
  primary: ReactNode;
  secondary?: ReactNode;
  accent?: ReactNode;
  gap?: AsymmetricGap;
  layout?: AsymmetricLayout;
  align?: AsymmetricAlign;
  offset?: AsymmetricOffset;
  reverse?: boolean;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  accentClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'content'>;

export function Asymmetric({
  as: Component = 'div',
  primary,
  secondary,
  accent,
  gap = 'lg',
  layout = 'default',
  align = 'center',
  offset = 'none',
  reverse = false,
  className,
  primaryClassName,
  secondaryClassName,
  accentClassName,
  ...rest
}: AsymmetricProps) {
  const hasSecondary = Boolean(secondary);
  const classes = [root, hasSecondary ? layouts[layout] : undefined, gaps[gap], aligns[align], className]
    .filter(Boolean)
    .join(' ');

  const primaryNode = <div className={[primaryClass, primaryClassName].filter(Boolean).join(' ')}>{primary}</div>;
  const secondaryNode = hasSecondary ? (
    <div className={[secondaryClass, offsets[offset], secondaryClassName].filter(Boolean).join(' ')}>
      {secondary}
    </div>
  ) : null;

  return (
    <Component className={classes} {...rest}>
      {reverse ? secondaryNode : primaryNode}
      {reverse ? primaryNode : secondaryNode}

      {accent ? (
        <div className={[accentClass, accentFullWidth, accentClassName].filter(Boolean).join(' ')}>
          {accent}
        </div>
      ) : null}
    </Component>
  );
}

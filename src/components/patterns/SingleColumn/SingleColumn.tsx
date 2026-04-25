import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  alignments,
  contentSafety,
  gaps,
  positions,
  root,
  widths,
} from './SingleColumn.css';

export type SingleColumnGap = 'sm' | 'md' | 'lg' | 'xl';
export type SingleColumnWidth = 'narrow' | 'comfortable' | 'wide' | 'full';
export type SingleColumnAlign = 'start' | 'center' | 'end' | 'stretch';
export type SingleColumnPosition = 'start' | 'center' | 'end' | 'stretch';

export type SingleColumnProps = {
  as?: ElementType;
  children: ReactNode;
  gap?: SingleColumnGap;
  width?: SingleColumnWidth;
  align?: SingleColumnAlign;
  position?: SingleColumnPosition;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function SingleColumn({
  as: Component = 'div',
  children,
  gap = 'md',
  width = 'comfortable',
  align = 'stretch',
  position = 'start',
  className,
  ...rest
}: SingleColumnProps) {
  const classes = [
    root,
    gaps[gap],
    widths[width],
    alignments[align],
    positions[position],
    contentSafety,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

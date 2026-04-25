import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { aligns, gaps, justifies, minItemWidthProperty, root } from './Row.css';

export type RowGap = 'sm' | 'md' | 'lg' | 'xl';
export type RowAlign = 'start' | 'center' | 'end' | 'stretch';
export type RowJustify = 'start' | 'center' | 'end' | 'between';

export type RowProps = {
  as?: ElementType;
  children: ReactNode;
  gap?: RowGap;
  align?: RowAlign;
  justify?: RowJustify;
  minItemWidth?: string;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Row({
  as: Component = 'div',
  children,
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  minItemWidth = '16rem',
  className,
  style,
  ...rest
}: RowProps) {
  const classes = [root, gaps[gap], aligns[align], justifies[justify], className]
    .filter(Boolean)
    .join(' ');

  const rowStyle = {
    [minItemWidthProperty]: minItemWidth,
    ...style,
  } as CSSProperties;

  return (
    <Component className={classes} style={rowStyle} {...rest}>
      {children}
    </Component>
  );
}

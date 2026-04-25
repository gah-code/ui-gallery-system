import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  alignItems,
  autoGrid,
  columnModes,
  gaps,
  minItemWidthProperty,
  root,
} from './Grid.css';

export type GridGap = 'sm' | 'md' | 'lg' | 'xl';
export type GridColumns = 'auto' | 'two' | 'three' | 'four';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

export type GridProps = {
  as?: ElementType;
  children: ReactNode;
  gap?: GridGap;
  columns?: GridColumns;
  minItemWidth?: string;
  align?: GridAlign;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Grid({
  as: Component = 'div',
  children,
  gap = 'md',
  columns = 'auto',
  minItemWidth = '16rem',
  align = 'stretch',
  className,
  style,
  ...rest
}: GridProps) {
  const classes = [
    root,
    columns === 'auto' ? autoGrid : columnModes[columns],
    gaps[gap],
    alignItems[align],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const gridStyle = {
    [minItemWidthProperty]: minItemWidth,
    ...style,
  } as CSSProperties;

  return (
    <Component className={classes} style={gridStyle} {...rest}>
      {children}
    </Component>
  );
}

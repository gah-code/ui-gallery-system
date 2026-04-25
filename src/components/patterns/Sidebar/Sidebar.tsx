import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  aligns,
  gaps,
  layout,
  main as mainClass,
  root,
  sideLeft,
  sidebar as sidebarClass,
  sidebarWidthProperty,
  sidebarWidths,
} from './Sidebar.css';

export type SidebarGap = 'sm' | 'md' | 'lg' | 'xl';
export type SidebarSide = 'left' | 'right';
export type SidebarWidth = keyof typeof sidebarWidths;
export type SidebarAlign = 'start' | 'stretch';

export type SidebarProps = {
  as?: ElementType;
  main: ReactNode;
  sidebar: ReactNode;
  side?: SidebarSide;
  gap?: SidebarGap;
  sidebarWidth?: SidebarWidth | string;
  align?: SidebarAlign;
  className?: string;
  mainClassName?: string;
  sidebarClassName?: string;
} & HTMLAttributes<HTMLElement>;

function resolveSidebarWidth(sidebarWidth: SidebarWidth | string) {
  return Object.prototype.hasOwnProperty.call(sidebarWidths, sidebarWidth)
    ? sidebarWidths[sidebarWidth as SidebarWidth]
    : sidebarWidth;
}

export function Sidebar({
  as: Component = 'div',
  main,
  sidebar,
  side = 'right',
  gap = 'lg',
  sidebarWidth = 'md',
  align = 'start',
  className,
  mainClassName,
  sidebarClassName,
  style,
  ...rest
}: SidebarProps) {
  const classes = [
    root,
    layout,
    side === 'left' ? sideLeft : undefined,
    gaps[gap],
    aligns[align],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sidebarStyle = {
    [sidebarWidthProperty]: resolveSidebarWidth(sidebarWidth),
    ...style,
  } as CSSProperties;

  const mainContent = <div className={[mainClass, mainClassName].filter(Boolean).join(' ')}>{main}</div>;
  const sidebarContent = (
    <aside className={[sidebarClass, sidebarClassName].filter(Boolean).join(' ')}>{sidebar}</aside>
  );

  return (
    <Component className={classes} style={sidebarStyle} {...rest}>
      {side === 'left' ? sidebarContent : mainContent}
      {side === 'left' ? mainContent : sidebarContent}
    </Component>
  );
}

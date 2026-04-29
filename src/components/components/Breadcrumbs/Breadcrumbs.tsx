import type { ReactNode } from 'react';
import {
  current as currentClass,
  item as itemClass,
  link as linkClass,
  list,
  nav,
  separator as separatorClass,
  separatorSpacing,
  sizes,
} from './Breadcrumbs.css';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'dot';
export type BreadcrumbSize = 'sm' | 'md';

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  current?: boolean;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  label?: string;
  size?: BreadcrumbSize;
  separator?: BreadcrumbSeparator;
  className?: string;
};

const separatorMap: Record<BreadcrumbSeparator, string> = {
  slash: '/',
  chevron: '›',
  dot: '•',
};

export function Breadcrumbs({
  items,
  label = 'Breadcrumb',
  size = 'md',
  separator = 'chevron',
  className,
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={[nav, className].filter(Boolean).join(' ')} aria-label={label}>
      <ol className={[list, sizes[size]].filter(Boolean).join(' ')}>
        {items.map((entry, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = entry.current ?? isLast;
          const key = typeof entry.label === 'string' ? entry.label : index;

          return (
            <li className={itemClass} key={key}>
              {index > 0 ? (
                <span
                  className={[separatorClass, separatorSpacing[size]].join(' ')}
                  aria-hidden="true"
                >
                  {separatorMap[separator]}
                </span>
              ) : null}

              {entry.href && !isCurrent ? (
                <a className={linkClass} href={entry.href}>
                  {entry.label}
                </a>
              ) : (
                <span className={currentClass} aria-current={isCurrent ? 'page' : undefined}>
                  {entry.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

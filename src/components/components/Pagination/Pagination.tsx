import type { MouseEvent, ReactNode } from 'react';
import {
  compactList,
  control,
  ellipsis as ellipsisClass,
  item as itemClass,
  list,
  nav,
  prevNext,
  sizes,
} from './Pagination.css';

export type PaginationSize = 'sm' | 'md';
export type PaginationVariant = 'default' | 'compact';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  label?: string;
  size?: PaginationSize;
  variant?: PaginationVariant;
  siblingCount?: number;
  boundaryCount?: number;
  showPrevNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  getPageHref?: (page: number) => string;
  onPageChange?: (page: number) => void;
  className?: string;
};

type PaginationItem = number | 'ellipsis';

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function range(start: number, end: number) {
  const length = Math.max(end - start + 1, 0);
  return Array.from({ length }, (_, index) => start + index);
}

function createPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItem[] {
  const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - siblingCount, boundaryCount + 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - boundaryCount - 1);

  const showLeftEllipsis = leftSibling > boundaryCount + 2;
  const showRightEllipsis = rightSibling < totalPages - boundaryCount - 1;

  const firstPages = range(1, boundaryCount);
  const lastPages = range(totalPages - boundaryCount + 1, totalPages);
  const middlePages = range(leftSibling, rightSibling);

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, rightSibling);
    return [...leftRange, 'ellipsis', ...lastPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(leftSibling, totalPages);
    return [...firstPages, 'ellipsis', ...rightRange];
  }

  return [...firstPages, 'ellipsis', ...middlePages, 'ellipsis', ...lastPages];
}

export function Pagination({
  currentPage,
  totalPages,
  label = 'Pagination',
  size = 'md',
  variant = 'default',
  siblingCount = 1,
  boundaryCount = 1,
  showPrevNext = true,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  getPageHref,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 0) {
    return null;
  }

  const safeCurrentPage = clampPage(currentPage, totalPages);
  const items = createPaginationItems(
    safeCurrentPage,
    totalPages,
    Math.max(0, siblingCount),
    Math.max(1, boundaryCount),
  );

  const listClasses = [list, variant === 'compact' ? compactList : undefined]
    .filter(Boolean)
    .join(' ');

  function handlePageChange(event: MouseEvent, page: number, disabled?: boolean) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (!getPageHref) {
      event.preventDefault();
    }

    onPageChange?.(page);
  }

  function renderControl({
    page,
    children,
    disabled = false,
    current = false,
    ariaLabel,
    isPrevNext = false,
  }: {
    page: number;
    children: ReactNode;
    disabled?: boolean;
    current?: boolean;
    ariaLabel: string;
    isPrevNext?: boolean;
  }) {
    const classes = [control, sizes[size], isPrevNext ? prevNext : undefined]
      .filter(Boolean)
      .join(' ');

    const href = !disabled && getPageHref ? getPageHref(page) : undefined;

    if (href) {
      return (
        <a
          className={classes}
          href={href}
          aria-label={ariaLabel}
          aria-current={current ? 'page' : undefined}
          aria-disabled={disabled ? true : undefined}
          onClick={(event) => handlePageChange(event, page, disabled)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        className={classes}
        type="button"
        aria-label={ariaLabel}
        aria-current={current ? 'page' : undefined}
        aria-disabled={disabled ? true : undefined}
        disabled={disabled}
        onClick={(event) => handlePageChange(event, page, disabled)}
      >
        {children}
      </button>
    );
  }

  return (
    <nav className={[nav, className].filter(Boolean).join(' ')} aria-label={label}>
      <ul className={listClasses}>
        {showPrevNext ? (
          <li className={itemClass}>
            {renderControl({
              page: safeCurrentPage - 1,
              children: previousLabel,
              disabled: safeCurrentPage === 1,
              ariaLabel: 'Go to previous page',
              isPrevNext: true,
            })}
          </li>
        ) : null}

        {items.map((entry, index) => {
          if (entry === 'ellipsis') {
            return (
              <li className={itemClass} key={`ellipsis-${index}`}>
                <span className={ellipsisClass} aria-hidden="true">
                  …
                </span>
              </li>
            );
          }

          const current = entry === safeCurrentPage;

          return (
            <li className={itemClass} key={entry}>
              {renderControl({
                page: entry,
                children: entry,
                current,
                ariaLabel: current ? `Page ${entry}, current page` : `Go to page ${entry}`,
              })}
            </li>
          );
        })}

        {showPrevNext ? (
          <li className={itemClass}>
            {renderControl({
              page: safeCurrentPage + 1,
              children: nextLabel,
              disabled: safeCurrentPage === totalPages,
              ariaLabel: 'Go to next page',
              isPrevNext: true,
            })}
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

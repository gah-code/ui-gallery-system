import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  aligns,
  content as contentClass,
  gaps,
  item as itemClass,
  itemWithoutMedia,
  media as mediaClass,
  reverseOnLarge,
  root,
  rowGaps,
} from './ZPattern.css';

export type ZPatternGap = 'sm' | 'md' | 'lg' | 'xl';
export type ZPatternAlign = 'start' | 'center' | 'stretch';
export type ZPatternMediaPosition = 'alternate' | 'left' | 'right';

export type ZPatternItem = {
  id?: string;
  media?: ReactNode;
  content: ReactNode;
  mediaPosition?: 'left' | 'right';
};

export type ZPatternProps = {
  as?: ElementType;
  items: ZPatternItem[];
  gap?: ZPatternGap;
  rowGap?: ZPatternGap;
  align?: ZPatternAlign;
  mediaPosition?: ZPatternMediaPosition;
  className?: string;
  itemClassName?: string;
  mediaClassName?: string;
  contentClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'content'>;

function shouldReverseItem(
  index: number,
  globalPosition: ZPatternMediaPosition,
  itemPosition?: 'left' | 'right',
) {
  const resolvedPosition =
    itemPosition ?? (globalPosition === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : globalPosition);

  return resolvedPosition === 'right';
}

export function ZPattern({
  as: Component = 'div',
  items,
  gap = 'lg',
  rowGap = 'lg',
  align = 'center',
  mediaPosition = 'alternate',
  className,
  itemClassName,
  mediaClassName,
  contentClassName,
  ...rest
}: ZPatternProps) {
  const classes = [root, gaps[gap], className].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      {items.map((entry, index) => {
        const hasMedia = Boolean(entry.media);
        const reverse = hasMedia && shouldReverseItem(index, mediaPosition, entry.mediaPosition);
        const rowClasses = [
          itemClass,
          !hasMedia ? itemWithoutMedia : undefined,
          rowGaps[rowGap],
          aligns[align],
          reverse ? reverseOnLarge : undefined,
          itemClassName,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={entry.id ?? index} className={rowClasses}>
            {hasMedia ? (
              <div className={[mediaClass, mediaClassName].filter(Boolean).join(' ')}>{entry.media}</div>
            ) : null}
            <div className={[contentClass, contentClassName].filter(Boolean).join(' ')}>
              {entry.content}
            </div>
          </div>
        );
      })}
    </Component>
  );
}

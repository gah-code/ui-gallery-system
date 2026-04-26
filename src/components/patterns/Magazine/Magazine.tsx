import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  aligns,
  content as contentClass,
  gaps,
  layouts,
  media as mediaClass,
  reverse as reverseClass,
  root,
} from './Magazine.css';

export type MagazineGap = 'sm' | 'md' | 'lg' | 'xl';
export type MagazineLayout = 'balanced' | 'mediaLead' | 'contentLead' | 'split';
export type MagazineAlign = 'start' | 'center' | 'stretch';

export type MagazineProps = {
  as?: ElementType;
  media?: ReactNode;
  content: ReactNode;
  gap?: MagazineGap;
  layout?: MagazineLayout;
  align?: MagazineAlign;
  reverse?: boolean;
  className?: string;
  mediaClassName?: string;
  contentClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'content'>;

export function Magazine({
  as: Component = 'div',
  media,
  content,
  gap = 'lg',
  layout = 'balanced',
  align = 'center',
  reverse = false,
  className,
  mediaClassName,
  contentClassName,
  ...rest
}: MagazineProps) {
  const classes = [
    root,
    media ? layouts[layout] : undefined,
    gaps[gap],
    aligns[align],
    reverse ? reverseClass : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentSlot = (
    <div className={[contentClass, contentClassName].filter(Boolean).join(' ')}>{content}</div>
  );

  if (!media) {
    return (
      <Component className={classes} {...rest}>
        {contentSlot}
      </Component>
    );
  }

  return (
    <Component className={classes} {...rest}>
      <div className={[mediaClass, mediaClassName].filter(Boolean).join(' ')}>{media}</div>
      {contentSlot}
    </Component>
  );
}

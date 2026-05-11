import type { HTMLAttributes, ReactNode } from 'react';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import {
  columns as columnClasses,
  gaps,
  header,
  item as itemClass,
  itemDensity,
  itemTones,
  layouts,
  link as linkClass,
  list,
  logoFrame,
  logoImage,
  root,
  sourceName,
} from './FeaturedInLogos.css';

export type FeaturedInLogosLayout = 'row' | 'grid' | 'compact';
export type FeaturedInLogosColumns = 'auto' | 'two' | 'three' | 'four' | 'five';
export type FeaturedInLogosDensity = 'compact' | 'default' | 'spacious';
export type FeaturedInLogosTone = 'plain' | 'subtle' | 'card' | 'editorial';

export type FeaturedInLogoItem = {
  id?: string;
  name: string;
  logo?: {
    src?: string;
    alt?: string;
    decorative?: boolean;
  };
  href?: string;
};

export type FeaturedInLogosProps = {
  items: FeaturedInLogoItem[];
  title?: ReactNode;
  description?: ReactNode;
  layout?: FeaturedInLogosLayout;
  columns?: FeaturedInLogosColumns;
  density?: FeaturedInLogosDensity;
  tone?: FeaturedInLogosTone;
  decorative?: boolean;
  showNames?: boolean;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function FeaturedInLogos({
  items,
  title,
  description,
  layout = 'row',
  columns = 'auto',
  density = 'default',
  tone = 'plain',
  decorative = false,
  showNames = false,
  className,
  listClassName,
  itemClassName,
  ...rest
}: FeaturedInLogosProps) {
  if (items.length === 0) {
    return null;
  }

  const listClasses = [
    list,
    layouts[layout],
    columns !== 'auto' ? columnClasses[columns] : undefined,
    gaps[density],
    listClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[root, className].filter(Boolean).join(' ')} {...rest}>
      {title || description ? (
        <div className={header}>
          {title ? (
            <Text as="h3" variant="heading">
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text as="p" variant="body" tone="secondary">
              {description}
            </Text>
          ) : null}
        </div>
      ) : null}

      <div className={listClasses}>
        {items.map((entry) => {
          const logoAlt = entry.logo?.alt ?? `${entry.name} logo`;
          const isDecorative = Boolean(decorative || entry.logo?.decorative);
          const content = (
            <>
              <span className={logoFrame}>
                <Image
                  src={entry.logo?.src}
                  alt={logoAlt}
                  decorative={isDecorative}
                  aspectRatio="logo"
                  fit="contain"
                  radius="none"
                  fallback={`${entry.name} logo unavailable`}
                  imageClassName={logoImage}
                />
              </span>
              {showNames ? (
                <Text as="span" variant="caption" tone="muted" className={sourceName}>
                  {entry.name}
                </Text>
              ) : null}
            </>
          );

          return (
            <div
              className={[itemClass, itemTones[tone], itemDensity[density], itemClassName]
                .filter(Boolean)
                .join(' ')}
              key={entry.id ?? entry.name}
            >
              {entry.href ? (
                <a className={linkClass} href={entry.href} aria-label={entry.name}>
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

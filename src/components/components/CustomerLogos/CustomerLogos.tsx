import type { HTMLAttributes, ReactNode } from 'react';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import {
  brandName,
  columns as columnClasses,
  gaps,
  header,
  headerSpacing,
  item as itemClass,
  itemDensity,
  itemTones,
  layouts,
  link as linkClass,
  list,
  logoFrame,
  logoImage,
  root,
} from './CustomerLogos.css';

export type CustomerLogosLayout = 'row' | 'grid' | 'dense';
export type CustomerLogosColumns = 'auto' | 'two' | 'three' | 'four' | 'six';
export type CustomerLogosDensity = 'compact' | 'default' | 'spacious';
export type CustomerLogosTone = 'plain' | 'subtle' | 'card';

export type CustomerLogoItem = {
  id?: string;
  name: string;
  logo?: {
    src?: string;
    alt?: string;
    decorative?: boolean;
  };
  href?: string;
};

export type CustomerLogosProps = {
  items: CustomerLogoItem[];
  title?: ReactNode;
  description?: ReactNode;
  layout?: CustomerLogosLayout;
  columns?: CustomerLogosColumns;
  density?: CustomerLogosDensity;
  tone?: CustomerLogosTone;
  decorative?: boolean;
  showNames?: boolean;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function CustomerLogos({
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
}: CustomerLogosProps) {
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
        <div className={[header, headerSpacing].join(' ')}>
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
                <Text as="span" variant="caption" tone="muted" className={brandName}>
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

import type { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  actionsEnd,
  brand as brandClass,
  densities,
  inner,
  link as linkClass,
  links as linksClass,
  linksCentered,
  mobileStack,
  root,
  variants,
} from './Navigation.css';

export type NavigationVariant = 'default' | 'minimal' | 'centered';
export type NavigationDensity = 'compact' | 'default' | 'spacious';

export type NavigationItem = {
  label: ReactNode;
  href: string;
  current?: boolean;
};

export type NavigationProps = {
  brand: ReactNode;
  brandHref?: string;
  items?: NavigationItem[];
  actions?: ReactNode;
  variant?: NavigationVariant;
  density?: NavigationDensity;
  label?: string;
  className?: string;
  brandClassName?: string;
  linksClassName?: string;
  actionsClassName?: string;
} & HTMLAttributes<HTMLElement>;

export function Navigation({
  brand,
  brandHref = '/',
  items = [],
  actions,
  variant = 'default',
  density = 'default',
  label = 'Primary navigation',
  className,
  brandClassName,
  linksClassName,
  actionsClassName,
  ...rest
}: NavigationProps) {
  const hasLinks = items.length > 0;
  const isCentered = variant === 'centered';

  const brandContent =
    typeof brand === 'string' ? (
      <Text as="span" variant="label">
        {brand}
      </Text>
    ) : (
      brand
    );

  return (
    <nav className={[root, className].filter(Boolean).join(' ')} aria-label={label} {...rest}>
      <div
        className={[inner, variants[variant], densities[density], mobileStack]
          .filter(Boolean)
          .join(' ')}
      >
        {brandHref ? (
          <a className={[brandClass, brandClassName].filter(Boolean).join(' ')} href={brandHref}>
            {brandContent}
          </a>
        ) : (
          <div className={[brandClass, brandClassName].filter(Boolean).join(' ')}>
            {brandContent}
          </div>
        )}

        {hasLinks ? (
          <div
            className={[linksClass, isCentered ? linksCentered : undefined, linksClassName]
              .filter(Boolean)
              .join(' ')}
          >
            {items.map((item, index) => (
              <a
                className={linkClass}
                href={item.href}
                key={`${item.href}-${index}`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}

        {actions ? (
          <div
            className={[
              actionsClass,
              variant === 'default' ? actionsEnd : undefined,
              actionsClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </nav>
  );
}

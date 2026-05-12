import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  bottom,
  bottomCentered,
  brandArea,
  brandAreaCentered,
  densities,
  inner,
  legalLinks as legalLinksClass,
  link as linkClass,
  linkGroup,
  linkGroups as linkGroupsClass,
  linkList,
  meta as metaClass,
  root,
  socialLinks as socialLinksClass,
  variants,
} from './Footer.css';

export type FooterVariant = 'minimal' | 'multiColumn' | 'centered';
export type FooterDensity = 'compact' | 'default' | 'spacious';

export type FooterLink = {
  label: ReactNode;
  href: string;
  ariaLabel?: string;
};

export type FooterLinkGroup = {
  title: ReactNode;
  links: FooterLink[];
};

export type FooterProps = {
  as?: ElementType;
  variant?: FooterVariant;
  density?: FooterDensity;
  brand?: ReactNode;
  brandHref?: string;
  description?: ReactNode;
  linkGroups?: FooterLinkGroup[];
  socialLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
  brandClassName?: string;
  linkGroupsClassName?: string;
  bottomClassName?: string;
} & HTMLAttributes<HTMLElement>;

function FooterAnchor({ link }: { link: FooterLink }) {
  return (
    <a className={linkClass} href={link.href} aria-label={link.ariaLabel}>
      {link.label}
    </a>
  );
}

export function Footer({
  as: Component = 'footer',
  variant = 'multiColumn',
  density = 'default',
  brand,
  brandHref,
  description,
  linkGroups = [],
  socialLinks = [],
  legalLinks = [],
  meta,
  actions,
  className,
  brandClassName,
  linkGroupsClassName,
  bottomClassName,
  ...rest
}: FooterProps) {
  const isCentered = variant === 'centered';
  const hasBrandArea = Boolean(brand || description || actions);
  const hasLinkGroups = linkGroups.length > 0;
  const hasBottom = Boolean(meta || socialLinks.length > 0 || legalLinks.length > 0);

  return (
    <Component className={[root, className].filter(Boolean).join(' ')} {...rest}>
      <div
        className={[inner, variants[variant], densities[density]]
          .filter(Boolean)
          .join(' ')}
      >
        {hasBrandArea ? (
          <div
            className={[
              brandArea,
              isCentered ? brandAreaCentered : undefined,
              brandClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {brand ? (
              brandHref ? (
                <a className={linkClass} href={brandHref}>
                  <Text as="span" variant="label">
                    {brand}
                  </Text>
                </a>
              ) : (
                <Text as="span" variant="label">
                  {brand}
                </Text>
              )
            ) : null}

            {description ? (
              <Text as="p" variant="body" tone="secondary">
                {description}
              </Text>
            ) : null}

            {actions ? <div className={actionsClass}>{actions}</div> : null}
          </div>
        ) : null}

        {hasLinkGroups ? (
          <div
            className={[linkGroupsClass, linkGroupsClassName]
              .filter(Boolean)
              .join(' ')}
          >
            {linkGroups.map((group, groupIndex) => (
              <div className={linkGroup} key={groupIndex}>
                <Text as="h3" variant="label">
                  {group.title}
                </Text>
                <ul className={linkList}>
                  {group.links.map((link, linkIndex) => (
                    <li key={`${link.href}-${linkIndex}`}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}

        {hasBottom ? (
          <div
            className={[
              bottom,
              isCentered ? bottomCentered : undefined,
              bottomClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {meta ? (
              <Text as="p" variant="caption" tone="muted" className={metaClass}>
                {meta}
              </Text>
            ) : null}

            {legalLinks.length > 0 ? (
              <div className={legalLinksClass} aria-label="Legal links">
                {legalLinks.map((link, index) => (
                  <FooterAnchor key={`${link.href}-${index}`} link={link} />
                ))}
              </div>
            ) : null}

            {socialLinks.length > 0 ? (
              <div className={socialLinksClass} aria-label="Social links">
                {socialLinks.map((link, index) => (
                  <FooterAnchor key={`${link.href}-${index}`} link={link} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Component>
  );
}

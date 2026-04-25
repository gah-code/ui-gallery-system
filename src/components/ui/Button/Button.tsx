import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import {
  base,
  fullWidth as fullWidthClass,
  icon as iconClass,
  iconOnly as iconOnlyClass,
  loading as loadingClass,
  sizes,
  variants,
} from './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
};

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    disabled?: boolean;
  };

export type ButtonProps = NativeButtonProps | AnchorButtonProps;

const primitivePropNames = new Set([
  'variant',
  'size',
  'loading',
  'icon',
  'iconPosition',
  'fullWidth',
  'children',
  'className',
  'disabled',
]);

function omitPrimitiveProps(props: ButtonProps) {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !primitivePropNames.has(key)),
  );
}

function getClasses({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  children,
  className,
}: SharedButtonProps) {
  const isIconOnly = Boolean(icon && !children);

  return [
    base,
    sizes[size],
    variants[variant],
    fullWidth ? fullWidthClass : undefined,
    loading ? loadingClass : undefined,
    isIconOnly ? iconOnlyClass : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

function getContent({
  loading = false,
  icon,
  iconPosition = 'left',
  children,
}: Pick<SharedButtonProps, 'children' | 'icon' | 'iconPosition' | 'loading'>) {
  const iconMarkup = icon ? <span className={iconClass}>{icon}</span> : null;

  return (
    <>
      {loading ? <span aria-hidden="true">...</span> : null}
      {iconPosition === 'left' ? iconMarkup : null}
      {children ? <span>{children}</span> : null}
      {iconPosition === 'right' ? iconMarkup : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const classes = getClasses(props);
  const content = getContent(props);

  if ('href' in props && props.href) {
    const { disabled, loading = false, onClick } = props;
    const anchorRest = omitPrimitiveProps(props) as AnchorHTMLAttributes<HTMLAnchorElement>;
    const isDisabled = Boolean(disabled || loading);

    return (
      <a
        className={classes}
        aria-disabled={isDisabled ? true : undefined}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { disabled, loading = false, type = 'button' } = props as NativeButtonProps;
  const buttonRest = omitPrimitiveProps(props) as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} disabled={disabled || loading} type={type} {...buttonRest}>
      {content}
    </button>
  );
}

import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  lineHeight: 0,
  color: 'currentColor',
});

globalStyle(`${base} svg`, {
  display: 'block',
  width: '100%',
  height: '100%',
  fill: 'none',
  stroke: 'currentColor',
});

export const sizes = styleVariants({
  sm: {
    width: '1rem',
    height: '1rem',
  },
  md: {
    width: '1.25rem',
    height: '1.25rem',
  },
  lg: {
    width: '1.5rem',
    height: '1.5rem',
  },
  xl: {
    width: '2rem',
    height: '2rem',
  },
});

export const tones = styleVariants({
  current: {
    color: 'currentColor',
  },
  primary: {
    color: vars.color.text.primary,
  },
  secondary: {
    color: vars.color.text.secondary,
  },
  muted: {
    color: vars.color.text.muted,
  },
  inverse: {
    color: vars.color.text.inverse,
  },
  brand: {
    color: vars.color.brand[600],
  },
  success: {
    color: vars.color.status.success,
  },
  warning: {
    color: vars.color.status.warning,
  },
  error: {
    color: vars.color.status.error,
  },
  info: {
    color: vars.color.status.info,
  },
});

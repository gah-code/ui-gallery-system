import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  border: '1px solid transparent',
  borderRadius: vars.radius.md,
  fontFamily: vars.font.family.body,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  textDecoration: 'none',
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color, color, box-shadow, transform',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,
  userSelect: 'none',

  selectors: {
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
    '&:disabled, &[aria-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

export const sizes = styleVariants({
  sm: {
    minHeight: '2rem',
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.font.size.sm,
  },
  md: {
    minHeight: '2.5rem',
    padding: `${vars.space[3]} ${vars.space[4]}`,
    fontSize: vars.font.size.base,
  },
  lg: {
    minHeight: '3rem',
    padding: `${vars.space[4]} ${vars.space[5]}`,
    fontSize: vars.font.size.md,
  },
});

export const variants = styleVariants({
  primary: {
    background: vars.color.brand[600],
    color: vars.color.text.inverse,
    borderColor: vars.color.brand[600],

    selectors: {
      '&:hover:not(:disabled):not([aria-disabled="true"])': {
        background: vars.color.brand[700],
        borderColor: vars.color.brand[700],
      },
    },
  },
  secondary: {
    background: vars.color.surface.raised,
    color: vars.color.text.primary,
    borderColor: vars.color.border.strong,

    selectors: {
      '&:hover:not(:disabled):not([aria-disabled="true"])': {
        background: vars.color.surface.subtle,
      },
    },
  },
  ghost: {
    background: 'transparent',
    color: vars.color.text.primary,
    borderColor: 'transparent',

    selectors: {
      '&:hover:not(:disabled):not([aria-disabled="true"])': {
        background: vars.color.surface.subtle,
      },
    },
  },
  link: {
    background: 'transparent',
    color: vars.color.text.link,
    borderColor: 'transparent',
    minHeight: 'auto',
    padding: 0,

    selectors: {
      '&:hover:not(:disabled):not([aria-disabled="true"])': {
        textDecoration: 'underline',
      },
    },
  },
});

export const fullWidth = style({
  width: '100%',
});

export const loading = style({
  pointerEvents: 'none',
});

export const iconOnly = style({
  aspectRatio: '1',
  paddingInline: vars.space[3],
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

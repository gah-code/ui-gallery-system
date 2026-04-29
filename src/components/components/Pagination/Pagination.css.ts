import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const nav = style({
  maxWidth: '100%',
});

export const list = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const compactList = style({
  gap: vars.space[1],
});

export const item = style({
  display: 'inline-flex',
});

export const control = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${vars.color.border.strong}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface.raised,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.body,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  textDecoration: 'none',
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color, color, box-shadow',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not([aria-disabled="true"]):not([aria-current="page"])': {
      background: vars.color.surface.subtle,
      borderColor: vars.color.border.strong,
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
    '&[aria-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
    '&[aria-current="page"]': {
      background: vars.color.brand[600],
      borderColor: vars.color.brand[600],
      color: vars.color.text.inverse,
      cursor: 'default',
    },
  },
});

export const sizes = styleVariants({
  sm: {
    minWidth: '2rem',
    minHeight: '2rem',
    padding: `${vars.space[1]} ${vars.space[2]}`,
    fontSize: vars.font.size.sm,
  },
  md: {
    minWidth: '2.5rem',
    minHeight: '2.5rem',
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.font.size.base,
  },
});

export const prevNext = style({
  paddingInline: vars.space[3],
});

export const ellipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '2rem',
  color: vars.color.text.muted,
  userSelect: 'none',
});

import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  minWidth: 0,
  overflow: 'hidden',
  borderRadius: vars.radius.lg,
  color: vars.color.text.primary,
});

export const tones = styleVariants({
  default: {
    background: vars.color.surface.raised,
    border: `1px solid ${vars.color.border.subtle}`,
  },
  subtle: {
    background: vars.color.surface.subtle,
    border: `1px solid ${vars.color.border.subtle}`,
  },
  raised: {
    background: vars.color.surface.raised,
    border: `1px solid ${vars.color.border.subtle}`,
    boxShadow: vars.shadow.sm,
  },
  outline: {
    background: 'transparent',
    border: `1px solid ${vars.color.border.strong}`,
  },
});

export const variants = styleVariants({
  default: {},
  media: {},
  compact: {},
  horizontal: {
    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'minmax(12rem, 0.8fr) minmax(0, 1.2fr)',
      },
    },
  },
});

export const media = style({
  minWidth: 0,
});

export const body = style({
  display: 'grid',
  minWidth: 0,
});

export const paddings = styleVariants({
  sm: {
    padding: vars.space[3],
    gap: vars.space[3],
  },
  md: {
    padding: vars.space[4],
    gap: vars.space[4],
  },
  lg: {
    padding: vars.space[6],
    gap: vars.space[5],
  },
});

export const compactBody = style({
  padding: vars.space[3],
  gap: vars.space[2],
});

export const header = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const content = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
  minWidth: 0,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[3],
  alignItems: 'center',
});

export const footer = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,
});

export const clickable = style({
  transitionProperty: 'border-color, box-shadow, transform',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover': {
      borderColor: vars.color.border.strong,
      boxShadow: vars.shadow.md,
    },
    '&:focus-within': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

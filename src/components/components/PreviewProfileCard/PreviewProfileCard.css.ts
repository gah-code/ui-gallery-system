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

export const layouts = styleVariants({
  stacked: {},
  compact: {},
  horizontal: {
    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'minmax(8rem, 0.55fr) minmax(0, 1.45fr)',
      },
    },
  },
});

export const media = style({
  minWidth: 0,
});

export const imageShapes = styleVariants({
  rounded: {
    borderRadius: vars.radius.lg,
  },
  circle: {
    borderRadius: vars.radius.full,
    overflow: 'hidden',
  },
  square: {
    borderRadius: vars.radius.md,
  },
});

export const body = style({
  display: 'grid',
  minWidth: 0,
});

export const bodySpacing = styleVariants({
  default: {
    gap: vars.space[4],
    padding: vars.space[4],
  },
  compact: {
    gap: vars.space[3],
    padding: vars.space[3],
  },
  spacious: {
    gap: vars.space[5],
    padding: vars.space[6],
  },
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
  minWidth: 0,
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[2],
});

export const title = style({
  overflowWrap: 'anywhere',
});

export const titleLink = style({
  color: vars.color.text.link,
  textDecoration: 'none',

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

export const summary = style({
  overflowWrap: 'anywhere',
});

export const description = style({
  overflowWrap: 'anywhere',
});

export const details = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
});

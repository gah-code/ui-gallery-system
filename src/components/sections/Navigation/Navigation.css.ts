import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  width: '100%',
  minWidth: 0,
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
  background: vars.color.surface.page,
});

export const inner = style({
  display: 'grid',
  minWidth: 0,
  width: '100%',
  maxWidth: vars.font.measure.wide,
  marginInline: 'auto',
});

export const densities = styleVariants({
  compact: {
    padding: `${vars.space[3]} ${vars.space[4]}`,
    gap: vars.space[3],
  },
  default: {
    padding: `${vars.space[4]} ${vars.space[5]}`,
    gap: vars.space[4],
  },
  spacious: {
    padding: `${vars.space[5]} ${vars.space[6]}`,
    gap: vars.space[5],
  },
});

export const variants = styleVariants({
  default: {
    gridTemplateColumns: '1fr',
    alignItems: 'center',

    '@media': {
      '(min-width: 860px)': {
        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      },
    },
  },
  minimal: {
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
  },
  centered: {
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    textAlign: 'center',
  },
});

export const brand = style({
  minWidth: 0,
  color: vars.color.text.primary,
  textDecoration: 'none',
  fontWeight: vars.font.weight.bold,

  selectors: {
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

export const links = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  minWidth: 0,
  gap: vars.space[3],
});

export const linksCentered = style({
  justifyContent: 'center',
});

export const link = style({
  color: vars.color.text.secondary,
  textDecoration: 'none',
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,

  selectors: {
    '&:hover': {
      color: vars.color.text.primary,
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
    '&[aria-current="page"]': {
      color: vars.color.text.primary,
      fontWeight: vars.font.weight.semibold,
    },
  },
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'start',
  gap: vars.space[3],
});

export const actionsEnd = style({
  '@media': {
    '(min-width: 860px)': {
      justifyContent: 'end',
    },
  },
});

export const mobileStack = style({
  '@media': {
    '(max-width: 859px)': {
      justifyItems: 'start',
    },
  },
});

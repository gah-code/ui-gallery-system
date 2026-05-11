import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const header = style({
  display: 'grid',
  gap: vars.space[2],
  maxWidth: vars.font.measure.comfortable,
});

export const headerSpacing = style({
  marginBlockEnd: vars.space[4],
});

export const list = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const layouts = styleVariants({
  row: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
    alignItems: 'center',
  },
  grid: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 10rem), 1fr))',
  },
  dense: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 7rem), 1fr))',
  },
});

export const columns = styleVariants({
  auto: {},
  two: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
  },
  three: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 960px)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
  four: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1100px)': {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
    },
  },
  six: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
      '(min-width: 1200px)': {
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
      },
    },
  },
});

export const gaps = styleVariants({
  compact: {
    gap: vars.space[3],
  },
  default: {
    gap: vars.space[4],
  },
  spacious: {
    gap: vars.space[6],
  },
});

export const item = style({
  display: 'grid',
  placeItems: 'center',
  minWidth: 0,
  borderRadius: vars.radius.lg,
  textAlign: 'center',
});

export const itemTones = styleVariants({
  plain: {
    background: 'transparent',
  },
  subtle: {
    background: vars.color.surface.subtle,
  },
  card: {
    background: vars.color.surface.raised,
    border: `1px solid ${vars.color.border.subtle}`,
  },
});

export const itemDensity = styleVariants({
  compact: {
    padding: vars.space[3],
  },
  default: {
    padding: vars.space[4],
  },
  spacious: {
    padding: vars.space[5],
  },
});

export const link = style({
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  minWidth: 0,
  color: 'inherit',
  textDecoration: 'none',
  borderRadius: vars.radius.md,

  selectors: {
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

export const logoFrame = style({
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  minHeight: '3rem',
});

export const logoImage = style({
  width: '100%',
  maxWidth: '8rem',
  objectFit: 'contain',
});

export const brandName = style({
  marginBlockStart: vars.space[2],
  overflowWrap: 'anywhere',
});

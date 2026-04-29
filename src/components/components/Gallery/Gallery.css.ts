import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const columns = styleVariants({
  auto: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
  },
  two: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 700px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
  },
  three: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 700px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
  four: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 700px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1100px)': {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
    },
  },
});

export const gaps = styleVariants({
  default: {
    gap: vars.space[4],
  },
  compact: {
    gap: vars.space[3],
  },
  spacious: {
    gap: vars.space[6],
  },
});

export const item = style({
  display: 'grid',
  minWidth: 0,
  overflow: 'hidden',
  borderRadius: vars.radius.lg,
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
});

export const media = style({
  minWidth: 0,
});

export const body = style({
  display: 'grid',
  minWidth: 0,
});

export const bodyDensity = styleVariants({
  default: {
    gap: vars.space[3],
    padding: vars.space[4],
  },
  compact: {
    gap: vars.space[2],
    padding: vars.space[3],
  },
  spacious: {
    gap: vars.space[4],
    padding: vars.space[5],
  },
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
});

export const caption = style({
  overflowWrap: 'anywhere',
});

export const description = style({
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

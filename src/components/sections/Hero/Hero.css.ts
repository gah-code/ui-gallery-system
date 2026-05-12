import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  width: '100%',
  minWidth: 0,
});

export const inner = style({
  display: 'grid',
  width: '100%',
  maxWidth: vars.font.measure.wide,
  marginInline: 'auto',
  minWidth: 0,
});

globalStyle(`${inner} > *`, {
  minWidth: 0,
});

export const densities = styleVariants({
  compact: {
    padding: `${vars.space[12]} ${vars.space[4]}`,
    gap: vars.space[6],
  },
  default: {
    padding: `${vars.space[16]} ${vars.space[5]}`,
    gap: vars.space[8],
  },
  spacious: {
    padding: `${vars.space[20]} ${vars.space[6]}`,
    gap: vars.space[10],
  },
});

export const variants = styleVariants({
  default: {
    gridTemplateColumns: '1fr',
  },
  centered: {
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    textAlign: 'center',
  },
  split: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)',
        alignItems: 'center',
      },
    },
  },
  media: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)',
        alignItems: 'center',
      },
    },
  },
});

export const widths = styleVariants({
  narrow: {
    maxWidth: vars.font.measure.narrow,
  },
  comfortable: {
    maxWidth: vars.font.measure.comfortable,
  },
  wide: {
    maxWidth: vars.font.measure.wide,
  },
  full: {
    maxWidth: 'none',
  },
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  alignContent: 'center',
  gap: vars.space[4],
});

export const contentCentered = style({
  justifyItems: 'center',
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
});

export const metaCentered = style({
  justifyContent: 'center',
});

export const heading = style({
  overflowWrap: 'anywhere',
});

export const intro = style({
  overflowWrap: 'anywhere',
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
});

export const actionsCentered = style({
  justifyContent: 'center',
});

export const media = style({
  minWidth: 0,
});

export const footer = style({
  minWidth: 0,
  marginBlockStart: vars.space[2],
});

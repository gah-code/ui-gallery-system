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

export const tones = styleVariants({
  default: {
    background: vars.color.surface.page,
    color: vars.color.text.primary,
  },
  subtle: {
    background: vars.color.surface.subtle,
    color: vars.color.text.primary,
  },
  raised: {
    background: vars.color.surface.raised,
    color: vars.color.text.primary,
  },
  outline: {
    background: 'transparent',
    color: vars.color.text.primary,
  },
});

export const densities = styleVariants({
  compact: {
    padding: `${vars.space[8]} ${vars.space[4]}`,
    gap: vars.space[5],
  },
  default: {
    padding: `${vars.space[12]} ${vars.space[5]}`,
    gap: vars.space[6],
  },
  spacious: {
    padding: `${vars.space[16]} ${vars.space[6]}`,
    gap: vars.space[8],
  },
});

export const header = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,
  maxWidth: vars.font.measure.comfortable,
});

export const headerCentered = style({
  justifyItems: 'center',
  textAlign: 'center',
  marginInline: 'auto',
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

export const features = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

globalStyle(`${features} > *`, {
  minWidth: 0,
});

export const variants = styleVariants({
  grid: {},
  row: {
    '@media': {
      '(min-width: 900px)': {
        alignItems: 'stretch',
      },
    },
  },
  centered: {
    justifyItems: 'center',
    textAlign: 'center',
  },
});

export const columns = styleVariants({
  auto: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
  },
  two: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
  },
  three: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1080px)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
  four: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1280px)': {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
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

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
});

export const actionsCentered = style({
  justifyContent: 'center',
});

export const empty = style({
  color: vars.color.text.muted,
});

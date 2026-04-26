import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const gaps = styleVariants({
  sm: {
    gap: vars.space[6],
  },
  md: {
    gap: vars.space[8],
  },
  lg: {
    gap: vars.space[12],
  },
  xl: {
    gap: vars.space[16],
  },
});

export const item = style({
  display: 'grid',
  minWidth: 0,

  '@media': {
    '(min-width: 850px)': {
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    },
  },
});

globalStyle(`${item} > *`, {
  minWidth: 0,
});

export const itemWithoutMedia = style({
  '@media': {
    '(min-width: 850px)': {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },
  },
});

export const rowGaps = styleVariants({
  sm: {
    gap: vars.space[4],
  },
  md: {
    gap: vars.space[6],
  },
  lg: {
    gap: vars.space[8],
  },
  xl: {
    gap: vars.space[10],
  },
});

export const aligns = styleVariants({
  start: {
    alignItems: 'start',
  },
  center: {
    alignItems: 'center',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

export const media = style({
  minWidth: 0,
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  alignContent: 'center',
  gap: vars.space[4],
});

export const reverseOnLarge = style({});

globalStyle(`${reverseOnLarge} > :first-child`, {
  '@media': {
    '(min-width: 850px)': {
      order: 2,
    },
  },
});

globalStyle(`${reverseOnLarge} > :last-child`, {
  '@media': {
    '(min-width: 850px)': {
      order: 1,
    },
  },
});

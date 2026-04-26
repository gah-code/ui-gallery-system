import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

globalStyle(`${root} > *`, {
  minWidth: 0,
});

export const gaps = styleVariants({
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
    gap: vars.space[12],
  },
});

export const densities = styleVariants({
  compact: {
    rowGap: vars.space[4],
  },
  comfortable: {
    rowGap: vars.space[6],
  },
  spacious: {
    rowGap: vars.space[8],
  },
});

export const layouts = styleVariants({
  default: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
      },
    },
  },

  withRail: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 980px)': {
        gridTemplateColumns: 'minmax(0, 1fr) minmax(14rem, 0.35fr)',
      },
    },
  },

  wideLead: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 960px)': {
        gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.65fr)',
      },
    },
  },
});

export const lead = style({
  display: 'grid',
  minWidth: 0,
  alignContent: 'start',
  gap: vars.space[4],
});

export const support = style({
  display: 'grid',
  minWidth: 0,
  alignContent: 'start',
  gap: vars.space[4],
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[3],
  alignItems: 'center',
});

export const fullWidth = style({
  '@media': {
    '(min-width: 900px)': {
      gridColumn: '1 / -1',
    },
  },
});

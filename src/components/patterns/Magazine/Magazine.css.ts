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
    gap: vars.space[3],
  },
  md: {
    gap: vars.space[4],
  },
  lg: {
    gap: vars.space[6],
  },
  xl: {
    gap: vars.space[8],
  },
});

export const layouts = styleVariants({
  balanced: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 800px)': {
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      },
    },
  },

  mediaLead: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
      },
    },
  },

  contentLead: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
      },
    },
  },

  split: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      },
      '(min-width: 1200px)': {
        gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
      },
    },
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

export const reverse = style({});

globalStyle(`${reverse} > :first-child`, {
  '@media': {
    '(min-width: 900px)': {
      order: 2,
    },
  },
});

globalStyle(`${reverse} > :last-child`, {
  '@media': {
    '(min-width: 900px)': {
      order: 1,
    },
  },
});

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

export const layouts = styleVariants({
  default: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
      },
    },
  },

  primaryLead: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.65fr)',
      },
    },
  },

  secondaryLead: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 0.75fr) minmax(0, 1.25fr)',
      },
    },
  },

  offset: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 960px)': {
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
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

export const primary = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[4],
});

export const secondary = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[4],
});

export const accent = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[3],
});

export const accentFullWidth = style({
  '@media': {
    '(min-width: 900px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const offsets = styleVariants({
  none: {},

  sm: {
    '@media': {
      '(min-width: 960px)': {
        transform: `translateY(${vars.space[4]})`,
      },
    },
  },

  md: {
    '@media': {
      '(min-width: 960px)': {
        transform: `translateY(${vars.space[6]})`,
      },
    },
  },

  lg: {
    '@media': {
      '(min-width: 960px)': {
        transform: `translateY(${vars.space[8]})`,
      },
    },
  },
});

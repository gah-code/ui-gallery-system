import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const minItemWidthProperty = '--grid-min-item-width';

export const root = style({
  display: 'grid',
  width: '100%',
});

globalStyle(`${root} > *`, {
  minWidth: 0,
});

export const autoGrid = style({
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, var(${minItemWidthProperty})), 1fr))`,
});

export const columnModes = styleVariants({
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

export const alignItems = styleVariants({
  start: {
    alignItems: 'start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'end',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

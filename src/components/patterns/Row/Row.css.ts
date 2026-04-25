import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const minItemWidthProperty = '--row-min-item-width';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '@media': {
    '(min-width: 640px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
});

globalStyle(`${root} > *`, {
  minWidth: 0,

  '@media': {
    '(min-width: 640px)': {
      flex: `1 1 var(${minItemWidthProperty})`,
      minWidth: `min(100%, var(${minItemWidthProperty}))`,
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

export const aligns = styleVariants({
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

export const justifies = styleVariants({
  start: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  between: {
    justifyContent: 'space-between',
  },
});

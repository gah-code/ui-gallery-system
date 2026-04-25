import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const sidebarWidthProperty = '--sidebar-width';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

globalStyle(`${root} > *`, {
  minWidth: 0,
});

export const layout = style({
  gridTemplateColumns: '1fr',

  '@media': {
    '(min-width: 900px)': {
      gridTemplateColumns: `minmax(0, 1fr) minmax(min(100%, var(${sidebarWidthProperty})), var(${sidebarWidthProperty}))`,
    },
  },
});

export const sideLeft = style({
  '@media': {
    '(min-width: 900px)': {
      gridTemplateColumns: `minmax(min(100%, var(${sidebarWidthProperty})), var(${sidebarWidthProperty})) minmax(0, 1fr)`,
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
    alignItems: 'start',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

export const main = style({
  minWidth: 0,
});

export const sidebar = style({
  minWidth: 0,
});

export const sidebarWidths = {
  sm: '14rem',
  md: '18rem',
  lg: '22rem',
} as const;

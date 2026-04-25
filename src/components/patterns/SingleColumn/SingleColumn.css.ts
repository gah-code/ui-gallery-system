import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
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

export const alignments = styleVariants({
  start: {
    justifyItems: 'start',
    textAlign: 'start',
  },
  center: {
    justifyItems: 'center',
    textAlign: 'center',
  },
  end: {
    justifyItems: 'end',
    textAlign: 'end',
  },
  stretch: {
    justifyItems: 'stretch',
    textAlign: 'start',
  },
});

export const positions = styleVariants({
  start: {
    marginInlineEnd: 'auto',
  },
  center: {
    marginInline: 'auto',
  },
  end: {
    marginInlineStart: 'auto',
  },
  stretch: {
    marginInline: 0,
  },
});

export const contentSafety = style({});

globalStyle(`${contentSafety} > *`, {
  minWidth: 0,
});

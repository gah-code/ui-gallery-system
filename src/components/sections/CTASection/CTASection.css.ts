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
  brand: {
    background: vars.color.brand[600],
    color: vars.color.text.inverse,
  },
});

export const framed = style({
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
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

export const variants = styleVariants({
  centered: {
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    textAlign: 'center',
  },
  compact: {
    gridTemplateColumns: '1fr',
  },
  split: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1fr) minmax(16rem, 0.7fr)',
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

export const text = style({
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

export const support = style({
  minWidth: 0,
});

export const footer = style({
  minWidth: 0,
});

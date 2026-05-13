import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  width: '100%',
  minWidth: 0,
  borderBlockStart: `1px solid ${vars.color.border.subtle}`,
  background: vars.color.surface.subtle,
  color: vars.color.text.primary,
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
  minimal: {
    gridTemplateColumns: '1fr',
  },
  centered: {
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    textAlign: 'center',
  },
  multiColumn: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
        alignItems: 'start',
      },
    },
  },
});

export const brandArea = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,
  maxWidth: vars.font.measure.narrow,
});

export const brandAreaCentered = style({
  justifyItems: 'center',
});

export const linkGroups = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[5],
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 10rem), 1fr))',
});

export const linkGroup = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const linkList = style({
  display: 'grid',
  gap: vars.space[2],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const link = style({
  color: vars.color.text.secondary,
  textDecoration: 'none',
  overflowWrap: 'anywhere',

  selectors: {
    '&:hover': {
      color: vars.color.text.primary,
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
});

export const bottom = style({
  display: 'grid',
  justifyItems: 'start',
  gap: vars.space[4],
  borderBlockStart: `1px solid ${vars.color.border.subtle}`,
  paddingBlockStart: vars.space[4],
  minWidth: 0,

  '@media': {
    '(min-width: 760px)': {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
});

export const bottomCentered = style({
  justifyItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

export const legalLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  rowGap: vars.space[2],
  columnGap: vars.space[3],
  maxWidth: '100%',
  minWidth: 0,
});

export const socialLinks = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  rowGap: vars.space[2],
  columnGap: vars.space[3],
  maxWidth: '100%',
  minWidth: 0,
});

export const meta = style({
  maxWidth: '100%',
  minWidth: 0,
  color: vars.color.text.muted,
  overflowWrap: 'anywhere',
});

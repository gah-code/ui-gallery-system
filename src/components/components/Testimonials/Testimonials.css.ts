import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const layouts = styleVariants({
  single: {
    gridTemplateColumns: '1fr',
  },
  featured: {
    gridTemplateColumns: '1fr',
  },
  grid: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
  },
});

export const columns = styleVariants({
  auto: {},
  two: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
  },
  three: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1100px)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      },
    },
  },
});

export const gaps = styleVariants({
  compact: {
    gap: vars.space[3],
  },
  default: {
    gap: vars.space[4],
  },
  spacious: {
    gap: vars.space[6],
  },
});

export const item = style({
  display: 'grid',
  minWidth: 0,
  margin: 0,
  borderRadius: vars.radius.lg,
});

export const tones = styleVariants({
  default: {
    background: vars.color.surface.raised,
    border: `1px solid ${vars.color.border.subtle}`,
  },
  subtle: {
    background: vars.color.surface.subtle,
    border: `1px solid ${vars.color.border.subtle}`,
  },
  raised: {
    background: vars.color.surface.raised,
    border: `1px solid ${vars.color.border.subtle}`,
    boxShadow: vars.shadow.sm,
  },
  outline: {
    background: 'transparent',
    border: `1px solid ${vars.color.border.strong}`,
  },
});

export const densities = styleVariants({
  compact: {
    gap: vars.space[3],
    padding: vars.space[3],
  },
  default: {
    gap: vars.space[4],
    padding: vars.space[4],
  },
  spacious: {
    gap: vars.space[5],
    padding: vars.space[6],
  },
});

export const featured = style({
  '@media': {
    '(min-width: 900px)': {
      padding: vars.space[8],
    },
  },
});

export const quote = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,
  margin: 0,
  overflowWrap: 'anywhere',
});

export const quoteMark = style({
  color: vars.color.brand[600],
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size['3xl'],
  fontWeight: vars.font.weight.bold,
  lineHeight: vars.font.lineHeight.tight,
});

export const attribution = style({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: vars.space[3],
  minWidth: 0,
});

export const attributionNoAvatar = style({
  gridTemplateColumns: 'minmax(0, 1fr)',
});

export const avatar = style({
  width: '3rem',
  height: '3rem',
  overflow: 'hidden',
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

export const meta = style({
  display: 'grid',
  gap: vars.space[1],
  minWidth: 0,
});

export const metaLine = style({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: vars.space[1],
  minWidth: 0,
});

export const tagRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
});

export const alignments = styleVariants({
  start: {
    textAlign: 'start',
    justifyItems: 'start',
  },
  center: {
    textAlign: 'center',
    justifyItems: 'center',
  },
});

import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gap: vars.space[4],
});

export const header = style({
  display: 'grid',
  gap: vars.space[2],
  maxWidth: vars.font.measure.comfortable,
});

export const plans = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const columns = styleVariants({
  auto: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 17rem), 1fr))',
  },
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
  four: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      '(min-width: 1280px)': {
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
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

export const plan = style({
  display: 'grid',
  minWidth: 0,
  borderRadius: vars.radius.lg,
  color: vars.color.text.primary,
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

export const featured = style({
  borderColor: vars.color.brand[600],
  boxShadow: vars.shadow.md,
});

export const planDensities = styleVariants({
  compact: {
    gap: vars.space[3],
    padding: vars.space[4],
  },
  default: {
    gap: vars.space[4],
    padding: vars.space[5],
  },
  spacious: {
    gap: vars.space[5],
    padding: vars.space[6],
  },
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
});

export const planHeader = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const priceBlock = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: vars.space[2],
});

export const price = style({
  overflowWrap: 'anywhere',
});

export const period = style({
  color: vars.color.text.muted,
});

export const featureList = style({
  display: 'grid',
  gap: vars.space[2],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const featureItem = style({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  gap: vars.space[2],
  alignItems: 'start',
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const featureMarker = style({
  color: vars.color.status.success,
  lineHeight: vars.font.lineHeight.body,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[3],
  alignItems: 'center',
  marginBlockStart: vars.space[2],
});

export const footer = style({
  color: vars.color.text.muted,
  overflowWrap: 'anywhere',
});

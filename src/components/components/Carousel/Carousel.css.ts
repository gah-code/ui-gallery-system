import { createVar, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const gapVar = createVar();

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gap: vars.space[4],
});

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[3],
});

export const headingGroup = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[1],
});

export const controls = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[2],
});

export const control = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  border: `1px solid ${vars.color.border.strong}`,
  borderRadius: vars.radius.full,
  background: vars.color.surface.raised,
  color: vars.color.text.primary,
  cursor: 'pointer',
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  transitionProperty: 'background-color, border-color, color, opacity',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surface.subtle,
      borderColor: vars.color.border.strong,
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.45,
    },
  },
});

export const viewport = style({
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'thin',
  scrollBehavior: 'smooth',

  selectors: {
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },
  },
});

export const track = style({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'minmax(0, 100%)',
  minWidth: 0,
});

export const gaps = styleVariants({
  sm: {
    vars: {
      [gapVar]: vars.space[3],
    },
    gap: vars.space[3],
  },
  md: {
    vars: {
      [gapVar]: vars.space[4],
    },
    gap: vars.space[4],
  },
  lg: {
    vars: {
      [gapVar]: vars.space[6],
    },
    gap: vars.space[6],
  },
  xl: {
    vars: {
      [gapVar]: vars.space[8],
    },
    gap: vars.space[8],
  },
});

export const itemWidths = styleVariants({
  one: {
    gridAutoColumns: 'minmax(0, 100%)',
  },
  two: {
    gridAutoColumns: 'minmax(0, 100%)',

    '@media': {
      '(min-width: 760px)': {
        gridAutoColumns: `minmax(0, calc((100% - ${gapVar}) / 2))`,
      },
    },
  },
  three: {
    gridAutoColumns: 'minmax(0, 100%)',

    '@media': {
      '(min-width: 760px)': {
        gridAutoColumns: `minmax(0, calc((100% - ${gapVar}) / 2))`,
      },
      '(min-width: 1100px)': {
        gridAutoColumns: `minmax(0, calc((100% - (${gapVar} * 2)) / 3))`,
      },
    },
  },
  auto: {
    gridAutoColumns: 'minmax(min(100%, 18rem), 28rem)',
  },
});

export const slide = style({
  minWidth: 0,
  scrollSnapAlign: 'start',
  overflowWrap: 'anywhere',
});

export const footer = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: vars.space[3],
  color: vars.color.text.muted,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
});

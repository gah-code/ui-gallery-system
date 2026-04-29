import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const columns = styleVariants({
  auto: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
  },
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
  default: {
    gap: vars.space[4],
  },
  compact: {
    gap: vars.space[3],
  },
  spacious: {
    gap: vars.space[6],
  },
});

export const item = style({
  display: 'grid',
  minWidth: 0,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
});

export const densities = styleVariants({
  default: {
    gap: vars.space[2],
    padding: vars.space[4],
  },
  compact: {
    gap: vars.space[1],
    padding: vars.space[3],
  },
  spacious: {
    gap: vars.space[3],
    padding: vars.space[6],
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
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBlockEnd: vars.space[1],
});

export const value = style({
  overflowWrap: 'anywhere',
});

export const label = style({
  overflowWrap: 'anywhere',
});

export const description = style({
  overflowWrap: 'anywhere',
});

export const tones = styleVariants({
  neutral: {
    color: vars.color.text.primary,
  },
  brand: {
    color: vars.color.brand[600],
  },
  success: {
    color: vars.color.status.success,
  },
  warning: {
    color: vars.color.status.warning,
  },
  error: {
    color: vars.color.status.error,
  },
  info: {
    color: vars.color.status.info,
  },
});

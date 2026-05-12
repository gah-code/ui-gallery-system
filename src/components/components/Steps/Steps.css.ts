import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  width: '100%',
  minWidth: 0,
});

export const list = style({
  display: 'grid',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  counterReset: 'step',
  minWidth: 0,
});

export const layouts = styleVariants({
  vertical: {
    gridTemplateColumns: '1fr',
  },
  horizontal: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 900px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
      },
    },
  },
  responsive: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
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

export const step = style({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  minWidth: 0,
  gap: vars.space[3],
});

export const marker = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.border.strong}`,
  background: vars.color.surface.raised,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  flexShrink: 0,
});

export const markerTones = styleVariants({
  default: {
    color: vars.color.text.primary,
    background: vars.color.surface.raised,
    borderColor: vars.color.border.strong,
  },
  current: {
    color: vars.color.text.inverse,
    background: vars.color.brand[600],
    borderColor: vars.color.brand[600],
  },
  complete: {
    color: vars.color.status.success,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
  disabled: {
    color: vars.color.text.muted,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
    opacity: 0.65,
  },
});

export const body = style({
  display: 'grid',
  minWidth: 0,
});

export const bodyDensities = styleVariants({
  compact: {
    gap: vars.space[1],
  },
  default: {
    gap: vars.space[2],
  },
  spacious: {
    gap: vars.space[3],
  },
});

export const title = style({
  overflowWrap: 'anywhere',
});

export const description = style({
  overflowWrap: 'anywhere',
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
  marginBlockStart: vars.space[1],
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
  marginBlockStart: vars.space[2],
});

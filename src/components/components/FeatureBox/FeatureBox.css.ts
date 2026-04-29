import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  minWidth: 0,
  overflow: 'hidden',
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

export const variants = styleVariants({
  default: {},
  icon: {},
  media: {},
  compact: {},
});

export const media = style({
  minWidth: 0,
});

export const body = style({
  display: 'grid',
  minWidth: 0,
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

export const iconWrap = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.brand[600],
  flexShrink: 0,
});

export const iconSizes = styleVariants({
  sm: {
    width: '2rem',
    height: '2rem',
  },
  md: {
    width: '2.5rem',
    height: '2.5rem',
  },
  lg: {
    width: '3rem',
    height: '3rem',
  },
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
  minWidth: 0,
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[2],
});

export const title = style({
  overflowWrap: 'anywhere',
});

export const description = style({
  overflowWrap: 'anywhere',
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
});

export const footer = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[2],
});

import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'grid',
  placeItems: 'center',
  padding: vars.space[4],
  background: 'rgb(15 23 42 / 0.55)',
});

export const dialog = style({
  display: 'grid',
  width: '100%',
  maxHeight: 'min(90vh, 48rem)',
  overflow: 'hidden',
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.lg,
  color: vars.color.text.primary,
});

export const sizes = styleVariants({
  sm: {
    maxWidth: '28rem',
  },
  md: {
    maxWidth: '40rem',
  },
  lg: {
    maxWidth: '56rem',
  },
  xl: {
    maxWidth: '72rem',
  },
  full: {
    maxWidth: 'min(96vw, 90rem)',
    minHeight: 'min(90vh, 54rem)',
  },
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
});

export const header = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'start',
  gap: vars.space[4],
  padding: vars.space[4],
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
});

export const titleArea = style({
  display: 'grid',
  gap: vars.space[1],
  minWidth: 0,
});

export const closeButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.full,
  background: vars.color.surface.raised,
  color: vars.color.text.primary,
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color, color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover': {
      background: vars.color.surface.subtle,
      borderColor: vars.color.border.strong,
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

export const body = style({
  minWidth: 0,
  overflowY: 'auto',
  padding: vars.space[4],
});

export const footer = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: vars.space[3],
  padding: vars.space[4],
  borderBlockStart: `1px solid ${vars.color.border.subtle}`,
});

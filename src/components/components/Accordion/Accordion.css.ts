import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  borderRadius: vars.radius.lg,
  overflow: 'hidden',
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
  outline: {
    background: 'transparent',
    border: `1px solid ${vars.color.border.strong}`,
  },
});

export const item = style({
  display: 'grid',
  minWidth: 0,
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,

  selectors: {
    '&:last-child': {
      borderBlockEnd: 'none',
    },
  },
});

export const trigger = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  alignItems: 'center',
  width: '100%',
  border: 0,
  background: 'transparent',
  color: vars.color.text.primary,
  cursor: 'pointer',
  textAlign: 'start',
  fontFamily: vars.font.family.body,
  transitionProperty: 'background-color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surface.subtle,
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: `-${vars.focus.ring.offset}`,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  },
});

export const triggerDensities = styleVariants({
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
    padding: vars.space[5],
  },
});

export const title = style({
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const indicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.text.muted,
  transition: `transform ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
});

export const indicatorOpen = style({
  transform: 'rotate(180deg)',
});

export const panel = style({
  display: 'grid',
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const panelDensities = styleVariants({
  compact: {
    gap: vars.space[2],
    padding: `0 ${vars.space[3]} ${vars.space[3]}`,
  },
  default: {
    gap: vars.space[3],
    padding: `0 ${vars.space[4]} ${vars.space[4]}`,
  },
  spacious: {
    gap: vars.space[4],
    padding: `0 ${vars.space[5]} ${vars.space[5]}`,
  },
});

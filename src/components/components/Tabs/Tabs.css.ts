import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gap: vars.space[4],
});

export const tabList = style({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '100%',
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
});

export const tab = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  border: 0,
  borderBlockEnd: '2px solid transparent',
  background: 'transparent',
  color: vars.color.text.secondary,
  cursor: 'pointer',
  fontFamily: vars.font.family.body,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  whiteSpace: 'nowrap',
  transitionProperty: 'background-color, border-color, color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.surface.subtle,
      color: vars.color.text.primary,
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: `-${vars.focus.ring.offset}`,
    },
    '&[aria-selected="true"]': {
      borderBlockEndColor: vars.color.brand[600],
      color: vars.color.text.primary,
      background: vars.color.surface.raised,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.55,
    },
  },
});

export const tabDensities = styleVariants({
  compact: {
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.font.size.sm,
  },
  default: {
    padding: `${vars.space[3]} ${vars.space[4]}`,
    fontSize: vars.font.size.base,
  },
  spacious: {
    padding: `${vars.space[4]} ${vars.space[5]}`,
    fontSize: vars.font.size.md,
  },
});

export const tones = styleVariants({
  default: {},
  subtle: {
    background: vars.color.surface.subtle,
    borderRadius: vars.radius.lg,
    padding: vars.space[2],
  },
  outline: {
    border: `1px solid ${vars.color.border.subtle}`,
    borderRadius: vars.radius.lg,
    padding: vars.space[2],
  },
});

export const panel = style({
  display: 'grid',
  minWidth: 0,
  overflowWrap: 'anywhere',
});

export const panelDensities = styleVariants({
  compact: {
    gap: vars.space[2],
  },
  default: {
    gap: vars.space[3],
  },
  spacious: {
    gap: vars.space[4],
  },
});

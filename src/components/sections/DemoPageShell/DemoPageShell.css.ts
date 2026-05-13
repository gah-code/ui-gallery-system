import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

const shellBackground = createVar();
const shellSurface = createVar();
const shellSurfaceSubtle = createVar();
const shellText = createVar();
const shellTextMuted = createVar();
const shellBorder = createVar();

export const root = style({
  width: '100%',
  minWidth: 0,
  background: shellBackground,
  color: shellText,
  transitionProperty: 'background-color, color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,
  vars: {
    [shellBackground]: vars.color.surface.page,
    [shellSurface]: vars.color.surface.raised,
    [shellSurfaceSubtle]: vars.color.surface.subtle,
    [shellText]: vars.color.text.primary,
    [shellTextMuted]: vars.color.text.secondary,
    [shellBorder]: vars.color.border.subtle,
  },

  selectors: {
    '&[data-theme="dark"]': {
      vars: {
        [shellBackground]: '#0f172a',
        [shellSurface]: '#111c31',
        [shellSurfaceSubtle]: '#172339',
        [shellText]: '#f8fafc',
        [shellTextMuted]: '#cbd5e1',
        [shellBorder]: '#334155',
      },
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

globalStyle(`${root}[data-theme="dark"] :where(h1, h2, h3, p, span, li, dd, dt)`, {
  color: shellText,
});

export const inner = style({
  display: 'grid',
  width: '100%',
  maxWidth: vars.font.measure.wide,
  marginInline: 'auto',
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

export const utilityBar = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],
  alignItems: 'stretch',
  justifyContent: 'space-between',
  minWidth: 0,
  padding: `${vars.space[3]} ${vars.space[4]}`,
  border: `1px solid ${shellBorder}`,
  borderRadius: vars.radius.lg,
  background: shellSurfaceSubtle,

  '@media': {
    'screen and (min-width: 48rem)': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
});

export const utilityIdentity = style({
  display: 'grid',
  gap: vars.space[1],
  minWidth: 0,
});

export const utilityLabel = style({
  margin: 0,
  color: shellText,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
});

export const utilityKicker = style({
  margin: 0,
  color: shellTextMuted,
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.tight,
});

export const utilityActions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
  minWidth: 0,

  '@media': {
    'screen and (min-width: 48rem)': {
      justifyContent: 'flex-end',
    },
  },
});

export const utilityButton = style({
  flexShrink: 0,
  borderColor: shellBorder,
  color: shellText,
  whiteSpace: 'nowrap',
});

export const header = style({
  display: 'grid',
  gap: vars.space[3],
  maxWidth: vars.font.measure.comfortable,
});

export const meta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[3],
  alignItems: 'center',
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[5],
});

export const contentFrame = style({
  padding: vars.space[5],
  border: `1px solid ${shellBorder}`,
  borderRadius: vars.radius.lg,
  background: shellSurface,
  minWidth: 0,
});

export const empty = style({
  padding: vars.space[6],
  border: `1px dashed ${shellBorder}`,
  borderRadius: vars.radius.lg,
  background: shellSurfaceSubtle,
  color: shellTextMuted,
  textAlign: 'center',
});

export const note = style({
  padding: vars.space[4],
  border: `1px solid ${shellBorder}`,
  borderRadius: vars.radius.lg,
  background: shellSurfaceSubtle,
});

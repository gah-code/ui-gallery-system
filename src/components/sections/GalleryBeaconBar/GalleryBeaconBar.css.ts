import { createVar, style } from '@vanilla-extract/css';
import { vars } from '../../../styles';

const beaconSurface = createVar();
const beaconText = createVar();
const beaconMuted = createVar();
const beaconBorder = createVar();

export const root = style({
  width: '100%',
  minWidth: 0,
  background: beaconSurface,
  color: beaconText,
  borderBlockEnd: `1px solid ${beaconBorder}`,
  transitionProperty: 'background-color, color, border-color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,
  vars: {
    [beaconSurface]: vars.color.surface.subtle,
    [beaconText]: vars.color.text.primary,
    [beaconMuted]: vars.color.text.muted,
    [beaconBorder]: vars.color.border.subtle,
  },

  selectors: {
    '&[data-theme="dark"]': {
      vars: {
        [beaconSurface]: '#0f172a',
        [beaconText]: '#f8fafc',
        [beaconMuted]: '#cbd5e1',
        [beaconBorder]: 'rgb(148 163 184 / 0.28)',
      },
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

export const inner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],
  alignItems: 'stretch',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: vars.font.measure.wide,
  minWidth: 0,
  marginInline: 'auto',
  padding: `${vars.space[3]} ${vars.space[5]}`,

  '@media': {
    'screen and (min-width: 48rem)': {
      flexDirection: 'row',
      alignItems: 'center',
      gap: vars.space[4],
      padding: `${vars.space[4]} ${vars.space[6]}`,
    },
  },
});

export const identity = style({
  display: 'grid',
  gap: vars.space[1],
  minWidth: 0,
});

export const label = style({
  margin: 0,
  color: beaconText,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  overflowWrap: 'anywhere',
});

export const description = style({
  margin: 0,
  color: beaconMuted,
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.tight,
  overflowWrap: 'anywhere',
});

export const actions = style({
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

export const action = style({
  flexShrink: 0,
  borderColor: beaconBorder,
  color: beaconText,
  whiteSpace: 'nowrap',
});

import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const galleryThemeVars = {
  background: createVar(),
  surface: createVar(),
  surfaceMuted: createVar(),
  text: createVar(),
  textMuted: createVar(),
  border: createVar(),
  focus: createVar(),
};

export const galleryThemeColor = {
  background: fallbackVar(galleryThemeVars.background, vars.color.surface.page),
  surface: fallbackVar(galleryThemeVars.surface, vars.color.surface.raised),
  surfaceMuted: fallbackVar(galleryThemeVars.surfaceMuted, vars.color.surface.subtle),
  text: fallbackVar(galleryThemeVars.text, vars.color.text.primary),
  textMuted: fallbackVar(galleryThemeVars.textMuted, vars.color.text.secondary),
  border: fallbackVar(galleryThemeVars.border, vars.color.border.subtle),
  focus: fallbackVar(galleryThemeVars.focus, vars.focus.ring.color),
};

export const root = style({
  width: '100%',
  minWidth: 0,
  background: galleryThemeColor.background,
  color: galleryThemeColor.text,
  transitionProperty: 'background-color, color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,
  vars: {
    [galleryThemeVars.background]: vars.color.surface.page,
    [galleryThemeVars.surface]: vars.color.surface.raised,
    [galleryThemeVars.surfaceMuted]: vars.color.surface.subtle,
    [galleryThemeVars.text]: vars.color.text.primary,
    [galleryThemeVars.textMuted]: vars.color.text.secondary,
    [galleryThemeVars.border]: vars.color.border.subtle,
    [galleryThemeVars.focus]: vars.focus.ring.color,
  },

  selectors: {
    '&[data-theme="dark"]': {
      vars: {
        [galleryThemeVars.background]: '#0f172a',
        [galleryThemeVars.surface]: '#111c31',
        [galleryThemeVars.surfaceMuted]: '#172339',
        [galleryThemeVars.text]: '#f8fafc',
        [galleryThemeVars.textMuted]: '#cbd5e1',
        [galleryThemeVars.border]: 'rgb(148 163 184 / 0.28)',
        [galleryThemeVars.focus]: '#93c5fd',
      },
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

export const navigationHint = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  minWidth: 0,
  padding: `${vars.space[4]} ${vars.space[5]}`,
  borderBlockEnd: `1px solid ${galleryThemeColor.border}`,
  background: galleryThemeColor.surfaceMuted,
  textAlign: 'center',

  '@media': {
    '(min-width: 760px)': {
      gap: vars.space[3],
      padding: `${vars.space[5]} ${vars.space[6]}`,
    },
  },
});

export const hintText = style({
  color: galleryThemeColor.textMuted,
});

export const stack = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
});

export const surface = style({
  minWidth: 0,
  scrollMarginBlockStart: vars.space[8],
});

export const divider = style({
  width: '100%',
  borderBlockStart: `1px solid ${galleryThemeColor.border}`,
});

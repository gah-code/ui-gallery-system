import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles';
import { galleryThemeColor } from '../GallerySurfaceLayout/GallerySurfaceLayout.css';

export const root = style({
  width: '100%',
  minWidth: 0,
  background: galleryThemeColor.background,
  color: galleryThemeColor.text,
  transitionProperty: 'background-color, color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

export const inner = style({
  display: 'grid',
  gap: vars.space[8],
  width: '100%',
  maxWidth: vars.font.measure.wide,
  marginInline: 'auto',
  padding: `${vars.space[12]} ${vars.space[5]}`,
  minWidth: 0,
});

export const header = style({
  display: 'grid',
  gap: vars.space[4],
  maxWidth: vars.font.measure.comfortable,
});

export const controls = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
});

export const categorySummary = style({
  display: 'grid',
  gap: vars.space[3],
  padding: vars.space[5],
  border: `1px solid ${galleryThemeColor.border}`,
  borderRadius: vars.radius.lg,
  background: galleryThemeColor.surfaceMuted,
});

export const categoryHeader = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const categoryMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
});

export const itemGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
  gap: vars.space[4],
});

export const itemCard = style({
  display: 'grid',
  alignContent: 'start',
  gap: vars.space[3],
  padding: vars.space[5],
  border: `1px solid ${galleryThemeColor.border}`,
  borderRadius: vars.radius.lg,
  background: galleryThemeColor.surface,
  minWidth: 0,
  boxShadow: vars.shadow.sm,
});

export const itemHeader = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const itemMeta = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
});

export const tagList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
});

export const pathText = style({
  overflowWrap: 'anywhere',
});

export const note = style({
  padding: vars.space[4],
  border: `1px solid ${galleryThemeColor.border}`,
  borderRadius: vars.radius.lg,
  background: galleryThemeColor.surfaceMuted,
});

export const controlButton = style({
  background: galleryThemeColor.surface,
  borderColor: galleryThemeColor.border,
  color: galleryThemeColor.text,

  selectors: {
    '&:hover:not(:disabled):not([aria-disabled="true"])': {
      background: galleryThemeColor.surfaceMuted,
    },
  },
});

export const textPrimary = style({
  color: galleryThemeColor.text,
});

export const textMuted = style({
  color: galleryThemeColor.textMuted,
});

import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const frame = style({
  position: 'relative',
  display: 'block',
  overflow: 'hidden',
  background: vars.color.surface.subtle,
  borderColor: vars.color.border.subtle,
});

export const image = style({
  display: 'block',
  width: '100%',
  height: '100%',
  maxWidth: '100%',
});

export const aspectRatios = styleVariants({
  auto: {},
  square: {
    aspectRatio: '1 / 1',
  },
  wide: {
    aspectRatio: '16 / 9',
  },
  portrait: {
    aspectRatio: '3 / 4',
  },
  video: {
    aspectRatio: '16 / 9',
  },
  logo: {
    aspectRatio: '3 / 1',
  },
});

export const fits = styleVariants({
  cover: {
    objectFit: 'cover',
  },
  contain: {
    objectFit: 'contain',
  },
  fill: {
    objectFit: 'fill',
  },
});

export const radii = styleVariants({
  none: {
    borderRadius: vars.radius.none,
  },
  sm: {
    borderRadius: vars.radius.sm,
  },
  md: {
    borderRadius: vars.radius.md,
  },
  lg: {
    borderRadius: vars.radius.lg,
  },
  xl: {
    borderRadius: vars.radius.xl,
  },
  full: {
    borderRadius: vars.radius.full,
  },
});

export const fallback = style({
  display: 'grid',
  minHeight: '8rem',
  placeItems: 'center',
  padding: vars.space[4],
  color: vars.color.text.muted,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
  textAlign: 'center',
  background: vars.color.surface.subtle,
  border: `1px dashed ${vars.color.border.strong}`,
});

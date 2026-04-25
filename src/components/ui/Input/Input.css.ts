import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const field = style({
  display: 'grid',
  gap: vars.space[2],
  width: '100%',
});

export const label = style({
  color: vars.color.text.primary,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
});

export const requiredMark = style({
  color: vars.color.status.error,
});

export const control = style({
  width: '100%',
  border: `1px solid ${vars.color.border.strong}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface.raised,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.body,
  lineHeight: vars.font.lineHeight.body,
  transitionProperty: 'border-color, box-shadow, background-color',
  transitionDuration: vars.motion.duration.base,
  transitionTimingFunction: vars.motion.easing.standard,

  selectors: {
    '&::placeholder': {
      color: vars.color.text.muted,
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
      borderColor: vars.color.border.focus,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.65,
      background: vars.color.surface.subtle,
    },
  },
});

export const sizes = styleVariants({
  sm: {
    minHeight: '2rem',
    padding: `${vars.space[1]} ${vars.space[3]}`,
    fontSize: vars.font.size.sm,
  },
  md: {
    minHeight: '2.5rem',
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.font.size.base,
  },
  lg: {
    minHeight: '3rem',
    padding: `${vars.space[3]} ${vars.space[4]}`,
    fontSize: vars.font.size.md,
  },
});

export const textarea = style({
  minHeight: '7rem',
  resize: 'vertical',
});

export const invalid = style({
  borderColor: vars.color.status.error,

  selectors: {
    '&:focus-visible': {
      borderColor: vars.color.status.error,
    },
  },
});

export const helperText = style({
  color: vars.color.text.muted,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.body,
});

export const errorText = style({
  color: vars.color.status.error,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.body,
});

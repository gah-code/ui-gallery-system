import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'start',
  width: '100%',
  minWidth: 0,
  border: '1px solid transparent',
  borderRadius: vars.radius.lg,
  fontFamily: vars.font.family.body,
});

export const noIcon = style({
  gridTemplateColumns: 'minmax(0, 1fr)',
});

export const variants = styleVariants({
  info: {
    color: vars.color.status.info,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
  success: {
    color: vars.color.status.success,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
  warning: {
    color: vars.color.status.warning,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
  error: {
    color: vars.color.status.error,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
  neutral: {
    color: vars.color.text.secondary,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
});

export const densities = styleVariants({
  default: {
    gap: vars.space[3],
    padding: vars.space[4],
  },
  compact: {
    gap: vars.space[2],
    padding: vars.space[3],
  },
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginBlockStart: vars.space[1],
});

export const content = style({
  display: 'grid',
  minWidth: 0,
  gap: vars.space[2],
  color: vars.color.text.primary,
});

export const message = style({
  color: vars.color.text.secondary,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
  marginBlockStart: vars.space[2],
});

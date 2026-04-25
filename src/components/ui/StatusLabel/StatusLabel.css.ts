import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  maxWidth: '100%',
  border: '1px solid transparent',
  borderRadius: vars.radius.full,
  fontFamily: vars.font.family.body,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  whiteSpace: 'normal',
  overflowWrap: 'anywhere',
});

export const statuses = styleVariants({
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
  info: {
    color: vars.color.status.info,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
  neutral: {
    color: vars.color.text.secondary,
    background: vars.color.surface.subtle,
    borderColor: vars.color.border.subtle,
  },
});

export const sizes = styleVariants({
  sm: {
    minHeight: '1.5rem',
    padding: `${vars.space[1]} ${vars.space[2]}`,
    fontSize: vars.font.size.xs,
  },
  md: {
    minHeight: '1.75rem',
    padding: `${vars.space[1]} ${vars.space[3]}`,
    fontSize: vars.font.size.sm,
  },
});

export const withIcon = style({
  gap: vars.space[1],
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const message = style({
  minWidth: 0,
});

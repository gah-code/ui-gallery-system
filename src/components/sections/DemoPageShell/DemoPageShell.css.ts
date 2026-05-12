import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  width: '100%',
  minWidth: 0,
  background: vars.color.surface.page,
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
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  minWidth: 0,
});

export const empty = style({
  padding: vars.space[6],
  border: `1px dashed ${vars.color.border.strong}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.subtle,
  color: vars.color.text.muted,
  textAlign: 'center',
});

export const note = style({
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.subtle,
});

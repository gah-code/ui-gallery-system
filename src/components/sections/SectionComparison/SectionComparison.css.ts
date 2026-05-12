import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gap: vars.space[8],
});

export const group = style({
  display: 'grid',
  gap: vars.space[4],
  minWidth: 0,
});

export const groupHeader = style({
  display: 'grid',
  gap: vars.space[2],
  maxWidth: vars.font.measure.comfortable,
});

export const examples = style({
  display: 'grid',
  gap: vars.space[5],
  minWidth: 0,
});

export const demoFrame = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  overflow: 'hidden',
});

export const demoLabel = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
  padding: `${vars.space[3]} ${vars.space[4]}`,
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
  background: vars.color.surface.subtle,
});

export const demoContent = style({
  minWidth: 0,
});

export const note = style({
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.subtle,
});

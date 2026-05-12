import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  width: '100%',
  minWidth: 0,
  background: vars.color.surface.page,
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
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.subtle,
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
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
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
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.subtle,
});

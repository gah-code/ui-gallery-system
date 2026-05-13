import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gap: vars.space[6],

  '@media': {
    '(min-width: 760px)': {
      gap: vars.space[8],
    },
  },
});

export const group = style({
  display: 'grid',
  gap: vars.space[3],
  minWidth: 0,

  '@media': {
    '(min-width: 760px)': {
      gap: vars.space[4],
    },
  },
});

export const groupHeader = style({
  display: 'grid',
  gap: vars.space[2],
  maxWidth: vars.font.measure.comfortable,
});

export const examples = style({
  display: 'grid',
  gap: vars.space[4],
  minWidth: 0,

  '@media': {
    '(min-width: 760px)': {
      gap: vars.space[5],
    },
  },
});

export const demoFrame = style({
  display: 'grid',
  gap: 0,
  minWidth: 0,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.raised,
  overflow: 'visible',
});

export const demoLabel = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  alignItems: 'center',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
  borderStartEndRadius: vars.radius.lg,
  borderStartStartRadius: vars.radius.lg,
  background: vars.color.surface.subtle,

  '@media': {
    '(min-width: 760px)': {
      padding: `${vars.space[3]} ${vars.space[4]}`,
    },
  },
});

export const demoContent = style({
  minWidth: 0,
  overflow: 'visible',
});

globalStyle(`${demoContent} > *`, {
  minWidth: 0,
});

export const note = style({
  padding: vars.space[4],
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface.subtle,
});

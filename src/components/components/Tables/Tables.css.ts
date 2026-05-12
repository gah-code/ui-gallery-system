import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  gap: vars.space[3],
});

export const header = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const viewport = style({
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
  borderRadius: vars.radius.lg,
});

export const tones = styleVariants({
  default: {
    background: vars.color.surface.raised,
    border: `1px solid ${vars.color.border.subtle}`,
  },
  subtle: {
    background: vars.color.surface.subtle,
    border: `1px solid ${vars.color.border.subtle}`,
  },
  outline: {
    background: 'transparent',
    border: `1px solid ${vars.color.border.strong}`,
  },
});

export const table = style({
  width: '100%',
  minWidth: '42rem',
  borderCollapse: 'collapse',
  fontFamily: vars.font.family.body,
  color: vars.color.text.primary,
});

export const caption = style({
  captionSide: 'top',
  textAlign: 'start',
  paddingBlockEnd: vars.space[3],
  color: vars.color.text.secondary,
  fontSize: vars.font.size.sm,
});

export const head = style({
  background: vars.color.surface.subtle,
});

export const row = style({
  borderBlockStart: `1px solid ${vars.color.border.subtle}`,
});

export const stripedRow = style({
  selectors: {
    '&:nth-child(even)': {
      background: vars.color.surface.subtle,
    },
  },
});

export const cellBase = style({
  textAlign: 'start',
  verticalAlign: 'top',
  overflowWrap: 'anywhere',
});

export const headerCell = style({
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.semibold,
});

export const bodyCell = style({
  color: vars.color.text.secondary,
});

export const densities = styleVariants({
  compact: {
    padding: `${vars.space[2]} ${vars.space[3]}`,
    fontSize: vars.font.size.sm,
  },
  default: {
    padding: `${vars.space[3]} ${vars.space[4]}`,
    fontSize: vars.font.size.base,
  },
  spacious: {
    padding: `${vars.space[4]} ${vars.space[5]}`,
    fontSize: vars.font.size.base,
  },
});

export const alignments = styleVariants({
  start: {
    textAlign: 'start',
  },
  center: {
    textAlign: 'center',
  },
  end: {
    textAlign: 'end',
  },
});

export const empty = style({
  padding: vars.space[6],
  textAlign: 'center',
  color: vars.color.text.muted,
});

export const cellContent = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[2],
});

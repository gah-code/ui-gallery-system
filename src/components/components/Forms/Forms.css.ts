import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const root = style({
  display: 'grid',
  width: '100%',
  minWidth: 0,
  borderRadius: vars.radius.lg,
});

export const tones = styleVariants({
  default: {
    background: vars.color.surface.raised,
  },
  subtle: {
    background: vars.color.surface.subtle,
  },
  outline: {
    background: 'transparent',
    border: `1px solid ${vars.color.border.subtle}`,
  },
});

export const densities = styleVariants({
  compact: {
    gap: vars.space[3],
    padding: vars.space[3],
  },
  default: {
    gap: vars.space[4],
    padding: vars.space[4],
  },
  spacious: {
    gap: vars.space[6],
    padding: vars.space[6],
  },
});

export const fieldset = style({
  display: 'contents',
  minWidth: 0,
  border: 0,
  margin: 0,
  padding: 0,
});

export const header = style({
  display: 'grid',
  gap: vars.space[2],
  minWidth: 0,
});

export const fields = style({
  display: 'grid',
  minWidth: 0,
});

export const layouts = styleVariants({
  stacked: {
    gridTemplateColumns: '1fr',
  },
  grid: {
    gridTemplateColumns: '1fr',

    '@media': {
      '(min-width: 760px)': {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
    },
  },
  inline: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'end',
  },
});

export const fieldGaps = styleVariants({
  compact: {
    gap: vars.space[3],
  },
  default: {
    gap: vars.space[4],
  },
  spacious: {
    gap: vars.space[5],
  },
});

export const field = style({
  minWidth: 0,
});

export const inlineField = style({
  flex: '1 1 14rem',
});

export const fullWidthField = style({
  '@media': {
    '(min-width: 760px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const status = style({
  minWidth: 0,
});

export const actions = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.space[3],
});

export const footer = style({
  minWidth: 0,
  color: vars.color.text.muted,
});

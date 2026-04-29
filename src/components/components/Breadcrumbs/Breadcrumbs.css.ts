import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../styles';

export const nav = style({
  maxWidth: '100%',
  color: vars.color.text.secondary,
});

export const list = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  minWidth: 0,
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const item = style({
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 0,
});

export const link = style({
  color: vars.color.text.link,
  textDecoration: 'none',
  overflowWrap: 'anywhere',

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
      outlineOffset: vars.focus.ring.offset,
    },
  },
});

export const current = style({
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.medium,
  overflowWrap: 'anywhere',
});

export const separator = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: vars.color.text.muted,
  userSelect: 'none',
});

export const sizes = styleVariants({
  sm: {
    fontSize: vars.font.size.xs,
    gap: vars.space[1],
  },
  md: {
    fontSize: vars.font.size.sm,
    gap: vars.space[2],
  },
});

export const separatorSpacing = styleVariants({
  sm: {
    marginInline: vars.space[1],
  },
  md: {
    marginInline: vars.space[2],
  },
});

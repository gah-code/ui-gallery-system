import { style } from '@vanilla-extract/css';
import { vars } from './tokens.css';

export const typography = {
  display: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size['4xl'],
    lineHeight: vars.font.lineHeight.tight,
    fontWeight: vars.font.weight.bold,
    letterSpacing: vars.font.letterSpacing.tight,
    color: vars.color.text.primary,
  }),

  heading: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size['2xl'],
    lineHeight: vars.font.lineHeight.heading,
    fontWeight: vars.font.weight.semibold,
    color: vars.color.text.primary,
  }),

  subheading: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size.lg,
    lineHeight: vars.font.lineHeight.body,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text.secondary,
  }),

  body: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size.base,
    lineHeight: vars.font.lineHeight.body,
    fontWeight: vars.font.weight.regular,
    color: vars.color.text.primary,
  }),

  caption: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.body,
    color: vars.color.text.muted,
  }),

  label: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size.sm,
    lineHeight: vars.font.lineHeight.tight,
    fontWeight: vars.font.weight.semibold,
    color: vars.color.text.primary,
  }),

  metadata: style({
    fontFamily: vars.font.family.body,
    fontSize: vars.font.size.xs,
    lineHeight: vars.font.lineHeight.body,
    letterSpacing: vars.font.letterSpacing.wide,
    textTransform: 'uppercase',
    color: vars.color.text.muted,
  }),
};

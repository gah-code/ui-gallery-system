import { style, styleVariants } from '@vanilla-extract/css';
import { typography, vars } from '../../../styles';

export const base = style({
  margin: 0,
});

export const variants = {
  display: typography.display,
  heading: typography.heading,
  subheading: typography.subheading,
  body: typography.body,
  caption: typography.caption,
  label: typography.label,
  metadata: typography.metadata,
};

export const tones = styleVariants({
  primary: {
    color: vars.color.text.primary,
  },
  secondary: {
    color: vars.color.text.secondary,
  },
  muted: {
    color: vars.color.text.muted,
  },
  inverse: {
    color: vars.color.text.inverse,
  },
  link: {
    color: vars.color.text.link,
  },
  success: {
    color: vars.color.status.success,
  },
  warning: {
    color: vars.color.status.warning,
  },
  error: {
    color: vars.color.status.error,
  },
  info: {
    color: vars.color.status.info,
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

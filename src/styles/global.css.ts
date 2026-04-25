import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  minHeight: '100%',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('body', {
  minHeight: '100%',
  margin: 0,
  fontFamily: vars.font.family.body,
  fontSize: vars.font.size.base,
  lineHeight: vars.font.lineHeight.body,
  color: vars.color.text.primary,
  background: vars.color.surface.page,
});

globalStyle('body, #root', {
  minHeight: '100vh',
});

globalStyle('a', {
  color: vars.color.text.link,
  textDecoration: 'none',
});

globalStyle('a:hover', {
  textDecoration: 'underline',
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
});

globalStyle('button, input, textarea, select', {
  font: 'inherit',
});

globalStyle(':focus-visible', {
  outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
  outlineOffset: vars.focus.ring.offset,
});

globalStyle('*, *::before, *::after', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms',
      animationIterationCount: '1',
      scrollBehavior: 'auto',
      transitionDuration: '0.01ms',
    },
  },
});

import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    brand: {
      50: '#f5f7ff',
      100: '#e8edff',
      500: '#4f63ff',
      600: '#3f4fd1',
      700: '#303b9f',
    },
    neutral: {
      0: '#ffffff',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      500: '#64748b',
      700: '#334155',
      900: '#0f172a',
    },
    surface: {
      page: '#ffffff',
      subtle: '#f8fafc',
      raised: '#ffffff',
      inverse: '#0f172a',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#64748b',
      inverse: '#ffffff',
      link: '#3f4fd1',
    },
    border: {
      subtle: '#e2e8f0',
      strong: '#cbd5e1',
      focus: '#4f63ff',
    },
    status: {
      success: '#15803d',
      warning: '#b45309',
      error: '#b91c1c',
      info: '#1d4ed8',
    },
  },
  font: {
    family: {
      body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    },
    size: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3rem',
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.1',
      heading: '1.2',
      body: '1.6',
      relaxed: '1.75',
    },
    letterSpacing: {
      tight: '-0.03em',
      normal: '0',
      wide: '0.04em',
    },
    measure: {
      narrow: '42rem',
      comfortable: '56rem',
      wide: '72rem',
    },
  },
  space: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '999px',
  },
  shadow: {
    none: 'none',
    sm: '0 1px 2px rgb(15 23 42 / 0.08)',
    md: '0 12px 24px rgb(15 23 42 / 0.08)',
    lg: '0 24px 48px rgb(15 23 42 / 0.12)',
  },
  motion: {
    duration: {
      fast: '120ms',
      base: '180ms',
      slow: '260ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
  focus: {
    ring: {
      color: '#4f63ff',
      width: '3px',
      offset: '3px',
    },
  },
});

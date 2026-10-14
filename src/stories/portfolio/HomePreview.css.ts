import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles';

export const page = style({
  // Token overrides inherit only inside this exploratory composition.
  vars: {
    [vars.color.surface.page]: '#faf9f7',
    [vars.color.surface.subtle]: '#f0f2ee',
    [vars.color.surface.raised]: '#ffffff',
    [vars.color.surface.inverse]: '#151a1d',
    [vars.color.text.primary]: '#151a1d',
    [vars.color.text.secondary]: '#555e60',
    [vars.color.text.muted]: '#62696b',
    [vars.color.text.link]: '#26794f',
    [vars.color.border.subtle]: '#e3e4e0',
    [vars.color.border.strong]: '#a7afaa',
    [vars.color.brand[50]]: '#eaf4ee',
    [vars.color.brand[100]]: '#d7ebdf',
    [vars.color.brand[500]]: '#26794f',
    [vars.color.brand[600]]: '#151a1d',
    [vars.color.brand[700]]: '#303a36',
    [vars.color.status.success]: '#26794f',
    [vars.color.neutral[100]]: '#f0f2ee',
    [vars.color.neutral[700]]: '#555e60',
    [vars.font.measure.wide]: '75rem',
    [vars.font.letterSpacing.tight]: '0',
    [vars.font.letterSpacing.wide]: '0',
    [vars.focus.ring.color]: '#26794f',
  },
  background: vars.color.surface.page,
  color: vars.color.text.primary,
  minWidth: 0,
  overflowWrap: 'anywhere',
  letterSpacing: 0,
});

globalStyle(`${page} :is(section, main, footer)`, { scrollMarginBlockStart: vars.space[6] });
globalStyle(`${page} :is(a, button):focus-visible`, {
  outline: `${vars.focus.ring.width} solid ${vars.focus.ring.color}`,
  outlineOffset: vars.focus.ring.offset,
});

export const skipLink = style({
  position: 'absolute',
  top: vars.space[3],
  left: vars.space[4],
  zIndex: 2,
  padding: vars.space[3],
  background: vars.color.surface.raised,
  transform: 'translateY(-200%)',
  selectors: { '&:focus': { transform: 'translateY(0)' } },
});

export const navigation = style({
  borderBlockEnd: 0,
  '@media': { '(max-width: 999px)': { display: 'none' } },
});
globalStyle(`${navigation} > div`, {
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  paddingInline: vars.space[5],
  rowGap: vars.space[2],
  '@media': {
    '(min-width: 1000px)': {
      gridTemplateColumns: 'auto minmax(0, 1fr) auto',
      paddingInline: vars.space[6],
      paddingBlock: vars.space[5],
    },
  },
});

export const brand = style({
  display: 'inline-flex', alignItems: 'center', gap: vars.space[3],
  fontSize: vars.font.size.base, fontWeight: vars.font.weight.semibold,
});
export const monogram = style({
  display: 'inline-grid', placeItems: 'center', flexShrink: 0,
  width: '2.25rem', height: '2.5rem', borderRadius: vars.radius.sm,
  background: vars.color.surface.inverse, color: vars.color.text.inverse,
  fontSize: vars.font.size.sm, fontWeight: vars.font.weight.medium,
});

export const navigationLinks = style({
  gridColumn: '1 / -1', gridRow: 2,
  width: '100%',
  display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: vars.space[1],
  '@media': {
    '(min-width: 540px)': { display: 'flex', justifyContent: 'space-between' },
    '(min-width: 1000px)': { gridColumn: 2, gridRow: 1, justifyContent: 'center', columnGap: vars.space[6] },
  },
});
globalStyle(`${navigationLinks} a`, { display: 'inline-flex', alignItems: 'center', minHeight: '2.75rem' });
export const navigationActions = style({ gridColumn: 2, gridRow: 1, justifySelf: 'end' });
export const resumeButton = style({ minHeight: '2.75rem' });

export const mobileHeader = style({
  padding: `${vars.space[3]} ${vars.space[5]}`,
  '@media': { '(min-width: 1000px)': { display: 'none' } },
});
export const mobileHeaderRow = style({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: vars.space[2],
});
export const mobileBrand = style({
  minWidth: 0, color: vars.color.text.primary, textDecoration: 'none',
});
export const mobileActions = style({ display: 'flex', gap: vars.space[2], flexShrink: 0 });
export const mobileResume = style({ width: '2.75rem', height: '2.75rem', padding: 0 });
export const menuButton = style({
  display: 'inline-grid', placeItems: 'center', width: '2.75rem', height: '2.75rem',
  padding: 0, border: `1px solid ${vars.color.border.subtle}`, borderRadius: vars.radius.sm,
  color: vars.color.text.primary, background: 'transparent', cursor: 'pointer',
  selectors: { '&:hover': { background: vars.color.surface.subtle } },
});
export const mobileLinks = style({
  display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: `${vars.space[1]} ${vars.space[4]}`, marginBlockStart: vars.space[3], paddingBlockStart: vars.space[3],
  borderBlockStart: `1px solid ${vars.color.border.subtle}`,
  selectors: { '&[hidden]': { display: 'none' } },
});
globalStyle(`${mobileLinks} a`, {
  display: 'flex', alignItems: 'center', minHeight: '2.75rem', paddingInline: vars.space[2],
  color: vars.color.text.primary, fontSize: vars.font.size.base, textDecoration: 'none',
  borderRadius: vars.radius.sm,
});
globalStyle(`${mobileLinks} a:hover`, { background: vars.color.surface.subtle, textDecoration: 'underline' });

export const hero = style({});
globalStyle(`${hero} > div`, {
  padding: `${vars.space[5]} ${vars.space[5]} ${vars.space[12]}`,
  gap: vars.space[8],
  '@media': {
    '(min-width: 900px)': { padding: `${vars.space[5]} ${vars.space[6]} ${vars.space[12]}`, gap: vars.space[12] },
  },
});
export const heroContent = style({ gap: vars.space[5] });
export const heroAction = style({ minHeight: '3rem' });
globalStyle(`${heroContent} h1`, {
  fontSize: vars.font.size['4xl'],
  lineHeight: '1.1',
  fontWeight: vars.font.weight.semibold,
  maxWidth: '23ch',
  textWrap: 'pretty',
  '@media': {
    '(max-width: 599px)': { fontSize: '2.125rem', lineHeight: '1.12' },
  },
});
export const headlineAccent = style({
  textDecorationLine: 'underline', textDecorationColor: vars.color.status.success,
  textDecorationThickness: '2px', textUnderlineOffset: '0.15em',
});
globalStyle(`${heroContent} > p`, {
  fontSize: vars.font.size.base, lineHeight: vars.font.lineHeight.body, maxWidth: '35ch',
});
export const eyebrow = style({
  display: 'inline-flex', alignItems: 'center', gap: vars.space[2], fontSize: vars.font.size.sm,
  textTransform: 'none',
  selectors: {
    '&::before': {
      content: '""', display: 'block', width: '0.375rem', height: '0.375rem',
      borderRadius: vars.radius.full, background: vars.color.status.success, flexShrink: 0,
    },
  },
});
export const heroMedia = style({
  position: 'relative', alignSelf: 'center', width: '100%', maxWidth: '29rem', justifySelf: 'center',
  paddingBlockStart: vars.space[4],
  '@media': { '(min-width: 900px)': { justifySelf: 'end' } },
});
export const portrait = style({
  display: 'block', width: '100%', height: 'auto', aspectRatio: '1',
  objectFit: 'contain', borderRadius: vars.radius.md,
});
export const heroBadge = style({
  // The upper sky leaves the person and both dogs unobstructed.
  position: 'absolute', left: vars.space[4], top: 0,
  display: 'flex', alignItems: 'center', gap: vars.space[3], maxWidth: 'calc(100% - 2rem)',
  padding: vars.space[3], borderRadius: vars.radius.md, background: vars.color.surface.raised,
  boxShadow: vars.shadow.sm, border: `1px solid ${vars.color.border.subtle}`,
  '@media': {
    '(min-width: 900px)': { left: '-1rem', top: vars.space[6], padding: vars.space[4] },
  },
});
export const iconSurface = style({
  width: '2.75rem', height: '2.75rem', borderRadius: vars.radius.md, flexShrink: 0,
  display: 'inline-grid', placeItems: 'center',
  background: vars.color.brand[50], color: vars.color.status.success,
});

export const sections = style({
  width: '100%', maxWidth: vars.font.measure.wide, paddingInline: vars.space[5], marginInline: 'auto',
  display: 'grid', gap: vars.space[10], paddingBlockEnd: vars.space[4],
  '@media': {
    '(min-width: 900px)': { paddingInline: vars.space[6], gap: vars.space[12], paddingBlockEnd: vars.space[6] },
  },
});
export const capabilities = style({
  gap: vars.space[2],
  '@media': { '(min-width: 600px)': { gap: vars.space[3] } },
});
export const capability = style({
  borderRadius: vars.radius.md, borderColor: vars.color.border.subtle,
  background: 'transparent', boxShadow: 'none',
});
export const capabilityContent = style({
  display: 'flex', alignItems: 'center', minHeight: '2.75rem', gap: vars.space[4],
  '@media': { '(min-width: 600px)': { minHeight: '3rem' } },
});
export const capabilityBody = style({
  padding: `${vars.space[3]} ${vars.space[4]}`,
  '@media': { '(min-width: 600px)': { padding: vars.space[4] } },
});
export const capabilityLabel = style({
  fontWeight: vars.font.weight.semibold, lineHeight: '1.4',
});
export const section = style({
  display: 'grid', alignContent: 'start', gap: vars.space[6], minWidth: 0,
});
export const sectionTitle = style({ fontWeight: vars.font.weight.semibold });
export const projectCard = style({
  borderRadius: vars.radius.md, background: vars.color.surface.raised,
  borderColor: vars.color.border.subtle, boxShadow: vars.shadow.sm, gridTemplateRows: 'auto 1fr',
});
export const projectBody = style({ alignContent: 'space-between', padding: `${vars.space[3]} ${vars.space[5]} ${vars.space[5]}` });
export const projectTags = style({ display: 'flex', flexWrap: 'wrap', gap: vars.space[2] });
globalStyle(`${projectBody} h3`, {
  fontSize: vars.font.size.lg, lineHeight: '1.35', fontWeight: vars.font.weight.semibold,
});
export const projectMedia = style({ borderBlockEnd: 0 });
export const projectFigure = style({ margin: 0, background: vars.color.surface.raised });
export const projectImage = style({
  display: 'block', width: '100%', aspectRatio: '1731 / 909', objectFit: 'contain',
});
export const caption = style({
  padding: `${vars.space[1]} ${vars.space[5]} 0`,
  fontSize: vars.font.size.xs, color: vars.color.text.muted,
});

export const workAndWriting = style({
  display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: vars.space[10],
  '@media': {
    '(min-width: 900px)': { gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: vars.space[10] },
  },
});
export const timeline = style({ display: 'grid', listStyle: 'none', margin: 0, padding: 0 });
export const timelineItem = style({
  position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)',
  alignContent: 'start', gap: vars.space[2], marginInlineStart: vars.space[1],
  paddingInlineStart: vars.space[6], paddingBlockEnd: vars.space[6],
  borderInlineStart: `1px solid ${vars.color.border.subtle}`,
  selectors: {
    '&::before': {
      content: '""', position: 'absolute', left: '-0.25rem', top: '0.4rem',
      width: '0.5rem', height: '0.5rem', borderRadius: vars.radius.full,
      background: vars.color.status.success,
    },
    '&:last-child': { paddingBlockEnd: 0, borderColor: 'transparent' },
  },
  '@media': {
    '(min-width: 600px)': { gridTemplateColumns: '12rem minmax(0, 1fr)', gap: vars.space[5] },
  },
});
export const dates = style({ lineHeight: vars.font.lineHeight.body });
export const experienceDetails = style({ display: 'grid', gap: vars.space[1] });
export const role = style({ fontWeight: vars.font.weight.semibold });
export const writing = style([section, {
  '@media': {
    '(min-width: 900px)': {
      borderInlineStart: `1px solid ${vars.color.border.subtle}`, paddingInlineStart: vars.space[10],
    },
  },
}]);
export const writingList = style({ listStyle: 'none', margin: 0, padding: 0, display: 'grid' });
export const writingItem = style({
  paddingBlock: vars.space[5], borderBlockEnd: `1px solid ${vars.color.border.subtle}`,
  selectors: {
    '&:first-child': { paddingBlockStart: 0 },
    '&:last-child': { borderBlockEnd: 0, paddingBlockEnd: 0 },
  },
});
export const writingTitle = style({
  fontWeight: vars.font.weight.semibold, fontSize: vars.font.size.md, lineHeight: '1.5', maxWidth: '32ch',
});
export const tools = style({
  display: 'flex', flexWrap: 'wrap', gap: vars.space[3], listStyle: 'none', margin: 0, padding: 0,
});
export const tool = style({
  background: vars.color.surface.raised, border: `1px solid ${vars.color.border.subtle}`,
  padding: `${vars.space[2]} ${vars.space[3]}`, fontWeight: vars.font.weight.medium,
});

export const contact = style({
  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: vars.space[8],
  background: vars.color.surface.inverse, color: vars.color.text.inverse,
  borderRadius: vars.radius.md, padding: vars.space[6],
  vars: { [vars.focus.ring.color]: '#a9e1bf' },
  '@media': { '(min-width: 900px)': { padding: vars.space[8] } },
});
export const contactCopy = style({
  display: 'grid', gap: vars.space[3], minWidth: 0, flex: '1 1 22rem',
});
export const contactTitle = style({
  color: 'inherit', fontSize: vars.font.size.xl,
  lineHeight: vars.font.lineHeight.heading, fontWeight: vars.font.weight.medium,
});
export const contactProfession = style({ color: '#ced5d1', fontSize: vars.font.size.base });
export const contactButton = style({
  color: vars.color.text.primary, background: vars.color.surface.raised, flexShrink: 0,
  maxWidth: '100%', minHeight: '3rem',
  vars: { [vars.color.surface.subtle]: vars.color.brand[100] },
});
export const footer = style({ borderBlockStart: 0, background: vars.color.surface.page });
globalStyle(`${footer} > div`, {
  padding: `${vars.space[6]} ${vars.space[5]} ${vars.space[8]}`,
  '@media': { '(min-width: 900px)': { paddingInline: vars.space[6] } },
});
export const footerBrand = style({ maxWidth: 'none' });
export const footerNavigation = style({
  display: 'flex', flexWrap: 'wrap', columnGap: vars.space[6], rowGap: vars.space[1],
});
globalStyle(`${footer} a`, {
  display: 'inline-flex', alignItems: 'center', minHeight: '2.75rem',
  color: vars.color.text.secondary, fontSize: vars.font.size.sm, textDecoration: 'none',
});
globalStyle(`${footer} a:hover`, { textDecoration: 'underline' });

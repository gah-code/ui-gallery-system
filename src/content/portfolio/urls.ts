import type { ArticlePath, Email, HttpsUrl, MailtoUrl, Path, ProjectPath, Slug, StaticPath, StaticRouteKey } from './contracts/values';

export const staticPaths = { home: '/', about: '/about', work: '/work', projects: '/projects', writing: '/writing', tools: '/tools', contact: '/contact' } as const satisfies Record<StaticRouteKey, StaticPath>;

export function slug(value: unknown): Slug {
  if (typeof value !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) throw new Error('Invalid slug');
  // Scalar brand follows the complete canonical grammar check; never a path cast.
  return value as Slug;
}
export function projectPath(value: Slug): ProjectPath { return `/projects/${slug(value)}`; }
export function articlePath(value: Slug): ArticlePath { return `/writing/${slug(value)}`; }

export function hasControl(value: string): boolean { return Array.from(value).some(c => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127); }

/** Syntactic public-host policy only. This does not perform DNS or establish reachability. */
export function externalUrl(value: unknown): HttpsUrl {
  if (typeof value !== 'string' || !/^https:\/\/(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?::[0-9]+)?(?:\/[^\s]*)?$/.test(value) || (hasControl(value) || value.includes('\\'))) throw new Error('Invalid public URL');
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || host.endsWith('.') ||
      host.split('.').some(part => !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(part)) ||
      /(?:^|\.)(?:localhost|local|internal|lan|home|invalid)$/.test(host)) throw new Error('Invalid public URL');
  // The grammar excludes IP literals/numeric hosts and userinfo; reserved .test is intentional offline input.
  return value as HttpsUrl;
}
export function assetUrl(value: unknown): HttpsUrl {
  return externalUrl(typeof value === 'string' && value.startsWith('//') ? `https:${value}` : value);
}
export function email(value: unknown): Email {
  if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || (hasControl(value) || /[?#%]/.test(value))) throw new Error('Invalid email');
  return value as Email;
}
export function mailto(value: Email): MailtoUrl {
  const checked = email(value);
  return `mailto:${encodeURIComponent(checked).replace('%40', '@')}` as MailtoUrl;
}
export function siteOrigin(value: unknown): HttpsUrl {
  const checked = externalUrl(value);
  const url = new URL(checked);
  if (url.pathname !== '/' || url.search || url.hash || url.port) throw new Error('Invalid site origin');
  return externalUrl(url.origin);
}
export function canonicalUrl(origin: HttpsUrl, path: Path): HttpsUrl {
  return externalUrl(`${siteOrigin(origin)}${path}`);
}

/** R1 identity is full ASCII canonical path bytes, not the slug alone. No output is written. */
export function artifactIdentity(path: Path): Readonly<{ canonical: Path; internal: string; file: string }> {
  if (!Object.values(staticPaths).some(p => p === path) && !/^\/(?:projects|writing)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path)) throw new Error('Invalid canonical path');
  const hex = Array.from(path, c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  const chunks = hex.match(/.{1,64}/g);
  if (!chunks) throw new Error('Empty artifact identity');
  const internal = `/_portfolio-docs/${chunks.map(c => `d-${c}`).join('/')}/page`;
  return { canonical: path, internal, file: `dist-portfolio${internal}.html` };
}
export function decodeArtifact(internal: string): string {
  if (!/^\/_portfolio-docs\/(?:d-[0-9a-f]{2,64}\/)+page$/.test(internal)) throw new Error('Invalid artifact identity');
  const chunks = internal.slice('/_portfolio-docs/'.length, -'/page'.length).split('/').map(p => p.slice(2));
  if (chunks.some((c, i) => c.length % 2 !== 0 || (i < chunks.length - 1 && c.length !== 64))) throw new Error('Noncanonical chunks');
  const bytes = chunks.join('').match(/../g);
  if (!bytes) throw new Error('Empty artifact identity');
  const decoded = bytes.map(c => String.fromCharCode(Number.parseInt(c, 16))).join('');
  if (!Object.values(staticPaths).some(p => p === decoded) && !/^\/(?:projects|writing)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(decoded)) throw new Error('Noncanonical decoded path');
  return decoded;
}

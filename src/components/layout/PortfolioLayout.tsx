import type { ReactNode } from 'react';
import type { SiteChrome } from '../../content/portfolio/contracts/domain';
import type { MetadataBase } from '../../content/portfolio/contracts/pages';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import * as css from '../../portfolio/portfolio.css';
export function PortfolioLayout({chrome,path,breadcrumbs,children}:{chrome?:SiteChrome;path?:string;breadcrumbs?:MetadataBase['breadcrumbs'];children:ReactNode}) {
  return <div className={css.shell}><a className={css.skip} href="#main-content">Skip to content</a>
    <div className={css.notice}>Offline portfolio demonstration — not a release.</div>
    <header className={css.container}><a href="/">{chrome?.siteName ?? 'Portfolio'}</a>
      <nav aria-label="Primary"><ul className={css.nav}>{chrome?.primaryNavigation.map(item => <li key={item.id}><a href={item.href} aria-current={path === item.href ? 'page' : undefined}>{item.label}</a></li>)}</ul></nav></header>
    <main id="main-content" tabIndex={-1} className={css.container}>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs.map((b,i) => ({label:b.label,href:b.href,current:i === breadcrumbs.length-1}))} />}{children}
    </main><footer className={css.container}><nav aria-label="Footer"><ul className={css.nav}>{chrome?.footerNavigation.map(n => <li key={n.id}><a href={n.href}>{n.label}</a></li>)}{chrome?.socialLinks.map(n => <li key={n.id}><a href={n.href}>{n.label}</a></li>)}</ul></nav></footer>
  </div>;
}

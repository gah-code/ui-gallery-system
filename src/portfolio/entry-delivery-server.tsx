import { renderToStaticMarkup } from 'react-dom/server';
import { acquireMockDelivery, type AcquireOptions } from '../content/portfolio/delivery.server';
import { PortfolioLayout } from '../components/layout/PortfolioLayout';

/** Server-only neutral verification. Private evidence is never a UI prop or serialized into HTML. */
export async function renderDeliveryDocument(options: AcquireOptions, styles: readonly string[]) {
  if (!Array.isArray(styles) || styles.length === 0 || styles.length > 16
    || new Set(styles).size !== styles.length
    || styles.some(href => typeof href !== 'string' || !/^\.\/assets\/[A-Za-z0-9._-]+\.css$/.test(href))) {
    return { ok: false as const, error: { code: 'SSR_STYLES_INVALID' as const } };
  }
  try {
    const result = await acquireMockDelivery(options);
    if (!result.ok) return { ok: false as const, error: { code: result.error.code } };
    const html = '<!doctype html>' + renderToStaticMarkup(
      <html lang="en-US"><head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Mock delivery verification — non-release</title>
        {styles.map(href => <link key={href} rel="stylesheet" href={href} />)}
      </head><body>
        <PortfolioLayout chrome={result.chrome}>
          <h1>Mock delivery verification</h1>
          <p>This neutral document verifies synthetic mock acquisition only. It is not a Home route, live CMS integration, or release.</p>
        </PortfolioLayout>
      </body></html>,
    );
    return { ok: true as const, html, privateEvidence: { chrome: result.chrome, receipt: result.receipt } };
  } catch {
    return { ok: false as const, error: { code: 'SSR_RENDER_FAILED' as const } };
  }
}

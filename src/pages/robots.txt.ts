import type { APIContext } from 'astro';

// Generado en build, no un archivo estático en /public: así el sitemap
// siempre apunta al dominio real configurado en astro.config.mjs (site),
// sin un segundo lugar donde el dominio se pueda desincronizar cuando se
// reemplace el TODO de ahí por el dominio definitivo.
export function GET(context: APIContext) {
  const sitemapUrl = new URL('sitemap-index.xml', context.site);

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

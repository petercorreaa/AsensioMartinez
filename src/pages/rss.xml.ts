import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { ordenarPorFecha } from '../lib/novedades';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const todas = await getCollection('novedades');
  const ordenadas = ordenarPorFecha(todas);

  return rss({
    title: `Novedades — ${site.nombre}`,
    description:
      'Los cambios en normativa impositiva, laboral y societaria que te afectan, explicados en castellano.',
    site: context.site!,
    items: ordenadas.map((novedad) => ({
      title: novedad.data.titulo,
      description: novedad.data.resumen,
      pubDate: novedad.data.fecha,
      author: novedad.data.autor,
      categories: [novedad.data.categoria],
      link: `/novedades/${novedad.id}`,
    })),
    customData: '<language>es-ar</language>',
  });
}

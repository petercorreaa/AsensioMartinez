import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const novedades = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/novedades' }),
  // El callback ({ image }) habilita el schema helper image() de Astro:
  // valida que el archivo exista en build time y le da a <Image /> el
  // width/height reales sin tener que escribirlos a mano. Antes era
  // z.string(), que apuntaba a /public/img/ — esas rutas NUNCA pasan por
  // el pipeline de optimización de Astro (ni width/height, ni conversión a
  // webp), sólo se copian tal cual. Por eso las fotos de portada de las
  // novedades tienen que vivir en src/content/novedades/ (o cualquier
  // carpeta debajo de src/), no en /public/img/.
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string().max(180),
      fecha: z.date(),
      categoria: z.enum(['Impositivo', 'Societario', 'Laboral', 'Estudio']),
      autor: z.string().default('Estudio Asensio Martínez'),
      destacado: z.boolean().default(false),
      imagen: image().optional(),
    }),
});

export const collections = { novedades };

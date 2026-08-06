import type { CollectionEntry } from 'astro:content';

export type Novedad = CollectionEntry<'novedades'>;
export type Categoria = Novedad['data']['categoria'];

/** Único lugar donde vive el listado de categorías: si el schema cambia, esto se actualiza acá. */
export const CATEGORIAS: readonly Categoria[] = [
  'Impositivo',
  'Societario',
  'Laboral',
  'Estudio',
];

const slugsPorCategoria: Record<Categoria, string> = {
  Impositivo: 'impositivo',
  Societario: 'societario',
  Laboral: 'laboral',
  Estudio: 'estudio',
};

export function slugCategoria(categoria: Categoria): string {
  return slugsPorCategoria[categoria];
}

export function categoriaDesdeSlug(slug: string): Categoria | undefined {
  return CATEGORIAS.find((categoria) => slugsPorCategoria[categoria] === slug);
}

export function ordenarPorFecha(novedades: Novedad[]): Novedad[] {
  return [...novedades].sort(
    (a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf(),
  );
}

const formateadorFecha = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** timeZone: 'UTC' fuerza a leer la fecha tal cual quedó escrita en el frontmatter
 * (ej. "2026-06-15"), sin correrla un día para atrás por la zona horaria local
 * del navegador o del server de build. */
export function formatFecha(fecha: Date): string {
  return formateadorFecha.format(fecha);
}

const PALABRAS_POR_MINUTO = 200;

/** Tiempo de lectura estimado a partir del markdown crudo: alcanza con contar
 * palabras separadas por espacios, no hace falta parsear el markdown para esto. */
export function tiempoLectura(cuerpoMarkdown: string): number {
  const palabras = cuerpoMarkdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / PALABRAS_POR_MINUTO));
}

/**
 * Novedades relacionadas: prioriza la misma categoría (más recientes primero)
 * y, si no alcanzan, completa con las más recientes del resto del sitio.
 */
export function relacionadas(
  actual: Novedad,
  todas: Novedad[],
  cantidad = 2,
): Novedad[] {
  const otras = todas.filter((n) => n.id !== actual.id);
  const mismaCategoria = ordenarPorFecha(
    otras.filter((n) => n.data.categoria === actual.data.categoria),
  );
  const resto = ordenarPorFecha(
    otras.filter((n) => n.data.categoria !== actual.data.categoria),
  );
  return [...mismaCategoria, ...resto].slice(0, cantidad);
}

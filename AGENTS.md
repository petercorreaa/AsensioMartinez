# Asensio Martínez — landing

Estudio contable en La Plata, Buenos Aires. Astro 5 + Tailwind CSS v4 +
TypeScript strict. **Sin React ni ningún otro framework de UI: Astro puro.**

## Comandos

| Comando           | Qué hace                                        |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en http://localhost:4321 |
| `npm run build`   | Build estático a `dist/`                        |
| `npm run preview` | Sirve el build                                  |
| `npm run check`   | `astro check` (typecheck de `.astro` y `.ts`)   |
| `npm run format`  | Prettier sobre todo el repo                     |

## Contenido

Todo el texto va en **castellano rioplatense con voseo**: "contanos", "agendá",
"escribinos", "tenés". Nunca tuteo peninsular ni neutro ("cuéntanos", "agenda").

## Datos de contacto

Viven en [src/data/site.ts](src/data/site.ts) y **nunca** se hardcodean en los
componentes. Si falta un dato (por ejemplo el email), queda como `''` con un
TODO en ese archivo.

## Sistema de diseño

Los tokens están en [src/styles/global.css](src/styles/global.css) bajo `@theme`
de Tailwind v4 (no hay `tailwind.config.js`).

### Regla de accesibilidad crítica (con una excepción a propósito)

`brand-600` (#13a6aa, el primario) tiene **2.97:1** sobre blanco: por debajo
del mínimo de 4.5:1 para texto normal, y por debajo incluso del 3:1 de texto
grande/UI. En general, **nunca** usarlo como fondo de botón con texto blanco
ni como color de texto chico.

**Excepción deliberada**: el botón primario SÍ usa `brand-600` con texto
blanco (2.97:1, por debajo de AA) — es una decisión de marca explícita
("el único teal tiene que ser #13a6aa, en todos lados, incluidos los
botones"), confirmada más de una vez. No "corregir" esto a `brand-700` sin
que se vuelva a pedir explícitamente.

- Botón primario → fondo `brand-600` con texto blanco (2.97:1 ⚠️, excepción de
  arriba); hover `brand-700`; active y focus-visible outline `brand-800`
- Botón secundario → fondo blanco, borde y texto `accent-700`; hover fondo `accent-50`
- Texto/links de acento (eyebrows, checks, bordes hover de card, etc.) →
  siempre `accent-700` (#225578), nunca `accent-600` sin verificar contraste
- Fuera del botón primario, `brand-600` sólo para íconos, líneas, subrayados,
  fondos teñidos, números display grandes y estados hover — nunca como fondo
  de botón con texto blanco ni como color de texto chico
- Excepción: dentro de secciones oscuras (`background="navy"`, footer), los
  acentos se quedan en `brand-600/700` — ahí no se usa `accent-*`

Además: `focus-visible` con outline de 2px `brand-700` y offset 2px en **todo**
elemento interactivo, y `prefers-reduced-motion` respetado globalmente (ya está
resuelto en `global.css`).

### Otras constantes

- Headings `font-display` (Poppins, sólo se carga el peso 700/bold), tracking
  -0.02em, leading 1.05–1.15
- Cuerpo `font-sans` (Roboto), 18px, leading 1.7, color `ink`
- Navbar (desktop y menú móvil) en mayúsculas (`text-transform: uppercase`)
- **Esquinas vivas**: `border-radius: 0` en todo — cards, botones, inputs,
  imágenes, pills, chips, íconos e incluso el anillo de foco. Es alineación
  con la marca (el logo es un cuadrado de aristas rectas y el "#" son trazos
  rectos, sin una sola curva), no un descuido. Por eso `global.css` **no
  define ningún token de radio**.
  - **Única excepción: el FAB de WhatsApp** (`WhatsAppFab.astro`) va con
    `rounded-full`. Es una convención de la plataforma, no una superficie de
    marca — ya usa el verde de WhatsApp (#25D366) y no el teal del estudio.
    No "corregirlo" a esquina viva.
  - Fuera de ese archivo, una clase `rounded-*` en `src/` es un bug.
- Sombra única: `shadow-soft`
- Contenedor: `.container-xl` (max-w 1440px, px-5 md:px-10, mx-auto)
- Secciones: `py-20 md:py-28` (lo aplica `Section.astro`)

## Componentes

Los primitivos están en [src/components/ui/](src/components/ui/): `Button`,
`Section`, `SectionHeading`, `Card`, `Placeholder`. Usarlos en lugar de repetir
clases sueltas.

## Imágenes

Todavía no hay ninguna imagen real. Cada lugar donde va una usa
`<Placeholder label="..." />`. El inventario de lo que falta está en
[ASSETS.md](ASSETS.md) — actualizarlo cada vez que se agregue una sección con
imágenes.

## Íconos

`astro-icon` con `@iconify-json/lucide`. Uso:
`<Icon name="lucide:phone" />` importando `Icon` desde `astro-icon/components`.

## Documentación

- [Astro 5](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

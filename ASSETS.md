# Assets pendientes

Inventario de las imágenes que todavía faltan. Mientras no estén, cada lugar
usa `<Placeholder />` (`src/components/ui/Placeholder.astro`) con el label
correspondiente.

## Dónde van los archivos (importante)

Hay **dos carpetas distintas** según si la imagen pasa por el optimizador de
Astro o no. Ponerla en la carpeta equivocada no rompe nada a la vista, pero
pierde los beneficios (peso, formato, `width`/`height` automáticos):

- **`src/assets/`** (logos, hero, socios) y **`src/content/novedades/`** (foto
  de portada de cada novedad, campo `imagen` del frontmatter) — estas pasan
  por `<Image />` de `astro:assets`: Astro las convierte a WebP, calcula
  `width`/`height` reales y las sirve en el tamaño que pida cada componente.
  Los logos son PNG (no hay versión vectorial de la marca), así que también
  ganan con este paso. **Los archivos de acá se referencian con una ruta
  relativa en el código o en el frontmatter, nunca con una URL que empiece con
  `/`.**
- **`public/img/`** — para lo que se sirve tal cual, sin pasar por Astro: la
  imagen de Open Graph (se linkea por URL absoluta para redes sociales, no se
  renderiza en la página). Esto sí se referencia con una ruta que empieza con
  `/`, ej. `/img/og-default.jpg`. El favicon vive directo en `public/`
  (`favicon.ico`, `favicon.png`, `apple-touch-icon.png`) por la misma razón:
  son archivos de cabecera que el navegador pide por URL fija, no imágenes que
  Astro renderice dentro de una página.

Frescos a **2×** la medida de display para pantallas retina; Astro/el
navegador se encargan de achicar.

## Estado

| Archivo                | Ruta esperada                                                                                     | Medidas (px)                   | Uso                                                                                                                | Estado                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `og-default.jpg`       | `public/img/og-default.jpg`                                                                       | 1200 × 630                     | Imagen de Open Graph / Twitter card por defecto (`BaseLayout.astro`)                                               | ✅ Listo (placeholder de marca, ver nota) |
| `logo.png`             | `src/assets/brand/logo.png`                                                                       | 3852 × 2106, display ~80 px    | Logo completo, sobre fondo blanco (`Header.astro`)                                                                 | ✅ Listo                                  |
| `logo-light.png`       | `src/assets/brand/logo-light.png`                                                                 | 3852 × 2106, display ~48 px    | Mismo logo con "Asensio Martínez" recoloreado a blanco, sobre fondo navy (`Footer.astro`)                          | ✅ Listo                                  |
| `favicon.ico` / `.png` | `public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png`                         | 16–512 (varios cortes)         | Favicon y apple-touch-icon, recortados del símbolo "#" de la marca (`BaseLayout.astro`)                            | ✅ Listo                                  |
| `hero.jpg`             | `src/assets/hero/hero.jpg`                                                                        | 2560 × 1707 (3:2), sin recorte | Foto de los socios caminando por la vereda (`sections/Hero.astro`, columna derecha, sangrada al borde)             | ✅ Listo                                  |
| `esteban.jpg`          | `src/assets/team/esteban.jpg`                                                                     | 3697 × 2464, recorte 1:1       | Retrato de Esteban Asensio (`sections/Estudio.astro`, card de socio)                                               | ✅ Listo                                  |
| `matias.jpg`           | `src/assets/team/matias.jpg`                                                                      | 3763 × 2509, recorte 1:1       | Retrato de Matías Martínez (`sections/Estudio.astro`, card de socio)                                               | ✅ Listo                                  |
| _(por novedad)_        | `src/content/novedades/<slug>.jpg` junto al `.md`, referenciada desde `imagen:` en el frontmatter | 1280 × 720 (16:9)              | Foto de portada de cada novedad (`NovedadCard.astro`). Opcional: sin ella se usa `<Placeholder />` automáticamente | ⬜ Ninguna novedad tiene foto todavía     |

**Nota sobre `og-default.jpg`**: ya existe y está en uso — es una tarjeta de
marca simple (fondo navy, ícono, nombre del estudio), generada como
placeholder de mejor-que-nada mientras no haya una foto real. Cuando el
estudio tenga una foto o un diseño definitivo para compartir en redes,
reemplazar el archivo (mismas medidas, 1200×630) y no hace falta tocar código.

## Convenciones

- **Nombres**: minúsculas, sin tildes, separados por guiones.
- **Formato de origen**: JPG o PNG está bien — no hace falta convertir a WebP
  a mano, `<Image />` / `<Picture />` lo hacen en el build. El logo de la marca sólo existe en
  PNG (no hay versión vectorial), así que también pasa por acá.
- **`alt`**: siempre descriptivo y en castellano. Las imágenes puramente
  decorativas van con `alt=""` y `aria-hidden="true"`.
- **Peso de origen**: no hace falta comprimir antes de subir — Astro
  reoptimiza — pero evitar archivos de cámara sin recortar (12+ MB); con
  recortar al encuadre final alcanza.
- **Retratos del equipo**: encuadre de pecho para arriba, mirada a cámara,
  fondo neutro y consistente entre todas las fotos.
- **Nada de stock genérico**. Las fotos tienen que ser reales: los socios o el
  estudio de verdad. Nada de bancos de imágenes con gente de traje y corbata
  dándose la mano — se nota y resta credibilidad.

## Cómo actualizar esta lista

Cada vez que se agregue una sección nueva con imágenes, sumar acá una fila con
el nombre de archivo, la ruta, las medidas recomendadas y el uso.

Cuando la imagen real esté lista:

1. Guardarla en `src/assets/` (o `src/content/novedades/` si es la portada de
   una novedad — ver [README.md](README.md) para el paso a paso de publicar
   una novedad).
2. En el componente, importarla y reemplazar `<Placeholder />` por:
   ```astro
   ---
   import { Image } from 'astro:assets';
   import miFoto from '../../assets/mi-foto.jpg';
   ---

   <Image src={miFoto} alt="Descripción real de la foto" />
   ```
   `width`/`height` no hace falta escribirlos a mano: Astro los toma del
   archivo. Sí conviene fijar `format="webp"` y, si la imagen está en el
   viewport inicial (como la del hero), `loading="eager" fetchpriority="high"`
   en vez del `loading="lazy"` por defecto.
3. Cambiar el estado de la fila de acá a ✅.

# Asensio Martínez — sitio web

Landing + blog de novedades del estudio contable Asensio Martínez (La Plata,
Buenos Aires). Astro 5 + Tailwind CSS v4 + TypeScript, sin frameworks de UI.

Para las convenciones de diseño y contenido del proyecto, ver
[AGENTS.md](AGENTS.md) (o `CLAUDE.md`, es el mismo archivo). Para el
inventario de imágenes que faltan, ver [ASSETS.md](ASSETS.md).

## Cómo correr el proyecto

Necesitás [Node.js](https://nodejs.org) 22 o más nuevo instalado.

```sh
npm install       # una sola vez, o cada vez que cambien las dependencias
npm run dev       # servidor de desarrollo en http://localhost:4321
```

Con `npm run dev` corriendo, cualquier cambio que guardes en un archivo se ve
reflejado en el navegador al instante, sin recargar a mano.

Otros comandos útiles:

| Comando           | Qué hace                                                           |
| ----------------- | ------------------------------------------------------------------ |
| `npm run build`   | Genera el sitio estático final en `dist/`                          |
| `npm run preview` | Sirve `dist/` localmente, para revisar el build antes de publicar  |
| `npm run check`   | Chequea tipos de TypeScript y errores de Astro en todo el proyecto |
| `npm run format`  | Formatea todo el código con Prettier                               |

Antes de publicar cambios, conviene correr `npm run check` y `npm run build`
y confirmar que terminan sin errores.

## Cómo publicar una novedad nueva

Esta guía asume que no sabés programar. Las novedades son archivos de texto
simple (Markdown) que viven en la carpeta `src/content/novedades/`.

**1. Copiá un archivo existente como base.** Andá a `src/content/novedades/`
y abrí, por ejemplo, `capital-minimo-sas.md`. Es el formato que tenés que
seguir.

**2. Creá un archivo nuevo en esa misma carpeta.** El nombre del archivo
define la URL de la nota, así que usá minúsculas, sin tildes ni espacios, con
guiones en vez de espacios. Por ejemplo, `nueva-resolucion-arca.md` va a
publicarse en `asensiomartinez.com.ar/novedades/nueva-resolucion-arca`.

**3. Al principio del archivo va un bloque con los datos de la nota**, entre
dos líneas de tres guiones (`---`). Así:

```md
---
titulo: 'Título de la novedad'
resumen: 'Un resumen de una o dos oraciones. Máximo 180 caracteres: es lo que se ve en la tarjeta y en buscadores.'
fecha: 2026-08-15
categoria: 'Impositivo'
---
```

- **`titulo`**: el título tal cual se muestra en la nota.
- **`resumen`**: máximo 180 caracteres — si te pasás, el sitio no va a
  compilar y hay que acortarlo.
- **`fecha`**: formato `AAAA-MM-DD` (año-mes-día), sin comillas.
- **`categoria`**: tiene que ser **exactamente** una de estas cuatro, con
  mayúscula inicial y entre comillas: `'Impositivo'`, `'Societario'`,
  `'Laboral'` o `'Estudio'`. Cualquier otro valor rompe el build.

Dos campos opcionales que podés agregar si hace falta:

- **`autor`**: si no lo escribís, queda "Estudio Asensio Martínez" por
  defecto.
- **`imagen`**: para ponerle una foto de portada a la nota, guardá la foto en
  la misma carpeta (`src/content/novedades/`) y agregá una línea
  `imagen: './nombre-de-la-foto.jpg'`. Si no la agregás, la tarjeta muestra un
  placeholder genérico — no es un error, es opcional.

**4. Después del segundo `---`, escribís el cuerpo de la nota en Markdown.**
Algunos ejemplos rápidos:

```md
## Un subtítulo

Un párrafo normal, con **texto en negrita** si hace falta.

- Un ítem de lista
- Otro ítem

[Un link a otra página](/novedades)
```

**5. Guardá el archivo y revisá cómo queda.** Si tenés el proyecto corriendo
en tu computadora (`npm run dev`), la nota nueva ya aparece en
`http://localhost:4321/novedades`. Si no, pedile a quien haga el deploy que la
revise antes de publicar.

**6. Publicá el cambio** (`git commit` + `git push`, o subiendo el archivo
directo por la interfaz web de GitHub si no usás git desde la terminal). Con
el hosting configurado como se explica en "Cómo hacer deploy", el sitio se
actualiza solo con cada cambio en la rama principal.

La nota más nueva aparece primero en el listado automáticamente — no hay que
reordenar nada a mano.

## Dónde se cambian los datos de contacto

Todos los datos de contacto del estudio (dirección, teléfono, WhatsApp,
horario) están en un solo lugar: **`src/data/site.ts`**. Nunca están escritos
a mano en los componentes — así que para cambiar el teléfono, por ejemplo,
alcanza con editar ese archivo una vez y se actualiza en todo el sitio
(header, footer, formulario de contacto, JSON-LD para Google, etc.).

Campos principales:

```ts
telefono: '(0221) 483-4670',           // como se muestra en pantalla
telefonoHref: 'tel:+542214834670',     // el mismo número, formato para el link tel:
whatsapp: '(0221) 563-7666',
horario: 'Lunes a viernes, 9 a 18 h',
email: '',                              // vacío a propósito: ver el TODO al lado en el archivo
```

Si cambia el teléfono o el WhatsApp, hay que actualizar **los dos** campos
relacionados (el de texto y el de `Href`), manteniendo el mismo número.

## Cómo configurar la access key de Web3Forms

El formulario de contacto (sección "Contanos tu caso" de la home) envía los
mensajes usando [Web3Forms](https://web3forms.com), un servicio gratuito que
no necesita backend propio.

1. Entrá a [web3forms.com](https://web3forms.com) y creá una access key
   gratis con el email donde el estudio quiere recibir las consultas (no hace
   falta crear una cuenta, es un formulario simple).
2. Web3Forms te da una key (un código largo tipo `a1b2c3d4-...`).
3. Abrí `src/components/sections/Contacto.astro` y buscá esta línea (cerca
   del principio del `<form>`):
   ```astro
   <input type="hidden" name="access_key" value="REEMPLAZAR_CON_ACCESS_KEY" />
   ```
4. Reemplazá `REEMPLAZAR_CON_ACCESS_KEY` por la key real, entre las mismas
   comillas.
5. Guardá, hacé `git commit` + `git push` (o el paso equivalente de deploy).

**Esa key es pública a propósito** — Web3Forms está diseñado así: no es una
contraseña ni un secreto, y no pasa nada si queda visible en el código. La
protección contra spam la maneja Web3Forms del lado de su servidor (dominios
permitidos, límites de envío), más un campo "honeypot" que ya está armado en
el formulario.

Mientras `REEMPLAZAR_CON_ACCESS_KEY` siga como está, el formulario no va a
entregar los mensajes a ningún lado — es importante hacer este paso antes de
que el sitio quede en producción.

## Cómo hacer deploy

Este es un sitio 100% estático: `npm run build` genera una carpeta `dist/`
con HTML/CSS/JS ya armados, sin necesidad de un servidor con Node.js corriendo
en producción. Cualquier hosting de sitios estáticos sirve.

Las opciones más simples (nivel gratuito disponible en ambas, detectan Astro
automáticamente):

**Netlify** o **Vercel** — conectás el repositorio de GitHub desde el panel
del proveedor, y con la configuración por defecto alcanza:

- Comando de build: `npm run build`
- Carpeta de salida: `dist`

Cualquiera de los dos vuelve a hacer build solo cada vez que se sube un
cambio a la rama principal — no hace falta ningún paso manual después del
primer deploy.

**Importante después del primer deploy real:** el archivo `astro.config.mjs`
todavía tiene un dominio de ejemplo:

```js
site: 'https://www.asensiomartinez.com.ar', // TODO: reemplazar por el dominio real
```

Ese valor se usa para armar el sitemap, las URLs canónicas, los datos que lee
Google (JSON-LD) y las tarjetas de Open Graph. Hay que actualizarlo al dominio
real apenas se defina, y volver a hacer build/deploy.

## TODOs pendientes en el código

Además de las imágenes listadas en [ASSETS.md](ASSETS.md), quedan **17
comentarios `TODO`** repartidos por el código marcando datos o contenido que
el estudio tiene que confirmar antes de que el sitio esté listo para
producción. Agrupados por tema:

**Datos de contacto**

- Email del estudio: no se publica todavía (`src/data/site.ts`, dos TODOs).
  Una vez confirmado, se completa un solo campo y aparece automáticamente en
  el header, footer y donde haga falta.

**Dominio**

- `astro.config.mjs`: reemplazar el dominio de ejemplo por el real (afecta
  sitemap, canonical, robots.txt y Open Graph — todos se generan solos a
  partir de este valor).

**Formulario de contacto** (`src/components/sections/Contacto.astro`)

- Cargar la access key real de Web3Forms (ver sección de arriba).
- Sumar el email del estudio a la tarjeta de datos, cuando esté confirmado.
- Reemplazar el `<Placeholder />` del mapa por el iframe real de Google Maps
  (ya está escrito y comentado, listo para descomentar) cuando se confirme
  que se quiere embeber.

**Contenido de los socios** (`src/components/sections/Estudio.astro`,
`src/components/sections/Hero.astro`)

- Validar las bios de Esteban Asensio y Matías Martínez con el estudio.
- Confirmar las URLs de LinkedIn y el email de cada socio.
- Confirmar el número de matrícula del C.P.C.E. para la tarjeta del hero.

**Redes sociales** (`src/components/Footer.astro`)

- Confirmar las URLs reales de LinkedIn e Instagram del estudio (hoy están
  comentadas, no se muestran).

**Contenido legal** (`src/pages/politica-de-privacidad.astro`)

- El texto es una base genérica para no bloquear el desarrollo. Un asesor
  legal del estudio tiene que revisarlo y ajustarlo antes de publicar.

**Novedades** (los 3 artículos de ejemplo en `src/content/novedades/`)

- Los tres están marcados para revisar vigencia y precisión de los datos con
  el estudio antes de publicarlos — en particular la del Formulario 102/RT,
  que usa una nomenclatura hipotética y necesita confirmarse contra la
  normativa real vigente.

**Otros datos a confirmar**

- `PorQue.astro`: la cifra de "+150 clientes acompañados" es un placeholder,
  falta confirmarla con el estudio.
- `novedades/[...slug].astro`: falta un logo cuadrado (mínimo 112×112px) para
  completar el dato `publisher.logo` del structured data de cada nota — está
  pendiente del mismo logo real listado en [ASSETS.md](ASSETS.md).

Buscar `TODO` en el editor (o `grep -rn TODO src/`) encuentra los 17 puntos
exactos, con el detalle de cada uno en su contexto.

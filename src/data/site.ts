export interface NavItem {
  /** Texto visible en el nav */
  label: string;
  /** Destino: ancla dentro del home o ruta */
  href: string;
}

export interface SiteData {
  nombre: string;
  tagline: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  pais: string;
  /** Teléfono en formato legible para mostrar */
  telefono: string;
  /** Mismo teléfono en formato tel: para el atributo href */
  telefonoHref: string;
  /** WhatsApp en formato legible para mostrar */
  whatsapp: string;
  /** Link wa.me con mensaje pre-cargado */
  whatsappHref: string;
  /** TODO: el sitio actual no publica email. Completar cuando el estudio lo confirme. */
  email: string;
  /** Instagram del estudio */
  instagramHref: string;
  /** LinkedIn del estudio (página de empresa, no perfiles personales) */
  linkedinHref: string;
  horario: string;
  /** Año de fundación del estudio */
  fundacion: number;
  /** Frases cortas para pills de diferenciales (footer) */
  diferenciales: readonly string[];
  /** Nav central del header */
  nav: readonly NavItem[];
  /** Columna "Servicios" del footer */
  serviciosFooter: readonly NavItem[];
  /** Columna "Estudio" del footer */
  estudioFooter: readonly NavItem[];
}

/**
 * Número de WhatsApp en formato internacional, sin signos ni espacios.
 * Vive acá para que ningún componente arme un link wa.me a mano.
 */
const whatsappNumero = '5492215637666';

/** Arma un link de wa.me con el mensaje ya cargado en el chat. */
export function whatsappLink(mensaje: string): string {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

export const site: SiteData = {
  nombre: 'Asensio Martínez',
  tagline: 'Estudio contable en La Plata',
  direccion: 'Diagonal 76 nro. 482',
  ciudad: 'La Plata',
  provincia: 'Buenos Aires',
  pais: 'Argentina',
  telefono: '(0221) 483-4670',
  telefonoHref: 'tel:+542214834670',
  whatsapp: '(0221) 563-7666',
  whatsappHref: whatsappLink('Hola, quisiera hacer una consulta'),
  // TODO: el sitio actual no publica una dirección de email.
  // Cuando el estudio la confirme, completarla acá y los componentes la muestran solos.
  email: '',
  instagramHref: 'https://www.instagram.com/asensiomartinezestudio/',
  linkedinHref: 'https://www.linkedin.com/company/asensio-martinez-estudio/',
  horario: 'Lunes a viernes, 9 a 18 h',
  fundacion: 2007,
  diferenciales: [
    'Más de 15 años de trayectoria',
    'Atención personalizada',
    'Respuesta en menos de 24 h',
  ],
  // Todas las anclas van con "/" adelante (/#servicios, no #servicios):
  // Header y Footer son globales (están en TODAS las páginas vía
  // BaseLayout), así que un "#servicios" a secas sólo funciona parado en la
  // home. Con "/#servicios" el navegador primero va a la home y después
  // hace scroll a la sección, sin importar desde qué página se clickeó.
  nav: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Cómo trabajamos', href: '/#como-trabajamos' },
    { label: 'El estudio', href: '/#el-estudio' },
    { label: 'Novedades', href: '/#novedades' },
  ],
  // Los 4 ítems apuntan todos a la misma sección: los rubros de este listado
  // (impositivo/laboral/societario/auditoría) no tienen una sub-sección
  // propia en la home — la sección real agrupa por tipo de servicio
  // (asesoramiento, consultoría, gestión, desarrollos), no por este eje
  // temático. Antes apuntaban a anclas que nunca existieron (#servicios-
  // impositivo y compañía no eran el id de nada, en ninguna página).
  serviciosFooter: [
    { label: 'Impositivo y contable', href: '/#servicios-completos' },
    { label: 'Sueldos y liquidaciones', href: '/#servicios-completos' },
    { label: 'Constitución de sociedades', href: '/#servicios-completos' },
    { label: 'Auditoría y balances', href: '/#servicios-completos' },
  ],
  estudioFooter: [
    { label: 'Cómo trabajamos', href: '/#como-trabajamos' },
    { label: 'El estudio', href: '/#el-estudio' },
    { label: 'Novedades', href: '/#novedades' },
    { label: 'Preguntas frecuentes', href: '/#preguntas-frecuentes' },
  ],
};

/** Dirección completa en una línea, para JSON-LD y footer. */
export const direccionCompleta = `${site.direccion}, ${site.ciudad}, ${site.provincia}, ${site.pais}`;

export default site;

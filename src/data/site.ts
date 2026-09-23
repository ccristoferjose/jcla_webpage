/**
 * Datos del negocio. Este es el único archivo que hay que tocar cuando
 * cambia un teléfono, un horario o la zona de cobertura: de aquí se
 * alimentan el header, el footer, los CTA de WhatsApp y el JSON-LD.
 */

export const site = {
  name: "JC Atelier",
  tagline: "Servicio de Costura",

  /** Número en formato E.164 sin símbolos, que es lo que exige wa.me. */
  whatsapp: {
    raw: "50230407982",
    display: "3040-7982",
    displayIntl: "+502 3040-7982",
  },

  instagram: "jc_chitzan_",

  experienceYears: 30,
  homeService: true,

  /** TODO: ajustar al comprar el dominio definitivo. */
  domain: "jcatelier.com",
  get url() {
    return `https://${this.domain}`;
  },

  /** TODO: completar con la ubicación real en Guatemala. */
  location: {
    city: "San José Pinula",
    region: "Guatemala",
    country: "GT",
    countryName: "Guatemala",
    /** Zonas donde se presta servicio a domicilio. */
    serviceArea: ["San José Pinula", "Fraijanes", "Santa Catarina Pinula"],
  },

  /** TODO: confirmar horarios de atención en Guatemala. */
  hours: [
    { day: "monday", open: "08:00", close: "18:00" },
    { day: "tuesday", open: "08:00", close: "18:00" },
    { day: "wednesday", open: "08:00", close: "18:00" },
    { day: "thursday", open: "08:00", close: "18:00" },
    { day: "friday", open: "08:00", close: "18:00" },
    { day: "saturday", open: "08:00", close: "13:00" },
    { day: "sunday", open: null, close: null },
  ],

  analytics: {
    /** Propiedad heredada de J&C LA Studios. Cambiar si se crea una nueva. */
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-WSXRY7V3D6",
  },
} as const;

export type WeekDay = (typeof site.hours)[number]["day"];

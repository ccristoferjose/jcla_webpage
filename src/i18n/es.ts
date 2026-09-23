/**
 * Diccionario español. Es la fuente de verdad del contenido y define el
 * tipo `Dictionary`; `en.ts` se declara contra ese tipo, así que cualquier
 * clave faltante o sobrante en inglés falla en compilación.
 */
export const es = {
  meta: {
    home: {
      title: "JC Atelier | Alteraciones y confección a medida en Guatemala",
      description:
        "Taller de costura con más de 30 años de experiencia. Alteraciones, cambio de zippers, reducción de tallas, ruedos y confección a medida. Servicio a domicilio. Agenda tu fitting por WhatsApp.",
    },
    services: {
      title: "Servicios de costura | JC Atelier",
      description:
        "Alteraciones, cambio de zippers, reducción de tallas, ruedos a máquina y originales, y confección a medida. Agenda tu fitting por WhatsApp.",
    },
    gallery: {
      title: "Nuestro trabajo | JC Atelier",
      description:
        "Prendas confeccionadas y ajustadas a mano por JC Atelier: chaquetas, pantalones, camisas y patronaje. Más de 30 años de oficio.",
    },
    about: {
      title: "Sobre JC Atelier | Más de 30 años de oficio",
      description:
        "De los talleres de Los Ángeles a Guatemala. Conoce la historia y el método de trabajo de JC Atelier.",
    },
  },

  nav: {
    home: "Inicio",
    services: "Servicios",
    gallery: "Nuestro trabajo",
    about: "Nosotros",
    cta: "Agendar fitting",
    menu: "Menú",
    close: "Cerrar",
    openMenu: "Abrir menú de navegación",
    skipToContent: "Saltar al contenido",
  },

  hero: {
    eyebrow: "Servicio de costura · Guatemala",
    title: "Tu ropa, hecha a tu medida.",
    subtitle:
      "Más de 30 años de experiencia ajustando y confeccionando prendas. Alteraciones precisas y acabados profesionales para que cada prenda se adapte perfectamente a ti, conservando su estilo y apariencia original. Servicio a domicilio disponible con previa coordinación.",
    ctaPrimary: "Agendar mi fitting",
    ctaSecondary: "Ver servicios",
    imageAlt:
      "El sastre de JC Atelier ajustando un pantalón de mezclilla en su máquina, frente al muro de conos de hilo del taller",
  },

  trust: {
    experience: "años de oficio",
    homeService: "Servicio a domicilio",
    homeServiceNote: "Previa coordinación",
    whatsapp: "Respuesta por WhatsApp",
    whatsappNote: "Sin formularios ni esperas",
    handmade: "Hecho a mano",
    handmadeNote: "Pieza por pieza",
  },

  services: {
    eyebrow: "Qué hacemos",
    title: "Servicios",
    subtitle:
      "Desde un ruedo hasta una prenda completa. Si no ves lo que necesitas, pregúntanos por WhatsApp.",
    ctaCard: "Consultar por WhatsApp",
    items: {
      alteraciones: {
        title: "Alteraciones",
        short: "Ajustes que hacen que una prenda te quede como fue pensada.",
        description:
          "Entalles, mangas, hombros, cinturas y largos. Trabajamos sobre la prenda que ya tienes para que caiga como debe, respetando el corte y los acabados originales.",
        bullets: ["Entalle de cintura y costados", "Ajuste de mangas y hombros", "Corrección de caída y largo"],
      },
      zippers: {
        title: "Cambio de zippers",
        short: "Reemplazo de cierres en pantalones, chaquetas, vestidos y bolsos.",
        description:
          "Cambiamos el cierre completo buscando el color y el tipo más parecido al original, para que el arreglo no se note. Incluye cierres invisibles y de chaqueta.",
        bullets: ["Cierres invisibles", "Cierres de chaqueta y pantalón", "Bolsos y accesorios"],
      },
      tallas: {
        title: "Reducción de tallas",
        short: "Bajamos una prenda de talla sin perder su forma.",
        description:
          "Reducimos la prenda desde las costuras estructurales, no solo de los costados. El resultado mantiene las proporciones del diseño original en lugar de verse apretado.",
        bullets: ["Una o varias tallas", "Reconstrucción de costuras", "Se conserva la línea original"],
      },
      ruedos: {
        title: "Ruedos a máquina y originales",
        short: "Ruedos limpios, incluido el ruedo original en mezclilla.",
        description:
          "Hacemos el ruedo a máquina con el acabado que pida la prenda, y también el ruedo original: conservamos la costura y el desgaste de fábrica del jean al acortarlo.",
        bullets: ["Ruedo original en mezclilla", "Ruedo invisible", "Pantalón, falda y vestido"],
      },
      medida: {
        title: "Confección a medida",
        short: "Una prenda hecha desde cero con tu patrón.",
        description:
          "Desarrollamos el patrón a partir de tus medidas, una idea o una prenda de referencia, y confeccionamos la pieza completa. El proceso incluye pruebas de ajuste antes de la entrega.",
        bullets: ["Patrón propio a tus medidas", "Pruebas de ajuste incluidas", "Elección de telas y acabados"],
      },
    },
  },

  how: {
    eyebrow: "Cómo funciona",
    title: "Tres pasos y listo",
    subtitle: "Sin formularios largos ni visitas en balde. Empieza con un mensaje.",
    steps: [
      {
        title: "Escríbenos por WhatsApp",
        body: "Cuéntanos qué prenda es y qué necesitas. Si puedes, manda una foto: con eso te damos una idea de precio y tiempo el mismo día.",
      },
      {
        title: "Agenda tu fitting",
        body: "Coordinamos una cita para tomar medidas y ver la prenda puesta. Puede ser en el taller o a domicilio, si estás dentro del área de cobertura.",
      },
      {
        title: "Recibe tu prenda",
        body: "Hacemos el trabajo y te avisamos cuando esté lista. Si algo no cae como esperabas, lo ajustamos.",
      },
    ],
  },

  gallery: {
    eyebrow: "Portafolio",
    title: "Nuestro trabajo",
    subtitle:
      "Prendas desarrolladas y confeccionadas a lo largo de tres décadas de oficio, entre Los Ángeles y Guatemala.",
    cta: "Quiero algo así",
    viewAll: "Ver todo el trabajo",
    region: "Galería de trabajos",
    prev: "Ver trabajos anteriores",
    next: "Ver más trabajos",
    close: "Cerrar",
    scrollHint: "Desliza para ver más",
    zoom: (title: string) => `Ampliar: ${title}`,
    counter: (index: number, total: number) => `${index} de ${total}`,
  },

  about: {
    eyebrow: "Nosotros",
    title: "Treinta años haciendo que la ropa quede bien",
    lead: "JC Atelier nació del oficio, no de un catálogo.",
    body: [
      "Durante más de tres décadas trabajamos el patronaje, el desarrollo de muestras y la producción de prendas para marcas y diseñadores en Los Ángeles, California. Ese recorrido dejó algo que no se aprende rápido: entender por qué una prenda cae como cae, y saber dónde intervenirla sin arruinarla.",
      "Hoy ese mismo taller está en Guatemala y trabaja directo con las personas. La diferencia es que ahora la prenda que ajustamos es la tuya, y la medida que tomamos es la tuya.",
      "Cada trabajo pasa por las mismas manos de principio a fin. No mandamos piezas a terceros ni tercerizamos los acabados.",
    ],
    stats: {
      years: "años de experiencia",
      garments: "prendas trabajadas",
      handmade: "hecho en taller propio",
    },
    cta: "Conversemos por WhatsApp",
  },

  testimonials: {
    eyebrow: "Clientes",
    title: "Lo que dicen",
    empty: "Estamos reuniendo reseñas de nuestros clientes en Guatemala.",
  },

  faq: {
    eyebrow: "Preguntas",
    title: "Antes de escribirnos",
    items: [
      {
        q: "¿Cuánto cuesta un arreglo?",
        a: "Depende de la prenda y del trabajo. Un ruedo no cuesta lo mismo que reducir un saco dos tallas. Mándanos una foto por WhatsApp y te damos el precio antes de que vengas: no cobramos por cotizar.",
      },
      {
        q: "¿Cuánto tardan?",
        a: "La mayoría de las alteraciones sencillas salen entre dos y cuatro días. Una confección a medida toma más, porque lleva pruebas de ajuste. Te confirmamos la fecha cuando veamos la prenda.",
      },
      {
        q: "¿Cómo funciona el servicio a domicilio?",
        a: "Vamos a tu casa u oficina a tomar medidas y recoger la prenda, con cita previa. Está disponible dentro del área de cobertura; escríbenos con tu zona y te confirmamos.",
      },
      {
        q: "¿Qué llevo al fitting?",
        a: "La prenda, y los zapatos y la ropa interior con los que la vas a usar. Eso cambia el largo y la caída más de lo que parece, sobre todo en pantalón y vestido.",
      },
      {
        q: "¿Trabajan prendas que no compré con ustedes?",
        a: "Sí, es la mayor parte de lo que hacemos. Ajustamos ropa de cualquier procedencia, incluida ropa de segunda mano y prendas heredadas.",
      },
      {
        q: "¿Hacen confección a medida desde cero?",
        a: "Sí. Desarrollamos el patrón a partir de tus medidas, de una idea o de una prenda que te guste cómo queda, y confeccionamos la pieza completa.",
      },
    ],
  },

  fitting: {
    eyebrow: "Agenda tu cita",
    title: "Solicita tu fitting",
    subtitle:
      "Arma tu mensaje y te abrimos WhatsApp con todo escrito. Solo le das enviar.",
    serviceLabel: "¿Qué necesitas?",
    garmentLabel: "¿Qué prenda es?",
    modeLabel: "¿Dónde prefieres el fitting?",
    submit: "Abrir WhatsApp",
    note: "Te respondemos en horario de atención. No guardamos tus datos: el mensaje va directo a WhatsApp.",
    garments: [
      "Pantalón",
      "Jean",
      "Vestido",
      "Falda",
      "Camisa o blusa",
      "Saco o chaqueta",
      "Traje",
      "Otra prenda",
    ],
    modes: {
      studio: "En el taller",
      home: "A domicilio",
    },
  },

  finalCta: {
    eyebrow: "Empecemos",
    title: "¿Tienes una prenda que no te queda?",
    body: "Mándanos una foto por WhatsApp y te decimos si tiene arreglo, cuánto cuesta y en cuánto tiempo la tenemos lista.",
    button: "Escribir por WhatsApp",
    instagram: "Ver en Instagram",
  },

  contact: {
    title: "Contacto",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    hours: "Horario de atención",
    area: "Área de servicio a domicilio",
    closed: "Cerrado",
    days: {
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
    },
  },

  footer: {
    about:
      "Taller de costura en Guatemala. Alteraciones y confección a medida con más de 30 años de oficio.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },

  whatsapp: {
    /** El mensaje va en primera persona del cliente: convierte mucho mejor. */
    generic: "Hola JC Atelier, vi su sitio web y quiero hacerles una consulta.",
    fittingIntro: "Hola JC Atelier, quiero agendar un fitting.",
    serviceField: "Servicio",
    garmentField: "Prenda",
    modeField: "Modalidad",
    serviceInquiry: (service: string) =>
      `Hola JC Atelier, me interesa el servicio de ${service}. ¿Me pueden dar más información?`,
    galleryInquiry: "Hola JC Atelier, vi su portafolio y quiero algo parecido. ¿Podemos conversar?",
    ariaLabel: "Escribir a JC Atelier por WhatsApp",
  },

  locale: {
    switchTo: "English",
    switchLabel: "Cambiar idioma a inglés",
    current: "Español",
  },

  notFound: {
    title: "Esta página no existe",
    body: "El enlace que seguiste no lleva a ningún lado. Puedes volver al inicio o escribirnos directo.",
    home: "Ir al inicio",
  },
};

/**
 * Sin `as const` a propósito: así los strings se ensanchan a `string` y el
 * diccionario en inglés puede satisfacer el tipo con sus propios textos.
 */
export type Dictionary = typeof es;

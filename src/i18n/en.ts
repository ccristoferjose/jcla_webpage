import type { Dictionary } from "./es";

/** Traducción al inglés. Tipada contra `Dictionary`: si falta una clave, no compila. */
export const en: Dictionary = {
  meta: {
    home: {
      title: "JC Atelier | Alterations & custom tailoring in Guatemala",
      description:
        "Sewing workshop with over 30 years of experience. Alterations, zipper replacement, size reduction, hems and custom tailoring. Home service available. Book your fitting on WhatsApp.",
    },
    services: {
      title: "Tailoring services | JC Atelier",
      description:
        "Alterations, zipper replacement, size reduction, machine and original hems, and custom tailoring. Book your fitting on WhatsApp.",
    },
    gallery: {
      title: "Our work | JC Atelier",
      description:
        "Garments made and altered by hand at JC Atelier: jackets, trousers, shirts and pattern making. Over 30 years of craft.",
    },
    about: {
      title: "About JC Atelier | Over 30 years of craft",
      description:
        "From the workshops of Los Angeles to Guatemala. Learn the story and the working method behind JC Atelier.",
    },
  },

  nav: {
    home: "Home",
    services: "Services",
    gallery: "Our work",
    about: "About",
    cta: "Book a fitting",
    menu: "Menu",
    close: "Close",
    openMenu: "Open navigation menu",
    skipToContent: "Skip to content",
  },

  hero: {
    eyebrow: "Tailoring & alterations · Guatemala",
    title: "Clothes that actually fit you.",
    subtitle:
      "Over 30 years altering and making garments. Alterations you notice in how it fits, not in the stitching. Home service available by appointment.",
    ctaPrimary: "Book my fitting",
    ctaSecondary: "See services",
    imageAlt:
      "JC Atelier's tailor altering a pair of jeans at his machine, in front of the workshop's wall of thread cones",
  },

  trust: {
    experience: "years of craft",
    homeService: "Home service",
    homeServiceNote: "By appointment",
    whatsapp: "We reply on WhatsApp",
    whatsappNote: "No forms, no waiting",
    handmade: "Made by hand",
    handmadeNote: "One piece at a time",
  },

  services: {
    eyebrow: "What we do",
    title: "Services",
    subtitle:
      "From a simple hem to a full garment. If you don't see what you need, just ask on WhatsApp.",
    ctaCard: "Ask on WhatsApp",
    items: {
      alteraciones: {
        title: "Alterations",
        short: "Adjustments that make a garment fit the way it was designed to.",
        description:
          "Taking in, sleeves, shoulders, waists and lengths. We work on the garment you already own so it falls the way it should, respecting the original cut and finishes.",
        bullets: ["Waist and side adjustments", "Sleeve and shoulder fitting", "Drape and length correction"],
      },
      zippers: {
        title: "Zipper replacement",
        short: "New zippers for trousers, jackets, dresses and bags.",
        description:
          "We replace the full zipper, matching the colour and type as closely as possible to the original so the repair goes unnoticed. Invisible and jacket zippers included.",
        bullets: ["Invisible zippers", "Jacket and trouser zippers", "Bags and accessories"],
      },
      tallas: {
        title: "Size reduction",
        short: "We take a garment down a size without losing its shape.",
        description:
          "We reduce the garment from its structural seams, not just the sides. The result keeps the proportions of the original design instead of looking pulled tight.",
        bullets: ["One size or several", "Seams rebuilt properly", "Original silhouette preserved"],
      },
      ruedos: {
        title: "Machine & original hems",
        short: "Clean hems, including the original denim hem.",
        description:
          "We hem by machine with whatever finish the garment calls for, and we also do the original hem: keeping the factory stitching and fading on jeans while shortening them.",
        bullets: ["Original denim hem", "Blind hem", "Trousers, skirts and dresses"],
      },
      medida: {
        title: "Custom tailoring",
        short: "A garment built from scratch on your own pattern.",
        description:
          "We draft the pattern from your measurements, an idea or a reference garment, and make the complete piece. The process includes fitting sessions before delivery.",
        bullets: ["Pattern drafted to your measurements", "Fitting sessions included", "Fabric and finish selection"],
      },
    },
  },

  how: {
    eyebrow: "How it works",
    title: "Three steps and you're done",
    subtitle: "No long forms, no wasted trips. It starts with a message.",
    steps: [
      {
        title: "Message us on WhatsApp",
        body: "Tell us what the garment is and what you need. Send a photo if you can — that's usually enough for us to give you a price and a timeframe the same day.",
      },
      {
        title: "Book your fitting",
        body: "We set a time to take measurements and see the garment on you. Either at the workshop or at your place, if you're within our service area.",
      },
      {
        title: "Pick up your garment",
        body: "We do the work and let you know when it's ready. If anything doesn't sit the way you expected, we adjust it.",
      },
    ],
  },

  gallery: {
    eyebrow: "Portfolio",
    title: "Our work",
    subtitle:
      "Garments developed and made across three decades of craft, between Los Angeles and Guatemala.",
    cta: "I want something like this",
    viewAll: "See all our work",
    region: "Portfolio gallery",
    prev: "See previous pieces",
    next: "See more pieces",
    close: "Close",
    scrollHint: "Swipe to see more",
    zoom: (title: string) => `Enlarge: ${title}`,
    counter: (index: number, total: number) => `${index} of ${total}`,
  },

  about: {
    eyebrow: "About",
    title: "Thirty years making clothes fit right",
    lead: "JC Atelier came out of the craft, not out of a catalogue.",
    body: [
      "For over three decades we worked in pattern making, sample development and garment production for brands and designers in Los Angeles, California. That path left behind something you don't pick up quickly: understanding why a garment falls the way it does, and knowing where to cut into it without ruining it.",
      "Today that same workshop is in Guatemala and works directly with people. The difference is that now the garment we're altering is yours, and the measurements we take are yours.",
      "Every job passes through the same hands from start to finish. We don't send pieces out or subcontract the finishing.",
    ],
    stats: {
      years: "years of experience",
      garments: "garments worked on",
      handmade: "made in our own workshop",
    },
    cta: "Let's talk on WhatsApp",
  },

  testimonials: {
    eyebrow: "Clients",
    title: "What people say",
    empty: "We're gathering reviews from our clients in Guatemala.",
  },

  faq: {
    eyebrow: "Questions",
    title: "Before you write to us",
    items: [
      {
        q: "How much does an alteration cost?",
        a: "It depends on the garment and the work. A hem isn't the same as taking a blazer down two sizes. Send us a photo on WhatsApp and we'll quote you before you come in — quotes are free.",
      },
      {
        q: "How long does it take?",
        a: "Most simple alterations are ready in two to four days. Custom tailoring takes longer because it involves fitting sessions. We confirm the date once we've seen the garment.",
      },
      {
        q: "How does the home service work?",
        a: "We come to your home or office to take measurements and collect the garment, by appointment. It's available within our service area — message us with your area and we'll confirm.",
      },
      {
        q: "What should I bring to the fitting?",
        a: "The garment, plus the shoes and underwear you'll actually wear it with. Those change the length and the drape more than you'd think, especially on trousers and dresses.",
      },
      {
        q: "Do you work on garments I didn't buy from you?",
        a: "Yes — that's most of what we do. We alter clothing from any source, including second-hand and inherited pieces.",
      },
      {
        q: "Do you make garments from scratch?",
        a: "Yes. We draft the pattern from your measurements, from an idea, or from a garment you already like the fit of, and make the complete piece.",
      },
    ],
  },

  fitting: {
    eyebrow: "Book your appointment",
    title: "Request your fitting",
    subtitle: "Put your message together and we'll open WhatsApp with it written out. Just hit send.",
    serviceLabel: "What do you need?",
    garmentLabel: "What garment is it?",
    modeLabel: "Where would you like the fitting?",
    submit: "Open WhatsApp",
    note: "We reply during business hours. We don't store your details — the message goes straight to WhatsApp.",
    garments: [
      "Trousers",
      "Jeans",
      "Dress",
      "Skirt",
      "Shirt or blouse",
      "Blazer or jacket",
      "Suit",
      "Something else",
    ],
    modes: {
      studio: "At the workshop",
      home: "At my place",
    },
  },

  finalCta: {
    eyebrow: "Let's start",
    title: "Got something that doesn't fit?",
    body: "Send us a photo on WhatsApp and we'll tell you whether it can be fixed, what it costs, and how soon it'll be ready.",
    button: "Message us on WhatsApp",
    instagram: "See on Instagram",
  },

  contact: {
    title: "Contact",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    hours: "Business hours",
    area: "Home service area",
    closed: "Closed",
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
  },

  footer: {
    about:
      "Sewing workshop in Guatemala. Alterations and custom tailoring backed by more than 30 years of craft.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  whatsapp: {
    generic: "Hi JC Atelier, I saw your website and I'd like to ask you something.",
    fittingIntro: "Hi JC Atelier, I'd like to book a fitting.",
    serviceField: "Service",
    garmentField: "Garment",
    modeField: "Fitting",
    serviceInquiry: (service: string) =>
      `Hi JC Atelier, I'm interested in your ${service} service. Could you tell me more?`,
    galleryInquiry: "Hi JC Atelier, I saw your portfolio and I'd like something similar. Can we talk?",
    ariaLabel: "Message JC Atelier on WhatsApp",
  },

  locale: {
    switchTo: "Español",
    switchLabel: "Switch language to Spanish",
    current: "English",
  },

  notFound: {
    title: "This page doesn't exist",
    body: "The link you followed doesn't lead anywhere. You can head back home or message us directly.",
    home: "Go home",
  },
};

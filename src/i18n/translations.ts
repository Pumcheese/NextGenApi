export const languages = ["es", "en"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "es";

export const copy: Record<
  Language,
  {
    siteTitle: string;
    heroTitle: string;
    heroDescription: string;
    nav: { home: string; services: string; projects: string; contact: string; admin: string };
    contact: { title: string; submit: string };
  }
> = {
  es: {
    siteTitle: "NextGen IT Services",
    heroTitle: "Consultoría IT para empresas que quieren escalar",
    heroDescription:
      "Mostramos servicios, proyectos y captación de leads con una plataforma profesional en Astro.",
    nav: {
      home: "Inicio",
      services: "Servicios",
      projects: "Proyectos",
      contact: "Contacto",
      admin: "Admin",
    },
    contact: {
      title: "Cuéntanos tu necesidad",
      submit: "Enviar solicitud",
    },
  },
  en: {
    siteTitle: "NextGen IT Services",
    heroTitle: "IT consulting for companies ready to scale",
    heroDescription:
      "Showcase services, projects, and lead capture through a professional Astro platform.",
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      admin: "Admin",
    },
    contact: {
      title: "Tell us what you need",
      submit: "Send request",
    },
  },
};

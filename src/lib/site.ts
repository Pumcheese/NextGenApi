import type { Lang } from "./i18n";

type SiteCopy = {
  meta: {
    siteName: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    services: string;
    projects: string;
    contact: string;
    admin: string;
    contactCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  home: {
    valueTitle: string;
    valueText: string;
    metrics: { value: string; label: string }[];
    servicesTitle: string;
    servicesIntro: string;
    projectsTitle: string;
    projectsIntro: string;
    adminTitle: string;
    adminText: string;
  };
  services: {
    title: string;
    intro: string;
    ctaTitle: string;
    ctaText: string;
    cards: {
      title: string;
      description: string;
      bullets: string[];
    }[];
  };
  projects: {
    title: string;
    intro: string;
    ctaTitle: string;
    ctaText: string;
    cards: {
      client: string;
      sector: string;
      summary: string;
      highlights: string[];
    }[];
  };
  contact: {
    title: string;
    description: string;
    success: string;
    error: string;
    officeTitle: string;
    officeItems: string[];
    formTitle: string;
    formDescription: string;
  };
  footer: {
    title: string;
    text: string;
    linksTitle: string;
    adminTitle: string;
    adminText: string;
  };
  admin: {
    loginTitle: string;
    loginDescription: string;
    dashboardTitle: string;
    dashboardDescription: string;
    emptyState: string;
    passwordLabel: string;
    logoutLabel: string;
    totalLabel: string;
    statusLabel: string;
    saveStatusLabel: string;
    deleteLabel: string;
    deleteConfirm: string;
    loginPendingLabel: string;
    rateLimitError: string;
    contactRateLimitError: string;
    filtersTitle: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    resetFiltersLabel: string;
    allStatusesLabel: string;
    updateSuccess: string;
    deleteSuccess: string;
    filteredEmptyState: string;
  };
  form: {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    requestType: string;
    message: string;
    submit: string;
    submitPending: string;
    validationName: string;
    validationEmail: string;
    validationMessage: string;
    validationPhone: string;
    requestOptions: { value: string; label: string }[];
    serviceOptions: { value: string; label: string }[];
  };
  statusLabels: Record<"PENDING" | "REVIEWED" | "RESPONDED", string>;
};

export const siteCopy: Record<Lang, SiteCopy> = {
  es: {
    meta: {
      siteName: "NextGen IT Services",
      defaultDescription:
        "Consultora tecnologica especializada en modernizacion, infraestructura y servicios digitales para empresas.",
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      projects: "Proyectos",
      contact: "Contacto",
      admin: "Acceso privado",
      contactCta: "Hablar con un especialista",
    },
    hero: {
      eyebrow: "Consultoria IT para plataformas criticas",
      title: "Tecnologia empresarial para entornos donde fallar no es una opcion",
      description:
        "Acompañamos a organizaciones que necesitan modernizar sistemas, reforzar su infraestructura y avanzar con criterio en sus iniciativas digitales.",
      primaryCta: "Solicitar informacion",
      secondaryCta: "Ver casos de exito",
    },
    home: {
      valueTitle: "Enfoque claro, ejecucion solvente",
      valueText:
        "Trabajamos con equipos que necesitan una consultoria cercana, capacidades tecnicas solidas y una ejecucion orientada a resultados medibles.",
      metrics: [
        { value: "2", label: "Idiomas disponibles" },
        { value: "4", label: "Secciones publicas clave" },
        { value: "1", label: "Panel privado de administracion" },
      ],
      servicesTitle: "Capacidades principales",
      servicesIntro:
        "Diseñamos soluciones realistas para organizaciones que necesitan evolucionar su tecnologia sin comprometer continuidad, seguridad ni capacidad operativa.",
      projectsTitle: "Experiencia aplicada",
      projectsIntro:
        "Nuestra experiencia combina contexto sectorial, rigor tecnico y foco en impacto para negocio en cada iniciativa.",
      adminTitle: "Seguimiento interno",
      adminText:
        "Centralizamos solicitudes y consultas para dar respuesta con orden, visibilidad y trazabilidad en cada oportunidad comercial.",
    },
    services: {
      title: "Servicios IT orientados a continuidad, evolucion y rendimiento",
      intro:
        "Ofrecemos servicios enfocados en resolver retos concretos de arquitectura, operacion y transformacion digital con una aproximacion pragmatica.",
      ctaTitle: "¿Necesitas una propuesta a medida?",
      ctaText:
        "Te ayudamos a aterrizar el alcance, priorizar necesidades y definir el mejor punto de partida.",
      cards: [
        {
          title: "Modernizacion de plataformas",
          description:
            "Evolucion de sistemas heredados, simplificacion arquitectonica y mejora del ciclo de vida de aplicaciones criticas.",
          bullets: [
            "Refactorizacion progresiva de entornos legacy",
            "Planes de migracion a cloud y modernizacion",
            "Estandarizacion y gobierno tecnico",
          ],
        },
        {
          title: "Infraestructura y cloud",
          description:
            "Diseño de plataformas resilientes, observables y alineadas con necesidades reales de disponibilidad y crecimiento.",
          bullets: [
            "Arquitecturas cloud preparadas para escalar",
            "Automatizacion de despliegues y operaciones",
            "Rendimiento, observabilidad y continuidad",
          ],
        },
        {
          title: "Consultoria de datos y rendimiento",
          description:
            "Analisis tecnico, estructura de datos y optimizacion de acceso a informacion para mejorar decisiones y eficiencia operativa.",
          bullets: [
            "Modelado relacional claro y mantenible",
            "Consultas eficientes para operaciones internas",
            "Procesos trazables y mejor organizados",
          ],
        },
      ],
    },
    projects: {
      title: "Casos de exito con foco en negocio y operacion",
      intro:
        "Cada proyecto refleja una forma de trabajar basada en analisis, ejecucion y resultados sostenibles para equipos exigentes.",
      ctaTitle: "¿Quieres revisar un caso parecido al tuyo?",
      ctaText:
        "Podemos analizar tu contexto y orientarte sobre la mejor aproximacion tecnica y operativa.",
      cards: [
        {
          client: "Banco Atlas",
          sector: "Banca",
          summary:
            "Rediseño de servicios internos para mejorar estabilidad operativa, capacidad de respuesta y control sobre procesos criticos.",
          highlights: ["Arquitectura critica", "Disponibilidad", "Operacion"],
        },
        {
          client: "Nova Seguros",
          sector: "Seguros",
          summary:
            "Implantacion de una plataforma corporativa para captar oportunidades, ordenar solicitudes y mejorar la relacion con clientes.",
          highlights: ["Captacion", "Bilingue", "Seguimiento"],
        },
        {
          client: "MetalWorks Iberia",
          sector: "Industria",
          summary:
            "Estandarizacion de procesos digitales y mejora de la comunicacion con clientes mediante flujos mas claros y centralizados.",
          highlights: ["Procesos", "Datos", "Seguimiento"],
        },
      ],
    },
    contact: {
      title: "Hablemos de tu proximo reto tecnologico",
      description:
        "Cuéntanos el contexto, el objetivo y el punto en el que se encuentra tu iniciativa. Te responderemos con una orientacion clara y realista.",
      success:
        "Hemos recibido tu solicitud correctamente. Nuestro equipo la revisara y contactara contigo lo antes posible.",
      error:
        "No hemos podido enviar tu solicitud. Revisa los campos obligatorios e intentalo de nuevo.",
      officeTitle: "Datos de contacto",
      officeItems: [
        "Madrid, Espana",
        "contacto@nextgenitservices.com",
        "+34 910 000 000",
      ],
      formTitle: "Cuéntanos tu necesidad",
      formDescription:
        "Recogemos la informacion esencial para entender tu necesidad, priorizar correctamente la consulta y darte una respuesta util.",
    },
    footer: {
      title: "NextGen IT Services",
      text:
        "Acompañamos a empresas en sus procesos de modernizacion tecnologica, mejora operativa y evolucion digital.",
      linksTitle: "Navegacion",
      adminTitle: "Zona privada",
      adminText: "Acceso reservado para el equipo interno de gestion y seguimiento.",
    },
    admin: {
      loginTitle: "Acceso al area privada",
      loginDescription:
        "Esta zona esta destinada exclusivamente al equipo interno encargado de revisar y gestionar las solicitudes recibidas.",
      dashboardTitle: "Panel de administracion",
      dashboardDescription:
        "Consulta las solicitudes entrantes, revisa su contexto y actualiza su estado para mantener un seguimiento ordenado.",
      emptyState: "No hay solicitudes registradas todavia.",
      passwordLabel: "Contraseña",
      logoutLabel: "Cerrar sesion",
      totalLabel: "Total",
      statusLabel: "Estado",
      saveStatusLabel: "Guardar cambios",
      deleteLabel: "Eliminar solicitud",
      deleteConfirm: "Esta accion eliminara la solicitud de forma permanente. Deseas continuar?",
      loginPendingLabel: "Accediendo...",
      rateLimitError: "Has superado el numero de intentos permitidos. Espera unos minutos antes de volver a intentarlo.",
      contactRateLimitError: "Has enviado demasiadas solicitudes en poco tiempo. Espera unos minutos antes de volver a intentarlo.",
      filtersTitle: "Filtros y busqueda",
      searchLabel: "Buscar",
      searchPlaceholder: "Nombre, correo o empresa",
      searchButton: "Aplicar filtros",
      resetFiltersLabel: "Limpiar filtros",
      allStatusesLabel: "Todos los estados",
      updateSuccess: "El estado de la solicitud se ha actualizado correctamente.",
      deleteSuccess: "La solicitud se ha eliminado correctamente.",
      filteredEmptyState: "No hay solicitudes que coincidan con los filtros actuales.",
    },
    form: {
      name: "Nombre completo",
      company: "Empresa",
      email: "Correo electronico",
      phone: "Telefono",
      service: "Servicio de interes",
      requestType: "Tipo de solicitud",
      message: "Mensaje",
      submit: "Enviar mensaje",
      submitPending: "Enviando...",
      validationName: "Introduce al menos 2 caracteres.",
      validationEmail: "Introduce un correo electronico valido.",
      validationMessage: "Escribe un mensaje de al menos 12 caracteres.",
      validationPhone: "Utiliza solo numeros, espacios, +, - o parentesis.",
      requestOptions: [
        { value: "informacion", label: "Solicitud de informacion" },
        { value: "presupuesto", label: "Solicitud de presupuesto" },
        { value: "reunion", label: "Solicitud de reunion" },
      ],
      serviceOptions: [
        { value: "Modernizacion de plataformas", label: "Modernizacion de plataformas" },
        { value: "Infraestructura y cloud", label: "Infraestructura y cloud" },
        {
          value: "Consultoria de datos y rendimiento",
          label: "Consultoria de datos y rendimiento",
        },
      ],
    },
    statusLabels: {
      PENDING: "Pendiente",
      REVIEWED: "Revisado",
      RESPONDED: "Respondido",
    },
  },
  en: {
    meta: {
      siteName: "NextGen IT Services",
      defaultDescription:
        "Technology consultancy specialized in modernization, infrastructure and digital services for companies.",
    },
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      admin: "Private access",
      contactCta: "Talk to a specialist",
    },
    hero: {
      eyebrow: "IT consulting for critical platforms",
      title: "Enterprise technology for environments where failure is not an option",
      description:
        "We support organizations that need to modernize systems, strengthen infrastructure and move forward with clarity in their digital initiatives.",
      primaryCta: "Request information",
      secondaryCta: "See case studies",
    },
    home: {
      valueTitle: "Clear focus, reliable execution",
      valueText:
        "We work with teams that need a close consulting partner, strong technical capabilities and delivery focused on measurable outcomes.",
      metrics: [
        { value: "2", label: "Available languages" },
        { value: "4", label: "Core public sections" },
        { value: "1", label: "Private admin dashboard" },
      ],
      servicesTitle: "Core capabilities",
      servicesIntro:
        "We design realistic solutions for organizations that need to evolve their technology without compromising continuity, security or operating capacity.",
      projectsTitle: "Applied experience",
      projectsIntro:
        "Our experience combines sector context, technical rigor and business impact across every initiative.",
      adminTitle: "Internal follow-up",
      adminText:
        "We centralize incoming requests and inquiries to respond with structure, visibility and traceability.",
    },
    services: {
      title: "IT services focused on continuity, evolution and performance",
      intro:
        "Our services are designed to solve concrete architecture, operations and digital transformation challenges with a pragmatic approach.",
      ctaTitle: "Need a tailored proposal?",
      ctaText:
        "We can help define the scope, prioritize needs and shape the right starting point.",
      cards: [
        {
          title: "Platform modernization",
          description:
            "Legacy system evolution, architectural simplification and lifecycle improvement for business-critical applications.",
          bullets: [
            "Incremental legacy modernization",
            "Cloud migration and evolution plans",
            "Technical governance and standards",
          ],
        },
        {
          title: "Infrastructure and cloud",
          description:
            "Design of resilient, observable platforms aligned with real availability and growth needs.",
          bullets: [
            "Cloud-ready architectures built to scale",
            "Deployment and operations automation",
            "Performance, observability and continuity",
          ],
        },
        {
          title: "Data and performance consulting",
          description:
            "Technical analysis, data structuring and information access optimization to improve operational efficiency.",
          bullets: [
            "Clear and maintainable relational modeling",
            "Efficient queries for internal operations",
            "Traceable and better organized workflows",
          ],
        },
      ],
    },
    projects: {
      title: "Success stories with a business and operations focus",
      intro:
        "Each project reflects a way of working based on analysis, execution and sustainable outcomes for demanding teams.",
      ctaTitle: "Want to review a case similar to yours?",
      ctaText:
        "We can assess your context and guide you toward the most suitable technical and operational approach.",
      cards: [
        {
          client: "Atlas Bank",
          sector: "Banking",
          summary:
            "Redesigned internal service layers to improve operational stability, responsiveness and control over critical processes.",
          highlights: ["Critical architecture", "Availability", "Operations"],
        },
        {
          client: "Nova Insurance",
          sector: "Insurance",
          summary:
            "Delivered a corporate platform to capture opportunities, organize requests and improve client relationships.",
          highlights: ["Lead capture", "Bilingual", "Follow-up"],
        },
        {
          client: "MetalWorks Iberia",
          sector: "Industry",
          summary:
            "Standardized digital processes and improved client communication through clearer, more centralized workflows.",
          highlights: ["Processes", "Data", "Follow-up"],
        },
      ],
    },
    contact: {
      title: "Let's talk about your next technology challenge",
      description:
        "Tell us about the context, the goal and the current stage of your initiative. We will respond with clear and realistic guidance.",
      success:
        "Your request has been received successfully. Our team will review it and get back to you shortly.",
      error:
        "We could not send your request. Please review the required fields and try again.",
      officeTitle: "Contact details",
      officeItems: [
        "Madrid, Spain",
        "contact@nextgenitservices.com",
        "+34 910 000 000",
      ],
      formTitle: "Tell us about your need",
      formDescription:
        "We only collect the essential information needed to understand your request, prioritize it correctly and respond usefully.",
    },
    footer: {
      title: "NextGen IT Services",
      text:
        "We help companies move forward in technology modernization, operational improvement and digital evolution.",
      linksTitle: "Navigation",
      adminTitle: "Private area",
      adminText: "Reserved access for the internal team responsible for review and follow-up.",
    },
    admin: {
      loginTitle: "Private area access",
      loginDescription:
        "This area is intended exclusively for the internal team responsible for reviewing and managing incoming requests.",
      dashboardTitle: "Administration dashboard",
      dashboardDescription:
        "Review incoming requests, understand their context and update their status to maintain an organized workflow.",
      emptyState: "There are no stored requests yet.",
      passwordLabel: "Password",
      logoutLabel: "Sign out",
      totalLabel: "Total",
      statusLabel: "Status",
      saveStatusLabel: "Save changes",
      deleteLabel: "Delete request",
      deleteConfirm: "This action will permanently delete the request. Do you want to continue?",
      loginPendingLabel: "Signing in...",
      rateLimitError: "You have reached the maximum number of attempts. Please wait a few minutes before trying again.",
      contactRateLimitError: "You have sent too many requests in a short period. Please wait a few minutes before trying again.",
      filtersTitle: "Filters and search",
      searchLabel: "Search",
      searchPlaceholder: "Name, email or company",
      searchButton: "Apply filters",
      resetFiltersLabel: "Clear filters",
      allStatusesLabel: "All statuses",
      updateSuccess: "The request status has been updated successfully.",
      deleteSuccess: "The request has been deleted successfully.",
      filteredEmptyState: "There are no requests matching the current filters.",
    },
    form: {
      name: "Full name",
      company: "Company",
      email: "Email address",
      phone: "Phone",
      service: "Service of interest",
      requestType: "Request type",
      message: "Message",
      submit: "Send message",
      submitPending: "Sending...",
      validationName: "Please enter at least 2 characters.",
      validationEmail: "Please enter a valid email address.",
      validationMessage: "Please enter at least 12 characters.",
      validationPhone: "Use only numbers, spaces, +, - or parentheses.",
      requestOptions: [
        { value: "information", label: "Information request" },
        { value: "quote", label: "Quote request" },
        { value: "meeting", label: "Meeting request" },
      ],
      serviceOptions: [
        { value: "Platform modernization", label: "Platform modernization" },
        { value: "Infrastructure and cloud", label: "Infrastructure and cloud" },
        {
          value: "Data and performance consulting",
          label: "Data and performance consulting",
        },
      ],
    },
    statusLabels: {
      PENDING: "Pending",
      REVIEWED: "Reviewed",
      RESPONDED: "Responded",
    },
  },
};

export function getSiteCopy(lang: Lang) {
  return siteCopy[lang];
}

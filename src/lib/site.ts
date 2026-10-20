// Coordonnées : à confirmer par le cabinet. Laisser vide tant qu'elles ne sont pas validées.
export const contact = {
  phone: "", // ex. "+212 6 .. .. .. .."
  whatsapp: "", // numéro au format international sans + ni espaces
  email: "",
  city: "Casablanca, Maroc",
};

export const nav = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/permis-de-construire", label: "Permis de construire" },
  { to: "/videos", label: "Vidéos" },
  { to: "/virement", label: "Virement" },
  { to: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "conception-architecturale",
    title: "Conception architecturale",
    short: "Villas, bâtiments, aménagements",
    intro:
      "De l'esquisse à l'avant-projet, nous traduisons vos besoins, votre terrain et votre budget en une architecture cohérente, fonctionnelle et durable.",
    points: ["Analyse du programme et du site", "Esquisses et avant-projet", "Volumétrie et façades", "Respect des règles d'urbanisme"],
  },
  {
    slug: "plans-architecturaux",
    title: "Plans architecturaux",
    short: "Plans d'exécution et plans techniques",
    intro:
      "Des plans précis et complets pour l'autorisation et pour le chantier : plans, coupes, façades et détails techniques.",
    points: ["Plans d'autorisation", "Plans d'exécution", "Coupes et façades", "Détails techniques"],
  },
  {
    slug: "permis-de-construire",
    title: "Autorisations de construire",
    short: "Accompagnement et suivi des démarches",
    intro:
      "Nous préparons et suivons votre demande d'autorisation de construire auprès des services compétents, jusqu'à son obtention.",
    points: ["Vérification préalable du terrain", "Préparation du dossier", "Dépôt de la demande", "Suivi des observations"],
  },
  {
    slug: "dossiers-administratifs",
    title: "Dossiers administratifs",
    short: "Montage et dépôt de dossier",
    intro:
      "Constitution rigoureuse des pièces administratives et techniques nécessaires à votre projet, pour des démarches sereines.",
    points: ["Inventaire des pièces requises", "Coordination avec les intervenants", "Montage du dossier", "Dépôt et suivi"],
  },
  {
    slug: "suivi-de-chantier",
    title: "Suivi de chantier",
    short: "Contrôle et coordination des travaux",
    intro:
      "Présence et contrôle sur le chantier pour garantir la conformité des travaux aux plans, dans le respect des délais.",
    points: ["Visites de chantier", "Coordination des entreprises", "Contrôle de conformité", "Réception des travaux"],
  },
  {
    slug: "projets-residentiels-industriels",
    title: "Résidentiel & industriel",
    short: "Villas, immeubles, bâtiments industriels",
    intro:
      "Une expérience couvrant l'habitat individuel, les immeubles résidentiels et les bâtiments à usage industriel.",
    points: ["Villas contemporaines", "Immeubles résidentiels", "Bâtiments industriels", "Extensions et réaménagements"],
  },
];

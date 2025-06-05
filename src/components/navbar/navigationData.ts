
export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const navigationSections: NavigationSection[] = [
  {
    title: "Événement",
    items: [
      {
        title: "À propos",
        href: "/about",
        description: "Découvrez HackaZZon et ses objectifs"
      },
      {
        title: "Programme",
        href: "/schedule",
        description: "Planning détaillé de l'événement"
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Questions fréquemment posées"
      }
    ]
  },
  {
    title: "Projets",
    items: [
      {
        title: "Présentations",
        href: "/presentations",
        description: "Découvrez les projets présentés"
      },
      {
        title: "Soumettre",
        href: "/submission",
        description: "Soumettez votre projet"
      }
    ]
  },
  {
    title: "Partenaires",
    items: [
      {
        title: "Sponsors",
        href: "/sponsors",
        description: "Nos sponsors et partenaires"
      },
      {
        title: "Prix",
        href: "/prizes",
        description: "Récompenses et prix à gagner"
      }
    ]
  },
  {
    title: "Support",
    items: [
      {
        title: "Organisateurs",
        href: "/mentors",
        description: "Rencontrez nos organisateurs experts"
      },
      {
        title: "Jury",
        href: "/jury",
        description: "Découvrez notre jury d'experts"
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Contactez l'équipe organisatrice"
      }
    ]
  }
];

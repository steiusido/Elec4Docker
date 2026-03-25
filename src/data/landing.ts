export const landingPageData = {
  hero: {
    eyebrow: "LANDING PAGE • HERO SECTION",
    title: "Bulacan State University\nCollege of Engineering",
    primaryButtonLabel: "Enter Department Pages",
    primaryButtonHref: "/departments",
  },
  sections: {
    missionVision: {
      id: "mission-vision",
      title: "Mission & Vision",
      assignedGroup: "Roxas, Aiam Airron L",
      statusLabel: "RESERVED SECTION",
      missionText: "Placeholder mission statement.",
      visionText: "Placeholder vision statement.",
    },
    departmentGrid: {
      id: "department-grid",
      title: "Department Grid",
      assignedGroup: "Pagdanganan, Arviella S",
      statusLabel: "RESERVED SECTION",
      introText: "Placeholder description for department grid section.",
    },
    news: {
      id: "news",
      title: "COE NEWS",
      assignedGroup: "Dela Cruz, Richter Vhon C",
      statusLabel: "RESERVED SECTION",
      backgroundImage: "/images/news/news-bg.png",
      overlayImage: "/images/news/news-overlay.png",

      items: [
        {
          image: "/images/news/featured-image.png",
          label: "RECENT",
          author: {
            name: "Bong Lozada",
            avatar: "/images/news/featured-image.png",
          },
          date: "March 5, 2026",
          title: "Placeholder News 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/news/news-bg.png",
          label: "RECENT",
          author: {
            name: "Bong Lozada",
            avatar: "/images/news/news-bg.png",
          },
          date: "March 25, 2026",
          title: "Placeholder News 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/news/news-bg.png",
          label: "RECENT",
          author: {
            name: "Bong Lozada",
            avatar: "/images/news/featured-image.png",
          },
          date: "February 5, 2026",
          title: "Fourth to the Last News Placeholder",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/news/featured-image.png",
          label: "RECENT",
          author: {
            name: "Bong Lozada",
            avatar: "/images/news/featured-image.png",
          },
          date: "January 5, 2026",
          title: "Third to the Last News Placeholder",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/news/news-bg.png",
          label: "RECENT",
          author: {
            name: "Bong Lozada",
            avatar: "/images/news/news-bg.png",
          },
          date: "December 5, 2025",
          title: "Second to the Last News Placeholder",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          image: "/images/news/news-bg.png",
          label: "RECENT",
          author: {
            name: "Bong Lozada",
            avatar: "/images/news/featured-image.png",
          },
          date: "March 5, 2022",
          title: "Latest / Last News Placeholder",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
    },
    facilities: {
      id: "facilities",
      title: "Facilities",
      assignedGroup: "Jones, Colleen Iris P",
      statusLabel: "RESERVED SECTION",
      highlights: ["Placeholder Facility 1", "Placeholder Facility 2"],
    },
    statistics: {
      id: "statistics",
      title: "Statistics",
      assignedGroup: "Pascual, Alyssa S.",
      statusLabel: "RESERVED SECTION",
      stats: [
        { label: "Programs", value: "8" },
        { label: "Students", value: "0" },
      ],
    },
    contact: {
      id: "contact",
      title: "Contact",
      assignedGroup: "Pagayunan, Lhara Mei R",
      statusLabel: "RESERVED SECTION",
      email: "coe@example.edu",
      phone: "+63 000 000 0000",
      address: "Bulacan State University",
    },
    footer: {
      id: "footer",
      title: "Footer",
      assignedGroup: "Villareal, Trisha Mae",
      statusLabel: "RESERVED SECTION",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Contact", href: "#contact" },
      ],
    },
  },
};

export type LandingPageData = typeof landingPageData;

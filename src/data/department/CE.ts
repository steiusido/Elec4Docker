const base = "/departments/CE"; // public folder path

export const CE = {
  code: "CE",
  title: "CIVIL ENGINEERING",
  subtitle: "Bachelor of Science in",

  theme: { accentHex: "#1F3A4D", primaryGold: "#D4AF37" },

  images: {
    heroBig: `${base}/hero-big.png`,
    heroLeft: `${base}/hero-left.png`,
    heroSmall1: `${base}/hero-small-1.png`,
    heroSmall2: `${base}/hero-small-2.png`,
    heroCarousel: [
      `${base}/hero-big.png`,
      `${base}/hero-left.png`,
      `${base}/hero-small-1.png`,
      `${base}/hero-small-2.png`,
    ],
    peo: `${base}/peo.png`,
    watermark: `${base}/watermark.png`,
  },

  programOverview: {
    heading: "Program Overview",
    subheading: "Pioneering the Future of Infrastructure",
    text: "The Civil Engineering program provides students with a solid foundation in the principles of mathematics, science, and engineering. Our curriculum is designed to prepare graduates for professional practice and advanced studies in various fields of civil engineering, including structural, geotechnical, water resources, transportation, and environmental engineering.",
    stats: { nonTeaching: 11, faculty: 22, students: 333 },
  },

  peo: {
    eyebrow: "MISSION ORIENTED",
    title: "Program Educational Objectives",
    subtitle: "The graduates of the Civil Engineering program are expected to achieve the following within a few years of graduation:",
    bullets: [
      "Demonstrate proficiency in the application of civil engineering principles to solve complex engineering problems.",
      "Exhibit leadership and professionalism in their chosen career paths.",
      "Engage in lifelong learning and professional development to keep pace with the advancements in the field.",
    ],
  },

  so: {
    eyebrow: "COMPETENCIES",
    title: "Student Outcomes",
    subtitle: "By the time of graduation, the students of the Civil Engineering program shall have the ability to:",
    outcomes: [
      { title: "SO 1", text: "Apply knowledge of mathematics, science, and engineering fundamentals." },
      { title: "SO 2", text: "Design and conduct experiments, as well as analyze and interpret data." },
      { title: "SO 3", text: "Design a system, component, or process to meet desired needs within realistic constraints." },
      { title: "SO 4", text: "Function effectively on multi-disciplinary teams." },
      { title: "SO 5", text: "Identify, formulate, and solve engineering problems." },
      { title: "SO 6", text: "Understand professional and ethical responsibility." },
    ],
  },

  curriculumOverview: {
    eyebrow: "LEARNING PATH",
    title: "Curriculum Overview",
    text: "Our curriculum is structured to provide a balance between theoretical knowledge and practical application. It includes core engineering courses, specialized electives, and hands-on laboratory experiences.",
    bullets: [
      "Strong foundation in Mathematics and Basic Sciences",
      "Comprehensive Core Civil Engineering Courses",
      "Specialized Electives in Various Tracks",
      "Integration of Design and Research Projects",
    ],
  },

  programCurriculum: {
    eyebrow: "ACADEMIC MAP",
    title: "Program Curriculum",
    years: [
      { year: "First Year", semesters: ["1st Semester", "2nd Semester"] },
      { year: "Second Year", semesters: ["1st Semester", "2nd Semester"] },
      { year: "Third Year", semesters: ["1st Semester", "2nd Semester"] },
      { year: "Fourth Year", semesters: ["1st Semester", "2nd Semester"] },
    ],
  },

  laboratories: {
    eyebrow: "RESOURCES",
    title: "Laboratories",
    description: "Empowering students through advanced experimental learning and cutting-edge research environments.",
    items: ["Materials Testing Lab", "Geotechnical Engineering Lab", "Hydraulics and Water Resources Lab", "Surveying and Geomatics Lab"],
  },

  faculty: {
    eyebrow: "LEADERSHIP",
    title: "Faculty",
    members: [
      { name: "Engr. Sample 1", role: "Chair" },
      { name: "Engr. Sample 2", role: "Faculty" },
    ],
  },

  careers: {
    eyebrow: "FUTURE PATHS",
    title: "Career Opportunities",
    subtitle: "EDIT ME: careers subtitle.",
    cards: [
      { icon: "🏗️", title: "Site Engineer", text: "Description..." },
      { icon: "📐", title: "Structural Engineer", text: "Description..." },
      { icon: "🌉", title: "Project Engineer", text: "Description..." },
    ],
  },
};

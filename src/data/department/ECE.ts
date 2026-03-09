const base = "/departments/ECE";


const facultyMembers = [
  { name: "Engr. Donald M. Lapiguera", role: "Department Chair" },
  { name: "Engr. Mervin E. Albalate", role: "Faculty" },
  { name: "Dr. Russell N. Alfonso, PECE, ASEAN Engr.", role: "Faculty" },
  { name: "Engr. Hilario A. Calinao Jr.", role: "Faculty" },
  { name: "Engr. Jeffrey V. Cayetano", role: "Faculty" },
  { name: "Engr. Jenette C. Centeno", role: "Faculty" },
  { name: "Engr. Patrick John Z. Dayrit, PECE", role: "Faculty" },
  { name: "Engr. Dennis R. Dela Cruz", role: "Faculty" },
  { name: "Engr. Christian Fajardo, PECE, ASEAN Engr.", role: "Faculty" },
  { name: "Dr. Reagan L. Galvez, PECE", role: "Faculty" },
  { name: "Engr. Richard R. Garcia, PECE, ASEAN, ACPE, APEC Engr.", role: "Faculty" },
  { name: "Engr. Nemuel Norman F. Giron", role: "Faculty" },
  { name: "Engr. Albert Ian R. Javier", role: "Faculty" },
  { name: "Engr. Nasher G. Jimenez, PECE", role: "Faculty" },
  { name: "Engr. Amor A. Lacara", role: "Faculty" },
  { name: "Dr. Marlon C. Leyesa, PECE", role: "Faculty" },
  { name: "Prof. Oliver R. Mariano, PECE, ASEAN Engr.", role: "Faculty" },
  { name: "Engr. Dion Michael Mendoza", role: "Faculty" },
  { name: "Prof. Bernardo M. Pangilinan, PECE, ACPE", role: "Faculty" },
  { name: "Engr. Rannie D.S. Salvador", role: "Faculty" },
  { name: "Engr. Evangelyn C. Samson", role: "Faculty" },
  { name: "Engr. Benjamin L. Santa Maria Jr.", role: "Faculty" },
  { name: "Engr. Paul Ryan A. Santiago", role: "Faculty" },
  { name: "Engr. Rina S.P. Santiago", role: "Faculty" },
];

export const ECE = {
  code: "ECE",
  title: "ELECTRONICS ENGINEERING",
  subtitle: "Bachelor of Science in Electronics Engineering",

  theme: { accentHex: "#0ea5e9" },

  images: {
    heroLeft: `${base}/hero-left.jpg`,
    heroBig: `${base}/hero-big.jpg`,
    heroSmall1: `${base}/hero-small-1.jpg`,
    heroSmall2: `${base}/hero-small-2.jpg`,
    peo: `${base}/peo.jpg`,
    watermark: `${base}/watermark.png`,
  },


  peo: {
    title: "Program Educational Objectives (PEO)",
    subtitle: "BulSU Electronics Engineering graduates are expected to apply technical competence, continue growing professionally, and contribute responsibly to industry and society.",
    bullets: ["Graduates are industry-competent Electronics Engineer practitioner continually developing their technical skills across disciplines in Electronics Engineering.",
      "Contributes significant and innovative solutions that support national development applying the principles and professional skills of Electronics Engineering.",
      "Graduates are competitive leaders with sense of professional responsibility, social awareness and ethical values."],
  },

  so: {
    title: "Student Outcomes (SO)",
    subtitle: "Edit SO subtitle here.",
    outcomes: [
      { title: "SO 1", text: "Description..." },
      { title: "SO 2", text: "Description..." },
      { title: "SO 3", text: "Description..." },
    ],
  },

  curriculum: {
    title: "Curriculum Overview",
    text: "Edit curriculum overview paragraph here.",
    bullets: ["Bullet 1", "Bullet 2", "Bullet 3"],
  },

  laboratories: {
    title: "Laboratories",
    items: ["Lab 1", "Lab 2", "Lab 3"],
  },

  faculty: {
    title: "Faculty",
    members: facultyMembers,  // Use the const
  },

  programOverview: {
    heading: "Program Overview",
    text: "Edit this Program Overview text for this department.",
    stats: { nonTeaching: 0, faculty: facultyMembers.length, students: 0 },
  },
  careers: {
    title: "Career Opportunities",
    subtitle: "Edit careers subtitle here.",
    cards: [
      { icon: "💡", title: "Role 1", text: "Description..." },
      { icon: "⚡", title: "Role 2", text: "Description..." },
      { icon: "⭐", title: "Role 3", text: "Description..." },
    ],
  },
};

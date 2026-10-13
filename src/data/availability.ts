import type { CourseId } from "./courses";

// Which broad course areas each university offers at undergraduate level.
// Compiled from university course listings and professional-body lists; it is a guide, not a complete
// catalogue — every course view links to the UCAS search for the full, current list.

// Areas almost every large comprehensive university teaches.
const CORE: CourseId[] = [
  "biomed", "biochem", "chemistry", "physics", "maths", "cs", "economics", "accfin", "business", "law",
  "politics", "psychology", "history", "english", "geography", "languages", "philosophy", "sociology",
];
const ENG: CourseId[] = ["engineering", "mech", "civil", "eee"];

const build = (base: CourseId[], add: CourseId[], remove: CourseId[] = []): CourseId[] =>
  [...new Set([...base, ...add])].filter((c) => !remove.includes(c));

export const AVAILABILITY: Record<string, CourseId[]> = {
  oxford: build(CORE, [
    "medicine", "engineering", "ppe", "art", "earth", "materials", "stats", "classics", "archaeology", "anthropology",
    "theology", "histart", "eastasian", "middleeast", "music", "linguistics",
  ], ["accfin", "business", "sociology"]),
  cambridge: build(CORE, [
    "medicine", "vet", "natsci", "engineering", "chemeng", "architecture", "planning", "classics", "archaeology",
    "anthropology", "theology", "histart", "eastasian", "middleeast", "music", "linguistics", "education",
  ], ["accfin", "business"]),
  imperial: [
    "medicine", "biomed", "biochem", "chemistry", "physics", "maths", "stats", "cs", "ai", "datasci", "economics",
    ...ENG, "chemeng", "aero", "bioeng", "materials", "earth", "ecology", "zoology",
  ],
  ucl: build(CORE, [
    "medicine", "pharmacy", "pharmacology", "neuroscience", "natsci", ...ENG, "chemeng", "bioeng", "architecture",
    "planning", "art", "stats", "astro", "earth", "anthropology", "archaeology", "classics", "histart", "linguistics",
    "education", "liberal",
  ], ["accfin", "sociology"]),
  kcl: build(CORE, [
    "medicine", "dentistry", "pharmacy", "pharmacology", "nursing", "midwifery", "physio", "dietetics", "neuroscience",
    "engineering", "eee", "ai", "ppe", "classics", "theology", "film", "music", "liberal",
  ], ["sociology"]),
  lse: [
    "economics", "accfin", "business", "law", "ppe", "politics", "psychology", "history", "geography", "philosophy",
    "maths", "stats", "actuarial", "datasci", "anthropology", "sociology", "socialpolicy", "criminology",
  ],
  edinburgh: build(CORE, [
    "medicine", "vet", "nursing", ...ENG, "chemeng", "architecture", "art", "sport", "astro", "earth", "envsci",
    "ecology", "zoology", "ai", "stats", "pharmacology", "neuroscience", "anthropology", "archaeology", "classics",
    "theology", "histart", "eastasian", "middleeast", "linguistics", "music", "socialpolicy", "socialwork",
    "education", "fashion", "design",
  ]),
  manchester: build(CORE, [
    "medicine", "dentistry", "pharmacy", "nursing", "midwifery", "optometry", "slt", "pharmacology", "neuroscience",
    "architecture", "planning", "ppe", ...ENG, "chemeng", "aero", "materials", "zoology", "actuarial", "stats", "ai",
    "astro", "earth", "envsci", "anthropology", "archaeology", "classics", "theology", "histart", "eastasian",
    "middleeast", "linguistics", "music", "drama", "film", "criminology", "education", "fashion", "liberal", "creative",
    "marketing",
  ]),
  bristol: build(CORE, [
    "medicine", "dentistry", "vet", "pharmacology", "neuroscience", ...ENG, "aero", "zoology", "earth", "envsci",
    "astro", "datasci", "anthropology", "archaeology", "classics", "theology", "histart", "music", "drama", "film",
    "criminology", "socialpolicy", "education", "liberal",
  ]),
  warwick: build(CORE, [
    "ppe", ...ENG, "stats", "datasci", "neuroscience", "classics", "histart", "film", "drama", "criminology",
    "creative", "liberal", "linguistics",
  ], ["geography"]),
  durham: build(CORE, [
    "natsci", "ppe", "sport", "engineering", "earth", "envsci", "astro", "anthropology", "archaeology", "classics",
    "theology", "music", "criminology", "education", "liberal",
  ]),
  standrews: build(CORE, [
    "medicine", "zoology", "marine", "astro", "earth", "stats", "classics", "theology", "histart", "film",
    "anthropology", "middleeast",
  ], ["law", "accfin", "sociology"]),
  glasgow: build(CORE, [
    "medicine", "dentistry", "vet", "nursing", "sport", ...ENG, "chemeng", "aero", "zoology", "marine", "neuroscience",
    "pharmacology", "astro", "earth", "stats", "archaeology", "classics", "theology", "histart", "music", "drama",
    "film", "education",
  ]),
  birmingham: build(CORE, [
    "medicine", "dentistry", "pharmacy", "nursing", "physio", "natsci", "ppe", "sport", ...ENG, "chemeng", "aero",
    "zoology", "neuroscience", "earth", "envsci", "astro", "planning", "anthropology", "archaeology", "classics",
    "theology", "histart", "music", "drama", "film", "creative", "criminology", "socialpolicy", "socialwork",
    "education", "liberal", "linguistics",
  ]),
  leeds: build(CORE, [
    "medicine", "dentistry", "nursing", "midwifery", "radiography", "natsci", "ppe", "art", "sport", "fashion", "design",
    ...ENG, "chemeng", "aero", "bioeng", "zoology", "ecology", "neuroscience", "pharmacology", "foodsci", "earth",
    "envsci", "stats", "actuarial", "ai", "datasci", "classics", "theology", "histart", "music", "drama", "film",
    "journalism", "criminology", "socialpolicy", "socialwork", "eastasian", "middleeast", "linguistics",
  ]),
  nottingham: build(CORE, [
    "medicine", "vet", "pharmacy", "nursing", "midwifery", "physio", "dietetics", "architecture", "natsci", "ppe",
    "sport", ...ENG, "chemeng", "aero", "zoology", "neuroscience", "foodsci", "agriculture", "envsci", "archaeology",
    "classics", "theology", "histart", "music", "criminology", "socialwork", "eastasian", "liberal",
  ]),
  sheffield: build(CORE, [
    "medicine", "dentistry", "nursing", "slt", "architecture", "planning", "ppe", ...ENG, "chemeng", "aero", "bioeng",
    "materials", "zoology", "ecology", "neuroscience", "astro", "ai", "archaeology", "music", "journalism",
    "criminology", "socialpolicy", "education", "eastasian", "linguistics",
  ]),
  southampton: build(CORE, [
    "medicine", "nursing", "midwifery", "physio", "radiography", "ot", ...ENG, "aero", "zoology", "marine",
    "pharmacology", "earth", "envsci", "astro", "stats", "ai", "datasci", "archaeology", "music", "film", "criminology",
    "education", "linguistics", "marketing", "fashion", "art",
  ]),
  exeter: build(CORE, [
    "medicine", "nursing", "natsci", "ppe", "sport", ...ENG, "zoology", "marine", "ecology", "neuroscience", "astro",
    "earth", "envsci", "datasci", "anthropology", "archaeology", "classics", "theology", "drama", "film",
    "criminology", "liberal", "middleeast",
  ], ["chemistry"]),
  bath: [
    "pharmacy", "pharmacology", "architecture", "natsci", "sport", "biomed", "biochem", "chemistry", "physics", "maths",
    "stats", "cs", ...ENG, "chemeng", "aero", "economics", "accfin", "business", "marketing", "politics", "psychology",
    "languages", "sociology", "socialpolicy", "socialwork",
  ],
  york: build(CORE, [
    "medicine", "nursing", "midwifery", "natsci", "ppe", "engineering", "eee", "ecology", "envsci", "astro",
    "archaeology", "histart", "music", "drama", "film", "criminology", "socialpolicy", "socialwork", "education",
    "linguistics",
  ]),
  qmul: build(CORE, [
    "medicine", "dentistry", "engineering", "mech", "eee", "aero", "bioeng", "materials", "zoology", "pharmacology",
    "astro", "drama", "film", "linguistics",
  ], ["sociology", "biochem"]),
  newcastle: build(CORE, [
    "medicine", "dentistry", "pharmacy", "architecture", "planning", "art", ...ENG, "chemeng", "zoology", "marine",
    "agriculture", "foodsci", "envsci", "stats", "archaeology", "classics", "music", "journalism", "slt",
    "linguistics", "eastasian", "marketing",
  ]),
  loughborough: [
    "sport", "art", "design", ...ENG, "chemeng", "aero", "materials", "maths", "cs", "ai", "physics", "chemistry",
    "economics", "accfin", "business", "marketing", "politics", "psychology", "english", "geography", "sociology",
    "criminology", "drama", "film",
  ],
  lancaster: build(CORE, [
    "medicine", "natsci", "engineering", "mech", "eee", "ecology", "envsci", "astro", "stats", "datasci", "theology",
    "music", "drama", "film", "criminology", "socialwork", "education", "linguistics", "creative", "marketing",
  ]),
  cardiff: build(CORE, [
    "medicine", "dentistry", "pharmacy", "nursing", "midwifery", "physio", "radiography", "ot", "optometry",
    "architecture", "planning", ...ENG, "zoology", "neuroscience", "astro", "earth", "archaeology", "classics",
    "theology", "music", "journalism", "criminology", "socialwork", "education", "linguistics", "creative",
  ]),
  liverpool: build(CORE, [
    "medicine", "dentistry", "vet", "nursing", "physio", "radiography", "ot", "architecture", "planning", ...ENG, "aero",
    "zoology", "marine", "pharmacology", "earth", "envsci", "astro", "actuarial", "archaeology", "classics", "music",
    "film", "criminology", "eastasian", "marketing",
  ]),
  qub: build(CORE, [
    "medicine", "dentistry", "pharmacy", "nursing", "midwifery", "architecture", "planning", ...ENG, "chemeng", "aero",
    "zoology", "marine", "foodsci", "envsci", "actuarial", "archaeology", "anthropology", "theology", "music", "drama",
    "film", "criminology", "socialpolicy", "socialwork", "linguistics", "creative",
  ]),
};

// Real degree titles we've checked, with links to the official course pages.
export type ExampleDegree = { uni: string; course: CourseId; title: string; url: string };

export const EXAMPLE_DEGREES: ExampleDegree[] = [
  {
    uni: "manchester",
    course: "planning",
    title: "BSc Planning and Real Estate (UCAS K430, 3 years; RICS-accredited)",
    url: "https://www.manchester.ac.uk/study/undergraduate/courses/2026/12105/bsc-planning-and-real-estate/",
  },
  {
    uni: "manchester",
    course: "planning",
    title: "MPRE Master of Planning with Real Estate (UCAS 1G23, 4 years; RTPI + RICS)",
    url: "https://www.manchester.ac.uk/study/undergraduate/courses/2026/09631/mpre-master-of-planning-with-real-estate/",
  },
  {
    uni: "manchester",
    course: "planning",
    title: "MPlan Planning (UCAS K401, 4 years)",
    url: "https://www.manchester.ac.uk/study/undergraduate/courses/2027/09931/mplan-planning/",
  },
  {
    uni: "ucl",
    course: "planning",
    title: "Urban Planning and Real Estate BSc (RICS + RTPI)",
    url: "https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/urban-planning-and-real-estate-bsc",
  },
  {
    uni: "cardiff",
    course: "planning",
    title: "BSc Urban Planning and Development / BSc Human Geography and Planning",
    url: "https://www.cardiff.ac.uk/geography-planning/about-us/accreditation",
  },
];

// Typical A-level offers we've checked on official course pages (points: A*=4, A=3, B=2).
export const OFFER_OVERRIDES: Record<string, Partial<Record<CourseId, number>>> = {
  ucl: { planning: 8 }, // Urban Planning and Real Estate BSc: AAB
};

// A UCAS course search, optionally narrowed to one university's name.
export function ucasSearchUrl(query: string) {
  return `https://www.ucas.com/explore/search/courses?query=${encodeURIComponent(query)}`;
}

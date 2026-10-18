// Everything the home page says, in one place. The texts are Raoua's, taken
// from her design. Values marked TODO are still the design's placeholders.
import images from "./images.json";

export const site = {
  name: "Raoua",
  fullName: "Raoua Krimi",
  role: "Brand, motion & product designer",
  description:
    "Product designer with 5+ years of experience creating high-converting, accessible digital experiences: website redesigns, design systems, brand identities and motion.",
  url: "https://raoua.design", // TODO: real domain
  email: "", // TODO: e.g. hello@raoua.design
  resume: "", // TODO: /raoua-resume.pdf once the file is in public/
  social: {
    linkedin: "", // TODO
    behance: "", // TODO
    instagram: "", // TODO
  },
  portrait: images.home.portrait,
};

export const nav = [
  { id: "#branding", label: "Branding & Motion" },
  { id: "#case-studies", label: "Case Studies" },
  { id: "#tools", label: "Tools" },
  { id: "#skills", label: "Skills" },
];

export const hero = {
  intro:
    "A product designer with 5+ years of experience creating high-converting, accessible digital experiences, from full website redesigns and scalable design systems to brand guidelines. I also bring motion into the experience through interactive UI, animations, and thoughtful micro interactions that make products feel more engaging and intuitive.",
  stats: [
    { value: 5, suffix: "+", label: "Years experience" },
    { value: 30, suffix: "+", label: "Projects delivered" },
    { value: 20, suffix: "+", label: "Happy clients" },
  ],
};

export const tools = [
  { name: "Figma", logo: images.tools.figma },
  { name: "After Effects", logo: images.tools["after-effects"] },
  { name: "Lovable", logo: images.tools.lovable },
  { name: "Polymet", logo: images.tools.polymet },
  { name: "Claude AI", logo: images.tools.claude },
  { name: "Framer", logo: images.tools.framer },
];

export const strengths = [
  { title: "Brand Design", text: "Building distinctive visual identities" },
  { title: "Product Design", text: "Designing intuitive digital experiences" },
  { title: "Motion Design", text: "Bringing interfaces to life" },
  { title: "UX Research", text: "Understanding users and their needs" },
  { title: "AI Design", text: "Designing intelligent, AI-powered experiences" },
  { title: "Collaboration", text: "Working across teams to create better products" },
];

export type Img = { src: string; width: number; height: number };

/** A project on the home page. `slug` links to its case study; without one the card says it is coming. */
export type Project = {
  slug?: string;
  company: string;
  year: string;
  title: string;
  summary: string;
  tags: string[];
  image?: Img;
  /** Wide cards are the case studies; the grid below is branding work. */
  wide?: boolean;
};

export const projects: Project[] = [
  {
    slug: "gioco-news",
    company: "Clickout Media",
    year: "2026",
    title: "Gioco News Website Redesign",
    summary: "A full rebrand and redesign of a content-heavy news platform, from a new logo and design system to 12+ pages, built around what the analytics showed.",
    tags: ["Product design", "Brand design", "UX Research"],
    image: images.home["gioco-card"],
    wide: true,
  },
  {
    slug: "flyingshapes",
    company: "Kiimkern", // TODO: confirm the spelling
    year: "2026",
    title: "Flyingshapes Brand and Web Design",
    summary: "A brand, website and social presence that make a VR design tool for automotive designers feel tangible on a flat screen.",
    tags: ["Product design", "Brand design", "UX Research"],
    image: images.flyingshapes.card,
    wide: true,
  },
  {
    company: "The Flex Academy",
    year: "2025",
    title: "The Flex Academy",
    summary: "Case study in progress.", // TODO: summary, image and case study
    tags: ["UX Design", "Brand design"],
  },
  {
    slug: "myrhis",
    company: "MyRHIS Solutions",
    year: "2025",
    title: "Brand and Design System",
    summary: "Brand guidelines for MyRHIS: logo mark, Deep zip palette, app icon and the rules that keep them consistent from web to mobile.",
    tags: ["Brand design", "Design system"],
    image: images.home["myrhis-card"],
  },
];

// The case studies. Texts are Raoua's, taken from her designs; images are the
// panels cut out of those designs (see images.json). The order of this list is
// the order of the previous / next links at the bottom of each case study.
import images from "./images.json";
import type { Img } from "./site";

export type Figure = { img: Img; alt: string; title?: string; caption?: string };

export type Block =
  | { kind: "text"; label?: string; title: string; body?: string[] }
  | { kind: "figures"; title?: string; caption?: string; items: Figure[] };

export type CaseStudy = {
  slug: string;
  name: string;
  title: string;
  company: string;
  /** The project's own colour, used for labels and links on its page. */
  accent: string;
  hero: Img;
  intro: string[];
  tags: string[];
  facts: { label: string; items: string[] }[];
  blocks: Block[];
  stats?: { value: number; suffix?: string; label: string }[];
};

const g = images["gioco-news"];
const f = images.flyingshapes;
const m = images.myrhis;

export const cases: CaseStudy[] = [
  {
    slug: "gioco-news",
    name: "Gioco News",
    title: "GIOCO News Website Redesign",
    company: "Clickout Media",
    accent: "#CE0A31",
    hero: g.hero,
    intro: [
      "Gioco News is a digital news and information platform focused on the gambling and gaming industry, covering industry news, regulatory updates, business developments, and other content relevant to professionals and audiences within the sector. The platform is heavily content-driven, with a large amount of information organized across editorial articles, news sections, and high-value content formats such as top lists. Because the product relies on users discovering and consuming a high volume of content, content hierarchy, readability, navigation, and conversion-focused experiences were key considerations throughout.",
    ],
    tags: ["Product design", "Brand design", "UX Research"],
    facts: [
      { label: "Role & responsibilities", items: ["Product design", "Brand design"] },
      { label: "Deliverables", items: ["Brand Guidelines", "Design system", "Web pages redesign"] },
      { label: "Team", items: ["2 designers + manager", "2+ developers", "Other stakeholders"] },
    ],
    blocks: [
      {
        kind: "text",
        label: "The context",
        title: "From Brand Identity to Digital Experience",
        body: [
          "I worked on a complete transformation of the platform, from its brand identity to its digital experience. The goal was to move away from its outdated visual language and create a more distinctive, modern, and authentic brand while improving the overall UX and conversion opportunities. My role covered the full design process, including auditing the existing website, analyzing Google Analytics and heatmap data, redesigning the logo and brand identity, defining the brand guidelines, designing the website experience across desktop and mobile, and creating a scalable design system and component library.",
        ],
      },
      { kind: "figures", items: [{ img: g["before-after"], alt: "The Gioco News home page before and after the redesign" }] },
      {
        kind: "text",
        label: "The constraint",
        title: "Evolve Without Breaking What Works",
        body: [
          "The redesign had to work within an existing product rather than being created from a blank canvas. The content, sections, and underlying information architecture needed to remain largely intact, and the new experience had to be realistic for the existing development structure. I therefore spent time dissecting the current HTML and interface to understand its underlying patterns, while using Google Analytics and heatmaps to identify how users were actually interacting with the platform. This gave me a clearer picture of what should be preserved, what needed improvement, and where I had room to introduce change.",
        ],
      },
      {
        kind: "figures",
        items: [
          { img: g["typography-colour"], alt: "Audit of the existing typography scale and colour palette" },
          { img: g["anatomy-components-spacing"], alt: "Audit of the card anatomy, components, radius, breakpoints and spacing" },
        ],
      },
      {
        kind: "text",
        label: "The decision",
        title: "Build a Distinct and Scalable Design System",
        body: [
          "The project began with establishing a new brand foundation rather than redesigning individual interfaces in isolation. I redesigned the logo and defined a cohesive visual language across typography, color, shapes, spacing, and UI elements, translating these principles into a scalable design system and reusable component library. This created a consistent foundation for the product and ensured that subsequent interface decisions were grounded in the same visual and interaction rules. The component library was developed alongside the design work, allowing the system to evolve as new patterns emerged while remaining structured enough to support future pages and iterations.",
        ],
      },
      { kind: "figures", items: [{ img: g.brand, alt: "The new Gioco News logo, its construction grid and brand colours" }] },
      { kind: "figures", title: "Buttons and Tabs", items: [{ img: g["buttons-tabs"], alt: "Button and tab components in their states" }] },
      { kind: "figures", title: "Inputs and Miscellaneous", items: [{ img: g.inputs, alt: "Search inputs, table of contents, rating and badge components" }] },
      { kind: "figures", title: "Icons", items: [{ img: g.icons, alt: "The icon set" }] },
      { kind: "figures", title: "Cards", items: [{ img: g.cards, alt: "Listing, author and article cards" }] },
      {
        kind: "text",
        label: "The outcome",
        title: "A Complete, Scalable Redesign",
        body: [
          "With the new foundation established, I redesigned the key website experiences, including the homepage, article pages, search, contact, about, and top-list pages. Each page was rebuilt within the new system to create a more consistent experience across the site, while still addressing the specific purpose and content needs of each page. The top-list experience received particular attention as an important conversion surface, where I adapted interaction and layout patterns already tested across 10+ live sites with established revenue and conversion rather than introducing an entirely untested model. The redesign resulted in a complete, implementation-ready direction, although it was not ultimately launched, so no post-launch performance improvements are claimed.",
        ],
      },
      {
        kind: "figures",
        items: [
          { img: g["page-home"], alt: "Home page in light and dark mode" },
          { img: g["page-article"], alt: "Article page in light and dark mode" },
          { img: g["page-top-list"], alt: "Top list page in light and dark mode" },
          { img: g["page-search"], alt: "Search page in light and dark mode" },
          { img: g["page-about"], alt: "About us page in light and dark mode" },
        ],
      },
      {
        kind: "text",
        label: "The reflection",
        title: "Designing With Proven Patterns",
        body: [
          "The project taught me the value of treating a redesign as an evolution of an existing product rather than a visual replacement. Working with real user behavior, existing technical structures, and proven patterns helped me make stronger decisions while still leaving room for creative exploration. Completing the work in around four weeks also pushed me to develop the brand, UX, UI, and design system as one connected process rather than separate deliverables. If I were continuing the project, my next step would be a phased launch with clear baseline metrics, followed by testing and iteration around content discovery, engagement, top-list interaction, and conversion.",
        ],
      },
    ],
    stats: [
      { value: 12, suffix: "+", label: "Web pages" },
      { value: 40, suffix: "+", label: "Components" },
    ],
  },
  {
    slug: "flyingshapes",
    name: "Flyingshapes",
    title: "Flyingshapes Website Design",
    company: "Kiimkern", // TODO: confirm the spelling
    accent: "#AB5FF9",
    hero: f.hero,
    intro: [
      "Flyingshapes is a virtual reality design and modelling tool built for automotive designers. It lets teams sketch vehicle concepts in 3D, explore them in a virtual environment and review them together, turning early ideas into prototypes that can be tested and improved quickly. My work focused on shaping the brand identity, designing social media assets and developing the website experience, so the product had one cohesive visual language across its digital touchpoints and its value was clear to a specialist, highly visual audience.",
    ],
    tags: ["Product design", "Brand design", "UX Research"],
    facts: [
      { label: "Role & responsibilities", items: ["Product design", "Brand design", "UX research"] },
      { label: "Deliverables", items: ["Brand identity & wordmark", "Design system", "Website, desktop & mobile", "Social media assets"] },
      { label: "Team", items: ["2 designers + manager", "2+ developers", "Other stakeholders"] },
    ],
    blocks: [
      {
        kind: "text",
        label: "The context",
        title: "From Napkin Sketch to 3D Prototype",
        body: [
          "The idea behind Flyingshapes is simple: a sketch on a napkin should be able to become a 3D prototype that a team can walk around, annotate and improve within minutes. The product helps automotive designers create innovative 3D sketches quickly, easily and securely, access their team's designs in 3D from anywhere, and leave spatial feedback right where it matters. The company needed a brand and a website that could carry that ambition, introducing a VR-first tool to designers who were used to traditional 3D modelling software. I followed a four-step process, from discovering the problem space to handing the design over to development.",
        ],
      },
      { kind: "figures", items: [{ img: f["product-process"], alt: "The product's two key features and the four-step design process" }] },
      {
        kind: "text",
        label: "The constraint",
        title: "Selling a Tool You Can't Try in a Browser",
        body: [
          "Flyingshapes is used inside a VR headset, which means most visitors can't experience the product from the website itself. The site had to make a spatial, hands-on tool feel tangible on a flat screen, speak to designers with a trained eye for form and quality, and stand apart from an established direct competitor and the traditional modelling tools teams already relied on. The product also came in two parts, a VR app that needs a headset and a web platform for sharing and reviewing, each with its own entry point. Before designing anything, I benchmarked the market, defined who we were designing for, and mapped how they would move through the site.",
        ],
      },
      { kind: "figures", items: [{ img: f.research, alt: "Direct and indirect UX benchmarks, two user personas and the user flow" }] },
      { kind: "text", label: "How it was built", title: "The Design System" },
      { kind: "figures", items: [{ img: f["design-system"], alt: "The Flyingshapes wordmark, colours and type scale" }] },
      {
        kind: "figures",
        title: "Buttons and Navigation",
        caption: "Three button styles, inverted for dark and light sections. The navigation keeps the wordmark left, two links, and Contact set apart on the right.",
        items: [{ img: f["buttons-navigation"], alt: "Buttons in dark and light themes, and the navigation bar" }],
      },
      { kind: "figures", title: "Inputs and Miscellaneous", caption: "Product entry cards for the Get Started page, one per product.", items: [{ img: f.inputs, alt: "Product entry cards for the VR app and the web platform" }] },
      { kind: "figures", title: "Icons", caption: "Benefit tiles for the productivity section, one icon and one short line each.", items: [{ img: f.icons, alt: "Benefit tiles with icons" }] },
      { kind: "figures", title: "Cards", caption: "Feature and collaboration cards in dark and light variants.", items: [{ img: f.cards, alt: "Feature and collaboration cards" }] },
      {
        kind: "text",
        label: "The outcome",
        title: "The Website Design",
        body: [
          "With the identity and system in place, I designed the website for desktop and mobile. The home page moves from the “Pure Design Flow” hero through creation, collaboration and productivity, into a showcase of designs made with the tool, before ending on a minimal black footer. The Get Started page turns the two products into two clear choices. Every section was built from the same components, so the light and dark sections feel like one experience on any screen size.",
        ],
      },
      { kind: "figures", items: [{ img: f.website, alt: "The home page on desktop and mobile" }] },
      {
        kind: "figures",
        title: "The Social Posts",
        items: [
          { img: f["social-grid"], alt: "A grid of Flyingshapes social media posts" },
          { img: f["social-featured"], alt: "Featured social media posts" },
        ],
      },
      {
        kind: "text",
        label: "The reflection",
        title: "What I Learned",
        body: [
          "This project taught me that when you design for designers, restraint is the strongest statement. Automotive designers judge everything by its form, so the brand and website had to feel as considered as the work they create, and the best way to sell a 3D tool on a flat screen was to step back and let the designs fill it. Grounding the work in a benchmark, real personas and a mapped user flow kept those visual decisions tied to what users needed. If I were continuing the project, my next step would be to bring real motion into the site, short clips of sketching in VR, and to test whether separating the VR and Web entry points improves sign-ups and downloads.",
        ],
      },
    ],
    stats: [
      { value: 2, label: "User personas" },
      { value: 5, label: "Page flows mapped" },
      { value: 2, label: "Breakpoints designed" },
    ],
  },
  {
    slug: "myrhis",
    name: "MyRHIS",
    title: "MyRHIS Brand and Design System",
    company: "MyRHIS Solutions",
    accent: "#385FE3",
    hero: m.hero,
    intro: [
      "Brand guidelines for MyRHIS Solutions: the logo mark and how it is built, the Deep zip colour palette, the app icon, and the rules that keep the brand consistent across web, mobile and print.",
    ],
    tags: ["Brand design", "Design system"],
    facts: [
      { label: "Role & responsibilities", items: ["Brand design"] },
      { label: "Deliverables", items: ["Logo mark", "Colour palette", "App icon", "Brand guidelines"] },
    ],
    blocks: [
      { kind: "text", label: "The mark", title: "Logo and Construction" },
      {
        kind: "figures",
        items: [
          { img: m["logo-mark"], alt: "The MyRHIS logo mark" },
          { img: m["mark-construction"], alt: "The logo mark and its construction grid" },
          { img: m["mark-meaning"], alt: "What the logo mark stands for" },
        ],
      },
      { kind: "text", label: "Colour", title: "The Deep Zip Palette" },
      {
        kind: "figures",
        items: [
          { img: m.palette, alt: "The Deep zip palette: Quick Silver, Royal Orange, Royal Blue, Dark Bleuet" },
          { img: m.colours, alt: "Colour values" },
          { img: m["palette-rationale"], alt: "Why each colour was chosen" },
          { img: m["palette-cards"], alt: "The palette as cards" },
        ],
      },
      { kind: "text", label: "Usage", title: "The Logo in Every Context" },
      {
        kind: "figures",
        items: [
          { img: m["logo-blue-orange"], alt: "The logo on blue and on orange" },
          { img: m["logo-dark-light"], alt: "The logo on dark and light backgrounds" },
          { img: m["logo-deep-blue"], alt: "The logo on deep blue" },
          { img: m["logo-on-shape"], alt: "The logo over the brand shape" },
          { img: m.combinations, alt: "Approved colour combinations" },
          { img: m["web-sizes"], alt: "Logo sizes for the web" },
          { img: m["mobile-app-logo"], alt: "The logo in a mobile app" },
        ],
      },
      { kind: "text", label: "App icon", title: "One Mark, Every Screen" },
      {
        kind: "figures",
        items: [
          { img: m["app-icon"], alt: "The MyRHIS app icon" },
          { img: m["app-icon-system"], alt: "The app icon system" },
        ],
      },
      { kind: "text", label: "In use", title: "Mockups" },
      {
        kind: "figures",
        items: [
          { img: m["mockup-login"], alt: "A login screen in the MyRHIS brand" },
          { img: m["mockup-email"], alt: "An email in the MyRHIS brand" },
          { img: m["mockup-phones"], alt: "Mobile screens in the MyRHIS brand" },
          { img: m["thank-you"], alt: "Closing page of the guidelines" },
        ],
      },
    ],
  },
];

export function caseBySlug(slug: string) {
  return cases.find((c) => c.slug === slug);
}

/** The case studies before and after this one, wrapping around. */
export function neighbours(slug: string) {
  const i = cases.findIndex((c) => c.slug === slug);
  const n = cases.length;
  return { prev: cases[(i - 1 + n) % n], next: cases[(i + 1) % n] };
}

# Raoua, portfolio

Next.js 16 (App Router) + Tailwind v4. Home page and three case studies, built from Raoua's designs.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things are

- `src/content/site.ts`: home page text, projects, tools, strengths, contact links.
- `src/content/cases.ts`: the case studies. Their order is the order of the previous / next links.
- `public/work/<project>/`: the images, cut from the design exports.
- `design/` and `pictures/` (not in git): Raoua's design exports and her full-resolution originals.

## Still to fill in

Search for `TODO` in `src/content`: Behance / Instagram, resume PDF, domain,
The Flex Academy case study, and the spelling of the Flyingshapes client.

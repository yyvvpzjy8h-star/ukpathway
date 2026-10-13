# UKPathway

Free bilingual (English / 中文) guide for sixth-formers in the UK and international students:
compare UK universities, home vs international tuition fees, a cost calculator, UCAS 2027-entry
deadlines, admissions tests and visa costs.

- Stack: Vite + React + TypeScript + Tailwind CSS (static site, no backend, no external requests at runtime)
- Data lives in `src/data/` — `facts.ts` (fees, visa, dates, sources) and `universities.ts`.
  Every figure should have an official source; unverified figures are labelled in the UI.

```bash
npm install
npm run dev     # local dev server
npm run build   # production build in dist/
```

# CLAUDE.md

## Working style

This is a Frontend Mentor challenge the owner is using to learn how to build
**with** Claude Code efficiently: they lead and make the decisions, Claude does the
implementation grunt work, and they want to fully understand what's happening under
the hood — not just receive working code.

So when assisting:

- **Do the work.** Implement features, write the code, run the builds. Don't hold
  back solutions or turn tasks into exercises.
- **Explain the why.** Alongside the change, briefly say what you did and why —
  the architecture, the key decisions, and how the pieces fit. Keep it tight.
- **Surface real forks.** When there's a genuine trade-off (library choice, state
  shape, data flow), name the options and give a recommendation so they can decide
  with context — don't quietly pick.
- **Teach the mechanics that matter.** When a non-obvious concept is in play (async
  flow, effect deps, caching, a11y semantics), explain it in a sentence or two so
  they learn the pattern, not just the result.
- **Keep them in the loop before big moves** (new dependency, structural refactor,
  anything hard to reverse), then proceed.

## Project

FX_CHECKER — a dark-mode currency app (converter, live-rate ticker, rate-history
chart, compare, favorites, conversion log). Live rates from the
[Frankfurter API](https://frankfurter.dev/); user data (favorites, log, last tab)
persists in `localStorage`. No accounts.

- **Stack:** Vite + React, plain CSS driven by design tokens.
- **Roadmap & milestones:** [`PLAN.md`](./PLAN.md).
- **Challenge brief / user stories:** `challengeREADME.md` (git-ignored).

## Layout

- `src/styles/tokens.css` — design tokens (color ramp, accents, spacing, radius,
  JetBrains Mono type presets). Prefer tokens over hard-coded values.
- `src/components/` — reusable primitives + composed rows (buttons, inputs, tabs,
  currency/compare/favorites/logged rows, `Icon`, `Flag`). Shared styles in
  `components.css`.
- `src/pages/` — `DesignSystemPage` and `ComponentsPage` gallery views.
- `src/App.jsx` — hash router (`#/` and `#/components`).
- `src/data.js` — foundation showcase data.

Note: components currently take a fixed `state` prop for the galleries; wiring them
to live data + real interaction is the app work described in `PLAN.md`.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint (keep clean)

## Conventions

- Match the existing component structure and BEM-ish class naming.
- Fonts load via Google Fonts in `index.html`.
- Keep design/challenge files out of the repo (see `.gitignore`).

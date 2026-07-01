# FX_CHECKER — Build Plan

## What this is

FX_CHECKER is the [Frontend Mentor "FX Checker"](https://www.frontendmentor.io/articles/fm30-hackathon-currency-converter)
challenge: a dark-mode currency app that converts between currencies using **live
exchange rates**, with a rate-history chart, multi-currency comparison, pinned
favorite pairs, and a running conversion log. Rates come from a live API; the
user's own data (favorites, log, last tab) persists in the browser.

- **Rates API:** [Frankfurter](https://frankfurter.dev/) (free, no key, CORS, ECB-backed).
- **Persistence:** `localStorage` (no accounts).
- **Stack:** Vite + React (already set up), plain CSS driven by design tokens.

### Where we are now

The **design system and component library are already built** — tokens
(`src/styles/tokens.css`), reusable primitives and composed rows
(`src/components/*`), and two gallery pages (`src/pages/*`) behind a hash router.
The remaining work is turning that static gallery into the **real, data-driven
app**: fetch live rates, wire state, add the converter + tabs, persist user data,
and make it responsive and accessible.

Existing components to reuse: `CurrencyButton`, `AmountInput`, `SearchInput`,
`ExchangeButton` (swap), `LogConversionButton`, `FavoriteButton`, `Tab`/`TabBar`,
`LiveRateChip`, `CurrencyItem`, `CompareItem`, `FavoritesItem`, `LoggedItem(+Mobile)`,
`DeleteButton`, `ClearButton`, `Flag`, `Icon`. Most need to move from fixed
`state` props to real interaction + data props.

---

## Milestones

### M1 — Data layer & API client
Foundation everything else depends on.
- `src/api/frankfurter.js`: typed wrappers for `GET /v2/currencies`,
  `/v2/latest?base=`, `/v2/latest?base=&symbols=`, `/v2/{start}..{end}?base=&symbols=`.
- Fetch helper with error handling + a small in-memory cache (rates change slowly).
- `src/hooks/useCurrencies.js` and `src/hooks/useRates.js` (load, loading, error).
- Flag/name lookup: map API currency codes → display name + flag asset; decide
  fallback for codes without a flag asset.
- **Done when:** currency list and a base's latest rates load in a throwaway probe.

### M2 — App state & persistence
- Global state (Context + reducer, or a light store) for: active send/receive
  currencies, amount, active tab, favorites, conversion log.
- `src/hooks/useLocalStorage.js`; persist favorites, log, and last-open tab.
- Conversion math helpers (`convert(amount, rate)`, formatting, relative-time).
- **Done when:** state survives reload; changing currencies/amount updates a value.

### M3 — Converter (core flow)
The centerpiece.
- Wire `AmountInput` to controlled state; convert **in real time** as the user types.
- Send/receive `CurrencyButton`s open the currency picker (M4).
- Live rate line (`1 USD = 0.8530 EUR`) for the active pair.
- `ExchangeButton` swaps send/receive; `FavoriteButton` pins the active pair;
  `LogConversionButton` appends to the log.
- **Done when:** a full convert → swap → favorite → log flow works end to end.

### M4 — Currency picker
- Searchable popover: filter by **code or name**.
- Group into **Popular** and **Other currencies**; each row = flag + code + name.
- Check mark on the selected currency; selecting closes and updates the converter.
- **Done when:** picker drives both send and receive selection, with search.

### M5 — Live markets ticker
- Horizontal ticker of pairs, each with current rate + 24h change (up/down color).
- 24h change = compare latest vs. previous day (`/v2/{yesterday}..{today}`), or
  document the approximation if the endpoint shape differs.
- **Done when:** ticker renders real pairs with correct up/down direction.

### M6 — Rate history chart
- Add a charting lib (recommend **Recharts** or a small custom SVG) — line + area.
- Range switcher: 1D, 1W, 1M, 3M, 1Y, 5Y → map to time-series date ranges.
- Stat row: open, last, absolute change, % change for the selected range.
- **Done when:** switching pair/range redraws the chart and updates stats.

### M7 — Compare tab
- Convert the send amount into a set of currencies at once (reuse `CompareItem`).
- Each row shows converted value + reference rate; pin/unpin toggles favorites.
- **Done when:** compare list reflects live amount and favorites stay in sync.

### M8 — Favorites tab
- List pinned pairs (`FavoritesItem`) with live rate + 24h change.
- Select a row → load that pair into the converter; unpin removes it.
- **Done when:** favorites persist, load into converter, and unpin works.

### M9 — Conversion log tab
- List logged conversions (`LoggedItem`/`LoggedItemMobile`): relative time, pair,
  send/receive amounts.
- Delete a single entry (`DeleteButton`); clear the whole log (`ClearButton`).
- **Done when:** logging, deleting, and clearing persist across reloads.

### M10 — Layout, tabs & responsive
- Assemble the real app shell: converter + ticker + chart + tabbed section
  (History/Compare/Favorites/Log) using `TabBar` (desktop) and the mobile selector.
- Match the Figma layout at mobile / tablet / desktop breakpoints.
- **Done when:** the optimal layout renders per screen size, matching the design.

### M11 — Empty & error states
- Empty favorites / empty log / empty comparison prompts (not blank lists).
- Chart error message when history fails; API-unreachable handling.
- **Done when:** each documented state shows its friendly prompt.

### M12 — Accessibility pass
- Full keyboard nav: pickers, swap, tabs, chart-range controls, favorite/pin toggles.
- Visible focus rings (critical on dark UI — tokens already include lime focus rings).
- Semantic HTML for tabs, lists, and the picker popover; `aria-*` where needed.
- Live-region announcements: converted amount, pair pinned, conversion logged.
- **Done when:** the app is fully operable and legible via keyboard + screen reader.

### M13 — Polish, README & deploy
- Cross-browser/device QA, visual diff against the design, `npm run lint` clean.
- Write the submission `README.md` (screenshot, live URL, stack, notes).
- Deploy (Vercel / Netlify / GitHub Pages) and confirm the live build.
- **Done when:** live URL works and the README is submission-ready.

---

## Stretch goals (from the challenge)
Light theme toggle · pair in the URL for shareable links · keyboard shortcuts ·
CSV export of the log · chart hover crosshair · cached-rates offline fallback with
an "out of date" banner · full-stack accounts that sync favorites/log.

## Suggested order
M1 → M2 unblock everything. Then M3 + M4 together (converter is unusable without the
picker). M5/M6 are independent and can slot in anytime after M2. M7–M9 build on M2's
state. M10–M13 come last. Ship a working converter early, then layer the tabs on.

## Notes
- `challengeREADME.md` and `preview.jpg` are git-ignored (design/challenge files
  stay out of the repo, per the challenge rules).
- JetBrains Mono already loads via Google Fonts; a local variable font ships in the
  challenge assets if self-hosting is preferred later.

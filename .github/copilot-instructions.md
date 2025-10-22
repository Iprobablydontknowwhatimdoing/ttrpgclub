# TTRPG Club — AI coding guide

Static, no-backend site with Neobrutalism styling and client-side Markdown rendering. TypeScript compiles to ESM in `dist/` and is loaded with `<script type="module">`.

Architecture and pages
- Pages: `index.html` (home), `games.html` (games archive), `events.html` (events archive), `article.html` (single article).
- Header/Footer are web components from `src/chrome.ts` used as `<site-header>` and `<site-footer>`; UI behavior is in `src/ui.ts` (mobile nav). If you change header DOM, update selectors in `ui.ts` accordingly.
- Home uses `style-minimal.css`; archives and article use `style.css`. Both follow thick 4px borders and hard shadows; rounded corners are currently used (intentional).

Dynamic content model
- Source content lives in `games/` and `events/` as Markdown with YAML front-matter. Common keys: `title`, `description`, `thumbnail`, `date`. Game extras: `system`, `dm`, `status`, `players`. Event extras: `time`, `location`, `type`.
- Markdown parsing: `src/markdown-loader.ts` has a simple `parseFrontmatter()` for `key: value` lines and `markdownToHtml()` that uses a global `marked`.
- Important: each HTML page includes an ESM CDN script that sets `window.marked`; TS uses `declare const marked: any` and does NOT import from npm. Keep that pattern if you add pages.

Entry points and data flow
- Home: `src/main.ts` loads 3 most recent items into the `.items-grid` containers within the games/events sections (id="games" and id="events") using `createPreviewCard()` from `src/cards.ts`.
- Archives: `src/games-page.ts` and `src/events-page.ts` load all items, provide search/sort (and filters for games), and render the same cards with `context='archive'` for extra data-attributes.
- Article: `src/article.ts` reads `?md=path/to/file.md` and calls `loadArticlePage()` which sets title, header bg image, meta chips, ToC, and renders Markdown.

Add or update content
- Create a file in `games/` or `events/` with the front-matter above (encode ampersands as `&amp;` in HTML content).
- Update file lists in ALL relevant files:
  - Games: `src/main.ts` and `src/games-page.ts`
  - Events: `src/main.ts` and `src/events-page.ts`
- Rebuild and serve over HTTP; the home will show the 3 newest; archives show all with filters.

Build, run, verify
- Compile TS: `npm run build`; watch: `npm run watch`.
- Dev server: `npm run dev` (watch + `python3 -m http.server 8000`). On Windows without `python3`, use `python -m http.server 8000` or run server in a second terminal.
- Must use http:// (not file://) for fetch. Output goes to `dist/`; don’t edit compiled files.

Styling and components
- Cards are produced by `src/cards.ts`; links are built as `/article.html?md=<encoded path>`. Preserve that URL contract.
- Thumbnails fall back to via.placeholder.com; keep alt text from front-matter title.
- CSS lives in `style.css` (archives/article) and `style-minimal.css` (home via `style-minimal.scss`). Keep 4px borders, 8px-offset shadows, uppercase headings, and strong contrast.

Utilities and optional tools
- `scripts/inline-partials.mjs` can inline `partials/header.html` and `partials/footer.html` into pages using comment markers; this is optional/legacy because header/footer are web components now.

Conventions
- Kebab-case filenames; 4-space indentation; no backend/state.
- When adding filters/metadata, extend `cards.ts` (chips/attributes) and `markdown-loader.ts`’s `generateMetaHtml()` to keep pages consistent.

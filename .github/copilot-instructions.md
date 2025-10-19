# TTRPG Club Project - AI Coding Instructions

## Project Overview
A static website for a tabletop role-playing game (TTRPG) club. Single-page design with multiple sections showcasing club information, games, events, resources, and contact details.

## Architecture
- **Static HTML/CSS website**: Neobrutalism styled, no backend
- **TypeScript for dynamic content**: Client-side markdown loading and rendering
- **Entry point**: `index.html` - complete semantic HTML5 structure
- **Styling**: `style.css` - custom vanilla CSS with neobrutalism design
- **Content**: Markdown files with YAML frontmatter in `/games/` and `/events/` folders
- **Build**: TypeScript compiles to `/dist/` directory

## Current Structure

### HTML Files
- **`index.html`**: Main homepage with all sections
- **`article.html`**: Template for individual game/event pages

Complete single-page website with these sections:
1. **Static header** with navigation (sticky positioning)
2. **Hero section** with gradient background and CTA
3. **Content sections** (2): About and Why Join with card grids
4. **Recent items sections** (2): Current Games and Upcoming Events - **dynamically loaded**
5. **Resources section**: 4-column grid with categorized links
6. **CTA section**: Join call-to-action with gradient background
7. **Footer**: 4-column grid with links and contact info

**Important HTML patterns:**
- All ampersands must be encoded as `&amp;` (common in D&D references)
- Placeholder images use `https://via.placeholder.com` service
- Semantic HTML5 elements (`<header>`, `<section>`, `<footer>`, `<nav>`)
- ID anchors for smooth scrolling navigation (`#about`, `#games`, `#events`, etc.)
- Script tags load compiled JS: `<script type="module" src="/dist/main.js"></script>`

### CSS (`style.css`)
- **Neobrutalism Design System**: Bold black borders, hard shadows, bright colors, raw aesthetic
- **CSS Custom Properties** for theming:
  - Primary: `#a855f7` (vivid purple)
  - Secondary: `#3b82f6` (bright blue)
  - Accent: `#10b981` (green)
  - Yellow: `#fbbf24`, Pink: `#ec4899`, Orange: `#f97316`
- **Bold borders**: `4px solid black` on all components
- **Hard shadows**: `8px offset` box-shadows (no blur) in black
- **CSS Grid** for responsive layouts (auto-fit pattern)
- **No border-radius**: Sharp corners throughout
- **Responsive breakpoint**: 768px for mobile layout
- **Interactive transforms**: Buttons and cards move and adjust shadows on hover/active
- **Typography**: Bold (700-900 weight), uppercase headings, tight letter-spacing

### Design System
```css
/* Neobrutalism Color Palette */
--primary: #a855f7      /* Vivid purple */
--secondary: #3b82f6    /* Bright blue */
--accent: #10b981       /* Green */
--yellow: #fbbf24       /* Yellow */
--pink: #ec4899         /* Pink */
--orange: #f97316       /* Orange */

--bg-main: #fef3c7      /* Warm beige/cream background */
--bg-alt: #dbeafe       /* Light blue alternate */
--bg-white: #ffffff     /* White for cards */

--border: #000000       /* Always black, 4px */
--shadow-offset: 8px    /* Hard shadow offset */
```

### Neobrutalism Principles Applied
1. **Bold Borders**: Every component has thick (4px) black borders
2. **Hard Shadows**: Box-shadows with offset, no blur (e.g., `8px 8px 0 black`)
3. **Bright Colors**: Vibrant backgrounds (purple hero, pink CTA, orange footer, green resources)
4. **Sharp Corners**: No border-radius anywhere
5. **Typography**: Heavy weights (700-900), uppercase headings, condensed spacing
6. **Interactive Feedback**: Elements move toward shadow on hover, eliminating shadow on active
7. **High Contrast**: Black text on bright backgrounds for maximum readability

### TypeScript Structure (`src/`)
- **`markdown-loader.ts`**: Core utilities for fetching and parsing markdown files
  - `parseFrontmatter()`: Extracts YAML frontmatter from markdown
  - `markdownToHtml()`: Simple markdown-to-HTML converter
  - `fetchMarkdown()`: Fetches markdown files via fetch API
  - `loadArticlePage()`: Loads content for article pages
  - `generateMetaHtml()`: Creates metadata badges for games/events
  
- **`main.ts`**: Homepage dynamic content loader
  - Hardcoded file lists: `GAMES_FILES` and `EVENTS_FILES` arrays
  - `loadGames()`: Fetches and displays 3 most recent games
  - `loadEvents()`: Fetches and displays 3 most recent events
  - `createCard()`: Generates HTML for item cards
  
- **`article.ts`**: Article page initialization
  - Reads `?md=` URL parameter for markdown file path
  - Calls `loadArticlePage()` to render content

### Markdown Content (`/games/` and `/events/`)
Files use YAML frontmatter format:
```yaml
---
title: Campaign/Event Name
description: One-liner description
thumbnail: /images/thumbnail.jpg
date: 2025-10-18
system: D&D 5e          # Games only
dm: Name                # Games only
status: Active          # Games only
time: 7:00 PM           # Events only
location: Community Ctr # Events only
---

Markdown content here...
```

## Future Expansion Notes

### Current Dynamic Content System
Games and Events sections **dynamically load** from markdown files:
- **Current Games section** (`#games`) - loads from `GAMES_FILES` array in `main.ts`
- **Upcoming Events section** (`#events`) - loads from `EVENTS_FILES` array in `main.ts`

### Adding New Content
1. Create markdown file in `/games/` or `/events/` with proper frontmatter
2. Add filename to `GAMES_FILES` or `EVENTS_FILES` array in `src/main.ts`
3. Run `npm run build` to recompile
4. Content appears automatically on homepage with link to article page

### Markdown File Requirements
- Must include YAML frontmatter between `---` markers
- Required fields: `title`, `description`
- Optional: `thumbnail`, `date`, and type-specific fields
- Content after frontmatter rendered as article body
- Linked via `article.html?md=path/to/file.md`

## Development Workflow
- **Build TypeScript**: `npm run build` compiles `src/` to `dist/`
- **Watch mode**: `npm run watch` for automatic recompilation
- **Dev server**: `npm run dev` runs watch + Python HTTP server
- **Testing**: Serve via HTTP (can't use `file://` due to CORS on fetch)
- **No dependencies for runtime**: Pure HTML/CSS/JS in browser
- **Version control**: Exclude `node_modules/` and `dist/` (see `.gitignore`)

## Code Conventions
- **File naming**: `kebab-case` for future files
- **CSS organization**: Grouped by component (header, hero, cards, footer, etc.)
- **HTML indentation**: 4 spaces
- **CSS indentation**: 4 spaces
- **Class naming**: BEM-inspired but simplified (`.site-header`, `.hero-content`, `.item-card`)

## When Making Changes

### Adding New Content Files
1. Create `.md` file in `/games/` or `/events/` with YAML frontmatter
2. Update `GAMES_FILES` or `EVENTS_FILES` array in `src/main.ts`
3. Run `npm run build`
4. Test by refreshing the homepage

### Modifying TypeScript
1. Edit files in `src/` directory
2. Run `npm run build` (or use `npm run watch`)
3. Check browser console for errors
4. Test dynamic loading behavior
5. **Important**: Compiled JS goes to `dist/`, not `src/`

### Adding New Sections
- Follow existing pattern: section → container → content grid → cards
- Every section needs `border-bottom: 4px solid black`
- Choose a bright background color from the palette
- All cards need: black border (4px), hard shadow (8px 8px 0 black), white background
- Maintain consistent padding: `4rem 2rem` for sections

### Adding New Components
- **Always include**: thick black borders (4px), hard shadows (offset only, no blur)
- **Buttons**: Must have transform on hover (reduce shadow), eliminate shadow on active
- **Cards**: Hover should translate toward shadow source, increasing shadow
- **Typography**: Headings should be uppercase, 900 weight, negative letter-spacing
- **No rounded corners**: Keep everything sharp and geometric

### Modifying Colors/Theme
- Update CSS custom properties in `:root` for global theme changes
- Maintain neobrutalism aesthetic: bright, saturated colors with black borders
- Each major section has different background color for visual interest
- Always use hard shadows (no blur) with black color
- Maintain high contrast for accessibility

### Responsive Design
- Grid automatically responds with `auto-fit` pattern
- Mobile breakpoint at 768px collapses to single column
- Test header navigation wrapping on small screens
- Reduce shadow offsets on mobile for cleaner appearance

### HTML Entities
- Always encode `&` as `&amp;` in content (especially "D&D")
- Test HTML validation after content changes

### Testing Changes
- **Must use HTTP server** (not `file://`) due to fetch API CORS requirements
- Use `npm run dev` or `python -m http.server 8000`
- Check browser console for JavaScript errors
- Test both homepage and article pages
- Verify markdown rendering and metadata display

## Key Files
- `index.html` - Main homepage structure with dynamic content containers
- `article.html` - Article page template for games/events
- `style.css` - All neobrutalism styling with custom properties
- `src/main.ts` - Homepage content loader (lists GAMES_FILES and EVENTS_FILES)
- `src/article.ts` - Article page initializer
- `src/markdown-loader.ts` - Markdown parsing utilities
- `package.json` - NPM scripts and dependencies
- `tsconfig.json` - TypeScript compiler configuration

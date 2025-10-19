# Dynamic Article Pages Implementation Summary

## ✅ What Was Built

Successfully implemented **client-side TypeScript** solution for dynamic markdown content loading!

### New Files Created

**TypeScript Source Files (`src/`)**:
- `markdown-loader.ts` - Core utilities for fetching and parsing markdown with YAML frontmatter
- `main.ts` - Homepage loader that fetches games/events and generates cards dynamically
- `article.ts` - Article page loader that renders individual game/event pages

**HTML Templates**:
- `article.html` - Neobrutalism-styled template for individual article pages

**Configuration**:
- `package.json` - NPM dependencies and build scripts
- `tsconfig.json` - TypeScript compiler configuration
- `.gitignore` - Excludes `node_modules/` and `dist/`

**Compiled Output**:
- `dist/` directory with compiled JavaScript modules

## 🎯 How It Works

### Homepage (index.html)
1. Loads `dist/main.js` on page load
2. JavaScript fetches markdown files from `games/` and `events/` folders
3. Parses YAML frontmatter (title, description, thumbnail, etc.)
4. Dynamically generates card HTML for 3 most recent items in each section
5. Cards link to `article.html?md=path/to/file.md`

### Article Pages (article.html)
1. Receives markdown file path via URL parameter (`?md=games/dragons-hoard.md`)
2. Loads `dist/article.js` which fetches the markdown file
3. Parses YAML frontmatter and markdown content
4. Converts markdown to HTML using simple parser
5. Displays title, description, metadata badges, and full article content
6. All styled with neobrutalism design

## 🚀 Usage

### View the Site
Server is running at: **http://localhost:8000**

Open in your browser to see:
- Homepage with dynamically loaded game and event cards
- Click "Open" on any card to view the full article
- Article pages render markdown content with metadata

### Adding New Content

1. **Create a markdown file** (e.g., `games/new-campaign.md`):
```markdown
---
title: New Campaign Name
description: One-line description  
thumbnail: /images/campaign.jpg
date: 2025-10-18
system: D&D 5e
dm: Your Name
status: Recruiting
---

# Campaign Description

Write your full content here using markdown...
```

2. **Update the file list** in `src/main.ts`:
```typescript
const GAMES_FILES = [
    'games/dragons-hoard.md',
    'games/shadows-of-arkham.md',
    'games/new-campaign.md'  // Add here!
];
```

3. **Rebuild**:
```bash
npm run build
```

4. **Refresh browser** - new content appears automatically!

## 📦 Build Commands

```bash
# One-time build
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch

# Development (watch + serve)
npm run dev
```

## 🎨 Features

### Dynamic Content Loading
- ✅ Fetches markdown files via fetch API
- ✅ Parses YAML frontmatter
- ✅ Converts markdown to HTML
- ✅ Displays 3 most recent items (sorted by date)
- ✅ Generates metadata badges (system, DM, date, location, etc.)

### Neobrutalism Styling
- ✅ Bold 4px black borders everywhere
- ✅ Hard offset shadows (no blur)
- ✅ Bright purple header sections
- ✅ Interactive hover effects
- ✅ Uppercase typography

### Article Pages
- ✅ Full markdown rendering
- ✅ Metadata display
- ✅ Back to home link
- ✅ Responsive design
- ✅ Matching neobrutalism aesthetic

## 🔧 Technical Details

### Why TypeScript?
- Type safety for frontmatter parsing
- Better developer experience with autocomplete
- Compiles to clean, modern JavaScript
- Easy to maintain and extend

### Why Client-Side?
- Keeps the site fully static (no server needed)
- Works with any static hosting (GitHub Pages, Netlify, etc.)
- No build step for HTML/CSS - only TypeScript
- Content updates just require recompiling TS

### Markdown Parser
- Simple regex-based parser (no heavy dependencies)
- Supports: headers, bold, italic, links, lists, paragraphs
- Can be extended with more features as needed
- Lightweight and fast

## 📝 What Changed

**Updated Files**:
- `index.html` - Removed hardcoded cards, added `<script>` tag for `main.js`
- `README.md` - Complete documentation of new workflow
- `.github/copilot-instructions.md` - Updated with TypeScript patterns

**New Directories**:
- `src/` - TypeScript source code
- `dist/` - Compiled JavaScript (gitignored)
- `node_modules/` - NPM dependencies (gitignored)

## 🎉 Result

The TTRPG Club website now has:
✅ **Dynamic content loading** from markdown files
✅ **Individual article pages** for each game/event  
✅ **Neobrutalism design** throughout
✅ **Type-safe TypeScript** for maintainability
✅ **Static hosting compatible** (no backend needed)
✅ **Easy content management** (just add markdown files)

The site is ready to use! Just open http://localhost:8000 and explore. 🎲✨

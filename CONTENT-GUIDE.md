# Content Management Guide

This document explains how to add and manage content for the Games and Events sections of the website.

## Current Implementation

Right now, the Games and Events sections display **static placeholder content** directly in `index.html`. The example markdown files in `/games/` and `/events/` folders demonstrate the expected format for future dynamic content loading.

## Folder Structure

```
ttrpgclub/
├── games/
│   ├── dragons-hoard.md
│   ├── shadows-of-arkham.md
│   └── [future game files]
└── events/
    ├── newbie-night-november.md
    ├── gm-workshop-november.md
    └── [future event files]
```

## YAML Frontmatter Format

### For Games (`/games/*.md`)

```yaml
---
title: Campaign Name
description: Short description (1-2 sentences)
thumbnail: /images/thumbnail.jpg
date: YYYY-MM-DD          # Campaign start date
system: Game system name  # e.g., "D&D 5e", "Pathfinder 2e"
dm: DM name              # or "keeper", "gm"
status: Active           # or "Recruiting", "Full", "Complete"
players: 4/6             # Current/Max
---
```

### For Events (`/events/*.md`)

```yaml
---
title: Event Name
description: Short description (1-2 sentences)
thumbnail: /images/thumbnail.jpg
date: YYYY-MM-DD
time: HH:MM AM/PM - HH:MM AM/PM
location: Venue name
type: Event category     # e.g., "Workshop", "One-Shot", "Social"
registration: Required   # or "Optional", "Walk-in"
spots: 15               # Capacity
---
```

## Content Body

After the frontmatter, write the full content in standard Markdown:

```markdown
# Main Heading

## Subheading

Regular paragraph text with **bold** and *italic* formatting.

- Bullet points
- Work great
- For lists

1. Numbered lists
2. Also supported

### Another subheading

More content here...
```

## Future Implementation Options

To dynamically load these markdown files into the website, consider:

### Option 1: Static Site Generator (Recommended)
- **11ty (Eleventy)**: Simple, powerful, great for markdown
- **Jekyll**: GitHub Pages native support
- **Hugo**: Very fast, single binary

### Option 2: Client-Side JavaScript
- Parse YAML frontmatter with `js-yaml`
- Render markdown with `marked` or `markdown-it`
- Load files via fetch API
- Display 3 most recent by date

### Option 3: Build Script
- Node.js script to parse markdown files
- Generate JSON data file
- Update HTML or create separate pages
- Run script when content changes

## Displaying on Website

Current sections are hardcoded in `index.html`:
- **Games section** (line ~82): `.items-grid` with 3 `.item-card` elements
- **Events section** (line ~118): `.items-grid` with 3 `.item-card` elements

Each card displays:
- `thumbnail` → `.item-thumbnail img[src]`
- `title` → `.item-content h3`
- `description` → `.item-content p`
- "Open" button → `.item-content .btn`

## Adding New Content (Manual Process)

Until dynamic loading is implemented:

1. **Create markdown file** in appropriate folder (`/games/` or `/events/`)
2. **Follow frontmatter format** shown above
3. **Update `index.html`** manually:
   - Find the corresponding section
   - Replace one of the placeholder cards
   - Update thumbnail path, title, description

## Image Management

Store images in an `/images/` folder (not yet created):

```
ttrpgclub/
└── images/
    ├── dragon-quest.jpg
    ├── cthulhu-campaign.jpg
    ├── oneshot-night.jpg
    └── [other images]
```

Reference in frontmatter:
```yaml
thumbnail: /images/dragon-quest.jpg
```

## Recommended Workflow

1. Create markdown file with complete information
2. Add corresponding image to `/images/` folder
3. Update website (manually now, automatically later)
4. Test that all links and images work

## File Naming Conventions

Use `kebab-case` for filenames:
- ✅ `dragons-hoard.md`
- ✅ `newbie-night-november.md`
- ✅ `gm-workshop-november.md`
- ❌ `Dragons Hoard.md`
- ❌ `NewbieNight.md`

## Questions?

See the example files in `/games/` and `/events/` folders for complete examples with full frontmatter and content.

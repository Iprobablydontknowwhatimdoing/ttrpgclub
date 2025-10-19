# TTRPG Club Website

A static website for our tabletop role-playing game club. Features information about our community, current games, upcoming events, and resources for players.

## 🎲 Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Static Header**: Easy navigation with smooth scrolling to sections
- **Hero Section**: Eye-catching introduction with call-to-action
- **Current Games**: Showcase of active campaigns (3 cards with images)
- **Upcoming Events**: Display of scheduled club events (3 cards with images)
- **Resources**: Links to rulebooks, character tools, VTTs, and learning materials
- **Footer**: Contact information and quick links

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start development server
npm run dev
```

Or serve with any static HTTP server:
```bash
# Python
python -m http.server 8000

# Then visit http://localhost:8000
```

### Development Workflow

1. **Edit TypeScript**: Make changes in `src/` directory
2. **Compile**: Run `npm run build` or `npm run watch` for auto-compilation
3. **Test**: Open `index.html` in browser (via HTTP server)
4. **Add Content**: Create markdown files in `games/` or `events/` folders

## 📁 Project Structure

```
ttrpgclub/
├── src/
│   ├── main.ts             # Homepage dynamic content loader
│   ├── article.ts          # Article page loader
│   └── markdown-loader.ts  # Markdown parsing utilities
├── dist/                   # Compiled JavaScript (generated)
├── games/                  # Game markdown files
│   ├── dragons-hoard.md
│   └── shadows-of-arkham.md
├── events/                 # Event markdown files
│   ├── newbie-night-november.md
│   └── gm-workshop-november.md
├── index.html              # Main homepage
├── article.html            # Article template page
├── style.css              # Neobrutalism styles
├── package.json           # Node dependencies
├── tsconfig.json          # TypeScript config
├── .github/
│   └── copilot-instructions.md  # AI coding guidelines
└── README.md              # This file
```

## 🎨 Design System

**Neobrutalism Aesthetic** - Inspired by [neobrutalism.dev](https://www.neobrutalism.dev/)

### Key Design Features
- **Bold Black Borders**: Every element has thick 4px black borders
- **Hard Shadows**: Offset shadows with no blur (8px 8px 0 black)
- **Bright Colors**: Vivid, saturated colors for maximum visual impact
- **Sharp Corners**: No border-radius - everything is geometric and raw
- **Uppercase Typography**: Heavy weights (700-900) for bold statements
- **Interactive Movement**: Elements translate toward their shadows on hover

### Color Palette
- **Primary Purple**: `#a855f7` - Hero section, branding
- **Secondary Blue**: `#3b82f6` - Buttons, accents
- **Accent Green**: `#10b981` - Resources section background
- **Yellow**: `#fbbf24` - Primary CTA buttons
- **Pink**: `#ec4899` - Call-to-action section
- **Orange**: `#f97316` - Footer background
- **Warm Beige**: `#fef3c7` - Main background
- **Light Blue**: `#dbeafe` - Alternate section background

### Typography
- Heavy font weights (700-900) throughout
- Uppercase headings for emphasis
- Tight letter-spacing for impact
- High contrast black text on bright backgrounds

## 🔮 Dynamic Content Loading

### How It Works

The site uses **client-side TypeScript** to dynamically load content from markdown files:

1. **Homepage (`index.html`)**: 
   - Loads `dist/main.js` which fetches markdown files
   - Displays 3 most recent games and events
   - Dynamically generates cards with titles, descriptions, and thumbnails

2. **Article Pages (`article.html`)**:
   - Loads `dist/article.js` which parses markdown content
   - Receives markdown file path via URL parameter (`?md=games/file.md`)
   - Renders full article with metadata and formatted content

### Adding New Content

1. **Create a markdown file** in `games/` or `events/`:

```markdown
---
title: Your Campaign Name
description: Brief one-liner description
thumbnail: /images/your-image.jpg
date: 2025-10-18
system: D&D 5e
dm: Your Name
status: Active
players: 4/6
---

# Your Content Here

Write your full campaign description using markdown...
```

2. **Update the file list** in `src/main.ts`:

```typescript
const GAMES_FILES = [
    'games/dragons-hoard.md',
    'games/shadows-of-arkham.md',
    'games/your-new-game.md'  // Add here
];
```

3. **Rebuild TypeScript**:
```bash
npm run build
```

4. **Refresh your browser** - the new content appears automatically!

### Markdown Features Supported

- **Headers**: `#`, `##`, `###`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Links**: `[text](url)`
- **Lists**: `*` or `1.` for bullets/numbers
- **Paragraphs**: Separated by blank lines

## 🛠️ Development

### Technology Stack
- **HTML5**: Semantic structure with neobrutalism styling
- **CSS3**: Custom properties, Grid, Flexbox
- **TypeScript**: Type-safe client-side content loading
- **Markdown**: Content authoring with YAML frontmatter

### Build Commands
```bash
npm run build   # Compile TypeScript once
npm run watch   # Auto-compile on file changes  
npm run dev     # Watch + serve on localhost:8000
```

### Making Changes

**To the design:**
1. Edit `style.css` for styling
2. Edit `index.html` or `article.html` for structure
3. Refresh browser to see changes

**To the functionality:**
1. Edit files in `src/` directory
2. Run `npm run build` to compile
3. Refresh browser to see changes

**To add content:**
1. Create markdown file in `games/` or `events/`
2. Add filename to list in `src/main.ts`
3. Run `npm run build`
4. Refresh browser

### Code Conventions
- 4-space indentation for HTML and CSS
- Semantic HTML5 elements
- CSS custom properties for theming
- Mobile-first responsive design

## 📱 Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is for the TTRPG Club community.

## 🎲 Contributing

Have suggestions? Open an issue or submit a pull request!

---

*May your rolls be high and your stories epic!* 🐉

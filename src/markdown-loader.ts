/**
 * Markdown Content Loader
 * Fetches and parses markdown files with YAML frontmatter
 */

interface Frontmatter {
    title: string;
    description: string;
    thumbnail?: string;
    date?: string;
    [key: string]: any;
}

interface MarkdownContent {
    frontmatter: Frontmatter;
    content: string;
}

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(markdown: string): MarkdownContent {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return {
            frontmatter: { title: 'Untitled', description: '' },
            content: markdown
        };
    }

    const frontmatterStr = match[1];
    const content = match[2];

    // Simple YAML parser (basic key: value pairs)
    const frontmatter: any = {};
    frontmatterStr.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            frontmatter[key] = value;
        }
    });

    return { frontmatter, content };
}

/**
 * Markdown to HTML converter using marked
 */
declare const marked: any;

function markdownToHtml(markdown: string): string {
    return marked.parse(markdown) as string;
}

/**
 * Fetch a markdown file
 */
async function fetchMarkdown(path: string): Promise<MarkdownContent> {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
        }
        const markdown = await response.text();
        return parseFrontmatter(markdown);
    } catch (error) {
        console.error('Error fetching markdown:', error);
        throw error;
    }
}

/**
 * List all markdown files in a directory (requires index)
 */
async function listMarkdownFiles(directory: string): Promise<string[]> {
    // This requires a manifest file since we can't list directory contents in browser
    try {
        const response = await fetch(`${directory}/index.json`);
        if (!response.ok) {
            console.warn(`No index.json found in ${directory}, using fallback`);
            return [];
        }
        const files: string[] = await response.json();
        return files.map(file => `${directory}/${file}`);
    } catch (error) {
        console.warn(`Could not load index for ${directory}:`, error);
        return [];
    }
}

/**
 * Load and display content in article page
 */
async function loadArticlePage(path: string): Promise<void> {
    try {
        const { frontmatter, content } = await fetchMarkdown(path);
        
        // Update page title
        document.title = `${frontmatter.title} - TTRPG Club`;
        
        // Update article title
        const titleElement = document.querySelector('.article-title');
        if (titleElement) {
            titleElement.textContent = frontmatter.title;
        }
        
        // Update description
        const descElement = document.querySelector('.article-description');
        if (descElement) {
            descElement.textContent = frontmatter.description;
        }
        
        // Update metadata
        const metaContainer = document.querySelector('.article-meta');
        if (metaContainer) {
            metaContainer.innerHTML = generateMetaHtml(frontmatter);
        }
        
        // Update content
        const contentElement = document.querySelector('.article-body');
        if (contentElement) {
            contentElement.innerHTML = markdownToHtml(content);
        }
    } catch (error) {
        console.error('Error loading article:', error);
        const contentElement = document.querySelector('.article-body');
        if (contentElement) {
            contentElement.innerHTML = '<p><strong>Error loading content.</strong> Please try again later.</p>';
        }
    }
}

/**
 * Generate metadata HTML based on content type
 */
function generateMetaHtml(frontmatter: Frontmatter): string {
    const items: string[] = [];
    
    // Game-specific metadata
    if (frontmatter.system) {
        items.push(`<span class="meta-item">📖 ${frontmatter.system}</span>`);
    }
    if (frontmatter.dm || frontmatter.keeper) {
        const gm = frontmatter.dm || frontmatter.keeper;
        const title = frontmatter.dm ? 'DM' : 'Keeper';
        items.push(`<span class="meta-item">🎭 ${title}: ${gm}</span>`);
    }
    if (frontmatter.status) {
        items.push(`<span class="meta-item">📊 ${frontmatter.status}</span>`);
    }
    if (frontmatter.players) {
        items.push(`<span class="meta-item">👥 ${frontmatter.players}</span>`);
    }
    
    // Event-specific metadata
    if (frontmatter.date) {
        items.push(`<span class="meta-item">📅 ${frontmatter.date}</span>`);
    }
    if (frontmatter.time) {
        items.push(`<span class="meta-item">🕐 ${frontmatter.time}</span>`);
    }
    if (frontmatter.location) {
        items.push(`<span class="meta-item">📍 ${frontmatter.location}</span>`);
    }
    if (frontmatter.type) {
        items.push(`<span class="meta-item">🏷️ ${frontmatter.type}</span>`);
    }
    
    return items.join('\n                ');
}

// Export functions for use in other modules
export {
    parseFrontmatter,
    markdownToHtml,
    fetchMarkdown,
    listMarkdownFiles,
    loadArticlePage,
    generateMetaHtml
};

export type { Frontmatter, MarkdownContent };

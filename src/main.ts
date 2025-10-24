/**
 * Main application entry point
 * Handles dynamic content loading for the homepage
 */

import { fetchMarkdown, listMarkdownFiles, type Frontmatter, type MarkdownContent } from './markdown-loader.js';
import { createPreviewCard } from './cards.js';
import './ui.js'; // Import UI interactions (mobile menu)

// Files are discovered via generated index.json manifests (see scripts/generate-manifests.mjs)

// Card creation now centralized in cards.ts

/**
 * Load and display games
 */
async function loadGames(): Promise<void> {
    const container = document.querySelector('#games .items-grid');
    if (!container) return;

    try {
        // Discover and load all game files
        const gameFiles = await listMarkdownFiles('games');
        const games = await Promise.all(
            gameFiles.map(file => fetchMarkdown(file).then(data => ({ data, file })))
        );
        
        // Sort by date (most recent first) and take first 3
        games.sort((a, b) => {
            const dateA = a.data.frontmatter.date || '';
            const dateB = b.data.frontmatter.date || '';
            return dateB.localeCompare(dateA);
        });
        
        const recentGames = games.slice(0, 3);
        
        // Generate HTML
        const html = recentGames.map(({ data, file }) => createPreviewCard(data, 'game', file, 'home')).join('');
        
        container.innerHTML = html;
        
    } catch (error) {
    console.error('Error loading games:', error);
    container.innerHTML = '<p class="loading-text">Error loading games. Please refresh the page.</p>';
    }
}

/**
 * Load and display updates
 */
async function loadUpdates(): Promise<void> {
    const container = document.querySelector('#updates .items-grid');
    if (!container) return;

    try {
    // Discover and load all update files
    const updateFiles = await listMarkdownFiles('updates');
        const updates = await Promise.all(
            updateFiles.map(file => fetchMarkdown(file).then(data => ({ data, file })))
        );
        
        // Sort by date (most recent first) and take first 3
        updates.sort((a, b) => {
            const dateA = a.data.frontmatter.date || '';
            const dateB = b.data.frontmatter.date || '';
            return dateB.localeCompare(dateA);
        });
        
        const recentUpdates = updates.slice(0, 3);
        
        // Generate HTML
    const html = recentUpdates.map(({ data, file }) => createPreviewCard(data, 'update', file, 'home')).join('');
        
        container.innerHTML = html;
        
    } catch (error) {
    console.error('Error loading updates:', error);
    container.innerHTML = '<p class="loading-text">Error loading updates. Please refresh the page.</p>';
    }
}

/**
 * Initialize the application
 */
async function init(): Promise<void> {
    console.log('🎲 TTRPG Club - Initializing...');
    
    // Load games and updates in parallel
    await Promise.all([
        loadGames(),
        loadUpdates()
    ]);
    
    console.log('✅ Content loaded successfully!');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { loadGames, loadUpdates, init };

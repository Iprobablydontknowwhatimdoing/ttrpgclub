/**
 * Main application entry point
 * Handles dynamic content loading for the homepage
 */

import { fetchMarkdown, type Frontmatter, type MarkdownContent } from './markdown-loader.js';
import { createPreviewCard } from './cards.js';
import './ui.js'; // Import UI interactions (mobile menu)

// Hardcoded file lists (since we can't dynamically list files in browser)
const GAMES_FILES = [
    'games/dragons-hoard.md',
    'games/shadows-of-arkham.md'
];

const EVENTS_FILES = [
    'events/newbie-night-november.md',
    'events/gm-workshop-november.md'
];

// Card creation now centralized in cards.ts

/**
 * Load and display games
 */
async function loadGames(): Promise<void> {
    const container = document.querySelector('#games .items-grid');
    if (!container) return;

    try {
        // Load all game files
        const gamePromises = GAMES_FILES.map(file => 
            fetchMarkdown(file).then(data => ({ data, file }))
        );
        
        const games = await Promise.all(gamePromises);
        
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
 * Load and display events
 */
async function loadEvents(): Promise<void> {
    const container = document.querySelector('#events .items-grid');
    if (!container) return;

    try {
        // Load all event files
        const eventPromises = EVENTS_FILES.map(file => 
            fetchMarkdown(file).then(data => ({ data, file }))
        );
        
        const events = await Promise.all(eventPromises);
        
        // Sort by date (most recent first) and take first 3
        events.sort((a, b) => {
            const dateA = a.data.frontmatter.date || '';
            const dateB = b.data.frontmatter.date || '';
            return dateB.localeCompare(dateA);
        });
        
        const recentEvents = events.slice(0, 3);
        
        // Generate HTML
        const html = recentEvents.map(({ data, file }) => createPreviewCard(data, 'event', file, 'home')).join('');
        
        container.innerHTML = html;
        
    } catch (error) {
    console.error('Error loading events:', error);
    container.innerHTML = '<p class="loading-text">Error loading events. Please refresh the page.</p>';
    }
}

/**
 * Initialize the application
 */
async function init(): Promise<void> {
    console.log('🎲 TTRPG Club - Initializing...');
    
    // Load games and events in parallel
    await Promise.all([
        loadGames(),
        loadEvents()
    ]);
    
    console.log('✅ Content loaded successfully!');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { loadGames, loadEvents, init };

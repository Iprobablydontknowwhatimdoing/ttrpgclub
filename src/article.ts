/**
 * Article page loader
 * Handles loading and displaying individual game/event pages
 */

import { loadArticlePage } from './markdown-loader.js';

/**
 * Initialize article page
 */
function init(): void {
    // Get the markdown file path from URL parameter
    const params = new URLSearchParams(window.location.search);
    const mdFile = params.get('md');
    
    if (!mdFile) {
        console.error('No markdown file specified in URL');
        const contentElement = document.querySelector('.article-body');
        if (contentElement) {
            contentElement.innerHTML = '<p><strong>Error:</strong> No content specified.</p>';
        }
        return;
    }
    
    // Load the article
    loadArticlePage(mdFile);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { init };

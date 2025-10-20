/**
 * Events archive page with filtering
 */

import { fetchMarkdown, type MarkdownContent } from './markdown-loader.js';
import { createPreviewCard } from './cards.js';
import './ui.js';

const EVENTS_FILES = [
    'events/newbie-night-november.md',
    'events/gm-workshop-november.md'
];

let allEvents: Array<{ data: MarkdownContent; file: string }> = [];

async function loadAllEvents(): Promise<void> {
    const container = document.getElementById('eventsGrid');
    if (!container) return;

    try {
        const eventPromises = EVENTS_FILES.map(file => 
            fetchMarkdown(file).then(data => ({ data, file }))
        );
        
        allEvents = await Promise.all(eventPromises);
        
        // Sort by date (most recent first)
        allEvents.sort((a, b) => {
            const dateA = a.data.frontmatter.date || '';
            const dateB = b.data.frontmatter.date || '';
            return dateB.localeCompare(dateA);
        });
        
        // Populate filters
        populateFilters();
        
        // Display all events
        displayEvents(allEvents);
        
    } catch (error) {
        console.error('Error loading events:', error);
        container.innerHTML = '<p class="loading-text">Error loading events. Please refresh the page.</p>';
    }
}

function populateFilters(): void {
    // No filter dropdowns needed for events, just search and sort
}

function displayEvents(events: Array<{ data: MarkdownContent; file: string }>): void {
    const container = document.getElementById('eventsGrid');
    if (!container) return;
    
    if (events.length === 0) {
        container.innerHTML = '<p class="loading-text">No events found matching your filters.</p>';
        return;
    }
    
    const html = events.map(({ data, file }) => createPreviewCard(data, 'event', file, 'archive')).join('');
    
    container.innerHTML = html;
}

function applyFilters(): void {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement)?.value.toLowerCase() || '';
    const sortBy = (document.getElementById('sortSelect') as HTMLSelectElement)?.value || 'date-desc';
    
    let filtered = allEvents.filter(({ data }) => {
        const matchSearch = !searchTerm || 
            data.frontmatter.title.toLowerCase().includes(searchTerm) ||
            data.frontmatter.description.toLowerCase().includes(searchTerm) ||
            (data.frontmatter.location && data.frontmatter.location.toLowerCase().includes(searchTerm)) ||
            (data.frontmatter.date && data.frontmatter.date.toLowerCase().includes(searchTerm));
        
        return matchSearch;
    });
    
    // Apply sorting
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'date-asc':
                return (a.data.frontmatter.date || '').localeCompare(b.data.frontmatter.date || '');
            case 'date-desc':
                return (b.data.frontmatter.date || '').localeCompare(a.data.frontmatter.date || '');
            case 'title-asc':
                return a.data.frontmatter.title.localeCompare(b.data.frontmatter.title);
            case 'title-desc':
                return b.data.frontmatter.title.localeCompare(a.data.frontmatter.title);
            default:
                return 0;
        }
    });
    
    displayEvents(filtered);
}

function clearFilters(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const sortSelect = document.getElementById('sortSelect') as HTMLSelectElement;
    
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'date-desc';
    
    displayEvents(allEvents);
}

// Initialize
loadAllEvents();

// Attach event listeners
document.getElementById('searchInput')?.addEventListener('input', applyFilters);
document.getElementById('sortSelect')?.addEventListener('change', applyFilters);
document.getElementById('clearFilters')?.addEventListener('click', clearFilters);

/**
 * Updates archive page with filtering
 */

import { fetchMarkdown, listMarkdownFiles, type MarkdownContent } from './markdown-loader.js';
import { createPreviewCard } from './cards.js';
import './ui.js';

// Files discovered via updates/index.json manifest

let allUpdates: Array<{ data: MarkdownContent; file: string }> = [];

async function loadAllUpdates(): Promise<void> {
    const container = document.getElementById('updatesGrid');
    if (!container) return;

    try {
        const files = await listMarkdownFiles('updates');
        allUpdates = await Promise.all(
            files.map(file => fetchMarkdown(file).then(data => ({ data, file })))
        );
        
        // Sort by date (most recent first)
        allUpdates.sort((a, b) => {
            const dateA = a.data.frontmatter.date || '';
            const dateB = b.data.frontmatter.date || '';
            return dateB.localeCompare(dateA);
        });
        
        // Populate filters
        populateFilters();
        
        // Display all updates
        displayUpdates(allUpdates);
        
    } catch (error) {
        console.error('Error loading updates:', error);
        container.innerHTML = '<p class="loading-text">Error loading updates. Please refresh the page.</p>';
    }
}

function populateFilters(): void {
    // No filter dropdowns needed for updates, just search and sort
}

function displayUpdates(updates: Array<{ data: MarkdownContent; file: string }>): void {
    const container = document.getElementById('updatesGrid');
    if (!container) return;
    
    if (updates.length === 0) {
        container.innerHTML = '<p class="loading-text">No updates found matching your filters.</p>';
        return;
    }
    
    const html = updates.map(({ data, file }) => createPreviewCard(data, 'update', file, 'archive')).join('');
    
    container.innerHTML = html;
}

function applyFilters(): void {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement)?.value.toLowerCase() || '';
    const sortBy = (document.getElementById('sortSelect') as HTMLSelectElement)?.value || 'date-desc';
    
    let filtered = allUpdates.filter(({ data }) => {
        const matchSearch = !searchTerm || 
            data.frontmatter.title.toLowerCase().includes(searchTerm) ||
            data.frontmatter.description.toLowerCase().includes(searchTerm) ||
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
    
    displayUpdates(filtered);
}

function clearFilters(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const sortSelect = document.getElementById('sortSelect') as HTMLSelectElement;
    
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'date-desc';
    
    displayUpdates(allUpdates);
}

// Initialize
loadAllUpdates();

// Attach event listeners
document.getElementById('searchInput')?.addEventListener('input', applyFilters);
document.getElementById('sortSelect')?.addEventListener('change', applyFilters);
document.getElementById('clearFilters')?.addEventListener('click', clearFilters);

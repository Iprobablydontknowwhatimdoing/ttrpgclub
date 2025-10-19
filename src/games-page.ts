/**
 * Games archive page with filtering
 */

import { fetchMarkdown, type MarkdownContent } from './markdown-loader.js';
import './ui.js';

const GAMES_FILES = [
    'games/dragons-hoard.md',
    'games/shadows-of-arkham.md'
];

let allGames: Array<{ data: MarkdownContent; file: string }> = [];

function createCard(data: MarkdownContent, filename: string): string {
    const { frontmatter } = data;
    const thumbnail = frontmatter.thumbnail || `https://via.placeholder.com/400x250/4a5568/ffffff?text=${encodeURIComponent(frontmatter.title)}`;
    
    const mdPath = `games/${filename}`;
    const articleLink = `/article.html?md=${encodeURIComponent(mdPath)}`;
    
    return `
        <div class="item-card" 
             data-system="${frontmatter.system || ''}" 
             data-status="${frontmatter.status || ''}" 
             data-dm="${frontmatter.dm || ''}">
            <div class="item-thumbnail">
                <img src="${thumbnail}" alt="${frontmatter.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x250/1e3a8a/ffffff?text=${encodeURIComponent(frontmatter.title)}';">
            </div>
            <div class="item-content">
                <h3>${frontmatter.title}</h3>
                <p>${frontmatter.description}</p>
                ${frontmatter.system ? `<p><strong>System:</strong> ${frontmatter.system}</p>` : ''}
                ${frontmatter.dm ? `<p><strong>DM:</strong> ${frontmatter.dm}</p>` : ''}
                ${frontmatter.status ? `<p><strong>Status:</strong> ${frontmatter.status}</p>` : ''}
            </div>
            <a href="${articleLink}" class="card-btn">Open</a>
        </div>
    `;
}

async function loadAllGames(): Promise<void> {
    const container = document.getElementById('gamesGrid');
    if (!container) return;

    try {
        const gamePromises = GAMES_FILES.map(file => 
            fetchMarkdown(file).then(data => ({ data, file }))
        );
        
        allGames = await Promise.all(gamePromises);
        
        // Sort by date (most recent first)
        allGames.sort((a, b) => {
            const dateA = a.data.frontmatter.date || '';
            const dateB = b.data.frontmatter.date || '';
            return dateB.localeCompare(dateA);
        });
        
        // Populate filters
        populateFilters();
        
        // Display all games
        displayGames(allGames);
        
    } catch (error) {
        console.error('Error loading games:', error);
        container.innerHTML = '<p class="loading-text">Error loading games. Please refresh the page.</p>';
    }
}

function populateFilters(): void {
    const systems = new Set<string>();
    const statuses = new Set<string>();
    const dms = new Set<string>();
    
    allGames.forEach(({ data }) => {
        if (data.frontmatter.system) systems.add(data.frontmatter.system);
        if (data.frontmatter.status) statuses.add(data.frontmatter.status);
        if (data.frontmatter.dm) dms.add(data.frontmatter.dm);
    });
    
    const systemFilter = document.getElementById('systemFilter') as HTMLSelectElement;
    const statusFilter = document.getElementById('statusFilter') as HTMLSelectElement;
    const dmFilter = document.getElementById('dmFilter') as HTMLSelectElement;
    
    if (systemFilter) {
        systems.forEach(system => {
            const option = document.createElement('option');
            option.value = system;
            option.textContent = system;
            systemFilter.appendChild(option);
        });
    }
    
    if (statusFilter) {
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            statusFilter.appendChild(option);
        });
    }
    
    if (dmFilter) {
        dms.forEach(dm => {
            const option = document.createElement('option');
            option.value = dm;
            option.textContent = dm;
            dmFilter.appendChild(option);
        });
    }
}

function displayGames(games: Array<{ data: MarkdownContent; file: string }>): void {
    const container = document.getElementById('gamesGrid');
    if (!container) return;
    
    if (games.length === 0) {
        container.innerHTML = '<p class="loading-text">No games found matching your filters.</p>';
        return;
    }
    
    const html = games.map(({ data, file }) => {
        const filename = file.split('/').pop() || '';
        return createCard(data, filename);
    }).join('');
    
    container.innerHTML = html;
}

function applyFilters(): void {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement)?.value.toLowerCase() || '';
    const systemFilter = (document.getElementById('systemFilter') as HTMLSelectElement)?.value || '';
    const statusFilter = (document.getElementById('statusFilter') as HTMLSelectElement)?.value || '';
    const dmFilter = (document.getElementById('dmFilter') as HTMLSelectElement)?.value || '';
    const sortBy = (document.getElementById('sortSelect') as HTMLSelectElement)?.value || 'date-desc';
    
    let filtered = allGames.filter(({ data }) => {
        const matchSystem = !systemFilter || data.frontmatter.system === systemFilter;
        const matchStatus = !statusFilter || data.frontmatter.status === statusFilter;
        const matchDM = !dmFilter || data.frontmatter.dm === dmFilter;
        
        const matchSearch = !searchTerm || 
            data.frontmatter.title.toLowerCase().includes(searchTerm) ||
            data.frontmatter.description.toLowerCase().includes(searchTerm) ||
            (data.frontmatter.system && data.frontmatter.system.toLowerCase().includes(searchTerm)) ||
            (data.frontmatter.dm && data.frontmatter.dm.toLowerCase().includes(searchTerm));
        
        return matchSystem && matchStatus && matchDM && matchSearch;
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
    
    displayGames(filtered);
}

function clearFilters(): void {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const systemFilter = document.getElementById('systemFilter') as HTMLSelectElement;
    const statusFilter = document.getElementById('statusFilter') as HTMLSelectElement;
    const dmFilter = document.getElementById('dmFilter') as HTMLSelectElement;
    const sortSelect = document.getElementById('sortSelect') as HTMLSelectElement;
    
    if (searchInput) searchInput.value = '';
    if (systemFilter) systemFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (dmFilter) dmFilter.value = '';
    if (sortSelect) sortSelect.value = 'date-desc';
    
    displayGames(allGames);
}

// Initialize
loadAllGames();

// Attach event listeners
document.getElementById('searchInput')?.addEventListener('input', applyFilters);
document.getElementById('systemFilter')?.addEventListener('change', applyFilters);
document.getElementById('statusFilter')?.addEventListener('change', applyFilters);
document.getElementById('dmFilter')?.addEventListener('change', applyFilters);
document.getElementById('sortSelect')?.addEventListener('change', applyFilters);
document.getElementById('clearFilters')?.addEventListener('click', clearFilters);

/**
 * Shared preview card renderer for games and updates
 */

import type { MarkdownContent } from './markdown-loader.js';

type Kind = 'game' | 'update';
type Context = 'home' | 'archive';

function buildArticleLink(kind: Kind, filePath: string): string {
    const filename = filePath.split('/').pop() || filePath;
    let folder: string;
    switch (kind) {
        case 'game':
            folder = 'games';
            break;
        case 'update':
            folder = 'updates';
            break;
        default:
            folder = '';
    }
    const mdPath = folder ? `${folder}/${filename}` : filename;
    return `/article.html?md=${encodeURIComponent(mdPath)}`;
}

function buildDataAttributes(data: MarkdownContent, kind: Kind, context: Context): string {
    if (context !== 'archive') return '';
    const fm = data.frontmatter as any;
    const attrs: string[] = [];
    if (kind === 'game') {
        if (fm.system) attrs.push(`data-system="${String(fm.system)}"`);
        if (fm.status) attrs.push(`data-status="${String(fm.status)}"`);
        if (fm.dm) attrs.push(`data-dm="${String(fm.dm)}"`);
    } else {
        if (fm.date) attrs.push(`data-date="${String(fm.date)}"`);
        if (fm.location) attrs.push(`data-location="${String(fm.location)}"`);
    }
    return attrs.length ? ' ' + attrs.join(' ') : '';
}

function buildMetaChips(data: MarkdownContent, kind: Kind, _context: Context): string[] {
    const fm = data.frontmatter as any;
    const chips: string[] = [];
    if (kind === 'game') {
        if (fm.system) chips.push(`System: ${escapeHtml(String(fm.system))}`);
        if (fm.players) chips.push(`Players: ${escapeHtml(String(fm.players))}`);
    }
    // No chips for updates
    return chips;
}

/**
 * Create a card HTML element for games/updates
 */
export function createPreviewCard(data: MarkdownContent, kind: Kind, filePath: string, context: Context): string {
    const { frontmatter } = data;
    const thumbnail = frontmatter.thumbnail || `https://via.placeholder.com/400x250/4a5568/ffffff?text=${encodeURIComponent(frontmatter.title)}`;
    const articleLink = buildArticleLink(kind, filePath);
    const dataAttrs = buildDataAttributes(data, kind, context);
    const metaChips = buildMetaChips(data, kind, context);

    return `
        <div class="card item-card"${dataAttrs}>
            <div class="item-thumbnail">
                <img src="${thumbnail}" alt="${frontmatter.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x250/1e3a8a/ffffff?text=${encodeURIComponent(frontmatter.title)}';">
            </div>
            <div class="item-content">
                <h3>${frontmatter.title}</h3>
                <p>${frontmatter.description}</p>
                ${(kind === 'game' && metaChips.length) ? `
                <div class="tag-chips">
                    ${metaChips.map(m => `<span class=\"meta-item\">${m}</span>`).join('\n                    ')}
                </div>` : ''}
            </div>
            <a href="${articleLink}" class="card-btn">Open</a>
        </div>
    `;
}

export type { Kind as PreviewKind, Context as PreviewContext };

// Helpers
function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function extractTags(frontmatter: Record<string, unknown>): string[] {
    const raw = (frontmatter as any).tags;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
    if (typeof raw === 'string') {
        const str = raw.trim();
        // Try parse bracketed list: [a, b, c]
        if (str.startsWith('[') && str.endsWith(']')) {
            try {
                const normalized = str
                    .replace(/'/g, '"');
                const parsed = JSON.parse(normalized);
                if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
            } catch {
                // fall through to comma split
            }
        }
        // Comma-separated
        return str.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
}

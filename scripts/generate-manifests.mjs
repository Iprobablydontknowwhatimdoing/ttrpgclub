#!/usr/bin/env node
/**
 * Generate index.json manifests for games and updates folders
 * Lists all .md files so the client-side JS can discover them dynamically
 */

import { readdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const root = process.cwd();

function generateManifest(folderName) {
    const folderPath = resolve(root, folderName);
    
    try {
        // Read all files in the folder
        const files = readdirSync(folderPath);
        
        // Filter to only .md files
        const markdownFiles = files
            .filter(file => file.endsWith('.md'))
            .sort(); // Sort alphabetically for consistency
        
        // Write index.json
        const manifestPath = join(folderPath, 'index.json');
        writeFileSync(manifestPath, JSON.stringify(markdownFiles, null, 2));
        
        console.log(`✅ Generated ${folderName}/index.json with ${markdownFiles.length} files`);
        return markdownFiles;
    } catch (error) {
        console.error(`❌ Error generating manifest for ${folderName}:`, error.message);
        return [];
    }
}

console.log('📝 Generating content manifests...\n');

const gamesFiles = generateManifest('games');
const updatesFiles = generateManifest('updates');

console.log(`\n✨ Done! Found ${gamesFiles.length} games, and ${updatesFiles.length} updates.`);

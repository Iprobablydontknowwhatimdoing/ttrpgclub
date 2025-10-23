#!/usr/bin/env node
/**
 * Simple build script using esbuild
 * Bundles TypeScript into single files per page
 */

import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

// Common build options - just bundle, no minification or tree-shaking
const commonOptions = {
    bundle: true,
    minify: false,
    sourcemap: true,
    target: 'es2020',
    format: 'esm',
    logLevel: 'info',
};

// Build configurations for each page
const builds = [
    {
        entryPoints: ['src/main.ts'],
        outfile: 'dist/homepage.bundle.js',
    },
    {
        entryPoints: ['src/games-page.ts'],
        outfile: 'dist/games.bundle.js',
    },
    {
        entryPoints: ['src/events-page.ts'],
        outfile: 'dist/events.bundle.js',
    },
    {
        entryPoints: ['src/article.ts'],
        outfile: 'dist/article.bundle.js',
    },
    {
        entryPoints: ['src/chrome.ts'],
        outfile: 'dist/chrome.bundle.js',
    },
];

async function buildAll() {
    console.log(`\n🎲 Building TTRPG Club...\n`);
    
    try {
        for (const config of builds) {
            const options = {
                ...commonOptions,
                ...config,
            };
            
            if (watch) {
                const ctx = await esbuild.context(options);
                await ctx.watch();
                console.log(`👀 Watching ${config.outfile}...`);
            } else {
                await esbuild.build(options);
                console.log(`✅ Built ${config.outfile}`);
            }
        }
        
        if (!watch) {
            console.log('\n🎉 Build complete!\n');
        } else {
            console.log('\n👀 Watching for changes...\n');
        }
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run builds
buildAll();

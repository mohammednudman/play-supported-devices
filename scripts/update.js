import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchHTML } from '../dist/fetcher.js';
import { parseHTML } from '../dist/parser.js';
/**
 * This script fetches the latest HTML from the specified URL,
 * parses it to extract device information, and saves it to a JSON file.
 * It is intended to be run in a development environment.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.resolve(__dirname, '../data/devices.json');

(async () => {
  try {
    const html = await fetchHTML();
    console.log('✅ HTML fetched. Length:', html.length);
    const devices = parseHTML(html);
    console.log('✅ Parsed entries:', devices.length);
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(devices, null, 2));
    console.log(`[${new Date().toISOString()}] ✅ Updated ${devices.length} devices`);
  } catch (err) {
    console.error('❌ Failed to update devices:', err.message);
    process.exit(1);
  }
})();

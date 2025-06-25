const fs = require('fs');
const path = require('path');
const { fetchHTML } = require('../dist/fetcher');  // JS
const { parseHTML } = require('../dist/parser');

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

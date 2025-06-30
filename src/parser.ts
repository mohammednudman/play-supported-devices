import { JSDOM } from 'jsdom';
import { DeviceEntry } from './types';

export function parseHTML(html: string): DeviceEntry[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const table = document.querySelector('table');
  const tbody = table?.querySelector('tbody');
  if (!tbody) {
    console.warn('[parser.ts] ❌ No <tbody> found.');
    return [];
  }

  const rows = Array.from(tbody.querySelectorAll('tr'));
  console.log(`[parser.ts] 🔍 Found ${rows.length} <tr> rows.`);

  const devices: DeviceEntry[] = [];

  for (const [i, row] of rows.entries()) {
    const cols = row.querySelectorAll('td');

    const device: DeviceEntry = {
      marketingName: cols[1].textContent?.trim() || '',
      device: cols[2].textContent?.trim() || '',
      model: cols[3].textContent?.trim() || '',
      manufacturer: cols[0].textContent?.trim() || '',
      codename: cols[2].textContent?.trim() || '',
    };

    devices.push(device);
  }

  return devices;
}

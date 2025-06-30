import fs from 'fs';
import path from 'path';
import { DeviceEntry } from './types';

const CACHE_PATH = path.resolve(__dirname, '../data/devices.json');

export function readCache(): DeviceEntry[] {
  try {
    const raw = fs.readFileSync(CACHE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) throw new Error('Invalid JSON format');
    return parsed as DeviceEntry[];
  } catch (err) {
    if (err instanceof Error) {
      console.error(`[cache.ts] Failed to read cache: ${err.message}`);
    } else {
      console.error(`[cache.ts] Failed to read cache: ${String(err)}`);
    }
    return [];
  }
}

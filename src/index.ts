import { readCache } from './cache';
import { DeviceIndex } from './search';
import { DeviceEntry } from './types';

let _index: DeviceIndex | null = null;

function getIndex(): DeviceIndex {
  if (!_index) {
    const entries = readCache();
    _index = new DeviceIndex(entries);
  }
  return _index;
}

export function getAllDevices(): DeviceEntry[] {
  return readCache();
}

export function listColumns(): (keyof DeviceEntry)[] {
  return getIndex().listColumns();
}

export function searchExact(column: keyof DeviceEntry, value: string): DeviceEntry[] {
  return getIndex().findExact(column, value);
}

export function searchContains(column: keyof DeviceEntry, value: string): DeviceEntry[] {
  return getIndex().findContains(column, value);
}

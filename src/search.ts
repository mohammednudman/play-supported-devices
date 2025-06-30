import { DeviceEntry } from './types';

type Index = Map<string, DeviceEntry[]>;

export class DeviceIndex {
  private indexes: Record<keyof DeviceEntry, Index> = {
    marketingName: new Map(),
    device: new Map(),
    model: new Map(),
    manufacturer: new Map(),
    codename: new Map(),
  };

  constructor(entries: DeviceEntry[]) {
    for (const entry of entries) {
      for (const key of Object.keys(this.indexes) as (keyof DeviceEntry)[]) {
        const raw = entry[key];
        const value = raw?.toLowerCase().trim();
        if (!value) continue;

        if (!this.indexes[key].has(value)) {
          this.indexes[key].set(value, []);
        }
        this.indexes[key].get(value)!.push(entry);
      }
    }
  }

  findExact(column: keyof DeviceEntry, value: string): DeviceEntry[] {
    return this.indexes[column].get(value.toLowerCase()) || [];
  }

  findContains(column: keyof DeviceEntry, value: string): DeviceEntry[] {
    const term = value.toLowerCase();
    const results: DeviceEntry[] = [];

    for (const [key, list] of this.indexes[column]) {
      if (key.includes(term)) {
        results.push(...list);
      }
    }

    return results;
  }

  listColumns(): (keyof DeviceEntry)[] {
    return Object.keys(this.indexes) as (keyof DeviceEntry)[];
  }

  /**
   * Get all unique values present in a given column.
   */
  getColumnValues(column: keyof DeviceEntry): string[] {
    return Array.from(this.indexes[column].keys()).sort((a, b) => a.localeCompare(b));
  }
}

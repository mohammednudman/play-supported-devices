import { describe, it, expect } from 'vitest';
import { DeviceIndex } from '../src/search';
import { mockDevices } from './fixtures/devices';

describe('DeviceIndex', () => {
    const index = new DeviceIndex(mockDevices);

    it('should return exact match for manufacturer', () => {
        const samsung = index.findExact('manufacturer', 'Samsung');
        expect(samsung.length).toBe(1);
        expect(samsung[0].model).toBe('SM-S928B');
    });

    it('should return exact match for codename', () => {
        const pixel = index.findExact('codename', 'husky');
        expect(pixel.length).toBe(1);
        expect(pixel[0].marketingName).toContain('Pixel');
    });

    it('should return partial matches with findContains', () => {
        const result = index.findContains('codename', 'dm');
        expect(result.length).toBe(1);
        expect(result[0].marketingName).toContain('Galaxy');
    });

    it('should return empty array for non-existent match', () => {
        const result = index.findExact('manufacturer', 'Motorola');
        expect(result).toEqual([]);
    });

    it('should list all valid columns', () => {
        const columns = index.listColumns();
        expect(columns).toEqual([
            'marketingName',
            'device',
            'model',
            'manufacturer',
            'codename',
        ]);
    });

    it('should return all values for a column', () => {
        const values = index.getColumnValues('manufacturer');
        expect(values).toContain('samsung');
        expect(values).toContain('google');
        expect(values).toContain('oneplus');
        expect(values.length).toBe(3);
    });

    it('should return unique values for a column', () => {
        const values = index.getColumnValues('manufacturer');
        const unique = new Set(values);
        expect(values.length).toBe(unique.size);
    });
});

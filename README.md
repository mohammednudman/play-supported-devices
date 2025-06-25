# 📱 play-supported-devices

[![npm](https://img.shields.io/npm/v/play-supported-devices?color=blue&label=npm)](https://www.npmjs.com/package/play-supported-devices)
[![license](https://img.shields.io/npm/l/play-supported-devices)](./LICENSE)
[![auto-update](https://github.com/mohammednudman/play-supported-devices/actions/workflows/refresh.yml/badge.svg)](https://github.com/mohammednudman/play-supported-devices/actions)

> A fast, searchable, auto-updating local cache of [Google Play Supported Devices](https://storage.googleapis.com/play_public/supported_devices.html) as a lightweight NPM package.

---

## 🚀 Features

- 🧠 Pre-parsed JSON of Google’s supported Android devices
- 🔍 Optimized in-memory search engine for exact and partial matches
- ⚡ Fast lookups by `manufacturer`, `model`, `codename`, etc.
- 🔁 Auto-refresh every 3 hours via GitHub Actions (or manually via CLI)
- ✅ Zero dependencies for end users
- 📦 Ready for use in Node.js, web tools, or CLIs

---

## 📦 Installation

```bash
npm install play-supported-devices
```

---

## 🔧 Usage

### Basic Example

```ts
import {
  getAllDevices,
  searchExact,
  searchContains,
  listColumns
} from 'play-supported-devices';

const all = getAllDevices();
console.log(`Total devices: ${all.length}`);

const samsungs = searchExact('manufacturer', 'Samsung');
console.log('Samsung devices:', samsungs.length);

const partial = searchContains('model', 'S928');
console.table(partial.slice(0, 5));

console.log('Available columns:', listColumns());
```

---

## 🧠 Data Structure

Each device entry follows:

```ts
interface DeviceEntry {
  marketingName: string;   // e.g. "Galaxy S24 Ultra"
  device: string;          // e.g. "dm3q" (same as codename)
  model: string;           // e.g. "SM-S928B"
  manufacturer: string;    // e.g. "Samsung"
  codename: string;        // e.g. "dm3q"
}
```

---

## 🔍 Search API

All queries are **case-insensitive**.

### `getAllDevices(): DeviceEntry[]`

Returns all devices from the local cache.

---

### `searchExact(column, value): DeviceEntry[]`

Find entries where the column exactly matches the value.

```ts
searchExact('manufacturer', 'Samsung');
```

---

### `searchContains(column, value): DeviceEntry[]`

Find entries where the column contains the value.

```ts
searchContains('model', '928B');
```

---

### `listColumns(): (keyof DeviceEntry)[]`

Get list of valid searchable columns:
```ts
['marketingName', 'device', 'model', 'manufacturer', 'codename']
```

---

## 🔄 Updating the Cache

### Manually

```bash
npm run update
```

This fetches the latest HTML from Google and updates `data/devices.json`.

### Automatically

A GitHub Actions workflow runs every **3 hours** to keep the cache fresh and versioned.

---

## 💻 CLI (optional)

> Coming soon

Use the package via CLI with commands like:

```bash
npx play-supported-devices samsung
npx play-supported-devices --contains model S928B
```

---

## 📁 Project Structure

```
.
├── src/               # Core logic and index
├── data/devices.json  # Auto-updated JSON cache
├── scripts/update.ts  # Refresh logic
├── test/              # Vitest test suite
└── README.md
```

---

## ✅ Development

```bash
npm install
npm run build        # Compile with tsup
npm run test         # Run tests with vitest
npm run update       # Fetch and regenerate devices.json
```

---

## 📃 License

MIT © [Mohammed Nudman Raza Shaikh](https://github.com/mohammednudman)

---

## 🙌 Contributions

PRs and suggestions welcome!  
If the HTML structure changes, feel free to file an issue or submit a parser patch.

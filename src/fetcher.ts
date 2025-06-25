import fetch from 'node-fetch';

export const GOOGLE_PLAY_DEVICES_URL =
    'https://storage.googleapis.com/play_public/supported_devices.html';

export async function fetchHTML(url = GOOGLE_PLAY_DEVICES_URL): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch device list: ${response.status} ${response.statusText}`);
    }

    return response.text();
}

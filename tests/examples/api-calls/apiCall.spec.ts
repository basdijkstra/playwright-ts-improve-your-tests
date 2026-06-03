import { test, expect } from '@playwright/test';

test('Making an API call', async ({ request }) => {

    const response = await request.get('https://api.zippopotam.us/us/90210', {
        headers: {
            'Accept': 'application/json'
        }
    });

    expect(response.status()).toBe(200);
    
    const data = await response.json();

    expect(data.places[0]['place name']).toBe('Beverly Hills');
});


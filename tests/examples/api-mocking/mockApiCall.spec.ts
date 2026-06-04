import { test, expect } from "@playwright/test";

test('Example of mocking an API call', async ({ page }) => {
    
    // Mock the api call before navigating
    await page.route('*/**/api/v1/fruits', async route => {
    const data = [{ name: 'Jackfruit', id: 21 }];
    await route.fulfill({ status: 200, json: data });
    });
    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Assert that the Strawberry fruit is visible
    await expect(page.getByText('Jackfruit')).toBeVisible();
});


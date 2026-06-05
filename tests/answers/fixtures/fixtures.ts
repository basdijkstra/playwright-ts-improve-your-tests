import { APIRequestContext, test as base, expect, type Page } from "@playwright/test";

type Fixtures = {
    /**
     * TODO: Register your fixture here
     */
    initializedDB: Page;
}

export const test = base.extend<Fixtures>({
    /**
     * TODO: Add your fixture implementation here
     * It should contain the code required to
     * - Go to the admin page
     * - Click on the INIT button
     * - Wait for the message 'Database Initialized' to appear
     * 
     * Then, return the current page by calling use()
     * 
     * No teardown code is required for this exercise.
     */
    initializedDB: async ({ page }, use) => {

    await page.goto('/');
    
    await page.locator("//a[text()='Admin Page']").click();
    await page.locator("//button[@value='INIT']").click();
    await expect(page.locator("//b[text()='Database Initialized']")).toBeVisible();
    
    await use(page);
  },
});

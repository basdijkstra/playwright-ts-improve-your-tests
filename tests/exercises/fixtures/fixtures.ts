import { test as base, expect, type Page } from "@playwright/test";

type Fixtures = {
    /**
     * TODO: Register your fixture here
     */
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
});

import { test as base, Page } from '@playwright/test';

// Declare the types of your fixtures.
type MyFixtures = {
  setupTodos: Page;
};

// Extend base test by providing a "setupTodos" fixture.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({

  setupTodos: async ({ page }, use) => {
    // Set up the fixture.
    const textboxTodo = page.locator('input.new-todo');

    await page.goto('https://demo.playwright.dev/todomvc/');
    await textboxTodo.fill('Walk the dog');
    await textboxTodo.press('Enter');
    await textboxTodo.fill('Order coffee');
    await textboxTodo.press('Enter');

    // Use the fixture value in the test.
    await use(page);

    // Any clean up code goes here.
    
  },
});



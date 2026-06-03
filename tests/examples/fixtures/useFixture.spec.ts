import { expect } from '@playwright/test';
import { test } from './fixtures';

test('basic test', async ({ setupTodos: page }) => {
  await expect(page.locator('[data-testid=todo-item]')).toContainText(['Walk the dog', 'Order coffee']);
});



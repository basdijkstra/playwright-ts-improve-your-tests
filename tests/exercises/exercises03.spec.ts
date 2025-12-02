import { test, expect } from '@playwright/test';
import { LoginPage } from '../answers/pages/loginPage';
import { AccountsOverviewPage } from '../answers/pages/accountsOverviewPage';
import { RequestLoanPage } from '../answers/pages/requestLoanPage';

/**
 * TODO: Refactor these two tests into a single, parameterized test
 * Which values differ from one test to the other? Pass those in as parameters
 * These can be input values, but also expected output values
 */
test('Loan application for 10000 with down payment of 1000 is denied', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'INIT' }).click();
  await expect(page.getByText('Database Initialized')).toBeVisible();

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  await new RequestLoanPage(page).submitLoanRequestFor('10000', '1000', '12345');

  await expect(page.locator('td[id=loanStatus]')).toHaveText('Denied');
});

test('Loan application for 1000 with down payment of 500 is approved', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'INIT' }).click();
  await expect(page.getByText('Database Initialized')).toBeVisible();

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  await new RequestLoanPage(page).submitLoanRequestFor('1000', '500', '12345');

  await expect(page.locator('td[id=loanStatus]')).toHaveText('Approved');
});
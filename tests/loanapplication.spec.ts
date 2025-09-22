import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';

test('Loan application for 10000 with down payment of 1000 is denied', async ({ page }) => {

  var loginPage = new LoginPage(page);
  await loginPage.open();

  await page.getByRole('link', { name: 'Admin Page'}).click();
  await page.locator("//button[@value='INIT']").click();
  await expect(page.locator("//b[text()='Database Initialized']")).toBeVisible();

  await loginPage.loginAs('john', 'demo');

  new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequest('10000', '1000', '12345')

  await requestLoanPage.resultShouldBe('Denied');
  
});

test('Loan application for 1000 with down payment of 500 is approved', async ({ page }) => {

  var loginPage = new LoginPage(page);
  await loginPage.open();

  await page.getByRole('link', { name: 'Admin Page'}).click();
  await page.locator("//button[@value='INIT']").click();
  await expect(page.locator("//b[text()='Database Initialized']")).toBeVisible();

  await loginPage.loginAs('john', 'demo');

  new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequest('1000', '500', '12345')

  await requestLoanPage.resultShouldBe('Approved');
});
import { test, expect, request } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';

test('Loan application for 10000 with down payment of 1000 is denied', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'INIT' }).click();
  await expect(page.getByText('Database Initialized')).toBeVisible();

  /**
   * TODO: Replace this code with code that uses the LoginPage object.
   * This class has already been defined. First, call the open() method,
   * then the loginAs() method, passing in the credentials required to successfully log in.
   */
  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  /**
   * TODO: Replace this code with code that uses the AccountsOverviewPage object.
   * This class has already been defined. Implement and then call a selectMenuItem()
   * method to navigate to the 'Request Loan' page.
   */
  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  /**
   * TODO: Replace this code with code that uses the RequestLoanPage object.
   * You will need to define this class yourself.
   * 
   * Add a method submitLoanRequestFor() that takes the values needed to
   * submit a loan request and performs the required interactions.
   */
  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequestFor('10000', '1000', '12345');

  await expect(requestLoanPage.loanApplicationResult).toHaveText('Denied');
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

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequestFor('1000', '500', '12345');

  await expect(requestLoanPage.loanApplicationResult).toHaveText('Approved');
});

test('Loan application for 100 with down payment of 10 is approved', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'INIT' }).click();
  await expect(page.getByText('Database Initialized')).toBeVisible();

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequestFor('100', '10', '12345');

  await expect(requestLoanPage.loanApplicationResult).toHaveText('Approved');
});
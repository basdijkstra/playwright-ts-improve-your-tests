import { expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';
import { test } from './fixtures/fixtures';

/**
 * TODO: Refactor all three tests so that they use your newly created fixture.
 * Remove the code that initializes from the tests. Run the tests and inspect
 * the report. Make sure that your fixture is properly used.
 */
test('Loan application for 10000 with down payment of 1000 is denied', async ({ initializedDB: page }) => {

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequestFor('10000', '1000', '12345');

  await expect(requestLoanPage.loanApplicationResult).toHaveText('Denied');
});

test('Loan application for 1000 with down payment of 500 is approved', async ({ initializedDB: page }) => {

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequestFor('1000', '500', '12345');

  await expect(requestLoanPage.loanApplicationResult).toHaveText('Approved');
});

test('Loan application for 100 with down payment of 10 is approved', async ({ initializedDB: page }) => {

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');

  await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequestFor('100', '10', '12345');

  await expect(requestLoanPage.loanApplicationResult).toHaveText('Approved');
});
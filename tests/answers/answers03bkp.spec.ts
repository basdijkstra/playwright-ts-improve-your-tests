import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';

/**
 * TODO: Refactor these two tests into a single, parameterized test
 * Which values differ from one test to the other? Pass those in as parameters
 * These can be input values, but also expected output values
 */
const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: 'Denied' },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: 'Approved'}
]

for (const data of test_data) {

  test(`Loan application for ${data.amount} with down payment of ${data.downPayment} is ${data.expectedResult}`, async ({ page }) => {

    await page.goto('https://parabank.parasoft.com');

    await page.getByRole('link', { name: 'Admin Page' }).click();
    await page.getByRole('button', { name: 'INIT' }).click();
    await expect(page.getByText('Database Initialized')).toBeVisible();

    var loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAs('john', 'demo');

    await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

    await new RequestLoanPage(page).submitLoanRequestFor(data.amount, data.downPayment, data.fromAccountId);

    await expect(page.locator('td[id=loanStatus]')).toHaveText(data.expectedResult);
  });
}
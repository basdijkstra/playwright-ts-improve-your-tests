import { expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';
import { test } from './fixtures/fixtures';

/**
 * TODO: Refactor these three tests into a single, parameterized test
 * Which values differ from one test to the other? Pass those in as parameters
 * These can be input values, but also expected output values
 */
const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: 'Denied' },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: 'Approved'},
  { amount: '100', downPayment: '10', fromAccountId: '12345' , expectedResult: 'Approved'}
]

for (const test_case of test_data) {

  test(`Loan application for ${test_case.amount} with down payment of ${test_case.downPayment} is ${test_case.expectedResult}`, async ({ initializedDB: page }) => {

    var loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAs('john', 'demo');

    await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

    var requestLoanPage = new RequestLoanPage(page);
    await requestLoanPage.submitLoanRequestFor(test_case.amount, test_case.downPayment, test_case.fromAccountId);

    await expect(requestLoanPage.loanApplicationResult).toHaveText(test_case.expectedResult);
  });
}
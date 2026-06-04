import { expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';
import { test } from './fixtures/fixtures';

const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: false, expectedResultDisplayed: 'Denied' },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: true, expectedResultDisplayed: 'Approved' }
]

for (const test_case of test_data) {

  test(`Loan application for ${test_case.amount} with down payment of ${test_case.downPayment} is approved: ${test_case.expectedResult}`, async ({ initializedDB: page }) => {

    /** 
     * TODO: define a mock response for the API call that the browser makes to
     *   '* / ** / requestLoan?customerId=12212&amount=${data.amount}&downPayment=${data.downPayment}&fromAccountId=${data.fromAccountId}'
     *   (remove the spaces).
     * 
     * The mock API response should have a status code 200
     * 
     * The mock JSON response body should have these fields and values:
     *   responseDate = 1758177294806
     *   loanProviderName = "Mock loan provider"
     *   approved = data.expectedResult
     *   accountId = 14121
     * 
     * Have a good look at the actual response that is returned by the ParaBank backend to make sure your
     * mock response has the same structure!
     */

    await page.route(`*/**/requestLoan?customerId=12212&amount=${test_case.amount}&downPayment=${test_case.downPayment}&fromAccountId=${test_case.fromAccountId}`, async route => {
      const mockResponse = {
        responseDate: 1758177294806,
        loanProviderName: 'Mock loan provider',
        approved: test_case.expectedResult,
        accountId: 14121
      };
      await route.fulfill({ status: 200, json: mockResponse });
    });

    var loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAs('john', 'demo');

    await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

    var requestLoanPage = new RequestLoanPage(page);
    await requestLoanPage.submitLoanRequestFor(test_case.amount, test_case.downPayment, test_case.fromAccountId);

    await expect(requestLoanPage.loanApplicationResult).toHaveText(test_case.expectedResultDisplayed);

    /**
     * TODO: Verify that the loan provider displayed on screen is equal to 'Mock loan provider'.
     * 
     * To do this, use the property in the RequestLoanPage that gives access to the element.
     */
    await expect(requestLoanPage.loanProviderName).toHaveText('Mock loan provider');
  });
}
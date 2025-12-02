import { test, expect } from '@playwright/test';
import { LoginPage } from '../answers/pages/loginPage';
import { AccountsOverviewPage } from '../answers/pages/accountsOverviewPage';
import { RequestLoanPage } from '../answers/pages/requestLoanPage';

test.beforeEach(async ({ request }) => {

    const response = await request.post('https://parabank.parasoft.com/parabank/services/bank/initializeDB');
    expect(response.status()).toBe(204);
});

const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: false, expectedResultDisplayed: 'Denied' },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: true, expectedResultDisplayed: 'Approved' }
]

for (const data of test_data) {

  test(`Loan application for ${data.amount} with down payment of ${data.downPayment} is approved: ${data.expectedResult}`, async ({ page }) => {

    /** 
     * TODO: define a mock response for the API call that the browser makes to
     *   '* / ** / requestLoan?customerId=12212&amount=${data.amount}&downPayment=${data.downPayment}&fromAccountId=${data.fromAccountId}'
     *   (remove the spaces).
     * 
     * The mock JSON response body should have these fields and values:
     *   responseDate = 1758177294806
     *   loanProviderName = "Mock loan provider"
     *   approved = data.expectedResult
     *   accountId = 14121
     */

    var loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.loginAs('john', 'demo');

    await new AccountsOverviewPage(page).selectMenuItem('Request Loan');

    await new RequestLoanPage(page).submitLoanRequestFor(data.amount, data.downPayment, data.fromAccountId);

    await expect(page.locator('td[id=loanStatus]')).toHaveText(data.expectedResultDisplayed);

    /**
     * TODO: Verify that the loan provider displayed on screen is equal to 'Mock loan provider'
     */
  });
}
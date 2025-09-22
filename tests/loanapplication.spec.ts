import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { RequestLoanPage } from './pages/requestLoanPage';

test.beforeEach( async ({page, request}) => {

  var response = await request.post('https://parabank.parasoft.com/parabank/services/bank/initializeDB')
  expect(response.status()).toBe(204);

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');
});

[
  { amount: '10000', downPayment: '1000', expectedResult: 'Denied' },
  { amount: '1000', downPayment: '500', expectedResult: 'Approved' }
]
.forEach(({amount, downPayment, expectedResult}) => {

  test(`Loan application for ${amount} with down payment of ${downPayment} is ${expectedResult}`, async ({ page, request }) => {

  new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequest(amount, downPayment, '12345')

  await requestLoanPage.loanApplicationResultShouldBe(expectedResult);
});
})

test('Submit loan request via API', async ({ request }) => {

  var response = await request.post(
    'https://parabank.parasoft.com/parabank/services/bank/requestLoan?customerId=12212&amount=10000&downPayment=1000&fromAccountId=12456',
    {
      headers: {
        'Accept': 'application/json'
      }
    }
  );
  expect(response.status()).toBe(200);
  var responseBody = await response.json();
  expect(responseBody.approved).toBe(false);
  
});

test('Mock API call to backend when submitting loan request', async ({ page }) => {

  new AccountsOverviewPage(page).selectMenuItem('Request Loan');

  await page.route('*/**/requestLoan?customerId=12212&amount=1000&downPayment=500&fromAccountId=12345', async route => {

    const mockResponse = {responseDate: 1758177294806, loanProviderName: "My mocked API response", approved: true, accountId: 14121}
    
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse)
    });
  });

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequest('1000', '500', '12345')

  await requestLoanPage.loanApplicationResultShouldBe('Approved')
  await requestLoanPage.loanProviderNameShouldBe('My mocked API response');

});
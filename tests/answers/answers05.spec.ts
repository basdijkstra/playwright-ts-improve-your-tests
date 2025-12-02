import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {

    const response = await request.post('https://parabank.parasoft.com/parabank/services/bank/initializeDB');
    expect(response.status()).toBe(204);
});

const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: false },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: true }
]

for (const data of test_data) {

  test(`Loan application for ${data.amount} with down payment of ${data.downPayment} is approved: ${data.expectedResult}`, async ({ request }) => {

    /**
     * TODO: Change the expectedResult values from 'Denied' and 'Approved' to false and true, respectively
     * 
     * Change the injected object from page to request to make this a pure API Playwright test
     * 
     * Replace the UI automation code with a POST call to https://parabank.parasoft.com/parabank/services/bank/requestLoan
     * 
     * Add a request header 'Accept' with value 'application/json' to ask the API to return data in JSON format
     * 
     * Add the following query parameters:
     *   * customerId = 12212
     *   * amount = amount
     *   * downPayment = downPayment
     *   * fromAccountId = fromAccountId
     *   
     * I haven't shown you how to add headers or query parameters to a request. Can you find out for yourself?
     * 
     * Check that the response status code is equal to HTTP 200
     * 
     * Check that the value of the 'approved' field in the response body equals the value
     *   of the approved parameter
     */

    const response = await request.post('https://parabank.parasoft.com/parabank/services/bank/requestLoan', {
      headers: {
        'Accept': 'application/json'
      },
      params: {
        'customerId': 12212,
        'amount': data.amount,
        'downPayment': data.downPayment,
        'fromAccountId': data.fromAccountId
      }
    });

    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData.approved).toBe(data.expectedResult);
  });
}
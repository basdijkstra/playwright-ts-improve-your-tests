import { expect } from '@playwright/test';
import { test } from './fixtures/fixtures';

const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: false },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: true },
  { amount: '100', downPayment: '10', fromAccountId: '12345' , expectedResult: true }
]

for (const test_case of test_data) {

  test(`Loan application for ${test_case.amount} with down payment of ${test_case.downPayment} is approved: ${test_case.expectedResult}`, async ({ initializedDB: page, request }) => {

    /**
     * TODO: Change the expectedResult values from 'Denied' and 'Approved' to false and true, respectively
     * 
     * Add the request fixture so we can make API calls (you can inject multiple fixtures into a test)
     * 
     * Replace the UI automation code with a POST call to /parabank/services/bank/requestLoan
     * 
     * Add a request header 'Accept' with value 'application/json' to ask the API to return data in JSON format
     * 
     * Add the following query parameters:
     *   * customerId = 12212
     *   * amount = amount
     *   * downPayment = downPayment
     *   * fromAccountId = fromAccountId
     *   
     * I haven't shown you how to add query parameters to a request. Can you find out for yourself?
     * 
     * Check that the response status code is equal to HTTP 200
     * 
     * Check that the value of the 'approved' field in the response body equals the value
     *   of the expectedResult parameter
     */

    const response = await request.post('/parabank/services/bank/requestLoan', {
      headers: {
        'Accept': 'application/json'
      },
      params: {
        'customerId': 12212,
        'amount': test_case.amount,
        'downPayment': test_case.downPayment,
        'fromAccountId': test_case.fromAccountId
      }
    });

    expect(response.status()).toBe(200);

    const responseData = await response.json();
    expect(responseData.approved).toBe(test_case.expectedResult);
  });
}
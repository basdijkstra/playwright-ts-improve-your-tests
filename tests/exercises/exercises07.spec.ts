import { expect } from '@playwright/test';
import { test } from '../answers/fixtures/fixtures';

/**
 * TODO: Replace the individual amount, downPayment and fromAccountId fields with a
 * LoanApplication type to provide type safety and introduce defaults for properties.
 * 
 * Feel free to choose between using a class and a constructor that accepts defaults,
 * or to use a type and a builder class. See the examples for, you guessed it, examples.
 * 
 * It's up to you to decide which option to choose, but I'd love to hear which one you
 * picked afterwards, and more importantly, _why_ you picked that option.
 * 
 * (and no, 'because it was the easiest option' is not an answer I'll accept...)
 * 
 * Don't forget to update the test implementation, too.
 */
const test_data = [
  { amount: '10000', downPayment: '1000', fromAccountId: '12345' , expectedResult: false },
  { amount: '5000', downPayment: '500', fromAccountId: '12345' , expectedResult: true },
  { amount: '100', downPayment: '10', fromAccountId: '12345' , expectedResult: true }
]

for (const test_case of test_data) {

  test(`Loan application for ${test_case.amount} with down payment of ${test_case.downPayment} is approved: ${test_case.expectedResult}`, async ({ initializedDB: page, request }) => {

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
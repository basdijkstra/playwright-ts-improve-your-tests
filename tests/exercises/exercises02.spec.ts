import { test, expect } from '@playwright/test';

test('Loan application for 10000 with down payment of 1000 is denied', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'INIT' }).click();
  await expect(page.getByText('Database Initialized')).toBeVisible();

  /**
   * TODO: Replace this code with code that uses the LoginPage object.
   * This class has already been defined. First, call the Open() method,
   * then the LoginAs() method, passing in the credentials required to successfully log in.
   */
  await page.locator('input[name=username]').fill('john');
  await page.locator('input[name=password]').fill('demo');
  await page.getByRole('button', { name: 'Log In' }).click();

  /**
   * TODO: Replace this code with code that uses the AccountsOverviewPage object.
   * This class has already been defined. Call the selectMenuItem() method to
   * navigate to the 'Request Loan' page.
   */
  await page.getByRole('link', { name: 'Request Loan'}).click();

  /**
   * TODO: Replace this code with code that uses the RequestLoanPage object.
   * You will need to define this class yourself.
   * 
   * Add a method submitLoanRequestFor() that takes the values needed to
   * submit a loan request and performs the required interactions. 
   * 
   * Also add a property loanApplicationResult that exposes the loan application
   * result, and use it in the assertion here in the test method.
   */
  await page.locator('input[id=amount]').fill('10000');
  await page.locator('input[id=downPayment]').fill('1000');
  await page.locator('select[id=fromAccountId]').selectOption('12345');
  await page.getByRole('button', { name: 'Apply Now' }).click();

  /**
   * We'll look at alternatives for this statement below together after the exercise
   */
  await expect(page.locator('td[id=loanStatus]')).toHaveText('Denied');
});

test('Loan application for 1000 with down payment of 500 is approved', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'INIT' }).click();
  await expect(page.getByText('Database Initialized')).toBeVisible();

  await page.locator('input[name=username]').fill('john');
  await page.locator('input[name=password]').fill('demo');
  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByRole('link', { name: 'Request Loan'}).click();

  await page.locator('input[id=amount]').fill('1000');
  await page.locator('input[id=downPayment]').fill('500');
  await page.locator('select[id=fromAccountId]').selectOption('12345');
  await page.getByRole('button', { name: 'Apply Now' }).click();

  await expect(page.locator('td[id=loanStatus]')).toHaveText('Approved');
});
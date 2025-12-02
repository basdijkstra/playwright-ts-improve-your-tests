import { test, expect } from '@playwright/test';

test('Loan application for 10000 with down payment of 1000 is denied', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page'}).click();
  await page.locator("//button[@value='INIT']").click();
  await expect(page.locator("//b[text()='Database Initialized']")).toBeVisible();

  await page.locator("//input[@name='username']").fill('john');
  await page.locator("//input[@name='password']").fill('demo');
  await page.locator("//input[@value='Log In']").click();

  await page.getByRole('link', { name: 'Request Loan'}).click();

  await page.locator("//input[@id='amount']").fill('10000');
  await page.locator("//input[@id='downPayment']").fill('1000');
  await page.locator("//select[@id='fromAccountId']").selectOption('12345');
  await page.locator("//input[@value='Apply Now']").click();

  await expect(page.locator("//td[@id='loanStatus']")).toHaveText('Denied');
});

test('Loan application for 1000 with down payment of 500 is approved', async ({ page }) => {

  await page.goto('https://parabank.parasoft.com');

  await page.getByRole('link', { name: 'Admin Page'}).click();
  await page.locator("//button[@value='INIT']").click();
  await expect(page.locator("//b[text()='Database Initialized']")).toBeVisible();

  await page.locator("//input[@name='username']").fill('john');
  await page.locator("//input[@name='password']").fill('demo');
  await page.locator("//input[@value='Log In']").click();

  await page.getByRole('link', { name: 'Request Loan'}).click();

  await page.locator("//input[@id='amount']").fill('1000');
  await page.locator("//input[@id='downPayment']").fill('500');
  await page.locator("//select[@id='fromAccountId']").selectOption('12345');
  await page.locator("//input[@value='Apply Now']").click();

  await expect(page.locator("//td[@id='loanStatus']")).toHaveText('Approved');
});
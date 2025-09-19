import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AccountsOverviewPage } from './pages/accountsOverviewPage';
import { ApiHelpers } from './api/apiHelpers';
import { RequestLoanPage } from './pages/requestLoanPage';

test.beforeEach('Set up database and log in', async({page, request}) => {

  new ApiHelpers(request).initDB();

  var loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs('john', 'demo');
})

test('Loan application for 10000 with down payment of 1000 is denied', async ({ page }) => {

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequest('10000', '1000', '12345');
  await requestLoanPage.resultShouldBe('Denied');  
});

test('Loan application for 1000 with down payment of 500 is approved', async ({ page }) => {

  var requestLoanPage = new RequestLoanPage(page);
  await requestLoanPage.submitLoanRequest('1000', '500', '12345');
  await requestLoanPage.resultShouldBe('Approved'); 
});
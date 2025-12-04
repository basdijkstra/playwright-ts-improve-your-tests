import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../answers/pages/loginPage';
import { AccountsOverviewPage } from '../answers/pages/accountsOverviewPage';
import { RequestLoanPage } from '../answers/pages/requestLoanPage';

test('Using a custom browser', async () => {

    var chrome = await chromium.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        headless: false
    })

    var context = await chrome.newContext();
    var page = await context.newPage();

    await page.goto('https://parabank.parasoft.com');
    
      await page.getByRole('link', { name: 'Admin Page' }).click();
      await page.getByRole('button', { name: 'INIT' }).click();
      await expect(page.getByText('Database Initialized')).toBeVisible();
    
      /**
       * TODO: Replace this code with code that uses the LoginPage object.
       * This class has already been defined. First, call the Open() method,
       * then the LoginAs() method, passing in the credentials required to successfully log in.
       */
      var loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.loginAs('john', 'demo');
    
      /**
       * TODO: Replace this code with code that uses the AccountsOverviewPage object.
       * This class has already been defined. Call the selectMenuItem() method to
       * navigate to the 'Request Loan' page.
       */
      await new AccountsOverviewPage(page).selectMenuItem('Request Loan');
    
      /**
       * TODO: Replace this code with code that uses the RequestLoanPage object.
       * You will need to define this class yourself.
       * 
       * Add a method submitLoanRequestFor() that takes the values needed to
       * submit a loan request and performs the required interactions.
       */
      await new RequestLoanPage(page).submitLoanRequestFor('10000', '1000', '12345');
    
      /**
       * We'll look at alternatives for this statement below together after the exercise
       */
      await expect(page.locator('td[id=loanStatus]')).toHaveText('Denied');
})
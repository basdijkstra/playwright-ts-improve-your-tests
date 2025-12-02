import { Page } from "@playwright/test";

export class RequestLoanPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async submitLoanRequestFor(amount: string, downPayment: string, fromAccountId: string) {
        await this.page.locator('input[id=amount]').fill(amount);
        await this.page.locator('input[id=downPayment]').fill(downPayment);
        await this.page.locator('select[id=fromAccountId]').selectOption(fromAccountId);
        await this.page.getByRole('button', { name: 'Apply Now' }).click();        
    }
}
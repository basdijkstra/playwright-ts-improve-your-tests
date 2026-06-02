import { Locator, Page } from "@playwright/test";

export class RequestLoanPage {

    private readonly page: Page;
    readonly loanApplicationResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loanApplicationResult = this.page.getByTestId('loanStatus');
    }

    async submitLoanRequestFor(amount: string, downPayment: string, fromAccountId: string) {
        await this.page.getByTestId('amount').fill(amount);
        await this.page.getByTestId('downPayment').fill(downPayment);
        await this.page.getByTestId('fromAccountId').selectOption(fromAccountId);
        await this.page.getByRole('button', { name: 'Apply Now' }).click();     
    }
}
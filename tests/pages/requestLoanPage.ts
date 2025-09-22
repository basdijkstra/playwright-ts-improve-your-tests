import { expect, Page } from "@playwright/test";

export class RequestLoanPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async submitLoanRequest(amount: string, downPayment: string, fromAccountId: string) {
        await this.page.locator("//input[@id='amount']").fill(amount);
        await this.page.locator("//input[@id='downPayment']").fill(downPayment);
        await this.page.locator("//select[@id='fromAccountId']").selectOption(fromAccountId);
        await this.page.locator("//input[@value='Apply Now']").click();
    }

    async resultShouldBe(expected: string) {
        await expect(this.page.locator("//td[@id='loanStatus']")).toHaveText(expected)
    }
}
import { expect, Page } from "@playwright/test";
import { Menu } from "../components/menu";

export class RequestLoanPage {

    readonly page: Page;
    readonly menu: Menu;

    constructor(page: Page) {
        this.page = page;
        this.menu = new Menu(this.page);
    }

    async submitLoanRequest(amount: string, downPayment: string, fromAccountId: string) {
        await this.page.locator("//input[@id='amount']").fill(amount);
        await this.page.locator("//input[@id='downPayment']").fill(downPayment);
        await this.page.locator("//select[@id='fromAccountId']").selectOption(fromAccountId);
        await this.page.locator("//input[@value='Apply Now']").click();
    }

    async loanApplicationResultShouldBe(expected: string) {
        await expect(this.page.locator("//td[@id='loanStatus']")).toHaveText(expected);
    }

    async loanProviderNameShouldBe(expected: string) {
        await expect(this.page.locator("//td[@id='loanProviderName']")).toHaveText(expected);
    }
}
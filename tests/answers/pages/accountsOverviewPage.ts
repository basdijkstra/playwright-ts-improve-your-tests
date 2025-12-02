import { Page } from "@playwright/test";

export class AccountsOverviewPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectMenuItem(menuitem: string) {
        await this.page.getByRole('link', { name: menuitem }).click();
    }
}
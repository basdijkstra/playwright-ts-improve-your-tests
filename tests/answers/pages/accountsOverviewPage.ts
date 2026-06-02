import { Page } from "@playwright/test";

export class AccountsOverviewPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * TODO: Implement a selectMenuItem() method to navigate to a menu item
     * that is passed in as a string argument to the method.
     */
    async selectMenuItem(menuitem: string) {
        await this.page.getByRole('link', { name: menuitem }).click();
    }
}
import { Page } from "@playwright/test";

export class Menu {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectMenuItem(menuItem: string) {
        await this.page.getByRole('link', { name: menuItem}).click();
    }
}
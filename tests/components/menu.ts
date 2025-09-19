import { Page } from "@playwright/test";

export class Menu {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectMenuItem(item: string) {
        await this.page.getByRole('link', { name: item }).click();
    }
}
import { Page } from '@playwright/test';

export class BasePage {

    private readonly page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    async selectMenuItem(menuitem: string) {
        await this.page.getByRole('link', { name: menuitem }).click();
    }
}
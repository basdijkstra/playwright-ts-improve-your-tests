import { Page } from "@playwright/test";

export class LoginPage {

    private readonly page: Page;
    private readonly url: string = 'https://parabank.parasoft.com';

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto(this.url)
    }

    async loginAs(username: string, password: string) {
        await this.page.locator('input[name=username]').fill(username);
        await this.page.locator('input[name=password]').fill(password);
        await this.page.getByRole('button', { name: 'Log In' }).click();
    }
}
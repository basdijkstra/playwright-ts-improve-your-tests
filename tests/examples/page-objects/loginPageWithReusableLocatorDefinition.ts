import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly page: Page;
    private readonly url: string;
    private readonly textfieldUsername: Locator;
    private readonly textfieldPassword: Locator;
    private readonly buttonDoLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = '/';
        this.textfieldUsername = this.page.locator('input[name=username]');
        this.textfieldPassword = this.page.locator('input[name=password]');
        this.buttonDoLogin = this.page.getByRole('button', { name: 'Log In' });
    }

    async open() {
        await this.page.goto(this.url)
    }

    async loginAs(username: string, password: string) {
        await this.textfieldUsername.fill(username);
        await this.textfieldPassword.fill(password);
        await this.buttonDoLogin.click();
    }
}


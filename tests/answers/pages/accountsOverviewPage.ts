import { Page } from "@playwright/test";
import { MenuComponent } from "../components/menuComponent";

export class AccountsOverviewPage {

    private readonly page: Page;
    private readonly menu: MenuComponent;

    constructor(page: Page) {
        this.page = page;
        this.menu = new MenuComponent(this.page);
    }

    async selectMenuItem(menuitem: string) {
        await this.menu.selectMenuItem(menuitem);
    }
}
import { APIRequestContext, expect } from "@playwright/test";

export class ApiHelpers {

    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async initDB() {
        const response = await this.request.post('https://parabank.parasoft.com/parabank/services/bank/initializeDB');
        expect(response.status()).toEqual(204);
    }
}
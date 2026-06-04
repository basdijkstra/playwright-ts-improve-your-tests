export class Post {

    readonly userId: number;
    readonly title: string;
    readonly body: string;

    constructor({ userId, title, body } : { userId?: number, title?: string, body?: string }) {
        this.userId = userId ?? 1;
        this.title = title ?? 'Default title';
        this.body = body ?? 'Default body';
    }
}


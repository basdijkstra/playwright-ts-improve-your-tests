import { Post } from "./postType";

export class PostBuilder {

    private readonly post: Post = {} as Post;

    private constructor() {}

    static create(): PostBuilder {
        return new PostBuilder();
    }

    static createWithDefaults(): PostBuilder {
        return PostBuilder.create()
        .withUserId(1)
        .withTitle('Default title')
        .withBody('Default body');
    }

    build(): Post {
        return this.post;
    }

    withUserId(userId: number): PostBuilder {
        this.post.userId = userId;
        return this;
    }

    withTitle(title: string): PostBuilder {
        this.post.title = title;
        return this;
    }

    withBody(body: string): PostBuilder {
        this.post.body = body;
        return this;
    }
}
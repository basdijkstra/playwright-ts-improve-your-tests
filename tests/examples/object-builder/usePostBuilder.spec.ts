import test from "@playwright/test";
import { PostBuilder } from "./postBuilder";

test('create post with builder', async () => {
	const post = PostBuilder.create().build();
	console.log(JSON.stringify(post, null, 2));
});

test('create post with builder and defaults', async () => {
	const post = PostBuilder.createWithDefaults().build();
	console.log(JSON.stringify(post, null, 2));
});

test('create post with builder and defaults, override the title', async () => {
	const post = PostBuilder.createWithDefaults().withTitle('A snazzier title').build();
	console.log(JSON.stringify(post, null, 2));
});
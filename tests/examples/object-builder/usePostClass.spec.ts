import test from "@playwright/test";
import { Post } from "./postClass";


test('create post with default values', async () => {
	const post = new Post({});
	console.log(JSON.stringify(post, null, 2));
});

test('create post with one custom value', async () => {
	const post = new Post({
		title: 'A snazzier title' 
	});
	console.log(JSON.stringify(post, null, 2));
});

test('create post with all custom values', async () => {
	const post = new Post({
		userId: 2,
		title: 'A snazzier title',
		body: 'Awesome content!'
	});
	console.log(JSON.stringify(post, null, 2));
});
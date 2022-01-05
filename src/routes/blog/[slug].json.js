import posts from './_posts.js';

export async function get({ params }) {
	const { slug } = params;

	const post = await posts.find(post => post.slug === slug);

	return {
		body: {
			post
		},
		status: 200,
	};
}

import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug,
		date: post.date
	};
}));

export async function get() {
    return {
        body: {
            contents
        },
        status: 200,
    };
}
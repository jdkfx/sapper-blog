import posts from './_posts.js';

export async function get() {
    return {
        body: {
            posts: posts.map(post => ({
                title: post.title,
                slug: post.slug,
                date: post.date
            })),
        },
        status: 200,
    };
}
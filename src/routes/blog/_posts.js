// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import fs from "fs";
import fm from "front-matter";
import marked from "marked";
import hljs from "highlight.js";

const articles = fs.readdirSync("articles");

marked.setOptions({
	highlight: function (code, lang) {
		return hljs.highlight(lang, code).value;
	}
});

const posts = [];

for (let i = 0; i < articles.length; i++ ) {
	const content = fs.readFileSync(`articles/${articles[i]}`, { encoding: "utf-8" });
	const { body, ...frontMatter } = fm(content);
	const html = marked(body);
	posts.push({ html, ...frontMatter.attributes });
}

// const posts = [
// 	{
// 		title: 'How can I get involved?',
// 		slug: 'how-can-i-get-involved',
// 		html: `
// 			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
// 		`
// 	}
// ];

// posts.forEach(post => {
// 	post.html = post.html.replace(/^\t{3}/gm, '');
// });

export default posts;

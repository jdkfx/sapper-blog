// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import {readdirSync, readFileSync, statSync} from "fs";
import path from "path";
import fm from "front-matter";
import { marked } from "marked";
import hljs from "highlight.js";

const renderer = new marked.Renderer();
renderer.code = (code, lang)=>{
	return `<pre style="background-color: black;"><code class="${lang} hljs">${hljs.highlightAuto(code, [lang]).value}</code></pre>`;
}
marked.setOptions({
	breaks: true,
	langPrefix: "",
	renderer: renderer,
});

const posts = [];

try {
	const articleDir = path.join(process.cwd(), "/articles");
	const fileList = readdirSync(articleDir);
	for(const fileName of fileList){
		if(fileName.length < 4 || fileName.slice(-3) !== ".md")continue;
		const filePath = path.join(articleDir, fileName);
		const stats = statSync(filePath);
		if(!stats.isFile())continue;
		const file = readFileSync(filePath, "utf-8");
		const content = fm(file);
		const post = {
			slug: fileName.slice(0, -3),
			title: content.attributes.title,
			date: content.attributes.date,
			html: marked(content.body),
		};
		posts.push(post);
	}
} catch (err) {
	console.error(err);
}

posts.sort((a,b)=>{
	return a.date === b.date ? 0 : (a.date < b.date ? 1 : -1);
});

export default posts;

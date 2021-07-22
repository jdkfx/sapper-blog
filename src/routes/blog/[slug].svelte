<script context="module">
	import TwitterShare from '../../components/TwitterShare.svelte';

	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>

<style>
	.content {
		width: 90%;
		margin: auto;
	}

	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	.content :global(p) :global(img) {
		width: 50%;
		border-radius: 20px;
		box-shadow: 15px 15px 0px 0 #ff6316;
	}

	.article-top {
		margin-bottom: 2em;
	}

	.article-top h1 {
		font-size: 2em;
		font-style: italic;
		font-weight: bold;
	}

	.article-top h3 {
		font-style: italic;
		font-weight: bold;
	}

	@media screen and ( max-width:480px )
	{
		.content {
			margin-top: 35%;
		}

		.content :global(p) :global(img) {
			width: 100%;
		}
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="content">
	<div class="article-top">
		<h1>{post.title}</h1>
		<h3>{post.date}</h3>
	</div>

	{@html post.html}

	<TwitterShare
		text="{post.title}"
		url="https://jdkfx.com/blog/{post.slug}"
		hashtags="jdkfx_blog"
	/>
</div>

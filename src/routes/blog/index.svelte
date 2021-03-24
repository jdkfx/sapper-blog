<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;

	// console.log(posts);
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}

	li {
		font-family: "MS Pゴシック",sans-serif;
		font-size: 1.5em;
		font-weight: bold;
		list-style: none;
	}

	.post {
		margin: 0;
		padding: 0;
	}

	.post h3 {
		font-size: 1em;
		font-weight: bold;
	}

	a {
		text-decoration: none;
	}

	.post p {
		font-size: 0.8em;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li>
			<div class="post">
				<h3><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></h3>
				<p>{post.date}</p>
			</div>
		</li>
	{/each}
</ul>

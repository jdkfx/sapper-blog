<script context="module">
	export async function load({ fetch }) {
		const url = "/blog.json";
		const res = await fetch(url);

		if (!res.ok) {
			return {
				status: res.status,
				error: new Error(`Nyan!!`),
			};
		}

		const { posts } = await res.json();
		
		return {
			props: { posts },
		}
	}
</script>

<script>
	export let posts;

	//console.log(posts);
</script>

<style>
	ul {
		width: 90%;
		margin: auto;
		padding: 0;
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

	.post h1 a {
		font-size: 0.7em;
		font-style: italic;
		font-weight: bold;
	}

	a {
		text-decoration: none;
	}

	.post p {
		font-size: 0.8em;
		color: #808080;
	}

	@media screen and ( max-width:480px )
	{
		.content {
			margin-top: 35%;
		}

		.post h1 a {
			font-size: 0.6em;
			font-style: italic;
			font-weight: bold;
		}
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="content">
	<ul>
		{#each posts as post}
			<li>
				<div class="post">
					<h1><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></h1>
					<p>{post.date}</p>
				</div>
			</li>
		{/each}
	</ul>
</div>

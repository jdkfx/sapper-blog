<script>
	export let segment;
</script>

<style>
	nav {
		background-color: #ff6316;
		font-family: "MS Pゴシック",sans-serif;
		height: 100%;
		position: fixed;
    width: 20%;
    z-index: 30;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		padding-top: 50px;
	}

	li {
		display: inline;
		font-style: italic;
		list-style: none;
		margin: 0;
		padding: 0;
		text-align: center;
	}

	li a {
		color: #ffffff;
		display: block;
		margin: 2px 0px;
		padding: 3px 10px;
		text-decoration: none;
	}

	.my-link {
		/* margin: 0 auto; */
		text-align: center;
	}

	.fa-twitter,.fa-github {
		color: #ffffff;
		padding: 0.3em;
	}
</style>

<nav>
	<ul>
		<li><a style="font-size: 2em;font-weight: bold;" aria-current="{segment === undefined ? 'page' : undefined}" href=".">jdkfx.com</a></li>
		<li><a style="font-size: 1.8em;" aria-current="{segment === 'about' ? 'page' : undefined}" href="about">About</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a style="font-size: 1.8em;" rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">Blog</a></li>
		<div class="my-link">
			<a href="https://twitter.com/jdkfx" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter fa-3x"></i></a>
			<a href="https://github.com/jdkfx" target="_blank" rel="noopener noreferrer"><i class="fab fa-github fa-3x"></i></a>
		</div>
	</ul>
</nav>

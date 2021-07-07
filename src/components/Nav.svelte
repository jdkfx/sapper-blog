<script>
	export let segment;
</script>

<style>
	nav {
		box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
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

	li a, .top-php {
		color: #ffffff;
		display: block;
		margin: 2px 0px;
		padding: 3px 10px;
		text-decoration: none;
	}

	.top-php {
		font-size: 2em;
		font-weight: bold;
	}

	.title {
		font-size: 2em;
		font-weight: bold;
	}

	.size18 {
		font-size: 1.8em;
	}

	li .my-link a {
		/* margin: 0 auto; */
		display: inline-block;
		text-align: center;
	}

	.fa-twitter,.fa-github {
		color: #ffffff;
		padding: 0.3em;
	}

	@media screen and ( max-width:480px )
	{
		nav {
			box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .2);
			font-size: 1em ;
			height: 17%;
			position: fixed;
			width: 100%;
			z-index: 10;
		}

		ul {
			padding-top: 0;
			text-align: center;
		}

		li {
			display: inline-block;
			font-size: 0.7em;
		}

		.top-php {
			display: none;
		}

		.title {
			display: block;
		}
	}
</style>

<nav>
	<ul>
		<li class="top-php">&lt;?php</li>
		<li class="title"><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">jdkfx.com</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a class="size18" rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">$blogs</a></li>
		<li>
			<div class="my-link">
				<a href="https://twitter.com/jdkfx" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter fa-3x"></i></a>
				<a href="https://github.com/jdkfx" target="_blank" rel="noopener noreferrer"><i class="fab fa-github fa-3x"></i></a>
			</div>
		</li>
	</ul>
</nav>

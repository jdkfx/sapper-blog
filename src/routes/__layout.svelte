<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		/* max-width: 56em; */
		width: 80%;
		background-color: white;
		overflow: hidden;
		padding: 2em;
		/* margin: 0 auto; */
		margin-left: auto;
		box-sizing: border-box;
	}

	@media screen and ( max-width:480px )
	{
		main {
			font-size: 1em ;
			width: 100%;
			padding: 1em;
			margin: 0 auto;
		}
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
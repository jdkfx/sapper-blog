<style>
	.about-item {
		margin-bottom: 2em;
	}

	.bold {
		font-weight: bold;
	}

	.italic {
		font-style: italic;
	}

	h3 {
		font-size: 1.5em;
	}

	p {
		font-size: 1.2em;
	}

	a {
		text-decoration: none;
	}

	.padding-left-m {
		padding-left: 3em;
	}
</style>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="about-item">
	<h1 class="bold italic">var_dump($me);</h1>

	<div class="italic">
		<h3>" My name is Haruki Tazoe. "</h3>
		<h3>" I am a university student aiming to become a web engineer. "</h3>
	</div>
</div>

<div class="about-item">
	<h1 class="bold italic">var_dump($activities);</h1>

	<div class="italic">
		<div>
			<p>[ 2020/09/07 - 2020/09/11 ] =></p>
			<p class="padding-left-m">" 株式会社いい生活 - 2020サマーインターン "</p>
		</div>
		
		<div>
			<p>[ 2020/09/16 - 2020/09/18 ] =></p>
			<p class="padding-left-m">" NTTドコモ - ドコモハッカソン "</p>
		</div>

		<div>
			<p>[ 2020/10/24 ] =></p>
			<p class="padding-left-m">" 株式会社ミクシィ - TDD challenge#5 "</p>
		</div>

		<div>
			<p>[ 2020/02/06 - 2020/02/07 ] =></p>
			<p class="padding-left-m">" 株式会社サイバーエージェント - Web Speed Hackathon Vol.2 "</p>
		</div>
	</div>
	
	<div class="about-item">
		<h1 class="bold italic">var_dump($products);</h1>
	
		<div class="italic">
			<div>
				<a href="https://kodomo-ronbun.com"><p>[ kodomo-ronbun.com ] =></p></a>
				<p class="padding-left-m">" Research treatise submission site for children. "</p>
				<p class="padding-left-m">" Created with Laravel and Vue.js. Also hosted on Heroku. "</p>
			</div>

			<div>
				<a href="https://vooks-4f56b.web.app/"><p>[ Vooks ] =></p></a>
				<p class="padding-left-m">" Book management app for me. "</p>
				<p class="padding-left-m">" Created with Vue.js and Firebase Cloud Firestore. Also hosted on Firebase. "</p>
			</div>
		</div>
	</div>
</div>

<div class="about-item">
	<h1 class="bold italic">var_dump($contribution);</h1>

	<div class="italic">
		<a href="https://github.com/svelte-jp/svelte-site-jp"><p>[ svelte-site-jp ] =></p></a>
		<p class="padding-left-m">" Translated English document into Japanese. "</p>
	</div>
</div>
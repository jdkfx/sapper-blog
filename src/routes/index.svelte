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

	.padding-left-m {
		padding-left: 3em;
	}

	@media screen and ( max-width:480px )
	{
		.content {
			margin-top: 35%;
		}

		.padding-left-m {
			padding-left: 0em;
		}
	}
</style>

<svelte:head>
	<title>jdkfx.com</title>
</svelte:head>

<div class="content">
	<div class="about-item">
		<h1 class="bold italic">var_dump($me);</h1>
	
		<div class="italic">
			<h3>" My name is Haruki Tazoe. "</h3>
			<h3>" I am a university student at Hiroshima Institute of Technology, aiming to become a web engineer. "</h3>
		</div>
	</div>
	
	<div class="about-item">
		<h1 class="bold italic">var_dump($activities);</h1>
	
		<div class="italic">
			<div>
				<p>[ 2020/09/07 - 2020/09/11 ] =></p>
				<p class="padding-left-m">" e-Seikatsu Co.,Ltd. - 2020 Summer Internship "</p>
				<p class="padding-left-m">" Using Vue.js and the API provided by the company, we created a web application about real estate. "</p>
			</div>
			
			<div>
				<p>[ 2020/09/16 - 2020/09/18 ] =></p>
				<p class="padding-left-m">" NTT DOCOMO, INC. - docomo Hackathon "</p>
				<p class="padding-left-m">" We came up with a service that would solve the challenges of living with COVID-19. "</p>
			</div>
	
			<div>
				<p>[ 2020/10/24 ] =></p>
				<p class="padding-left-m">" mixi, Inc. - TDD challenge#5 "</p>
				<p class="padding-left-m">" We learned about test-driven development methods and solved problems related to testing. "</p>
			</div>
	
			<div>
				<p>[ 2021/02/06 - 2021/02/07 ] =></p>
				<p class="padding-left-m">" CyberAgent, Inc. - Web Speed Hackathon Vol.2 "</p>
				<p class="padding-left-m">" A competitive hackathon to improve performance in web front-end. "</p>
			</div>

			<div>
				<p>[ 2021/08/31 - 2021/09/16 ] =></p>
				<p class="padding-left-m">" pixiv, Inc. - PIXIV SUMMER BOOTCAMP2021 "</p>
				<p class="padding-left-m">" Implemented a function using PHP8 Attribute in pixiv Encyclopedia. <a href="https://jdkfx.com/blog/pixiv-summer-bootcamp2021">See more...</a>"</p>
			</div>

			<div>
				<p>[ 2022/04 - 2022/10 ] =></p>
				<p class="padding-left-m">" PR TIMES Inc. - Backend Engineer (Student Internships) "</p>
				<p class="padding-left-m">" <a href="https://herp.careers/v1/prtimes/yqADIecHef7y">See more...</a>"</p>
			</div>
		</div>
		
		<div class="about-item">
			<h1 class="bold italic">var_dump($products);</h1>
		
			<div class="italic">
				<div>
					<p><a href="https://kodomo-ronbun.com">[ kodomo-ronbun.com ]</a> =></p>
					<p class="padding-left-m">" Research treatise submission site for children. "</p>
					<p class="padding-left-m">" Created with Laravel and Vue.js. Also hosted on Heroku. "</p>
				</div>
	
				<div>
					<p><a href="https://vooks-4f56b.web.app/">[ Vooks ]</a> =></p>
					<p class="padding-left-m">" Book management app for me. "</p>
					<p class="padding-left-m">" Created with Vue.js and Firebase Cloud Firestore. Also hosted on Firebase. "</p>
				</div>

				<div>
					<p><a href="https://jdkfx.com/">[ blog ]</a> =></p>
					<p class="padding-left-m">" A self-made blog and portfolio site. "</p>
					<p class="padding-left-m">" Created with Svelte and Sapper. Also hosted on Vercel. "</p>
				</div>

				<div>
					<p><a href="https://github.com/jdkfx/phrame/">[ phrame ]</a> =></p>
					<p class="padding-left-m">" A self-made MVC framework. "</p>
					<p class="padding-left-m">" Created with php. You can use docker to run it in your own environment. "</p>
				</div>
			</div>
		</div>
	</div>
	
	<div class="about-item">
		<h1 class="bold italic">var_dump($contest);</h1>
	
		<div class="italic">
			<p>[ 第24回HiBisインターネットビジネスフォーラム（学生の部） ] =></p>
			<p class="padding-left-m">" 最優秀賞, キャンパス賞 - 2020/11/27"</p>
		</div>

		<div class="italic">
			<p>[ Japan ビジネスデザイン発見&発表会 η 2020-2021 ] =></p>
			<p class="padding-left-m">" 地方創生大賞, ナイスビジネス賞 - 2021/03/12 "</p>
		</div>

		<div class="italic">
			<p><a href="https://kome100dc.jp/2020/">[ 米百俵デジタルコンテスト2020 ]</a> =></p>
			<p class="padding-left-m">" 技術賞 - <a href="https://kome100dc.jp/2020/result/100001/">顔バト</a> - 2021/03/18 "</p>
		</div>
	</div>

	<div class="about-item">
		<h1 class="bold italic">var_dump($contribution);</h1>
	
		<div class="italic">
			<p><a href="https://github.com/svelte-jp/svelte-site-jp">[ svelte-site-jp ]</a> =></p>
			<p class="padding-left-m">" Translated English document into Japanese. "</p>
		</div>

		<div class="italic">
			<p><a href="https://github.com/VOICEVOX/voicevox">[ VOICEVOX ]</a> =></p>
			<p class="padding-left-m">" Editor UI changes, etc. "</p>
		</div>
	</div>
</div>

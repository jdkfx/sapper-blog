---
title: "Svelte/Sapperで自作ブログをやってみる"
date: "2021-03-27"
---

## _はじめに_

これまではてなブログを使用していたのですが、以前から身の回りの方が自作ブログを作り始めており、自分も自作ブログに興味をもっておりました。

最初はLaravelを利用するか、自作のPHPフレームワークを開発して、それを利用してブログを作ろうと考えていたのですが、ありきたりだなと思いはじめ、なるべく他の方が使っていないような技術を使おうと思い始めました。

2021年2月の上旬に[UIT INSIDE](https://uit-inside.linecorp.com/)というPodcastを聞いていた際に、[Svelte](https://svelte.dev/)というJSフレームワークの存在を知り、まだまだ日本での普及率が少ないということを聞いたので、使ってみるのもいいかなと思い、今回の自作ブログに使わせていただきました。

## _構成_

このサイトは、既に公式が公開している[Sapper](https://sapper.svelte.dev/)のテンプレートである、[sveltejs/sapper-template](https://github.com/sveltejs/sapper-template)を元にしています。

ブログ部分は基本的には`/src/routes/blog/_post.js`を書き換えて、別に作った`/articles`というディレクトリからブログ記事であるMarkdownファイルを呼ぶように書いています。

最初は[こちらの記事](https://newcurrent.se/blog/create-markdown-sapper-svelte-blog)をもとに書き換えなどを行いました。

しかし、下記のような、Markdownファイルに書いた`date`などがうまく`/src/routes/index.svelte`などで呼べないと言う問題に当たってしまったので、[こちらの記事](https://n-ari.tech/blog/2020-02-06-create-portfolio-and-blog-with-sapper-and-netlify-cms/)を元に`slug`の呼び方を変えたり`date`が呼べるようにしました。

```article.md
---
title: "Svelte/Sapperで自作ブログをやってみる"
date: "2021-03-27"
---
```

ホスティングにはvercelを利用しています。vercel自体も今回が初めての利用になったのですが、そもそもSvelteの公式ドキュメントに書いてあるデプロイ方法がvercelであることや、vercel/og-imageのようなOSSがあることを知っていたので、将来的に利用することを考え、このサイトのホスティングはvercelにしてみました。

Netlify CMSなどを使った運用も考えてみたのですが、また別の機会になにかしらのプロダクトで利用してみようと思います。

## _これからやりたいこと_

まだまだこちらのサイトは完成とは言えないものなので、以下のようにもう少しやりたいことがあります。

- ブログ記事のカテゴリ分け機能と月別記事機能
- tailwindcssの導入
- デザインの調整
- vercel/og-imageを利用したブログ記事のOGP画像生成
- [SapperからSvelteKitへの移行](https://kit.svelte.dev/migrating)
- RSS
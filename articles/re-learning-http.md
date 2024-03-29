---
title: "もう一度HTTPについて学んでみる"
date: "2021-12-06"
---

この記事は`たくりんとん、ひとりアドベントカレンダー！2021!`の6日目の記事です．

[たくりんとん、ひとりアドベントカレンダー！2021!](https://adventcalender-takurinton.vercel.app/)

### **はじめに**

以前，自作フレームワークに関する記事を書いたのですが，その自作フレームワークを開発している中で，HTTPプロトコルについてもう一度復習したくなったので，WEBエンジニアが最初に読むべき本としてよく言及される「WEBを支える技術」という本をもう一度読んでみたという内容について記し，最近のHTTPプロトコルの仕様などについても様々なところで言及されていることについて少し触れていきたいと思います．

[イチからphpフレームワークを作ってみる](https://jdkfx.com/blog/building-a-php-framework)

[Webを支える技術 -HTTP、URI、HTML、そしてREST (WEB+DB PRESS plus)](https://www.amazon.co.jp/dp/4774142042/ref=cm_sw_r_tw_dp_KW62PPPNAGQTGW4G3MJ6)

そもそも僕がこの本を読んだのは確か2年半以上前だったと思います．今回この本を読むに至った理由としては，2年半以上前と現在の自分の知識の差がどれくらいあるかということを確かめたかったという理由も兼ねています．

### **読んでみた感想**

これまで行ってきた開発経験などからどれくらい自分の知識として身についているか知れるのはいい機会だったと思います．最初に読んだ頃は開発経験の少なさやWEBの分野に対する理解の深さが未熟であり，本に書かれている内容も「よく分からない」，「とりあえずわかるところだけ読んでみた」という状態で読了していました．

しかし，今回読んでみた感想としては，最初に読んだ時よりもわかりやすく書かれていることが実感でき，自分のHTTPプロトコルに対する理解度が深まっていることを確認することが出来ました．

HTTPプロトコルの仕様の記述で触れられている内容もそれほど難しくはなく，この本がWEBの分野に進む際に読むべき本として取り上げられる理由がよく分かった感じがしました．

右も左も分からない状態でWEBの分野にやってきた人におすすめするのにはちょうどいいかなとは思いますが，一方で，対象者にとってまだ分からない内容をたくさん含んでいる可能性もあると思います．

なので，僕個人としては，その部分はとりあえず読み進めていただいて，対象者が分かる部分だけを理解し，また時間をおいて読み返してみてほしいというと思います．

### **HTTPの仕様に対する理解度**

HTTPプロトコルの仕様は`HTTP/1.1`が`RFC2616`として規定されてから何年間もバージョンを変えずに利用されていたのは周知の事実ですが，それでも僕はHTTPプロトコルの仕様についてしっかりと理解しているというわけではありませんでした．

HTTPプロトコルの仕様について，知っていたとしても普段から開発に利用するフレームワーク内で，リクエストを作成するためにLaravelのHTTPファサードのようなHTTPクライアントが提供する`get`メソッドや`post`メソッドなどについてのみであり，完全にHTTPメソッドの処理の理解をフレームワークのメソッドに委譲していた形になります．よって，HTTPメソッドのリクエストやレスポンスの中身について理解を深めていないまま開発をしており，理解した気になって開発を行っていたことに対してやや嫌悪感を覚えてしまいました．

[Laravel 8.x HTTPクライアント](https://readouble.com/laravel/8.x/ja/http-client.html)

自作フレームワークを行う中でHTTPメソッドのリクエストやレスポンスの中身についてどのような内容が記述されているのか気になったことで勉強する気になったのですが，これまでにフレームワークでHTTPメソッドを利用していた分，それほど難しい内容ではない部分が多く理解は早かったと思います．むしろ復習になる部分が大半を占めていたのは予想外でした．

ただ，冪等性や安全性について，さまざまなHTTPヘッダについては知らない部分や理解不足な面が多数あったのでこれらについては今回もう一度読んだことによって勉強になったと思います．

### **これからのHTTPの仕様**

現在，`HTTP/2`や`HTTP/3`が登場しており，HTTPヘッダの圧縮やリクエストやレスポンスのパイプライン化を行ったり，多重化したストリームをトランスポート層の通信プロトコルに移行させたりするなど，近年のバージョンアップは自分にとっては難しい内容ですが，なんとなく面白そうなことをしているなという感想を持っています．

最近では以下のような記事を各所でよく目にします．これからHTTPの仕様がどのように変わっていくのかについて，大変興味深いので常にアンテナを張り，情報を収集したいと感じています．

[新しいHTTPメソッド、QUERYメソッドの仕様](https://asnokaze.hatenablog.com/entry/2021/11/09/231858)

### **終わりに**

これからHTTPプロトコルの進化を遂げていく様子を見ながら，その歴史を語れる人間になれるよう，日々の技術力の研鑽に励みたい所存です．
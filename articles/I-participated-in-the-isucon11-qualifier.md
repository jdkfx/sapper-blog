---
title: "ISUCON11予選に参加しました"
date: "2021-08-24"
---

## **はじめに**

昨年も参加したISUCONに今年も参加しました．

[ISUCON10予選に初参加しました](https://jdkfx17.hatenablog.com/entry/2020/09/14/130728)

昨年は三人でチームを組んで，ISUCONがどのようなものなのかということをつかむことを目的として臨みましたが，今回は以下のような目標を掲げ参加することにしました．

- 一人で参戦する
- 昨年は分からなかったことが今年は分かるようになっている
- ISUCONを楽しむ

といった感じで，とにかく自分が楽しめればそれでいいなと思えるようなものにしたいと考えて臨みました．

## **やったこと**

自分のやったことにあまり自身がありませんが，何をやってみたかということを共有すること自体は別に悪いことでもないとは思いますので，やったことを書いてみます．

もし，違っていることをしていたり，その実装はもっとよくなるんじゃないかということがありましたら，Twitterなどで教えてほしいなと思います．

[jdkfx/isucon11q](https://github.com/jdkfx/isucon11q)

### **DBにINDEXを追加**

参考実装を読んだ感じだと，以下のようなところが個人的に気になりました．

#### **php/app/routes.php**

```php
$stmt = $this->dbh->prepare('SELECT * FROM `isu` WHERE `jia_user_id` = ? ORDER BY `id` DESC');
$stmt->execute([$jiaUserId]);
$rows = $stmt->fetchAll();
```

#### **php/app/routes.php**

```php
$stmt = $this->dbh->prepare('SELECT * FROM `isu_condition` WHERE `jia_isu_uuid` = ? ORDER BY `timestamp` DESC LIMIT 1');
$stmt->execute([$isu->jiaIsuUuid]);
$rows = $stmt->fetchAll();
```

SQLファイルにINDEXの追加を行いました．

#### **sql/0_Schema.sql**

```sql
ALTER TABLE isucondition.isu ADD INDEX (id, jia_isu_uuid, jia_user_id);
ALTER TABLE isucondition.isu_condition ADD INDEX (jia_isu_uuid, timestamp);
```

### **DBサーバーとAppサーバーの分離**

昨年は与えられた三台のサーバーを一台しか活用することがなく，個人の趣味開発でも複数台構成でWEBアプリを動かしてみたことがなかったので，ぶっつけ本番で複数台構成に挑戦してみました．

#### **sql/init.sh**

```sh
#!/bin/bash
set -xu -o pipefail

CURRENT_DIR=$(cd $(dirname $0);pwd)
export MYSQL_HOST=${MYSQL_HOST:-35.72.49.74} // 127.0.0.1 -> DBサーバーのIPアドレスに変更
export MYSQL_PORT=${MYSQL_PORT:-3306}
export MYSQL_USER=${MYSQL_USER:-isucon}
export MYSQL_DBNAME=${MYSQL_DBNAME:-isucondition}
export MYSQL_PWD=${MYSQL_PASS:-isucon}
export LANG="C.UTF-8"
cd $CURRENT_DIR

cat 0_Schema.sql 1_InitData.sql | mysql --defaults-file=/dev/null -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER $MYSQL_DBNAME
```

#### **env.sh**

```sh
#MYSQL_HOST="127.0.0.1"
MYSQL_HOST="35.72.49.74" // 127.0.0.1 -> DBサーバーのIPアドレスに変更
MYSQL_PORT=3306
MYSQL_USER=isucon
MYSQL_DBNAME=isucondition
MYSQL_PASS=isucon
POST_ISUCONDITION_TARGET_BASE_URL="https://isucondition-1.t.isucon.dev"
```

## **失敗したところ**

環境を壊してしまい，どうにか元に戻そうと色々弄ってしまい余計に環境をごちゃごちゃにしてしまったので，時間と精神力を無駄に消費してしまいました．

なにをどう壊したのかは恥ずかしいのでここには書きません．どこかで気分が良かったらカミングアウトするかもしれないですし，しないかもしれません．

マニュアル通り，すぐに再構築すれば無駄な時間と精神力を削がなくて良かったはずだったのに，変なことばかりしてしまったのは後悔しています．

## **感想など**

> **自分の持ってない知識を勉強して強くなって帰ってこれるように頑張ります。**

上記は昨年のISUCONに参加した際のブログ記事から引用した最後の文章です．

やったことの量としては普通の人が開始1時間半くらいで，いやもっと短い時間でやってしまいそうなことを8時間くらいかけてやってみたのですが，昨年は分からなかったことが分かるようになったことが嬉しかったですし，ぶっつけ本番でやってみたこともなんとかやれていたので嬉しいなという感想しかありません．昨年の伏線は回収することができました．

最後にベンチマークを回した時はベストスコアが出ていたのに，最終的なスコアとしてはFailしていたので，本当にちゃんとやれているかどうかと聞かれますと少々難しい質問をしてくるなと感じてしまいますが，僕個人がやれていると感じているのでやれているんじゃないかなと感じています．

他力本願なところがあるので間違っていたら誰か教えてください．

一人で参戦することについて，個人的な力試しをするのにはおススメかなと思います．自分が何が出来て何が出来ないのかを把握することでこれからの勉強の方針などを立てることも出来ましたし，そういう面では悪いことは無いかと思われます．

最初に掲げていた目標を確認してみると，どれも達成している気がするので個人的には優勝です．

来年は就活が終わっていると思うので研究をしながらだとは思いますが，ガッツリ対策をして，phpを書く人を連れて三人で参戦してみたいと思います！
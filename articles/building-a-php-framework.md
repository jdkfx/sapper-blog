---
title: "イチからphpフレームワークを作ってみる"
date: "2021-07-10"
---

## **はじめに**

以前から、開発をする際にphpフレームワークであるLaravelを多用することが多かったのですが、Laravelを使用しながらその内部構造やどんな仕組みで処理が行われているのかなどのことについて、何も知らない状態で使用し続けていたということもあり、Laravelの内部構造を見てみようとソースコードを開いたことがありました。

しかし、そこに広がっていたのは当時の自分のオブジェクト指向に関する知識では理解できないようなソースコードが広がっており、その難しそうな見た目と継承されているクラスや依存しているクラスをたくさん参照しなければならないという未来に、少しだけ戸惑いが生じてしまい、これではLaravelの内部構造を把握することができないのではないかと思ってしまいました。

そこで、自分でLaravelのような機能を持つフレームワークを作成することで、php自体の知見を深め、なおかつオブジェクト指向の考え方に沿ったソースコードを読めるようになることを目的として自作フレームワークの沼にはまり込んでしまいました。

完成した（現在進行形で開発中）フレームワークはこちらです．

[https://github.com/jdkfx/phrame](https://github.com/jdkfx/phrame)

## **事前知識**

このフレームワークを作る前はオブジェクト指向やphpそのものに関する知識などがそれほどなく，あるといってもLaravelなどのフレームワークが中級者程度に使用することができる程度のレベルでした．そのため，事前知識として自作フレームワークに関するMVCなどの知識やオブジェクト指向についてインターネットの有志が書き残してくださった記事やスライドなどを参考にして学習させていただきました．

また，PSRなどについては知識が全くない状態でのスタートでしたし，そのうえ，このフレームワークを作る上ではほとんど活用することができませんでした．

そして，本題である自作フレームワークについて参考にしたスライドは以下のスライドです．

[帰ってきた！平成最後のオレオレフレームワークの作り方](https://speakerdeck.com/uzulla/gui-tutekita-ping-cheng-zui-hou-falseoreorehuremuwakufalsezuo-rifang)

## **全体構成**

全体構成としてはこのようになりました．これら以外にも環境構築のための ``Docker-compose.yml`` なども書いています．

```php
├─php
└─src
    ├─app
    │  ├─Controllers
    │  ├─Models
    │  ├─Routers
    │  ├─Templates
    │  └─Views
    ├─html
    └─vendor
        └─composer
```

## **Dockerfile**

```
FROM php:8.0-apache
COPY ./php.ini /usr/local/etc/php/
COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN apt-get update \
  && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev libonig-dev \
  && docker-php-ext-install pdo_mysql mysqli mbstring gd iconv
RUN a2enmod rewrite
```

## **Docker-compose.yml**

```
version: '3.7'

services:
  mysql:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 'password'

  phpmyadmin:
    depends_on:
      - mysql
    image: phpmyadmin/phpmyadmin
    environment:
      PMA_HOST: mysql
    restart: always
    ports:
      - "8080:80"

  php-apache:
    build: ./php
    volumes:
      - ./src:/var/www
    restart: always
    ports:
      - "80:80"
    depends_on:
      - mysql

volumes:
    db_data: {}
```

この構築方法では ``/var/www`` にある ``/html`` を読み込むようにしています．

## **.htaccess**

```
RewriteEngine On

# ディレクトリがないかどうか確認
RewriteCond %{REQUEST_FILENAME} !-d
# ファイルが無いかどうか確認
RewriteCond %{REQUEST_FILENAME} !-f

RewriteRule ^(.+)$ index.php [L]
```

読み込まれた ``/html`` には ``.htaccess`` を用意しておきます．

ここでリクエストが来たら，まず最初に ``/html/index.php`` が読み込まれるようにしておきました．

## **index.php**

```
<?php

require_once __DIR__ . "/../vendor/autoload.php";

use App\Routers\Router;

$pattern = [
    '/' => [
        'method'        => 'GET',
        'controller'    => 'HomeController',
        'action'        => 'index',
    ],
    '/blog' => [
        'method'        => 'GET',
        'controller'    => 'BlogController',
        'action'        => 'index',
    ],
    
    // 以下省略
];

$router = new Router($pattern);
$router->response($_SERVER['REQUEST_URI']);
```

``.htaccess`` で最初に読み込まれるように設定した ``index.php`` です．

ここではアクセスされるURLごとにそのメソッドとそのURLで処理するコントローラー，そしてそのコントローラーの処理をアクションとして定義して，ルーティング用のクラスに処理を行わせます．

## **Router**

```
<?php

namespace App\Routers;

class Router
{
    private $routes;

    public function __construct(array $routes)
    {
        $this->routes = $routes;
    }

    public function response($request)
    {
        try {
            $controllerName = "App\\Controllers\\" . $this->routes[$request]['controller'];
            $controller = new $controllerName();
            $controllerAction = $this->routes[$request]['action'];
            if ($this->routes[$request]['method'] === 'GET') {
                $controller->$controllerAction();
            } else if ($this->routes[$request]['method'] === 'POST') {
                $controller->$controllerAction($_POST);
            } else {
                throw new \Exception('error!');
            }
        } catch (\Exception $e) {
            error_log($e->getFile() . $e->getLine() . $e->getMessage());
        }
    }
}
```

受け取った連想配列の中から，取得したURLと同じもののコントローラーやアクションを変数に格納して，メソッドごとにコントローラーで処理を行うようにしています．

## **Models**

```
<?php

namespace App\Models;

use \PDO;

class model
{
    public $pdo;

    public function __construct() {
        $dsn        = 'mysql:dbname=blog;host=phrame_mysql_1';
        $user       = 'root';
        $password   = 'password';

        $query = "CREATE TABLE IF NOT EXISTS blog.posts (
            id INT(11) NOT NULL auto_increment PRIMARY KEY,
            title VARCHAR(255),
            messages VARCHAR(255)
            ) DEFAULT CHARSET=utf8";

        try {
            $this->pdo = new PDO($dsn, $user, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $this->pdo->query($query);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            exit();
        }
    }
}
```

親のモデルとしてMySQLにテーブルを作成し，MySQLとの接続を行います．

ただし，正直言ってモデル内での処理がこれだけではよくないかなとは思っているので，アドバイスをいただけますと嬉しいです．

```
<?php

namespace App\Models;

use App\Models\Model;
use \PDO;

class Blog extends Model
{
    public $title;
    public $messages;

    public function __construct()
    {
        parent::__construct();
    }

    public function index() : array
    {
        $query = "SELECT * FROM blog.posts";

        try {
            $stmt = $this->pdo->query($query);
            $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log($e->getMessage());
            exit();
        }

        return $response;
    }

    public function store($request)
    {
        $query = "INSERT INTO blog.posts (title, messages) VALUES (?, ?)";

        try {
            $stmt = $this->pdo->prepare($query);
            $response = $stmt->execute(array($request["title"], $request["messages"]));
        } catch (Exception $e) {
            error_log($e->getMessage());
            exit();
        }
    }
}
```

それぞれのモデルごとに（ここで言えばブログとしてのモデルで）全件取得や挿入などのクエリを書いて，SQLを実行させいています．

親のモデルにどうにか何かしらの処理を移植できないかなと考えていますが，まだよくわからないということと，アプリとしての機能が大きくならないとこちらの問題が顕在化しないと思っているので，今はこの状態のままにしておきます．

## **Views**

```
<?php

namespace App\Templates;

class View
{
    public function __construct(){}

    public function pages($filename, $dvalue = null)
    {
        $response = $dvalue;
        include __DIR__ . "/../Views/" . $filename . ".php";    
    }
}
```

ビューのテンプレートとしてページを返すための関数を作成しました．

これでコントローラー内で ``$view->pages('index');`` と記述することによってページが表示されます．ただしこれはページを表示させるだけの機能なのでリダイレクトなどの機能はついていません．

```
<!DOCTYPE html>
<html>
  <head>
    <title>Blog</title>
  </head>
  <body>
    <h1>Blog</h1>
    <a href="./blog/create">New</a>
    
    <?php foreach ($response as $key => $val) : ?>

    <h3><?= htmlspecialchars($val["title"], ENT_QUOTES, 'UTF-8'); ?></h3>
    <p><?= htmlspecialchars($val["messages"], ENT_QUOTES, 'UTF-8'); ?></p>

    <?php endforeach; ?>
  </body>
</html>
```

それぞれのビューについては特に説明する必要も無いとは思いますが，以上のように書くことで，データを表示させています．

## **Controllers**

```
<?php

namespace App\Controllers;

class Controller
{
    public function __construct(){}

    public function redirect($path)
    {
        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $path);
        exit;
    }
}
```

親のコントローラーにはリダイレクトの関数しか書いておらず，子のコントローラーでほとんどの処理を行わせるようになっているので，この辺りももう少し工夫して，子のコントローラーの責務を減らして，親のコントローラーが処理を行えるような実装にしていきたいと思っています．

```
<?php

namespace App\Controllers;

use App\Models\Blog;
use App\Templates\View;
use App\Controllers\Controller;

class BlogController extends Controller
{
    public function __construct(){}

    public function index()
    {
        $blog = new Blog();
        $view = new View();

        $response = $blog->index();

        $view->pages('blog', $response);
    }

    public function create()
    {
        $view = new View();
        $view->pages('create');
    }

    public function post($request)
    {
        $blog = new Blog();
        $view = new View();

        if (empty($request['title']) || empty($request['messages'])) {
            parent::redirect('blog/create');
        }

        if (mb_strlen($request['title']) > 20 || mb_strlen($request['messages']) > 50) {
            parent::redirect('blog/create');
        }

        $blog->title = $request['title'];
        $blog->messages = $request['messages'];

        $view->pages('confirm', $blog);
    }

    public function store($request)
    {
        $blog = new Blog();
        $view = new View();

        $blog->store($request);

        $view->pages('store');
    }
}
```

Laravelのコントローラーによくありがちな書き方でコントローラーの実装を行いました．

親のコントローラーを継承していますが，それほど親のコントローラーに責務を与えておらず，どちらかというと単一のコントローラーとして動作しているように見えます．こちらもこのフレームワークを使用してアプリを書く際にアプリとしての機能が大きくならないとこちらの問題が顕在化しないと考えているため，今の状態ではどうしようもないと考えています．

## **終わりに**

まだまだフレームワーク自体は完成しているものとして扱っているわけではないのですが，いち早くブログに書いてアウトプットしたかったという理由で書いてみました．

まだまだこのフレームワークを改造していきたいと思っていますし，デザインパターンを意識した機能などの実装を行いたいと考えています．また，PSRについてもしっかりと勉強してこちらのフレームワークに持ってこれるようにしていきたいと考えいています．

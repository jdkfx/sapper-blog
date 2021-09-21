---
title: "ピクシブ百科事典にAttributeを用いたルーティング機能を実装しました"
date: "2021-09-21"
---

### **はじめに**

8/31~9/16の間で，PIXIV SUMMER BOOTCAMP2021の技術基盤コースに参加してきましたので，その参加経緯からインターンで行った内容についてブログに書いていきます．

来年，このインターンに応募したいと思っている方たちが，このブログを読み，少しでもインターンの参考になればいいなと思っています．

### **参加までの経緯**

昔からピクシブさんの提供しているサービスが好きで，よく使わせていただいたこともあり，以前からインターンに参加したいと思っておりました．

昨年の夏インターンや，今年の春インターンにも応募をしてきたのですが，自身の力不足で参加を見送られ，今年の夏インターンこそはという思いで応募をさせていただきました．

僕が応募した技術基盤コースは，**オンライン百科事典「ピクシブ百科事典」の機能開発およびコア機能・Webアプリケーションフレームワークの改善を行うコースです。フレームワークの開発を通じてWebサービスが提供すべき基本機能の理解や開発者が利用しやすい設計について学ぶこと**が目的でした．

[引用：PIXIV SUMMER BOOT CAMP 2021 募集ページ](https://www.pixiv.co.jp/summer_bootcamp_2021#kiban)

また，応募の際に実績などを提出することに加え，テーマを与えられ，そのテーマに沿った自分の考えを課題として提出することで評価対象にしていただけるということでしたので，僕は以下のテーマについて，自分の考えをまとめ，提出しました．

- Q．Web開発時に不便に感じていて、技術的に解決したい問題があれば教えてください 
    - A．ライブラリの依存関係をComposerなどで管理することなどについて回答しました．

- Q．普段利用しているWebフレームワークのソースコードを簡単に読んでみて、勉強になった部分と、読んでみたがよく理解できなかった部分と挙げてください
    - A．オブジェクト指向について回答しました．

- Q．Webフレームワークやライブラリがサポートを提供し、それを適切に利用することでほとんどのユースケースでは防止できると考えられる脆弱性の種類を二つ選んで挙げてください
    - A.Laravelを例にあげ，二種の脆弱性対策について回答しました．

- Q．2021年現在でもイベント駆動などによる並行処理を前提とせず、PHPのように単なる同期実行のみで動作するサーバーサイドWebアプリケーションが根強く残っている理由について簡単に考察してください
    - A．これまでの経験をもとに回答しました．

他にも，これまでの実績としてphpで作成した自作MVCフレームワークについても実績として提出しました．

[イチからphpフレームワークを作ってみる](https://jdkfx.com/blog/building-a-php-framework)

また，インターンに採用されてから参加するまでの事前課題として，PSR-HTTPについての理解を深めてきてほしいということでこちらの資料を提供していただき，読み込んだりしておきました．

[PSR-HTTPシリーズを理解するための情報源](https://scrapbox.io/php/PSR-HTTP%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E6%83%85%E5%A0%B1%E6%BA%90)

### **実装したルーティング機能について**

さて，インターンで行った新機能の開発では，PHP8.0で導入されたAttributeを使用し，「ルーティング情報を走査してルーティングファイルとして出力する」という機能（以下，Attributeベースルーティング）を課題として出されたので，そちらの実装を行いました．

#### **ルーティングとは**

ルーティングについて少し解説します．

ルーティングとは，例えば`dic.pixiv.net/a/初音ミク`などのような，URLにアクセスした際に呼び出される処理を記述しているクラスのことで，ピクシブ百科事典では以下のようなルーティングが実装されています．

この例の場合だと`ArticleController`が呼ばれ，その`ArticleController`内の`view`メソッドが実行されることによって，ピクシブ百科事典のサイト上で初音ミクの解説ページを読むことが出来ます．

```php
Router::addRoute('a/:articlename', [	// dic.pixiv.net/a/初音ミク
    'controller' => 'article',
    'action' => 'view',
]);
```

#### **Attributeとは**

Attributeとは，先述の通り，PHP8.0で導入された機能で，クラスなどの宣言時にメソッドなどの追加情報を埋め込むことを可能にする機能です．

埋め込んだ情報はReflectionAPIという機能を使用して内容を取得したり，変更したりすることも可能です．

```php
#[Attribute(Attribute::TARGET_METHOD | Attribute::TARGET_FUNCTION)]
class MyAttribute
{
	// snip
}

// $reflection->getAttributes() などでAttributeの情報を取得できる
```

[アトリビュートの概要](https://www.php.net/manual/ja/language.attributes.overview.php)

[リフレクションAPI を使ってアトリビュートを読み取る](https://www.php.net/manual/ja/language.attributes.reflection.php)

これはBEAR.SundayというPHPフレームワークのドキュメントからの引用になりますが，従来のPHPでは下記のコードのように，Annotationというものを利用して同じようなことをすることも可能でした．

```php
// Annotation

/**
 * @Inject
 * @Named('admin')
 */
public function setLogger(LoggerInterface $logger)
```

これがAttributeを用いることでこのような書き方をすることができるようになりました．

```php
// Attribute

#[Inject, Named('admin')]
public function setLogger(LoggerInterface $logger)
```

[BEAR.Sunday アトリビュート](https://bearsunday.github.io/manuals/1.0/ja/attribute.html)

今回はこのAttributeを利用してPHP8.0の標準機能に寄せるため，この機能を実装させていただくという流れでした．

また，現在のピクシブ百科事典のPHPのバージョンは8.0ではないので，[Spiral FrameworkのAttribute](https://spiral.dev/docs/component-attributes)を使用し，開発を進めました．

### **実装する機能の要件**

今回実装するAttributeベースルーティングは以下のような要件に沿って開発を進めていきます．

- ピクシブ百科事典のルーティングをAttributeで表現すること

- Attributeは実行時に読み込まれないようにすること
    
    - また，出力するルーティングファイルは既存のルーティングファイルの構造を参考にします．

- 合理的な範囲で小さなモジュールとして構成する

    - アプリケーションに依存させずに，それぞれのモジュールごとにユニットテストが可能なものにします．

今回実装したモジュールは，Routeクラスと，ファイルを走査してルーティング情報を収拾するクラス，ルーティングファイルを出力するクラスといった感じで，三つのモジュールに展開させて実装を進めました．

### **Routeクラスの実装**

新しくRouteクラスを実装する前に，既存のルーティングについて少しだけ触れておくと，既存のルーティングである`Router::addRoute()`はいくつかのパラメータを持っています．

```php
// RouteConfigPC.php 

Router::addRoute('en', [					// path
    'action' => Dic\Http\Controller\Ja\EnNoSlashAction::class,
    'no_trailing_slash' => true,			// no_trailing_slash
]);

Router::addRoute('sitemap.xml', [
    'action' => Dic\Http\Controller\Sitemap\IndexAction::class,
    'cache' => true,					// cache
]);
```

上記は従来のルーティングファイルの構成ですが，ここには`path`というパラメータと，`cache`，`no_trailing_slash`というオプションで付与するパラメータがあります．

これらのパラメータは，それぞれ以下のような意味をもっており，これと同じようなパラメータを新しく作る`Route`クラスにも同様に付与し，実装したものがその下の`Route`クラスになります．

```php
$path // URIに対応する文字列
$cache // キャッシュを有効化するかどうか 
$no_trailing_slash // 末尾の / を許容するかどうか
```

```php
declare(strict_types=1);

namespace Dic\Domain;

use Attribute;

/**
 * @property string $path
 * @property bool $cache
 * @property bool $no_trailing_slash
 */

#[Attribute]
#[\Spiral\Attributes\NamedArgumentConstructor]
final class Route
{
    /** @var string */
    private $path;

    /** @var bool */
    private $cache;

    /** @var bool */
    private $no_trailing_slash;

    public function __construct(string $path, bool $cache = false, bool $no_trailing_slash = false)
    {
        $this->path = $path;
        $this->cache = $cache;
        $this->no_trailing_slash = $no_trailing_slash;
    }

    public function __get(string $key)
    {
        return $this->$key;
    }
}
```

実際に，この`Route`クラスに実装したAttributeが使用できるかというテストはこのような形で行うことができます．

```php
declare(strict_types=1);

namespace Dic\Domain;

use Dic\TestCase;
use Spiral\Attributes\AttributeReader;

#[Route(path: 'a/:articlename')]
#[Route(path: 'ae/:article_name', cache: true)]
#[Route(path: 'ae/:article_name', no_trailing_slash: true)]
#[Route(path: 'ae/:article_name', cache: true, no_trailing_slash: true)]
class RouteTest extends TestCase
{
    /** @var AttributeReader */
    private $reader;

    public function setUp(): void
    {
        parent::setUp();

        $this->reader = new AttributeReader();
    }

    public function test_Class(): void
    {
        $ref_class = new \ReflectionClass($this);
        $actual = $this->reader->getClassMetadata($ref_class);

        $count = 0;

        foreach ($actual as $attr) {
            $count++;
            $this->assertInstanceOf(Route::class, $attr);
        }

        $this->assertSame(4, $count);
    }

    public function test_Method(): void
    {
        $ref_class = new \ReflectionClass($this);
        $ref_method = $ref_class->getMethod('subject');
        $actual = $this->reader->getFunctionMetadata($ref_method);

        $count = 0;

        foreach ($actual as $attr) {
            $count++;
            $this->assertInstanceOf(Route::class, $attr);
        }

        $this->assertSame(4, $count);
    }

    #[Route(path: 'a/:articlename')]
    #[Route(path: 'ae/:article_name', cache: true)]
    #[Route(path: 'ae/:article_name', no_trailing_slash: true)]
    #[Route(path: 'ae/:article_name', cache: true, no_trailing_slash: true)]
    public function subject(): void
    {
        // snip
    }
}
```

`RouteTest::test_Class()`では，Attributeを付与したクラスに対するテストを行っており，`RouteTest::test_Method()`では，Attributeを付与したメソッドに対するテストを行っています．

上で実装した`Route`クラスは下記のように既存のControllerやActionに付与することで使用することが可能になります．

```php
// example
class ArticleController
{
    /**
     * GET /a/:article_name 記事ページ
     */
    #[Route(path: 'a/:articlename')]
    public function view()
    {
        // snip
    }
}
```

```php
// example
#[Route(path: 'a/:articlename')]
class SitemapAction
{
    // snip
}
```

### **ルーティング情報の走査**

`Route`クラスの実装は出来たので，次はルーティング情報を走査するクラスを作成します．

ルーティング情報の走査にはDirectoryIteratorなどの機能を使用します．

また，走査したルーティング情報は，ルーティング情報を出力するためのクラスに使用するために配列で返してあげます．

```php
declare(strict_types=1);

namespace Dic\Domain;

use ControllerBase;
use DirectoryIterator;
use Generator;
use Psr\Http\Server\RequestHandlerInterface;
use ReflectionClass;
use Spiral\Attributes\AttributeReader;

class RouteCollector
{
    /** @var list<string> */
    private $target_directories;

    /** @var AttributeReader */
    private $reader;

    /**
     * @param list<string> $target_directories
     */
    public function __construct(array $target_directories)
    {
        $this->reader = new AttributeReader();
        $this->target_directories = $target_directories;
    }

    public function getRoutes(): array
    {
        $result = [];
        foreach ($this->target_directories as $directory_name) {
            $dir = new DirectoryIterator($directory_name);
            foreach ($this->fetchRoute($dir) as $route) {
                $result[] = $route;
            }
        }
        return $result;
    }

    public function fetchRoute(DirectoryIterator $dir)
    {
        if ($dir->isFile()) {
            return;
        }

        foreach ($dir as $item) {
            /** @var DirectoryIterator $item */
            if ($item->isFile()) {
                $classname = $this->getClassWithNamespace($item);
                if ($classname === null) {
                    continue;
                }
                yield from $this->fetchRoutesFromClass($classname);
            } elseif ($item->isDir() && !$item->isDot()) {
                yield from $this->fetchRoute(new DirectoryIterator($item->getPathname()));
            }
        }
    }

    /**
     * @param class-string $classname
     * @return Generator
     */
    public function fetchRoutesFromClass(string $classname): Generator
    {
        $ref = new ReflectionClass($classname);
        if (is_a($classname, RequestHandlerInterface::class, true)) {
            $metadata = $this->reader->getClassMetadata($ref);
            foreach ($metadata as $attr) {
                yield [
                    'action' => $classname,
                    'route' => $attr,
                ];
            }
        } elseif (is_a($classname, ControllerBase::class, true)) {
            foreach ($ref->getMethods() as $ref_method) {
                $method_name = $ref_method->getName();
                $metadata = $this->reader->getFunctionMetadata($ref_method);
                foreach ($metadata as $attr) {
                    yield [
                        'controller' => $classname,
                        'action' => $method_name,
                        'route' => $attr,
                    ];
                }
            }
        }
    }

    /**
     * @return class-string
     */
    public function getClassWithNamespace(\DirectoryIterator $item): ?string
    {
        $namespace = null;
        $file = $item->openFile("r");
        foreach ($file as $line) {
            if (preg_match('/^namespace (?<namespace>.+);$/', $line, $m)) {
                $namespace = $m['namespace'];
                break;
            }
        }
        $classname = $item->getBasename(".php");
        $fqsen = "{$namespace}\\{$classname}";
        if (class_exists($fqsen)) {
            return $fqsen;
        }

        return null;
    }
}
```

ここで実装した`RouteCollector`クラスでは，`RouteCollector::getRoutes()`という関数が指定したディレクトリ内にある，ルーティング情報が記載されたコントローラなどを走査して配列として返すような処理を行っています．

```php
declare(strict_types=1);

namespace Dic\Domain;

use Dic\TestCase;
use Dic\Domain\RouteCollector\SampleAction;
use Dic\Domain\RouteCollector\SampleController;
use Dic\Domain\RouteCollector\Nested;

class RouteCollectorTest extends TestCase
{
    public function test(): void
    {
        $subject = new RouteCollector([
            __DIR__ . '/RouteCollector',
        ]);

        $expected = [
            ['action' => Nested\SampleAction2::class, 'route' => new Route("/Nested/SampleAction2")],
            ['action' => Nested\SampleAction::class, 'route' => new Route("/Nested/SampleAction")],
            ['controller' => SampleController::class, 'action' => 'index', 'route' => new Route('/sample')],
            ['controller' => SampleController::class, 'action' => 'cached', 'route' => new Route('/sample/cached', true)],
            ['controller' => SampleController::class, 'action' => 'robots', 'route' => new Route('/sample/robots.txt', false, true)],
            ['action' => SampleAction::class, 'route' => new Route("/SampleAction")],
        ];

        $this->assertEquals($expected, $subject->getRoutes());
    }
}
```

```php
namespace Dic\Domain\RouteCollector\Nested;

use Dic\Domain\Route;
use LogicException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

#[Route("/Nested/SampleAction")]
class SampleAction implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        throw new LogicException("do not call me.");
    }
}
```

```php
namespace Dic\Domain\RouteCollector;

use Dic\Domain\Route;
use LogicException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

#[Route("/SampleAction")]
class SampleAction implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        throw new LogicException("do not call me.");
    }
}
```

```php
namespace Dic\Domain\RouteCollector;

use Dic\Domain\Route;

class SampleController extends \ControllerBase
{
    #[Route('/sample')]
    public function index()
    {
        // snip
    }

    #[Route('/sample/cached', cache: true)]
    public function cached()
    {
        // snip
    }

    #[Route('/sample/robots.txt', no_trailing_slash: true)]
    public function robots()
    {
        // snip
    }
}
```

`RouteCollectorTest`では，ネストされたディレクトリ内にあるルーティング情報も取得できるかどうかのテストケースを書いていますが，実際にテストを行っていた際には，`RouteCollector::fetchRoutesFromClass()`でちょっとした無限ループが起きてしまいました．

その対策として`Generator`や`yield`などを活用したのですが，`Generator`や，`yield`などの使い方について詳しくなかったので，これらに関して結構な頻度で戸惑っていました．

### **ルーティング情報の出力**

先述の通り，配列として返ってきたルーティング情報は既存の形式に合わせてファイルに出力しなければなりません．

```php
declare(strict_types=1);

namespace Dic\Domain;

use function Safe\fwrite;

class RoutingFileGenerator
{
    /** @var array<array{controller?:class-string, action:string|class-string, route:Route}> */
    private $routes;

    /**
     * @param array<array{controller?:class-string, action:string|class-string, route:Route}> $routes
     */
    public function __construct(array $routes)
    {
        $this->routes = $routes;
    }

    /**
     * @param resource $file
     */
    public function write($file): void
    {
        $code = "<?php return " . preg_replace('/\s+$/mu', '', var_export($this->build(), true)) . ";";
        fwrite($file, $code);
    }

    /**
     * @return array<array{0:string, array{controller?:class-string, action:string|class-string, cache?:bool, no_trailing_slash?:bool}}>
     */
    public function build(): array
    {
        $result = [];

        foreach ($this->routes as $route) {
            $attr = $route['route'];
            assert($attr instanceof Route);

            $config = [
                'controller' => $route["controller"] ?? null,
                'action' => $route["action"],
            ];

            if ($config["controller"] === null) {
                unset($config["controller"]);
            }

            if ($attr->cache) {
                $config['cache'] = true;
            }

            if ($attr->no_trailing_slash) {
                $config['no_trailing_slash'] = true;
            }

            $result[] = [
                $attr->path,
                $config,
            ];
        }

        return $result;
    }
}
```

PHPDocを読んでいただければ分かると思ますが，既存のルーティング情報に配列の書き方を合わせて返すような処理をしています．

```php
declare(strict_types=1);

namespace Dic\Domain;

use Dic\Domain\RouteCollector\SampleAction;
use Dic\Domain\RouteCollector\SampleController;
use Dic\Domain\RouteCollector\Nested;
use Dic\TestCase;
use function Safe\fopen;
use function Safe\rewind;
use function Safe\stream_get_contents;

class RoutingFileGeneratorTest extends TestCase
{
    public function test()
    {
        $routes = [
            ['action' => Nested\SampleAction2::class, 'route' => new Route("/Nested/SampleAction2")],
            ['action' => Nested\SampleAction::class, 'route' => new Route("/Nested/SampleAction")],
            ['controller' => SampleController::class, 'action' => 'index', 'route' => new Route('/sample')],
            ['controller' => SampleController::class, 'action' => 'cached', 'route' => new Route('/sample/cached', true)],
            ['controller' => SampleController::class, 'action' => 'robots', 'route' => new Route('/sample/robots.txt', false, true)],
            ['action' => SampleAction::class, 'route' => new Route("/SampleAction")],
        ];

        $file = fopen('php://memory', 'rw');

        $subject = new RoutingFileGenerator($routes);
        $subject->write($file);

        rewind($file);

        $actual_content = stream_get_contents($file);
        $this->assertSame(self::EXPECTED_CONTENT, $actual_content);
    }

    private const EXPECTED_CONTENT = <<<'PHP'
<?php return array (
  0 =>
  array (
    0 => '/Nested/SampleAction2',
    1 =>
    array (
      'action' => 'Dic\\Domain\\RouteCollector\\Nested\\SampleAction2',
    ),
  ),
  1 =>
  array (
    0 => '/Nested/SampleAction',
    1 =>
    array (
      'action' => 'Dic\\Domain\\RouteCollector\\Nested\\SampleAction',
    ),
  ),
  2 =>
  array (
    0 => '/sample',
    1 =>
    array (
      'controller' => 'Dic\\Domain\\RouteCollector\\SampleController',
      'action' => 'index',
    ),
  ),
  3 =>
  array (
    0 => '/sample/cached',
    1 =>
    array (
      'controller' => 'Dic\\Domain\\RouteCollector\\SampleController',
      'action' => 'cached',
      'cache' => true,
    ),
  ),
  4 =>
  array (
    0 => '/sample/robots.txt',
    1 =>
    array (
      'controller' => 'Dic\\Domain\\RouteCollector\\SampleController',
      'action' => 'robots',
      'no_trailing_slash' => true,
    ),
  ),
  5 =>
  array (
    0 => '/SampleAction',
    1 =>
    array (
      'action' => 'Dic\\Domain\\RouteCollector\\SampleAction',
    ),
  ),
);
PHP;

}
```

テストコードに書いてあるように，返ってきたルーティング情報はこのような配列になっています．

この配列からルーティング情報をファイルに出力していきます．

```php
if (!file_exists( __DIR__ . '/route-config.php')) {
    return;
}

foreach ((require __DIR__ . '/route-config.php') as [$path, $config]) {
    Router::addRoute(ltrim($path, '/'), $config);
}
```

こうすることで配列から一つ一つのルーティング情報がファイルに追加されていきます．

### **おわりに**

ピクシブ百科事典のルーティングについてAttributeベースルーティングという新しい機能の各モジュールを実装するところまですることが出来たのですが，時間切れとなり，一つの機能にまとめ上げることが出来ませんでした．

しかし，Attributeベースルーティングの各モジュールを実装するなかで，自分の知らなかったPHPの様々な機能を知ることが出来ましたし，テストをしっかりと書く経験が出来て，とても楽しくインターン期間を過ごすことが出来ました．

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ピクシブのインターンシップ終わりました．<br>ありがとうございました！<br><br>Attributeを使ってピクシブ百科事典に新しい機能を追加する課題を行いました．<br>またすぐにブログにまとめます．</p>&mdash; はる茶 / Haruki Tazoe 🍒 (@jdkfx) <a href="https://twitter.com/jdkfx/status/1438444536280223745?ref_src=twsrc%5Etfw">September 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

メンターの[@tadsan](https://twitter.com/tadsan)さん含め，沢山の方にお世話になりました．

ありがとうございました．
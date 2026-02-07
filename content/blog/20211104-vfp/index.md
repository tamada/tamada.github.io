---
title: How to get version defined in pom.xml
date: 2021-11-04
image: covers/48889569966_77ebd7368a_c.jpg
tags: ["examine", "program", "java", "jpms", "native-image"]
---

* [Getting ways of the version defined in `pom.xml`](#getting-ways-of-the-version-defined-in-pomxml)
  * [Constant](#constant)
  * [Property](#property)
  * [Package](#package)
  * [Module](#module)
* [What the case in the use of `native-image`?](#what-the-case-in-the-use-of-native-image)
  * [Result of Measurements](#result-of-measurements)
* [Summary](#summary)
* [References](#references)

## Getting ways of the version defined in `pom.xml`

Java 17が出たことだし，いい加減に Java のモジュールシステムを本格的に使いだそうとしている．
最近のJavaの自作ツールは一応モジュール対応にしたつもり（[pochi](https://github.com/tamada/pochi)，[vhc](https://github.com/tamada/vhc)など）．

で，ビルドツールは [Maven](https://maven.apache.org) を使うことが多いのだけど，`pom.xml` で設定したバージョン情報をアプリケーションからどんな情報で取得できるかを確認してみた．

次の4つの方法に分類できる．

1. **Constant**: 自分でバージョンの文字列を`String`型リテラルとしてソースコードに書き込む．
2. **Property**: `src/main/resources`にプロパティファイルとしてバージョン情報を置いておく．
3. **Package**: `MANIFEST.MF`に書かれている `Implementation-Version`や`Specification-Version`のいずれかを利用する．
4. **Module**: `ModuleDescriptor`の`version`メソッドから利用する．

それぞれの分類を独断と偏見で４段階で評価してみた（1が良くて，４が悪い）．

|                | Constant | Property | Package | Module |
| -------------- | -------- | -------- | ------- | ------ |
| わかりやすさ   | 1        | 2        | 3       | 4      |
| 取得のしやすさ | 1        | 2        | 2       | 2      |
| 自動化         | 3        | 2        | 1       | 3      |

分かりやすさはバージョン番号取得ルーチンをみたときのわかりやすさ．**Constant**は単なる変数参照なので一番わかりやすいであろう．**Property**はプロパティファイルを探し，読み込み，エントリを取得する，という３段階が必要となる．

**Package**はバージョン番号取得の処理自体はそれほど難しくはない．ただし，なぜそのように取得できるのか，どうやればそのように取得できるようにするのかに対して，jarファイル，MANIFESTファイルなどの知識が必要になるため **Property**よりも難しいと判断している．

同様に**Module**もバージョン番号取得の処理自体は**Package**と同様であるが，やはりモジュールシステムに対する理解が多少なりとも必要であるため，**Package**よりも難しいと判断した．

### Constant

```java
public class VersionProvider {
  public static final String VERSION = "1.0.0";
  public String version() {
    return VERSION;
  }
}
```

みたいな感じ．設定は分かりやすいし，参照もしやすい．けれど自動化のためには別途スクリプトなどが必要となろう．Mavenの[`templating-maven-plugin`を使う方法もあろう](https://stackoverflow.com/questions/4106171/filtering-source-code-in-maven)．

### Property

```java
public class VersionProvider {
  public String version() {
    URL url = getClass().getResource("/resources/version.properties");
    try(InputStream in = url.openStream()) {
      Properties p = new Properties();
      p.load(in);
      return p.getProperty("someapp.version");
    } catch(IOException e) {
      throw new InternalError(e);
      // IOExceptionが発生するということはプログラムの何かがおかしいため，
      // アプリケーション自体を終了させる．
    }
  }
}
```

#### `src/main/resources/resources/version.properties`

```properties
someapp.version=${project.version}
```

こんな感じ．`pom.xml` に次のようなエントリを入れておくと上記の`${project.version}`を自動的に`version`タグの内容に置き換えてくれる．

一度設定すると取得できなくなることはあまり考えられないが，万が一バージョン情報が取得できなくなった場合，速やかに対応しないといけないため，取得できなかった場合に`InternalError`で終了するようにしている．

#### `pom.xml`

```xml
...
  <build>
    ...
    <resources>
      <resource>
        <directory>src/main/resources</directory>
        <filtering>true</filtering>
      </resource>
    </resources>
    ...
  </build>
...
```

### Package

```java
public class VersionProvider {
  public String version() {
    return getClass().getPackage()
      .getImplementationVersion();
  }
}
```

これはjarファイル内の`META-INF/MANIFEST.MF`に書かれているエントリを読んで出力している．このエントリを追加するには，`pom.xml`に次のようなエントリを入れておくと良い．

```xml
  ...
  <build>
    ...
    <plugins>
      ...
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
        <version>3.1.2</version>
        <configuration>
          <archive>
            <manifest>
              <addDefaultImplementationEntries>true</addDefaultImplementationEntries>
            </manifest>
          </archive>
        </configuration>
      </plugin>
      ...
    </plugins>
    ...
  </build>
...
```

### Module

```java
public class VersionProvider {
  public String version() {
    return getClass().getModule()
      .getDescriptor()
      .version().toString();
  }
}
```

これで取得できるはず．`module-info.java`でバージョンを設定する箇所はないため，jarファイルでは設定できないと思われる．

jmodファイルを作成する`jmod`コマンドに[`--module-version`オプションがある](https://docs.oracle.com/javase/jp/11/tools/jmod.html)ため，これを利用して指定するのであろう．

## What the case in the use of `native-image`?

で，ここからが本番．[GraalVM](https://www.graalvm.org/) を使ってネイティブイメージを作成したときにバージョン情報を取得できなくなっているのはいただけない．

ということで，次のプログラムを用意した．プログラムの全貌は [tamada/version_from_pom](https://github.com/tamada/version_from_pom)にあるので参照されたい．なお，どれくらい差が出るかはわからないが時間も計測してみた．

```java
    public interface VersionProvider extends Supplier<Pair<Version, String>> {
        // 読み込んだバージョン番号とどこから読み込んだかを返す．
        Pair<Version, String> get();
    }
    public void perform() {
        Stream.of(new ConstantVersionProvider(), new PropertyVersionProvider(),
                        new PackageVersionProvider(), new ModuleVersionProvider())
                .forEach(provider -> printResult(provider));
    }
    private void printResult(VersionProvider provider) {
        var result = measure(() -> provider.get());
        Pair<Version, String> pair = result.right();
        String version = String.valueOf(pair.left());
        long time = result.left();
        System.out.printf("%5s,%10d nano sec,%s%n", version, time, pair.right());
    }
    private <R> Pair<Long, R> measure(Supplier<R> supplier) {
        long from = System.nanoTime();
        R result = supplier.get();
        return Pair.of(System.nanoTime() - from, result);
    }
    public static class ConstantVersionProvider implements VersionProvider {
      ... // 上記の Constant とほぼ同じ
    }
    public static class PropertyVersionProvider implements VersionProvider {
      ... // 上記の Property とほぼ同じ
    }
    public static class PackageVersionProvider implements VersionProvider {
      ... // 上記の Package とほぼ同じ
    }
    public static class ModuleVersionProvider implements VersionProvider {
      ... // 上記の Module とほぼ同じ
    }
```

このプログラムを次の5つの方法で実行した結果を示す．

* **Plain**: `java -cp target/classes jp.cafebabe.vfp.Main`
  * jarにまとめないまま実行する方法．
* **Jar**: `java -jar target/mods/vfp-1.0.0.jar`
  * Java 8以前の普通の実行方法，
* **Module**: `java --module-path target/mods --module jp.cafebabe.vfp/jp.cafebabe.vfp.Main`
  * Modular jar として実行する．
* **Native-Jar**: `native-image -jar target/mods/vfp-1.0.0.jar vfp-jar`
  * `native-image` でjarを渡して実行ファイルを作成して，作成された実行ファイルを実行する．
* **Native-Module**: `native-image --module-path target/mods --module jp.cafebabe.vfp/jp.cafebabe.vfp.Main vfp-module`
  * `native-image`にmodular jar を指定して実行ファイルを作成する．そして，作成された実行ファイルを実行する．

[`jmod`コマンド](https://docs.oracle.com/javase/jp/14/docs/specs/man/jmod.html)で作成された jmod ファイルは[実行できない](https://docs.oracle.com/javase/jp/11/tools/jmod.html)．ただし，`jmod`コマンドではバージョンの指定が行える（`--module-version`オプションで指定できる）．では，`jmod`コマンドで作成された jmod ファイルの中から `module-info.class` を取り出し，元の`module-info.class` を置き換えて`classes2`に置く．そして，`classes2`から新たにjarファイルを作成してみた．`mods2/vfp2-1.0.0.jar` とする．これでも実行してみる．

* **Plain2**: `java -cp classes2 jp.cafebabe.vfp.Main`
* **Jar2**: `java -jar target/mods2/vfp2-1.0.0.jar`
* **Native-Jar2**: `native-image -jar target/mods2/vfp2-1.0.0.jar vfp2-jar`
* **Native-Module2**: `native-image --module-path target/mods2 --module jp.cafebabe.vfp/jp.cafebabe.vfp.Main vfp2-module`

### Result of Measurements

結果を以下に示す．列がバージョン番号の取得方法，行が実行方法を表している．実行環境は macOS Big Sur (11.6)，チップ Apple M1, メモリ 16GB，graalvm64-17.0.1である．

|                |       Constant |        Property |        Package |          Module |
| -------------- | -------------: | --------------: | -------------: | --------------: |
| Plain          |   563,500 nsec |  7,336,375 nsec |           null |       Exception |
| Jar            | 3,145,250 nsec | 29,883,833 nsec |    25,667 nsec |       Exception |
| Module         |   179,583 nsec |  9,867,208 nsec |           null |            null |
| Native-Jar     |    35,791 nsec |       Exception | 1,442,458 nsec |       Exception |
| Native-Module  |   113,875 nsec |       Exception |           null |            null |
| Plain2         |   396,000 nsec | 12,512,417 nsec |           null |       Exception |
| Jar2           |   556,750 nsec | 40,243,417 nsec |    57,875 nsec |       Exception |
| Module2        |   145,708 nsec | 19,945,375 nsec |           null | 38,522,208 nsec |
| Native-Jar2    |    41,583 nsec |       Exception | 1,448,750 nsec |       Exception |
| Native-Module2 |    94,125 nsec |       Exception |           null |    193,166 nsec |

表からわかるように，一番簡単で高速なのは**Constant** であるが，自動化しておかなければ実際のバージョンと表示されるバージョンに差が出る可能性がある．

ネイティブコードでない場合は，**Property** が安定して取得できるものの，遅い．実行方法によって，**Package**，**Module**で取得できるか否かが決められる．て言うかなんでネイティブコードにすると取得できなくなるんだよう．

なお，**Module**からバージョンを取得するためには，`module-info.class`にバージョン情報を加える必要がある．そのためには，`jmod`コマンドでバージョンを指定したjmodファイルを作成し，そこから`module-info.class`をコピーしてjarファイルなどを作成し直す必要がある（めんどくせ．．．）．

加えて，`native-image`の実行オプションで取得できる情報が異なるのは注意が必要であろう．

一番安定して取得できるのが**Constant**なのは意外でもなんでもなくその通りなのだが，あまり面白くない結果だな．

**Module** でバージョン番号を取得できるのは良いとして，準備が大変．もっと簡易にできる方法はないのかな？？？

ネイティブコードを作成するときのオプション（`-jar`と`-module`）で変数の参照の実行時間に大きな差が出るのはなんでだろう．

## Summary

結局のところ，バージョン番号は定数として扱うのが簡単で，どのような形態で実行されようが同様に取得できる．このことから定数として扱うのが一番良いように思う．ただし，定数として扱う場合，バージョン番号を更新したときに自動的に定数の値も更新されるような仕組みを導入しておかなければ定義と出力に差異が生じる．

次に**Package**もしくは**Module**で取得するのが良いが，native-image でビルドするときのオプションに注意しないといけない．注意しないといけないと書いている次点でダメだけど．

**Property**はネイティブイメージにする必要がない場合はOKだが，そうでない場合やめた方が良い．予想外のエラーで悩まされる可能性があるためである．

実行時間はいずれの方法でも誤差の範囲であろう．バージョン番号取得のみの時間で見るとそれぞれが大きな差のように思えるが，実際のアプリケーションの場合，バージョン番号取得以外にも様々な処理が行われる．そのような様々な処理の中から見るとバージョン番号取得の時間短縮に気を配るよりも他の処理の短縮に気を配る方が建設的であるためである．

## References

* [Java JMODファイルとは、JARファイルとの違い。](https://tyablog.net/2020/04/05/java-how-different-jmod-and-jar) 


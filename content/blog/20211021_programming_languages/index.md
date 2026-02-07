---
title: "Programming Languages"
date: 2021-10-21
featureimage: covers/20211021.png
tags: ["program", "languages"]
---

とあるユーティリティプログラムを作成しようと思ったものの，どのような言語で作成しようかと悩み中．
希望としては，ワンバイナリが生成可能，ジェネリクスあり，ストリーム処理，あたりが扱えると嬉しい．
また，クロスコンパイルしたいし，書きやすい（EtoW; Easy to Write）言語であると嬉しい．

で，まとめてみた．

| Language | One Binary | Generics | Stream | Cross Compile | EtoW |
| -------- | ---------- | -------- | ------ | ------------- | ---- |
| Java     | GraalVM    | OK       | OK     | Hard          | OK   |
| Go       | OK         | 1.17-    | No     | OK            | OK   |
| Rust     | OK?        | OK       | ???    | OK?           | No   |
| Node.js  | ???        | ???      | OK     | N/A           | OK   |
| Python   | ???        | OK?      | ???    | ???           | OK   |
| Kotlin   | OK?        | OK       | OK     | OK            | ???  |

Java は GraalVM を使うとバイナリを作成できるけど，面倒．
GraalVM を使ってもクロスコンパイルは難しいんじゃないかな．
GitHub Actions などを使えばクロスコンパイルはできそうだけど，面倒だなぁ．

Go は概ね良いのだけど，ストリーム処理が行えないのが悩みどころ．
ジェネリクスも出たばかりであまり書き慣れていない．
例外処理はなくてもいいや．

Rust も良いのだけど，コンパイルを通すのに一苦労な点で，簡単なユーティリティを書くのにはそぐわない気がする．

Node.js，Python はよく知らない．

ちょっと調べてみると [Kotlin がネイティブコードを生成できるらしい](https://kotlinlang.org/docs/native-overview.html)
Kotlin も結局は Java バイトコードに変換するはずだから，
GraalVM と何が違うのかはよく分からないし，これまでに書いたことないけど，書いてみようかな．

### 参考資料

- [Kotlin/Native の標準ライブラリの実装を追いかける](https://youta1119.github.io/post/2018/12/24/about-kotlin-native-stdlib/) (2018-12-24)

---
title: 'Renewed my web site with hugo-theme-swift.'
date: 2020-03-20
image: covers/20200320.png
tags: ['hugo', 'theme-swift']
---

## ホームページのデザインを更新した．

ふと思い立って，ホームページのデザインを更新してみた．
今までは，[hugo-cards](https://hugo-cards-site.netlify.com/) を使っていたのを[Hugo Swift][swift] を使うことにした．

### 欲しかった要件

* `config.toml`にごちゃごちゃと書かない．
* `data`での記述は最小限に．
* `shortcodes`にあまり依存しない．

この要件はあくまで好みである．

### 困ったこと

[Hugo][hugo] などの静的サイトジェネレータでコメント投稿をサポートするために，[Staticman][staticman]がリリースされている．
[Hugo Swift][swift]はこの[Staticman][staticman]を標準でサポートしている．
しかし，[設定方法](https://github.com/pacollins/hugo-future-imperfect-slim/wiki/Staticman-config)にあるように設定して，コメントを投稿しても，500 Internal Server Errorになる．
どうも，`https://staticman3.herokuapp.com/v3/entry/github/tamada/tamada.github.io/master/comments` に投稿しても，Staticman の中から GitHub へのリクエスト URL でリポジトリの情報が失われているっぽい．
設定項目は飛ばしていないつもりだけど，なぜだろう．．．

### Hugo のレイアウトのコツ

いくつかのサイトを Hugo で構築して，レイアウトのコツのようなものがわかった．

生成されたHTML と `themes/XXXXXX/layouts/{_default,partials}` 以下の内容を確認し，変更したい内容をトップの`layouts`にコピーして編集すると良い．


### 雑感

[Hugo Swift][swift]には概ね満足なのだが，次の2つの項目を変えたい．

#### サイン波のアニメーション

トップのサイン波のアニメーションを変更するのが難しい．
変更自体は簡単なんだけど，変更してしまうと，サイトとしてイケてない．
かといってそのままだと，デザインそのままな感じがする．
とりあえず放置．

#### ハンバーガーメニューが気に入らない．

個人的にハンバーガーメニューが気に入らない．
世間的にもハンバーガーメニューはダメだという意見があるようだ．

* [君たちはそんなにハンバーガーメニューが好きなのかね？](https://qiita.com/usagimaru/items/930de80062bdae880630)
* [The Hamburger Menu Doesn't Work](http://deep.design/the-hamburger-menu/)

これもとりあえずは放置．

というところでリリースした．
[Staticman][staticman]についてはまた今度挑戦してみる．

[hugo]: https://gohugo.io/
[swift]: https://neuralvibes.com/
[staticman]: https://staticman.net/

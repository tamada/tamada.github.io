---
title: "Reconstruct site by Hugo"
date: 2017-08-26T17:51:42+09:00
draft: false
slug: reconstruct-site
---

[Hugo](https://gohugo.io/)を使ってサイトを再構築してみた．
以前は [Jekyll](https://jekyllrb.com/) を使っていたが，テーマの変更がものすごくしんどくて嫌になっていた．

Hugo だと，テーマの変更は Jekyll よりも簡単のように感じる．
このような記事に何を書けば良いのか，特に研究室のページとの使い分けはよくわからないが，のんびりと続けてみる．

なお，画像は全て [Visual Hunt](https://visualhunt.com/) から取得した．

## theme の扱い方．

[Hugo のテーマ](https://themes.gohugo.io/)の多くは GitHub で配布されているようだ．
このページも Git で管理している．
さて，テーマをcloneして ```/themes``` に保存するわけだが，それをそのままこのページのリポジトリに保存するのは気持ち悪い．
ということで，submodule を使ってみる．

{{< highlight sh >}}
$ cd themes
$ git submodule add https://github.com/.... # <- 適当なテーマ
{{< /highlight >}}

これでテーマの内容を丸ごとリポジトリにコミットする必要がなくなる．

### 参考

* [Git submodule の基礎](http://qiita.com/sotarok/items/0d525e568a6088f6f6bb)

## gh-pages

GitHub Pages では，```gh-pages``` というブランチにpushした内容がWebページとして反映される．
Hugo だと ```public``` ディレクトリの内容が ```gh-pages``` になっていれば Webページが更新されるようになる．
いちいち別のブランチに切り替えて．．．とやるのも面倒なので，git の worktree を利用する．
worktree とは，1つのサブディレクトリを別のブランチとして扱うものである．

### 準備

{{< highlight sh >}}
$ git checkout --orphan gh-pages # <-- 空の gh-pages ブランチを作成し，移動する．
$ git rm archetypes config.toml content data layouts static themes .gitmodules README.md # <- public以外を削除する．
$ mv public/* . # <- public の中身をトップディレクトリに移動する．
$ rmdir public  # <- public の中身がなくなったので，public ディレクトリを削除する．
$ git add .
$ git commit -m "some comment"
$ git checkout master
$ git worktree public gh-pages # <- publicディレクトリをgh-pagesとして扱う．
$ git submodule update # <- 上で themes 以下を削除したのでもう一度 clone する．
{{< /highlight >}}

ここまでやれば ```public``` ディレクトリが ```gh-pages``` ブランチであると認識されるようになる．
以降は，```gh-pages``` へのコミットであれば，```public```ディレクトリで，
それ以外のブランチでの操作であれば，トップディレクトリで行えば良い．


---
title: 'Renewed my web site with blowfish.'
date: 2026-02-07
tags: ['hugo', 'blowfish', 'web-design', 'website-redesign']
---

## ホームページのデザインを更新した．

以前使っていた [cayman-hugo-theme](https://github.com/zwbetz-gh/cayman-hugo-theme) はそれなりに気に入っていたものの、
2023-01-03 にアーカイブされた。
それ以降、新しいデザインにするために色々と試行錯誤したものの、なかなかしっくりくるデザインが見つからなかった。
[Astro](https://astro.build) を試したり、[Zola](https://www.getzola.org) も試したりもしたものの、最終的には [Hugo](https://gohugo.io) に戻ってきた。
で、Hugo のテーマの中で、[Blowfish](https://blowfish.page/) を採用することにした。
とあるサイトで使っているテーマであり、色々な設定項目もあるので、まあ良いかなと思って使ってみると、それなりに良いかなと言う感じ。
カード状にブログ記事やプロダクトを表示できるのも良い。

## 次にやりたいこと

- Hugo mod を使って、このサイトをモジュール化したい。
  - これで、各プロダクトからも同じテーマを使えるようになる。
  - `partial` の一部を書き換えたりもしているし、、テーマのアップデートがあったときに、各プロダクトのサイトに反映させやすくなる。
  - プロダクトのリリースにより、自動的にプロダクトの日付を更新するようにしたい。
    - GitHub Actions でこのサイトを更新しているなら、プロダクトのリリース時に、そのプロダクトのページの日付を更新するようにしたい。

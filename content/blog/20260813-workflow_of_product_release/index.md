---
title: '自作ツールの公開ワークフローを整えた'
date: 2026-08-13
tags: ['github-actions', 'pseudo-rest-api']
---

## 🗣️ 背景

色々な CLI アプリケーションを作っている。十数個ある。そのリリース作業で、ずっと以下の3つに困っていた。

**1. 1回のリリースで触る場所が多い。** 昨今の CLI アプリケーションは、バイナリを置いて終わりではない。macOS と Linux、arm64 と amd64 の組み合わせでバイナリを用意し、コンテナイメージを公開し、crates.io などのレジストリに登録し、Homebrew🍺 のレシピを更新し、プロダクトのホームページも作る。1回のリリースに対して、公開先がいくつもある。

**2. 同じ情報を何箇所にも手で書き写していた。** バージョン、リリース日、説明、ライセンス。同じ内容を、プロダクトのリポジトリ、Homebrew のレシピ、自分のホームページに、それぞれ別々に書いていた。二重、三重の管理である。当然、情報の齟齬が様々なところで生じるし、更新忘れも結構あった。

**3. プロダクトの一覧が、機械可読な形でどこにもない。** どんなプロダクトがあるのか、それぞれいつリリースしたのか。ホームページに載せたくても、プログラムから読める形で集約された場所がないので、結局また手で書くことになる。2の原因でもある。

このうち 1 は、後述するように既存のツールでもそれなりに何とかなる。厄介なのは 2 と 3 で、これは**第1次情報がどこにあるのかを決めていない**ことが原因である。裏を返せば、正となる情報を1箇所に決めて、他はすべてそこから取ってくるようにすればよい。

このようなことを自動化したいなと、これまでずっと思っていたのだが、この度、ようやく目処が立ったので、内容をまとめておく。

## 🌊 Workflow

最初に行うべきは、マシンリーダブルなものを第１次情報とすることである。これを [`tamada/api`](https://github.com/tamada/api) として作成した。そして、プロダクトの情報は基本的に GitHub で管理し、GitHub 上で管理できない情報のみを `tamada/api` に置くことにした。加えて、GitHub Pagesで、擬似REST APIとして、さまざまな情報を公開することにした。基本的に情報を取得させるだけであるため、GET メソッドのみ対応として、JSON を様々な場所においておくことで対応した。具体的な内容は、https://tamada.github.io/api/ を参照されたい。ホームページの更新や Homebrew なども、すべてこのリポジトリの GitHub Pages から情報を取得することにする。

そこで、以下の手続きで更新処理を行うことにした。

1. プロダクトのリリース処理を完了させる。
2. プロダクトのリポジトリから、`tamada/api` へ更新のリクエストを送る（GitHub Actions）。
3. `tamada/api` の GitHub Actions で、リクエスト元のプロダクトの最新リリース情報を取得する。
   1. 公開しているJSONを更新する。
4. `tamada/api`から、`tamada/homebrew-tap` リポジトリへの更新リクエストを送る（必要があれば）。
   1. `tamada/homebrew-tap` は `gh` コマンドや `tamada/api` などをもとにレシピを更新する。
5. 3が終われば、`tamada.github.io` へ更新リクエストを送る（4と並列で実行する）。
   1. `tamada/api`の情報をもとに内容を更新する。

これで、背景で挙げた2と3が片付いた。バージョンやリリース日を書く場所は `tamada/api` の1箇所だけになり、ホームページも Homebrew もそこから取ってくる。プロダクトのリリースさえ済ませれば、あとは勝手にホームページまで更新されているので、とりあえず満足である。

### 🎈 リリース

リリースでは以下のことを行っている。なお、[immutable release](https://docs.github.com/ja/code-security/concepts/supply-chain-security/immutable-releases) を使用している。

- 各種プラットフォーム向けのバイナリを作成する。
- [quay.io](https://quay.io) でコンテナイメージを公開する。
- [crates.io](https://crates.io) などでバイナリを公開する。
- プロダクトのホームページを作成し、GitHub Pagesで公開する。

Goであれば各種プラットフォーム向けのバイナリを用意するのは簡単である。Rust だと [zigbuild](https://github.com/rust-cross/cargo-zigbuild) や GitHub Actions の各種ランナーを駆使して頑張れ。C/C++やZigは知らない。スクリプト言語だと気にしなくて良いのかな？　スクリプト言語をあまり書かないのでわからない。

コンテナイメージは、最近は quay.io で公開するようにしている。少し前までは ghcr.io で公開していたものの、ghcr.io は単純な利用にもログインが必要など、使い勝手に少し難があるように思う。これは個人の好みに依るところが大きいので、[Docker Hub](https://hub.docker.com)や [Google Artifact Registry](https://docs.cloud.google.com/artifact-registry/docs/transition/gcr-repositories)、[ghcr.io](https://docs.github.com/ja/packages/working-with-a-github-packages-registry/working-with-the-container-registry)、JFrog Artifactory など好きなものを使えば良いと思う。

crates.io などへの公開も GitHub Actions で自動化すべきだろう。npmもcrates.io も Trusted Publishing に対応している。Go は GitHub などで公開すればOKなので楽ですね。Java は個人的にはもう新規で書くことはない言語かなと思うのでいいや。他のレジストリは知らない。

プロダクトのホームページは、基本的に [Hugo](https://gohugo.io) を利用している。テーマによって見栄えが変更できるため、利用するテーマを決めて（[Blowfish](https://blowfish.page)）、必要な追加を行なったのちに、[自分独自のテーマ](https://github.com/tamada/hugo_theme_mod)として公開している。

GitHub Pages の公開方法を `gh-pages` ブランチから、GitHub Actions による方法へと変更している。

リリースにファイルをアップロードし、draft を false にすることで、immutable なリリースの完成となる。この順序は守らないといけない。immutable release は publish した時点でタグもアセットも差し替えられなくなるため、アセットを全てアップロードしてから draft を外す必要がある。逆にすると、後からファイルを追加できずにリリースを作り直す羽目になる。

## 🧠 バッドノウハウ

ただ、この一連の更新作業はバッドノウハウの塊である。Claude Code に教えてもらいながら進めた。

### 📣 プロダクトのリポジトリから tamada/api への更新リクエスト

`notify-publish.yaml` という GitHub Actions スクリプトを `.github/workflows` に置くことで、GitHub 上でのリリースが publish されたのをトリガーに起動するようにした。この `notify-publish.yaml` はプロダクトのリポジトリから `tamada/api` に通知するためのもので、すべてのリポジトリで同じものを利用できるようにしている。

通知といっても特別なことはしておらず、`repository_dispatch` ではなく `gh workflow run` で `tamada/api` の workflow を直接呼び出しているだけである。通知元も通知先も固定だからこれで足りる。

```sh
gh workflow run "deploy.yml" --repo "tamada/api" -f repo=... -f update_brew=...
```

ただ、リポジトリ間の通知は、`GITHUB_TOKEN` は使えない。`GITHUB_TOKEN`はそのリポジトリのみにしか権限がないため、他のリポジトリのWorkflowを呼び出せないためである。その代わりに以下のどちらかを利用することになる。

- 事前に GitHub Personal Access Token (PAT) を生成し、リポジトリに登録し、PAT を利用して通知する。
- GitHub Apps を作成し、更新リクエストを送りたいときに短時間の PAT を生成し、これを利用する。

ここでは、後者（GitHub Apps）を採用した。PAT には期限を設定する。無期限にもできるが、fine-grained PAT だと最長でも1年である。期限が切れれば、PAT を再生成し、リポジトリに登録し直さないといけない。そんな数ヶ月から1年ごとに作業が発生するような面倒なことはしたくない。

### GitHub Apps

ただ、GitHub Appsも初回時に色々と行わないといけないことがある。まず、最初にこの GitHub Apps を作成する必要がある。続いて、以下のことを行う必要がある。

- GitHub Apps を対象リポジトリにインストールし、書き込み権限を与える。
- この通知を利用するすべてのリポジトリに対して、GitHub Apps の `CLIENT_ID` と秘密鍵を登録する。

面倒であるものの、各リポジトリに対して、初回１回だけの作業である。

なお、インストールを忘れて秘密鍵だけ登録しても動かない。トークンの生成自体が失敗するので、そこで気づくことになる。

`client_id.txt`と秘密鍵（`secret.pem`）を用意しておけば、以下のようなシェルスクリプトで対象のリポジトリ全てで登録が可能である。

```sh
for i in productA productB
do
  gh secret set APP_CLIENT_ID -R tamada/$i < client_id.txt
  gh secret set APP_PRIVATE_KEY -R tamada/$i < secret.pem
done
```

あとは workflow の中で [`actions/create-github-app-token`](https://github.com/actions/create-github-app-token) に渡せば、その場限りのトークンが手に入る。有効期限は1時間で、自動的に失効するため、こちらで管理する必要はない。これが PAT を手で回すのを避けたかった理由である。

### 🛑 `notify-publish.yaml`が起動しない

`GITHUB_TOKEN` を使って発火させたイベントは、新しい workflow を実行できない。すなわち、続く `notify-publish.yaml` が起動しない。
再帰呼び出しを防ぐためらしいけど、これも、GitHub Apps で PAT を生成し、リリースすることで回避できる。
そのための GitHub Actions スクリプトを書き、[`tamada/.github`](https://github.com/tamada/.github) リポジトリに置いた。そして、そのワークフローを `uses` で呼び出すようにした。

### `tamada/api` で擬似 REST API を更新する。

このために [`FauxREST`](https://github.com/tamada/fauxrest) というツールを作成した。元となる JSON を適切な場所に配置して REST API のごとく振る舞わせるものである。
プロダクトの情報は先に述べたとおり、GitHub から `gh api` を通じて取得して JSON を構築している。

### `tamada/api` から `homebrew-tap` の更新リクエスト

これは通知元、通知先の両方でリポジトリは固定であるため、`gh workflow run` で直接 workflow を呼び出す。やっぱりこれも GitHub Apps で生成した PAT を利用する。

実物は [`tamada/api` の `deploy.yml`](https://github.com/tamada/api/blob/621a9d639fbb58e28f4b74c0faac07df1bcd3c5a/.github/workflows/deploy.yml#L70) を参照（リンク先は執筆時点のコミットに固定してある）。

なお、`homebrew-tap` への通知は `update_brew` 入力が真のときだけ実行される。レシピの更新が不要なリリースでは飛ばしたいためである。`tamada.github.io` への通知とは依存関係がなく、どちらも JSON の更新が終わった時点から並列に走る。

### `tamada.github.io` 側で API を読む

ホームページ側は、Hugo のショートコードから `resources.GetRemote` で擬似 REST API を叩き、ビルド時にカードを組み立てている。プロダクト一覧のページには、もう個々のプロダクトのページを置いていない。

ここで一つハマった。Hugo は `resources.GetRemote` の結果をキャッシュするため、API を更新してもローカルのビルドには反映されないことがある。プロダクトが増えているのに一覧に出てこない、並び順が合わない、といった形で表れる。ローカルで確認するときは `--ignoreCache` を付ける。

```sh
hugo --gc --minify --ignoreCache
```

CI は毎回まっさらなランナーなのでキャッシュは効かず、常に最新を取得する。ローカルだけで起きるので、かえって気づきにくい。

## 🌌 代替手段

最初に検討したのは [GoReleaser](https://goreleaser.com) である。名前から Go 専用だと勘違いしやすいが、今は Rust, Zig, Node.js, Deno, Bun, Python 向けのビルダーも用意されていて、ビルド済みバイナリを取り込むこともできる。やれることも広く、クロスコンパイル、アーカイブとチェックサムの生成、GitHub リリースの作成とアセットのアップロード、コンテナイメージのビルドと push、そして Homebrew の formula/cask を**別リポジトリの tap に**送るところまで面倒を見てくれる。つまり、この記事でいう手順1（リリース）はほぼ丸ごと置き換えられる。

それでも採用しなかったのは、**いちばん困っていたのが背景の1ではなく、2と3だった**からである。十数個のリポジトリに散らばった情報を一箇所に集めて、それをホームページや Homebrew から参照できる形にすること。そこが解けないと、リリース部分だけ楽になっても手作業は残る。GoReleaser はあくまで「1つのリポジトリのリリースを完遂する」ツールなので、リポジトリを横断して情報を集約する層は守備範囲の外にある。手順2から5がそっくり残るなら、リリース部分だけ載せ替える動機は薄かった。

各プロダクトのリリース部分だけを見れば、他にも選択肢はある。

- [JReleaser](https://jreleaser.org) — 名前に反して Java 専用ではなく、Go, Rust, Node, Python, C/C++ など言語を問わない。リリース作成、Homebrew や Scoop などのパッケージマネージャ、コンテナイメージ、各種 SNS への告知まで一通り揃っている。Rust と Go と Java が混在している自分のような構成には、GoReleaser より素直に嵌まるかもしれない。
- [dist](https://github.com/axodotdev/cargo-dist)（旧 cargo-dist） — Rust 寄り。ビルドに加えてインストーラや Homebrew formula まで生成する。
- [release-plz](https://github.com/release-plz/release-plz) — Rust 向けに、バージョン更新、変更履歴の生成、crates.io への公開を Release PR の形で回す。
- [release-please](https://github.com/googleapis/release-please) や [semantic-release](https://github.com/semantic-release/semantic-release) — 言語非依存で、コミットメッセージからバージョンと変更履歴を決めてリリースまで作る。これらはリリースの「作り方」を自動化するもので、ここまで挙げたものと競合するというより組み合わせる対象である。

一方、集約する層のほうは、既製品というより設計の選択肢になる。

- **ホームページのビルド時に GitHub API を直接叩く。** 一番手軽で、中間のリポジトリが要らない。ただし、レート制限を踏まないようビルド時にトークンが必要になるし、GitHub で管理できない情報（退役したプロダクトの扱いなど）を混ぜる場所がない。加えて Homebrew 側など利用者ごとに同じ問い合わせを実装し直すことになる。
- **定期実行で JSON をホームページのリポジトリにコミットする。** 以前やっていた方法。動きはするが、情報が複数箇所に複製され、結局どれが正なのか分からなくなる。今回それをやめたかった。
- **擬似 REST API を挟む**（今回の方式）。第1次情報が1箇所に決まり、利用者は GET するだけでよい。GitHub Pages なので CDN に載って速く、トークンも要らない。代償として、リポジトリと通知の連鎖が1段増える。

要するに、GoReleaser や JReleaser は手順1を、擬似 REST API は手順2以降を担当する。競合ではないので、リリース部分が面倒になってきたら GoReleaser か JReleaser を後から載せることはできると思っている。

## 終わりに

背景で挙げた3つのうち、2（同じ情報の二重管理）と3（機械可読な一覧がない）は片付いた。第1次情報を `tamada/api` の1箇所に決めて、ホームページも Homebrew もそこから取ってくる形にしたからである。リリースしたあとに、どこかへ書き写す作業はなくなった。

残っているのは1である。各プロダクトのリリース処理そのものは、いまだにリポジトリごとに workflow を書いている。ここは GoReleaser や JReleaser を載せれば楽になるはずで、今回作った仕組みとは階層が違うので後から差し替えられる。面倒になってきたら手を出すと思う。

やってみて思ったのは、**難しかったのは個々の技術ではなく、どこを正とするかを決めることだった**、ということである。決めてしまえば、あとは通知を繋ぐだけの話になる。逆に、決めないまま自動化しようとしていた頃は、どのスクリプトがどこを更新するのか自分でも把握できなくなっていた。

弱点もある。リリース1回でリポジトリを3つまたいで処理が走るので、途中で失敗すると静かに止まる。今は気づけるうちに気づいているが、そのうち何か考えたい。


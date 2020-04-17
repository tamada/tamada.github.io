---
layout: post
title: lioss
categories: ['projects', 'homebrew']
image: lioss.png
tags: ["license", "OSS", "GitHub", "golang"]
date: 2020-03-08
---

### {{< emoji ":speaking_head:" >}} Overview

License identifying tool for OSS projects.
This tool has license database, and analyzes given license by $k$-gram, word frequencies, or tfidf algorithm.

### {{< emoji ":beer_mug:" >}} Install

```sh
$ brew tap tamada/brew # <- the first time only.
$ brew install lioss
```

### {{< emoji ":spouting_whale:" >}} Docker

* `tamada/lioss` (https://hub.docker.com/r/tamada/lioss)
    * `0.9.0`, `latest`

```sh
$ docker run -it --rm -v $PWD:/home/lioss tamada/lioss:latest [OPTIONS] [ARGUMENTS...]
```

### {{< emoji ":globe_with_meridians:" >}} Web pages

* Project page on GitHub
    * https://github.com/tamada/lioss
* Web page
    * https://tamada.github.io/lioss

### {{< emoji ":scroll:" >}} License

[WTFPL](https://github.com/tamada/lioss/blob/master/LICENSE)

* WTFPL permits
    * {{< emoji ":thumbsup:" >}} Commercial use,
    * {{< emoji ":thumbsup:" >}} Modification,
    * {{< emoji ":thumbsup:" >}} Distribution, and
    * {{< emoji ":thumbsup:" >}} Private use.

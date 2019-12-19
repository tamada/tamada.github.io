---
layout: post
title: pochi
categories: ['projects', 'homebrew']
img: pochi.png
tags: ["GitHub", "git", "theft detection", "java", "birthmarks"]
date: 2019-12-04
---

### {{< emoji ":speaking_head:" >}} Overview

pochi is the birthmarking toolkit for the JVM platform.
The birthmarks are the native characteristics extracted from executable programs.
Then, pochi compares them and computes the similarities.
The resultant similarities shows the copy relation possibilities between two program.

<!--more-->

### {{< emoji ":beer_mug:" >}} Install

```sh
$ brew tap tamada/brew # <- the first time only.
$ brew install pochi
```

### {{< emoji ":spouting_whale:" >}} Docker

* `tamada/pochi` (https://hub.docker.com/r/tamada/pochi)
    * `1.0.0`, `latest`

```sh
$ docker run -it --rm -v $PWD:/home/pochi tamada/pochi:latest [OPTIONS] [SCRIPT [ARGUMENTS...]]
```


### {{< emoji ":globe_with_meridians:" >}} Web pages

* Project page on GitHub
    * https://github.com/tamada/pochi
* Web page
    * https://tamada.github.io/pochi

### {{< emoji ":handshake:" >}} License

[Apache 2.0](https://github.com/tamada/pochi/blob/master/LICENSE)


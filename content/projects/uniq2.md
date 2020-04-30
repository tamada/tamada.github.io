---
layout: post
title: uniq2
categories: ['projects', 'homebrew']
image: tool.png
tags: ["utility", "GitHub", "golang"]
date: 2020-03-12
---

### {{< emoji ":speaking_head:" >}} Overview

`uniq2` deletes duplicated lines.

GNU core utilities have `uniq` command for deleting duplicate lines.
However, `uniq` command deletes only continuous duplicate lines.
When deleting not continuous duplicate lines, we use sort command together, in that case, the order of the list was not kept.

We want to delete not continuous duplicated lines with remaining the order.

### {{< emoji ":spouting_whale:" >}} Docker

* `tamada/uniq2` (https://hub.docker.com/r/tamada/uniq2)
    * `1.1.1`, `latest`
    * `1.0.2`

### {{< emoji ":beer_mug:" >}} Install

```sh
$ brew tap tamada/brew # <- the first time only.
$ brew install uniq2
```

### {{< emoji ":globe_with_meridians:" >}} Web pages

* Project page on GitHub
    * https://github.com/tamada/uniq2
* Web page
    * https://tamada.github.io/uniq2

### {{< emoji ":scroll:" >}} License

[WTFPL](https://github.com/tamada/uniq2/blob/master/LICENSE)

* WTFPL permits
    * {{< emoji ":thumbsup:" >}} Commercial use,
    * {{< emoji ":thumbsup:" >}} Modification,
    * {{< emoji ":thumbsup:" >}} Distribution, and
    * {{< emoji ":thumbsup:" >}} Private use.
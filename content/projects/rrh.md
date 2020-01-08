---
layout: post
title: rrh
categories: ['projects', 'homebrew']
img: rrh.png
tags: ["GitHub", "git", "repository management", "go"]
date: 2019-07-13
---

### {{< emoji ":speaking_head:" >}} Overview

`rrh` is a simple git repository manager.

There are too many repositories. We love programming; however, to manage many repositories is quite hard and bothersome tasks. Therefore, we built a headquarter for managing the git repositories, named `rrh`. `rrh` manages repositories by categorizing in groups and execute git command to the groups.

I know the tool `ghq`, manages the git repositories. However, I cannot use it for the following reasons.

there are quite many repositories in my home directory.
To start using `ghq`, we clone the repositories. However, I did not accept to clone all of the repositories.
The location of repositories is fixed in the config file and is accepted only one location.
I decide the directory layout in my home directory.
Additionally, I edit several repositories in a day, when I work hard. Consequently, the progress of each repository is obscured; I cannot remember a lot of things. Therefore, it is glad to see the last modified date of branches.

`rrh` is now growing. Please hack `rrh` itself.

`rrh` means Remote repositories head, or repositories, ready to hack, is not red riding hood. {{< emoji ":ghost:" >}}

### {{< emoji ":beer_mug:" >}} Install

```sh
$ brew tap tamada/brew # <- the first time only.
$ brew install rrh
```

### {{< emoji ":globe_with_meridians:" >}} Web pages

* Project page on GitHub
    * https://github.com/tamada/rrh
* Web page
    * https://tamada.github.io/rrh

### {{< emoji ":scroll:" >}} License

[Apache 2.0](https://github.com/tamada/rrh/blob/master/LICENSE)

### Others

{{< iconify src="images/rrh.png" caption="by [iconpon.com](https://www.iconpon.com/)" >}}

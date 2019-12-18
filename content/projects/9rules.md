---
layout: post
title: 9rules
categories: ['projects', 'homebrew']
img: 9rules.svg
tags: ["GitHub", "git", "java", "code quality"]
date: 2019-10-24
---

### {{< emoji ":speaking_head:" >}} Overview

**9rules** evaluates the how to satisfy the 9 rules for the object oriented programming exercise.
OOP execise was introduced by the [ThoughtWorks Anthology](http://shop.oreilly.com/product/9781934356142.do).

<!--more-->

The rules are as follows.

* Rule # 1. Use one level of indentation per method.
* Rule # 2. Do not use the else keyword.
* Rule # 3. Wrap all primitives and Strings.
* Rule # 4. Use only one dot per line.
    * Except the following items.
      * one line comments,
      * string literals,
      * `this.`, 
      * lines of `import`, 
      * line of `package`,
      * first characters in the line,
      * variadic methods, and 
      * `System.out.print(ln|f)?`.
* Rule # 5. Do not abbreviate.
* Rule # 6. Keep all entities small.
    * The length of each method is less than 3 lines.
    * The length of each class is less than 50 lines.
    * The class files in a package are less than 10 files.
* Rule # 7. Do not use any classes with more than two instance variables.
* Rule # 8. Use first-class collections.
* Rule # 9. Do not use any getters/setters/properties.



### {{< emoji ":beer_mug:" >}} Install

```sh
$ brew tap tamada/brew # <- the first time only.
$ brew install ninerules
```

### {{< emoji ":spouting_whale:" >}} Docker

* `tamada/9rules` (https://hub.docker.com/repository/docker/tamada/9rules)
    * `1.0.0-v2`, `latest`
    * `1.0.0`

### {{< emoji ":globe_with_meridians:" >}} Web pages

* Project page on GitHub
    * https://github.com/tamada/9rules
* Web page
    * https://tamada.github.io/9rules

### {{< emoji ":handshake:" >}} License

[Apache 2.0](https://github.com/tamada/9rules/blob/master/LICENSE)

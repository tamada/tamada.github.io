---
title: "Concept of Birthmarks"
date: 2005-09-01
image: research/design_birthmarks.png
tags: ['birthmarks','theft detection']
---

### :speaking_head: Overview

To detect the theft of Java class files efficiently, we propose a concept of *Java birthmarks*, which are unique and native characteristics of every class file.
For a pair of class files $p$ and $q$, if $q$ has the same birthmark as $p$'s, $q$ is suspected as a *copy* of $p$.
Ideally, the birthmarks should satisfy the following properties: (a) *preservation* -- the birthmarks should be preserved even if the original class file is tampered with, and (b) *distinction* -- independent class files must be distinguished by completely different birthmarks.
Taking (a) and (b) into account, we propose four types of birthmarks for Java class files.

To show the effectiveness of the proposed birthmarks, we conduct three experiments.
In the first experiment, we demonstrate that the proposed birthmarks are sufficiently robust against automatic program transformation (93.3876\% of the birthmarks were preserved).
The second experiment shows that the proposed birthmarks successfully distinguish non-copied files in a practical Java application (97.8005\% of given class files were distinguished).
In the third experiment, we exploit different Java compilers to confirm that the proposed Java birthmarks are core characteristics independent of compiler-specific issues.

(Abstract from IEICE 2005)


### :books: Publications

* Haruaki Tamada, Masahide Nakamura, Akito Monden, and Ken-ichi Matsumoto, “Java Birthmarks –Detecting the Software Theft–,” IEICE Transactions on Information and Systems, Vol. E88-D, No. 9, pp. 2148–2158, September 2005.
* Haruaki Tamada, Masahide Nakamura, Akito Monden, and Kenichi Matsumoto, “Design and Evaluation of Birthmarks for Detecting Theft of Java Programs,” In Proc. IASTED International Conference on Software Engineering (IASTED SE 2004), pp. 569-575, 17-19 February 2004. (Innsbruck, Austria)
* Haruaki Tamada, Masahide Nakamura, Akito Monden, and Kenichi Matsumoto, “Detecting the Theft of Programs Using Birthmarks,” Information Science Technical Report, number NAIST-IS-TR2003014, Graduate School of Information Science, November 2003.
* 玉田 春昭, 神崎 雄一郎, 中村 匡秀, 門田 暁人, 松本 健一, “Java クラスファイルからプログラム指紋を抽出する方法の提案”, 信学技報 情報セキュリティ研究会, Vol. ISEC2003-29, pp.127-133, July 2003.


### :mag_right: Related Research Topics

* [Dynamic Birthmarks](../dynamic_birthmarks)

### :handshake: Collaborators

* [A. Monden](http://digi-ana.sakura.ne.jp/)@[Software mesurement and analytics laboratory](http://analytics.jpn.org/index-e.html), Okayama University
* [M. Nakamura](http://www27.cs.kobe-u.ac.jp/~masa-n/)@[Kobe University](http://www27.cs.kobe-u.ac.jp/wiki/home/)
* [K. Matsumoto](http://isw3.naist.jp/~matumoto/)@[NAIST SE Lab.](https://se-naist.jp)

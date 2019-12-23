---
title: "Evaluating obfuscation method by Kolmogorov complexity"
date: 2013-09-01
img: research/kolmogorov_complexity.png
categories: ['kolmogorov complexity','evaluation of obfuscation', 'entropy']
---

### {{< emoji ":speaking_head:" >}} Overview

This paper quantifies the diffuculty of program analysis based on the information theory.
The basic idea is to consider that a program ultimately obscated if instructions appear at random;
that is (1) all instructions has an equal frequency of appearance,
and (2) there is no pattern observed in the instruction sequence.
We quantified (1) based on the entropy and (2) based on the Kolmogorov complexity.
We evaluated the feasibility of our proposal through a case study.

(Abstract from Computer Software, Vol.30, No. 3)

### {{< emoji ":books:" >}} Publications

* 二村 阿美，門田 暁人，玉田 春昭，神崎 雄一郎，中村 匡秀，松本 健一，"命令のランダム性に基づくプログラム難読化の評価"，コンピュータソフトウェア, Vol. 30, No. 3, pp. 18-24, September 2013.
* 二村 阿美，門田 暁人，玉田 春昭，神崎 雄一郎，中村 匡秀，松本 健一，"命令の乱雑さに基づくプログラム理解性の評価"，ソフトウェア工学の基礎XIX，日本ソフトウェア科学会 FOSE2012 (FOSE2012), pp.151–160, December 2012 (Reviewed).

### {{< emoji ":mag_right:" >}} Related Research Topics

* [Artificiality evaluation of obfuscations](../artificiality_evaluation)
* [De-obfuscate IRM (identifier renaming method)](../deobfuscating_identifier_renaming)
* [Unreadability evaluation of obfuscated programs](../unreadability_evaluation)

### {{< emoji ":handshake:" >}} Collaborators

* [A. Monden](http://digi-ana.sakura.ne.jp/)@[Software mesurement and analytics laboratory](http://analytics.jpn.org/index-e.html), Okayama University
* [M. Nakamura](http://www27.cs.kobe-u.ac.jp/~masa-n/)@[Kobe University](http://www27.cs.kobe-u.ac.jp/wiki/home/)
* [Y. Kanzaki](http://www.hi.kumamoto-nct.ac.jp/~kanzaki/)@Kumamoto National College of Technology

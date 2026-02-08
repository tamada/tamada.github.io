---
title: "Dynamic birthmarks"
date: 2006-08-01
image: research/dynamic_birthmarks.png
tags: ['software birthmarks', 'theft detection']
---

## :speaking_head: Overview

This paper presents a technique of dynamic software birthmarks to support efficient detection of software theft.
A dynamic birthmark $f(p, I)$ is a set of unique and native characteristics of a program $p$, obtained by executing $p$ with a given input $I$. 
For a pair of
software $p$ and $q$, if $f(p, I) = f(q, I)$ holds, $q$ is suspected as a copy of $p$.
In this paper, we propose two kinds of dynamic birthmarks, EXESEQ and EXEFREQ which use execution order and frequency distribution of runtime API Calls.
In the first experiment, we applied the proposed birthmarks to the same-purpose applications.
As a result, it was shown that an application and its extended version have quite similar birthmarks, and that the applications that are independently implemented possess significantly different birthmarks.
The second experiment showed that the proposed birthmarks achieve the strong resilience against the usage of different compilers and optimizations.

(Abstract from IEICE Transaction 2006)

## :books: Publications

* 岡本 圭司, 玉田 春昭, 中村 匡秀, 門田 暁人, 松本 健一, “API呼び出しを用いた動的バースマーク”, 電子情報通信学会論文誌, Vol.J89-D, No.8, pp.1751-1763, August 2006.
* 岡本 圭司, 玉田 春昭, 中村 匡秀, 門田 暁人, 松本 健一, “ソフトウェア実行時のAPI呼び出し履歴に基づく動的バースマークの実験的評価”, 第46回プログラミング・シンポジウム報告集, pp. 41-50, January 2005.
* 岡本 圭司, 玉田 春昭, 中村 匡秀, 門田 暁人, 松本 健一, “ソフトウェア実行時のAPI呼び出し履歴に基づく動的バースマークの提案”, ソフトウェア工学の基礎XI, 日本ソフトウェア科学会 FOSE2004 (FOSE2004), pp.85-88, November 2004.
* Haruaki Tamada, Keiji Okamoto, Masahide Nakamura, Akito Monden, and Ken-ichi Matsumoto, “Dynamic Software Birthmarks to Detect the Theft of Windows Applications,” In Proc. International Symposium on Future Software Technology 2004 (ISFST 2004), CD-ROM, 20-22 October 2004. (Xi’an, China)

## :mag_right: Related Research Topics

* [Concept of Software Birthmarks](../birthmark_concept)

## :handshake: Collaborators

* [A. Monden](http://digi-ana.sakura.ne.jp/)@[Software mesurement and analytics laboratory](http://analytics.jpn.org/index-e.html), Okayama University
* [M. Nakamura](http://www27.cs.kobe-u.ac.jp/~masa-n/)@[Kobe University](http://www27.cs.kobe-u.ac.jp/wiki/home/)
* [K. Matsumoto](http://isw3.naist.jp/~matumoto/)@[NAIST SE Lab.](https://se-naist.jp)

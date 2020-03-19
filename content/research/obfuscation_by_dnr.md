---
title: "Obfuscation by dynamic name resolution"
date: 2008-02-12
image: research/obfuscation_dnr.png
categories: ['obfuscation','reflection API', 'dynamic name resolution']
---

### {{< emoji ":speaking_head:" >}} Overview

Name obfuscation is a software protection technique, which renames identifiers in a given program, to protect the program from illegal cracking.
The conventional methods replace names appearing in the declaration part with the meaningless ones. 
Therefore, the methods cannot be used to obfuscate names declared in system libraries, since changing such system-defined names significantly deteriorates the program portability.

This paper presents a new name obfuscation method, which can hide appearance of the system-defined names.
In the proposed method, the system-defined names are statically encrypted, and the original names are resolved during run time using the reflection.

An experimental evaluation on the Java platform showed that the run-time overhead for the obfuscated program was 1.74 times larger than the one for the original.

(Abstract from IASTED SE 2008)

### {{< emoji ":books:" >}} Publications

* Haruaki Tamada, Masahide Nakamura, Akito Monden, and Ken-ichi Matsumoto, “Introducing Dynamic Name Resolution Mechanism for Obfuscating System-Defined Names in Programs,” In Proc. IASTED International Conference on Software Engineering (IASTED SE 2008), 598-074, pp. 125-130, 12-14 February 2008. (Innsbruck, Austria)
* 玉田 春昭, 中村 匡秀, 門田 暁人, 松本 健一, “APIライブラリ名隠ぺいのための動的名前解決を用いた名前難読化”, 電子情報通信学会論文誌, Vol.J90-D, No.10, pp.2723–2735, October 2007. 
* 玉田 春昭, 中村 匡秀, 門田 暁人, 松本 健一 “C言語におけるライブラリ呼び出し隠蔽のための名前難読化手法”, 2007年暗号と情報セキュリティシンポジウム予稿集 (SCIS2007), January 2007.

### {{< emoji ":mag_right:" >}} Related Research Topics

* [Obfuscation by `invokedynamic`](../obfuscation_by_invokedynamic)
* [Instruction folding obfuscation method](../obfuscation_by_method_folding)

### {{< emoji ":handshake:" >}} Collaborators

* [A. Monden](http://digi-ana.sakura.ne.jp/)@[Software mesurement and analytics laboratory](http://analytics.jpn.org/index-e.html), Okayama University
* [M. Nakamura](http://www27.cs.kobe-u.ac.jp/~masa-n/)@[Kobe University](http://www27.cs.kobe-u.ac.jp/wiki/home/)
* [K. Matsumoto](http://isw3.naist.jp/~matumoto/)@[NAIST SE Lab.](https://se-naist.jp)

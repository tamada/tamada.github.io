---
title: "Obfuscation by invokedynamic"
date: 2015-08-01
img: research/shuffle_stack_status.png
categories: ['obfuscation','Java 7','invokedynamic']
---

### {{< emoji ":speaking_head:" >}} Overview

This paper proposes an obfuscation method against illegal analysis.
The proposed method tries to build a fake call flow graph from debugging tools.
The call flow graph represents relations among methods and helps understanding of a program.
The fake call flow graph leads misunderstanding of the program.
We focus on a hook mechanism of the method call for changing a callee.
We conduct two experiments to evaluate the proposed method.
First experiment simulates attacks by existing tools: Soot, jad, Procyon, and Krakatau.
The Procyon only succeeded decompilation, the others crashed.
Second experiment evaluates understandability of the obfuscated program by the hand.
Only one subject in the nine subjects answered the correct value.
The experiments shows the proposed method has good tolerance against existing tools, and high difficulty of understanding even if the target program is tiny and simple program.
(Abstract from IJSI 2015)


### {{< emoji ":books:" >}} Publications

* Kazumasa Fukuda and Haruaki Tamada, “To Prevent Reverse-Engineering Tools by Shuffling the Stack Status with Hook Mechanism,” International Journal of Software Innovation (IJSI), Volume 3, Issue 3, pp.14-25, 2015.
* 福田 收真，稲垣 賢一，玉田 春昭，”メタプログラミング技法を用いた偽装難読化手法”，2015年暗号と情報セキュリティシンポジウム予稿集（SCIS2015），3B4-3，January 2015（福岡，小倉）.
* 稲垣 賢一，福田 收真，玉田 春昭，”メソッド呼び出しのフックを用いた動的コールフローグラフ偽装の試み”，2015年暗号と情報セキュリティシンポジウム予稿集（SCIS2015），3B4-2，January 2015（福岡，小倉）. 
* 福田 收真，玉田 春昭，”フックを用いた変数アクセス偽装難読化に向けて”，ソフトウェア工学の基礎XXI，日本ソフトウェア科学会 FOSE2014 (FOSE2014), pp.81–86, December 2014.
* 福田 收真，玉田 春昭，”メソッド呼び出し関係隠蔽のための引数順序の入れ替えによる難読化”，2014年暗号と情報セキュリティシンポジウム予稿集 (SCIS2014), 2D2-3, January 2014.
* 福田 收真，玉田 春昭，”Java 7におけるAPI名隠ぺいのためのinvokedynamic命令を用いた難読化の試み”，コンピュータセキュリティシンポジウム 2013 (CSS 2013), pp.1050-1057，No.3D4-2，October 2013.
* Kazumasa Fukuda, and Haruaki Tamada, “A Dynamic Birthmark from Analyzing Operand Stack Runtime Behavior to Detect Copied Software,” In Proc. 13th ACIS International Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing (SNPD 2013), pp.505-510, 1-3 July 2013 (Honolulu, Hawaii, U.S.A.).
* 玉田 春昭，神崎 雄一郎，門田 暁人，”Java言語を対象とした実行時多様化の試み”, 2012年暗号と情報セキュリティシンポジウム予稿集 (SCIS2012), 4E2-3, January 2012.

### {{< emoji ":mag_right:" >}} Related Research Topics

* [Instruction folding obfuscation method](../obfuscation_by_method_folding)
* [Obfuscation by dynamic name resolution](../obfuscation_by_dnr)

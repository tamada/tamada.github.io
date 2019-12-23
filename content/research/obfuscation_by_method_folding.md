---
title: "Method folding obfuscation"
date: 2013-07-01
img: research/method_folding.png
categories: ['obfuscation','method folding','instruction folding', 'Java 7']
---

### {{< emoji ":speaking_head:" >}} Overview

To improve tamper resistance of programs against illegal modification, this paper proposes *instruction folding* applicable to Java platform.

In the proposed method, at first, similar methods are selected in a Java program.
Next, these methods are merged into one method and diffs among these methods are stored in the program.
Then, at runtime, when one of the merged methods is executed, diffs are restored by self-modification, which is realized by the Java instrumentation mechanism.
The proposed method is resilient against tampering of folded method.
Even if an adversary modifies the folded method, the program goes crash because the method is repeatedly modified at runtime.

(Abstract from SNPD 2013)


### {{< emoji ":books:" >}} Publications

* Tetsuya Ohdo, Haruaki Tamada, Yuichiro Kanzaki, and Akito Monden, “An Instruction Folding Method to Prevent Reverse Engineering in Java Platform,” In Proc. 13th ACIS International Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing (SNPD 2013), pp.517-522, 1-3 July 2013 (Honolulu, Hawaii, U.S.A.).
* 大堂 哲也，玉田 春昭，”Javaを対象とした畳込み手法による耐タンパ化の試み”，2013年暗号と情報セキュリティシンポジウム予稿集 (SCIS2013), 2C4-3, January 2013.
* 玉田 春昭，神崎 雄一郎，門田 暁人，”Java言語を対象とした実行時多様化の試み”, 2012年暗号と情報セキュリティシンポジウム予稿集 (SCIS2012), 4E2-3, January 2012.


### {{< emoji ":mag_right:" >}} Related Research Topics

* [Obfuscation by `invokedynamic`](../obfuscation_by_invokedynamic)
* [Obfuscation by dynamic name resolution](../obfuscation_by_dnr)

### {{< emoji ":handshake:" >}} Collaborators

* [A. Monden](http://digi-ana.sakura.ne.jp/)@[Software mesurement and analytics laboratory](http://analytics.jpn.org/index-e.html), Okayama University
* [Y. Kanzaki](http://www.hi.kumamoto-nct.ac.jp/~kanzaki/)@Kumamoto National College of Technology

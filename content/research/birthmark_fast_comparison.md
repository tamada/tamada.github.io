---
title: "Fast comparisons of the birthmarks"
date: 2020-02-15
img: research/fast_comparison_of_birthmarks.png
categories: ['birthmarks','theft detection','software theft','fast comparison']
---

### {{< emoji ":speaking_head:" >}} Overview

The software birthmarks were proposed for detecting the software theft from a large number of suspected programs.
The birthmark is a technique to compare the extracted characteristics as the software birthmarks, and compute similarities between two birthmarks.
The conventional birthmarks require a much time by increasing the target programs for comparison.
Therefore, it is the bottleneck of the conventional birthmarking technique.
In this paper, we propose a method for reducing total processing time by introducing the narrowing phase between conventional extracting and comparison phases.
The narrowing phase employs the fast but rough comparison algorithm in order to eliminate unrelated programs.

We developed the narrowing system for the birthmark, named \mituba, then conducted the experimental evaluation with \mituba.
The evaluation points are required time, narrowing rate, false negatives, false positives, accuracy, and preservation property of the birthmarks.
The results are, in the threshold for deciding the theft is $0.2$, the required time reduced to 20%, the system successfully narrowed 80% programs.
The false negatives in the rest of the programs are about 80%, it was quite high.
However, the false positives were 0%, and the accuracies were over 70%.
Additionally, the proposed method satisfied the preservation property by 80% in the strongest obfuscation method in the experiments.
The results were totally quite well.
From the results of the experimental evaluations, we discussed the suitable threshold.
In ordinal case, the suitable threshold is $0.6$, however, the proposed method is acceptable in the threshold is $0.2$ in the user's discretion.

(Abstract from IPSJ journal 2019)

### {{< emoji ":books:" >}} Publications

* 中村 潤，玉田 春昭，”大量のソフトウェアを対象にしたソフトウェアバースマークによる盗用検出 〜全文検索システムを用いた検査対象の絞り込み手法〜”，情報処理学会論文誌，Vol.61, No.2, Feburary 2020（採録決定）.
* Jun Nakamura, Haruaki Tamada, “mituba: Scaling up Software Theft Detection with the Search Engine,” Proc. International Conference on Software Engineering and Information Management (ICSIM 2018), pp.6–10, January 2018 (Casablanca, Morocco).
* 中村 潤，玉田 春昭，”検索エンジンを用いたソフトウェアバースマークによる検査対象の絞り込み手法”，第24回ソフトウェア工学の基礎ワークショップ（FOSE2017），pp.99–104, November 2017（福井）.
* Takehiro Tsuzaki, Teruaki Yamamoto, Haruaki Tamada, and Akito Monden, “Scaling Up Software Birthmarks Using Fuzzy Hashing,” International Journal of Software Innovation (IJSI), Volume 5, Issue 3, pp.89–102, June 2017.
* Jun Nakamura, and Haruaki Tamada, “Fast Comparison of Software Birthmarks for Detecting the Theft with the Search Engine,” In Proc. of the 4th International Conference on Applied Computing & Information Technology (ACIT 2016), pp.152–157, December 2016 (UNLV, Las Vegas, NV, USA).
* 山本 照明，玉田 春昭，門田 暁人，”大量のプログラムを対象としたファジーハッシュを用いたバースマーク手法”，2015年暗号と情報セキュリティシンポジウム予稿集（SCIS2015），3B4-4，January 2015（福岡，小倉）.

### {{< emoji ":mag_right:" >}} Related Research Topics

* [Concept of Software Birthmarks](../birthmark_concept)


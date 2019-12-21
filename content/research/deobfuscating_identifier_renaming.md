---
title: "De-obfuscate IRM"
date: 2019-04-15
img: research/deobfuscating_irm.png
categories: ['de-obfuscation','obfuscation','identifier renaming']
---

### {{< emoji ":speaking_head:" >}} Overview

The obfuscation methods are often used to hide sensitive information in software.
Especially, an identifier renaming method (IRM) is well used because it is easy to implement.
IRM is one of the obfuscation methods, and to change the names of function, and variables into meaningless one.
However, if we can restore the identifiers to the original names, IRM is invalidated.
One of the serious problems about IRM is that the tolerance against de-obfuscation is not discussed. 
This paper tries to de-obfuscate IRMed programs.
Thereby, this paper evaluates the tolerance and effectiveness of IRM.
From the experimental evaluation, the proposed method can restore the 49.71 % of method names to the original verbs.
Furthermore, focusing on the meanings of verbs, the proposed method recommends the verbs of similar meanings to the original verbs in 57.01 % of methods.

(Abstract from SNPD 2018)

### {{< emoji ":books:" >}} Publications

* 磯部 陽介，玉田 春昭，”ランダムフォレストを用いた名前難読化の耐タンパ化性能の評価”，情報処理学会論文誌，Vol.60, No.4, pp. 1063–1074, April 2019.
* Yosuke Isobe, and Haruaki Tamada, “Are Identifier Renaming Methods Secure? –An Evaluation Focuses on Opcodes using Random Forest–,” In Proc. 19th ACIS International Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing (SNPD 2018), July 2018 (Busan, Korea).
* 磯部 陽介，玉田 春昭，”ランダムフォレストによる名前難読化の逆変換”，第24回ソフトウェア工学の基礎ワークショップ（FOSE2017），pp. 93–98, November 2017（福井）. 
* 匂坂 勇仁，玉田 春昭，”命令列に着目した名前難読化の逆変換手法”，2017年暗号と情報セキュリティシンポジウム予稿集 (SCIS 2017)，3D1-5，January 2017. （沖縄，那覇）  Paper3  BibTeX  Like0
* 磯部 陽介，玉田 春昭，”協調フィルタリングを利用した名前難読化の逆変換”，2017年暗号と情報セキュリティシンポジウム予稿集 (SCIS 2017)，3D1-3，January 2017.（沖縄，那覇）

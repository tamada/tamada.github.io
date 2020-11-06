---
title: "Identifying the applied obfuscator"
date: 2020-01-27
image: research/identifying_applied_obfuscator.png
tags: ['evaluating obfuscation', 'opcodes', 'identifiers']
---

### :speaking_head: Overview

Recently, to prevent cracking, the various protection methods have been proposed.
One of the protection methods is the obfuscation method.
Obfuscation method changes the program into hard to understand for hiding secret information in the program.

On the other hand, de-obfuscation is an interesting research topic for protecting the software.
Since, though vulnerable protection methods are dangerous, measuring the robustness of the method was not discussed.

In this paper, we tackle to identify the applied obfuscation methods towards de-obfuscation.
To perform de-obfuscation requires a suitable method for each obfuscation method.
For this, we obfuscated programs by two practical tools and three algorithms from one academic tool.
Then, we analyzed the programs and extracted characteristics from them based on opcodes.
By using the proposed method, we could identify the applied obfuscation method.

(Abstract from ICIS 2016)

### :books: Publications

* 大槻 成輝，玉田 春昭，神崎 雄一郎，"JVM環境におけるオペコード列と名前に着目した適用難読化ツールの特定"，2020年暗号と情報セキュリティシンポジウム予稿集（SCIS 2020），January 2020.
* 玉田 春昭，神崎 雄一郎，Javaバイトコードを対象とした命令の頻度解析による適用難読化ツールの特定”，コンピュータセキュリティシンポジウム2019予稿集（CSS 2019），1C1-3，October 2019.
* 玉田 春昭，神崎 雄一郎，”オペコードの編集距離を用いたJVM向け難読化ツールの難読化性能の評価”，2019年暗号と情報セキュリティシンポジウム予稿集 (SCIS 2019)，3D2-1，January 2019.（大津，滋賀）
* Hayato Sagisaka, and Haruaki Tamada, “Identifying the Applied Obfuscation Method towards De-obfuscation,” In Proc. 15th IEEE/ACIS International Conference on Computer and Information Science (ICIS 2016), pp.873–878, July 2016 (Oakayama, Japan).
* 匂坂 勇仁，玉田 春昭，”適用保護手法特定の試み −不自然さ評価方法を用いて−”，信学技報, Vol. 115, No. 153, SS2015-21, pp. 63-68, July 2015 (札幌).

### :mag_right: Related Research Topics

* [De-obfuscate IRM (identifier renaming method)](../deobfuscating_identifier_renaming)
* [Artificiality evaluation](../artificiality_evaluation)
* [Evaluating obfuscation method by Kolmogorov complexity](../evaluation_obfuscation_kolmogorov/)
* [Unreadability evaluation of obfuscated programs](../unreadability_evaluation)


### :handshake: Collaborators

* [Y. Kanzaki](http://www.hi.kumamoto-nct.ac.jp/~kanzaki/)@Kumamoto National College of Technology


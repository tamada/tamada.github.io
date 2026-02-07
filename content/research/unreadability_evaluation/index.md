---
title: "Unreadability evaluation by mental simulation model"
date: 2012-09-24
image: research/mental_simulation.png
tags: ['source code analysis', 'obfuscation', 'readability']
---

### :speaking_head: Overview

Obfuscation methods were proposed for protecting programs from cracking.
These methods convert program into incomprehensible one, such as change symbol names from meaningful to meaningless.
As a result, secret information in the program can be hidden.
However, obfuscation methods are not evaluated sufficiently.
This paper evaluates incomprehensibility of the obfuscated programs using queue based virtual mental simulation model (VMSM) which is focused on short term memory in program comprehension.
An experimental evaluation showed that VMSM was able to evaluate the incomprehensibility of data and control flow obfuscation methods.

(Abstract from SNPD 2012)

### :books: Publications

* 吉岡 智哉，福田 收真，玉田 春昭，”メンタルシミュレーションモデルに基づいたプログラムの読みやすさ評価”，情報処理学会関西支部支部大会(B-02)，September 2012.
* Haruaki Tamada, Kazumasa Fukuda, and Tomoya Yoshioka, “Program Incomprehensibility Evaluation for Obfuscation Methods with Queue-based Mental Simulation Model,” In Proc. 13th ACIS International Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing (SNPD 2012), pp. 498–503, 8-10 August 2012 (Kyoto, Japan).
* 玉田 春昭, 福田 收真, 吉岡 智哉, 岩間 文也, 小畠 良太, 片岡 明範, “メンタルシミュレーションモデルを利用した動的名前解決難読化手法の読みにくさ評価”, 電子情報通信学会 2012年総合大会 D-3-3, March 2012.

### :mag_right: Related Research Topics

* [Artificiality evaluation of obfuscations](../artificiality_evaluation)
* [De-obfuscate IRM (identifier renaming method)](../deobfuscating_identifier_renaming)
* [Evaluating obfuscation method by Kolmogorov complexity](../evaluation_obfuscation_kolmogorov)

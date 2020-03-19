---
title: "Auto-extraction of Dynamic Birthmarks"
date: 2019-07-15
image: research/auto-extraction_of_dynamic_birthmarks.png
categories: ['birthmarks','theft detection','software theft','auto extraction', 'aspect oriented programming']
---

### {{< emoji ":speaking_head:" >}} Overview

The software birthmark methods are proposed to find the stolen software from the huge number of suspects.
The software birthmark methods are classified into two manners, static and dynamic manners.
Different from the static birthmarks, dynamic birthmarks require inputs since they base on runtime behaviors.
Also, the dynamic birthmark varies depending on the inputs, therefore, it is difficult to extract beforehand.
Hence the extraction cost of the dynamic birthmarks is generally high than the static birthmarks.
This paper focuses on unit test codes in a project in order to extract the dynamic birthmarks beforehand, and reduce the extraction cost.
The experiments evaluated the credibility and resilience performance of the birthmarks.
The performance evaluation showed good results, the similarities were greater than 0.8 between most recent two versions of the same products, and were under 0.355 among different projects.
In the cost evaluation, the proposed method can reduce the extraction cost of dynamic birthmarks.

(Abstract from SNPD 2018)

### {{< emoji ":books:" >}} Publications

* 横井 昂典，玉田 春昭，"単体テストコードとアスペクト指向を用いた動的バースマークの抽出コストの削減"，情報処理学会論文誌，Vol.60, No.7，pp.1247–1259，July 2019.
* Takanori Yokoi, and Haruaki Tamada, “A Beforehand Extraction Method for Dynamic Software Birthmarks using Unit Test Codes,” In Proc. 19th ACIS International Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing (SNPD 2018), July 2018 (Busan, Korea).
* 横井 昂典，玉田 春昭，"単体テストコードを利用した動的バースマークの抽出"，コンピュータセキュリティシンポジウム2017（CSS 2017），pp.1288–1294 (3C3-4)，October 2017（山形）.

### {{< emoji ":mag_right:" >}} Related Research Topics

* [Concept of Software Birthmarks](../birthmark_concept)
* [Dynamic Software Birthmarks](../dynamic_birthmarks)

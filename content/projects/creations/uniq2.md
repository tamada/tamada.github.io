---
title: "uniq2"
date: "2018-05-09"
image: /images/uniq2.png
link: https://github.com/tamada/uniq2
description: GNU core utilities have uniq command for deleting duplicate lines. However, uniq command deletes only continuous duplicate lines. When deleting not continuous duplicate lines, we use sort command together, in that case, the order of the list was not kept.
tags: ["bash/shell","GitHub","golang","Homebrew"]
featured: true
---

This tool deletes duplicated lines.

GNU core utilities have `uniq` command for deleting duplicate lines. However, `uniq` command deletes only continuous duplicate lines. When deleting not continuous duplicate lines, we use sort command together, in that case, the order of the list was not kept.

We want to delete not continuous duplicated lines with remaining the order.


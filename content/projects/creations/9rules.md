---
title: "9rules - a tool for checking small object programming"
date: "2016-08-27"
link: https://github.com/tamada/9rules
description: This tool validates the following nine rules for the object oriented programming exercise in Java language.
tags: ["Java","GitHub","maven","code quality evaluation"]
featured: true
---

This tool validates the following nine rules for the object oriented programming exercise in Java language.

A book titled '[The ThoughtWorks Anthology: Essays on Software Technology and Innovation](https://pragprog.com/book/twa/thoughtworks-anthology)' are published. Chapter 6 in the book introduces object calisthenics for better software design. The rules shown in the book are as follows.

1. Use 1 level of indentation per method (`DONE`),
2. Do not use the else keyword (`DONE`),
3. Wrap all primitives and strings (`DONE`),
4. Use only 1 dot per line (`DONE`),
5. Do not abbreviate (`Not support yet`),
6. Keep all entities small,
    * 50 lines in a source file (`DONE`),
    * 3 lines in a method (`DONE`), and
    * 10 classses in a package (`Not support yet`).
7. Do not use any classes with more than 2 instance variables (`DONE`),
8. Use first-class collections (`DONE`), and
9. Do not use any getters/setters/properties (`DONE`)
Unfortunately, to confirm obeying the rules is by a human eye. Therefore, this tool was developed to validate the rules automatically by analyzing given Java source codes. By the way, this tool is programed to obey above rules.


#! /bin/sh

activities2markdown() {
    cat assets/data/activities.json | jq -r '.[] | [.label, .href] | join(",")'
}
activities2markdown | awk -F , '{ print "\{\{< badge >\}\}[" $1 "](" $2 ")\{\{< /badge >\}\}" }' > tmp_activities.md
export NEW_ACTIVITIES=$(cat tmp_activities.md)

# 2. awkで範囲を置換して出力
awk  '
  /{{< keywordList "committee" >}}/ {
    print $0           # 開始行は残す
    print ENVIRON["NEW_ACTIVITIES"]      # jqの内容を挿入
    skip = 1           # 中身をスキップ開始
    next
  }
  /{{< \/keywordList >}}/ {
    skip = 0           # 終了行に来たらスキップ終了
  }
  !skip
' $1 > tmp_$1 && mv tmp_$1 $1

rm tmp_activities.md

## job-histories to markdown timelineItems
## The following command do not used now.
# cat assets/data/job-histories.json| jq -r '.[] | [.from, .to, .as, .at, .note] | join("|")' | \
# awk -F \| '{ print "\{\{< timelineItem badge=\"" $1 " - " $2 "\" header=\"" $3 "\" md=\"true\" >}}\n" $4 "\n" $5 "\n\{\{< /timelineItem >\}\}}" }'


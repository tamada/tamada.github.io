  ["name", "tagName", "publishedAt", "url"],
  (.data | to_entries[].value | [
    .name,
    (.latestRelease.tagName // "N/A"),
    (if .latestRelease.publishedAt then (.latestRelease.publishedAt | split("T")[0]) else "N/A" end),
    (.latestRelease.url // "N/A")
  ]) 
  | @csv
  
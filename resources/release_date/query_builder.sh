#! /bin/sh

REPOS=$(find content/products/ -type d -depth 1 \
    -not \( -path '*/retired' -o -path '*/incubations' -o -path '*/homebrew-tap' \) \
    | xargs basename)

QUERY="query {"
for i in $REPOS; do
    name=$(echo $i | tr '-' '_')
    QUERY+="repo_$name: repository(owner: \"tamada\", name: \"$i\") { ...repoFields } "
done
QUERY+="} fragment repoFields on Repository { name url latestRelease { publishedAt url tagName } }"

echo "$QUERY"
#! /bin/sh

REPOS=$(find content/products/ -mindepth 1 -maxdepth 1 -type d \
    -not -path '*/retired'     \
    -not -path '*/incubations' \
    -not -path '*/homebrew-tap'\
    -exec basename {} \; )

QUERY="query {"
for i in $REPOS; do
    name=$(echo $i | tr '-' '_')
    QUERY="${QUERY}repo_$name: repository(owner: \"tamada\", name: \"$i\") { ...repoFields } "
done
QUERY="${QUERY} } fragment repoFields on Repository { name url latestRelease { publishedAt url tagName } }"

echo "$QUERY"
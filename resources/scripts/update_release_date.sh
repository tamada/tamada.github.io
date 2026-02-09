#! /bin/bash

mkdir outputs
bash resources/scripts/query_builder.sh > outputs/query.graphql
echo "============= query.graphql ============="
cat outputs/query.graphql
echo "========================================="

gh api graphql -F query=@outputs/query.graphql > outputs/release_dates.json
cat outputs/release_dates.json | jq -r "$(cat resources/scripts/json2csv.jq)" > outputs/release_dates.csv

echo "=========== release_dates.csv ==========="
cat outputs/release_dates.csv
echo "========================================="

cat outputs/release_dates.csv | while IFS=',' read -r repo_name tag_name publish_date url; do
  repo_name=$(echo ${repo_name} | tr -d \")
  publish_date=$(echo ${publish_date} | tr -d \")
  filepath=content/products/${repo_name}/index.md
  if [ -f "${filepath}" ] && [ "${publish_date}" != "N/A" ]; then
    sed "s/^date: .*/date: ${publish_date}/" ${filepath} > a ; mv a ${filepath}
  fi
done

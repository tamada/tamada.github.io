#! /bin/bash

mkdir outputs
bash resources/scripts/query_builder.sh > outputs/query.graphql
echo "============= query.graphql ============="
cat outputs/query.graphql
echo "========================================="

gh api graphql -F query=@outputs/query.graphql > outputs/release_dates.json
cat outputs/release_dates.json | jq -r "$(cat resources/scripts/json2csv.jq)" > outputs/release_dates.csv

tail -n +2 outputs/release_dates.csv | while IFS=',' read -r -a items; do
  repo_name=$(echo ${items[0]} | tr -d \")
  publish_date=$(echo ${items[2]} | tr -d \")
  filepath=content/products/${repo_name}/index.md
  if [[ -f ${filepath} ]] && [[ ${publish_date} != "N/A" ]]; then
    sed -i "s/^date: .*/date: ${publish_date}/" ${filepath}
  fi
done

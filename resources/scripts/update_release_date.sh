#! /bin/sh

mkdir outputs
bash resources/scripts/query_builder.sh > outputs/query.graphql
echo "============= query.graphql ============="
cat outputs/query.graphql
echo "========================================="

gh api graphql -F query=@outputs/query.graphql > outputs/release_dates.json
cat outputs/release_dates.json | jq -r "$(cat resources/scripts/json2csv.jq)" > outputs/release_dates.csv

for line in $(cat outputs/release_dates.csv | tr -d \"); do
  IFS=',' read -r -a items <<< "$line"
  filepath=content/products/${items[0]}/index.md
  if [[ -f ${filepath} ]] && [[ ${items[2]} != "N/A" ]]; then
    sed "s/^date: .*/date: ${items[2]}/" ${filepath} >  a ; mv a ${filepath}
  fi
done
